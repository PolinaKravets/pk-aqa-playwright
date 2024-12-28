FROM node:20.18-slim


RUN npm install -g npm@latest


RUN npx -y playwright@1.49.1 install --with-deps


CMD ["npx", "playwright", "test"]
