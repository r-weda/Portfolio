const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

const links = document.querySelectorAll('a, button');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.5)';
    cursor.style.backgroundColor = '#00ffff';
  });
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  });
});
