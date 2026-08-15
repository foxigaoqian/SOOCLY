#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() {
  printf '\n[SOOCLY skills] %s\n' "$1"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$1" >&2
    exit 1
  fi
}

require_cmd node
require_cmd npm
require_cmd npx

log "Installing product, growth, research, SEO, and analytics skills"
npx --yes skills add coreyhaines31/marketingskills --skill \
  product-marketing \
  marketing-psychology \
  customer-research \
  site-architecture \
  programmatic-seo \
  seo-audit \
  influencer-marketing \
  community-marketing \
  referrals \
  free-tools \
  analytics

log "Installing distinctive frontend-design guidance"
npx --yes skills add anthropics/skills --skill frontend-design

log "Installing React / Next.js engineering and web-design review skills"
npx --yes skills add vercel-labs/agent-skills --skill \
  react-best-practices \
  composition-patterns \
  web-design-guidelines

log "Installing Supabase and Postgres skills"
npx --yes skills add supabase/agent-skills --skill \
  supabase \
  supabase-postgres-best-practices

log "Installing UI UX Pro Max into the project-local universal Agent Skills directory"
if command -v python3 >/dev/null 2>&1; then
  npx --yes ui-ux-pro-max-cli init --ai universal
elif command -v python >/dev/null 2>&1; then
  npx --yes ui-ux-pro-max-cli init --ai universal
else
  printf '\nUI UX Pro Max requires Python 3.x.\n' >&2
  printf 'Install Python 3, then run: npx --yes ui-ux-pro-max-cli init --ai universal\n' >&2
  exit 1
fi

if [[ "${SOOCLY_INSTALL_CLOUDFLARE_SKILLS:-0}" == "1" ]]; then
  log "Installing optional Cloudflare deployment skills"
  npx --yes skills add https://github.com/cloudflare/skills --skill \
    cloudflare \
    wrangler \
    web-perf \
    workers-best-practices
else
  log "Skipping Cloudflare skills (deployment architecture has not been selected)"
  printf 'To include them later, run:\n'
  printf 'SOOCLY_INSTALL_CLOUDFLARE_SKILLS=1 bash scripts/setup-agent-skills.sh\n'
fi

log "Skill setup complete"
printf '\nProject instructions: AGENTS.md\n'
printf 'Product context:      .agents/product-marketing.md\n'
printf 'Skill routing:        docs/SKILLS.md\n'
printf '\nIf the skills CLI asks where to install, choose the project-local / universal Agent Skills option.\n'
