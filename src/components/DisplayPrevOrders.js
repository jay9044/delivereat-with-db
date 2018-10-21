import React from 'react'

class DisplayPrevOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {  
     
    }
    
    
  }


  

    
  render(){
    
      return (
        <div>
          <p>{this.props.prevItems.quantity}</p>
          
        </div>
      );
  }
}

export default DisplayPrevOrders;
