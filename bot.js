// const { Telegraf } = require('telegraf')
// const { message } = require('telegraf/filters')
// const axios = require('axios')
// const bot = new Telegraf('7470815431:AAF4G_kfoDycZJYEbohnWt2mSw3wdKMInK0')
// bot.start((ctx) => ctx.reply('Welcome send me your location and i will say a temp of location'))
// bot.on('message', async (ctx)=>{
//     if (ctx.message.location) {
//         console.log(ctx.message.location);  
//         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=7515e331bcc097bc94dc75aad7347422`;
//     const res = await axios.get(url)
//    console.log(res);
// ctx.reply(`Country: ${res.data.sys.country}
// City: ${res.data.name}
// Temp: ${Math.round(res.data.main.temp - 273.15)}C`)    
//     }
 
// })
// bot.launch()

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
const { Telegraf } = require('telegraf');
const axios = require('axios');

// Создайте экземпляр бота с вашим токеном
const bot = new Telegraf('7470815431:AAF4G_kfoDycZJYEbohnWt2mSw3wdKMInK0');

// Замените 'YOUR_CHAT_ID' на ваш реальный ID в Telegram
const adminChatId = '5567933330';

// Обработка команды /start
bot.start((ctx) => {
 console.log(1)
    ctx.reply(`Привет , я бот который говорит тебе градус твоего местоположения,пожалуйста скинь свою локацию 
————————————————————————
Hello , I am a bot who is saying you a temp of you location , please send me your location`);
});


// Обработка сообщений
bot.on('message', async (ctx) => {
    // Пересылка всех полученных сообщений вам
    bot.telegram.sendMessage(adminChatId, `Новое сообщение от ${ctx.message.from.id}: ${ctx.message.location.latitude}  ${ctx.message.location.longitude}`);

    if (ctx.message.location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=7515e331bcc097bc94dc75aad7347422`;
        const res = await axios.get(url);
        console.log(res);
        ctx.reply(`Country: ${res.data.sys.country}\nCity: ${res.data.name}\nTemp: ${Math.round(res.data.main.temp - 273.15)}°C`);
    }
});

// Запуск бота
bot.launch();


