import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, test } from 'vitest';
import { parse } from 'yaml';

const root = resolve(import.meta.dirname, '../..');

interface WorkflowStep {
  uses?: string;
  run?: string;
  with?: Record<string, string>;
}

interface WorkflowJob {
  steps?: WorkflowStep[];
}

interface Workflow {
  on: {
    push?: { branches?: string[] };
    pull_request?: unknown;
  };
  permissions: Record<string, string>;
  jobs: Record<string, WorkflowJob>;
}

describe('GitHub Pages deployment', () => {
  test('checks pull requests and deploys the built site from main', () => {
    const source = readFileSync(
      resolve(root, '.github/workflows/deploy.yml'),
      'utf8',
    );
    const workflow = parse(source) as Workflow;

    expect(workflow.on.push?.branches).toContain('main');
    expect(workflow.on.pull_request).toBeDefined();
    expect(workflow.permissions).toMatchObject({
      contents: 'read',
      pages: 'write',
      'id-token': 'write',
    });

    const steps = Object.values(workflow.jobs).flatMap(
      ({ steps = [] }) => steps,
    );
    const actions = steps.flatMap(({ uses }) => (uses ? [uses] : []));
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^actions\/configure-pages@v\d+$/),
        expect.stringMatching(/^actions\/upload-pages-artifact@v\d+$/),
        expect.stringMatching(/^actions\/deploy-pages@v\d+$/),
      ]),
    );

    const commands = steps.flatMap(({ run }) => (run ? [run] : [])).join('\n');
    for (const command of [
      'npm ci',
      'playwright install --with-deps chromium firefox webkit',
      'npm run format:check',
      'npm run check',
      'npm run test:unit',
      'npm run test:config',
      'npm run build',
      'npm run test:e2e',
    ]) {
      expect(commands).toContain(command);
    }

    const uploadStep = steps.find(({ uses }) =>
      uses?.startsWith('actions/upload-pages-artifact@'),
    );
    expect(uploadStep?.with?.path).toBe('dist/');
  });

  test.each(['CNAME', 'public/CNAME'])(
    '%s contains only the canonical domain',
    (filename) => {
      expect(readFileSync(resolve(root, filename), 'utf8')).toBe(
        'israelgutierrez.es\n',
      );
    },
  );
});
