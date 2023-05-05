FROM node:18-alpine as build

RUN mkdir -p /home/node/app && \
    chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
COPY ./.env.production ./

USER node

RUN npm install -P
RUN npx msw init ./public
COPY --chown=node:node . .

RUN npm run build

# Step 2
FROM nginx:mainline-alpine

# Copy custom configuration file from the current directory
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
# Copy static assets @todo once we have these installed
# COPY ./public/manifest.json .
# COPY --from=build /home/node/app/public ./public
# COPY --from=build /home/node/app/public/fonts ./fonts
# COPY --from=build /home/node/app/public/images ./images
COPY --from=build /home/node/app/dist .
# Copy .env file and shell script to container
COPY --from=build /home/node/app/.env.production .

# RUN apk add --no-cache libxml2=2.9.14-r0 curl=7.80.0-r1 libcurl=7.80.0-r1 libgcrypt=1.9.4-r0

# Start Nginx server
# RUN /usr/share/nginx/html/env.sh
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]