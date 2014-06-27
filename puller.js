(function() {

  var userbox = $('#loginItems').find('.username');
  var pwbox = $('#loginItems').find('.password');
  var loginForm = $('#loginItems').find('#loginForm');
  var prBody = $('#loginItems').find('.body');
  var prDescription = $('#loginItems').find('.description');
  var loading = $('#loading');
  var goofed = $('#goofed');
  var username = '';
  var pw = '';
  var repo;
  var gh;
 // var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";


  loginForm.submit(function(event) {
    event.preventDefault();
    goofed.attr('hidden', true);
    loginForm.attr('hidden', true);
    loading.attr('hidden', false);

    username = userbox.val();
    pw = pwbox.val();

    var pr = {
      "title": prDescription.val(),
      "body": prBody.val(),
      "head": username + ':master',
      "base": username
    };


    gh = new Octokit({
      username: username,
      password: pw
    });

    repo = gh.getRepo('hackreactor', '2014-06-toy-problems');

    repo.getInfo()
      .then(function(repo) {
        console.log(repo);
      });

    repo.createPullRequest(pr)
      .then(function(res) {
          console.log(res.html_url);
          chrome.tabs.create({ url: res.html_url });          

      }, function(error) {
        loginForm.attr('hidden', false);
        loading.attr('hidden', true);
        goofed.attr('hidden', false);

      });
    


  });



})();