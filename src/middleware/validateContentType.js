import config from '../../config/app.config.js';

export const validateContentType = function (req, res, next) {
  const methodsToCheck = ['POST', 'PUT', 'PATCH'];

  if (methodsToCheck.includes(req.method)) {
    const contentType = req.headers['content-type'] || '';
    console.info(contentType);
    const isValid = config.allowedContentTypes.some((type) => contentType === type);

    if (!isValid) {
      // eslint-disable-next-line no-magic-numbers
      return res.status(415).json({
        error: `Unsupported Media Type. Allowed: ${config.allowedContentTypes.join(', ')}`,
      });
    }
  }

  next();
};
