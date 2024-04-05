FROM node:alpine

WORKDIR /node/api

COPY package*.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY prisma .

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate

CMD ["npm", "run", "dev"]
