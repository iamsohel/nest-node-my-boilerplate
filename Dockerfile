# FROM node:16-alpine as builder

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm ci

# COPY . .

# ARG APP_ENV=development
# ENV NODE_ENV=${APP_ENV}

# RUN npm run build

# RUN npm prune

# FROM node:16-alpine

# ARG APP_ENV=development
# ENV NODE_ENV=${APP_ENV}

# WORKDIR /app
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

# EXPOSE 5000

# USER node
# CMD [ "npm", "run", "start:prod" ]

FROM node:16-alpine


WORKDIR '/app'

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start:dev"] 

