import {SkillManager} from "../SkillManager";
import {
	APIRequest,
	ApplicationCommand,
	ApplicationCommandData,
	ApplicationCommandDataResolvable,
	ApplicationCommandOption,
	Channel, CloseEvent,
	DMChannel,
	Guild,
	GuildBan,
	GuildEmoji,
	GuildMember, GuildScheduledEvent,
	Interaction,
	Invite,
	Message,
	MessageEvent,
	MessageInteraction,
	MessageReaction,
	NewsChannel,
	NonThreadGuildBasedChannel,
	PartialGuildMember,
	PartialMessage,
	PartialMessageReaction,
	PartialUser,
	Presence, Role,
	Snowflake, StageInstance, Sticker,
	TextBasedChannel,
	TextChannel, ThreadChannel, ThreadMember,
	User, VoiceState
} from "discord.js";
import {Response} from "node-fetch";

import {SlashCommandBuilder} from "@discordjs/builders";
import {APIApplicationCommand} from "discord-api-types/v9";
import {VoiceConnectionEvents} from "@discordjs/voice";
import {Collection} from "@discordjs/collection";

//================================================================

export type TApplicationCommand = ApplicationCommandDataResolvable;

//================================================================

export type TDiscordEvent =
	  MessageEvent
	| Interaction
	| MessageInteraction
	| VoiceConnectionEvents
;

//================================================================

export abstract class Skill {
//protected:
	protected _skillManager;

	protected constructor(skillManager: SkillManager) {
		this._skillManager = skillManager;
	}

//public:
	//----------------------------------------------------------------

	abstract start(): void;

	//----------------------------------------------------------------

	abstract update(): void;

	//----------------------------------------------------------------

	abstract stop(): void;

	//----------------------------------------------------------------

	get commands(): TApplicationCommand | null { return null; }

	//----------------------------------------------------------------

	onChannelCreate(channel: NonThreadGuildBasedChannel) { return null; }
	onChannelDelete(channel: DMChannel | NonThreadGuildBasedChannel) { return null; }
	onChannelPinsUpdate(channel: TextBasedChannel, date: Date) { return null; }
	onChannelUpdate(oldChannel: DMChannel | NonThreadGuildBasedChannel, newChannel: DMChannel | NonThreadGuildBasedChannel) { return null; }

	onEmojiCreate(emoji: GuildEmoji) { return null; }
	onEmojiDelete(emoji: GuildEmoji) { return null; }
	onEmojiUpdate(oldEmoji: GuildEmoji, newEmoji: GuildEmoji) { return null; }

	onGuildBanAdd(ban: GuildBan) { return null; }
	onGuildBanRemove(ban: GuildBan) { return null; }

	onGuildCreate(guild: Guild) { return null; }
	onGuildDelete(guild: Guild) { return null; }
	onGuildUnavailable(guild: Guild) { return null; }
	onGuildIntegrationsUpdate(guild: Guild) { return null; }
	onGuildMemberAdd(member: GuildMember) { return null; }
	onGuildMemberAvailable(member: GuildMember | PartialGuildMember) { return null; }
	onGuildMemberRemove(member: GuildMember | PartialGuildMember) { return null; }
	onGuildMembersChunk(members: Collection<Snowflake, GuildMember>, guild: Guild, data: { count: number; index: number; nonce: string | undefined }) { return null; }
	onGuildMemberUpdate(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) { return null; }
	onGuildUpdate(oldGuild: Guild, newGuild: Guild) { return null; }

	onInviteCreate(invite: Invite) { return null; }
	onInviteDelete(invite: Invite) { return null; }

	onMessageCreate(message: Message) { return null; }
	onMessageDelete(message: Message | PartialMessage) { return null; }
	onMessageReactionRemoveAll(message: Message | PartialMessage, reactions: Collection<string | Snowflake, MessageReaction>) { return null; }
	onMessageReactionRemoveEmoji(reaction: MessageReaction | PartialMessageReaction) { return null; }
	onMessageDeleteBulk(messages: Collection<Snowflake, Message | PartialMessage>) { return null; }
	onMessageReactionAdd(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) { return null; }
	onMessageReactionRemove(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) { return null; }
	onMessageUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) { return null; }

	onPresenceUpdate(oldPresence: Presence | null, newPresence: Presence) { return null; }

	onRoleCreate(role: Role) { return null; }
	onRoleDelete(role: Role) { return null; }
	onRoleUpdate(oldRole: Role, newRole: Role) { return null; }

	onThreadCreate(thread: ThreadChannel, newlyCreated: boolean) { return null; }
	onThreadDelete(thread: ThreadChannel) { return null; }
	onThreadListSync(threads: Collection<Snowflake, ThreadChannel>) { return null; }
	onThreadMemberUpdate(oldMember: ThreadMember, newMember: ThreadMember) { return null; }
	onThreadMembersUpdate(oldMembers: Collection<Snowflake, ThreadMember>, newMembers: Collection<Snowflake, ThreadMember>) { return null; }
	onThreadUpdate(oldThread: ThreadChannel, newThread: ThreadChannel) { return null; }

	onUserUpdate(oldUser: User | PartialUser, newUser: User) { return null; }

	onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) { return null; }

	onWebhookUpdate(channel: TextChannel | NewsChannel) { return null; }

	onInteractionCreate(interaction: Interaction) { return null; }

	onShardDisconnect(closeEvent: CloseEvent, shardId: number) { return null; }
	onShardError(error: Error, shardId: number) { return null; }
	onShardReady(shardId: number, unavailableGuilds?: Set<Snowflake>) { return null; }
	onShardReconnecting(shardId: number) { return null; }
	onShardResume(shardId: number, replayedEvents: number) { return null; }

	onStageInstanceCreate(stageInstance: StageInstance) { return null; }
	onStageInstanceUpdate(oldStageInstance: StageInstance | null, newStageInstance: StageInstance) { return null; }
	onStageInstanceDelete(stageInstance: StageInstance) { return null; }

	onStickerCreate(sticker: Sticker) { return null; }
	onStickerDelete(sticker: Sticker) { return null; }
	onStickerUpdate(oldSticker: Sticker, newSticker: Sticker) { return null; }

	onGuildScheduledEventCreate(guildScheduledEvent: GuildScheduledEvent) { return null; }
	onGuildScheduledEventUpdate(oldGuildScheduledEvent: GuildScheduledEvent, newGuildScheduledEvent: GuildScheduledEvent) { return null; }
	onGuildScheduledEventDelete(guildScheduledEvent: GuildScheduledEvent) { return null; }
	onGuildScheduledEventUserAdd(guildScheduledEvent: GuildScheduledEvent, user: User) { return null; }
	onGuildScheduledEventUserRemove(guildScheduledEvent: GuildScheduledEvent, user: User) { return null; }

}

//================================================================
