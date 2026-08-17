const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "info",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "🔰𝐑𝐀𝐇𝐀𝐓 𝐈𝐒𝐋𝐀𝐌🔰",
 description: "Show  Info",
 commandCategory: "info",
 usages: "info",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┏━━━━━━━━━━━━━━━━┓
┃
❤️ ADMIN ❤️
👤 Name: হৃদয় হাসান শান্ত
❤️ Nick Name: shonto_
⚡ Gender: MALE
🔥 Attitude: 👑 KING
🎮 Free Fire: LOVER
🎓 Prasuna: 🗣️ Prrrbbasi 😭
💼 Work: CONTRACTION
❤️ Relation: SINGEL
🎂 Age: 22+ | Birthday: APRIL 24
🩸 Blood: A+ | Height: 5'6" | Wit: 54+
🌙 Religion: ISLAM
🏠 Address: ⊕ Bogura
📱 Social Media
🔵 Facebook: https://www.facebook.com/share/1E299MzHcO/
🟢 WhatsApp: +601116710390
🟣 Instagram: https://m.me/j/AbbDv4dJZVcKj6b1/
🎵 TikTok: মালয়েশিয়া সিঙ্গেল বয়
🔷 Telegram: mrjuweI2025
📧 Gmail: hridaysanto30@gmail.com
⭐ Updated Time: 17/04/2026 07:14:19 PM
┃🕒𝐔𝐏𝐃𝐀𝐓𝐄𝐃 𝐓𝐈𝐌𝐄 :${time}
┗━━━━━━━━━━━━━━━━┛`,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/SrRtp8O.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
