import React from 'react';


export default function Card({name, img, types}) {
    return (
        <div>
            <h4>{name}</h4>
            <h5>{types}</h5>
            <img src = {img} alt= "img not found" width= "200px" height= "250px"/>
        </div>
    );
}
