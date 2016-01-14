/**
 * main.jsx
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-01-14
 * @author Liang <liang@maichong.it>
 */

'use strict';

import React from 'react';

import HtmlField from 'material-ui-html-field';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      htmlError: ''
    };
  }

  render() {
    let editorConfig = {
      //simditor configure
    };
    return (
      <HtmlField
        floatingLabelText="Html Editor"
        value={this.state.html}
        errorText={this.state.htmlError}
        {...editorConfig}
      />
    );
  }
}
