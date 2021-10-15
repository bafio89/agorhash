import * as React from "react";
import TextField from "@material-ui/core/TextField";
import {
  Box,
  Button,
  Card, CardActions,
  CardContent, Divider,
  FormControl,
  Grid,
  Select
} from "@material-ui/core";
import algosdk from 'algosdk';
import PreviousMessages from "./PreviousMessages";
import {Alert} from "@material-ui/lab";
import TransactionHelper from "./TransacionHelper";
import Typography from "@material-ui/core/Typography";
import Support from "./Support";
import withStyles from "@material-ui/core/styles/withStyles";
import Optin from "./Optin";

const useStyles = () => ({

  messageDivider: {
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px'
}
})

class MessageForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errorMessage: false,
      amount: 0,
      errorAmount: false,
      algoAmount: 5,
      errorAlgoAmount: false,
      alert: {display: 'none', text: '', severity: ''},
      amountAlert: {display: 'none', text: '', severity: ''},
      selectedNet: 'Main Net',
      filterValue: ''
    }

    this.handleMessage = this.handleMessage.bind(this)
    this.handleFilterValue = this.handleFilterValue.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleErrorResponse = this.handleErrorResponse.bind(this)
    this.handleOkResponse = this.handleOkResponse.bind(this)
    this.handleNetChange = this.handleNetChange.bind(this)
  }

  handleMessage(event) {
    this.setState({message: event.target.value})
    this.setState({errorMessage: false})
  }

  handleFilterValue(event) {
    this.setState({filterValue: event.target.value})
  }

  handleAmount(event) {
    this.setState({amount: event.target.value})
    this.setState({errorAmount: false})
  }

  validateParams() {
    if (this.state.message === '') {
      this.setState({errorMessage: true})
      return false
    }
    if (isNaN(this.state.amount)) {
      this.setState({errorAmount: true})
      return false
    }

    return true
  }

  async sendMessage() {

    if (this.validateParams()) {

      let encoder = new TextEncoder();

      let transactionHelper = new TransactionHelper(this.state.selectedNet);

      let transaction = await transactionHelper.buildTransaction(
          Number.parseInt(this.state.amount),
          encoder.encode(this.state.message)
      )

      try {
        await transactionHelper.sendTransaction(transaction);
        this.handleOkResponse()

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 7000)

      } catch (error) {
        this.handleErrorResponse(error)
      }
    }
  }

  handleOkResponse() {

    this.setState({
      alert: {
        display: 'flex',
        text: 'Success! Transaction sent correctly',
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

  handleNetChange(event) {
    this.setState({selectedNet: event.target.value})
  }

  render() {
    const {classes} = this.props
    return <div style={{textAlign: 'center'}}>
      <Grid container>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <Typography align={'center'} style={{marginTop: '15px'}}
                      variant="h2" fontWeight="fontWeightBold">
            <Box fontWeight="fontWeightBold">
              AgorHash
            </Box>
          </Typography>
          <Typography align={'center'} style={{marginTop: '5px'}} variant="h5">
            <Box style={{display: 'inline'}}>Public, permissionless, decentralized and uncensorable free speech protocol</Box>
          </Typography>
          <br/>
          <br/>
          <Typography align={'center'} variant="h5">Join AgorHash
            sending your first message!</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align={'center'} variant="h6">Main Net</Typography>
          <FormControl style={{display: 'none'}}>
            <Select
                native
                value={this.state.selectedNet}
                inputProps={{
                  name: 'age',
                  id: 'age-native-simple',
                }}
                onChange={this.handleNetChange}
            >
              <option value={'Test Net'}>Test Net</option>
              <option value={'Main Net'}>Main Net</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br/>
      <Grid container>
        <Grid item xs={4}/>
        <Grid item xs={4}>
          <div style={{backgroundColor: '#f7f7f7', borderStyle:'solid', borderWidth:'1px', borderColor:'#bfbebe'}}>
            <TextField
                id="message" label="Write your message here"
                error={this.state.errorMessage}
                multiline
                variant="outlined"
                rows={4}
                value={this.state.message || ''}
                onChange={this.handleMessage}
                style={{display: 'flex', borderStyle:'none', marginTop:'15px', marginLeft:'15px', marginRight:'15px'}}
            />
            <br/>
            <br/>
            <Divider className={classes.messageDivider}/>
            <Grid container>
              <Grid item xs={4}/>
              <Grid item xs={3}/>
              <Grid item xs={5}>
                <TextField
                    id="amount" label="Say it louder!"
                    error={this.state.errorAmount}
                    multiline
                    value={this.state.amount || 0}
                    onChange={this.handleAmount}
                    style={{width: '100px'}}
                />
                <Button variant="contained"
                        color="primary"
                        style={{marginLeft: '15px', marginTop: '10px'}}
                        onChange={this.handleMessage}
                        onClick={this.sendMessage}>Send</Button>
              </Grid>
            </Grid>
            <br/>
            <Alert style={{display: this.state.alert.display}}
                   severity={this.state.alert.severity}>{this.state.alert.text}</Alert>
          </div>
          <br/>
          <br/>

          <TextField
              id="message" label="Filter messages by address"
              multiline
              variant="outlined"
              value={this.state.filterValue || ''}
              onChange={this.handleFilterValue}
              style={{display: 'flex', marginBottom: '10px'}}
          />

          <PreviousMessages selectedNet={this.state.selectedNet}
                            addressFilter={this.state.filterValue}/>
        </Grid>
        <br/>
        <Grid item xs={4}/>
      </Grid>
    </div>
  }
}

export default withStyles(useStyles)(MessageForm)