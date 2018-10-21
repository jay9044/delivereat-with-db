import React from 'react'



class Basket extends React.Component {
  constructor(props){
    super(props)
    this.state = {  
      finalPrice: '',
      showOrder: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleted = this.handleDeleted.bind(this)
    
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
    const showOrder = this.props.order
    this.setState({
      showOrder: showOrder,
      button: showOrder ? true : false
    })
    alert("Thanks for your order! Your order id is: " + data.orderId)
    this.props.clearOrder()
  });
}

handleSubmit(){
  this.submitOrder()
}



handleDeleted(event) {
  event.preventDefault();
  this.props.handleDelete(this.props.order.orderedItem);
}


    
  render(){
    const { order } = this.props;
    let prices = Array.from(order).map(items => items.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 5.00;
  
      return (
        <div className='basket sticky'>
          <h3>Your Order</h3>
          <p><strong>Delivery charge: £5.00</strong></p>
          {Object.keys(this.props.order).map(item => {
            return (
                <div key={this.props.order[item]} className='order'>
                  <h3>{this.props.order[item].item}</h3>
                  <h3>Quantity: {this.props.order[item].quantity} 
                  <div>
                    <input type="button" value="+" />
                    <input type="button" value="-" />
                  </div>
                  </h3>
                  <h3>£ {this.props.order[item].price}</h3>
                  <h2 type="submit" onClick={this.handleDeleted}>X</h2>
                  {this.state.order && <button>Show My Order</button>}
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
