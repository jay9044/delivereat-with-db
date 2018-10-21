
import React from 'react'
import DisplayPrevOrders from './DisplayPrevOrders'

function PreviousOrders({prevOrders}) {
    const previousOrdersKeys = Object.values(prevOrders)

  
      return (
        <div className='prev-order'>
          <h4>Previous Orders</h4>
          <ul>
              {previousOrdersKeys.map(prevItems => <DisplayPrevOrders prevItems={prevItems} key={prevItems.order_id} /> )}
          </ul>
        </div>
      );
  }
  
  export default PreviousOrders;

  
  