import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      color: 'blue'
    };
    console.log('construct');
  }

  componentWillMount(){
    console.log('component will mount');
  }

  componentDidMount(){
    console.log('component did mount');
  }

  componentWillUnmount(){
    console.log('component will unmount');
  }

  render(){
    console.log('render');
    return (
      <div>
        <h1 className='title' style={{fontSize: '12px', color: this.state.color}}>React 小书</h1>
      </div>
    );
  }
}

class Clock extends Component {
  constructor(){
    super();
    this.state = {
      date: new Date()
    };
  }
  componentWillMount(){
    this.timer = setInterval(()=>{
      this.setState({
        date: new Date()
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render(){
    return (
      <div>
        <h1>
          <p>现在的时间是</p>
          {this.state.date.toLocaleTimeString()}
        </h1>
      </div>
    );
  }
}

class AutoFocusInput extends Component {
  componentDidMount(){
    this.input.focus();
  }
  render(){
    return (
      <div>
        <input ref={(input) => this.input = input } />
      </div>
    );
  }
}

class Card extends Component {
  render(){
    return (
      <div className='card'>
        <div className='card-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class Index extends Component {
  constructor(){
    super();
    this.state = {
      isShowHeader: true
    };
  }
  handleShowOrHide(){
    this.setState({
      isShowHeader: !this.state.isShowHeader
    });
  }
  render(){
    return (
      <div>
        {this.state.isShowHeader ? <Header /> : null}
        {this.state.isShowHeader ? <Clock /> : null}
        <AutoFocusInput />
        <button onClick={this.handleShowOrHide.bind(this)}>
          显示/隐藏标题
        </button>
        <Card>
          <h2>React.js 小书</h2>
          <div>开源、免费、专业、简单</div>
          订阅：<input />
        </Card>
        <Editor />
      </div>
    );
  }
}

class Editor extends Component {
  constructor(){
    super();
    this.state = {
      content: '<h1>React.js 小书</h1>'
    };
  }
  render(){
    return (
      <div 
        className='editor-wrapper'
        dangerouslySetInnerHTML={{__html:this.state.content}}>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
