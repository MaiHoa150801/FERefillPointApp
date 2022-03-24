import CallAPI from './CallApiService';

const updateCurrent = (data) => {
  return CallAPI('shippermap/updateCurrent', 'POST', data);
};
const getCurrent = () => {
  return CallAPI('shippermap/62319bc0f10d8bb249cdb777');
};
export { updateCurrent, getCurrent };
