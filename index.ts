import {ApplicationCommand, Client, MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";
import {SkillManager} from "./src/SkillManager";
import {DBManager} from "./src/DBManager";

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
	const skill_mgr = new SkillManager(client);
	const db_mgr = new DBManager();
	db_mgr.open();

	// Add atexit() listener - Stop and Cleanup before exiting
	process.once('exit', () =>
	{
		skill_mgr.stop();
		db_mgr.close();
	});

	// Once bot logs in to Discord
	client.once('ready', () =>
	{
		console.log("Connected to Discord");

		// Update Caches
		client.guilds.cache.forEach((guild) =>
		{
			// Remove all existing commands
			guild.commands.set([])
			.then(() =>
			{
				// Register all skill commands for this guild
				skill_mgr.registerCommands(guild);
			})
			.catch(err => console.error(err));
		});

		//TODO: Begin initialization after bot logs into discord
		skill_mgr.start();
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
