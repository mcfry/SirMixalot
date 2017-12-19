import * as ActionTypes from '../constants/constants';

const initialState = { drinks: [], drink: null };

// NOTE: Basically, the reducer maintains current state after actions are made to backend controllers and models

// Takes state and an action (with data)
// => returns next state
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DRINK :
      return {
        // Return the new drink + all old drinks in the state, as an array of objects
        drinks: [{
          name: action.name,
          slot: action.slot,
          content: action.content,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }, ...state.drinks],
        drinkMixes: state.drinkMixes,
        drinkMix: state.drinkMix };

    case ActionTypes.ADD_DRINK_MIX :
      return {
        drinks: state.drinks,
        drinkMixes: [{
          name: action.name,
          desc: action.desc,
          drink1: action.drink1,
          amount1: action.amount1,
          drink2: action.drink2,
          amount2: action.amount2,
          drink3: action.drink3,
          amount3: action.amount3,
          drink4: action.drink4,
          amount4: action.amount4,
          drink5: action.drink5,
          amount5: action.amount5,
          image: action.image,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }, ...state.drinkMixes],
        drinkMix: state.drinkMix };

    case ActionTypes.CHANGE_SELECTED_DRINK :
      return {
        drinks: state.drinks,
        drink: action.slug,
      };

    case ActionTypes.ADD_DRINKS :
      return {
        drinks: action.drinks,
        drinkMixes: state.drinkMixes,
        drinkMix: state.drinkMix,
      };

    case ActionTypes.ADD_DRINK_MIXES :
      return {
        drinks: state.drinks,
        drinkMixes: action.drinkMixes,
        drinkMix: state.drinkMix,
      };

    case ActionTypes.ADD_SELECTED_DRINK :
      return {
        drink: action.drink,
        drinks: state.drinks,
      };

    case ActionTypes.ADD_SELECTED_DRINK_MIX :
      return {
        drinks: state.drinks,
        drinkMix: action.drinkMix,
        drinkMixes: state.drinkMixes,
      };

    case ActionTypes.DELETE_DRINK :
      return {
        drinks: state.drinks.filter((drink) => drink._id !== action.drink),
        drinkMixes: state.drinkMixes.filter((drinkMix) => !((drinkMix.drink1 === action.drink && drinkMix.drink1 !== undefined) || (drinkMix.drink2 === action.drink && drinkMix.drink2 !== undefined) && (drinkMix.drink3 === action.drink && drinkMix.drink3 !== undefined) || (drinkMix.drink4 === action.drink && drinkMix.drink4 !== undefined) || (drinkMix.drink5 === action.drink && drinkMix.drink5 !== undefined))),
      };

    case ActionTypes.DELETE_DRINK_MIX :
      return {
        drinks: state.drinks,
        drinkMix: state.drinkMix,
        drinkMixes: state.drinkMixes.filter((drinkMix) => drinkMix._id !== action.drinkMix._id),
      };

    default:
      return state;
  }
};

export default appReducer;
