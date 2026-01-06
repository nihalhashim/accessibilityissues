import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const errorIssues: AccessibilityIssue[] = [
  {
    id: 'AX-073',
    title: 'Error message not linked to field',
    types: ['guided', 'automated'],
    expectedFinding: 'Validation error not programmatically associated with input',
    wcagMapping: ['3.3.1', '4.1.3'],
    wcagName: 'Error Identification, Status Messages',
    severity: 'high',
    howToFix: 'Use aria-describedby to link error message to input',
    route: '/guided/errors-feedback',
    selectorHint: 'data-issue-id="AX-073"',
    checkHints: ['guided:error-association'],
  },
  {
    id: 'AX-074',
    title: 'Error summary not focused',
    types: ['guided'],
    expectedFinding: 'Form submission errors shown but focus not moved to summary',
    wcagMapping: ['3.3.1'],
    wcagName: 'Error Identification',
    severity: 'medium',
    howToFix: 'Move focus to error summary on form submission failure',
    route: '/guided/errors-feedback',
    selectorHint: 'data-issue-id="AX-074"',
    checkHints: ['guided:focus-error-summary'],
  },
  {
    id: 'AX-075',
    title: 'Success message not announced',
    types: ['guided'],
    expectedFinding: 'Form success feedback not announced to screen readers',
    wcagMapping: ['4.1.3'],
    wcagName: 'Status Messages',
    severity: 'medium',
    howToFix: 'Use role="status" or aria-live for success messages',
    route: '/guided/errors-feedback',
    selectorHint: 'data-issue-id="AX-075"',
    checkHints: ['guided:status-announcement'],
  },
  {
    id: 'AX-076',
    title: 'Error suggestion missing',
    types: ['manual'],
    expectedFinding: 'Error tells user what is wrong but not how to fix it',
    wcagMapping: ['3.3.3'],
    wcagName: 'Error Suggestion',
    severity: 'medium',
    howToFix: 'Provide specific guidance on how to correct the error',
    route: '/guided/errors-feedback',
    selectorHint: 'data-issue-id="AX-076"',
    checkHints: ['manual:error-suggestion'],
  },
];

export default function GuidedErrorsFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    errorIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper title="Errors & Feedback" description="Issues with form validation and status feedback">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Errors & Feedback Issues</h1>
          <p className="text-muted-foreground">Test form validation and feedback announcements.</p>
        </header>

        <section>
          <IssueCard issue={errorIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="email-error" className="block font-medium mb-1">Email</label>
            <input type="email" id="email-error" className="px-3 py-2 border border-destructive rounded w-full max-w-xs" data-issue-id="AX-073" data-issue-type="guided,automated" data-wcag="3.3.1,4.1.3" />
            <p className="text-sm text-destructive mt-1">Invalid email format</p>
            <p className="text-xs text-muted-foreground mt-1">Error not linked via aria-describedby</p>
          </div>
        </section>

        <section>
          <IssueCard issue={errorIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-074" data-issue-type="guided" data-wcag="3.3.1">
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              {submitted && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded">
                  <p className="font-medium text-destructive">Please fix the following errors:</p>
                  <ul className="list-disc list-inside text-sm text-destructive">
                    <li>Name is required</li>
                    <li>Email is invalid</li>
                  </ul>
                </div>
              )}
              <input type="text" placeholder="Name" className="px-3 py-2 border border-input rounded w-full max-w-xs mb-2" />
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">Submit (focus won't move to errors)</button>
            </form>
          </div>
        </section>

        <section>
          <IssueCard issue={errorIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <button onClick={() => { setSuccess(true); setTimeout(() => setSuccess(false), 3000); }} className="px-4 py-2 bg-primary text-primary-foreground rounded">Save Changes</button>
            {success && <div className="mt-2 p-2 bg-green-100 text-green-800 rounded" data-issue-id="AX-075" data-issue-type="guided" data-wcag="4.1.3">Changes saved successfully! (not announced)</div>}
          </div>
        </section>

        <section>
          <IssueCard issue={errorIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-076" data-issue-type="manual" data-wcag="3.3.3">
            <label className="block font-medium mb-1">Password</label>
            <input type="password" className="px-3 py-2 border border-destructive rounded w-full max-w-xs" />
            <p className="text-sm text-destructive mt-1">Password is invalid</p>
            <p className="text-xs text-muted-foreground mt-1">Doesn't tell user what makes it valid</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
