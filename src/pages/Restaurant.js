import React , {useEffect, useState} from 'react';
import firebase from "../config";
import Input from "../componentes/input";
import { StyleSheet, css } from 'aphrodite';
import Menu from "../componentes/menu";
import Button from "../componentes/button";
// import { assignmentExpression } from '@babel/types';

function Restaurant () {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState([]);
  const [table, setTable] = useState([]);
  const [modal, setModal] = useState({status: false});
  const [extras, setExtras] = useState("");
  const [options, setOptions] = useState("");

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
    if(!order.includes(item)) {
      item.count = 1
    setOrder([...order, item])
    } else {
      item.count += 1
      setOrder([...order])
    }
  }

  function deletOrder (item) {
    const indexItem = (order.indexOf(item));
    order.splice(indexItem, 1);
    setOrder([...order]);
  }

  const total = order.reduce((accumulator, item) => accumulator + item.Price * item.count, 0)
    
  function sendKitchen(){
    const orders = {
      name,
      table,
      order,
      total,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    firebase.firestore().collection('Orders').add(orders)
      .then(()=> {
        setOrder([]);
        setName('');
        setTable('')
      })
  }

  const verifyOptions = (item) => {
    if(item.Options){
      setModal({status: true, item: item})
    } else {
      addOrder(item);
    }
  }

  const addOptionsExtras = () => {
    const updatedPrice = 12;
    const updatedItem = {...modal.item, Name: `${modal.item.Name}+${extras}Carne:${options}`, Price: updatedPrice}
    addOrder(updatedItem);
  }
 
  

  return(
    <>
      <h1>Salão</h1>
      <form>
        <label className= {css(styles.label)}>Nome do cliente:</label>
        <label className= {css(styles.label)}>Número da mesa:</label>
        <br/>
        <Input type= 'text' value= {name} className = {css(styles.input)} placeholder= 'Escreva o nome do cliente' onChange={(e) => setName(e.target.value)}/>
        <Input type= 'number' value= {table} className = {css(styles.input)} placeholder= 'Digite o número da mesa'onChange={(e) => setTable(e.target.value)}/>
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
            return <Menu item={item} addOrder={verifyOptions}/>
          } return ""
        })}
      </div>

  {/* inicio pedido */}
        {modal.status ? (
          <div>
            <h3>Extras</h3>
            {modal.item.Extra.map(elem => (
              <div>
              <Input onChange={() => setExtras(elem)} type="radio" name="extras" value={elem}></Input>
              <label>{elem}</label>
              </div>
            ))}
            <h3>Opções</h3>
            {modal.item.Options.map(elem => (
              <div>
              <Input onChange={() => setOptions(elem)} type="radio" name="options" value={elem}></Input>
              <label>{elem}</label>
              </div>
            ))}
            <Button handleClick = {addOptionsExtras} title="Adicionar"></Button>
          </div>
        ) : false}
      <section className= {css(styles.orders)}>
      <h3>Pedidos</h3>
        {order.map(item =>
          <span> {item.Name}&emsp;
            {item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} 
            &emsp;Quant:&nbsp;{item.count}
            &emsp;
            <Button handleClick = {deletOrder} title = "🗑" ></Button> 
            <br/>
          </span>
        )}
      <br/>
      <span>Total: R$ {total}</span>
      <br/>
      <Button className= {css(styles.send)} handleClick = {sendKitchen} title = "Enviar" ></Button>
      </section>       
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
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    height: '50%',
    width: '50%',
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
      background: '#E9967A',
      marginLeft: 110,
      borderRadius: 16,
      fontWeight: 'bold',
      fontSize: 15,
  }
})

export default Restaurant