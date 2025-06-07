import { legacy_createStore as createStore } from "redux";
import reducers from "../reducers/reducers.js";

const initialState = {
    data:{
        ids:[],
        data:{},
        isLoading: false,
        isSuccess: false,
        openEdit:false,
        isSuccessMessage:"Exitoso!",
        form:{},
        information:{},
        expandedAccordion:"",
        dataAutocomplete:{}
    }
}
const store = createStore(reducers, initialState);
export default store;
