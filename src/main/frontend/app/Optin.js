import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Button, Grid, Tooltip} from "@material-ui/core";
import TransactionHelper from "./TransacionHelper";
import {Alert} from "@material-ui/lab";

const useStyles = () => ({
  optinButton: {
    display: 'inline-block'
  }
})

class Optin extends React.Component {

  constructor(props) {
    super(props);

    let externalColumnWidth = 4;
    let firstCentralColumnWidth = 3;
    let secondCentralColumnWidth = 1;

    if (props.mobileView === true) {
      externalColumnWidth = 0;
      firstCentralColumnWidth = 11;
      secondCentralColumnWidth = 1;
    }

    this.state = {
      alert: {display: 'none', text: '', severity: ''},
      externalColumnWidth: externalColumnWidth,
      firstCentralColumnWidth: firstCentralColumnWidth,
      secondCentralColumnWidth: secondCentralColumnWidth
    }

    this.sendOptinTransaction = this.sendOptinTransaction.bind(this)
  }

  async sendOptinTransaction() {

    let transactionHelper = new TransactionHelper(this.props.selectedNet)

    let transaction = await transactionHelper.buildTransaction(0, undefined,
        'optin')

    try {
      await transactionHelper.sendTransaction(transaction);
      this.handleOkResponse()
    } catch (error) {
      this.handleErrorResponse(error)
    }
  }

  handleOkResponse() {

    this.setState({
      alert: {
        display: 'flex',
        text: 'Success! You joined correctly',
        severity: 'success'
      }
    })
  }

  handleErrorResponse(response) {
    this.setState({
      alert: {
        display: 'flex',
        text: 'Something goes wrong! ' + response.message,
        severity: 'error'
      }
    })
  }

  render() {
    const {classes} = this.props

    return <div>
      <Grid container>
        <Grid item xs={this.state.externalColumnWidth}/>
        <Grid item xs={this.state.firstCentralColumnWidth}>
          <Typography align={'center'} variant="h5">Optin to AgorHash
            asset</Typography>
        </Grid>
        <Grid item xs={this.state.secondCentralColumnWidth} alignContent={'center'}>
          <Tooltip title={"Opt-In AgorHash's ASA"}>
            <Button style={{marginRight: '70px'}} variant="contained"
                    color="primary"
                    className={classes.optinButton}
                    onClick={this.sendOptinTransaction}>Join</Button>
          </Tooltip>
          <br/>
          <br/>
          <Alert style={{display: this.state.alert.display}}
                 severity={this.state.alert.severity}>{this.state.alert.text}</Alert>
        </Grid>
        <Grid item xs={this.state.externalColumnWidth}/>
      </Grid>

    </div>
  }
}

export default withStyles(useStyles)(Optin)