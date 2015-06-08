$(document).ready(function(){
    var repoURL = "https://api.github.com/users/mralexgray/repos";
    var followersURL = "https://api.github.com/users/mralexgray/followers";
    
    var $repoTable = $('#repoTable');
    var $followers = $('#comboBox');
    var $loader = $('#loader');
         
    $loader.hide();
    fetchData(repoURL, $loader, "Repo Table", $repoTable);
    fetchData(followersURL, $loader, "Followers List", $followers);

});


function fetchData (URL, loaderElement, fetch, dataElement) {
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: URL,
    cache: false,
    beforeSend: function(){
        loaderElement.show();
        $('dataElement').hide;
    },
    complete: function(){
        loaderElement.hide();
        $('input').show();
        dataElement.show();
    },
    success: function(json){
        if (fetch == "Repo Table"){
            populateRepoTable(json, dataElement);
        }
        else if (fetch == "Followers List"){
            populateComboBox(json, dataElement);
        }
        else {
            populateRecentActivities(json, dataElement);
        }
        
    }
});
}

function populateRepoTable(json, repoTable){
    for(var i=0; i<json.length; i++){
    repoTable.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].size+"</th><th>"+json[i].created_at+"</th><th>"+json[i].language+"</th><th>"+json[i].has_issues+"</th><th>"+json[i].has_downloads+"</th><th>"+json[i].watchers+"</th></tr>");
   }
}

function populateComboBox(json, comboBox){
    for(var i=0; i<json.length; i++){
        comboBox.append("<option name="+i+"value="+json[i].login+">"+json[i].login+"</option>");
    }
}

function populateRecentActivities(json, activites){
    var recentDate, recent;
    for(var i=0; i<json.length; i++){
        var date = new Date(json[i].created_at);
        if(i=0){
            recentDate = date;
        }
        if(date>recentDate){
            recent = i;
        }     
    }
    activities.append("<ul><li>"+json[recent].id+"</li><li>"+json[recent].type+"</li></ul>");
}
