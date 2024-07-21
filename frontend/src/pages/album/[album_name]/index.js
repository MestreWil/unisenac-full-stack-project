import React from 'react';

// Função para buscar os dados do álbum baseado no nome do álbum
const fetchAlbumData = async (albumName) => {
  try {
    const response = await fetch(`http://localhost:8000/album/${albumName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch album data:', error);
    return null;
  }
};

const AlbumPage = ({ album }) => {
  if (!album) {
    return <p>Album not found.</p>;
  }

  return (
    <div>
      <header id='header'>
        <img id='top-logo' src='/Vector.png'/>
        <div id='searchbar'>
          <input id='search-input' placeholder="What we gonna listen today?"></input>
          <svg href='#' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#EA2222" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>
      </header>
      <h1>{album.album_name}</h1>
      <img
        src={`http://localhost:8000/media/album_images/${album.album_image}`}
        alt={`Imagem do álbum ${album.album_name}`}
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <p><strong>Data de lançamento:</strong> {album.album_release}</p>
      <p><strong>Descrição:</strong> {album.album_description}</p>
      <p>
        <strong>Link:</strong> <a href={album.album_link} target="_blank" rel="noopener noreferrer">{album.album_link}</a>
      </p>
    </div>
  );
};

// Função que será chamada pelo Next.js para obter dados durante a build ou request
export async function getServerSideProps(context) {
  const { album_name } = context.query; // Pega o nome do álbum da URL
  const album = await fetchAlbumData(album_name);

  return {
    props: {
      album
    }
  };
}

export default AlbumPage;