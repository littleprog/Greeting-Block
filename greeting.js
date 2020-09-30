
/*
The variables name, color and speed play an important role in determining appearance
and behavior of the greeting box if the user is an important guest. It will be
continually used when necessary to determine what the
appearance and behavior of the greeting box when the user enters the page
*/

//Create variable name that stores name of user
let name;
//Create variable speed that stores speed of box chosen by user
let speed;
//Create variable color that stores color of box chosen by user
let color;

/**
This function checks to see if there is a cookie with the name property;
If there is such a cookie, it will initialize the variable name with value of
the name property
Otherwise, it will prompt the user to enter his or her name
*/
(function() {
  //Create a variable cookie_field that stores a string "name"
  let cookie_field = "name";
  /*
  split the string object of cookie into an array based on the character ; and
  store it in variable cookie
  */
  let cookie = document.cookie.split(";");
  //for each element in the cookie array
  for (let part of cookie) {
    /*
    further split the string object into a smaller array based on the character
    = and store it in variable pieces
    */
    let pieces = part.split("=");
    //if any of the elements of part can be split into an array containing two elements
    if (pieces.length === 2) {
      //As long as there first element of pieces start with whitespace
      while (pieces[0][0] === " ") {
        //Remove the whitespace by taking the substring of the first element
        pieces[0] = pieces[0].substr(1);
      }
      //if the first element is the property name
      if (pieces[0] === cookie_field) {
        //then initialize the variable name with the value of the property name
        name = pieces[1];
      }
    }
  }
  //if the name is not initialized meaning this is the first time user come to
  //website
  if (name === undefined) {
    //Ask the user for his or her name
    name = prompt("What is your name?");
  }
})();

/**
This function makes an AJAX call for the file "important.txt", a file containing
the names of important people who will have access to more functionalities of
the website;
if the user's name is found in the "important.txt" or important guest list, he
will receive a greeting.
Otherwise he will not receive a greeting .
Based on profile of user, the greeting() or Nogreeting() will be called
*/
function read_text() {
  //Object to do Ajax with
  let xhttp = new XMLHttpRequest();
  /*
  variable fileContent that will store contents of "important.txt" when server
  returns the contents of that file
  */
  let fileContent;
  /*
  variable outcome is true if name of user can be found in important.txt fileContent
  and false if it cannot be found
  */
  let outcome = false;

  xhttp.onreadystatechange = function() {
    // when the operation is complete (readyState 4) and it is successful ( status 200)
    if (this.readyState === 4 && this.status === 200 ) {
      /*
      fileContent store contents of "important.txt" as a string object returned by
      server
      */
      fileContent = this.responseText;
      /*
      splits the string object of fileContent based on the new line character into an
      array and store it in variable text
      */
      let text = fileContent.split('\n');
      //Let the starting line number be O
      let lineNum = 0;
      //for each line in "important.txt" or index of the array text
      for (lineNum in text) {
        //if the line contains name of user
        if (text[lineNum].includes(name)) {
          //name of user can be found so outcome will be true
          outcome = true;
          //call the greeting for the user since he is an important guest
          greeting(name);
          //since we already found user no point in looping through the array
          break;
        }
      }
      //if the name of use cannot be found in the important.txt or the outcome is false
      if (outcome === false) {
        //then no greeting function will be called instead
        noGreeting();
      }
    }
  };
  //set GET request to read from the important.txt file, doing it 'asynchronously'
  xhttp.open("GET", "important.txt" + "?v=" + Math.random(), true);
  //send request to server
  xhttp.send();
}

