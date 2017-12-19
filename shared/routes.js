import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './containers/App';
import DrinkContainer from './containers/Drinks/DrinkContainer';
import DrinkMixDetailContainer from './containers/DrinkMixes/DrinkMixDetailContainer';
import DrinkCreateContainer from './containers/Drinks/DrinkCreateContainer';
import DrinkMixCreateContainer from './containers/DrinkMixes/DrinkMixCreateContainer';
import DrinkDeleteContainer from './containers/Drinks/DrinkDeleteContainer';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={DrinkContainer}/>
    <Route path="/drinkMix/:slug" component={DrinkMixDetailContainer}/>
    <Route path="/liquid/create" component={DrinkCreateContainer}/>
    <Route path="/drink_mix/create" component={DrinkMixCreateContainer}/>
    <Route path="/liquid/delete" component={DrinkDeleteContainer}/>
  </Route>
);

export default routes;
