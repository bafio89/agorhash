import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from 'algosdk';

const testNetAssetIndex = 15372981;
const mainNetAssetIndex = 196447496;

const testNetReserveAddress = "77B45T45DBC7CR4XHWVFD5QO4FNSP2UGIXCF7UVBCX4WO6FDGGNHR3U7NA";
const mainNetReserveAddress = "BCRGQU4BFMMMTO4YADFPAO3WKZPE2VZILXFCPYOHFGVZRGWFOMC3BB4UPQ";

const testNetToken = {
  'X-API-Key': 'INSERT HERE YOUR PURESTAKE API TOKEN'
}
const mainNetToken = {
  'X-API-Key': 'INSERT HERE YOUR PURESTAKE API TOKEN'
}

const testNetServer = 'https://testnet-algorand.api.purestake.io/ps2';
const mainNetServer = 'https://mainnet-algorand.api.purestake.io/ps2';

const testNetAlgodClient = new algosdk.Algodv2(testNetToken, testNetServer, '');
const mainNetAlgodClient = new algosdk.Algodv2(mainNetToken, mainNetServer, '');
const testNetString = 'Test Net'

const myAlgoWallet = new MyAlgoConnect();

export default class TransactionHelper {

  constructor(selectedNet) {
    this.reserveAddress = selectedNet === testNetString ? testNetReserveAddress : mainNetReserveAddress
    this.assetIndex = selectedNet === testNetString ? testNetAssetIndex : mainNetAssetIndex
    this.algodClient = selectedNet === testNetString ? testNetAlgodClient : mainNetAlgodClient;
    this.algodClient = selectedNet === testNetString ? testNetAlgodClient : mainNetAlgodClient;
  }

  async buildTransaction(amount, message = undefined,
      transactionType = 'assetTransfer', to = '') {

    let accounts = await myAlgoWallet.connect();
    let params = await this.getBlockchainParams();

    let toAddress;
    switch (transactionType) {
      case 'assetTransfer' :
        toAddress = this.reserveAddress
        break;
      case 'optin':
        toAddress = accounts[0].address
        break;
      case 'hug':
        toAddress = to
        break;
    }
    console.log(toAddress)

    return {
      fee: params.fee,
      type: 'axfer',
      from: accounts[0].address,
      to: toAddress,
      amount: amount,
      firstRound: params.firstRound,
      lastRound: params.lastRound,
      genesisHash: params.genesisHash,
      genesisID: params.genesisID,
      note: message,
      assetIndex: this.assetIndex
    }
  }
  async buildAlgoTransaction(amount, message) {

    let accounts = await myAlgoWallet.connect();
    let params = await this.getBlockchainParams();

    return {
      fee: params.fee,
      type: 'pay',
      from: accounts[0].address,
      to: this.reserveAddress,
      amount: amount * 1000000,
      firstRound: params.firstRound,
      lastRound: params.lastRound,
      genesisHash: params.genesisHash,
      genesisID: params.genesisID,
      note: message
    }
  }

  async getBlockchainParams() {
    return  this.algodClient.getTransactionParams().do()
  }

  async sendTransaction(transaction) {

    let signedTransaction = await myAlgoWallet.signTransaction(transaction);

    return await this.algodClient.sendRawTransaction(
        signedTransaction.blob).do()
  }
}