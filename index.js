const mineflayer = require('mineflayer')
const http = require('http')

// Веб-сервер для Render
http.createServer((req, res) => res.end("OK")).listen(process.env.PORT || 3000);

const botArgs = {
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538,
  username: 'QuantumBot',
  version: false, // Бот САМ запитає у сервера версію
  checkTimeout: 60000,
  hideErrors: false
}

function start() {
  const bot = mineflayer.createBot(botArgs)

  bot.once('spawn', () => {
    console.log('✅ Бот нарешті зайшов!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('error', (err) => {
    console.log('❌ ПОМИЛКА ТУТ:', err.message);
  });

  bot.on('end', () => {
    console.log('🔌 Виліт. Перезапуск...');
    setTimeout(start, 5000);
  });
}

start();
