import React from 'react'
import DisplayMenuResults from './DisplayMenuResults'

function MenuResultsMap({menu, getOrder}) {
    const menuKeys = Object.values(menu)
      return (
        <div>
          <h3>Desserts</h3>
            <ul>
              {menuKeys.map(menuItems => <DisplayMenuResults getOrder={getOrder} menuItems={menuItems} key={menuItems.id} /> )}
            </ul>
        </div>
      );
  }
  
  export default MenuResultsMap;
  