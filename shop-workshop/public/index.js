let products = [];
const cart = {};

const updateCart = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    document.querySelector('#cartSummary_items').replaceChildren([]);

    for (const key of Object.keys(cart)) {
        const item = products.find((product) => {
            return `${product.id}` === key;
        });

        const quantity = cart[key];
        const price = item.price;

        const itemRow = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.innerText = item.title;

        const itemQuantity = document.createElement('td');
        itemQuantity.innerText = quantity;

        const itemPrice = document.createElement('td');
        itemPrice.innerText = (quantity * price).toFixed(2);

        itemRow.append(itemName, itemQuantity, itemPrice);
        document.querySelector('#cartSummary_items').append(itemRow);

        if (quantity === 0) {
            itemRow.remove();
        }

        totalQuantity += quantity;
        totalPrice = totalPrice + price * quantity;
    }

    document.querySelector('#cartQuantity_total').innerText = totalQuantity;
    document.querySelector('#cartSummary_total').innerText = totalPrice.toFixed(2);
}

const createCard = (product) => {
    const productCard = document.createElement('div');
    productCard.className = 'productCard';

    const productThumbnail = document.createElement('img');
    productThumbnail.className = 'productThumbnail';
    productThumbnail.src = product.thumbnail;

    const productBottomSheet = document.createElement('div');
    productBottomSheet.className = 'productBottomSheet';

    const productInfoContainer = document.createElement('div');
    productInfoContainer.className = 'productInfoContainer';

    const productName = document.createElement('strong');
    productName.className = 'productName';
    productName.innerText = product.title;

    const productPrice = document.createElement('div');
    productPrice.className = 'productPrice';
    productPrice.innerText = '$' + product.price;

    const addToCart = document.createElement('button');
    addToCart.className = 'addToCart';
    addToCart.innerText = '+';


    const deleteItemCart = document.createElement('button');
    deleteItemCart.id = `deleteItemCart${product.id}`;
    deleteItemCart.className = 'deleteItemCart';
    deleteItemCart.innerText = '-';

    addToCart.addEventListener('click', () => {
        if (cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] + 1;

        const deleteButton = document.querySelector(`#deleteItemCart${product.id}`);
        deleteButton.style.display = 'none';
        const display = deleteButton.style.display;

        if (display === 'none' && cart[product.id] >= 1) {
            deleteButton.style.display = 'block';
        }

        updateCart();
    });

    deleteItemCart.addEventListener('click', () => {
        if (cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] - 1;

        const deleteButton = document.querySelector(`#deleteItemCart${product.id}`);
        deleteButton.style.display = 'block';
        const display = deleteButton.style.display;

        if (display === 'block' && cart[product.id] <= 0) {
            deleteButton.style.display = 'none';
        }

        updateCart();
    });

    productInfoContainer.append(productName, productPrice);
    productBottomSheet.append(productInfoContainer, deleteItemCart, addToCart);
    productCard.append(productThumbnail, productBottomSheet);

    document.querySelector('#productList').appendChild(productCard);
}

const hookViewCart = () => {
    const viewCartButton = document.querySelector('#viewCart');
    viewCartButton.addEventListener('click', () => {
        const cartSummary = document.querySelector('#cartSummary');
        const display = cartSummary.style.display;

        if (display === 'block') {
            cartSummary.style.display = 'none';
        } else {
            cartSummary.style.display = 'block';
        }
    });
}

const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(productResponse => {
        products = productResponse.products;
        console.log(products);
        products.forEach(product => {
            createCard(product);
        });
    });
}

fetchProduct();
hookViewCart();