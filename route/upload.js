var router = require('./index');

// 微信小程序 图片上传
var multer = require('multer')
var fs = require('fs')
var upload = multer({ dest: './tmp/uploads/' })//图片上传时的临时文件
// 图片上传


router.post('/upload', upload.single('file'), function (req, res, next) {
  console.log('req', req.file);
  // 文件路径
  var filePath = req.file.path;
  // 文件类型
  var fileType = req.file.mimetype;
  var lastName = '';
  switch (fileType) {
    case 'image/png':
      lastName = '.png';
      break;
    case 'image/jpeg':
      lastName = '.jpg';
      break;
    case 'image/gif':
      lastName = '.gif';
    case 'image/webp':
      lastName = '.webp';
    default:
      lastName = '.png';
      break;
  }
  // 构建图片名
  var fileName = Date.now() + lastName;
  // 图片重命名
  fs.rename(filePath, './public/uploads/' + fileName, (err) => {
    if (err) {
      res.end(JSON.stringify({ status: '102', msg: '文件写入失败' }));
    } else {
      console.log('上传成功!');
      res.send({ code: 0, data: 'http://localhost:3000/uploads/' + fileName, msg: '上传成功' });
    }
  });
})
module.exports = router;
