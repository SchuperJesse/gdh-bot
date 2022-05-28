import {Skill, TApplicationCommand} from "../Skill";
import {SkillManager} from "../../SkillManager";
import { Interaction, CacheType, Message, WebSocketShard } from "discord.js";

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

	onInteractionCreate(interaction: Interaction) {
		if (!interaction.isCommand()) return;

		const { commandName } = interaction;

		if (commandName === 'ping'){
			interaction.reply('Pong');
		}
	}

}
