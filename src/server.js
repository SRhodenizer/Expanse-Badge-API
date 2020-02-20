// pulls in the http module
const http = require('http');
// get the url module
const url = require('url');
// querystring module for parsing querystrings in the url
const query = require('querystring');
// pull in the response finals
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');
const mediaHandler = require('./mediaResponses.js');

// sets up the port for the server
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handle GET requests
const handleGet = (request, response, parsedUrl, queryParam) => {
  // link to style sheet
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else
  // link to index page
  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else
  // gets a character id from the data object based on a name key
  if (parsedUrl.pathname === '/getUsers') {
    console.log(queryParam);
    jsonHandler.getUsers(request, response, queryParam);
  } else
  // cases for getting all the images from the media folder
  if (parsedUrl.pathname === '/media/mcrn.png') {
    mediaHandler.getMcrn(request, response);
  } else if (parsedUrl.pathname === '/media/un.png') {
    mediaHandler.getUn(request, response);
  } else if (parsedUrl.pathname === '/media/sh.png') {
    mediaHandler.getSh(request, response);
  } else if (parsedUrl.pathname === '/media/opa.png') {
    mediaHandler.getOpa(request, response);
  } else if (parsedUrl.pathname === '/media/protogen.png') {
    mediaHandler.getProto(request, response);
  } else if (parsedUrl.pathname === '/media/jamesFace.jpg') {
    mediaHandler.getJamesFace(request, response);
  } else if (parsedUrl.pathname === '/media/naomiFace.jpg') {
    mediaHandler.getNaomiFace(request, response);
  } else if (parsedUrl.pathname === '/media/amosFace.jpg') {
    mediaHandler.getAmosFace(request, response);
  } else if (parsedUrl.pathname === '/media/alexFace.jpg') {
    mediaHandler.getAlexFace(request, response);
  } else if (parsedUrl.pathname === '/media/millerFace.jpg') {
    mediaHandler.getMillerFace(request, response);
    // 404 default case
  } else {
    jsonHandler.getNotFound(request, response);
  }
};

const handlePost = (request, response, parsedUrl) => {
  // if the post call is addUser
  if (parsedUrl.path === '/addBadge') {
    // make the response accessible
    const res = response;

    // make a body array
    const body = [];

    // errors on bad request
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    // adds data bytes to body array
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // when the upload stream ends
    request.on('end', () => {
      // take all the data in the byte array and makes it a string
      const bodyString = Buffer.concat(body).toString();
      // parses the string into objects by field name
      const bodyParams = query.parse(bodyString);
      // passes to addUser function
      console.log(bodyParams);
      jsonHandler.addBadge(request, res, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);

  // gets the query information from the parsed URL
  const params = query.parse(parsedUrl.query);

  if (request.method === 'POST') {
    // handles the post request
    handlePost(request, response, parsedUrl);
  } else {
    // handles the get request
    handleGet(request, response, parsedUrl, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
