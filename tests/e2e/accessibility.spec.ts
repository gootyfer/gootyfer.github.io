import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/notes/price-scoring-simulator/',
  '/notes/una-jornada-decente/',
  '/notes/critical-reader/',
  '/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/',
  '/this-page-does-not-exist',
] as const;

for (const route of routes) {
  test(`${route} has no automated WCAG A or AA violations`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test(`${route} has one primary heading and a logical hierarchy`, async ({
    page,
  }) => {
    await page.goto(route);

    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page
      .locator('h1, h2, h3, h4, h5, h6')
      .evaluateAll((headings) =>
        headings.map((heading) => Number(heading.tagName.substring(1))),
      );
    for (let index = 1; index < levels.length; index += 1) {
      expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
    }
  });
}

test('the skip link moves keyboard focus to the main content', async ({
  page,
}) => {
  await page.goto('/');

  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.locator('#main-content')).toBeFocused();
});

test('the mobile header keeps the full identity and primary links in view', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const labels = ['Israel Gutiérrez', 'Notes', 'Work', 'Talks', 'Contact'];
  for (const label of labels) {
    const link = page.locator('header').getByRole('link', { name: label });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(320);
  }

  const documentWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(documentWidth).toBeLessThanOrEqual(320);
});

test('reduced-motion preferences disable smooth scrolling', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');

  await page.goto('/notes/critical-reader/');
  const summary = page.locator('details.margin-note summary').first();
  await summary.focus();
  const focusStyle = await summary.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(focusStyle.outlineWidth).toBeGreaterThan(0);

  const motion = await page
    .locator('details.margin-note p')
    .first()
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        animationDuration: Number.parseFloat(style.animationDuration) || 0,
        transitionDuration: Number.parseFloat(style.transitionDuration) || 0,
      };
    });
  expect(motion.animationDuration).toBeLessThanOrEqual(0.00001);
  expect(motion.transitionDuration).toBeLessThanOrEqual(0.00001);
});
