import React from 'react';
import {Comment} from 'components';

class CommentList extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((comment, i) => {
                return (
                        <Comment data={comment}
                            ownership={ (comment.writer == this.props.currentUser) }
                            key={comment._id} />
                );
            });
        };

        return(
            <div>
                {mapToComponents(this.props.data)} 
            </div>
        );
    }
}

CommentList.PropTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string
}

CommentList.defaultProps = {
    data: [],
    currentUser: ''
}

export default CommentList;
