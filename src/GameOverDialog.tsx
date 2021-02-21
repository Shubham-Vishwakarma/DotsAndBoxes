import './index.css'

import { useContext, useEffect } from 'react';
import CSS from 'csstype';
import { useState } from 'react';
import ScoreContext from './ScoreContext';
import Utility from './Utility';
import IScore from './IScore';
import GameStatus from './GameStatus';

type Props = {
    parentWidth: number,
    parentHeight: number,
    gameStatus: GameStatus
}

function GameOverDialog(props: Props){

    const scoreContext = useContext(ScoreContext);

    const [modalContainerStyle, setModalContainerStyle] = useState<CSS.Properties>({});
    const [modalStyle, setModalStyle] = useState<CSS.Properties>({})
    const [winner, setWinner] = useState<string>('');
    
    useEffect(() => {
        const modalContainerStyle = getModalContainerStyle();
        const modalStyle = getModalStyle();
        const winner = getWinner(scoreContext.score);

        setModalContainerStyle(modalContainerStyle);
        setModalStyle(modalStyle);
        setWinner(winner);

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
            display: props.gameStatus === GameStatus.GameOver ? 'block' : 'none',
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
            overflow: 'hidden',
            padding: '8px'
        }
        
        return modalStyle;
    }

    function getWinner(scores: Array<IScore>): string {
        let maxColor = ''
        let maxCount = 0;
        
        for(let i = 0; i < scores.length; i++){
            if(Utility.max(scores[i].value, maxCount) > maxCount){
                maxCount = scores[i].value;
                maxColor = scores[i].key;
            }
        }

        return maxColor;
    }

    return(
        <div id="gameOverModal" className='modalContainer' style={modalContainerStyle}>
            <div className='modal' style={modalStyle}>
                <section className='modal-header'>
                    <h1 id="gameOverCloseButton">&times;</h1>
                </section>
                <section className="modal-body">
                    {
                        scoreContext.score.map(p => {
                            return <p key={p.key} className="finalScoreText">{p.key.toUpperCase()}: {p.value}</p>
                        })
                    }
                    <div>
                        <p id="winnerText">Winner is {winner.toUpperCase()}</p>
                    </div>
                </section>            
            </div>
        </div>
    );

}

export default GameOverDialog;