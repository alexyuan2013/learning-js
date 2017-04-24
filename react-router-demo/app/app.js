import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class App extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={Container}>
					<IndexRoute component={Home}/>
					<Route path='address' component={Address}>
						<IndexRoute component={TwitterFeed} />
						<Route path='instagram' component={Instagram} />
						<Route path='query' component={Query} />
					</Route>
					<Route path='/namedComponent' component={NamedComponents}>
						<IndexRoute components={{ title: Title, subTitle: SubTitle }} />
					</Route>
					<Route path='/about(/:name)' component={About} />
					<Route path='*' component={NotFound} />
				</Route>
			</Router>
		);
	}
}

const Home = () => <h1>Hello from Home!</h1>
const Address = (props) => (
<div>
	<br />
	<Link to='/address'>Twitter Feed</Link>
	<Link to='/address/instagram'> Instagram Feed</Link>
	<h1>We are located at 555 Jackson St.</h1>
	{props.children}
</div>
)
const Instagram = () => <h3>Instagram Feed</h3>
const TwitterFeed = () => <h3>TwitterFeed</h3>

const NotFound = () => (<h1>404.. This page is not found!</h1>)
const Nav = ()=> (
	<div>
		<Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link>
		<Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/address'> Address</Link>
		<Link activeStyle={{color:'#53acff'}} to='/about'> About</Link>
		<Link activeStyle={{color:'#53acff'}} to='/namedComponent'> NamedComponents</Link>
		<Link activeStyle={{color:'#53acff'}} to={{ pathname: '/address/query', query: { message: 'Hello from Route Query' }}}> Query</Link>
	</div>
)
const Container = (props) => (
	<div>
		<Nav />
		{props.children}
	</div>
)

const NamedComponents = (props) => (
	<div>
		{props.title}<br />
		{props.subTitle}
	</div>
)

const Title = () => (
	<h1>Hello from Title Component</h1>
)
const SubTitle = () => (
	<h2>Hello from SubTitle Component</h2>
)

const About = (props) => (
  <div>
    <h3>Welcome to the About Page</h3>
    { props.params.name && <h2>Hello, {props.params.name}</h2>}
  </div>
)

const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)

export default App;