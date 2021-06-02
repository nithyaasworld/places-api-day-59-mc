const fs = require("fs");

let images = ["png", "jpeg", "jpg"];
let videos = ["mp4", "mov"];
let audios = ["mp3"];
let locationToClean = `C:\\Users\\Anjana\\Downloads`;
fs.readdir(locationToClean, (err, data) => {
  data.forEach((file) => {
    let extension = file.split(".").slice(-1)[0].toLowerCase();
    let fileType = images.includes(extension) ? "images" : videos.includes(extension) ? "videos" : audios.includes(extension) ? "audios" : "";
    if (fileType.length > 0) {
        let oldPath = locationToClean + `\\${file}`;
        let newPath = locationToClean + `\\${fileType}\\${file}`;
        fs.rename(oldPath, newPath, function (err) {
          if (err) { console.log(err) }
          else console.log(`Successfully renamed(moved) - ${file} `);
        });
    }
  });
});

// let args = process.argv.slice(2);
// console.log(args);
// let { people } = require('./people');
// console.log(people);

// let os = require('os');
// console.log(os.homedir(), os.platform());

// fs.unlink('./tobeDeleted.js', (err) => {
//     console.log(err);
// })
// fs.unlink('./delete', (err) => {
//     console.log(err);
// })