FROM node:24.22.3-bookworm-slim

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json .npmrc ./
RUN npm ci --no-fund --no-audit

COPY --chown=node:node . .
RUN node scripts/check-node.js

CMD ["npm", "start", "--", "--help"]
