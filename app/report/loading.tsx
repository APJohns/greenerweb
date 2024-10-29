import styles from './loading.module.css';

export default function Loading() {
  /* function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const loadingMessages = ['Counting carbon atoms']; */

  return (
    <main className={styles.main}>
      <div className={styles.loader}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="12" fill="black" className={styles.svgFill} />
          <g className={styles.outerOrbit}>
            <circle cx="40" cy="40" r="36" stroke="black" className={styles.svgStroke} />
            <circle cx="76" cy="40" r="4" fill="#5BC871" />
            <circle cx="4" cy="40" r="4" fill="#5BC871" />
            <circle cx="40" cy="76" r="4" fill="#5BC871" />
            <circle cx="40" cy="4" r="4" fill="#5BC871" />
          </g>
          <g className={styles.innerOrbit}>
            <circle cx="40" cy="40" r="25" stroke="black" className={styles.svgStroke} />
            <circle cx="40" cy="16" r="4" fill="#5BC871" />
            <circle cx="40" cy="64" r="4" fill="#5BC871" />
          </g>
        </svg>
      </div>

      {/* <p className={styles.loading}>{loadingMessages[getRandomInt(0, loadingMessages.length)]}</p> */}
      <p className={styles.loading}>Counting carbon atoms</p>
      <p>This should only take a few seconds</p>
    </main>
  );
}
