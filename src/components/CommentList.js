import React from 'react';
import {Comment} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CommentList extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((comment, i) => {
                return (
                        <Comment data={comment}
                            ownership={ (comment.writer == this.props.currentUser) }
                            key={comment._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            onRemove={this.props.onRemove}
                        />
                );
            });
        };

        return(
            <div>
              <ReactCSSTransitionGroup
                transitionName="comment"
                transitionEnterTimeout={2000}
                transitionLeaveTimeout={1000}>
                  {mapToComponents(this.props.data)}
              </ReactCSSTransitionGroup>

            </div>
        );
    }
}

CommentList.PropTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func
}

CommentList.defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
      console.error('Edit function not defined');
    },
    onRemove: (id, index) => {
        console.error('Remove function not defined');
    }
}

export default CommentList;
