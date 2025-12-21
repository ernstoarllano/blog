<div class="max-w-[500px] mx-auto pt-44 pb-16">
	<article class="space-y-8">
		<h1 class="text-2xl font-bold">
			Building a Scalable Email System: From Legacy Text to React Email
		</h1>
		
		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Challenge</h2>
			<p class="text-sm text-zinc-300">
				Dispel's email system was becoming a team bottleneck. What started as 
				simple text templates had evolved into an unmaintainable mess:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					180+ lines of switch statements for manual translations across locales
				</li>
				<li>
					Plain text emails that looked outdated and unprofessional
				</li>
				<li>
					No type safety—typos in variable names only surfaced in production
				</li>
				<li>
					Every template change required hunting through massive text blocks
				</li>
				<li>
					Engineers avoided building new emails because the system was so painful
				</li>
			</ul>
			<p class="text-sm text-zinc-300">
				As we prepared to expand internationally, it became clear we needed a 
				system that could scale with our growing user base and brand expectations—and 
				that wouldn't bottleneck on me for every email change.
			</p>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Solution</h2>
			<p class="text-sm text-zinc-300">
				I architected and drove the migration to a modern email infrastructure built 
				on React Email, TypeScript, and i18next. The goal wasn't just prettier 
				emails—it was to establish patterns and components that would enable the 
				team to ship transactional emails independently, without requiring my 
				direct involvement.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-md font-semibold">
				From Manual Text to Component-Based Architecture
			</h2>
			<p class="text-sm text-zinc-300">
				The transformation was dramatic. Here's what changed:
			</p>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					Before: Manual Template Hell
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Manual text with switch statements per locale
const template = ({ locale }) => {
  switch (locale) {
    case 'en-us':
      return { text: 'Hello, {{user_name}}...' };
    case 'de':
      return { text: 'Hallo, {{user_name}}...' };
    case 'fr':
      return { text: 'Bonjour, {{user_name}}...' };
    // ... 180+ lines repeated for every template
  }
};`}</pre>
			</div>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					After: Type-Safe React Components
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Clean, composable, automatically internationalized
import { Button, Heading, Text } from '@react-email/components';
import { useTranslation } from 'react-i18next';

export function ConfirmEmail({ userName, link }: Props) {
  const { t } = useTranslation();
  
  return (
    <EmailBase>
      <Heading>{t('confirm.heading')}</Heading>
      <Text>{t('confirm.greeting', { userName })}</Text>
      <Button href={link}>{t('confirm.button')}</Button>
    </EmailBase>
  );
}`}</pre>
			</div>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Enabling Team Velocity</h2>
			
			<h3 class="text-base font-medium">Technical Foundation</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>React Email</strong> for component-based template authoring
				</li>
				<li>
					<strong>i18next integration</strong> with automatic locale detection
				</li>
				<li>
					<strong>TypeScript</strong> for type-safe props and compile-time validation
				</li>
				<li>
					<strong>Development SMTP server</strong> for local testing without sending 
					real emails
				</li>
				<li>
					<strong>Brand-specific templates</strong> with automatic fallback support
				</li>
			</ul>

			<h3 class="text-base font-medium">Team Impact</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Self-service email development:</strong> Engineers ship transactional 
					emails without needing code review from me
				</li>
				<li>
					<strong>Faster iteration:</strong> New emails go from concept to production in 
					2-3 hours instead of 2-3 days
				</li>
				<li>
					<strong>Reduced production bugs:</strong> TypeScript catches variable typos and 
					type mismatches at compile time
				</li>
				<li>
					<strong>Scalable internationalization:</strong> Adding German and French locales 
					required zero email code changes
				</li>
			</ul>

			<h3 class="text-base font-medium">Business Outcomes</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Professional brand presence:</strong> Modern HTML layouts that match 
					product quality
				</li>
				<li>
					<strong>International expansion enabled:</strong> Launched in 3 new markets 
					without email infrastructure blocking us
				</li>
				<li>
					<strong>Engineering velocity increased:</strong> Team shipped 12 new transactional 
					emails in Q4 vs 3 in Q3
				</li>
				<li>
					<strong>Reduced operational overhead:</strong> Email system no longer requires 
					dedicated maintenance
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Adoption Strategy</h2>
			<p class="text-sm text-zinc-300">
				Rather than a big-bang migration, I established a phased rollout that enabled 
				incremental adoption:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Built infrastructure alongside legacy:</strong> New system coexisted 
					with old templates during transition
				</li>
				<li>
					<strong>Started with critical emails:</strong> Migrated password resets and 
					confirmations first to prove the pattern
				</li>
				<li>
					<strong>Created documentation and examples:</strong> Engineers could reference 
					existing emails when building new ones
				</li>
				<li>
					<strong>Measured adoption through metrics:</strong> Tracked velocity improvements 
					to demonstrate value
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Impact</h2>
			<p class="text-sm text-zinc-300">
				This transformation changed how we ship email at Dispel. By establishing a 
				component-based system with clear patterns, I removed myself as a bottleneck 
				and enabled the team to ship transactional emails independently and confidently.
			</p>
			<p class="text-sm text-zinc-300">
				The best validation? Within 6 weeks, five engineers had shipped production 
				emails without needing my involvement—something that previously would have 
				required my direct work on every template. That's the kind of multiplier 
				effect technical leadership should create.
			</p>
		</section>
	</article>
</div>