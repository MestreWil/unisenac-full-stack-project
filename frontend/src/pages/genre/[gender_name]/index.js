import React from 'react';

// Função para buscar os dados do gênero baseado no nome do gênero
const fetchGenreData = async (genreName) => {
  try {
    const genre = genreName.replace(' ', '%20');
    const genreResponse = await fetch(`http://localhost:8000/genders/${genre}`);

    if (!genreResponse.ok) {
      throw new Error(`HTTP error! status: ${genreResponse.status}`);
    }

    const genreData = await genreResponse.json();

    const albumResponse = await fetch(`http://localhost:8000/album/`);

    if (!albumResponse.ok) {
      throw new Error(`HTTP error! status: ${albumResponse.status}`);
    }

    const albumData = await albumResponse.json();

    const artistResponse = await fetch(`http://localhost:8000/artists/`);

    if (!artistResponse.ok) {
      throw new Error(`HTTP error! status: ${artistResponse.status}`);
    }

    const artistData = await artistResponse.json();

    return {
      genre: genreData,
      albums: albumData,
      artists: artistData,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      genre: null,
      albums: [],
      artists: [],
    };
  }
};

// Função que será chamada pelo Next.js para obter dados durante a build ou request
export async function getServerSideProps(context) {
  const { gender_name } = context.query; // Pega o nome do gênero da URL
  const data = await fetchGenreData(gender_name);

  return {
    props: {
      genre: data.genre,
      albums: data.albums,
      artists: data.artists,
    },
  };
}

const GenresPage = ({ albums, genre, artists }) => {
  if (!genre) {
    return <p>Genre not found.</p>;
  }

  const genreAlbums = albums.filter((album) => album.album_gender === genre.gender_id);

  return (
    <div>
      <header id='header'>
        <a href={`http://localhost:3000/`}>
          <img id='top-logo' src='/Vector.png' alt="Logo" />
        </a>
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
      <div id='content'>
        <h1>{genre.gender_name}</h1>
        <div className='grid-container'>
          {genreAlbums.length === 0 ? (
            <p>Nenhum álbum encontrado.</p>
          ) : (
            genreAlbums.map((album, index) => {
              const albumArtist = artists.find((artist) => artist.artist_id === album.album_artist);
              const artistLink = albumArtist ? albumArtist.artist_name.replace(' ', '%20') : '';

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
                  <p className='album-artist'>
                    <a href={`/artist/${artistLink}`}>{albumArtist ? albumArtist.artist_name : 'Artista desconhecido'}</a>
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;