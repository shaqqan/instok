import start from "./start.ts";
import help from "./help.ts";
import inline from "./inline.ts";
import which from "./which.ts";
import { Bot } from "../deps.ts";
import about from "./about.ts";
import rules from "./rules.ts";
import text from "./text.ts";
import groups from "./groups.ts";
import honor from "./honor.ts";
import warrior from "./warrior.ts";
import trigger from "./trigger.ts";
import feedback from "./feedback.ts";
import code from "./code.ts";

export default async (bot: Bot) => {
  await bot
    .use(start)
    .use(honor)
    .use(help)
    .use(groups)
    .use(inline)
    .use(which)
    .use(about)
    .use(rules)
    .use(feedback)
    .use(warrior)
    .use(trigger)
    .use(code)
    .use(text);
};
