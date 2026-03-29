import { LoginForm } from "./LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; from?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl font-bold select-none">
            IF
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            InterviewForge
          </h1>
          <p className="text-sm text-muted-foreground">
            Your personal AI interview coach
          </p>
        </div>

        <LoginForm error={error} />
      </div>
    </div>
  );
}
