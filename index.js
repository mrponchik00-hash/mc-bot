const mineflayer = require('mineflayer')
const http = require('http')

// Веб-сервер для Cron-job
http.createServer((req, res) => {
  res.write("Бот працює 24/7");
  res.end();
}).listen(process.env.PORT || 3000);

const botArgs = {
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538,
  username: 'QuantumBot',
  version: false,
  checkTimeout: 60000 // Збільшили час очікування
}

function createBot() {
  const bot = mineflayer.createBot(botArgs)

  bot.on('spawn', () => {
    console.log('✅ Бот на сервері! Стрибаю...');
    // Цикл рухів
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 5000);
  });

  // Якщо бота викинуло або сталася помилка
  bot.on('error', (err) => console.log('❌ Помилка:', err.message));
  
  bot.on('end', () => {
    console.log('🔌 Бот вийшов. Перезапуск за 10 секунд...');
    setTimeout(createBot, 10000); // Бот буде пробувати зайти вічно
  });
}

createBot();

