document.getElementById('repo-form').addEventListener("submit", function(e) {
  console.log(e);
  e.preventDefault();
  var owner = document.getElementById('owner').value;
  var repo = document.getElementById('repo').value;

  window.location.replace("/commit4/" +owner+ "/" + repo);
});
