const mineflayer = require('mineflayer')
const http = require('http')

// Веб-сервер для Cron-job (24/7 режим)
http.createServer((req, res) => {
  res.write("Бот працює стабільно 24/7");
  res.end();
}).listen(process.env.PORT || 3000);

const options = {
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538,
  username: 'QuantumBot',
  version: false, // Авто-визначення версії сервера
  checkTimeout: 60000, // Чекаємо відповіді 60 сек
  hideErrors: false
}

function startBot() {
  const bot = mineflayer.createBot(options)

  // Обробка успішного входу
  bot.on('spawn', () => {
    console.log('✅ Бот успішно зайшов! Починаю AFK-цикл...');
    
    // Кожні 2 хвилини робимо дію, щоб Essentials не кікав
    if (bot.afkInterval) clearInterval(bot.afkInterval);
    bot.afkInterval = setInterval(() => {
      // Бот пише крапку в чат (це найнадійніше для Essentials)
      bot.chat('/afk'); // Або просто bot.chat('.')
      
      // Також робимо мікро-стрибок
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      
      console.log('Виконано дію для запобігання AFK-кіку');
    }, 120000); 
  });

  // Помилки підключення
  bot.on('error', (err) => {
    console.log(`❌ Помилка: ${err.message}`);
    if (err.message.includes('ECONNREFUSED')) {
        console.log('Сервер вимкнено або перезавантажується...');
    }
  });

  // Авто-рестарт при відключенні
  bot.on('end', () => {
    console.log('🔌 Зв’язок втрачено. Перезапуск через 15 секунд...');
    setTimeout(startBot, 15000);
  });
}

startBot();
