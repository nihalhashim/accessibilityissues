import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const mediaIssues: AccessibilityIssue[] = [
  {
    id: 'AX-023',
    title: 'Image missing alt attribute',
    types: ['automated'],
    expectedFinding: 'Image element has no alt attribute',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Add alt attribute with descriptive text or empty alt="" for decorative images',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-023"',
    checkHints: ['axe:image-alt'],
  },
  {
    id: 'AX-024',
    title: 'Image with empty alt but not decorative',
    types: ['automated', 'manual'],
    expectedFinding: 'Meaningful image has empty alt attribute',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Add meaningful alt text describing the image content',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-024"',
    checkHints: ['manual:alt-text-quality'],
  },
  {
    id: 'AX-025',
    title: 'Alt text is filename',
    types: ['automated'],
    expectedFinding: 'Alt text contains filename like "IMG_1234.jpg"',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'medium',
    howToFix: 'Replace filename with meaningful description of image content',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-025"',
    checkHints: ['axe:image-alt', 'manual:alt-text-quality'],
  },
  {
    id: 'AX-026',
    title: 'Decorative image not hidden',
    types: ['automated'],
    expectedFinding: 'Decorative image lacks empty alt or role="presentation"',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'low',
    howToFix: 'Add alt="" or role="presentation" to decorative images',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-026"',
    checkHints: ['axe:image-alt'],
  },
  {
    id: 'AX-027',
    title: 'Image link with no accessible name',
    types: ['automated'],
    expectedFinding: 'Link contains only image with no alt text',
    wcagMapping: ['1.1.1', '2.4.4'],
    wcagName: 'Non-text Content, Link Purpose',
    severity: 'high',
    howToFix: 'Add alt text to image or aria-label to link',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-027"',
    checkHints: ['axe:image-alt', 'axe:link-name'],
  },
  {
    id: 'AX-028',
    title: 'Icon used without text alternative',
    types: ['automated'],
    expectedFinding: 'SVG icon has no accessible name',
    wcagMapping: ['1.1.1', '4.1.2'],
    wcagName: 'Non-text Content, Name Role Value',
    severity: 'medium',
    howToFix: 'Add aria-label or title element to SVG, or include visually hidden text',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-028"',
    checkHints: ['axe:svg-img-alt'],
  },
  {
    id: 'AX-029',
    title: 'Background image with information',
    types: ['manual'],
    expectedFinding: 'CSS background image conveys information without text alternative',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Provide text alternative in content or use actual img element',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-029"',
    checkHints: ['manual:background-image-alt'],
  },
  {
    id: 'AX-030',
    title: 'Alt text too long',
    types: ['manual'],
    expectedFinding: 'Alt text is excessively long (over 125 characters)',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'low',
    howToFix: 'Shorten alt text to be concise. Use longdesc or describedby for complex images',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-030"',
    checkHints: ['manual:alt-text-length'],
  },
  {
    id: 'AX-031',
    title: 'Figure without figcaption',
    types: ['automated'],
    expectedFinding: 'Figure element has no figcaption for context',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'low',
    howToFix: 'Add figcaption element to provide context for the figure',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-031"',
    checkHints: ['manual:figure-caption'],
  },
  {
    id: 'AX-032',
    title: 'Video without captions',
    types: ['automated', 'manual'],
    expectedFinding: 'Video element has no captions track',
    wcagMapping: ['1.2.2'],
    wcagName: 'Captions (Prerecorded)',
    severity: 'high',
    howToFix: 'Add WebVTT captions track to video element',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-032"',
    checkHints: ['axe:video-caption'],
  },
  {
    id: 'AX-033',
    title: 'Audio without transcript',
    types: ['manual'],
    expectedFinding: 'Audio content has no text transcript',
    wcagMapping: ['1.2.1'],
    wcagName: 'Audio-only and Video-only (Prerecorded)',
    severity: 'high',
    howToFix: 'Provide text transcript for audio content',
    route: '/automated/media',
    selectorHint: 'data-issue-id="AX-033"',
    checkHints: ['manual:audio-transcript'],
  },
];

