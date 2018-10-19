import React from 'react';
import '../styles/App.scss';
import MenuResultsMap from './MenuResultsMap'
import Basket from './Basket'
class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu: {},
      order: {}
    }
    this.getOrder = this.getOrder.bind(this);
  }


  componentDidMount(){
    this.fetchMenu()
  }

  fetchMenu(){
    fetch('/api/menudata')
    .then(response => response.json())
    .then(body => {
      console.log(body)
      this.setState({
        menu: body,
      })
  })
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
      <div className='app'>
        {Object.keys(this.state.order).length === 0 ? null : 
          <Basket order={this.state.order}/>
        }
        <h1>Philly Cheesecakes</h1>
        <MenuResultsMap  getOrder={this.getOrder} menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;

