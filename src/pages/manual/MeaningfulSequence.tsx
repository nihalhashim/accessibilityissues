import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const sequenceIssues: AccessibilityIssue[] = [
  { id: 'AX-077', title: 'CSS reorder breaks reading sequence', types: ['manual'], expectedFinding: 'Visual order differs from DOM order affecting meaning', wcagMapping: ['1.3.2'], wcagName: 'Meaningful Sequence', severity: 'medium', howToFix: 'Ensure DOM order matches intended reading order', route: '/manual/meaningful-sequence', selectorHint: 'data-issue-id="AX-077"', checkHints: ['manual:reading-order'] },
  { id: 'AX-078', title: 'Flexbox order property misuse', types: ['manual'], expectedFinding: 'CSS order property creates confusing tab sequence', wcagMapping: ['1.3.2', '2.4.3'], wcagName: 'Meaningful Sequence, Focus Order', severity: 'medium', howToFix: 'Avoid CSS order or ensure it matches logical reading', route: '/manual/meaningful-sequence', selectorHint: 'data-issue-id="AX-078"', checkHints: ['manual:flex-order'] },
  { id: 'AX-079', title: 'Grid layout breaks sequence', types: ['manual'], expectedFinding: 'CSS Grid placement creates illogical reading order', wcagMapping: ['1.3.2'], wcagName: 'Meaningful Sequence', severity: 'medium', howToFix: 'Use DOM order that matches grid visual placement', route: '/manual/meaningful-sequence', selectorHint: 'data-issue-id="AX-079"', checkHints: ['manual:grid-order'] },
];

export default function ManualMeaningfulSequence() {
  useEffect(() => {
    sequenceIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) { registerIssue(issue); if (!window.__registeredIssues) window.__registeredIssues = new Set(); window.__registeredIssues.add(issue.id); }
    });
  }, []);

  return (
    <PageWrapper title="Meaningful Sequence" description="Manual testing for reading order and content sequence">
      <div className="space-y-8">
        <header><h1 className="text-3xl font-bold text-foreground mb-4">Meaningful Sequence Issues</h1></header>

        <section>
          <IssueCard issue={sequenceIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="flex flex-col-reverse" data-issue-id="AX-077" data-issue-type="manual" data-wcag="1.3.2">
              <p>1. First paragraph in DOM (displays last)</p>
              <p>2. Second paragraph in DOM (displays second)</p>
              <p>3. Third paragraph in DOM (displays first)</p>
            </div>
          </div>
        </section>

        <section>
          <IssueCard issue={sequenceIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="flex gap-4" data-issue-id="AX-078" data-issue-type="manual" data-wcag="1.3.2,2.4.3">
              <button style={{ order: 3 }} className="px-3 py-1 bg-muted rounded">Button A (order:3)</button>
              <button style={{ order: 1 }} className="px-3 py-1 bg-muted rounded">Button B (order:1)</button>
              <button style={{ order: 2 }} className="px-3 py-1 bg-muted rounded">Button C (order:2)</button>
            </div>
          </div>
        </section>

        <section>
          <IssueCard issue={sequenceIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="grid grid-cols-3 gap-2" data-issue-id="AX-079" data-issue-type="manual" data-wcag="1.3.2">
              <div className="bg-muted p-2 rounded col-start-3">1st in DOM</div>
              <div className="bg-muted p-2 rounded col-start-1">2nd in DOM</div>
              <div className="bg-muted p-2 rounded col-start-2">3rd in DOM</div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
