require('bootstrap');
import $ from 'jquery';
const axios = require('axios');
// Just so that webpack recognises it

import '../css/main.css';
import '../css/tabs.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

// All css files added above have been added for webpack to recognise. It is not really required to add css files into js files.

// Now starts the main part.


$(function(){
    $('.header').height($(window).height());
});
$("#main_form").on("submit", function(e){
    let data = $(this).serializeArray();
    e.preventDefault(); // prevent the default behaviour of refreshing the page
    $("#submitbtn").attr('disabled','disabled'); // make the submit button disabled so that we can't click it again
    $('#loaderGif').show(); //
    var org = data[0].value;
    var parsed_n = parseInt(data[1].value);
    var parsed_m = parseInt(data[2].value);
         //your client side validation here
         
    if (isNaN(parsed_m) || isNaN(parsed_n)) // we check if it's a number or not 
    {
        $("#submitbtn").removeAttr('disabled');
        $('#loaderGif').hide();     
        return false;
    }
    getData(org, parsed_n, parsed_m).then(
        (githubData) => {
            console.log(githubData);
            const [top_n_repos, CompleteData] = githubData;
            var repo_list = $("#repo-list");
            repo_list.html("");
            var collaborators_pane = $("#collaborators-list");
            collaborators_pane.html("");
            top_n_repos.forEach((repo) => {
                repo_list.append(`<a href="#" class="text-center list-group-item"> ${repo.name} <small>${repo.forks} forks</small> </a>`);
                
                var collabs_list = $(
                    `<div class="bhoechie-tab-content list-group">
                    </div>`
                ).appendTo(collaborators_pane);
                (CompleteData[repo.name]).forEach((colab) => {
                    collabs_list.append(`<a href="${colab.url}" class="list-group-item">${colab.name}</a>`)
                })
            });
            $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
                e.preventDefault();
                $(this).siblings('a.active').removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
                $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
            });
            $("#submitbtn").removeAttr('disabled');
            $('#loaderGif').hide();

        }
    ).catch((err) => {console.log(err);});
            
    


});
async function getData(org, n, m) {
    let OrgData = await getOrgData(org);
    let CompleteData = await Object.create( {} );
    OrgData.sort((a, b) => parseInt(b.forks) - parseInt(a.forks));
    let top_n_repos = OrgData.slice(0, n);
    await Promise.all(top_n_repos.map(async (repo) => {
        let RepoData = await getRepoData(org, repo.name);
        
        var top_m_collaborators = RepoData.splice(0, m);
        top_m_collaborators.forEach((collaborator) => {
            if (!(repo.name in CompleteData)){
                CompleteData[repo.name] = new Array();
            }
            CompleteData[repo.name].push({
                name: collaborator.login,
                url: collaborator.html_url
            });
        });
    
    }));
    return [top_n_repos.map((repo) => ({name: repo.name, forks: repo.forks, url:repo.html_url})), CompleteData];

}

async function getRepoData(owner, repo) {
    try {
       let res = await axios({
            url: `https://api.github.com/repos/${owner}/${repo}/contributors`,
            method: 'get',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(res.status == 200){
            // test for status i want, etc
            console.log(res.status)
        }    
        // Don't forget to return something   
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}

async function getOrgData(owner) {
    try {
       let res = await axios({
            url: `https://api.github.com/orgs/${owner}/repos`,
            method: 'get',
            timeout: 8000,
            
        })
        if(res.status == 200){
            // test for status you want, etc
            console.log(res.status)
        }    
        // Don't forget to return something   
        console.log(res.data);
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}
$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});