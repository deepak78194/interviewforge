export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getJobInfo } from '@/features/jobInfos/dbCache';
import { updateJobInfoAction } from '@/features/jobInfos/actions';
import { JobInfoForm } from '@/features/jobInfos/JobInfoForm';

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const [job] = await getJobInfo(id);

  if (!job) notFound();

  const action = updateJobInfoAction.bind(null, id);

  const defaultValues = {
    name: job.name,
    title: job.title ?? undefined,
    companyName: job.companyName ?? undefined,
    companyInfo: job.companyInfo ?? undefined,
    experienceLevel: job.experienceLevel,
    description: job.description,
    targetDate: job.targetDate ? job.targetDate.toISOString() : undefined,
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <JobInfoForm action={action} defaultValues={defaultValues} />
    </div>
  );
}
