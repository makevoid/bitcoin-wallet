class LNKeychain { /* reserved */}

// const BTCKeychian = require('@makevoid/bitcoin-keychain')

const createLnRpc = require('@radar/lnrpc')

class NullLNRPC {}


class Keychain extends LNKeychain {
  constructor() {
    this.ln       = new NullLNRPC()
    this.channels = []
  }

  async initLN() {
    this.ln = await createLnRpc({
      // server:    '54.246.206.3:10009',
      server:       'localhost:10009',
      tls:          './config/secrets/tls.cert',
      macaroonPath: './config/secrets/admin.macaroon',
      // macaroonPath: '../config/secrets/MAC-KEY.macaroon',
    })
  }

  async channels() {
    try {
      const channels  = await this.ln.listChannels()
      this.channels   = channels
      console.log("channels:", channels)
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
