import React, {useEffect, useState} from 'react';
import firebase from "../config";
import { StyleSheet, css } from 'aphrodite';
import Button from '../componentes/button';
// import Input from "../componentes/input"; 

function Kitchen () {
    const [data, setData] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('Orders').get()
        .then((snapshot) => {
          const itensMenu = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        setData(itensMenu) 
        }) 
      }, [])


    return(
        <>
        <h1>Cozinha</h1>
        <section>
            <h2>Em preparação</h2>
            {data.map(item =>
                <table className= {css(styles.orders)}> <tr>Cliente:&emsp;{item.name}</tr>
                    <tr>Mesa:&emsp;{item.table}</tr>
                    <tr>Pedido:</tr>
                    <tr></tr>
                    <Button title= 'Pronto'></Button>
                {/* <tr>Horário:{item.timestamp}</tr> */}
                </table>
            )}
        </section>
        <section>
            <h2>Para entrega</h2>
        </section>
        <section>
            <h2>Finalizados</h2>
        </section>
        </>
    )
}

const styles = StyleSheet.create({
    orders: {
        padding: 10,
        
        // float: 'left'
    }
    
})

export default Kitchen