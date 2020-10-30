import React, { Component } from "react";
import './Preloader.scss';

export default class Preloader extends Component{
  render() {
    return (
      <div className={'preloader__root'}>
        <span>Loading...</span>
      </div>
    );
  }
}
