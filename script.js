// Function to generate a random 16-byte string (access token)
function generateAccessToken() {
    return [...Array(16)].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const signupPage = document.getElementById('signup-page');
    const profilePage = document.getElementById('profile-page');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logout-btn');
    const signupMessage = document.getElementById('signup-message');
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
  
    // Check if the user is logged in (access token exists in local storage)
    const isLoggedIn = () => !!localStorage.getItem('accessToken');
  
    // Function to display profile details
    const displayProfile = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        profileUsername.textContent = user.username;
        profileEmail.textContent = user.email;
      }
    };
  
    // Function to handle successful signup
    const handleSignup = (username, email, password) => {
      const accessToken = generateAccessToken();
      const user = { username, email, accessToken };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
  
      signupPage.style.display = 'none';
      profilePage.style.display = 'block';
      displayProfile();
    };
  
    // Function to handle logout
    const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      window.location.href = 'index.html'; // Redirect to signup page
    };
  
    // Check if the user is logged in when accessing the Profile page
    if (isLoggedIn()) {
      displayProfile();
      signupPage.style.display = 'none';
      profilePage.style.display = 'block';
    } else {
      signupPage.style.display = 'block';
      profilePage.style.display = 'none';
    }
  
    // Event listener for signup form submission
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Perform form validation here (e.g., check for empty fields)
  
      handleSignup(username, email, password);
    });
  
    // Event listener for logout button
    logoutBtn.addEventListener('click', handleLogout);
  
    // Access control - Redirect users based on their authentication status
    if (isLoggedIn() && window.location.pathname.includes('index.html')) {
      window.location.href = 'profile.html'; // Redirect to profile page
    } else if (!isLoggedIn() && window.location.pathname.includes('profile.html')) {
      window.location.href = 'index.html'; // Redirect to signup page
    }
  });
  