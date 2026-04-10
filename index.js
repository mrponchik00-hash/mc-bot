const mineflayer = require('mineflayer')
const http = require('http')

// Створюємо веб-сервер, щоб Render не вимикав бота (для 24/7 через UptimeRobot/Cron-job)
http.createServer((req, res) => {
  res.write("Bot is running 24/7!");
  res.end();
}).listen(process.env.PORT || 3000);

const botArgs = {
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538,
  username: 'QuantumBot',
  version: false, // Бот автоматично визначить версію сервера
  checkTimeout: 30000
}

function createBot() {
  const bot = mineflayer.createBot(botArgs)

  bot.on('spawn', () => {
    console.log('✅ Бот успішно зайшов на сервер!');
    
    // Постійний рух для AFK (стрибок + рух вперед)
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 1000);
      }
    }, 5000);
  })

  // Повідомлення про помилки в консоль Render
  bot.on('error', (err) => {
    console.log('❌ Помилка:', err.message);
  })

  // Авто-перезапуск при вильоті з сервера
  bot.on('end', () => {
    console.log('🔌 Бот відключився. Перезапуск через 15 секунд...');
    setTimeout(createBot, 15000);
  })
}

createBot()
