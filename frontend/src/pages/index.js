import React from 'react';

// Função para buscar os dados
export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:8000/album/');

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return {
        props: {
          albums: [],
        },
      };
    }

    const data = await response.json();
    console.log('Data fetched from API:', data);

    return {
      props: {
        albums: data,
      },
    };
  } catch (error) {
    console.error('Failed to fetch albums:', error);

    return {
      props: {
        albums: [],
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
        <input id='search-input' placeholder="What we gonna listen today?" />
      </div>
    </header>
  );
};

// Componente da Página Principal
const AlbumsPage = ({ albums }) => {
  return (
    <div id='corpo'>
      <Header />
      <div id='filter-buttons'>
        <div className='filter-button'>Albums</div>
        <div className='filter-button'>Artists</div>
        <div className='filter-button'>Genres</div>
      </div>
      <div id='topics'>
        <h2 className='topic'>New Albums</h2>
        <hr className='topic'></hr>
      </div>
      {albums.length === 0 ? (
        <p id="no-albums">Nenhum álbum encontrado.</p>
      ) : (
        <div className='grid-container'>
          {albums.map((album, index) => (
            <div className='grid-item' key={index}>
              {album.album_image && (
                <div className='album-image'>
                  <a href={`/album/${encodeURIComponent(album.album_name)}`}>
                    <img 
                      src={`http://localhost:8000/media${album.album_image}`}  
                      alt={`Imagem do álbum ${album.album_name}`} 
                    />
                  </a>
                </div>
              )}
              <h2 className='album-title'>{album.album_name}</h2>
              <p className='album-artist'>{album.artist_name}</p> {/* Adicione o nome do artista aqui */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;