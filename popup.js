```javascript
let comments = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', submitComment);
    chrome.runtime.sendMessage({type: 'LOAD_COMMENTS'}, function(response) {
        comments = response.comments;
        displayComments();
    });
});

function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(function(comment) {
        const li = document.createElement('li');
        li.textContent = comment.text;
        commentList.appendChild(li);
    });
}

function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();
    if (commentText.length > 0) {
        const comment = {
            url: window.location.href,
            text: commentText,
            timestamp: new Date().toISOString()
        };
        comments.push(comment);
        chrome.runtime.sendMessage({type: 'SAVE_COMMENT', comment: comment}, function(response) {
            commentInput.value = '';
            displayComments();
        });
    }
}
```