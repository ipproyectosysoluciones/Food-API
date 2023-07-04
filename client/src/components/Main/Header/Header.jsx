import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { getRecipesByName, getRecipesBackend, resetRecipes } from '../../../redux/actions.js'


class Header extends Component {

  constructor( props ) {
    super( props );
    this.state = {
        inputValue: "",
    }
  };

  changeHandler = ( event ) => {
    this.setState({
      ...this.state,
      imputValue: event.target.value,
    });
  };

  searchSubmit = ( event ) => {
    event.preventDefault();

    if ( !!this.state.inputValue ) {
      this.props.getRicipeById( this.state.inputValue );
      this.history.push( '/recipes' );
    }
  };

  returnHome = ( event ) => {
    event.preventDefault();

    ( this.props.newRecipeCreate ) 
    ? this.props.getRecipesBackend() 
    : this.props.resetRecipes();

    this.history.push( '/' );
  };

  returnPaginate = ( event ) => {
    event.preventDefault();

    ( this.props.newRecipeCreate ) 
    ? this.props.getRecipesBackend() 
    : this.props.resetRecipes();

    this.props.history.push( '/recipes' );
  };
  
  render() {
    return (
      <div className={ style.header }>
        <img onClick={ this.returnHome } className={ style.logo } src="https://i.postimg.cc/Z5J2PQ9Y/Henry-PI-logo-2-free-file.png" alt="logo" />
        <div className={ style.inputsContainer }>
        {
          ( this.props.location.pathname === '/recipes/create' ) 
          ? <button 
              onClick={ this.returnPaginate } 
              className={ style.buttonCreate }
            >Volver
            </button> 
          : (
              <>
                <NavLink style={ { textDecoration: 'none' } } to='/recipes/create'>
                  <button className={ style.buttonCreate }>Crear Receta</button>
                </NavLink>
                <form 
                  onSubmit={ this.searchSubmit } 
                  className={ style.search }
                >
                  <input 
                    type='text' 
                    value={this.state.inputValue} 
                    onChange={ this.changeHandler }
                  />
                  <input 
                    className={ style.buttonCreate } 
                    value={ 'Buscar' } 
                    type='submit' 
                  />
                </form>
              </>
            )
          }
        </div>
      </div>
    );
  };
};

const mapStateToProps = ( state ) => {
  return { newRecipeCreate: state.newRecipeCreate };
};

const mapDispatchToProps = ( dispatch ) => ({
  getRecipesByName: ( name ) => dispatch( getRecipesByName( name ) ),
  resetRecipes: () => dispatch( resetRecipes() ),
  getRecipesBackend: () => dispatch( getRecipesBackend() ),
});

export default connect( mapStateToProps, mapDispatchToProps )(Header);