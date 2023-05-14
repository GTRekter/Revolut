
const http = require('k6/http');
const { check } = require('k6');

export let options = {
  vus: 10,
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

export function createUser() {
  const endpoint = '/hello/username1';
  const url = `https://${__ENV.API_BASE_URL}${endpoint}`;

  const payload = {
    dateOfBirth: '1990-01-01',
  };
  const options = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.put(url, JSON.stringify({ dateOfBirth: '1990-01-01' }), options);
  console.log(`(PUT) ${url}: ${response.status}`);
  check(response, { 'status is 200': (r) => r.status === 204 });
}

export function getUser() {
  const endpoint = '/hello/username1';
  const url = `https://${__ENV.API_BASE_URL}${endpoint}`;

  const response = http.get(url);
  console.log(`(GET) ${url}: ${response.status}`);
  check(response, { 'status is 200': (r) => r.status === 200 });
}

export default function () {
  createUser();
  getUser();
}
