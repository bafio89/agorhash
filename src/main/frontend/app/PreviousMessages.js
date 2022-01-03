import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent, Divider,
  Grid, Tooltip,
  Typography
} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TransactionHelper from "./TransacionHelper";
import Answer from "./Answer";
import {Alert} from "@material-ui/lab";

const useStyles = () => ({
  cardWithAnswer: {
    marginBottom: '10px',
    backgroundColor: '#f7f7f7'
  },
  card: {
    backgroundColor: '#f7f7f7',
    borderStyle: 'none',
  },
  sender: {
    fontSize: '11px',
    wordBreak: 'break-all'
  },
  senderLabel: {
    fontSize: '11px'
  },
  creationDate: {
    fontSize: '12px',
    textAlign: 'left',
    marginTop: '4px',
    marginLeft: '10px'
  },
  round: {
    display: 'inline',
    verticalAlign: 'super'
  },
  answerForm: {
    marginTop: '-10px'
  },
  sendAnswerButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '33px'
  },
  alertMessage: {
    display: 'flex',
    justifyContent: 'center'
  },
  alertHug: {
    display: 'flex',
    justifyContent: 'center'
  },
  answerBorder: {
    borderStyle: "solid",
    borderColor: "#d6d6d6",
    borderWidth: "1px",
    backgroundColor: '#f7f7f7'
  },
  amountForm: {
    display: 'flex',
    width: '100px',
    marginLeft: '30px'
  },
  messageDivider: {
    marginLeft: '53px',
    marginRight: '53px'
  }
})

