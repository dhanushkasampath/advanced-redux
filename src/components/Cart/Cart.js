import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from "react-redux";

const Cart = (props) => {
    //we call use selector and access state.cart
    const cartItems = useSelector((state)=>state.cart.items);//here getting items from redux
    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>
                {/*  earlier it was hardcoded. so that we want to use redux instead of that.
        we want data from redux. for that we use useSelector.*/}
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={{title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price}}
                    />
                ))}
            </ul>
        </Card>
    );
};

export default Cart;
