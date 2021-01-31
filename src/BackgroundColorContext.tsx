import React from 'react';

const BackgroundColorContext = React.createContext({
    backgroundColor: '',
    changeBackgroundColor: (lastBackgroundColor: string) => {}
});

export default BackgroundColorContext;