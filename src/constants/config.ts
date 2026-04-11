/**
 * Global application configuration flags.
 */

export const APP_CONFIG = {
  /**
   * Flag to enable or disable the licensing/payment system.
   * When false, users will not be able to purchase or obtain new licenses.
   */
  ENABLE_LICENSING: true,
  /**
   * Mercado Pago Production Mode: true for production, false for test/sandbox
   */
  MERCADO_PAGO_IS_PROD: true,
  /**
   * PayPal Production Mode: true for production, false for sandbox
   */
  PAYPAL_IS_PROD: true,
  /**
   * Product Prices in MXN and USD
   */
  PRODUCTS: {
    'task-goblin': {
      name: 'Task Goblin Pro',
      price: 249,
      priceUSD: 13,
    },
    'nexo': {
      name: 'Nexo Pro',
      price: 149,
      priceUSD: 8,
    },
    'floaty': {
      name: 'Floaty Pro',
      price: 99,
      priceUSD: 5,
    },
  },
};
