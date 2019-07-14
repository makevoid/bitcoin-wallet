# 3itcoin-wallet

TODO: get the finished frontend code from https://github.com/makevoid/xdai-wallet

### Bitcoin Lightning Network wallet

First iteration for a crypto wallet, coin backend, bitcoin (of course :D), lightning network version (LN is a layer 2 protocol for fast instant transfer).

Currently in alpha status, exploring:

- html5 generation via haml (this branch) / pug (possible option)
- html5 customelements (preferred option)
- svelte or riot.js (nice options, learn svelte or reuse riot.js boilerplate - extract from: https://github.com/appliedblockchain/appii_ui-old/tree/master/comp)

It should be easy (now that I have a LN [lnd] node fully synced and working to test the BTC version), but I would like to reuse the UI to do another payment oriented wallet which may come first than the bitcoin LN one.

### Coin backends

It would be nice to have one wallet for each of this options, I should complete #1 and #3 thou before starting all 6+ (I haven't listed doge but it's too :much-wow: to not attempt it :D).

- 1 ) BTC - Lightning (L2) - STARTED - UI code taken from https://github.com/xdai-wallet (cordova, android+browser) - https://github.com/bitcoin-keychain (which uses https://github.com/makevoid/eth-keychain)
- 2 ) BTC

<--- Development is at this stage (n3)

- 3 ) ETH - XDAI (L3..) (sort of "lightning", but if the authorities fail, or if dai fails, that's bad, byebye \*coins)
- 4 ) ETH - DAI (L3.)
- 5 ) BCH (L3)
- 6 ) ETH (L3)
- 7 ) Doge (L3)


### Wallet Feature Baseline

show mnemonic, no screenshot, use 12 words, verify 40% of the words

no email, no bullshit

### LN

LN GRPC full node backend at the moment, even if there are 3 options:

- 1) grpc for full node (main option, desirable atm.)  
- 2) fully hosted using pk under https to auth
- 3) hybrid (neutrino? will have to investigate)

### <3itcoin

xDai ETH backed, this is nice as it's a stablecoin, but of course

also it's a mobile wallet, you shouldn't have a lot of coins in a mobile wallet to begin with (unless it's a secured, always off, no-simcard, wifi-shielded airgapped android phone you put in a safe or something..., a laptop with a minimal linux distro and a wifi hardware switch for a airgapped full node is a better solution usually than current gen mobiles)

### $$

Wallet "business model":

- App to pay people for when other payments don't work (easiest example, to split a bill)
- This is to drive bitcoin adoption
- In case of xDai or BCH or other wallets, always offer an in app popup to download the Bitcoin / Bitcoin LN version and point to a crypto to crypto exchange to exchange the lesser secure coins to BTC (the exchange should not force KYC, so no shapeshift unfortunately anymore :/)

### User (demo) "flow"

- User A and B meet in person, they have both an android phone with the app installed
- User A - Wants to receive a payment from user B (let's say they went to a restaurant where User B paid, and User A wants to "split the bill" with B)
- User A - Opens the wallet app, goes to the Receive screen, taps the QR code which gets magnified, and optionally specifies an amount and a label (The QR code shows the LN invoice or a normal BTC/\*coin address / \*URL)
- User B - Opens his/hers wallet app, scans the receiving QR code of User B and confirms a payment

...some seconds later...

- User A and B - Check transaction list, the transaction is shown with all the details, user taps [view in explorer] selects a block explorer and sees the transaction

---

Wish me luck for the build,

hope to get something into some real users hands soon!

@makevoid
