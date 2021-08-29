#FROM node:lts-alpine as build-stage
FROM public.ecr.aws/a6f5l0g3/ts/share/node:lts-alpine as build-stage


RUN apk update && \
    apk upgrade && \
    apk add git
RUN yarn global add @vue/cli

WORKDIR /app
ADD . /app/
COPY package.json ./
COPY yarn.lock ./


RUN yarn
#COPY . .
RUN yarn build

#FROM nginx:stable-alpine as production-stage
FROM public.ecr.aws/a6f5l0g3/ts/share/nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html/dist

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/app.conf

EXPOSE 80

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
