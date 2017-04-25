const ProductList = React.createClass({
  getInitialState: function(){
    return {
      products: []
    };
  },
  componentDidMount: function() {
    this.updateState();
  },
  handleUpVote: function(id){
    Data.forEach((el) => {
      if(el.id === id){
        el.votes = el.votes + 1;
        return;
      }
    });
    this.updateState();
  },
  updateState: function(){
    const products = Data.sort( (a, b) => {
      return b.votes - a.votes; 
    });
    this.setState({products: products});
  },
  render: function(){
    const products = this.state.products.map((product) => {
      return (
        <Product 
          key={'product-' + product.id} 
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleUpVote}/>
      );
    })
    return (
      <div className='ui items'>
        {products}
      </div>
    );
    //return React.createElement('div', {className: 'ui items'}, 'Hello, friend! I am a basic React component');
  },
});

const Product = React.createClass({
  handleUpVote: function(){
    this.props.onVote(this.props.id);
  },
  render: function(){
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote.bind(this)}>
              <i className='large caret up icon'></i>
            </a>
            {this.props.votes}
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
    );
  },
});

ReactDOM.render(<ProductList />, document.getElementById('content'));