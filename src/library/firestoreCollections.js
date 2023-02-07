import { collection } from 'firebase/firestore';
import { db } from '../firebase';


// APPS
export const appCollectionRef = collection(db, 'food', 'menu', 'apps');
// MAINS
export const mainsCollectionRef = collection(db, 'food', 'menu', 'mains');
// DESSERTS
export const dessertsCollectionRef = collection(db, 'food', 'menu', 'desserts');


// NON ALCH COLD DRINKS
export const coldDrinksCollectionRef = collection(db, 'drinks', 'non alcoholic', 'cold drinks');
// NON ALCH HOT DRINKS
export const hotDrinksCollectionRef = collection(db, 'drinks', 'non alcoholic', 'hot drinks');


// RED WINES
export const redWineCollectionRef = collection(db, 'drinks', 'alcoholic', 'wine', 'type', 'red wine');
// WHITE WINES
export const whiteWineCollectionRef = collection(db, 'drinks', 'alcoholic', 'wine', 'type', 'white wine');
// BUBBLY
export const bubblyCollectionRef = collection(db, 'drinks', 'alcoholic', 'wine', 'type', 'bubbly');


// BEER BOTTLE
export const beerBottleCollectionRef = collection(db, 'drinks', 'alcoholic', 'beer', 'type', 'bottle');
// BEER CAN
export const beerCanCollectionRef = collection(db, 'drinks', 'alcoholic', 'beer', 'type', 'can');
// BEER DRAFT
export const beerDraftCollectionRef = collection(db, 'drinks', 'alcoholic', 'beer', 'type', 'draft');

// CIDER
export const ciderCollectionRef = collection(db, 'drinks', 'alcoholic', 'cider');
// HARD SELTZER
export const hardSeltzerCollectionRef = collection(db, 'drinks', 'alcoholic', 'hard seltzer')


// COCKTAILS
export const cocktailCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'cocktails');
// MIXED SHOTS
export const shotsCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'shots');


// GIN
export const ginCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'gin');
// RUM
export const rumCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'rum');
// TEQUILA
export const tequilaCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'tequila');
// VODKA
export const vodkaCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'vodka');
// WHISKEY
export const whiskeyCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'whiskey');


// FOOD ADDONS
export const foodAddsCollectionRef = collection(db, 'food', 'addons', 'food addons');
// BAR ADDONS
export const drinkAddsCollectionRef = collection(db, 'drinks', 'addons', 'drink addons');

// EMPLOYEE DATA
export const employeeCollectionRef = collection(db, 'employees');