import {useSelector, useDispatch} from "react-redux";
import {useEffect, Fragment} from "react";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import {uiActions} from "./store/ui-slice";

import Notification from "./components/UI/Notification";

let isInitial = true;//this does not render even though component render multiple times

function App() {
    //to get access to that dispatch action
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.ui.cartIsVisible);//get the state of the cartVisibility by accessing
    // the redux-store
    const cart = useSelector((state)=>state.cart);//we get this after updating the redux store. and then we can send
    // the post request to the backend server
    const notification = useSelector(state => state.ui.notification)


    useEffect(()=>{
        const sendCartData = async () => {//since this is an async function this sendCartData function returns a
            // promise.
            dispatch(uiActions.showNotification({//we also dispatch an action once the api call is done
                status: 'pending',
                title: 'Sending.....',
                message: 'Sending cart data!'
            }));
            const response = await fetch('https://react-prep-b4fd7-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if(!response.ok){
                throw new Error('Sending cart data failed!');
            }

            const responseData = await response.json();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Sucess!',
                message: 'Sent cart data successfully!'
            }));
        };

        if(isInitial){
            isInitial = false;
            return;
        }

        sendCartData().catch(error => {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        })
    }, [cart, dispatch]);//this function re-executes whenever the cart changes.


    return (
        <Fragment>
            {notification && <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}/>}
            <Layout>
                {/*decide show or hide the cart*/}
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;
