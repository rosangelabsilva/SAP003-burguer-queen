import React , {useEffect, useState} from 'react';
import firebase from "../config";
import Input from "../componentes/input";
import { StyleSheet, css } from 'aphrodite';
import Menu from "../componentes/menu";

function Restaurant () {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);
    useEffect(() => {
      firebase.firestore().collection('Menu').get()
      .then((snapshot) => {
        const itensMenu = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setData(itensMenu) 
      }) 
    }, [])

    const addOrder = (item) => {

      setOrder([...order, item])     
    }

    const total = order.reduce((accumulator, item) => accumulator + item.Price, 0)
    
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
      {data.map((item) => {  
      if (item.Coffee){
        return <Menu item={item} addOrder={addOrder}/>
      } return ""
    })}
    </div>
  <h2>Resto do dia</h2>
  <div className= {css(styles.div)}>
    {data.map((item) => {
      if (!item.Coffee){
        return <Menu item={item} addOrder={addOrder}/>
      } return ""
    } 
  )}
  </div>

  {/* inicio pedido */}
  <h3>Pedidos</h3>
  <div>
    {order.map(item =>
      <span> {item.Name}
            {item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} 
        {item.Options.toLocaleString()}
      <br/></span>
    )}
    <br/>
    <span>Total: R$ {total}</span>
  </div>
  </>
    )
}

const styles = StyleSheet.create({
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