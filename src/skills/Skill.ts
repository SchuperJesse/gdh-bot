import {SkillManager} from "../SkillManager";
import {ApplicationCommand, ApplicationCommandData, ApplicationCommandOption, Channel} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";
import {APIApplicationCommand} from "discord-api-types/v9";

//================================================================

export type TApplicationCommand = ApplicationCommandData | APIApplicationCommand;

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

	get command(): TApplicationCommand | null { return null; }

	//----------------------------------------------------------------

}

//================================================================
