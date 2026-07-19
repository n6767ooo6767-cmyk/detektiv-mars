// ======================================
// Детектив Марс - script.js v1.0
// ======================================

console.log("🐈 Добро пожаловать в Лапоград!");

// ======================================
// ЛАПКИ
// ======================================

const pawContainer = document.getElementById("paw-container");

document.addEventListener("click", function (event) {

    // Не создавать лапки при клике по кнопкам и ссылкам
    if (event.target.closest("a, button, input, textarea, nav")) {
        return;
    }

    if (!pawContainer) return;

    const paw = document.createElement("div");

    paw.className = "paw";

    paw.textContent = "🐾";

    paw.style.left = event.clientX + "px";

    paw.style.top = event.clientY + "px";

    paw.style.transform =
        `translate(-50%, -50%) rotate(${Math.random() * 60 - 30}deg)`;

    pawContainer.appendChild(paw);

    setTimeout(() => {
        paw.remove();
    }, 5000);

});

// ======================================
// ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ
// ======================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.animate(

                [
                    {
                        opacity: 0,
                        transform: "translateY(40px)"
                    },

                    {
                        opacity: 1,
                        transform: "translateY(0px)"
                    }

                ],

                {
                    duration: 700,
                    easing: "ease-out",
                    fill: "forwards"
                }

            );

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

sections.forEach(section => observer.observe(section));

// ======================================
// ДОСТИЖЕНИЯ
// ======================================

let clicks = 0;

function showAchievement(title, text) {

    const achievement = document.createElement("div");

    achievement.className = "achievement";

    achievement.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
    `;

    achievement.style.position = "fixed";
    achievement.style.right = "20px";
    achievement.style.bottom = "20px";
    achievement.style.background = "#10263b";
    achievement.style.border = "2px solid #f3d36b";
    achievement.style.borderRadius = "15px";
    achievement.style.padding = "18px";
    achievement.style.color = "white";
    achievement.style.zIndex = "99999";
    achievement.style.maxWidth = "260px";
    achievement.style.boxShadow = "0 0 20px rgba(0,0,0,.5)";
    achievement.style.animation = "fadeIn .4s";

    document.body.appendChild(achievement);

    setTimeout(() => {

        achievement.remove();

    }, 3000);

}

document.addEventListener("click", function (event) {

    if (event.target.closest("a, button, input, textarea, nav")) {
        return;
    }

    clicks++;

    if (clicks === 20) {

        showAchievement(
            "🏆 Достижение!",
            "Любопытный детектив"
        );

    }

    if (clicks === 100) {

        showAchievement(
            "🧀 Секрет найден!",
            "Вы нашли секретный сыр!"
        );

        clicks = 0;

    }

});

// ======================================
// КНОПКА НАВЕРХ
// ======================================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.borderRadius = "50%";
topButton.style.border = "none";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.fontSize = "22px";
topButton.style.background = "#f3d36b";
topButton.style.color = "#000";
topButton.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";
topButton.style.zIndex = "9999";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ======================================
// ПЛАВНЫЙ СКРОЛЛ ПО МЕНЮ
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ======================================
// ЗАГРУЗКА САЙТА
// ======================================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    console.log("Сайт Детектив Марс успешно загружен!");

});
// ======================================
// УВЕДОМЛЕНИЯ МАРСА
// ======================================

const inbox = [];

const notification = document.createElement("div");

notification.innerHTML = "‼️";

notification.id = "notification";

notification.style.position = "fixed";
notification.style.top = "20px";
notification.style.right = "20px";
notification.style.fontSize = "32px";
notification.style.cursor = "pointer";
notification.style.display = "none";
notification.style.zIndex = "99999";

document.body.appendChild(notification);

notification.onclick = () => {

    if (inbox.length === 0) return;

    let text = "🐈 Новые сообщения\n\n";

    inbox.forEach(message => {

        text +=
`${message.title}

Промокод:
${message.code}

`;

    });

    alert(text);

    notification.innerHTML = "📂";

};

function addPromo(title, code){

    inbox.push({
        title,
        code
    });

    notification.style.display = "block";

}
// ======================================
// АТМОСФЕРА
// ======================================


const soundButton =
document.getElementById("soundButton");


const soundMenu =
document.getElementById("soundMenu");


const volume =
document.getElementById("volume");


let currentSound = null;


soundButton.onclick = () => {

    soundMenu.classList.toggle("active");

};



function playSound(name){

    if(currentSound){

        currentSound.pause();

    }


    currentSound = new Audio(
        `assets/sounds/${name}.mp3`
    );


    currentSound.loop = true;


    currentSound.volume =
    volume.value;


    currentSound.play();


    localStorage.setItem(
        "marsSound",
        name
    );

}



document.querySelectorAll("[data-sound]")
.forEach(button=>{


    button.onclick = ()=>{

        playSound(
            button.dataset.sound
        );

    };


});



volume.oninput = ()=>{

    if(currentSound){

        currentSound.volume =
        volume.value;

    }

};



document.getElementById("stopSound")
.onclick = ()=>{


    if(currentSound){

        currentSound.pause();

        currentSound = null;

    }


    localStorage.removeItem(
        "marsSound"
    );


};



// запомнить выбор

window.addEventListener(
"load",
()=>{

    const saved =
    localStorage.getItem(
        "marsSound"
    );


    if(saved){

        playSound(saved);

    }

});
