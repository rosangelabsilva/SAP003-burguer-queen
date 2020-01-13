import React, {useEffect, useState} from 'react';
import firebase from "../config";
import { StyleSheet, css } from 'aphrodite';
import Card from '../componentes/card';

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
            console.log("FROM FIREBASE", itensMenu)
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
        firebase.firestore().collection('Orders').doc(item.id).update({status: 'Pronto'})
            .then(() => {
                getOrders()
            })
    }

    const statusP = (status) => status.status==='Preparação';
    
    const statusDelivery = (status) => status.status==='Entregar';

    const statusFinal = (status) => status.status==='Pronto';

    return(
        <>
        <div className= {css(styles.page)}>        
        <h1>Cozinha</h1>
        <section>
            <h2>Em preparação</h2>
            {data.filter(statusP).map(item =>
                <Card
                    table={item.table}
                    name={item.name}
                    order={item.order.map(i => <tr>{i.Name}&emsp;Quant.:{i.count}</tr>)} 
                    title={'Pronto'}
                    status={item.status}
                    timestamp={item.timestamp}
                    handleClick = {() => sendDelivery(item)}>
                </Card>
            )}
        </section>
        <section>
            <h2>Para entrega</h2>
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
        <section>
            <h2>Finalizados</h2>
            {data.filter(statusFinal).map(item =>
                <Card
                    table={item.table}
                    name={item.name}
                    status={item.status}
                    order={item.order.map(i => <tr>{i.Name}&emsp;Quant.:{i.count}</tr>)}>
                </Card>
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
    }
    
})

export default Kitchen