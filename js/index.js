import { ACCESS_TOKEN, faqData, query, URL } from "./data.js";
import Product from "./product.js";

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts(URL);
  renderAccordion(faqData, 'accordion', 'accordion-template');
});

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

function renderAccordion(items, containerId, templateId) {
  const container = document.getElementById(containerId);
  const accordionTemplate = document.getElementById(templateId);

  items.forEach((item, idx) => {
    const accordionItem = createAccordionItem(item, accordionTemplate, container, idx === 0);
    container.append(accordionItem);
  });
}

function createAccordionItem({title, content}, template, container, isFirstItem) {
  const clone = template.content.cloneNode(true);
  const accordionItem = clone.querySelector(".accordion__item");
  const accordionButton = accordionItem.querySelector(".accordion__header")
  const titleElement = accordionItem.querySelector(".accordion__header-text");
  const contentElement = accordionItem.querySelector(".accordion__text");

  titleElement.textContent = title;
  contentElement.textContent = content;

  if (isFirstItem) accordionButton.setAttribute('aria-expanded', 'true');

  accordionButton.addEventListener('click', () => toggleAccordion(accordionButton, container));

  return accordionItem;
}

function toggleAccordion(button, container) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const allButtons = container.querySelectorAll('.accordion__header');

  allButtons.forEach(item => item.setAttribute('aria-expanded', 'false'));

  if (!isExpanded) {
    button.setAttribute('aria-expanded', 'true');
  }
}