class TypeAffectingAttribute
{
	names;
	// applyToAffinities;

	// constructor(names, applyToAffinities = (type) => type)
	constructor(names)
	{
		this.names = names;
		// this.applyToAffinities = applyToAffinities;
	}
}

class SpecialMove extends Type
{
	/**
	 * The names of the chosen types
	 * @type {string[]}
	 */
	static selectedTypesNames = [];

	/**
	 * If the special move has been chosen or not
	 * @type {boolean}
	 */
	#selected = false;

	/**
	 * If the special move has been chosen or not
	 * @type {boolean}
	 */
	get Selected()
	{
		return this.#selected;
	}

	/**
	 * If the special move has been chosen or not
	 */
	set Selected(value)
	{
		this.#selected = value;

		let checkbox = document.getElementById(this.Names["English"] + "Checkbox");

		if (this.#selected)
		{
			SpecialMove.selectedTypesNames.push(this.Names.English);
		}
		else
		{
			SpecialMove.selectedTypesNames.splice(SpecialMove.selectedTypesNames.indexOf(this.Names.English), 1);
		}

		checkbox.checked = this.#selected;
	}

	GetCoverage()
	{
		return this.getCoverage();
	}

	GetEffectiveness(...typeNames)
	{
		return this.getEffectiveness(typeNames);
	}

	static TYPES =
	{
		"Freeze-Dry": new SpecialMove
		(
			{ "English": "Freeze-Dry", "French": "Lyophilisation" },
			"Ice",
			function ()
			{
				let coverage = Type.TYPES["Ice"].GetCoverage();
				coverage["Water"] = 2;
				return coverage;
			}
		),
		"Thousand Arrows": new SpecialMove
		(
			{ "English": "Thousand Arrows", "French": "Myria-Flèches" },
			"Ground",
			// TODO: prendre les talents et terrains en compte
			function ()
			{
				let coverage = Type.TYPES["Ground"].GetCoverage();
				coverage["Flying"] = 1;
				return coverage;
			},
			function (typeNames)
			{
				if (typeNames.includes("Flying"))
				{
					return 1;
				}

				let coverage = this.GetCoverage();
				let effectiveness = 1;

				typeNames.forEach
				(
					typeName =>
					{
						effectiveness *= coverage[typeName];
					}
				);

				return effectiveness;
			}
		),
		"Flying Press": new SpecialMove
		(
			{ "English": "Flying Press", "French": "Flying Press" },
			"Fighting",
			function ()
			{
				let coverage = Type.TYPES["Fighting"].GetCoverage();
				let secondCoverage = Type.TYPES["Flying"].GetCoverage();

				Object.keys(Type.TYPES).forEach
				(
					typeName =>
					{
						coverage[typeName] *= secondCoverage[typeName];
					}
				);

				return coverage;
			}
		)
	};

	constructor(names, typeName, getCoverage = null, getEffectiveness = null)
	{
		super(names, {});
		this.getCoverage = getCoverage ?? (() => super.GetCoverage());
		this.typeName = typeName;
		this.getEffectiveness = getEffectiveness ?? ((typeNames) => super.GetEffectiveness(...typeNames));
	}
}

class SpecialAbility extends TypeAffectingAttribute
{
	ignorable;

