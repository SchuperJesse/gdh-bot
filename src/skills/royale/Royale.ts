import {EEventCode, Skill, TApplicationCommand, TEventResult} from "../Skill";
import {SkillManager} from "../../SkillManager";
import {EmbedBuilder} from "@discordjs/builders";
import {CacheType, Channel, Interaction, Message, PartialMessage, PartialMessageReaction} from "discord.js";

//================================================================

export class Royale extends Skill {
//private:

//public:
	constructor(skillManager: SkillManager) {
		super(skillManager);
	}

	//----------------------------------------------------------------

	override start() {
		this._skillManager.addEventListener('interactionCreate', this.onInteractionCreate);
	}

	//----------------------------------------------------------------

	override update() {
	}

	//----------------------------------------------------------------

	override stop() {
	}

	//----------------------------------------------------------------

	override get commands(): TApplicationCommand | null {
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

	override onInteractionCreate(interaction: Interaction) {
		return EEventCode.IGNORED;
	}
}

//================================================================
