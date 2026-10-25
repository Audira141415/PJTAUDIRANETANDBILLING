const http = require('http');

const API_URL = 'localhost';
const API_PORT = process.env.PORT || 3218;

let authToken = '';
let createdPackageId = '';

// Helper untuk membuat request HTTP
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_URL,
      port: API_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          };
          resolve(response);
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function test1_Login() {
  console.log('\n=== TEST 1: Login Admin ===');
  try {
    const response = await makeRequest('POST', '/auth/login', {
      email: 'admin@audira.net',
      password: 'admin123'
    });

    if (response.statusCode === 200 && response.body.access_token) {
      authToken = response.body.access_token;
      console.log('✅ Login berhasil');
      console.log(`   Token: ${authToken.substring(0, 20)}...`);
      return true;
    } else {
      console.log('❌ Login gagal:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test2_GetPackageStatistics() {
  console.log('\n=== TEST 2: Get Package Statistics ===');
  try {
    const response = await makeRequest('GET', '/packages/statistics/overview', null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil mengambil statistik');
      console.log('   Total Packages:', response.body.total);
      console.log('   Active:', response.body.active);
      console.log('   Inactive:', response.body.inactive);
      console.log('   Total Revenue:', response.body.totalRevenue);
      return true;
    } else {
      console.log('❌ Gagal mengambil statistik:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test3_CreatePackage() {
  console.log('\n=== TEST 3: Create Package ===');
  try {
    const newPackage = {
      name: 'Package Test ' + Date.now(),
      speed: '50 Mbps',
      price: 250000,
      description: 'Package untuk testing otomatis',
      status: 'active'
    };

    const response = await makeRequest('POST', '/packages', newPackage, authToken);

    if (response.statusCode === 201) {
      createdPackageId = response.body.id;
      console.log('✅ Package berhasil dibuat');
      console.log('   ID:', createdPackageId);
      console.log('   Name:', response.body.name);
      console.log('   Price:', response.body.price);
      console.log('   Speed:', response.body.speed);
      return true;
    } else {
      console.log('❌ Gagal membuat package:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test4_GetPackages() {
  console.log('\n=== TEST 4: Get Packages List ===');
  try {
    const response = await makeRequest('GET', '/packages?page=1&limit=10', null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil mengambil list packages');
      console.log('   Total:', response.body.pagination.total);
      console.log('   Current Page:', response.body.pagination.page);
      console.log('   Packages Count:', response.body.data.length);
      return true;
    } else {
      console.log('❌ Gagal mengambil list:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test5_SearchPackage() {
  console.log('\n=== TEST 5: Search Package ===');
  try {
    const response = await makeRequest('GET', '/packages?search=test&page=1&limit=10', null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil melakukan search');
      console.log('   Results Found:', response.body.data.length);
      return true;
    } else {
      console.log('❌ Gagal search:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test6_FilterByStatus() {
  console.log('\n=== TEST 6: Filter by Status ===');
  try {
    const response = await makeRequest('GET', '/packages?status=active&page=1&limit=10', null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil filter by status');
      console.log('   Active Packages:', response.body.data.length);
      return true;
    } else {
      console.log('❌ Gagal filter:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test7_SortByPrice() {
  console.log('\n=== TEST 7: Sort by Price ===');
  try {
    const response = await makeRequest('GET', '/packages?sortBy=price&sortOrder=desc&page=1&limit=5', null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil sort by price');
      const prices = response.body.data.map(p => p.price);
      console.log('   Prices:', prices.join(', '));
      return true;
    } else {
      console.log('❌ Gagal sort:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test8_GetPackageDetail() {
  console.log('\n=== TEST 8: Get Package Detail ===');
  try {
    if (!createdPackageId) {
      console.log('⚠️  Skipped - No package ID available');
      return true;
    }

    const response = await makeRequest('GET', `/packages/${createdPackageId}`, null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil get detail');
      console.log('   Name:', response.body.name);
      console.log('   Total Customers:', response.body.statistics.totalCustomers);
      console.log('   Active Customers:', response.body.statistics.activeCustomers);
      console.log('   Monthly Revenue:', response.body.statistics.monthlyRevenue);
      return true;
    } else {
      console.log('❌ Gagal get detail:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test9_UpdatePackage() {
  console.log('\n=== TEST 9: Update Package ===');
  try {
    if (!createdPackageId) {
      console.log('⚠️  Skipped - No package ID available');
      return true;
    }

    const updateData = {
      price: 300000,
      description: 'Updated description for testing'
    };

    const response = await makeRequest('PUT', `/packages/${createdPackageId}`, updateData, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Package berhasil diupdate');
      console.log('   New Price:', response.body.price);
      console.log('   New Description:', response.body.description);
      return true;
    } else {
      console.log('❌ Gagal update:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test10_GetAvailablePackages() {
  console.log('\n=== TEST 10: Get Available Packages ===');
  try {
    const response = await makeRequest('GET', '/packages/available', null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Berhasil get available packages');
      console.log('   Available Count:', response.body.length);
      return true;
    } else {
      console.log('❌ Gagal get available:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test11_BulkImport() {
  console.log('\n=== TEST 11: Bulk Import Packages ===');
  try {
    const bulkData = [
      {
        name: 'Bulk Package 1 ' + Date.now(),
        speed: '100 Mbps',
        price: 500000,
        description: 'Bulk import test 1',
        status: 'active'
      },
      {
        name: 'Bulk Package 2 ' + Date.now(),
        speed: '200 Mbps',
        price: 1000000,
        description: 'Bulk import test 2',
        status: 'active'
      }
    ];

    const response = await makeRequest('POST', '/packages/bulk-import', { packages: bulkData }, authToken);

    if (response.statusCode === 201) {
      console.log('✅ Bulk import berhasil');
      console.log('   Success:', response.body.success);
      console.log('   Failed:', response.body.failed);
      return true;
    } else {
      console.log('❌ Gagal bulk import:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

async function test12_DeletePackage() {
  console.log('\n=== TEST 12: Delete Package (Soft Delete) ===');
  try {
    if (!createdPackageId) {
      console.log('⚠️  Skipped - No package ID available');
      return true;
    }

    const response = await makeRequest('DELETE', `/packages/${createdPackageId}`, null, authToken);

    if (response.statusCode === 200) {
      console.log('✅ Package berhasil dihapus (soft delete)');
      console.log('   Status:', response.body.status);
      return true;
    } else {
      console.log('❌ Gagal delete:', response.statusCode);
      console.log('   Response:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║   PACKAGE MANAGEMENT TESTING - Backend API Tests  ║');
  console.log('╚════════════════════════════════════════════════════╝');

  const tests = [
    test1_Login,
    test2_GetPackageStatistics,
    test3_CreatePackage,
    test4_GetPackages,
    test5_SearchPackage,
    test6_FilterByStatus,
    test7_SortByPrice,
    test8_GetPackageDetail,
    test9_UpdatePackage,
    test10_GetAvailablePackages,
    test11_BulkImport,
    test12_DeletePackage
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await test();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    // Delay antar test
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║                   TEST SUMMARY                     ║');
  console.log('╠════════════════════════════════════════════════════╣');
  console.log(`║  Total Tests: ${tests.length.toString().padEnd(37)} ║`);
  console.log(`║  ✅ Passed: ${passed.toString().padEnd(39)} ║`);
  console.log(`║  ❌ Failed: ${failed.toString().padEnd(39)} ║`);
  console.log(`║  Success Rate: ${((passed/tests.length)*100).toFixed(1)}%${' '.repeat(32)} ║`);
  console.log('╚════════════════════════════════════════════════════╝');

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
