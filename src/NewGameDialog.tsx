import './index.css'

import { useState, useEffect } from 'react';
import CSS from 'csstype';

type Props = {
    parentWidth: number,
    parentHeight: number,
    isNewGame: boolean,
}

function NewGameDialog(props: Props){

    const [modalContainerStyle, setModalContainerStyle] = useState<CSS.Properties>({});
    const [modalStyle, setModalStyle] = useState<CSS.Properties>({})
    
    useEffect(() => {
        const modalContainerStyle = getModalContainerStyle();
        const modalStyle = getModalStyle();
        
        setModalContainerStyle(modalContainerStyle);
        setModalStyle(modalStyle);

    // eslint-disable-next-line
    },[props.isNewGame]);

    function getModalContainerStyle(): CSS.Properties {
        const modalContainerStyle: CSS.Properties = {
            width: String(props.parentWidth).concat('px'),
            height: String(props.parentHeight).concat('px'),
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
            display: props.isNewGame ? 'block' : 'none',
        }

        return modalContainerStyle;
    }

    function getModalStyle(): CSS.Properties {
        const modalWidth = props.parentWidth < 800 ? Math.floor(props.parentWidth * 0.9) : Math.floor(props.parentWidth * 0.5);
        const modalHeight = Math.floor(props.parentHeight*0.4); 
        const modalTop = (props.parentHeight - modalHeight)/2;

        const modalStyle: CSS.Properties = {
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
        
        return modalStyle;
    }

    return(
        <div id="newGameModal" className='modalContainer' style={modalContainerStyle}>
            <div className='modal' style={modalStyle}>
                <section className="modal-body">
                        <h1>New Game</h1>
                </section>            
            </div>
        </div>
    );
}

export default NewGameDialog;