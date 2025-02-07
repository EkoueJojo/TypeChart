/*
 * Project : Types Table
 * Author : EkoueJojo
 * Date : 15/11/22
 */

/**
 * Create a table and add it in the tbody named "TypesTable"
 */
function GenerateTable()
{
	let table = document.getElementById("TypesTable");

	table.innerHTML = "";

	const TYPE_NAMES = Object.keys(Type.TYPES);

	const TABLE_WIDTH = 3;
	const TABLE_HEIGHT = TYPE_NAMES.length / TABLE_WIDTH;

	for (let line = 1; line <= TABLE_HEIGHT; line++)
	{
		let tr = document.createElement("tr");

		for (let column = 1; column <= TABLE_WIDTH; column++)
		{
			let td = document.createElement("td");
			let button = document.createElement("button");
			let image = document.createElement("img");

			let typeNames = Type.TYPES[TYPE_NAMES[(line - 1) * TABLE_WIDTH + column - 1]].Names;
			let typeName = typeNames["English"];
			let translatedTypeName = typeNames[GetLanguage()];

			button.id = typeName + "Button";
			button.className = "TypeButton";

			button.addEventListener("click", function () { SelectType(typeName); });

			image.id = typeName + "NameImage";
			image.src = GetTypeImageLink(typeName);
			image.alt = translatedTypeName;
			image.title = translatedTypeName;

			button.appendChild(image);
			td.appendChild(button);
			tr.appendChild(td);
		}

		table.appendChild(tr);
	}
}

/**
 * Activate or deactivate a type button and the corresponding type
 * @param {string} typeName
 */
function SelectType(typeName)
{
	let type = Type.TYPES[typeName];

	type.Selected = !type.Selected;

	ShowAffinitiesAndCoverage();
}

/**
 * Deselect all the types
 */
function ResetTypes()
{
	for (const TYPE_NAME in Type.TYPES)
	{
		if (Object.hasOwnProperty.call(Type.TYPES, TYPE_NAME))
		{
			Type.TYPES[TYPE_NAME].Selected = false;
		}
	}

	ShowAffinitiesAndCoverage();
	CreateNumbers({});
}

/**
 * Switch to the corresponding tab
 * @param {boolean} toCoverage To affinities if false
 */
function SwitchTab(toCoverage)
{
	if (toCoverage)
	{
		document.getElementById("AffinitiesButton").classList.remove("Selected");
		document.getElementById("AffinitiesSection").style.display = "none";

		document.getElementById("CoverageButton").classList.add("Selected");
		document.getElementById("CoverageSection").style.removeProperty("display");
	}
	else
	{
		document.getElementById("AffinitiesButton").classList.add("Selected");
		document.getElementById("AffinitiesSection").style.removeProperty("display");

		document.getElementById("CoverageButton").classList.remove("Selected");
		document.getElementById("CoverageSection").style.display = "none";
	}
}

/**
 * Show both the affinities and the coverage of the selected types on the page
 */
function ShowAffinitiesAndCoverage()
{
	ShowAffinities();
	ShowCoverage();
}

/**
 * Show the affinities of the selected types on the page
 */
function ShowAffinities()
{
	document.getElementById("Affinities").innerHTML = "";

	let nbAffinities = {};

	if (Type.selectedTypesNames.length > 0)
	{
		let affinities = Type.SelectedTypesAffinities;
		let affinitiesIcons = [];

		Object.keys(Type.TYPES).forEach
			(
				typeName =>
				{
					if (!(affinities[typeName] in affinitiesIcons))
					{
						affinitiesIcons[affinities[typeName]] = [];
						nbAffinities[affinities[typeName]] = 0;
					}

					nbAffinities[affinities[typeName]]++;
					affinitiesIcons[affinities[typeName]].push(CreateTypeIcon(typeName));
				}
			);

		Object.keys(affinitiesIcons).sort((a, b) => b - a).forEach
			(
				multiplier =>
				{
					CreateAffinityLines(multiplier, affinitiesIcons[multiplier]).forEach
						(
							line =>
							{
								document.getElementById("Affinities").appendChild(line);
							}
						);
				}
			);
	}
}

