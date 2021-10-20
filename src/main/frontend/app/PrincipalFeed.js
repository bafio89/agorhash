import * as React from "react";
import MessageForm from "./MessageForm";

class PrincipalFeed extends React.Component {

  render() {

    if (window.matchMedia("all and (max-width: 667px)").matches) {
      return <MessageForm mobileView={true}/>
    } else {
      return <MessageForm mobileView={false}/>
    }
  }
}

export default PrincipalFeed