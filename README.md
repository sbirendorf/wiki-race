wiki race
================

 This wiki-race script use breadth-first search, and explores the neighbor nodes first, before moving to the next level neighbors.

 I scrape the links from the wiki page and add them to the search queue, in order to avoid duplicate nodes, before adding a node to the queue I check if the node already exists in said queue.

 I applied breadth-first search, however a Depth-first search with depth limit may return faster results.  

 			
How to run:
Open command prompt navigate to the folder location
Run the command: node server.js

Input:
Start link: type in line 8
End link: type in line 9
Debug mode is set to 'false' as default, in order to see the search process, set to 'true' on line 18 
Max search: To avoid infinite graph I added a maximum parameter to stop the script if it did not find the end link, it can be adjusted on line 29

Issues:
This script may take awhile to find the ending point, this depends on the relation of the two links and the amount of links within them
Search performance will decrease as amount of links in the queue increase and I check for duplicates.






