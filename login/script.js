document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formSections = document.querySelectorAll('.form-section');
    const loginFooter = document.getElementById('login-footer');
    const registerFooter = document.getElementById('register-footer');
    
    function switchTab(tabId) {
        // Update tab buttons
        tabBtns.forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update form sections
        formSections.forEach(section => {
            if (section.id === tabId + '-form') {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        // Update footer
        if (tabId === 'login') {
            loginFooter.style.display = 'block';
            registerFooter.style.display = 'none';
        } else {
            loginFooter.style.display = 'none';
            registerFooter.style.display = 'block';
        }
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Footer links
    document.getElementById('show-register').addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('register');
    });
    
    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('login');
    });
    
    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });
    
    // Form validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Login form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        clearErrors('login');
        
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        const emailError = document.getElementById('loginEmailError');
        const passwordError = document.getElementById('loginPasswordError');
        const loginButton = document.getElementById('loginButton');
        
        let isValid = true;
        
        // Email validation
        if (!email.value) {
            showError(email, emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, emailError, 'Please enter a valid email');
            isValid = false;
        }
        
        // Password validation
        if (!password.value) {
            showError(password, passwordError, 'Password is required');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            loginButton.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                console.log('Login form submitted:', {
                    email: email.value,
                    password: password.value
                });
                
                // Remove loading state
                loginButton.classList.remove('loading');
                
                // Show success message
                alert('Login successful! (This is just a frontend demo)');
            }, 1500);
        }
    });
    
    // Register form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        clearErrors('register');
        
        const name = document.getElementById('registerName');
        const email = document.getElementById('registerEmail');
        const password = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('termsCheckbox');
        
        const nameError = document.getElementById('registerNameError');
        const emailError = document.getElementById('registerEmailError');
        const passwordError = document.getElementById('registerPasswordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        
        const registerButton = document.getElementById('registerButton');
        
        let isValid = true;
        
        // Name validation
        if (!name.value) {
            showError(name, nameError, 'Name is required');
            isValid = false;
        }
        
        // Email validation
        if (!email.value) {
            showError(email, emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, emailError, 'Please enter a valid email');
            isValid = false;
        }
        
        // Password validation
        if (!password.value) {
            showError(password, passwordError, 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            showError(password, passwordError, 'Password must be at least 8 characters');
            isValid = false;
        }
        
        // Confirm password validation
        if (!confirmPassword.value) {
            showError(confirmPassword, confirmPasswordError, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
            isValid = false;
        }
        
        // Terms checkbox validation
        if (!termsCheckbox.checked) {
            alert('Please agree to the Terms and Privacy Policy');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            registerButton.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                console.log('Register form submitted:', {
                    name: name.value,
                    email: email.value,
                    password: password.value
                });
                
                // Remove loading state
                registerButton.classList.remove('loading');
                
                // Show success message
                alert('Registration successful! (This is just a frontend demo)');
                
                // Switch to login tab
                switchTab('login');
            }, 1500);
        }
    });
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearErrors(formType) {
        const inputs = document.querySelectorAll(`#${formType}-form input`);
        const errors = document.querySelectorAll(`#${formType}-form .error-message`);
        
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        
        errors.forEach(error => {
            error.textContent = '';
        });
    }
});