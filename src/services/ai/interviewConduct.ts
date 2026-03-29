import { streamText } from 'ai';
import { getFeatureModel } from './provider';

export async function conductInterview(
  jobInfo: {
    title?: string | null;
    companyName?: string | null;
    description: string;
    experienceLevel: string;
  },
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
) {
  return streamText({
    model: getFeatureModel('interviewConduct'),
    system: `You are an experienced technical interviewer conducting a mock interview for a ${jobInfo.experienceLevel} ${jobInfo.title ?? 'Software Engineer'} position at ${jobInfo.companyName ?? 'a tech company'}.

Job Description: ${jobInfo.description}

Conduct a professional, realistic interview. Ask one question at a time. After the candidate responds, provide brief acknowledgment then ask the next question. Cover behavioral, technical, and situational questions. After 5-7 questions, wrap up the interview.`,
    messages: conversationHistory,
  });
}
