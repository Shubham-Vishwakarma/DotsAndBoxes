import './index.css'

import { useState, useEffect, useContext } from 'react';
import CSS from 'csstype';
import GameStatus from './GameStatus';
import IGameStatusContext from './IGameStatusContext';
import GameStatusContext from './GameStatusContext';
import INumberOfPlayersContext from './INumberOfPlayersContext';
import NumberOfPlayersContext from './NumberOfPlayersContext';

type Props = {
    parentWidth: number,
    parentHeight: number,
    gameStatus: GameStatus,
    OnStart: any
}

function NewGameDialog(props: Props){

    const gameStatusContext = useContext<IGameStatusContext>(GameStatusContext);
    const numberOfPlayerContext = useContext<INumberOfPlayersContext>(NumberOfPlayersContext);

    const [modalContainerStyle, setModalContainerStyle] = useState<CSS.Properties>({});
    const [modalStyle, setModalStyle] = useState<CSS.Properties>({});
    const [gridSize, setGridSize] = useState<number>(0);
    const [numOfPlayers, setNumOfPlayers] = useState<number>(0);
    
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
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }
        
        return modalStyle;
    }

    function OnGridSizeButtonClick(gridSize: number){
        setGridSize(gridSize);
    }

    function OnNumOfPlayersButtonClick(numOfPlayers: number){
        setNumOfPlayers(numOfPlayers)
    }

    function OnStartButtonClick(){

        if(gridSize > 0 && numOfPlayers > 0){
            props.OnStart({rows: gridSize, columns: gridSize});
            gameStatusContext.setGameStatus(GameStatus.Started);
            numberOfPlayerContext.setNumberOfPlayers(numOfPlayers);
        }
        
    }

    return(
        <div id="newGameModal" className='modalContainer' style={modalContainerStyle}>
            <div className='modal' style={modalStyle}>
                <section className="modal-body">
                        <p id="newGameText">New Game</p>
                        <div className="gridSizeContainer">
                            <div className={gridSize === 3 ? "gridSizeButtonSelected" : "gridSizeButton"} onClick={() => OnGridSizeButtonClick(3)}><p>3 X 3</p></div>
                            <div className={gridSize === 4 ? "gridSizeButtonSelected" : "gridSizeButton"} onClick={() => OnGridSizeButtonClick(4)}><p>4 X 4</p></div>
                            <div className={gridSize === 5 ? "gridSizeButtonSelected" : "gridSizeButton"} onClick={() => OnGridSizeButtonClick(5)}><p>5 X 5</p></div>
                        </div>
                        <div className="numOfPlayerContainer">
                            <div className={numOfPlayers === 2 ? "numOfPlayerButtonSelected" : "numOfPlayerButton"} onClick={() => OnNumOfPlayersButtonClick(2)}><p>2</p></div>
                            <div className={numOfPlayers === 3 ? "numOfPlayerButtonSelected" : "numOfPlayerButton"} onClick={() => OnNumOfPlayersButtonClick(3)}><p>3</p></div>
                            <div className={numOfPlayers === 4 ? "numOfPlayerButtonSelected" : "numOfPlayerButton"} onClick={() => OnNumOfPlayersButtonClick(4)}><p>4</p></div>
                        </div>
                </section>
                <section>
                    <button className="startButton" id="startButton" onClick={OnStartButtonClick}>Start</button>
                </section>      
            </div>
        </div>
    );
}

export default NewGameDialog;