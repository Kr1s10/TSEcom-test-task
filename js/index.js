import { ACCESS_TOKEN, query, URL } from "./data.js";
import Product from "./product.js";

fetchProducts(URL);

async function fetchProducts (url) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    renderProducts(data.data.products.edges, 'products', 'product-template');

  } catch (error) {
    console.error('Error in product request:', error);
  }
}

function renderProducts(products, containerId, templateId) {
  const container = document.getElementById(containerId);
  const productTemplate = document.getElementById(templateId);

  products.forEach(edge => {
    const product = new Product(edge.node, productTemplate);
    const productElement = product.generateMarkupElement();
    container.append(productElement);
  });
}