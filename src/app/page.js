import Image from "next/image";
import styles from "./page.module.css";
import {NewComponent,Board, get, getGameState} from "./ui.js";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Hello World, I'm hijacking this Next boilerplate <code>src/app/page.js</code>.
          </li>
          <li>Now I'ma get paid.</li>
        </ol>


        <NewComponent />
        <h1>First things first, here's tic-tac-toe</h1>
        <Board />
      </main>
      <footer className={styles.footer}>
        <h2>Sometimes, yes, sometimes.</h2>
      </footer>
    </div>
  );
}
