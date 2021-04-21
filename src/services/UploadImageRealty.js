const config = require('../../app/config.js');

module.exports = class UploadImageRealty {
    moveFile(file, id) {
        return new Promise((resolve, reject) => {
            const regex = /[^a-z0-9_]/i;
            let baseName = file.name.replace(regex, '_').replace('__', '_');
            let uploadPath = config.directory_product_image + '/' + id + '/' + baseName;

            // console.log('uploadPath :');
            console.log('uploadPath :', uploadPath);
            console.log('baseName :', baseName);

            file.mv(uploadPath, (err) => resolve(true)); // d'ou vient file.mv ? 
        });
    }
}
