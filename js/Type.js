/*
 * Project : Type Chart
 * Author : Jordan Folly
 * Date : 15/11/22
 */

/**
 * An element describing a pokémon's weaknesses, resistances and immunities
 */
class Type
{
	/**
	 * All the existing types
	 * @type {Object.<string, Type>}
	 */
	static TYPES =
		{
			Bug: new Type
				(
					{
						English: "Bug",
						French: "Insecte"
					},
					{
						Fighting: 0.5,
						Fire: 2,
						Flying: 2,
						Grass: 0.5,
						Ground: 0.5,
						Rock: 2
					}
				),
			Dark: new Type
				(
					{
						English: "Dark",
						French: "Ténèbres"
					},
					{
						Bug: 2,
						Dark: 0.5,
						Fairy: 2,
						Fighting: 2,
						Ghost: 0.5,
						Psychic: 0
					}
				),
			Dragon: new Type
				(
					{
						English: "Dragon",
						French: "Dragon"
					},
					{
						Dragon: 2,
						Electric: 0.5,
						Fairy: 2,
						Fire: 0.5,
						Grass: 0.5,
						Ice: 2,
						Water: 0.5
					}
				),
			Electric: new Type
				(
					{
						English: "Electric",
						French: "Électrik"
					},
					{
						Electric: 0.5,
						Flying: 0.5,
						Ground: 2,
						Steel: 0.5
					}
				),
			Fairy: new Type
				(
					{
						English: "Fairy",
						French: "Fée"
					},
					{
						Bug: 0.5,
						Dark: 0.5,
						Dragon: 0,
						Fighting: 0.5,
						Poison: 2,
						Steel: 2
					}
				),
			Fighting: new Type
				(
					{
						English: "Fighting",
						French: "Combat"
					},
					{
						Bug: 0.5,
						Dark: 0.5,
						Fairy: 2,
						Flying: 2,
						Psychic: 2,
						Rock: 0.5
					}
				),
			Fire: new Type
				(
					{
						English: "Fire",
						French: "Feu"
					},
					{
						Bug: 0.5,
						Fairy: 0.5,
						Fire: 0.5,
						Grass: 0.5,
						Ground: 2,
						Ice: 0.5,
						Rock: 2,
						Steel: 0.5,
						Water: 2
					}
				),
			Flying: new Type
				(
					{
						English: "Flying",
						French: "Vol"
					},
					{
						Bug: 0.5,
						Electric: 2,
						Fighting: 0.5,
						Grass: 0.5,
						Ground: 0,
						Ice: 2,
						Rock: 2
					}
				),
			Ghost: new Type
				(
					{
						English: "Ghost",
						French: "Spectre"
					},
					{
						Bug: 0.5,
						Dark: 2,
						Fighting: 0,
						Ghost: 2,
						Normal: 0,
						Poison: 0.5
					}
				),
			Grass: new Type
				(
					{
						English: "Grass",
						French: "Plante"
					},
					{
						Bug: 2,
						Electric: 0.5,
						Fire: 2,
						Flying: 2,
						Grass: 0.5,
						Ground: 0.5,
						Ice: 2,
						Poison: 2,
						Water: 0.5
					}
				),
			Ground: new Type
				(
					{
						English: "Ground",
						French: "Sol"
					},
					{
						Electric: 0,
						Grass: 2,
						Ice: 2,
						Poison: 0.5,
						Rock: 0.5,
						Water: 2
					}
				),
			Ice: new Type
				(
					{
						English: "Ice",
						French: "Glace"
					},
					{
						Fighting: 2,
						Fire: 2,
						Ice: 0.5,
						Rock: 2,
						Steel: 2
					}
				),
			Normal: new Type
				(
					{
						English: "Normal",
						French: "Normal"
					},
					{
						Fighting: 2,
						Ghost: 0
					}
				),
			Poison: new Type
				(
					{
						English: "Poison",
						French: "Poison"
					},
					{
						Bug: 0.5,
						Psychic: 2,
						Ground: 2,
						Fairy: 0.5,
						Fighting: 0.5,
						Grass: 0.5,
						Poison: 0.5
					}
				),
			Psychic: new Type
				(
					{
						English: "Psychic",
						French: "Psy"
					},
					{
						Bug: 2,
						Dark: 2,
						Fighting: 0.5,
						Ghost: 2,
						Psychic: 0.5
					}
				),
			Rock: new Type
				(
					{
						English: "Rock",
						French: "Roche"
					},
					{
						Fighting: 2,
						Fire: 0.5,
						Flying: 0.5,
						Grass: 2,
						Ground: 2,
						Normal: 0.5,
						Poison: 0.5,
						Steel: 2,
						Water: 2
					}
				),
			Steel: new Type
				(
					{
						English: "Steel",
						French: "Acier"
					},
					{
						Bug: 0.5,
						Dragon: 0.5,
						Fairy: 0.5,
						Fighting: 2,
						Flying: 0.5,
						Fire: 2,
						Grass: 0.5,
						Ground: 2,
						Ice: 0.5,
						Normal: 0.5,
						Poison: 0,
						Psychic: 0.5,
						Rock: 0.5,
						Steel: 0.5
					}
				),
			Water: new Type
				(
					{
						English: "Water",
						French: "Eau"
					},
					{
						Electric: 2,
						Fire: 0.5,
						Grass: 2,
						Ice: 0.5,
						Steel: 0.5,
						Water: 0.5
					}
				)
		};

