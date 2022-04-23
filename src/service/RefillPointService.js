import CallAPI from './CallApiService';

const getAllRefillPoint = () => {
  return CallAPI('refillpoint');
};
const getRefillPoint = (account_id) => {
  return CallAPI(`refillpoint/${account_id}`);
};
export { getAllRefillPoint, getRefillPoint };
