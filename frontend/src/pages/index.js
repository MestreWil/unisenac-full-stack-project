import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

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
    <div>
      <h1>Lista de Álbuns</h1>
      {albums.length === 0 ? (
        <p>Nenhum álbum encontrado.</p>
      ) : (
        <ul>
          {albums.map(album => (
            <li key={album.album_name}>
              <br />
              <h2>{album.album_name}</h2>
              <p><strong>Data de lançamento:</strong> {album.album_release}</p>
              <p>
                <strong>Músicas:</strong> <br />
                {album.album_description.split('\r\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <p>
                <strong>Link:</strong> <a href={album.album_link} target="_blank" rel="noopener noreferrer">{album.album_link}</a>
              </p>
              {album.album_image && (
                <img src={album.album_image} alt={`Imagem do álbum ${album.album_name}`} /> 
              )} 
            </li> 
          ))}
        </ul> 
      )}
    </div>
  );
};

export default AlbumsPage;