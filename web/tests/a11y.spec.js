import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WIDTHS = [
  { width: 402, height: 874 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1028 },
];

for (const vp of WIDTHS) {
  test(`axe WCAG 2.2 AA — ${vp.width}px`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}

test('reflow at 320px (= 1280px at 400% zoom) has no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(sw).toBeLessThanOrEqual(320);
});

test('reduced motion: ticker starts paused', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole('button', { name: 'Play scrolling text' })).toHaveAttribute('aria-pressed', 'true');
  await ctx.close();
});
