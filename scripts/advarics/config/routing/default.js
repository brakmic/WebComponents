module.exports = [
  {
    path: '/scripts/{filename*}',
    method: 'GET',
    handler: {
        directory: {
            path: 'scripts',
            listing: false
        }
    }
  },
  {
    path: '/styles/{filename*}',
    method: 'GET',
    handler: {
        directory: {
            path: 'styles',
            listing: false
        }
    }
  },
  {
    path: '/',
    method: 'GET',
    handler: function (request, reply) {
      reply.file('index.html');
    }
  }
];