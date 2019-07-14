// helpers

// helpers - lib - eth

const isEthAddress = (address) => (
  window.web3utils.isAddress(address)
)


// helpers - toast
// other animation-options  { duration: 0.2, delay: 0, timing: 'ease-in' }

const msgToast = (message) => {
  ons.notification.toast(message, { timeout: 1000, animation: 'default' })
}

const msgToastQuick = (message) => {
  ons.notification.toast(message, { timeout: 200, animation: 'default' })
}

const errToast = (message) => {
  ons.notification.toast(message, { timeout: 1000, animation: 'fall' })
}

// view helpers - utils - currency-conversion

const usdCentsToXDaiWeis = (usdCents) => {
  // TODO: use bignumber
  const xDaiWeisAmount = new Number(usdCents) * 10 ** 12
  return xDaiWeisAmount
}
