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

test('presents the approved professional narrative', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByText('Product Maker at Gobierto · Madrid'),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'I lead product and engineering teams building useful technology.',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Portrait of Israel Gutiérrez' }),
  ).toBeVisible();

  const work = page.locator('#work');
  for (const title of [
    'Gobierto',
    'Leap by Microverse',
    'Data and learning products',
    'Research and engineering',
  ]) {
    await expect(work.getByRole('heading', { name: title })).toBeVisible();
  }

  const talks = page.locator('#talks');
  await expect(
    talks.getByRole('link', { name: 'Menos features, más negocio' }),
  ).toBeVisible();
  await expect(
    talks.getByText('LechazoConf · Valladolid · 2026'),
  ).toBeVisible();
  await expect(
    talks.getByRole('link', { name: 'All you need is front' }),
  ).toBeVisible();
  await expect(talks.getByText('T3chFest · Madrid · 2018')).toBeVisible();
  await expect(talks.getByRole('link', { name: 'Emoticrítico' })).toBeVisible();
  await expect(talks.getByText('T3chFest · Madrid · 2016')).toBeVisible();

  await expect(page.locator('#notes')).toContainText('No notes published yet.');
  await expect(
    page.getByText('Hackea tu educación durante la universidad'),
  ).toHaveCount(0);
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
