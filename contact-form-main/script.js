const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const queryTypeInputs = document.querySelectorAll("input[name='query_type']");
const message = document.getElementById("message");
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

    const setSuccess = (input) => {
        const errorMsg = input.parentElement.querySelector(".error");

        if (errorMsg) {
            errorMsg.textContent = "";
        }

        input.parentElement.classList.add("valid");
        input.parentElement.classList.remove("invalid");
        input.style.borderColor = "var(--green-600)";
    };

    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidQueryType = () => {
        // queryTypeInputs.forEach((radio) => {
        if (queryTypeInputs[0].checked || queryTypeInputs[1].checked) {
            isValid = true;
            setSuccess(queryTypeInputs[0].parentElement.parentElement);
            setSuccess(queryTypeInputs[1].parentElement.parentElement);
            return true;
        } else {
            isValid = false;
            setError(
                queryTypeInputs[0].parentElement.parentElement,
                "Please select a query type"
            );
            setError(
                queryTypeInputs[1].parentElement.parentElement,
                "Please select a query type"
            );
            return false;
        }
        // });
    };

    const isValidConsent = () => {
        if (consent.checked) {
            isValid = true;
            setSuccess(consent.parentElement);
        } else {
            setError(
                consent.parentElement.nextElementSibling,
                "To submit the form, please consent to being contacted"
            );
        }
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

    if (isValidQueryType()) {
        isValid = true;
    } else {
        isValid = false;
    }

    if (message.value) {
        isValid = true;
        setSuccess(message);
    } else {
        isValid = false;
        setError(message, "This field is required");
    }

    if (isValidConsent()) {
        isValid = true;
    } else {
        isValid = false;
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
});
