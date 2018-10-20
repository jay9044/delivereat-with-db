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
    // this.selectCupcakes = this.selectCupcakes.bind(this)
    // this.selectCheesecakes = this.selectCheesecakes.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
  }

  // do a fillter of drinks cheesecakes etc, look at chris code from last week and rowlands for hamburger basket

  componentDidMount(){
    const cheesecakes = `/api/menudata/cheesecakes`
    this.fetchMenu(cheesecakes)
  }
 
  fetchMenu(url){
    fetch(url)
    .then(response => response.json())
    .then(body => {
      console.log(body)
      this.setState({
        menu: body,
      })
  })
}

clearOrder(){
  this.setState({
    order: {}
  })
} 

// selectCupcakes(event){
//   const cupcakes = `/api/menudata/cupcakes`
//   this.setState({
//     cupcakes: event.target.value
//   }, () => this.fetchMenu(cupcakes))
// }

// selectCheesecakes(event){
//   const cheesecakes = `/api/menudata/cheesecakes`
//   this.setState({
//       cheesecakes: event.target.value
//   }, () => this.fetchMenu(cheesecakes))
// }

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
      <div className='app'>
        {Object.keys(this.state.order).length === 0 ? null : 
          <Basket clearOrder={this.clearOrder} order={this.state.order}/>}
        <h1>Philly Cheesecakes</h1>
        <p>All desserts are made fresh to order. Please give a 48 hour notice for preparation. Small cheesecakes serve six, medium cheesecakes serve eight, and large cheesecakes serve ten to twelve.</p>
        <div>
          <select value={this.state.selection} name="Dessert Filter" onChange={this.handleChange}>
            <option value='cheesecakes'>CheeseCakes</option>
            <option value="cupcakes">CupCakes</option>
            </select>
         </div>
        <MenuResultsMap  getOrder={this.getOrder} menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;

