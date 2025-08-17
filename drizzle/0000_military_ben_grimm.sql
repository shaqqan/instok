CREATE TABLE "storages" (
	"id" serial PRIMARY KEY NOT NULL,
	"channel_id" bigint NOT NULL,
	"channel_message_id" bigint NOT NULL,
	"file_id" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "storages_channel_id_unique" UNIQUE("channel_id"),
	CONSTRAINT "storages_channel_message_id_unique" UNIQUE("channel_message_id"),
	CONSTRAINT "storages_file_id_unique" UNIQUE("file_id"),
	CONSTRAINT "storages_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegram_id" bigint NOT NULL,
	"username" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"language" varchar(10) DEFAULT 'en',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_activity" timestamp DEFAULT now(),
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id")
);
