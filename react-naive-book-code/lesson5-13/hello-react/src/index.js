import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Title extends Component {
  handleClickOnTitle(word, e){
    console.log('Click on title');
    console.log(e.target.innerHTML);
    console.log(this, word);
  }
  render(){
    return(<h1 onClick={this.handleClickOnTitle.bind(this, 'hello')}>React 小书</h1>)
  }
}

class Header extends Component {

  renderGoodWord(goodWord, badWord) {
    const isGoodWord = true;
    return isGoodWord ? goodWord : badWord;
  }
  render() {
    const goodWord = <strong> is good</strong>;
    const badWord = <span> is not good</span>;
    return (
      <div>
        <h1 className='title'>React 小书 {this.renderGoodWord(goodWord, badWord)}</h1>
        <Title />
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <h2>This is main content</h2>
      </div>
    );
  }
}
class Footer extends Component {
  render() {
    return (
      <div>
        <h2>This is footer</h2>
      </div>
    );
  }
}
class Index extends Component {
  constructor(){
    super();
    this.state = {
      likedText:'已赞', 
      unLikedText: '赞'
    };
  }
  handleClickChange(){
    this.setState({
      likedText:'取消', 
      unLikedText: '点赞'
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Main />
        <LikeButton 
          wordings={this.state} 
          onClick={() => console.log('click on like button')}/>
        <button onClick={this.handleClickChange.bind(this)}>修改 wordings</button>
        <Footer />
      </div>
    );
  }
}

class LikeButton extends Component {
  constructor(props){
    super(props);
    this.state = {count: 0, isLiked: false};
  }
  handleClickOnLikeButton(){
    this.setState({isLiked: !this.state.isLiked});
    this.setState((preState) => {
      return {count: preState.count + 1};
    });
    console.log(this.state.count);
    if(this.props.onClick){
      this.props.onClick();
    }
  }
  render() {
    const wordings = this.props.wordings || { likedText: '取消', unLikedText:'点赞'};
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? wordings.likedText : wordings.unLikedText} 👍
      </button>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

