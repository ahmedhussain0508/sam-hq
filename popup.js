```javascript
let comments = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveComment);
    document.getElementById('optionsButton').addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });
    getComments();
});

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = {
        id: Date.now(),
        url: window.location.href,
        text: commentInput.value,
        timestamp: new Date()
    };
    comments.push(comment);
    chrome.runtime.sendMessage({type: 'SAVE_COMMENT', data: comment});
    commentInput.value = '';
    displayComments();
}

function getComments() {
    chrome.runtime.sendMessage({type: 'GET_COMMENTS', data: {url: window.location.href}}, function(response) {
        comments = response.data;
        displayComments();
    });
}

function displayComments() {
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(function(comment) {
        let li = document.createElement('li');
        li.textContent = `${comment.text} (Saved on ${comment.timestamp})`;
        commentList.appendChild(li);
    });
}
```