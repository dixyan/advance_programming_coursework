document.addEventListener("DOMContentLoaded", () => {
  // Get the current page path
  const currentPath = window.location.pathname

  // Initialize common elements for all pages
  initializeTabFunctionality()

  // Initialize page-specific functionality
  if (currentPath.includes("movie-details.html")) {
    initializeMovieDetailsPage()
  } else if (currentPath.includes("booking.html")) {
    initializeBookingPage()
  } else if (currentPath.includes("confirmation.html")) {
    initializeConfirmationPage()
  } else if (currentPath.includes("contact.html")) {
    initializeContactPage()
  } else if (currentPath.includes("privacy.html")) {
    initializePrivacyPage()
  } else {
    // Assume it's the home page (index.html)
    initializeSlideshow()
    loadMovies()
  }
})

//common functions

// Tab functionality for all pages
function initializeTabFunctionality() {
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const tabId = trigger.getAttribute("data-tab")

      // Update active tab trigger
      document.querySelectorAll(".tab-trigger").forEach((t) => {
        t.classList.remove("active")
      })
      trigger.classList.add("active")

      // Show active tab content
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Format date helper function
function formatDate(dateStr) {
  const today = new Date()

  if (dateStr === "today") {
    return today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  if (dateStr === "tomorrow") {
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  if (dateStr === "day-after") {
    const dayAfter = new Date(today)
    dayAfter.setDate(today.getDate() + 2)
    return dayAfter.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  return dateStr
}
//home page
// Slideshow functionality
function initializeSlideshow() {
  const featuredMovies = [
    {
      id: "3",
      title: "Karma",
      posterUrl: "images/karma.jpg",
      rating: "PG-13",
      releaseDate: "April 11, 2025",
    },
    {
      id: "1",
      title: "Interstellar: Beyond Time",
      posterUrl: "images/movie.jpg",
      rating: "PG-13",
      releaseDate: "March 15, 2025",
    },
    {
      id: "2",
      title: "Sikandar",
      posterUrl: "images/sikander.jpg",
      rating: "PG",
      releaseDate: "February 28, 2025",
    },
    {
      id: "6",
      title: "Basanta",
      posterUrl: "images/basanta.jpg",
      rating: "R",
      releaseDate: "January 20, 2025",
    },
    {
      id: "5",
      title: "Snow White",
      posterUrl: "images/snowwhite.jpg",
      rating: "PG",
      releaseDate: "March 5, 2025",
    },
  ]

  const slidesContainer = document.querySelector(".slides")
  const indicatorsContainer = document.querySelector(".slideshow-indicators")

  if (!slidesContainer || !indicatorsContainer) return

  // Create slides
  featuredMovies.forEach((movie, index) => {
    // Create slide
    const slide = document.createElement("div")
    slide.className = "slide"
    slide.setAttribute("data-index", index.toString())

    // Create slide content
    const slideContent = document.createElement("div")
    slideContent.className = "slide-content"

    // Create main poster
    const mainPoster = document.createElement("img")
    mainPoster.className = "slide-poster"
    mainPoster.src = movie.posterUrl
    mainPoster.alt = movie.title
    mainPoster.addEventListener("click", () => {
      window.location.href = `movie-details.html?id=${movie.id}`
    })

    // Append poster to slide content
    slideContent.appendChild(mainPoster)

    // Append slide content to slide
    slide.appendChild(slideContent)

    // Append slide to slides container
    slidesContainer.appendChild(slide)

    // Create indicator
    const indicator = document.createElement("div")
    indicator.className = "indicator" + (index === 0 ? " active" : "")
    indicator.setAttribute("data-index", index.toString())
    indicator.addEventListener("click", () => {
      goToSlide(index)
    })

    // Append indicator to indicators container
    indicatorsContainer.appendChild(indicator)
  })

  // Set up navigation
  const prevButton = document.querySelector(".slideshow-nav.prev")
  const nextButton = document.querySelector(".slideshow-nav.next")

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      goToSlide(currentSlide - 1)
    })

    nextButton.addEventListener("click", () => {
      goToSlide(currentSlide + 1)
    })
  }

  // Initialize slideshow
  let currentSlide = 0
  const slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 3000) // Change slides every 3 seconds

  // Function to go to a specific slide
  function goToSlide(index) {
    // Handle index wrapping
    if (index < 0) {
      index = featuredMovies.length - 1
    } else if (index >= featuredMovies.length) {
      index = 0
    }

    // Update current slide
    currentSlide = index

    // Update slides position
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`

    // Update indicators
    document.querySelectorAll(".indicator").forEach((indicator, i) => {
      if (i === currentSlide) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })
  }
}

function loadMovies() {
  const nowShowingMovies = [
    {
      id: "1",
      title: "Interstellar: Beyond Time",
      posterUrl: "images/movie.jpg",
      rating: "PG-13",
      duration: "2h 45m",
      genre: "Sci-Fi/Adventure",
    },
    {
      id: "2",
      title: "Sikandar (2025)",
      posterUrl: "images/sikander.jpg",
      rating: "PG",
      duration: "2h 26m",
      genre: "Action/Drama",
    },
    {
      id: "3",
      title: "Anjila",
      posterUrl: "images/anjila.jpg",
      rating: "R",
      duration: "2h 10m",
      genre: "Romance/Drama",
    },
    {
      id: "4",
      title: "A Minecraft Movie",
      posterUrl: "images/minecraft.jpg",
      rating: "PG",
      duration: "1h 41m ",
      genre: "Action, Comedy, Adventure",
    },
    {
      id: "5",
      title: "Snow White",
      posterUrl: "images/snowwhite.jpg",
      rating: "PG",
      duration: "1h 49m",
      genre: "Adventure, Romance, Family",
    },
    {
      id: "6",
      title: "Basanta",
      posterUrl: "images/basanta.jpg",
      rating: "R",
      duration: "2h 40m",
      genre: "Drama/Romance",
    },
  ]

  const comingSoonMovies = [
    {
      id: "7",
      title: "Pitambar",
      posterUrl: "images/pitambar.jpg",
      duration: "2h 9m",
      genre: "Action/Thriller",
    },
    {
      id: "8",
      title: "Jaat",
      posterUrl: "images/jaat.jpg",
      duration: "2h 34m",
      genre: "Action/Drama/Thriller",
    },
    {
      id: "9",
      title: "Karma",
      posterUrl: "images/karma.jpg",
      duration: "2h 15m",
      genre: "Action/Drama",
    },
  ]

  // Render now showing movies
  const nowShowingGrid = document.querySelector("#now-showing .movie-grid")
  if (nowShowingGrid) {
    nowShowingMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie)
      nowShowingGrid.appendChild(movieCard)
    })
  }

  // Render coming soon movies
  const comingSoonGrid = document.querySelector("#coming-soon .movie-grid")
  if (comingSoonGrid) {
    comingSoonMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie, true)
      comingSoonGrid.appendChild(movieCard)
    })
  }
}

function createMovieCard(movie, comingSoon = false) {
  const template = document.getElementById("movie-card-template")
  if (!template) return document.createElement("div")

  const movieCard = template.content.cloneNode(true)

  // Set movie data
  movieCard.querySelector(".movie-title").textContent = movie.title
  movieCard.querySelector(".movie-poster img").src = movie.posterUrl
  movieCard.querySelector(".movie-poster img").alt = movie.title
  movieCard.querySelector(".movie-duration").textContent = movie.duration
  movieCard.querySelector(".movie-genre").textContent = movie.genre

  // Set rating if available
  if (movie.rating) {
    movieCard.querySelector(".movie-rating").textContent = movie.rating
  } else {
    movieCard.querySelector(".movie-rating").remove()
  }

  // Set button text and link
  const bookBtn = movieCard.querySelector(".book-btn")
  if (comingSoon) {
    bookBtn.textContent = "Coming Soon"
    bookBtn.classList.remove("btn-primary")
    bookBtn.classList.add("btn-outline")
    bookBtn.disabled = true
  } else {
    bookBtn.textContent = "Book Tickets"
    bookBtn.href = `movie-details.html?id=${movie.id}`
  }

  return movieCard
}

// movie details

function initializeMovieDetailsPage() {
  // Get movie ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get("id") || "1"

  // Load movie data
  loadMovieDetails(movieId)
}

function loadMovieDetails(movieId) {
  // In a real app, this would be fetched from an API
  const movies = [
    {
      id: "1",
      title: "Interstellar: Beyond Time",
      posterUrl: "images/movie.jpg",
      rating: "PG-13",
      rating_score: 8.7,
      language: "English",
      duration: "2h 45m",
      genre: "Sci-Fi/Adventure",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. As they journey to another galaxy, they face the harsh realities of interstellar travel and the mysteries of the universe.",
      release: "2024/01/23",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
      director: "Christopher Nolan",
    },
    {
      id: "2",
      title: "Sikandar",
      posterUrl: "images/sikander.jpg",
      rating: "PG",
      rating_score: 7.9,
      duration: "2h 26m",
      genre: "Action/Drama",
      description:
        "A fiery youth confronts a powerful network of corruption, challenging the status quo and fighting for the common people's rights in a nation gripped by injustice.",
      cast: "Salman Khan, Rashmika Mandanna, Suniel Shetty",
      director: "A.R. Murugadoss",
    },
    {
      id: "3",
      title: "Karma",
      posterUrl: "images/karma.jpeg",
      rating: "PG-13",
      rating_score: 8.2,
      duration: "2h 15m",
      genre: "Action/Drama",
      description:
        "A gripping tale of justice and redemption, where past actions come back to haunt those who thought they had escaped the consequences of their deeds.",
      cast: "Anmol KC, Aditi Budhathoki, Salon Basnet",
      director: "Dipendra K Khanal",
    },
    {
      id: "4",
      title: "A Minecraft Movie",
      posterUrl: "images/minecraft.jpg",
      rating: "PG",
      rating_score: 7.5,
      duration: "1h 41m",
      genre: "Action, Comedy, Adventure",
      description:
        "Join Steve and his friends as they embark on an epic adventure through the blocky world of Minecraft, facing creepers, endermen, and the mysterious Herobrine.",
      cast: "Jason Momoa, Jack Black, Emma Myers",
      director: "Jared Hess",
    },
    {
      id: "5",
      title: "Snow White",
      posterUrl: "images/snowwhite.jpg",
      rating: "PG",
      rating_score: 7.8,
      duration: "1h 49m",
      genre: "Adventure, Romance, Family",
      description:
        "A live-action adaptation of the classic fairy tale about a princess who escapes her evil stepmother and finds refuge with seven dwarfs in the forest.",
      cast: "Rachel Zegler, Gal Gadot, Andrew Burnap",
      director: "Marc Webb",
    },
    {
      id: "6",
      title: "Basanta",
      posterUrl: "images/basanta.jpeg",
      rating: "R",
      rating_score: 8.4,
      duration: "2h 40m",
      genre: "Drama/Romance",
      description:
        "Set against the backdrop of Nepal's changing seasons, this emotional drama follows the life of a young couple as they navigate love, loss, and the challenges of rural life.",
      cast: "Najir Husen, Swastima Khadka, Prakash Ghimire",
      director: "Nischal Basnet",
    },
    {
      id: "7",
      title: "Anjila",
      posterUrl: "images/anjila.jpg",
      rating: "U",
      rating_score: 8.7,
      duration: "2h 45m",
      genre: "Biography, Drama",
      description:
        "The movie 'Anjila' is based on the real-life story of Anjila Tumbapo Subba, the captain and number one goalkeeper of Nepal's national women's football team. The film showcases her journey from being confined within her home to becoming the team captain, highlighting her struggles and determination. Anjila herself plays the lead role, with Dayahang Rai and Srijana Subba portraying her parents. The movie emphasizes the importance of perseverance and the belief that with determination, nothing is impossible.",
      cast: "Dayahang Rai, Anjila Tumbapo Subba, Srijana Subba, Maotse Gurung",
      director: "Milan Chams",
    },
  ]

  // Find the movie by ID
  const movie = movies.find((m) => m.id === movieId) || movies[0]

  // Update the page with movie details
  const movieTitleElement = document.getElementById("movie-title")
  const moviePosterElement = document.getElementById("movie-poster")
  const movieDurationElement = document.getElementById("movie-duration")
  const movieGenreElement = document.getElementById("movie-genre")
  const movieRatingElement = document.getElementById("movie-rating")
  const ratingScoreElement = document.getElementById("rating-score")
  const movieDescriptionElement = document.getElementById("movie-description")
  const movieCastElement = document.getElementById("movie-cast")
  const movieDirectorElement = document.getElementById("movie-director")
  const movieReleaseDateElement = document.getElementById("movie-release-date")
  const movieLanguageElement = document.getElementById("movie-language")

  if (movieTitleElement) movieTitleElement.textContent = movie.title
  if (moviePosterElement) {
    moviePosterElement.src = movie.posterUrl
    moviePosterElement.alt = movie.title
  }
  if (movieDurationElement) movieDurationElement.textContent = movie.duration
  if (movieGenreElement) movieGenreElement.textContent = movie.genre
  if (movieRatingElement) movieRatingElement.textContent = movie.rating
  if (ratingScoreElement) ratingScoreElement.textContent = `${movie.rating_score}/10`
  if (movieDescriptionElement) movieDescriptionElement.textContent = movie.description
  if (movieCastElement) movieCastElement.textContent = movie.cast
  if (movieDirectorElement) movieDirectorElement.textContent = movie.director
  if (movieReleaseDateElement) movieReleaseDateElement.textContent = movie.release
  if (movieLanguageElement && movie.language) movieLanguageElement.textContent = movie.language

  // Set rating badge
  const ratingBadge = document.getElementById("movie-rating-badge")
  if (ratingBadge) {
    ratingBadge.textContent = movie.rating
  }

  // Load showtimes
  loadShowtimes(movieId)
}

function loadShowtimes(movieId) {
  const showtimes = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"]

  // Create showtimes for each day
  const days = ["today", "tomorrow", "day-after"]
  days.forEach((day) => {
    const container = document.getElementById(`${day}-showtimes`)
    if (!container) return

    showtimes.forEach((time) => {
      const button = document.createElement("button")
      button.className = "btn btn-outline"
      button.textContent = time
      button.addEventListener("click", () => {
        window.location.href = `booking.html?id=${movieId}&time=${encodeURIComponent(time)}&date=${day}`
      })

      container.appendChild(button)
    })
  })
}

// booking page

function initializeBookingPage() {
  // Get parameters from URL
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get("id") || "1"
  const time = urlParams.get("time") || "3:00 PM"
  const date = urlParams.get("date") || "today"

  // Set back link
  const backToMovieLink = document.getElementById("back-to-movie")
  if (backToMovieLink) {
    backToMovieLink.href = `movie-details.html?id=${movieId}`
  }

  // Load movie data
  loadBookingMovieData(movieId)

  // Set booking details
  const bookingTimeElement = document.getElementById("booking-time")
  const bookingDateElement = document.getElementById("booking-date")
  const summaryTimeElement = document.getElementById("summary-time")
  const summaryDateElement = document.getElementById("summary-date")

  if (bookingTimeElement) bookingTimeElement.textContent = time
  if (bookingDateElement) bookingDateElement.textContent = formatDate(date)
  if (summaryTimeElement) summaryTimeElement.textContent = time
  if (summaryDateElement) summaryDateElement.textContent = formatDate(date)

  // Generate seats
  generateSeats()

  // Set up checkout button
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      const selectedSeats = getSelectedSeats()
      if (selectedSeats.length === 0) return

      // Disable button and show processing state
      this.disabled = true
      this.textContent = "Processing..."

      // Simulate API call with timeout
      setTimeout(() => {
        window.location.href = `confirmation.html?id=${movieId}&seats=${selectedSeats.join(",")}&time=${encodeURIComponent(time)}&date=${date}`
      }, 1500)
    })
  }
}

function loadBookingMovieData(movieId) {
  // In a real app, this would be fetched from an API
  const movies = [
    {
      id: "1",
      title: "Interstellar: Beyond Time",
      rating: "PG-13",
      duration: "2h 45m",
    },
    {
      id: "2",
      title: "The Last Guardian",
      rating: "PG",
      duration: "1h 55m",
    },
  ]

  // Find the movie by ID
  const movie = movies.find((m) => m.id === movieId) || movies[0]

  // Update the page with movie details
  const movieTitleElement = document.getElementById("movie-title")
  const movieMetaElement = document.getElementById("movie-meta")

  if (movieTitleElement) movieTitleElement.textContent = movie.title
  if (movieMetaElement) movieMetaElement.textContent = `${movie.rating} • ${movie.duration}`
}

function generateSeats() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const bookedSeats = ["A1", "A2", "B5", "C7", "C8", "C9", "D4", "E5", "E6", "F2", "F3", "G7", "H1", "H2", "H3"]
  const container = document.getElementById("seats-container")

  if (!container) return

  rows.forEach((row) => {
    const rowElement = document.createElement("div")
    rowElement.className = "seat-row"

    // Add row label at the beginning
    const startLabel = document.createElement("div")
    startLabel.className = "row-label"
    startLabel.textContent = row
    rowElement.appendChild(startLabel)

    // Add seats
    for (let i = 1; i <= 10; i++) {
      const seatId = `${row}${i}`
      const seat = document.createElement("div")
      seat.className = "seat"
      seat.dataset.seatId = seatId
      seat.textContent = i

      if (bookedSeats.includes(seatId)) {
        seat.classList.add("taken")
      } else {
        seat.classList.add("available")
        seat.addEventListener("click", () => toggleSeat(seatId))
      }

      rowElement.appendChild(seat)
    }

    // Add row label at the end
    const endLabel = document.createElement("div")
    endLabel.className = "row-label"
    endLabel.textContent = row
    rowElement.appendChild(endLabel)

    container.appendChild(rowElement)
  })
}

function toggleSeat(seatId) {
  const selectedSeats = getSelectedSeats()
  const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"]`)

  if (!seatElement) return

  if (seatElement.classList.contains("selected")) {
    // Deselect the seat
    seatElement.classList.remove("selected")
    seatElement.classList.add("available")
  } else {
    // Check if max seats (8) are already selected
    if (selectedSeats.length >= 8) {
      alert("You can select up to 8 seats per booking.")
      return
    }

    // Select the seat
    seatElement.classList.remove("available")
    seatElement.classList.add("selected")
  }

  // Update the summary
  updateSummary()
}