/**
This function accepts the name of user and add elements into the webpage which
the user can interact with.
@param {string} name the name of the user
*/
function greeting(name) {
  //get the main element of the body of html page
  let main_body = document.getElementById("the_main");
  //Create a form element
  let form_body = document.createElement("form");
  //add the form element into the main element of the body
  main_body.appendChild(form_body);

  /*
  As we will later have a greeting box that can move and change its speed and color
  depending on the buttons(which we will also create in javascript) in real time
  without reloading of page we have to create arrays and functions that will
  enable such a desired outcome
  */

  //create a fieldset element for the speed buttons which user can adjust
  let speed_fieldset = document.createElement("fieldset");
  //add this fieldset element into the form element
  form_body.appendChild(speed_fieldset);
  /**
  This function checks to see if there is a cookie with the speed property;
  If there is such a cookie, it will initialize the variable speed with value of
  the speed property
  Otherwise, it will set a default value
  */
  (function() {
    //Create a variable cookie_field that stores a string "speed"
    let cookie_field = "speed";
    /*
    split the string object of cookie into an array based on the character ; and
    store it in variable cookie
    */
    let cookie = document.cookie.split(";");
    //for each element in the cookie array
    for (let part of cookie) {
      /*
      further split the string object into a smaller array based on the character
      = and store it in variable pieces
      */
      let pieces = part.split("=");
      //if any of the elements of part can be split into an array containing two elements
      if (pieces.length === 2) {
        //As long as there first element of pieces start with whitespace
        while (pieces[0][0] === " ") {
          //Remove the whitespace by taking the substring of the first element
          pieces[0] = pieces[0].substr(1);
        }
        //if the first element is the property speed
        if (pieces[0] === cookie_field) {
          //then initialize the variable speed with the value of the property speed
          speed = pieces[1];
        }
      }
    }
    //if the name is not initialized meaning this is the first time user come to
    //website
    if (speed === undefined) {
      //Then dafault value of speed will be speed0
      speed = "speed0"
    }
  })();

  /*
  Create an empty array speed_arr that will later be used to find out which button
  to check since we want to have the button the user last checked on the page
  when user returns to the page
  */
  let speed_arr = [];
  //We have 51 buttons but since we start at 0 51-1 = 50
  let number_speed_buttons = 50;
  //for each speed button
  for (let i = 0; i <= number_speed_buttons; ++i) {
    //the value will be speed + i; e.g. value of the speed 0 is speed0
    speed_arr[i] = "speed"+i;
  }


  /*
  create an array contain all the different possible colors for the greeting box
  Also helps us determine which color button user last checked so that the button
  will be checked when the user returns to the page
  */
  let color_arr = ["red", "yellow", "blue"];
  /**
  This function checks to see if there is a cookie with the color property;
  If there is such a cookie, it will initialize the variable color with value of
  the color property
  Otherwise, it will set a default value
  */
  (function() {
    //Create a variable cookie_field that stores a string "speed"
    let cookie_field = "color";
    /*
    split the string object of cookie into an array based on the character ; and
    store it in variable cookie
    */
    let cookie = document.cookie.split(";");
    //for each element in the cookie array
    for (let part of cookie) {
      /*
      further split the string object into a smaller array based on the character
      = and store it in variable pieces
      */
      let pieces = part.split("=");
      //if any of the elements of part can be split into an array containing two elements
      if (pieces.length === 2) {
        //As long as there first element of pieces start with whitespace
        while (pieces[0][0] === " ") {
          //Remove the whitespace by taking the substring of the first element
          pieces[0] = pieces[0].substr(1);
        }
        //if the first element is the property color
        if (pieces[0] === cookie_field) {
          //then initialize the variable color with the value of the property color
          color = pieces[1];
        }
      }
    }
    //if the color is not initialized meaning this is the first time user come to
    //website
    if (color === undefined) {
      //Then dafault value of color will be red
      color = "red";
    }
  })();

  //for each speed button that will appear on the page
  for (let i = 0; i <= number_speed_buttons; ++i) {
    //it will have a label
    let radio_label =document.createElement("label");
    //label of button is "Speed " + i
    radio_label.innerHTML = "Speed " + i;
    //set the input the label is refering to
    radio_label.setAttribute("for", "spd" + i);
    //then add the label to the fieldset for speed buttons
    speed_fieldset.appendChild(radio_label);

    //it will also have an input element for user to input
    let radio_input = document.createElement("input");
    //which is a radio button
    radio_input.setAttribute("type", "radio");
    //has several attributes such as name, value and id
    radio_input.setAttribute("name", "speed");
    radio_input.setAttribute("value", "speed" + i);
    radio_input.setAttribute("id", "spd" + i);
    //if the index of this button gives a corresponding value in speed array
    //that is equal to speed which is either initalized by cookie or a default
    //value
    if (speed_arr[i] === speed) {
      //Then this particular radio button with this index will be checked when
      //user enter the page
      radio_input.checked = true;
    }
    //Add the radio button to the fieldset containing speed buttons and labels
    speed_fieldset.appendChild(radio_input);

    //if the index can be divided by 10 and less than number of number_speed_buttons
    // meaning after every 10th radio button or after the first 0 button
    if (i % 10 === 0 && i !== number_speed_buttons) {
      //Create a break line element and add it to the speed fieldset
      let break_line = document.createElement("br");
      speed_fieldset.appendChild(break_line);
    }

  }

  //create a fieldset element for the color buttons which user can adjust
  let color_fieldset = document.createElement("fieldset");
  //add this fieldset element into the form element
  form_body.appendChild(color_fieldset);

  //for each color button that will appear on the page
  for (let i = 0; i < color_arr.length; ++i) {
    //Create a label for color button
    let color_label =document.createElement("label");
    //which will be "red" or "blue or "yellow"
    color_label.innerHTML = color_arr[i];
    //set the input the label is refering to
    color_label.setAttribute("for", color_arr[i]);
    //then add the label to the fieldset for color buttons
    color_fieldset.appendChild(color_label);

    //it will also have an input element for user to input
    let color_input = document.createElement("input");
    //which is a radio button
    color_input.setAttribute("type", "radio");
    //has several attributes such as name, value and id
    color_input.setAttribute("name", "color");
    color_input.setAttribute("value", color_arr[i]);
    color_input.setAttribute("id", color_arr[i]);
    //if the index of this button gives a corresponding value in color_arr
    //that is equal to color which is either initalized by cookie or a default
    //value
    if (color_arr[i] === color) {
      //then check this particular button
       color_input.checked = true;
    }
    //Add the radio input element to the fieldset for color buttons
    color_fieldset.appendChild(color_input);
  }

  /*
  Now we will have the last fieldset that contains the area where the greeting
  box will move and the greeting box itself
  */

  //Create a fieldset for which will be the area where greeting box will move
  let container = document.createElement("fieldset");
  //set its position to relative so that we can adjust the greeting box according the container
  container.style.position = "relative";
  //set its height and width which the box of container
  container.style.height = "200px";
  container.style.width= "1420px";
  /*
  set padding, margin and border to zero since we want box to be able to touch the
  left and right ends of the box
  */
  container.style.margin = "0px";
  container.style.border = "0px";
  container.style.padding = "0px";
  //set its color to gray
  container.style.backgroundColor = "gray";
  //add the container for greeting box into the form
  form_body.appendChild(container);

  //Create a greeting box through div element
  let greeting_box = document.createElement("div");
  //Give it an id of "greeting_box"
  greeting_box.id = "greeting_box";
  //set its position to absolute so that it can be adjusted relative to container
  greeting_box.style.position = "absolute";
  //set it to be positioned below the top of the box by 25% of the height of container
  greeting_box.style.top = "25%";
  //set it to be positioned from the left side of box by 0% of the width of container
  greeting_box.style.left = "0%";
  //set the dimensions of the container
  greeting_box.style.width = "200px";
  greeting_box.style.height = "100px";
  //set color of box to be color which is either initialzied by cookie or given a default value
  greeting_box.style.backgroundColor = color;
  //Remove padding of greeting box
  greeting_box.style.padding = "0px";
  //Align any text in the greeting box to the center
  greeting_box.style.textAlign = "center";
  //Add text in the greeting box which includes the name of user initialized by cookie or user himself
  greeting_box.innerHTML = "<b>Welcome " + name + "</b>";
  //Add the greeting_box into the fieldset for the greeting box
  container.appendChild(greeting_box);
}

