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
  const [modal, setModal] = useState({status: false});
  const [extras, setExtras] = useState("");
  const [options, setOptions] = useState("");
  const [checked, setChecked] = useState("");

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
    order[indexItem].count--;
    if(order[indexItem].count===0){
      order.splice(indexItem, 1);
    }
    setOrder([...order]) 
  }

  const total = order.reduce((accumulator, item) => accumulator + item.Price * item.count, 0)
    
  function sendKitchen(){
    if(name !== '' || table !== ''){
    const orders = {
      name,
      table,
      order,
      total,
      status: 'Preparação',
      timestamp: new Date().getTime(),
      timestampDelivered: ''
    }
    firebase.firestore().collection('Orders').add(orders)
      .then(()=> {
        setOrder([]);
        setName('');
        setTable('')
      })
    } else { alert('Preencher campo Nome do cliente e Mesa')}
  }

  const verifyOptions = (item) => {
    if(item.Options){
      setModal({status: true, item: item})
    } else {
      addOrder(item);
    }
  }

  const addOptionsExtras = () => {
    if(checked===true){
      const updatedItem = {...modal.item, Name: `${modal.item.Name}+${extras} Carne:${options}`, Price: modal.item.Price+1}
      addOrder(updatedItem);
      setModal({status: false})
      setChecked(false)
    } else {
      const updatedItem = {...modal.item, Name: `${modal.item.Name} Carne:${options}`}
      addOrder(updatedItem);
      setModal({status: false})
    }
  }
 
  return(
    <>
    <div className= {css(styles.page)}>
      <h1 className= {css(styles.saloon)}>Salão</h1>
      <form>
        <Input 
          type= 'text' 
          value= {name} 
          className = {css(styles.input)}
          placeholder= 'Nome do cliente'
          onChange={(e) => setName(e.target.value)}/>
        <Input 
          type= 'number'
          value= {table} className = {css(styles.input)} 
          placeholder= 'Número da mesa'
          onChange={(e) => setTable(e.target.value)}/>
      </form>
      <h2 className= {css(styles.title)}>Café da manhã</h2>
      <div className= {css(styles.div)}>
        {data.map((item) => {  
          if (item.Coffee){
            return <Menu key= {item.id} item={item} addOrder={addOrder}/>
          } else {return ``}
        })}
      </div>
      <h2 className= {css(styles.title)}>Resto do dia</h2>
      <div className= {css(styles.div)}>
        {data.map((item) => {
          if (!item.Coffee){
            return <Menu key= {item.id} item={item} addOrder={verifyOptions}/>
          } else {return ``}
        })}
      </div>
        {modal.status ? (
          <div key= {modal.id} className = {css(styles.options)}>
            <div>
            <h3>Extras</h3>
            {modal.item.Extra.map((elem, index) => (
              <div key= {index}>
                <Input 
                  type="radio" 
                  name="extras"
                  onChange={(e) => { 
                    setChecked(e.target.checked)
                    setExtras(e.target.value)
                  }} 
                  value={elem}>
                </Input>
                <label>{elem}</label>
              </div>
            ))}
            </div>
            <div>
            <h3>Opções</h3>
            {modal.item.Options.map((elem, index) => (
              <div key={index}>
                <Input 
                  onChange={() => setOptions(elem)} 
                  type="radio" 
                  name="options" 
                  value={elem}>
                </Input>
                <label>{elem}</label>
              </div>
            ))}
            </div>
            <Button 
              className= {css(styles.send)} 
              handleClick = {addOptionsExtras} 
              title="Adicionar">
            </Button>
          </div>
        ) : false}
      <section className= {css(styles.orders)}>
        <h2>Pedidos</h2>
        {order.map((item, index) =>
          <span key={index} className= {css(styles.spanOrders)}> {item.Name}&emsp;
            {item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} 
            &emsp;Quant:&nbsp;{item.count}
            <Button
              className= {css(styles.delet)}
              handleClick = {() => deletOrder(item)}
              title = "🗑" >
            </Button> 
            <br/>
          </span>
        )}<br/>
        <span className={css(styles.total)}>Total: R$ {total}</span><br/>
        <Button 
          className= {css(styles.send)}
          handleClick = {sendKitchen} 
          title = "Enviar" >
        </Button>
      </section> 
      </div>      
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    borderRadius: 10,
    width: 200,
    height: 40,
    fontSize: 20,
    marginLeft: 40
  },
  div: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    height: '50%',
    width: '50%',
  },
  orders: {
    position: 'absolute',
    height: 200,
    // overflow: 'auto',
    top: 62,
    left: 530,
  },
  send: {
    height: 80,
    width: 100,
    borderBottom: 'double',
    background: '#E9967A',
    marginLeft: 10,
    borderRadius: 16,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40
  },
  options: {
    top: 420,
    left: 550,
    position: 'absolute',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  page: {
    position:'absolute',
    top: '20%'
  },
  spanOrders:{
    display: 'flex',
    margin: 8,
    justifyContent: 'space-between',
    fontSize: 20
  },
  delet:{
    left: 435,
    position: 'absolute',
    fontSize: 20
  },
  total:{
    fontSize: 25
  },
  title:{
    marginLeft: 180
  },
  saloon:{
    marginLeft: 40
  }
})

export default Restaurant