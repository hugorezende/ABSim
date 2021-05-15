FROM node:14

# Create an app directory
RUN mkdir -p /app
WORKDIR /app

# Copy important parts of the app
COPY . /app
RUN rm -rf ./node_modules

# Set environment
# ARG ENV
# RUN rm -rf .env
# RUN mv -f .env.$ENV .env

# Installing
RUN npm install --production

EXPOSE 3000

CMD npm start