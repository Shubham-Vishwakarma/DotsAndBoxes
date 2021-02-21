import GameStatus from "./GameStatus";

interface IGameStatusContext {
    gameStatus: GameStatus,
    setGameStatus: (_gameStatus: GameStatus) => void
}

export default IGameStatusContext;