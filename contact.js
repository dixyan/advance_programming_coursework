document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Reset previous error messages
        clearErrors()
  
        // Get form values
        const email = document.getElementById("contact-email")
        const message = document.getElementById("contact-message")
  
        // Validate form
        let isValid = true
  
        if (!email.value) {
          showError(email, "Email is required")
          isValid = false
        } else if (!isValidEmail(email.value)) {
          showError(email, "Please enter a valid email")
          isValid = false
        }
  
        if (!message.value) {
          showError(message, "Please describe your issue")
          isValid = false
        }
  
        // If form is valid, submit
        if (isValid) {
          // Show loading state
          const submitBtn = contactForm.querySelector(".submit-btn")
          const originalText = submitBtn.innerHTML
          submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>'
          submitBtn.disabled = true
  
          // Simulate form submission (replace with actual API call)
          setTimeout(() => {
            // Reset form
            contactForm.reset()
  
            // Show success message
            const contactSection = document.querySelector(".contact-section")
            const successMessage = document.createElement("div")
            successMessage.className = "success-message"
            successMessage.innerHTML = `
              <i class="fa-solid fa-check-circle"></i>
              <p>Thank you for your message! We'll get back to you soon.</p>
            `
  
            contactSection.appendChild(successMessage)
  
            // Reset button
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false
  
            // Remove success message after 5 seconds
            setTimeout(() => {
              successMessage.remove()
            }, 5000)
          }, 1500)
        }
      })
    }
  
    // Helper functions
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    function showError(input, message) {
      const errorElement = input.parentElement.querySelector(".error-message")
      input.classList.add("error")
      errorElement.textContent = message
    }
  
    function clearErrors() {
      const inputs = document.querySelectorAll(".input-group input, .input-group textarea")
      const errors = document.querySelectorAll(".error-message")
  
      inputs.forEach((input) => {
        input.classList.remove("error")
      })
  
      errors.forEach((error) => {
        error.textContent = ""
      })
    }
  
    // Add CSS class for error styling
    const style = document.createElement("style")
    style.textContent = `
      .input-group input.error,
      .input-group textarea.error {
        border-color: var(--primary);
      }
      
      .success-message {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background-color: rgba(16, 185, 129, 0.1);
        border: 1px solid #10b981;
        color: #10b981;
        padding: 1rem;
        border-radius: var(--radius);
        margin-top: 1.5rem;
      }
      
      .success-message i {
        font-size: 1.5rem;
      }
    `
    document.head.appendChild(style)
  })
  