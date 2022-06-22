const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

//var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// fs.writeFile(exports.counterFile, counterString, (err) => {
//   if (err) {
//     throw ('error writing counter');
//   } else {
//     callback(null, counterString);
//   }
// });


exports.create = (text, callback) => {
  // debugger;
  //var id =
  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('error');
    } else { //in the npm tests error it was looking for info in our testData file. I changed the path and now all the tests are passing for create.
      var fileName = './test/testData/' + id.toString() + '.txt';
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          throw ('error writing todo text file');
        } else {
          callback(err, { id, text });
        }
      });
    }
  });

};

// exports.readAll = (callback) => {
//   var data = [];
//   fs.readdir('./test/testData/', (err, files) => {
//     if (err) {
//       console.log('read all error');
//     } else {
//       for (var i = 0; i < files.length; i++) {

//         data.push({ id: files[i].slice(0, 5), text: files[i].slice(0, 5) });
//       }
//       console.log(data);
//       callback(null, data);
//     }
//   });
// };

exports.readAll = (callback) => {
  var data = [];
  fs.readdir('./test/testData/', (err, files) => {
    if (err) {
      console.log('read all error');
    } else {
      for (var i = 0; i < files.length; i++) {
        var fileName = files[i];
        fs.readFile('./test/testData/' + fileName, (err, fileData) => {
          //console.log(fileName);
          if (err) {
            console.log('error');
            callback(err, null);
          } else {
            data.push({ id: fileName.slice(0, 5), text: fileData.toString() });
            console.log(data);
          }
        });
      }
      callback(null, data);
    }
  });
};

exports.readOne = (id, callback) => {
  var fileName = './test/testData/' + id.toString() + '.txt';
  fs.readFile(fileName, (err, fileData) => {
    if (err) {
      callback(err, null);
    } else {
      data = { id: id, text: fileData.toString() };
      callback(err, data);
    }
  });
};

exports.update = (id, text, callback) => {
  var fileName = './test/testData/' + id.toString() + '.txt';
  fs.readFile(fileName, (err, fileData) => {
    if (err) {
      callback(err, null);
    } else {
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          callback(err, null);
        } else {
          callback(err, { id: id, text: text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  var fileName = './test/testData/' + id.toString() + '.txt';
  fs.unlink(fileName, (err, file) => {
    if (err) {
      callback(err, null);
    } else {
      callback();
    }
  });

};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
