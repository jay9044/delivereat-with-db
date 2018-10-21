import React from 'react'


class DisplayMenuResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {  
      quantity: 1
    }
    this.adjustQuantity = this.adjustQuantity.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

     adjustQuantity(event){
        (event.target.value === '-' && this.state.quantity > 1) ? this.setState({quantity: this.state.quantity - 1})
        :
        (event.target.value === '+') ? this.setState({quantity: this.state.quantity + 1}) : 1
     } 
     
     handleSubmit(event){
      event.preventDefault()
        this.makeOrder()
        this.revertQuantity()
    }

    makeOrder(){
      let price = this.props.menuItems.price * this.state.quantity;
      const order = {
        item: this.props.menuItems.name,
        id: this.props.menuItems.id,
        price: price,
        quantity: this.state.quantity
      };
      this.props.getOrder(order);
      }

     
      revertQuantity(){
        this.state.quantity = 1
      }
    
  render(){
   
    return (
    <div>
        <h3>{this.props.menuItems.name} <span>£({this.props.menuItems.price})</span></h3> 
        <img src={`/static/images/${this.props.menuItems.image}`}/>
        <p>{this.props.menuItems.description}</p>
        
        
        <form>
           <input type="button" value="-"  onClick={this.adjustQuantity}/>
           <input type='text' value={this.state.quantity} className='quantity-display-in-basket'/>
           <input  type="button" value="+" onClick={this.adjustQuantity}/>
        </form>    
        <button onClick={this.handleSubmit}>Add To Basket</button> 
    </div>
    );
  }
}

export default DisplayMenuResults;