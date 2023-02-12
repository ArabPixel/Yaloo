function createToast(heading = "No heading", message = "No message") {
    //Create empty variable for toasts container
    let container;
    //If container doesn't already exist create one
    if (!document.querySelector("#toast-holder")) {
      container = document.createElement("div")
      container.setAttribute("id", "toast-holder");
      document.body.appendChild(container);
    } else {
      // If container exists asign it to a variable
      container = document.querySelector("#toast-holder");
    }
    
    //Create our toast HTML and pass the variables heading and message
    let toast = `<div class="single-toast fade-in">
                    <div class="toast-header">
                      <span class="toast-heading">${heading}</span>
                      <a href="#" class="close-toast">X</a>
                    </div>
                    <div class="toast-content">
                      ${message}
                    </div>
                 </div>`;
                 
    // Once our toast is created add it to the container
    // along with other toasts
    container.innerHTML += toast;
    
     
      //Save all those close buttons in one variable
      let toastsClose = container.querySelectorAll(".close-toast");
    
    //Loop thorugh that variable
    for(let i = 0; i < toastsClose.length; i++) {
        //Add event listener
      toastsClose[i].addEventListener("click", removeToast,false);
    }
    
  }
  
  function removeToast(e) {
    //First we need to prevent default
    // to evade any unexpected behaviour
    e.preventDefault();
    
    //After that we add a class to our toast (.single-toast)
    e.target.parentNode.parentNode.classList.add("fade-out");
    
    //After CSS animation is finished, remove the element
    setTimeout(function() {
      e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
   
       
      if (isEmpty("#toast-holder")) {
          console.log(isEmpty("#toast-holder"));
          document.querySelector("#toast-holder").parentNode.removeChild(document.querySelector("#toast-holder"));
      }
    }, 500);
  }
  function isEmpty(selector) {
      return document.querySelector(selector).innerHTML.trim().length == 0;
  }
  createToast();
  createToast("This is heading", "This is the message");