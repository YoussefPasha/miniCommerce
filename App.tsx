import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./Navigation";
import productReducers from "./store/reducers/products";
import categoriesReducers from "./store/reducers/categories";
import favoriteReducers from "./store/reducers/favorite";

const rootReducer = combineReducers({
  products: productReducers,
  categories: categoriesReducers,
  favorite: favoriteReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
