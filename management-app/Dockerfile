FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV SKIP_PREFLIGHT_CHECK=true

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
