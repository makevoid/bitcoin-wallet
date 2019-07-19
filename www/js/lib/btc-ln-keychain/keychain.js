class LNKeychain { /* reserved */}

// const BTCKeychian = require('@makevoid/bitcoin-keychain')

const get = async (command) => {
  const resp = await lnReq.get(`/v1/${command}`)
  return resp.data
}

const getInfo = async (command) => {
  const resp = await lnReq.get(`/v1/${command}`)
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

  // TODO: remove
  netInfo() {
    return {}
  }

  // TODO: remove
  web3() {
    return { utils: false }
  }

}
