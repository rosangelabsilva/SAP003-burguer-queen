import React , {useEffect, useState} from 'react';
import firebase from "../config";
import Input from "../componentes/input";
import { StyleSheet, css } from 'aphrodite';
import Menu from "../componentes/menu";
import Button from "../componentes/button";

function Restaurant () {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState([]);
  const [table, setTable] = useState([]);
  // const [resume, setResume] = useState([]);
  // const [option, setOption] = useState([]);
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

  // const optionsHamb = (item) => {
  //   setOption([...option, item])
  // }

  const addOrder = (item) => {
    setOrder([...order, item])
  }

  const total = order.reduce((accumulator, item) => accumulator + item.Price, 0)
    
  function deletOrder (item) {
    const indexItem = (order.indexOf(item));
    order.splice(indexItem, 1);
    setOrder([...order]);
  }

  function sendKitchen(){
    const orders = {
        name,
        table,
        // resume,
        // Price,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    firebase.firestore().collection('Orders').add(orders)
  }

  function amount(){
    // if (order.includes(item)){
    //   item.count -= 1
    // }
    // const minus = order.filter(el => el.count > 0)
    // setOrder([...minus])
    console.log('oi')
  }

  return(
    <>
        <h1>Salão</h1>
      <form>
        <label className= {css(styles.label)}>Nome do cliente:</label>
        <label className= {css(styles.label)}>Número da mesa:</label>
        <br/>
        <Input type= 'text' value= {name} className = {css(styles.input)} placeholder= 'Escreva o nome do cliente' onChange={(e) => setName(e.target.value)}/>
        <Input type= 'text' value= {table} className = {css(styles.input)} placeholder= 'Digite o número da mesa'onChange={(e) => setTable(e.target.value)}/>
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
        })}
      </div>

  {/* inicio pedido */}
      <div className= {css(styles.orders)}>
      <h3>Pedidos</h3>
        {order.map(item =>
          <span> {item.Name}
              {item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} 
        {/* {item.Options.toLocaleString()} */}
        {/* {(order) =>{
          const optionsH = [];
          order.map((item) => {
          if (!optionsH.includes(item.Options)){
            return optionsH.push(item.Options)
          } else {
            return false
          }
        }); optionsH.map((item) => <select><option>{item}</option></select>)}} */}
        {/* {order.map(item => {
          if(item.Options.includes(item)){
          return <select><option>{item.Options.push()}</option></select>} else {return false}})} */}
          <Button handleClick = {amount} title = "➕" ></Button>
          <Button handleClick = {deletOrder} title = "🗑" ></Button> 
          <br/></span>
        )}
      <br/>
      <span>Total: R$ {total}</span>
      <br/>
      <Button className= {css(styles.send)} handleClick = {sendKitchen} title = "Enviar" ></Button>
      </div>       
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderRadius: 7,
    width: 200,
    height: 40,
    fontSize: 15
  },
  div: {
    display: 'flex',
  },
  label: {
    margin: 55,
  },
  orders: {
    position: 'absolute',
    top: 138,
    left: 600,
  },
  send: {
    height: 80,
      width: 100,
      borderBottom: 'double',
      background: '#AEEEEE',
      margin: 10,
  }
})

export default Restaurant