function getSelectedSeats() {
  const selectedSeatElements = document.querySelectorAll(".seat.selected")
  return Array.from(selectedSeatElements)
    .map((seat) => seat.dataset.seatId)
    .sort()
}

function updateSummary() {
  const selectedSeats = getSelectedSeats()
  const seatCount = selectedSeats.length
  const seatPrice = seatCount * 200
  const bookingFee = seatCount * 10
  const totalPrice = seatPrice + bookingFee

  // Update seat list
  const selectedSeatsListElement = document.getElementById("selected-seats-list")
  if (selectedSeatsListElement) {
    selectedSeatsListElement.textContent = selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"
  }

  // Update seat count
  const seatCountElement = document.getElementById("seat-count")
  if (seatCountElement) {
    seatCountElement.textContent = seatCount
  }

  // Update prices
  const seatsPriceElement = document.getElementById("seats-price")
  const bookingFeeElement = document.getElementById("booking-fee")
  const totalPriceElement = document.getElementById("total-price")

  if (seatsPriceElement) seatsPriceElement.textContent = `Rs${seatPrice.toFixed(2)}`
  if (bookingFeeElement) bookingFeeElement.textContent = `Rs${bookingFee.toFixed(2)}`
  if (totalPriceElement) totalPriceElement.textContent = `Rs${totalPrice.toFixed(2)}`

  // Enable/disable checkout button
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.disabled = seatCount === 0
  }
}

