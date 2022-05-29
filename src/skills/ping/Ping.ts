import {EEventCode, Skill, TApplicationCommand, TEventResult} from "../Skill";
import {SkillManager} from "../../SkillManager";
import { Channel, Interaction, CacheType, Message, WebSocketShard } from "discord.js";

//================================================================
// Test Bot latency from the bot to the discord servers.

export class Ping extends Skill {
//private

//public
	constructor(skillManager: SkillManager){
		super(skillManager);
	}

	//----------------------------------------------------------------

	override start(): void {
		
	}

	//----------------------------------------------------------------

	override update(): void {
		
	}

	//----------------------------------------------------------------

	override stop(): void {
		
	}

	//----------------------------------------------------------------

	override get commands(): TApplicationCommand | null {
		return {
			name: "ping",
			description: "Test Bot Latency"
		};
		
	}

	// Find out how to get ms response for message sent by bot

	override onInteractionCreate(interaction: Interaction) {
		return EEventCode.IGNORED
	}

}
