import { expect, test } from '@playwright/test';

test('publishes complete identity and sharing metadata', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://israelgutierrez.es/',
  );
  await expect(page).toHaveTitle('Israel Gutiérrez — Hands-on product leader');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /hands-on product leader.*adult learning.*practical AI/i,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'website',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /^https:\/\/israelgutierrez\.es\//,
  );
  await expect(
    page.locator('link[type="application/rss+xml"]'),
  ).toHaveAttribute('href', 'https://israelgutierrez.es/rss.xml');

  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      '',
  ) as {
    '@type': string;
    url: string;
    sameAs: string[];
    jobTitle: string;
  };
  expect(jsonLd['@type']).toBe('Person');
  expect(jsonLd.url).toBe('https://israelgutierrez.es/');
  expect(jsonLd.sameAs).toEqual([
    'https://www.linkedin.com/in/israelgutierrezrojas/',
    'https://github.com/gootyfer',
  ]);
  expect(jsonLd.jobTitle).toBe(
    'Hands-on product leader in adult learning and edtech',
  );
  expect(JSON.stringify(jsonLd)).not.toContain('mailto:');
});

test('serves crawler guidance and a useful not-found page', async ({
  page,
  request,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(
    'Sitemap: https://israelgutierrez.es/sitemap-index.xml',
  );

  const notFound = await page.goto('/this-page-does-not-exist');
  expect(notFound?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Page not found',
  );
  await expect(page.getByRole('link', { name: /home/i })).toHaveAttribute(
    'href',
    '/',
  );
});

test('renders the minimal professional site shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);
  await expect(
    page.locator('header').getByRole('link', { name: 'Israel Gutiérrez' }),
  ).toHaveAttribute('href', '/');

  const primaryLinks = page.locator('header nav a');
  await expect(primaryLinks).toHaveCount(4);
  await expect(primaryLinks).toHaveText(['Notes', 'Work', 'Talks', 'Contact']);
  expect(
    await primaryLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    ),
  ).toEqual(['/#notes', '/#work', '/#talks', '/#contact']);

  const footer = page.locator('footer#contact');
  await expect(footer).toContainText('Product Maker at Gobierto · Madrid');
  await expect(footer.locator('nav a')).toHaveText([
    'LinkedIn',
    'GitHub',
    'Email',
    'RSS',
  ]);

  await expect(
    page.getByText(/open to work|book a call|services/i),
  ).toHaveCount(0);
});

test('presents the approved professional narrative', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.locator('main').getByText('Product Maker at Gobierto · Madrid'),
  ).toBeVisible();
  await expect(
    page.getByText('Serious about learning / not solemn about it'),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Learning by making. Leading by learning.',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Portrait of Israel Gutiérrez' }),
  ).toBeVisible();
  const portraitBox = await page
    .getByRole('img', { name: 'Portrait of Israel Gutiérrez' })
    .boundingBox();
  expect(portraitBox).not.toBeNull();
  expect(
    (portraitBox?.width ?? 0) / (portraitBox?.height ?? 1),
  ).toBeGreaterThan(0.99);
  expect((portraitBox?.width ?? 0) / (portraitBox?.height ?? 1)).toBeLessThan(
    1.01,
  );

  const building = page.locator('#building');
  const projectTitles = await building.locator('h2, h3').allTextContents();
  expect(projectTitles).toEqual([
    'Una jornada decente',
    'Critical Reader',
    'Price Scoring Simulator',
  ]);
  await expect(building.locator('.project-feature')).toHaveCount(1);
  await expect(building.locator('.project-compact')).toHaveCount(2);
  await expect(
    building.getByRole('img', { name: /Una jornada decente game/i }),
  ).toBeVisible();
  await expect(
    building.getByRole('link', { name: 'Read the build note' }).first(),
  ).toHaveAttribute('href', '/notes/una-jornada-decente/');
  await expect(building.getByRole('link', { name: 'Play' })).toHaveAttribute(
    'href',
    'https://israelgutierrez.es/educacion-publica/',
  );
  await expect(
    building.getByRole('link', { name: 'Install extension' }),
  ).toHaveAttribute(
    'href',
    'https://chromewebstore.google.com/detail/feklbnkcmcampfdlicejamjjbhncjfmo',
  );
  await expect(
    building.getByRole('link', { name: 'Open simulator' }),
  ).toHaveAttribute(
    'href',
    'https://israelgutierrez.es/price-scoring-simulator/',
  );

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

  await expect(page.locator('#notes')).toContainText(
    '¿Cómo se convierte una reivindicación educativa en un juego?',
  );
  const noteCards = page.locator('#notes .note-card');
  await expect(noteCards).toHaveCount(2);
  await expect(noteCards.locator('h3')).toHaveText([
    '¿Cómo se convierte una reivindicación educativa en un juego?',
    'A browser that makes you pause',
  ]);
  await expect(page.locator('#notes')).not.toContainText(
    'No notes published yet.',
  );
  await expect(
    page.getByText('Hackea tu educación durante la universidad'),
  ).toHaveCount(0);
});

