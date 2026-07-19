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
