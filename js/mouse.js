const throttle = (callback, delay) => {
    let lastTime = 0;

    return (event) => {
        const currentTime = new Date().getTime();

        if (currentTime - lastTime >= delay) {
            callback.apply(this, [event]);
            lastTime = currentTime;
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {

    const svg = document.getElementById('main');

    const masks = document.querySelectorAll('.mover');
    const colors = document.querySelectorAll('#dynamic polygon, #dynamic path');
    const polygons = document.querySelectorAll('#polygons path');
    const attacker = document.getElementById('attack-container');

    let timeout;

    const polygonInMouseRange = (polygon, x, y) => {
        const rect = polygon.getBoundingClientRect();
        const svgRectangle = svg.getBoundingClientRect();

        const closestX = Math.abs(x - rect.left) < Math.abs(x - rect.right) ? rect.left : rect.right;
        const closestY = Math.abs(y - rect.top) < Math.abs(y - rect.bottom) ? rect.top : rect.bottom;

        const distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);

        const range = 115 * Math.sqrt( (svgRectangle.width ** 2 + svgRectangle.height ** 2) / (1000 ** 2 + 1000 ** 2));

        return (distance <= range);
    }

    window.addEventListener('mouseleave', () => {
        masks.forEach(element => {
            element.setAttribute('cx', '500');
            element.setAttribute('cy', '-350');

            clearTimeout(timeout);
        });
    });

    document.addEventListener('mouseout', (event) => {
        if (!event.relatedTarget) {
            masks.forEach(element => {
                element.setAttribute('cx', '500');
                element.setAttribute('cy', '-350');
            });

            clearTimeout(timeout);
        }
    });

    attacker.addEventListener('mousemove', throttle((event) => {
        // Get the rectangle object containing positions of the svg
        const svgRectangle = svg.getBoundingClientRect();

        // Get real size of svg
        const realWidth = svgRectangle.width;
        const realHeight = svgRectangle.height;

        // Get cursor offset
        const mouseX = event.clientX - svgRectangle.left;
        const mouseY = event.clientY - svgRectangle.top;

        // Calculate cursor position on the artboard relative to real X/Y
        const x = (1000 * mouseX) / realWidth;
        const y = (1000 * mouseY) / realHeight;

        masks.forEach(element => {
            element.setAttribute('cx', String(x));
            element.setAttribute('cy', String(y));
        });

        colors.forEach(polygon => {

            if (polygonInMouseRange(polygon, event.clientX, event.clientY)) {
                polygon.style.visibility !== 'visible' && (polygon.style.visibility = 'visible');
            } else {
                polygon.style.visibility !== 'hidden' && (polygon.style.visibility = 'hidden');
            }
        });

        polygons.forEach(polygon => {
            if (polygonInMouseRange(polygon, event.clientX, event.clientY)) {
                polygon.style.visibility !== 'hidden' && (polygon.style.visibility = 'hidden');
            } else {
                polygon.style.visibility !== 'visible' && (polygon.style.visibility = 'visible');        }
        });

        // clearTimeout(timeout);
        // timeout = setTimeout(() => {
        //     console.log(x, y, range);
        // }, 1000);
    }, 15)); // a bit over 60 fps TODO: find performance replacer when people don't want their javascript to animate logos.

});