import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Data from './data.json'

class ProductList extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      sort_high_low: true
    }
  }
  componentDidMount() {
    this._updateState(this.state.sort_high_low)
  }

  _updateState(sortState) {
    const products = sortState ? Data.sort((a, b) => {
      return b.votes - a.votes
    }) : Data.sort((a, b) => {
      return a.votes - b.votes
    })
    this.setState({sort_high_low: sortState, products: products})
  }

  handleVote(productId, upDown) {
    Data.forEach( (el) => {
      if( el.id === productId){
        el.votes = el.votes + upDown
        return
      }
    })
    this._updateState(this.state.sort_high_low)
  }

  handleSort(){
    const sortState = !this.state.sort_high_low
    this._updateState(sortState)
  }

  render() {
    const products = this.state.products.map( (product) => {
      return (
        <Product 
          key = { product.id }
          id = { product.id }
          title = { product.title }
          description = { product.description }
          url = { product.url }
          votes = { product.votes }
          submitter_avatar_url = { product.submitter_avatar_url }
          product_image_url = { product.product_image_url }
          onVote = { this.handleVote.bind(this) }
        />
      )
    })
    return (
      <div className='ui items'>
        <button className='button' onClick={this.handleSort.bind(this)}>
          {this.state.sort_high_low ? 'High to Low' : 'Low to High'}
        </button>
        { products }
      </div>
    )
  }
}

class Product extends Component {
  handleUpVote() {
    this.props.onVote(this.props.id, 1)
    //console.log(e.target)
  }
  handleDownVote(){
    this.props.onVote(this.props.id, -1)
  }
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header' style={{float: 'left'}}>
            <div>
              <a style={{display: 'block'}} onClick={this.handleUpVote.bind(this)}>
                <i className='large caret up icon'></i>
              </a>
              <a style={{display: 'block'}} onClick={this.handleDownVote.bind(this)}>
                <i className='large caret down icon'></i>
              </a>
            </div>
            <div>{this.props.votes}</div>
          </div>
          <div className='description'>
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img className='ui avatar image' src={this.props.submitter_avatar_url} />
          </div>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render(){
    return (
      <h1>Hello, React!</h1>
    )
  }
}

ReactDOM.render(<ProductList />, document.getElementById('content'))