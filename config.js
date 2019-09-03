module.exports = {
    // 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb://lpiot:descartes2019@ds215338.mlab.com:15338/siphi',
  
    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'c9UEjhuVbB0RpRQgx2TIL89kRzSVMw70',
  
    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 3000
};