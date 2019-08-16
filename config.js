module.exports = {
    // 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb://lpiot:descartes75@ds026558.mlab.com:26558/amphi-app',
  
    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'c9UEjhuVbB0RpRQgx2TIL89kRzSVMw70',
  
    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 3000
};