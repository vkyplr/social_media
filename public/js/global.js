$(() => {
  $("#register-form").validate({
    rules: {
      first_name: "required",
      last_name: "required",
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 6
      },
      conf_pass: {
        required: true,
        equalTo: "#password"
      }
    },
    messages: {
      first_name: "Please enter first name",
      last_name: "Please enter last name",
      email: {
        required: "Please enter email",
        email: "Please enter a valid email"
      },
      phone: {
        required: "Please enter Phone number",
        number: "Please enter a valid Phone Number",
        minlength: "phone should be 10 digits long",
        maxlength: "phone should be only 10 digits"
      },
      password: {
        required: "Please enter password",
        minlength: "Password Should be minimum 6 characters"
      },
      conf_pass: {
        required: "Please re-enter password",
        equalTo: "Password do not match"
      }
    }
  });

  $("#login-form").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: "required"
    },
    messages: {
      email: {
        required: "Please enter email",
        email: "Please enter a valid email"
      },
      password: "Please enter password"
    }
  });

  $("#profile").validate({
    rules: {
      first_name: "required",
      last_name: "required",
      phone: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10
      }
    },
    messages: {
      first_name: "Please enter first name",
      last_name: "Please enter last name",
      phone: {
        required: "Please enter Phone number",
        number: "Please enter a valid email",
        minlength: "phone should be 10 digits long",
        maxlength: "phone should be only 10 digits"
      }
    }
  });

  $("#password-form").validate({
    rules: {
      password: {
        required: true,
        minlength: 6
      },
      conf_pass: {
        required: true,
        equalTo: "#password"
      }
    },
    messages: {
      password: {
        required: "Please enter password",
        minlength: "Password Should be minimum 6 characters"
      },
      conf_pass: {
        required: "Please re-enter password",
        equalTo: "Password do not match"
      }
    }
  });
});
