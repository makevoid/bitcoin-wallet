class LNKeychain { /* reserved */}

// const BTCKeychian = require('@makevoid/bitcoin-keychain')

const get = async (command) => {
  const resp = await lnReq.get(`/v1/${command}`)
  return resp.data
}

const getInfo = async () => {
  const resp = await lnReq.get(`/v1/getinfo`)
  return resp.data
}

class Keychain extends LNKeychain {
  constructor() {
    super()
    this.channels = []
  }

  async initLN() {
    const info = await get("getinfo")
    console.log("info:", info, "\n")
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

  async initLN() {
    const info = await get("getinfo")
    console.log("info:", info, "\n")
  }

  async balanceBtc() {
    const balance = await get("balance/blockchain")
    console.log("balance:", balance, "\n")
    // total_balance, confirmed_balance, unconfirmed_balance
  }

  async balance() {
    const balance = await get("balance/channels")
    console.log("balance:", balance, "\n")
    // balance, pending_open_balance
    return { balance }
  }

  async balanceInt() {
    const bal = await this.balance
    return new Number(bal.balance)
  }

  async sendTx(paymentReq) {
    const reqArgs = {
      payment_request: paymentReq,
    }
    const resp = await post("channels/transactions", reqArgs)  // todo, refactor deduplicate
    console.log("resp:", resp, "\n")
    //
  }

  async sendTxDest(dest, amt) {
    const reqArgs = {
      dest: dest,
      amt: amt,
    }
    const resp = await post("channels/transactions", reqArgs)
    console.log("resp", resp, "\n")
  }


  async invoices() {
    const invoices = await get("invoices")
    console.log("invoices:", invoices, "\n")
    // invoices
  }

  async payments() {
    const payments = await get("payments")
    console.log("payments:", payments, "\n")
    //
  }

  async payreq() {
    const payreq = await get("payreq")
    console.log("payreq:", payreq, "\n")
    //
  }

  async peers() {
    const peers = await get("peers")
    console.log("peers:", peers, "\n")
    //
  }

  async transactions() {
    const transactions = await get("transactions")
    console.log("transactions:", transactions, "\n")
    //
  }

  async utxos() {
    const utxos = await get("utxos")
    console.log("utxos:", utxos, "\n")
    //
  }

  async testAllGets() {
    const utxos        = await get("utxos")
    console.log("utxos:", utxos, "\n")
    const listChannels = await this.listChannels()
    // const channels     = await this.channels()
    const balanceBtc   = await this.balanceBtc()
    const balance      = await this.balance()
    const invoices     = await this.invoices()
    const payments     = await this.payments()
    // const payreq       = await this.payreq()
    const peers        = await this.peers()
    const transactions = await this.transactions()
    //
  }

  // post peers - connect

  // post transactions - real send?

  // ---------

  // TODO: remove
  netInfo() {
    return {}
  }

}
