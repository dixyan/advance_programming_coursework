document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Tab functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const tabId = trigger.getAttribute('data-tab');
        
        // Update active tab trigger
        document.querySelectorAll('.tab-trigger').forEach(t => {
          t.classList.remove('active');
        });
        trigger.classList.add('active');
        
        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Load movie data
    loadMovies();
  });
  
  // Declare feather variable
  const feather = window.feather;
  
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
        posterUrl: "images/basanta.jpeg",
        rating: "R",
        duration: "2h 40m",
        genre: "Drama/Romance",
      },
    ];
  
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
        posterUrl: "images/jaat.jpeg",
        duration: "2h 34m",
        genre: "Action/Drama/Thriller",
      },
      {
        id: "9",
        title: "Karma",
        posterUrl: "images/karma.jpeg",
        duration: "2h 15m",
        genre: "Action/Drama",
      },
    ];
  
    // Render now showing movies
    const nowShowingGrid = document.querySelector('#now-showing .movie-grid');
    nowShowingMovies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      nowShowingGrid.appendChild(movieCard);
    });
  
    // Render coming soon movies
    const comingSoonGrid = document.querySelector('#coming-soon .movie-grid');
    comingSoonMovies.forEach(movie => {
      const movieCard = createMovieCard(movie, true);
      comingSoonGrid.appendChild(movieCard);
    });
  }
  
  function createMovieCard(movie, comingSoon = false) {
    const template = document.getElementById('movie-card-template');
    const movieCard = template.content.cloneNode(true);
    
    // Set movie data
    movieCard.querySelector('.movie-title').textContent = movie.title;
    movieCard.querySelector('.movie-poster img').src = movie.posterUrl;
    movieCard.querySelector('.movie-poster img').alt = movie.title;
    movieCard.querySelector('.movie-duration').textContent = movie.duration;
    movieCard.querySelector('.movie-genre').textContent = movie.genre;
    
    // Set rating if available
    if (movie.rating) {
      movieCard.querySelector('.movie-rating').textContent = movie.rating;
    } else {
      movieCard.querySelector('.movie-rating').remove();
    }
    
    // Set button text and link
    const bookBtn = movieCard.querySelector('.book-btn');
    if (comingSoon) {
      bookBtn.textContent = 'Coming Soon';
      bookBtn.classList.remove('btn-primary');
      bookBtn.classList.add('btn-outline');
      bookBtn.disabled = true;
    } else {
      bookBtn.textContent = 'Book Tickets';
      bookBtn.href = `movie-details.html?id=${movie.id}`;
    }
    
    return movieCard;
  }