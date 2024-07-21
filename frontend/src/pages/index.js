import React from 'react';

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
    console.log('Data fetched from API:', data); // Log the fetched data

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

const AlbumsPage = ({ albums }) => {
  return (
      <div id='corpo'>
        <header id='header'>
          <img id='top-logo' src='/Vector.png'/>
          <div id='searchbar'>
            <input id='search-input' placeholder="What we gonna listen today?"></input>
            <svg href='#' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#EA2222" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </div>
        </header>
        <h2>New Albums</h2>
        {albums.length === 0 ? (
          <p id="no-albums">Nenhum álbum encontrado.</p>
        ) : (
          <div class='grid-container'>
            {albums.map((album) => (
              <React.Fragment key={album.album_name}>
                <div class='grid-item'>
                  {album.album_image && (
                    <div id='album-image'>
                      <a href ={`http://localhost:3000/album/${album.album_name}`}>
                        <img 
                          src={`../../backend/media${album.album_image}`}  
                        />
                      </a>
                    </div>
                  )}
                  <h2 id='album-title'>{album.album_name}</h2>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
  );
};

export default AlbumsPage;