const fs = require('fs')
const https = require('https')
const axios = require('axios')
const cert      = tlsCert
const macaroon  = lnMacaroon

const httpsAgent = new https.Agent({
  cert: cert,
  rejectUnauthorized: false,
})

const net = axios.create({
  baseURL: 'https://54.246.206.3:8080',
  timeout: 1000,
  headers: {
    'Grpc-Metadata-macaroon': macaroon,
  },
  // json: true,
  httpsAgent: httpsAgent,
});

const get = async (command) => {
  const resp = await net.get(`/v1/${command}`)
  return resp.data
}

const getInfo = async (command) => {
  const resp = await net.get(`/v1/${command}`)
  return resp.data
}

;(async function() {

  // ssh -N -L 10009:localhost:10009 root@54.246.206.3

  // MACAROON_HEADER="Grpc-Metadata-macaroon: $(xxd -ps -u -c 1000 config/secrets/admin.macaroon)"

  // curl -X GET --cacert $LND_DIR/tls.cert --header "$MACAROON_HEADER" https://54.246.206.3:8080/v1/channels

  const info = await get("getinfo")
  console.log("info:", info, "\n")

  // const channels = await get("channels")
  // console.log("channels:", channels, "\n")
  //
  // const invoices = await get("invoices")
  // console.log("invoices:", invoices, "\n")


})().catch((err) => {
  console.error(err.errno)
  console.error(err.toJSON().stack)
  // console.error(Object.keys(err))
})
