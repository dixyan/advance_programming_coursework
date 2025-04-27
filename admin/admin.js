// Shared JavaScript functions for admin pages

// Initialize the admin interface
function initAdminInterface() {
    // Sidebar toggle for mobile
    const menuToggle = document.getElementById("menuToggle")
    const closeSidebar = document.getElementById("closeSidebar")
    const sidebar = document.getElementById("sidebar")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.add("show")
      })
    }
  
    if (closeSidebar) {
      closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("show")
      })
    }
  }
  
  // Store movies in localStorage for demo purposes
  function initializeMovies() {
    if (!localStorage.getItem("movies")) {
      const defaultMovies = [
        {
          id: 1,
          title: "The Matrix",
          description:
            "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
          durationHours: 2,
          durationMinutes: 30,
          price: 12.99,
          startDate: "2023-06-01",
          endDate: "2023-07-01",
          status: "Now Showing",
          coverImage: "https://via.placeholder.com/100x150",
        },
        {
          id: 2,
          title: "Inception",
          description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
          durationHours: 2,
          durationMinutes: 28,
          price: 14.99,
          startDate: "2023-07-15",
          endDate: "2023-08-15",
          status: "Coming Soon",
          coverImage: "https://via.placeholder.com/100x150",
        },
      ]
      localStorage.setItem("movies", JSON.stringify(defaultMovies))
    }
  }
  
  // Get movies from localStorage
  function getMovies() {
    initializeMovies()
    return JSON.parse(localStorage.getItem("movies") || "[]")
  }
  
  // Save movies to localStorage
  function saveMovies(movies) {
    localStorage.setItem("movies", JSON.stringify(movies))
  }
  
  // Add a new movie
  function addMovie(movie) {
    const movies = getMovies()
    movie.id = movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1
    movies.push(movie)
    saveMovies(movies)
    return movie
  }
  
  // Update an existing movie
  function updateMovie(updatedMovie) {
    const movies = getMovies()
    const index = movies.findIndex((movie) => movie.id === updatedMovie.id)
    if (index !== -1) {
      movies[index] = updatedMovie
      saveMovies(movies)
      return true
    }
    return false
  }
  
  // Delete a movie
  function deleteMovie(id) {
    const movies = getMovies()
    const newMovies = movies.filter((movie) => movie.id !== id)
    if (movies.length !== newMovies.length) {
      saveMovies(newMovies)
      return true
    }
    return false
  }
  
  // Get a movie by ID
  function getMovieById(id) {
    const movies = getMovies()
    return movies.find((movie) => movie.id === id)
  }
  
  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initializeMovies()
  })
  