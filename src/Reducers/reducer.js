import { combineReducers } from "redux";
import countrySelect from "./countrySelectReducer.js"

const reducer = combineReducers({
    country: countrySelect
});

export default reducer;
