const axios = require('axios');
const { cmd } = require('../command');

// Fake ChatGPT vCard
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© Mr Hiruka",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:Meta
ORG:META AI;
TEL;type=CELL;type=VOICE;waid=13135550002:+13135550002
END:VCARD`
        }
    }
};

cmd({
    pattern: "vcc",
    desc: "🎴 Generate Virtual Credit Cards (VCCs)",
    react: "💳",
    category: "other",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    const apiUrl = `https://api.siputzx.my.id/api/tools/vcc-generator?type=MasterCard&count=5`;

    try {
        const response = await axios.get(apiUrl);
        const result = response.data;

        if (!result.status || !result.data || result.data.length === 0) {
            return reply("❌ Unable to generate VCCs. Please try again later.");
        }

        let responseMessage = `🎴 *Generated VCCs* (Type: Mastercard, Count: 5):\n\n`;

        result.data.forEach((card, index) => {
            responseMessage += `#️⃣ *Card ${index + 1}:*\n`;
            responseMessage += `🔢 *Card Number:* ${card.cardNumber}\n`;
            responseMessage += `📅 *Expiration Date:* ${card.expirationDate}\n`;
            responseMessage += `🧾 *Cardholder Name:* ${card.cardholderName}\n`;
            responseMessage += `🔒 *CVV:* ${card.cvv}\n\n> © Powerd by 𝗥𝗔𝗡𝗨𝗠𝗜𝗧𝗛𝗔-𝗫-𝗠𝗗 🌛`;
        },{ quoted: fakevCard });

        return reply(responseMessage);
    } catch (error) {
        console.error("Error fetching VCC data:", error);
        return reply("❌ An error occurred while generating VCCs. Please try again later.");
    }
});
