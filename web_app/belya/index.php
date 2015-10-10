<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>Belya</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="css//bootstrap-theme.min.css">

    <link href="css/starter-template.css" rel="stylesheet">
  </head>

  <script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>

  <body>
           
  <div class="starter-template">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Belya</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="faq.php">FAQ</a></li>
            <li><a href="contact.php">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div> 

    <div class="container">

      <h1><b>Welcome to Belya!</b></h1>
      <p class="lead">Select a center or workshop from the map on the left or list some on the right!</p>

      <table id ="add-search" class="table">
        <tr>
          <td>
          <div id ="map_canvas"></div></td>
          <td>
            <ul id="search_add_tab" class="nav nav-tabs">
              <li class="active"><a href="#">List</a>
                <form id="info-form" class="navbar-form navbar-left" role="search" action="index.php" method="POST">
                  <div class="form-group">
                    Governorate: 
                    <select id="gov" onchange="load_cities();"  class="form-control">
                    </select>
                    <br>                    
                    City:
                    <select id="city" onchange="load_places();"  class="form-control">
                    </select>
                    <!--<input type="text" class="form-control" placeholder="Search">-->
                  </div>
                  <br>
                  <!--<button type="submit" class="btn btn-default">Add</button> -->
                </form>
              </li>
              <!--<li><a href="#">Add</a></li>-->
            </ul>
            <div id="shortest-info"> </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="footer">Copyright (C) 2014 - Belya Team</div>
  </div>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/map_locator.js"></script>
    <script src="js/actions.js"></script>

  </body>
</html>
