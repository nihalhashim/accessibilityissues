import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const langIssues: AccessibilityIssue[] = [
  { id: 'AX-084', title: 'Wrong lang attribute value', types: ['automated'], expectedFinding: 'HTML lang attribute does not match content language', wcagMapping: ['3.1.1'], wcagName: 'Language of Page', severity: 'medium', howToFix: 'Set correct lang attribute on html element', route: '/manual/reading-language', selectorHint: 'data-issue-id="AX-084"', checkHints: ['axe:html-lang-valid'] },
  { id: 'AX-085', title: 'Language change not marked', types: ['manual'], expectedFinding: 'Inline text in different language not marked with lang', wcagMapping: ['3.1.2'], wcagName: 'Language of Parts', severity: 'low', howToFix: 'Add lang attribute to elements with different language', route: '/manual/reading-language', selectorHint: 'data-issue-id="AX-085"', checkHints: ['manual:lang-parts'] },
  { id: 'AX-086', title: 'Unclear abbreviations', types: ['manual'], expectedFinding: 'Abbreviations used without expansion', wcagMapping: ['3.1.4'], wcagName: 'Abbreviations', severity: 'low', howToFix: 'Provide expansion on first use or use abbr element', route: '/manual/reading-language', selectorHint: 'data-issue-id="AX-086"', checkHints: ['manual:abbreviations'] },
];

export default function ManualReadingLanguage() {
  useEffect(() => { langIssues.forEach(issue => { if (!window.__registeredIssues?.has(issue.id)) { registerIssue(issue); if (!window.__registeredIssues) window.__registeredIssues = new Set(); window.__registeredIssues.add(issue.id); } }); }, []);

  return (
    <PageWrapper title="Reading & Language" description="Manual testing for language and reading level issues">
      <div className="space-y-8">
        <header><h1 className="text-3xl font-bold text-foreground mb-4">Reading & Language Issues</h1></header>

        <section>
          <IssueCard issue={langIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-084" data-issue-type="automated" data-wcag="3.1.1">
            <p>This page has lang="en" but imagine the HTML element had lang="fr" while content is English.</p>
          </div>
        </section>

        <section>
          <IssueCard issue={langIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-085" data-issue-type="manual" data-wcag="3.1.2">
            <p>Welcome to our service. As we say in French: <span>C'est la vie</span> - that's life!</p>
            <p className="text-sm text-muted-foreground mt-2">French phrase not marked with lang="fr"</p>
          </div>
        </section>

        <section>
          <IssueCard issue={langIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-086" data-issue-type="manual" data-wcag="3.1.4">
            <p>The CEO announced the new ROI targets for Q4 FY25 during the AGM. The CFO presented KPIs showing YoY growth.</p>
            <p className="text-sm text-muted-foreground mt-2">Multiple abbreviations with no expansions</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
