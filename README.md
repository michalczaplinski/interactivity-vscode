# VSCode Interactivity

A VSCode extension that provides autocompletion for the [Interactivity
API](https://make.wordpress.org/core/2023/03/30/proposal-the-interactivity-api-a-better-developer-experience-in-building-interactive-blocks/).

## Current Limitations

- The extension only works for blocks where the interactivity is defined in a
  separate `store.js` file and exported using `export default`. Look at the
  example in [`/blocks/store/js`](/blocks/store/js).
- The `store.js` file has to be on the same level as the PHP file where you want
  the autocompletion.

## Development

### Run and debug the extension in development:

```
npm run watch
```

And then you can run the "Run Extension" debug task to

### Build the extension for production:

```sh
npm run build
npx vsce package
```
