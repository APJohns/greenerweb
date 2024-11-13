import Breadcrumbs from '@/components/breadcrumbs';
import { formatBytes, formatCO2, getProjectName, getURLReports } from '@/utils/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StatCard from '@/components/statCard';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const projectID = (await params).id;
  const projectName = await getProjectName(projectID);

  const data = await getURLReports(projectID);

  if (!data) {
    notFound();
  }

  const getAverage = (values: number[]) => {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / data.length;
  };

  const latestCO2 = Array.from(data, (url) => url.reports[0].co2);
  const bytes = formatBytes(getAverage(Array.from(data, (url) => url.reports[0].bytes)));

  const crumbs = [
    {
      text: 'Dashboard',
      href: '/dashboard',
    },
    {
      text: projectName,
    },
  ];

  return (
    <>
      <h1>{projectName}</h1>
      <Breadcrumbs crumbs={crumbs} />
      <div className="cardGroup">
        <StatCard
          heading={
            <>
              Average CO<sub>2</sub>
            </>
          }
        >
          {formatCO2(getAverage(latestCO2))}
        </StatCard>
        <StatCard heading="Average bytes" unit={bytes.unit}>
          {bytes.value}
        </StatCard>
      </div>
      <Link href={`/dashboard/projects/${projectID}/urls`}>See all URLs</Link>
    </>
  );
}
