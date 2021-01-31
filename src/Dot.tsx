import './index.css'

import CSS from 'csstype';
import IDot from './IDot';

type Props = {
    dot: IDot
}

const Dot = (props : Props) => {

    const { dot } = props;

    const stringDotDiameter = String(dot.style.height); 
    const outerDotDiameter = parseInt(stringDotDiameter.substr(0, stringDotDiameter.length - 2));
    const innerDotDiameter = Math.floor(outerDotDiameter * 0.7);

    const innerDotCssStyle: CSS.Properties = {
        backgroundColor: dot.selected ? "#002661" : "#b5cef5",
        height: String(Math.floor(innerDotDiameter)).concat('px'),
        width: String(Math.floor(innerDotDiameter)).concat('px'),
        borderRadius: '50%',
        top: String(Math.floor(innerDotDiameter/4)).concat('px'),
        left: String(Math.floor(innerDotDiameter/4)).concat('px'),
        position: 'absolute',
        margin: 'auto'
    }

    return (
        <div key={dot.id} id={dot.id} style={dot.style}>
            <div style={innerDotCssStyle}></div>
        </div>
    );
};

export default Dot;