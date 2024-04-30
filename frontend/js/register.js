const myInput = document.getElementById('registerPassword');
const letter = document.getElementById('letter');
const capital = document.getElementById('capital');
const number = document.getElementById('number');
const length = document.getElementById('length');

function forLogin() {
    window.location.href = '/';
}

// Amikor beleklikkelünk a jelszó mezőbe, akkor megjelenik a message id-jű div
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

// Amikor nem vagyunk a jelszó mezőben, akkor eltűnik a message id-jű div
myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
}

myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}

document.getElementById('registerForm').onsubmit = function (event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const password2 = document.getElementById('registerPassword2').value;

    if (!email || !username || !password || !password2) {
        alert("Minden mezőt ki kell tölteni te balga!");
        return;
    }

    if (password.length < 8) {
        alert('A jelszónak legalább 8 karakter hosszúnak kell lenni te csacsi!');
        return;
    }

    if (password !== password2) {
        alert('A két jelszó nem egyezik meg te butus!');
        return;
    }

    reg(email, username, password);
}

// itt történik a tényleges regisztráció
async function reg(email, username, password) {

    const res = await fetch('/reg', {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })

    const data = await res.json();

    if (res.ok) {
       return alert(JSON.stringify(data));
    } else {
        return alert(JSON.stringify(data));
    }
}