let saveToFile = document.getElementById("saveToFile");

saveToFile.addEventListener("click", async () => {
  chrome.storage.local.get("storedTabs", (result) => {
    _tabs = JSON.stringify(result.storedTabs)

    chrome.downloads.download({
      url: window.URL.createObjectURL(new Blob([_tabs],
      {type: "octet/stream"})),
      filename: 'tabs.json', conflictAction: chrome.downloads.FilenameConflictAction.uniquify
    });
  });
});
