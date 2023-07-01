import React, { Component } from "react";
import style from './Empty.module.css'

class Empty extends Component {
  render() {
    return (
      <div className={ style.empty }>
        <h2>Lo sentimos, no se encontraron recetas para la búsqueda realizada</h2>
      </div>
    )
  };
};

export default Empty;