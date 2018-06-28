import 'babel-polyfill';
import express from 'express';
import fallback from 'express-history-api-fallback';
import path from 'path';

const app = express();

const root = path.resolve(__dirname, 'public');
app.use('/', express.static(root));
app.use(fallback('index.html', { root }));

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`));
