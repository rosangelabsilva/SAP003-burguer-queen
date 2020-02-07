import React from 'react';
import Button from './button';
import { StyleSheet, css } from 'aphrodite';

function Menu (props){
    return (
        <Button className = {css(styles.btn)}
        id={props.id}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
        handleClick={() => props.addOrder(props.item)}
        />
    )
}

const styles = StyleSheet.create({
    btn: {
      height: 98,
      width: 110,
      borderBottom: 'solid',
      background: '#FFDAB9',
      margin: 8,
      backgroundAttachment: 'fixed',
      borderRadius: 16,
      fontSize: 17
    },
})
export default Menu