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
  return async ( dispatch ) => {
    dispatch( loading( true ) );
    try {
      const response = await axios.get( '/recipes' );
      dispatch( getAllRecipes( response.data ) );
      dispatch( getDietsBackend() );
    } catch ( error ) {
      alert( "Ocurrió un error al cargar las recetas. Recargue la página, por favor." );
      dispatch( getDietsBackend() );
    }
  };
};

export const getDietsBackend = () => {
  return async ( dispatch ) => {
    try {
      const response = await axios.get( '/diets' );
      dispatch( getAllDiets( response.data ) );
    } catch ( error ) {
      console.log( 'Solicitud de dietas al servidor fallida', error.message );
    }
  };
};

export const getRecipesByName = ( name ) => {
  return async ( dispatch ) => {
    dispatch( loading( true ) );
    try {
      const response = await axios.get( `/recipes?name=${ name }` );
      dispatch( saveRecipes( response.data ) );
      dispatch( loading( false ) );
    } catch ( error ) {
      console.log( 'Solicitud de recetas por nombre al servidor fallida', error.message );
    }
  };
};


