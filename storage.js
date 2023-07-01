```javascript
const CommentSchema = {
  url: '',
  comment: '',
  timestamp: ''
};

let comments = [];

function saveComment(comment) {
  comments.push(comment);
  chrome.storage.sync.set({comments: comments}, function() {
    console.log('Comment saved');
  });
}

function loadComments(url) {
  chrome.storage.sync.get(['comments'], function(result) {
    comments = result.comments.filter(comment => comment.url === url);
  });
}
```