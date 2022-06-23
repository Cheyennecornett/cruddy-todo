const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const Promise = require('bluebird');
// const readFilePromise = Promise.promisify(fs.readfile);
const pfs = Promise.promisifyAll(fs);

//var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

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

//return a new promise
//readdir
//output is an array of objs {id: id, text: text}

//iterate through files in dir
//read each file
//create data obj

exports.readAll = (callback) => {
  return pfs.readdirAsync(exports.dataDir).then((files) => {
    var data = files.map(file => {
      var id = file.slice(0, 5);
      // var filePath = `${exports.dataDir}/${id}.txt`;
      var filePath = path.join(exports.dataDir, file);
      console.log('log:', filePath);
      return pfs.readFileAsync(filePath).then((fileData) => {
        console.log('id:', id, 'fileData:', fileData, 'fileData.toString:', fileData.toString());
        // console.log('data:', data);
        return {id: id, text: fileData.toString()};

      });
    });
    //console.log(data);
    //then take those and place them in the callback
    Promise.all(data).then((data) => {
      callback(null, data);
    });

  });
  // var data = [];
  // fs.readdir('./test/testData/', (err, files) => {
  //   if (err) {
  //     console.log('read all error');
  //   } else {
  //     for (var i = 0; i < files.length; i++) {
  //       var fileName = files[i];
  //       fs.readFile('./test/testData/' + fileName, (err, fileData) => {
  //         //console.log(fileName);
  //         if (err) {
  //           console.log('error');
  //           callback(err, null);
  //         } else {
  //           data.push({ id: fileName.slice(0, 5), text: fileData.toString() });
  //           console.log(data);

  //         }
  //       });
  //     }
  //     callback(null, data);
  //   }
  // });
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
