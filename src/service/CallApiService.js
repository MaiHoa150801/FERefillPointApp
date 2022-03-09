import axios from 'axios';
const prefixUrl = 'https://be-refill-mml5m.ondigitalocean.app/api/v1';
export default function CallAPI(endpoint, method = 'GET', body) {
  return axios({
    method,
    url: `${prefixUrl}/${endpoint}`,
    data: body,
  });
}
