# Consumer Web

## Installation

Consumer Web requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies and start.

```sh
cd consumer-web
npm i
```

## Setting up MockServiceWorker

MockServiceWorker is a way to mock api requests in local development, to install this run the following:

```shell
npx msw init
```

This will generate a mockServiceWorker.js file which is ignored from VCS.

## Testing

```sh
npm run test
```
