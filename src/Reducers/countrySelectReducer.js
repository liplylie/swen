const initialState = {
  currency: "EUR",
  rates: {}
};

const countrySelect = (state = initialState, action) => {
    console.log(action, "country reducer")
    switch (action.type) {
        case "setBaseCurrency": {
            return { ...state, baseCurrency: action.payload };
        }
        case "setRates": {
            return { ...state, rates: action.payload };
        }
        case "setFlag": {
            return { ...state, flag: action.payload };
        }
        default: {
            return state;
        }
    }
}

export default countrySelect;