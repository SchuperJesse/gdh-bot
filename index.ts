import {
	ApplicationCommand,
	Client,
	Interaction, MessageActionRow, MessageButton,
	MessageReaction, MessageSelectMenu, NewsChannel,
	PartialMessageReaction,
	PartialUser, Snowflake, TextChannel,
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
				// let devchat = guild.channels.cache.get('978005365474082866');
				// if (devchat && devchat.type === 'GUILD_TEXT') {
				// 	let buttons = new MessageActionRow();
				// 	buttons.addComponents([
				// 		new MessageButton({
				// 			style: "PRIMARY",
				// 			label: "Artist",
				// 			emoji: '🎨',
				// 			customId: 'custom-id-artist'
				// 		}),
				// 		new MessageButton({
				// 			style: "PRIMARY",
				// 			label: "Musician",
				// 			emoji: '🎶',
				// 			customId: 'custom-id-musician'
				// 		}),
				// 		new MessageButton({
				// 			style: "SECONDARY",
				// 			label: "Spectator",
				// 			emoji: '👀',
				// 			customId: 'custom-id-spectator'
				// 		})
				// 	]);
				// 	let dropdown = new MessageActionRow();
				// 	dropdown.addComponents([
				// 		new MessageSelectMenu({
				// 			options: [
				// 				{
				// 					label: "Spectator",
				// 					value: "spectator",
				// 					default: true
				// 				},
				// 				{
				// 					label: "Artist",
				// 					value: "artist"
				// 				},
				// 				{
				// 					label: "Musician",
				// 					value: "musician"
				// 				},
				// 				{
				// 					label: "Programmer",
				// 					value: "programmer"
				// 				},
				// 				{
				// 					label: "Designer",
				// 					value: "designer"
				// 				}
				// 			],
				// 			customId: 'custom-id-select-menu'
				// 		})
				// 	]);
				// 	devchat.send({
				// 		content: 'Select a Role Mofo!',
				// 		allowedMentions: { users: [], roles: [] },
				// 		components: [ dropdown, buttons ]
				// 	});
				// }
			})
			.catch(err => console.error(err));
		});

		//TODO: Begin initialization after bot logs into discord
		skill_mgr.start();
	});

	// Login to Discord
	client.login(auth['discord']['token'])
	.catch((err) =>
	{
		console.error(err);
		//TODO: do cleanup
	});

	// Channels / Direct Messages / Group Chats
	client.on('channelCreate', (channel) => { skill_mgr.emit('channelCreate', channel); });
	client.on('channelDelete', (channel) => { skill_mgr.emit('channelDelete', channel); });
	client.on('channelUpdate', (oldChannel, newChannel) => { skill_mgr.emit('channelUpdate', oldChannel, newChannel); });
	client.on('channelPinsUpdate', (channel, data) => { skill_mgr.emit('channelPinsUpdate', channel, data); });

	// Emojis
	client.on('emojiCreate', (emoji) => { skill_mgr.emit('emojiCreate', emoji); });
	client.on('emojiDelete', (emoji) => { skill_mgr.emit('emojiDelete', emoji) });
	client.on('emojiUpdate', (oldEmoji, newEmoji) => { skill_mgr.emit('emojiUpdate', oldEmoji, newEmoji); });

	// Guilds and Guild Members
	client.on('guildBanAdd', (ban) => { skill_mgr.emit('guildBanAdd', ban); });
	client.on('guildBanRemove', (ban) => { skill_mgr.emit('guildBanRemove', ban); });
	client.on('guildCreate', (guild) => {
		// Register commands for each skill for this newly joined guild
		skill_mgr.registerCommands(guild);
		skill_mgr.emit('guildCreate', guild);
	});
	client.on('guildDelete', (guild) => { skill_mgr.emit('guildDelete', guild); });
	client.on('guildUnavailable', (guild) => { skill_mgr.emit('guildUnavailable', guild); });
	client.on('guildIntegrationsUpdate', (guild) => { skill_mgr.emit('guildIntegrationsUpdate', guild); });
	client.on('guildMemberAdd', (member) => { skill_mgr.emit('guildMemberAdd', member); });
	client.on('guildMemberAvailable', (member) => { skill_mgr.emit('guildMemberAvailable', member); });
	client.on('guildMemberRemove', (member) => { skill_mgr.emit('guildMemberRemove', member); });
	client.on('guildMembersChunk', (members, guild, data) => { skill_mgr.emit('guildMembersChunk', members, guild, data); });
	client.on('guildMemberUpdate', (oldMember, newMember) => { skill_mgr.emit('guildMemberUpdate', oldMember, newMember); });
	client.on('guildUpdate', (oldGuild, newGuild) => { skill_mgr.emit('guildUpdate', oldGuild, newGuild); });

	// Invites
	client.on('inviteCreate', (invite) => { skill_mgr.emit('inviteCreate', invite); });
	client.on('inviteDelete', (invite) => { skill_mgr.emit('inviteDelete', invite); });

	// Messages
	client.on('messageCreate', (message) =>
	{
		if (message.author.bot) return;
		skill_mgr.emit('messageCreate', message);
	});
	client.on('messageDelete', (message) => { skill_mgr.emit('messageDelete', message); });
	client.on('messageReactionRemoveAll', (message, reactions) => { skill_mgr.emit('messageReactionRemoveAll', message, reactions); });
	client.on('messageReactionRemoveEmoji', (reaction) => { skill_mgr.emit('messageReactionRemoveEmoji', reaction); });
	client.on('messageDeleteBulk', (messages) => { skill_mgr.emit('messageDeleteBulk', messages); });
	client.on('messageReactionAdd', (reaction, user) =>
	{
		if (user.bot) return;
		skill_mgr.emit('messageReactionAdd', reaction, user);
	});
	client.on('messageReactionRemove', (reaction, user) => {
		if (user.bot) return;
		skill_mgr.emit('messageReactionRemove', reaction, user);
	});
	client.on('messageUpdate', (oldMessage, newMessage) => {
		if (newMessage.author?.bot) return;
		skill_mgr.emit('messageUpdate', oldMessage, newMessage);
	});

	// Presence
	client.on('presenceUpdate', (oldPresence, newPresence) => { skill_mgr.emit('presenceUpdate', oldPresence, newPresence); });

	// Roles
	client.on('roleCreate', (role) => { skill_mgr.emit('roleCreate', role); });
	client.on('roleDelete', (role) => { skill_mgr.emit('roleDelete', role); });
	client.on('roleUpdate', (oldRole, newRole) => { skill_mgr.emit('roleUpdate', oldRole, newRole); });

	// Thread Channels
	client.on('threadCreate', (thread, newlyCreated) => { skill_mgr.emit('threadCreate', thread, newlyCreated); });
	client.on('threadDelete', (thread) => { skill_mgr.emit('threadDelete', thread); });
	client.on('threadListSync', (threads) => { skill_mgr.emit('threadListSync', threads); });
	client.on('threadMemberUpdate', (oldMember, newMember) => { skill_mgr.emit('threadMemberUpdate', oldMember, newMember); });
	client.on('threadMembersUpdate', (oldMembers, newMembers) => { skill_mgr.emit('threadMembersUpdate', oldMembers, newMembers); });
	client.on('threadUpdate', (oldThread, newThread) => { skill_mgr.emit('threadUpdate', oldThread, newThread); });

	// User (bot)
	client.on('userUpdate', (oldUser, newUser) => { skill_mgr.emit('userUpdate', oldUser, newUser); });

	// Voice State
	client.on('voiceStateUpdate', (oldState, newState) => { skill_mgr.emit('voiceStateUpdate', oldState, newState); });

	// Webhook
	client.on('webhookUpdate', (channel) => { skill_mgr.emit('webhookUpdate', channel); });

	// Interactions (Application Commands, Buttons, Message Components)
	client.on('interactionCreate', (interaction) => {
		skill_mgr.emit('interactionCreate', interaction);
		// if (interaction.isButton()) {
		// 	let title = '';
		// 	switch (interaction.customId) {
		// 		case 'custom-id-artist': title = 'Artist'; break;
		// 		case 'custom-id-musician': title = 'Musician'; break;
		// 		case 'custom-id-spectator': title = 'Spectator'; break;
		// 		default: title = 'Unknown'; break;
		// 	}
		// 	interaction.reply({ content: "test", ephemeral: true })
		// 	.then(()=>{
		// 		setTimeout(()=>{
		// 			interaction.editReply({
		// 				content: "Test"
		// 			}).catch(err => console.error(err));
		// 		}, 3000);
		// 	})
		// 	.catch(err => console.error(err));
		// 	return;
		// }
		// if (interaction.isSelectMenu()) {
		// 	interaction.deferUpdate().catch(err => console.error());
		// 	return;
		// }
		// if (interaction.isRepliable()) {
		// 	interaction.deferReply().catch(err => console.error(err));
		// }
		// if (interaction.isMessageComponent()) {
		// 	setTimeout(() =>
		// 	{
		// 		if (!interaction.replied) {
		// 			interaction.deferUpdate().catch(err=> console.error(err));
		// 		}
		// 	}, 2500);
		// }
	});

	// Shards (Bot Instances)
	client.on('shardDisconnect', (closeEvent, shardId) => { skill_mgr.emit('shardDisconnect', closeEvent, shardId); });
	client.on('shardError', (error, shardId) => { skill_mgr.emit('shardError', error, shardId); });
	client.on('shardReady', (shardId, unavailableGuilds) => { skill_mgr.emit('shardReady', shardId, unavailableGuilds); });
	client.on('shardReconnecting', (shardId) => { skill_mgr.emit('shardReconnecting', shardId); });
	client.on('shardResume', (shardId, replayedEvents) => { skill_mgr.emit('shardResume', shardId, replayedEvents); });

	// Stage Instances
	client.on('stageInstanceCreate', (stageInstance) => { skill_mgr.emit('stageInstanceCreate', stageInstance); });
	client.on('stageInstanceUpdate', (oldStage, newStage) => { skill_mgr.emit('stageInstanceUpdate', oldStage, newStage); });
	client.on('stageInstanceDelete', (stageInstance) => { skill_mgr.emit('stageInstanceDelete', stageInstance); });

	// Stickers
	client.on('stickerCreate', (sticker) => { skill_mgr.emit('stickerCreate', sticker); });
	client.on('stickerDelete', (sticker) => { skill_mgr.emit('stickerDelete', sticker); });
	client.on('stickerUpdate', (oldSticker, newSticker) => { skill_mgr.emit('stickerUpdate', oldSticker, newSticker); });

	// Scheduled Events
	client.on('guildScheduledEventCreate', (scheduledEvent) => { skill_mgr.emit('guildScheduledEventCreate', scheduledEvent); });
	client.on('guildScheduledEventUpdate', (oldScheduledEvent, newScheduledEvent) => { skill_mgr.emit('guildScheduledEventUpdate', oldScheduledEvent, newScheduledEvent); });
	client.on('guildScheduledEventDelete', (scheduledEvent) => { skill_mgr.emit('guildScheduledEventDelete', scheduledEvent); });
	client.on('guildScheduledEventUserAdd', (scheduledEvent, user) => { skill_mgr.emit('guildScheduledEventUserAdd', scheduledEvent, user); });
	client.on('guildScheduledEventUserRemove', (scheduledEvent, user) => { skill_mgr.emit('guildScheduledEventUserRemove', scheduledEvent, user); });

})();
