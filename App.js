import React from 'react';
import { View, Text } from 'react-native';
import Login from './File/Login';
import Register from './File/Register';
import Home from './File/Home';
import Input from './File/Input';
import Edit from './File/Edit';
import CekStok from './File/CekStok';
import StokMasuk from './File/StokMasuk';
import StokKeluar from './File/StokKeluar';
import Router from "./Router";
import About from "./File/About";
import  FlashMessage from "react-native-flash-message"


export default function App() {
  return(
    <>
      <Router />
      <FlashMessage position={"top"} />
    </>
  ) 
}
