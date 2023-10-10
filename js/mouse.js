const svg = document.getElementById('main').getBoundingClientRect();

const masks = document.querySelectorAll('.mover');
const colors = document.querySelectorAll('#dynamic polygon');
const polygons = document.querySelectorAll('#polygons polygon');
const attacker = document.getElementsByClassName('attack-container');

let timeout;

attacker.addEventListener('mousemove', (event) => {
    const windowWidth = svg.width;
    const windowHeight = svg.height;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const x = (1000 * mouseX) / windowWidth;
    const y = (1000 * mouseY) / windowHeight;

    masks.forEach(element => {
        element.setAttribute('cx', x);
        element.setAttribute('cy', y);
    });

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log(x, y, svg);
    }, 200);
});

