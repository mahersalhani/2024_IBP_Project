FROM node:slim As development

WORKDIR /usr/src/app

RUN npm install -g bun 

COPY package.json ./
COPY bun.lockb ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN bun install

COPY . .

RUN npm run build

FROM node:slim as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g bun 

# COPY package*.json ./
COPY package.json ./
COPY bun.lockb ./

RUN bun install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
