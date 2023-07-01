```javascript
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'GET_COMMENTS') {
        // Get the current URL
        const url = window.location.href;

        // Retrieve comments from Chrome Storage
        chrome.storage.sync.get([url], function(result) {
            // Send the comments back to the popup
            sendResponse({comments: result[url]});
        });

        // Indicate that the response is asynchronous
        return true;
    }
});
```