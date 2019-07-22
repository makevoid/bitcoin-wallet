// helpers

// helpers - lib - btc

const isAddress = (address) => {
  // TODO: in bitcore-lib - new bitcore.Address() then check properties, in bitcoinjs-lib? (TODO, find out)
}

// view helpers - toast

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
