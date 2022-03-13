import CallAPI from './CallApiService';

const getSalespersonData = () => {
  return CallAPI('salespersons');
};
const getOneSalespersonData = (id) => {
  return CallAPI(`salesperson/${id}`);
};
export { getSalespersonData, getOneSalespersonData };
