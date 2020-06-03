const ENEMIES_STORE = [];
const ENEMIES_SIZE = 50;
const ENEMIES_COLORS = [
  'red', 'blue', 'yellow', 'white',
  'green', 'purple', 'navy', 'silver', 'olive',
  'lime', 'fuchsia', 'teal', 'aqua', 'maroon'
];
const HERO_SIZE = ENEMIES_SIZE;
const HERO_COLOR = 'grey';
const GAME_OVER_FONT = '20px Verdana';
const GAME_OVER_COLOR = 'white';
const GAME_OVER_TEXT = 'GAME OVER';
const GAME_OVER_X = 185;
const GAME_OVER_Y = 220;


const canvas = document.getElementById('my-canvas');

const ctx = canvas.getContext('2d');

let running = false;

let frames = 0;

class Enemy {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = ENEMIES_SIZE;
    this.height = ENEMIES_SIZE;
    this.color = ENEMIES_COLORS[Math.floor(Math.random() * ENEMIES_COLORS.length)];
  }

  draw() {
    this.y += 10;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, ENEMIES_SIZE, ENEMIES_SIZE);  
  }
}

const createEnemy = () => {

  if (frames % 5 === 0) {
    const x = Math.floor(Math.random() * 10) * ENEMIES_SIZE;
    ENEMIES_STORE.push(new Enemy(x));
  }
}

const drawEnemies = () => {
  ENEMIES_STORE.forEach(enemy => enemy.draw());
}

const collisionChecker = () => {
  ENEMIES_STORE.forEach(enemy => {
    if (ourHero.checkCollision(enemy)) {
      gameOver();
    }
  })
}

class Hero {
  constructor() {
    this.x = 0;
    this.y = canvas.height - HERO_SIZE;
    this.width = HERO_SIZE;
    this.height = HERO_SIZE;
    this.color = HERO_COLOR;
  }

  draw() {
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - HERO_SIZE) this.x = canvas.width - HERO_SIZE;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, HERO_SIZE, HERO_SIZE);  
  }


  checkCollision(enemy) {
    return (this.x < enemy.x + enemy.width) && (this.x + this.width > enemy.x) && (this.y < enemy.y + enemy.height) && (this.y + this.height > enemy.y);
  }  
}

const ourHero = new Hero();

const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

const gameOver = () => {
  running = false;
  ctx.font = GAME_OVER_FONT;
  ctx.fillStyle = GAME_OVER_COLOR;
  ctx.fillText(GAME_OVER_TEXT, GAME_OVER_X, GAME_OVER_Y);
}


const render = () => {
  resetCanvas();
  frames += 1;

  ourHero.draw();
  createEnemy();
  drawEnemies();
  collisionChecker();
  if (running) {
    window.requestAnimationFrame(render);
  }
}
running = true;
render();

window.addEventListener('keydown', (e) => {

  if (e.keyCode === 37) {
    if (ourHero.x <= 0) return;
    ourHero.x -= HERO_SIZE;
  }

  if (e.keyCode === 39) {
    if (ourHero.x >= canvas.width - HERO_SIZE) return;
    ourHero.x += HERO_SIZE;
  }    
});
