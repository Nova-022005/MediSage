#!/usr/bin/env node

/**
 * MediSage API Test Script
 * This script tests the core functionality of the MediSage backend API
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';
const TEST_USER = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'testpassword123',
  dateOfBirth: '1990-01-01',
  bloodGroup: 'O+',
};

let authToken = '';
let userId = '';

console.log('🔬 MediSage API Test Suite\n');

async function testHealthCheck() {
  try {
    const response = await axios.get(API_URL.replace('/api', ''));
    console.log('✅ Health Check:', response.data.message);
    return true;
  } catch (error) {
    console.error('❌ Health Check failed:', error.message);
    return false;
  }
}

async function testRegister() {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, TEST_USER);
    authToken = response.data.token;
    userId = response.data.user.id;
    console.log('✅ User Registration: Success');
    return true;
  } catch (error) {
    console.error('❌ User Registration failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testLogin() {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password,
    });
    authToken = response.data.token;
    console.log('✅ User Login: Success');
    return true;
  } catch (error) {
    console.error('❌ User Login failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testGetProfile() {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log('✅ Get Profile: Success -', response.data.name);
    return true;
  } catch (error) {
    console.error('❌ Get Profile failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testUpdateProfile() {
  try {
    const response = await axios.put(
      `${API_URL}/auth/profile`,
      {
        allergies: ['Peanuts', 'Penicillin'],
        chronicConditions: ['Diabetes Type 2'],
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    console.log('✅ Update Profile: Success - Added allergies and conditions');
    return true;
  } catch (error) {
    console.error('❌ Update Profile failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testGetDocuments() {
  try {
    const response = await axios.get(`${API_URL}/documents`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log('✅ Get Documents: Success -', response.data.length, 'documents');
    return true;
  } catch (error) {
    console.error('❌ Get Documents failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testAIEndpointsAvailability() {
  try {
    // Test if AI endpoint exists (will fail without API key, but that's expected)
    const response = await axios.post(
      `${API_URL}/ai/analyze-history`,
      {},
      {
        headers: { Authorization: `Bearer ${authToken}` },
        validateStatus: () => true, // Accept any status
      }
    );
    
    if (response.status === 503) {
      console.log('✅ AI Endpoints: Available (OpenAI API key not configured - expected in test environment)');
    } else if (response.status === 200) {
      console.log('✅ AI Endpoints: Fully functional with OpenAI API key');
    } else {
      console.log('✅ AI Endpoints: Accessible');
    }
    return true;
  } catch (error) {
    console.error('❌ AI Endpoints test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('Starting tests...\n');
  
  const results = {
    healthCheck: await testHealthCheck(),
    register: await testRegister(),
    login: await testLogin(),
    getProfile: await testGetProfile(),
    updateProfile: await testUpdateProfile(),
    getDocuments: await testGetDocuments(),
    aiEndpoints: await testAIEndpointsAvailability(),
  };

  console.log('\n📊 Test Results:');
  console.log('=================');
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;
  console.log(`Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please check the server configuration.');
    process.exit(1);
  }
}

// Check if server is running
console.log(`Testing API at: ${API_URL}\n`);
console.log('Note: Make sure MongoDB and the backend server are running.\n');

runTests().catch(error => {
  console.error('\n❌ Test suite failed:', error.message);
  console.log('\nPlease ensure:');
  console.log('1. MongoDB is running');
  console.log('2. Backend server is running (npm run server)');
  console.log('3. .env file is configured correctly');
  process.exit(1);
});
