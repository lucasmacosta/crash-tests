# Crash Tests API

This is a simple node.js API that will serve as a proxy to gather data from NHTSA API related to vehicles and their crash test ratings.

## Installation

Clone the repo and run the following command to have it running with the default settings:

```
$ npm install && npm start
```

## Configuration

The server is configured using the following environment variables with their corresponding defaults:

- `NODE_ENV`: 'development'
- `API_PORT`: 8888
- `LOGGER_FILE`: 'logs/all.log'
- `LOGGER_CONSOLE_LEVEL`: 'info'
- `LOGGER_SILENT`: false
- `NHTSA_URL`: 'https://one.nhtsa.gov/webapi/api'

These variables can be set when invoking the node app, i.e.,

```
$ API_PORT=8080 npm start
```

Or an `.env` file can be created with the following contents:

```
API_PORT=8080
```

## Requirements

The API was developed and tested using node.js LTS 6.10.1

## Testing

To test the API issue the following commmand

```
$ npm test
```

