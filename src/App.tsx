import Game from './Game'
import BackgroundColorContext from './BackgroundColorContext';
import { useState } from 'react';

function App(){

    const colors: string[] = ['red', 'blue', 'green', '#FF8100'];

    const changeBackgroundColor = (lastBackgroundColor: string) => {
        const lastIndex: number = colors.indexOf(lastBackgroundColor);
        const nextIndex = (lastIndex + 1) % 4;
        setBackgroundColorContext({
            backgroundColor: colors[nextIndex],
            changeBackgroundColor: changeBackgroundColor
        });
    }
    
    const [backgroundColorContext, setBackgroundColorContext] = useState({
        backgroundColor: colors[0],
        changeBackgroundColor: changeBackgroundColor
    });

    return(
        <BackgroundColorContext.Provider value={backgroundColorContext}>
            <Game />
        </BackgroundColorContext.Provider>
    );
}

export default App;