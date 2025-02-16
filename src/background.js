// Track URLs and original tab positions for each popup window
let popupWindows = {};

chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
        id: "manageWebApp",
        title: "Manage Websites",
        contexts: ["all"] // Show the context menu item in all contexts
    });    

    // About CodeKernel
    chrome.contextMenus.create({
        id: "aboutCodeKernel",
        title: "About CodeKernel",
        contexts: ["all"] // Show the context menu item in all contexts
    });

    // Developer
    chrome.contextMenus.create({
        id: "developer",
        title: "Developer",
        contexts: ["all"] // Show the context menu item in all contexts
    });    

});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "manageWebApp") {
        // Show a popup form
        chrome.windows.create({
            url: chrome.runtime.getURL("src/popup.html"), // Create a popup.html file for the form
            type: "popup",
            width: 600,
            height: 400
        });
    } else if (info.menuItemId === "aboutCodeKernel") {
        // Open the Developer link in a new tab
        chrome.tabs.create({
            url: 'https://codekernel.net'
        });
    } else if (info.menuItemId === "developer") {
        // Open the Developer link in a new tab
        chrome.tabs.create({
            url: 'https://github.com/souravmsh'
        });
    }
});

chrome.action.onClicked.addListener((tab) => {
    if (tab && tab.url) {
        // Validate the URL
        if (!/^https?:\/\//.test(tab.url)) {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "../static/icons/48.png",
                title: "Invalid Page",
                message: "This is not a valid web page URL.",
            });
            return;
        }

        // Save the original tab index before opening the popup
        const originalTabIndex = tab.index;

        // Open a new popup window with the current tab's URL
        chrome.windows.create({
            url: tab.url,
            type: "popup",
            width: 980,
            height: 670
        }, (newWindow) => {
            if (newWindow) {
                // Save the opened website window ID, its URL, and the original tab index
                popupWindows[newWindow.id] = { url: tab.url, originalTabIndex };
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
        const { url, originalTabIndex } = popupWindows[windowId];

        // Reopen the tab with the stored URL at its original position
        // Only do this if originalTabIndex is not -1 (i.e., not from saved web app)
        if (originalTabIndex !== -1) {
            chrome.tabs.create({ url, index: originalTabIndex, active: true });
        }

        // Remove the closed window from the tracking object
        delete popupWindows[windowId];
    }
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openWebsite") {
        const url = message.url;

        // Open a new popup window with the selected URL
        chrome.windows.create({
            url: url,
            type: "popup",
            width: 980,
            height: 670
        }, (newWindow) => {
            if (newWindow) {
                // Save the opened website window ID and its URL
                // Set originalTabIndex to -1 since there is no original tab for this case
                popupWindows[newWindow.id] = { url: url, originalTabIndex: -1 };
            }
        });
    }
});