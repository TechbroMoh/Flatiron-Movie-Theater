document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
  
    // Fetch movies data from json-server
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => {
        films.forEach(film => {
          // Create list item for each film in the menu
          const li = document.createElement('li');
          li.className = 'film item';
          li.textContent = film.title;
          li.addEventListener('click', () => showMovieDetails(film.id));
          filmsList.appendChild(li);
        });
  
        // Display details of the first movie 
        if (films.length > 0) {
          showMovieDetails(films[0].id);
        }
      })
      .catch(error => console.error('Error fetching films:', error));
  
    // Function to show movie details
    function showMovieDetails(movieId) {
      fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(movie => {
          // Calculate available tickets
          const availableTickets = movie.capacity - movie.tickets_sold;
  
          // Display movie details 
          movieDetails.innerHTML = `
            <div class="movie-details">
              <h2>${movie.title}</h2>
              <div class="poster">
                <img src="${movie.poster}" alt="${movie.title} Poster">
              </div>
              <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
              <p><strong>Showtime:</strong> ${movie.showtime}</p>
              <p><strong>Description:</strong> ${movie.description}</p>
              <p><strong>Available Tickets:</strong> ${availableTickets}</p>
              <button id="buy-ticket-btn">Buy Ticket</button>
            </div>
          `;
  
          // Add event listener to buy ticket button
          const buyTicketBtn = document.getElementById('buy-ticket-btn');
          buyTicketBtn.addEventListener('click', () => {
            if (availableTickets > 0) {
              // Decrement tickets sold visually
              movie.tickets_sold++;
              // Update available tickets text
              movieDetails.querySelector('p strong:last-of-type').textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
            } else {
             
              buyTicketBtn.disabled = true;
              buyTicketBtn.textContent = "Sold Out";
            }
          });
        })
        .catch(error => console.error(`Error fetching movie details for id ${movieId}:`, error));
    }
  });
  