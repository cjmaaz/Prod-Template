import config from '../../config/app.config.js';

export default function validateContentType(req, res, next) {
  const contentType = req.headers['content-type'] || '';
  const isValid = config.allowedContentTypes.some((type) => contentType.includes(type));
  if (!isValid) {
    // eslint-disable-next-line no-magic-numbers
    return res.status(415).json({
      error: `Unsupported Media Type. Allowed: ${config.allowedContentTypes.join(', ')}`,
    });
  }
  next();
}
