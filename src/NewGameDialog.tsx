import './index.css'

import { useState, useEffect, useContext } from 'react';
import CSS from 'csstype';
import GameStatus from './GameStatus';
import IGameStatusContext from './IGameStatusContext';
import GameStatusContext from './GameStatusContext';

type Props = {
    parentWidth: number,
    parentHeight: number,
    gameStatus: GameStatus,
    OnStart: any
}

function NewGameDialog(props: Props){

    const gameStatusContext = useContext<IGameStatusContext>(GameStatusContext);

    const [modalContainerStyle, setModalContainerStyle] = useState<CSS.Properties>({});
    const [modalStyle, setModalStyle] = useState<CSS.Properties>({});
    const [gridSize, setGridSize] = useState<number>(0);
    
    useEffect(() => {
        const modalContainerStyle = getModalContainerStyle();
        const modalStyle = getModalStyle();
        
        setModalContainerStyle(modalContainerStyle);
        setModalStyle(modalStyle);

    // eslint-disable-next-line
    },[props.gameStatus, props.parentWidth, props.parentHeight]);

    function getModalContainerStyle(): CSS.Properties {
        const modalContainerStyle: CSS.Properties = {
            width: String(props.parentWidth).concat('px'),
            height: String(props.parentHeight).concat('px'),
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
            display: props.gameStatus === GameStatus.NotStarted ? 'block' : 'none',
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
            animationDuration: '0.75s',
            overflow: 'hidden',
            padding: "16px"
        }
        
        return modalStyle;
    }

    function OnNewGameGridSizeButtonClick(gridSize: number){
        setGridSize(gridSize);
    }

    function OnStartButtonClick(){
        props.OnStart({rows: gridSize, columns: gridSize});
        gameStatusContext.setGameStatus(GameStatus.Started);
    }

    return(
        <div id="newGameModal" className='modalContainer' style={modalContainerStyle}>
            <div className='modal' style={modalStyle}>
                <section className="modal-body">
                        <p id="newGameText">New Game</p>
                        <div className="newGameButtonContainer">
                            <button className="newGameGridSizeButton" onClick={() => OnNewGameGridSizeButtonClick(3)}>3 X 3</button>
                            <button className="newGameGridSizeButton" onClick={() => OnNewGameGridSizeButtonClick(4)}>4 X 4</button>
                            <button className="newGameGridSizeButton" onClick={() => OnNewGameGridSizeButtonClick(5)}>5 X 5</button>
                        </div>
                        <button className="startButton" id="startButton" onClick={OnStartButtonClick}>Start</button>
                </section>            
            </div>
        </div>
    );
}

export default NewGameDialog;