//confirmation page

function initializeConfirmationPage() {
  // Get parameters from URL
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get("id") || "1"
  const seats = urlParams.get("seats") ? urlParams.get("seats").split(",") : []
  const time = urlParams.get("time") || "3:00 PM"
  const date = urlParams.get("date") || "today"

  // Generate booking ID
  const bookingId = generateBookingId()
  const bookingIdElement = document.getElementById("booking-id")
  if (bookingIdElement) bookingIdElement.textContent = bookingId

  // Load movie data
  loadConfirmationMovieData(movieId)

  // Set confirmation details
  const confirmationTimeElement = document.getElementById("confirmation-time")
  const confirmationDateElement = document.getElementById("confirmation-date")
  const confirmationSeatsElement = document.getElementById("confirmation-seats")
  const ticketCountElement = document.getElementById("ticket-count")

  if (confirmationTimeElement) confirmationTimeElement.textContent = time
  if (confirmationDateElement) confirmationDateElement.textContent = formatDate(date)
  if (confirmationSeatsElement) confirmationSeatsElement.textContent = seats.sort().join(", ")
  if (ticketCountElement) ticketCountElement.textContent = seats.length

  // Calculate and set prices
  const ticketPrice = seats.length * 200
  const bookingFee = seats.length * 10
  const totalPrice = ticketPrice + bookingFee

  const ticketPriceElement = document.getElementById("ticket-price")
  const confirmationFeeElement = document.getElementById("confirmation-fee")
  const confirmationTotalElement = document.getElementById("confirmation-total")

  if (ticketPriceElement) ticketPriceElement.textContent = `Rs ${ticketPrice.toFixed(2)}`
  if (confirmationFeeElement) confirmationFeeElement.textContent = `Rs ${bookingFee.toFixed(2)}`
  if (confirmationTotalElement) confirmationTotalElement.textContent = `Rs ${totalPrice.toFixed(2)}`
}

