import {Client, MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";
import {SkillManager} from "./src/SkillManager";

//NOTE: You will have to provide your own auth.json inside the /build/
// in order to run the bot, I suggest creating a bot on your own server for testing.
const auth = require("./auth.json");

// Main Entrypoint
(() =>
{
	// Create a Discord.JS bot client
	// and set the intents + partials to listen for
	let client = new Client({
		"intents": [
			"GUILDS",
			"GUILD_MEMBERS",
			"GUILD_BANS",
			"GUILD_EMOJIS_AND_STICKERS",
			"GUILD_INTEGRATIONS",
			"GUILD_WEBHOOKS",
			"GUILD_INVITES",
			"GUILD_VOICE_STATES",
			"GUILD_PRESENCES",
			"GUILD_MESSAGES",
			"GUILD_MESSAGE_REACTIONS",
			//"GUILD_MESSAGE_TYPING",	// IGNORE TYPING EVENTS
			"DIRECT_MESSAGES",
			"DIRECT_MESSAGE_REACTIONS",
			//"DIRECT_MESSAGE_TYPING",	// IGNORE TYPING EVENTS
			"GUILD_SCHEDULED_EVENTS"
		],
		"partials": [
			"USER",
			"CHANNEL",
			"GUILD_MEMBER",
			"MESSAGE",
			"REACTION",
			"GUILD_SCHEDULED_EVENT"
		]
	});

	// Create Skill Manager
	const smgr = new SkillManager(client);

	// Add atexit() listener - Stop and Cleanup before exiting
	process.once('exit', () =>
	{
		smgr.stop();
	});

	client.once('ready', () =>
	{
		console.log("Connected to Discord");
		//TODO: Begin initialization after bot logs into discord
		smgr.start();
	});

	// Login to Discord
	client.login(auth['discord']['token'])
	.catch(err =>
	{
		console.error(err);
		//TODO: do cleanup
	});

	client.on('messageReactionAdd', (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) =>
	{
		console.log(reaction,user);
	});

})();
