FROM node:22.13.0

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prefer-offline

COPY . .

RUN pnpm build

RUN mkdir -p /app/uploads

EXPOSE 3000

CMD ["pnpm", "start"]