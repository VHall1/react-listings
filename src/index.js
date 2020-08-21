import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBiWxNswVIRe3n11gvPH_oL0INFNpKJZwc",
  authDomain: "reactshop-45883.firebaseapp.com",
  databaseURL: "https://reactshop-45883.firebaseio.com",
  projectId: "reactshop-45883",
  storageBucket: "reactshop-45883.appspot.com",
  messagingSenderId: "1083069963090",
  appId: "1:1083069963090:web:cc8773ab48588cc9f0b88b"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);