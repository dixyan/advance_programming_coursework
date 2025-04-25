document.addEventListener("DOMContentLoaded", () => {
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
  
    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add copy functionality for email
    const emailElement = document.querySelector(".contact-email")
  
    if (emailElement) {
      emailElement.addEventListener("click", function () {
        const email = this.textContent.trim()
        navigator.clipboard
          .writeText(email)
          .then(() => {
            // Create and show tooltip
            const tooltip = document.createElement("span")
            tooltip.className = "copy-tooltip"
            tooltip.textContent = "Email copied!"
            this.appendChild(tooltip)
  
            // Remove tooltip after 2 seconds
            setTimeout(() => {
              tooltip.remove()
            }, 2000)
          })
          .catch((err) => {
            console.error("Could not copy text: ", err)
          })
      })
  
      // Add tooltip style
      const style = document.createElement("style")
      style.textContent = `
        .contact-email {
          cursor: pointer;
          position: relative;
        }
        
        .copy-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--foreground);
          color: var(--background);
          padding: 0.5rem;
          border-radius: var(--radius);
          font-size: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          animation: fadeInOut 2s ease;
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  
    // Add section highlighting on scroll
    const sections = document.querySelectorAll(".privacy-section")
  
    function highlightCurrentSection() {
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150
        const sectionBottom = sectionTop + section.offsetHeight
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          section.classList.add("active-section")
        } else {
          section.classList.remove("active-section")
        }
      })
    }
  
    // Add active section style
    const activeStyle = document.createElement("style")
    activeStyle.textContent = `
      .privacy-section {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .active-section {
        transform: translateX(5px);
        box-shadow: -5px 0 0 var(--primary), var(--shadow);
      }
    `
    document.head.appendChild(activeStyle)
  
    // Listen for scroll events
    window.addEventListener("scroll", highlightCurrentSection)
  
    // Initial check
    highlightCurrentSection()
  })
  