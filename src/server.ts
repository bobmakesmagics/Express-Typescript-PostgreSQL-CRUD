import app from './app';
import config from './config';

const serverPort = config.port;

app.listen(serverPort, () => {
  console.log(`server is listening on http://localhost:${serverPort}....`);
});
