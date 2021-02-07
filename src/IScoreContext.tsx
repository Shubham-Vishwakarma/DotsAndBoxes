import IBox from "./IBox";
import IScore from "./IScore";

interface IScoreContext {
    score: Array<IScore>,
    updateScore: (boxes: Array<IBox>) => void   
}

export default IScoreContext;