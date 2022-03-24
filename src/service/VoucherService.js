import CallAPI from './CallApiService';

const getUserVoucher = (account_id) => {
  return CallAPI(`uservouchers/${account_id}`);
};

const getVoucher = () => {
  return CallAPI(`vouchers`);
};

const userSaveVoucher = (data) => {
  return CallAPI(`vouchers/usersave`, 'POST', data);
};

const userGetVoucher = (account_id) => {
  return CallAPI(`usergetvouchers/${account_id}`);
};

export { getUserVoucher, getVoucher, userSaveVoucher, userGetVoucher };
