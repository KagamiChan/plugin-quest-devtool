const loaderMerge = require('@neutrinojs/loader-merge');

module.exports = {
  use: [
    '@neutrinojs/airbnb',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Plugin Quest Devtool'
        }
      },
    ],
    (neutrino) => neutrino.use(loaderMerge('compile', 'babel'), {
      plugins: [
        'transform-decorators-legacy',
        'transform-decorators',
        'transform-class-properties',
      ],
      env: {
        development: {
          plugins: [
            'transform-decorators-legacy',
            'transform-decorators',
            'transform-class-properties',
          ],
        },
        production: {
          plugins: [
            'transform-decorators-legacy',
            'transform-decorators',
            'transform-class-properties',
          ],
        }
      }
    }),
    '@neutrinojs/jest',
  ]
};
