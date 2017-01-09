  var express = require('express');
  var fs      = require('fs');
  var request = require('request');
  var cheerio = require('cheerio');
  var app     = express();

    input = {
              "start": "https://en.wikipedia.org/wiki/Check_Point",
              "end": "https://en.wikipedia.org/wiki/Jerusalem"
            }

    // console.log(input.start);
    // console.log(input.end);

    //extract the relative link from the start and end inputs
    var temp = input.start.split("/");
    var relative_start = "/"+temp[temp.length-2]+"/"+temp[temp.length-1];
    temp = input.end.split("/");
    relative_end = "/"+temp[temp.length-2]+"/"+temp[temp.length-1];

    //set the wiki domain 
    domain ="https://"+temp[2];

    debug = false; //set to true to see the search progress
    queue = [relative_start]; //the search queue
    pages =[0];
    path_route =[input.start];
    step = 0;
    max = 4000; //max amount of pages to check
    step_count = 0; 

    scrape(0);

    function scrape(index){
       request(domain+queue[index], function(error, response, html){
            if(!error){
              var $ = cheerio.load(html);

              if(debug){
                  console.log(path_route);
                  console.log('step: '+step +' i:'+index +' link: '+queue[index]);
              }

              links = $('body #bodyContent p a'); //jquery get all hyperlinks 
              var current_page_total_links = 0;
              $(links).each(function(i, link){
                var href = $(link).attr('href');

                //if we found the end!!
                if(href == relative_end ){
                   path_route[step]= domain+queue[index];

                   path_route.push(input.end);//add the end link
                   input.path=path_route;
                   console.log();
                   console.log(input);
                   index = max; //
                   return false;
                }

                //make sure the link is not an anchor
                //make sure we dont have this link in the queue to avoid duplicates
                if(href.charAt(0) == '/' && queue.indexOf(href) == -1){

                  queue.push(href); // add this link to the search q
                  current_page_total_links++;
                }

              });

              pages[index]=current_page_total_links;
              path_route[step]= domain+queue[index];

              //set values,only apply for the first time
              if(step == 0){
                step++;
                step_count= current_page_total_links;
              }          

              //check if we need to increase the step  
              if(index > step_count){
                step_count = step_count + pages[step];
                step++;
              }

              index++; 

              if(index < max){
                 scrape(index);
              }
            }
        })
    }
    
    


  app.listen('80');
  exports = module.exports = app;
