import { produce } from 'immer';
import DATA from './data';

function reducer(state, action) {
  if (action.type === 'client-init') {
    return action.initialState.map(item => ({
      ...DATA.find(catalogItem => catalogItem.id === item.id),
      quantity: item.quantity
    }));
  }

  return produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.splice(itemIndex, 1);
        return;
      }
    }
  });
}

export default reducer;
