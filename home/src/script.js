async function getData() {
    const response = await fetch("/data.json");
    if (!response.ok) return;
    const data = await response.json();

    games(data.games);
}

function addBg() {
    for (let i = 0; i < 25; i++) {
        document.querySelector("div.bg").innerHTML += `
            <div class="ray" style="left: ${i*4}%"><p></p></div>
        `;
    }
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 150 + 50;
        const top = Math.random() * 200;
        const left = Math.random() * 100;
        const color = Math.random() >= 0.5 ? "red" : "darkRed";
        const speed = Math.random() * 2 + 1;
        const animation = Math.random() * 5 + 1;

        document.querySelector("div.bg").innerHTML += `
            <div class="box" style="
                --size: ${size};
                --top: ${top}vh;
                --left: ${left}vw;
                --speed: ${speed};
                background-color: var(--${color});
                animation: resize ${animation}s infinite linear;
            "></div>
        `;
    }
}

function updateBg() {
    document.querySelectorAll("div.bg div.ray p").forEach(ray => {
        const nums = ray.innerHTML.split("<br>")
        if (Math.random() > 0.5) {
            if (nums.length > 50) {
                ray.innerHTML = ""
                for (let i = 1; i < nums.length - 1; i++) {
                    ray.innerHTML += nums[i] + "<br>";
                }
            }
            ray.innerHTML += `${Math.round(Math.random())}<br>`;
        }
    });
}

setInterval(updateBg, 100);

function games(data) {
    const games = document.querySelector("div.games");
    data.forEach(game => {
        games.innerHTML += `
            ${game.effect.split("\"").join('"')}
            <div class="game ${game.page}">
                <div style="background-color: ${game.bg}">
                    <img src="/play/${game.page}/thumbnail.png">
                    <h2>
                        ${game.name}
                        <p style="color: ${game.playButton}">${game.slogan}</p>
                    </h2>
                    <a target="_blank" href="https://michjzumangames.itch.io/${game.page}">
                        <button style="background-color: transparent">MORE INFO</button>
                    </a>
                    <a href="/play/${game.page}">
                        <button style="background-color: ${game.playButton}">PLAY NOW</button>
                    </a>
                </div>
            </div>
        `;
    });
}

getData();
addBg();

document.addEventListener('scroll', function() {
    const bluerunner = document.querySelector('.bluerunner');
    const bluerunnereffect = document.querySelector('.bluerunnereffect');
    
    const bluerunnerRect = bluerunner.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Überprüfen, ob bluerunner vollständig im Sichtfeld ist
    if (bluerunnerRect.top >= 0 && bluerunnerRect.bottom <= windowHeight) {
        bluerunnereffect.style.opacity = 1; // Setze Opazität auf 1
    } else {
        bluerunnereffect.style.opacity = 0; // Setze Opazität zurück auf 0
    }
});

setTimeout(() => {
    document.querySelector("head").innerHTML += `
        <style>
            div.bluerunnereffect {
                transition: opacity 1s;
            }
        </style>
    `;
}, 1000);