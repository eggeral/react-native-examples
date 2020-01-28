./node_modules/.bin/jest init

Babel so we can use export default, import etc

npm install --dev babel-jest 
npm install --dev @babel/core 
npm install --dev @babel/preset-env

// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};