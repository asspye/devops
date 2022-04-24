import {render} from 'react-dom';
import React from 'react';
import View from './View';

render(
    <View apiPath="/api/" />,
    document.querySelector('.app')
);
