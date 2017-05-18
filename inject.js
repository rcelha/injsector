/* global XMLHttpRequest */

import {load} from './app/components/storage'

function scriptToObj (tag) {
  return {
    src: tag.getAttribute('src'),
    content: tag.innerText
  }
}

function setUpReplace (block) {
  const observer = new window.MutationObserver(function (m) {
    m.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(tag => {
          let skip = false
          try {
            skip = !!tag.getAttribute('data-ignore-injsector')
          } catch (_) {}

          if (tag.tagName === 'SCRIPT' && !skip) {
            if (block.replaceSrcMatch !== '' && tag.src.search(new RegExp(block.replaceSrcMatch)) === -1) {
              return
            }
            if (block.replaceTextMatch !== '' && tag.innerText.search(new RegExp(block.replaceTextMatch)) === -1) {
              return
            }
            const newScript = document.createElement('script')
            newScript.setAttribute('data-ignore-injsector', '1')
            if (block.isCode === '1') {
              newScript.innerHTML = block.code
            } else {
              newScript.setAttribute('src', block.url)
            }
            console.log('[injsector]', scriptToObj(tag), 'being replaced by', scriptToObj(newScript))

            tag.innerText = ''
            tag.setAttribute('src', '')
            tag.insertAdjacentElement('afterend', newScript)
          }
        })
      }
    })
  })
  observer.observe(document, { childList: true, subtree: true })
}

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
  scriptTag.setAttribute('data-ignore-injsector', '1')
  document.documentElement.appendChild(scriptTag)
}

function checkDomain (block) {
  const urlMatch = (block.urlMatch === undefined) ? '' : block.urlMatch
  return window.location.href.search(new RegExp(urlMatch)) > -1
}

load('injsect-urls')
  .then(items => {
    for (let k in items) {
      const block = items[k]
      const code = block.code.trim()
      const url = block.url.trim()
      const replaceSrcMatch = block.replaceSrcMatch
      const replaceTextMatch = block.replaceTextMatch

      if (!checkDomain(block)) {
        continue
      }

      if (replaceTextMatch || replaceSrcMatch) {
        setUpReplace(block)
      } else if (block.isCode === '1') {
        insertCode(code)
      } else {
        loadScript(url, insertCode, err => console.trace('[injsector]', err))
      }
    }
  })
  .catch(err => console.trace('[injsector]', 'top-level error', err))
