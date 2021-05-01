import * as React from "react";
import TransactionHelper from "./TransacionHelper";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Alert} from "@material-ui/lab";

class Support extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      algoAmount: 5,
      message: '',
      errorAlgoAmount: false,
      amountAlert: {display: 'none', text: '', severity: ''}
    }
    this.sendAlgo = this.sendAlgo.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleAlgoAmount = this.handleAlgoAmount.bind(this)
  }

  handleAlgoAmount(event) {
    this.setState({algoAmount: event.target.value})
  }

  handleMessage(event) {
    this.setState({message: event.target.value})
    this.setState({errorMessage: false})
  }

  validateAlgoParams() {
    if (isNaN(this.state.algoAmount)) {
      this.setState({errorAlgoAmount: true})
      return false
    }
    return true
  }

  handleAmountOkResponse() {

    this.setState({
      amountAlert: {
        display: 'flex',
        text: 'Success! Transaction sent correctly',
        severity: 'success'
      }
    })
  }

  handleAmountErrorResponse(response) {
    this.setState({
      amountAlert: {
        display: 'flex',
        text: 'Something goes wrong! ' + response.message,
        severity: 'error'
      }
    })
  }

  async sendAlgo() {

    let transactionHelper = new TransactionHelper(this.props.net);
    let encoder = new TextEncoder();

    if (this.validateAlgoParams()) {
      let transaction = await transactionHelper.buildAlgoTransaction(
          Number.parseFloat(this.state.algoAmount),
          encoder.encode(this.state.message)
      )

      try {
        await transactionHelper.sendTransaction(transaction);
        this.handleAmountOkResponse()
      } catch (error) {
        this.handleAmountErrorResponse(error)
      }
    }
  }

  render() {
    return <div>
      <Card style={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#bfbfbf',
        textAlign: 'center'
      }}>
        <CardContent>
          <Typography>
            <Box fontWeight="fontWeightBold"> Support us sending Algos </Box>
          </Typography>
          <TextField
              id="algoAmount" label={"Algo amount"}
              error={this.state.errorAlgoAmount}
              multiline
              value={this.state.algoAmount || 5}
              onChange={this.handleAlgoAmount}
              style={{marginTop: '15px'}}
          />
          <TextField
              id="message" label="Leave a message to the authors"
              error={this.state.errorMessage}
              multiline
              variant="outlined"
              rows={2}
              value={this.state.message || ''}
              onChange={this.handleMessage}
              style={{display: 'flex', marginTop: '15px'}}
              inputProps={{
                maxlength: 60
              }}
          />
          <CardActions style={{display: 'block', marginTop:'15px'}}>
            <Button size="small" color="primary" variant="contained"
                    onClick={this.sendAlgo}>Support us!</Button>
          </CardActions>
          <Alert style={{display: this.state.amountAlert.display}}
                 severity={this.state.amountAlert.severity}>{this.state.amountAlert.text}</Alert>
        </CardContent>
      </Card>
    </div>
  }

}

export default Support