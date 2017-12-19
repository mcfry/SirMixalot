import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addDrink(drink) {
  return {
    type: ActionTypes.ADD_DRINK,
    name: drink.name,
    slot: drink.slot,
    content: drink.content,
    slug: drink.slug,
    cuid: drink.cuid,
    _id: drink._id,
  };
}

export function addDrinkMix(drinkMix) {
  return {
    type: ActionTypes.ADD_DRINK_MIX,
    name: drinkMix.name,
    desc: drinkMix.desc,
    drink1: drinkMix.drink1,
    amount1: drinkMix.amount1,
    drink2: drinkMix.drink2,
    amount2: drinkMix.amount2,
    drink3: drinkMix.drink3,
    amount3: drinkMix.amount3,
    drink4: drinkMix.drink4,
    amount4: drinkMix.amount4,
    drink5: drinkMix.drink5,
    amount5: drinkMix.amount5,
    image: drinkMix.image,
    slug: drinkMix.slug,
    cuid: drinkMix.cuid,
    _id: drinkMix._id,
  };
}

export function changeSelectedDrink(slug) {
  return {
    type: ActionTypes.CHANGE_SELECTED_DRINK,
    slug,
  };
}

export function addDrinkRequest(drink) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addDrink`, {
      method: 'post',
      body: JSON.stringify({
        drink: {
          name: drink.name,
          slot: drink.slot,
          content: drink.content,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addDrink(res.drink)));
  };
}

export function addDrinkMixRequest(drinkMix) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addDrinkMix`, {
      method: 'post',
      body: JSON.stringify({
        drinkMix: {
          name: drinkMix.name,
          desc: drinkMix.desc,
          drink1: drinkMix.drink1,
          amount1: drinkMix.amount1,
          drink2: drinkMix.drink2,
          amount2: drinkMix.amount2,
          drink3: drinkMix.drink3,
          amount3: drinkMix.amount3,
          drink4: drinkMix.drink4,
          amount4: drinkMix.amount4,
          drink5: drinkMix.drink5,
          amount5: drinkMix.amount5,
          image: drinkMix.image,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addDrinkMix(res.drinkMix)));
  };
}

export function addSelectedDrink(drink) {
  return {
    type: ActionTypes.ADD_SELECTED_DRINK,
    drink,
  };
}

export function addSelectedDrinkMix(drinkMix) {
  return {
    type: ActionTypes.ADD_SELECTED_DRINK_MIX,
    drinkMix,
  };
}

export function getDrinkRequest(drink) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getDrink?slug=${drink}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedDrink(res.drink)));
  };
}

export function getDrinkMixRequest(drinkMix) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getDrinkMix?slug=${drinkMix}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedDrinkMix(res.drinkMix)));
  };
}

export function deleteDrink(drink) {
  return {
    type: ActionTypes.DELETE_DRINK,
    drink,
  };
}

export function deleteDrinkMix(drinkMix) {
  return {
    type: ActionTypes.DELETE_DRINK_MIX,
    drinkMix,
  };
}

export function addDrinks(drinks) {
  return {
    type: ActionTypes.ADD_DRINKS,
    drinks,
  };
}

export function addDrinkMixes(drinkMixes) {
  return {
    type: ActionTypes.ADD_DRINK_MIXES,
    drinkMixes,
  };
}

export function fetchDrinks() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getDrinks`).
      then((response) => response.json()).
      then((response) => dispatch(addDrinks(response.drinks)));
  };
}

export function fetchDrinkMixes() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getDrinkMixes`).
      then((response) => response.json()).
      then((response) => dispatch(addDrinkMixes(response.drinkMixes)));
  };
}

export function deleteDrinkRequest(drink) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deleteDrink`, {
      method: 'post',
      body: JSON.stringify({
        drinkId: drink,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deleteDrink(drink)));
  };
}

export function deleteDrinkMixRequest(drinkMix) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deleteDrinkMix`, {
      method: 'post',
      body: JSON.stringify({
        drinkMixId: drinkMix._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deleteDrinkMix(drinkMix)));
  };
}