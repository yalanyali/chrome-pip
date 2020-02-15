const inject = () => { chrome.tabs.executeScript({ file: 'script.js', allFrames: true }, () => chrome.runtime.lastError) }

if (!document.pictureInPictureEnabled) {
  chrome.browserAction.setTitle({ title: 'Picture-in-Picture NOT supported' })
} else {
  chrome.browserAction.onClicked.addListener(tab => {
    inject()
  })
}
