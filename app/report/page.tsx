import styles from './page.module.css';

export const maxDuration = 60;

interface SupportingDocument {
  id: number;
  title: string;
  link: string;
}

export default async function Report({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const url = (await searchParams).url;
  let data;
  if (url) {
    const res = await fetch(`${process.env.API_URL}/carbon?url=${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    console.log(res);
    data = await res.json();
  }

  return (
    <main className={styles.main}>
      <h1>Report</h1>
      <p>{url}</p>
      {data.report && <p className={styles.rating}>{data.report.co2.rating}</p>}
      <div className={styles.cardGroup}>
        {data.report && (
          <div className={styles.statCard}>
            <h2 className={styles.heading}>Emissions</h2>
            <p className={styles.body}>
              <span className={styles.stat}>{data.report.co2.total.toFixed(2)}</span>
              <span className={styles.unit}>
                g CO<sub>2</sub>
              </span>
            </p>
          </div>
        )}
        {data.report && (
          <div className={styles.statCard}>
            <h2 className={styles.heading}>Page Size</h2>
            <p className={styles.body}>
              <span className={styles.stat}>{(data.report.variables.bytes / 1000).toFixed(2)}</span>
              <span className={styles.unit}>kB</span>
            </p>
          </div>
        )}
        {data.hosting && (
          <div className={styles.statCard}>
            <h2 className={styles.heading}>Hosting</h2>
            <p className={styles.body}>
              <span className={styles.stat}>{data.hosting.green ? 'Green' : 'Dirty'}</span>
              {data.hosting.green && data.hosting.supporting_documents && (
                <details className={styles.hostInfo}>
                  <summary>{data.hosting.hosted_by}</summary>
                  <ul>
                    {data.hosting.supporting_documents.map((doc: SupportingDocument) => (
                      <li key={doc.id}>
                        <a href={doc.link}>{doc.title}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}