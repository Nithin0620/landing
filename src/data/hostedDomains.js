export const hostedDomains = [
  {
    id: 'personal',
    title: 'Portfolio',
    category: 'Profile & Portfolio',
    subdomain: 'nithin.ssh.net.in',
    url: 'https://nithin.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Primary Node',
    accent: '#6FFF00',
    repo: null,
    description:
      'Personal portfolio, engineering background, career logs, and featured technical writings.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare', 'Telegram API'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'visitor',
              label: 'Visitor',
              tech: 'Browser',
              kind: 'client',
              detail:
                'A lean Vite bundle and deferred heavy visuals keep first paint under a second.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'edge',
              label: 'Cloudflare Edge',
              tech: 'Cloudflare',
              kind: 'edge',
              detail:
                'Every subdomain terminates at the edge, so TLS, caching, and routing stay consistent.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'spa',
              label: 'React SPA',
              tech: 'React',
              kind: 'client',
              detail:
                'Route-level code splitting keeps the app fast even with video backgrounds and telemetry.',
            },
            {
              id: 'beacon',
              label: 'Status Beacon',
              tech: 'Telegram API',
              kind: 'service',
              detail:
                'Arrival beacons are fire-and-forget so the UI never blocks on network telemetry.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'telegram',
              label: 'Telegram Bot',
              tech: 'Telegram API',
              kind: 'external',
              detail:
                'A lightweight bot relays live status and visits to a private channel without polling.',
            },
          ],
        },
      ],
      edges: [
        { from: 'visitor', to: 'edge' },
        { from: 'edge', to: 'spa' },
        { from: 'spa', to: 'beacon' },
        { from: 'beacon', to: 'telegram' },
      ],
    },
  },
  {
    id: 'bloggr',
    title: 'Bloggr',
    category: 'Publishing & Content Platform',
    subdomain: 'bloggr.ssh.net.in',
    url: 'https://bloggr.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Web Platform',
    accent: '#22d3ee',
    repo: 'https://github.com/Nithin0620/Bloggr',
    description:
      'Modern developer publishing platform with markdown rendering, edge distribution, rich reading experience, and custom domain routing.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Cloudflare', 'S3'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'reader',
              label: 'Reader',
              tech: 'React',
              kind: 'client',
              detail:
                'Streaming markdown rendering keeps long articles interactive without blocking the main thread.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'cdn',
              label: 'Edge CDN',
              tech: 'Cloudflare',
              kind: 'edge',
              detail:
                'Published posts are cached at the edge so readers get sub-100ms responses worldwide.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'api',
              label: 'Node API',
              tech: 'Node.js',
              kind: 'service',
              detail:
                'A single API handles auth, drafts, and publishing with idempotent write paths.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'db',
              label: 'PostgreSQL',
              tech: 'PostgreSQL',
              kind: 'data',
              detail:
                'Full-text search indexes power fast post discovery without a separate search cluster.',
            },
            {
              id: 'media',
              label: 'Object Storage',
              tech: 'S3',
              kind: 'data',
              detail:
                'Images are stored off-box and served through signed, cache-friendly URLs.',
            },
          ],
        },
      ],
      edges: [
        { from: 'reader', to: 'cdn' },
        { from: 'cdn', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'media' },
      ],
    },
  },
  {
    id: 'infra-xray',
    title: 'Infra X-Ray',
    category: 'Civic Tech & Public Accountability',
    subdomain: 'infra-xray.ssh.net.in',
    url: 'https://infra-xray.ssh.net.in',
    status: 'Active',
    statusColor: 'bg-emerald-400',
    badge: 'Civic Platform',
    accent: '#f59e0b',
    repo: 'https://github.com/Nithin0620/INFRA-XRAY',
    description:
      'Public infrastructure review, government project auditing, and anti-corruption transparency platform.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Mapbox'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'portal',
              label: 'Citizen Portal',
              tech: 'React',
              kind: 'client',
              detail:
                'A map-first interface lets citizens audit projects without needing GIS knowledge.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'api',
              label: 'FastAPI',
              tech: 'FastAPI',
              kind: 'service',
              detail:
                'Async endpoints aggregate fragmented public records into a single auditable schema.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'db',
              label: 'PostgreSQL',
              tech: 'PostgreSQL',
              kind: 'data',
              detail:
                'Geo-indexed tables make spatial queries over thousands of projects fast.',
            },
            {
              id: 'cache',
              label: 'Redis Cache',
              tech: 'Redis',
              kind: 'data',
              detail:
                'Hot project summaries are cached to keep dashboards responsive under load.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'geo',
              label: 'Mapbox',
              tech: 'Mapbox',
              kind: 'external',
              detail:
                'Map tiles are proxied through the API so keys never reach the browser.',
            },
          ],
        },
      ],
      edges: [
        { from: 'portal', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'cache' },
        { from: 'api', to: 'geo' },
      ],
    },
  },
  {
    id: 'satellite-super-resolution',
    title: 'Satellite Super-Resolution',
    category: 'Deep Learning & Earth Observation',
    subdomain: 'windows.ssh.net.in',
    url: 'https://windows.ssh.net.in/',
    status: 'Live Demo',
    statusColor: 'bg-emerald-400',
    badge: 'Interactive AI',
    accent: '#b724ff',
    repo: null,
    description:
      'AI-powered satellite image super-resolution reconstructing 10–20 m imagery to <4 m spatial resolution for fine-scale Earth observation and localized monitoring.',
    stack: ['React', 'FastAPI', 'PyTorch', 'CUDA', 'S3'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'upload',
              label: 'Upload UI',
              tech: 'React',
              kind: 'client',
              detail:
                'Tile previews render client-side so users can crop regions before spending GPU time.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'gateway',
              label: 'FastAPI Gateway',
              tech: 'FastAPI',
              kind: 'service',
              detail:
                'Uploads are validated and chunked so multi-gigabyte scenes never hit memory limits.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'queue',
              label: 'Job Queue',
              tech: 'Redis',
              kind: 'service',
              detail:
                'GPU jobs are queued with backpressure so inference workers are never oversubscribed.',
            },
            {
              id: 'worker',
              label: 'Inference Worker',
              tech: 'PyTorch',
              kind: 'ai',
              detail:
                'A tiled super-resolution model runs on CUDA with overlap-blending to remove seams.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'store',
              label: 'Tile Storage',
              tech: 'S3',
              kind: 'data',
              detail:
                'Output tiles are stored and served as a zoomable pyramid for fast map rendering.',
            },
          ],
        },
      ],
      edges: [
        { from: 'upload', to: 'gateway' },
        { from: 'gateway', to: 'queue' },
        { from: 'queue', to: 'worker' },
        { from: 'worker', to: 'store' },
        { from: 'worker', to: 'gateway' },
      ],
    },
  },
  {
    id: 'studynotion',
    title: 'StudyNotion',
    category: 'EdTech & E-Learning Platform',
    subdomain: 'studynotion.ssh.net.in',
    url: 'https://studynotion.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'EdTech Platform',
    accent: '#38bdf8',
    repo: null,
    description:
      'Comprehensive EdTech platform featuring interactive course management, student & instructor dashboards, video streaming, and secure payments.',
    stack: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Cloudinary'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'users',
              label: 'Student / Instructor',
              tech: 'React',
              kind: 'client',
              detail:
                'Role-aware dashboards share one component system so students and instructors stay in sync.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'api',
              label: 'Node API',
              tech: 'Node.js',
              kind: 'service',
              detail:
                'Course enrollment and progress updates are transactional to prevent double purchases.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'db',
              label: 'MongoDB',
              tech: 'MongoDB',
              kind: 'data',
              detail:
                'Flexible course documents support varied lesson structures without migrations.',
            },
            {
              id: 'media',
              label: 'Cloudinary',
              tech: 'Cloudinary',
              kind: 'data',
              detail:
                'Video delivery is offloaded and adaptive so playback survives slow connections.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'payments',
              label: 'Razorpay',
              tech: 'Razorpay',
              kind: 'external',
              detail:
                'Webhook-driven payment verification keeps enrollment state authoritative and fraud-safe.',
            },
          ],
        },
      ],
      edges: [
        { from: 'users', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'media' },
        { from: 'api', to: 'payments' },
      ],
    },
  },
  {
    id: 'workflow',
    title: 'Workflow',
    category: 'Project Management',
    subdomain: 'workflow.ssh.net.in',
    url: 'https://workflow.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Project Mgmt',
    accent: '#6FFF00',
    repo: null,
    description:
      'Real-time engineering & project management platform for speed, clarity, and collaboration — Linear-speed UX, Jira issue tracking, multi-tenant workspaces, Kanban boards, RBAC, and analytics.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets', 'Redis'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'ui',
              label: 'Workspace UI',
              tech: 'React',
              kind: 'client',
              detail:
                'Optimistic updates make board moves feel instant while the server confirms in the background.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'realtime',
              label: 'Realtime Gateway',
              tech: 'WebSockets',
              kind: 'edge',
              detail:
                'Presence and board deltas are broadcast over a shared socket to avoid polling storms.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'api',
              label: 'Node API',
              tech: 'Node.js',
              kind: 'service',
              detail:
                'Multi-tenant RBAC is enforced at the query layer so workspaces can never leak data.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'db',
              label: 'PostgreSQL',
              tech: 'PostgreSQL',
              kind: 'data',
              detail:
                'Issue ordering uses fractional indexes so drag-and-drop reorders stay O(1).',
            },
            {
              id: 'cache',
              label: 'Redis',
              tech: 'Redis',
              kind: 'data',
              detail:
                'Session and presence state live in Redis for fast fan-out across gateway instances.',
            },
          ],
        },
      ],
      edges: [
        { from: 'ui', to: 'realtime' },
        { from: 'realtime', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'cache' },
      ],
    },
  },
  {
    id: 'benchley',
    title: 'Benchley',
    category: 'Load Testing & Benchmarking Platform',
    subdomain: 'benchley.ssh.net.in',
    url: 'https://benchley.ssh.net.in/',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Load Testing',
    accent: '#fb7185',
    repo: null,
    description:
      'Developer-centric HTTP & API load testing platform powered by Grafana k6 with real-time SSE telemetry streams, automated capacity diagnostics, and side-by-side run comparisons.',
    stack: ['React', 'Go', 'k6', 'SSE', 'PostgreSQL'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'dashboard',
              label: 'Dashboard',
              tech: 'React',
              kind: 'client',
              detail:
                'Live metrics stream over SSE so charts update without polling or dropped frames.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'control',
              label: 'Go Control Plane',
              tech: 'Go',
              kind: 'service',
              detail:
                'The control plane schedules runs and enforces quotas across shared runners.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'runners',
              label: 'k6 Runners',
              tech: 'k6',
              kind: 'service',
              detail:
                'Runners are isolated per run so a runaway test cannot starve other tenants.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'target',
              label: 'Target APIs',
              tech: 'Target APIs',
              kind: 'external',
              detail:
                'Egress is pooled and rate-limited to keep tests realistic without abusing targets.',
            },
            {
              id: 'db',
              label: 'PostgreSQL',
              tech: 'PostgreSQL',
              kind: 'data',
              detail:
                'Run summaries are stored for side-by-side comparison and historical capacity trends.',
            },
          ],
        },
      ],
      edges: [
        { from: 'dashboard', to: 'control' },
        { from: 'control', to: 'runners' },
        { from: 'runners', to: 'target' },
        { from: 'control', to: 'db' },
        { from: 'runners', to: 'dashboard' },
      ],
    },
  },
  {
    id: 'keyzen',
    title: 'Keyzen',
    category: 'Secret Management & Credential Vault',
    subdomain: 'keyzen.ssh.net.in',
    url: 'https://keyzen.ssh.net.in/',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Secret Management',
    accent: '#a78bfa',
    repo: null,
    description:
      'Secure secret management and credential vault for developers, with encryption, access control, and audit trails.',
    stack: ['React', 'Node.js', 'AES-256', 'PostgreSQL', 'Redis', 'JWT'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'client',
              label: 'Developer Client',
              tech: 'React',
              kind: 'client',
              detail:
                'Secrets are decrypted in-memory only and never persisted to browser storage.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'gateway',
              label: 'API Gateway',
              tech: 'Node.js',
              kind: 'service',
              detail:
                'Every request is authenticated, rate-limited, and scoped before touching the vault.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'vault',
              label: 'Vault Service',
              tech: 'AES-256',
              kind: 'service',
              detail:
                'Envelope encryption rotates data keys without re-encrypting the entire store.',
            },
            {
              id: 'auth',
              label: 'Auth Service',
              tech: 'JWT',
              kind: 'service',
              detail:
                'Short-lived tokens plus refresh rotation limit the blast radius of a leaked credential.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'store',
              label: 'Encrypted Store',
              tech: 'PostgreSQL',
              kind: 'data',
              detail:
                'Ciphertext and metadata are separated so a DB dump alone cannot reveal secrets.',
            },
            {
              id: 'audit',
              label: 'Audit Log',
              tech: 'Redis',
              kind: 'data',
              detail:
                'Append-only audit events capture every read and write for compliance reviews.',
            },
          ],
        },
      ],
      edges: [
        { from: 'client', to: 'gateway' },
        { from: 'gateway', to: 'vault' },
        { from: 'gateway', to: 'auth' },
        { from: 'vault', to: 'store' },
        { from: 'auth', to: 'audit' },
      ],
    },
  },
  {
    id: 'memolm',
    title: 'MemoLM',
    category: 'LLM Response Firewall & Semantic Cache Gateway',
    subdomain: 'memolm.ssh.net.in',
    url: 'https://memolm.ssh.net.in/',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'LLM Security',
    accent: '#b724ff',
    repo: null,
    description:
      'OpenAI-compatible LLM gateway with intelligent semantic caching, safety validation, and response reuse to reduce redundant API calls, latency, and LLM costs while maintaining reliable and fresh responses.',
    stack: ['FastAPI', 'Python', 'Redis', 'OpenAI API', 'Semantic Cache'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'app',
              label: 'App / Agent',
              tech: 'App / Agent',
              kind: 'client',
              detail:
                'Drop-in OpenAI compatibility means existing SDKs work without code changes.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'gateway',
              label: 'Gateway API',
              tech: 'FastAPI',
              kind: 'service',
              detail:
                'Requests are normalized and fingerprinted so cache hits are provider-agnostic.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'cache',
              label: 'Semantic Cache',
              tech: 'Semantic Cache',
              kind: 'data',
              detail:
                'Embedding similarity catches paraphrased prompts that exact-match caches miss.',
            },
            {
              id: 'safety',
              label: 'Safety Validator',
              tech: 'Python',
              kind: 'ai',
              detail:
                'A policy pass blocks unsafe prompts before they ever reach a paid provider.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'providers',
              label: 'LLM Providers',
              tech: 'OpenAI API',
              kind: 'external',
              detail:
                'Provider failover keeps responses flowing when one upstream degrades.',
            },
          ],
        },
      ],
      edges: [
        { from: 'app', to: 'gateway' },
        { from: 'gateway', to: 'cache' },
        { from: 'gateway', to: 'safety' },
        { from: 'cache', to: 'providers' },
        { from: 'safety', to: 'providers' },
      ],
    },
  },
  {
    id: 'web2mcp',
    title: 'Web2MCP',
    category: 'Agent Tooling & Protocol Gateway',
    subdomain: 'web2mcp.ssh.net.in',
    url: 'https://web2mcp.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Agent Protocol',
    accent: '#22d3ee',
    repo: null,
    description:
      'Convert human-facing websites, booking portals, and registries into live, verified Model Context Protocol (MCP) tools for AI agents.',
    stack: ['TypeScript', 'Node.js', 'Playwright', 'MCP SDK', 'Redis'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'agent',
              label: 'AI Agent',
              tech: 'MCP SDK',
              kind: 'client',
              detail:
                'Tools are described with strict JSON schemas so agents can call them safely.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'mcp',
              label: 'MCP Server',
              tech: 'MCP SDK',
              kind: 'service',
              detail:
                'A typed tool registry validates arguments before any browser automation runs.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'adapter',
              label: 'Site Adapter',
              tech: 'Playwright',
              kind: 'service',
              detail:
                'Resilient selectors and retries absorb layout drift on third-party sites.',
            },
            {
              id: 'session',
              label: 'Session Store',
              tech: 'Redis',
              kind: 'data',
              detail:
                'Authenticated sessions are pooled per site so agents do not re-login on every call.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'sites',
              label: 'Target Sites',
              tech: 'Target Sites',
              kind: 'external',
              detail:
                'Headless browsers execute real flows and verify results before returning tool output.',
            },
          ],
        },
      ],
      edges: [
        { from: 'agent', to: 'mcp' },
        { from: 'mcp', to: 'adapter' },
        { from: 'adapter', to: 'sites' },
        { from: 'mcp', to: 'session' },
      ],
    },
  },
  {
    id: 'pulse',
    title: 'PULSE',
    category: 'Healthcare & Medication Management',
    subdomain: 'pulse.ssh.net.in',
    url: 'https://pulse.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Healthcare AI',
    accent: '#fb7185',
    repo: null,
    description:
      'Multilingual family-first medication tracker and health management platform designed for elderly care with AI assistance in 9 Indian languages.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AI / NLP', 'Twilio'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'app',
              label: 'Family App',
              tech: 'React',
              kind: 'client',
              detail:
                'Large-type, low-friction flows are designed for elderly users and caregivers.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'api',
              label: 'Node API',
              tech: 'Node.js',
              kind: 'service',
              detail:
                'Schedule changes propagate to every caregiver device so doses are never missed.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'engine',
              label: 'Medication Engine',
              tech: 'PostgreSQL',
              kind: 'service',
              detail:
                'Conflict checks catch duplicate or interacting prescriptions before they are saved.',
            },
            {
              id: 'ai',
              label: 'AI Assistant',
              tech: 'AI / NLP',
              kind: 'ai',
              detail:
                'Intent parsing handles natural language in nine Indian languages without a rigid UI.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'notify',
              label: 'Notifications',
              tech: 'Twilio',
              kind: 'external',
              detail:
                'Fallback SMS reminders reach caregivers even when the app is closed or offline.',
            },
          ],
        },
      ],
      edges: [
        { from: 'app', to: 'api' },
        { from: 'api', to: 'engine' },
        { from: 'api', to: 'ai' },
        { from: 'ai', to: 'notify' },
      ],
    },
  },
  {
    id: 'issuepilot',
    title: 'IssuePilot',
    category: 'AI Issue Triage & Policy Engine',
    subdomain: 'issuepilot.ssh.net.in',
    url: 'https://issuepilot.ssh.net.in/',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'AI Triage Engine',
    accent: '#6FFF00',
    repo: null,
    description:
      'Autonomous GitHub issue triage system with calibrated safety gates, 2-way label sync, split-pane human review inbox, and Jev 1.13 structured decision models.',
    stack: ['Python', 'FastAPI', 'GitHub API', 'LLM', 'PostgreSQL'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'webhook',
              label: 'GitHub Webhook',
              tech: 'GitHub API',
              kind: 'external',
              detail:
                'Signed webhooks are verified and de-duplicated so retries never double-triage.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'intake',
              label: 'FastAPI Intake',
              tech: 'FastAPI',
              kind: 'service',
              detail:
                'Intake enriches issues with repo context before any model call is made.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'engine',
              label: 'Triage Engine',
              tech: 'LLM',
              kind: 'ai',
              detail:
                'Structured decision models return calibrated confidence, not free-form text.',
            },
            {
              id: 'gates',
              label: 'Policy Gates',
              tech: 'Python',
              kind: 'service',
              detail:
                'Low-confidence decisions route to a human inbox instead of auto-labeling.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'github',
              label: 'GitHub API',
              tech: 'GitHub API',
              kind: 'external',
              detail:
                'Two-way label sync reconciles human edits with automated decisions.',
            },
            {
              id: 'db',
              label: 'Review Inbox',
              tech: 'PostgreSQL',
              kind: 'data',
              detail:
                'A split-pane review inbox stores every decision with full audit context.',
            },
          ],
        },
      ],
      edges: [
        { from: 'webhook', to: 'intake' },
        { from: 'intake', to: 'engine' },
        { from: 'engine', to: 'gates' },
        { from: 'gates', to: 'github' },
        { from: 'engine', to: 'db' },
      ],
    },
  },
  {
    id: 'splitwise',
    title: 'SplitWise',
    category: 'Fintech & Shared Expenses',
    subdomain: 'splitwise.ssh.net.in',
    url: 'https://splitwise.ssh.net.in',
    status: 'Online',
    statusColor: 'bg-emerald-400',
    badge: 'Web + Mobile',
    accent: '#34d399',
    repo: 'https://github.com/Nithin0620/splitWise',
    description:
      'Full-stack shared-expense tracker for trips and groups with flexible splits, live balances, settlements, email invites, and native mobile apps.',
    stack: ['React', 'Express', 'MongoDB', 'Tailwind CSS', 'Ably', 'Expo'],
    architecture: {
      layers: [
        {
          x: 95,
          nodes: [
            {
              id: 'web',
              label: 'Web App',
              tech: 'React 19',
              kind: 'client',
              detail:
                'Vite SPA with optimistic balance updates and route-level code splitting.',
            },
            {
              id: 'mobile',
              label: 'Mobile App',
              tech: 'Expo',
              kind: 'client',
              detail:
                'React Native client shares the same REST API and realtime channel as the web app.',
            },
          ],
        },
        {
          x: 300,
          nodes: [
            {
              id: 'edge',
              label: 'Edge / Cloud Run',
              tech: 'Cloudflare',
              kind: 'edge',
              detail:
                'TLS, caching, and routing for the web app and the Cloud Run API.',
            },
          ],
        },
        {
          x: 510,
          nodes: [
            {
              id: 'api',
              label: 'Express API',
              tech: 'Express 4',
              kind: 'service',
              detail:
                'REST API handles trips, expenses, split math, invites, and settlement flows.',
            },
            {
              id: 'realtime',
              label: 'Ably Realtime',
              tech: 'Ably',
              kind: 'service',
              detail:
                'Balance and expense changes fan out to every connected client without polling.',
            },
          ],
        },
        {
          x: 715,
          nodes: [
            {
              id: 'db',
              label: 'MongoDB',
              tech: 'MongoDB',
              kind: 'data',
              detail:
                'Stores users, trips, expenses, and split shares with indexed lookups.',
            },
            {
              id: 'auth',
              label: 'Google OAuth',
              tech: 'OAuth 2.0',
              kind: 'external',
              detail:
                'Google sign-in issues JWTs that the API verifies on every request.',
            },
            {
              id: 'mail',
              label: 'Resend',
              tech: 'Resend',
              kind: 'external',
              detail:
                'Transactional email delivers trip invites and settlement reminders.',
            },
          ],
        },
      ],
      edges: [
        { from: 'web', to: 'edge' },
        { from: 'mobile', to: 'edge' },
        { from: 'edge', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'realtime' },
        { from: 'api', to: 'auth' },
        { from: 'api', to: 'mail' },
      ],
    },
  },
];
