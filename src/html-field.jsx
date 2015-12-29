/**
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-29
 * @author Liang <liang@maichong.it>
 */

'use strict';

import React from 'react';

import Simditor from 'simditor';
import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Transitions from 'material-ui/lib/styles/transitions';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import StylePropable from 'material-ui/lib/mixins/style-propable';

const HtmlField = React.createClass({

  mixins: [
    ContextPure,
    StylePropable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    className: React.PropTypes.string,
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.node,
    floatingLabelStyle: React.PropTypes.object,
    floatingLabelText: React.PropTypes.node,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    ref: React.PropTypes.string,
    hintText: React.PropTypes.string,
    style: React.PropTypes.object,
    value: React.PropTypes.string,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  statics: {
    getRelevantContextKeys(muiTheme)
    {
      const textFieldTheme = muiTheme.textField;

      return {
        floatingLabelColor: textFieldTheme.hintColor,
        backgroundColor: textFieldTheme.backgroundColor,
        errorColor: textFieldTheme.errorColor,
      };
    }
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    newState.muiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    if (nextProps.value && this._editor) {
      this._editor.setValue(nextProps.value);
    }
  },

  componentWillUnmount() {
    if (this._editor) {
      this._editor.destroy();
      this._editor = null;
    }
  },

  getStyles() {
    const props = this.props;
    const {
      floatingLabelColor,
      backgroundColor,
      errorColor,
      } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    let styles = {
      root: {
        fontSize: 16,
        lineHeight: '24px',
        width: '100%',
        display: 'block',
        position: 'relative',
        backgroundColor: backgroundColor,
        fontFamily: this.state.muiTheme.rawTheme.fontFamily,
        marginTop: 20
      },
      floatingLabel: {
        position: 'relative',
        color: floatingLabelColor,
        transition: Transitions.easeOut(),
        marginBottom: 5,
        lineHeight: '22px',
        fontSize: '12px',
        bottom: 'none',
        opacity: 1,
        cursor: 'text',
        transform: 'scale(1) translate3d(0, 0, 0)',
        transformOrigin: 'left top',
      },
      error: {
        position: 'relative',
        bottom: 5,
        fontSize: 12,
        lineHeight: '12px',
        color: errorColor,
        marginTop: 10,
        transition: Transitions.easeOut(),
      }
    };
    styles.error = this.mergeAndPrefix(styles.error, props.errorStyle);
    return styles;
  },

  render() {
    let {
      className,
      errorStyle,
      errorText,
      floatingLabelStyle,
      floatingLabelText,
      ref,
      style,
      value,
      onBlur,
      onChange,
      onFocus,
      hintText,
      toolbar,
      toolbarFloat,
      toolbarFloatOffset,
      toolbarHidden,
      defaultImage,
      tabIndent,
      params,
      upload,
      pasteImage,
      cleanPaste,
      imageButton,
      allowedTags,
      allowedAttributes,
      allowedStyles,
      codeLanguages,
      } = this.props;

    if (!this._editor && this.refs.editor) {
      this._editor = new Simditor({
        textarea: this.refs.editor,
        toolbar,
        toolbarFloat,
        toolbarFloatOffset,
        toolbarHidden,
        defaultImage,
        tabIndent,
        params,
        upload,
        pasteImage,
        cleanPaste,
        imageButton,
        allowedTags,
        allowedAttributes,
        allowedStyles,
        codeLanguages
      });
      this._editor.setValue(this.props.value);
      this._editor.on('valuechanged', this._handleValueChange.bind(this));
      this._editor.on('focus', this._handleFocus.bind(this));
      this._editor.on('blur', this._handleBlur.bind(this));
    }
    let styles = this.getStyles();

    let floatingLabelTextElement = floatingLabelText ? (
      <label
        style={this.prepareStyles(styles.floatingLabel, floatingLabelStyle)}
        onTouchTap={this.focus}>
        {floatingLabelText}
      </label>
    ) : null;

    let errorTextElement = errorText ? (
      <div style={this.prepareStyles(styles.error)}>{errorText}</div>
    ) : null;

    return (
      <div className={className} style={this.prepareStyles(styles.root, this.props.style)}>
        {floatingLabelTextElement}
        <textarea ref="editor" />
        {errorTextElement}
      </div>
    );
  },

  getValue() {
    return this._editor ? this._editor.getValue() : '';
  },

  focus() {
    this._editor && this._editor.focus();
  },

  blur() {
    this._editor && this._editor.blur();
  },

  _handleValueChange(e) {
    this.props.onChange && this.props.onChange(e);
  },

  _handleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  },

  _handleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  },
});

export default HtmlField;
