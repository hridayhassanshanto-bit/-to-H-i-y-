Scriconst axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "love11",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "FARHAN-KHAN",
  description: "Random Love Video",
  commandCategory: "media",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async function ({ api, event }) {
  const captions = [
    Šħẫňto Hřiȡẫy Ħẫššẫň&
 const links = [
    "https://drive.google.com/uc?id=1xLc_9r1TYGVM0J33hJ61hmW3yXOBTcEo",
    "https://drive.google.com/uc?id=1xFVA97twVhvJJzmxhXjT9QukwWEDRO2a",
    "https://drive.google.com/uc?id=1xC8J23XORH4zHsXCDkfrgzmVBm1_-b5E",
    "https://drive.google.com/uc?id=1x5EX0grUJwEKzHyzeR63HnzC_UlDdJD6",
    "https://drive.google.com/uc?id=1xM82tBosefpCvaDokhufHoikub1Opupz",
    "https://drive.google.com/uc?id=1xhCqfx7pScogeGph4T4ITnRJFYcUNmJ8",
    "https://drive.google.com/uc?id=1xTgkjk__QRMOVQnkQsSIcEzGfRUwUDLY",
    "https://drive.google.com/uc?id=1xRsWDPe485xXPna9nWhj0TaW_Q9lVJDd",
    "https://drive.google.com/uc?id=1xC30T2eSDWZGr_O8699yxaMS-AZ_X5y8",
    "https://drive.google.com/uc?id=1xcoHMLkNU1naPET4bP2sEiHoXUF23w-R",
    "https://drive.google.com/uc?id=1xcN88lPjPoRJhdxCUesuTFFArtvbUNL2",
    "https://drive.google.com/uc?id=1xUee8t4ukXW_XD4K4pGV_I4VFccwdyqt",
    "https://drive.google.com/uc?id=1xgfepctwXjZ5Y9kxhD3HcTTaJcsWHi-x",
    "https://drive.google.com/uc?id=1xhymaD6J1patQzfass5-e4ewUDg8gnQ9",
    "https://drive.google.com/uc?id=1xCvCvUa2zVWLm3y1pAGFKrr-emyaFicK",
    "https://drive.google.com/uc?id=1x87CHgjwaOjANyN_06_JqB-YKaUQGU2b"
  ];

  const link = links[Math.floor(Math.random() * links.length)];
  const caption = captions[Math.floor(Math.random() * captions.length)];

  const cachePath = path.join(__dirname, "cache", "love.mp4");

  try {
    await fs.ensureDir(path.join(__dirname, "cache"));

    const response = await axios({
      url: encodeURI(link),
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(cachePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: caption,
          attachment: fs.createReadStream(cachePath)
        },
        event.threadID,
        () => fs.unlinkSync(cachePath)
      );
    });

    writer.on("error", () => {
      api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", event.threadID);
    });

  } catch (e) {
    console.log(e);
    api.sendMessage("❌ ভিডিও আনতে সমস্যা হয়েছে!", event.threadID);
  }
};
