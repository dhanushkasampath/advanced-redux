import classes from './CartButton.module.css';
import {uiActions} from "../../store/ui-slice";

import {useDispatch, useSelector} from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();//this is used to execute the methods in relevant slices of redux
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);//this is to access the values of redux store

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  }

  //we have to dispatch our action
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
