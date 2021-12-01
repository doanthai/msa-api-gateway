import * as dotenv from 'dotenv';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

let services = JSON.parse(process.env['TARGET']);
const port = +process.env.PORT;

const app = express();

if (!Array.isArray(services) || !services.length) process.exit(1);

services.forEach(w => {
  w.changeOrigin = true;
  app.use(createProxyMiddleware(w));
})

app.listen(port);

console.log(`Api Gateway is listening port ${port}....`);