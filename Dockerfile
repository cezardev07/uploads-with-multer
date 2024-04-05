FROM node:alpine

WORKDIR /node/api

COPY package*.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY prisma .

RUN yarn

COPY . .

EXPOSE 3333

RUN npx prisma generate

CMD ["yarn", "dev"]
