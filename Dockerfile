# BASE IMAGE with an alias #
FROM node:latest as build
WORKDIR /app

# Install Angular CLI to run Build #
RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .

EXPOSE 4200 49153

CMD ng serve --host 0.0.0.0 --poll 2000
