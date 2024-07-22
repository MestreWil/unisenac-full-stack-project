import React from 'react';

// Função para buscar os dados do álbum baseado no nome do álbum
const fetchAlbumData = async (genreName) => {
  try {
    const genre = genreName.replace(' ', '%20');
    const response = await fetch(`http://localhost:8000/album/${album}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch album data:', error);
    return null;
  }
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

const AlbumPage = ({ album }) => {
  if (!album) {
    return <p>Album not found.</p>;
  }

  const formatAlbumDescription = (description) => {
    return description.replace(/\r/g, ', ');
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
        <div id='album-page-details'>
          <div id='album-page-image'>
            <img
              src={`http://localhost:8000${album.album_image}`}
              alt={`Imagem do álbum ${album.album_name}`}
            />
          </div>
          <div id='album-page-info'>
            <h1 id='album-page-title'>{album.album_name}</h1>
            <h2>{album.album_artist_id}</h2>
            <p><strong>Genre:</strong> {album.album_gender_id}</p>
            <p><strong>Release:</strong> {album.album_release.replace(/\r/g, ', ')}</p>
            <p><strong>Songs:</strong> {formatAlbumDescription(album.album_description)}</p>
            <br />
            <a id='yt-link'href={`${album.album_link}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-youtube" viewBox="0 0 16 16">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
              </svg>
              <strong>ESCUTE NO YOUTUBE</strong>
            </a>
          </div>
        </div>
        <div id='reviews'>
          <h2>Reviews</h2>
          <form>
            <textarea id='review-input' placeholder='Faça sua review aqui!'></textarea>
          </form>
          <div id='reviews-list'>
            <div id='reviews-users'>
              {/* Exemplo de reviews; pode ser substituído por dados reais no futuro */}
              <p><strong>User1</strong><br /><br /> Great album!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;