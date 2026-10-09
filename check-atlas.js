const mongoose = require('mongoose');
require('dotenv').config();

const checkAtlas = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log('✅ Connected successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });
    
    // Check users collection
    const User = require('./backend/models/User');
    const users = await User.find();
    console.log(`\n👥 Users in collection: ${users.length}`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAtlas();