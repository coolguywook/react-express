import React from 'react';
import {Header, SideNav} from 'components';

import './App.css';

class App extends React.Component {
    render() {
        //let re = /(signin|signup)/;
        //let isAuth = re.test(this.props.location.pathname);
        let isAuth = false;

        return (
            <div>
                {isAuth
                    ? undefined
                    : <div>
                        <Header />
                        <SideNav />
                      </div>}
                {this.props.children}
            </div>
        );
    }
}

export default App;
