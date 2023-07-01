import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previousPage, changePage, nextPage } from '../../../../../redux/actions';


const Button = ( { name } ) => {
  const dispatch = useDispatch();
  const { page, countRecipes } = useSelector( state => state );

  const onClickButton = ( event ) => {
    if ( event.target.name === '<') {
      return ( page === 1 ) ? null : dispatch( previousPage() );
    } else if ( event.target.name === '>' ) {
      return ( page === ( Math.ceil( countRecipes/9 ))) ? null : dispatch( nextPage() );
    } else if ( page !== parseInt( event.target.name ) ) {
      return dispatch( changePage( parseInt( event.target.name )));
    };
  };

  return (
    <button name={ name } disabled={( page === name )} onClick={ onClickButton }>{ name }</button>
  )
};

export default Button;