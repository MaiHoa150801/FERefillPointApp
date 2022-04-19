import axios from 'axios';
const prefixUrl = 'http://192.168.32.160:8080/api/v1';
import * as SecureStore from 'expo-secure-store';
export default async function CallAPI(endpoint, method = 'GET', body) {
  const profile = await SecureStore.getItemAsync('user');
  const user = JSON.parse(profile);
  const header = user ? { Authorization: `Bearer ${user.token}` } : null;
  return axios({
    method,
    url: `${prefixUrl}/${endpoint}`,
    data: body,
    headers: header,
  });
}
