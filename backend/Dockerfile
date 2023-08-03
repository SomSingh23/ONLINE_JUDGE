FROM node:alpine
RUN apk update \
    && apk add --no-cache gcc g++ python3 python3-dev
ENV CC=/usr/bin/gcc
ENV CXX=/usr/bin/g++
WORKDIR /online_judge
COPY package.json /online_judge
RUN npm install
COPY . /online_judge
EXPOSE 5000
CMD ["npm", "start"]
