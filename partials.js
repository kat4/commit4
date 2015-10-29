function renderHTML(commitHistory) {



  var Partials = {

    header: '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title><link rel="stylesheet" href="/css/commits.css"></head><body><h1></h1>',

    commitContainerOpen: '<div id="commits-container">',

    commit: '',

    commitContainerClose: '</div>',

    scripts: '<script type="text/javascript" src="/js/commit4.js"></script>',

    footer: '</body></html>'
  };


  Object.keys(commitHistory).forEach(function(key) {
    var commitFiles = '';
    commitHistory[key].files.forEach(function(file) {
      var percentAdded = file.additions / file.changes * 100;
      var percentDeleted = file.deletions / file.changes * 100;
      commitFiles += '<div class="file circle" data-filename="' + file.filename + '" data-changes="' + file.changes + '" data-added="' + file.additions + '" data-deleted="' + file.deletions + '"><div class="file-stats"><div class="added" style="height:' + percentAdded + '%;">' +
        file.additions +
        '</div><div class="deleted" style="height:' + percentDeleted + '%;">' +
        file.deletions +
        '</div></div></div>'
    });

    Partials.commit += '<div class="commit" data-sha="' +
      commitHistory[key] +
      '">'+
      '<div class="avatar circle" style="background-image:url(\'' +
      commitHistory[key].author.avatar +
      '\')" data-author="' +
      commitHistory[key].author.username +
      '"></div>' +
      commitFiles +
      '</div>';

  });

  var commitHistoryHTML = Partials.header + Partials.commitContainerOpen +
    Partials.commit + Partials.commitContainerClose + Partials.scripts + Partials.footer;


  return commitHistoryHTML;


}

module.exports = renderHTML;
