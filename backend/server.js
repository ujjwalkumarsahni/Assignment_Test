import app from './src/app.js'
import dotenv from 'dotenv'
import errorHandler from './src/middleware/errorHandler.js';
dotenv.config();


app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});