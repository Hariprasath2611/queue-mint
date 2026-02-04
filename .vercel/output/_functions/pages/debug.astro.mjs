/* empty css                                  */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, h as createAstro } from '../chunks/astro/server_bfTbSI7c.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Debug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Debug;
  return renderTemplate`${maybeRenderHead()}<h1>Debug Page</h1> <p>If you can see this, the basic Astro SSR is working on Vercel.</p>`;
}, "C:/Users/D Hariprasath/Desktop/work/smart queae/queue-mint/src/pages/debug.astro", void 0);

const $$file = "C:/Users/D Hariprasath/Desktop/work/smart queae/queue-mint/src/pages/debug.astro";
const $$url = "/debug";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Debug,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
