const fs = require('fs')
const https = require('https')
const axios = require('axios')
const cert      = fs.readFileSync("./config/secrets/tls.cert")
const macaroon  = fs.readFileSync("./config/secrets/admin.macaroon").toString('hex')
const request = require('request')

const options = {
  // url: 'https://localhost:8080/v1/getinfo',
  url: 'https://54.246.206.3:8080/v1/getinfo',
  //   baseURL: 'https://54.246.206.3:10009',

  // Work-around for self-signed certificates.
  rejectUnauthorized: false,
  json: true,
  headers: {
    'Grpc-Metadata-macaroon': macaroon,
  },
}

request.get(options, (error, response, body) => {
  if (error) console.error(error)

  console.log(body)
})

//
// const httpsAgent = new https.Agent({
//   cert: cert,
//   rejectUnauthorized: false,
// })
//
// const net = axios.create({
//   baseURL: 'https://54.246.206.3:10009',
//   timeout: 1000,
//   headers: {
//     'Grpc-Metadata-macaroon': macaroon,
//   },
//   httpsAgent: httpsAgent,
// })
//
//
// ;(async function() {
//
//   // ssh -N -L 10009:localhost:10009 root@54.246.206.3
//
//   // MACAROON_HEADER="Grpc-Metadata-macaroon: $(xxd -ps -u -c 1000 config/secrets/admin.macaroon)"
//
//   // curl -X GET --cacert $LND_DIR/tls.cert --header "$MACAROON_HEADER" https://54.246.206.3:8080/v1/channels
//
//   const channels = await net.get("/v1/getinfo")
//   console.log("channels:", channels)
//
// })().catch((err) => {
//   console.error(err.errno)
//   console.error(err.toJSON().stack)
//   // console.error(Object.keys(err))
// })
