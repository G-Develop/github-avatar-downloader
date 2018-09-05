var request = require('request');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'GITHUB_TOKEN'
    }
  };

  request(options, function(err, res, body) {
    let parsedJson = JSON.parse(body);
    let arr = [];
    parsedJson.forEach(object => {
      let imgUrl = object.avatar_url;
      let loginKey = object.login;
      let filePath = `./avatars/${loginKey}.jpg`
      downloadImageByURL(imgUrl, filePath);
    });


    cb(err, arr);
    // console.log (parsedJson);

  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));

}

downloadImageByURL('https://avatars3.githubusercontent.com/u/192451?v=4', './avatar.jpg')


getRepoContributors(process.argv[02], process.argv[03], function(err, result) {
  console.log(process.argv)
  console.log("Errors:", err);
  console.log("Result:", result);
});


// getRepoContributors1("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });
