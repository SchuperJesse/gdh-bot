import {Skill, TApplicationCommand} from "../Skill";
import {SkillManager} from "../../SkillManager";
import {EmbedBuilder, roleMention, SlashCommandBuilder} from "@discordjs/builders";
import {Channel, Interaction, Message, PartialMessage, PartialMessageReaction} from "discord.js";

//================================================================

export class Royale extends Skill {
//private:

//public:
	constructor(skillManager: SkillManager) {
		super(skillManager);
	}

	//----------------------------------------------------------------

	override start() {
	}

	//----------------------------------------------------------------

	override update() {
	}

	//----------------------------------------------------------------

	override stop() {
	}

	//----------------------------------------------------------------

	override get command(): TApplicationCommand | null {
		return {
			name: "royale",
			description: "Royale Challenge Command!"
		};
	}

	//----------------------------------------------------------------

	getHelp(message: Message | PartialMessage) {
		let embed = new EmbedBuilder();
		message.reply({ embeds: [ embed.data ]})
		.catch(err => console.error(err));
	}

	//----------------------------------------------------------------

	onInteractionCreate(interaction: Interaction) {
	}
}

//================================================================
