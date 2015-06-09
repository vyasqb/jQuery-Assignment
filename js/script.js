$(document).ready(function(){
    var repoURL = "https://api.github.com/users/mralexgray/repos";
    var followersURL = "https://api.github.com/users/mralexgray/followers";
    
    var $repoTable = $('#repoTable');
    var $followers = $('#comboBox');
    var $loader = $('#loader');
    var $details = $('#details')    
     
    $loader.hide();
    fetchData(repoURL, $loader, "Repo Table", $repoTable);
    fetchData(followersURL, $loader, "Followers List", $followers);

    $followers.change(function() {
        var $activitiesURL = "https://api.github.com/users/"+$( "#comboBox option:selected" ).text()+"/received_events";
        fetchData($activitiesURL, $loader, "Activities List", $details);
        
    });

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

function populateRecentActivities(json, activities){
    var latestDate=json[0].created_at, latestEvent=0;  
    for(var i=1; i<json.length; i++){
        if(json[i].created_at > latestDate)
             latestEvent=i;
    }
    $("#list").remove();
    activities.append("<ul id='list'><li>Latest Event ID: "+json[latestEvent].id+"</li><li>Latest Event Type: "+json[latestEvent].type+"</li><li>Created Time: "+json[latestEvent].created_at+"</li></ul>");
}




