// App = require('./app')
// bindNotEnabledButtons = require('./tmp/bind-unused-btns')

const runApp = () => {
  const app = new App()
  window.app = app
  window.web3utils = app.keychain.web3.utils
}

let receiveLoaded = false
let sendLoaded    = false
let appRunning    = false

const pageLoaded = (event) => {
  const page = event.target;
  if (page.classList.contains('tpl-receive')) receiveLoaded = true
  if (page.classList.contains('tpl-send')) sendLoaded = true
  const pagesLoaded = receiveLoaded && sendLoaded
  if (pagesLoaded && !appRunning) {
    appRunning = true
    runApp()
  }
}

const main = () => {
  // ons.bootstrap() // TODO: delete line? not needed or not loaded?
  document.addEventListener('init', pageLoaded)
  // window.addEventListener('DOMContentLoaded', runApp)
}

main()
