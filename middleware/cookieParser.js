const parseCookies = (req, res, next) => {
  req.cookies = {};
  if (req.headers.cookie) {
    var cookies = req.headers.cookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
      var cookieName = cookies[i].split('=')[0];
      var cookieContent = cookies[i].split('=')[1];
      req.cookies[cookieName] = cookieContent;
    }
  }
  next();
  };

module.exports = parseCookies;