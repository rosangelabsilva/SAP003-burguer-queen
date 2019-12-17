import React, {useEffect, useState} from 'react';
import './App.css';
import firebase from "./config";
import Button from "./componentes/button";
import Input from "./componentes/input";
// import { StyleSheet, css } from 'aphrodite'

function App() {
  const [data, setData] = useState([]);
    useEffect(() => {
      firebase.firestore().collection('Menu').get()
      .then((snapshot) => {
        const itensMenu = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        setData(itensMenu) 
      }) 
    }, [])


// function addCarrinho(event) {
//       event.preventDefault();
//     }

  return (
    <>
    <h1>Burguer Queen</h1>
    <form>
    Nome do cliente:
      {Input({type: 'text', className: 'client', placeholder: 'Escreva o nome do cliente'})}
    Número da mesa:
      {Input({type: 'text', className: 'numer-mesa', placeholder: 'Digite o número da mesa'})}
    </form>
    <div id='todos'></div>
    <h2>Café da manhã</h2>
    { data.map((item) => {
      if (item.Coffee){
        return <Button onClick = {e => e.setData('Menu')} title= {`${item.Name} R$ ${item.Price}`} />
      }
    } 
    )}
  <h2>Resto do dia</h2>
    { data.map((item) => {
      if (!item.Coffee){
        return <Button onClick = {e => e.setData('Menu')} title= {`${item.Name} R$ ${item.Price}`} />
      }
    } 
      
  )}
  </>
  )
}

// const styles = StyleSheet.create({
//   client: {
//       backgroundColor: 'red'
//   }
// })


export default App