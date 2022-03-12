import styles from './styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Dapp Beetle Fever</h1>

        <p className={styles.description}>Coming soon</p>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by <span className={styles.logo}>Beetle Fever</span>
        </a>
      </footer>
    </div>
  )
}
