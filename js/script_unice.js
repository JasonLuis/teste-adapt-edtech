// slide interativo

function toggleActiveBoxElement(target) {
    var parent = target.parentElement.parentElement;
    var siblings = target.parentElement.children;
    var newIndex = 0;

    for (var i = 0; i < siblings.length; i++) {
        if (target == siblings[i]) {
            newIndex = i;
            break;
        }
    }

    parent.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
    });

    parent.querySelector(`.buttons`).children[newIndex]?.classList.add("active");
    parent.querySelector(`.content`).children[newIndex]?.classList.add("active");
}

//carrossel

//Select the buttons
let prev, next, items, count, tracker, limit;

limit = document.querySelectorAll(".card").length;

//Action for Next button
function moveCardsLeft() {
    //'Count' controls the distnace for each card push and can be adjusted by changing the integer subtracted from the variable below.
    //The tracker keeps track of the index while the next and prev buttons are being clicked.
    count = count - 360;
    tracker++;
    items[tracker].style.setProperty("opacity", 1);
    items[tracker - 1].style.setProperty("opacity", 0.3);

    //Disables buttons after cards reach a specified distance. Number of clicks can be adjusted by changing the integers in the if statements. ie. changing the '0' to '-1' allows the user to click back one additional time before disabling the 'prev' button.
    if (tracker <= 0) {
        prev.setAttribute("disabled", "");
        prev.classList.add("disabled-btn");
    } else {
        prev.removeAttribute("disabled");
        prev.classList.remove("disabled-btn");
    }
    if (tracker === limit - 1) {
        next.setAttribute("disabled", "");
        next.classList.add("disabled-btn");
    } else {
        next.removeAttribute("disabled");
        next.classList.remove("disabled-btn");
    }
    //Pushes cards based on 'count'.
    const cards = document.querySelectorAll(".card");
    cards.forEach(function (el, i, arr) {
        el.style.transform = `translateX(${count}px)`;
    });
}
//Action for Prev button
function moveCardsRight() {
    count = count + 360;
    tracker--;
    items[tracker].style.setProperty("opacity", 1);
    items[tracker + 1].style.setProperty("opacity", 0.3);
    console.log(tracker);
    if (tracker <= 0) {
        prev.setAttribute("disabled", "");
        prev.classList.add("disabled-btn");
    } else {
        prev.removeAttribute("disabled");
        prev.classList.remove("disabled-btn");
    }
    if (tracker === limit - 1) {
        next.setAttribute("disabled", "");
        next.classList.add("disabled-btn");
    } else {
        next.removeAttribute("disabled");
        next.classList.remove("disabled-btn");
    }
    const cards = document.querySelectorAll(".card");
    cards.forEach(function (el, i, arr) {
        el.style.transform = `translateX(${count}px)`;
    });
}

function initCarousel() {
    //Select the buttons
    prev = document.querySelector(".prev");
    next = document.querySelector(".next");
    items = document.querySelectorAll(".card");

    //Set counter for setting distance for cards to move on each click
    count = 0;
    //Set tracker to keep track of where the controls and cards are in relation to the card container
    tracker = 0;

    items[0].style.setProperty("opacity", 1);
    prev.classList.add("disabled-btn");

    //Event listeners to slide the cards.
    prev.addEventListener("click", () => {
        moveCardsRight();
    });
    next.addEventListener("click", () => {
        moveCardsLeft();
    });
}

window.addEventListener(`load`, initCarousel);
