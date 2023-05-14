FROM node:18.16.0 as build-stage
WORKDIR /app
COPY package*.json .
RUN ls
RUN npm install
RUN ls
COPY ./ .
RUN ls
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
