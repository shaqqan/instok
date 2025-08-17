import { InlineKeyboard } from "grammy";
export const LikesInlineBtn = (likes: number) => {
    return new InlineKeyboard().row(
        InlineKeyboard.text(`👍 ${likes}`, "likes"),
    );
};