import React from 'react';

// Função para buscar os dados do artista baseado no nome
const fetchArtistData = async (artistName) => {
    try {
        const artist = artistName.replace(' ', '%20');
        const response = await fetch(`http://localhost:8000/artists/${artist}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const artistData = await response.json();

        // Fetch albums
        const albumsResponse = await fetch(`http://localhost:8000/album/`);
        if (!albumsResponse.ok) {
            throw new Error(`HTTP error! status: ${albumsResponse.status}`);
        }
        const albumsData = await albumsResponse.json();

        return { 
            artist: artistData, 
            albums: albumsData 
        };
    } catch (error) {
        console.error('Failed to fetch artist data:', error);
        return null;
    }
};

// Função que será chamada pelo Next.js para obter dados durante a build ou request
export async function getServerSideProps(context) {
    const { artist_name } = context.query; // Pega o nome do álbum da URL
    const data = await fetchArtistData(artist_name);
  
    return {
        props: {
            artist: data.artist,
            albums: data.albums,
        },
    };
}

const ArtistPage = ({ artist, albums }) => {
    if (!artist) {
        return <p>Artist not found.</p>;
    }

    // Filtra os álbuns que pertencem ao artista
    const artistAlbums = albums.filter(album => album.album_artist === artist.artist_id);
    
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
                    <div id='topics'>
                        <h2 className='topic'>Albums</h2>
                        <hr className='topic'></hr>
                    </div>
                    <div id='artist-albums'>
                        {artistAlbums.length === 0 ? (
                            <p>O Artista ainda não possui álbuns</p>
                        ) : (
                            <div className='grid-container'>
                                {artistAlbums.map((album, index) => (
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
                                            <a href={`/album/${encodeURIComponent(album.album_name)}`}>
                                                {album.album_name}
                                            </a>
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistPage;