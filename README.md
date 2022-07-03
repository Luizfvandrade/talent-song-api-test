# 🎶 talent-song-api-test

**Song Api** is a Api used to create a simple list of your favorite songs. You can test the api [here](http://localhost:3000/api-docs)

> **Table of contents**
> - [🔍 Requirements](#requirements)
> - [💻 Technologies](#technologies)
> - [🔨 Project setup](#project-setup)
> - [🐳 Running with docker-compose](#running-docker-compose)
> - [▶️ Running locally](#running-locally)
> - [🧪️ Running unit tests](#running-tests)
> - [📉 Running coverage](#running-coverage)
> - [💅 Running linter](#running-linter)


## <a name="requirements"></a> 🔍 Requirements
| Dependencies                                 | Description               |
| -------------------------------------------- | ------------------------- |
| [![node-version]][node-download]             | Javascript Runtime        |
| [![yarn-version]][yarn-download]             | Dependency Manager        |
| [![docker-version]][docker-download]         | Virtualization containers |


## <a name="technologies"></a> 💻 Technologies

- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma.io](https://www.prisma.io/)
- Tests
  - [Jest](https://jestjs.io/pt-BR/)
- Auth
  - [BCryptjs](https://www.npmjs.com/package/bcrypt)
  - [JsonWebToken](www.npmjs.com/package/jsonwebtoken)
- Documentation
  - [Swagger.io](https://swagger.io/docs/)

## <a name="project-setup"></a> 🔨 Project setup

```bash
# Clone repository
git clone https://github.com/Luizfvandrade/talent-song-api-test

# Enter the cloned repository folder
cd talent-song-api-test

# Install the dependencies
yarn
```

## <a name="running-docker-compose"></a> 🐳 Running with docker-compose
```bash
# Build container
docker-compose build

# Execute container
docker-compose up -d

# Run prisma migration
yarn migrate:dev
```
## <a name="running-locally"></a> ▶️ Running locally

```bash
yarn dev
```
## <a name="running-tests"></a> 🧪️ Running unit tests

```bash
yarn test:unit
```

## <a name="running-coverage"></a> 📉 Running coverage

```bash
yarn coverage
```

## <a name="running-linter"></a> 💅 Running linter

```bash
yarn lint
```
[node-download]: https://nodejs.org/download/release/v14.14.0/
[yarn-download]: https://classic.yarnpkg.com/lang/en/docs/install#windows-stable
[docker-download]: https://docs.docker.com/engine/install/
[node-version]: https://img.shields.io/badge/node-latest-blue
[yarn-version]: https://img.shields.io/badge/yarn-latest-blue
[docker-version]: https://img.shields.io/badge/docker-v14.x.x-blue
