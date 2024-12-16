'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';

export const getReports = async (batchID: string, projectID: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reports')
    .select('*, urls!inner(*)')
    .eq('batch_id', batchID)
    .eq('urls.project_id', projectID);

  if (error) {
    console.error(error);
  }

  if (data) {
    data.sort((a, b) => (a.urls.url > b.urls.url ? 1 : -1));
  }

  return data;
};

export const manualReport = async (formData: FormData) => {
  const projectID = formData.get('projectID')?.toString().trim();

  if (projectID) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const res = await fetch(`${process.env.API_URL}/co2/gather?user_id=${user?.id}&project_id=${projectID}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });

      console.log(await res.text());
    } catch (e) {
      console.error(e);
      return encodedRedirect('error', `/dashboard/projects/${projectID}/reports/manual`, `Something went wrong`);
    }

    return encodedRedirect('success', `/dashboard/projects/${projectID}/reports`, `Report started`);
  } else {
    return encodedRedirect('error', `/dashboard/projects/${projectID}/reports/manual`, `Invalid project ID`);
  }
};