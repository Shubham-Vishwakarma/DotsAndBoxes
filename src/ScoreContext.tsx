import React from 'react'
import IBox from './IBox';
import IScoreContext from './IScoreContext';

const ScoreContext = React.createContext<IScoreContext>({
    score: [],
    updateScore: (boxes: Array<IBox>) => {}
});

export default ScoreContext;