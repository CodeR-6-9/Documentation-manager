// File name display
document.getElementById('document').addEventListener('change', function(e) {
  const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
  document.getElementById('file-name').textContent = fileName;
});

// Form submission
document.getElementById("applicationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const appId = "APP-" + Math.floor(Math.random() * 1000000);
  const applicationData = {
    fullName: document.getElementById("fullName").value,
    fatherName: document.getElementById("fatherName").value,
    phone: document.getElementById("phone").value,
    certificateType: document.getElementById("certificateType").value,
    document: document.getElementById("document").files[0]?.name || "No file",
    status: "Pending",
    appId: appId,
    timestamp: new Date().toLocaleString()
  };
  
  localStorage.setItem("currentApplication", JSON.stringify(applicationData));
  alert(`Application Submitted!\nYour Application ID: ${appId}`);
  window.location.href = "status.html";
});