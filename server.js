const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A full stack portfolio I built from scratch. An Express server serves the pages, sends my project list through a JSON API, and receives messages from the contact form and saves them to a file.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express"]
  }
];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  console.log("New contact message:", { name, email, message });

  let messages = [];
  if (fs.existsSync("messages.json")) {
    messages = JSON.parse(fs.readFileSync("messages.json", "utf8"));
  }

  messages.push({ name, email, message, date: new Date().toISOString() });
  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});