import './index.css'

import React, { useEffect } from 'react';
import CSS from 'csstype';
import { useState } from 'react';

type Props = {
    parentWidth: number,
    parentHeight: number,
    isGameOver: boolean,
}

function GameOverDialog(props: Props){

    const [modalContainerStyle, setModalContainerStyle] = useState<CSS.Properties>({});
    const [modalStyle, setModalStyle] = useState<CSS.Properties>({})
    
    useEffect(() => {
        const nmodalContainerStyle: CSS.Properties = {
            width: String(props.parentWidth).concat('px'),
            height: String(props.parentHeight).concat('px'),
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
            display: props.isGameOver ? 'block' : 'none',
        }

        const modalWidth = props.parentWidth < 800 ? Math.floor(props.parentWidth * 0.9) : Math.floor(props.parentWidth * 0.5);
        const modalHeight = Math.floor(props.parentHeight*0.4); 
        const modalTop = (props.parentHeight - modalHeight)/2;

        const nmodalStyle: CSS.Properties = {
            width: String(modalWidth).concat('px'),
            height: String(modalHeight).concat('px'),
            margin: 'auto',
            backgroundColor: 'white',
            marginTop: String(modalTop).concat('px'),
            zIndex: 1,
            borderRadius: '8px',
            textAlign: 'center',
            animationName: 'gameOver',
            animationDuration: '0.5s',
            overflow: 'hidden'
        }
        
        setModalContainerStyle(nmodalContainerStyle);
        setModalStyle(nmodalStyle);
    },[props]);

    return(
        <div id="gameOverModal" className='modalContainer' style={modalContainerStyle}>
            <div className='modal' style={modalStyle}>
                <section className='modal-header'>
                    <h1 style={{padding: '8px 16px', textAlign: 'right'}}>&times;</h1>
                </section>
                <section className="modal-body">
                    <h1>Red is the Winner!!!</h1>
                </section>            
            </div>
        </div>
    );

}

export default GameOverDialog;