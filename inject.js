/* global chrome XMLHttpRequest */

function loadScript (url, cb, err) {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const resp = request.responseText
      cb(resp)
    } else {
      err(request)
    }
  }
  request.onerror = err
  request.send()
}

chrome.storage.local.get('injsect-urls', function (items) {
  const code = items['injsect-urls']
  console.log(code)
  for (let k in code) {
    const block = code[k]
    loadScript(block.url,
      (ret) => {
        const scriptTag = document.createElement('script')
        scriptTag.text = ret
        scriptTag.async = false
        document.documentElement.appendChild(scriptTag)
      },
      (err) => {
        console.log('Injsect error', err)
      }
    )
  }
})
