var request = require('request');

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
      arr.push(object.avatar_url);
    })

    cb(err, arr);
    // console.log (parsedJson);

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
