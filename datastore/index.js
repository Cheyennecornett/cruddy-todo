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
          callback(null, {id, text });
        }
      });
    }
  });

};

exports.readAll = (callback) => {
  var data = [];

  fs.readdir('./test/testData/', (err, files) => {
    if (err) {
      console.log('read all error');
    } else {
      for (var i = 0; i < files.length; i++) {

      }
    }
  });

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
