'use client';
import { VoiceInterview } from './VoiceInterview';

interface VoiceInterviewWrapperProps {
  jobInfo: {
    id: string;
    title?: string | null;
    companyName?: string | null;
    description: string;
    experienceLevel: string;
  };
}

export function VoiceInterviewWrapper({ jobInfo }: VoiceInterviewWrapperProps) {
  return <VoiceInterview jobInfo={jobInfo} />;
}
