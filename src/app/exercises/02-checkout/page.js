'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(
    reducer,
    null
  );

  React.useEffect(() => {
    let cartContent = [];
    try {
      cartContent = JSON.parse(window.localStorage.getItem('cart-content'));
      if (cartContent === null) {
        cartContent = [];
      }
    }
    catch {
      console.warn('cart-content was not valid');
    }

    dispatch({
      type: 'client-init',
      initialState: cartContent
    });
  }, []);

  React.useEffect(() => {
    if (items === null) {
      return;
    }

    window.localStorage.setItem('cart-content', JSON.stringify(items?.map(i => {
      return {
        id: i.id,
        quantity: i.quantity
      }
    })));
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
