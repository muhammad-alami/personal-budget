const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const BudgetItem = require('./models/BudgetItem');

app.use('/', express.static('public'));
app.use(express.json());

mongoose.set('useCreateIndex', true);
mongoose
  .connect('mongodb://127.0.0.1:27017/personal_budget', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
  try {
    const items = await BudgetItem.find({});
    res.json({
      myBudget: items.map(i => ({ title: i.title, budget: i.value, color: i.color }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Error reading budget from DB' });
  }
});

app.post('/budget', async (req, res) => {
  try {
    const { title, value, color } = req.body;
    const doc = await BudgetItem.create({ title, value, color });
    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