class PreviousMessages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      answer: '',
      showAnswerForm: [],
      showAmountForm: [],
      errorFormAnswersVisibility: [],
      errorFormAmountVisibility: [],
      answersValues: [],
      amountsValues: [],
      initialAmountValue: 0,
      alert: {display: 'none', text: '', severity: ''},
      alertHug: {display: 'none', text: '', severity: ''},
      selectedNet: props.selectedNet,
      amount: 0,
      errorAmount: false
    }

    this.showAnswerForms = this.showAnswerForms.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
    this.handleErrorResponse = this.handleErrorResponse.bind(this)
    this.handleOkResponse = this.handleOkResponse.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.sendHug = this.sendHug.bind(this)

  }

  componentDidMount() {
    this.fetchTransactions()
  }

  fetchTransactions() {
    let net = '/testnet'
    if (this.props.selectedNet === 'Main Net') {
      net = '/mainnet'
    }

    fetch(net + "/transactions").then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          this.setState({
            messages: data,
          });
          this.setAnswerFormsVisibility();
          this.setAnswerFormsValue();
          this.setAlertErrorVisibility();
          this.setFormsErrorVisibility();
        }.bind(this));
      } else {
        throw new Error(response.status);
      }
    }.bind(this));
  }

  setAnswerFormsValue() {
    let temporaryAnswerValues = []
    let temporaryAmountValues = []
    this.state.messages.forEach(function (message) {
      temporaryAnswerValues[message.transaction.id] = ''
      temporaryAmountValues[message.transaction.id] = 0
    })
    this.setState({answerValues: temporaryAnswerValues})
    this.setState({amountsValues: temporaryAmountValues})
    console.log(temporaryAmountValues)
  }

  setAnswerFormsVisibility() {
    let answerForms = []
    let amountForms = []
    this.state.messages.forEach(function (message) {
          answerForms[message.transaction.id] = 'none'
          amountForms[message.transaction.id] = 'none'
        }
    )
    this.setState({showAnswerForm: answerForms})
    this.setState({showAmountForm: amountForms})
  }

  setAlertErrorVisibility() {
    let alertVisibility = []
    let alertHugVisibility = []
    this.state.messages.forEach(function (message) {
      alertVisibility[message.transaction.id] = {
        display: 'none',
        text: '',
        severity: ''
      }
      alertHugVisibility[message.transaction.id] = {
        display: 'none',
        text: '',
        severity: ''
      }
    })
    this.setState({alert: alertVisibility})
    this.setState({alertHug: alertHugVisibility})
  }

  setFormsErrorVisibility() {
    let errorFormAnswersVisibility = []
    let errorFormAmountVisibility = []
    this.state.messages.forEach(function (message) {
      errorFormAnswersVisibility[message.transaction.id] = false
      errorFormAmountVisibility[message.transaction.id] = false
    })

    this.setState({errorFormAnswersVisibility: errorFormAnswersVisibility})
    this.setState({errorFormAmountVisibility: errorFormAmountVisibility})
  }

  showAnswerForms(event) {
    let answerFormsVisibility = this.state.showAnswerForm
    let amountFormVisibility = this.state.showAmountForm
    answerFormsVisibility[event.target.parentElement.id] = 'flex'
    amountFormVisibility[event.target.parentElement.id] = 'flex'

    this.setState({showAnswerForm: answerFormsVisibility})
  }

  handleAnswer(event) {
    let answerValues = this.state.answersValues
    answerValues[event.target.id] = event.target.value
    this.setState({answerValues: answerValues})
  }

  handleAmount(event) {
    let amountValues = this.state.amountsValues
    amountValues[event.target.parentElement.children[0].getAttribute(
        'transactionid')] = event.target.value

    this.setState({amountsValues: amountValues})
  }

  async sendHug(event) {

    let transactionId = event.target.parentElement.id;
    let transactionHelper = new TransactionHelper(this.state.selectedNet)

    let transaction = await transactionHelper.buildTransaction(1, undefined,
        'hug', event.target.parentElement.getAttribute('sender'))

    try {
      await transactionHelper.sendTransaction(transaction)
      this.handleHugOkResponse(transactionId)
    } catch (error) {
      this.handleHugErrorResponse(transactionId, error)
    }
  }

  async submitAnswer(event) {

    let transactionId = event.target.parentElement.id;
    if (this.validateParams(transactionId)) {
      let encoder = new TextEncoder()

      let transactionHelper = new TransactionHelper(this.state.selectedNet)
      let message = encoder.encode(
          "[".concat(transactionId).concat("] ").concat(
              this.state.answerValues[transactionId]))

      let amount = Number.parseInt(this.state.amountsValues[transactionId]);
      let transaction = await transactionHelper.buildTransaction(amount,
          message);

      try {
        await transactionHelper.sendTransaction(transaction)
        this.handleOkResponse(transactionId)

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 7000)

      } catch (error) {
        this.handleErrorResponse(transactionId, error)
      }
    }
  }

  validateParams(transactionId) {
    if (this.state.answersValues[transactionId] === undefined) {
      let errorFormAnswersVisibility = this.state.errorFormAnswersVisibility
      errorFormAnswersVisibility[transactionId] = true
      this.setState({errorFormAnswersVisibility: errorFormAnswersVisibility})
      return false
    }
    console.log(transactionId)
    console.log(this.state.amountsValues[transactionId])
    if (isNaN(this.state.amountsValues[transactionId])) {

      let errorFormAmountVisibility = this.state.errorFormAmountVisibility
      errorFormAmountVisibility[transactionId] = true
      this.setState({errorFormAmountVisibility: errorFormAmountVisibility})
      return false
    }

    return true
  }

  handleOkResponse(transactionId) {

    let alertVisibilityValues = this.state.alert

    alertVisibilityValues[transactionId] = {
      display: 'flex',
      text: 'Success! Transaction sent correctly',
      severity: 'success'
    }

    this.setState({alert: alertVisibilityValues})
  }

  handleErrorResponse(transactionId, response) {
    let alertVisibilityValues = this.state.alert

    alertVisibilityValues[transactionId] = {
      display: 'flex',
      text: 'Something goes wrong! ' + response.message,
      severity: 'error'
    }

    this.setState({alert: alertVisibilityValues})
  }

  handleHugOkResponse(transactionId) {
    let alertVisibilityValues = this.state.alertHug

    alertVisibilityValues[transactionId] = {
      display: 'flex',
      text: 'Success! Hug sent correctly',
      severity: 'success'
    }

    this.setState({alertHug: alertVisibilityValues})
  }

  handleHugErrorResponse(transactionId, response) {
    let alertVisibilityValues = this.state.alertHug

    alertVisibilityValues[transactionId] = {
      display: 'flex',
      text: 'Something goes wrong! ' + response.message,
      severity: 'error'
    }

    this.setState({alertHug: alertVisibilityValues})
  }

  render() {
    const {classes} = this.props
    if (this.state.selectedNet !== undefined && this.state.selectedNet
        !== this.props.selectedNet) {
      this.setState({selectedNet: this.props.selectedNet})
      this.fetchTransactions()
    }

    return <div style={{textAlign: 'center'}}>
      <Grid container>
        <Grid item xs={0}/>
        <Grid item xs={12}>
          {this.state.messages.filter(
              (message) => this.props.addressFilter === ''
                  || message.transaction.sender === this.props.addressFilter)
          .map((message) => {

                return <div>
                  <div className={classes.answerBorder}>
                    <div className={classes.cardWithAnswer}>
                      <Card variant="outlined" className={classes.card}>
                        <CardContent>
                          <Typography color="textSecondary"
                                      className={classes.senderLabel}
                                      gutterBottom>
                            Sender:
                          </Typography>
                          <Typography color="textSecondary"
                                      className={classes.sender}
                                      gutterBottom>
                            {message.transaction.sender}
                          </Typography>
                          <Typography variant="h5" component="h2">
                            {message.transaction.message}
                          </Typography>
                          <br/>
                          <Grid container>
                            <Grid item xs={10}>
                              <Typography color="textSecondary"
                                          className={classes.creationDate}>
                                <Tooltip title={"Sent in this round"}>
                                <span>
                                  <Box
                                      style={{display: 'inline'}}><AccessTimeIcon
                                      fontSize={"small"}/></Box>
                                  <Box
                                      className={classes.round}> {message.transaction.confirmedRound}</Box>
                                </span>
                                </Tooltip>
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Tooltip
                                  title={"AgorHash spent to send this message"}>
                                <Typography color="textSecondary">
                                  <Box
                                      style={{display: 'inline'}}>{message.transaction.amount} </Box>
                                  <Box style={{
                                    fontSize: '13px',
                                    display: 'inline'
                                  }}>AgorHash</Box>
                                </Typography>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider className={classes.messageDivider}/>
                        <Grid container>
                          <Grid item xs={4}/>
                          <Grid item xs={4}>
                            <div className={classes.sendAnswerButton}>
                              <CardActions>
                                <Tooltip
                                    title={'Do you like this content? Support author sending 1 AgorHash'}>
                                  <Button id={message.transaction.id} size="small"
                                          sender={message.transaction.sender}
                                          color="primary"
                                          onClick={this.sendHug}
                                          style={{left: 0}}>AgorHug</Button>
                                </Tooltip>
                                <Button id={message.transaction.id} size="small"
                                        color="primary"
                                        onClick={this.showAnswerForms}>Reply</Button>
                              </CardActions>
                            </div>
                          </Grid>
                          <Grid item xs={4}/>
                        </Grid>
                        <div className={classes.alertHug}>
                          <Alert id={message.transaction.id}
                                 style={{
                                   marginBottom: '8px',
                                   display: this.state.alertHug[message.transaction.id]
                                   !== undefined
                                       ? this.state.alertHug[message.transaction.id].display
                                       : 'none'
                                 }}
                                 severity={this.state.alertHug[message.transaction.id]
                                 !== undefined
                                     ? this.state.alertHug[message.transaction.id].severity
                                     : ''}>
                            {this.state.alertHug[message.transaction.id]
                            !== undefined
                                ? this.state.alertHug[message.transaction.id].text
                                : ''}
                          </Alert>
                        </div>
                      </Card>
                      <Divider/>
                      <Answer message={message}/>
                    </div>
                    <Grid container style={{marginBottom: '10px', display:`${this.state.showAnswerForm[message.transaction.id]}`}}>
                      <Grid item xs={2}/>
                      <Grid item xs={8}>
                        <TextField
                            id={message.transaction.id}
                            label="Write your reply here"
                            error={this.state.errorFormAnswersVisibility[message.transaction.id]}
                            multiline
                            variant="outlined"
                            rows={2}
                            value={this.state.answersValues !== undefined
                                ? this.state.answersValues[message.transaction.id]
                                || ''
                                : ''}
                            onChange={this.handleAnswer}
                            style={{marginTop:'10px',
                              display: `${this.state.showAnswerForm[message.transaction.id]}`
                            }}
                            className={classes.answerForm}
                        />
                      </Grid>
                      <Grid item xs={2}/>
                    </Grid>
                    <Grid container style={{marginBottom: '10px', display:`${this.state.showAmountForm[message.transaction.id]}`}}>
                      <Grid item xs={5}/>
                      <Grid item xs={3}>
                        <div style={{marginTop: '15px'}}>
                          <Tooltip title={"Enter the amount of AgorHash token to send"}>
                          <TextField
                              id={"amount-" + message.transaction.id}
                              label="Say it louder!"
                              inputProps={{transactionid: message.transaction.id}}
                              error={this.state.errorFormAmountVisibility[message.transaction.id]}
                              multiline
                              value={this.state.amountsValues[message.transaction.id]}
                              onChange={this.handleAmount}
                              className={classes.amountForm}
                              style={{display: `${this.state.showAmountForm[message.transaction.id]}`}}
                          />
                          </Tooltip>
                        </div>
                      </Grid>
                      <Grid item xs={3} style={{display: 'flex'}}>
                        <div className={classes.sendAnswerButton}>
                          <Button id={message.transaction.id} size="small"
                                  color="primary"
                                  style={{
                                    display: `${this.state.showAnswerForm[message.transaction.id]}`
                                  }}
                                  onClick={this.submitAnswer}>Send
                            Reply</Button>
                        </div>
                      </Grid>
                      <Grid item xs={1}/>
                    </Grid>
                    <div className={classes.alertMessage}>
                      <Alert id={message.transaction.id}
                             style={{
                               marginTop: '15px', marginBottom: '15px',
                               display: this.state.alert[message.transaction.id]
                               !== undefined
                                   ? this.state.alert[message.transaction.id].display
                                   : 'none'
                             }}
                             severity={this.state.alert[message.transaction.id]
                             !== undefined
                                 ? this.state.alert[message.transaction.id].severity
                                 : ''}>
                        {this.state.alert[message.transaction.id] !== undefined
                            ? this.state.alert[message.transaction.id].text
                            : ''}
                      </Alert>
                    </div>
                  </div>
                  <br/>
                </div>
              }
          )}
        </Grid>
        <Grid item xs={0}/>
      </Grid>
    </div>
  }
}

export default withStyles(useStyles)(PreviousMessages)