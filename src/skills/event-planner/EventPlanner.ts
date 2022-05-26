import {Skill, TApplicationCommand} from "../Skill";
import {SkillManager} from "../../SkillManager";

//================================================================

export class EventPlanner extends Skill {
	constructor(skillManager: SkillManager) {
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
		return null;
	}

	//----------------------------------------------------------------

}

//================================================================
