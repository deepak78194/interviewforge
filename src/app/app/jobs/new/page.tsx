import { JobInfoForm } from '@/features/jobInfos/JobInfoForm';
import { createJobInfoAction } from '@/features/jobInfos/actions';

export default function NewJobPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>
      <JobInfoForm action={createJobInfoAction} />
    </div>
  );
}
