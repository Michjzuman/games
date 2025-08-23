async function head() {
    const response = await fetch("/global/head.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector("head").innerHTML += data;
}

async function footer() {
    const response = await fetch("/global/footer.html");
    if (!response.ok) return;
    const data = await response.text();
    document.querySelector("footer").innerHTML = data;
}

function css() {
    const scroll = window.scrollY;
    document.documentElement.style.setProperty('--scroll', scroll);

    const heigth = window.innerHeight;
    document.documentElement.style.setProperty('--winHeigth', heigth);
}

document.addEventListener('mousemove', function(event) {
    const mouseX = event.clientX - (window.innerWidth / 2);
    const mouseY = event.clientY - (window.innerHeight / 2);

    document.documentElement.style.setProperty('--mouse-x', mouseX);
    document.documentElement.style.setProperty('--mouse-y', mouseY);
});



document.documentElement.style.setProperty('--mouse-x', 0);
document.documentElement.style.setProperty('--mouse-y', 0);

setInterval(css, 1);

head();
footer();