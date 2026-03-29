import { ThemeToggle } from '@/components/ThemeToggle';
import { SettingsForm } from '@/features/settings/SettingsForm';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Settings | InterviewForge',
};

export default function SettingsPage() {
  return (
    <PageContainer title="Settings" description="Manage your preferences">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Choose your preferred theme</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Model Preferences</CardTitle>
            <CardDescription>Configure which AI model powers your interview preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>InterviewForge application info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Version:</span> 1.0.0</p>
            <p><span className="font-medium text-foreground">Framework:</span> Next.js 15</p>
            <p><span className="font-medium text-foreground">Description:</span> AI-powered interview preparation platform</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
