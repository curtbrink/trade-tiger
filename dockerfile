FROM node:latest as build-stage
WORKDIR /app
COPY ./ .
RUN npm ci

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
