const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  server: {
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Виправляємо недопустимі заголовки
        res.removeHeader('X-React-Native-Project-Root');
        return middleware(req, res, next);
      };
    },
  },
};
