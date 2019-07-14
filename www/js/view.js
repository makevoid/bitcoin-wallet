
// const Actions = require('./actions')

class View {
  constructor() {
    this.receiveInputElemSel  = ".receive-screen .receive-address-input > input"
    this.balanceElemSel  = ".balances > .balance > .bal"
    this.sendButtonSel   = ".send-form .send-button"
    this.sendAddressElemSel = ".send-form .recipient-address"
    this.sendAmountElemSel  = ".send-form .send-amount"
    this.refreshBalanceBtnSel  = ".balances.list .refresh-balance-btn"

    this.listenToAppEvents()
    this.bindButtons()
  }

  bindButtons() {
    console.log("BIND")
    this.sendButton.addEventListener("click", this.triggerSend.bind(this))
    this.refreshBalanceBtn.addEventListener("click", this.refreshBalance.bind(this))
  }

  triggerSend() {
    const address = this.sendAddressElem.value
    const amount  = this.sendAmountElem.value
    ;(async () => {
      await Actions.send({ address, amount })
      setTimeout(async () => this.refreshBalance(), 10000)
    })().catch((err) => {
      console.error(err)
    })
  }

  refreshBalance() {
    ;(async () => {
      await Actions.updateBalance()
    })().catch((err) => {
      console.error(err)
    })
  }

  listenToAppEvents() {
    const eventsSelector = "html > body > div.events" // (hidden, empty div)
    const eventsElem = doc.querySelector(eventsSelector)
    eventsElem.addEventListener('info', this.updateAddress.bind(this))
    eventsElem.addEventListener('balance', this.updateBalance.bind(this))
  }

  updateAddress(evt) {
    const { address } = evt.detail
    this.receiveInputElem.value = address
  }

  updateBalance(evt) {
    const { balanceUsd } = evt.detail
    // TODO: use bignumber
    const balanceUsdCents   = balanceUsd * 10 ** 2
    const balanceCentsRound = Math.floor(balanceUsdCents * 100) / 100
    this.balanceElem.innerHTML = balanceCentsRound
  }

  // element getters (helpers)

  get receiveInputElem() {
    return doc.querySelector(this.receiveInputElemSel)
  }

  get balanceElem() {
    return doc.querySelector(this.balanceElemSel)
  }

  get sendButton() {
    return doc.querySelector(this.sendButtonSel)
  }

  get sendAddressElem() {
    return doc.querySelector(this.sendAddressElemSel)
  }

  get sendAmountElem() {
    return doc.querySelector(this.sendAmountElemSel)
  }

  get refreshBalanceBtn() {
    return doc.querySelector(this.refreshBalanceBtnSel)
  }

}
