Actions = {}

Actions.displaySendAddressMissingError = () => {
  errToast("Please specify the recipient address")
}

Actions.displaySendAmountMissingError = () => {
  errToast("Please specify the amount of the transaction")
}

Actions.updateBalance = async () => {
  await window.app.updateBalance()
  msgToastQuick("Balance refreshed!")
}

// TODO:
Actions.send = async ({ address, amount }) => {
  console.log("SEND", { address, amount })
  const to  = address
  let value = amount
  if (!address) return Actions.displaySendAddressMissingError()
  if (!amount)  return Actions.displaySendAmountMissingError()
  if (!isEthAddress(address)) return Actions.displaySendError()
  value = usdCentsToXDaiWeis(value)
  msgToast("sending transaction...")
  console.log(`Actions.send() -> ${JSON.stringify({ to, value })}`)
  const txID = await window.app.keychain.send({ to, value })
  console.log("TX ID:", txID)
  msgToast(`transaction sent! 0x${txID.slice(0, 6)}...`)
}
