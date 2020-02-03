FROM node:12
WORKDIR /build
ADD package*.json ./
RUN ["npm", "install"]

ADD src ./src
ADD .env.production ./.env
RUN ["npm", "run-script", "build"]

FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /build/dist /usr/share/nginx/html
