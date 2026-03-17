const { MongoClient } = require('mongodb');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = 'mongodb+srv://rsanthoshtesting_db_user:hsohtnas@cluster0.9y9niut.mongodb.net/spicyworld?retryWrites=true&w=majority';

async function run() {
    const client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
    });

    try {
        console.log('Attempting to connect with MongoClient...');
        await client.connect();
        console.log('✓ Successfully connected to Atlas via MongoClient');
        const collections = await client.db('spicyworld').listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
    } catch (err) {
        console.log('✗ MongoClient connection failed:');
        console.log(err);
    } finally {
        await client.close();
    }
}

run();
