const { getLoader, loaderByName, throwUnexpectedConfigError } = require('@craco/craco')

module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
}
