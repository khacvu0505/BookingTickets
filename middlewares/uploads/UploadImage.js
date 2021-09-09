const multer = require("multer");

const UploadImage = (type) => {
  // mkdirp: giúp tạo đường dẫn thư mục trước để nó có chỗ để lưu

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `/image/${type}`); //setup chỗ cần lưu file
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + file.originalname.slice(-4)); // chỗ này là tên file ảnh
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const validateType = [".jpg", ".png"];
      const check = validateType.includes(file.originalname.slice(-4));
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("Require type image  .png or .jpg"));
      }
    },
  });
  return upload.single(type);
};
module.exports = {
  UploadImage,
};
