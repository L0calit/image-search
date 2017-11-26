Image Search Abstraction Layer
=========================

 I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
 
 I can paginate through the responses by adding a ?offset=2 parameter to the URL.
 
I can get a list of the most recently submitted search strings.

Example for creation : 
-------------------------

https://image-search-ab.glitch.me/api/imagesearch/lolcats%20funny?offset=10
 
https://image-search-ab.glitch.me/api/latest/imagesearch/

Output : 
-------------------------

[{"term":"test","when":"2017-11-21T15:36:47.574Z"},{"term":"grumpycat","when":"2017-11-21T15:36:06.717Z"},{"term":"grumpycat","when":"2017-11-21T15:35:58.218Z"},{"term":"lolcats funny","when":"2017-11-21T14:51:32.625Z"},{"term":"lolcats funny","when":"2017-11-21T14:01:35.009Z"},{"term":"lolcats funny","when":"2017-11-21T14:01:21.336Z"},{"term":"lolcats funny","when":"2017-11-21T14:01:14.753Z"},{"term":"lolcats funny","when":"2017-11-21T14:00:59.222Z"},{"term":"test","when":"2017-11-21T12:18:36.769Z"},{"term":"lolcats funny","when":"2017-11-21T10:41:00.335Z"}]