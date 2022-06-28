import { createSlice} from "@reduxjs/toolkit";

//this slice is to toggle the cart visibility of the cart on "Cart" button click
const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false, notification: null},//"cartIsVisible" this is the value and type that return
    // from this slice.
    //we cann access this value from any component in this way -> const showCart = useSelector(state => state.ui.cartIsVisible);
    reducers:{
        toggle(state){//under reducers we define methods to execute
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action){//now we have to dispatch this showNotification action when we start sending
            // the data
          state.notification = {
              status: action.payload.status,
              title: action.payload.title,
              message: action.payload.message
          }
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;//this is only used in newly created index.js file which merge slices into overall redux store