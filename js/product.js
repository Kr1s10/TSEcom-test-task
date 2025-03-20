export default class Product {
  constructor(node, template) {
    const simplifiedNode = this.simplifyNode(node);

    const { variants = [], images = [] } = simplifiedNode;

    this.template = template;
    this.title = simplifiedNode.title;
    this.description = simplifiedNode.description;
    this.price = variants[0]?.price?.amount ? Math.round(variants[0].price.amount) : null;
    this.currency = variants[0]?.price?.currencyCode || null;
    this.compareAtPrice = variants[0]?.compareAtPrice?.amount ? Math.round(variants[0].compareAtPrice.amount) : null;
    this.image = images[0];
    this.hoverImage = images[1];
  }

  simplifyNode(node) {
    return Object.entries(node).reduce((result, [key, value]) => {
      if (value?.edges) {
        result[key] = value.edges.map(edge => this.simplifyNode(edge.node));
      } else {
        result[key] = value;
      }
      return result;
    }, {});
  }

  updateImage(imageElement, imageData) {
    if (imageData) {
      imageElement.src = imageData.url;
      if (imageData.altText) {
        imageElement.alt = imageData.altText;
      }
    } else {
      imageElement?.remove();
    }
  }

  updateTextContent(element, text) {
    if (text) {
      element.textContent = text;
    } else {
      element?.remove();
    }
  }

  generateMarkupElement() {
    const clone = this.template.content.cloneNode(true);
    const productElement = clone.querySelector(".product");

    const imageElement = productElement.querySelector(".product__image");
    this.updateImage(imageElement, this.image);

    const hoverImageElement = productElement.querySelector(".product__image--hover");
    this.updateImage(hoverImageElement, this.hoverImage);

    const titleElement = productElement.querySelector(".product__title");
    this.updateTextContent(titleElement, this.title);

    const descriptionElement = productElement.querySelector(".product__description");
    this.updateTextContent(descriptionElement, this.description);

    const salePriceElement = productElement.querySelector(".product__price-sale");
    const defaultPriceElement = productElement.querySelector(".product__price-default");

    defaultPriceElement.textContent = this.price;
    this.updateTextContent(salePriceElement, this.compareAtPrice);

    return productElement;
  }
}