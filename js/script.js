$(document).ready(function(){
    var repoURL = "https://api.github.com/users/mralexgray/repos";
    var $repoTable = $('#repoTable');
    var $loader = $('#loader');
     
    $loader.hide();
    fetchData(repoURL, $loader, "Repo Table", $repoTable);

});


function fetchData (URL, loaderElement, fetch, table) {
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: URL,
    cache: false,
    beforeSend: function(){
        loaderElement.show();
        $('table').hide;
    },
    complete: function(){
        loaderElement.hide();
        $('input').show();
        table.show();
    },
    success: function(json){
        populateRepoTable(json, table);
        
    }
});
}

function populateRepoTable(json, repoTable){
    for(var i=0; i<json.length; i++){
    repoTable.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].size+"</th><th>"+json[i].created_at+"</th><th>"+json[i].language+"</th><th>"+json[i].has_issues+"</th><th>"+json[i].has_downloads+"</th><th>"+json[i].watchers+"</th></tr>");
   }
}


