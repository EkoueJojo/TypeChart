/*
 * Project : Types Table
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

	/**
	 * Get an array with the affinities of the selected types put together on the same pokémon
	 * @type {Object.<string, number>} Name of the type with its effectiveness
	 */
	static get SelectedTypesAffinities()
	{
		let newType = new Type("", { });

		Object.keys(Type.TYPES).forEach
			(
				attackingType =>
				{
					newType.Affinities[attackingType] = 1;

					for (let i = 0; i < Type.selectedTypesNames.length; i++)
					{
						newType.Affinities[attackingType] *= Type.TYPES[Type.selectedTypesNames[i]].Affinities[attackingType] ?? 1;
					}
				}
			);

		return newType.Affinities;
	}

	/**
	 * Get an array with the best effectiveness of the selected types against every type
	 * @type {Object.<string, number>} Name of the type with its affinity
	 */
	static get SelectedTypesCoverage()
	{
		let newType = new Type("", {});

		Object.keys(Type.TYPES).forEach
			(
				defendingType =>
				{
					let bestMultiplier = 0;

					Type.selectedTypesNames.forEach
						(
							attackingTypeName =>
							{
								let multiplier = Type.TYPES[defendingType].Affinities[attackingTypeName] ?? 1;

								if (multiplier > bestMultiplier)
								{
									bestMultiplier = multiplier;
								}
							}
						);

					newType.Affinities[defendingType] = bestMultiplier;
				}
			);

		return newType.Affinities;
	}

	/**
	 * The names of the type in different languages
	 * @type {Object.<string, string>} Name of the language in english with translation of the type in that language
	 */
	#names;

	/**
	 * All the affinities of this type to every type
	 * @type {Object.<string, number>} Name of the type with its effectiveness
	 */
	#affinities;

	/**
	 * If the type has been chosen or not
	 * @type {boolean}
	 */
	#selected = false;

	/**
	 * The names of the type in different languages
	 * @type {Object.<string, string>} Name of the language in english with translation of the type in that language
	 */
	get Names()
	{
		return this.#names;
	};

	/**
	 * All the affinities of this type to every type
	 * @type {Object.<string, number>} Name of the type with its effectiveness
	 */
	get Affinities()
	{
		return this.#affinities;
	};

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

		let button = document.getElementById(this.#names["English"] + "Button");

		if (this.#selected)
		{
			Type.selectedTypesNames.push(this.#names.English);
			button.classList.add("Selected");
		}
		else
		{
			Type.selectedTypesNames.splice(Type.selectedTypesNames.indexOf(this.#names.English), 1);
			button.classList.remove("Selected");
		}
	}

	/**
	 * @param {Object.<string, string>} names The names of the type in different languages
	 * @param {Object.<string, number>} affinities All the affinities of this type to every type
	 */
	constructor(names, affinities)
	{
		this.#names = names;
		this.#affinities = affinities;
	}

	/**
	 * Create a double type from two types
	 * @param {Type} firstType
	 * @param {Type} secondType
	 * @returns {Type}
	 */
	static Combine(firstType, secondType)
	{
		let doubleType = new Type({ }, { });

		for (let nameLanguage in firstType.Names)
		{
			doubleType.Names[nameLanguage] = firstType.Names[nameLanguage] + " / " + secondType.Names[nameLanguage];
		}

		for (let typeName in Type.TYPES)
		{
			let multiplier = (firstType.Affinities[typeName] ?? 1) * (secondType.Affinities[typeName] ?? 1);

			if (multiplier != 1)
			{
				doubleType.Affinities[typeName] = multiplier;
			}
		}

		return doubleType;
	}
}