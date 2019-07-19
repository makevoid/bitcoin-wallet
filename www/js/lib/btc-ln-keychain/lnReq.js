const https = require('https')
const axios = window.axios
const cert      = tlsCert
const macaroon  = lnMacaroon

const httpsAgent = new https.Agent({
  cert: cert,
  rejectUnauthorized: false,
})

const lnReq = axios.create({
  baseURL: 'https://54.246.206.3:8080',
  timeout: 1000,
  headers: {
    'Grpc-Metadata-macaroon': macaroon,
  },
  httpsAgent: httpsAgent,
})

window.lnReq = lnReq
