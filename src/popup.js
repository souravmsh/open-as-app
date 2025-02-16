document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("websiteUrl");
    const saveButton = document.getElementById("saveWebsite");
    const websiteList = document.getElementById("websiteList");
    const openButton = document.getElementById("openButton");
    const deleteButton = document.getElementById("deleteButton");
    const alertMessage = document.getElementById("alertMessage");

    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = `alert ${type === "success" ? "alert-success" : "alert-danger"}`;
        alertMessage.style.display = "block";
        setTimeout(() => {
            alertMessage.style.display = "none";
        }, 3000);
    }

    function isValidUrl(url) {
        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url;
        }

        const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6}|localhost)(:\d{2,5})?(\/[^\s]*)?$/;

        if (/^https?:\/\/localhost(\/)?$/.test(url)) {
            return true;
        }

        return pattern.test(url);
    }

    function updateButtonVisibility(hasData) {
        openButton.style.display = hasData ? "inline-block" : "none";
        deleteButton.style.display = hasData ? "inline-block" : "none";
    }

    function loadWebsites() {
        chrome.storage.local.get(["websites", "activeWebsite"], (data) => {
            websiteList.innerHTML = "";
            if (data.websites && data.websites.length > 0) {
                data.websites.forEach((site) => {
                    let option = document.createElement("option");
                    option.value = site;
                    option.textContent = site;
                    if (data.activeWebsite === site) {
                        option.selected = true;
                    }
                    websiteList.appendChild(option);
                });
                updateButtonVisibility(true);
            } else {
                updateButtonVisibility(false);
            }
        });
    }

    saveButton.addEventListener("click", () => {
        let url = urlInput.value.trim();

        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url;
        }

        if (!isValidUrl(url)) {
            showAlert("❌ Please enter a valid URL (localhost can be without a port).", "error");
            return;
        }

        chrome.storage.local.get(["websites"], (data) => {
            let websites = data.websites || [];
            if (!websites.includes(url)) {
                websites.push(url);
                chrome.storage.local.set({ "websites": websites }, () => {
                    loadWebsites();
                    showAlert("✅ Website saved successfully!", "success");
                });
            } else {
                showAlert("⚠️ This website is already saved.", "error");
            }
        });

        urlInput.value = "";
    });

    openButton.addEventListener("click", () => {
        const selectedSite = websiteList.value;
        if (selectedSite) {
            chrome.runtime.sendMessage({ action: "openWebsite", url: selectedSite });
        }
    });

    deleteButton.addEventListener("click", () => {
        chrome.storage.local.clear(() => {
            websiteList.innerHTML = "";
            updateButtonVisibility(false);
            showAlert("🗑️ Storage cleared successfully!", "success");
        });
    });

    loadWebsites();
});
