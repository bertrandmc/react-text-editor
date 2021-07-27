import { FIREBASE_CONFIG } from "../config";
import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp(FIREBASE_CONFIG);

export const firestore = firebase.firestore();

export const documentsCollection = firestore.collection("documents");
