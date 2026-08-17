const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "voice3",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Farhan-Khan (Converted for Mirai)",
  description: "Auto Voice Reply",
  commandCategory: "system",
  usages: "",
  cooldowns: 1
};

module.exports.handleEvent = async function ({
  api,
  event
}) {
  if (!event.body) return;

  const input = event.body.trim().toLowerCase();

  const voiceMap = {
    "rabbi": "https://files.catbox.moe/9v2jjl.mp3",
    "ঘুমা": "https://files.catbox.moe/mofu8n.mp3",
    "ভয়েস": "https://files.catbox.moe/b973ms.mp4",
    "😸": "https://files.catbox.moe/bo0o5e.mp3",
    "নাটেক": "https://files.catbox.moe/8w1wo5.mp3",
    "🙏": "https://files.catbox.moe/i429lj.mp3",
    "এহ": "https://files.catbox.moe/6tkyn2.mp3",
    "ডিলেট": "https://files.catbox.moe/kcemka.mp4",
    "matha betha": "https://files.catbox.moe/5rdtc6.mp3",
    "মিম": "https://files.catbox.moe/dz7n65.mp3",
    "সর বাল": "https://files.catbox.moe/q84p1d.mp3",
    "কেউ নাই": "https://files.catbox.moe/3u6shs.mp3",
    "good night": "https://files.catbox.moe/i29m4q.mp3",
    "গুড নাইট": "https://files.catbox.moe/i29m4q.mp3",
    "good morning": "https://files.catbox.moe/8gzqx5.mp3",
    "গুড মর্নিং": "https://files.catbox.moe/8gzqx5.mp3",
    "i love you": "https://files.catbox.moe/y3fk8i.mp3",
    "love you": "https://files.catbox.moe/y3fk8i.mp3",
    "@everyone": "https://files.catbox.moe/3u6shs.mp3",
    "ভুদা": "https://files.catbox.moe/gnyx0p.mp3",
    "by": "https://files.catbox.moe/fdqh2m.mp3",
    "বাই": "https://files.catbox.moe/fdqh2m.mp3",
    "বায়": "https://files.catbox.moe/fdqh2m.mp3"
  };

  for (const key in voiceMap) {
    if (input.includes(key.toLowerCase())) {
      try {
        const cache = path.join(__dirname, "cache");
        fs.ensureDirSync(cache);

        const file = path.join(cache, `${Buffer.from(key).toString("hex")}.mp3`);

        if (!fs.existsSync(file)) {
          const res = await axios.get(voiceMap[key], {
            responseType: "arraybuffer"
          });
          fs.writeFileSync(file, Buffer.from(res.data));
        }

        return api.sendMessage(
          {
            attachment: fs.createReadStream(file)
          },
          event.threadID,
          event.messageID
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
};

module.exports.run = function () {};
