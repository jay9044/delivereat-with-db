import React from 'react'


class Basket extends React.Component {
  constructor(props){
    super(props)
    this.state = {  
      finalPrice: '',
      quantity:this.props.order.quantity
    }
    this.handleSubmit = this.handleSubmit.bind(this)
   
    
  }


  componentDidMount(){
    const { order } = this.props;
    let prices = Array.from(order).map(items => items.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 5.00
    this.setState({
      finalPrice: priceWithDelivery
    });
  }



// when the post is made
 
    
  submitOrder() {
    fetch('/api/orders', {
    method: 'post',
    body: JSON.stringify(this.props.order),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    alert("Thanks for your order! Your order id is: " + data.orderId)
    this.props.clearOrder()
  });
}

handleSubmit(){
  this.submitOrder()
}


    
  render(){
    
    const { order } = this.props;
    let prices = Array.from(order).map(items => items.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 5.00;
  
      return (
        <div className='basket'>
          <h2>Order Status</h2>
          <p><strong>Delivery charge: £5.00</strong></p>
          {Object.keys(this.props.order).map(item => {
            return (
                <div key={this.props.order[item]} className='order'>
                  <h3>{this.props.order[item].item}</h3>
                  <h3>Quantity: {this.props.order[item].quantity} 
                  <input type="button" value="+" />
                  <input type="button" value="-" />
                  </h3>
                  <h3>£ {this.props.order[item].price}</h3>
                </div>
            )
          })}
        
          <p>Total: £{priceWithDelivery.toFixed(2)}</p>
          <button onClick={this.handleSubmit} type="submit"> Confirm Order </button>
        </div>
      );
  }
}

export default Basket;

