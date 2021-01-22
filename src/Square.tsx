import './index.css'

import React from 'react'
import CSS from 'csstype';

type CssStyle = {
    cssStyle: CSS.Properties
}

const Square = ({ cssStyle } : CssStyle) => ( <div style={cssStyle}></div> );

export default Square;