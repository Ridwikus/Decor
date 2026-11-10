import { test, expect } from '@playwright/test';
import { VIEWPORTS } from './viewports.js';

for (const vp of VIEWPORTS) {
  test.describe(`viewport ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('no horizontal overflow, CTA above the fold, no clipped text', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);

      const cta = page.getByRole('link', { name: 'Book a Free Consultation' }).first();
      const box = await cta.boundingBox();
      expect(box).not.toBeNull();
      expect(box.y + box.height).toBeLessThanOrEqual(vp.height);

      const clipped = await page.evaluate(() =>
        Array.from(document.querySelectorAll('h1,h2,h3,p,a,blockquote,address,span'))
          .filter((el) => {
            if (el.closest('[data-ticker], .dd-cta-arrow, .sr-only, [aria-hidden="true"]')) return false;
            const cs = getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') return false;
            return el.scrollWidth > el.clientWidth + 1 && cs.overflow !== 'visible';
          })
          .map((el) => el.textContent.trim().slice(0, 40)),
      );
      expect(clipped).toEqual([]);

      await page.screenshot({ path: `../docs/screenshots/web-${vp.name}.jpg`, type: 'jpeg', quality: 82, fullPage: true });
    });
  });
}

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 402, height: 874 } });
  test('opens, traps focus, closes with Esc', async ({ page }) => {
    await page.goto('/');
    const btn = page.getByRole('button', { name: 'Open menu' });
    await btn.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
    const inside = await page.evaluate(() => !!document.activeElement.closest('[data-header]'));
    expect(inside).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
    await expect(page.locator('#dd-main-nav')).toBeHidden();
  });
});
