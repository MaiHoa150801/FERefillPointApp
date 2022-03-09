import CallAPI from './CallApiService';

const Register = (data) => {
  return CallAPI('register', 'post', data);
};

export { Register };
