import { 
  GET_ALL_RECIPES, 
  GET_ALL_DIETS, 
  PREVIOUS_PAGE, 
  CHANGE_PAGE, 
  NEXT_PAGE, 
  ORDER, 
  FILTER_BY_DIETS, 
  RESET_RECIPES, 
  LOADING, 
  SAVE_RECIPES, 
  NEW_RECIPE 
} from './actions-types';
import axios from 'axios';

export const getAllRecipes = ( recipes ) => {
  return {
      type: GET_ALL_RECIPES,
      payload: recipes
  }
};

export const getAllDiets = ( diets ) => {
  return {
      type: GET_ALL_DIETS,
      payload: diets
  }
};

export const previousPage = () => {
  return {
      type: PREVIOUS_PAGE
  }
};

export const changePage = ( n ) => {
  return {
      type: CHANGE_PAGE,
      payload: n
  }
};

export const nextPage = () => {
  return {
      type: NEXT_PAGE
  }
};

export const order = ( info ) => {
  return {
      type: ORDER,
      payload: info
  }
};

export const filterByDiets = (arrDiets) => {
  return {
      type: FILTER_BY_DIETS,
      payload: arrDiets
  }
};

export const resetRecipes = () => {
  return {
      type: RESET_RECIPES
  }
};

export const loading = ( on )  => {
  return {
    type: LOADING,
    payload: on
  }
};

export const saveRecipes = ( recipes ) => {
  return {
      type: SAVE_RECIPES,
      payload: recipes
  }
};

export const newRecipe = () => {
  return {
      type: NEW_RECIPE
  }
};

export const getRecipesBackend = () => {
  return ( dispatch ) => { 
    dispatch( loading( true ) );
    axios.get( '/recipes' )
    .then( response => { dispatch( getAllRecipes( response.data ) );
      dispatch( getDietsBackend() )
    })
    .catch( err => { alert( "ocurrio un error al cargar las recetas, recargue la pagina por favor" );
      dispatch( getDietsBackend() )
    }); 
  };
};

export const getDietsBackend = () => {
  return ( dispatch ) => {
    axios.get( '/diets' )
    .then( response => dispatch( getAllDiets( response.data )))   
    .catch( error => console.log( 'Solicitud de dietas al servidor fallida', error )); 
  }
};

export const getRecipesByName = ( name ) => {
  return ( dispatch ) => {
    dispatch(loading( true ));
    axios.get( `/recipes/?name=${name}` )
    .then( response => { dispatch( saveRecipes( response.data )); 
      dispatch( loading( false ))
    })  
    .catch( error => console.log( 'Solicitud de recetas por nombre al servidor fallida', error )); 
  };
};


