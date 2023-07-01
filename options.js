document.addEventListener('DOMContentLoaded', function() {
    const clearDataButton = document.getElementById('clearDataButton');
    clearDataButton.addEventListener('click', clearData);
});

function clearData() {
    chrome.runtime.sendMessage({type: 'CLEAR_DATA'}, function(response) {
        if (response.success) {
            alert('All comments have been cleared.');
        } else {
            alert('Failed to clear comments.');
        }
    });
}