
import React from 'react'
import DisplayPrevOrders from './DisplayPrevOrders'

function PreviousOrders({prevOrders}) {
    const previousOrdersKeys = Object.values(prevOrders)
   
  
      return (
        <div>
          <ul>
              {previousOrdersKeys.map(prevItems => <DisplayPrevOrders prevItems={prevItems} key={prevItems.menuitem_id} /> )}
          </ul>
        </div>
      );
  }
  
  export default PreviousOrders;