function loadConfirmationMovieData(movieId) {
  // In a real app, this would be fetched from an API
  const movies = [
    {
      id: "1",
      title: "Interstellar: Beyond Time",
      rating: "PG-13",
      duration: "2h 45m",
    },
    {
      id: "2",
      title: "Sikandar",
      rating: "PG",
      duration: "2h 26m",
    },
    {
      id: "3",
      title: "Karma",
      rating: "PG-13",
      duration: "2h 15m",
    },
    {
      id: "4",
      title: "A Minecraft Movie",
      rating: "PG",
      duration: "1h 41m",
    },
    {
      id: "5",
      title: "Snow White",
      rating: "PG",
      duration: "1h 49m",
    },
    {
      id: "6",
      title: "Basanta",
      rating: "R",
      duration: "2h 40m",
    },
  ]

  // Find the movie by ID
  const movie = movies.find((m) => m.id === movieId) || movies[0]

  // Update the page with movie details
  const movieTitleElement = document.getElementById("movie-title")
  const movieMetaElement = document.getElementById("movie-meta")

  if (movieTitleElement) movieTitleElement.textContent = movie.title
  if (movieMetaElement) movieMetaElement.textContent = `${movie.rating} • ${movie.duration}`
}

function generateBookingId() {
  // Generate a random booking ID
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

//contact page

function initializeContactPage() {
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
}

//privacy page
function initializePrivacyPage() {
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

  // Listen for scroll events
  window.addEventListener("scroll", highlightCurrentSection)

  // Initial check
  highlightCurrentSection()
}
