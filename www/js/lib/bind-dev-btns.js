// toast messages

// - show settings
// - shbow msg copied
// - show TODOs :D

// confs

const onsToastDefaultOpts = { timeout: 1100, animation: 'default' }
const onsToastSlowOpts    = { timeout: 2500, animation: 'default' }

const showAddrCopyMsg = () => {
  const message = "Address copied (NOT TRUE - TODO :D)"
  onsToast(message, onsToastDefaultOpts)
}

const showSettingsMsg = () => {
  const ethPvtKey = app.keychain.pvtKeyEth.toString("hex")
  const btcWifPvtKey  = app.keychain.pvtKey
  const message = `Export Private Key<br />- xDAI: 0x${ethPvtKey}<br />- BTC WIF: TODO (${JSON.stringify(btcWifPvtKey)})`
  onsToast(message, onsToastSlowOpts)

  setTimeout(async () => {
    let info = await app.keychain.netInfo()
    info = `{<br>
      address (BTC):    ${info.address},    <br />
      newInvoice (BTC,LN): ${info.newInvoice},    <br />
      balance:    ${info.balance},    <br />
      balanceEth: ${info.balanceEth}, <br />
      blockNum:   ${info.blockNum},   <br />
      blockNum:   ${info.blockNum},   <br />
    }`
    const message = `INFO: ${info}`
    onsToast(message, onsToastSlowOpts)
  }, 3000)
}

const showTODONotification = () => {
  // @makevoid needs more time to finish this :D
  const message = "This feature is not yet implemented! Tell @makevoid to do it."
  onsToast(message, onsToastDefaultOpts)
}
// event binding

const bindDevButtons = () => {
  bindAddrCopyBtn()
  bindSettingsBtn()
  bindNotEnabledButtons()
}

const bindAddrCopyBtn = () => {
  const copySel     = ".btn-copy.button-copy"
  const copyElem    = document.querySelector(copySel)
  copyElem.addEventListener('click', showAddrCopyMsg)
}

const bindSettingsBtn = () => {
  const settingsSel   = ".icon-main-right.icon-settings"
  const settingsElem  = document.querySelector(settingsSel)
  settingsElem.addEventListener('click', showSettingsMsg)
}

const bindNotEnabledButtons = () => {
  const qrScanSel   = ".btn-scan.button-scan"
  const pasteSel    = ".btn-paste.button-paste"
  const qrScanElem  = document.querySelector(qrScanSel)
  const pasteElem   = document.querySelector(pasteSel)
  qrScanElem.addEventListener('click', showTODONotification)
  pasteElem.addEventListener('click', showTODONotification)
}

// lib

const onsToast = (message, opts) => {
  ons.notification.toast(message, opts)
}
