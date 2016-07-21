/* global XMLHttpRequest */

import {load} from './app/components/storage'

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

function insertCode (code) {
  const scriptTag = document.createElement('script')
  scriptTag.text = code
  scriptTag.async = false
  document.documentElement.appendChild(scriptTag)
}

load('injsect-urls')
  .then(items => {
    for (let k in items) {
      const block = items[k]
      const code = block.code.trim()
      const url = block.url.trim()
      if (code.length > 0) {
        insertCode(code)
      } else {
        loadScript(url, insertCode, err => console.log('Injsect error', err))
      }
    }
  })
