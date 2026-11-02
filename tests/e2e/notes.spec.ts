import { expect, test } from '@playwright/test';

const draftTitle = 'Internal draft — do not publish';

test('keeps drafts out of every public surface', async ({ page, request }) => {
  await page.goto('/');

  await expect(page.locator('#notes')).toContainText('No notes published yet.');
  await expect(page.getByText(draftTitle)).toHaveCount(0);
  await expect(page.locator('a[href="/notes/example-draft/"]')).toHaveCount(0);

  const draftResponse = await request.get('/notes/example-draft/');
  expect(draftResponse.status()).toBe(404);

  const sitemapIndex = await request.get('/sitemap-index.xml');
  expect(sitemapIndex.ok()).toBe(true);
  const sitemapIndexBody = await sitemapIndex.text();
  const sitemapUrls = [...sitemapIndexBody.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, url]) => url,
  );
  const sitemapBodies = await Promise.all(
    sitemapUrls.map(async (url) => {
      const localPath = new URL(url).pathname;
      return (await request.get(localPath)).text();
    }),
  );
  expect(sitemapBodies.join('\n')).not.toContain('example-draft');
  expect(sitemapBodies.join('\n')).not.toContain(draftTitle);
});

test('serves a valid empty RSS feed', async ({ request }) => {
  const response = await request.get('/rss.xml');

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('xml');

  const body = await response.text();
  expect(body).toContain('<?xml');
  expect(body).toContain('<channel>');
  expect(body).not.toContain('<item>');
  expect(body).not.toContain(draftTitle);
});