//set it to be positioned below the top of the box by 25% of the height of container
function noGreeting() {
  //get the main element of the body of html page
  let main_body = document.getElementById("the_main");
  //create a new paragraph
  let new_p = document.createElement("p");
  //which has the text
  new_p.innerHTML = "No greeting for you!";
  //add the paragraph element to the main element
  main_body.appendChild(new_p);
}

//call the read_text function to create all the elements on page and ensure the righ values are initialized
read_text();

//when the window loads and the DOM elements are ready
 window.onload = function() {
   /*
   user_speed and user_color variables will be paramount in the creating of cookies
   used in the makeCookie()
   */
  //Create user_speed variable
  let user_speed;
  //Create user_color variable
  let user_color;
  //Create a variable left that initialized to 0

  let left = 0;
  //For each second call the setRight function
  let right_interval_id = setInterval(goRight, 1000);
  /*
  Create a variable left_interval_id that stores id of the interval when greeting
  box moves right
  */
  let left_interval_id;

  /**
  This function deals with speed and color of the greeting box when it moves to
  the right
  */
  function goRight() {
    //Get the greeting box by its id
    let greeting_box = document.getElementById("greeting_box");
    /*
    call the adjust_color() to see if user check any other color buttons and then
    change color of box accordingly
    */
    greeting_box.style.backgroundColor = adjustColor();

    //Create a variable speed_multiplier
    let speed_multiplier = 10;
    /*
    Calls the adjustDistance() to see if user check any other speed buttons and
    change the speed greeting box is moving. The distance the box if moving will
    be multplied by the speed_multiplier and the value will stored into adjustedDistance
    variable which will be the distance the box will move in pixels
    */
    let adjustedDistance = adjustDistance()*speed_multiplier;
    /*
    The variable right bound is the maximum distance the box should travel.
    This is obtained from the subtracting the width of the greeting box from
    the width of the container
    */
    let right_bound = 1220;
    /*
    if the sum of the distance from the left side of the container from the
    greeting box and the distance of the box should travel is greater than the
    distance it should travel from the left
    */
    if ((left + adjustedDistance) > right_bound){
      //set left to be the furtherest possible distance from the left of container
      left = right_bound;
    }
    else {
      //Otherwise increase left by adjustedDistance
      left = left + adjustedDistance;
    }
    //Move the box to the right by setting it some distance from left of container
    greeting_box.style.left = left + "px";
    /*
    Calls the makeCookie function that will make the cookies for the properties
    name, speed and color
    */
    makeCookie();
    //if left is equal to or greater than the right_bound
    if ( left >= right_bound) {
      //clear the interval that  makes the greeting box go right
      clearInterval(right_interval_id);
      //instead makes it go left by calling goLeft() every second
      left_interval_id = setInterval(goLeft, 1000);
    }
  }
  /**
  This function deals with speed and color of the greeting box when it moves to
  the left, similar to the goRight()
  */
  function goLeft() {
    //Get the greeting box by its id
    let greeting_box = document.getElementById("greeting_box");
    /*
    call the adjust_color() to see if user check any other color buttons and then
    change color of box accordingly
    */
    greeting_box.style.backgroundColor = adjustColor();

    //Create a variable speed_multiplier
    let speed_multiplier = 10;
    /*
    Calls the adjustDistance() to see if user check any other speed buttons and
    change the speed greeting box is moving. The distance the box if moving will
    be multplied by the speed_multiplier and the value will stored into adjustedDistance
    variable which will be the distance the box will move in pixels
    */
    let adjustedDistance = adjustDistance()*10;
    /*
    Calls the makeCookie function that will make the cookies for the properties
    name, speed and color
    */
    makeCookie();
    /*
    if the distance from the left of container will be negative after subtracting
    adjustedDistance
    */
    if ((left - adjustedDistance) < 0) {
      //set left to 0
      left = 0;
    }
    //otherwise
    else {
      //decrease left by adjustedDistance
      left = left - adjustedDistance;
    }
    /*
    Move the greeting box to the right by setting the distance from the left
    of the container
    */
    greeting_box.style.left = left + "px";
    //if greeting_box is at the left end of the container
    if ( left <= 0) {
      //clear the interval that makes the greeting box go right
      clearInterval(left_interval_id);
      //instead makes it go left by calling goLeft() every second
      right_interval_id = setInterval(goRight, 1000);
    }
  }


  /*
  This function adjusts the distance the greeting box will travel based on the speed
  button the user checks by returning the index of the input element the in the
  array of tagNames that contain all input elements

  @return {Number} the index of the button that is checked
  */
  function adjustDistance() {
    //Create a variable distamce
    let distance;
    //Get the array containing all elements with the tag name input
    let speed_arr = document.getElementsByTagName("input");
    //Create a variable number_speed_buttons
    let number_speed_buttons = 50;
    //for each input element from the 0th index to the 50th index
    for (let i =0; i <= number_speed_buttons; ++i) {
      //if the input element at a particular index is checked
      if (speed_arr[i].checked) {
        //set the distance box will move by the index
        distance = i;
        //initialize user speed with the value of that input
        user_speed = speed_arr[i].value;
        break;
      }
    }
    //return the index of the button that is checked
    return distance;
  }

  /*
  This function adjusts the color of the greeting box based on which input color
  buttons that user checks

  @return {String} the color the user checks
  */
  function adjustColor() {
    //Create a variable color
    let color;
    //Get the array containing all elements with the tag name input
    let color_arr = document.getElementsByTagName("input");
    //color red index in the color_arr starts is 51
    let color_red_index = 51;
    //color yellow index in the color_arr is 52
    let color_yellow_index = 52
    //color blue index in the color_arr is 52
    let color_blue_index = 53;

    //for each element from the color_red_index to the color_blue_index in color_arr
    for (let i = color_red_index; i <= color_blue_index; ++i) {
      //if the input is checked and has the index of th color red
      if (color_arr[i].checked && i === color_red_index) {
        //color will be "red"
        color = "red";
        //stores the value of the input in user_color
        user_color = color_arr[i].value;
      }
      //if the input is checked and has the index of the color yellow
      else if (color_arr[i].checked && i === color_yellow_index) {
        //color will be "yellow"
        color = "yellow";
        //stores the value of the input in user_color
        user_color = color_arr[i].value;
      }
      //if the input is checked and has the index of the color blue
      else if (color_arr[i].checked && i === color_blue_index) {
        //color will be "blue"
        color = "blue";
        //stores the value of the input in user_color
        user_color = color_arr[i].value;
      }
    }
    //returns the color which the user inputs
    return color;
  }

  /*
  This function creates cookies that remembers what the user last inputs were
  and if user were to return to page before the cookie expires, the user will see
  his or her last inputs in previous session
  */
  function makeCookie() {
    //create a variable cookie_name that stores name property
    let cookie_name = "name=" + name + ";";
    //Get the array containing all elements with the tag name input
    let speed_arr = document.getElementsByTagName("input");
    //Create a variable number_speed_buttons
    let number_speed_buttons = 50;
    //for each input element from the 0th index to the 50th index
    for (let i =0; i <= number_speed_buttons; ++i) {
      //if the input element at a particular index is checked
      if (speed_arr[i].checked) {
        //initialize user speed with the value of that input
        user_speed = speed_arr[i].value;
        break;
      }
    }
    //create a variable cookie_name that stores speed property
    let cookie_speed = "speed=" + user_speed + ";";

    //Get the array containing all elements with the tag name input
    let color_arr = document.getElementsByTagName("input");
    //color red index in the color_arr starts is 51
    let color_red_index = 51;
    //color yellow index in the color_arr is 52
    let color_yellow_index = 52
    //color blue index in the color_arr is 52
    let color_blue_index = 53;

    //for each element from the color_red_index to the color_blue_index in color_arr
    for (let i = color_red_index; i <= color_blue_index; ++i) {
      //if the input is checked and has the index of the color red
      if (color_arr[i].checked === true && i === color_red_index) {
        //stores the value of the input in user_color
        user_color = color_arr[i].value;
      }
      //if the input is checked and has the index of the color yellow
      else if (color_arr[i].checked === true  && i === color_yellow_index) {
        //stores the value of the input in user_color
        user_color = color_arr[i].value;
      }
      //if the input is checked and has the index of the color blue
      else if (color_arr[i].checked === true && i === color_blue_index) {
        //stores the value of the input in user_color
        user_color = color_arr[i].value;
      }
    }
    //create a variable cookie_name that stores color property
    let cookie_color = "color=" + user_color + ";";

    //Create a variabel now that is refers to the current time object
    let now = new Date();
    //Create a variable expires that refers to now
    let expires = now;
    //Set expires date to be ten seconds from now
    expires.setSeconds(expires.getSeconds() + 10);
    //Create variable cookie_expires that stores the date of expiry for cookies
    let cookie_expires = "expires=" + expires.toUTCString() + ";";
    //Create variable cookie_expires that stores the location of cookie
    let cookie_path = "path=" + window.location.pathname;

    //Create cookies for the name, speed and color properties
    document.cookie = cookie_name + cookie_expires + cookie_path;
    document.cookie = cookie_speed + cookie_expires + cookie_path;
    document.cookie = cookie_color + cookie_expires + cookie_path;
  }
}
