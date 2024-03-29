import * as React from "react";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
});

class MenuBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {classes: ''}
  }


  render() {
    const {classes} = this.props;
    return <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <a href={'/'} style={{'textDecoration': 'none', 'color':'white', 'display':'contents'}}>
            <Typography variant="h6" className={classes.title}>
              AgorHash
            </Typography>
          </a>
          <Button color="inherit" href={"#/about"}>How it works</Button>
          <Button color="inherit" href={"#/collaborate"}>Collaborate</Button>
        </Toolbar>
      </AppBar>
    </div>
  }

}

export default withStyles(useStyles)(MenuBar);