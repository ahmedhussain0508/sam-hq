```javascript
let comments = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'SAVE_COMMENT':
      saveComment(request.comment);
      break;
    case 'GET_COMMENTS':
      sendResponse(getComments(request.url));
      break;
    case 'CLEAR_DATA':
      clearData();
      break;
    default:
      console.error('Unrecognised message: ', request);
  }
});

function saveComment(comment) {
  comments.push(comment);
  chrome.storage.sync.set({ comments: comments }, function() {
    console.log('Comment saved');
  });
}

function getComments(url) {
  return comments.filter(comment => comment.url === url);
}

function clearData() {
  comments = [];
  chrome.storage.sync.set({ comments: comments }, function() {
    console.log('Data cleared');
  });
}
```