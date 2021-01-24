import './index.css'

import CSS from 'csstype';

type Props = {
    cssStyle: CSS.Properties,
    boxId: string
}

const Box = ({ cssStyle, boxId } : Props) => ( <div key={boxId} id={boxId} style={cssStyle}></div> );

export default Box;