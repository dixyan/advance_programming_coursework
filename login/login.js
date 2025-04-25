document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const tabBtns = document.querySelectorAll(".login-tab-btn")
  const formSections = document.querySelectorAll(".login-form-section")
  const footerText = document.getElementById("login-footer-text")

  function switchTab(tabId) {
    // Update tab buttons
    tabBtns.forEach((btn) => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })

    // Update form sections
    formSections.forEach((section) => {
      if (section.id === tabId + "-section") {
        section.classList.add("active")
      } else {
        section.classList.remove("active")
      }
    })

    // Update footer text
    if (tabId === "login") {
      footerText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-signup">Sign up</a>'
      document.getElementById("toggle-signup").addEventListener("click", (e) => {
        e.preventDefault()
        switchTab("signup")
      })
    } else {
      footerText.innerHTML = 'Already have an account? <a href="#" id="toggle-login">Login</a>'
      document.getElementById("toggle-login").addEventListener("click", (e) => {
        e.preventDefault()
        switchTab("login")
      })
    }
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab)
    })
  })

  // Initial footer link setup
  const toggleSignupLink = document.getElementById("toggle-signup")
  if (toggleSignupLink) {
    toggleSignupLink.addEventListener("click", (e) => {
      e.preventDefault()
      switchTab("signup")
    })
  }

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

  // Form validation
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  // Login form validation
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Reset errors
    clearErrors(loginForm)

    const email = document.getElementById("login-email")
    const password = document.getElementById("login-password")
    let isValid = true

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
    }

    if (isValid) {
      // Show loading state
      const submitBtn = loginForm.querySelector(".login-submit-btn")
      submitBtn.classList.add("loading")

      // Simulate API call
      setTimeout(() => {
        console.log("Login form submitted:", {
          email: email.value,
          password: password.value,
        })

        // Remove loading state
        submitBtn.classList.remove("loading")

        // Redirect to home page (in a real app, this would happen after successful login)
        window.location.href = "../index.html"
      }, 1500)
    }
  })

  // Signup form validation
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Reset errors
    clearErrors(signupForm)

    const name = document.getElementById("signup-name")
    const email = document.getElementById("signup-email")
    const password = document.getElementById("signup-password")
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
        })

        // Remove loading state
        submitBtn.classList.remove("loading")

        // Switch to login tab
        switchTab("login")

        // Show success message
        alert("Account created successfully! Please log in.")
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