export default function AutomatedMedia() {
  useEffect(() => {
    mediaIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper 
      title="Media Issues" 
      description="Accessibility issues related to images, icons, video, and audio content"
    >
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Media Accessibility Issues
          </h1>
          <p className="text-muted-foreground">
            This page contains {mediaIssues.length} media-related accessibility issues.
          </p>
        </header>

        {/* AX-023: Image missing alt */}
        <section>
          <IssueCard issue={mediaIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Product Gallery</p>
            {/* ISSUE: Image has no alt attribute at all */}
            <img
              src="https://via.placeholder.com/200x150?text=Product"
              data-issue-id="AX-023"
              data-issue-type="automated"
              data-wcag="1.1.1"
              className="rounded"
            />
          </div>
        </section>

        {/* AX-024: Empty alt but not decorative */}
        <section>
          <IssueCard issue={mediaIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Team Photo</p>
            {/* ISSUE: Meaningful image marked as decorative with empty alt */}
            <img
              src="https://via.placeholder.com/200x150?text=Team+Photo"
              alt=""
              data-issue-id="AX-024"
              data-issue-type="automated,manual"
              data-wcag="1.1.1"
              className="rounded"
            />
            <p className="text-sm mt-2">Our amazing team at the annual conference!</p>
          </div>
        </section>

        {/* AX-025: Alt text is filename */}
        <section>
          <IssueCard issue={mediaIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Office Photo</p>
            {/* ISSUE: Alt text is just a filename */}
            <img
              src="https://via.placeholder.com/200x150?text=Office"
              alt="IMG_2847_final_v2.jpg"
              data-issue-id="AX-025"
              data-issue-type="automated"
              data-wcag="1.1.1"
              className="rounded"
            />
          </div>
        </section>

        {/* AX-026: Decorative image not hidden */}
        <section>
          <IssueCard issue={mediaIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Decorative Divider</p>
            {/* ISSUE: Decorative image has descriptive alt instead of empty */}
            <img
              src="https://via.placeholder.com/400x20?text=---"
              alt="Decorative horizontal line divider with gradient colors"
              data-issue-id="AX-026"
              data-issue-type="automated"
              data-wcag="1.1.1"
              className="w-full"
            />
          </div>
        </section>

        {/* AX-027: Image link no name */}
        <section>
          <IssueCard issue={mediaIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Social Links</p>
            {/* ISSUE: Link contains only image with no alt */}
            <a 
              href="https://twitter.com"
              data-issue-id="AX-027"
              data-issue-type="automated"
              data-wcag="1.1.1,2.4.4"
            >
              <img
                src="https://via.placeholder.com/40?text=X"
                className="rounded"
              />
            </a>
          </div>
        </section>

        {/* AX-028: Icon without text */}
        <section>
          <IssueCard issue={mediaIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Action Buttons</p>
            <button 
              className="p-2 bg-primary text-primary-foreground rounded"
              data-issue-id="AX-028"
              data-issue-type="automated"
              data-wcag="1.1.1,4.1.2"
            >
              {/* ISSUE: SVG icon with no accessible name */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </section>

        {/* AX-029: Background image with info */}
        <section>
          <IssueCard issue={mediaIssues[6]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Important info in background image only */}
            <div 
              className="h-32 rounded flex items-center justify-center"
              style={{ 
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
              }}
              data-issue-id="AX-029"
              data-issue-type="manual"
              data-wcag="1.1.1"
            >
              {/* Imagine this background contained text like "50% OFF SALE" */}
              <span className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                [Imagine promotional banner with "50% OFF" burned into background image]
              </span>
            </div>
          </div>
        </section>

        {/* AX-030: Alt text too long */}
        <section>
          <IssueCard issue={mediaIssues[7]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Complex Diagram</p>
            {/* ISSUE: Excessively long alt text */}
            <img
              src="https://via.placeholder.com/300x200?text=Diagram"
              alt="This is an extremely detailed organizational chart showing the complete hierarchy of our company starting from the CEO at the top, moving down through various vice presidents and directors, then to department managers, team leads, and finally individual contributors. Each node contains the person's name, title, department, years of service, and direct reports count. The chart uses color coding where blue represents executive level, green represents management level, and gray represents individual contributors. Arrows indicate reporting relationships and dotted lines show cross-functional collaborations."
              data-issue-id="AX-030"
              data-issue-type="manual"
              data-wcag="1.1.1"
              className="rounded"
            />
          </div>
        </section>

        {/* AX-031: Figure without figcaption */}
        <section>
          <IssueCard issue={mediaIssues[8]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Figure element with no figcaption */}
            <figure
              data-issue-id="AX-031"
              data-issue-type="automated"
              data-wcag="1.1.1"
            >
              <img
                src="https://via.placeholder.com/300x200?text=Chart"
                alt="Quarterly sales chart"
                className="rounded"
              />
            </figure>
          </div>
        </section>

        {/* AX-032: Video without captions */}
        <section>
          <IssueCard issue={mediaIssues[9]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Product Demo Video</p>
            {/* ISSUE: Video with no captions track */}
            <video
              controls
              width="400"
              data-issue-id="AX-032"
              data-issue-type="automated,manual"
              data-wcag="1.2.2"
              className="rounded bg-muted"
              poster="https://via.placeholder.com/400x225?text=Video+Demo"
            >
              <source src="#" type="video/mp4" />
              {/* No track element for captions */}
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* AX-033: Audio without transcript */}
        <section>
          <IssueCard issue={mediaIssues[10]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Podcast Episode</p>
            {/* ISSUE: Audio with no transcript provided */}
            <audio
              controls
              data-issue-id="AX-033"
              data-issue-type="manual"
              data-wcag="1.2.1"
              className="w-full max-w-md"
            >
              <source src="#" type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
            <p className="text-sm text-muted-foreground mt-2">
              Episode 42: Interview with our CTO about accessibility (no transcript provided)
            </p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
