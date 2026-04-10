const mineflayer = require('mineflayer')
const http = require('http')

// Моментальний запуск веб-сервера для стабільності на Render
http.createServer((req, res) => {
  res.write("Bot status: Online");
  res.end();
}).listen(process.env.PORT || 3000);

const options = {
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538,
  username: 'QuantumBot',
  version: '1.21.1', // Фіксована версія для миттєвого входу
  connectTimeout: 10000
}

function initBot() {
  const bot = mineflayer.createBot(options)

  bot.once('spawn', () => {
    console.log('⚡ Бот у грі! Система стабілізації активована.');
    
    // Кожні 45 секунд бот робить мікро-стрибок та пише команду, щоб Essentials не кікав
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 300);
        bot.chat('/afk'); // Вимикає режим AFK у плагіні Essentials
      }
    }, 45000);
  });

  // Обробка помилок без вильоту скрипта
  bot.on('error', (err) => console.log('❌ Помилка:', err.message));
  
  // Миттєвий перезапуск при будь-якому відключенні
  bot.on('end', () => {
    console.log('🔌 Перепідключення через 5 секунд...');
    setTimeout(initBot, 5000);
  });
}

initBot();

