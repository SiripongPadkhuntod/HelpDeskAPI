const express = require("express");
const app = express();
const { db, collection, query, orderBy, getDocs, updateDoc, doc, serverTimestamp, addDoc, where } = require("./firebase");
const bodyParser = require("body-parser");
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.send("Hello! Node.js");
});

// Get all tickets with optional filtering and sorting
app.get("/tickets", async (req, res) => {
  const { sort = 'updatedAt', filter = 'all', searchTerm = '' } = req.query;
  try {
    const q = query(collection(db, 'tickets'), orderBy(sort, 'desc'));
    const snapshot = await getDocs(q);
    const tickets = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).filter(ticket => (filter === 'all' || ticket.status === filter) && ticket.title.toLowerCase().includes(searchTerm.toLowerCase()));
    res.json(tickets);
  } catch (error) {
    res.status(500).send("Error fetching tickets: " + error.message);
  }
});



// Add a new ticket
app.post("/addTicket", async (req, res) => {
  const ticket = {
    ...req.body,  // กระจาย properties ของ req.body
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  try {
    const ref = await addDoc(collection(db, "tickets"), ticket);
    res.json({ success: true, ticketId: ref.id });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error adding ticket: " + error.message });
  }
});



// Update ticket status
app.put("/updateTicketStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const ticketRef = doc(db, 'tickets', id);
    await updateDoc(ticketRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    res.send("Ticket status updated successfully");
  } catch (error) {
    res.status(500).send("Error updating ticket status: " + error.message);
  }
});

// Update ticket details
app.put("/updateTicketDetails/:id", async (req, res) => {
  const { id } = req.params;
  const details = req.body;
  try {
    const ticketRef = doc(db, 'tickets', id);
    await updateDoc(ticketRef, {
      ...details,
      updatedAt: serverTimestamp(),
    });
    res.send("Ticket details updated successfully");
  } catch (error) {
    res.status(500).send("Error updating ticket details: " + error.message);
  }
});

// Start the server only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 7001;
  app.listen(port, () => {
    console.log("Starting node.js at port " + port);
  });
}

//get ticket by id
app.get("/tickets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticketRef = doc(db, 'tickets', id);
    const ticketDoc = await getDoc(ticketRef);
    if (!ticketDoc.exists()) {
      res.status(404).send("Ticket not found");
    } else {
      res.json({ id: ticketDoc.id, ...ticketDoc.data() });
    }
  } catch (error) {
    res.status(500).send("Error fetching ticket: " + error.message);
  }
});

//search ticket by title
app.get("/searchTicket/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const q = query(collection(db, 'tickets'), where('title', '==', title));
    const snapshot = await getDocs(q);
    const tickets = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(tickets);
  } catch (error) {
    res.status(500).send("Error fetching tickets: " + error.message);
  }
});

module.exports = app;
