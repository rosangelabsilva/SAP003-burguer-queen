import React, {useEffect, useState} from 'react';
import firebase from "../config";
import { StyleSheet, css } from 'aphrodite';
import Card from '../componentes/card';
const hmh = require('hmh');

function Kitchen () {
    const [data, setData] = useState([]);

    useEffect(() => {
        getOrders()
      }, [])

    const getOrders = () => {
        firebase.firestore().collection('Orders').get()
            .then((snapshot) => {
                const itensMenu = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            setData(itensMenu) 
            })
    }

    const sendDelivery = (item) => {
        firebase.firestore().collection('Orders').doc(item.id).update({
            status: 'Entregar',
            timestampDelivered: new Date().getTime()
        })
            .then(() => {
                getOrders() 
            })
    }

    const sendFinalized = (item) => {
        firebase.firestore().collection('Orders').doc(item.id).update({status: 'Pronto'})
            .then(() => {
                getOrders()
            })
    }

    const statusPrepare = (status) => status.status==='Preparação';
    
    const statusDelivery = (status) => status.status==='Entregar';

    const statusFinal = (status) => status.status==='Pronto';

    return(
        <>
        <div className= {css(styles.page)}>        
        <h1>Cozinha</h1>
        <h2>Em preparação</h2>
        <section className= {css(styles.orders)}>
            {data.filter(statusPrepare).map(item =>
                <Card
                    table={item.table}
                    name={item.name}
                    order={item.order.map(i => <tr>{i.Name}&emsp;Quant.:{i.count}</tr>)} 
                    title={'Pronto'}
                    status={item.status}
                    handleClick = {() => sendDelivery(item)}>
                </Card>
            )}
        </section>
        <h2>Para entrega</h2>
        <section className= {css(styles.orders)}>
            {data.filter(statusDelivery).map(item =>
                <Card
                    table={item.table}
                    name={item.name}
                    status={item.status}
                    order={item.order.map(i => <tr>{i.Name}&emsp;Quant.:{i.count}</tr>)} 
                    title={'Entregue'}
                    handleClick = {() => sendFinalized(item)}>
                </Card>
            )}
        </section>
        <h2>Finalizados</h2>
        <section className= {css(styles.orders)}>
            {data.filter(statusFinal).map(item =>
                {const send = `${new Date (item.timestamp).getHours()}h ${new Date (item.timestamp).getMinutes()}m`;
                const entrega = `${new Date (item.timestampDelivered).getHours()}h ${new Date (item.timestampDelivered).getMinutes()}m`
                const diff = (hmh.diff(`${send}`,`${entrega}`).toString());
                return(
                <Card
                    table={item.table}
                    name={item.name}
                    status={item.status}
                    order={item.order.map(i => <tr>{i.Name}&emsp;Quant.:{i.count}</tr>)}
                    time={diff}>
                </Card>
            )})}
        </section>
        </div>
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        position:'absolute',
        top: '20%'
    },
    orders:{
        display: 'flex',
        flexWrap: 'wrap',
    },
})

export default Kitchen