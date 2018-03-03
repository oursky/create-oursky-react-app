# Stage 1: bundle our code
FROM node:8-alpine as bundler

# Install dependencies
RUN mkdir -p /usr/app/src
WORKDIR /usr/app/src
COPY package.json yarn.lock /usr/app/src/
RUN yarn

# Copy source code
COPY . /usr/app/src/

# Typecheck and lint our code
RUN yarn run ci

# Declare build time variables here
# so that changing them will not invalidate
# the above cached images
ARG MY_API_SERVER_API_KEY

# Bundle our code
RUN REACT_APP_MY_API_SERVER_API_KEY="${MY_API_SERVER_API_KEY}" \
  yarn run build

# Stage 2: an nginx image serving bundled code
# Of course you may not use nginx in production.
# For example, you may want to sync bundled code
# to AWS S3

FROM nginx:1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=bundler /usr/app/src/build /usr/share/nginx/html
