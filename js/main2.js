
$(function(){
    $('.header').height($(window).height());
})

$("#main_form").on("submit", function(e){
    e.preventDefault();
    // spinner.show();

    var company = $("#main_form :input[name='company']");
    
    var n = $("#main_form :input[name='n']");
    
    var m = $("#main_form :input[name='m']");
    var data = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    console.log(data['company']);
    console.log(company);
    console.log(n);
    console.log(m);
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