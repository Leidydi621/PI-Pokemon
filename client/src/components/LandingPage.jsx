import React from 'react';
import {Link} from 'react-router-dom';

import style from './LandingPage.module.css';


export default function LandingPage(){
    return (
        <div className={style.bkg}>
            <br/>
            <div>

                <h1> Welcome </h1>
                <Link to = '/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
            <br/>
        </div>
    )
}