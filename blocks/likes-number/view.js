// Disclaimer: Importing the `store` using a global is just a temporary solution.
const { store } = window.__experimentalInteractivity;

import { default as storeData } from "./store";

store(storeData);
