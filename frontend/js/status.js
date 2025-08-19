// Load application data
const application = JSON.parse(localStorage.getItem("currentApplication"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
} else if (!application) {
  window.location.href = "application.html";
} else {
  // Display data
  document.getElementById("appId").textContent = application.appId;
  document.getElementById("appName").textContent = application.fullName;
  document.getElementById("certType").textContent = application.certificateType;
  document.getElementById("submissionDate").textContent = application.timestamp || new Date().toLocaleString();

  // Set default status (backend will update this later)
  const statusElement = document.querySelector(".current-status strong");
  statusElement.textContent = "Under Review";
}