import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  Card,
  CardContent,
  Grid, Tooltip,
  Typography
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const useStyles = () => ({
  card: {
    backgroundColor: '#f1f1f1'
  },
  sender: {
    fontSize: '10px',
    wordBreak: 'break-all'
  },
  senderLabel: {
    fontSize: '11px'
  },
  message: {
    fontSize: '18px'
  },
  creationDate: {
    fontSize: '12px',
    textAlign: 'left',
    marginTop: '4px',
    marginLeft: '10px'
  },
  answerForm: {
    marginTop: '-10px'
  },
  round: {
    display: 'inline',
    verticalAlign: 'super'
  },
})

class Answer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props
    return <div>
      <br/>
      {this.props.message.answers.map((answer) => {
        return <Grid container>
          <Grid item xs={1}/>
          <Grid item xs={10}>
            <Card variant="outlined" className={classes.card}>
              <CardContent>
                <Typography color="textSecondary"
                            className={classes.senderLabel}
                            gutterBottom>
                  Sender:
                </Typography>
                <Typography color="textSecondary" className={classes.sender}
                            gutterBottom>
                  {answer.sender}
                </Typography>
                <Typography variant="h5" component="h2"
                            className={classes.message}>
                  {answer.message}
                </Typography>
                <br/>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography color="textSecondary"
                                className={classes.creationDate}>
                      <Tooltip title={"Sent in this round"}>
                      <span>
                        <Box style={{display: 'inline'}}><AccessTimeIcon
                            fontSize={"small"}/></Box>
                        <Box
                            className={classes.round}> {answer.confirmedRound}</Box>
                      </span>
                      </Tooltip>

                    </Typography>

                  </Grid>
                  <Grid item xs={2}>
                    <Tooltip title={"AgorHash spent to send this answer"}>
                      <Typography color="textSecondary">
                        <Box style={{display: 'inline'}}>{answer.amount} </Box>
                        <Box style={{
                          fontSize: '10px',
                          display: 'inline'
                        }}>AgorHash</Box>
                      </Typography>
                    </Tooltip>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      })}
    </div>
  }

}

export default withStyles(useStyles)(Answer)