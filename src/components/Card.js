import React from "react";

function Card(props) {

    return (
        <div className="card" onClick={props.handleClick} id={props.id}>
            <img src={props.src} alt='' className="card-painting" id={props.id}/>
        </div>
    )
}

export default Card;