require('bootstrap');
import $ from 'jquery';
const axios = require('axios');
// Just so that webpack recognises it

import '../css/main.css';
import jQuerySpinner from './spinner.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
$(function(){
    $('.header').height($(window).height());
})

var spinner = new jQuerySpinner({
    parentId:'loading_spinner'
});
$("#submitbtn")(function(){
    // spinner.show();
    data = $("#submitbtn").serialize();
    console.log("hubris");
    console.log(data);
    // const myPromise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('foo');
    //     }, 300);
    //   });
    //   myPromise.then((data) => {
    //     //   spinner.hide();
    //       console.log(data);
    //   })
});
// axios({
//     method: "get",
//     url: `https://api.github.com/repos/${user}/<reponame>/`,
//     headers: {
//         Authorization: `Bearer ${githubToken}`,
//         "Content-Type": "application/json"
//     },
//     auth: {
//         username: user,
//         password: pass
//     }
//     })
//     .then(res => {
//         callback(null, {
//             statusCode: 200,
//             body: JSON.stringify(res.data)
//         });
//     })
//     .catch(err => {
//         callback(err);
//     });