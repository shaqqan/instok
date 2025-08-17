"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesInlineBtn = void 0;
const grammy_1 = require("grammy");
const LikesInlineBtn = (likes) => {
    return new grammy_1.InlineKeyboard().row(grammy_1.InlineKeyboard.text(`👍 ${likes}`, "likes"));
};
exports.LikesInlineBtn = LikesInlineBtn;
//# sourceMappingURL=likes.btn.js.map