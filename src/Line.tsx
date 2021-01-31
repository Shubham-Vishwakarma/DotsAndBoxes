import './index.css'

import ILine from './ILine';
// import { useContext } from 'react';
// import BackgroundColorContext from './BackgroundColorContext';

type Props = {
    line: ILine
    onMouseDown: (line: ILine) => void,
    onMouseEnter: (line: ILine) => void,
    onMouseLeave: (line: ILine) => void,
}

function Line(props: Props) { 

    let { line, onMouseDown, onMouseEnter, onMouseLeave } =  props;
    // const backgroundColorContext = useContext(BackgroundColorContext);

    return (
        <div key={line.id} id={line.id} style={line.style} 
            onMouseDown={() => { if(!line.selected) onMouseDown(line); }}
            onMouseEnter={() => { if(!line.selected) onMouseEnter(line) }}
            onMouseLeave={() => { if(!line.selected) onMouseLeave(line) } }></div>
    );
};

export default Line;