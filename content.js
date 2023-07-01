// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'LOAD_COMMENTS') {
    const url = window.location.href;
    sendResponse({url: url});
  }
});