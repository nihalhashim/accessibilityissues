import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/PageWrapper';
import { getIssueCounts } from '@/types/issues';

/**
 * Home Page - Landing page explaining the Accessibility Audit Playground
 * 
 * Provides overview of the 3 audit modes and links to all sections.
 */
export default function Index() {
  const counts = getIssueCounts();

  return (
    <PageWrapper 
      title="Home" 
      description="Accessibility Audit Playground - A test harness for automated, guided, and manual accessibility testing"
    >
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Accessibility Audit Playground
          </h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive test harness for accessibility auditing tools. This application 
            intentionally contains accessibility issues for testing automated scanners, 
            guided testing workflows, and manual expert reviews.
          </p>
        </header>

        {/* Issue Counts Summary */}
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Issue Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-foreground">{counts.total}</div>
              <div className="text-sm text-muted-foreground">Total Issues</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-[hsl(var(--type-automated))]">{counts.automated}</div>
              <div className="text-sm text-muted-foreground">Automated</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-[hsl(var(--type-guided))]">{counts.guided}</div>
              <div className="text-sm text-muted-foreground">Guided</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-[hsl(var(--type-manual))]">{counts.manual}</div>
              <div className="text-sm text-muted-foreground">Manual</div>
            </div>
          </div>
        </section>

        {/* Three Audit Modes */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">The Three Audit Modes</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Automated */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[hsl(var(--type-automated))]"></span>
                <h3 className="font-semibold text-foreground">Automated Testing</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Issues detectable by automated tools like axe-core, WAVE, Lighthouse, 
                or Pa11y. These can be caught without human judgment.
              </p>
              <div className="space-y-1 text-sm">
                <Link to="/automated/forms" className="block text-primary hover:underline">→ Form Issues</Link>
                <Link to="/automated/structure" className="block text-primary hover:underline">→ Structure Issues</Link>
                <Link to="/automated/media" className="block text-primary hover:underline">→ Media Issues</Link>
                <Link to="/automated/color-contrast" className="block text-primary hover:underline">→ Color Contrast</Link>
                <Link to="/automated/aria-misuse" className="block text-primary hover:underline">→ ARIA Misuse</Link>
              </div>
            </div>

            {/* Guided */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[hsl(var(--type-guided))]"></span>
                <h3 className="font-semibold text-foreground">Guided Testing</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Issues requiring human interaction with tool guidance. Keyboard testing, 
                focus management, and dynamic content verification.
              </p>
              <div className="space-y-1 text-sm">
                <Link to="/guided/keyboard-focus" className="block text-primary hover:underline">→ Keyboard & Focus</Link>
                <Link to="/guided/modals-dynamic" className="block text-primary hover:underline">→ Modals & Dynamic</Link>
                <Link to="/guided/navigation-links" className="block text-primary hover:underline">→ Navigation & Links</Link>
                <Link to="/guided/errors-feedback" className="block text-primary hover:underline">→ Errors & Feedback</Link>
              </div>
            </div>

            {/* Manual */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-3 h-3 rounded-full bg-[hsl(var(--type-manual))]"></span>
                <h3 className="font-semibold text-foreground">Manual Testing</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Issues requiring expert human judgment. Content quality, cognitive 
                accessibility, and meaningful context evaluation.
              </p>
              <div className="space-y-1 text-sm">
                <Link to="/manual/meaningful-sequence" className="block text-primary hover:underline">→ Meaningful Sequence</Link>
                <Link to="/manual/instructions-sensory" className="block text-primary hover:underline">→ Sensory Instructions</Link>
                <Link to="/manual/reading-language" className="block text-primary hover:underline">→ Reading & Language</Link>
                <Link to="/manual/cognitive-load" className="block text-primary hover:underline">→ Cognitive Load</Link>
                <Link to="/manual/captions-quality" className="block text-primary hover:underline">→ Captions Quality</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-muted rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/matrix" 
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              View Complete Issue Matrix
            </Link>
            <Link 
              to="/readme" 
              className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Read Usage Guide
            </Link>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
