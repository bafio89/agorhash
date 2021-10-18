import * as React from "react";
import {Box, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MenuBar from "./MenuBar";
import Support from "./Support";

const ReactMarkdown = require('react-markdown')

const about = '# AgorHash, a cryptographic decentralised [agora](https://en.wikipedia.org/wiki/Agora).\n'
    + '\n'
    + 'AgorHash is a **public, permissionless, decentralized and uncensorable free speech protocol**.\n'
    + '\n'
    + 'Everyone is welcome to express herself/himself on AgorHash and nobody can prevent somebody else from showing up and speak into AgorHash.\n'
    + '\n'
    + 'Thoughts shared on AgorHash are **permanently** stored on [Algorand blockchain](https://algorand.foundation/). AgorHash is built from scratches pursuing decentralization and avoiding single point of censorship. **AgorHash source-code is and will always be open-source.**\n'
    + '\n'
    + 'AgorHash is meant to be a **free speech protocol**: its UI, in fact, just makes easier to express yourself in the permissionless cyber [agora](https://en.wikipedia.org/wiki/Agora), but is not the unique way to do that. Since **decentralizion is the foundation** of AgorHash Protocol, **anyone can speak directly from an Algorand node or wallet**, so that peoples are not prone to AgorHash UI in any way.\n'
    + '\n'
    + '**AgorHash Protocol** relies on Algorand blockchain as **single immutable source of truth**, so that **anyone can deploy the UI** without loosing **data consistency and integrity**.\n'
    + '\n'
    + '**No central authority may stop people\'s speech on AgorHash**: as long as you have access to the Internet and your private key, you will be able to share your thoughts in the public, permissionless and decentralized cyber agora.\n'
    + '\n'
    + '## AgorHash Protocol\n'
    + '\n'
    + 'AgorHash Protocol aims to protect freedom of speech, organising thoughts and promoting thinkers\' visibility through AGORHASH Algorand Standard Asset.\n'
    + '\n'
    + '**There are only 42B indivisible [AGORHASH](https://algoexplorer.io/asset/196447496).**\n'
    + '\n'
    + 'AgorHash Protocol is trivial: speaking into the public, permissionless and decentralized cyber agora means **issuing AGORASH transactions with a note field to [AGORHASH Reserve Address](https://algoexplorer.io/address/BCRGQU4BFMMMTO4YADFPAO3WKZPE2VZILXFCPYOHFGVZRGWFOMC3BB4UPQ)**. The cryptographic decentralised agora is permissionless and open: you only need to Opt-In AgorHash ASA and issue transactions of 0 AGORHASH writing a message into transaction\'s note filed.\n'
    + '\n'
    + 'AgorHash Protocol has been built in such a way that you are not prone to AgorHash UI client side deployment to express yourself. AgorHash UI, in fact, is just a tool that facilitates retrieving and visualising messages shared through the AgorHash Protocol.\n'
    + '\n'
    + 'You can share thoughts on AgorHash **from any Algorand wallet that supports note field**, such as an [Algorand Node](https://developer.algorand.org/docs/run-a-node/setup/install/), the [Algorand Mobile Wallet](https://algorandwallet.com/), [AlgoSigner](https://www.purestake.com/technology/algosigner/) or [MyAlgo Wallet](https://wallet.myalgo.com/home), following the protocol\'s rules:\n'
    + '\n'
    + '#### Share thoughts:\n'
    + '\n'
    + '1. Opt-In [AgorHash ASA](https://algoexplorer.io/asset/196447496) from your favorite wallet;\n'
    + '2. Send a transaction of 0 AGORHASH to AgorHash Reserve Address, writing your message in the note field.\n'
    + '\n'
    + '#### Reply to a message:\n'
    + '\n'
    + 'AgorHash Protocol **uniquely identifies messages by transaction\'s ID**. To reply to a specific message on AgorHash you just need to include the transaction ID in square brackets as note field prefix.\n'
    + '\n'
    + 'For example: if you want to reply to [this message on TestNet](https://testnet.algoexplorer.io/tx/7IDT26NFHUCBOCGUUCXOSFXYXFJC6GVAQBMIRV7LLVSFEGOP64IA) you just need to begin your AgorHash reply transaction note field with: `[7IDT26NFHUCBOCGUUCXOSFXYXFJC6GVAQBMIRV7LLVSFEGOP64IA]`.\n'
    + '\n'
    + '### Say it lauder!\n'
    + '\n'
    + 'While you do not need to own AgorHash to be able to speak, you may give your thoughts more visibility.\n'
    + '\n'
    + 'AgorHash UI sorts speeches on 2 different levels:\n'
    + '\n'
    + '1. Speeches are first sorted by AGORHASH transactions amounts;\n'
    + '2. Speeches with equal amounts of AGORHASH are then sorted by block;\n'
    + '\n'
    + 'If you want to support authors you can click on **AGORHUG button**, sending them 1 AGORHASH.\n'
    + '\n'
    + 'AgorHash Protocol has been shaped keeping AGORHASH ASA Manager Address, Freeze Address and Clawback Address alive, just because we will carefully evaluate how to transfer them to an orchestration of Algorand Smart Contracts or delete them according to the project\'s evolution.\n'
    + '\n'
    + 'Since we are not able to foresee how fare AgorHash Protocol will evolve, the initial distribution of AgorHash ASA will follow a simple airdrop approach to drive adoption, interest and community engagement. Once AgorHash Protocol adoption grows, AGORHASH Reserve Address will then be assigned to an orchestration of Algorand Smart Contracts that will define AGORHASH dynamics into the ecosystem.\n'
    + '\n'

class About extends React.Component {

  constructor(props) {
    super(props);

    let externalColumnWidth = 3;
    let centralColumnWidth = 6;
    if (window.matchMedia("all and (max-width: 667px)").matches) {
      externalColumnWidth = 1
      centralColumnWidth = 10
    }

    this.state = {
      externalColumnWidth: externalColumnWidth,
      centralColumnWidth: centralColumnWidth
    }
  }

  render() {
    return <div><MenuBar/>
      <div style={{textAlign: 'left', fontFamily: 'Helvetica'}}>
        <Grid container>
          <Grid item xs={this.state.externalColumnWidth}/>
          <Grid item xs={this.state.centralColumnWidth}>
            <ReactMarkdown children={about}/>
          </Grid>
          <Grid item xs={this.state.externalColumnWidth}/>
        </Grid>
      </div>
    </div>
  }
}

export default About