const axios = require('axios');

async function runTests() {
  const baseUrl = 'http://localhost:3000/ai/get-review';

  // Test 1: Valid prompt
  try {
    const response = await axios.post(baseUrl, { code: 'Test prompt' }, { headers: { 'Content-Type': 'application/json' } });
    console.log('Test 1 Passed: Valid prompt response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Test 1 Failed:', error.response.data);
    } else {
      console.error('Test 1 Failed:', error.message);
    }
  }

  // Test 2: Missing prompt
  try {
    await axios.post(baseUrl, {}, { headers: { 'Content-Type': 'application/json' } });
    console.error('Test 2 Failed: Expected error for missing prompt but got success');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('Test 2 Passed: Missing prompt error:', error.response.data);
    } else {
      console.error('Test 2 Failed:', error.response ? error.response.data : error.message);
    }
  }

  // Test 3: Invalid method (GET)
  try {
    await axios.get(baseUrl);
    console.error('Test 3 Failed: Expected error for GET method but got success');
  } catch (error) {
    if (error.response && error.response.status === 405) {
      console.log('Test 3 Passed: GET method not allowed error:', error.response.data);
    } else {
      console.error('Test 3 Failed:', error.response ? error.response.data : error.message);
    }
  }
}

runTests();
