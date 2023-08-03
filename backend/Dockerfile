FROM node:alpine

# Install required packages
RUN apk update \
    && apk add --no-cache gcc g++ python3 python3-dev

# Set gcc and g++ as the default compilers using environment variables
ENV CC=/usr/bin/gcc
ENV CXX=/usr/bin/g++

# Set working directory and copy package.json
WORKDIR /online_judge
COPY package.json /online_judge

# Install dependencies
RUN npm install

# Copy the entire app
COPY . /online_judge

# Expose the required port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
