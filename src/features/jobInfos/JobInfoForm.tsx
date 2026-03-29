'use client';

import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { JobInfoFormData } from './actions';

interface JobInfoFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Partial<JobInfoFormData>;
}

export function JobInfoForm({ action, defaultValues }: JobInfoFormProps) {
  const targetDateValue = defaultValues?.targetDate
    ? new Date(defaultValues.targetDate).toISOString().split('T')[0]
    : '';

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name ?? ''}
          placeholder="e.g. Senior Engineer at Acme"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title ?? ''}
          placeholder="e.g. Senior Software Engineer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          defaultValue={defaultValues?.companyName ?? ''}
          placeholder="e.g. Acme Corp"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyInfo">Company Info</Label>
        <Textarea
          id="companyInfo"
          name="companyInfo"
          defaultValue={defaultValues?.companyInfo ?? ''}
          placeholder="Brief description of the company..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experienceLevel">Experience Level *</Label>
        <Select
          id="experienceLevel"
          name="experienceLevel"
          required
          defaultValue={defaultValues?.experienceLevel ?? 'mid-level'}
        >
          <option value="junior">Junior</option>
          <option value="mid-level">Mid-Level</option>
          <option value="senior">Senior</option>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={defaultValues?.description ?? ''}
          placeholder="Paste the job description here..."
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetDate">Target Date</Label>
        <Input
          id="targetDate"
          name="targetDate"
          type="date"
          defaultValue={targetDateValue}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit">Save Job Info</Button>
        <Link href="/app/jobs">
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}
