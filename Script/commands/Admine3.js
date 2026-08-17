const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// 🎬 VIDEO LIST
const videoList = [
  {
    url: "https://files.catbox.moe/qgmyk9.mp4",
    file: "video1.mp4"
  },
  {
    url: "https://files.catbox.moe/ygsz4h.mp4",
    file: "video2.mp4"
  },
  {
    url: "https://files.catbox.moe/psl98k.mp4",
    file: "video3.mp4"
  },
  {
    url: "https://files.catbox.moe/rzhmck.mp4",
    file: "video4.mp4"
  },
  {
    url: "https://files.catbox.moe/h1w4ol.mp4",
    file: "video5.mp4"
  }
];

const indexFile = path.join(CACHE_DIR, "videoIndex.json");

// 📥 DOWNLOAD VIDEO
async function downloadVideo(video) {
  const filePath = path.join(CACHE_DIR, video.file);

  if (fs.existsSync(filePath)) {
    return filePath;
  }

  try {
    const response = await axios({
      method: "GET",
      url: video.url,
      responseType: "stream",
      timeout: 30000
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("✅ Downloaded:", video.file);

    return filePath;
  } catch (error) {
    console.log("❌ Download Error:", error.message);
    return null;
  }
}

// 🚀 DOWNLOAD ALL VIDEOS
async function preloadVideos() {
  for (const video of videoList) {
    await downloadVideo(video);
  }
}

preloadVideos();

module.exports = {
  config: {
    name: "admin3",
    version: "1.0.0",
    author: "Hriday Hassan Shanto",
    countDown: 0,
    role: 0,
    shortDescription: "Admin mention video reply",
    longDescription: "Admin mention করলে random caption সহ ভিডিও reply করবে",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ api, event, message }) {
    try {
      const admins = [
        {
          uid: "100091413057011",

          triggers: [
            "মালয়েশিয়া সিঙ্গেল বয়",
            "hriday hassan shanto",
            "হৃদয়",
            "হৃদয় ভাই",
            "boss hriday",
            "হৃদয় boss",
            "রিদয় ভাই",
            "বট অ্যাডমিন কে"
          ]
        }
      ];

      const senderID = String(event.senderID || "");

      if (!senderID) return;

      // 👑 ADMIN নিজে লিখলে reply করবে না
      if (admins.some(admin => String(admin.uid) === senderID)) {
        return;
      }

      const text = String(event.body || "")
        .toLowerCase()
        .trim();

      if (!text) return;

      // 👤 Mention check
      const mentionedIDs = event.mentions
        ? Object.keys(event.mentions).map(id => String(id))
        : [];

      // 🔍 ADMIN TRIGGER CHECK
      const triggeredAdmin = admins.find(admin => {
        const mentionFound = mentionedIDs.includes(String(admin.uid));

        const textFound = admin.triggers.some(trigger =>
          text.includes(trigger.toLowerCase())
        );

        return mentionFound || textFound;
      });

      if (!triggeredAdmin) return;

      // 💬 RANDOM CAPTION
      const captions = [
        "🇲🇾 মালয়েশিয়া সিঙ্গেল বয়কে বেশি মেনশন দিও না! 😹💔",

        "🥀 মালয়েশিয়া সিঙ্গেল বয় অনলাইনে আছে, কিন্তু ভাগ্য এখনো অফলাইনে! 🤧",

        "😎 বস এখন বিজি, প্রেমের আবেদন পরে জমা দিন! 📩😂",

        "💔 এত মেনশন কেন? বসের ইনবক্সে আজও শান্তি নাই! 😹",

        "🤭 বসের জন্য একটা ভালো মনের মানুষ খুঁজে দাও আগে! 😂",

        "🇲🇾 মালয়েশিয়া সিঙ্গেল বয় কাজে ব্যস্ত, কিন্তু মেনশন দেখলে হাজির! 😎",

        "🔥 বসকে মেনশন করলে জরিমানা নেই, তবে একটা হাসি দিতে হবে! 😹",

        "🫂 সিঙ্গেল লাইফ চলছে, তাই বেশি ডিস্টার্ব না করাই ভালো! 😂",

        "🥺 মেনশন পেলেই বসের পুরনো স্মৃতি মনে পড়ে যায়! 💔",

        "😹 মালয়েশিয়া সিঙ্গেল বয় হাজির! এখন বলেন, কী দরকার?"
      ];

      const caption =
        captions[Math.floor(Math.random() * captions.length)];

      const styledCaption = `
╭━━━━━━━━━━━━━━━━━━╮
      👑 𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗡𝗧𝗜𝗢𝗡
╰━━━━━━━━━━━━━━━━━━╯

『 ${caption} 』

╭━━━━━━━━━━━━━━━━━━╮
      🇲🇾 𝗛𝗥𝗜𝗗𝗔𝗬
╰━━━━━━━━━━━━━━━━━━╯
`;

      // 🎬 READ VIDEO INDEX
      let currentIndex = 0;

      if (fs.existsSync(indexFile)) {
        try {
          const data = JSON.parse(
            fs.readFileSync(indexFile, "utf8")
          );

          if (
            typeof data.index === "number" &&
            data.index >= 0 &&
            data.index < videoList.length
          ) {
            currentIndex = data.index;
          }
        } catch (error) {
          currentIndex = 0;
        }
      }

      const selectedVideo = videoList[currentIndex];

      // 🔄 NEXT VIDEO
      const nextIndex =
        (currentIndex + 1) % videoList.length;

      fs.writeFileSync(
        indexFile,
        JSON.stringify({ index: nextIndex }, null, 2)
      );

      // 📥 DOWNLOAD SELECTED VIDEO
      const videoPath = await downloadVideo(selectedVideo);

      // ❌ VIDEO DOWNLOAD FAILED
      if (!videoPath || !fs.existsSync(videoPath)) {
        await message.reply(styledCaption);
        return;
      }

      // 📤 SEND VIDEO
      await message.reply({
        body: styledCaption,
        attachment: fs.createReadStream(videoPath)
      });

      console.log(
        `✅ Admin mention reply sent: ${selectedVideo.file}`
      );

    } catch (error) {
      console.log("❌ Admin3 Error:", error);

      try {
        await message.reply(
          "❌ Admin mention reply দিতে সমস্যা হয়েছে!"
        );
      } catch (e) {}
    }
  }
};
