chrome.storage.local.get('injsect-code', function (items) {
  const code = items['injsect-code']
  const scriptTag = document.createElement ("script");
  scriptTag.text = `
    console.log('[injsect] Injecting loader')
    ${code}
  `
  scriptTag.async = false;
  document.documentElement.appendChild(scriptTag);
})
