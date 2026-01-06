import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const sensoryIssues: AccessibilityIssue[] = [
  { id: 'AX-080', title: 'Color-only instruction', types: ['manual'], expectedFinding: 'Instruction relies on color perception alone', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'high', howToFix: 'Add text label in addition to color reference', route: '/manual/instructions-sensory', selectorHint: 'data-issue-id="AX-080"', checkHints: ['manual:sensory-color'] },
  { id: 'AX-081', title: 'Position-only instruction', types: ['manual'], expectedFinding: 'Instruction relies on visual position only', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'medium', howToFix: 'Include element name or label in instruction', route: '/manual/instructions-sensory', selectorHint: 'data-issue-id="AX-081"', checkHints: ['manual:sensory-position'] },
  { id: 'AX-082', title: 'Shape-only instruction', types: ['manual'], expectedFinding: 'Instruction relies on shape recognition only', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'medium', howToFix: 'Add text label describing the control', route: '/manual/instructions-sensory', selectorHint: 'data-issue-id="AX-082"', checkHints: ['manual:sensory-shape'] },
  { id: 'AX-083', title: 'Icon-only instruction', types: ['manual'], expectedFinding: 'Instruction references icon without text description', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'medium', howToFix: 'Include text description of the icon or its label', route: '/manual/instructions-sensory', selectorHint: 'data-issue-id="AX-083"', checkHints: ['manual:sensory-icon'] },
];

export default function ManualInstructionsSensory() {
  useEffect(() => { sensoryIssues.forEach(issue => { if (!window.__registeredIssues?.has(issue.id)) { registerIssue(issue); if (!window.__registeredIssues) window.__registeredIssues = new Set(); window.__registeredIssues.add(issue.id); } }); }, []);

  return (
    <PageWrapper title="Sensory Instructions" description="Manual testing for instructions that rely on sensory characteristics">
      <div className="space-y-8">
        <header><h1 className="text-3xl font-bold text-foreground mb-4">Sensory Instructions Issues</h1></header>

        <section>
          <IssueCard issue={sensoryIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-080" data-issue-type="manual" data-wcag="1.3.3">
            <p className="mb-3">Click the <span className="text-green-600 font-bold">green</span> button to continue or the <span className="text-red-600 font-bold">red</span> button to cancel.</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded mr-2">●</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded">●</button>
          </div>
        </section>

        <section>
          <IssueCard issue={sensoryIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-081" data-issue-type="manual" data-wcag="1.3.3">
            <p className="mb-3">Use the button on the right to submit your form.</p>
            <div className="flex gap-4"><button className="px-4 py-2 bg-muted rounded">Cancel</button><button className="px-4 py-2 bg-primary text-primary-foreground rounded">Submit</button></div>
          </div>
        </section>

        <section>
          <IssueCard issue={sensoryIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-082" data-issue-type="manual" data-wcag="1.3.3">
            <p className="mb-3">Click the round button to play the video.</p>
            <button className="w-12 h-12 rounded-full bg-primary text-primary-foreground">▶</button>
          </div>
        </section>

        <section>
          <IssueCard issue={sensoryIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-083" data-issue-type="manual" data-wcag="1.3.3">
            <p className="mb-3">Click the gear icon to access settings.</p>
            <button className="p-2 bg-muted rounded">⚙️</button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
