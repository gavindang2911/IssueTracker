const path = require('path');
require('dotenv').config({
  path: path.resolve('sample.env'),
});
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

// const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
// console.log(window.ENV.UI_API_ENDPOINT);

// console.log(`asdfsd ${UI_API_ENDPOINT}`);
export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(
      'https://pure-harbor-07164.herokuapp.com/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      }
    );
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
