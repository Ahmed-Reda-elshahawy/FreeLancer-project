// check if the local storage is empty //
// change color //
if (localStorage.getItem("colorOption") !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("colorOption"));
    document.querySelectorAll(".colors-list li").forEach((li) => {
        li.classList.remove("active");
        if (li.dataset.color == localStorage.getItem("colorOption")) {
            li.classList.add("active");
        }
    });
}


// change landing //
let landPage = document.querySelector(".landing");
let arrOfImges = ["land2.jpg", "land3.jpg", "land10.jpg"];
let changeBg = true;
let imgSlider;

if (localStorage.getItem("bgChangeState") !== null) {
    if (localStorage.getItem("bgChangeState") == "true") {
        changeBg = true;
    }
    else {
        changeBg = false;
    }
    document.querySelectorAll(".options span").forEach((span) => {
        span.classList.remove("active");
    });
    if (localStorage.getItem("bgChangeState") == "true") {
        document.querySelector(".options .yes").classList.add("active");
    }
    else {
        document.querySelector(".options .no").classList.add("active");
    }
}

function bgChange() {
    if (changeBg) {
        imgSlider = setInterval(() => {
            let randomImg = Math.floor(Math.random() * arrOfImges.length);
            landPage.style.backgroundImage = `url("../images/${arrOfImges[randomImg]}")`;
        }, 11000)
    }
    else {
        clearInterval(imgSlider);
    }
}
bgChange();


// setting-box //
let settingBox = document.querySelector(".setting-box");
let sIcon = document.querySelector(".setting-box .toggole-icon .s-icon");

sIcon.onclick = function () {
    this.classList.toggle("fa-spin");
    settingBox.classList.toggle("open");
};


// change colors of the page //
let colorsList = document.querySelectorAll(".colors-list li");
colorsList.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem("colorOption", e.target.dataset.color);
        handelActiveClass(e);
    });
});


// change backgrounds of the page //
let options = document.querySelectorAll(".Random-background .options span");
options.forEach(span => {
    span.addEventListener("click", (e) => {
        handelActiveClass(e);

        if (e.target.dataset.state == "yes") {
            changeBg = true;
            bgChange();
            localStorage.setItem("bgChangeState", true);
        }
        else {
            changeBg = false;
            bgChange();
            localStorage.setItem("bgChangeState", false);
        }
    })
});


// Our skills animation //
let ourSkills = document.querySelector(".our-skills");

document.onscroll = function () {
    // let ofstop = ourSkills.offsetTop;
    // let ofsh = ourSkills.offsetHeight;
    // let winh = this.innerHeight;
    // let pageYO = this.pageYOffset;
    if (window.scrollY > 700) {
        let skills = document.querySelectorAll(".our-skills .skills .skill-box .skill-progress span");
        skills.forEach((skill) => {
            skill.style.width = skill.dataset.width;
        });
    }
};


// our gallery add overlay and popub //
let ourImgs = document.querySelectorAll(".img-div img");

ourImgs.forEach((img) => {
    img.addEventListener("click", () => {
        // overlay
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);
        //popub
        let popubBox = document.createElement("div");
        popubBox.className = "popub-box";
        if (img.alt !== "") {
            let popubTitle = document.createElement("h3");
            let popubTitleText = document.createTextNode(img.alt)
            popubTitle.appendChild(popubTitleText);
            popubBox.appendChild(popubTitle);
        }
        let popubImg = document.createElement("img");
        popubImg.src = img.src;
        popubBox.appendChild(popubImg);
        // create X span //
        let xSpan = document.createElement("span");
        xSpan.className = "popub-out";
        let xTxt = document.createTextNode("X");
        xSpan.appendChild(xTxt);
        popubBox.appendChild(xSpan);

        document.body.appendChild(popubBox);
    })
})

document.addEventListener("click", (e) => {
    if (e.target.className == "popub-out") {
        e.target.parentElement.remove();
        document.querySelector(".overlay").remove();
    }
})


// Controls Bullets  and links active class//
// ====================================== //
let bullets = document.querySelectorAll(".bullets .bullet");
let links = document.querySelectorAll(".landing .links li a");

// handel active class //
links.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        links.forEach((el) => {
            el.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});
// scroll to section of page //
function scrollToSection(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" });
        });
    });
}

scrollToSection(bullets);
scrollToSection(links);


// function to handel active class //
function handelActiveClass(e) {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
    });
    e.target.classList.add("active");
}


// control bullets on the bage //
let bulletOptions = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".bullets");
let lsBV = localStorage.getItem("bullets-state");

if (lsBV !== null) {
    bulletOptions.forEach((span) => {
        span.classList.remove("active");
    });
    if (lsBV === 'show') {
        bulletsContainer.style.display = "flex";
        document.querySelector(".bullets-option .B-options .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .B-options .no").classList.add("active");
    }
}

bulletOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        if (e.target.dataset.state === "show") {
            bulletsContainer.style.display = "flex";
            localStorage.setItem("bullets-state", 'show');
        }
        else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-state", 'hide');
        }
        handelActiveClass(e);
    });
});


// Reset botton //
let rBtn = document.querySelector(".setting-box .reset-option");
rBtn.onclick = function () {
    localStorage.clear();
    // anthor way
    // localStorage.removeItem("colorOption");
    // localStorage.removeItem("bgChangeState");
    // localStorage.removeItem("bullets-state");
    window.location.reload();
}


// Add class open and menu-open //
let linksMenu = document.querySelector(".links");
let toggleBtn = document.querySelector(".head-icon");
let aLinks = document.querySelectorAll(".links li a");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    linksMenu.classList.toggle("open");
    this.classList.toggle("menu-open");
}
linksMenu.onclick = function (e) {
    e.stopPropagation();
}
document.addEventListener("click", (e) => {
    if (e.target != toggleBtn && e.target != linksMenu) {
        if (linksMenu.classList.contains("open")) {
            linksMenu.classList.toggle("open");
            toggleBtn.classList.toggle("menu-open");
        }
    }
});
aLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        linksMenu.classList.toggle("open");
        toggleBtn.classList.toggle("menu-open");
    });
});


// span to go up //
let btnUp = document.querySelector(".up");
window.onscroll = function () {
    this.scrollY >= 100 ? btnUp.classList.add("show") : btnUp.classList.remove("show");
}
btnUp.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
