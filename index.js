const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => res.end("OK")).listen(process.env.PORT || 3000);

const botArgs = {
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538,
  username: 'QuantumBot', // Спробуй змінити нік, якщо цей забанили
  version: '1.21.1',      // Вказуємо версію чітко
  hideErrors: false,
  checkTimeout: 90000,    // Збільшуємо час очікування
  auth: 'offline'         // Примусовий піратський режим
}

function start() {
  const bot = mineflayer.createBot(botArgs)

  bot.once('spawn', () => {
    console.log('✅ УСПІХ! Бот зайшов.');
    // Робимо рухи рідше, щоб не тригерити анти-чит
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 20000);
  });

  bot.on('error', (err) => {
    console.log('❌ ПОМИЛКА:', err.message);
    // Якщо сервер скидає з'єднання, чекаємо довше перед перезапуском
    if (err.code === 'ECONNRESET') {
        console.log('Сервер скинув з’єднання. Чекаю 30 секунд...');
        setTimeout(start, 30000);
    }
  });

  bot.on('end', () => {
    console.log('🔌 Відключено. Перезапуск...');
    setTimeout(start, 20000);
  });
}

start();

