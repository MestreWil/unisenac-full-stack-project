import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({data, done}) {

  console.log('data :>> ', data);
  console.log('done :>> ', done);

  return (
    <h1>Álbuns</h1>
  );
}

/* export async function getStaticProps(){

  const response = await fetch('http://localhost:8080/album')

  const data = await response.json()

  return {
    props:{
      data: data,
      done: true
    }
  }
} */
