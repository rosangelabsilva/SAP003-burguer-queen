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
        firebase.firestore().collection('Orders').doc(item.id).update({status: 'Entregar'})
            .then(() => {
                getOrders() 
            })
    }

    const sendFinalized = (item) => {
        firebase.firestore().collection('Orders').doc(item.id).update({
            status: 'Pronto',
            timestampDelivered: new Date().getTime()
        })
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
        <h1 className= {css(styles.title)}>Cozinha</h1>
        <h2 className= {css(styles.title)}>Em preparação</h2>
        <section className= {css(styles.orders)}>
            {data.filter(statusPrepare).map((item, index) =>
                <div key={index}>
                <Card
                    table={item.table}
                    name={item.name}
                    order={item.order.map((elem, index) =><div key={index}><tr>{elem.Name}&emsp;Quant.:{elem.count}</tr></div>)} 
                    title={'Pronto'}
                    status={item.status}
                    handleClick = {() => sendDelivery(item)}>
                </Card>
                </div>
            )}
        </section>
        <h2 className= {css(styles.title)}>Para entrega</h2>
        <section className= {css(styles.orders)}>
            {data.filter(statusDelivery).map((item, index) =>
                <div key={index}>
                <Card
                    table={item.table}
                    name={item.name}
                    status={item.status}
                    order={item.order.map((elem, index) =><div key={index}><tr>{elem.Name}&emsp;Quant.:{elem.count}</tr></div>)} 
                    title={'Entregue'}
                    handleClick = {() => sendFinalized(item)}>
                </Card>
                </div>
            )}
        </section>
        <h2 className= {css(styles.title)}>Finalizados</h2>
        <section className= {css(styles.orders)}>
            {data.filter(statusFinal).map((item, index) =>
                {const send = `${new Date (item.timestamp)
                    .getHours()}h ${new Date (item.timestamp).getMinutes()}m`;
                const entrega = `${new Date (item.timestampDelivered)
                    .getHours()}h ${new Date (item.timestampDelivered).getMinutes()}m`
                const diff = (hmh.diff(`${send}`,`${entrega}`).toString());
                    return(
                        <div key={index}>
                        <Card
                            table={item.table}
                            name={item.name}
                            status={item.status}
                            order={item.order.map((elem, index) =><div key={index}><tr>{elem.Name}&emsp;Quant.:{elem.count}</tr></div>)}
                            time={diff}>
                        </Card>
                        </div>
                    )
                }
            )}
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
    title: {
        marginLeft: 40
    }
})

export default Kitchen