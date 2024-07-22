import React from 'react';

// Função para buscar os dados
export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:8000/genders/');

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return {
        props: {
          genres: [],
        },
      };
    }

    const data = await response.json();
    console.log('Data fetched from API:', data);

    return {
      props: {
        genres: data,
      },
    };
  } catch (error) {
    console.error('Failed to fetch albums:', error);

    return {
      props: {
        genres: [],
      },
    };
  }
}

// Componente Header
export const Header = () => {
  return (
    <header id='header'>
      <img id='top-logo' src='/Vector.png' alt="Logo" />
      <div id='searchbar'>
        <input id='search-input' placeholder="O que vamos ouvir hoje?" />
      </div>
      <a href="/register" id="user-icon-link">
        <svg
          id="user-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </a>
    </header>
  );
};

// Componente da Página Principal
const GenresPage = ({ genres }) => {
  return (
    <div id='corpo'>
      <Header />
      <div id='filter-buttons'>
        <div className='filter-button'><a href='http://localhost:3000/'>Albums</a></div>
        <div className='filter-button'><a href='http://localhost:3000/artists'>Artists</a></div>
        <div className='filter-button'><a href='http://localhost:3000/genres'>Genres</a></div>
      </div>
      <div id='topics'>
        <h2 className='topic'>Genres</h2>
        <hr className='topic'></hr>
      </div>
      {genres.length === 0 ? (
        <p id="no-albums">Nenhum gênero encontrado.</p>
      ) : (
        <div className='grid-container'>
          {genres.map((genre, index) => (
            <div className='grid-item' key={index}>
              {genre.gender_name && (
                <div className='album-image'>
                  <a href={`/genre/${encodeURIComponent(genre.gender_name)}`}>
                    <img 
                      src='/rock.jpg'  
                      alt={`Imagem do gênero ${genre.gender_name}`} 
                    />
                  </a>
                </div>
              )}
              <h2 className='album-title'><a href={`/genre/${encodeURIComponent(genre.gender_name)}`}>{genre.gender_name}</a></h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenresPage;