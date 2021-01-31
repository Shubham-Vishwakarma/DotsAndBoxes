import './index.css'

import CSS from 'csstype';

type Props = {
    cssStyle: CSS.Properties,
    dotId: string
}

const Dot = (props : Props) => {

    const { cssStyle, dotId } = props;

    const stringDotDiameter = String(cssStyle.height); 
    const outerDotDiameter = parseInt(stringDotDiameter.substr(0, stringDotDiameter.length - 2));
    const innerDotDiameter = Math.floor(outerDotDiameter * 0.7);

    const innerDotCssStyle: CSS.Properties = {
        backgroundColor: "#b5cef5",
        height: String(Math.floor(innerDotDiameter)).concat('px'),
        width: String(Math.floor(innerDotDiameter)).concat('px'),
        borderRadius: '50%',
        top: String(Math.floor(innerDotDiameter/4)).concat('px'),
        left: String(Math.floor(innerDotDiameter/4)).concat('px'),
        position: 'absolute'
    }

    return (
        <div key={dotId} id={dotId} style={cssStyle}>
            <div style={innerDotCssStyle}></div>
        </div>
    );
};

export default Dot;