import React from "react";
import MenuBar from "./MenuBar";
import MessageForm from "./MessageForm";

class Home extends React.Component {

  render() {
    return <div>
      <MenuBar/>
      <br/>
      <MessageForm/>
    </div>
  }
}

export default Home;