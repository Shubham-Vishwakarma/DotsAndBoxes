import './index.css'

import CSS from 'csstype';

type Props = {
    cssStyle: CSS.Properties,
    lineId: string
}

const Line = ({ cssStyle, lineId } : Props) => ( <div key={lineId} id={lineId} style={cssStyle}></div> );

export default Line;