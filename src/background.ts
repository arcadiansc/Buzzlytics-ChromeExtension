chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("tabId: ", tabId, changeInfo, tab);
  }
});

export {};
