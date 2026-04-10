const mineflayer = require('mineflayer')
const http = require('http')

// Веб-сервер, щоб хостинг не вимикав бота
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 3000);

const bot = mineflayer.createBot({
  host: 'Quantum-0nPx.aternos.me', 
  port: 21538, // <--- ЗАМІНИ ЦІ ЦИФРИ НА СВІЙ ПОРТ З ATERNOS!
  username: 'QuantumBot',
  version: '1.21.1' 
})

bot.on('spawn', () => {
  console.log('✅ Бот успішно зайшов на сервер!');
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 5000);
})

bot.on('error', err => console.log('Помилка:', err.message));
bot.on('end', () => setTimeout(() => process.exit(), 5000));
