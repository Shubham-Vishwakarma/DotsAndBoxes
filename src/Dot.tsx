import './index.css'

import CSS from 'csstype';

type Props = {
    cssStyle: CSS.Properties,
    dotId: string
}

const Dot = ({ cssStyle, dotId } : Props) => ( <div key={dotId} id={dotId} style={cssStyle}></div> );

export default Dot;