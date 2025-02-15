// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
  
    // Real-time validation for email
    emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const formGroup = emailInput.closest('.form-group');
  
      if (!emailRegex.test(email)) {
        formGroup.classList.add('invalid');
        formGroup.querySelector('.error-message').textContent = 'Please enter a valid email address.';
      } else {
        formGroup.classList.remove('invalid');
      }
    });
  
    // Real-time validation for password
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value.trim();
      const formGroup = passwordInput.closest('.form-group');
  
      if (password.length < 6) {
        formGroup.classList.add('invalid');
        formGroup.querySelector('.error-message').textContent = 'Password must be at least 6 characters long.';
      } else {
        formGroup.classList.remove('invalid');
      }
    });
  
    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission
  
      // Get form values
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Check if form is valid
      if (!email || !password || document.querySelectorAll('.form-group.invalid').length > 0) {
        alert('Please fix the errors before submitting.');
        return;
      }
  
      // Simulate login (replace with actual API call)
      loginButton.classList.add('loading');
      loginButton.disabled = true;
  
      setTimeout(() => {
        loginButton.classList.remove('loading');
        loginButton.disabled = false;
        alert(`Logged in as ${email}`);
        window.location.href = '/';
      }, 2000); 
    });
  });