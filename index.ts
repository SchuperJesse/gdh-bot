import {
	ApplicationCommand,
	Client,
	Interaction,
	MessageReaction, NewsChannel,
	PartialMessageReaction,
	PartialUser, TextChannel,
	User
} from "discord.js";
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

	client.on('channelCreate', (channel)=>{});
	client.on('channelDelete', (channel)=>{});
	client.on('channelUpdate', (oldChannel, newChannel)=>{});
	client.on('channelPinsUpdate', (channel, data)=>{});

	client.on('emojiCreate', (emoji)=>{});
	client.on('emojiDelete', (emoji)=>{});
	client.on('emojiUpdate', (oldEmoji, newEmoji)=>{});

	client.on('guildBanAdd', (ban)=>{});
	client.on('guildBanRemove', (ban)=>{});
	client.on('guildCreate', (guild)=>{});
	client.on('guildDelete', (guild)=>{});
	client.on('guildUnavailable', (guild)=>{});
	client.on('guildIntegrationsUpdate', (guild)=>{});
	client.on('guildMemberAdd', (member)=>{});
	client.on('guildMemberAvailable', (member)=>{});
	client.on('guildMemberRemove', (member)=>{});
	client.on('guildMembersChunk', (members, guild, data)=>{});
	client.on('guildMemberUpdate', (oldMember, newMember)=>{});
	client.on('guildUpdate', (oldGuild, newGuild)=>{});

	client.on('inviteCreate', (invite)=>{});
	client.on('inviteDelete', (invite)=>{});

	client.on('messageCreate', (message) => {
		if (message.author.bot) return;
	});

	client.on('messageDelete', (message)=>{});
	client.on('messageReactionRemoveAll', (message, reactions)=>{});
	client.on('messageReactionRemoveEmoji', (reaction)=>{});
	client.on('messageDeleteBulk', (messages)=>{});
	client.on('messageReactionAdd', (reaction, user)=>{});
	client.on('messageReactionRemove', (reaction, user)=>{});
	client.on('messageUpdate', (oldMessage, newMessage)=>{});

	client.on('presenceUpdate', (oldPresence, newPresence)=>{});

	client.on('roleCreate', (role)=>{});
	client.on('roleDelete', (role)=>{});
	client.on('roleUpdate', (oldRole, newRole)=>{});

	client.on('threadCreate', (thread, newlyCreated)=>{});
	client.on('threadDelete', (thread)=>{});
	client.on('threadListSync', (threads)=>{});
	client.on('threadMemberUpdate', (oldMember, newMember)=>{});
	client.on('threadMembersUpdate', (oldMembers, newMembers)=>{});
	client.on('threadUpdate', (oldThread, newThread)=>{});

	client.on('userUpdate', (oldUser, newUser)=>{});

	client.on('voiceStateUpdate', (oldState, newState)=>{});
	client.on('webhookUpdate', (channel)=>{});

	client.on('interactionCreate', (interaction)=>{});

	client.on('shardDisconnect', (closeEvent, shardId)=>{});
	client.on('shardError', (error, shardId)=>{});
	client.on('shardReady', (shardId, unavailableGuilds)=>{});
	client.on('shardReconnecting', (shardId)=>{});
	client.on('shardResume', (shardId, replayedEvents)=>{});

	client.on('stageInstanceCreate', (stageInstance)=>{});
	client.on('stageInstanceUpdate', (oldStage, newStage)=>{});
	client.on('stageInstanceDelete', (stageInstance)=>{});

	client.on('stickerCreate', (sticker)=>{});
	client.on('stickerDelete', (sticker)=>{});
	client.on('stickerUpdate', (oldSticker, newSticker)=>{});

	client.on('guildScheduledEventCreate', (scheduledEvent)=>{});
	client.on('guildScheduledEventUpdate', (oldScheduledEvent, newScheduledEvent)=>{});
	client.on('guildScheduledEventDelete', (scheduledEvent)=>{});
	client.on('guildScheduledEventUserAdd', (scheduledEvent, user)=>{});
	client.on('guildScheduledEventUserRemove', (scheduledEvent, user)=>{});

})();
