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

test('publishes launch notes in newest-first order', async ({
  page,
  request,
}) => {
  const simulatorResponse = await request.get(
    '/notes/price-scoring-simulator/',
  );
  expect(simulatorResponse.ok()).toBe(true);
  await page.goto('/notes/price-scoring-simulator/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Cómo aprendí sobre licitaciones públicas construyendo un simulador',
    }),
  ).toBeVisible();
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    'content',
    'es_ES',
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'article',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /^https:\/\/israelgutierrez\.es\/_astro\//,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    'content',
    '1200',
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute('content', '750');
  await expect(
    page.locator('meta[property="article:published_time"]'),
  ).toHaveAttribute('content', /^2026-11-09/);
  const simulatorJsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      '',
  ) as {
    '@type': string;
    inLanguage: string;
    author: { name: string };
  };
  expect(simulatorJsonLd['@type']).toBe('Article');
  expect(simulatorJsonLd.inLanguage).toBe('es');
  expect(simulatorJsonLd.author.name).toBe('Israel Gutiérrez');
  await expect(
    page.getByRole('img', { name: /simulador.*fórmulas.*valoración/i }),
  ).toBeVisible();
  await expect(page.locator('.note__meta')).toContainText('4 min');
  await expect(page.locator('.prose h2')).toHaveText([
    'Entender el proceso antes de diseñar',
    'La fórmula también decide',
    'Convertir reglas en una interfaz',
    'Un prototipo para entender',
  ]);
  await expect(
    page.getByRole('link', { name: 'Abre el simulador' }),
  ).toHaveAttribute(
    'href',
    'https://israelgutierrez.es/price-scoring-simulator/',
  );
  await expect(
    page.getByRole('link', { name: 'Consulta el código del proyecto' }),
  ).toHaveAttribute(
    'href',
    'https://github.com/gootyfer/price-scoring-simulator',
  );

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
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    'content',
    'es_ES',
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'article',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /^https:\/\/israelgutierrez\.es\/_astro\//,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    'content',
    '1200',
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute('content', '750');
  await expect(
    page.locator('meta[property="article:published_time"]'),
  ).toHaveAttribute('content', /^2026-11-08/);
  const gameJsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      '',
  ) as {
    '@type': string;
    inLanguage: string;
    author: { name: string };
  };
  expect(gameJsonLd['@type']).toBe('Article');
  expect(gameJsonLd.inLanguage).toBe('es');
  expect(gameJsonLd.author.name).toBe('Israel Gutiérrez');
  await expect(
    page.getByRole('img', { name: /Una jornada decente.*game/i }),
  ).toBeVisible();
  await expect(page.locator('.note__meta')).toContainText('8 min');
  await expect(page.locator('.prose')).toContainText(
    'Esa fue la pregunta que dio origen a Una jornada decente',
  );
  await expect(page.locator('.prose')).toContainText(
    'el problema no es tener más alumnos',
  );
  await expect(page.locator('.prose h2')).toHaveText([
    'Una interacción que no necesita explicación',
    'Los alumnos no son el obstáculo',
    'La dificultad se acumula',
    'Un curso que cambia con las estaciones',
    'Primero la experiencia, después los datos',
    'Elegir qué simplificar',
  ]);
  await expect(page.locator('details.margin-note')).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Juega a Una jornada decente' }),
  ).toHaveAttribute('href', 'https://israelgutierrez.es/educacion-publica/');
  await expect(
    page.getByRole('link', { name: 'Consulta el código del proyecto' }),
  ).toHaveAttribute('href', 'https://github.com/gootyfer/educacion-publica');

  const criticalResponse = await request.get('/notes/critical-reader/');
  expect(criticalResponse.ok()).toBe(true);
  await page.goto('/notes/critical-reader/');
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    'content',
    'en_US',
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'article',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /^https:\/\/israelgutierrez\.es\/_astro\//,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    'content',
    '1200',
  );
  await expect(
    page.locator('meta[property="og:image:height"]'),
  ).toHaveAttribute('content', '750');
  await expect(
    page.locator('meta[property="article:published_time"]'),
  ).toHaveAttribute('content', /^2026-11-02/);
  const criticalJsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      '',
  ) as {
    '@type': string;
    inLanguage: string;
    author: { name: string };
  };
  expect(criticalJsonLd['@type']).toBe('Article');
  expect(criticalJsonLd.inLanguage).toBe('en');
  expect(criticalJsonLd.author.name).toBe('Israel Gutiérrez');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'A browser that makes you pause',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: /Critical Reader.*highlight/i }),
  ).toBeVisible();
  await expect(page.locator('.note__meta')).toContainText('Build note');
  await expect(page.locator('.note__meta')).toContainText('6 min');
  const marginNotes = page.locator('details.margin-note');
  await expect(marginNotes).toHaveCount(3);
  for (const marginNote of await marginNotes.all()) {
    await expect(marginNote).not.toHaveAttribute('open');
  }
  const firstSummary = marginNotes.first().locator('summary');
  await firstSummary.focus();
  await page.keyboard.press('Enter');
  await expect(marginNotes.first()).toHaveAttribute('open', '');
  await expect(marginNotes.first().locator('p')).toBeVisible();

  const response = await request.get('/rss.xml');

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('xml');

  const body = await response.text();
  expect(body).toContain('<?xml');
  expect(body).toContain('<channel>');
  const simulatorPosition = body.indexOf(
    'Cómo aprendí sobre licitaciones públicas construyendo un simulador',
  );
  const gamePosition = body.indexOf(
    '¿Cómo se convierte una reivindicación educativa en un juego?',
  );
  const criticalPosition = body.indexOf('A browser that makes you pause');
  expect(simulatorPosition).toBeGreaterThan(-1);
  expect(gamePosition).toBeGreaterThan(simulatorPosition);
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
  expect(sitemap).toContain('price-scoring-simulator');
  expect(sitemap).toContain('una-jornada-decente');
  expect(sitemap).toContain('critical-reader');
  expect(sitemap).not.toContain('example-draft');
});

test('margin notes remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/notes/critical-reader/');

  const firstNote = page.locator('details.margin-note').first();
  await firstNote.locator('summary').click();
  await expect(firstNote).toHaveAttribute('open', '');
  await expect(firstNote.locator('p')).toBeVisible();

  await context.close();
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
