'''
DetailPage handleSubmit
|__ AddToCartForm (form management)
|  |__ QuantityField 
'''

/products/:productId --> ProductDescription
/products/:productId/additional --> ProductAdditional
/products/:productId/reviews --> ProductReviews

DetailPage
Click chon mua:
Open Mini Cart
Go to Cart Page

Cart:
- showMiniCart: true/false
- cartItems --> item (product, quantity)

State tinhs toan phu thuoc vao state co san
- cartItemsCount
- cartTotal

=>> createSelector()