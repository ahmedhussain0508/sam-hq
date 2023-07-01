// src/content.js

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "segmentImage") {
      segmentImage(request.imageData);
    } else if (request.message === "copyImage") {
      copyImage(request.imageData);
    } else if (request.message === "pasteImage") {
      pasteImage(request.imageData);
    }
  }
);

function segmentImage(imageData) {
  let imageContainer = document.getElementById('imageContainer');
  let image = document.createElement('img');
  image.src = imageData.url;
  image.width = imageData.width;
  image.height = imageData.height;
  imageContainer.appendChild(image);
  // Call the SAM-HQ algorithm to segment the image
  let segments = samHq.segment(image);
  imageData.segments = segments;
  chrome.runtime.sendMessage({message: "segmentImage", imageData: imageData});
}

function copyImage(imageData) {
  let imageContainer = document.getElementById('imageContainer');
  let image = document.createElement('img');
  image.src = imageData.url;
  image.width = imageData.width;
  image.height = imageData.height;
  imageContainer.appendChild(image);
  let selection = window.getSelection();
  let range = document.createRange();
  range.selectNode(image);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  chrome.runtime.sendMessage({message: "copyImage", imageData: imageData});
}

function pasteImage(imageData) {
  let imageContainer = document.getElementById('imageContainer');
  let image = document.createElement('img');
  image.src = imageData.url;
  image.width = imageData.width;
  image.height = imageData.height;
  imageContainer.appendChild(image);
  chrome.runtime.sendMessage({message: "pasteImage", imageData: imageData});
}