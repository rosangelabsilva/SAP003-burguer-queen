import React, {useEffect} from 'react';
import './App.css';
import firebase from "./config";
import Button from "./componentes/button";
import Input from "./componentes/input";
import { StyleSheet, css } from 'aphrodite'

function App() {

    useEffect(() => {
    firebase.firestore().collection('Menu').get()
      .then(item => item.forEach(element => {
        console.log(element.data())
      }))
    })

    // function titleMenu() {
    //   firebase.firestore().collection('Menu').get()
    //       .then(item => item.forEach(element => {
    //         const menu = element.data();
    //         return menu
    //       }
    //       ))
    // }

    function addCarrinho(event) {
      event.preventDefault();
      return console.log('ooi')
    }

  return (
    <>
    <h1>Burguer Queen</h1>
    <form>
    Nome do cliente:
      {Input({type: 'text', class: 'name-client', placeholder: 'Escreva o nome do cliente'})}
    Número da mesa:
      {Input({type: 'text', class: 'numer-mesa', placeholder: 'Digite o número da mesa'})}
    </form>
      {Button({class: 'btn-itens', title: 'a', onClick: addCarrinho})}
    </>
  );
}

export default App
