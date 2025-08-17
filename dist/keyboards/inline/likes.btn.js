import { InlineKeyboard } from "grammy";
export const LikesInlineBtn = (likes) => {
    return new InlineKeyboard().row(InlineKeyboard.text(`👍 ${likes}`, "likes"));
};
//# sourceMappingURL=likes.btn.js.map