class LNKeychain { /* reserved */}

class NullAddress { }

// const BTCKeychian = require('@makevoid/bitcoin-keychain')

const get = async (command) => {
  const resp = await lnReq.get(`/v1/${command}`)
  return resp.data
}

const post = async ({ command, reqArgs }) => {
  const resp = await lnReq.post(`/v1/${command}`, reqArgs)
  return resp.data
}

const getInfo = async () => {
  const resp = await lnReq.get(`/v1/getinfo`)
  return resp.data
}

class Keychain extends LNKeychain {

  constructor({ store }) {
    super()
    this.storeDb    = store
    this.storeKey   = "__3itcoin-wallet__"
    this.addresses  = []
    this.channels   = []
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

    // BTC address
    // const addr = await this.getAddress()
    // this.address = addr.address
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
    const payments = await get("payments")
    console.log("payments:", payments, "\n")
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
    const payments     = await this.payments()
    const peers        = await this.peers()
    const transactions = await this.transactions()

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



  async testSendSimple() {
    // const recipient = this.address // send to yourself (LN ID pubkey)
    const ln_invoice = "lnbc110n1pwnd26dpp5h53f96w5ags0t70ywf6tt5gh6wdyfutxwh6wzadyuhdussx9rxesdqu2askcmr9wssx7e3q2dshgmmndp5scqzpgxqrrss6wqjdaqpgqyrh6ae6myuems6v05vwsv8k6ezwsdp4w26uzjygeys62u2x3u7vrdzecks9env5d89sdp95genqld5xmc2txt9v45nyyqpsqf6ar"

    const reqArgs = {
      payment_request: ln_invoice,
    }
    const resp = await post({
      command: "channels/transactions",
      reqArgs
    })  // todo, refactor deduplicate
    console.log("resp:", resp, "\n")
  }

  // post peers - connect

  // post transactions - real send?

  // ---------

  // TODO: remove
  netInfo() {
    return {}
  }

}
