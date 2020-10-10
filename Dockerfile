FROM node:12

# Create app directory
WORKDIR /usr/src/app

# RUN npm install
# If you are building your code for production
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


EXPOSE 8000
CMD ["node", "dist/index.js" ]