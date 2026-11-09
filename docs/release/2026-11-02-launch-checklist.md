# israelgutierrez.es launch checklist — 2026-11-02

This record deliberately contains no credentials, tokens, or registrar account
details. Complete every `PENDING` field before changing DNS.

## Repository and protected history

- Repository: `gootyfer/gootyfer.github.io`
- Remote: `https://github.com/gootyfer/gootyfer.github.io.git`
- Historical default branch observed at preflight: `master`
- Protected original commit: `80a111f258d26e85ae60438fd9e2f0f81a6b643e`
- Implementation branch: `codex/personal-site-redesign`
- Local implementation head before release: `24cd1f342d8245064a2080fdb039c4cebd1b6f7e`
- Intended deployment branch: `main`
- Remote head observed at 2026-11-02 21:49 CET:
  `master` → `80a111f258d26e85ae60438fd9e2f0f81a6b643e`; no remote `main`
  branch exists
- Published commit: `PENDING`

Do not force-push over a published branch. Fetch immediately before publishing.
If the remote has advanced, integrate it through a normal merge or rebase,
review the result, and rerun the full suite.

## GitHub Pages

- Pages source: GitHub Actions
- Environment: `github-pages`
- Review artifact/workflow URL: `PENDING`
- GitHub-provided deployment URL: `PENDING`
- Custom domain in repository settings: `israelgutierrez.es` (`PENDING`)
- GitHub verified-domain status: `PENDING`
- Enforce HTTPS: `PENDING`

Before DNS changes, confirm the deployed artifact contains a root `CNAME` with
exactly `israelgutierrez.es` and verify the deployment through the environment
URL shown by the workflow.

## DNS snapshot before changes

Snapshot time (Europe/Madrid): `2026-11-02 21:49:58 CET`

| Name | Type | TTL | Value | Purpose |
| --- | --- | --- | --- | --- |
| `israelgutierrez.es` | A | 1800 | `162.255.119.12` | Namecheap parking/redirect web record; replace at cutover |
| `israelgutierrez.es` | AAAA | — | No answer | No current IPv6 web record |
| `www.israelgutierrez.es` | CNAME | 1800 | `parkingpage.namecheap.com.` | Namecheap parking web record; replace at cutover |
| `_github-pages-challenge-gootyfer.israelgutierrez.es` | TXT | — | No answer | Domain is not currently verified through this record |

Mail/service records observed and protected from the web cutover:

- MX (TTL 1800): `10 eforward1.registrar-servers.com.`,
  `10 eforward2.registrar-servers.com.`,
  `10 eforward3.registrar-servers.com.`,
  `15 eforward4.registrar-servers.com.`, and
  `20 eforward5.registrar-servers.com.`
- TXT (TTL 1800): `v=spf1 include:spf.efwd.registrar-servers.com ~all`

Store the exact previous web records here before editing so they can be
restored. Never delete MX, SPF, DKIM, DMARC, verification, or unrelated service
records during the web cutover.

## Intended DNS cutover

- Apex A records, reconfirmed against
  [GitHub's official documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
  on 2026-11-02: `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, and `185.199.111.153`.
- Optional apex AAAA records: `2606:50c0:8000::153`,
  `2606:50c0:8001::153`, `2606:50c0:8002::153`, and
  `2606:50c0:8003::153`.
- `www`: CNAME to `gootyfer.github.io`.
- TTL: keep conservative during cutover; record the selected value here:
  `PENDING`.
- Remove only web records confirmed to conflict with the targets above.

## Pre-DNS deployment checks

- [x] CI is green for formatting, Astro/TypeScript, unit/content,
      configuration, build, and the complete configured browser suite.
- [x] Homepage renders at mobile and desktop widths.
- [x] LinkedIn, GitHub, and email links are correct.
- [x] Portrait approved by Israel for public launch on 2026-11-02.
- [x] Public email address `me@israelgutierrez.es` approved by Israel on
      2026-11-02.
- [x] Living Notebook direction, uncropped portrait treatment, and semantic
      Margin notes approved by Israel on 2026-11-02.
- [x] Una jornada decente as the primary project, followed by Critical Reader
      and Price Scoring Simulator, plus the Spanish launch article, approved by
      Israel on 2026-11-08.
- [x] The deliberate typographic talk fallback is approved for launch while no
      reusable talk photograph is available; replace it only with an approved
      photograph and credit.
- [x] Selected work and talk claims have been checked one final time against
      the approved brief and their linked public sources.
- [x] Exact archived article route returns 200.
- [x] RSS, sitemap, robots, 404, favicon, social image, canonical metadata, and
      JSON-LD are correct.
- [x] Axe smoke checks pass on homepage, both launch notes, archived article,
      and 404.

## Public HTTPS verification

Record timestamps, full status/redirect chains, and DNS answers after
propagation.

| Check | Expected | Observed | Time |
| --- | --- | --- | --- |
| `https://israelgutierrez.es/` | 200, expected homepage | `PENDING` | `PENDING` |
| `https://www.israelgutierrez.es/` | Redirect to apex, no loop | `PENDING` | `PENDING` |
| `https://gootyfer.github.io/` | Settles on canonical host | `PENDING` | `PENDING` |
| Archived article over HTTPS | 200 | `PENDING` | `PENDING` |
| `/rss.xml` | 200, valid XML | `PENDING` | `PENDING` |
| `/sitemap-index.xml` | 200, HTTPS URLs | `PENDING` | `PENDING` |
| `/robots.txt` | 200, HTTPS sitemap | `PENDING` | `PENDING` |
| Unknown route | 404 with branded page | `PENDING` | `PENDING` |
| Social image and local assets | 200, no mixed content | `PENDING` | `PENDING` |

Propagation caveats: `PENDING`.

Pre-cutover observation: `https://israelgutierrez.es/` timed out after ten
seconds at 2026-11-02 21:49:58 CET while the apex resolved to Namecheap's
parking IP. This is the baseline, not a regression caused by the new site.

## Rollback

If the new site is unavailable or incorrect:

1. Stop further DNS edits and disable **Enforce HTTPS** only if certificate
   provisioning itself is blocking recovery.
2. Restore the exact previous apex and `www` web records from the snapshot
   above. Do not touch unrelated records.
3. If DNS is healthy but the artifact is faulty, revert the release commit on
   the published branch through a normal Git revert and let the Pages workflow
   redeploy; do not rewrite branch history.
4. Verify apex, `www`, and the legacy article again after propagation.
5. Record the rollback commit, DNS answers, HTTP chains, and timestamps here.

Rollback result: `NOT NEEDED / PENDING`.
