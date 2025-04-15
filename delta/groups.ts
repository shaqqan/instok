import { Composer, Context, Groups, InlineKeyboard } from "../deps.ts";

const composer = new Composer();

composer.command("groups", async (ctx: Context): Promise<void> => {
  const groups = await Groups.groups(1);
  const nextLength = (await Groups.groups(2)).length;
  const keyboard = new InlineKeyboard();

  for (const group of groups) {
    keyboard.text(
      `${group.name} (${group.packs})`,
      `group_1_${group.name}`,
    );
    keyboard.row();
  }

  if (nextLength > 0) {
    keyboard.text(`Keyingi ➡️`, `groups_2`);
  }

  if (ctx.message!.is_topic_message) {
    await ctx.reply(`Ushbu ro'yxatdan kerakli guruhni tanlab oling`, {
      message_thread_id: ctx.message!.message_thread_id,
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  } else {
    await ctx.reply(`Ushbu ro'yxatdan kerakli guruhni tanlab oling`, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  }
});

composer.callbackQuery(
  /^groups_(\d+)$/,
  async (ctx: Context): Promise<void> => {
    // Arguments
    const page = Number(ctx.match![1]);
    const keyboard = new InlineKeyboard();

    // Data
    const groups = await Groups.groups(page);
    const nextLength = (await Groups.groups(page - 1)).length;
    const prevLength = (await Groups.groups(page + 1)).length;

    for (const group of groups) {
      keyboard.text(
        `${group.name} (${group.packs})`,
        `group_${page}_${group.name}`,
      );
      keyboard.row();
    }

    if (nextLength > 0) {
      keyboard.text(`⬅️ Oldingi`, `groups_${page - 1}`);
    }

    if (prevLength > 0) {
      keyboard.text(`Keyingi ➡️`, `groups_${page + 1}`);
    }

    await ctx.editMessageText(`Ushbu ro'yxatdan kerakli guruhni tanlab oling`, {
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  },
);

composer.callbackQuery(/^group_(\d+)_(.*)$/, async (ctx: Context) => {
  const page = ctx.match![1];
  const keyboard = new InlineKeyboard();
  const group = await Groups.group(ctx.match![2]);

  for (const data of group.packs) {
    keyboard.switchInlineCurrent(`${data.name}`, `${data.name}`);

    if (((group.packs.indexOf(data) + 1) % 3) === 0) {
      keyboard.row();
    }
  }

  keyboard.row().text(`🔙 Orqaga`, `groups_${page}`);

  await ctx.editMessageText(
    `<b>${group.arch} arxitekturasidagi ${group.name} to'planmada ${group.packs.length} ta paketlar mavjud:</b>`,
    {
      parse_mode: "HTML",
      reply_markup: keyboard,
    },
  );
});

export default composer;
