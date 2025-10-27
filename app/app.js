onst express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from AI-augmented CI/CD demo!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.listen(port, () => console.log(App listening on ${port}));
