import { collection } from 'firebase/firestore';
import { db } from '../firebase';

export const appCollectionRef = collection(db, 'apps')