document.addEventListener("DOMContentLoaded", () => {
    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll(".login-toggle-password")
  
    togglePasswordBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.previousElementSibling
  
        if (input.type === "password") {
          input.type = "text"
          this.classList.remove("fa-eye")
          this.classList.add("fa-eye-slash")
        } else {
          input.type = "password"
          this.classList.remove("fa-eye-slash")
          this.classList.add("fa-eye")
        }
      })
    })
  
    // Signup form validation
    const signupForm = document.getElementById("signup-form")
  
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Reset errors
      clearErrors(signupForm)
  
      const name = document.getElementById("signup-name")
      const email = document.getElementById("signup-email")
      const password = document.getElementById("signup-password")
      const number = document.getElementById("signup-phone")
      const address = document.getElementById("address")
      const terms = document.getElementById("terms")
      let isValid = true
  
      // Name validation
      if (!name.value) {
        showError(name, "Full name is required")
        isValid = false
      }
  
      // Email validation
      if (!email.value) {
        showError(email, "Email is required")
        isValid = false
      } else if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email")
        isValid = false
      }
  
      // Password validation
      if (!password.value) {
        showError(password, "Password is required")
        isValid = false
      } else if (password.value.length < 8) {
        showError(password, "Password must be at least 8 characters")
        isValid = false
      }

      // Phone-number validation
      if (!number.value) {
        showError(number, "Phone Number is required")
        isValid = false
      } else if (number.value.length < 10) {
        showError(number, "Enter a valid number")
        isValid = false
      }
  
      // Terms checkbox validation
      if (!terms.checked) {
        alert("Please agree to the Terms of Service and Privacy Policy")
        isValid = false
      }
  
      if (isValid) {
        // Show loading state
        const submitBtn = signupForm.querySelector(".login-submit-btn")
        submitBtn.classList.add("loading")
  
        // Simulate API call
        setTimeout(() => {
          console.log("Signup form submitted:", {
            name: name.value,
            email: email.value,
            password: password.value,
            number : number.value,
            address : address.value,
          })
  
          // Remove loading state
          submitBtn.classList.remove("loading")
  
          // Show success message
          alert("Account created successfully! Please log in.")
  
          // Redirect to login page
          window.location.href = "login.html"
        }, 1500)
      }
    })
  
    // Helper functions
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    function showError(input, message) {
      const errorElement = input.parentElement.querySelector(".login-error-message")
      input.classList.add("error")
      errorElement.textContent = message
    }
  
    function clearErrors(form) {
      const inputs = form.querySelectorAll("input")
      const errors = form.querySelectorAll(".login-error-message")
  
      inputs.forEach((input) => {
        input.classList.remove("error")
      })
  
      errors.forEach((error) => {
        error.textContent = ""
      })
    }
  })
  