require.config({
  paths: {
    "Q": "./bower_components/q/q",
    "jquery": "./bower_components/jquery/dist/jquery.min",
    "bootstrap": "./bower_components/bootstrap/dist/js/bootstrap",
    "handlebars": "./bower_components/handlebars/handlebars"
  },
  shim: {
    "bootstrap": {
      "deps": ["jquery"]
    },
    "handlebars": {
      exports: "Handlebars"
    }
  }
});

require(["Q", "jquery", "handlebars", "bootstrap"], function(Q, $, Handlebars) {
  $(window).ready(function(){
    //showing add reader form
    $("#add-reader").on("click", function(){
      $("#add-reader-modal").modal("show");
    });

    //managing the add reader input
    $("#is-student, #is-teacher").on("change", function() {
      if(this.id === "is-student") {
        //showing student input
        $("#student-input-container").append($("#student-input").html());
      } else {
        //clearing student input
        $("#student-input-container").empty();
      }
    });

    //resetting reader input form
    $("#add-reader-modal").on("hidden.bs.modal", function(){
      $("#add-reader-modal :input").val("");
      $("#reset-student-or-teacher").click();
      $("#student-input-container").empty();
    });


    function getStudentsData() {
    };
  });
});
