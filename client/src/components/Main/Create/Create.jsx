import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import RequiredInfo from './RequiredInfo/RequiredInfo';
import ChooseDiets from './ChooseDiets/ChooseDiets';
import Steps from './Steps/Steps';
import style from './Create.module.css';
import { getRecipesBackend, newRecipe, resetRecipes } from '../../../redux/actions';

const Create = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newRecipeCreate = useSelector( state => state.newRecipeCreate );

  const [ infoForm, setInfoForm ] = useState({
    name: "",
    image: "",
    healthScore: 0,
    summary: "",
    diets: [],
    steps: {},
  });

  const [ validation, setValidation ] = useState({
    nameValidation: false,
    healthScoreValidation: true,
    summaryValidation: false
  });

  const [ enabledSubmit, setEnabledSubmit ] = useState( false );
  // /* const [newRecipe, setNewRecipe] = useState(false) */

  useEffect( () => {
    const { nameValidation, healthScoreValidation, summaryValidation } = validation;

    return ( nameValidation && healthScoreValidation && summaryValidation ) 
      ? setEnabledSubmit( true ) 
      : setEnabledSubmit( false );

  }, [ setEnabledSubmit, validation ]);

  const changeHandler = ( event ) => {
    setInfoForm({
      ...infoForm,
      [ event.target.name ]: ( event.target.name !== 'healthScore' ) 
        ? event.target.value 
        : parseInt( event.target.value ),
    });

    if ( event.target.name === 'healthScore' ) {
      setValidation({
        ...validation,
        healthScoreValidation: ( event.target.value < 0 || event.target.value > 100 ) 
          ? false 
          : true,
      });
    } else {
      setValidation({
        ...validation,
        [ `${ event.target.name }Validation` ] : ( /^\s*$/.test( event.target.value ) ) 
          ? false 
          : true,
      });
    }
  };

  const selectDiets = ( event ) => {
    if ( event.target.checked === false ) {
      setInfoForm({
        ...infoForm,
        diets: infoForm.diets.filter( type => type !== event.target.value ),
      });
    } else {
      setInfoForm({
        ...infoForm,
        diets: [ ...infoForm.diets, event.target.value ],
      });
    }
  };

  const addStep = ( step ) => {
    const newSteps = { ...infoForm.steps, [ `${ Object.keys( infoForm.steps ).length + 1 }` ] : step };

    setInfoForm({
      ...infoForm,
      steps: newSteps,
    });
  };

  const deleteStep = () => {
    const copyArr = Object.entries( infoForm.steps );
    const newSteps = {};

    copyArr.forEach( ( [ key, value ] ) => ( parseInt( key ) === ( copyArr.length ) ) 
      ? null 
      : newSteps[ key ]  = value 
    );

    setInfoForm({
      ...infoForm,
      steps: newSteps
    });
  };

  const resetStep = ( event ) => {
    return setInfoForm({
      ...infoForm,
      steps: {},
    });
  };

  const goBack = () => {
    ( newRecipeCreate ) 
      ? dispatch( getRecipesBackend() ) 
      : dispatch( resetRecipes() 
    );
    navigate.push( '/recipes' );
  };

  const deleteStepByN = (n) => {
    const newSteps = {};
    
    Object.entries( infoForm.steps ).forEach( ( [ key, value ] ) => {
      if ( key < n ) { newSteps[ key ] = value }
      else if ( key > n ) { newSteps[ key - 1 ] = value }
    });
    
    return setInfoForm({
      ...infoForm,
      steps: newSteps
    });
  };

  async function formSubmit( event ) {
    try {
      event.preventDefault();

      const res = await axios.post( '/recipes', { ...infoForm, name: infoForm.name.trim(), summary: infoForm.summary.trim(), } );

      if ( res.status === 404 ){ 
          alert( "error al crear receta! No repita el nombre de una receta ya creada y complete todos los campos requeridos" );
      } else {
        const createAgain = window.confirm( "¿Crear otra receta?" );
            
        if ( !createAgain ) { 
          dispatch( getRecipesBackend() ); 
          return navigate.push( '/recipes' ); 
        }  
          
        dispatch( newRecipe() );
            
        setInfoForm({
          name: "",
          image: "",
          healthScore: 0,
          summary: "",
          diets: [],
          steps: {},
        });
              
        setValidation({
          ...validation,
          nameValidation: false,
          summaryValidation: false,
        });
      }
    } catch ( error ) {
      alert( "error al conectar con el servidor! no se pudo crear la receta" );
      newRecipeCreate && dispatch( getRecipesBackend() );
      navigate.push( '/recipes' );
    }
  };

  return (
    <div className={ style.createConteiner }>
      <h2>Crear Reseta: </h2>
      <hr/>

      <form className={ style.form } onSubmit={ formSubmit }>
        <div>
          <RequiredInfo 
            name={ infoForm.name }
            image={ infoForm.image }
            healthScore={ infoForm.healthScore }
            summary={ infoForm.summary }
            changeHandler={ changeHandler }
            validation={ validation } 
          />

          <ChooseDiets 
            selectDiets={ selectDiets } 
            diets={ infoForm.diets } 
          />
        </div>
        <hr/>
        <Steps 
          currentSteps={ Object.entries( infoForm.steps ) }
          addStep={ addStep }
          deleteStep={ deleteStep }
          resetStep={ resetStep } 
          deleteStepByN={ deleteStepByN }
        />

        <input 
          type="button" 
          className={ style.cancelButton } 
          onClick={ goBack } value="Volver" 
        />
        <input 
          type="submit" 
          className={ style.createButton } 
          disabled={ !enabledSubmit } 
          value="Crear" 
        />
      </form>
    </div>
  )
};

export default Create;