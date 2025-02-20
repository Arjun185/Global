document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/products')
    .then((response) => response.json())
    .then((products) => {
      const productsContainer = document.getElementById('products');
      products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <p>${product.description}</p>
          <button onclick="buyProduct(${product.price})">Buy Now</button>
        `;
        productsContainer.appendChild(productElement);
      });
    });
});

async function buyProduct(price) {
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: price }),
  });
  const { clientSecret } = await response.json();
  // Redirect to Stripe Checkout or handle payment here
  console.log('Payment Intent:', clientSecret);
}
