/* global chrome */

export function show (title, msg) {
  chrome.notifications.create('actionsuccess', {
    type: 'basic',
    iconUrl: chrome.extension.getURL('/icon.png'),
    title: title,
    message: msg
  })
}

export const showInfo = show.bind(null, 'Info')
