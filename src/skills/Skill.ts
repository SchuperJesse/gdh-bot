import {SkillManager} from "../SkillManager";
import {Channel} from "discord.js";

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

}

//================================================================
