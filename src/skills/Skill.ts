import {SkillManager} from "../SkillManager";
import {
	ApplicationCommandDataResolvable,
	CloseEvent,
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
	User,
	VoiceState
} from "discord.js";

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

export enum EEventCode {
	CONSUMED_EVENT
}

//================================================================

export type TEventResult = EEventCode | null;

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

	onChannelCreate(channel: NonThreadGuildBasedChannel): TEventResult { return null; }
	onChannelDelete(channel: DMChannel | NonThreadGuildBasedChannel): TEventResult { return null; }
	onChannelPinsUpdate(channel: TextBasedChannel, date: Date): TEventResult { return null; }
	onChannelUpdate(oldChannel: DMChannel | NonThreadGuildBasedChannel, newChannel: DMChannel | NonThreadGuildBasedChannel): TEventResult { return null; }

	onEmojiCreate(emoji: GuildEmoji): TEventResult { return null; }
	onEmojiDelete(emoji: GuildEmoji): TEventResult { return null; }
	onEmojiUpdate(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): TEventResult { return null; }

	onGuildBanAdd(ban: GuildBan): TEventResult { return null; }
	onGuildBanRemove(ban: GuildBan): TEventResult { return null; }

	onGuildCreate(guild: Guild): TEventResult { return null; }
	onGuildDelete(guild: Guild): TEventResult { return null; }
	onGuildUnavailable(guild: Guild): TEventResult { return null; }
	onGuildIntegrationsUpdate(guild: Guild): TEventResult { return null; }
	onGuildMemberAdd(member: GuildMember): TEventResult { return null; }
	onGuildMemberAvailable(member: GuildMember | PartialGuildMember): TEventResult { return null; }
	onGuildMemberRemove(member: GuildMember | PartialGuildMember): TEventResult { return null; }
	onGuildMembersChunk(members: Collection<Snowflake, GuildMember>, guild: Guild, data: { count: number; index: number; nonce: string | undefined }): TEventResult { return null; }
	onGuildMemberUpdate(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember): TEventResult { return null; }
	onGuildUpdate(oldGuild: Guild, newGuild: Guild): TEventResult { return null; }

	onInviteCreate(invite: Invite): TEventResult { return null; }
	onInviteDelete(invite: Invite): TEventResult { return null; }

	onMessageCreate(message: Message): TEventResult { return null; }
	onMessageDelete(message: Message | PartialMessage): TEventResult { return null; }
	onMessageReactionRemoveAll(message: Message | PartialMessage, reactions: Collection<string | Snowflake, MessageReaction>): TEventResult { return null; }
	onMessageReactionRemoveEmoji(reaction: MessageReaction | PartialMessageReaction): TEventResult { return null; }
	onMessageDeleteBulk(messages: Collection<Snowflake, Message | PartialMessage>): TEventResult { return null; }
	onMessageReactionAdd(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): TEventResult { return null; }
	onMessageReactionRemove(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): TEventResult { return null; }
	onMessageUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): TEventResult { return null; }

	onPresenceUpdate(oldPresence: Presence | null, newPresence: Presence): TEventResult { return null; }

	onRoleCreate(role: Role): TEventResult { return null; }
	onRoleDelete(role: Role): TEventResult { return null; }
	onRoleUpdate(oldRole: Role, newRole: Role): TEventResult { return null; }

	onThreadCreate(thread: ThreadChannel, newlyCreated: boolean): TEventResult { return null; }
	onThreadDelete(thread: ThreadChannel): TEventResult { return null; }
	onThreadListSync(threads: Collection<Snowflake, ThreadChannel>): TEventResult { return null; }
	onThreadMemberUpdate(oldMember: ThreadMember, newMember: ThreadMember): TEventResult { return null; }
	onThreadMembersUpdate(oldMembers: Collection<Snowflake, ThreadMember>, newMembers: Collection<Snowflake, ThreadMember>): TEventResult { return null; }
	onThreadUpdate(oldThread: ThreadChannel, newThread: ThreadChannel): TEventResult { return null; }

	onUserUpdate(oldUser: User | PartialUser, newUser: User): TEventResult { return null; }

	onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): TEventResult { return null; }

	onWebhookUpdate(channel: TextChannel | NewsChannel): TEventResult { return null; }

	onInteractionCreate(interaction: Interaction): TEventResult { return null; }

	onShardDisconnect(closeEvent: CloseEvent, shardId: number): TEventResult { return null; }
	onShardError(error: Error, shardId: number): TEventResult { return null; }
	onShardReady(shardId: number, unavailableGuilds?: Set<Snowflake>): TEventResult { return null; }
	onShardReconnecting(shardId: number): TEventResult { return null; }
	onShardResume(shardId: number, replayedEvents: number): TEventResult { return null; }

	onStageInstanceCreate(stageInstance: StageInstance): TEventResult { return null; }
	onStageInstanceUpdate(oldStageInstance: StageInstance | null, newStageInstance: StageInstance): TEventResult { return null; }
	onStageInstanceDelete(stageInstance: StageInstance): TEventResult { return null; }

	onStickerCreate(sticker: Sticker): TEventResult { return null; }
	onStickerDelete(sticker: Sticker): TEventResult { return null; }
	onStickerUpdate(oldSticker: Sticker, newSticker: Sticker): TEventResult { return null; }

	onGuildScheduledEventCreate(guildScheduledEvent: GuildScheduledEvent): TEventResult { return null; }
	onGuildScheduledEventUpdate(oldGuildScheduledEvent: GuildScheduledEvent, newGuildScheduledEvent: GuildScheduledEvent): TEventResult { return null; }
	onGuildScheduledEventDelete(guildScheduledEvent: GuildScheduledEvent): TEventResult { return null; }
	onGuildScheduledEventUserAdd(guildScheduledEvent: GuildScheduledEvent, user: User): TEventResult { return null; }
	onGuildScheduledEventUserRemove(guildScheduledEvent: GuildScheduledEvent, user: User): TEventResult { return null; }

}

//================================================================
