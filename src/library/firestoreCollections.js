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
// BEER
export const beerCollectionRef = collection(db, 'drinks', 'alcoholic', 'beer');
// COCKTAILS
export const cocktailCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'cocktails');
// MIXED SHOTS
export const shotsCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'shots');
// VODKA
export const vodkaCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'vodka');
// GIN
export const ginCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'gin');
// RUM
export const rumCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'rum');
// TEQUILA
export const tequilaCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'tequila');
// WHISKEY
export const whiskeyCollectionRef = collection(db, 'drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'whiskey');
