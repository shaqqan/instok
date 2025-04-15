import { Context, NextFunction } from "../deps.ts";
import { reply } from "../utils/sender.ts";

export default async (ctx: Context, next: NextFunction) => {
  if (ctx.message!.from!.id! !== 756870298) {
    return await reply(ctx, `⚠️ Bu komanda faqat Xinux Asoschisi uchun!`);
  }
  await next();
};
