import React, { Component } from "react";
import { connect } from "react-redux";
import style from './MainPaginate.module.css';
import Buttons from './Buttons/Buttons.jsx';
import Cards from './Cards/Cards.jsx';
import Empty from './Empty/Empty.jsx';

class MainPaginate extends Component {
  render() {
    return (
      <div className={ style.main }>
        <Buttons/>
          {
            !this.props.allRecipes.length ? <Empty /> : <Cards />
          }
        <Buttons/>
      </div>
    )
  };
};

const mapStateToProps = ( state ) => ({ allRecipes: state.allRecipes });

export default connect( mapStateToProps )( MainPaginate );