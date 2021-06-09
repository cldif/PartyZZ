import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDlZ0MV9YtQmUSmLKpgcSfXYWorEP57n1c",
  authDomain: "partyzz.firebaseapp.com",
  databaseURL: "https://partyzz-default-rtdb.firebaseio.com",
  projectId: "partyzz",
  storageBucket: "partyzz.appspot.com",
  messagingSenderId: "197219309017",
  appId: "1:197219309017:web:53a2af9b6a7cc9a42b75c8",
}

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
