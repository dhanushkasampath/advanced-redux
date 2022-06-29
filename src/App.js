import {useSelector, useDispatch} from "react-redux";
import {useEffect, Fragment} from "react";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import Notification from "./components/UI/Notification";

import {sendCartData, fetchCartData} from "./store/cart-actions";

let isInitial = true;//this does not render even though component render multiple times

function App() {
    //to get access to that dispatch action
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.ui.cartIsVisible);//get the state of the cartVisibility by accessing
    // the redux-store
    const cart = useSelector((state) => state.cart);//we get this after updating the redux store. and then we can send
    // the post request to the backend server
    const notification = useSelector(state => state.ui.notification)

    useEffect(() => {
        dispatch(fetchCartData())
    }, [dispatch])


    useEffect(()=>{
        if(isInitial){
            isInitial = false;
            return;
        }

        if(cart.changed){
            dispatch(sendCartData(cart));//this is an alternative instead of having this logic in the App() component.
        }
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
