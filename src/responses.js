// data object
const users = [];
//default preMade users to give examples of each of the frames 
users[ "James Holden" ] = { badge: { frame: 'un', name: 'James Holden', sex: 'm', age: '30', image: '/media/jamesFace.jpg'} };
users[ "Naomi Nagata" ] = { badge: { frame: 'opa', name: 'Naomi Nagata', sex: 'f', age: '29', image: '/media/naomiFace.jpg'} } ;
users[ "Amos Burton" ] = { badge: { frame: 'protogen', name: 'Amos Burton', sex: 'm', age: '35', image: '/media/amosFace.jpg'} } ;
users[ 'Alex Kamal' ] = { badge: { frame: 'mcrn', name: 'Alex Kamal', sex: 'm', age: '32', image: '/media/alexFace.jpg'} } ;
users[ 'Josephus Miller' ] = { badge: { frame: 'sh', name: 'Josephus Miller', sex: 'm', age: '41', image: '/media/millerFace.jpg'} } ;

// responds with a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

// responds without sending the json object
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.end();
};

// returns user as json objects
const getUsers = (request, response, param) => {
  const obj = users[param.key];
    console.log(param.key);

  // makes a json object with the users data
  const responseJSON = {
    badge: obj,
  };
    // responds with it
  respondJSON(request, response, 200, responseJSON);
};

// adds a user to the users data
const addBadge = (request, response, body) => {
  const responseJSON = {
    message: 'All parameters are required.',
  };
  // if the needed params are not send tell the user
  if (!body.name || !body.age || !body.sex || !body.faction) {
    responseJSON.id = 'missingParams';
    respondJSON(request, response, 400, responseJSON);
    return;
  }
  // update default response code
  let responseCode = 201;

  // if it already exists update it
  if (users[body.name]) {
    responseCode = 204;
  } else {
    // if not add a new empty json obj
    users[body.name] = {};
  }

  // update the new objects fields
  users[body.name].name = body.name;
  users[body.name].age = body.age;
  users[body.name].sex = body.sex;
  users[body.name].faction = body.faction;

  // if the response code is still created return that message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully.';
    respondJSON(request, response, responseCode, responseJSON);
    return;
  }
  // if not use the updated response code and update the list
  respondJSONMeta(request, response, responseCode);
};

const getNotFound = (request, response) => {
  respondJSON(request, response, 404, {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  });
};

// export methods
module.exports = {
  getUsers,
  addBadge,
  getNotFound,
};