/**
 * Show the coverage of the selected types on the page
 */
function ShowCoverage()
{
	document.getElementById("Coverage").innerHTML = "";

	let nbCoverages = {};

	if (Type.selectedTypesNames.length > 0)
	{
		let coverage = Type.SelectedTypesCoverage;
		let coverageIcons = [];
		let typesNames = Object.keys(Type.TYPES);

		typesNames.forEach
			(
				typeName =>
				{
					if (!(coverage[typeName] in coverageIcons))
					{
						coverageIcons[coverage[typeName]] = [];
						nbCoverages[coverage[typeName]] = 0;
					}

					nbCoverages[coverage[typeName]]++;
					coverageIcons[coverage[typeName]].push(CreateTypeIcon(typeName));
				}
			);


		if (document.getElementById("DoubleTypesButton").checked)
		{
			for (let firstTypeIndex = 0; firstTypeIndex < typesNames.length; firstTypeIndex++)
			{
				for (let secondTypeIndex = firstTypeIndex + 1; secondTypeIndex < typesNames.length; secondTypeIndex++)
				{
					let doubleType = Type.Combine(Type.TYPES[typesNames[firstTypeIndex]], Type.TYPES[typesNames[secondTypeIndex]]);

					let bestMultiplier = 0;

					Type.selectedTypesNames.forEach
					(
						typeName =>
						{
							let multiplier = doubleType.Affinities[typeName] ?? 1;

							if (multiplier > bestMultiplier)
							{
								bestMultiplier = multiplier;
							}
						}
					)

					if (!(bestMultiplier in coverageIcons))
					{
						nbCoverages[bestMultiplier] = 0;
						coverageIcons[bestMultiplier] = [];
					}

					nbCoverages[bestMultiplier]++;
					coverageIcons[bestMultiplier].push(CreateTypeComboIcons(typesNames[firstTypeIndex], typesNames[secondTypeIndex]));
				}
			}
		}

		Object.keys(coverageIcons).sort((a, b) => b - a).forEach
			(
				multiplier =>
				{
					document.getElementById("Coverage").appendChild(CreateCoverageLine(multiplier, coverageIcons[multiplier]));
				}
			);
	}
}

/**
 * Get the current language
 * @returns {string} English name of the language with "English" by default
 */
function GetLanguage()
{
	return localStorage.getItem("Language") ?? "English";
}

/**
 * Set the current language
 * @param {string} name English name of the language
 */
function SetLanguage(name)
{
	localStorage.setItem("Language", name);

	switch (name)
	{
		case "English":
			document.getElementsByTagName("html")[0].lang = "en";
			break;
		case "French":
			document.getElementsByTagName("html")[0].lang = "fr";
			break;
	}

	document.getElementById("LanguagesButtonTitle").selected = true;

	UpdateAllText();
	UpdateButtonTypes();
	ShowAffinitiesAndCoverage();
}

/**
 * Open the dialog containing the settings
 */
function OpenSettings()
{
	document.getElementById("Settings").showModal();
}

/**
 * Close the dialog containing the settings
 */
function CloseSettings()
{
	document.getElementById("Settings").close();
}

/**
 * Close the dialog when clicking around it
 * @param {Event} event
 */
function CloseSettingsViaModal(event)
{
	if (event.target === document.getElementById("Settings")) CloseSettings();
}

/**
 * Change the texts in the application to match the chosen language
 */
