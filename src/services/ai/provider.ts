import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

export type ModelId =
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro'
  | 'gpt-4.1'
  | 'gpt-4.1-mini'
  | 'claude-sonnet-4'
  | 'claude-sonnet-4-5';

export type Feature =
  | 'questionGeneration'
  | 'resumeAnalysis'
  | 'answerFeedback'
  | 'interviewConduct'
  | 'studyPlanGeneration'
  | 'interviewFeedback';

const FEATURE_MODELS: Record<Feature, ModelId> = {
  questionGeneration: 'gemini-2.5-flash',
  resumeAnalysis: 'gpt-4.1',
  answerFeedback: 'gemini-2.5-flash',
  interviewConduct: 'gemini-2.5-flash',
  studyPlanGeneration: 'gemini-2.5-flash',
  interviewFeedback: 'claude-sonnet-4-5',
};

export function getModel(modelId: ModelId) {
  switch (modelId) {
    case 'gemini-2.5-flash':
      return google('gemini-2.5-flash-preview-04-17');
    case 'gemini-2.5-pro':
      return google('gemini-2.5-pro-preview-03-25');
    case 'gpt-4.1':
      return openai('gpt-4.1');
    case 'gpt-4.1-mini':
      return openai('gpt-4.1-mini');
    case 'claude-sonnet-4':
      return anthropic('claude-sonnet-4-20250514');
    case 'claude-sonnet-4-5':
      return anthropic('claude-sonnet-4-5');
    default:
      return google('gemini-2.5-flash-preview-04-17');
  }
}

export function getFeatureModel(feature: Feature) {
  return getModel(FEATURE_MODELS[feature]);
}
