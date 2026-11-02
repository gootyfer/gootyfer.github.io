import { expect, test } from '@playwright/test';

test('renders the minimal professional site shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);
  await expect(
    page.locator('header').getByRole('link', { name: 'Israel Gutiérrez' }),
  ).toHaveAttribute('href', '/');

  const contactLinks = page.locator('header nav a');
  await expect(contactLinks).toHaveCount(3);
  await expect(contactLinks).toHaveText(['LinkedIn', 'GitHub', 'Email']);
});

test('wraps without horizontal overflow at 320 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));

  expect(dimensions.documentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth,
  );
});

test('shows a visible keyboard focus indicator', async ({ page }) => {
  await page.goto('/');

  const homeLink = page
    .locator('header')
    .getByRole('link', { name: 'Israel Gutiérrez' });
  await homeLink.focus();

  const focusStyle = await homeLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });

  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(Number.parseFloat(focusStyle.outlineWidth)).toBeGreaterThan(0);
});
