FROM node:latest as build-stage
WORKDIR /app/spacetraders
COPY ../spacetraders-sdk/ .
RUN npm ci
WORKDIR /app/tradetiger
COPY ./ .
RUN npm ci

FROM nginx as production-stage
RUN mkdir /app
RUN mkdir /app/spacetraders
RUN mkdir /app/tradetiger
RUN mkdir /deliverable
COPY --from=build-stage /app/tradetiger/dist /deliverable
COPY nginx.conf /etc/nginx/nginx.conf
