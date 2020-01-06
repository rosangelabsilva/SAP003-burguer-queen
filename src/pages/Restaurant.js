import React , {useEffect, useState} from 'react';
import firebase from "../config";
import Input from "../componentes/input";
import { StyleSheet, css } from 'aphrodite';
import Menu from "../componentes/menu";

function Restaurant () {
    const [data, setData] = useState([]);
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

    function addOrder(item){
      const itemIndex = data.findIndex((el) => el.id === item.id);
      
      if(itemIndex === -1){
        setData([...data, { ...item, count: 1 }])
      } else {
        const newOrder = [...data];
        newOrder[itemIndex].count += 1;
        setData(newOrder)
        console.log(newOrder)
      }
      // setTotal(total + (item.Price ))     
    }

    const menuCoffee = data.filter(item => !item.Coffee)
    const menuRest = data.filter(item => item.Coffee)

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
      {menuCoffee.map((item) =><Menu item={item} addOrder={addOrder}/>)}
    </div>
  <h2>Resto do dia</h2>
  <div className= {css(styles.div)}>
    {menuRest.map((item) =><Menu item={item} addOrder={addOrder}/>)} 
  </div>
  <h3>Pedidos</h3>
  <div>
    {data.map(item =>
      <span> {item.Name} {item.Price} </span>)}
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