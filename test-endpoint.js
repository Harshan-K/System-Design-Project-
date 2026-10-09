const fetch = require('node-fetch');

async function testEndpoint() {
  try {
    console.log('🔍 Testing API endpoint...');
    const response = await fetch('http://localhost:5000/api/admissions/all');
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Data received:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Error response:', await response.text());
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

testEndpoint();