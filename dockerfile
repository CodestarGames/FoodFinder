# Expose the port the app runs on
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base

# Inject API key at runtime
ARG VITE_FOURSQUARE_API_KEY
ENV VITE_FOURSQUARE_API_KEY $VITE_FOURSQUARE_API_KEY


COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app
COPY --from=build /app/.output /app/.output
COPY --from=build /app/.vinxi /app/.vinxi

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
