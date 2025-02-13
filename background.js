// Track URLs for each popup window
let popupWindows = {};

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

        // Open a new popup window with the current tab's URL
        chrome.windows.create({
            url: tab.url,
            type: "popup",
            width: 1200,
            height: 800
        }, (newWindow) => {
            if (newWindow) {
                // Save the opened website window ID and its URL
                popupWindows[newWindow.id] = { url: tab.url };
                // Close the current tab
                chrome.tabs.remove(tab.id);
            }
        });
    }
});

// Track URL changes in popup windows
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        if (popupWindows[tab.windowId]) {
            // Update the URL for the corresponding popup window
            popupWindows[tab.windowId].url = changeInfo.url;
        }
    }
});

// Listen for window close events
chrome.windows.onRemoved.addListener((windowId) => {
    if (popupWindows[windowId]) {
        // Reopen the tab with the stored URL
        chrome.tabs.create({ url: popupWindows[windowId].url, active: true });

        // Remove the closed window from the tracking object
        delete popupWindows[windowId];
    }
});