function UpdateAllText()
{
	document.getElementsByTagName("title")[0].innerText = { "English": "Types Table", "French": "Table des Types" }[GetLanguage()];
	document.getElementById("AppTitle").innerText = { "English": "Types Table", "French": "Table des Types" }[GetLanguage()];
	document.getElementById("SettingsTitle").innerText = { "English": "Settings", "French": "Paramètres" }[GetLanguage()];

	document.getElementById("LanguagesButtonTitle").innerText = { "English": "Languages", "French": "Langues" }[GetLanguage()];
	document.getElementById("IconStyleButtonTitle").innerText = { "English": "Icon style", "French": "Style d'icônes" }[GetLanguage()];

	document.getElementById("LanguagesButton").value = GetLanguage();
	document.getElementById("IconStyleButton").value = GetIconStyleGame();

	document.getElementById("LgpeStyleOption").innerText = { "English": "Let's Go Pikachu and Let's Go Eevee", "French": "Let's Go Pikachu et Let's Go Évoli" }[GetLanguage()];
	document.getElementById("SwshStyleOption").innerText = { "English": "Sword and Shield", "French": "Épée et Bouclier" }[GetLanguage()];
	document.getElementById("BdspStyleOption").innerText = { "English": "Brilliant Diamond and Shining Pearl", "French": "Diamant Étincelant et Perle Scintillante" }[GetLanguage()];
	document.getElementById("LaStyleOption").innerText = { "English": "Legends : Arceus", "French": "Légendes : Arceus" }[GetLanguage()];
	document.getElementById("SvStyleOption").innerText = { "English": "Scarlet and Violet", "French": "Écarlate et Violet" }[GetLanguage()];

	document.getElementById("ResetButton").innerText = { "English": "Deselect all", "French": "Tout désélectionner" }[GetLanguage()];

	document.getElementById("AffinitiesButton").innerText = { "English": "Defense", "French": "Défense" }[GetLanguage()];
	document.getElementById("CoverageButton").innerText = { "English": "Attack", "French": "Attaque" }[GetLanguage()];

	document.getElementById("DoubleTypesButtonLabel").innerText = { "English": "Double Types ", "French": "Doubles Types " }[GetLanguage()];

	document.getElementById("AffinitiesTitle").innerText = { "English": "Defense", "French": "Défense" }[GetLanguage()];
	document.getElementById("CoverageTitle").innerText = { "English": "Attack", "French": "Attaque" }[GetLanguage()];
}

/**
 * Get the selected game where the type icons come from
 * @returns {string} Abbreviation of the game's name with "SV" (Scarlet and Violet) by default
 */
function GetIconStyleGame()
{
	return localStorage.getItem("IconStyleGame") ?? "SV";
}

/**
 * Set the selected game where the type icons come from
 * @param {string} name Abbreviation of the game's name with "SV" (Scarlet and Violet) by default
 */
function SetIconStyleGame(name)
{
	localStorage.setItem("IconStyleGame", name);

	document.getElementById("IconStyleButtonTitle").selected = true;

	ShowAffinitiesAndCoverage();
	UpdateButtonTypes();
}

/**
 * Change the images on the buttons to match the chosen language and icon style and language
 */
function UpdateButtonTypes()
{
	for (const typeName in Type.TYPES)
	{
		if (Object.hasOwnProperty.call(Type.TYPES, typeName))
		{
			document.getElementById(typeName + "NameImage").src = GetTypeImageLink(typeName);
			document.getElementById(typeName + "NameImage").alt = Type.TYPES[typeName].Names[GetLanguage()];
			document.getElementById(typeName + "NameImage").title = Type.TYPES[typeName].Names[GetLanguage()];
		}
	}
}

/**
 * Create one or multiple lines for the icons of the affinities
 * @param {number} multiplier Affinity power
 * @param {HTMLImageElement[]} typesIcons Array of icons representing the types to add in the line
 * @returns {HTMLTableRowElement[]} List of rows of icon types
 */
function CreateAffinityLines(multiplier, typesIcons)
{
	const MAX_ICON_NUMBER_ON_LINE = 9;

	let numberOfLines = Math.ceil(typesIcons.length / MAX_ICON_NUMBER_ON_LINE);
	let lines = [];

	let multiplierTitle = document.createElement("h3");
	let multiplierContainer = document.createElement("th");

	multiplierTitle.innerText += multiplier >= 1 || multiplier == 0 ? "× " + multiplier : "÷ " + 1 / multiplier;

	multiplierContainer.rowSpan = numberOfLines;
	multiplierContainer.className = "AffinitiesLineMultiplier";

	multiplierContainer.appendChild(multiplierTitle);

	for (let lineIndex = 0; lineIndex < numberOfLines; lineIndex++)
	{
		lines[lineIndex] = document.createElement("tr");
		lines[lineIndex].className = "AffinitiesLine";

		if (lineIndex == 0)
		{
			lines[lineIndex].appendChild(multiplierContainer);
		}

		for (let iconNumber = Math.ceil(typesIcons.length / numberOfLines * lineIndex); iconNumber < typesIcons.length && (iconNumber + 1) - typesIcons.length / numberOfLines * lineIndex <= Math.ceil(typesIcons.length / numberOfLines); iconNumber++)
		{
			let typesContainer = document.createElement("td");
			typesContainer.appendChild(typesIcons[iconNumber]);
			lines[lineIndex].appendChild(typesContainer);
		}
	}

	return lines;
}

