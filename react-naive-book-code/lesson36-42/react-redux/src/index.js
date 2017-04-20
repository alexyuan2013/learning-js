import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content'
//import { Provider } from './react-redux'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import './index.css';

// //通用方法
// function createStore (reducer) {
//   let state = null
//   const listeners = []
//   const subscribe = (listener) => listeners.push(listener)
//   const getState = () => state
//   const dispatch = (action) => {
//     state = reducer(state, action)
//     listeners.forEach((listener) => listener())
//   }
//   dispatch({}) // 初始化 state
//   return { getState, dispatch, subscribe }
// }

//定义reducer
const themeReducer = (state, action) =>{
  if(!state){
    return {
      themeColor: 'red'
    };
  }
  switch(action.type){
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor };
    default:
      return state;
  }
}

const store = createStore(themeReducer);

class Index extends Component {
  // //将store放到index的context中，子部件均可以访问到
  // static childContextTypes = {
  //   store: PropTypes.object
  // }
  

  // getChildContext () {
  //   return { store }
  // }

  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
