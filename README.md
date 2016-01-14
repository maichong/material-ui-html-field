#[material-ui-html-field](https://github.com/maichong/material-ui-html-field)

Html WYSIWYG editor based on react & material-ui & simditor.

## Installation

material-ui-html-field is available as an [npm package](https://www.npmjs.org/package/material-ui-html-field).
```sh
npm i material-ui-html-field
```

```js

import React from 'react';
import HtmlField from 'material-ui-html-field';

export default class MyAwesomeReactComponent extends React.Component  {
  constructor(props) {
    super(props);
    this.state={
      html:'',
      htmlError:''
    };
  }
  render(){
    let editorConfig={
		//simditor configure
    }
    return (
      <HtmlField
        floatingLabelText="Html Editor"
        value={this.state.html}
        errorText={this.state.htmlError}
        {...editorConfig}
      />
    )
  }
}

```

## Example

```sh

git clone https://github.com/maichong/material-ui-html-field.git

cd material-ui-html-field/example

npm install

npm start

// see http://localhost:3000

```

## Props

className

errorStyle

errorText

floatingLabelStyle

floatingLabelText

ref

style

value

hintText


[Simditor Config](http://simditor.tower.im/docs/doc-config.html)

>toolbar
>
>toolbarFloat
>
>toolbarFloatOffset
>
>toolbarHidden
>
>defaultImage
>
>tabIndent
>
>params
>
>upload
>
>pasteImage
>
>cleanPaste
>
>imageButton
>
>allowedTags
>
>allowedAttributes
>
>allowedStyles
>
>codeLanguages

## Methods
getValue()

focus()

blur()

## Events
onBlur

onChange

onFocus

## Contribute
[Maichong Software](http://maichong.it)

[Liang Xingchen](https://github.com/liangxingchen)

## License

This project is licensed under the terms of the MIT license
