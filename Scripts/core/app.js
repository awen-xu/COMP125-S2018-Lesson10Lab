// core module - IIFE
(function() {
  // App variables
  let hash;
  let addressBook;

  // STEP 1: create an XHR variable
  let XHR;

  function insertHTML(sourceURL, destTag) {
    let target = document.getElementsByTagName(destTag)[0];

    // STEP 2 - Instantiate an XMLHttpRequest object
    XHR = new XMLHttpRequest();

    // STEP 3 - Set up an event listner / handler that
    // listens for a readystatechange and requires
    // the readyState code to be "4" and the status to be "200"
    XHR.addEventListener("readystatechange", function() {
      if (this.status === 200) {
        if (this.readyState === 4) {
          // responseText is the data we are recieving from the server
          target.innerHTML = this.responseText;
          setActiveNavLink();
        }
      }
    });

    // STEP 4 - use the open method of the XHR object to send a GET request
    // you need to send the URL information
    XHR.open("GET", sourceURL);

    // STEP 5 - complete the request with the send method
    XHR.send();
  }


  function loadJSON(){
    XHR = new XMLHttpRequest();

    XHR.addEventListener("readystatechange", function() {
      if (this.status === 200) {
        if (this.readyState === 4) {
          addressBook = JSON.parse(this.responseText);

          addressBook.Contacts.forEach(contact => {
            console.log(contact);
          });
        }
      }
    });
    XHR.open("GET", "/data.json");
    XHR.send();

  }


  /**
   * This function is used for Intialization
   */
  function Start() {
    console.log(
      `%c App Initializing...`,
      "font-weight: bold; font-size: 20px;"
    );

    Main();
  }

  /**
   * This function is the where the main functionality for our
   * web app is happening
   */
  function Main() {
    console.log(`%c App Started...`, "font-weight: bold; font-size: 20px;");

    insertHTML("/Views/partials/header.html", "header");
    setPageContent("/Views/content/home.html");
    insertHTML("/Views/partials/footer.html", "footer");

    loadJSON();

    


    /*
    $.get("/Views/partials/header.html", function(data){
      let target = document.getElementsByTagName("header")[0];

      target.innerHTML = data;
    });

    $.get("/Views/partials/footer.html", function(data){
      let target = document.getElementsByTagName("footer")[0];

      target.innerHTML = data;
    });

    $.get("data.json", function(data){

      console.log(data);
    });
    */
  }

  function setPageContent(url) {
    insertHTML(url, "main");
  }

  function Route() {
    hash = location.hash.slice(1);
    document.title = hash;

    // sets the url 
    history.pushState("", document.title, "/" + hash.toLowerCase() + "/");

    setPageContent("/Views/content/" + hash.toLowerCase() + ".html");
  }

  function setActiveNavLink() {
    // sets all list item class to nav-item
    document.querySelectorAll("li.nav-item").forEach(function(listItem) {
      listItem.setAttribute("class", "nav-item");
    });

    // add the active class to the class attribute of the appropriate list item
    document.getElementById(document.title).classList.add("active");
  }

  window.addEventListener("load", Start);
  window.addEventListener("hashchange", Route);
})();
