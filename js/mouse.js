document.addEventListener('DOMContentLoaded', () => {

    const svg = document.getElementById('main').getBoundingClientRect();

    const masks = document.querySelectorAll('.mover');
    const colors = document.querySelectorAll('#dynamic polygon');
    const polygons = document.querySelectorAll('#polygons polygon');
    const attacker = document.getElementById('attack-container');

    let timeout;

    attacker.addEventListener('mousemove', (event) => {
        const realWidth = svg.width;
        const realHeight = svg.height;

        const mouseX = event.clientX - svg.left;
        const mouseY = event.clientY - svg.top;
        const x = (1000 * mouseX) / realWidth;
        const y = (1000 * mouseY) / realHeight;

        clearTimeout(timeout);
        timeout = setTimeout(() => {

            masks.forEach(element => {
                element.setAttribute('cx', String(x));
                element.setAttribute('cy', String(y));
            });

            console.log(x, y, svg);
        }, 15);
    });

});