	/**
	 * The names of the chosen types
	 * @type {string[]}
	 */
	static selectedTypesNames = [];

	GetAffinities()
	{
		let affinities = {};

		Object.keys(Type.TYPES).forEach
			(
				attackingType =>
				{
					affinities[attackingType] = this.Affinities[attackingType] ?? 1;
				}
			);

		return affinities;
	}

	GetCoverage()
	{
		let coverage = {};

		Object.keys(Type.TYPES).forEach
			(
				defendingType =>
				{
					coverage[defendingType] = Type.TYPES[defendingType].GetAffinities(this.Names.English)[this.Names.English];
				}
			);

		return coverage;
	}

	GetEffectiveness(...typeNames)
	{
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

	/**
	 * Get an array with the affinities of the selected types put together on the same pokémon
	 * @type {Object.<string, number>} Name of the type with its effectiveness
	 */
	static get SelectedTypesAffinities()
	{
		if (Type.selectedTypesNames.length <= 0)
		{
			return {};
		}

		let affinities = Type.TYPES[Type.selectedTypesNames[0]].GetAffinities();

		for (let i = 1; i < Type.selectedTypesNames.length; i++)
		{
			let currentTypeAffinities = Type.TYPES[Type.selectedTypesNames[i]].GetAffinities();

			Object.keys(Type.TYPES).forEach
			(
				typeName =>
				{
					affinities[typeName] *= currentTypeAffinities[typeName];
				}
			);
		}

		return affinities;
	}

	/**
	 * Get an array with the best effectiveness of the selected types against every type
	 * @type {Object.<string, number>} Name of the type with its affinity
	 */
	static get SelectedTypesCoverage()
	{
		if (Type.selectedTypesNames.length <= 0)
		{
			return null;
		}

		let coverage = Type.TYPES[Type.selectedTypesNames[0]].GetCoverage();

		for (let i = 1; i < Type.selectedTypesNames.length; i++)
		{
			let currentTypeCoverage = Type.TYPES[Type.selectedTypesNames[i]].GetCoverage();

			Object.keys(Type.TYPES).forEach
			(
				typeName =>
				{
					if (currentTypeCoverage[typeName] > coverage[typeName])
					{
						coverage[typeName] = currentTypeCoverage[typeName];
					}
				}
			);
		}

		return coverage;
	}

	/**
	 * The names of the type in different languages
	 * @type {Object.<string, string>} Name of the language in english with translation of the type in that language
	 */
	Names;

	/**
	 * All the affinities of this type to every type
	 * @type {Object.<string, number>} Name of the type with its effectiveness
	 */
	Affinities;

	/**
	 * If the type has been chosen or not
	 * @type {boolean}
	 */
	#selected = false;

	/**
	 * If the type has been chosen or not
	 * @type {boolean}
	 */
	get Selected()
	{
		return this.#selected;
	}

	/**
	 * If the type has been chosen or not
	 */
	set Selected(value)
	{
		this.#selected = value;

		let button = document.getElementById(this.Names["English"] + "Button");

		if (this.#selected)
		{
			Type.selectedTypesNames.push(this.Names.English);
			button.classList.add("Selected");
		}
		else
		{
			Type.selectedTypesNames.splice(Type.selectedTypesNames.indexOf(this.Names.English), 1);
			button.classList.remove("Selected");
		}
	}

	/**
	 * @param {Object.<string, string>} names The names of the type in different languages
	 * @param {Object.<string, number>} affinities All the affinities of this type to every type
	 */
	constructor(names, affinities)
	{
		this.Names = names;
		this.Affinities = affinities;
	}
}