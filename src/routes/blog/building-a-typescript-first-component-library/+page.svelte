<div class="max-w-[500px] mx-auto pt-44 pb-16">
	<article class="space-y-8">
		<h1 class="text-2xl font-bold">
			Sunnyside: Building a TypeScript-First Component Library
		</h1>
		
		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Challenge</h2>
			<p class="text-sm text-zinc-300">
				Dispel's legacy codebase was creating friction across the entire engineering team. 
				Inconsistent patterns made every UI change feel like navigating a minefield:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>PropTypes everywhere—no compile-time safety, just runtime surprises</li>
				<li>Monolithic components mixing business logic with UI rendering</li>
				<li>Manual CSS class management with zero consistency</li>
				<li>Custom utility classes like "o-flex-acenter" that only veterans understood</li>
				<li>Permission logic scattered across every component</li>
				<li>UI development taking 3-4x longer than it should</li>
			</ul>
			<p class="text-sm text-zinc-300">
				We needed to modernize, but a full rewrite wasn't an option. The solution had 
				to work alongside legacy code while establishing clear patterns for the future.
			</p>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Solution</h2>
			<p class="text-sm text-zinc-300">
				I created Sunnyside, a TypeScript-first component library built on Radix UI 
				primitives and Class Variance Authority. The goal wasn't just prettier 
				components—it was to establish a design system that would accelerate UI 
				development across the team while providing a clear migration path from legacy patterns.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-md font-semibold">
				From PropTypes Chaos to Type-Safe Components
			</h2>
			<p class="text-sm text-zinc-300">
				The transformation was dramatic. Here's what changed:
			</p>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					Before: Manual Everything
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// PropTypes, manual state, custom CSS classes
import PropTypes from 'prop-types';

function AppBanner({ message, close }) {
  const [showMessage, setShowMessage] = useState(true);
  let warning = false;
  let announcement = false;

  if (message?.type === 'info') announcement = true;
  if (message?.type === 'warning') warning = true;

  return (
    <OrganizationMessage>
      <div className="o-flex-acenter">
        {announcement && <BoomBox className="u-margin--medium" />}
        {warning && <AlertCircle className="u-margin--medium" />}
        {message.body}
      </div>
      <MessageCloseButtonX close={close} />
    </OrganizationMessage>
  );
}

AppBanner.propTypes = {
  close: PropTypes.func,
};`}</pre>
			</div>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					After: Composable, Type-Safe Components
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// TypeScript, composable primitives, consistent styling
import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
} from 'sunnyside';

export function Alerts() {
  const alerts = useAlerts();

  return (
    <>
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type}>
          <AlertIcon variant={alert.type} />
          <AlertContent>
            <AlertDescription>{alert.message}</AlertDescription>
            <AlertClose onClick={() => handleClose(alert.id)} />
          </AlertContent>
        </Alert>
      ))}
    </>
  );
}`}</pre>
			</div>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Establishing Design System Foundations</h2>
			
			<h3 class="text-base font-medium">Built on Solid Principles</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Radix UI primitives:</strong> Accessible by default with proper ARIA 
					attributes and keyboard navigation
				</li>
				<li>
					<strong>Class Variance Authority:</strong> Type-safe variant management without 
					prop explosion
				</li>
				<li>
					<strong>Tailwind CSS:</strong> Consistent design tokens and utility-first styling
				</li>
				<li>
					<strong>TypeScript generics:</strong> Flexible, reusable components with full 
					type inference
				</li>
			</ul>

			<h3 class="text-base font-medium">Team Impact</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>10x faster UI development:</strong> Engineers compose from primitives 
					instead of building from scratch
				</li>
				<li>
					<strong>Eliminated inconsistency:</strong> Design system provides single source 
					of truth for all UI
				</li>
				<li>
					<strong>Improved accessibility:</strong> WCAG compliance built into every component
				</li>
				<li>
					<strong>Reduced code review cycles:</strong> Type safety catches issues before 
					they reach review
				</li>
			</ul>

			<h3 class="text-base font-medium">Business Outcomes</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Faster feature delivery:</strong> UI work no longer blocks product launches
				</li>
				<li>
					<strong>Design consistency at scale:</strong> Brand perception improved across 
					all touchpoints
				</li>
				<li>
					<strong>Gradual migration path:</strong> No big-bang rewrite meant continuous delivery
				</li>
				<li>
					<strong>Engineering velocity increased:</strong> Team shipped 40% more features 
					quarter-over-quarter
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Bridging Legacy and Modern</h2>
			<p class="text-sm text-zinc-300">
				The key strategic challenge was enabling incremental adoption. I designed Sunnyside 
				to coexist with legacy patterns while providing clear migration incentives:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Immediate use in new features:</strong> Engineers could adopt Sunnyside 
					without touching legacy code
				</li>
				<li>
					<strong>Component-by-component migration:</strong> Replace legacy components 
					gradually as features are updated
				</li>
				<li>
					<strong>Shared design language:</strong> Even mixed codebases maintained visual 
					consistency
				</li>
				<li>
					<strong>Comprehensive documentation:</strong> Engineers knew exactly how to use 
					and when to adopt
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Technical Architecture</h2>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Radix UI</strong> for accessible, unstyled component primitives
				</li>
				<li>
					<strong>Class Variance Authority (CVA)</strong> for type-safe variant management
				</li>
				<li>
					<strong>Tailwind CSS</strong> for utility-first styling with design tokens
				</li>
				<li>
					<strong>TypeScript</strong> with strict mode and generic constraints
				</li>
				<li>
					<strong>React forwardRef</strong> for proper component composition
				</li>
				<li>
					<strong>Storybook</strong> for component documentation and visual testing
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Impact</h2>
			<p class="text-sm text-zinc-300">
				Sunnyside didn't just modernize our component library—it changed how we approach 
				UI development at Dispel. By establishing clear patterns and accessible primitives, 
				I enabled the team to build consistent, accessible interfaces without deep expertise 
				in our legacy patterns.
			</p>
			<p class="text-sm text-zinc-300">
				The best validation? When product asked for a new complex dashboard and engineering 
				delivered it in 3 days instead of the estimated 2 weeks—because we already had all 
				the UI primitives. That's what a well-architected design system should enable.
			</p>
		</section>
	</article>
</div>