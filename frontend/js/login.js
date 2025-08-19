// Toggle between Login/Signup forms
document.getElementById('showSignup').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('signupForm').classList.add('active');
});

document.getElementById('showLogin').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('signupForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
});

// Simulate user storage
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}

// Signup: Save user data
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('users'));
  users.push({
    name: document.getElementById('signupName').value,
    email: document.getElementById('signupEmail').value,
    password: document.getElementById('signupPassword').value
  });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Account created! Please login.');
  document.getElementById('signupForm').reset();
  document.getElementById('signupForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
});

// Login: Redirect to status page
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'status.html'; // Redirect to status page
  } else {
    alert('Invalid credentials!');
  }
});

// Redirect if already logged in
if (localStorage.getItem('currentUser')) {
  window.location.href = 'status.html';
}