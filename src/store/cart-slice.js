import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',//this name is used to access the states in components
    initialState: {
        items: [], //"state.cart.items" initial value is an empty array
        totalQuantity: 0, // "state.cart.totalQuantity"
    },
    reducers:{
        addItemToCart(state, action){//here state is a by-default param-it points to the objects in "initialState"
            // param, action is the
            // newly introduced param. i
            // think there can be more
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);//this check the existing list id
            // with new id in payload
            state.totalQuantity++;//to add item to cart
            if(!existingItem){
                state.items.push({//push new object to items array []
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            }else{//then update the existing items
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item=>item.id === id);
            state.totalQuantity--;//to remove item from cart
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

//we have to export actions because we have to dispatch(execute) those actions
export const cartActions = cartSlice.actions;

export default cartSlice;//this is only used in newly created index.js file which merge slices into overall redux store
