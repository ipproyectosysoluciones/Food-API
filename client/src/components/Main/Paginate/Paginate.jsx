import React, { Component } from "react";
import style from './Paginate.module.css';
import MainPaginate from "./MainPaginate/MainPaginate";
import Side from "./Side/Side";

class Paginate extends Component {
  render() {
    return(
      <div className={ style.paginate }>
        <Side/>
        <MainPaginate/>
      </div>
    )
  };
};

export default Paginate;