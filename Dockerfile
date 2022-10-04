# BASE IMAGE with an alias #
FROM node:latest as build
WORKDIR /app

# Install Chrome for unit test 
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
RUN apt-get update
RUN apt-get install -y google-chrome-stable xvfb

# Install Angular CLI to run Build #
RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .

EXPOSE 4200 49153 9876

CMD ng serve --host 0.0.0.0 --poll 2000
