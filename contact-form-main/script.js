const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const queryTypeInputs = document.querySelectorAll("input[name='query_type']");
const message = document.getElementById("message");
const consent = document.getElementById("consent");
const submitBtn = document.getElementById("submit-btn");
const submitted = document.getElementById("success-msg");
const messageSent = document.getElementById("message-sent");
const form = document.getElementById("form");

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
        queryTypeInputs[0].parentElement.style.borderColor = "var(--green-600)";
        queryTypeInputs[1].parentElement.style.borderColor = "var(--green-600)";
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
};

const isValidConsent = () => {
    if (consent.checked) {
        setSuccess(consent.parentElement);

        return true;
    } else {
        setError(
            consent.parentElement.nextElementSibling,
            "To submit the form, please consent to being contacted"
        );
        return false;
    }
};

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let isValid = true;

    // Check each input
    if (fname.value.trim()) {
        setSuccess(fname);
    } else {
        isValid = false;
        setError(fname, "This field is required");
    }

    if (lname.value.trim()) {
        setSuccess(lname);
    } else {
        isValid = false;
        setError(lname, "This field is required");
    }

    if (email.value.trim()) {
        if (isValidEmail(email.value)) {
            setSuccess(email);
        } else {
            isValid = false;
            setError(email, "Please enter a valid email address");
        }
    } else {
        isValid = false;
        setError(email, "This field is required");
    }

    if (!isValidQueryType()) {
        isValid = false;
    }

    if (message.value.trim()) {
        setSuccess(message);
    } else {
        isValid = false;
        setError(message, "This field is required");
    }

    if (!isValidConsent()) {
        isValid = false;
    }

    // If valid, call success function
    if (isValid) {
        submittedSuccessfully();
    }
});

const submittedSuccessfully = () => {
    let iconElem = document.createElement("img");
    iconElem.src = "./assets/images/icon-success-check.svg";
    messageSent.appendChild(iconElem);
    submitted.style.backgroundColor = "var(--grey-900)";
    let span = document.createTextNode("Message Sent!");
    messageSent.appendChild(span);

    let description = document.createTextNode(
        "Thanks for completing the form. We'll be in touch soon!"
    );
    submitted.appendChild(description);

    consent.nextElementSibling.textContent =
        "I hereby consent to being contacted by the team *";

    const inputs = [fname, lname, email, message];

    inputs.forEach((input) => {
        input.value = "";
    });

    queryTypeInputs.forEach((choices) => {
        choices.checked = false;
    });

    consent.checked = false;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    submittedSuccessfully();
});
