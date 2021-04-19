# Mail Client

## Requirements
* Current Node version (`^15.11.0`) [.nvmrc automatically handles installation when using `nvm use`]

## Installation
First install dependencies (assuming nvm is installed, otherwise install node version manually first):

```sh
nvm use
npm install -g yarn
yarn
```

## Running
To run in hot module mode:

```sh
yarn start
```

To create a production build:

```sh
yarn run build-prod
```

To create a development build:

```sh
yarn run build-dev
```

- `yarn start` or `yarn run build-dev` can be run for local development.
- After executing `yarn run build-prod` open the file `dist/index.html` in your browser

## Known Issues
- Production version of app does not render emojis or unicode characters (Japanese support) correctly. WIP. Run `yarn start` or dev build to work around this.

## Credits

Made with [createapp.dev](https://createapp.dev/)
