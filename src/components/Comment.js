import React from 'react';
import TimeAgo from 'react-timeago';

class Comment extends React.Component {

    componentDidUpdate() {
        // $('#dropdown-button-' + this.props.data._id).dropdown({
        //     belowOrigin: true
        // });
    }

    componentDidMount() {
        // $('#dropdown-button-'+this.props.data._id).dropdown({
        //     belowOrigin: true
        // });
    }

    render() {
        const { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                    id={`dropdown-button-${data._id}`}
                    data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const commentView = (
            <div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                    <div className="option-button">
                        <a className='dropdown-button'
                            id={`dropdown-button-${data._id}`}
                            data-activates={`dropdown-${data._id}`}>
                            <i className="material-icons icon-button">more_vert</i>
                        </a>
                        <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                            <li><a>Edit</a></li>
                            <li><a>Remove</a></li>
                        </ul>
                    </div>
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );

        return(
            <div className="container comment">
                {commentView}
            </div>
        );
    }
}

Comment.PropTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool
}

Comment.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        isEdited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true
}

export default Comment;
