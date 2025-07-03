require('dotenv').config();

const app = require('./src/app'); // Make sure this path is correct

const PORT = 3000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server is running on http://127.0.0.1:${PORT}`);
});
