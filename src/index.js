import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRoutes from './Routes/MainRoutes';
import {createStore,compose,applyMiddleware}from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Reducer from "./Redux/Reducers/index";
import {setHeaderToken} from "./Axios/Services";

//CREATE STORE

const store=createStore(Reducer,compose(applyMiddleware(thunk)));

//TOKEN AUTHORIZATION

const token =localStorage.getItem("AuthTok");
if(token){
  setHeaderToken(token);
}

ReactDOM.render(
  <Provider store={store}>
    <MainRoutes />
  </Provider>,
  document.getElementById('root')
);

