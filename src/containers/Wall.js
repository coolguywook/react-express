import React from 'react';
import Home from './Home';

class Wall extends React.Component {
    render() {
        return(
            <div>
                <Home username={this.props.params.username}/>
            </div>
        );
    }
}

export default Wall;
