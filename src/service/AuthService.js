import CallAPI from './CallApiService';

const Register = (data) => {
  return CallAPI('register', 'post', data);
};
const LoginUser = (data) => {
  return CallAPI('login', 'post', data);
};
const LoginGoogle = (data) => {
  return CallAPI('loginGoogle', 'post', data);
};
const LoginFacebook = (data) => {
  return CallAPI('loginFacebook', 'post', data);
};
const forgotPasswordUser = (data) => {
  return CallAPI('password/forgot', 'post', data);
};
const verifyCode = (data) => {
  return CallAPI('password/sendcode', 'post', data);
};
const updatePasswordUser = (data) => {
  return CallAPI('password/reset', 'post', data);
};
const updatePasswordAsyn = (data) => {
  return CallAPI('password/update', 'put', data);
};
export {
  Register,
  LoginUser,
  LoginGoogle,
  LoginFacebook,
  forgotPasswordUser,
  verifyCode,
  updatePasswordUser,
  updatePasswordAsyn,
};
