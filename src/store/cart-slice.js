//this file is used to manage the cart
//according to this pattern, all http requests happen in this custom action creator function
//this approach keeps our components clean
import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',//this name is used to access the states in components
    initialState: {
        items: [], //"state.cart.items" initial value is an empty array
        totalQuantity: 0, // "state.cart.totalQuantity"
        changed: false
    },
    reducers:{
        addItemToCart(state, action){//here state is a by-default param-it points to the objects in "initialState"
            // param, action is the newly introduced param. i think there can be more
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);//this check the existing list id
            // with new id in payload
            state.totalQuantity++;//to add item to cart
            state.changed = true;
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
            state.changed = true;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },

        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
    }
});

//we have to export actions because we have to dispatch(execute) those actions
export const cartActions = cartSlice.actions;

export default cartSlice;//this is only used in newly created index.js file which merge slices into overall redux store
