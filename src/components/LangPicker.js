import React, { Component } from 'react';

import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/js/init.js';

class LangPicker extends Component {

    constructor(props) {
        super(props);
        this.handleSetLocale = this.handleSetLocale.bind(this);
    }

    componentDidMount() {

    }

    handleSetLocale(e) {
        let locale = e.target.value;
        this.props.onSetLocale(locale);
        this.setState({locale: locale})
    }

    render() {
        return(
            <div id="tx-live-lang-container" className="txlive-langselector txlive-langselector-bottomright">
                <select id="langSelector" defaultValue="en" className=" browser-default" onChange={this.handleSetLocale}>
                  <option value="en">English</option>
                  <option value="ko">한국어</option>
                </select>
            </div>
        );
    }
}

LangPicker.PropTypes = {
    locale: React.PropTypes.string,
    onSetLocale: React.PropTypes.func
}

LangPicker.defaultProps = {
    locale: 'en',
    onSetLocale: () => { console.error('onSetLocale function not defined'); }
}

export default LangPicker;
