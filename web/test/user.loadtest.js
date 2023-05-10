import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 10,
    stages: [
      { duration: '10s', target: 5 },
      { duration: '20s', target: 10 },
      { duration: '10s', target: 0 },
    ],
  };

export default function () {
  const username = 'testuser';
  const data = JSON.stringify({ dateOfBirth: '1990-01-01' });
  const url = `http://${process.env.API_BASE_URL}/hello/${username}`;
  const headers = { 'Content-Type': 'application/json' };
  const res = http.put(url, data, { headers });
  check(res, { 'status is 204': (r) => r.status === 204 });

  const url2 = `http://${process.env.API_BASE_URL}/hello/${username}`;
  const res2 = http.get(url2);
  check(res2, { 'status is 200': (r) => r.status === 200 });
}