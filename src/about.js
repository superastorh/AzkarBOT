module.exports = {
  Supporter() {
    const supporter = {
      x0x3b: "xMan",
    };
    let text = "";
    for (let support in supporter) {
      text += supporter[support] + " : @" + support + "\n";
    }
    return text;
  },
  init(bot) {
    const { Markup } = require("telegraf");

    const { about, Supporter } = require("./about");

    let a = require("./about").action;

    let action = a.bind({ bot });

    let secBord = Markup.inlineKeyboard([
      [Markup.button.url("بوت عبود للشاي", "https://t.me/artea_bot")],
      [
        Markup.button.callback("ادعمنا", "supportMe"),
        Markup.button.callback("رجوع", "about"),
      ],
    ]);
    bot.action("Supporter", (ctx) => {
      const text =
        "الداعمين هم السبب الرائيسي في عمل البوت الخاص بنا وهم" +
        "\n\n" +
        Supporter();
      action(ctx, text, secBord);
    });

    bot.action("myBots", (ctx) => {
      const text = "البوتات الاخرى التي تم صنعناها وهي من تطوير @superastorh";
      action(ctx, text, secBord);
    });

    bot.action("supportMe", (ctx) => {
      let keyBord = Markup.inlineKeyboard([
        [
          Markup.button.url("باتريون", "https://www.patreon.com/superastorh"),
          Markup.button.callback("رجوع", "about"),
        ],
      ]);
      let text =
        "نرجو منك التواصل مع مطور البوت لمعرفة التفاضيل الازمة\n" +
        "مطور البوت : @superastorh\n" +
        "او دعمنا على احد المنصات التاليه";

      action(ctx, text, keyBord);
    });

    bot.action("about", (ctx) => {
      action(ctx, ...about());
    });
  },

  action(ctx, message, extra = {}, doc) {
    const bot = this.bot;
    let chat = ctx.update.callback_query.message.chat.id;
    let messageId = ctx.update.callback_query.message.message_id;
    bot.telegram.deleteMessage(chat, messageId).then();
    if (message) bot.telegram.sendMessage(chat, message, extra).then();
    if (doc) bot.telegram.sendDocument(chat, doc).then();
  },

  about() {
    const licenseUrl = "https://ojuba.org/waqf-2.0:رخصة_وقف_العامة";

    const { Markup } = require("telegraf");

    let about =
      "بوت مذكر هو بوت لنشر اذكار الصباح والمساء بشكل دوري في تيلجرام \n" +
      "البوت مجاني و مرخص برخصة وقف العامة" +
      "\n نرجو منكم دعمنا لنستمر";
    const buttons = Markup.inlineKeyboard([
      [
        Markup.button.url("المطور", "https://t.me/superastorh"),
        Markup.button.url("الرخصة", licenseUrl),
      ],
      [
        Markup.button.callback("ادعمنا", "supportMe"),
        Markup.button.callback("الداعمين", "Supporter"),
      ],
      [Markup.button.callback("بوتات اخرى من صنعنا", "myBots")],
    ]);
    return [about, buttons];
  },
};
