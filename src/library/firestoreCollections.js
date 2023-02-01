import { collection } from 'firebase/firestore';
import { db } from '../firebase';

export const appCollectionRef = collection(db, 'food', 'menu', 'apps');
export const mainsCollectionRef = collection(db, 'food', 'menu', 'mains')
// export const nonAlchCollectionRef = collection(db, 'nonalch')
// export const AlchCollectionRef = collection(db, 'alch')