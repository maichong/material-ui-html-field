/**
 * app.jsx
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-01-14
 * @author Liang <liang@maichong.it>
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; // Our custom react component

injectTapEventPlugin();

ReactDOM.render(<Main />, document.getElementById('app'));
