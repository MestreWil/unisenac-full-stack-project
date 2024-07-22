import React from 'react';

// Função para buscar os dados do álbum baseado no nome do álbum
const fetchArtistData = async (artistName) => {
  try {
    const artist = artistName.replace(' ', '%20');
    const response = await fetch(`http://localhost:8000/artists/${artist}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch artist data:', error);
    return null;
  }
};

// Função que será chamada pelo Next.js para obter dados durante a build ou request
export async function getServerSideProps(context) {
  const { artist_name } = context.query; // Pega o nome do álbum da URL
  const artist = await fetchArtistData(artist_name);

  return {
    props: {
      artist
    }
  };
}

const ArtistPage = ({ artist }) => {
  if (!artist) {
    return <p>Artist not found.</p>;
  }

  return (
    <div>
        <header id='header'>
            <a href={`http://localhost:3000/`}>
                <img id='top-logo' src='/Vector.png' alt="Logo" />
            </a>
            <div id='searchbar'>
                <input id='search-input' placeholder="O que vamos ouvir hoje?" />
            </div>
        </header>
        <div id='content'>
            <div id='artist-page-details'>
                <div id='artist-page-image'>
                    <img
                        src={`http://localhost:8000${artist.artist_image}`}
                        alt={`Imagem do artista ${artist.artist_name}`}
                    />
                </div>
                <div id='artist-page-info'>
                    <h1 id='artist-page-title'>{artist.artist_name}</h1>
                    <br />
                    <p>{artist.artist_description}</p>
                </div>
                <div id='artist-albums'>
                    <div id='album'>
                        <img></img>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ArtistPage;