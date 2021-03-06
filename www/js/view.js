
// const Actions = require('./actions')

class View {

  // onload > model > (generate) events
  // button > actions > model > event
  // button > actions > model (sync) > viewUpdates
  // events > viewUpdates

  constructor() {
    this.defineSelectors()
    this.bindViewUpdatesToEvents()
    this.bindButtonsToActions()
  }

  bindButtonsToActions() {
    console.log("BIND")
    // receive view
    this.refreshBalanceBtn.addEventListener("click", this.refreshBalance.bind(this))

    // send view
    this.sendButton.addEventListener("click", this.triggerSend.bind(this))
  }

  refreshBalance() {
    ;(async () => {
      await Actions.updateBalance()
    })().catch((err) => {
      console.error(err)
    })
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

  bindViewUpdatesToEvents() {
    const eventsSelector = "html > body > div.events" // (hidden, empty div)
    const eventsElem = doc.querySelector(eventsSelector)
    // eventsElem.addEventListener('info',     this.updateInfo.bind(this))
    eventsElem.addEventListener("balance",  this.updateBalance.bind(this))
    eventsElem.addEventListener("new-payment-request",  this.showInvoicePaymentRequest.bind(this))
  }

  showInvoicePaymentRequest(evt) {
    const { paymentRequest } = evt.detail
    console.log("Received new payment request", paymentRequest)
    this.receiveInputElem.value = paymentRequest.paymentRequest
  }

  updateInfo(evt) {
    // const { ... } = evt.detail
    // console.log("evt received: ", ..)
    // TODO: Update blockchain info (block num and hash in an advanced section - for "power users") + chain in sync status (green dot at the corner, or green glow at the bottom + label "BTC-LN NODE IN SYNC")
  }

  updateBalance(evt) {
    const {
      balanceSats,
      balanceUsd,
      balanceUsdCents,
      // balanceBtc,
      // balanceBits,
      // balanceMBtcs,  (millibits)
      // balanceMillis,
    } = evt.detail

    this.balanceElem.innerHTML      = balanceSats
    this.balanceFiatElem.innerHTML  = balanceUsdCents
  }

  // element getters (helpers)

  get receiveInputElem() {
    return doc.querySelector(this.receiveInputElemSel)
  }

  get balanceElem() {
    return doc.querySelector(this.balanceElemSel)
  }

  get balanceFiatElem() {
    return doc.querySelector(this.balanceFiatElemSel)
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

  defineSelectors() {
    // receive view
    this.receiveInputElemSel  = ".receive-screen .receive-payment-input > input"
    this.balanceElemSel       = ".balances > .balance > .bal"
    this.balanceFiatElemSel   = ".balances > .balance > .balance-fiat"
    this.refreshBalanceBtnSel = ".balances.list .refresh-balance-btn"

    // send view
    this.sendAddressElemSel   = ".send-form .recipient-address"
    this.sendAmountElemSel    = ".send-form .send-amount"
    this.sendButtonSel        = ".send-form .send-button"
  }

}
