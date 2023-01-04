import app from './app';

const LISTENING_PORT = (process.env.PORT = 3000);

app.listen(LISTENING_PORT, () => {
  console.log(`App listening on port ${LISTENING_PORT}`);
});
