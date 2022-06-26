import {useSelector} from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
    const showCart = useSelector(state => state.ui.cartIsVisible);//get the state of the cartVisibility by accessing
    // the redux-store
    return (
        <Layout>
            {/*decide show or hide the cart*/}
            {showCart && <Cart/>}
            <Products/>
        </Layout>
    );
}

export default App;
