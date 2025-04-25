document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
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

  // Initialize slideshow
  initSlideshow()

  // Load movie data
  loadMovies()
})

// Slideshow functionality
function initSlideshow() {
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

  prevButton.addEventListener("click", () => {
    goToSlide(currentSlide - 1)
  })

  nextButton.addEventListener("click", () => {
    goToSlide(currentSlide + 1)
  })

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
  nowShowingMovies.forEach((movie) => {
    const movieCard = createMovieCard(movie)
    nowShowingGrid.appendChild(movieCard)
  })

  // Render coming soon movies
  const comingSoonGrid = document.querySelector("#coming-soon .movie-grid")
  comingSoonMovies.forEach((movie) => {
    const movieCard = createMovieCard(movie, true)
    comingSoonGrid.appendChild(movieCard)
  })
}

function createMovieCard(movie, comingSoon = false) {
  const template = document.getElementById("movie-card-template")
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
