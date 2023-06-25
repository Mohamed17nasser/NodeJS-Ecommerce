const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dfa2gl03r',
  api_key: '257569942259393',
  api_secret: '994FPuzTTXXlqz4P6hnd-zuLTAg',
  secure: true,
});

module.exports = {cloudinary};