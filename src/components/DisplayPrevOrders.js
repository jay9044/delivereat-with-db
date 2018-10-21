import React from 'react'

class DisplayPrevOrders extends React.Component {
  constructor(){
    super()
    this.state = {  
     
    }
  }


 

    
  render(){
    
      return (
        <div>
          <p>{this.props.prevItems.name}</p>
          <p>Order Number {this.props.prevItems.order_id}</p>
          <p>X {this.props.prevItems.quantity}</p>
          <hr></hr>
        </div>
      );
  }
}

export default DisplayPrevOrders;
