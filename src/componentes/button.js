import React from 'react';
function Button(props) {
    return(
      <button
      id={props.id}
      className={props.className}
      onClick={props.onClick}
      >{props.title}
      </button>
    )
}
export default Button;