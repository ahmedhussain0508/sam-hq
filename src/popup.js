document.addEventListener('DOMContentLoaded', function() {
    let segmentButton = document.getElementById('segmentButton');
    let copyButton = document.getElementById('copyButton');
    let pasteButton = document.getElementById('pasteButton');

    segmentButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "segmentImage"});
        });
    });

    copyButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "copyImage"});
        });
    });

    pasteButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "pasteImage"});
        });
    });
});