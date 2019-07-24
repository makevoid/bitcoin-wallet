class LNKeychain { /* reserved */}

class NullAddress { }
class NullHopsNumber { }
class NullPaymentPreImage { }

// const BTCKeychian = require('@makevoid/bitcoin-keychain')

const get = async (command) => {
  const resp = await lnReq.get(`/v1/${command}`)
  return resp.data
}

const post = async ({ command, reqArgs }) => {
  const resp = await lnReq.post(`/v1/${command}`, reqArgs)
  return resp.data
}

class Keychain extends LNKeychain {

  constructor({ store }) {
    super()
    this.storeDb    = store
    this.storeKey   = "__3itcoin-wallet__"
    this.addresses  = []
    this.channels   = []
    this.payments   = []
    this.loadAddresses()
  }

  loadAddresses() {
    let addresses = this.store("addresses")
    if (!addresses) return
    try {
      addresses = JSON.parse(addresses)
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.error("ERROR: address cache is bad!")
        // this.resetAddresses()
      } else {
        throw err
      }
    }
    this.addresses = addresses || []
  }

  store(key) {
    return this.storeDb[`${this.storeKey}${key}`]
  }

  storeSet(key, value) {
    this.storeDb[`${this.storeKey}${key}`] = value
  }

  async initLN() {
    const info = await get("getinfo")
    console.log("info:", info, "\n")
    const { identity_pubkey } = info
    // LN "address" (ID pubkey)
    this.address = identity_pubkey

    let payments = await this.payments()
    payments = this.filterPayments(payments.payments)
    this.payments = payments

    // BTC address
    // const addr = await this.getAddress()
    // this.address = addr.address
  }

  filterPayments(payments) {
    return payments.map((payment) => (
      this.filterPayment(payment)
    ))
  }

  filterPayment(payment) {
    const {
      payment_hash,
      value,
      creation_date,
      status,
      payment_request,
      path,
    } = payment
    const paymentHash    = payment_hash
    const creationDate   = new Date(new Number(creation_date))
    const paymentRequest = payment_request
    const numHops = path.length
    return {
      paymentHash,
      value: new Number(value),
      creationDate,
      status: status.toLowerCase(),
      numHops,
      paymentRequest,
    }
  }

  async listChannels() {
    const channels = await get("channels")
    console.log("channels:", channels, "\n")
    return channels
  }

  async channels() {
    try {
      const channels  = await this.listChannels()
      this.channels   = channels
    } catch (err) {
      console.error(err)
    }
  }

  async balanceBtc() {
    const { total_balance, confirmed_balance, unconfirmed_balance } = await get("balance/blockchain")
    return { total_balance, confirmed_balance, unconfirmed_balance }
  }

  async balance() {
    const { balance } = await get("balance/channels")
    console.log("GET balance:", balance, "\n")
    // balance, pending_open_balance
    return { balance }
  }

  async balanceInt() {
    const bal = await this.balance()
    return new Number(bal.balance)
  }

  async sendTx(paymentReq) {
    const reqArgs = {
      payment_request: paymentReq,
    }
    const resp = await post({
      command: "channels/transactions",
      reqArgs
    })  // todo, refactor deduplicate
    console.log("resp:", resp, "\n")
  }

  async sendTxDest(dest, amt) {
    const reqArgs = {
      dest: dest,
      amt: amt,
    }
    const resp = await post({
      command: "channels/transactions",
      reqArgs
    })
    console.log("resp", resp, "\n")
  }


  async invoices() {
    const invoices = await get("invoices")
    console.log("invoices:", invoices, "\n")
  }

  async payments() {
    let payments = await get("payments")
    payments = payments.payments
    return {
      payments
    }
  }

  async payreq() {
    const payreq = await get("payreq")
    console.log("payreq:", payreq, "\n")
  }

  async peers() {
    const peers = await get("peers")
    console.log("peers:", peers, "\n")
  }

  async transactions() {
    const transactions = await get("transactions")
    console.log("transactions:", transactions, "\n")
  }

  async utxos() {
    const utxos = await get("utxos")
    console.log("utxos:", utxos, "\n")
  }

  async newAddress() {
    const address = await get("newaddress")
    console.log("address:", address, "\n")
    return { address }
  }

  unusedAddressPresent() {
    return this.addresses.find((addr) => (
      !addr.used
    ))
  }

  addressLast() {
    return this.addresses[this.addresses.length-1]
  }

  resetAddresses() {
    this.addresses = []
    this.storeSet("addresses", [])
  }

  addAddress(address) {
    this.addresses.push(address)
    const addrString = JSON.stringify(this.addresses)
    this.storeSet("addresses", addrString)
  }

  async getAddress() {
    let address = new NullAddress()
    if (this.unusedAddressPresent()) {
      address = this.addressLast()
      address = address.address
    } else {
      address = await this.newAddress()
      address = address.address.address
      const addr = {
        address:  address,
        used:     false,
      }
      this.addAddress(addr)

      console.log("(new) address:", address, "\n")
    }
    return { address }
  }

  async testAllGets() {
    const utxos        = await this.utxos()
    const listChannels = await this.listChannels()
    const balanceBtc   = await this.balanceBtc()
    const balance      = await this.balance()
    const invoices     = await this.invoices()
    const peers        = await this.peers()
    const transactions = await this.transactions()
    const payments     = await this.payments()

    console.log("address:", this.address)

    // const payreq       = await this.payreq()
    // const address      = await this.getAddress()
    // const channels     = await this.channels()
  }

  toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

  async sendChannelTransaction({ txArgs }) {
    const resp = await post({
      command: "channels/transactions",
      txArgs
    })
    const status   = "paying-invoice"
    return { resp, status }
  }

  async sendTransaction({ txArgs }) {
    let { resp, status }
    try {
      { resp, status } = this.sendChannelTransaction({ txArgs })
    } catch (err) {
      if (this.isExpiredError(err)) {
        { resp, vstatus } = { vstatus: 'invoice-expired', resp: {} }
      } else {
        throw err
      }
    }
    return { resp, status }
  }

  let a = {}
  if (true) {
    { a } = { a: 1}
  } else {
    a = 2
  }

  // TODO: refactor payInvoice()

  async payInvoice(lnInvoice) {
    const txArgs = {
      payment_request: lnInvoice,
    }

    let { resp, status } = await this.sendTransaction({ txArgs })
    let numHops, preimage
    const { payment_hash, payment_preimage, payment_route } = resp
    console.log("resp:", resp, "\n")

    numHops  = new NullHopsNumber()
    preimage = new NullPaymentPreImage()

    if (status == 'invoice-expired') {
      return {
        paymentHash: payment_hash,
        paymentPreimage: preimage,
        numHops,
        status
      }
    }

    if (!payment_route) {
      status   = "invoice-already-paid"
    } else {
      const { hops } = payment_route
      numHops  = hops.length
      preimage = payment_preimage
    }

    return {
      paymentHash: payment_hash,
      paymentPreimage: preimage,
      numHops,
      status
    }
  }


  // invoice send example - TODO: remove (convert to a test)
  //
  async testSendSimple() {
    // const recipient = this.address // send to yourself (LN ID pubkey)
    const lnInvoice = "lnbc150n1pwnwx20pp5stg9gcj6ecnerlk835509rj9c4vsres8ahn52gygyfgaed03zurqdqu2askcmr9wssx7e3q2dshgmmndp5scqzpgxqrrssuapxqpc765hgvneuasf6x945xzdea5trtz2gg9v60fh0yvc2ctl9a990t9zm3uzva7mtwhf3dcghm9nllqs82tnl7p3dzwvfv07q66cq8kaq60"

    const {
      paymentHash,
      paymentPreimage,
      numHops,
      status,
    } = await this.payInvoice(lnInvoice)

    console.log({
      paymentHash, paymentPreimage, numHops, status
    })

    return {
      paymentHash,
      paymentPreimage,
      numHops,
      status,
    }
  }

  // TODO: refactor out
  //
  async isExpiredError(err) {
    return err.response.data.error.match(/^invoice expired/)
  }


  get paymentsNum() {
    return this.payments.length
  }


  // post peers - connect

  // ---------

  // TODO: remove
  netInfo() {
    return {}
  }

}
