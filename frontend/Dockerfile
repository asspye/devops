FROM node:lts-slim as builder
COPY . /data
WORKDIR /data
RUN npm install \
    && npm run build \
    && cp static/index.html build/

FROM nginx:mainline-alpine
COPY --from=builder ["/data/build", "/usr/share/nginx/html/"]
