######initially this is a dummy app. Buttons will not work.

we are going to develop a react application that uses redux

###now we have to add redux
######npm install @reduxjs/toolkit
######npm install react-redux

when the cart button clicked, cart should be appear. and once clicked it should disappear.
in the cart there are + and - buttons to control the quantity.
if there is 1 and you click - button that item will removed from the cart

divide the store into slices
1. managing the cart,
2. for user interface logic

after making the cart button work(toggle the cart), next we have to manage the items in the cart. for that we can 
add codes to cart-slice.js file

There is "Add to Cart" button. Now we have to wire that button to addItemToCart function in cart-slice.js file
So that we were able to increment the total items in the cart by one when click on the "Add to Cart" button. 

Then the next thing to do is the releavant product needs to be appear on the cart when clicked on "Add to Cart" button.

Now we have to make sure - and + buttons in CartItem works.

============================================

Now we want to connect this cart into a backend application. So that cart items get loaded by making an api call to 
a backend application.

##keep in mind that the idea of REDUX is, reducers must be pure, side-effect free, synchronous functions

So when we have any kind of code that creates side effect, such as sending http requests, such codes should not go 
to our reducer function.

That means in this current example we can not send http requests to update the cart inside the reducer.
For that there are two ways.

1. inside the component(e.g. useEffect ()) -> So redux dont know about it.
2. inside the action creators

let's start with running async code inside our <ProductItem> component.
for this there are many options
1. we can use useSelector and get the cart item and do all the validations done in the reducer and make the POST 
   request. But that is not a good idea.

#### we should not change the states of variables in the redux-store without knowing it.

if you have synchronous, side-effect free code(i.e. data transformations)
1. Prefer Reducers
2. Avoid Action Creators or Components

if you have Async code or code with side-effects
1. Prefer Action Creators or Components
2. Never use Reducers

####issue:
We are currently using firebase as the backend. but the issue with it is we can not do the validations as normal 
backends do. it blindly save data without checking respective data already exists or not.

we can use useEffect for look for changes in Cart.
useEffects allows you to run side-effects.

==================================

if we are in use-effect, we should not ad async.

