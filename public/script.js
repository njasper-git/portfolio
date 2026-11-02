async function loadProjects() {
  const container = document.getElementById("projects-container");

  try {
    const response = await fetch("/api/projects");
    const projects = await response.json();

    container.innerHTML = "";

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Tech:</strong> ${project.tech.join(", ")}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = "<p>Could not load projects.</p>";
  }
}

loadProjects();

const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.ok) {
      statusText.textContent = "Message sent. Thank you!";
      form.reset();
    } else {
      statusText.textContent = result.error;
    }
  } catch (error) {
    statusText.textContent = "Something went wrong. Please try again.";
  }
});