import Image from "next/image";
import styles from "./page.module.css";
import { NewComponent, Game } from "./ui.js";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Hello World, I'm hijacking this Next boilerplate to learn.<code>src/app/page.js</code>.
          </li>
          <li>Let's get it!</li>
        </ol>


        <NewComponent />
        <h1>First things first, here's tic-tac-toe</h1>
        <Game />
      </main>
      <footer className={styles.footer}>
        <h2>Sometimes, X, sometimes O.</h2>
      </footer>
    </div>
  );
}
