const initialState = {
    balance: 0,
  };
  
  const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FUNDS':
        return {
          balance: state.balance + action.payload,
        };
      case 'SPEND_FUNDS':
        return {
          balance: state.balance - action.payload,
        };
      default:
        return state;
    }
  };
  
  export default currencyReducer;
  