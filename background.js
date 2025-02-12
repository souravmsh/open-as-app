chrome.action.onClicked.addListener((tab) => {
    if (tab && tab.url) {
        // Validate the URL
        if (!/^https?:\/\//.test(tab.url)) {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icons/48.png",
                title: "Invalid Page",
                message: "This is not a valid web page URL.",
            });
            return;
        }

        // Save the current tab URL before opening the app
        chrome.storage.local.set({ "currentTabUrl": tab.url }, () => {
            // Open a new popup window with the current tab's URL
            chrome.windows.create({
                url: tab.url,
                type: "popup",
                width: 1200,
                height: 800
            }, (newWindow) => {
                if (newWindow) {
                    // Save the opened website window ID
                    chrome.storage.local.set({ "activeWindowId": newWindow.id });
                    // Close the current tab
                    chrome.tabs.remove(tab.id);
                }
            });
        });
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.windowId) {
            // Check if the tab belongs to the extension's popup window
            chrome.storage.local.get(["activeWindowId"], (result) => {
                if (result.activeWindowId === tab.windowId) {
                    chrome.storage.local.set({ "lastBrowsedTabUrl": tab.url });
                }
            });
        }
    });
});

// Also track URL changes (if user types a new URL)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.local.get(["activeWindowId"], (result) => {
            if (result.activeWindowId === tab.windowId) {
                chrome.storage.local.set({ "lastBrowsedTabUrl": changeInfo.url });
            }
        });
    }
});


// Listen for window close events
chrome.windows.onRemoved.addListener((windowId) => {
    chrome.storage.local.get(["activeWindowId", "currentTabUrl", "lastBrowsedTabUrl"], (result) => {
        if (result.activeWindowId === windowId && (result.currentTabUrl || result.lastBrowsedTabUrl)) {
            // Reopen the tab with the stored URL
            chrome.tabs.create({ url: (result.lastBrowsedTabUrl || result.currentTabUrl), active: true }, (newTab) => {
                if (newTab) {
                    chrome.tabs.update(newTab.id, { active: true });
                }
            });

            // Clear stored data
            chrome.storage.local.remove(["activeWindowId", "currentTabUrl", "lastBrowsedTabUrl"]);
        }
    });
});
