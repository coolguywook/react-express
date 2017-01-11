import React from 'react';
import {connect} from 'react-redux';
import {Write, CommentList} from 'components';
import { requestAddComment, requestCommentList } from 'actions/comment';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
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

        this.props.requestCommentList(true).then(
            () => {
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

        var mockData = [
            {
                "_id": "578b958ec1da760909c263f4",
                "writer": "coolguywook",
                "contents": "Testing",
                "__v": 0,
                "isEdited": false,
                "date": {
                    "edited": "2016-07-17T14:26:22.428Z",
                    "created": "2016-07-17T14:26:22.428Z"
                },
                "starred": []
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "writer": "velopert",
                "contents": "Data",
                "__v": 0,
                "isEdited": false,
                "date": {
                    "edited": "2016-07-17T14:26:06.999Z",
                    "created": "2016-07-17T14:26:06.999Z"
                },
                "starred": []
            },
            {
                "_id": "578b957cc1da760909c263f2",
                "writer": "velopert",
                "contents": "Mock",
                "__v": 0,
                "isEdited": false,
                "date": {
                    "edited": "2016-07-17T14:26:04.195Z",
                    "created": "2016-07-17T14:26:04.195Z"
                },
                "starred": []
            },
            {
                "_id": "578b9579c1da760909c263f1",
                "writer": "velopert",
                "contents": "Some",
                "__v": 0,
                "isEdited": false,
                "date": {
                    "edited": "2016-07-17T14:26:01.062Z",
                    "created": "2016-07-17T14:26:01.062Z"
                },
                "starred": []
            },
            {
                "_id": "578b9576c1da760909c263f0",
                "writer": "velopert",
                "contents": "Create",
                "__v": 0,
                "isEdited": false,
                "date": {
                    "edited": "2016-07-17T14:25:58.619Z",
                    "created": "2016-07-17T14:25:58.619Z"
                },
                "starred": []
            },
            {
                "_id": "578b8c82c1da760909c263ef",
                "writer": "velopert",
                "contents": "blablablal",
                "__v": 0,
                "isEdited": false,
                "date": {
                    "edited": "2016-07-17T13:47:46.611Z",
                    "created": "2016-07-17T13:47:46.611Z"
                },
                "starred": []
            }
        ];

        return (
            <div className="wrapper">
                {this.props.isLoggedIn
                    ? write
                    : undefined}
                <CommentList data={this.props.commentData} currentUser={this.props.currentUser}/>
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
        isLast: state.comment.list.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestAddComment: (contents) => {
            return dispatch(requestAddComment(contents));
        },
        requestCommentList: (isInitial, listType, id, username) => {
            return dispatch(requestCommentList(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
