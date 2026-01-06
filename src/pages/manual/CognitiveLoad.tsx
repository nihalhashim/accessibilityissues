import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const cogIssues: AccessibilityIssue[] = [
  { id: 'AX-087', title: 'Overwhelming information density', types: ['manual'], expectedFinding: 'Too much information presented at once', wcagMapping: ['3.1.5'], wcagName: 'Reading Level', severity: 'medium', howToFix: 'Break content into digestible chunks; use progressive disclosure', route: '/manual/cognitive-load', selectorHint: 'data-issue-id="AX-087"', checkHints: ['manual:cognitive-load'] },
  { id: 'AX-088', title: 'Confusing jargon', types: ['manual'], expectedFinding: 'Technical terms used without explanation', wcagMapping: ['3.1.3'], wcagName: 'Unusual Words', severity: 'low', howToFix: 'Define technical terms or provide glossary', route: '/manual/cognitive-load', selectorHint: 'data-issue-id="AX-088"', checkHints: ['manual:jargon'] },
  { id: 'AX-089', title: 'Destructive action without confirmation', types: ['manual'], expectedFinding: 'Delete action occurs immediately without confirmation', wcagMapping: ['3.3.4'], wcagName: 'Error Prevention (Legal, Financial, Data)', severity: 'high', howToFix: 'Add confirmation dialog for destructive actions', route: '/manual/cognitive-load', selectorHint: 'data-issue-id="AX-089"', checkHints: ['manual:error-prevention'] },
  { id: 'AX-090', title: 'Session timeout without warning', types: ['manual', 'guided'], expectedFinding: 'Session expires without warning or extension option', wcagMapping: ['2.2.1'], wcagName: 'Timing Adjustable', severity: 'high', howToFix: 'Warn users before timeout; allow extension', route: '/manual/cognitive-load', selectorHint: 'data-issue-id="AX-090"', checkHints: ['manual:timing'] },
];

export default function ManualCognitiveLoad() {
  useEffect(() => { cogIssues.forEach(issue => { if (!window.__registeredIssues?.has(issue.id)) { registerIssue(issue); if (!window.__registeredIssues) window.__registeredIssues = new Set(); window.__registeredIssues.add(issue.id); } }); }, []);

  return (
    <PageWrapper title="Cognitive Load" description="Manual testing for cognitive accessibility issues">
      <div className="space-y-8">
        <header><h1 className="text-3xl font-bold text-foreground mb-4">Cognitive Load Issues</h1></header>

        <section>
          <IssueCard issue={cogIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card text-xs" data-issue-id="AX-087" data-issue-type="manual" data-wcag="3.1.5">
            <p>IMPORTANT: Read all terms carefully. By using this service you agree to binding arbitration for all disputes. Your data may be shared with third-party partners for marketing purposes unless you opt out within 30 days. Cancellation fees apply. Minimum commitment 12 months. Auto-renewal enabled by default. Price changes effective immediately upon notice. We reserve the right to modify terms at any time. Contact support for questions. Allow 6-8 weeks for refunds. Subject to availability. Terms may vary by region. Additional fees may apply. Not responsible for lost items. Use at own risk. See full terms for complete details.</p>
          </div>
        </section>

        <section>
          <IssueCard issue={cogIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-088" data-issue-type="manual" data-wcag="3.1.3">
            <p>Configure your SSO SAML endpoints with the IdP metadata. Ensure your SCIM provisioning webhook has proper JWT validation and OIDC claims mapping.</p>
          </div>
        </section>

        <section>
          <IssueCard issue={cogIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-089" data-issue-type="manual" data-wcag="3.3.4">
            <button onClick={() => alert('Account deleted!')} className="px-4 py-2 bg-destructive text-destructive-foreground rounded">Delete Account</button>
            <p className="text-sm text-muted-foreground mt-2">No confirmation - deletes immediately</p>
          </div>
        </section>

        <section>
          <IssueCard issue={cogIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-090" data-issue-type="manual,guided" data-wcag="2.2.1">
            <p className="text-destructive font-medium">Your session will expire in 30 seconds</p>
            <p className="text-sm text-muted-foreground">No way to extend or warning before this point</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