	static ATTRIBUTES =
	{
		"Water Bubble": new SpecialAbility
		(
			{ "English": "Water Bubble", "French": "Aquabulle" }
		),
		"Steely Spirit / Steelworker": new SpecialAbility
		(
			{ "English": "Water Bubble", "French": "Boost Acier / Expert Acier" }
		),
		"Mold Breaker": new SpecialAbility
		(
			{ "English": "Mold Breaker / Turboblaze / Teravolt", "French": "Brise Moule / Turbo Brasier / Téra-Voltage" }
		),
		"Scrappy": new SpecialAbility
		(
			{ "English": "Scrappy", "French": "Querelleur" }
		),
		"Water Absorb": new SpecialAbility
		(
			{ "English": "Water Absorb", "French": "Absorbe-Eau" }
		),
		"Earth Eater": new SpecialAbility
		(
			{ "English": "Earth Eater", "French": "Absorbe-Terre" }
		),
		"Volt Absorb": new SpecialAbility
		(
			{ "English": "Volt Absorb / Motor Drive / Lighning Rod", "French": "Absorbe-Volt / Motorisé / Paratonnerre" }
		),
		"Solid Rock": new SpecialAbility
		(
			{ "English": "Solid Rock / Filter", "French": "Solide Roc / Filtre" }
		),
		"Prism Armor": new SpecialAbility
		(
			{ "English": "Prism Armor", "French": "Prisme-Armure" }
		),
		"Wonder Guard": new SpecialAbility
		(
			{ "English": "Wonder Guard", "French": "Garde Mystik" }
		),
		"Sap Sipper": new SpecialAbility
		(
			{ "English": "Sap Sipper", "French": "Herbivore" }
		),
		"Heatproof": new SpecialAbility
		(
			{ "English": "Heatproof", "French": "Ignifugé" }
		),
		"Thick Fat": new SpecialAbility
		(
			{ "English": "Thick Fat", "French": "Isograisse" }
		),
		"Storm Drain": new SpecialAbility
		(
			{ "English": "Storm Drain", "French": "Lavabo" }
		),
		"Levitate": new SpecialAbility
		(
			{ "English": "Levitate", "French": "Lévitation" }
		),
		"Dry Skin": new SpecialAbility
		(
			{ "English": "Dry Skin", "French": "Peau Sèche" }
		),
		"Purifying Salt": new SpecialAbility
		(
			{ "English": "Purifying Salt", "French": "Sel Purificateur" }
		),
		"Flash Fire": new SpecialAbility
		(
			{ "English": "Flash Fire", "French": "Torche" }
		),
		"Flash Fire": new SpecialAbility
		(
			{ "English": "Flash Fire", "French": "Torche" }
		)
	};
}

class StatusCondition extends TypeAffectingAttribute
{
	static ATTRIBUTES =
	{
		"Grounded": new StatusCondition
		(
			{ "English": "Grounded", "French": "Au sol" }
		),
		"Identified": new StatusCondition
		(
			{ "English": "Foresight / Odeur Sleuth / Miracle Eye", "French": "Clairvoyance / Flair / Oeil Miracle" }
		),
		"Tar Shot": new StatusCondition
		(
			{ "English": "Tar Shot", "French": "Goudronnage" }
		),
		"Ungrounded": new StatusCondition
		(
			{ "English": "Ungrounded", "French": "En l'air" }
		),
		"Ring Target": new StatusCondition
		(
			{ "English": "Ring Target", "French": "Point de Mire" }
		)
	};

	constructor(names)
	{
		super(names);
	}
}

class TerrainChange extends TypeAffectingAttribute
{
	static ATTRIBUTES =
	{
		"Harsh Sunlight": new TerrainChange
		(
			{ "English": "Harsh Sunlight", "French": "Soleil" }
		),
		"Rain": new TerrainChange
		(
			{ "English": "Rain", "French": "Pluie" }
		),
		"Extremely Harsh Sunlight": new TerrainChange
		(
			{ "English": "Extremely Harsh Sunlight", "French": "Soleil intense" }
		),
		"Heavy Rain": new TerrainChange
		(
			{ "English": "Heavy Rain", "French": "Pluie Battante" }
		),
		"Strong Winds": new TerrainChange
		(
			{ "English": "Strong Winds", "French": "Vent Mystérieux" }
		),
		"Grassy Terrain": new TerrainChange
		(
			{ "English": "Grassy Terrain", "French": "Champ Herbu" }
		),
		"Electric Terrain": new TerrainChange
		(
			{ "English": "Electric Terrain", "French": "Champ Électrifié" }
		),
		"Misty Terrain": new TerrainChange
		(
			{ "English": "Misty Terrain", "French": "Champ Brumeux" }
		),
		"Psychic Terrain": new TerrainChange
		(
			{ "English": "Psychic Terrain", "French": "Champ Psychique" }
		),
		"Gravity": new TerrainChange
		(
			{ "English": "Gravity", "French": "Gravité" }
		)
	};
}