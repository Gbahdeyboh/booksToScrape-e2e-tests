module.exports = {
    launch: {
      dumpio: true,
      headless: false,
      args: [ '--no-sandbox', '--disable-setuid-sandbox', "--window-size=1366,768" ],
    },
    browser: 'chromium',
    browserContext: 'default',
    exitOnPageError: true,
}