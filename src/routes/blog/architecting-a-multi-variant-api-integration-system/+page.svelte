<div class="max-w-[500px] mx-auto pt-44 pb-16">
	<article class="space-y-8">
		<h1 class="text-2xl font-bold">
			Architecting a Multi-Variant API Integration System
		</h1>
		
		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Challenge</h2>
			<p class="text-sm text-zinc-300">
				Dispel needed to integrate with a third-party platform that had multiple API 
				versions. The initial approach—building separate implementations for each 
				variant—was creating unsustainable technical debt:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>Duplicate authentication logic across Guardian and Vantage APIs</li>
				<li>Separate job implementations for each API variant</li>
				<li>Copy-pasted error handling scattered across files</li>
				<li>Inconsistent database patterns—each integration did things differently</li>
				<li>Adding new API variants required 2-3 days of careful duplication</li>
				<li>Bug fixes had to be applied to multiple codebases</li>
			</ul>
			<p class="text-sm text-zinc-300">
				The team needed a system where adding new API variants was predictable, fast, 
				and didn't require deep knowledge of our existing integrations.
			</p>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Solution</h2>
			<p class="text-sm text-zinc-300">
				I architected a unified integration system using base classes, factory patterns, 
				and shared abstractions. The goal wasn't just reducing duplication—it was 
				establishing a framework where any engineer could add new API variants confidently, 
				following clear patterns rather than reverse-engineering existing code.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-md font-semibold">
				From Duplicate Implementations to Shared Abstractions
			</h2>
			<p class="text-sm text-zinc-300">
				The transformation was dramatic. Here's what changed:
			</p>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					Before: Copy-Paste for Every Variant
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Completely separate implementations
class GuardianApi {
  private connection = null;
  private proxyUri = undefined;
  
