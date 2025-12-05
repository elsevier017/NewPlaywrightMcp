import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

let bookings: any[] = [];
let nextId = 1;

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({ token: 'mock-token' });
  } else {
    res.json({ reason: 'Bad credentials' });
  }
});

app.post('/booking', (req, res) => {
  const booking = { ...req.body, bookingid: nextId++ };
  bookings.push(booking);
  res.json({ bookingid: booking.bookingid, booking });
});

app.get('/booking/:id', (req, res) => {
  const id = Number(req.params.id);
  const booking = bookings.find(b => b.bookingid === id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).send();
  }
});

app.get('/booking', (req, res) => {
  res.json(bookings.map(b => ({ bookingid: b.bookingid })));
});

app.put('/booking/:id', (req, res) => {
  const id = Number(req.params.id);
  let booking = bookings.find(b => b.bookingid === id);
  if (booking) {
    Object.assign(booking, req.body);
    res.json(booking);
  } else {
    res.status(404).send();
  }
});

app.patch('/booking/:id', (req, res) => {
  const id = Number(req.params.id);
  let booking = bookings.find(b => b.bookingid === id);
  if (booking) {
    Object.assign(booking, req.body);
    res.json(booking);
  } else {
    res.status(404).send();
  }
});

app.delete('/booking/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = bookings.findIndex(b => b.bookingid === id);
  if (idx !== -1) {
    bookings.splice(idx, 1);
    res.status(201).send();
  } else {
    res.status(404).send();
  }
});

app.listen(3001, () => {
  console.log('Mock RESTful Booker API running on http://localhost:3001');
});
