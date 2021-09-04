const multer = require("multer");
const mkdirp = require("mkdirp");

const UploadImage = (type) => {
  // mkdirp: giúp tạo đường dẫn thư mục trước để nó có chỗ để lưu
  const made = mkdirp.sync(`./public/image/${type}`);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/image/${type}`); //setup chỗ cần lưu file
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.random().toString(36).substr(2, 7);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + file.originalname.slice(-4)
      ); // chỗ này là tên file ảnh
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
