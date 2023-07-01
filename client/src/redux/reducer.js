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

const initialState = {
  loading: true,
  backupRecipes: [],
  allRecipes: [],
  countRecipes: 0,
  allDiets: {},
  page: 1,
  newRecipeCreate: false
}

const reducer = ( state = initialState, { type, payload } ) => {
  switch ( type ) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        backupRecipes: [ payload ],
        allRecipes: payload,
        countRecipes: payload.length,
        page: 1,
        newRecipeCreate: false,
      };
      
    case GET_ALL_DIETS:
      return {
        ...state,
        loading: false,
        allDiets: payload,
      };

    case PREVIOUS_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };

    case ORDER:
      const { typeOrder, asc, attribute } = payload;

      let newOrder = [];

      if ( typeOrder === 'string' ) {
        newOrder = asc ? [ ...state.allRecipes.sort( ( a, b ) => ( a[ attribute ].toLowerCase() > b[ attribute ].toLowerCase() ) 
        ? 1 : ( a[ attribute ].toLowerCase() < b[ attribute ].toLowerCase() ) ? -1 : 0 ) ] :

        [ ...state.allRecipes.sort( ( b, a ) => ( a[ attribute ].toLowerCase() > b[ attribute ].toLowerCase() ) 
        ? 1 : ( a[ attribute ].toLowerCase() < b[ attribute ].toLowerCase() ) ? -1 : 0 ) ]
      } else {
        newOrder = asc ? [ ...state.allRecipes.sort( ( a, b ) => ( a[ attribute ] > b[ attribute ] ) 
        ? 1 : ( a[ attribute ] < b[ attribute ] ) ? -1 : 0 ) ] :

        [ ...state.allRecipes.sort( ( b, a ) => ( a[ attribute ] > b[ attribute ] ) 
        ? 1 : ( a[ attribute ] < b[ attribute ] ) ? -1 : 0 ) ]
      }
      return {
        ...state,
        allRecipes: newOrder,
        page: 1,
      };

    case FILTER_BY_DIETS:
      const filteredRecipes = state.backupRecipes.filter( recipe => !payload.some( diets => !recipe.diets.includes( diets )));

      return {
        ...state,
        allRecipes: filteredRecipes,
        countRecipes: filteredRecipes.length,
        page: 1,
      };

    case RESET_RECIPES:
      return {
        ...state,
        allRecipes: [ ...state.backupRecipes ],
        countRecipes: [ ...state.backupRecipes ].length,
        page: 1
      };
    
    case LOADING:
      return {
        ...state,
        loading: payload,
      };

    case SAVE_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        countRecipes: payload.length,
        page: 1
      };

    case NEW_RECIPE:
      return {
        ...state,
        newRecipeCreate: true
      };
  
    default:
      return { ...state, };
  }
}

export default reducer;