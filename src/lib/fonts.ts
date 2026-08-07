/**
 * Typography system — self-hosted via @fontsource so builds never depend on
 * fetching fonts.googleapis.com at build time.
 * - Fraunces (display): an editorial serif used sparingly for landing
 *   headlines and dashboard section titles — gives AuraHR a distinct,
 *   premium identity instead of an all-sans generic SaaS look.
 * - Inter (sans): the workhorse UI/body typeface — high legibility at
 *   small sizes, ideal for dense enterprise data.
 * - JetBrains Mono: tabular data, IDs, timestamps, and code-like values.
 */
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
