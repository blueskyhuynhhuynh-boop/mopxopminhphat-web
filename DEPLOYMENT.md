# Deployment Guide — mopxopminhphat.com

This document describes how to deploy and operate the production site. Read alongside [README.md](README.md), which covers local development.

## Architecture

| Component | Tech | Notes |
|-----------|------|-------|
| App framework | Ruby on Rails 7.0.3 | Ruby 3.1.2 (see `.ruby-version`) |
| App server | Puma 4.1 | Bound to a Unix socket, not TCP port |
| Web server / reverse proxy | nginx | Terminates TLS, serves static assets directly |
| Database | PostgreSQL 14+ | Single instance, local socket |
| Background jobs | delayed_job_active_record | Polls DB, no Redis needed for queue |
| Cron | whenever | Generates crontab from `config/schedule.rb` |
| SSL | Let's Encrypt (Certbot) | Auto-renews via systemd timer |
| File uploads | ActiveStorage on local disk | Stored in `/home/ubuntu/mopxopminhphat/shared/storage` |
| Auth | Devise + Omniauth Google OAuth2 | Admin SSO via Google Workspace |
| Deployment tool | Capistrano | After first manual deploy |

## Production server requirements

- Ubuntu 22.04 LTS (Jammy)
- Minimum 2 GB RAM (4 GB recommended)
- 20 GB disk minimum
- Public IPv4
- Domain DNS A records pointing to the server (handled at SKIDO)

## Initial server setup

For a brand-new server, run `setup-new-server.sh` (lives in the migration toolkit, not this repo) as root. That script:

1. Updates the OS and installs security patches
2. Creates a non-root deploy user (`ubuntu`)
3. Hardens SSH: key-only auth, non-default port, no root login
4. Installs and configures `ufw` (firewall) and `fail2ban`
5. Installs PostgreSQL, nginx, Certbot, Ruby (via rbenv or rvm), Node.js, yarn
6. Configures unattended-upgrades for security patches
7. Creates the deployment directory structure under `/home/ubuntu/mopxopminhphat/`

After the script completes, you must:
- Add your SSH public key to `/home/ubuntu/.ssh/authorized_keys`
- Set a strong password for the `mopxopminhphat` PostgreSQL user (record it in a password manager)
- Populate `/home/ubuntu/mopxopminhphat/shared/.env.production` with the values listed below
- Place `/home/ubuntu/mopxopminhphat/shared/config/database.yml` (copy from `config/database.yml.example` and fill in)

## Required environment variables

Place these in `/home/ubuntu/mopxopminhphat/shared/.env.production` on the server (NOT in this repo):

```bash
# PostgreSQL connection (rotate the password from the old default 'ubuntu')
WAKER_POSTGRES_DB_HOST=127.0.0.1
WAKER_POSTGRES_DB_PORT=5432
WAKER_POSTGRES_DB_USER=mopxopminhphat
WAKER_POSTGRES_DB_PASS=<strong-random-password>
WAKER_POSTGRES_DB_NAME=mopxopminhphat_production

# Application identity
WEB=mopxopminhphat
RAILS_ENV=production
RAILS_LOG_TO_STDOUT=true
RAILS_SERVE_STATIC_FILES=true

# Rails secret key (generate with: bundle exec rails secret)
SECRET_KEY_BASE=<64-char-random-hex>

# Site URLs (used for absolute URLs in emails, sitemaps, OG tags)
HOST=https://mopxopminhphat.com
ASSET_HOST=https://mopxopminhphat.com
LEGACY_ASSETS_HOST=https://mopxopminhphat.com

# Theme path (Capistrano deploy expectation)
THEME_LOCATION=/home/ubuntu/mopxopminhphat/shared/app/views/themes

# Google OAuth (retrieve from Google Cloud Console -> Credentials -> OAuth 2.0 Client IDs)
GOOGLE_CLIENT_ID=<from-google-cloud-console>
GOOGLE_CLIENT_SECRET=<from-google-cloud-console>

# Admin SSO whitelist
USER_EMAIL=<admin-google-account@gmail.com>

# Optional: Slack notifications (if you want them)
# SLACK_API_TOKEN=

# Background job tuning (defaults are fine)
# JOB_WORKOFF_DELAY=10
# PAGE_CACHING_SCHEDULED_REMOVE=true
```

Permissions: `chmod 600` the file, `chown ubuntu:ubuntu`.

## Database restore from backup

```bash
# 1. As postgres user, create the role and database:
sudo -u postgres createuser mopxopminhphat --pwprompt
sudo -u postgres createdb -O mopxopminhphat mopxopminhphat_production

# 2. Load the dump:
PGPASSWORD=<password> psql -h 127.0.0.1 -U mopxopminhphat -d mopxopminhphat_production < /path/to/mopxopminhphat_3_12_2025.sql

# 3. Verify:
PGPASSWORD=<password> psql -h 127.0.0.1 -U mopxopminhphat -d mopxopminhphat_production -c "\\dt" | head -20
```

If the dump came from `pg_dumpall` (cluster-wide), use `psql -f` against the `postgres` database instead.

## ActiveStorage restore from backup

