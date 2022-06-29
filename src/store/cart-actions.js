import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-prep-b4fd7-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error('Could not fetch cart data!');
            }

            return response.json();
        }

        try{
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        }catch (error){
            //dispatch the error notification action again
            dispatch(uiActions.showNotification({//if we have error we dispatch the error notification
                status: 'error',
                title: 'Error!',
                // message: 'Sending cart data failed!'
                message: error.getError
            }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({//we also dispatch an action once the api call is done
            status: 'pending',
            title: 'Sending.....',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {//we create a new function, which is also async
            const response = await fetch('https://react-prep-b4fd7-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
            });

            if(!response.ok){
                throw new Error('Sending cart data failed!');
            }
        }

        try{
            await sendRequest();

            //if we success we dispatch the success notification
            dispatch(uiActions.showNotification({//here 'showNotification' is an action creator
                status: 'success',
                title: 'Sucess!',
                message: 'Sent cart data successfully!'
            }));
        }catch (error){
            dispatch(uiActions.showNotification({//if we have error we dispatch the error notification
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }

    }
}