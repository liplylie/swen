export default class Actions {
    static setBaseCurrency(currency) {
        return { type: "setBaseCurrency", payload: currency };
    }
    static setRates(rates) {
        return { type: "setRates", payload: rates };
    }
    static setFlag(flag) {
        return { type: "setFlag", payload: flag };
    }
}