  async connect(apiUrl, apiKeyName, apiKeyToken) {
    // Guardian-specific auth
    const response = await fetch(\`\${apiUrl}/v1/auth\`, {
      method: 'POST',
      body: JSON.stringify({ key_name: apiKeyName })
    });
    // Guardian-specific response handling
  }
}

class VantageApi {
  private connection = null;
  private proxyUri = undefined; // Duplicate!
  
  async connect(apiUrl, apiKeyName, apiKeyToken) {
    // Vantage-specific auth (copy-pasted with tweaks)
    const response = await fetch(\`\${apiUrl}/v2/auth\`, {
      method: 'POST',
      body: JSON.stringify({ key_name: apiKeyName })
    });
    // Vantage-specific response handling
  }
}
// ... 500+ more lines duplicated per API`}</pre>
			</div>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					After: Base Class + Specific Implementations
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Base class handles all shared logic
export abstract class BaseApi {
  protected connection: Connection | null = null;
  protected proxyUri: URL | undefined;

  protected getProxyAgent() {
    // Shared proxy logic
  }

  abstract connect(
    apiUrl: string, 
    apiKeyName: string, 
    apiKeyToken: string
  ): Promise<this>;
}

// API-specific classes only implement differences
export class GuardianApi extends BaseApi {
  async connect(apiUrl, apiKeyName, apiKeyToken) {
    const response = await fetch(\`\${apiUrl}/v1/auth\`, {
      dispatcher: this.getProxyAgent() // Inherited
    });
    this.connection = await response.json();
    return this;
  }
}

export class VantageApi extends BaseApi {
  async connect(apiUrl, apiKeyName, apiKeyToken) {
    const response = await fetch(\`\${apiUrl}/v2/auth\`, {
      dispatcher: this.getProxyAgent() // Same proxy logic
    });
    this.connection = { token: response.headers.get('Authorization') };
    return this;
  }
}`}</pre>
			</div>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Factory Pattern for Job Creation</h2>
			<p class="text-sm text-zinc-300">
				Rather than duplicating job logic, I established factory functions that generate 
				jobs with consistent error handling and monitoring:
			</p>
			
			<div class="space-y-2">
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Factory creates jobs for any API type
function createInitializeJob(
  jobName: string,
  apiType: ApiType,
  getCurrentState: StateGetter
) {
  return addJobType(jobName, async ({ clientId }) => {
    try {
      await updateStatus(clientId, 'INITIALIZING');
      await updateIntegration(clientId, {
        state: await getCurrentState(clientId)
      });
      await updateStatus(clientId, 'READY');
    } catch (error) {
      Sentry.captureException(error, {
        tags: { api: apiType }
      });
      await updateStatus(clientId, 'FAILED');
    }
  });
}

// Create jobs for both APIs with one function
export const InitializeGuardianJob = createInitializeJob(
  'InitializeGuardian',
  'guardian',
  getGuardianState
);

export const InitializeVantageJob = createInitializeJob(
  'InitializeVantage',
  'vantage',
  getVantageState
);`}</pre>
			</div>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Establishing Integration Patterns</h2>
			
			<h3 class="text-base font-medium">60% Code Reduction</h3>
			<p class="text-sm text-zinc-300">
				By extracting shared logic into base classes and factory functions, I reduced 
				the integration codebase from ~1,500 lines per API to ~300 lines per API—with 
				most of those 300 lines being API-specific business logic, not boilerplate.
			</p>

			<h3 class="text-base font-medium">Team Impact</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Democratized API integrations:</strong> Any engineer can add new variants 
					following established patterns
				</li>
				<li>
					<strong>4-hour integration timeline:</strong> New API variants ship in 4 hours 
					instead of 2-3 days
				</li>
				<li>
					<strong>Consistent error handling:</strong> All integrations use the same 
					monitoring and logging patterns
				</li>
				<li>
					<strong>Single source of truth:</strong> Bug fixes in BaseApi propagate to all 
					integrations automatically
				</li>
			</ul>

			<h3 class="text-base font-medium">Business Outcomes</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Faster partnership velocity:</strong> New integrations no longer block 
					business development
				</li>
				<li>
					<strong>Reduced maintenance burden:</strong> Shared code means fewer places for 
					bugs to hide
				</li>
				<li>
					<strong>Better observability:</strong> Consistent monitoring across all integrations
				</li>
				<li>
					<strong>Enabled rapid scaling:</strong> Added 3 new API variants in Q4 without 
					expanding team size
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Unified Route Architecture</h2>
			<p class="text-sm text-zinc-300">
				I established a single endpoint structure that handles all API variants through 
				parameters, eliminating route duplication:
			</p>
			
			<div class="space-y-2">
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Single route for all API types
router.post(
  '/:clientId/:apiType/initialize',
  param('apiType').isIn(['guardian', 'vantage']),
  async (req, res) => {
    const { apiType } = req.params;
    
    const integration = await insertIntegration({
      client_id: req.params.clientId,
      status: 'UNINITIALIZED',
    });

    // Dispatch the right job based on API type
    const job = apiType === 'guardian' 
      ? InitializeGuardianJob 
      : InitializeVantageJob;
    
    await job.dispatch({ clientId: integration.client_id });
    res.json(integration);
  }
);`}</pre>
			</div>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Technical Architecture</h2>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Abstract base class</strong> for shared connection and proxy logic
				</li>
				<li>
					<strong>Factory functions</strong> for consistent job creation across APIs
				</li>
				<li>
					<strong>TypeScript inheritance</strong> with abstract methods for type safety
				</li>
				<li>
					<strong>Unified error handling</strong> with Sentry integration
				</li>
				<li>
					<strong>Parameterized routes</strong> that handle multiple API types
				</li>
				<li>
					<strong>Shared utility functions</strong> for mapping and validation
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Impact</h2>
			<p class="text-sm text-zinc-300">
				This architectural transformation changed how we approach third-party integrations 
				at Dispel. By establishing clear patterns and shared abstractions, I enabled the 
				team to add new integrations confidently and quickly, without requiring deep 
				expertise in our existing codebase.
			</p>
			<p class="text-sm text-zinc-300">
				The best validation? An engineer who had been with us for 3 weeks added a new 
				API variant in 4 hours—following the patterns I established without needing my 
				direct involvement. That's the multiplier effect technical leadership should create: 
				systems that scale beyond you.
			</p>
		</section>
	</article>
</div>