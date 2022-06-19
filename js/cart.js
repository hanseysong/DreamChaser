console.log('here it is')

let removeCartItemButtons = document.getElementsByClassName('remove')

console.log(removeCartItemButtons)

for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', function(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        console.log('removed')
        updateCartTotal()
    })
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-item')[0]
    let cartRows = document.getElementsByClassName('cart-row')
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement1 = cartRow.getElementsByClassName('product-price')[0]
        let quantityElement = cartRow.getElementsByClassName('product-quantity-1')[0]
        console.log(priceElement1, quantityElement)

    }

}