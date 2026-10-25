const Booking = require('../../models/booking.model');

const allowedConcepts = new Set([
  "Baby Concept",
  "Parents / Aashirwad Concept",
  "Couples Concept",
  "Family / Group",
]);
const allowedTimes = new Set([
  "early-morning",
  "morning",
  "afternoon",
  "evening",
]);

// POST — Create new booking (User side)
const createBooking = async (req, res) => {
  try {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ message: "Please provide valid booking details." });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const concept = typeof body.concept === "string" ? body.concept.trim() : "";
    const date = typeof body.date === "string" ? body.date : "";
    const time = typeof body.time === "string" ? body.time : "";
    const comments = body.comments === undefined ? "" : body.comments;
    const phoneDigits = phone.replace(/\D/g, "").length;
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00.000Z`)
      : null;
    const validDate =
      parsedDate &&
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === date;

    const validBooking =
      name.length > 0 && name.length <= 100 &&
      /^[+0-9().\s-]{10,24}$/.test(phone) && phoneDigits >= 10 && phoneDigits <= 15 &&
      email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      location.length > 0 && location.length <= 200 &&
      allowedConcepts.has(concept) &&
      validDate &&
      allowedTimes.has(time) &&
      typeof comments === "string" && comments.length <= 2000;

    if (!validBooking) {
      return res.status(400).json({ message: "Please provide valid booking details." });
    }

    // Persist only accepted fields so clients cannot set fields such as createdAt.
    const newBooking = new Booking({
      name,
      phone,
      email,
      location,
      concept,
      date,
      time,
      comments: comments.trim(),
    });
    await newBooking.save();
    return res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Booking submission failed:', error.name);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

module.exports = { createBooking };
