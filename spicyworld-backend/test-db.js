const mongoose = require('mongoose');
const dns = require('dns');

console.log('--- DB Connection Test ---');

// Apply DNS fixes
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = 'mongodb+srv://rsanthoshtesting_db_user:hsohtnas@cluster0.9y9niut.mongodb.net/spicyworld';

async function testConnection(options, label) {
    console.log(`\nTesting: ${label}...`);
    try {
        const conn = await mongoose.createConnection(uri, {
            ...options,
            serverSelectionTimeoutMS: 5000
        }).asPromise();
        console.log(`✓ ${label} Success!`);
        await conn.close();
        return true;
    } catch (err) {
        console.log(`✗ ${label} Failed: ${err.message}`);
        return false;
    }
}

async function runTests() {
    await testConnection({}, 'Default SRV');
    await testConnection({ tls: true }, 'TLS: true');
    await testConnection({ family: 4 }, 'Force IPv4');
    await testConnection({ tlsAllowInvalidCertificates: true }, 'Allow Invalid Certs');
    
    // Direct shard connection test (non-SRV)
    const directUri = 'mongodb://rsanthoshtesting_db_user:hsohtnas@ac-1ftg2ll-shard-00-00.9y9niut.mongodb.net:27017,ac-1ftg2ll-shard-00-01.9y9niut.mongodb.net:27017,ac-1ftg2ll-shard-00-02.9y9niut.mongodb.net:27017/spicyworld?ssl=true&authSource=admin';
    try {
        console.log(`\nTesting: Direct Shard Connection...`);
        const conn = await mongoose.createConnection(directUri, { serverSelectionTimeoutMS: 5000 }).asPromise();
        console.log(`✓ Direct Success!`);
        await conn.close();
    } catch (err) {
        console.log(`✗ Direct Failed: ${err.message}`);
    }
    
    process.exit(0);
}

runTests();
