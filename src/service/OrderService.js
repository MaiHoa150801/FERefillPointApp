import CallAPI from './CallApiService';

const createOrder = (data) => {
  return CallAPI('orders', 'POST', data);
};

const getOrder = (account_id, status) => {
  return CallAPI(`orders/${status}`);
};

const getOrderByStatus = (status) => {
  return CallAPI(`orders/status/${status}`);
};
const updateOrder = (data, orderId) => {
  return CallAPI(`orders/${orderId}`, 'put', data);
};

const getShipperOrder = (status) => {
  return CallAPI(`orders/shipper/?status=${status}`);
};

const getOrderById = (orderId) => {
  return CallAPI(`order/${orderId}`);
};
export {
  createOrder,
  getOrder,
  getOrderByStatus,
  updateOrder,
  getShipperOrder,
  getOrderById,
};
