import React from 'react';
function Input(props) {
    return(
        <input
        className={props.className}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        />
    )
}

export default Input;