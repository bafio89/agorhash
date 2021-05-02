import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Button, Grid} from "@material-ui/core";
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

    this.state = {
      alert: {display: 'none', text: '', severity: ''}
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
        <Grid item xs={4}/>
        <Grid item xs={4}>
          <Typography align={'center'} variant="h5">Opt-In AgorHash's ASA and
            start
            sharing your thoughts!</Typography>
          <br/>
          <Button variant="contained"
                  color="primary"
                  className={classes.optinButton}
                  onClick={this.sendOptinTransaction}>Join</Button>
          <br/>
          <br/>
          <Alert style={{display: this.state.alert.display}}
                 severity={this.state.alert.severity}>{this.state.alert.text}</Alert>
        </Grid>
        <Grid item xs={4}/>
      </Grid>

    </div>
  }
}

export default withStyles(useStyles)(Optin)