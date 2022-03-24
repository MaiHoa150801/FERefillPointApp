import axios from 'axios';
const prefixUrl = 'http://refillpointapp.cleverapps.io/api/v1';
import * as SecureStore from 'expo-secure-store';
export default async function CallAPI(endpoint, method = 'GET', body) {
  const profile = await SecureStore.getItemAsync('user');
  const user = JSON.parse(profile);
  // console.log(user.token);
  const header = user ? { Authorization: `Bearer ${user.token}` } : null;
  return axios({
    method,
    url: `${prefixUrl}/${endpoint}`,
    data: body,
    headers: header,
  });
}
