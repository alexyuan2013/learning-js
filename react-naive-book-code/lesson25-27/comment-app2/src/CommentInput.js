import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {

  constructor(){
    super();
    this.state = {
      username: '',
      content: ''
    };
  }

  static propTypes = {
    onSubmit: PropTypes.func
  }

  componentDidMount(){
    this.textarea.focus();
  }

  handleUsernameChange(event){
    this.setState({
      username: event.target.value
    });
  }

  handleContentChange(event){
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit(){
    if(this.props.onSubmit){
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: Date.now()
      });
    }
    this.setState({content: ''});
  }

  componentWillMount(){
    this._loadUsername();
  }

  _loadUsername(){
    const username = localStorage.getItem('username');
    if(username){
      this.setState({
        username: username
      })
    }
  }

  _saveUsername(username){
    localStorage.setItem('username', username);
  }

  handleUsernameBlur(event){
    this._saveUsername(event.target.value);
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)} 
              ref={(textarea) => this.textarea = textarea}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    );
  }
}

export default CommentInput;