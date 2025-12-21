<div class="max-w-[500px] mx-auto pt-44 pb-16">
	<article class="space-y-8">
		<h1 class="text-2xl font-bold">
			Replacing Manual Form State with Type-Safe Abstractions
		</h1>
		
		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Challenge</h2>
			<p class="text-sm text-zinc-300">
				Dispel's legacy forms were blocking team velocity. What started as simple 
				forms had evolved into unwieldy 800+ line components that engineers actively avoided:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>Manual state management with useReducer for every field change</li>
				<li>PropTypes instead of TypeScript—runtime errors everywhere</li>
				<li>Validation logic scattered across components</li>
				<li>Repetitive dispatch patterns for every form interaction</li>
				<li>Engineers copying existing forms and hoping they didn't break something</li>
				<li>Every new form required 2-3 days of careful development</li>
			</ul>
			<p class="text-sm text-zinc-300">
				Form development had become a specialized skill that bottlenecked on senior 
				engineers. We needed a system where any engineer could build forms confidently 
				and quickly.
			</p>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">The Solution</h2>
			<p class="text-sm text-zinc-300">
				I established Dispel's form architecture using React Hook Form, Zod, and TypeScript, 
				creating a library of 20+ specialized components with consistent patterns. The goal 
				wasn't just cleaner code—it was to democratize form development so any engineer 
				could ship forms without deep expertise in our legacy patterns.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-md font-semibold">
				From Manual State Management to Declarative Forms
			</h2>
			<p class="text-sm text-zinc-300">
				The transformation was dramatic. Here's what changed:
			</p>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					Before: 800+ Lines of Manual State
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Manual state management for everything
const [data, dispatch] = useReducer((state, action) => {
  const newData = { ...state };
  for (const [key, value] of Object.entries(action)) {
    newData[key] = value;
  }
  return newData;
}, { name: '', url: '', error: false });

// Manual validation for every field
const handleURLChange = (value) => {
  const validationResult = validateURL(value, t);
  if (!validationResult.isValid) {
    dispatch({ error: true, url: value });
  } else {
    dispatch({ error: false, url: value });
  }
};

// Manual rendering with PropTypes
<InputText
  value={data.name}
  onChange={(value) => dispatch({ name: value })}
  disabled={!isAdmin}
/>
// ... repeat 800+ more lines`}</pre>
			</div>
			
			<div class="space-y-2">
				<h3 class="text-base font-medium">
					After: Declarative, Type-Safe Components
				</h3>
				<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed"
>{`// Automatic validation with Zod + TypeScript
const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema)
});

// Clean, composable form
<Form form={form} onSubmit={handleSubmit}>
  <FormInput name="name" label="Item Name" indicateRequired />
  <FormInput name="url" label="URL" indicateRequired />
  <FormButtons>
    <FormSubmit value="Create Item" />
    <FormReset />
  </FormButtons>
</Form>`}</pre>
			</div>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Building a Component Library</h2>
			
			<h3 class="text-base font-medium">20+ Specialized Components</h3>
			<p class="text-sm text-zinc-300">
				I established a complete form component library that handles every pattern 
				the team needed:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li><strong>Basic inputs:</strong> FormInput, FormTextarea, FormNumber, FormPassword</li>
				<li><strong>Selection:</strong> FormSelect, FormCombobox, FormCheckbox, FormRadioGroup</li>
				<li><strong>Complex patterns:</strong> FormMoney, FormSubnets, FormSwitches</li>
				<li><strong>Date/time:</strong> FormDate, FormDateTime</li>
				<li><strong>Smart features:</strong> AutoSaveForm with debounced submissions</li>
			</ul>

			<h3 class="text-base font-medium">Team Impact</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Democratized form development:</strong> Junior engineers shipping complex 
					forms on their first week
				</li>
				<li>
					<strong>10x velocity improvement:</strong> Forms that took 2-3 days now ship in 
					2-3 hours
				</li>
				<li>
					<strong>Eliminated bottlenecks:</strong> Forms no longer require senior engineer 
					involvement
				</li>
				<li>
					<strong>Consistent UX everywhere:</strong> Error messages, loading states, and 
					validation patterns unified
				</li>
			</ul>

			<h3 class="text-base font-medium">Business Outcomes</h3>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Reduced production bugs:</strong> Runtime validation catches errors before 
					they reach users
				</li>
				<li>
					<strong>Faster feature delivery:</strong> Team shipped 18 new forms in Q4 vs 6 in Q3
				</li>
				<li>
					<strong>Improved maintainability:</strong> Updates to form behavior propagate 
					automatically to all forms
				</li>
				<li>
					<strong>Better user experience:</strong> Consistent validation and error handling 
					across the platform
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Technical Architecture</h2>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>React Hook Form</strong> for automatic state management and validation
				</li>
				<li>
					<strong>Zod</strong> for runtime validation with automatic TypeScript type inference
				</li>
				<li>
					<strong>TypeScript generics</strong> for flexible, type-safe component APIs
				</li>
				<li>
					<strong>Composable architecture</strong> with consistent props across all components
				</li>
				<li>
					<strong>i18n integration</strong> for automatic error message translation
				</li>
				<li>
					<strong>Design system integration</strong> for consistent styling
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Adoption & Rollout</h2>
			<p class="text-sm text-zinc-300">
				Rather than mandating immediate adoption, I focused on making the new system 
				so compelling that engineers would choose it:
			</p>
			<ul class="text-sm text-zinc-300 list-disc pl-6">
				<li>
					<strong>Started with high-pain forms:</strong> Migrated the most complex legacy 
					forms to prove the pattern
				</li>
				<li>
					<strong>Created comprehensive documentation:</strong> Engineers could reference 
					examples for every component
				</li>
				<li>
					<strong>Made forms a teaching tool:</strong> Used code reviews to demonstrate 
					patterns, not enforce rules
				</li>
				<li>
					<strong>Tracked adoption metrics:</strong> Measured velocity improvements to 
					demonstrate value to leadership
				</li>
			</ul>
		</section>

		<section class="space-y-2">
			<h2 class="text-md font-semibold">Impact</h2>
			<p class="text-sm text-zinc-300">
				This transformation fundamentally changed how we build forms at Dispel. By 
				establishing clear patterns and comprehensive components, I removed form 
				development as a specialized skill and made it accessible to the entire team.
			</p>
			<p class="text-sm text-zinc-300">
				The best validation? A junior engineer shipped a complex multi-step form with 
				conditional validation on their third day—something that previously would have 
				required a senior engineer and multiple days of work. The abstractions I 
				established scaled beyond me, which is exactly what technical leadership should do.
			</p>
		</section>
	</article>
</div>