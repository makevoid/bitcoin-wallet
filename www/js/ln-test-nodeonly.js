// paste here all the LN GRPC boilerplate code to be used later
//
const createLnRpc = require('@radar/lnrpc')

;(async function() {

  // ssh -N -L 10009:localhost:10009 root@54.246.206.3

  const lnRpcClient = await createLnRpc({
    // server:    '54.246.206.3:10009',
    server:       'localhost:10009',
    tls:          './config/secrets/tls.cert',
    macaroonPath: './config/secrets/admin.macaroon',
    // macaroonPath: '../config/secrets/MAC-KEY.macaroon',
  })
  console.log(lnRpcClient)


  try {
    const channels = await lnRpcClient.listChannels()
    console.log("channels:", channels)
  } catch (err) {
    console.error(err)
  }



  process.exit()


  try {
    const info = await lnRpcClient.getInfo()
    console.log("Info:", info)
  } catch (err) {
    console.error(err)
  }

  // process.exit()

  try {
    const netInfo = await lnRpcClient.getNetworkInfo()
    console.log("Info (network):", netInfo)
  } catch (err) {
    console.error(err)
  }

  try {
    const pendingChans = await lnRpcClient.pendingChannels()
    console.log("pendingChans:", pendingChans)
  } catch (err) {
    console.error(err)
  }

  try {
    const peers = await lnRpcClient.listPeers()
    console.log("peers:", peers)
  } catch (err) {
    console.error(err)
  }

  try {
    const graph = await lnRpcClient.describeGraph()
    console.log("graph:", graph)
  } catch (err) {
    console.error(err)
  }

  try {
    const invoices = await lnRpcClient.listInvoices()
    console.log("invoices:", invoices)
  } catch (err) {
    console.error(err)
  }

  try {
    const payments = await lnRpcClient.listPayments()
    console.log("payments:", payments)
  } catch (err) {
    console.error(err)
  }

  const paymentRequest = "lnbc53420n1pwshgd2pp5ag4cy4wm02gww05urw574ahqndpj7tg57vvk39sl872ua9u5j7csdqqcqzpgxqy9gcqk9ntjz7kax8tnxexsp4685uwnezl7h0uhduz4xef0hppa49nawv5f55n7qyv5r204gq4lq2zyxwftx2q2czulejjg0p709tpmmxwa8sq3arma0"

  // try {
  //   const addInvoiceResp = await lnRpcClient.addInvoice({ value: 10000 })
  //   console.log("addInvoiceResp:", addInvoiceResp)
  // } catch (err) {
  //   console.error(err)
  // }

  // try {
  //   const sendPaymentResp = await lnRpcClient.sendPayment({ amt: 10000, payment_request: paymentRequest })
  //   console.log("sendPaymentResp:", sendPaymentResp)
  // } catch (err) {
  //   console.error(err)
  // }

})()
