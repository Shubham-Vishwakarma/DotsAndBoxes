import './index.css'

import ILine from './ILine';

type Props = {
    line: ILine
    setState: any,
    lines: Array<ILine>
}

function Line(props: Props) { 

    let { line, setState, lines } =  props;

    // const OnMouseEnter = () => {
    //     console.log(`OnMouseEnter`);
    //     if(!isSelected){
    //         console.log(`OnMouseEnter lineId=${lineId}`);
    //         if(lineId.includes('horizontal')){
    //             const style = lineCssStyle;
    //             style.height = '4px';
    //             setLineCssStyle({...style});
    //         }
    //         else if(lineId.includes('vertical')){
    //             const style = lineCssStyle;
    //             style.width = '4px';
    //             setLineCssStyle({...style});
    //         }
    //     }
    // }
    
    // const OnMouseLeave = () => {
    //     console.log(`OnMouseLeave`);
    //     if(!isSelected){
    //         console.log(`OnMouseLeave lineId=${lineId}`);
    //         if(lineId.includes('horizontal')){
    //             const style = lineCssStyle;
    //             style.height = '2px';
    //             setLineCssStyle({...style});
    //         }
    //         else if(lineId.includes('vertical')){
    //             const style = lineCssStyle;
    //             style.width = '2px';
    //             setLineCssStyle({...style});
    //         }
    //     }
    // }

    const OnMouseDown = (line: ILine) => {
        console.log(`OnMouseDown on ${line.id}`);
        
        let newLines = lines.map(item => {
            if(item.id === line.id){
                item.style = {...line.style, backgroundColor: '#002661'};
            }
            return item;
        });

        setState({lines: newLines});
    }

    return (
        <div key={line.id} id={line.id} style={line.style} onMouseDown={() => OnMouseDown(line)}></div>
    );
};

export default Line;