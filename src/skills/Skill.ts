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
	IGNORED,
	CONSUMED_EVENT
}

//================================================================

export type TEventResult = EEventCode;

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
	// Discord Event Handlers
	// NOTE: These are here as templates to be overridden by the Skills
	// that derive from the Skill object.
	// in the skills Start() method, you should use the code:
	// ```
	// this._skillManager.addEventListener('<event_name_here>', this.<function_name_here>);
	// ```
	// This will add the skill to listen for those events.
	//----------------------------------------------------------------
	onChannelCreate(channel: NonThreadGuildBasedChannel): TEventResult { return EEventCode.IGNORED; }
	onChannelDelete(channel: DMChannel | NonThreadGuildBasedChannel): TEventResult { return EEventCode.IGNORED; }
	onChannelPinsUpdate(channel: TextBasedChannel, date: Date): TEventResult { return EEventCode.IGNORED; }
	onChannelUpdate(oldChannel: DMChannel | NonThreadGuildBasedChannel, newChannel: DMChannel | NonThreadGuildBasedChannel): TEventResult { return EEventCode.IGNORED; }
	onEmojiCreate(emoji: GuildEmoji): TEventResult { return EEventCode.IGNORED; }
	onEmojiDelete(emoji: GuildEmoji): TEventResult { return EEventCode.IGNORED; }
	onEmojiUpdate(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): TEventResult { return EEventCode.IGNORED; }
	onGuildBanAdd(ban: GuildBan): TEventResult { return EEventCode.IGNORED; }
	onGuildBanRemove(ban: GuildBan): TEventResult { return EEventCode.IGNORED; }
	onGuildCreate(guild: Guild): TEventResult { return EEventCode.IGNORED; }
	onGuildDelete(guild: Guild): TEventResult { return EEventCode.IGNORED; }
	onGuildUnavailable(guild: Guild): TEventResult { return EEventCode.IGNORED; }
	onGuildIntegrationsUpdate(guild: Guild): TEventResult { return EEventCode.IGNORED; }
	onGuildMemberAdd(member: GuildMember): TEventResult { return EEventCode.IGNORED; }
	onGuildMemberAvailable(member: GuildMember | PartialGuildMember): TEventResult { return EEventCode.IGNORED; }
	onGuildMemberRemove(member: GuildMember | PartialGuildMember): TEventResult { return EEventCode.IGNORED; }
	onGuildMembersChunk(members: Collection<Snowflake, GuildMember>, guild: Guild, data: { count: number; index: number; nonce: string | undefined }): TEventResult { return EEventCode.IGNORED; }
	onGuildMemberUpdate(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember): TEventResult { return EEventCode.IGNORED; }
	onGuildUpdate(oldGuild: Guild, newGuild: Guild): TEventResult { return EEventCode.IGNORED; }
	onInviteCreate(invite: Invite): TEventResult { return EEventCode.IGNORED; }
	onInviteDelete(invite: Invite): TEventResult { return EEventCode.IGNORED; }
	onMessageCreate(message: Message): TEventResult { return EEventCode.IGNORED; }
	onMessageDelete(message: Message | PartialMessage): TEventResult { return EEventCode.IGNORED; }
	onMessageReactionRemoveAll(message: Message | PartialMessage, reactions: Collection<string | Snowflake, MessageReaction>): TEventResult { return EEventCode.IGNORED; }
	onMessageReactionRemoveEmoji(reaction: MessageReaction | PartialMessageReaction): TEventResult { return EEventCode.IGNORED; }
	onMessageDeleteBulk(messages: Collection<Snowflake, Message | PartialMessage>): TEventResult { return EEventCode.IGNORED; }
	onMessageReactionAdd(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): TEventResult { return EEventCode.IGNORED; }
	onMessageReactionRemove(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): TEventResult { return EEventCode.IGNORED; }
	onMessageUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): TEventResult { return EEventCode.IGNORED; }
	onPresenceUpdate(oldPresence: Presence | null, newPresence: Presence): TEventResult { return EEventCode.IGNORED; }
	onRoleCreate(role: Role): TEventResult { return EEventCode.IGNORED; }
	onRoleDelete(role: Role): TEventResult { return EEventCode.IGNORED; }
	onRoleUpdate(oldRole: Role, newRole: Role): TEventResult { return EEventCode.IGNORED; }
	onThreadCreate(thread: ThreadChannel, newlyCreated: boolean): TEventResult { return EEventCode.IGNORED; }
	onThreadDelete(thread: ThreadChannel): TEventResult { return EEventCode.IGNORED; }
	onThreadListSync(threads: Collection<Snowflake, ThreadChannel>): TEventResult { return EEventCode.IGNORED; }
	onThreadMemberUpdate(oldMember: ThreadMember, newMember: ThreadMember): TEventResult { return EEventCode.IGNORED; }
	onThreadMembersUpdate(oldMembers: Collection<Snowflake, ThreadMember>, newMembers: Collection<Snowflake, ThreadMember>): TEventResult { return EEventCode.IGNORED; }
	onThreadUpdate(oldThread: ThreadChannel, newThread: ThreadChannel): TEventResult { return EEventCode.IGNORED; }
	onUserUpdate(oldUser: User | PartialUser, newUser: User): TEventResult { return EEventCode.IGNORED; }
	onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): TEventResult { return EEventCode.IGNORED; }
	onWebhookUpdate(channel: TextChannel | NewsChannel): TEventResult { return EEventCode.IGNORED; }
	onInteractionCreate(interaction: Interaction): TEventResult { return EEventCode.IGNORED; }
	onShardDisconnect(closeEvent: CloseEvent, shardId: number): TEventResult { return EEventCode.IGNORED; }
	onShardError(error: Error, shardId: number): TEventResult { return EEventCode.IGNORED; }
	onShardReady(shardId: number, unavailableGuilds?: Set<Snowflake>): TEventResult { return EEventCode.IGNORED; }
	onShardReconnecting(shardId: number): TEventResult { return EEventCode.IGNORED; }
	onShardResume(shardId: number, replayedEvents: number): TEventResult { return EEventCode.IGNORED; }
	onStageInstanceCreate(stageInstance: StageInstance): TEventResult { return EEventCode.IGNORED; }
	onStageInstanceUpdate(oldStageInstance: StageInstance | null, newStageInstance: StageInstance): TEventResult { return EEventCode.IGNORED; }
	onStageInstanceDelete(stageInstance: StageInstance): TEventResult { return EEventCode.IGNORED; }
	onStickerCreate(sticker: Sticker): TEventResult { return EEventCode.IGNORED; }
	onStickerDelete(sticker: Sticker): TEventResult { return EEventCode.IGNORED; }
	onStickerUpdate(oldSticker: Sticker, newSticker: Sticker): TEventResult { return EEventCode.IGNORED; }
	onGuildScheduledEventCreate(guildScheduledEvent: GuildScheduledEvent): TEventResult { return EEventCode.IGNORED; }
	onGuildScheduledEventUpdate(oldGuildScheduledEvent: GuildScheduledEvent, newGuildScheduledEvent: GuildScheduledEvent): TEventResult { return EEventCode.IGNORED; }
	onGuildScheduledEventDelete(guildScheduledEvent: GuildScheduledEvent): TEventResult { return EEventCode.IGNORED; }
	onGuildScheduledEventUserAdd(guildScheduledEvent: GuildScheduledEvent, user: User): TEventResult { return EEventCode.IGNORED }
	onGuildScheduledEventUserRemove(guildScheduledEvent: GuildScheduledEvent, user: User): TEventResult { return EEventCode.IGNORED; }

	//----------------------------------------------------------------

}

//================================================================
