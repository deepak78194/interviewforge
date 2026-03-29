'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createStudyPlanAction, createAIStudyPlanAction } from './actions';

interface JobInfo {
  id: string;
  name: string;
  title?: string | null;
  description: string;
  experienceLevel: string;
  targetDate?: Date | null;
}

interface PlanFormProps {
  jobInfos: JobInfo[];
}

export function PlanForm({ jobInfos }: PlanFormProps) {
  const [aiMode, setAiMode] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(jobInfos[0]?.id ?? '');

  const selectedJob = jobInfos.find(j => j.id === selectedJobId);

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={!aiMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => setAiMode(false)}
        >
          Manual Plan
        </Button>
        <Button
          type="button"
          variant={aiMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => setAiMode(true)}
        >
          ✨ AI Generate
        </Button>
      </div>

      <form action={aiMode ? createAIStudyPlanAction : createStudyPlanAction} className="space-y-4">
        {jobInfos.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="jobInfoId">Job (optional)</Label>
            <select
              id="jobInfoId"
              name="jobInfoId"
              value={selectedJobId}
              onChange={e => setSelectedJobId(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm bg-background"
            >
              <option value="">No specific job</option>
              {jobInfos.map(j => (
                <option key={j.id} value={j.id}>
                  {j.title ?? j.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {aiMode && selectedJob && (
          <>
            <input type="hidden" name="jobTitle" value={selectedJob.title ?? selectedJob.name} />
            <input type="hidden" name="jobDescription" value={selectedJob.description} />
            <input type="hidden" name="experienceLevel" value={selectedJob.experienceLevel} />
            {selectedJob.targetDate && (
              <input type="hidden" name="targetDate" value={selectedJob.targetDate.toISOString()} />
            )}
          </>
        )}

        {!aiMode && (
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="My Study Plan" required />
          </div>
        )}

        {!aiMode && (
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea id="description" name="description" rows={3} placeholder="What will you focus on?" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalDays">Total Days</Label>
            <Input id="totalDays" name="totalDays" type="number" min={1} max={365} defaultValue={30} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" name="startDate" type="date" defaultValue={todayStr} required />
          </div>
        </div>

        <Button type="submit" className="w-full">
          {aiMode ? '✨ Generate AI Study Plan' : 'Create Study Plan'}
        </Button>
      </form>
    </div>
  );
}
