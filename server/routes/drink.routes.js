import { Router } from 'express';
import * as DrinkController from '../controllers/drinks.controller';
import * as DrinkMixController from '../controllers/drink_mixes.controller';
const router = new Router();

// Drinks
router.route('/getDrinks').get(DrinkController.getDrinks);
router.route('/getDrink').get(DrinkController.getDrink);
router.route('/addDrink').post(DrinkController.addDrink);
router.route('/deleteDrink').post(DrinkController.deleteDrink);

// Drink Mixes
router.route('/getDrinkMixes').get(DrinkMixController.getDrinkMixes);
router.route('/addDrinkMix').post(DrinkMixController.addDrinkMix);
router.route('/getDrinkmix').get(DrinkMixController.getDrinkMix);
router.route('/deleteDrinkMix').post(DrinkMixController.deleteDrinkMix);

export default router;
