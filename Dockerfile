FROM node
WORKDIR /app
RUN npm install -g serve
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
# CMD ["npm", "start"]
CMD ["serve", "-s", "build"]