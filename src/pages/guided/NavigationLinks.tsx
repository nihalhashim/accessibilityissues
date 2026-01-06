import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const navIssues: AccessibilityIssue[] = [
  {
    id: 'AX-068',
    title: 'Ambiguous link text - click here',
    types: ['automated', 'guided'],
    expectedFinding: 'Link text "click here" does not describe destination',
    wcagMapping: ['2.4.4'],
    wcagName: 'Link Purpose (In Context)',
    severity: 'medium',
    howToFix: 'Use descriptive link text that indicates destination',
    route: '/guided/navigation-links',
    selectorHint: 'data-issue-id="AX-068"',
    checkHints: ['axe:link-name'],
  },
  {
    id: 'AX-069',
    title: 'Multiple identical link texts',
    types: ['guided'],
    expectedFinding: 'Multiple "Read more" links without distinguishing context',
    wcagMapping: ['2.4.4'],
    wcagName: 'Link Purpose (In Context)',
    severity: 'medium',
    howToFix: 'Add aria-label or visually hidden text to distinguish links',
    route: '/guided/navigation-links',
    selectorHint: 'data-issue-id="AX-069"',
    checkHints: ['guided:link-context'],
  },
  {
    id: 'AX-070',
    title: 'Link opens new window without warning',
    types: ['guided'],
    expectedFinding: 'Link has target="_blank" without indication',
    wcagMapping: ['3.2.5'],
    wcagName: 'Change on Request',
    severity: 'low',
    howToFix: 'Add "(opens in new tab)" text or icon with accessible name',
    route: '/guided/navigation-links',
    selectorHint: 'data-issue-id="AX-070"',
    checkHints: ['guided:new-window'],
  },
  {
    id: 'AX-071',
    title: 'Download link without file info',
    types: ['guided', 'manual'],
    expectedFinding: 'Download link missing file type and size information',
    wcagMapping: ['2.4.4'],
    wcagName: 'Link Purpose (In Context)',
    severity: 'low',
    howToFix: 'Include file type and size in link text or adjacent content',
    route: '/guided/navigation-links',
    selectorHint: 'data-issue-id="AX-071"',
    checkHints: ['manual:download-info'],
  },
  {
    id: 'AX-072',
    title: 'Empty link',
    types: ['automated'],
    expectedFinding: 'Link element contains no text or accessible name',
    wcagMapping: ['2.4.4', '4.1.2'],
    wcagName: 'Link Purpose, Name Role Value',
    severity: 'high',
    howToFix: 'Add text content or aria-label to link',
    route: '/guided/navigation-links',
    selectorHint: 'data-issue-id="AX-072"',
    checkHints: ['axe:link-name'],
  },
];

export default function GuidedNavigationLinks() {
  useEffect(() => {
    navIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper title="Navigation & Links" description="Issues related to navigation patterns and link accessibility">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Navigation & Link Issues</h1>
          <p className="text-muted-foreground">Issues with link text clarity and navigation patterns.</p>
        </header>

        <section>
          <IssueCard issue={navIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p>To learn more about our services, <a href="#" data-issue-id="AX-068" data-issue-type="automated,guided" data-wcag="2.4.4" className="text-primary underline">click here</a>.</p>
          </div>
        </section>

        <section>
          <IssueCard issue={navIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card space-y-4" data-issue-id="AX-069" data-issue-type="guided" data-wcag="2.4.4">
            <div className="border-b border-border pb-2"><h3 className="font-medium">Article One</h3><a href="#" className="text-primary underline">Read more</a></div>
            <div className="border-b border-border pb-2"><h3 className="font-medium">Article Two</h3><a href="#" className="text-primary underline">Read more</a></div>
            <div><h3 className="font-medium">Article Three</h3><a href="#" className="text-primary underline">Read more</a></div>
          </div>
        </section>

        <section>
          <IssueCard issue={navIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <a href="https://example.com" target="_blank" rel="noopener" data-issue-id="AX-070" data-issue-type="guided" data-wcag="3.2.5" className="text-primary underline">Visit our partner site</a>
            <p className="text-sm text-muted-foreground mt-1">Opens in new tab with no warning</p>
          </div>
        </section>

        <section>
          <IssueCard issue={navIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <a href="#" data-issue-id="AX-071" data-issue-type="guided,manual" data-wcag="2.4.4" className="text-primary underline">Download</a>
            <p className="text-sm text-muted-foreground mt-1">No file type or size indicated</p>
          </div>
        </section>

        <section>
          <IssueCard issue={navIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <a href="#" data-issue-id="AX-072" data-issue-type="automated" data-wcag="2.4.4,4.1.2" className="inline-block w-6 h-6 bg-primary rounded"></a>
            <p className="text-sm text-muted-foreground mt-1">Empty link - no text or accessible name</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
