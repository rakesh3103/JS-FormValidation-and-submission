var $ = {
    ajax: function(obj) {
      obj.success(obj.data.json);
    }
  };
  
  var button = document.getElementById("btn");
  button.addEventListener('click', function() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    addtoList(name, email);
  
  });
  
  //Validating and calling the Ajax function to add to list.
  function addtoList(name, email) {
    clearErrors();
    var inValid = false;
    if (!name || name.trim() === "") {
      addtoError("Please enter a Name");
      document.getElementById("name").classList.add("errorBorder");
      inValid = true;
    }
    if (!email || email.trim() === "") {
      addtoError("Please enter a Email");
      document.getElementById("email").classList.add("errorBorder");
      inValid = true;
  
    }else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
    document.getElementById("email").classList.add("errorBorder");
      addtoError("Please enter Email in correct format (a@a.com)");
       inValid = true;;
    }
    if(!inValid){
    document.getElementById("name").classList.remove("errorBorder");
    document.getElementById("email").classList.remove("errorBorder");
    addUser(name, email, dataHandler);
    }
  }
  
  //Clearing the error messages.
  function clearErrors() {
    document.getElementById("errors").innerHTML = '';
  }
  
  //Call back function after getting data from Ajax service.
  function dataHandler(data) {
    var response = JSON.parse(data);
    clearErrors();
    if (response && response.error && response.error !== "") {
      addtoError(response.error);
    } else {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      createNewUser(response.user);
    }
  }
  
  
  //Adding user to list if response is successful.
  function createNewUser(userObj) {
    var node = document.createElement("LI");
    var innerElement = document.createTextNode(userObj.username + ' (' + userObj.email + ')');
    node.appendChild(innerElement);
    document.getElementById("users").appendChild(node);
  }
  
  //Adding Errors to display to user.
  function addtoError(error) {
    var node = document.createElement("P");
    var innerElement = document.createTextNode(error);
    node.appendChild(innerElement);
    document.getElementById("errors").appendChild(node);
  }
  
  
  
  
  
  
  
  
  
  // ===================== END YOUR CODE HERE =====================
  
  
  
  
  // Do not modify this function. Add user service wrapper.
  function addUser(username, email, callback) {
    var response,
      success = (!!Math.round(Math.random()));
  
    if (!success) {
      response = JSON.stringify({
        success: success,
        error: "Oops, something went wrong!"
      });
    } else {
      response = JSON.stringify({
        success: success,
        user: {
          username: username,
          email: email
        }
      });
    }
  
    $.ajax({
      url: '/echo/json/',
      type: "post",
      data: {
        json: response
      },
      success: callback
    });
  };