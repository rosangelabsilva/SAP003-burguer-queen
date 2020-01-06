import React from 'react';
function Button(props) {
    return(
      <button
      id={props.id}
      className={props.className}
      onClick={props.handleClick}
      >{props.title}
      {props.item}
      {props.Name} {props.Price}
      </button>
    )
}
export default Button;