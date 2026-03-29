'use client';
import { useState, useEffect, useRef } from 'react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VoiceInterviewProps {
  jobInfo: {
    id: string;
    title?: string | null;
    companyName?: string | null;
    description: string;
    experienceLevel: string;
  };
}

export function VoiceInterview({ jobInfo }: VoiceInterviewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, interimTranscript, isSupported, error, startListening, stopListening, resetTranscript } =
    useSpeechRecognition({ continuous: true, interimResults: true });
  const { isSpeaking, speak, stop: stopSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, interimTranscript]);

  const sendToAI = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsAiThinking(true);

    try {
      const response = await fetch('/api/interview/conduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobInfo, messages: newMessages }),
      });

      if (!response.ok) throw new Error('AI request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let aiText = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Parse SSE data chunks
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              aiText += text;
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      const aiMessage: Message = { role: 'assistant', content: aiText };
      setMessages(prev => [...prev, aiMessage]);
      speak(aiText);
    } catch (e) {
      console.error('AI error:', e);
    } finally {
      setIsAiThinking(false);
    }
  };

  const startInterview = async () => {
    setIsStarted(true);
    await sendToAI('Hello, I am ready for the interview.');
  };

  const handleStopTalking = async () => {
    stopListening();
    const userText = transcript.trim();
    resetTranscript();
    if (userText) {
      await sendToAI(userText);
    }
  };

  const endInterview = () => {
    stopListening();
    stopSpeaking();
    setIsEnded(true);
  };

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ready for Your Interview?</h2>
          <p className="text-muted-foreground">
            Mock interview for {jobInfo.title ?? 'Software Engineer'}
            {jobInfo.companyName ? ` at ${jobInfo.companyName}` : ''}
          </p>
        </div>
        {!isSupported && (
          <p className="text-sm text-destructive">
            Speech recognition is not supported in your browser. Please use Chrome for voice features.
          </p>
        )}
        <Button size="lg" onClick={startInterview}>
          🎙️ Start Interview
        </Button>
      </div>
    );
  }

  if (isEnded) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="text-4xl">✅</div>
        <h2 className="text-xl font-bold">Interview Complete</h2>
        <p className="text-muted-foreground">Great job! Your session has been saved.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {isSpeaking && <span className="flex items-center gap-1 text-blue-500">🔊 AI Speaking...</span>}
          {isAiThinking && <span className="text-muted-foreground">AI thinking...</span>}
        </div>
        <Button variant="destructive" size="sm" onClick={endInterview}>
          End Interview
        </Button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 max-h-96">
        {messages.map((msg, i) => (
          <Card key={i} className={msg.role === 'assistant' ? 'border-blue-200' : 'border-green-200'}>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-xs text-muted-foreground">
                {msg.role === 'assistant' ? '🤖 Interviewer' : '🧑 You'}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </CardContent>
          </Card>
        ))}
        {interimTranscript && (
          <Card className="border-dashed opacity-60">
            <CardContent className="py-2 px-4">
              <p className="text-sm italic text-muted-foreground">{interimTranscript}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {error && <p className="text-sm text-destructive">Error: {error}</p>}

      <div className="flex gap-2 justify-center pt-2">
        {!isListening ? (
          <Button
            size="lg"
            onClick={startListening}
            disabled={isAiThinking || isSpeaking}
            className="min-w-32"
          >
            🎙️ Speak
          </Button>
        ) : (
          <Button
            size="lg"
            variant="destructive"
            onClick={handleStopTalking}
            className="min-w-32 animate-pulse"
          >
            ⏹ Stop &amp; Send
          </Button>
        )}
      </div>
    </div>
  );
}
