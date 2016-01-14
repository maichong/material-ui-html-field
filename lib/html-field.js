/**
 * @copyright Maichong Software Ltd. 2015 http://maichong.it
 * @date 2015-12-29
 * @author Liang <liang@maichong.it>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simditor = require('simditor');

var _simditor2 = _interopRequireDefault(_simditor);

require('simditor/styles/simditor.css');

var _lightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);

var _themeManager = require('material-ui/lib/styles/theme-manager');

var _themeManager2 = _interopRequireDefault(_themeManager);

var _transitions = require('material-ui/lib/styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _stylePropable = require('material-ui/lib/mixins/style-propable');

var _stylePropable2 = _interopRequireDefault(_stylePropable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlField = _react2.default.createClass({
  displayName: 'HtmlField',

  mixins: [_contextPure2.default, _stylePropable2.default],

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  propTypes: {
    className: _react2.default.PropTypes.string,
    errorStyle: _react2.default.PropTypes.object,
    errorText: _react2.default.PropTypes.node,
    floatingLabelStyle: _react2.default.PropTypes.object,
    floatingLabelText: _react2.default.PropTypes.node,
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    ref: _react2.default.PropTypes.string,
    hintText: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.string
  },

  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      var textFieldTheme = muiTheme.textField;

      return {
        floatingLabelColor: textFieldTheme.hintColor,
        backgroundColor: textFieldTheme.backgroundColor,
        errorColor: textFieldTheme.errorColor
      };
    }
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newState = {};
    newState.muiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    if (nextProps.value && this._editor) {
      this._editor.setValue(nextProps.value);
    }
  },
  componentDidMount: function componentDidMount() {
    this._initEditor();
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this._editor) {
      this._editor.destroy();
      this._editor = null;
    }
  },
  getStyles: function getStyles() {
    var props = this.props;

    var _constructor$getRelev = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var floatingLabelColor = _constructor$getRelev.floatingLabelColor;
    var backgroundColor = _constructor$getRelev.backgroundColor;
    var errorColor = _constructor$getRelev.errorColor;

    var styles = {
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
        transition: _transitions2.default.easeOut(),
        marginBottom: 5,
        lineHeight: '22px',
        fontSize: '12px',
        bottom: 'none',
        opacity: 1,
        cursor: 'text',
        transform: 'scale(1) translate3d(0, 0, 0)',
        transformOrigin: 'left top'
      },
      error: {
        position: 'relative',
        bottom: 5,
        fontSize: 12,
        lineHeight: '12px',
        color: errorColor,
        marginTop: 10,
        transition: _transitions2.default.easeOut()
      }
    };
    styles.error = this.mergeAndPrefix(styles.error, props.errorStyle);
    return styles;
  },
  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var errorText = _props.errorText;
    var floatingLabelStyle = _props.floatingLabelStyle;
    var floatingLabelText = _props.floatingLabelText;

    this._initEditor();
    var styles = this.getStyles();

    var floatingLabelTextElement = floatingLabelText ? _react2.default.createElement(
      'label',
      {
        style: this.prepareStyles(styles.floatingLabel, floatingLabelStyle),
        onTouchTap: this.focus },
      floatingLabelText
    ) : null;

    var errorTextElement = errorText ? _react2.default.createElement(
      'div',
      { style: this.prepareStyles(styles.error) },
      errorText
    ) : null;

    return _react2.default.createElement(
      'div',
      { className: className, style: this.prepareStyles(styles.root, this.props.style) },
      floatingLabelTextElement,
      _react2.default.createElement('textarea', { ref: 'editor' }),
      errorTextElement
    );
  },
  getValue: function getValue() {
    return this._editor ? this._editor.getValue() : '';
  },
  focus: function focus() {
    this._editor && this._editor.focus();
  },
  blur: function blur() {
    this._editor && this._editor.blur();
  },
  _handleValueChange: function _handleValueChange(e) {
    this.props.onChange && this.props.onChange(e);
  },
  _handleFocus: function _handleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  },
  _handleBlur: function _handleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  },
  _initEditor: function _initEditor() {
    if (!this._editor && this.refs.editor) {
      var _props2 = this.props;
      var toolbar = _props2.toolbar;
      var toolbarFloat = _props2.toolbarFloat;
      var toolbarFloatOffset = _props2.toolbarFloatOffset;
      var toolbarHidden = _props2.toolbarHidden;
      var defaultImage = _props2.defaultImage;
      var tabIndent = _props2.tabIndent;
      var params = _props2.params;
      var upload = _props2.upload;
      var pasteImage = _props2.pasteImage;
      var cleanPaste = _props2.cleanPaste;
      var imageButton = _props2.imageButton;
      var allowedTags = _props2.allowedTags;
      var allowedAttributes = _props2.allowedAttributes;
      var allowedStyles = _props2.allowedStyles;
      var codeLanguages = _props2.codeLanguages;

      this._editor = new _simditor2.default({
        textarea: this.refs.editor,
        toolbar: toolbar,
        toolbarFloat: toolbarFloat,
        toolbarFloatOffset: toolbarFloatOffset,
        toolbarHidden: toolbarHidden,
        defaultImage: defaultImage,
        tabIndent: tabIndent,
        params: params,
        upload: upload,
        pasteImage: pasteImage,
        cleanPaste: cleanPaste,
        imageButton: imageButton,
        allowedTags: allowedTags,
        allowedAttributes: allowedAttributes,
        allowedStyles: allowedStyles,
        codeLanguages: codeLanguages
      });
      this._editor.setValue(this.props.value);
      this._editor.on('valuechanged', this._handleValueChange);
      this._editor.on('focus', this._handleFocus);
      this._editor.on('blur', this._handleBlur);
    }
  }
});

exports.default = HtmlField;