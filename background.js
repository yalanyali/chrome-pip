const inject = () => {
  chrome.tabs.executeScript(
    { file: 'script.js', allFrames: true },
    () => chrome.runtime.lastError
  )
}

chrome.browserAction.onClicked.addListener(tab => {
  inject()
})

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.action === 'updateIcon') {
//     if (msg.processing) {
//       chrome.browserAction.setIcon({ path: '/assets/on.png' })
//     } else {
//       chrome.browserAction.setIcon({ path: '/assets/off.png' })
//     }
//   }
// })
