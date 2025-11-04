
const express = require('express');
const app = express();

app.use(express.json());

let events = [];
let bookings = [];

app.get('/events', (req, res) => {
    res.json(events);
});

app.post('/events/add', (req, res) => {
    const { eventname, eventdate, location } = req.body;
    if (!eventname || !eventdate || !location) {
        return res.status(400).json({ message: "Please provide eventname, eventdate, and location" });
    }
    const newEvent = {
        id: events.length + 1,
        eventname,
        eventdate,
        location
    };
    events.push(newEvent);
    res.status(201).json({ message: "Event added successfully", event: newEvent });
});

app.get('/event/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
});

app.put('/event/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.eventname = req.body.eventname || event.eventname;
    event.eventdate = req.body.eventdate || event.eventdate;
    event.location = req.body.location || event.location;
    res.json({ message: "Event updated successfully", event });
});

app.delete('/event/:id', (req, res) => {
    const index = events.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Event not found" });
    const deletedEvent = events.splice(index, 1);
    res.json({ message: "Event deleted successfully", deletedEvent });
});

app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
    const { eventId, participant, email } = req.body;
    const event = events.find(e => e.id === eventId);
    if (!event) return res.status(400).json({ message: "Invalid event ID" });
    const newBooking = {
        id: bookings.length + 1,
        eventId,
        participant,
        email
    };
    bookings.push(newBooking);
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});

app.get('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
});

app.put('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.participant = req.body.participant || booking.participant;
    booking.email = req.body.email || booking.email;
    res.json({ message: "Booking updated successfully", booking });
});

app.delete('/api/bookings/:id', (req, res) => {
    const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Booking not found" });
    const deletedBooking = bookings.splice(index, 1);
    res.json({ message: "Booking deleted successfully", deletedBooking });
});

app.listen(3000,() =>{
     console.log('Server started')
})

