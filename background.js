```javascript
import { CommentSchema } from './storage.js';

let comments = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.message === 'LOAD_COMMENTS') {
    loadComments(request.data);
  }
});

function saveComment(data) {
  const comment = new CommentSchema(data.url, data.comment, Date.now());
  comments.push(comment);
  chrome.storage.sync.set({ [data.url]: comments }, function() {
    console.log('Comment saved');
  });
}

function loadComments(url) {
  chrome.storage.sync.get([url], function(result) {
    comments = result[url] || [];
    chrome.runtime.sendMessage({ message: 'COMMENTS_LOADED', data: comments });
  });
}
```