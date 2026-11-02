import { expect, test } from '@playwright/test';

const articleTitle = 'Hackea tu educación durante la universidad';
const articlePath =
  '/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/';

test('preserves the historical article at its exact URL', async ({
  page,
  request,
}) => {
  const response = await request.get(articlePath);
  expect(response.status()).toBe(200);

  await page.goto(articlePath);
  await expect(
    page.getByRole('heading', { level: 1, name: articleTitle }),
  ).toBeVisible();
  await expect(page.getByText('Archived from 2014')).toBeVisible();
});

for (const path of ['/blog/', '/blog/archives/']) {
  test(`${path} remains a useful compatibility page`, async ({ page }) => {
    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Writing has moved' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Current notes' }),
    ).toHaveAttribute('href', '/#notes');
    await expect(
      page.getByRole('link', { name: articleTitle }),
    ).toHaveAttribute('href', articlePath);
  });
}

test('does not present the archived article as a current note', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByText(articleTitle)).toHaveCount(0);
  await expect(page.locator(`a[href="${articlePath}"]`)).toHaveCount(0);
});
