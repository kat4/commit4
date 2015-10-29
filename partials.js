
function renderHTML(commitHistory){



var Partials = {

  header:'<!DOCTYPE html etc ><H2>'+commitHistory.repo+''+commitHistory.owner+'',

  middlePart:'',

  footer:''
};



commitHistory.forEach(function(commit){
  Partials.middle += '<div>'+commit.sha+'';
});


var commitHistoryHTML = Partial.header + Partials.middlePart + Partials.footer;


return commitHistoryHTML;


}
