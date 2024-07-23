import React from 'react';

// Função para buscar os dados
export async function getStaticProps() {
  try {
    const albumResponse = await fetch('http://localhost:8000/album/');
    const artistResponse = await fetch('http://localhost:8000/artists/');

    if (!albumResponse.ok) {
      console.error(`HTTP error! status: ${albumResponse.status}`);
      return {
        props: {
          albums: [],
          artists: [],
        },
      };
    }

    if (!artistResponse.ok) {
      console.error(`HTTP error! status: ${artistResponse.status}`);
      return {
        props: {
          albums: [],
          artists: [],
        },
      };
    }

    const albumData = await albumResponse.json();
    const artistData = await artistResponse.json();

    console.log('Album data fetched from API:', albumData);
    console.log('Artist data fetched from API:', artistData);

    return {
      props: {
        albums: albumData,
        artists: artistData
      },
    };
  } catch (error) {
    console.error('Failed to fetch albums:', error);

    return {
      props: {
        albums: [],
        artists: []
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
const AlbumsPage = ({ albums, artists }) => {
  return (
    <div id='corpo'>
      <Header />
      <div id='filter-buttons'>
        <div className='filter-button'><a href='http://localhost:3000/'>Albums</a></div>
        <div className='filter-button'><a href='http://localhost:3000/artists'>Artists</a></div>
        <div className='filter-button'><a href='http://localhost:3000/genres'>Genres</a></div>
      </div>
      <div id='topics'>
        <h2 className='topic'>Albums</h2>
        <hr className='topic'></hr>
      </div>
      {albums.length === 0 ? (
        <p id="no-albums">Nenhum álbum encontrado.</p>
      ) : (
        <div className='grid-container'>
          {albums.map((album, index) => {
            const albumArtist = artists.find(artist => artist.artist_id === album.album_artist);
            const artistLink = albumArtist.artist_name;
            return (
              <div className='grid-item' key={index}>
                {album.album_image && (
                  <div className='album-image'>
                    <a href={`/album/${encodeURIComponent(album.album_name)}`}>
                      <img 
                        src={`http://localhost:8000${album.album_image}`}  
                        alt={`Imagem do álbum ${album.album_name}`} 
                      />
                    </a>
                  </div>
                )}
                <h2 className='album-title'>
                  <a href={`/album/${encodeURIComponent(album.album_name)}`}>{album.album_name}</a>
                </h2>
                <p className='album-artist'><a href={`http://localhost:3000/artist/${artistLink.replace(' ', '%20')}`}>{albumArtist ? albumArtist.artist_name : 'Artista desconhecido'}</a></p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;