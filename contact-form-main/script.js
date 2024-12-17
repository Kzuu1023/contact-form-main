const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
let genInquiry = document.getElementById("inquiry");
let reqSupport = document.getElementById("request");
const messages = document.getElementById("message");
const consent = document.getElementById("consent");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("form");

submitBtn.addEventListener("click", function () {
    let isValid = true;

    const setError = (input, message) => {
        const errorMsg = input.parentElement.querySelector(".error");

        if (errorMsg) {
            errorMsg.textContent = message;
        }

        input.parentElement.classList.add("invalid");
        input.parentElement.classList.remove("valid");
        input.style.borderColor = "var(--red)";
    };

    const setSuccess = (input, message) => {
        const errorMsg = input.parentElement.querySelector(".error");

        if (errorMsg) {
            errorMsg.textContent = message;
        }
        input.parentElement.classList.add("valid");
        input.parentElement.classList.remove("invalid");
        input.style.borderColor = "var(--green-600)";
    };

    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    if (fname.value) {
        setSuccess(fname);
    } else {
        isValid = false;
        setError(fname, "This field is required");
    }

    if (lname.value) {
        setSuccess(lname);
    } else {
        isValid = false;
        setError(lname, "This field is required");
    }

    if (!email.value) {
        isValid = false;
        setError(email, "This field is required");
    } else if (!isValidEmail(email.value)) {
        setError(email, "Please enter a valid email address");
    } else {
        setSuccess(email);
    }

    if (!genInquiry.value) {
        isValid = false;
        setError(genInquiry, "Please select a query type");
    } else {
        setSuccess(genInquiry);
    }

    if (!reqSupport.value) {
        isValid = false;
        setError(reqSupport, "Please select a query type");
    } else {
        setSuccess(reqSupport);
    }

    if (!messages.value) {
        isValid = false;
        setError(messages, "This field is required");
    } else {
        setSuccess(messages);
    }

    if (consent.checked) {
        setSuccess(consent);
    } else {
        isValid = false;
        setError(
            consent,
            "To submit the form, please consent to being contacted"
        );
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
});
