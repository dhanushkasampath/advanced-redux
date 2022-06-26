import Card from '../UI/Card';
import classes from './ProductItem.module.css';

import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart-slice";

//modern JavaScript -> if key name and value are equal, we can ommit the right side
const ProductItem = (props) => {
    const dispatch = useDispatch();
    const {title, price, description, id} = props;

    const addToCartHandler = () => {
        dispatch(//here carAction is the relevant slice
            cartActions.addItemToCart({//this is the object we are dispatching
                id,//modern JavaScript -> if key name and value are equal, we can ommit the right side
                title,
                price
            }));
    }

    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
