# Open As App by CodeKernel

**Version:** 1.0  
**Description:** A Chrome extension that allows you to launch any website as a standalone app in a popup window. Save, manage, and quickly access your favorite websites with ease.

---

## Features

- **Open Websites as Apps**: Launch any website in a standalone popup window (980x670 resolution).
- **Save Websites**: Save your favorite websites for quick access.
- **Manage Websites**: View, open, and delete saved websites.
- **Error Handling**: Alerts for invalid URLs and successful actions.
- **Clutter-Free Experience**: Closes the original tab when opening a website in a popup.
- **Context Menu Integration**: Access the extension via a right-click context menu.

---

## Installation

### **Step 1: Download & Install the Extension**

1. **Manual Installation (Developer Mode):**
    - Download the extension files (including `manifest.json`, `background.js`, `popup.html`, `popup.js`, and assets).
    - Open Chrome and go to **chrome://extensions/**.
    - Enable **Developer Mode** (top right corner).
    - Click **Load Unpacked** and select the folder where your extension files are stored.

2. **Installation from Chrome Web Store (if available):**
    - Open **Chrome Web Store**.
    - Search for **"Open As App by CodeKernel"**.
    - Click **Add to Chrome** → **Add Extension**.

---

## How to Use

### **Opening a Website as an App**

1. Navigate to any website in Chrome.
2. Click on the **"Open As App by CodeKernel"** extension icon in the toolbar.
3. The website will open in a **popup window** (980x670 resolution).
4. The original tab will be closed to keep your workspace clean.

### **Save & Manage Websites**

1. **Save Website**:
    - Click the extension icon to open the popup.
    - Enter the URL of the website you want to save in the input field.
    - Click **Save Website**.
    - If the URL is invalid, an error message will be shown.

2. **Open Saved Website**:
    - Select a saved website from the dropdown list.
    - Click **Open Now!** to launch the website in a popup window.

3. **Delete All Websites**:
    - Click **Delete All** to clear all saved websites.

### **Context Menu Integration**

- Right-click anywhere on a webpage and select **Manage Web App** to open the extension's popup form.

---

## Permissions

- **Storage**: Saves the list of websites locally in your browser.
- **Tabs**: Allows managing and switching between browser tabs.
- **Windows**: Enables creating and tracking popup windows.
- **Scripting**: Used to execute scripts for opening websites.
- **Notifications**: Displays alerts for invalid URLs.
- **ContextMenus**: Adds a context menu item for quick access.

---

## Troubleshooting

### **Issue: The extension does not open a new window.**

- Ensure the extension is enabled in **chrome://extensions/**.
- Restart Chrome and relaunch the extension.

### **Issue: The extension does not restore the last browsed tab.**

- Check if Chrome has permission to store local data.
- Verify that the website allows popups.

### **Issue: The extension closes my tab, but no window appears.**

- Disable other extensions that might interfere.
- Update Chrome and restart the browser.

---

## Uninstalling the Extension

1. Go to **chrome://extensions/**.
2. Find **"Open As App by CodeKernel"**.
3. Click **Remove** → Confirm the removal.

---

## Code and Credits

This extension is built using HTML, CSS, and JavaScript and utilizes the Chrome Storage API.

- **HTML**: Provides the structure and user interface of the extension.
- **CSS**: Adds styling to ensure the extension is visually appealing and user-friendly.
- **JavaScript**: Handles the logic for saving websites, opening popups, and managing storage.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
