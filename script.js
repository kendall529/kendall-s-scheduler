// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
    setInterval(() => {
      var today = dayjs();
       $('#currentDay').text(today.format('dddd, MMM D YYYY, h:mm:ss a'))
    }, 1000);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
    $('.saveBtn').click(function(event) {
      event.preventDefault();
      // this being the button and then connecting to the elements with the same parent
      // specifying the element with the class of 'description' and then getting the value
      // that will be entered at a later time
        var description = $(this).siblings('.description').val();
        console.log(description);
        var hour = $(this).parent().attr('id');
        console.log(hour);
      //
        localStorage.setItem(hour, description);
    for(var i = 0; i < 12; i++) {
      var timeSlot = $('#hour-' + i + ' .description');

      // console.log('#hour-' + [i] + ' .description');

      timeSlot.val(localStorage.getItem(hour));
    }
    });

    

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function blockColor() {
    var currentHour = dayjs().format('H')

    console.log(currentHour);

      $('.time-block').each(function() {
    // the slice removes the first 5 character which are 'hour-' from the id
    // this leaves whatever number was left over and then parseInt turns the string into an integer      
       var timeSlot = parseInt(this.id.slice(5));
       console.log(timeSlot);  
       
       if(currentHour < timeSlot) {
        $(this).addClass('future');
        $(this).removeClass('present');
        $(this).removeClass('past');
       }
       else if (currentHour == timeSlot) {
        $(this).addClass('present');
        $(this).removeClass('future');
        $(this).removeClass('past');
       }
       else {
        $(this).addClass('past');
        $(this).removeClass('present');
        $(this).removeClass('future');
       }
      });
  }

  blockColor();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