test('presents selected chapters and talks with an intentional fallback', async ({
  page,
}) => {
  await page.goto('/');

  const work = page.locator('#work');
  await expect(
    work.getByRole('heading', { level: 2, name: 'Selected chapters' }),
  ).toBeVisible();
  await expect(work.locator('.chapter-row h3')).toHaveText([
    'Gobierto',
    'Leap by Microverse',
    'Data and learning products',
    'Research and engineering',
  ]);

  const talks = page.locator('#talks');
  const feature = talks.locator('.talk-feature');
  await expect(feature).toHaveCount(1);
  await expect(feature).toHaveAttribute('data-visual', 'typographic');
  await expect(feature.getByRole('img')).toHaveCount(0);
  await expect(
    feature.getByRole('link', { name: 'Menos features, más negocio' }),
  ).toHaveAttribute(
    'href',
    'https://es.linkedin.com/posts/israelgutierrezrojas_hace-tiempo-que-no-daba-una-charla-y-me-apetece-activity-7462555072409825280-9o3k',
  );

  expect(
    await talks.locator('h3 a').evaluateAll((links) =>
      links.map((link) => ({
        text: link.textContent?.trim(),
        href: link.getAttribute('href'),
      })),
    ),
  ).toEqual([
    {
      text: 'Menos features, más negocio',
      href: 'https://es.linkedin.com/posts/israelgutierrezrojas_hace-tiempo-que-no-daba-una-charla-y-me-apetece-activity-7462555072409825280-9o3k',
    },
    {
      text: 'All you need is front',
      href: 'https://t3chfest.es/2018/programa/all-you-need-front/',
    },
    {
      text: 'Emoticrítico',
      href: 'https://t3chfest.es/2016/programa/emoticritico-midiendo-emociones-politicos/?lang=en',
    },
  ]);
});

for (const width of [320, 768, 1440]) {
  test(`keeps the Living Notebook composition intact at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );

    for (const link of await page.locator('header a').all()) {
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.x ?? -1).toBeGreaterThanOrEqual(0);
      expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
    }

    const portrait = page.getByRole('img', {
      name: 'Portrait of Israel Gutiérrez',
    });
    const portraitBox = await portrait.boundingBox();
    expect(portraitBox).not.toBeNull();
    expect(
      (portraitBox?.width ?? 0) / (portraitBox?.height ?? 1),
    ).toBeGreaterThan(0.99);
    expect((portraitBox?.width ?? 0) / (portraitBox?.height ?? 1)).toBeLessThan(
      1.01,
    );
    await expect(portrait).toHaveCSS('object-fit', 'contain');

    const projectImages = page.locator(
      '.project-feature__visual img, .project-compact__image',
    );
    for (const image of await projectImages.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((element) => {
            const img = element as HTMLImageElement;
            return img.complete && img.naturalWidth > 0;
          }),
        )
        .toBe(true);
      const ratio = await image.evaluate((element) => {
        const img = element as HTMLImageElement;
        const box = img.getBoundingClientRect();
        return {
          rendered: box.width / box.height,
          intrinsic: img.naturalWidth / img.naturalHeight,
          right: box.right,
        };
      });
      expect(Math.abs(ratio.rendered - ratio.intrinsic)).toBeLessThan(0.01);
      expect(ratio.right).toBeLessThanOrEqual(width);
    }

    for (const title of await page.locator('#notes h3, #talks h3').all()) {
      const box = await title.boundingBox();
      expect(box).not.toBeNull();
      expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
    }

    if (width === 1440) {
      for (const card of await page.locator('#notes .note-card').all()) {
        const box = await card.boundingBox();
        expect(box?.width ?? 0).toBeGreaterThan(240);
      }
    }
  });
}

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
