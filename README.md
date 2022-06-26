######initially this is a dummy app. Buttons will not work.

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