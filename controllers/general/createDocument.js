const Model = require('../../model/');
const mammoth = require('mammoth');
const pdfreader = require('pdfreader');
const fs = require('fs');
const utils = require('../../lib/hashUtils.js');


const createDocument = (req, callback) => {
  if (req.file) {
    const originalName = req.file.originalname;
    const fileName = req.file.filename;
    const fileExtension = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    if (fileExtension === 'pdf') {
      let parsedText = '';
      new pdfreader.PdfReader().parseFileItems(`${__dirname}/../../documents/${req.file.filename}`, function (err, item) {
        if (err) {
          callback(err);
        } else if (!item) {
          Model.General.createDocument(originalName, fileName, parsedText, (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(null, data);
            }
          });
        } else if (item.text) {
          parsedText += `${item.text}`;
        }
      });

    } else if (fileExtension === 'docx') {
      mammoth.extractRawText({path: `${__dirname}/../../documents/${req.file.filename}`})
        .then((result) => {
          var parsedText = result.value;
          Model.General.createDocument(originalName, fileName, parsedText, (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(null, data);
            }
          });
        })
        .done();
    }
  } else {
    const parsedText = req.body.document;
    const randomData = utils.createRandom32String();
    const fileName = utils.createHash(randomData);
    const originalName = 'Resume.txt';
    fs.writeFile(`${__dirname}/../../documents/${fileName}`, parsedText, (err) => {
      if (err) {
        callback(err);
      } else {
        Model.General.createDocument(originalName, fileName, parsedText, (err, data) => {
          if (err) {
            callback(err);
          } else {
            callback(null, data);
          }
        });
      }
    });
  }
};

module.exports = createDocument;
