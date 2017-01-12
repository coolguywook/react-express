import React from 'react';
import {connect} from 'react-redux';
import {Write, CommentList} from 'components';
import {
  requestAddComment,
  requestCommentList,
  requestUpdateComment,
  requestRemoveComment
} from 'actions/comment';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.loadNewComment = this.loadNewComment.bind(this);
        this.loadOldComment = this.loadOldComment.bind(this);

        this.state = {
            loadingState: false
        }
    }

    componentDidMount() {

        const loadCommentLoop = () => {
            this.loadNewComment().then(
                () => {
                    this.commentLoaderTimeoutId = setTimeout(loadCommentLoop, 5000);
                }
            );
        };

        const loadUntilScrollable = () => {
          if($('#body').height() < $(window).height()) {
            this.loadOldComment().then(
              () => {
                if(!this.props.isLast) {
                  loadUntilScrollable();
                }
              }
            );
          }
        };

        this.props.requestCommentList(true).then(
            () => {
              loadUntilScrollable();
              loadCommentLoop();
            }
        );

        $(window).scroll(() => {
            if($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if(!this.state.loadingState) {
                    this.loadOldComment();
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if(this.state.loadingState) {
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.commentLoaderTimeoutId);

        $(window).unbind();
    }

    loadOldComment() {
        if(this.props.isLast) {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        let lastId = this.props.commentData[this.props.commentData.length -1]._id;

        return this.props.requestCommentList(false, 'old', lastId).then(() => {
            if(this.props.isLast) {
                Materialize.toast('This is last page', 2000);
            }
        });
    }

    loadNewComment() {
        if(this.props.listStatus === 'WAITING') {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }

        if(this.props.commentData.length === 0) {
            return this.props.requestCommentList(true);
        }

        return this.props.requestCommentList(false, 'new', this.props.commentData[0]._id);
    }

    handleEdit(id, index, contents) {
      return this.props.requestUpdateComment(id, index, contents).then(
        () => {
          if(this.props.editStatus.status === 'SUCCESS') {
            Materialize.toast('Success!', 2000);
          } else {
            let errorMessage = [
              'Something broke',
              'Please write soemthing',
              'You are not logged in',
              'That memo does not exist anymore',
              'You do not have permission'
            ];

            let error = this.props.editStatus.error;
            let $toastContent = '<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>';
             Materialize.toast($toastContent, 2000);

             // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
             if(error === 3) {
                 setTimeout(()=> {location.reload(false)}, 2000);
             }
          }
        }
      );
    }

    handleRemove(id, index) {
       this.props.requestRemoveComment(id, index).then(() => {
           if(this.props.removeStatus.status === "SUCCESS") {
               setTimeout(() => {
                   if($("body").height() < $(window).height()) {
                       this.loadOldMemo();
                   }
               }, 1000);
           } else {
               let errorMessage = [
                   'Something broke',
                   'You are not logged in',
                   'That memo does not exist',
                   'You do not have permission'
               ];

               let $toastContent = '<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>';
               Materialize.toast($toastContent, 2000);

               if(this.props.removeStatus.error === 2) {
                   setTimeout(()=> {location.reload(false)}, 2000);
               }
           }
       });
   }

    handlePost(contents) {
        return this.props.requestAddComment(contents).then(() => {
            if (this.props.postStatus.status == "SUCCESS") {
                this.loadNewComment().then(
                    () => {
                        Materialize.toast("Success!", 2000);
                    }
                );

            } else {
                let $toastContent;
                switch (this.props.postStatus.error) {
                    case 1:
                        $toastContent = '<span style="color: #FFB4BA">You are not logged in</span>';
                        Materialize.toast($toastContent, 2000);
                        setTimeout(() => {
                            location.reload(false);
                        }, 2000);
                        break;
                    case 2:
                        $toastContent = '<span style="color: #FFB4BA">Please write something</span>';
                        Materialize.toast($toastContent, 2000);
                        break;
                    default:
                        $toastContent = '<span style="color: #FFB4BA">Something Broke</span>';
                        Materialize.toast($toastContent, 2000);
                        break;
                }
            }
        });
    }

    render() {
        const write = (<Write onPost={this.handlePost}/>);


        return (
            <div className="wrapper">
                {this.props.isLoggedIn
                    ? write
                    : undefined}
                <CommentList
                  data={this.props.commentData}
                  currentUser={this.props.currentUser}
                  onEdit={this.handleEdit}
                  onRemove={this.handleRemove}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.comment.post,
        currentUser: state.authentication.status.currentUser,
        commentData: state.comment.list.data,
        listStatus: state.comment.list.status,
        isLast: state.comment.list.isLast,
        editStatus: state.comment.edit,
        removeStatus: state.comment.remove
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestAddComment: (contents) => {
            return dispatch(requestAddComment(contents));
        },
        requestCommentList: (isInitial, listType, id, username) => {
            return dispatch(requestCommentList(isInitial, listType, id, username));
        },
        requestUpdateComment: (id, index, contents) => {
            return dispatch(requestUpdateComment(id, index, contents));
        },
        requestRemoveComment: (id, index) => {
            return dispatch(requestRemoveComment(id, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
