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
  MERCADO_PAGO_IS_PROD: false,
  /**
   * Product Prices in MXN
   */
  PRODUCTS: {
    'task-goblin': {
      name: 'Task Goblin Pro',
      // price: 249,
      price: 1,
    },
    'nexo': {
      name: 'Nexo Pro',
      // price: 149,
      price: 1,
    },
    'floaty': {
      name: 'Floaty Pro',
      // price: 99,
      price: 1,
    },
  },
};
