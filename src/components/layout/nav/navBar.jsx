import React, { Component } from "react";
import "./user.css";
import "./../../../styles/common.css";
import { LOGOUT } from "../../../events/definitions";
import defaultImages from "../../../imgs/placeholders";
import { Link, Redirect } from "react-router-dom";
import socket from "../../socket";
import GetLayout from "../../modules/getLayout";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logout = () => {
    localStorage.removeItem("token");
    socket.emit(LOGOUT);
    this.setState({ redirect: true });
  };

  renderLogo = () => {
    return (
      <GetLayout
        renderMobile={this.handleLogoMobile}
        renderDesktop={this.handleLogoDesktop}
      />
    );
  };

  handleLogoDesktop = () => {
    return (
      <div className="logo-container">
        <img className="logo" alt="" src={defaultImages.remoLogo} />
      </div>
    );
  };

  handleLogoMobile = () => {
    return (
      <div className="logo-container-mobile">
        <img className="mobile-logo" alt="" src={defaultImages.appIcon} />
      </div>
    );
  };

  handleBurger = () => {
    return <div className="burger-container"> B </div>;
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/login" />
    ) : (
      <div className="nav-container">
        <Link to="/">{<GetLayout renderMobile={this.handleBurger} />}</Link>
        <Link to="/"> {this.renderLogo()}</Link>

        <div className="user-container">
          <div className="user">
            {this.props.user.username}{" "}
            <button className="user-logout btn" onClick={this.logout}>
              logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
