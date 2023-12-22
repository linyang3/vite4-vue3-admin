# Dockerfile
FROM registry.access.redhat.com/ubi9/nodejs-18-minimal as BUILD
USER 0
WORKDIR /app
RUN chown -R 1001:0 /app
USER 1001
COPY ["package.json", "package-lock.json", "./"]
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi
COPY . .
RUN npm run build:qa

FROM registry.access.redhat.com/ubi9/nginx-122
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /share
COPY --from=BUILD /app/dist .
CMD ["nginx", "-g", "daemon off;"]