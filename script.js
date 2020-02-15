if (!document._audioCompressor) {
  document._audioCompressor = {}
}

(async () => {
  const videos = [...document.querySelectorAll('video')]
    .filter(video => video.readyState !== 0)
    .sort((v1, v2) => {
      const v1Rect = v1.getClientRects()[0]
      const v2Rect = v2.getClientRects()[0]
      return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height))
    })

  let mediaEl = null
  if (videos.length === 0) {
    const audioElements = [...document.querySelectorAll('audio')].filter(audio => audio.muted === true)
    mediaEl = audioElements[0]
  } else {
    mediaEl = videos[0]
  }

  if (!mediaEl) { return }

  const cx = document._audioCompressor

  if (mediaEl.hasAttribute('__compressor_active__')) {
    cx.compressor.ratio.setValueAtTime(1, cx.audioCtx.currentTime)
    // chrome.runtime.sendMessage({
    //   action: 'updateIcon',
    //   processing: false
    // })
    mediaEl.removeAttribute('__compressor_active__')
  } else {
    if (!cx.hasOwnProperty('compressor')) {
      // First run in tab
      cx.audioCtx = new AudioContext()
      cx.source = cx.audioCtx.createMediaElementSource(mediaEl)
      cx.compressor = cx.audioCtx.createDynamicsCompressor()
      cx.source.connect(cx.compressor)
      cx.compressor.connect(cx.audioCtx.destination)

      // Listener for setting changes
      // TODO
    }

    const now = cx.audioCtx.currentTime

    cx.compressor.threshold.setValueAtTime(-50, now)
    cx.compressor.knee.setValueAtTime(40, now)
    cx.compressor.ratio.setValueAtTime(20, now) // max: 20
    cx.compressor.attack.setValueAtTime(0, now)
    cx.compressor.release.setValueAtTime(0.15, now)
    mediaEl.setAttribute('__compressor_active__', true)
    // chrome.runtime.sendMessage({
    //   action: 'updateIcon',
    //   processing: true
    // })
  }
})()

// document.querySelector('[__compressor_active__=true]')
