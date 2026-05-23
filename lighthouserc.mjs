// lighthouserc.mjs
// Performance budgets — CI fails if scores drop below these thresholds
// The URL is injected by the GitHub Actions workflow (Vercel preview URL)
// so no `collect.startServerCommand` needed here

/** @type {import('@lhci/cli').LighthouseConfig} */
export default {
   ci: {
      assert: {
         assertions: {
            // Scores — warn below 80, error below 60
            "categories:performance": ["warn", { minScore: 0.8 }],
            "categories:accessibility": ["error", { minScore: 0.9 }], // strict — affects all users
            "categories:best-practices": ["warn", { minScore: 0.9 }],
            "categories:seo": ["warn", { minScore: 0.8 }],

            // Core Web Vitals
            "first-contentful-paint": ["warn", { maxNumericValue: 2000 }], // under 2s
            "largest-contentful-paint": ["warn", { maxNumericValue: 3000 }], // under 3s
            "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }], // strict — bad UX
            "total-blocking-time": ["warn", { maxNumericValue: 300 }], // under 300ms
         },
      },

      upload: {
         target: "temporary-public-storage", // public report URL, valid for 7 days
      },
   },
}
