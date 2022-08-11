const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const pass = process.env['password'];
const user = process.env['username']
const sessionSecret = process.env['sessionSecret']

const app = express();
const httpserver = http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {

    // Session expires after 1 min of inactivity.
    expires: 600000
  }
}));

httpserver.listen(3000);

console.log("Server is online.")

//Redirects

app.get('/', function(req, res) {
  res.redirect('/home');
});

app.get('/textify', function(req, res) {
  res.redirect('https://lukemccrea.github.io/Textify/');
});

app.post('/login', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {

    if (username == user && password == pass) {
      // Authenticate the user
      request.session.loggedin = true;
      request.session.username = username;
      // Redirect to home page
      response.redirect('/admin/panel');
    } else {
      response.redirect('/admin#incorrect');
    }
    response.end();
  };
});

app.post('/postBlog', function(request, response) {
  console.log(request.body);
  fs.mkdirSync('public/blog/' + request.body.fileName);
  fs.appendFile(`public/blog/${request.body.fileName}/index.html`, `
  <!DOCTYPE HTML>
<html lang="en-US">

<head>
	<title> ${request.body.Title} - Luke McCrea </title>
	<meta name="charset" charset="utf-8">
	<meta name="viewport" content="width=device-width">
  <link rel = "stylesheet" type = "text/css" href = "/navstyles.css">
   <link rel = "stylesheet" type = "text/css" href = "/blog/blogstyles.css">

  <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png">
<link rel="manifest" href="/images/icons/site.webmanifest">
<link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="/images/icons/favicon.ico">
<meta name="msapplication-TileColor" content="#2d89ef">
<meta name="msapplication-config" content="/images/icons/browserconfig.xml">
<meta name="theme-color" content="#ffffff">

<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js" defer></script>

<!-- Meta Tags -->

<meta name="title" content="${request.body.Title} - Luke McCrea">
<meta name="description" content="${request.body.Description}">
<meta name="keywords" content="${request.Keywords}">
<meta name="robots" content="index, follow">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="English">
<meta name="author" content="${request.body.Author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://thelukemccrea.com/">
<meta property="og:title" content="${request.body.Title} - Luke McCrea">
<meta property="og:description" content="${request.body.Description}">
<meta property="og:image" content="banner.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://thelukemccrea.com/">
<meta property="twitter:title" content="${request.body.Title} - Luke McCrea">
<meta property="twitter:description" content="${request.body.Description}">
<meta property="twitter:image" content="banner.png">

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-297PDF3QCT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-297PDF3QCT');
</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9032221207889346"
     crossorigin="anonymous"></script>
</head>

<body>
    <nav id="topnav" class="topnav black sticky">
     <svg onclick="location.href = '/home'" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" viewBox="0, 0, 400,400"><g id="svgg"><path id="path0" d="M178.073 126.600 C 177.840 128.470,177.442 134.680,177.190 140.400 C 176.937 146.120,176.380 155.840,175.951 162.000 C 175.522 168.160,174.630 182.740,173.969 194.400 C 171.449 238.846,169.584 270.420,168.818 281.600 C 168.381 287.980,168.018 294.010,168.012 295.000 L 168.000 296.800 182.328 296.800 L 196.656 296.800 197.123 290.200 C 197.379 286.570,198.130 266.140,198.791 244.800 C 199.452 223.460,200.187 202.940,200.425 199.200 C 201.239 186.378,203.040 125.314,202.634 124.257 C 202.324 123.447,199.457 123.200,190.363 123.200 L 178.498 123.200 178.073 126.600 M311.212 131.779 C 311.219 136.520,311.565 151.200,311.981 164.400 C 312.398 177.600,313.320 209.048,314.030 234.284 C 314.741 259.520,315.565 283.820,315.861 288.284 L 316.400 296.400 330.690 296.619 L 344.981 296.838 344.449 286.219 C 344.157 280.378,343.575 270.560,343.155 264.400 C 342.736 258.240,341.872 243.840,341.236 232.400 C 340.600 220.960,339.666 204.760,339.162 196.400 C 338.658 188.040,337.470 168.240,336.523 152.400 L 334.800 123.600 323.000 123.379 L 311.200 123.157 311.212 131.779 M57.600 206.079 L 57.600 288.159 67.400 279.153 C 72.790 274.200,79.630 267.825,82.600 264.987 L 88.000 259.826 88.000 191.913 L 88.000 124.000 72.800 124.000 L 57.600 124.000 57.600 206.079 M296.952 158.400 C 295.936 160.820,289.504 176.660,282.658 193.600 C 275.813 210.540,268.148 229.260,265.626 235.200 C 263.103 241.140,260.179 248.430,259.127 251.400 C 258.075 254.370,256.983 256.800,256.701 256.800 C 256.418 256.800,252.029 246.450,246.946 233.800 C 216.326 157.592,215.381 155.393,214.906 159.244 C 214.664 161.200,214.129 175.927,213.717 191.970 L 212.968 221.140 216.076 228.370 C 217.785 232.347,225.227 249.280,232.614 266.000 L 246.044 296.400 256.884 296.622 L 267.723 296.843 268.653 294.803 C 272.427 286.520,295.253 233.215,297.755 226.843 L 300.878 218.886 300.005 188.843 C 298.871 149.824,299.196 153.058,296.952 158.400 M80.304 284.554 C 73.757 290.579,68.280 295.799,68.133 296.154 C 67.987 296.510,86.977 296.800,110.333 296.800 L 152.800 296.800 152.800 285.200 L 152.800 273.600 122.504 273.600 L 92.208 273.600 80.304 284.554 " stroke="none" fill="#ffffff" fill-rule="evenodd"></path></g></svg>
      <div id="nav-bar">
      <a href="/home">Home</a>
      <a href="/apps">Apps</a>
      <a href="/games">Games</a>
      <a href="/blog">Blog</a>
      <a href="javascript:void(0);" class="icon" onclick="toggleNav()" style="padding: 13px;">
        <i class="fa fa-bars"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg></i>
      </a>
        </div>
    </nav>
  <div class="content">
    <header>
      <div class="left">
      <h1>${request.body.Title}</h1>
      <h4>By ${request.body.Author}/h4>
      </div>
      <img src="banner.webp" alt="Banner Image"></img>
    </header>
    <div class="sidePanel left"></div>
    <article>
${request.body.editor}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9032221207889346"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-9032221207889346"
     data-ad-slot="4275826086"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    </article>
    <div class="sidePanel right"></div>
  </div>
  <div id="footer">
    <div class="links">
    <a href="https://www.youtube.com/channel/UC4S03QUeAfGp_nzOQiWsNyg" title="youtube" class="youtube"><i><svg aria-hidden="true" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="red" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg></i></a>
    <a href="https://github.com/lukemccrea" title="github"><i class="github">
  <svg aria-hidden="true" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="white" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></i></a>
    </div>
        <p>©2022 Luke McCrea</p>
    </div>
    <script src="/navscripts.js">
    </script>
  <script src="/blog/blogscripts.js" defer></script>
</body>

</html>
  `, function (err) {
  if (err) throw err;
  console.log('Saved!');
  response.redirect('/admin/panel#blog')
});
});

app.get('/admin/panel', function(request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    response.redirect('/admin/panel/index.html')
  } else {
    // Not logged in
    response.redirect('/admin');
  }
});

app.get('/admin/panel/index.html', function(request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    response.sendFile('/home/runner/lukemccrea/public/admin/panel/index.html')
  } else {
    // Not logged in
    response.redirect('/admin');
  }
});

app.use(express.static('public'));

//Error 404 Page
app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/error404/index.html')
})