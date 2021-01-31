import './index.css'

import ILine from './ILine';
import { useContext } from 'react';
import BackgroundColorContext from './BackgroundColorContext';

type Props = {
    line: ILine
    setState: any,
    lines: Array<ILine>
}

function Line(props: Props) { 

    let { line, setState, lines } =  props;
    const backgroundColorContext = useContext(BackgroundColorContext);

    const OnMouseEnter = (line: ILine) => {
        if(!line.selected){
            let newLines = lines.map(item => {
                if(item.id === line.id){
                    item.style = {...line.style, backgroundColor: 'rgba(0, 38, 97, 0.6)'};
                }
                return item;
            });

            setState({lines: newLines});
        }
    }
    
    const OnMouseLeave = (line: ILine) => {
        if(!line.selected){
            let newLines = lines.map(item => {
                if(item.id === line.id){
                    item.style = {...line.style, backgroundColor: '#b5cef5'};
                }
                return item;
            });

            setState({lines: newLines});
        }
    }

    const OnMouseDown = (line: ILine) => {
        if(!line.selected){
            let newLines = lines.map(item => {
                if(item.id === line.id){
                    item.style = {...line.style, backgroundColor: backgroundColorContext.backgroundColor};
                    item.selected = true;
                }
                return item;
            });

            backgroundColorContext.changeBackgroundColor(backgroundColorContext.backgroundColor);

            setState({lines: newLines});
        }
    }

    return (
        <div key={line.id} id={line.id} style={line.style} 
            onMouseDown={() => OnMouseDown(line)}
            onMouseEnter={() => OnMouseEnter(line)}
            onMouseLeave={() => OnMouseLeave(line)}></div>
    );
};

export default Line;