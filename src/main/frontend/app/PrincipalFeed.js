import * as React from "react";
import MessageForm from "./MessageForm";

class PrincipalFeed extends React.Component {

  render() {

    if (window.matchMedia("all and (max-width: 667px)").matches) {
      return <MessageForm externalColumnWidth={0} centralColumnWidth={12}/>
    } else {
      return <MessageForm externalColumnWidth={4} centralColumnWidth={4}/>
    }
  }
}

export default PrincipalFeed