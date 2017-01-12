import React from 'react';
import TimeAgo from 'react-timeago';
import ReactDOM from 'react-dom';

class Comment extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        editMode: false,
        value: props.data.contents
      };
      this.handleTest = this.handleTest.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
      this.handleChnage = this.handleChnage.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
    }

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

    shouldComponentUpdate(nextProps, nextState) {
       let current = {
           props: this.props,
           state: this.state
       };

       let next = {
           props: nextProps,
           state: nextState
       };

       let update = JSON.stringify(current) !== JSON.stringify(next);
       return update;
   }

    handleTest() {
      console.log("click edit button.");
    }

    toggleEdit() {
      if(this.state.editMode) {
        let id = this.props.data._id;
        let index = this.props.index;
        let contents = this.state.value;

        this.props.onEdit(id, index, contents).then(
          () => {
            this.setState({
              editMode: !this.state.editMode
            });
          }
        )
      } else {
        this.setState({
          editMode: !this.state.editMode
        });
      }
    }

    handleChnage(e) {
      this.setState({
        value: e.target.value
      });
    }

    handleRemove() {
      let id = this.props.data._id;
      let index = this.props.index;
      this.props.onRemove(id, index);
    }

    render() {
        const { data, ownership } = this.props;

        const dropDownMenu = (
          <div className="option-button">
            <a onClick={this.toggleEdit}><i className="material-icons tiny">mode_edit</i></a>&nbsp;|&nbsp;
            <a onClick={this.handleRemove}><i className="material-icons tiny">delete</i></a>
          </div>
            /* <div className="option-button">
                <a className="dropdown-button"
                    id={`dropdown-button-${data._id}`}
                    data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button" onClick={this.handleTest}>more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div> */
        );

        let editedInfo = (
          <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );

        const commentView = (
            <div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a> · <TimeAgo date={data.date.created}/>
                    { this.props.data.isEdited ? editedInfo : undefined }
                    { ownership ? dropDownMenu : undefined }
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

        const editView = (
          <div className="write">
              <div className="card">
                  <div className="card-content">
                      <textarea
                          className="materialize-textarea"
                          value={this.state.value}
                          onChange={this.handleChnage}></textarea>
                  </div>
                  <div className="card-action">
                      <a onClick={this.toggleEdit}>OK</a>
                  </div>
              </div>
          </div>
        );

        return(
            <div className="container comment">
                { this.state.editMode ? editView : commentView }
            </div>
        );
    }
}

Comment.PropTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    index: React.PropTypes.number,
    onRemove: React.PropTypes.func
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
    ownership: true,
    onEdit: (id, index, contents) => {
      console.error('OnEdit function not defined');
    },
    onRemove: (id, index) => {
       console.error('onRemove function not defined');
    },
    index: -1
}

export default Comment;
