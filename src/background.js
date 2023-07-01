chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "segmentImage") {
      chrome.tabs.executeScript({
        file: 'sam-hq.js'
      });
    }
    if (request.message === "copyImage") {
      chrome.tabs.executeScript({
        file: 'sam-hq.js'
      });
    }
    if (request.message === "pasteImage") {
      chrome.tabs.executeScript({
        file: 'sam-hq.js'
      });
    }
  });

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'content.js'});
});