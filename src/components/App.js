import React from 'react';
import '../styles/App.scss';
import MenuResultsMap from './MenuResultsMap'
import Basket from './Basket'
import PreviousOrders from './PreviousOrders'

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu: {},
      order: {},
      prevOrders: {}
    }
    this.getOrder = this.getOrder.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.fetchOrders = this.fetchOrders.bind(this)
  }

  componentDidMount(){
    const cheesecakes = `/api/menudata/cheesecakes`
    this.fetchMenu(cheesecakes)
    this.fetchOrders()
  }
 
  fetchMenu(url){
    fetch(url)
    .then(response => response.json())
    .then(body => {

      this.setState({
        menu: body,
      })
  })
}

  fetchOrders(){
    fetch(`/api/orders/limit`)
    .then(response => response.json())
    .then(body => {
      console.log(body)
      this.setState({
        prevOrders: body
      })
    })
  }

clearOrder(){
  this.setState({
    order: {}
  })
} 

handleDelete(key) {
  this.setState(prevState => ({
    order: prevState.order.filter(el => el.orderedItem != key)
  }));
}


handleChange(event){
  this.setState({
    selection: event.target.value
  }, () => this.fetchMenu(`/api/menudata/${this.state.selection}`))
}

getOrder(order) {
  const matchingOrders = Array.from(this.state.order).find(newOrder => {
    return order.id === newOrder.id;
  });

  if (matchingOrders) {
    matchingOrders.quantity += order.quantity;
    matchingOrders.price += order.price;

    const ordersWithoutCurrentOrder = this.state.order.filter(
      newOrder => {
        return newOrder.id !== order.id;
      }
    );

    this.setState({
      order: ordersWithoutCurrentOrder.concat(matchingOrders)
    });
  } else {
    this.setState({
      order: [...this.state.order, order]
    });
  }
}



  render(){
    return (
      <div className='app menu-layout'>
        <div>
        
        <h3 className='order-status'>Order Status</h3>
        {Object.keys(this.state.order).length === 0 ? null : 
          <Basket handleDelete={this.handleDelete} clearOrder={this.clearOrder} order={this.state.order}/>
          }
          {Object.keys(this.state.prevOrders).length === 0 ? null :
            <PreviousOrders  prevOrders={this.state.prevOrders}/>
          }
          </div>
         
          <div>
          <h3 className='welcome-heading'>Welcome</h3>
          <hr></hr>
           <h1>Philly Cheesecakes</h1>
      
           
            <p>All desserts are made fresh to order. Please give a 48 hour notice for preparation. Small cheesecakes serve six, medium cheesecakes serve eight, and large cheesecakes serve ten to twelve.</p>
            <select value={this.state.selection} name="Dessert Filter" onChange={this.handleChange}>
            <option value='cheesecakes'>CheeseCakes</option>
            <option value="cupcakes">CupCakes</option>
            </select>
            <MenuResultsMap  getOrder={this.getOrder} menu={this.state.menu}/>
            
        </div>
      </div>
    )
  }
}

export default App;

