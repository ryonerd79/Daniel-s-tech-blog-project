const loginFormHandler = async (event) => {
    event.preventDefault();
  console.log('hello')
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the Home page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name  && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
     
      if (response.ok) {
        document.location.replace('/');
      } else {
        
        const data = await response.json();
        if(data.message) {
          const msgEl = document.querySelector('#message');
          msgEl.setAttribute('class', 'alert alert-danger')
          msgEl.innerHTML = data.message
        } else {
          alert(response.statusText);
        }
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
    document.querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);