import React from "react";
import MenuBar from "./MenuBar";
import PrincipalFeed from "./PrincipalFeed";

class Home extends React.Component {

  render() {
    return <div>
      <MenuBar/>
      <br/>
      <PrincipalFeed/>
    </div>
  }
}

export default Home;