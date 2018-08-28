import axios from 'axios';

axios.defaults.baseURL = 'http://37.139.15.5:8000/api/v1';

export function getData(url, success, failure) {
  axios
    .get(url)
    .then(response => {
      success(response);
    })
    .catch(error => {
      failure(error);
    });
}

export function postData(url, data, success, failure) {
  axios
    .post(url, data)
    .then(response => {
      success(response);
    })
    .catch(error => {
      failure(error);
    });
}

export function isArray(a) {
  return !!a && a.constructor === Array;
}

export function convertIntoArray(data) {
  const array = [];
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      array.push({
        key: k,
        value: data[k]
      });
    }
  }
  return array;
}
