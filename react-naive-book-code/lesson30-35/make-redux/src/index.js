// const appState = {
//   title: {
//     text: 'React.js 小书',
//     color: 'red',
//   },
//   content: {
//     text: 'React.js 小书内容',
//     color: 'blue'
//   }
// }

// function dispatch (action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       appState.title.text = action.text
//       break
//     case 'UPDATE_TITLE_COLOR':
//       appState.title.color = action.color
//       break
//     default:
//       break
//   }
// }

// function stateChanger (state, action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       return {
//         ...state,
//         title: {
//           ...state.title,
//           text: action.text
//         }
//       };
//     case 'UPDATE_TITLE_COLOR':
//      return {
//        ...state,
//        title: {
//          ...state.title,
//          color: action.color
//        }
//      };
//     default:
//       return state;
//   }
// }

//合并到reducer
function reducer (state, action) {
  if(!state){
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case 'UPDATE_TITLE_COLOR':
     return {
       ...state,
       title: {
         ...state.title,
         color: action.color
       }
     };
    default:
      return state;
  }
}
// //抽离出store
// function createStore (state, stateChanger){
//   const getState = () => state;
//   const dispatch = (action) => stateChanger(state, action);
//   return { getState, dispatch};
// }

//监控数据变化
// function createStore (state, stateChanger){
//   const listeners = [];
//   const getState = () => state;
//   const subscribe = (listener) => listeners.push(listener);
//   const dispatch = (action) => {
//     state = stateChanger(state, action);
//     listeners.forEach((listener) => listener());
//   }
//   return { getState, dispatch, subscribe };
// }

function createStore(reducer) {
  let state = null;
  const listeners = [];
  const getState = () => state;
  const subscribe = (listener) => listeners.push(listener);
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  dispatch({});
  return { getState, dispatch, subscribe };
}

function renderApp (newAppState, oldAppState={}) {
  if(newAppState === oldAppState) return;
  console.log('render app...');
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function renderTitle (newTitle, oldTitle={}) {
  if(newTitle === oldTitle) return;
  console.log('render titile...');
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent={}) {
  if(newContent === oldContent) return;
  console.log('render content...');
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

//const store = createStore(appState, stateChanger);
const store = createStore(reducer);
let oldState = store.getState();//缓存旧的state

renderApp(store.getState());//首次渲染
store.subscribe(() => {
  const newState = store.getState();
  renderApp(newState, oldState);
  oldState = newState;
}); // 监听数据变化
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'red' }) // 修改标题颜色
//renderApp(appState) // 把新的数据渲染到页面上

