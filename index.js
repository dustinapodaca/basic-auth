'use strict';

const { sequelizeDatabase } = require('./src/auth/models/index.js');
const app = require('./src/server.js');

const PORT = process.env.PORT || 3005;

sequelizeDatabase.sync()
  .then(() => {
    app.listen(PORT, () => console.log('Server up on port', PORT));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
