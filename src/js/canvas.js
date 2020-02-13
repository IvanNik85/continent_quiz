export default function canvasData() {

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    let circleArray = [];   
    let size;
    const colorArray = [ 
        "#6dad8cb8",
        "#a8ce7cd1",
        "#DBF3B7",
    ]
    // Enabling resizing and reallocating circle elements
    window.addEventListener('resize', () => {
        init();
    })      
    //Draw circle and update his position-----------------------------------------
    class Circle {
        constructor(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        }
        draw() {
            ctx.beginPath();  
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // ctx.strokeStyle = this.color;;
            // ctx.lineWidth = 5;
            //  ctx.stroke(); 
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x + this.radius > window.innerWidth || this.x < this.radius) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > window.innerHeight || this.y < this.radius) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }
    //Randomize the size of circles------------------------------------------------    
    function init() {
        circleArray.length = 0;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; 
        if(window.innerWidth < 768) {
            size = 12;
        } else if (window.innerWidth > 720 && window.innerWidth < 1140) {
            size = 25; 
        } else {
            size = 40; 
        }                
        for (let i = 0; i < size; i++) {
            let radius = Math.random() * 15 + 7;
            let x = Math.random() * (window.innerWidth - radius * 2) + radius;
            let y = Math.random() * (window.innerHeight - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * 4;
            let dy = (Math.random() - 0.5) * 4;
            var circle = new Circle(x, y, dx, dy, radius);
            circleArray.push(circle);
        } 
    }
    init();
    //Trigering movement of elements----------------------------------------------
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        }
    }
    animate();
}