The `storage_3_12_2025.tar.gz` (307 MB) holds all user-uploaded files (product images, etc.). Restore to the shared storage path so symlinks survive redeploys:

```bash
# As ubuntu user:
mkdir -p /home/ubuntu/mopxopminhphat/shared/storage
cd /home/ubuntu/mopxopminhphat/shared/storage
tar -xzf /path/to/storage_3_12_2025.tar.gz --strip-components=1
chown -R ubuntu:ubuntu /home/ubuntu/mopxopminhphat/shared/storage
```

Capistrano's `linked_dirs` will symlink `current/storage` → `shared/storage` on every deploy.

## First deployment (manual)

The Capistrano config in `config/deploy.rb` references `gitlab.com:fagotek/waker_deploy.git` — that's the original development repo, which is unavailable. Manual first deployment:

```bash
# On the new server, as ubuntu:
cd /home/ubuntu/mopxopminhphat
git clone https://github.com/blueskyhuynhhuynh-boop/mopxopminhphat-web.git current
cd current

# Install dependencies
bundle install --without development test --deployment
yarn install --production

# Asset compilation
RAILS_ENV=production bundle exec rake assets:precompile

# Database migrations (deploy.rb disables auto-migrate; run manually):
RAILS_ENV=production bundle exec rake db:migrate

# Start Puma
RAILS_ENV=production bundle exec puma -C config/puma.rb -d

# Verify:
curl -I http://127.0.0.1:3000/
```

After first successful manual deploy, future deploys can use Capistrano (update `config/deploy.rb` `repo_url` to point at the GitHub repo first).

## nginx + SSL

Once Puma is running locally on its Unix socket, nginx fronts it. The site config lives at `/etc/nginx/sites-available/mopxopminhphat.com`:

```nginx
upstream puma_mopxopminhphat {
  server unix:///home/ubuntu/mopxopminhphat/shared/tmp/sockets/mopxopminhphat-puma.sock fail_timeout=0;
}

server {
  listen 80;
  server_name mopxopminhphat.com www.mopxopminhphat.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name mopxopminhphat.com www.mopxopminhphat.com;
  root /home/ubuntu/mopxopminhphat/current/public;

  ssl_certificate     /etc/letsencrypt/live/mopxopminhphat.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mopxopminhphat.com/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

  client_max_body_size 50M;

  try_files $uri/index.html $uri @puma;

  location @puma {
    proxy_pass http://puma_mopxopminhphat;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location ~ ^/(assets|tassets|packs)/ {
    expires 1y;
    add_header Cache-Control public;
  }
}
```

Issue the certificate:

```bash
sudo certbot --nginx -d mopxopminhphat.com -d www.mopxopminhphat.com
```

Cron will auto-renew. Verify with `sudo certbot renew --dry-run`.

## Common operations

| Task | Command |
|------|---------|
| Restart Puma | `bundle exec puma -C config/puma.rb -d` (after stopping the old PID) |
| Tail Rails logs | `tail -f /home/ubuntu/mopxopminhphat/shared/log/production.log` |
| Tail Puma logs | `tail -f /home/ubuntu/mopxopminhphat/shared/log/puma.error.log` |
| Reload nginx | `sudo nginx -t && sudo systemctl reload nginx` |
| Rails console (prod) | `cd /home/ubuntu/mopxopminhphat/current && RAILS_ENV=production bundle exec rails c` |
| Run a one-off rake task | `cd /home/ubuntu/mopxopminhphat/current && RAILS_ENV=production bundle exec rake some:task` |
| Database backup | `pg_dump -U mopxopminhphat mopxopminhphat_production \| gzip > backup-$(date +%F).sql.gz` |
| Storage backup | `tar -czf storage-$(date +%F).tar.gz /home/ubuntu/mopxopminhphat/shared/storage` |

## Backup policy

- **Daily**: PostgreSQL dump + storage tarball to off-server location (S3-compatible, or another VPS, or local cloud sync)
- **Retention**: 30 days rolling, plus monthly snapshots for 12 months
- **Encryption**: encrypt backups at rest (e.g., `age` or `gpg`) before uploading

A `whenever` cron entry can call a shell script that handles this — define in `config/schedule.rb`.

## Security baseline

- SSH: key-only auth, non-22 port, no root login, fail2ban enabled
- `ufw` allows only: SSH (custom port), 80/tcp, 443/tcp
- `unattended-upgrades` configured for security patches
- PostgreSQL: listens only on `127.0.0.1` (no external port)
- Application: `secret_key_base` rotated, no shared dev credentials
- nginx: HSTS header, modern TLS only

If any of those are not in place, investigate before assuming the server is hardened.

## Recovery context (May 2026)

This codebase was migrated from a compromised VPS (IDC `103.145.63.218`, Ubuntu 20.04) where a cryptominer (`kauditd0` / Kinsing family) had been mining via SSH brute-force entry. The source code backup pre-dated the compromise and was confirmed clean. Production secrets (`.env.production`, `master.key`, etc.) were lost with the old server and have been regenerated from scratch on the new server.

See the post-mortem doc (added separately) for full details and hygiene rules.