/**
 * Create a line for the icon of the coverage
 * @param {number} multiplier
 * @param {HTMLImageElement[]} typesIcons Array of icons representing the types to add in the line
 * @returns {HTMLDivElement} Line containing the icon types and the multiplier
 */
function CreateCoverageLine(multiplier, typesIcons)
{
	let line = document.createElement("div");
	let multiplierTitle = document.createElement("h3");
	let typesContainer = document.createElement("div");

	line.className = "CoverageLine";

	switch (multiplier)
	{
		case "4":
			multiplierTitle.innerText = { English: "Doubly super effective against", French: "Doublement super efficace contre" }[GetLanguage()];
			break;
		case "2":
			multiplierTitle.innerText = { English: "Super effective against", French: "Super efficace contre" }[GetLanguage()];
			break;
		case "1":
			multiplierTitle.innerText = { English: "Effective against", French: "Efficace contre" }[GetLanguage()];
			break;
		case "0.5":
			multiplierTitle.innerText = { English: "Not very effective against", French: "Pas très efficace contre" }[GetLanguage()];
			break;
		case "0.25":
			multiplierTitle.innerText = { English: "Very little effective against", French: "Très peu efficace contre" }[GetLanguage()];
			break;
		case "0":
			multiplierTitle.innerText = { English: "Ineffective against", French: "Inefficace contre" }[GetLanguage()];
			break;
	}

	multiplierTitle.innerText += ` (${typesIcons.length})`;
	multiplierTitle.className = "CoverageLineMultiplier";

	typesContainer.className = "CoverageContainer";

	typesIcons.forEach
		(
			icon =>
			{
				typesContainer.appendChild(icon);
			}
		);

	line.appendChild(multiplierTitle);
	line.appendChild(typesContainer);

	return line;
}

/**
 * Create an icon of a type
 * @param {string} typeName English name of the type
 * @returns {HTMLImageElement} html img with the icon
 */
function CreateTypeIcon(typeName)
{
	let icon = document.createElement("img");
	icon.className = "TypeIcon";
	icon.src = GetTypeIconLink(typeName);

	let translatedTypeName = Type.TYPES[typeName].Names[GetLanguage()];
	icon.alt = translatedTypeName;
	icon.title = translatedTypeName;

	return icon;
}

/**
 * Create a group of two icons representing a double type
 * @param {string} firstTypeName English name of the first type
 * @param {string} secondTypeName English name of the seoncd type
 * @returns {HTMLDivElement} html div with two child icons
 */
function CreateTypeComboIcons(firstTypeName, secondTypeName)
{
	let iconContainer = document.createElement("div");
	iconContainer.className = "TypeCombo";

	let firstIcon = CreateTypeIcon(firstTypeName);
	let secondIcon = CreateTypeIcon(secondTypeName);

	iconContainer.appendChild(firstIcon);
	iconContainer.appendChild(secondIcon);

	return iconContainer;
}

/**
 * Get the image associated with the given type in the application's language
 * @param {string} typeName English name of the type
 * @returns {string} Relative link of the image
 */
function GetTypeImageLink(typeName)
{
	return "./img/" + GetIconStyleGame() + "/" + typeName + "_" + GetLanguage() + ".png";
}

/**
 * Get the link of the icon associated with the given type
 * @param {string} typeName English name of the type
 * @returns {string} Relative link of the icon
 */
function GetTypeIconLink(typeName)
{
	return "./img/" + GetIconStyleGame() + "/" + typeName + "_Icon.png";
}

GenerateTable();
UpdateAllText();