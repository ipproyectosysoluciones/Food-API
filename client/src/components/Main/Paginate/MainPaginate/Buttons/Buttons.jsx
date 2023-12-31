import React from "react";
import { useSelector } from 'react-redux';
import Button from './Button.jsx';
import style from './Buttons.module.css'

const Buttons = () => {
  const { countRecipes } = useSelector( ( state ) => state);

  const impBotton = ( n ) => {
    const arrayButtons = [];

    for (let i = 1; i <= n; i++) {
      arrayButtons.push( <Button key={ i } name={ i } /> )
      
    };
    return arrayButtons;
  };

  return (
    <div className={ style.buttonConteiners }>
      <Button name={ '<' } >{ '<' }</Button>

      { impBotton( Math.ceil( countRecipes/9 ) ) }

      <Button name={ '>' } >{ '>'}</Button>
    </div>
  )
};

export default Buttons;