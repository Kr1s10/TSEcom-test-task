export const URL = 'https://tsodykteststore.myshopify.com/api/2023-01/graphql.json';
export const ACCESS_TOKEN = '7e174585a317d187255660745da44cc7';

export const query = `
  {
    products(first: 10) {
      edges {
        node {
          title
          description
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export const faqData = [
  {
    title: 'How can I track my order?',
    content: 'Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online.'
  },
  {
    title: 'What is delivery time of my order?',
    content: 'Delivery time depends on your location and shipping method. You will receive an estimated delivery date after your order ships.'
  },
  {
    title: 'How can I return my product?',
    content: 'To return a product, visit our returns page. You’ll need your order number and the reason for the return.'
  },
  {
    title: 'What are the shipping costs of my order?',
    content: 'Shipping costs are based on your location and order weight. You can see the exact cost during checkout.'
  },
  {
    title: 'Can I change or cancel my order after placing it?',
    content: 'If you need to change or cancel your order, contact support immediately. We’ll try to accommodate your request before shipping.'
  },
  {
    title: 'What is delivery time of my order?',
    content: 'The estimated delivery time varies depending on your shipping option. You will receive a tracking number once your order ships.'
  }
];