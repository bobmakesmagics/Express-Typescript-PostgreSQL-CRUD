import app from './app';

const PORT: Number = 4000;

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}....`);
});
