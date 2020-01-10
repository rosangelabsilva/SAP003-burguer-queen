import React, {useEffect, useState} from 'react';
import firebase from "../config";
//import { StyleSheet, css } from 'aphrodite';
import Button from '../componentes/button';
import Card from '../componentes/card';
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


    const sendDelivery = (item) => {
        firebase.firestore().collection('Orders').doc(item.id).update({status: 'Entregar'})
            .then(() => {
                console.log('foi')
            })
    }

    const sendFinalized = (item) => {
        firebase.firestore().collection('Orders').doc(item.id).update({status: 'Pronto'})
            .then(() => {
                console.log('foi2')
            })
    }


    return(
        <>
        <h1>Cozinha</h1>
        <section>
            <h2>Em preparação</h2>
            {data.map(item =>
                <Card
                    table={item.table}
                    name={item.name}
                    order={item.order.map(i => <tr>{i.Name}&emsp;Quant.:{i.count}</tr>)} 
                    title={'Pronto'}
                    handleClick = {() => sendDelivery(item)}>
                </Card>
            )}
        </section>
        <section>
            <h2>Para entrega</h2>
            <Button handleClick = {() => sendFinalized()} title= 'Entregue'></Button>
        </section>
        <section>
            <h2>Finalizados</h2>
        </section>
        </>
    )
}

// const styles = StyleSheet.create({
//     orders: {
//         padding: 10,
//     }
    
// })

export default Kitchen