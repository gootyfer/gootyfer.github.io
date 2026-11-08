import { expect, test } from '@playwright/test';

const draftTitle = 'Internal draft — do not publish';

test('keeps drafts out of every public surface', async ({ page, request }) => {
  await page.goto('/');

  await expect(page.locator('#notes')).toContainText(
    '¿Cómo se convierte una reivindicación educativa en un juego?',
  );
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

test('publishes both launch notes in newest-first order', async ({
  page,
  request,
}) => {
  const gameResponse = await request.get('/notes/una-jornada-decente/');
  expect(gameResponse.ok()).toBe(true);
  await page.goto('/notes/una-jornada-decente/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '¿Cómo se convierte una reivindicación educativa en un juego?',
    }),
  ).toBeVisible();

  const criticalResponse = await request.get('/notes/critical-reader/');
  expect(criticalResponse.ok()).toBe(true);

  const response = await request.get('/rss.xml');

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('xml');

  const body = await response.text();
  expect(body).toContain('<?xml');
  expect(body).toContain('<channel>');
  const gamePosition = body.indexOf(
    '¿Cómo se convierte una reivindicación educativa en un juego?',
  );
  const criticalPosition = body.indexOf('A browser that makes you pause');
  expect(gamePosition).toBeGreaterThan(-1);
  expect(criticalPosition).toBeGreaterThan(gamePosition);
  expect(body).not.toContain(draftTitle);

  const sitemapIndex = await request.get('/sitemap-index.xml');
  const sitemapUrls = [
    ...(await sitemapIndex.text()).matchAll(/<loc>(.*?)<\/loc>/g),
  ].map(([, url]) => url);
  const sitemapResponses = await Promise.all(
    sitemapUrls.map((url) => request.get(new URL(url).pathname)),
  );
  const sitemap = (
    await Promise.all(sitemapResponses.map((entry) => entry.text()))
  ).join('\n');
  expect(sitemap).toContain('una-jornada-decente');
  expect(sitemap).toContain('critical-reader');
  expect(sitemap).not.toContain('example-draft');
});

test('adds article metadata to the preserved Spanish article', async ({
  page,
}) => {
  await page.goto(
    '/blog/2014/11/03/hackea-tu-educacion-durante-la-universidad/',
  );

  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'article',
  );
  await expect(
    page.locator('meta[property="article:published_time"]'),
  ).toHaveAttribute('content', /^2014-11-03/);

  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      '',
  ) as { '@type': string; datePublished: string; author: { name: string } };
  expect(jsonLd['@type']).toBe('Article');
  expect(jsonLd.datePublished).toMatch(/^2014-11-03/);
  expect(jsonLd.author.name).toBe('Israel Gutiérrez');
});
