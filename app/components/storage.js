/* global chrome localStorage */

import Promise from 'bluebird'
const KEY = 'inject-urls'

function isChrome () {
  return 'chrome' in window && 'storage' in chrome
}

export function save (data) {
  return new Promise(function (resolve, reject) {
    if (isChrome()) {
      const storageData = {}
      storageData[KEY] = data
      chrome.storage.local.set(storageData, (res) => {
        resolve(data)
      })
    } else {
      const jsonData = JSON.stringify(data)
      localStorage.setItem(KEY, jsonData)
      resolve(data)
    }
  })
}

export function load () {
  return new Promise(function (resolve, reject) {
    if (isChrome()) {
      chrome.storage.local.get(KEY, (items) => {
        const urls = items[KEY]
        resolve(urls || {})
      })
    } else {
      const urls = localStorage.getItem(KEY)
      const objectUrls = JSON.parse(urls)
      resolve(objectUrls || {})
    }
  })
}
