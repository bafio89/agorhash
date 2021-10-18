import * as React from "react";
import MenuBar from "./MenuBar";
import {Grid} from "@material-ui/core";
import Support from "./Support";

const ReactMarkdown = require('react-markdown')

const collaborate = '## Donate or Collaborate\n'
    + '\n'
    + 'AgorHash Protocol is a **no-profit open-source side-project**, built for free to protect freedom. AgorHash completely relies on community donations to sustain operational costs (web domain hosting, node\'s maintenance, etc).\n'
    + '\n'
    + 'AgorHash is and will always be a free, public, permissionless, decentralised and uncensorable protocol for free speech.\n'
    + '\n'
    + 'Keeping AgorHash a protocol of freedom is up to us all. You can contribute in two ways:\n'
    + '\n'
    + '1. Showing up and building: [AgorHash GitHub](https://github.com/bafio89/agorhash). We really think **AgorHash deserves a better UX**!\n'
    + '2. Tipping the project with ALGOs!\n'
    + '\n'
    + 'AgorHash project maintainers commit to notarize donations\' usage on-chain.\n'

class Collaborate extends React.Component {

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
            <ReactMarkdown children={collaborate}/>
            <br/>
            <Grid container>
              <Grid item xs={1}/>
              <Grid item xs={10}>
                <Support net={'Main net'}/>
                <Grid item xs={1}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={this.state.externalColumnWidth}/>
        </Grid>

      </div>
      <br/>
      <br/>
    </div>
  }
}

export default Collaborate