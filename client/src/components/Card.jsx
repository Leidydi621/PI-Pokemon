import React from 'react';
import styles from './Card.module.css';


export default function Card({name, img, types}) {
    return (
        <div className={styles.card}>
            <div id="card">
            <h4 className={styles.pokeName}>{name}</h4>
            <h5 className={styles.pokeTypes}>{types}</h5>
            <img className={styles.img} src = {img} alt= "img not found" width= "150px" height= "150px"/>
            </div>
        </div>
    );
}
