import './index.css'

import IBox from './IBox';

type Props = {
    box: IBox
}

const Box = ({ box } : Props) => ( <div key={box.id} id={box.id} style={box.style}></div> );

export default Box;