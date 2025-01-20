const inputslider = document.querySelector(".data-lengthsliders");
const lengthdisplay = document.querySelector(".data-length");
const datapasworddisplay = document.querySelector(".displaypass");
const copybutton = document.querySelector(".copy-button");
const copymessage = document.querySelector(".copy-message");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbol = document.querySelector("#symbol");
const dataindicator = document.querySelector(".data-indicator");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const generatedbutton = document.querySelector(".passwordbutton");
const symbols = '~!@#$%^&*_-{[}]:;.?/"';


let passwordlength = inputslider.value;
let paswoordval = "";
let countslide = 0;

function handleslider() {
    inputslider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
}
handleslider();

inputslider.addEventListener('input', function() {
    passwordlength = inputslider.value;
    handleslider();
});

function setindicator(color) {
    dataindicator.style.backgroundColor = color;
    dataindicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getrndint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generatenum() {
    return getrndint(0, 9); 
}

function getnumlower() {
    return String.fromCharCode(getrndint(97, 122)); 
}

function getnumupper() {
    return String.fromCharCode(getrndint(65, 90));
}

function getsymbol() {
    const randnum = getrndint(0, symbols.length);
    return symbols.charAt(randnum); 
}

function calcstrength() {
    let numstst = false;
    let upperstst = false;
    let lowerstst = false;
    let symbollstst = false;
    
    if (uppercase.checked) upperstst = true;
    if (lowercase.checked) lowerstst = true;
    if (numbers.checked) numstst = true;
    if (symbol.checked) symbollstst = true;

    if (upperstst && lowerstst && (numstst || symbollstst) && passwordlength >= 8) {
        setindicator("#0f0"); 
    } else if (upperstst || lowerstst && numstst || symbollstst && passwordlength >= 6) {
        setindicator("#ff0"); 
    } else {
        setindicator("#f00"); 
    }
}

async function copytetxs() {
    try {
        await navigator.clipboard.writeText(datapasworddisplay.value);
        copymessage.innerText = "Copied!";
    } catch (e) {
        copymessage.innerText = "Failed!";
    }
    copymessage.classList.add("active");
    setTimeout(() => {
        copymessage.classList.remove("active");
    },3000);
}

copybutton.addEventListener('click', () => {
    if (datapasworddisplay.value) {
        copytetxs();
    }
});

function shufflepassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleboxchange() {
    countslide = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) countslide++;
    });
    if (passwordlength < countslide) {
        passwordlength = countslide;
        handleboxchange();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleboxchange);
});

generatedbutton.addEventListener('click', () => {
    if (countslide <= 0) {
        return; 
    }

    if (passwordlength <= countslide) {
        passwordlength = countslide;
        handleboxchange();
    }

    paswoordval = "";
    let ansarray = [];

    if (uppercase.checked) ansarray.push(getnumupper);
    if (lowercase.checked) ansarray.push(getnumlower);
    if (symbol.checked) ansarray.push(getsymbol);
    if (numbers.checked) ansarray.push(generatenum);

    for (let i = 0; i < passwordlength - ansarray.length; i++) {
        let randindex = getrndint(0, ansarray.length);
        paswoordval += ansarray[randindex]();
    }

    paswoordval = shufflepassword(Array.from(paswoordval));
    datapasworddisplay.value = paswoordval;
    calcstrength();
});

