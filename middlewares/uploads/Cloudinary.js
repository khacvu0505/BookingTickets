const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: "dr7kx9d32",
  api_key: "626145223899118",
  api_secret: "e0bm0yXyfwTpDPoc4wWXWY00WJA",
  secure: true,
});
exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
          width: 200,
          height: 200,
        });
      },
      {
        resource_type: "auto",
        folder,
      }
    );
  });
};
