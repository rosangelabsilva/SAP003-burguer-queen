import React , {useEffect, useState} from 'react';
import firebase from "../config";
import Button from "../componentes/button";
import Input from "../componentes/input";
import { StyleSheet, css } from 'aphrodite';

function Restaurant () {
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

    function addOrder(e){
      e.preventDefault()
      return(console.log('oi'))

    }

    return(
    <>
        <h1>Salão</h1>
    <form>
    Nome do cliente:
      <Input type= 'text' className = {css(styles.input)} placeholder= 'Escreva o nome do cliente'/>
    Número da mesa:
      <Input type= 'text' className = {css(styles.input)} placeholder= 'Digite o número da mesa'/>
    </form>
    <h2>Café da manhã</h2> 
    <div className= {css(styles.div)}>
      { data.map((item) => {  
      if (item.Coffee){
        return <Button className = {css(styles.btn)} handleClick = {addOrder} title= {`${item.Name} R$ ${item.Price}`} />
      }
      return undefined
    } 
    )}
    </div>
  <h2>Resto do dia</h2>
  <div className= {css(styles.div)}>
    { data.map((item) => {
      if (!item.Coffee){
        return <Button className = {css(styles.btn)} onClick = {addOrder} title= {`${item.Name} R$ ${item.Price}`} />
      }
      return undefined
    } 
  )}
  </div>
  <h3>Pedidos</h3>
  </>
    )
}

const styles = StyleSheet.create({
  btn: {
    height: 80,
    width: 100,
    borderBottom: 'double',
    background: '#FFD700',
    margin: 10,
  },
  input: {
    margin: 10,
    borderRadius: 7,
    width: 200,
    height: 40,
    fontSize: 15
  },
  div: {
    display: 'flex',
  }
})

export default Restaurant