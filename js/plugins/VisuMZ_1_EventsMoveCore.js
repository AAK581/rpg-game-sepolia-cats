//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.60;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.60] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.60: August 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0x17c4f7=_0x308c;(function(_0x1587f8,_0x38c46c){const _0x4f000a=_0x308c,_0x3278be=_0x1587f8();while(!![]){try{const _0x9348ec=-parseInt(_0x4f000a(0x1c4))/0x1*(parseInt(_0x4f000a(0x225))/0x2)+-parseInt(_0x4f000a(0x430))/0x3*(-parseInt(_0x4f000a(0x1f6))/0x4)+-parseInt(_0x4f000a(0x1c3))/0x5*(-parseInt(_0x4f000a(0x1ad))/0x6)+parseInt(_0x4f000a(0x2c8))/0x7*(parseInt(_0x4f000a(0x644))/0x8)+parseInt(_0x4f000a(0x5e4))/0x9+parseInt(_0x4f000a(0x1cb))/0xa*(-parseInt(_0x4f000a(0x582))/0xb)+parseInt(_0x4f000a(0x3f5))/0xc;if(_0x9348ec===_0x38c46c)break;else _0x3278be['push'](_0x3278be['shift']());}catch(_0x5e921e){_0x3278be['push'](_0x3278be['shift']());}}}(_0x33b4,0xbe030));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x231102){const _0x1cee9c=_0x308c;return _0x231102['status']&&_0x231102['description'][_0x1cee9c(0x233)]('['+label+']');})[0x0];VisuMZ[label][_0x17c4f7(0x2fe)]=VisuMZ[label][_0x17c4f7(0x2fe)]||{},VisuMZ[_0x17c4f7(0x541)]=function(_0x5907e3,_0xe898aa){const _0x349812=_0x17c4f7;for(const _0x3e6370 in _0xe898aa){if(_0x3e6370[_0x349812(0x49f)](/(.*):(.*)/i)){const _0x2e266b=String(RegExp['$1']),_0x40de72=String(RegExp['$2'])[_0x349812(0x2f4)]()[_0x349812(0x485)]();let _0x2db26b,_0x1d28da,_0x5d5e41;switch(_0x40de72){case _0x349812(0x358):_0x2db26b=_0xe898aa[_0x3e6370]!==''?Number(_0xe898aa[_0x3e6370]):0x0;break;case _0x349812(0x533):_0x1d28da=_0xe898aa[_0x3e6370]!==''?JSON['parse'](_0xe898aa[_0x3e6370]):[],_0x2db26b=_0x1d28da[_0x349812(0x1c2)](_0x1d4a73=>Number(_0x1d4a73));break;case _0x349812(0x63a):_0x2db26b=_0xe898aa[_0x3e6370]!==''?eval(_0xe898aa[_0x3e6370]):null;break;case _0x349812(0x2dc):_0x1d28da=_0xe898aa[_0x3e6370]!==''?JSON['parse'](_0xe898aa[_0x3e6370]):[],_0x2db26b=_0x1d28da[_0x349812(0x1c2)](_0x18cd89=>eval(_0x18cd89));break;case _0x349812(0x32d):_0x2db26b=_0xe898aa[_0x3e6370]!==''?JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370]):'';break;case _0x349812(0x48e):_0x1d28da=_0xe898aa[_0x3e6370]!==''?JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370]):[],_0x2db26b=_0x1d28da[_0x349812(0x1c2)](_0x4ade43=>JSON[_0x349812(0x43f)](_0x4ade43));break;case _0x349812(0x45e):_0x2db26b=_0xe898aa[_0x3e6370]!==''?new Function(JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370])):new Function(_0x349812(0x2cd));break;case _0x349812(0x2ae):_0x1d28da=_0xe898aa[_0x3e6370]!==''?JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370]):[],_0x2db26b=_0x1d28da[_0x349812(0x1c2)](_0x4fe9f6=>new Function(JSON[_0x349812(0x43f)](_0x4fe9f6)));break;case _0x349812(0x616):_0x2db26b=_0xe898aa[_0x3e6370]!==''?String(_0xe898aa[_0x3e6370]):'';break;case _0x349812(0x5e0):_0x1d28da=_0xe898aa[_0x3e6370]!==''?JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370]):[],_0x2db26b=_0x1d28da['map'](_0x55da8e=>String(_0x55da8e));break;case _0x349812(0x4d1):_0x5d5e41=_0xe898aa[_0x3e6370]!==''?JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370]):{},_0x5907e3[_0x2e266b]={},VisuMZ[_0x349812(0x541)](_0x5907e3[_0x2e266b],_0x5d5e41);continue;case _0x349812(0x253):_0x1d28da=_0xe898aa[_0x3e6370]!==''?JSON[_0x349812(0x43f)](_0xe898aa[_0x3e6370]):[],_0x2db26b=_0x1d28da[_0x349812(0x1c2)](_0x1f2517=>VisuMZ['ConvertParams']({},JSON[_0x349812(0x43f)](_0x1f2517)));break;default:continue;}_0x5907e3[_0x2e266b]=_0x2db26b;}}return _0x5907e3;},(_0x47fbc8=>{const _0x4254fc=_0x17c4f7,_0x5101f9=_0x47fbc8[_0x4254fc(0x578)];for(const _0x44e717 of dependencies){if(!Imported[_0x44e717]){alert(_0x4254fc(0x5f3)[_0x4254fc(0x63e)](_0x5101f9,_0x44e717)),SceneManager[_0x4254fc(0x4d3)]();break;}}const _0x2c0e1f=_0x47fbc8[_0x4254fc(0x192)];if(_0x2c0e1f[_0x4254fc(0x49f)](/\[Version[ ](.*?)\]/i)){const _0x3411fd=Number(RegExp['$1']);_0x3411fd!==VisuMZ[label][_0x4254fc(0x655)]&&(alert(_0x4254fc(0x57a)[_0x4254fc(0x63e)](_0x5101f9,_0x3411fd)),SceneManager[_0x4254fc(0x4d3)]());}if(_0x2c0e1f['match'](/\[Tier[ ](\d+)\]/i)){const _0x63dc2=Number(RegExp['$1']);_0x63dc2<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x5101f9,_0x63dc2,tier)),SceneManager[_0x4254fc(0x4d3)]()):tier=Math[_0x4254fc(0x236)](_0x63dc2,tier);}VisuMZ[_0x4254fc(0x541)](VisuMZ[label][_0x4254fc(0x2fe)],_0x47fbc8[_0x4254fc(0x335)]);})(pluginData),VisuMZ['OperateValues']=function(_0x3eeed0,_0xf191b9,_0x432843){switch(_0x432843){case'=':return _0xf191b9;break;case'+':return _0x3eeed0+_0xf191b9;break;case'-':return _0x3eeed0-_0xf191b9;break;case'*':return _0x3eeed0*_0xf191b9;break;case'/':return _0x3eeed0/_0xf191b9;break;case'%':return _0x3eeed0%_0xf191b9;break;}return _0x3eeed0;},PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],'AutoMoveEvents',_0x344819=>{const _0x309bbd=_0x17c4f7;VisuMZ[_0x309bbd(0x541)](_0x344819,_0x344819);switch(_0x344819[_0x309bbd(0x22d)]){case _0x309bbd(0x26c):$gameSystem[_0x309bbd(0x503)](!![]);break;case _0x309bbd(0x4fc):$gameSystem[_0x309bbd(0x503)](![]);break;case _0x309bbd(0x21d):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x309bbd(0x513)]());break;}}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x2d4),_0x5ab55f=>{const _0x5dc208=_0x17c4f7;VisuMZ[_0x5dc208(0x541)](_0x5ab55f,_0x5ab55f);const _0x4b0c79=$gameTemp['getLastPluginCommandInterpreter'](),_0x200da9={'mapId':_0x5ab55f[_0x5dc208(0x51b)],'eventId':_0x5ab55f[_0x5dc208(0x353)]||_0x4b0c79[_0x5dc208(0x415)](),'pageId':_0x5ab55f[_0x5dc208(0x510)]};if(_0x200da9[_0x5dc208(0x567)]<=0x0)_0x200da9[_0x5dc208(0x567)]=$gameMap?$gameMap['mapId']():0x1;$gameTemp[_0x5dc208(0x293)]()[_0x5dc208(0x1e5)](_0x200da9);}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],'DashEnableToggle',_0xb00013=>{const _0x1b6367=_0x17c4f7;VisuMZ[_0x1b6367(0x541)](_0xb00013,_0xb00013);switch(_0xb00013[_0x1b6367(0x22d)]){case _0x1b6367(0x2b5):$gameSystem[_0x1b6367(0x1b0)](!![]);break;case _0x1b6367(0x409):$gameSystem[_0x1b6367(0x1b0)](![]);break;case _0x1b6367(0x21d):$gameSystem[_0x1b6367(0x1b0)](!$gameSystem[_0x1b6367(0x2db)]());break;}}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x630),_0x1eb315=>{const _0xab16b2=_0x17c4f7;VisuMZ[_0xab16b2(0x541)](_0x1eb315,_0x1eb315);const _0x4538b3=$gameTemp['getLastPluginCommandInterpreter']();_0x1eb315[_0xab16b2(0x51b)]=_0x1eb315['MapId']||$gameMap['mapId'](),$gameSystem[_0xab16b2(0x3cc)](_0x1eb315[_0xab16b2(0x51b)],_0x1eb315[_0xab16b2(0x353)]||_0x4538b3[_0xab16b2(0x415)](),_0x1eb315['IconIndex'],_0x1eb315['IconBufferX'],_0x1eb315['IconBufferY'],_0x1eb315['IconBlendMode'],![]);}),PluginManager['registerCommand'](pluginData['name'],_0x17c4f7(0x272),_0x3bb340=>{const _0x1b0c1c=_0x17c4f7;VisuMZ[_0x1b0c1c(0x541)](_0x3bb340,_0x3bb340);const _0x2ffb79=$gameTemp[_0x1b0c1c(0x293)]();_0x3bb340['MapId']=_0x3bb340['MapId']||$gameMap[_0x1b0c1c(0x567)](),$gameSystem[_0x1b0c1c(0x3cc)](_0x3bb340[_0x1b0c1c(0x51b)],_0x3bb340[_0x1b0c1c(0x353)]||_0x2ffb79[_0x1b0c1c(0x415)](),_0x3bb340[_0x1b0c1c(0x466)],_0x3bb340[_0x1b0c1c(0x58d)],_0x3bb340[_0x1b0c1c(0x408)],_0x3bb340[_0x1b0c1c(0x2a4)],!![]);}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x33e),_0x4a959a=>{const _0x53b250=_0x17c4f7;VisuMZ[_0x53b250(0x541)](_0x4a959a,_0x4a959a);const _0x2d6a4d=$gameTemp['getLastPluginCommandInterpreter']();_0x4a959a[_0x53b250(0x51b)]=_0x4a959a['MapId']||$gameMap[_0x53b250(0x567)](),$gameSystem['deleteIconsOnEventsDataKey'](_0x4a959a[_0x53b250(0x51b)],_0x4a959a[_0x53b250(0x353)]||_0x2d6a4d[_0x53b250(0x415)]());}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x1a9),_0x5610c6=>{const _0x3a17e0=_0x17c4f7;VisuMZ['ConvertParams'](_0x5610c6,_0x5610c6);const _0x137551=$gameTemp[_0x3a17e0(0x293)]();_0x5610c6[_0x3a17e0(0x51b)]=_0x5610c6[_0x3a17e0(0x51b)]||$gameMap['mapId'](),$gameSystem[_0x3a17e0(0x31e)](_0x5610c6[_0x3a17e0(0x51b)],_0x5610c6[_0x3a17e0(0x353)]||_0x137551['eventId']());}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x33a),_0x1ec6ab=>{const _0x5c629c=_0x17c4f7;if($gameMap)for(const _0x1e5a85 of $gameMap[_0x5c629c(0x5f9)]()){_0x1e5a85[_0x5c629c(0x1ba)](),_0x1e5a85[_0x5c629c(0x39b)]();}if(SceneManager[_0x5c629c(0x1ac)]()){const _0x58f48d=SceneManager[_0x5c629c(0x622)][_0x5c629c(0x1fa)];if(_0x58f48d)_0x58f48d['refreshEventLabels']();}}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x520),_0x32865a=>{const _0x57a3f9=_0x17c4f7;VisuMZ[_0x57a3f9(0x541)](_0x32865a,_0x32865a);switch(_0x32865a[_0x57a3f9(0x4f8)]){case _0x57a3f9(0x2b8):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x57a3f9(0x5af):$gameSystem[_0x57a3f9(0x1ea)](![]);break;case _0x57a3f9(0x21d):$gameSystem['setEventLabelsVisible'](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x61a),_0x2fab3c=>{const _0x138165=_0x17c4f7;VisuMZ[_0x138165(0x541)](_0x2fab3c,_0x2fab3c);const _0x285762=$gameTemp[_0x138165(0x293)]();if(!$gameMap)return;const _0x5ccc0c=$gameMap[_0x138165(0x4a4)](_0x2fab3c[_0x138165(0x353)]||_0x285762[_0x138165(0x415)]());if(_0x5ccc0c)_0x5ccc0c[_0x138165(0x3cf)]();}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x4aa),_0x352bda=>{const _0x19db9d=_0x17c4f7;VisuMZ[_0x19db9d(0x541)](_0x352bda,_0x352bda);const _0x38c947=$gameTemp['getLastPluginCommandInterpreter'](),_0x1e322e=_0x352bda[_0x19db9d(0x51b)]||$gameMap[_0x19db9d(0x567)](),_0x1b61e0=_0x352bda[_0x19db9d(0x353)]||_0x38c947[_0x19db9d(0x415)](),_0xbd177e=_0x352bda[_0x19db9d(0x24b)]||0x0,_0x24df88=_0x352bda[_0x19db9d(0x451)]||0x0,_0x3067cd=_0x352bda[_0x19db9d(0x5de)]||0x2,_0x129521=((_0x352bda[_0x19db9d(0x510)]||0x1)-0x1)[_0x19db9d(0x4b8)](0x0,0x13),_0x55dfb8=_0x352bda[_0x19db9d(0x39f)]||0x0;$gameSystem[_0x19db9d(0x1f3)](_0x1e322e,_0x1b61e0,_0xbd177e,_0x24df88,_0x3067cd,_0x129521,_0x55dfb8);}),PluginManager['registerCommand'](pluginData['name'],_0x17c4f7(0x2f1),_0x2d7269=>{const _0x5d3931=_0x17c4f7;VisuMZ[_0x5d3931(0x541)](_0x2d7269,_0x2d7269);const _0x53ec91=$gameTemp['getLastPluginCommandInterpreter'](),_0x56d33c=_0x2d7269[_0x5d3931(0x51b)]||$gameMap[_0x5d3931(0x567)](),_0x1ce8b3=_0x2d7269[_0x5d3931(0x353)]||_0x53ec91[_0x5d3931(0x415)]();$gameSystem[_0x5d3931(0x5a6)](_0x56d33c,_0x1ce8b3);}),VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x4dd)]=function(_0x209d32,_0xcb79d2){const _0x1b06ed=_0x17c4f7;_0xcb79d2=_0xcb79d2||{},_0x209d32[_0x1b06ed(0x5ea)]={'fadeIn':_0xcb79d2[_0x1b06ed(0x573)]||0x0,'fadeOut':_0xcb79d2[_0x1b06ed(0x58e)]||0x0},_0x209d32[_0x1b06ed(0x3ee)]={'x':_0xcb79d2[_0x1b06ed(0x56d)]||0x0,'y':_0xcb79d2['startOffsetY']||0x0},_0x209d32[_0x1b06ed(0x54d)]={'x':_0xcb79d2[_0x1b06ed(0x1ff)]||0x0,'y':_0xcb79d2[_0x1b06ed(0x610)]||0x0},_0x209d32['endScale']={'x':_0xcb79d2[_0x1b06ed(0x4e9)]||0x0,'y':_0xcb79d2[_0x1b06ed(0x38f)]||0x0},_0x209d32[_0x1b06ed(0x3fd)]={'x':_0xcb79d2['startScaleX']||0x0,'y':_0xcb79d2[_0x1b06ed(0x5d9)]||0x0},_0x209d32['angle']={'start':_0xcb79d2['startAngle']||0x0,'end':_0xcb79d2[_0x1b06ed(0x5bd)]||0x0},_0x209d32[_0x1b06ed(0x4f0)]={'arc':_0xcb79d2[_0x1b06ed(0x2c7)]||0x0};},PluginManager['registerCommand'](pluginData['name'],_0x17c4f7(0x5b3),_0x93ab44=>{const _0x8f5637=_0x17c4f7;if(!SceneManager[_0x8f5637(0x5b8)]())return;if(!Imported[_0x8f5637(0x4d7)]){$gameTemp[_0x8f5637(0x601)]()&&alert(_0x8f5637(0x61e)+_0x8f5637(0x33d));return;}VisuMZ[_0x8f5637(0x541)](_0x93ab44,_0x93ab44);const _0x3f53b2={'text':_0x93ab44[_0x8f5637(0x393)]||'','duration':Math['max'](_0x93ab44[_0x8f5637(0x1b5)]||0x3c,0xc)},_0x5b0798=_0x93ab44[_0x8f5637(0x5cd)]||{};VisuMZ[_0x8f5637(0x4f2)][_0x8f5637(0x4dd)](_0x3f53b2,_0x5b0798);const _0x310e12=SceneManager['_scene'][_0x8f5637(0x1fa)];if(_0x310e12){const _0x3eb607=$gamePlayer;_0x310e12[_0x8f5637(0x368)](_0x3eb607,_0x3f53b2);}}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x2ad),_0xb03ae=>{const _0x285517=_0x17c4f7;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x285517(0x4d7)]){$gameTemp[_0x285517(0x601)]()&&alert(_0x285517(0x61e)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x285517(0x541)](_0xb03ae,_0xb03ae);const _0x2c8b0d=_0xb03ae['FollowerIndex']||0x0,_0x50e004={'text':_0xb03ae[_0x285517(0x393)]||'','duration':Math['max'](_0xb03ae[_0x285517(0x1b5)]||0x3c,0xc)},_0x584bc2=_0xb03ae['PopupExtra']||{};VisuMZ[_0x285517(0x4f2)]['ApplyPopupExtraSettings'](_0x50e004,_0x584bc2);const _0x37b3e0=SceneManager[_0x285517(0x622)][_0x285517(0x1fa)];if(_0x37b3e0){const _0x56bfa2=$gamePlayer['followers']()[_0x285517(0x4a0)](_0x2c8b0d);_0x37b3e0['createEventsMoveCoreMessagePopup'](_0x56bfa2,_0x50e004);}}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x2a1),_0x2dade6=>{const _0x205917=_0x17c4f7;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x205917(0x4d7)]){$gameTemp['isPlaytest']()&&alert(_0x205917(0x61e)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ['ConvertParams'](_0x2dade6,_0x2dade6);const _0x5792bc=$gameTemp[_0x205917(0x293)](),_0x411723=_0x2dade6[_0x205917(0x353)]||(_0x5792bc?_0x5792bc[_0x205917(0x415)]():0x1),_0x28028b={'text':_0x2dade6[_0x205917(0x393)]||'','duration':Math[_0x205917(0x236)](_0x2dade6[_0x205917(0x1b5)]||0x3c,0xc)},_0x4dcebf=_0x2dade6[_0x205917(0x5cd)]||{};VisuMZ[_0x205917(0x4f2)][_0x205917(0x4dd)](_0x28028b,_0x4dcebf);const _0x145a26=SceneManager['_scene'][_0x205917(0x1fa)];if(_0x145a26){const _0x16d547=$gameMap[_0x205917(0x4a4)](_0x411723);_0x145a26[_0x205917(0x368)](_0x16d547,_0x28028b);}}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x348),_0x1e6bf4=>{const _0x2e0a94=_0x17c4f7;if(!SceneManager[_0x2e0a94(0x5b8)]())return;if(!Imported[_0x2e0a94(0x4d7)]){$gameTemp[_0x2e0a94(0x601)]()&&alert(_0x2e0a94(0x61e)+_0x2e0a94(0x33d));return;}VisuMZ['ConvertParams'](_0x1e6bf4,_0x1e6bf4);const _0x343025={'text':_0x1e6bf4['MessageText']||'','duration':Math[_0x2e0a94(0x236)](_0x1e6bf4['MsgDuration']||0x3c,0xc),'tileCoordinates':{'x':Math['round'](_0x1e6bf4[_0x2e0a94(0x43c)]||0x0),'y':Math['round'](_0x1e6bf4[_0x2e0a94(0x424)]||0x0)}},_0x119901=_0x1e6bf4[_0x2e0a94(0x5cd)]||{};VisuMZ[_0x2e0a94(0x4f2)][_0x2e0a94(0x4dd)](_0x343025,_0x119901);const _0xbcb0ef=SceneManager[_0x2e0a94(0x622)]['_spriteset'];_0xbcb0ef&&_0xbcb0ef[_0x2e0a94(0x202)](_0x343025);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x404),_0x4aaf09=>{const _0x58f256=_0x17c4f7;VisuMZ['ConvertParams'](_0x4aaf09,_0x4aaf09);const _0x671fb4=_0x4aaf09[_0x58f256(0x63f)];$gameTimer['setCommonEvent'](_0x671fb4);}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x526),_0x1760cb=>{const _0x223597=_0x17c4f7;$gameTimer[_0x223597(0x60f)](0x0);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x2e5),_0x23d42d=>{const _0x1a3b6f=_0x17c4f7;if(!$gameTimer[_0x1a3b6f(0x665)]())return;VisuMZ['ConvertParams'](_0x23d42d,_0x23d42d);let _0x22103f=0x0;_0x22103f+=_0x23d42d['Frames'],_0x22103f+=_0x23d42d[_0x1a3b6f(0x24c)]*0x3c,_0x22103f+=_0x23d42d['Minutes']*0x3c*0x3c,_0x22103f+=_0x23d42d[_0x1a3b6f(0x36c)]*0x3c*0x3c*0x3c,$gameTimer[_0x1a3b6f(0x5b6)](_0x22103f);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x62b),_0x2e0740=>{const _0x3c0733=_0x17c4f7;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x2e0740,_0x2e0740);let _0x1f5232=0x0;_0x1f5232+=_0x2e0740[_0x3c0733(0x1bc)],_0x1f5232+=_0x2e0740[_0x3c0733(0x24c)]*0x3c,_0x1f5232+=_0x2e0740[_0x3c0733(0x41c)]*0x3c*0x3c,_0x1f5232+=_0x2e0740[_0x3c0733(0x36c)]*0x3c*0x3c*0x3c,$gameTimer[_0x3c0733(0x4de)](_0x1f5232);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],'EventTimerPause',_0x525955=>{if(!$gameTimer['isWorking']())return;$gameTimer['pause']();}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x572),_0x33891d=>{const _0x1ee371=_0x17c4f7;if(!$gameTimer[_0x1ee371(0x665)]())return;$gameTimer[_0x1ee371(0x61b)]();}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x42d),_0x2320c7=>{const _0x78e928=_0x17c4f7;VisuMZ['ConvertParams'](_0x2320c7,_0x2320c7);const _0x51e720=_0x2320c7[_0x78e928(0x366)]||0x0;$gameTimer[_0x78e928(0x38e)](_0x51e720);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x47c),_0x2aa870=>{const _0x22b71a=_0x17c4f7;VisuMZ[_0x22b71a(0x541)](_0x2aa870,_0x2aa870);const _0x37cef9=!_0x2aa870['Chase'];$gameSystem[_0x22b71a(0x66b)](_0x37cef9);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x3ca),_0x27a974=>{const _0x53c15e=_0x17c4f7;VisuMZ[_0x53c15e(0x541)](_0x27a974,_0x27a974);const _0xa464bf=(_0x27a974[_0x53c15e(0x44b)]||0x0)-0x1,_0x26092b=!_0x27a974[_0x53c15e(0x481)],_0xa6f29f=$gamePlayer[_0x53c15e(0x304)]()['follower'](_0xa464bf);if(_0xa6f29f)_0xa6f29f['setChaseOff'](_0x26092b);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x5df),_0x3b9d37=>{const _0x4641f8=_0x17c4f7;VisuMZ[_0x4641f8(0x541)](_0x3b9d37,_0x3b9d37);const _0x2eb3e0=_0x3b9d37[_0x4641f8(0x44b)];$gameSystem[_0x4641f8(0x570)](_0x2eb3e0);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x203),_0x149ec2=>{const _0x2eeea3=_0x17c4f7;VisuMZ[_0x2eeea3(0x541)](_0x149ec2,_0x149ec2),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x2eeea3(0x66b)](![]);for(const _0x40c9a2 of $gamePlayer[_0x2eeea3(0x304)]()['_data']){if(_0x40c9a2)_0x40c9a2[_0x2eeea3(0x367)](![]);}}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],'SwitchGetSelfSwitchABCD',_0x439969=>{const _0x5b4dd7=_0x17c4f7;VisuMZ[_0x5b4dd7(0x541)](_0x439969,_0x439969);const _0x5674f9=$gameTemp[_0x5b4dd7(0x293)]();_0x439969[_0x5b4dd7(0x51b)]=_0x439969[_0x5b4dd7(0x51b)]||$gameMap[_0x5b4dd7(0x567)]();const _0x27a7a3=[_0x439969[_0x5b4dd7(0x51b)],_0x439969[_0x5b4dd7(0x353)]||_0x5674f9['eventId'](),_0x439969['Letter']],_0x164cab=_0x439969[_0x5b4dd7(0x4fd)],_0x3073ad=$gameSelfSwitches[_0x5b4dd7(0x1a5)](_0x27a7a3)||![];$gameSwitches[_0x5b4dd7(0x437)](_0x164cab,_0x3073ad);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x5fe),_0x3478fe=>{const _0x4ea368=_0x17c4f7;VisuMZ['ConvertParams'](_0x3478fe,_0x3478fe);const _0x543231=$gameTemp[_0x4ea368(0x293)]();_0x3478fe[_0x4ea368(0x51b)]=_0x3478fe[_0x4ea368(0x51b)]||$gameMap[_0x4ea368(0x567)]();const _0x25a2a1=[_0x3478fe['MapId'],_0x3478fe['EventId']||_0x543231['eventId'](),_0x4ea368(0x3fe)['format'](_0x3478fe['SwitchId'])],_0x29f4c7=_0x3478fe[_0x4ea368(0x4fd)],_0x42e2c0=$gameSelfSwitches[_0x4ea368(0x1a5)](_0x25a2a1)||![];$gameSwitches['setValue'](_0x29f4c7,_0x42e2c0);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x208),_0xcc7d23=>{const _0x24459f=_0x17c4f7;VisuMZ[_0x24459f(0x541)](_0xcc7d23,_0xcc7d23);const _0x5e1eb9=$gameTemp[_0x24459f(0x293)]();_0xcc7d23['MapId']=_0xcc7d23[_0x24459f(0x51b)]||$gameMap[_0x24459f(0x567)]();const _0x159bb2=[_0xcc7d23['MapId'],_0xcc7d23[_0x24459f(0x353)]||_0x5e1eb9[_0x24459f(0x415)](),_0x24459f(0x5d4)[_0x24459f(0x63e)](_0xcc7d23[_0x24459f(0x505)])],_0x59a8a8=_0xcc7d23[_0x24459f(0x561)],_0x4e94a7=$gameSelfSwitches['value'](_0x159bb2)||![];$gameVariables[_0x24459f(0x437)](_0x59a8a8,_0x4e94a7);}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],_0x17c4f7(0x453),_0x305d64=>{const _0x25e8c6=_0x17c4f7;VisuMZ['ConvertParams'](_0x305d64,_0x305d64);if(!$gameMap)return;const _0x4c7e14=$gameTemp[_0x25e8c6(0x293)](),_0x671bce=_0x305d64[_0x25e8c6(0x454)];_0x305d64[_0x25e8c6(0x53e)]=_0x305d64[_0x25e8c6(0x53e)]||$gameMap[_0x25e8c6(0x567)](),_0x305d64[_0x25e8c6(0x5bb)]=_0x305d64[_0x25e8c6(0x5bb)]||$gameMap[_0x25e8c6(0x567)](),_0x305d64[_0x25e8c6(0x4c7)]=_0x305d64[_0x25e8c6(0x4c7)][_0x25e8c6(0x2f4)]()[_0x25e8c6(0x485)]();if(!_0x671bce&&_0x305d64['Step1MapId']!==$gameMap[_0x25e8c6(0x567)]())return;if($gameMap[_0x25e8c6(0x567)]()===_0x305d64[_0x25e8c6(0x53e)]){const _0x12d813=$gameMap[_0x25e8c6(0x4a4)](_0x305d64[_0x25e8c6(0x329)]||_0x4c7e14[_0x25e8c6(0x415)]());if(!_0x12d813)return;_0x305d64[_0x25e8c6(0x4c7)]!==_0x25e8c6(0x449)?_0x12d813['morphIntoTemplate'](_0x305d64['TemplateName']):_0x12d813[_0x25e8c6(0x3c9)](_0x305d64[_0x25e8c6(0x5bb)],_0x305d64[_0x25e8c6(0x61d)]||_0x4c7e14['eventId']());}_0x671bce&&$gameSystem['savePreservedMorphEventDataKey'](_0x305d64[_0x25e8c6(0x53e)],_0x305d64[_0x25e8c6(0x329)],_0x305d64['TemplateName'],_0x305d64[_0x25e8c6(0x5bb)],_0x305d64[_0x25e8c6(0x61d)]);}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x4b3),_0xd4bed8=>{const _0x18e962=_0x17c4f7;VisuMZ[_0x18e962(0x541)](_0xd4bed8,_0xd4bed8);if(!$gameMap)return;const _0x4db44a=$gameTemp[_0x18e962(0x293)]();_0xd4bed8[_0x18e962(0x51b)]=_0xd4bed8[_0x18e962(0x51b)]||$gameMap[_0x18e962(0x567)]();if($gameMap[_0x18e962(0x567)]()===_0xd4bed8[_0x18e962(0x51b)]){const _0x1f5667=$gameMap[_0x18e962(0x4a4)](_0xd4bed8[_0x18e962(0x353)]||_0x4db44a[_0x18e962(0x415)]());_0x1f5667['removeMorph']();}_0xd4bed8[_0x18e962(0x27b)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0xd4bed8[_0x18e962(0x51b)],_0xd4bed8[_0x18e962(0x353)]||_0x4db44a[_0x18e962(0x415)]());}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x519),_0xb5992=>{const _0x4e6572=_0x17c4f7;VisuMZ[_0x4e6572(0x541)](_0xb5992,_0xb5992),$gameSystem[_0x4e6572(0x4b4)]($gamePlayer,_0xb5992['IconIndex'],_0xb5992[_0x4e6572(0x58d)],_0xb5992['IconBufferY'],_0xb5992[_0x4e6572(0x2a4)]);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],'PlayerIconDelete',_0x3b0e88=>{const _0x440c31=_0x17c4f7;VisuMZ[_0x440c31(0x541)](_0x3b0e88,_0x3b0e88),$gameSystem[_0x440c31(0x258)]($gamePlayer);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x5c2),_0x129435=>{const _0x30538a=_0x17c4f7;VisuMZ['ConvertParams'](_0x129435,_0x129435),$gameSystem[_0x30538a(0x584)](!_0x129435[_0x30538a(0x2b5)]);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x4a1),_0x533742=>{const _0x5460c7=_0x17c4f7;VisuMZ[_0x5460c7(0x541)](_0x533742,_0x533742),$gameSystem[_0x5460c7(0x542)](_0x533742[_0x5460c7(0x20a)]);}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x30d),_0x7ec05c=>{const _0x1678b5=_0x17c4f7;VisuMZ[_0x1678b5(0x541)](_0x7ec05c,_0x7ec05c);const _0xdaebb8=_0x7ec05c[_0x1678b5(0x51b)]||$gameMap[_0x1678b5(0x567)]();$gameSelfSwitches[_0x1678b5(0x517)](_0xdaebb8);}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],_0x17c4f7(0x423),_0x1d2f93=>{const _0x11a5c6=_0x17c4f7;VisuMZ['ConvertParams'](_0x1d2f93,_0x1d2f93);const _0x241018=$gameTemp[_0x11a5c6(0x293)]();_0x1d2f93[_0x11a5c6(0x51b)]=_0x1d2f93['MapId']||$gameMap['mapId']();const _0x21d7ad=[_0x1d2f93[_0x11a5c6(0x51b)],_0x1d2f93['EventId']||_0x241018[_0x11a5c6(0x415)](),_0x1d2f93[_0x11a5c6(0x1c8)]];switch(_0x1d2f93[_0x11a5c6(0x22d)]){case'ON':$gameSelfSwitches[_0x11a5c6(0x437)](_0x21d7ad,!![]);break;case _0x11a5c6(0x465):$gameSelfSwitches[_0x11a5c6(0x437)](_0x21d7ad,![]);break;case _0x11a5c6(0x21d):$gameSelfSwitches[_0x11a5c6(0x437)](_0x21d7ad,!$gameSelfSwitches['value'](_0x21d7ad));break;}}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],_0x17c4f7(0x1c9),_0x3b59fe=>{const _0x5a0492=_0x17c4f7;VisuMZ['ConvertParams'](_0x3b59fe,_0x3b59fe);const _0xf913f1=$gameTemp[_0x5a0492(0x293)]();_0x3b59fe[_0x5a0492(0x51b)]=_0x3b59fe['MapId']||$gameMap[_0x5a0492(0x567)]();const _0x58f673=[_0x3b59fe[_0x5a0492(0x51b)],_0x3b59fe[_0x5a0492(0x353)]||_0xf913f1[_0x5a0492(0x415)](),_0x5a0492(0x3fe)[_0x5a0492(0x63e)](_0x3b59fe['SwitchId'])];switch(_0x3b59fe['Value']){case'ON':$gameSelfSwitches[_0x5a0492(0x437)](_0x58f673,!![]);break;case _0x5a0492(0x465):$gameSelfSwitches[_0x5a0492(0x437)](_0x58f673,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x58f673,!$gameSelfSwitches[_0x5a0492(0x1a5)](_0x58f673));break;}}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],'SelfVariableID',_0xee26f4=>{const _0x38493a=_0x17c4f7;VisuMZ[_0x38493a(0x541)](_0xee26f4,_0xee26f4);const _0xb901f=$gameTemp[_0x38493a(0x293)]();_0xee26f4[_0x38493a(0x51b)]=_0xee26f4[_0x38493a(0x51b)]||$gameMap[_0x38493a(0x567)]();const _0x4b0ab6=[_0xee26f4[_0x38493a(0x51b)],_0xee26f4[_0x38493a(0x353)]||_0xb901f[_0x38493a(0x415)](),'Self\x20Variable\x20%1'[_0x38493a(0x63e)](_0xee26f4[_0x38493a(0x505)])],_0x507dac=VisuMZ[_0x38493a(0x2e3)]($gameSelfSwitches[_0x38493a(0x1a5)](_0x4b0ab6),_0xee26f4[_0x38493a(0x22d)],_0xee26f4['Operation']);$gameSelfSwitches['setValue'](_0x4b0ab6,_0x507dac);}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],_0x17c4f7(0x631),_0x331945=>{const _0x22d552=_0x17c4f7;VisuMZ[_0x22d552(0x541)](_0x331945,_0x331945);const _0x5b323e=$gameTemp[_0x22d552(0x293)](),_0x53851b={'template':_0x331945[_0x22d552(0x4c7)],'mapId':_0x331945['MapId']||$gameMap[_0x22d552(0x567)](),'eventId':_0x331945[_0x22d552(0x353)]||_0x5b323e[_0x22d552(0x415)](),'x':_0x331945[_0x22d552(0x24b)],'y':_0x331945['PosY'],'spawnPreserved':_0x331945[_0x22d552(0x196)],'spawnEventId':$gameMap[_0x22d552(0x412)][_0x22d552(0x3a2)]+0x3e8},_0x36ed03=_0x331945[_0x22d552(0x357)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x53851b['mapId']]&&_0x53851b[_0x22d552(0x567)]!==$gameMap[_0x22d552(0x567)]()){let _0x4513c4=_0x22d552(0x27d)[_0x22d552(0x63e)](_0x53851b[_0x22d552(0x567)]);_0x4513c4+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x4513c4+=_0x22d552(0x4e5),_0x4513c4+=_0x22d552(0x2e8),_0x4513c4+=_0x22d552(0x652)[_0x22d552(0x63e)](_0x53851b[_0x22d552(0x567)]),alert(_0x4513c4);return;}const _0x132269=$gameMap['prepareSpawnedEventAtXY'](_0x53851b,_0x331945[_0x22d552(0x5b1)],_0x331945[_0x22d552(0x317)]);_0x36ed03&&$gameSwitches['setValue'](_0x36ed03,!!_0x132269);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x28a),_0x5c0042=>{const _0x16adc2=_0x17c4f7;VisuMZ[_0x16adc2(0x541)](_0x5c0042,_0x5c0042);const _0x389e9e=$gameTemp['getLastPluginCommandInterpreter'](),_0x5b8b3e={'template':_0x5c0042[_0x16adc2(0x4c7)],'mapId':_0x5c0042['MapId']||$gameMap[_0x16adc2(0x567)](),'eventId':_0x5c0042[_0x16adc2(0x353)]||_0x389e9e[_0x16adc2(0x415)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x5c0042[_0x16adc2(0x196)],'spawnEventId':$gameMap[_0x16adc2(0x412)][_0x16adc2(0x3a2)]+0x3e8},_0x16f1df=_0x5c0042[_0x16adc2(0x357)]||0x0;if(!VisuMZ[_0x16adc2(0x2c1)][_0x5b8b3e['mapId']]&&_0x5b8b3e[_0x16adc2(0x567)]!==$gameMap[_0x16adc2(0x567)]()){let _0x3fccad=_0x16adc2(0x27d)['format'](_0x5b8b3e[_0x16adc2(0x567)]);_0x3fccad+=_0x16adc2(0x50c),_0x3fccad+=_0x16adc2(0x4e5),_0x3fccad+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x3fccad+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x16adc2(0x63e)](_0x5b8b3e[_0x16adc2(0x567)]),alert(_0x3fccad);return;}const _0x17530e=$gameMap['prepareSpawnedEventAtRegion'](_0x5b8b3e,_0x5c0042[_0x16adc2(0x219)],_0x5c0042[_0x16adc2(0x5b1)],_0x5c0042[_0x16adc2(0x317)]);_0x16f1df&&$gameSwitches[_0x16adc2(0x437)](_0x16f1df,!!_0x17530e);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x2fd),_0x530512=>{const _0xd6bad9=_0x17c4f7;VisuMZ[_0xd6bad9(0x541)](_0x530512,_0x530512);const _0x13c042=$gameTemp[_0xd6bad9(0x293)](),_0x366883={'template':_0x530512[_0xd6bad9(0x4c7)],'mapId':_0x530512['MapId']||$gameMap[_0xd6bad9(0x567)](),'eventId':_0x530512[_0xd6bad9(0x353)]||_0x13c042['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x530512['Preserve'],'spawnEventId':$gameMap[_0xd6bad9(0x412)][_0xd6bad9(0x3a2)]+0x3e8},_0x5e1e58=_0x530512[_0xd6bad9(0x357)]||0x0;if(!VisuMZ[_0xd6bad9(0x2c1)][_0x366883[_0xd6bad9(0x567)]]&&_0x366883['mapId']!==$gameMap[_0xd6bad9(0x567)]()){let _0x6db496=_0xd6bad9(0x27d)[_0xd6bad9(0x63e)](_0x366883[_0xd6bad9(0x567)]);_0x6db496+=_0xd6bad9(0x50c),_0x6db496+=_0xd6bad9(0x4e5),_0x6db496+=_0xd6bad9(0x2e8),_0x6db496+=_0xd6bad9(0x652)[_0xd6bad9(0x63e)](_0x366883[_0xd6bad9(0x567)]),alert(_0x6db496);return;}const _0x14ee41=$gameMap[_0xd6bad9(0x314)](_0x366883,_0x530512[_0xd6bad9(0x2b6)],_0x530512[_0xd6bad9(0x5b1)],_0x530512[_0xd6bad9(0x317)]);_0x5e1e58&&$gameSwitches[_0xd6bad9(0x437)](_0x5e1e58,!!_0x14ee41);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],'SpawnEventDespawnEventID',_0x1ffc6b=>{const _0xc82f5c=_0x17c4f7;VisuMZ[_0xc82f5c(0x541)](_0x1ffc6b,_0x1ffc6b);const _0x50bb55=$gameTemp[_0xc82f5c(0x293)]();$gameMap['despawnEventId'](_0x1ffc6b[_0xc82f5c(0x50e)]||_0x50bb55['eventId']());}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],'SpawnEventDespawnAtXY',_0x12e7fc=>{const _0xf7acb=_0x17c4f7;VisuMZ[_0xf7acb(0x541)](_0x12e7fc,_0x12e7fc);const _0x16cb23=_0x12e7fc[_0xf7acb(0x24b)],_0x2df74d=_0x12e7fc[_0xf7acb(0x451)];$gameMap[_0xf7acb(0x58f)](_0x16cb23,_0x2df74d);}),PluginManager[_0x17c4f7(0x331)](pluginData['name'],_0x17c4f7(0x5ba),_0x332d6e=>{const _0x1e1c1c=_0x17c4f7;VisuMZ[_0x1e1c1c(0x541)](_0x332d6e,_0x332d6e),$gameMap[_0x1e1c1c(0x55d)](_0x332d6e[_0x1e1c1c(0x219)]);}),PluginManager[_0x17c4f7(0x331)](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x1c6),_0x33fb4b=>{const _0x27d9b1=_0x17c4f7;VisuMZ[_0x27d9b1(0x541)](_0x33fb4b,_0x33fb4b),$gameMap['despawnTerrainTags'](_0x33fb4b[_0x27d9b1(0x2b6)]);}),PluginManager['registerCommand'](pluginData[_0x17c4f7(0x578)],_0x17c4f7(0x257),_0x5b2bd8=>{const _0x22567c=_0x17c4f7;VisuMZ['ConvertParams'](_0x5b2bd8,_0x5b2bd8),$gameMap[_0x22567c(0x3fb)]();}),VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x5cf)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x17c4f7(0x4ae)][_0x17c4f7(0x473)]=function(){const _0x148f84=_0x17c4f7;VisuMZ[_0x148f84(0x4f2)][_0x148f84(0x5cf)][_0x148f84(0x494)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x148f84(0x3ec)]();if(VisuMZ[_0x148f84(0x4f2)][_0x148f84(0x21b)])VisuMZ[_0x148f84(0x4f2)][_0x148f84(0x21b)][_0x148f84(0x65f)]();},VisuMZ[_0x17c4f7(0x2c1)]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x17c4f7(0x4ae)][_0x17c4f7(0x5d6)]=function(){const _0x433767=_0x17c4f7;if(DataManager[_0x433767(0x1cf)]()||DataManager[_0x433767(0x296)]())return;const _0x31f75f=VisuMZ[_0x433767(0x4f2)][_0x433767(0x2fe)][_0x433767(0x525)],_0x2d580c=_0x31f75f[_0x433767(0x53b)][_0x433767(0x2bb)](0x0);for(const _0x312d88 of _0x31f75f[_0x433767(0x36a)]){_0x312d88[_0x433767(0x374)]=_0x312d88[_0x433767(0x374)][_0x433767(0x2f4)]()[_0x433767(0x485)](),VisuMZ[_0x433767(0x51d)][_0x312d88[_0x433767(0x374)]]=_0x312d88;if(!_0x2d580c[_0x433767(0x233)](_0x312d88[_0x433767(0x667)]))_0x2d580c[_0x433767(0x46b)](_0x312d88[_0x433767(0x667)]);}for(const _0x570bed of _0x2d580c){if(VisuMZ[_0x433767(0x2c1)][_0x570bed])continue;const _0x20c3cc=_0x433767(0x387)[_0x433767(0x63e)](_0x570bed[_0x433767(0x5c5)](0x3)),_0xea576='$preloadedMap_%1'['format'](_0x570bed);DataManager['loadDataFile'](_0xea576,_0x20c3cc),setTimeout(this[_0x433767(0x36e)]['bind'](this,_0x570bed,_0xea576),0x64);}},Scene_Boot[_0x17c4f7(0x4ae)][_0x17c4f7(0x36e)]=function(_0x46c6e2,_0x5bae7b){const _0x5abd4a=_0x17c4f7;window[_0x5bae7b]?(VisuMZ[_0x5abd4a(0x2c1)][_0x46c6e2]=window[_0x5bae7b],window[_0x5bae7b]=undefined):setTimeout(this[_0x5abd4a(0x36e)][_0x5abd4a(0x433)](this,_0x46c6e2,_0x5bae7b),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x17c4f7(0x201)]=[],VisuMZ[_0x17c4f7(0x40f)]=[],VisuMZ[_0x17c4f7(0x305)]=[],VisuMZ['SelfVariables']=[],VisuMZ[_0x17c4f7(0x521)]=[],Scene_Boot[_0x17c4f7(0x4ae)][_0x17c4f7(0x3ec)]=function(){const _0xfebcab=_0x17c4f7;for(let _0x54cfa2=0x1;_0x54cfa2<$dataSystem[_0xfebcab(0x24a)][_0xfebcab(0x3a2)];_0x54cfa2++){if($dataSystem[_0xfebcab(0x24a)][_0x54cfa2][_0xfebcab(0x49f)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0xfebcab(0x556)][_0xfebcab(0x46b)](_0x54cfa2);if($dataSystem[_0xfebcab(0x24a)][_0x54cfa2]['match'](/<SELF>/i))VisuMZ[_0xfebcab(0x201)][_0xfebcab(0x46b)](_0x54cfa2);if($dataSystem[_0xfebcab(0x24a)][_0x54cfa2][_0xfebcab(0x49f)](/<MAP>/i))VisuMZ[_0xfebcab(0x40f)][_0xfebcab(0x46b)](_0x54cfa2);}for(let _0x259177=0x1;_0x259177<$dataSystem['variables'][_0xfebcab(0x3a2)];_0x259177++){if($dataSystem[_0xfebcab(0x20c)][_0x259177][_0xfebcab(0x49f)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0xfebcab(0x46b)](_0x259177);if($dataSystem[_0xfebcab(0x20c)][_0x259177][_0xfebcab(0x49f)](/<SELF>/i))VisuMZ[_0xfebcab(0x54a)]['push'](_0x259177);if($dataSystem[_0xfebcab(0x20c)][_0x259177][_0xfebcab(0x49f)](/<MAP>/i))VisuMZ[_0xfebcab(0x521)]['push'](_0x259177);}},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x21b)]={},VisuMZ['EventsMoveCore'][_0x17c4f7(0x21b)][_0x17c4f7(0x65f)]=function(){const _0x5bb64a=_0x17c4f7;this[_0x5bb64a(0x373)]=new Game_CPCInterpreter(),this[_0x5bb64a(0x4df)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x21b)]['determineCommonEventsWithCPC']=function(){const _0x5e234f=_0x17c4f7;this[_0x5e234f(0x342)]=[];for(const _0x40c18d of $dataCommonEvents){if(!_0x40c18d)continue;VisuMZ['EventsMoveCore'][_0x5e234f(0x21b)][_0x5e234f(0x51c)](_0x40c18d);if(_0x40c18d[_0x5e234f(0x2af)]['length']>0x0)this['_commonEvents'][_0x5e234f(0x46b)](_0x40c18d['id']);}},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x21b)][_0x17c4f7(0x590)]=function(_0x565231,_0x4cdd27,_0x52a2fa){const _0xa1f012=_0x17c4f7;return this[_0xa1f012(0x373)][_0xa1f012(0x1a1)](_0x565231,_0x4cdd27),_0x52a2fa?this['_interpreter'][_0xa1f012(0x534)](_0x52a2fa):this[_0xa1f012(0x373)]['execute'](),this[_0xa1f012(0x373)][_0xa1f012(0x656)];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x21b)][_0x17c4f7(0x51c)]=function(_0x44b93b){const _0xee0fb7=_0x17c4f7;let _0xb0b1ed=![];_0x44b93b['CPC']=[];for(const _0x3c2eb2 of _0x44b93b[_0xee0fb7(0x206)]){if([0x6c,0x198][_0xee0fb7(0x233)](_0x3c2eb2[_0xee0fb7(0x57c)])){const _0x2ee984=_0x3c2eb2['parameters'][0x0];if(_0x2ee984[_0xee0fb7(0x49f)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0xb0b1ed=!![];else _0x2ee984['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0xb0b1ed=![]);}_0xb0b1ed&&_0x44b93b[_0xee0fb7(0x2af)][_0xee0fb7(0x46b)](_0x3c2eb2);}},getSelfSwitchValue=function(_0x2af7d2,_0x2afb3b,_0x651864){const _0x1f9c64=_0x17c4f7;let _0x3555f7=[_0x2af7d2,_0x2afb3b,_0x1f9c64(0x3fe)[_0x1f9c64(0x63e)](_0x651864)];return typeof _0x651864===_0x1f9c64(0x633)&&(_0x3555f7=[_0x2af7d2,_0x2afb3b,_0x651864[_0x1f9c64(0x2f4)]()[_0x1f9c64(0x485)]()]),$gameSelfSwitches[_0x1f9c64(0x1a5)](_0x3555f7);},getMapSwitchValue=function(_0x1b0e17,_0x24d1ee){const _0x26465b=_0x17c4f7;let _0x1300dc=[0x0,0x0,_0x26465b(0x486)[_0x26465b(0x63e)](_0x1b0e17,_0x24d1ee)];return $gameSelfSwitches['value'](_0x1300dc);},getMapVariableValue=function(_0x312afc,_0x109a54){const _0x2bb599=_0x17c4f7;let _0xdb7e0f=[0x0,0x0,_0x2bb599(0x52d)[_0x2bb599(0x63e)](_0x312afc,_0x109a54)];return $gameSelfSwitches[_0x2bb599(0x1a5)](_0xdb7e0f);},getSelfVariableValue=function(_0xf2414a,_0x527f32,_0x5885d3){const _0x3f2793=_0x17c4f7,_0x33b9df=[_0xf2414a,_0x527f32,'Self\x20Variable\x20%1'[_0x3f2793(0x63e)](_0x5885d3)];return $gameSelfSwitches[_0x3f2793(0x1a5)](_0x33b9df);},setSelfSwitchValue=function(_0x590a1a,_0x1a7c20,_0x3493bc,_0x531646){const _0x2b8799=_0x17c4f7;let _0x578f24=[_0x590a1a,_0x1a7c20,_0x2b8799(0x3fe)[_0x2b8799(0x63e)](_0x3493bc)];typeof _0x3493bc==='string'&&(_0x578f24=[_0x590a1a,_0x1a7c20,_0x3493bc[_0x2b8799(0x2f4)]()['trim']()]),$gameSelfSwitches['setValue'](_0x578f24,_0x531646);},setSelfVariableValue=function(_0x31a6b5,_0x5f13a0,_0xe65111,_0x388415){const _0xba241b=_0x17c4f7,_0x2a84b3=[_0x31a6b5,_0x5f13a0,'Self\x20Variable\x20%1'[_0xba241b(0x63e)](_0xe65111)];$gameSelfSwitches[_0xba241b(0x437)](_0x2a84b3,_0x388415);},setMapSwitchValue=function(_0x5d35c7,_0x313645,_0x2482e4){const _0x3e8aba=_0x17c4f7;let _0x21b1cb=[0x0,0x0,_0x3e8aba(0x486)[_0x3e8aba(0x63e)](_0x5d35c7,_0x313645)];$gameSelfSwitches[_0x3e8aba(0x437)](_0x21b1cb,_0x2482e4);},setMapVariableValue=function(_0x26f4be,_0x19092c,_0x47ab76){const _0x5c5ae=_0x17c4f7;let _0x18d2e6=[0x0,0x0,_0x5c5ae(0x52d)[_0x5c5ae(0x63e)](_0x26f4be,_0x19092c)];$gameSelfSwitches[_0x5c5ae(0x437)](_0x18d2e6,_0x47ab76);},DataManager['isAdvancedSwitch']=function(_0x11f3c9){const _0xe41dd5=_0x17c4f7;if(SceneManager['_scene'][_0xe41dd5(0x311)]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0xe41dd5(0x233)](_0x11f3c9);},DataManager[_0x17c4f7(0x5ed)]=function(_0x42b073){const _0x34a0fb=_0x17c4f7;if(SceneManager[_0x34a0fb(0x622)][_0x34a0fb(0x311)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0x34a0fb(0x233)](_0x42b073);},DataManager[_0x17c4f7(0x535)]=function(_0x321772){const _0x9dd596=_0x17c4f7;if(SceneManager[_0x9dd596(0x622)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x9dd596(0x201)][_0x9dd596(0x233)](_0x321772);},DataManager[_0x17c4f7(0x514)]=function(_0x483f3b){const _0x4173fd=_0x17c4f7;if(SceneManager[_0x4173fd(0x622)][_0x4173fd(0x311)]===Scene_Debug)return![];return VisuMZ[_0x4173fd(0x54a)][_0x4173fd(0x233)](_0x483f3b);},DataManager[_0x17c4f7(0x642)]=function(_0x57af4d){const _0x4f1e0e=_0x17c4f7;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x4f1e0e(0x40f)][_0x4f1e0e(0x233)](_0x57af4d);},DataManager[_0x17c4f7(0x22e)]=function(_0x5a5f54){const _0xf4a62e=_0x17c4f7;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0xf4a62e(0x521)][_0xf4a62e(0x233)](_0x5a5f54);},ImageManager[_0x17c4f7(0x479)]=function(_0x286886){return _0x286886['match'](/\[INV(?:|ISIBLE)\]/i);},SceneManager[_0x17c4f7(0x1ac)]=function(){const _0x1bc598=_0x17c4f7;return this[_0x1bc598(0x622)]&&this[_0x1bc598(0x622)][_0x1bc598(0x311)]===Scene_Map;},SceneManager[_0x17c4f7(0x5b8)]=function(){const _0x3fd5e1=_0x17c4f7;return this[_0x3fd5e1(0x622)]&&this[_0x3fd5e1(0x622)]instanceof Scene_Map;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2e9)]=Game_Temp[_0x17c4f7(0x4ae)][_0x17c4f7(0x391)],Game_Temp[_0x17c4f7(0x4ae)][_0x17c4f7(0x391)]=function(_0x34ee34,_0x40268c){const _0x49a7d1=_0x17c4f7;if(this[_0x49a7d1(0x448)](_0x34ee34,_0x40268c))return;VisuMZ['EventsMoveCore'][_0x49a7d1(0x2e9)][_0x49a7d1(0x494)](this,_0x34ee34,_0x40268c);},Game_Temp[_0x17c4f7(0x4ae)]['isEventClickTriggered']=function(_0x130c17,_0x486798){const _0x18fd9b=_0x17c4f7,_0x367724=$gameMap[_0x18fd9b(0x2f5)](_0x130c17,_0x486798);for(const _0x51b63a of _0x367724){if(_0x51b63a&&_0x51b63a[_0x18fd9b(0x37a)]())return _0x51b63a['onClickTrigger'](),!![];}return TouchInput['isLongPressed']()&&_0x367724['length']>0x0&&TouchInput[_0x18fd9b(0x645)](),![];},Game_Temp[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f4)]=function(_0x274219){const _0x14ba31=_0x17c4f7;this[_0x14ba31(0x4ac)]=_0x274219;},Game_Temp[_0x17c4f7(0x4ae)]['getLastPluginCommandInterpreter']=function(){const _0x202e4d=_0x17c4f7;return this[_0x202e4d(0x4ac)];},Game_Temp[_0x17c4f7(0x4ae)][_0x17c4f7(0x63d)]=function(_0x308581){const _0x1a3529=_0x17c4f7;this[_0x1a3529(0x1e8)]=_0x308581;},Game_Temp[_0x17c4f7(0x4ae)][_0x17c4f7(0x5bc)]=function(){const _0x13b0a4=_0x17c4f7;this[_0x13b0a4(0x1e8)]=undefined;},Game_Temp['prototype'][_0x17c4f7(0x64a)]=function(){const _0x1abb4b=_0x17c4f7;return this[_0x1abb4b(0x1e8)];},VisuMZ['EventsMoveCore'][_0x17c4f7(0x5f2)]=Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x65f)],Game_System['prototype'][_0x17c4f7(0x65f)]=function(){const _0xcd4e54=_0x17c4f7;VisuMZ[_0xcd4e54(0x4f2)][_0xcd4e54(0x5f2)][_0xcd4e54(0x494)](this),this[_0xcd4e54(0x55e)](),this['initFollowerController']();},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x55e)]=function(){const _0x46ca8d=_0x17c4f7;this[_0x46ca8d(0x283)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x46ca8d(0x55c)]=[],this['_PreservedEventMorphData']={},this['_SavedEventLocations']={},this[_0x46ca8d(0x4c5)]=![],this[_0x46ca8d(0x5fd)]=_0x46ca8d(0x22a);},Game_System[_0x17c4f7(0x4ae)]['isDashingEnabled']=function(){const _0x578670=_0x17c4f7;if(this[_0x578670(0x283)]===undefined)this[_0x578670(0x55e)]();if(this[_0x578670(0x283)]['DashingEnable']===undefined)this[_0x578670(0x55e)]();return this[_0x578670(0x283)][_0x578670(0x63b)];},Game_System['prototype'][_0x17c4f7(0x1b0)]=function(_0x1bf8d4){const _0x469e90=_0x17c4f7;if(this[_0x469e90(0x283)]===undefined)this['initEventsMoveCore']();if(this[_0x469e90(0x283)][_0x469e90(0x63b)]===undefined)this[_0x469e90(0x55e)]();this[_0x469e90(0x283)][_0x469e90(0x63b)]=_0x1bf8d4;},Game_System['prototype'][_0x17c4f7(0x513)]=function(){const _0x7678c=_0x17c4f7;if(this[_0x7678c(0x283)]===undefined)this[_0x7678c(0x55e)]();if(this[_0x7678c(0x283)][_0x7678c(0x1e6)]===undefined)this[_0x7678c(0x55e)]();return this[_0x7678c(0x283)][_0x7678c(0x1e6)];},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x503)]=function(_0x3be254){const _0x3dc35c=_0x17c4f7;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x3dc35c(0x283)]['EventAutoMovement']===undefined)this[_0x3dc35c(0x55e)]();this[_0x3dc35c(0x283)][_0x3dc35c(0x1e6)]=_0x3be254;},Game_System['prototype']['eventLabelsVisible']=function(){const _0x1181b5=_0x17c4f7;if(this[_0x1181b5(0x283)]===undefined)this[_0x1181b5(0x55e)]();if(this[_0x1181b5(0x283)][_0x1181b5(0x557)]===undefined)this['initEventsMoveCore']();return this[_0x1181b5(0x283)][_0x1181b5(0x557)];},Game_System['prototype']['setEventLabelsVisible']=function(_0x231332){const _0x2931d0=_0x17c4f7;if(this[_0x2931d0(0x283)]===undefined)this['initEventsMoveCore']();if(this[_0x2931d0(0x283)]['VisibleEventLabels']===undefined)this[_0x2931d0(0x55e)]();this['_EventsMoveCoreSettings']['VisibleEventLabels']=_0x231332;},Game_System['prototype'][_0x17c4f7(0x1ce)]=function(){const _0x35dc65=_0x17c4f7;return this[_0x35dc65(0x4c5)]===undefined&&(this['_DisablePlayerControl']=![]),this[_0x35dc65(0x4c5)];},Game_System[_0x17c4f7(0x4ae)]['setPlayerControlDisable']=function(_0x16fbd2){const _0x3c3c17=_0x17c4f7;this[_0x3c3c17(0x4c5)]=_0x16fbd2;},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x217)]=function(){const _0x529507=_0x17c4f7;return this[_0x529507(0x5fd)];},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x542)]=function(_0x25132e){const _0x56d49f=_0x17c4f7;this['_PlayerDiagonalSetting']=String(_0x25132e)[_0x56d49f(0x261)]()[_0x56d49f(0x485)]();},Game_System['prototype'][_0x17c4f7(0x1f2)]=function(_0x71863d){const _0x2cb8e6=_0x17c4f7;if(this['_EventIcons']===undefined)this[_0x2cb8e6(0x55e)]();if(!_0x71863d)return null;if(_0x71863d===$gamePlayer)return this[_0x2cb8e6(0x4ff)][_0x2cb8e6(0x3d9)];else{const _0x33b308=VisuMZ['EventsMoveCore'][_0x2cb8e6(0x2fe)],_0x5f21a0=_0x2cb8e6(0x3bf)[_0x2cb8e6(0x63e)](_0x71863d['_mapId'],_0x71863d['_eventId']);return this[_0x2cb8e6(0x4ff)][_0x5f21a0]=this[_0x2cb8e6(0x4ff)][_0x5f21a0]||{'iconIndex':0x0,'bufferX':_0x33b308[_0x2cb8e6(0x599)][_0x2cb8e6(0x488)],'bufferY':_0x33b308[_0x2cb8e6(0x599)][_0x2cb8e6(0x4c8)],'blendMode':_0x33b308['Icon'][_0x2cb8e6(0x4b1)]},this[_0x2cb8e6(0x4ff)][_0x5f21a0];}},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x4b4)]=function(_0x39c530,_0x12333b,_0x3d4cb9,_0x31af00,_0x283c2d){const _0x1cb33f=_0x17c4f7;if(this[_0x1cb33f(0x4ff)]===undefined)this[_0x1cb33f(0x55e)]();const _0x3a4edc=_0x39c530===$gamePlayer?_0x1cb33f(0x3d9):_0x1cb33f(0x3bf)[_0x1cb33f(0x63e)](_0x39c530['_mapId'],_0x39c530[_0x1cb33f(0x63c)]);this[_0x1cb33f(0x4ff)][_0x3a4edc]={'iconIndex':_0x12333b,'bufferX':_0x3d4cb9,'bufferY':_0x31af00,'blendMode':_0x283c2d};},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x3cc)]=function(_0x5d7184,_0xecb78f,_0x1cce5f,_0x421595,_0xacbff5,_0x7210d3,_0x28a3d7){const _0x2926ce=_0x17c4f7;if(this[_0x2926ce(0x4ff)]===undefined)this['initEventsMoveCore']();const _0xe70b38=_0x2926ce(0x3bf)['format'](_0x5d7184,_0xecb78f);this[_0x2926ce(0x4ff)][_0xe70b38]={'iconIndex':_0x1cce5f,'forced':_0x28a3d7,'bufferX':_0x421595,'bufferY':_0xacbff5,'blendMode':_0x7210d3};},Game_System[_0x17c4f7(0x4ae)]['deleteIconsOnEventsData']=function(_0x23b767){const _0x1f3317=_0x17c4f7;if(this[_0x1f3317(0x4ff)]===undefined)this[_0x1f3317(0x55e)]();if(!_0x23b767)return null;_0x23b767===$gamePlayer?delete this['_EventIcons']['Player']:this[_0x1f3317(0x3c3)](_0x23b767['_mapId'],_0x23b767[_0x1f3317(0x63c)]);},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x3c3)]=function(_0x2a6792,_0x50642a){const _0x3a5c10=_0x17c4f7;if(this['_EventIcons']===undefined)this[_0x3a5c10(0x55e)]();this['setEventIconDataKey'](_0x2a6792,_0x50642a,-0x1,0x0,0x0,0x0,![]);},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x55f)]=function(_0xa5408a){const _0x40f9de=_0x17c4f7;if(this['_EventIcons']===undefined)this[_0x40f9de(0x55e)]();if(!_0xa5408a)return null;_0xa5408a===$gamePlayer?delete this[_0x40f9de(0x4ff)][_0x40f9de(0x3d9)]:this[_0x40f9de(0x3e4)](_0xa5408a[_0x40f9de(0x543)],_0xa5408a[_0x40f9de(0x63c)]);},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x3e4)]=function(_0x2dac8c,_0x41203f){const _0x52c0f3=_0x17c4f7;if(this['_EventIcons']===undefined)this[_0x52c0f3(0x55e)]();const _0x5795e0='Map%1-Event%2'['format'](_0x2dac8c,_0x41203f);if(this[_0x52c0f3(0x4ff)][_0x5795e0]){if(this[_0x52c0f3(0x4ff)][_0x5795e0]['iconIndex']<0x0)return;if(this[_0x52c0f3(0x4ff)][_0x5795e0][_0x52c0f3(0x4bd)])return;}delete this[_0x52c0f3(0x4ff)][_0x5795e0];},Game_System['prototype'][_0x17c4f7(0x31e)]=function(_0x77002d,_0x1b8ff4){const _0x417bfa=_0x17c4f7;if(this[_0x417bfa(0x4ff)]===undefined)this['initEventsMoveCore']();const _0x30cc58='Map%1-Event%2'['format'](_0x77002d,_0x1b8ff4);delete this[_0x417bfa(0x4ff)][_0x30cc58];if(_0x77002d!==$gameMap[_0x417bfa(0x567)]())return;const _0x29635e=$gameMap[_0x417bfa(0x4a4)](_0x1b8ff4);if(!_0x29635e)return;_0x29635e['setupPageSettings']();},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x447)]=function(_0x1068e8){const _0x3bf5ca=_0x17c4f7;if(this[_0x3bf5ca(0x5fc)]===undefined)this[_0x3bf5ca(0x55e)]();if(!_0x1068e8)return null;const _0x127706='Map%1-Event%2'['format'](_0x1068e8[_0x3bf5ca(0x543)],_0x1068e8['_eventId']);return this[_0x3bf5ca(0x5fc)][_0x127706];},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x3cf)]=function(_0x16bf59){const _0x1e2cf6=_0x17c4f7;if(this[_0x1e2cf6(0x5fc)]===undefined)this[_0x1e2cf6(0x55e)]();if(!_0x16bf59)return;const _0x5353f0='Map%1-Event%2'['format'](_0x16bf59['_mapId'],_0x16bf59[_0x1e2cf6(0x63c)]);this['_SavedEventLocations'][_0x5353f0]={'direction':_0x16bf59['direction'](),'x':Math[_0x1e2cf6(0x574)](_0x16bf59['x']),'y':Math['round'](_0x16bf59['y']),'pageIndex':_0x16bf59[_0x1e2cf6(0x49e)],'moveRouteIndex':_0x16bf59[_0x1e2cf6(0x1ec)]};},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x5a0)]=function(_0x50ac26){const _0x4a9bd5=_0x17c4f7;if(this[_0x4a9bd5(0x5fc)]===undefined)this[_0x4a9bd5(0x55e)]();if(!_0x50ac26)return;this[_0x4a9bd5(0x5a6)](_0x50ac26[_0x4a9bd5(0x543)],_0x50ac26[_0x4a9bd5(0x63c)]);},Game_System[_0x17c4f7(0x4ae)]['deleteSavedEventLocationKey']=function(_0x52ee32,_0x1349ea){const _0x25ce0d=_0x17c4f7;if(this['_SavedEventLocations']===undefined)this[_0x25ce0d(0x55e)]();const _0x3b5c6e='Map%1-Event%2'[_0x25ce0d(0x63e)](_0x52ee32,_0x1349ea);delete this[_0x25ce0d(0x5fc)][_0x3b5c6e];},Game_System['prototype'][_0x17c4f7(0x1f3)]=function(_0x37bf57,_0x1e559e,_0x3bda63,_0x1f0b25,_0x369b92,_0x2cda44,_0x221170){const _0x343e36=_0x17c4f7;if(this[_0x343e36(0x5fc)]===undefined)this[_0x343e36(0x55e)]();const _0x2fa4e8=_0x343e36(0x3bf)['format'](_0x37bf57,_0x1e559e);this[_0x343e36(0x5fc)][_0x2fa4e8]={'direction':_0x369b92,'x':Math['round'](_0x3bda63),'y':Math[_0x343e36(0x574)](_0x1f0b25),'pageIndex':_0x2cda44,'moveRouteIndex':_0x221170};},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x3b2)]=function(_0x2ce2ab){const _0x29da79=_0x17c4f7;if(this['_PreservedEventMorphData']===undefined)this[_0x29da79(0x55e)]();if(!_0x2ce2ab)return;const _0x496594=_0x29da79(0x3bf)[_0x29da79(0x63e)](_0x2ce2ab[_0x29da79(0x543)],_0x2ce2ab[_0x29da79(0x63c)]);return this[_0x29da79(0x338)][_0x496594];},Game_System[_0x17c4f7(0x4ae)]['savePreservedMorphEventDataKey']=function(_0x59c569,_0xdcfae4,_0x5eaddf,_0x5961ce,_0x424074){const _0x3af7a6=_0x17c4f7;if(this['_PreservedEventMorphData']===undefined)this[_0x3af7a6(0x55e)]();const _0x1027a7=_0x3af7a6(0x3bf)['format'](_0x59c569,_0xdcfae4);this[_0x3af7a6(0x338)][_0x1027a7]={'template':_0x5eaddf,'mapId':_0x5961ce,'eventId':_0x424074};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0x31b329,_0x4cd67f){const _0x59c8d4=_0x17c4f7;if(this['_PreservedEventMorphData']===undefined)this[_0x59c8d4(0x55e)]();const _0x145ee5=_0x59c8d4(0x3bf)[_0x59c8d4(0x63e)](_0x31b329,_0x4cd67f);delete this[_0x59c8d4(0x338)][_0x145ee5];},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x380)]=function(_0x136e1b){const _0x584103=_0x17c4f7;if(this['_MapSpawnedEventData']===undefined)this[_0x584103(0x55e)]();return this[_0x584103(0x55c)][_0x136e1b]=this[_0x584103(0x55c)][_0x136e1b]||[],this[_0x584103(0x55c)][_0x136e1b];},Game_System[_0x17c4f7(0x4ae)]['removeTemporaryMapSpawnedEvents']=function(_0x295173){const _0x111aa1=_0x17c4f7,_0x5c7a25=this['getMapSpawnedEventData'](_0x295173);for(const _0x2b770a of _0x5c7a25){if(!_0x2b770a)continue;if(_0x2b770a[_0x111aa1(0x223)])continue;const _0x38347b=_0x5c7a25['indexOf'](_0x2b770a);_0x5c7a25[_0x38347b]=null;}},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x4e7)]=function(){this['_followerControlID']=0x0,this['_followerChaseOff']=![];},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x59c)]=function(){const _0x1276dc=_0x17c4f7;if(this[_0x1276dc(0x307)]===undefined)this[_0x1276dc(0x4e7)]();return this[_0x1276dc(0x307)];},Game_System[_0x17c4f7(0x4ae)]['setControlledFollowerID']=function(_0x271837){const _0x4fdb45=_0x17c4f7;if(this[_0x4fdb45(0x307)]===undefined)this['initFollowerController']();this[_0x4fdb45(0x307)]=_0x271837;;},VisuMZ['EventsMoveCore']['Game_Interpreter_character']=Game_Interpreter[_0x17c4f7(0x4ae)]['character'],Game_Interpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ce)]=function(_0x29f5ce){const _0x50b561=_0x17c4f7;if(!$gameParty['inBattle']()&&_0x29f5ce<0x0){let _0x261988=$gameSystem['getControlledFollowerID']();if(_0x261988>0x0)return $gamePlayer['followers']()[_0x50b561(0x4a0)](_0x261988-0x1);}return VisuMZ[_0x50b561(0x4f2)][_0x50b561(0x35d)][_0x50b561(0x494)](this,_0x29f5ce);},Game_System['prototype'][_0x17c4f7(0x281)]=function(){const _0x3bf532=_0x17c4f7;if(this[_0x3bf532(0x2e2)]===undefined)this['initFollowerController']();return this[_0x3bf532(0x2e2)];},Game_System[_0x17c4f7(0x4ae)][_0x17c4f7(0x66b)]=function(_0x1d86cf){const _0x1943ed=_0x17c4f7;if(this[_0x1943ed(0x2e2)]===undefined)this[_0x1943ed(0x4e7)]();this[_0x1943ed(0x2e2)]=_0x1d86cf;;},VisuMZ['EventsMoveCore'][_0x17c4f7(0x190)]=Game_Followers[_0x17c4f7(0x4ae)][_0x17c4f7(0x260)],Game_Followers['prototype']['jumpAll']=function(){const _0x56fe4f=_0x17c4f7;if($gameSystem[_0x56fe4f(0x281)]())return;VisuMZ['EventsMoveCore']['Game_Followers_jumpAll'][_0x56fe4f(0x494)](this);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x32a)]=Game_Timer['prototype'][_0x17c4f7(0x65f)],Game_Timer[_0x17c4f7(0x4ae)]['initialize']=function(){const _0x51b5b8=_0x17c4f7;VisuMZ[_0x51b5b8(0x4f2)][_0x51b5b8(0x32a)]['call'](this),this[_0x51b5b8(0x55e)]();},Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x55e)]=function(){const _0x5c283c=_0x17c4f7;this['_paused']=![],this[_0x5c283c(0x4c3)]=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer[_0x17c4f7(0x4ae)]['update']=function(_0x29f153){const _0x5dc751=_0x17c4f7;if(!_0x29f153)return;if(!this[_0x5dc751(0x32c)])return;if(this[_0x5dc751(0x45d)])return;if(this[_0x5dc751(0x559)]<=0x0)return;if(this[_0x5dc751(0x4c3)]===undefined)this[_0x5dc751(0x55e)]();this[_0x5dc751(0x559)]+=this[_0x5dc751(0x4c3)],this[_0x5dc751(0x559)]<=0x0&&this[_0x5dc751(0x369)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x40b)]=Game_Timer[_0x17c4f7(0x4ae)]['start'],Game_Timer['prototype'][_0x17c4f7(0x46c)]=function(_0xefe1fc){const _0x526ebc=_0x17c4f7;VisuMZ[_0x526ebc(0x4f2)][_0x526ebc(0x40b)][_0x526ebc(0x494)](this,_0xefe1fc);if(this[_0x526ebc(0x45d)]===undefined)this['initEventsMoveCore']();this['_paused']=![];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x1ed)]=Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x5fa)],Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x5fa)]=function(){const _0x69ff8=_0x17c4f7;VisuMZ[_0x69ff8(0x4f2)]['Game_Timer_stop'][_0x69ff8(0x494)](this);if(this[_0x69ff8(0x45d)]===undefined)this[_0x69ff8(0x55e)]();this[_0x69ff8(0x45d)]=![];},Game_Timer['prototype'][_0x17c4f7(0x1a8)]=function(){const _0x34e467=_0x17c4f7;if(this[_0x34e467(0x559)]<=0x0)return;this[_0x34e467(0x45d)]=!![],this[_0x34e467(0x32c)]=!![];},Game_Timer[_0x17c4f7(0x4ae)]['resume']=function(){const _0x196da4=_0x17c4f7;if(this[_0x196da4(0x559)]<=0x0)return;this[_0x196da4(0x45d)]=![],this[_0x196da4(0x32c)]=!![];},Game_Timer['prototype']['gainFrames']=function(_0x1269aa){const _0x47974c=_0x17c4f7;this[_0x47974c(0x559)]=this[_0x47974c(0x559)]||0x0,this[_0x47974c(0x559)]+=_0x1269aa,this[_0x47974c(0x32c)]=!![],this[_0x47974c(0x559)]=Math[_0x47974c(0x236)](0x1,this[_0x47974c(0x559)]);},Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x4de)]=function(_0x18895f){const _0x253a1c=_0x17c4f7;this['_frames']=this['_frames']||0x0,this['_frames']=_0x18895f,this[_0x253a1c(0x32c)]=!![],this['_frames']=Math[_0x253a1c(0x236)](0x1,this['_frames']);},Game_Timer['prototype'][_0x17c4f7(0x38e)]=function(_0x5031bb){const _0x1f1b45=_0x17c4f7;this['_speed']=_0x5031bb,this[_0x1f1b45(0x32c)]=!![],_0x5031bb>0x0&&(this[_0x1f1b45(0x559)]=Math['max'](this[_0x1f1b45(0x559)],0x1));},Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x60f)]=function(_0x441409){const _0x5bf07e=_0x17c4f7;if(this[_0x5bf07e(0x251)]===undefined)this['initEventsMoveCore']();this[_0x5bf07e(0x251)]=_0x441409;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x41a)]=Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x369)],Game_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x369)]=function(){const _0x25336e=_0x17c4f7;if(this['_expireCommonEvent']===undefined)this[_0x25336e(0x55e)]();this['_expireCommonEvent']?$gameTemp[_0x25336e(0x22c)](this[_0x25336e(0x251)]):VisuMZ[_0x25336e(0x4f2)][_0x25336e(0x41a)]['call'](this);},VisuMZ['EventsMoveCore'][_0x17c4f7(0x20d)]=Game_Message[_0x17c4f7(0x4ae)]['add'],Game_Message[_0x17c4f7(0x4ae)][_0x17c4f7(0x297)]=function(_0x2a690e){const _0x2e0559=_0x17c4f7;VisuMZ[_0x2e0559(0x4f2)][_0x2e0559(0x20d)][_0x2e0559(0x494)](this,_0x2a690e),this[_0x2e0559(0x20e)]=$gameTemp[_0x2e0559(0x64a)]();},Game_Message[_0x17c4f7(0x4ae)]['registerSelfEvent']=function(){const _0x576b0b=_0x17c4f7;$gameTemp[_0x576b0b(0x63d)](this[_0x576b0b(0x20e)]);},VisuMZ['EventsMoveCore'][_0x17c4f7(0x5cc)]=Game_Switches['prototype'][_0x17c4f7(0x1a5)],Game_Switches[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a5)]=function(_0xe0457b){const _0x2c66ee=_0x17c4f7;if(DataManager[_0x2c66ee(0x41e)](_0xe0457b))return!!this[_0x2c66ee(0x4d5)](_0xe0457b);else{if(DataManager[_0x2c66ee(0x535)](_0xe0457b))return!!this[_0x2c66ee(0x2b7)](_0xe0457b);else return DataManager[_0x2c66ee(0x642)](_0xe0457b)?!!this[_0x2c66ee(0x583)](_0xe0457b):VisuMZ[_0x2c66ee(0x4f2)][_0x2c66ee(0x5cc)][_0x2c66ee(0x494)](this,_0xe0457b);}},Game_Switches[_0x17c4f7(0x3c0)]={},Game_Switches[_0x17c4f7(0x4ae)][_0x17c4f7(0x4d5)]=function(_0x430170){const _0x1d60a9=_0x17c4f7;if(!Game_Switches['advancedFunc'][_0x430170]){$dataSystem[_0x1d60a9(0x24a)][_0x430170][_0x1d60a9(0x49f)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5448df=_0x1d60a9(0x216)['format'](String(RegExp['$1']));Game_Switches[_0x1d60a9(0x3c0)][_0x430170]=new Function(_0x1d60a9(0x458),_0x5448df);}const _0x543e06=$gameTemp[_0x1d60a9(0x64a)]()||this;return Game_Switches[_0x1d60a9(0x3c0)][_0x430170][_0x1d60a9(0x494)](_0x543e06,_0x430170);},Game_Switches[_0x17c4f7(0x4ae)][_0x17c4f7(0x2b7)]=function(_0x4f6011){const _0x569bed=_0x17c4f7,_0x1d0da9=$gameTemp[_0x569bed(0x64a)]()||this;if(_0x1d0da9[_0x569bed(0x311)]!==Game_Event)return VisuMZ[_0x569bed(0x4f2)]['Game_Switches_value'][_0x569bed(0x494)](this,_0x4f6011);else{const _0x1a8971=[_0x1d0da9[_0x569bed(0x543)],_0x1d0da9[_0x569bed(0x63c)],'Self\x20Switch\x20%1'[_0x569bed(0x63e)](_0x4f6011)];return $gameSelfSwitches[_0x569bed(0x1a5)](_0x1a8971);}},Game_Switches[_0x17c4f7(0x4ae)]['mapValue']=function(_0x3ed83c){const _0x26ca10=_0x17c4f7,_0x4033d5=$gameMap?$gameMap['mapId']():0x0,_0x22b23b=[0x0,0x0,_0x26ca10(0x486)[_0x26ca10(0x63e)](_0x4033d5,_0x3ed83c)];return $gameSelfSwitches[_0x26ca10(0x1a5)](_0x22b23b);},VisuMZ['EventsMoveCore']['Game_Switches_setValue']=Game_Switches[_0x17c4f7(0x4ae)][_0x17c4f7(0x437)],Game_Switches[_0x17c4f7(0x4ae)]['setValue']=function(_0x7c7c65,_0x231680){const _0x4bdbb6=_0x17c4f7;if(DataManager['isSelfSwitch'](_0x7c7c65))this[_0x4bdbb6(0x276)](_0x7c7c65,_0x231680);else DataManager['isMapSwitch'](_0x7c7c65)?this[_0x4bdbb6(0x5a2)](_0x7c7c65,_0x231680):VisuMZ[_0x4bdbb6(0x4f2)][_0x4bdbb6(0x26e)][_0x4bdbb6(0x494)](this,_0x7c7c65,_0x231680);},Game_Switches['prototype'][_0x17c4f7(0x276)]=function(_0x24ce35,_0x4cec1e){const _0x15dbcb=_0x17c4f7,_0x2f6d90=$gameTemp[_0x15dbcb(0x64a)]()||this;if(_0x2f6d90[_0x15dbcb(0x311)]!==Game_Event)VisuMZ[_0x15dbcb(0x4f2)]['Game_Switches_setValue'][_0x15dbcb(0x494)](this,_0x24ce35,_0x4cec1e);else{const _0x191b69=[_0x2f6d90[_0x15dbcb(0x543)],_0x2f6d90[_0x15dbcb(0x63c)],_0x15dbcb(0x3fe)[_0x15dbcb(0x63e)](_0x24ce35)];$gameSelfSwitches[_0x15dbcb(0x437)](_0x191b69,_0x4cec1e);}},Game_Switches[_0x17c4f7(0x4ae)][_0x17c4f7(0x5a2)]=function(_0x3707eb,_0x2216d4){const _0x46746c=_0x17c4f7,_0x1e4f13=$gameMap?$gameMap[_0x46746c(0x567)]():0x0,_0x13a37f=[0x0,0x0,_0x46746c(0x486)[_0x46746c(0x63e)](_0x1e4f13,_0x3707eb)];return $gameSelfSwitches[_0x46746c(0x437)](_0x13a37f,_0x2216d4);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x560)]=Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a5)],Game_Variables[_0x17c4f7(0x4ae)]['value']=function(_0x330b37){const _0xa0fdfc=_0x17c4f7;if(DataManager[_0xa0fdfc(0x5ed)](_0x330b37))return this[_0xa0fdfc(0x4d5)](_0x330b37);else{if(DataManager[_0xa0fdfc(0x514)](_0x330b37))return this[_0xa0fdfc(0x2b7)](_0x330b37);else return DataManager['isMapVariable'](_0x330b37)?this['mapValue'](_0x330b37):VisuMZ['EventsMoveCore'][_0xa0fdfc(0x560)][_0xa0fdfc(0x494)](this,_0x330b37);}},Game_Variables[_0x17c4f7(0x3c0)]={},Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x4d5)]=function(_0x5e57b0){const _0x2eac9b=_0x17c4f7;if(!Game_Variables[_0x2eac9b(0x3c0)][_0x5e57b0]){$dataSystem['variables'][_0x5e57b0][_0x2eac9b(0x49f)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1db219='return\x20%1'['format'](String(RegExp['$1']));Game_Variables[_0x2eac9b(0x3c0)][_0x5e57b0]=new Function(_0x2eac9b(0x65c),_0x1db219);}const _0x122fb2=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0x2eac9b(0x3c0)][_0x5e57b0]['call'](_0x122fb2,_0x5e57b0);},Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x2b7)]=function(_0x1068e4){const _0x5c48d0=_0x17c4f7,_0x41265d=$gameTemp[_0x5c48d0(0x64a)]()||this;if(_0x41265d[_0x5c48d0(0x311)]!==Game_Event)return VisuMZ[_0x5c48d0(0x4f2)][_0x5c48d0(0x560)][_0x5c48d0(0x494)](this,_0x1068e4);else{const _0x3074c8=[_0x41265d[_0x5c48d0(0x543)],_0x41265d['_eventId'],'Self\x20Variable\x20%1'[_0x5c48d0(0x63e)](_0x1068e4)];return $gameSelfSwitches[_0x5c48d0(0x1a5)](_0x3074c8);}},Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x583)]=function(_0x23d2eb){const _0xe10cc3=_0x17c4f7,_0x5dacfd=$gameMap?$gameMap[_0xe10cc3(0x567)]():0x0,_0x562223=[0x0,0x0,_0xe10cc3(0x52d)['format'](_0x5dacfd,_0x23d2eb)];return $gameSelfSwitches[_0xe10cc3(0x1a5)](_0x562223)||0x0;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x30e)]=Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x437)],Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x437)]=function(_0x14160b,_0x26ac55){const _0x4a81c4=_0x17c4f7;if(DataManager[_0x4a81c4(0x514)](_0x14160b))this[_0x4a81c4(0x276)](_0x14160b,_0x26ac55);else DataManager[_0x4a81c4(0x22e)](_0x14160b)?this[_0x4a81c4(0x5a2)](_0x14160b,_0x26ac55):VisuMZ['EventsMoveCore'][_0x4a81c4(0x30e)][_0x4a81c4(0x494)](this,_0x14160b,_0x26ac55);},Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x276)]=function(_0x4fa16a,_0x2b8915){const _0x3e090c=_0x17c4f7,_0x1b15ff=$gameTemp[_0x3e090c(0x64a)]()||this;if(_0x1b15ff[_0x3e090c(0x311)]!==Game_Event)VisuMZ[_0x3e090c(0x4f2)][_0x3e090c(0x30e)][_0x3e090c(0x494)](this,_0x4fa16a,_0x2b8915);else{const _0x4d0b23=[_0x1b15ff[_0x3e090c(0x543)],_0x1b15ff[_0x3e090c(0x63c)],_0x3e090c(0x5d4)[_0x3e090c(0x63e)](_0x4fa16a)];$gameSelfSwitches[_0x3e090c(0x437)](_0x4d0b23,_0x2b8915);}},Game_Variables[_0x17c4f7(0x4ae)][_0x17c4f7(0x5a2)]=function(_0xac8649,_0x16f3b9){const _0x2690f8=_0x17c4f7,_0x28ecd3=$gameMap?$gameMap[_0x2690f8(0x567)]():0x0,_0x52aaa1=[0x0,0x0,_0x2690f8(0x52d)[_0x2690f8(0x63e)](_0x28ecd3,_0xac8649)];$gameSelfSwitches[_0x2690f8(0x437)](_0x52aaa1,_0x16f3b9);},VisuMZ[_0x17c4f7(0x4f2)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x17c4f7(0x4ae)]['value'],Game_SelfSwitches[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a5)]=function(_0x439169){const _0x125483=_0x17c4f7;if(_0x439169[0x2][_0x125483(0x49f)](/(?:SELF|MAP)/i))return this[_0x125483(0x2b7)](_0x439169);else{return VisuMZ[_0x125483(0x4f2)][_0x125483(0x361)][_0x125483(0x494)](this,_0x439169);;}},Game_SelfSwitches[_0x17c4f7(0x4ae)]['selfValue']=function(_0x34d389){const _0x4a8a4e=_0x17c4f7;return _0x34d389[0x2][_0x4a8a4e(0x49f)](/VAR/i)?this['_data'][_0x34d389]||0x0:!!this['_data'][_0x34d389];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x589)]=Game_SelfSwitches[_0x17c4f7(0x4ae)]['setValue'],Game_SelfSwitches['prototype'][_0x17c4f7(0x437)]=function(_0x4913be,_0x3f8c58){const _0x2586c2=_0x17c4f7;_0x4913be[0x2][_0x2586c2(0x49f)](/(?:SELF|MAP)/i)?this[_0x2586c2(0x276)](_0x4913be,_0x3f8c58):VisuMZ[_0x2586c2(0x4f2)][_0x2586c2(0x589)][_0x2586c2(0x494)](this,_0x4913be,_0x3f8c58);},Game_SelfSwitches[_0x17c4f7(0x4ae)][_0x17c4f7(0x276)]=function(_0x43f916,_0x2be3c4){const _0x3451ce=_0x17c4f7;this['_data'][_0x43f916]=_0x43f916[0x2][_0x3451ce(0x49f)](/VAR/i)?_0x2be3c4:!!_0x2be3c4,this[_0x3451ce(0x34e)]();},VisuMZ['EventsMoveCore'][_0x17c4f7(0x48c)]=Scene_Map['prototype']['createDisplayObjects'],Scene_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x371)]=function(){const _0xb1b7c=_0x17c4f7;$gameMap['resetExitSelfSwitches'](),VisuMZ[_0xb1b7c(0x4f2)][_0xb1b7c(0x48c)]['call'](this);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x40e)]=function(){const _0x4922cb=_0x17c4f7;if(this[_0x4922cb(0x1aa)]===this[_0x4922cb(0x567)]())return;this['_lastSesetExitSelfSwitchesMapId']=this['mapId'](),this[_0x4922cb(0x3d8)]=undefined;const _0x47d393=this[_0x4922cb(0x5f9)]();for(const _0x30e7c7 of _0x47d393){if(_0x30e7c7)$gameSelfSwitches[_0x4922cb(0x563)](_0x30e7c7);}},Game_SelfSwitches['prototype'][_0x17c4f7(0x563)]=function(_0x52866d){const _0x3b59fa=_0x17c4f7;if(!_0x52866d)return;if(!_0x52866d['event']())return;const _0x131fd3=_0x52866d[_0x3b59fa(0x4a4)]()[_0x3b59fa(0x24e)]||'';if(_0x131fd3[_0x3b59fa(0x49f)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x414a0b=_0x3b59fa(0x5e6)['format']($gameMap[_0x3b59fa(0x543)],_0x52866d[_0x3b59fa(0x63c)]),_0x3bc9f9=Object[_0x3b59fa(0x247)](this[_0x3b59fa(0x562)])[_0x3b59fa(0x45f)](_0x15230d=>_0x15230d[_0x3b59fa(0x20b)](_0x414a0b));while(_0x3bc9f9[_0x3b59fa(0x3a2)]>0x0){const _0x114b73=_0x3bc9f9['shift']();delete this[_0x3b59fa(0x562)][_0x114b73];}}},Game_SelfSwitches['prototype']['resetSelfSwitchesForMap']=function(_0x31dbb0){const _0x24e3b7=_0x17c4f7,_0x1d2a9f=_0x24e3b7(0x62c)['format']($gameMap[_0x24e3b7(0x543)]),_0x1816fb=Object[_0x24e3b7(0x247)](this[_0x24e3b7(0x562)])['filter'](_0x257236=>_0x257236[_0x24e3b7(0x20b)](_0x1d2a9f));while(_0x1816fb[_0x24e3b7(0x3a2)]>0x0){const _0x3409f4=_0x1816fb[_0x24e3b7(0x59b)]();delete this[_0x24e3b7(0x562)][_0x3409f4];}_0x31dbb0===$gameMap[_0x24e3b7(0x567)]()&&$gameMap[_0x24e3b7(0x4ee)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x356)]=Game_Enemy[_0x17c4f7(0x4ae)][_0x17c4f7(0x327)],Game_Enemy[_0x17c4f7(0x4ae)][_0x17c4f7(0x327)]=function(_0x3b1aa4){const _0x54e9ab=_0x17c4f7;$gameTemp[_0x54e9ab(0x63d)](this);const _0xf75622=VisuMZ[_0x54e9ab(0x4f2)]['Game_Enemy_meetsSwitchCondition']['call'](this,_0x3b1aa4);return $gameTemp['clearSelfTarget'](),_0xf75622;},VisuMZ['EventsMoveCore']['Game_Party_hasEncounterHalf']=Game_Party[_0x17c4f7(0x4ae)][_0x17c4f7(0x450)],Game_Party[_0x17c4f7(0x4ae)][_0x17c4f7(0x450)]=function(){const _0x39ee56=_0x17c4f7;if(this[_0x39ee56(0x495)]())return!![];return VisuMZ[_0x39ee56(0x4f2)]['Game_Party_hasEncounterHalf'][_0x39ee56(0x494)](this);},Game_Party[_0x17c4f7(0x4ae)][_0x17c4f7(0x495)]=function(){const _0x5f3a2b=_0x17c4f7;if(this[_0x5f3a2b(0x480)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ['EventsMoveCore'][_0x17c4f7(0x2f6)]=Game_Party[_0x17c4f7(0x4ae)][_0x17c4f7(0x5b9)],Game_Party[_0x17c4f7(0x4ae)][_0x17c4f7(0x5b9)]=function(){const _0x4e94c5=_0x17c4f7;if(this[_0x4e94c5(0x231)]())return!![];return VisuMZ[_0x4e94c5(0x4f2)]['Game_Party_hasEncounterNone'][_0x4e94c5(0x494)](this);},Game_Party[_0x17c4f7(0x4ae)][_0x17c4f7(0x231)]=function(){if(this['_checkEncounterRaw'])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x1ee0a4,_0x2e6c07){const _0x534250=_0x17c4f7;if(!$gameMap)return![];_0x1ee0a4=Math[_0x534250(0x574)](_0x1ee0a4||0x0),_0x2e6c07=Math[_0x534250(0x574)](_0x2e6c07||0x0);const _0x11da53=$gameMap[_0x534250(0x5f9)]();for(const _0x3675b4 of _0x11da53){if(!_0x3675b4)continue;if(_0x3675b4[_0x534250(0x54e)])continue;const _0x52a4ad=_0x3675b4[_0x534250(0x26d)](!![]),_0x5a91a2=_0x3675b4[_0x534250(0x349)](!![]);if($gameMap[_0x534250(0x3eb)](_0x1ee0a4,_0x2e6c07,_0x3675b4,_0x52a4ad,_0x5a91a2))return!![];}return![];},$isTileEncounterNone=function(_0xe6089d,_0x1568df){const _0x10624b=_0x17c4f7;if(!$gameMap)return![];_0xe6089d=Math['round'](_0xe6089d||0x0),_0x1568df=Math['round'](_0x1568df||0x0);const _0xb504d1=$gameMap[_0x10624b(0x5f9)]();for(const _0x5090c3 of _0xb504d1){if(!_0x5090c3)continue;if(_0x5090c3[_0x10624b(0x54e)])continue;const _0x25d79c=_0x5090c3[_0x10624b(0x26d)](![]),_0x150e86=_0x5090c3[_0x10624b(0x349)](![]);if($gameMap[_0x10624b(0x3eb)](_0xe6089d,_0x1568df,_0x5090c3,_0x25d79c,_0x150e86))return!![];}return![];};VisuMZ[_0x17c4f7(0x4f2)]['Game_Troop_meetsConditions']=Game_Troop[_0x17c4f7(0x4ae)][_0x17c4f7(0x2da)],Game_Troop[_0x17c4f7(0x4ae)]['meetsConditions']=function(_0x5e4cc2){const _0x1aa73f=_0x17c4f7;$gameTemp[_0x1aa73f(0x63d)](this);const _0x4d82c7=VisuMZ[_0x1aa73f(0x4f2)]['Game_Troop_meetsConditions'][_0x1aa73f(0x494)](this,_0x5e4cc2);return $gameTemp[_0x1aa73f(0x5bc)](),_0x4d82c7;},VisuMZ['EventsMoveCore'][_0x17c4f7(0x320)]=Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a1)],Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a1)]=function(_0x3582b8){const _0xfa804e=_0x17c4f7;this[_0xfa804e(0x499)](_0x3582b8),this[_0xfa804e(0x3a6)](),VisuMZ['EventsMoveCore']['Game_Map_setup'][_0xfa804e(0x494)](this,_0x3582b8),this[_0xfa804e(0x3a6)](),this[_0xfa804e(0x191)](),this[_0xfa804e(0x4af)](),this[_0xfa804e(0x274)](),this['setupSpawnedEvents'](),this[_0xfa804e(0x39d)](),this[_0xfa804e(0x65b)](),this[_0xfa804e(0x34a)](),this[_0xfa804e(0x25e)](),this[_0xfa804e(0x3a6)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x49b)]=Game_Map[_0x17c4f7(0x4ae)]['setupEvents'],Game_Map[_0x17c4f7(0x4ae)]['setupEvents']=function(){const _0x3a5156=_0x17c4f7;VisuMZ[_0x3a5156(0x4f2)][_0x3a5156(0x49b)][_0x3a5156(0x494)](this),this[_0x3a5156(0x428)]();},Game_Map[_0x17c4f7(0x5da)]=0xc8,Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x620)]=function(){const _0x436e08=_0x17c4f7,_0x527add=Game_Map[_0x436e08(0x5da)];this[_0x436e08(0x244)]=this[_0x436e08(0x5f9)]()[_0x436e08(0x3a2)]>_0x527add;if(this[_0x436e08(0x244)]&&$gameTemp[_0x436e08(0x601)]()){}},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f8)]=function(){const _0x4e72f2=_0x17c4f7;return this[_0x4e72f2(0x244)];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3a6)]=function(){this['_eventCache']=undefined;},Game_Map[_0x17c4f7(0x4ae)]['setupDiagonalSupport']=function(){const _0x4ee495=_0x17c4f7;this[_0x4ee495(0x47e)]=VisuMZ['EventsMoveCore'][_0x4ee495(0x2fe)]['Movement'][_0x4ee495(0x421)];const _0x3351e6=$dataMap[_0x4ee495(0x24e)]||'';if(_0x3351e6['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x4ee495(0x47e)]=!![];else _0x3351e6['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);},Game_Map[_0x17c4f7(0x647)]=VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2fe)]['Movement'][_0x17c4f7(0x44d)]??![],Game_Map['prototype'][_0x17c4f7(0x41d)]=function(){const _0x182640=_0x17c4f7;if(Utils['isMobileDevice']()){if(!Game_Map[_0x182640(0x647)])return![];}const _0x437250=$gameSystem['getPlayerDiagonalSetting']();if(_0x437250===_0x182640(0x2fc))return!![];if(_0x437250==='disable')return![];if(this['_diagonalSupport']===undefined)this[_0x182640(0x191)]();return this[_0x182640(0x47e)];},Game_Map['prototype']['roundXWithDirection']=function(_0x51f18f,_0x3f4c25){const _0x1ac583=_0x17c4f7;if([0x1,0x4,0x7]['includes'](_0x3f4c25))_0x51f18f-=0x1;if([0x3,0x6,0x9][_0x1ac583(0x233)](_0x3f4c25))_0x51f18f+=0x1;return this[_0x1ac583(0x657)](_0x51f18f);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3a5)]=function(_0x9e9fec,_0x5916df){const _0x2241ce=_0x17c4f7;if([0x1,0x2,0x3][_0x2241ce(0x233)](_0x5916df))_0x9e9fec+=0x1;if([0x7,0x8,0x9][_0x2241ce(0x233)](_0x5916df))_0x9e9fec-=0x1;return this[_0x2241ce(0x4e0)](_0x9e9fec);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x472)]=function(_0x1aed6b,_0x31a4ed,_0x48b74a,_0x429d32){const _0x16415e=_0x17c4f7;return Math[_0x16415e(0x236)](Math[_0x16415e(0x555)](this[_0x16415e(0x414)](_0x1aed6b,_0x48b74a)),Math[_0x16415e(0x555)](this[_0x16415e(0x5c1)](_0x31a4ed,_0x429d32)));},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x4af)]=function(){const _0x11c9f1=_0x17c4f7,_0x31508b=VisuMZ[_0x11c9f1(0x4f2)][_0x11c9f1(0x2fe)][_0x11c9f1(0x219)],_0x546228={},_0x6c4e5d=['Allow','Forbid',_0x11c9f1(0x2de)],_0x458d8d=['All',_0x11c9f1(0x66a),_0x11c9f1(0x3d9),_0x11c9f1(0x25c),_0x11c9f1(0x650),_0x11c9f1(0x47d),'Ship',_0x11c9f1(0x235)];for(const _0x41aae7 of _0x6c4e5d){for(const _0x49e6c of _0x458d8d){const _0x479992=_0x11c9f1(0x539)[_0x11c9f1(0x63e)](_0x49e6c,_0x41aae7);_0x31508b[_0x479992]&&(_0x546228[_0x479992]=_0x31508b[_0x479992][_0x11c9f1(0x2bb)](0x0));}}const _0xd2de39=$dataMap[_0x11c9f1(0x24e)]||'',_0x413735=_0xd2de39[_0x11c9f1(0x49f)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x413735)for(const _0x4ff1cd of _0x413735){_0x4ff1cd[_0x11c9f1(0x49f)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x4504db=String(RegExp['$1'])[_0x11c9f1(0x261)]()[_0x11c9f1(0x485)](),_0x3a30c0=String(RegExp['$2'])[_0x11c9f1(0x261)]()[_0x11c9f1(0x485)]();const _0x13eb48=JSON[_0x11c9f1(0x43f)]('['+RegExp['$3'][_0x11c9f1(0x49f)](/\d+/g)+']');_0x4504db=_0x4504db[_0x11c9f1(0x278)](0x0)[_0x11c9f1(0x2f4)]()+_0x4504db[_0x11c9f1(0x2bb)](0x1),_0x3a30c0=_0x3a30c0[_0x11c9f1(0x278)](0x0)[_0x11c9f1(0x2f4)]()+_0x3a30c0[_0x11c9f1(0x2bb)](0x1);const _0x50e549=_0x11c9f1(0x539)[_0x11c9f1(0x63e)](_0x4504db,_0x3a30c0);if(_0x546228[_0x50e549])_0x546228[_0x50e549]=_0x546228[_0x50e549][_0x11c9f1(0x3e0)](_0x13eb48);}this[_0x11c9f1(0x438)]=_0x546228;},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x2a5)]=function(_0x5a3e18,_0xb266c0,_0x2b7552,_0x4dcd4a){const _0x427fe8=_0x17c4f7,_0x2d7010=this[_0x427fe8(0x54b)](_0x5a3e18,_0x2b7552),_0x15bebc=this[_0x427fe8(0x3a5)](_0xb266c0,_0x2b7552),_0x56ca94=this[_0x427fe8(0x359)](_0x2d7010,_0x15bebc),_0xb2cf62=this[_0x427fe8(0x438)];if(_0xb2cf62[_0x427fe8(0x435)][_0x427fe8(0x233)](_0x56ca94))return!![];else{if(_0x4dcd4a===_0x427fe8(0x1fb))return _0xb2cf62[_0x427fe8(0x3d3)][_0x427fe8(0x233)](_0x56ca94)||_0xb2cf62['WalkAllow'][_0x427fe8(0x233)](_0x56ca94);else{if(_0x4dcd4a===_0x427fe8(0x4a4))return _0xb2cf62['EventAllow'][_0x427fe8(0x233)](_0x56ca94)||_0xb2cf62[_0x427fe8(0x334)][_0x427fe8(0x233)](_0x56ca94);else{if(_0xb2cf62[_0x427fe8(0x1d7)]['includes'](_0x56ca94))return!![];else{const _0xb4454=_0x427fe8(0x477)[_0x427fe8(0x63e)](_0x4dcd4a[_0x427fe8(0x278)](0x0)['toUpperCase']()+_0x4dcd4a[_0x427fe8(0x2bb)](0x1));if(_0xb2cf62[_0xb4454])return _0xb2cf62[_0xb4454][_0x427fe8(0x233)](_0x56ca94);}}}}return![];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a3)]=function(_0x109cc4,_0x564a52,_0x5b7ac3,_0x1d0bc6){const _0x1dccb5=_0x17c4f7,_0x7a6851=this['roundXWithDirection'](_0x109cc4,_0x5b7ac3),_0x17c6bf=this[_0x1dccb5(0x3a5)](_0x564a52,_0x5b7ac3),_0x1b3b40=this['regionId'](_0x7a6851,_0x17c6bf),_0x5d0c5a=this['_regionRules'];if(_0x5d0c5a[_0x1dccb5(0x313)][_0x1dccb5(0x233)](_0x1b3b40))return!![];else{if(_0x1d0bc6===_0x1dccb5(0x1fb))return _0x5d0c5a['PlayerForbid'][_0x1dccb5(0x233)](_0x1b3b40)||_0x5d0c5a[_0x1dccb5(0x344)]['includes'](_0x1b3b40);else{if(_0x1d0bc6===_0x1dccb5(0x4a4))return _0x5d0c5a[_0x1dccb5(0x2d6)]['includes'](_0x1b3b40)||_0x5d0c5a['WalkForbid'][_0x1dccb5(0x233)](_0x1b3b40);else{if(_0x5d0c5a[_0x1dccb5(0x504)][_0x1dccb5(0x233)](_0x1b3b40))return!![];else{const _0x4267b8='%1Forbid'[_0x1dccb5(0x63e)](_0x1d0bc6[_0x1dccb5(0x278)](0x0)[_0x1dccb5(0x2f4)]()+_0x1d0bc6['slice'](0x1));if(_0x5d0c5a[_0x4267b8])return _0x5d0c5a[_0x4267b8][_0x1dccb5(0x233)](_0x1b3b40);}}}}return![];},Game_Map['prototype'][_0x17c4f7(0x446)]=function(_0xcb2d5c,_0x6b3ab6,_0xc6caca,_0x4182ab){const _0x3c4689=_0x17c4f7;_0xc6caca=_0x4182ab===_0x3c4689(0x3ff)?0x5:_0xc6caca;const _0x3ee121=this[_0x3c4689(0x54b)](_0xcb2d5c,_0xc6caca),_0x36c15c=this[_0x3c4689(0x3a5)](_0x6b3ab6,_0xc6caca),_0xf4d556=this['regionId'](_0x3ee121,_0x36c15c),_0x2d6aaf=this[_0x3c4689(0x438)];if(_0x2d6aaf[_0x3c4689(0x658)][_0x3c4689(0x233)](_0xf4d556))return!![];else{const _0x5f055d=_0x3c4689(0x1d1)[_0x3c4689(0x63e)](_0x4182ab[_0x3c4689(0x278)](0x0)['toUpperCase']()+_0x4182ab[_0x3c4689(0x2bb)](0x1));if(_0x2d6aaf[_0x5f055d])return _0x2d6aaf[_0x5f055d][_0x3c4689(0x233)](_0xf4d556);}return![];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x492)]=Game_Map[_0x17c4f7(0x4ae)]['refresh'],Game_Map['prototype'][_0x17c4f7(0x1ba)]=function(){const _0x3e1e47=_0x17c4f7;VisuMZ[_0x3e1e47(0x4f2)][_0x3e1e47(0x492)][_0x3e1e47(0x494)](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x545)]=function(){const _0x165596=_0x17c4f7;this['_needsPeriodicRefresh']=![];if(this[_0x165596(0x5f9)]()['some'](_0x5ed340=>_0x5ed340[_0x165596(0x207)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['events']()[_0x165596(0x44a)](_0x3fa951=>_0x3fa951[_0x165596(0x3a1)]())){this[_0x165596(0x2b4)]=!![];return;}if(this[_0x165596(0x342)][_0x165596(0x44a)](_0x31df90=>_0x31df90['hasAdvancedSwitchVariable']())){this[_0x165596(0x2b4)]=!![];return;}if(this['_commonEvents'][_0x165596(0x44a)](_0x4ed63c=>_0x4ed63c[_0x165596(0x3a1)]())){this[_0x165596(0x2b4)]=!![];return;}},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x4fa)]=Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)],Game_Map[_0x17c4f7(0x4ae)]['update']=function(_0x2e2d4e){const _0x470603=_0x17c4f7;this[_0x470603(0x2ac)](),VisuMZ[_0x470603(0x4f2)][_0x470603(0x4fa)][_0x470603(0x494)](this,_0x2e2d4e);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x2ac)]=function(){const _0x252cb0=_0x17c4f7;if(!this[_0x252cb0(0x2b4)])return;this[_0x252cb0(0x42a)]=this[_0x252cb0(0x42a)]||0x3c,this['_periodicRefreshTimer']--,this[_0x252cb0(0x42a)]<=0x0&&(this['requestRefresh'](),this[_0x252cb0(0x42a)]=0x3c);},VisuMZ['EventsMoveCore']['Game_Map_isDashDisabled']=Game_Map['prototype'][_0x17c4f7(0x23e)],Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x23e)]=function(){const _0x293cc7=_0x17c4f7;if(!$gameSystem[_0x293cc7(0x2db)]())return!![];return VisuMZ[_0x293cc7(0x4f2)][_0x293cc7(0x4f3)][_0x293cc7(0x494)](this);},Game_Map[_0x17c4f7(0x4ae)]['setupSaveEventLocations']=function(){const _0x1ef680=_0x17c4f7;this[_0x1ef680(0x376)]=![];const _0x15cb4b=$dataMap[_0x1ef680(0x24e)]||'';_0x15cb4b[_0x1ef680(0x49f)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x17c4f7(0x4ae)]['isSaveEventLocations']=function(){const _0x6f3f91=_0x17c4f7;if(this['_saveEventLocations']===undefined)this[_0x6f3f91(0x274)]();return this[_0x6f3f91(0x376)];},Game_Map['prototype'][_0x17c4f7(0x499)]=function(_0x5467ca){const _0xc44028=_0x17c4f7;_0x5467ca!==this['mapId']()&&$gamePlayer&&$gameSystem[_0xc44028(0x499)](this[_0xc44028(0x567)]());},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x60b)]=function(){const _0x9ecb75=_0x17c4f7;this[_0x9ecb75(0x412)]=$gameSystem[_0x9ecb75(0x380)](this[_0x9ecb75(0x567)]()),this[_0x9ecb75(0x25a)]=!![];},VisuMZ['EventsMoveCore'][_0x17c4f7(0x3e7)]=Game_Map['prototype'][_0x17c4f7(0x5f9)],Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x5f9)]=function(){const _0xc6e5c1=_0x17c4f7;if(this[_0xc6e5c1(0x3d8)])return this[_0xc6e5c1(0x3d8)];const _0x4c68b1=VisuMZ['EventsMoveCore']['Game_Map_events'][_0xc6e5c1(0x494)](this),_0x39657d=_0x4c68b1[_0xc6e5c1(0x3e0)](this[_0xc6e5c1(0x412)]||[]);return this[_0xc6e5c1(0x3d8)]=_0x39657d[_0xc6e5c1(0x45f)](_0x34380c=>!!_0x34380c),this[_0xc6e5c1(0x3d8)];},VisuMZ[_0x17c4f7(0x4f2)]['Game_Map_event']=Game_Map['prototype']['event'],Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x4a4)]=function(_0xeb770){const _0x150cab=_0x17c4f7;return _0xeb770>=0x3e8?(_0xeb770-=0x3e8,this[_0x150cab(0x412)][_0xeb770]):VisuMZ[_0x150cab(0x4f2)][_0x150cab(0x3be)][_0x150cab(0x494)](this,_0xeb770);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x5a8)]=function(_0xdf4558){const _0x5ad6cf=_0x17c4f7,_0x47bc17=this[_0x5ad6cf(0x4a4)](_0xdf4558);if(_0x47bc17)_0x47bc17[_0x5ad6cf(0x65a)]();},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x286)]=function(){const _0x287fe9=_0x17c4f7,_0x51dd73={'template':_0x287fe9(0x347),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x287fe9(0x412)][_0x287fe9(0x3a2)]+0x3e8};this[_0x287fe9(0x3bd)](_0x51dd73);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x292)]=function(_0x2a3b3c,_0x5a457a){const _0x3b0f0b=_0x17c4f7;if(this[_0x3b0f0b(0x2f5)](_0x2a3b3c,_0x5a457a)[_0x3b0f0b(0x3a2)]>0x0)return!![];if($gamePlayer['x']===_0x2a3b3c&&$gamePlayer['y']===_0x5a457a)return!![];if(this[_0x3b0f0b(0x37d)]()[_0x3b0f0b(0x4b6)](_0x2a3b3c,_0x5a457a))return!![];if(this[_0x3b0f0b(0x470)]()['posNt'](_0x2a3b3c,_0x5a457a))return!![];return![];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x5c7)]=function(_0x437656,_0x1ae496,_0x22429d){const _0x5019d2=_0x17c4f7;$gameTemp[_0x5019d2(0x436)]=_0x437656;const _0x45b22a=new Game_Event(_0x437656[_0x5019d2(0x567)],_0x437656[_0x5019d2(0x415)]);$gameTemp[_0x5019d2(0x436)]=undefined,_0x45b22a[_0x5019d2(0x1ba)]();let _0x5af197=_0x1ae496-_0x45b22a[_0x5019d2(0x3ab)]['left'],_0x5f3a27=_0x1ae496+_0x45b22a[_0x5019d2(0x3ab)][_0x5019d2(0x43b)],_0x4408f0=_0x22429d-_0x45b22a[_0x5019d2(0x3ab)]['up'],_0x2b8a50=_0x22429d+_0x45b22a[_0x5019d2(0x3ab)][_0x5019d2(0x4d2)];for(let _0x587239=_0x5af197;_0x587239<=_0x5f3a27;_0x587239++){for(let _0x4b3c66=_0x4408f0;_0x4b3c66<=_0x2b8a50;_0x4b3c66++){if(this[_0x5019d2(0x292)](_0x587239,_0x4b3c66))return![];}}return!![];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3bd)]=function(_0x5681a4){const _0x57b91c=_0x17c4f7;$gameTemp['_spawnData']=_0x5681a4;const _0x5adb17=new Game_Event(_0x5681a4['mapId'],_0x5681a4[_0x57b91c(0x415)]);$gameTemp[_0x57b91c(0x436)]=undefined,this[_0x57b91c(0x412)][_0x57b91c(0x46b)](_0x5adb17),_0x5adb17['setupSpawn'](_0x5681a4),this[_0x57b91c(0x3a6)]();},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1e2)]=function(_0x4dd07e,_0x1029df,_0x174150){const _0x27b84a=_0x17c4f7,_0x446be9=_0x4dd07e['template'][_0x27b84a(0x2f4)]()['trim']();if(_0x446be9!=='UNTITLED'){const _0x23b69c=VisuMZ[_0x27b84a(0x51d)][_0x446be9];_0x23b69c&&(_0x4dd07e[_0x27b84a(0x567)]=_0x23b69c['MapID'],_0x4dd07e[_0x27b84a(0x415)]=_0x23b69c[_0x27b84a(0x50e)]);}const _0x2b6383=_0x4dd07e['x'],_0x4f323e=_0x4dd07e['y'];if(!this[_0x27b84a(0x1c5)](_0x2b6383,_0x4f323e))return![];if(_0x1029df){if(this[_0x27b84a(0x292)](_0x2b6383,_0x4f323e))return![];if(!this[_0x27b84a(0x5c7)](_0x4dd07e,_0x2b6383,_0x4f323e))return![];}if(_0x174150){if(!this[_0x27b84a(0x3f9)](_0x2b6383,_0x4f323e))return![];}return this[_0x27b84a(0x3bd)](_0x4dd07e),!![];},Game_Map['prototype'][_0x17c4f7(0x637)]=function(_0x22ee31,_0xd2ead3,_0x2a104a,_0x4322be){const _0x122260=_0x17c4f7,_0x46d62a=_0x22ee31[_0x122260(0x502)][_0x122260(0x2f4)]()[_0x122260(0x485)]();if(_0x46d62a!==_0x122260(0x449)){const _0x41b1a2=VisuMZ[_0x122260(0x51d)][_0x46d62a];_0x41b1a2&&(_0x22ee31[_0x122260(0x567)]=_0x41b1a2[_0x122260(0x667)],_0x22ee31[_0x122260(0x415)]=_0x41b1a2[_0x122260(0x50e)]);}const _0x25dc02=[],_0x2ec717=this['width'](),_0xb98039=this[_0x122260(0x626)]();for(let _0x237317=0x0;_0x237317<_0x2ec717;_0x237317++){for(let _0x5303e9=0x0;_0x5303e9<_0xb98039;_0x5303e9++){if(!_0xd2ead3[_0x122260(0x233)](this[_0x122260(0x359)](_0x237317,_0x5303e9)))continue;if(!this[_0x122260(0x1c5)](_0x237317,_0x5303e9))continue;if(_0x2a104a){if(this[_0x122260(0x292)](_0x237317,_0x5303e9))continue;if(!this['isSpawnHitboxCollisionOk'](_0x22ee31,_0x237317,_0x5303e9))continue;}if(_0x4322be){if(!this['isPassableByAnyDirection'](_0x237317,_0x5303e9))continue;}_0x25dc02[_0x122260(0x46b)]([_0x237317,_0x5303e9]);}}if(_0x25dc02[_0x122260(0x3a2)]>0x0){const _0x8541c8=_0x25dc02[Math[_0x122260(0x1d4)](_0x25dc02[_0x122260(0x3a2)])];return _0x22ee31['x']=_0x8541c8[0x0],_0x22ee31['y']=_0x8541c8[0x1],this['createSpawnedEventWithData'](_0x22ee31),!![];}return![];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x314)]=function(_0x304a16,_0x105ea1,_0x44a760,_0x5d94ea){const _0x348459=_0x17c4f7,_0x5ac788=_0x304a16[_0x348459(0x502)]['toUpperCase']()['trim']();if(_0x5ac788!==_0x348459(0x449)){const _0x5460fd=VisuMZ[_0x348459(0x51d)][_0x5ac788];_0x5460fd&&(_0x304a16['mapId']=_0x5460fd[_0x348459(0x667)],_0x304a16[_0x348459(0x415)]=_0x5460fd['EventID']);}const _0x180c7e=[],_0x1449a4=this[_0x348459(0x288)](),_0x399de4=this[_0x348459(0x626)]();for(let _0x77346b=0x0;_0x77346b<_0x1449a4;_0x77346b++){for(let _0x3bbaa1=0x0;_0x3bbaa1<_0x399de4;_0x3bbaa1++){if(!_0x105ea1[_0x348459(0x233)](this[_0x348459(0x5e5)](_0x77346b,_0x3bbaa1)))continue;if(!this[_0x348459(0x1c5)](_0x77346b,_0x3bbaa1))continue;if(_0x44a760){if(this[_0x348459(0x292)](_0x77346b,_0x3bbaa1))continue;if(!this[_0x348459(0x5c7)](_0x304a16,_0x77346b,_0x3bbaa1))continue;}if(_0x5d94ea){if(!this[_0x348459(0x3f9)](_0x77346b,_0x3bbaa1))continue;}_0x180c7e[_0x348459(0x46b)]([_0x77346b,_0x3bbaa1]);}}if(_0x180c7e['length']>0x0){const _0x30df03=_0x180c7e[Math[_0x348459(0x1d4)](_0x180c7e[_0x348459(0x3a2)])];return _0x304a16['x']=_0x30df03[0x0],_0x304a16['y']=_0x30df03[0x1],this[_0x348459(0x3bd)](_0x304a16),!![];}return![];},Game_Map['prototype'][_0x17c4f7(0x3f9)]=function(_0x6f0a5b,_0x40d1b6){const _0x47f040=_0x17c4f7;if(this[_0x47f040(0x426)](_0x6f0a5b,_0x40d1b6,0x2))return!![];if(this['isPassable'](_0x6f0a5b,_0x40d1b6,0x4))return!![];if(this[_0x47f040(0x426)](_0x6f0a5b,_0x40d1b6,0x6))return!![];if(this[_0x47f040(0x426)](_0x6f0a5b,_0x40d1b6,0x8))return!![];return![];},Game_Map['prototype']['despawnEventId']=function(_0x16f466){const _0x38d0ca=_0x17c4f7;if(_0x16f466<0x3e8)return;if(!this[_0x38d0ca(0x412)])return;const _0x40a2b2=this[_0x38d0ca(0x4a4)](_0x16f466);_0x40a2b2[_0x38d0ca(0x2d7)](-0x1,-0x1),_0x40a2b2[_0x38d0ca(0x65a)](),this[_0x38d0ca(0x412)][_0x16f466-0x3e8]=null,this[_0x38d0ca(0x3a6)]();},Game_Map['prototype']['firstSpawnedEvent']=function(){const _0xee428f=_0x17c4f7;for(const _0x5a1c39 of this[_0xee428f(0x412)]){if(_0x5a1c39)return _0x5a1c39;}return null;},Game_Map['prototype'][_0x17c4f7(0x587)]=function(){const _0x1442d7=_0x17c4f7,_0x52a5f8=this['firstSpawnedEvent']();return _0x52a5f8?_0x52a5f8[_0x1442d7(0x63c)]:0x0;},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x351)]=function(){const _0x506c54=_0x17c4f7,_0x24f14f=this[_0x506c54(0x412)]['slice'](0x0)[_0x506c54(0x2e7)]();for(const _0x34e0fd of _0x24f14f){if(_0x34e0fd)return _0x34e0fd;}return null;},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x2f8)]=function(){const _0x56b120=_0x17c4f7,_0x3c9f82=this[_0x56b120(0x351)]();return _0x3c9f82?_0x3c9f82[_0x56b120(0x63c)]:0x0;},Game_Map[_0x17c4f7(0x4ae)]['despawnAtXY']=function(_0x1aac6c,_0xa4596f){const _0x217f3b=_0x17c4f7,_0x21323d=this[_0x217f3b(0x2f5)](_0x1aac6c,_0xa4596f);for(const _0xee8657 of _0x21323d){if(!_0xee8657)continue;if(_0xee8657[_0x217f3b(0x3c8)]())this[_0x217f3b(0x2e6)](_0xee8657[_0x217f3b(0x63c)]);}},Game_Map['prototype']['despawnRegions']=function(_0x25454c){const _0x29826b=_0x17c4f7;for(const _0x589bb7 of this[_0x29826b(0x412)]){if(!_0x589bb7)continue;_0x25454c['includes'](_0x589bb7['regionId']())&&this[_0x29826b(0x2e6)](_0x589bb7[_0x29826b(0x63c)]);}},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1df)]=function(_0x32d8d7){const _0x24422e=_0x17c4f7;for(const _0x2c772a of this[_0x24422e(0x412)]){if(!_0x2c772a)continue;_0x32d8d7['includes'](_0x2c772a['terrainTag']())&&this[_0x24422e(0x2e6)](_0x2c772a[_0x24422e(0x63c)]);}},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3fb)]=function(){const _0x8fd32f=_0x17c4f7;for(const _0x4a569f of this[_0x8fd32f(0x412)]){if(!_0x4a569f)continue;this[_0x8fd32f(0x2e6)](_0x4a569f[_0x8fd32f(0x63c)]);}},VisuMZ['EventsMoveCore'][_0x17c4f7(0x46a)]=Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x529)],Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x529)]=function(_0x383b5b){const _0x170db9=_0x17c4f7;VisuMZ[_0x170db9(0x4f2)]['Game_Map_unlockEvent'][_0x170db9(0x494)](this,_0x383b5b);if(_0x383b5b>=0x3e8){const _0x57a1f3=this[_0x170db9(0x4a4)](_0x383b5b);if(_0x57a1f3)_0x57a1f3[_0x170db9(0x663)]();}},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x39d)]=function(){const _0x186b9f=_0x17c4f7;this[_0x186b9f(0x5f4)]=![],this[_0x186b9f(0x528)]=![];if(!$dataMap)return;const _0xfe8702=$dataMap[_0x186b9f(0x24e)]||'';if(_0xfe8702[_0x186b9f(0x49f)](/<HIDE PLAYER>/i))this[_0x186b9f(0x5f4)]=![],this[_0x186b9f(0x528)]=!![];else _0xfe8702[_0x186b9f(0x49f)](/<SHOW PLAYER>/i)&&(this[_0x186b9f(0x5f4)]=!![],this[_0x186b9f(0x528)]=![]);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f5)]=function(){const _0x3aa943=_0x17c4f7;return this['_forceShowPlayer']===undefined&&this[_0x3aa943(0x39d)](),this[_0x3aa943(0x5f4)];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x275)]=function(){const _0x51a7a7=_0x17c4f7;return this[_0x51a7a7(0x528)]===undefined&&this[_0x51a7a7(0x39d)](),this[_0x51a7a7(0x528)];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3f4)]=Game_CharacterBase['prototype']['isTransparent'],Game_CharacterBase[_0x17c4f7(0x4ae)]['isTransparent']=function(){const _0x1c3044=_0x17c4f7;if(this===$gamePlayer){if($gameMap['isPlayerForceShown']())return![];if($gameMap[_0x1c3044(0x275)]())return!![];}return VisuMZ['EventsMoveCore'][_0x1c3044(0x3f4)][_0x1c3044(0x494)](this);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x65b)]=function(){const _0x5b5349=_0x17c4f7;this[_0x5b5349(0x31a)]=![],this[_0x5b5349(0x38d)]=![];if(!$dataMap)return;const _0x3ad8b8=$dataMap['note']||'';if(_0x3ad8b8['match'](/<HIDE FOLLOWERS>/i))this[_0x5b5349(0x31a)]=![],this['_forceHideFollower']=!![];else _0x3ad8b8[_0x5b5349(0x49f)](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x5b5349(0x38d)]=![]);},Game_Map['prototype']['areFollowersForceShown']=function(){return this['_forceShowFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this['_forceShowFollower'];},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x252)]=function(){const _0x1d164e=_0x17c4f7;return this['_forceHideFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x1d164e(0x38d)];},VisuMZ['EventsMoveCore'][_0x17c4f7(0x2d8)]=Game_Followers[_0x17c4f7(0x4ae)][_0x17c4f7(0x30a)],Game_Followers[_0x17c4f7(0x4ae)][_0x17c4f7(0x30a)]=function(){const _0x285ec7=_0x17c4f7;if($gameMap[_0x285ec7(0x21a)]())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ['EventsMoveCore'][_0x285ec7(0x2d8)][_0x285ec7(0x494)](this);},Game_Map['prototype'][_0x17c4f7(0x34a)]=function(){const _0x25bcfd=_0x17c4f7,_0x413147=this[_0x25bcfd(0x5f9)](),_0x2cac6a=[];$gameParty[_0x25bcfd(0x480)]=!![];for(const _0xbb502c of _0x413147){if(!_0xbb502c)continue;if(_0xbb502c['_erased'])continue;_0xbb502c['processEraseEncounterSpawn']()&&_0x2cac6a['push'](_0xbb502c);}$gameParty[_0x25bcfd(0x480)]=undefined;for(const _0x2e36ac of _0x2cac6a){if(!_0x2e36ac)continue;if(_0x2e36ac[_0x25bcfd(0x54e)])continue;this[_0x25bcfd(0x5a8)](_0x2e36ac[_0x25bcfd(0x415)]());}},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x3c1)]=function(){const _0x263606=_0x17c4f7,_0x2ef2e9=this[_0x263606(0x4a4)]()[_0x263606(0x24e)]||'';if(_0x2ef2e9[_0x263606(0x49f)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty[_0x263606(0x450)]())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x2ef2e9[_0x263606(0x49f)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty['hasEncounterNone']())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0x17c4f7(0x4f2)]['Scene_Map_onMapLoadedEncErase']=Scene_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x248)],Scene_Map['prototype'][_0x17c4f7(0x248)]=function(){const _0x2a97f4=_0x17c4f7;VisuMZ[_0x2a97f4(0x4f2)][_0x2a97f4(0x255)][_0x2a97f4(0x494)](this),$gameMap[_0x2a97f4(0x34a)]();},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x25e)]=function(){const _0xa1d4be=_0x17c4f7;if(!$dataMap)return;if(!$dataMap['note'])return;const _0x5efa97=$dataMap[_0xa1d4be(0x24e)];if(_0x5efa97[_0xa1d4be(0x49f)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x1366ae=String(RegExp['$1'])[_0xa1d4be(0x1f0)](',')[_0xa1d4be(0x1c2)](_0x1a07fc=>Number(_0x1a07fc));for(const _0x5f0e89 of _0x1366ae){$gameTemp[_0xa1d4be(0x22c)](_0x5f0e89);}}},Game_CommonEvent[_0x17c4f7(0x4ae)][_0x17c4f7(0x207)]=function(){const _0x597a0c=_0x17c4f7,_0xbbbbe3=this['event']();return this[_0x597a0c(0x28c)]()&&_0xbbbbe3[_0x597a0c(0x2c3)]>=0x1&&DataManager[_0x597a0c(0x41e)](_0xbbbbe3[_0x597a0c(0x458)]);},Game_CommonEvent['prototype'][_0x17c4f7(0x3a1)]=function(){const _0x50afab=_0x17c4f7;return VisuMZ[_0x50afab(0x4f2)][_0x50afab(0x21b)][_0x50afab(0x342)][_0x50afab(0x233)](this[_0x50afab(0x36b)]);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x1ca)]=Game_CommonEvent[_0x17c4f7(0x4ae)][_0x17c4f7(0x28c)],Game_CommonEvent[_0x17c4f7(0x4ae)]['isActive']=function(){const _0x5094a4=_0x17c4f7;if(VisuMZ['EventsMoveCore'][_0x5094a4(0x1ca)][_0x5094a4(0x494)](this))return!![];else{const _0x72f9e1=this[_0x5094a4(0x4a4)]();return VisuMZ[_0x5094a4(0x4f2)][_0x5094a4(0x21b)][_0x5094a4(0x590)](this[_0x5094a4(0x4a4)]()[_0x5094a4(0x2af)],this[_0x5094a4(0x36b)],_0x72f9e1);}},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x666)]=Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x407)],Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x407)]=function(){const _0x1f2f83=_0x17c4f7,_0x4297b6=VisuMZ['EventsMoveCore'][_0x1f2f83(0x666)][_0x1f2f83(0x494)](this),_0x2a719b=VisuMZ[_0x1f2f83(0x4f2)][_0x1f2f83(0x21b)][_0x1f2f83(0x342)][_0x1f2f83(0x1c2)](_0x373439=>$dataCommonEvents[_0x373439]);return _0x4297b6['concat'](_0x2a719b)[_0x1f2f83(0x45f)]((_0x16711d,_0x56a2dc,_0xb84b8b)=>_0xb84b8b[_0x1f2f83(0x282)](_0x16711d)===_0x56a2dc);},Game_CharacterBase[_0x17c4f7(0x4c9)]=VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2fe)][_0x17c4f7(0x290)][_0x17c4f7(0x634)]??![],VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x66e)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x66e)]=function(){const _0x56f388=_0x17c4f7;VisuMZ[_0x56f388(0x4f2)][_0x56f388(0x364)][_0x56f388(0x494)](this),this[_0x56f388(0x669)]();},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x669)]=function(){const _0x5b495f=_0x17c4f7;this[_0x5b495f(0x360)]=0x1,this[_0x5b495f(0x576)]=0x1,this[_0x5b495f(0x4d0)]=![],this[_0x5b495f(0x608)](),this['clearDashing'](),this['clearSpriteOffsets'](),this[_0x5b495f(0x62f)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x5fb)]=Game_CharacterBase[_0x17c4f7(0x4ae)]['opacity'],Game_CharacterBase['prototype']['opacity']=function(){const _0x3bbd67=_0x17c4f7;let _0x2c3188=VisuMZ[_0x3bbd67(0x4f2)]['Game_CharacterBase_opacity']['call'](this);return _0x2c3188=this[_0x3bbd67(0x4d4)](_0x2c3188),_0x2c3188;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x4d4)]=function(_0x5d7465){return _0x5d7465;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x29c)]=function(){const _0x2ce57c=_0x17c4f7;if(this['constructor']===Game_Player&&this[_0x2ce57c(0x618)]())return this[_0x2ce57c(0x4ba)]()[_0x2ce57c(0x230)]()[_0x2ce57c(0x49f)](/\[VS8\]/i);else return Imported[_0x2ce57c(0x3bb)]&&this[_0x2ce57c(0x204)]()?!![]:this[_0x2ce57c(0x230)]()[_0x2ce57c(0x49f)](/\[VS8\]/i);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x1b6)]=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x40c)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x40c)]=function(){const _0x1b81af=_0x17c4f7;if(!$dataMap)return this[_0x1b81af(0x28e)]||0x2;if(this['isOnLadder']()&&!this[_0x1b81af(0x209)]()&&this[_0x1b81af(0x29c)]())return this[_0x1b81af(0x417)]();else{if(this['isOnLadder']()&&!this['isJumping']())return 0x8;else return this[_0x1b81af(0x316)]()&&this[_0x1b81af(0x29c)]()?this['getPosingCharacterDirection']():VisuMZ[_0x1b81af(0x4f2)][_0x1b81af(0x1b6)][_0x1b81af(0x494)](this);}},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x1c0)]=Game_CharacterBase['prototype']['setDirection'],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x346)]=function(_0x5e9382){const _0xc8d694=_0x17c4f7;if(!this[_0xc8d694(0x29c)]())_0x5e9382=this[_0xc8d694(0x2f0)](_0x5e9382);VisuMZ[_0xc8d694(0x4f2)][_0xc8d694(0x1c0)]['call'](this,_0x5e9382),this[_0xc8d694(0x27a)]();},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x2f0)]=function(_0x55c443){const _0x510ba1=_0x17c4f7;if(_0x55c443===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x55c443===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x55c443===0x7)return this[_0x510ba1(0x56e)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x55c443===0x9)return this[_0x510ba1(0x56e)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x55c443;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x23a)]=function(_0x1cf8ae){const _0x13ad30=_0x17c4f7;return[0x1,0x3,0x5,0x7,0x9][_0x13ad30(0x233)](_0x1cf8ae);},Game_CharacterBase['prototype']['lastMovedDirection']=function(){const _0x22c7c3=_0x17c4f7;return this[_0x22c7c3(0x4b2)]||0x0;},VisuMZ['EventsMoveCore'][_0x17c4f7(0x596)]=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f7)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f7)]=function(_0x4db136){const _0x2d4370=_0x17c4f7;this['_lastMovedDirection']=_0x4db136,VisuMZ['EventsMoveCore'][_0x2d4370(0x596)][_0x2d4370(0x494)](this,_0x4db136);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x222)]=function(_0x196090){const _0xc78092=_0x17c4f7;if(!this['isDiagonalDirection'](_0x196090))return this[_0xc78092(0x1f7)](_0x196090);let _0x2deb0a=0x0,_0x2886e1=0x0;switch(_0x196090){case 0x1:_0x2deb0a=0x4,_0x2886e1=0x2;break;case 0x3:_0x2deb0a=0x6,_0x2886e1=0x2;break;case 0x7:_0x2deb0a=0x4,_0x2886e1=0x8;break;case 0x9:_0x2deb0a=0x6,_0x2886e1=0x8;break;}if(VisuMZ[_0xc78092(0x4f2)]['Settings'][_0xc78092(0x290)]['StrictCollision']){if(!this[_0xc78092(0x56e)](this['_x'],this['_y'],_0x2deb0a))return this[_0xc78092(0x1f7)](_0x2886e1);if(!this[_0xc78092(0x56e)](this['_x'],this['_y'],_0x2886e1))return this['moveStraight'](_0x2deb0a);if(!this[_0xc78092(0x3e5)](this['_x'],this['_y'],_0x2deb0a,_0x2886e1)){let _0x39ab04=VisuMZ['EventsMoveCore']['Settings'][_0xc78092(0x290)][_0xc78092(0x4bc)]?_0x2deb0a:_0x2886e1;return this[_0xc78092(0x1f7)](_0x39ab04);}}this[_0xc78092(0x4b2)]=_0x196090,this[_0xc78092(0x575)](_0x2deb0a,_0x2886e1);},VisuMZ[_0x17c4f7(0x4f2)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x537)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x537)]=function(){const _0x2707b2=_0x17c4f7;let _0x1b21c1=this[_0x2707b2(0x4a7)];return this[_0x2707b2(0x484)]()&&(_0x1b21c1+=this[_0x2707b2(0x35c)]()),this[_0x2707b2(0x382)](_0x1b21c1);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x35c)]=function(){const _0x116457=_0x17c4f7,_0x4437e1=VisuMZ[_0x116457(0x4f2)][_0x116457(0x2fe)][_0x116457(0x290)];return _0x4437e1[_0x116457(0x220)]!==undefined?_0x4437e1['DashModifier']:VisuMZ[_0x116457(0x4f2)]['Game_CharacterBase_realMoveSpeed']['call'](this)-this[_0x116457(0x4a7)];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x382)]=function(_0x161f87){const _0x3da3d5=_0x17c4f7,_0x345895=VisuMZ[_0x3da3d5(0x4f2)][_0x3da3d5(0x2fe)]['Movement'];if(!_0x345895[_0x3da3d5(0x37e)])return _0x161f87;return[0x1,0x3,0x7,0x9]['includes'](this[_0x3da3d5(0x4b2)])&&(_0x161f87*=_0x345895[_0x3da3d5(0x197)]||0.01),_0x161f87;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x5ce)]=Game_CharacterBase[_0x17c4f7(0x4ae)]['isDashing'],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x484)]=function(){const _0x5e32bc=_0x17c4f7;if(!Game_CharacterBase[_0x5e32bc(0x4c9)]&&this[_0x5e32bc(0x4a5)]())return![];if(this[_0x5e32bc(0x66d)])return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_isDashing']['call'](this);},Game_CharacterBase[_0x17c4f7(0x4ae)]['isDashingAndMoving']=function(){const _0x356f27=_0x17c4f7;return this[_0x356f27(0x484)]()&&this['_stopCount']===0x0;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3db)]=Game_CharacterBase['prototype'][_0x17c4f7(0x238)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x238)]=function(){const _0x3665cb=_0x17c4f7;return this[_0x3665cb(0x316)]()?this['getPosingCharacterPattern']():VisuMZ[_0x3665cb(0x4f2)][_0x3665cb(0x3db)][_0x3665cb(0x494)](this);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3ac)]=Game_CharacterBase[_0x17c4f7(0x4ae)]['increaseSteps'],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x23f)]=function(){const _0x267ffb=_0x17c4f7;VisuMZ[_0x267ffb(0x4f2)][_0x267ffb(0x3ac)]['call'](this),this[_0x267ffb(0x608)]();},VisuMZ[_0x17c4f7(0x4f2)]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x603)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x603)]=function(){const _0x1e20ad=_0x17c4f7;if(this['isSpriteVS8dir']())return this[_0x1e20ad(0x303)]();return VisuMZ[_0x1e20ad(0x4f2)]['Game_CharacterBase_characterIndex'][_0x1e20ad(0x494)](this);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x303)]=function(){const _0x58bd94=_0x17c4f7,_0x41d879=this[_0x58bd94(0x40c)]();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x58bd94(0x233)](_0x41d879))return 0x4;if([0x1,0x3,0x7,0x9][_0x58bd94(0x233)](_0x41d879))return 0x5;}else{if(this[_0x58bd94(0x4a5)]())return 0x6;else{if(this[_0x58bd94(0x316)]())return this[_0x58bd94(0x270)]();else{if(this[_0x58bd94(0x491)]){if([0x2,0x4,0x6,0x8]['includes'](_0x41d879))return 0x4;if([0x1,0x3,0x7,0x9][_0x58bd94(0x233)](_0x41d879))return 0x5;}else{if(this[_0x58bd94(0x345)]()&&this[_0x58bd94(0x20f)]()){if([0x2,0x4,0x6,0x8][_0x58bd94(0x233)](_0x41d879))return 0x4;if([0x1,0x3,0x7,0x9][_0x58bd94(0x233)](_0x41d879))return 0x5;}else{if(this[_0x58bd94(0x254)]()){if([0x2,0x4,0x6,0x8][_0x58bd94(0x233)](_0x41d879))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x41d879))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x41d879))return 0x0;if([0x1,0x3,0x7,0x9][_0x58bd94(0x233)](_0x41d879))return 0x1;}}}}}}},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x20f)]=function(){const _0x3530ec=_0x17c4f7;return VisuMZ[_0x3530ec(0x4f2)][_0x3530ec(0x2fe)]['VS8'][_0x3530ec(0x2e0)];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x3b6)]=function(){const _0x50a3c7=_0x17c4f7;return this['isOnLadder']()&&this[_0x50a3c7(0x5e5)]()===VisuMZ['EventsMoveCore'][_0x50a3c7(0x2fe)][_0x50a3c7(0x5ae)][_0x50a3c7(0x5d2)];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x417)]=function(){const _0x47ad29=_0x17c4f7;return this[_0x47ad29(0x3b6)]()?0x4:0x2;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x243)]=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)]=function(){const _0x31f0fb=_0x17c4f7;this[_0x31f0fb(0x362)](),VisuMZ['EventsMoveCore'][_0x31f0fb(0x243)][_0x31f0fb(0x494)](this),this[_0x31f0fb(0x29f)]();},Game_CharacterBase['prototype']['updateScaleBase']=function(){const _0x528a68=_0x17c4f7;this[_0x528a68(0x4d8)]=this[_0x528a68(0x360)]??0x1,this[_0x528a68(0x35b)]=this[_0x528a68(0x576)]??0x1;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x42f)]=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x538)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x538)]=function(){const _0x47fee4=_0x17c4f7;let _0x5693fc=VisuMZ[_0x47fee4(0x4f2)][_0x47fee4(0x42f)][_0x47fee4(0x494)](this);return this['_scaleY']!==undefined&&(_0x5693fc/=Math['max'](this[_0x47fee4(0x35b)],0.00001)),Math[_0x47fee4(0x564)](_0x5693fc);},Game_CharacterBase['prototype'][_0x17c4f7(0x29f)]=function(){const _0xd635d5=_0x17c4f7;this['_poseDuration']=this[_0xd635d5(0x42b)]||0x0;if(this['_poseDuration']>0x0){this[_0xd635d5(0x42b)]--;if(this[_0xd635d5(0x42b)]<=0x0&&this['_pose']!==_0xd635d5(0x1d6))this[_0xd635d5(0x608)]();}},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x48d)]=Game_CharacterBase['prototype']['moveDiagonally'],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x575)]=function(_0x5b1b46,_0x285a1d){const _0x2e4ba7=_0x17c4f7;VisuMZ['EventsMoveCore']['Game_CharacterBase_moveDiagonally'][_0x2e4ba7(0x494)](this,_0x5b1b46,_0x285a1d);if(this['isSpriteVS8dir']())this['setDiagonalDirection'](_0x5b1b46,_0x285a1d);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x5eb)]=function(_0x1168e5,_0x5aa4ce){const _0x2da83e=_0x17c4f7;if(_0x1168e5===0x4&&_0x5aa4ce===0x2)this['setDirection'](0x1);if(_0x1168e5===0x6&&_0x5aa4ce===0x2)this['setDirection'](0x3);if(_0x1168e5===0x4&&_0x5aa4ce===0x8)this['setDirection'](0x7);if(_0x1168e5===0x6&&_0x5aa4ce===0x8)this[_0x2da83e(0x346)](0x9);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3cd)]=Game_CharacterBase['prototype'][_0x17c4f7(0x2eb)],Game_CharacterBase['prototype'][_0x17c4f7(0x2eb)]=function(){const _0x21e30e=_0x17c4f7;if(this[_0x21e30e(0x316)]()&&this['getPose']()==='ZZZ')return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime'][_0x21e30e(0x494)](this);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x34c)]=function(_0x39c113,_0x38ac5f){const _0x358ba6=_0x17c4f7;if(_0x39c113[_0x358ba6(0x49f)](/Z/i))_0x39c113=_0x358ba6(0x1d6);if(_0x39c113['match'](/SLEEP/i))_0x39c113=_0x358ba6(0x1d6);this[_0x358ba6(0x29c)]()&&(this[_0x358ba6(0x5ff)]=_0x39c113['toUpperCase']()[_0x358ba6(0x485)](),this['_poseDuration']=_0x38ac5f||Infinity);},Game_CharacterBase[_0x17c4f7(0x4ae)]['getPose']=function(){const _0x4abf78=_0x17c4f7;return this[_0x4abf78(0x29c)]()?(this['_pose']||'')[_0x4abf78(0x2f4)]()[_0x4abf78(0x485)]():''['toUpperCase']()[_0x4abf78(0x485)]();},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x3e3)]=function(_0x533257,_0x2d96b1){const _0x1d4427=_0x17c4f7;if(this[_0x1d4427(0x29c)]()){const _0xbaaf27=['',_0x1d4427(0x26b),_0x1d4427(0x333),'MUSIC\x20NOTE',_0x1d4427(0x646),_0x1d4427(0x224),'SWEAT',_0x1d4427(0x3d4),_0x1d4427(0x523),_0x1d4427(0x375),_0x1d4427(0x1d6),'','','','',''][_0x533257];this[_0x1d4427(0x34c)](_0xbaaf27,_0x2d96b1);}},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x608)]=function(){const _0x13efda=_0x17c4f7;this['_pose']='',this[_0x13efda(0x42b)]=0x0;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x316)]=function(){const _0x201f22=_0x17c4f7;return this[_0x201f22(0x29c)]()&&!!this['_pose'];},Game_CharacterBase[_0x17c4f7(0x4ae)]['getPosingCharacterIndex']=function(){const _0x5adac5=_0x17c4f7,_0x3ac034=this['_pose']['toUpperCase']();switch(this[_0x5adac5(0x5ff)][_0x5adac5(0x2f4)]()[_0x5adac5(0x485)]()){case _0x5adac5(0x4c6):case'HMPH':case _0x5adac5(0x35e):case _0x5adac5(0x273):case _0x5adac5(0x40a):case _0x5adac5(0x1de):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x17c4f7(0x431)]=function(){const _0xf19550=_0x17c4f7;switch(this[_0xf19550(0x5ff)][_0xf19550(0x2f4)]()){case _0xf19550(0x26b):case'QUESTION':case _0xf19550(0x395):case'!':case'?':return 0x2;break;case _0xf19550(0x646):case _0xf19550(0x224):case _0xf19550(0x427):return 0x4;break;case'ITEM':case'HMPH':case'VICTORY':case _0xf19550(0x3d4):case'SILENCE':case _0xf19550(0x375):return 0x6;break;case'HURT':case'KNEEL':case _0xf19550(0x1de):case _0xf19550(0x1d6):case _0xf19550(0x1bb):return 0x8;break;default:return VisuMZ[_0xf19550(0x4f2)][_0xf19550(0x1c0)][_0xf19550(0x494)](this);break;}},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x3df)]=function(){const _0x3fddc6=_0x17c4f7;switch(this[_0x3fddc6(0x5ff)][_0x3fddc6(0x2f4)]()){case _0x3fddc6(0x4c6):case'HURT':case _0x3fddc6(0x26b):case'!':case _0x3fddc6(0x646):case _0x3fddc6(0x3d4):return 0x0;break;case _0x3fddc6(0x59f):case _0x3fddc6(0x40a):case _0x3fddc6(0x333):case'?':case'ANGER':case _0x3fddc6(0x523):return 0x1;break;case _0x3fddc6(0x35e):case _0x3fddc6(0x1de):case _0x3fddc6(0x395):case _0x3fddc6(0x427):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x3fddc6(0x4f2)][_0x3fddc6(0x3db)][_0x3fddc6(0x494)](this);break;}},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x377)]=function(){const _0x19728c=_0x17c4f7;this[_0x19728c(0x491)]=!![];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x193)]=function(){const _0x56c224=_0x17c4f7;this[_0x56c224(0x491)]=![];},Game_CharacterBase[_0x17c4f7(0x4ae)]['forceDashing']=function(){this['_forceDashing']=!![];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ed)]=function(){this['_forceDashing']=![];},Game_CharacterBase['prototype'][_0x17c4f7(0x62d)]=function(){const _0x5e31aa=_0x17c4f7;if(this[_0x5e31aa(0x59d)]())return![];if(this[_0x5e31aa(0x639)])return![];if(this[_0x5e31aa(0x548)]==='')return![];if(this[_0x5e31aa(0x311)]===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x337)]=function(){const _0x3739c6=_0x17c4f7;if(this[_0x3739c6(0x4a5)]())return!![];if(this[_0x3739c6(0x311)]===Game_Player&&this[_0x3739c6(0x618)]())return!![];return![];},Game_CharacterBase['prototype'][_0x17c4f7(0x28f)]=function(){const _0x1a74a8=_0x17c4f7;return VisuMZ[_0x1a74a8(0x4f2)][_0x1a74a8(0x2fe)][_0x1a74a8(0x290)]['DefaultShadow'];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x57e)]=function(){const _0x203bbb=_0x17c4f7;return this[_0x203bbb(0x530)]();},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x29a)]=function(){const _0x5977d1=_0x17c4f7,_0x14395f=$gameMap['tileHeight']();return Math[_0x5977d1(0x564)](this[_0x5977d1(0x422)]()*_0x14395f+_0x14395f);},Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT']=0x64,Game_CharacterBase['prototype'][_0x17c4f7(0x34d)]=function(_0x531de5,_0x1c54f5){const _0x336a12=_0x17c4f7;if(TouchInput[_0x336a12(0x498)]())return![];if(!$gameMap['isSupportDiagonalMovement']())return![];if($gameMap[_0x336a12(0x37b)](_0x531de5,_0x1c54f5)['length']>0x0)return![];if(!$gameMap[_0x336a12(0x3f9)](_0x531de5,_0x1c54f5))return![];const _0x320728=$gameMap['_events']['length'];if(_0x320728>=Game_CharacterBase[_0x336a12(0x5ab)])return![];return!![];},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x3f2)]=function(_0x1c30c2,_0xa4d05b){const _0x4afe89=_0x17c4f7;let _0x436c66=this[_0x4afe89(0x392)](_0x1c30c2,_0xa4d05b);if(!this[_0x4afe89(0x34d)](_0x1c30c2,_0xa4d05b))return _0x436c66;if(this[_0x4afe89(0x5a5)](_0x1c30c2,_0xa4d05b))return _0x436c66;const _0x2c4f57=_0x436c66;if(_0x436c66===0x2){if(_0x1c30c2>this['x']&&this[_0x4afe89(0x56e)](this['x'],this['y'],0x6))_0x436c66=0x3;if(_0x1c30c2<this['x']&&this[_0x4afe89(0x56e)](this['x'],this['y'],0x4))_0x436c66=0x1;}else{if(_0x436c66===0x4){if(_0xa4d05b>this['y']&&this[_0x4afe89(0x56e)](this['x'],this['y'],0x4))_0x436c66=0x1;if(_0xa4d05b<this['y']&&this[_0x4afe89(0x56e)](this['x'],this['y'],0x6))_0x436c66=0x7;}else{if(_0x436c66===0x6){if(_0xa4d05b>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x436c66=0x3;if(_0xa4d05b<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0x436c66=0x9;}else{if(_0x436c66===0x8){if(_0x1c30c2>this['x']&&this[_0x4afe89(0x56e)](this['x'],this['y'],0x6))_0x436c66=0x9;if(_0x1c30c2<this['x']&&this[_0x4afe89(0x56e)](this['x'],this['y'],0x4))_0x436c66=0x7;}}}}if(!this['canPass'](this['x'],this['y'],_0x436c66))return _0x2c4f57;const _0x525cc5=$gameMap[_0x4afe89(0x54b)](this['x'],_0x436c66),_0x300f0c=$gameMap[_0x4afe89(0x3a5)](this['y'],_0x436c66);if(this[_0x4afe89(0x5a5)](_0x525cc5,_0x300f0c))_0x436c66=_0x2c4f57;return _0x436c66;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x442)]=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x56e)],Game_CharacterBase['prototype'][_0x17c4f7(0x56e)]=function(_0x5890f2,_0x362db9,_0x5b877a){const _0x4468f4=_0x17c4f7;return this['_vehicleType']===_0x4468f4(0x3ff)?this[_0x4468f4(0x4ba)]()[_0x4468f4(0x3c7)](_0x5890f2,_0x362db9,_0x5b877a):VisuMZ[_0x4468f4(0x4f2)][_0x4468f4(0x442)][_0x4468f4(0x494)](this,_0x5890f2,_0x362db9,_0x5b877a);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x554)]=function(){const _0x49922b=_0x17c4f7;this[_0x49922b(0x61c)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x17c4f7(0x4f2)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x530)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x530)]=function(){const _0x3c7126=_0x17c4f7;return VisuMZ['EventsMoveCore'][_0x3c7126(0x606)][_0x3c7126(0x494)](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x1bd)]=Game_CharacterBase['prototype'][_0x17c4f7(0x31d)],Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x31d)]=function(){const _0x538306=_0x17c4f7;return VisuMZ[_0x538306(0x4f2)][_0x538306(0x1bd)][_0x538306(0x494)](this)+(this[_0x538306(0x2a2)]||0x0);},Game_CharacterBase[_0x17c4f7(0x1e1)]=VisuMZ['EventsMoveCore'][_0x17c4f7(0x2fe)]['Movement'][_0x17c4f7(0x3a4)]??-0x6,Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x628)]=function(){const _0x5627dd=_0x17c4f7;let _0x502a20=this['isObjectCharacter']()?0x0:-Game_CharacterBase[_0x5627dd(0x1e1)];return this[_0x5627dd(0x35b)]&&(_0x502a20*=this[_0x5627dd(0x35b)]),Math[_0x5627dd(0x574)](_0x502a20);},Game_CharacterBase['prototype'][_0x17c4f7(0x62f)]=function(){const _0x42a72c=_0x17c4f7;this[_0x42a72c(0x239)]='';},VisuMZ[_0x17c4f7(0x4f2)]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x17c4f7(0x4ae)]['updatePattern'],Game_CharacterBase[_0x17c4f7(0x4ae)]['updatePattern']=function(){const _0x4e5fde=_0x17c4f7;if(this[_0x4e5fde(0x4d0)])return;if(this[_0x4e5fde(0x26f)]())return;VisuMZ['EventsMoveCore']['Game_CharacterBase_updatePattern'][_0x4e5fde(0x494)](this);},Game_CharacterBase[_0x17c4f7(0x4ae)]['updatePatternEventsMoveCore']=function(){const _0x3ea9a1=_0x17c4f7;if(!this['hasStepAnime']()&&this[_0x3ea9a1(0x571)]>0x0)return![];switch(String(this[_0x3ea9a1(0x239)])[_0x3ea9a1(0x2f4)]()[_0x3ea9a1(0x485)]()){case'LEFT\x20TO\x20RIGHT':this['_pattern']+=0x1;if(this[_0x3ea9a1(0x1e9)]>0x2)this['setPattern'](0x0);break;case _0x3ea9a1(0x277):this['_pattern']-=0x1;if(this[_0x3ea9a1(0x1e9)]<0x0)this[_0x3ea9a1(0x2e4)](0x2);break;case _0x3ea9a1(0x61f):case _0x3ea9a1(0x588):this['turnRight90']();break;case _0x3ea9a1(0x613):case _0x3ea9a1(0x5a1):case'SPIN\x20ANTICLOCKWISE':case _0x3ea9a1(0x384):this[_0x3ea9a1(0x550)]();break;default:return![];}return!![];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f2)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x17c4f7(0x4ae)]['hasEventIcon']=function(){const _0x13597c=_0x17c4f7,_0x2b3ec4=this[_0x13597c(0x1f2)]();if(!_0x2b3ec4)return![];return _0x2b3ec4[_0x13597c(0x64d)]>0x0;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x2a6)]=function(){const _0x4373ae=_0x17c4f7,_0x468760=this[_0x4373ae(0x40c)]();return $gameMap[_0x4373ae(0x54b)](this['x'],_0x468760);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x5d3)]=function(){const _0x2e33b4=_0x17c4f7,_0x43a9b6=this[_0x2e33b4(0x40c)]();return $gameMap['roundYWithDirection'](this['y'],_0x43a9b6);},Game_CharacterBase['prototype'][_0x17c4f7(0x1af)]=function(){const _0xa9662b=_0x17c4f7,_0x42faf6=this['reverseDir'](this['direction']());return $gameMap[_0xa9662b(0x54b)](this['x'],_0x42faf6);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x32e)]=function(){const _0x344cf9=_0x17c4f7,_0x1798f1=this[_0x344cf9(0x49c)](this[_0x344cf9(0x40c)]());return $gameMap['roundYWithDirection'](this['y'],_0x1798f1);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x294)]=function(){const _0xa64079=_0x17c4f7,_0x572a7f=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0xa64079(0x40c)]()];return $gameMap['roundXWithDirection'](this['x'],_0x572a7f);},Game_CharacterBase['prototype'][_0x17c4f7(0x527)]=function(){const _0x2f7343=_0x17c4f7,_0x46d304=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x2f7343(0x40c)]()];return $gameMap[_0x2f7343(0x3a5)](this['y'],_0x46d304);},Game_CharacterBase[_0x17c4f7(0x4ae)]['cwX']=function(){const _0x231de0=_0x17c4f7,_0x40e1d5=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x231de0(0x40c)]()];return $gameMap[_0x231de0(0x54b)](this['x'],_0x40e1d5);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x52b)]=function(){const _0x1966b9=_0x17c4f7,_0x1ceba9=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x1966b9(0x40c)]()];return $gameMap[_0x1966b9(0x3a5)](this['y'],_0x1ceba9);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3ba)]=Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x5e7)],Game_Character['prototype'][_0x17c4f7(0x5e7)]=function(_0x5e73ea){const _0x4118fc=_0x17c4f7;route=JsonEx[_0x4118fc(0x5d8)](_0x5e73ea),VisuMZ[_0x4118fc(0x4f2)][_0x4118fc(0x3ba)]['call'](this,route);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3fa)]=Game_Character['prototype']['forceMoveRoute'],Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x5f1)]=function(_0x4637df){const _0x570a49=_0x17c4f7;route=JsonEx[_0x570a49(0x5d8)](_0x4637df),VisuMZ[_0x570a49(0x4f2)]['Game_Character_forceMoveRoute'][_0x570a49(0x494)](this,route);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x200)]=Game_Character['prototype'][_0x17c4f7(0x54f)],Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x54f)]=function(_0x14a607){const _0x1e9154=_0x17c4f7,_0x460e34=Game_Character,_0x233c08=_0x14a607['parameters'];if(_0x14a607[_0x1e9154(0x57c)]===_0x460e34[_0x1e9154(0x623)]){let _0x329951=_0x14a607[_0x1e9154(0x335)][0x0];_0x329951=this[_0x1e9154(0x1ee)](_0x329951),_0x329951=this['convertSelfVariableValuesInScriptCall'](_0x329951),this['processMoveCommandEventsMoveCore'](_0x14a607,_0x329951);}else VisuMZ[_0x1e9154(0x4f2)]['Game_Character_processMoveCommand'][_0x1e9154(0x494)](this,_0x14a607);},Game_Character['prototype'][_0x17c4f7(0x1ee)]=function(_0x237c51){const _0x1270f2=_0x17c4f7,_0xebce26=/\$gameVariables\.value\((\d+)\)/gi,_0x12f034=/\\V\[(\d+)\]/gi;while(_0x237c51[_0x1270f2(0x49f)](_0xebce26)){_0x237c51=_0x237c51[_0x1270f2(0x580)](_0xebce26,(_0x1af908,_0x566c62)=>$gameVariables['value'](parseInt(_0x566c62)));}while(_0x237c51[_0x1270f2(0x49f)](_0x12f034)){_0x237c51=_0x237c51[_0x1270f2(0x580)](_0x12f034,(_0x297f1b,_0x3cb1fe)=>$gameVariables[_0x1270f2(0x1a5)](parseInt(_0x3cb1fe)));}return _0x237c51;},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x47b)]=function(_0x44761c){const _0x20cced=_0x17c4f7,_0x164b5f=/\\SELFVAR\[(\d+)\]/gi;while(_0x44761c[_0x20cced(0x49f)](_0x164b5f)){_0x44761c=_0x44761c['replace'](_0x164b5f,(_0xa30d10,_0x312e6e)=>getSelfVariableValue(this[_0x20cced(0x543)],this[_0x20cced(0x63c)],parseInt(_0x312e6e)));}return _0x44761c;},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1cd)]=function(_0x4aa73f,_0x32337e){const _0x4059fb=_0x17c4f7;if(_0x32337e[_0x4059fb(0x49f)](/ANIMATION:[ ](\d+)/i))return this[_0x4059fb(0x2ec)](Number(RegExp['$1']));if(_0x32337e['match'](/BALLOON:[ ](.*)/i))return this[_0x4059fb(0x52f)](String(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/FADE IN:[ ](\d+)/i))return this[_0x4059fb(0x598)](Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/FADE OUT:[ ](\d+)/i))return this[_0x4059fb(0x443)](Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x4059fb(0x377)]();if(_0x32337e[_0x4059fb(0x49f)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x4059fb(0x193)]();if(_0x32337e[_0x4059fb(0x49f)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x4059fb(0x4be)]();if(_0x32337e[_0x4059fb(0x49f)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x4059fb(0x4ed)]();if(_0x32337e[_0x4059fb(0x49f)](/HUG:[ ]LEFT/i))return this[_0x4059fb(0x58c)](_0x4059fb(0x388));if(_0x32337e[_0x4059fb(0x49f)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall']('right');if(_0x32337e[_0x4059fb(0x49f)](/INDEX:[ ](\d+)/i))return this[_0x4059fb(0x5ee)](Number(RegExp['$1']));if(_0x32337e['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0x3099a=this[_0x4059fb(0x302)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0x3099a);}if(_0x32337e[_0x4059fb(0x49f)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x4059fb(0x19b)](Number(RegExp['$1']));if(_0x32337e['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4059fb(0x1b3)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x32337e[_0x4059fb(0x49f)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x2c0ff5=$gameMap[_0x4059fb(0x4a4)](Number(RegExp['$1']));return this[_0x4059fb(0x489)](_0x2c0ff5);}if(_0x32337e['match'](/JUMP TO PLAYER/i))return this[_0x4059fb(0x489)]($gamePlayer);if(_0x32337e['match'](/JUMP TO HOME/i)&&this[_0x4059fb(0x415)]){const _0x1a5524=this[_0x4059fb(0x452)],_0x4223ad=this['_randomHomeY'];return this[_0x4059fb(0x1b3)](_0x1a5524,_0x4223ad);}if(_0x32337e[_0x4059fb(0x49f)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x55b310=String(RegExp['$1']),_0x55b819=this['checkCollisionKeywords'](_0x32337e);return this[_0x4059fb(0x490)](_0x55b310,_0x55b819);}if(_0x32337e['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x459ab7=Number(RegExp['$1']),_0x5d91c4=Number(RegExp['$2']),_0x76e4bd=this['checkCollisionKeywords'](_0x32337e);return this[_0x4059fb(0x2a8)](_0x459ab7,_0x5d91c4,_0x76e4bd);}if(_0x32337e[_0x4059fb(0x49f)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x58cb03=$gameMap['event'](Number(RegExp['$1'])),_0x185cd9=this[_0x4059fb(0x2a3)](_0x32337e);return this['processMoveRouteMoveToCharacter'](_0x58cb03,_0x185cd9);}if(_0x32337e[_0x4059fb(0x49f)](/MOVE TO PLAYER/i)){const _0x30eab1=this[_0x4059fb(0x2a3)](_0x32337e);return this[_0x4059fb(0x605)]($gamePlayer,_0x30eab1);}if(_0x32337e['match'](/MOVE TO HOME/i)&&this[_0x4059fb(0x415)]){const _0x2884e5=this['_randomHomeX'],_0x456320=this[_0x4059fb(0x4cc)],_0x80fa98=this[_0x4059fb(0x2a3)](_0x32337e);return this[_0x4059fb(0x2a8)](_0x2884e5,_0x456320,_0x80fa98);}if(_0x32337e[_0x4059fb(0x49f)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x1,Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/MOVE DOWN:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x2,Number(RegExp['$1']));if(_0x32337e['match'](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x3,Number(RegExp['$1']));if(_0x32337e['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x4,Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x6,Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x7,Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/MOVE UP:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x8,Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x4059fb(0x55b)](0x9,Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/OPACITY:[ ](\d+)([%％])/i)){const _0x1123d1=Math[_0x4059fb(0x574)](Number(RegExp['$1'])/0x64*0xff);return this[_0x4059fb(0x668)](_0x1123d1['clamp'](0x0,0xff));}if(_0x32337e[_0x4059fb(0x49f)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x40485f=this[_0x4059fb(0x457)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x4059fb(0x668)](_0x40485f[_0x4059fb(0x4b8)](0x0,0xff));}if(_0x32337e[_0x4059fb(0x49f)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x1d079d=this[_0x4059fb(0x457)]+Number(RegExp['$1']);return this['setOpacity'](_0x1d079d[_0x4059fb(0x4b8)](0x0,0xff));}if(_0x32337e['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x4059fb(0x341)](Number(RegExp['$1']));if(_0x32337e[_0x4059fb(0x49f)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x32337e[_0x4059fb(0x49f)](/POSE:[ ](.*)/i)){const _0x582e79=String(RegExp['$1'])[_0x4059fb(0x2f4)]()['trim']();return this['setPose'](_0x582e79);}if(_0x32337e['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x4505fd=Number(RegExp['$1']),_0xfa5d54=Number(RegExp['$2']);return this[_0x4059fb(0x5c6)](_0x4505fd,_0xfa5d54);}if(_0x32337e[_0x4059fb(0x49f)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x3d04b9=$gameMap['event'](Number(RegExp['$1']));return this[_0x4059fb(0x385)](_0x3d04b9);}if(_0x32337e['match'](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToCharacter']($gamePlayer);if(_0x32337e['match'](/STEP TOWARD HOME/i)&&this['eventId']){const _0x58dfdd=this[_0x4059fb(0x452)],_0x1021fd=this['_randomHomeY'];return this[_0x4059fb(0x5c6)](_0x58dfdd,_0x1021fd);}if(_0x32337e[_0x4059fb(0x49f)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4059fb(0x3a8)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x32337e[_0x4059fb(0x49f)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x854b7a=$gameMap['event'](Number(RegExp['$1']));return this[_0x4059fb(0x4ef)](_0x854b7a);}if(_0x32337e['match'](/STEP AWAY FROM PLAYER/i))return this[_0x4059fb(0x4ef)]($gamePlayer);if(_0x32337e[_0x4059fb(0x49f)](/STEP AWAY FROM HOME/i)&&this[_0x4059fb(0x415)]){const _0x230115=this[_0x4059fb(0x452)],_0x5ba501=this[_0x4059fb(0x4cc)];return this['moveAwayFromPoint'](_0x230115,_0x5ba501);}if(_0x32337e['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4059fb(0x5ad)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x32337e[_0x4059fb(0x49f)](/TURN TO EVENT:[ ](\d+)/i)){const _0x10d4e3=$gameMap[_0x4059fb(0x4a4)](Number(RegExp['$1']));return this[_0x4059fb(0x2ef)](_0x10d4e3);}if(_0x32337e[_0x4059fb(0x49f)](/TURN TO PLAYER/i))return this[_0x4059fb(0x2ef)]($gamePlayer);if(_0x32337e[_0x4059fb(0x49f)](/TURN TO HOME/i)&&this[_0x4059fb(0x415)]){const _0x5448f2=this['_randomHomeX'],_0x1633e1=this[_0x4059fb(0x4cc)];return this[_0x4059fb(0x269)](_0x5448f2,_0x1633e1);}if(_0x32337e['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4059fb(0x1d9)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x32337e[_0x4059fb(0x49f)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x1f207f=$gameMap['event'](Number(RegExp['$1']));return this[_0x4059fb(0x4e3)](_0x1f207f);}if(_0x32337e['match'](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x32337e['match'](/TURN AWAY FROM HOME/i)&&this[_0x4059fb(0x415)]){const _0x43711d=this[_0x4059fb(0x452)],_0x12cafb=this[_0x4059fb(0x4cc)];return this[_0x4059fb(0x1d9)](_0x43711d,_0x12cafb);}if(_0x32337e['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x32337e[_0x4059fb(0x49f)](/TURN LOWER RIGHT/i))return this[_0x4059fb(0x346)](0x3);if(_0x32337e[_0x4059fb(0x49f)](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x32337e['match'](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x32337e[_0x4059fb(0x49f)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x4059fb(0x51f)](RegExp['$1'],RegExp['$2']);if(_0x32337e[_0x4059fb(0x49f)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x4059fb(0x509)](RegExp['$1'],RegExp['$2']);if(_0x32337e['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4059fb(0x649)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x32337e[_0x4059fb(0x49f)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x4337f7=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x4337f7);}if(_0x32337e['match'](/TELEPORT TO PLAYER/i))return this['processMoveRouteTeleportToCharacter']($gamePlayer);if(_0x32337e[_0x4059fb(0x49f)](/TELEPORT TO HOME/i)&&this[_0x4059fb(0x415)]){const _0x742233=this['_randomHomeX'],_0x14c26d=this[_0x4059fb(0x4cc)];return this['processMoveRouteTeleportTo'](_0x742233,_0x14c26d);}try{VisuMZ[_0x4059fb(0x4f2)][_0x4059fb(0x200)][_0x4059fb(0x494)](this,_0x4aa73f);}catch(_0x28c54a){if($gameTemp[_0x4059fb(0x601)]())console['log'](_0x28c54a);}},Game_Character['prototype'][_0x17c4f7(0x2ec)]=function(_0x196860){const _0x2f9271=_0x17c4f7;$gameTemp[_0x2f9271(0x500)]([this],_0x196860);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x52f)]=function(_0x3fa497){const _0x66fc43=_0x17c4f7;let _0x24aae4=0x0;switch(_0x3fa497[_0x66fc43(0x2f4)]()[_0x66fc43(0x485)]()){case'!':case _0x66fc43(0x26b):_0x24aae4=0x1;break;case'?':case'QUESTION':_0x24aae4=0x2;break;case _0x66fc43(0x4b9):case _0x66fc43(0x478):case _0x66fc43(0x395):case _0x66fc43(0x4ab):case _0x66fc43(0x2fb):_0x24aae4=0x3;break;case _0x66fc43(0x646):case _0x66fc43(0x379):_0x24aae4=0x4;break;case _0x66fc43(0x224):_0x24aae4=0x5;break;case _0x66fc43(0x427):_0x24aae4=0x6;break;case _0x66fc43(0x3d4):case _0x66fc43(0x1be):case _0x66fc43(0x310):_0x24aae4=0x7;break;case _0x66fc43(0x523):case _0x66fc43(0x50d):_0x24aae4=0x8;break;case _0x66fc43(0x36d):case _0x66fc43(0x56b):case _0x66fc43(0x375):case _0x66fc43(0x5d0):case _0x66fc43(0x2df):_0x24aae4=0x9;break;case'Z':case'ZZ':case _0x66fc43(0x1d6):case _0x66fc43(0x1bb):_0x24aae4=0xa;break;case'USER-DEFINED\x201':_0x24aae4=0xb;break;case _0x66fc43(0x2ce):_0x24aae4=0xc;break;case _0x66fc43(0x3dd):_0x24aae4=0xd;break;case _0x66fc43(0x444):_0x24aae4=0xe;break;case _0x66fc43(0x291):_0x24aae4=0xf;break;}$gameTemp[_0x66fc43(0x568)](this,_0x24aae4);},Game_Character['prototype'][_0x17c4f7(0x598)]=function(_0x17322c){const _0x204d86=_0x17c4f7;_0x17322c+=this[_0x204d86(0x457)],this[_0x204d86(0x668)](_0x17322c[_0x204d86(0x4b8)](0x0,0xff));if(this['_opacity']<0xff)this[_0x204d86(0x1ec)]--;},Game_Character['prototype']['processMoveRouteFadeOut']=function(_0x4e8b8f){const _0x3a9cbe=_0x17c4f7;_0x4e8b8f=this[_0x3a9cbe(0x457)]-_0x4e8b8f,this[_0x3a9cbe(0x668)](_0x4e8b8f['clamp'](0x0,0xff));if(this[_0x3a9cbe(0x457)]>0x0)this[_0x3a9cbe(0x1ec)]--;},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x58c)]=function(_0x2aba99){const _0x522d01=_0x17c4f7,_0x91912e=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x3f2531=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x58975a=this[_0x522d01(0x40c)](),_0x462430=(_0x2aba99===_0x522d01(0x388)?_0x91912e:_0x3f2531)[_0x58975a],_0x3c85ee=(_0x2aba99===_0x522d01(0x388)?_0x3f2531:_0x91912e)[_0x58975a];if(this[_0x522d01(0x56e)](this['x'],this['y'],_0x462430))_0x2aba99==='left'?this[_0x522d01(0x550)]():this['turnRight90']();else!this[_0x522d01(0x56e)](this['x'],this['y'],this[_0x522d01(0x40c)]())&&(this[_0x522d01(0x56e)](this['x'],this['y'],_0x3c85ee)?_0x2aba99===_0x522d01(0x388)?this[_0x522d01(0x399)]():this[_0x522d01(0x550)]():this[_0x522d01(0x25f)]());this[_0x522d01(0x56e)](this['x'],this['y'],this[_0x522d01(0x40c)]())&&this[_0x522d01(0x295)]();},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x5ee)]=function(_0x4e5875){const _0x17555a=_0x17c4f7;if(ImageManager[_0x17555a(0x4eb)](this[_0x17555a(0x548)]))return;_0x4e5875=_0x4e5875[_0x17555a(0x4b8)](0x0,0x7),this['setImage'](this['_characterName'],_0x4e5875);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x19b)]=function(_0x408d87){const _0x38a043=_0x17c4f7;switch(this[_0x38a043(0x40c)]()){case 0x1:this[_0x38a043(0x5b7)](-_0x408d87,_0x408d87);break;case 0x2:this[_0x38a043(0x5b7)](0x0,_0x408d87);break;case 0x3:this[_0x38a043(0x5b7)](_0x408d87,_0x408d87);break;case 0x4:this['jump'](-_0x408d87,0x0);break;case 0x6:this[_0x38a043(0x5b7)](_0x408d87,0x0);break;case 0x7:this[_0x38a043(0x5b7)](-_0x408d87,-_0x408d87);break;case 0x8:this['jump'](0x0,-_0x408d87);break;case 0x9:this[_0x38a043(0x5b7)](_0x408d87,-_0x408d87);break;}},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1b3)]=function(_0x3d3487,_0x28a21d){const _0x68ec6c=_0x17c4f7,_0x9acad=Math[_0x68ec6c(0x574)](_0x3d3487-this['x']),_0x5d656d=Math[_0x68ec6c(0x574)](_0x28a21d-this['y']);this[_0x68ec6c(0x5b7)](_0x9acad,_0x5d656d);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x489)]=function(_0x46b893){const _0x3eab2b=_0x17c4f7;if(_0x46b893)this[_0x3eab2b(0x1b3)](_0x46b893['x'],_0x46b893['y']);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x5c6)]=function(_0x3145c6,_0x47eeb4,_0x2a06a4){const _0x5bc91c=_0x17c4f7;let _0x4a2faf=0x0;if(_0x2a06a4)$gameTemp['_moveAllowPlayerCollision']=!![];$gameMap[_0x5bc91c(0x41d)]()?_0x4a2faf=this[_0x5bc91c(0x3f2)](_0x3145c6,_0x47eeb4):_0x4a2faf=this[_0x5bc91c(0x392)](_0x3145c6,_0x47eeb4);if(_0x2a06a4)$gameTemp[_0x5bc91c(0x459)]=![];this[_0x5bc91c(0x222)](_0x4a2faf),this[_0x5bc91c(0x4cd)](!![]);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x385)]=function(_0xd60c27){const _0x4bc3b7=_0x17c4f7;if(_0xd60c27)this[_0x4bc3b7(0x5c6)](_0xd60c27['x'],_0xd60c27['y']);},Game_Character[_0x17c4f7(0x4ae)]['processMoveRouteStepFrom']=function(_0xc77b1,_0x39bd06){const _0x35261e=_0x17c4f7,_0x163455=this[_0x35261e(0x60a)](_0xc77b1),_0x334235=this['deltaYFrom'](_0x39bd06);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x2a3)]=function(_0x1289bf){const _0x51b0b5=_0x17c4f7;if(_0x1289bf[_0x51b0b5(0x49f)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x1289bf[_0x51b0b5(0x49f)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ['EventsMoveCore'][_0x17c4f7(0x2d0)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x1d5)],Game_Event['prototype'][_0x17c4f7(0x1d5)]=function(_0x55f014,_0x3d36ee){const _0x4b6d7d=_0x17c4f7;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x4b6d7d(0x4f2)]['Game_Event_isCollidedWithPlayerCharacters'][_0x4b6d7d(0x494)](this,_0x55f014,_0x3d36ee);},Game_Character['prototype']['processMoveRouteMoveUntilStop']=function(_0x201c3a,_0x457907){const _0x19c340=_0x17c4f7,_0x3ec5fd=['',_0x19c340(0x19a),_0x19c340(0x241),_0x19c340(0x5aa),_0x19c340(0x308),'',_0x19c340(0x5a7),_0x19c340(0x386),'UP',_0x19c340(0x4b0)],_0x5a394e=_0x3ec5fd['indexOf'](_0x201c3a[_0x19c340(0x2f4)]()['trim']());if(_0x5a394e<=0x0)return;if(_0x457907)$gameTemp['_moveAllowPlayerCollision']=!![];if(this[_0x19c340(0x56e)](this['x'],this['y'],_0x5a394e)){if(_0x457907)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x19c340(0x222)](_0x5a394e),this[_0x19c340(0x1ec)]-=0x1;}if(_0x457907)$gameTemp[_0x19c340(0x459)]=![];},Game_Character['prototype'][_0x17c4f7(0x2a8)]=function(_0x147b7a,_0x549be0,_0x36d61e){const _0x2ee379=_0x17c4f7;this['processMoveRouteStepTo'](_0x147b7a,_0x549be0,_0x36d61e);if(this['x']!==_0x147b7a||this['y']!==_0x549be0)this[_0x2ee379(0x1ec)]--;},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x605)]=function(_0x26126f,_0x4f026a){const _0x959d53=_0x17c4f7;if(_0x26126f&&!_0x26126f['_erased']){this[_0x959d53(0x2a8)](_0x26126f['x'],_0x26126f['y'],_0x4f026a);if(_0x26126f[_0x959d53(0x565)]()&&this[_0x959d53(0x565)]()){const _0x42d196=$gameMap[_0x959d53(0x4a9)](this['x'],this['y'],_0x26126f['x'],_0x26126f['y']);if(_0x42d196<=0x1)this['_moveRouteIndex']++;}}},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x55b)]=function(_0x3e7fe9,_0x3110cf){const _0x16e06a=_0x17c4f7;_0x3110cf=_0x3110cf||0x0;const _0x409cd7={'code':0x1,'indent':null,'parameters':[]};_0x409cd7[_0x16e06a(0x57c)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x3e7fe9],this[_0x16e06a(0x57b)][_0x16e06a(0x206)][this[_0x16e06a(0x1ec)]][_0x16e06a(0x335)][0x0]='';while(_0x3110cf--){this[_0x16e06a(0x57b)][_0x16e06a(0x206)][_0x16e06a(0x621)](this[_0x16e06a(0x1ec)]+0x1,0x0,_0x409cd7);}},Game_Character['prototype'][_0x17c4f7(0x341)]=function(_0xf5c447){const _0x1cd334=_0x17c4f7;this[_0x1cd334(0x4d0)]=!![],this['setPattern'](_0xf5c447);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x51f)]=function(_0x53ecfa,_0x58a496){const _0x50787f=_0x17c4f7;if(this===$gamePlayer)return;const _0x57eb0c=[this[_0x50787f(0x543)],this[_0x50787f(0x63c)],'A'];_0x53ecfa[_0x50787f(0x49f)](/\b[ABCD]\b/i)?_0x57eb0c[0x2]=String(_0x53ecfa)['charAt'](0x0)[_0x50787f(0x2f4)]()['trim']():_0x57eb0c[0x2]=_0x50787f(0x3fe)[_0x50787f(0x63e)](_0x53ecfa);switch(_0x58a496[_0x50787f(0x2f4)]()[_0x50787f(0x485)]()){case'ON':case'TRUE':$gameSelfSwitches[_0x50787f(0x437)](_0x57eb0c,!![]);break;case _0x50787f(0x465):case _0x50787f(0x662):$gameSelfSwitches['setValue'](_0x57eb0c,![]);break;case _0x50787f(0x3de):$gameSelfSwitches[_0x50787f(0x437)](_0x57eb0c,!$gameSelfSwitches[_0x50787f(0x1a5)](_0x57eb0c));break;}},Game_Character['prototype']['processMoveRouteSelfVariable']=function(_0x22572b,_0x267667){const _0x2908a8=_0x17c4f7;if(this===$gamePlayer)return;const _0x1a7144=[this[_0x2908a8(0x543)],this[_0x2908a8(0x63c)],_0x2908a8(0x5d4)[_0x2908a8(0x63e)](_0x22572b)];$gameSelfSwitches[_0x2908a8(0x437)](_0x1a7144,Number(_0x267667));},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x649)]=function(_0x1c234b,_0x2fbf99){const _0x448ce1=_0x17c4f7;this[_0x448ce1(0x2d7)](_0x1c234b,_0x2fbf99);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x246)]=function(_0x30f9eb){const _0x5f5cf6=_0x17c4f7;if(_0x30f9eb)this[_0x5f5cf6(0x649)](_0x30f9eb['x'],_0x30f9eb['y']);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x399)]=function(){const _0xdfe930=_0x17c4f7;switch(this['direction']()){case 0x1:this[_0xdfe930(0x346)](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0xdfe930(0x346)](0x1);break;case 0x4:this[_0xdfe930(0x346)](0x8);break;case 0x6:this[_0xdfe930(0x346)](0x2);break;case 0x7:this[_0xdfe930(0x346)](0x9);break;case 0x8:this[_0xdfe930(0x346)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character['prototype'][_0x17c4f7(0x550)]=function(){const _0x77d8eb=_0x17c4f7;switch(this[_0x77d8eb(0x40c)]()){case 0x1:this[_0x77d8eb(0x346)](0x3);break;case 0x2:this[_0x77d8eb(0x346)](0x6);break;case 0x3:this[_0x77d8eb(0x346)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x77d8eb(0x346)](0x8);break;case 0x7:this[_0x77d8eb(0x346)](0x1);break;case 0x8:this[_0x77d8eb(0x346)](0x4);break;case 0x9:this[_0x77d8eb(0x346)](0x7);break;}},Game_Character[_0x17c4f7(0x4ae)]['getDirectionToPoint']=function(_0x31e0ed,_0x26566d,_0x52120f){const _0x2062a0=_0x17c4f7,_0x21d5c1=this[_0x2062a0(0x60a)](_0x31e0ed),_0x334221=this[_0x2062a0(0x4f4)](_0x26566d);if($gameMap[_0x2062a0(0x41d)]()){if(_0x52120f||this['isSpriteVS8dir']()){if(_0x21d5c1>0x0&&_0x334221<0x0)return 0x1;if(_0x21d5c1<0x0&&_0x334221<0x0)return 0x3;if(_0x21d5c1>0x0&&_0x334221>0x0)return 0x7;if(_0x21d5c1<0x0&&_0x334221>0x0)return 0x9;}}if(Math['abs'](_0x21d5c1)>Math[_0x2062a0(0x555)](_0x334221))return _0x21d5c1>0x0?0x4:0x6;else{if(_0x334221!==0x0)return _0x334221>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x17c4f7(0x4ae)]['getDirectionFromPoint']=function(_0x5efe94,_0xb5e9a4,_0x31989d){const _0x17aeda=_0x17c4f7,_0x343e63=this[_0x17aeda(0x60a)](_0x5efe94),_0x159c98=this[_0x17aeda(0x4f4)](_0xb5e9a4);if($gameMap[_0x17aeda(0x41d)]()){if(_0x31989d||this[_0x17aeda(0x29c)]()){if(_0x343e63>0x0&&_0x159c98<0x0)return 0x9;if(_0x343e63<0x0&&_0x159c98<0x0)return 0x7;if(_0x343e63>0x0&&_0x159c98>0x0)return 0x3;if(_0x343e63<0x0&&_0x159c98>0x0)return 0x1;}}if(Math[_0x17aeda(0x555)](_0x343e63)>Math[_0x17aeda(0x555)](_0x159c98))return _0x343e63>0x0?0x6:0x4;else{if(_0x159c98!==0x0)return _0x159c98>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x17c4f7(0x4ae)]['moveTowardPoint']=function(_0x1cd696,_0x3a13a5){const _0x4583e4=_0x17c4f7,_0x598776=this[_0x4583e4(0x339)](_0x1cd696,_0x3a13a5,!![]);if(_0x598776)this[_0x4583e4(0x222)](_0x598776);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x3a8)]=function(_0x4b567c,_0xbfd82c){const _0x3afcfa=_0x17c4f7,_0x927999=this[_0x3afcfa(0x21e)](_0x4b567c,_0xbfd82c,!![]);if(_0x927999)this[_0x3afcfa(0x222)](_0x927999);},Game_Character['prototype'][_0x17c4f7(0x269)]=function(_0x5e653c,_0x42ead3){const _0x480337=_0x17c4f7,_0x4cbb06=this[_0x480337(0x339)](_0x5e653c,_0x42ead3,![]);if(_0x4cbb06)this[_0x480337(0x346)](_0x4cbb06);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1d9)]=function(_0x54857c,_0x196152){const _0x4fbd8b=_0x17c4f7,_0x55d753=this[_0x4fbd8b(0x21e)](_0x54857c,_0x196152,![]);if(_0x55d753)this[_0x4fbd8b(0x346)](_0x55d753);},Game_Character[_0x17c4f7(0x4ae)]['moveTowardCharacter']=function(_0x55fdf3){const _0x28db25=_0x17c4f7;if(_0x55fdf3)this[_0x28db25(0x5ad)](_0x55fdf3['x'],_0x55fdf3['y']);},Game_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ef)]=function(_0x5e8c80){if(_0x5e8c80)this['moveAwayFromPoint'](_0x5e8c80['x'],_0x5e8c80['y']);},Game_Character['prototype'][_0x17c4f7(0x2ef)]=function(_0x38cc68){const _0x45794c=_0x17c4f7;if(_0x38cc68)this[_0x45794c(0x269)](_0x38cc68['x'],_0x38cc68['y']);},Game_Character[_0x17c4f7(0x4ae)]['turnAwayFromCharacter']=function(_0x9698ad){const _0x2283fa=_0x17c4f7;if(_0x9698ad)this[_0x2283fa(0x1d9)](_0x9698ad['x'],_0x9698ad['y']);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x4db)]=Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x484)],Game_Player[_0x17c4f7(0x4ae)]['isDashing']=function(){const _0x17ee4c=_0x17c4f7;if(!Game_CharacterBase[_0x17ee4c(0x4c9)]&&this['isOnLadder']())return![];if(this[_0x17ee4c(0x66d)])return!![];return VisuMZ[_0x17ee4c(0x4f2)][_0x17ee4c(0x4db)][_0x17ee4c(0x494)](this);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x638)]=Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x416)],Game_Player['prototype']['getInputDirection']=function(){const _0x35670d=_0x17c4f7;return $gameMap[_0x35670d(0x41d)]()?this[_0x35670d(0x4c2)]():VisuMZ[_0x35670d(0x4f2)][_0x35670d(0x638)][_0x35670d(0x494)](this);},Game_Player[_0x17c4f7(0x4ae)]['getInputDir8']=function(){return Input['dir8'];},Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x226)]=function(){const _0x38f7b0=_0x17c4f7;if($gameSystem[_0x38f7b0(0x1ce)]())return 0x0;if(!this['isMoving']()&&this[_0x38f7b0(0x4e6)]()){let _0x3b874a=this['getInputDirection']();if(_0x3b874a>0x0)$gameTemp[_0x38f7b0(0x1c1)]();else{if($gameTemp['isDestinationValid']()){const _0x141a1d=$gameTemp[_0x38f7b0(0x464)](),_0x24dacb=$gameTemp[_0x38f7b0(0x597)]();this[_0x38f7b0(0x34d)](_0x141a1d,_0x24dacb)?_0x3b874a=this['findDiagonalDirectionTo'](_0x141a1d,_0x24dacb):_0x3b874a=this[_0x38f7b0(0x392)](_0x141a1d,_0x24dacb);}}_0x3b874a>0x0?(this[_0x38f7b0(0x19e)]=this[_0x38f7b0(0x19e)]||0x0,this[_0x38f7b0(0x1c7)]()?this[_0x38f7b0(0x346)](_0x3b874a):this[_0x38f7b0(0x552)](_0x3b874a),this[_0x38f7b0(0x19e)]++):this['_inputTime']=0x0;}},Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x1c7)]=function(){const _0x2daf9f=_0x17c4f7,_0x32d358=VisuMZ[_0x2daf9f(0x4f2)][_0x2daf9f(0x2fe)][_0x2daf9f(0x290)];if(!_0x32d358['EnableTurnInPlace'])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x2daf9f(0x484)]()||this[_0x2daf9f(0x38c)]()||this[_0x2daf9f(0x4a5)]())return![];return this[_0x2daf9f(0x19e)]<_0x32d358['TurnInPlaceDelay'];},VisuMZ[_0x17c4f7(0x4f2)]['Game_Player_executeMove']=Game_Player[_0x17c4f7(0x4ae)]['executeMove'],Game_Player['prototype']['executeMove']=function(_0x1c0cff){const _0x508343=_0x17c4f7;$gameMap[_0x508343(0x41d)]()?this[_0x508343(0x222)](_0x1c0cff):VisuMZ[_0x508343(0x4f2)][_0x508343(0x2b9)][_0x508343(0x494)](this,_0x1c0cff);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x401)]=Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x48a)],Game_Player['prototype'][_0x17c4f7(0x48a)]=function(_0x27f752,_0x272742,_0x4a923d){const _0x1d8e81=_0x17c4f7;if($gameMap['isRegionAllowPass'](_0x27f752,_0x272742,_0x4a923d,_0x1d8e81(0x1fb)))return this[_0x1d8e81(0x618)]()&&this[_0x1d8e81(0x4ba)]()?this['vehicle']()[_0x1d8e81(0x48a)](_0x27f752,_0x272742,_0x4a923d):!![];if($gameMap[_0x1d8e81(0x1a3)](_0x27f752,_0x272742,_0x4a923d,_0x1d8e81(0x1fb)))return![];return VisuMZ[_0x1d8e81(0x4f2)]['Game_Player_isMapPassable']['call'](this,_0x27f752,_0x272742,_0x4a923d);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x33b)]=Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x324)],Game_Player['prototype'][_0x17c4f7(0x324)]=function(_0x433eea){const _0x6cf3e5=_0x17c4f7;VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']['call'](this,_0x433eea);if(this[_0x6cf3e5(0x483)]()){this[_0x6cf3e5(0x3dc)](_0x433eea);if(_0x433eea[_0x6cf3e5(0x233)](0x0)&&this[_0x6cf3e5(0x591)]()===_0x6cf3e5(0x3a9))this[_0x6cf3e5(0x55a)](this['x'],this['y']);else(_0x433eea['includes'](0x1)||_0x433eea[_0x6cf3e5(0x233)](0x2))&&this[_0x6cf3e5(0x5bf)]();}},VisuMZ['EventsMoveCore'][_0x17c4f7(0x1db)]=Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x370)],Game_Player[_0x17c4f7(0x4ae)]['checkEventTriggerThere']=function(_0x49ec13){const _0x42ac5e=_0x17c4f7;VisuMZ[_0x42ac5e(0x4f2)]['Game_Player_checkEventTriggerThere']['call'](this,_0x49ec13);if(this['canStartLocalEvents']()&&_0x49ec13[_0x42ac5e(0x233)](0x0)&&this[_0x42ac5e(0x591)]()===_0x42ac5e(0x365)){const _0x5e1ec9=this['direction'](),_0x47d00d=$gameMap[_0x42ac5e(0x54b)](this['x'],_0x5e1ec9),_0x5f2014=$gameMap['roundYWithDirection'](this['y'],_0x5e1ec9);this[_0x42ac5e(0x55a)](_0x47d00d,_0x5f2014);}},Game_Player['prototype']['checkEventTriggerEventsMoveCore']=function(_0x32cd4b){const _0x5cf99c=_0x17c4f7;if($gameMap[_0x5cf99c(0x19c)]())return;if($gameMap[_0x5cf99c(0x60d)]())return;const _0x2ecde9=$gameMap[_0x5cf99c(0x5f9)]();for(const _0x5b518b of _0x2ecde9){if(!_0x5b518b)continue;if(!_0x5b518b[_0x5cf99c(0x624)](_0x32cd4b))continue;if(this[_0x5cf99c(0x5ef)](_0x5b518b))return _0x5b518b[_0x5cf99c(0x46c)]();if(this['meetActivationProximityConditions'](_0x5b518b))return _0x5b518b[_0x5cf99c(0x46c)]();}},Game_Player['prototype'][_0x17c4f7(0x5ef)]=function(_0x3389b3){const _0x191b2b=_0x17c4f7;if($gameMap[_0x191b2b(0x19c)]())return![];if($gameMap[_0x191b2b(0x60d)]())return![];return _0x3389b3[_0x191b2b(0x237)]()['includes'](this['regionId']());},Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x3d5)]=function(_0xce52e4){const _0x5cb6f4=_0x17c4f7;if($gameMap[_0x5cb6f4(0x19c)]())return![];if($gameMap[_0x5cb6f4(0x60d)]())return![];if([_0x5cb6f4(0x1fe),_0x5cb6f4(0x39c)][_0x5cb6f4(0x233)](_0xce52e4['activationProximityType']()))return![];const _0x36f60f=_0xce52e4[_0x5cb6f4(0x383)](),_0x4cef46=_0xce52e4['activationProximityDistance']();return this[_0x5cb6f4(0x3eb)](_0xce52e4,_0x36f60f,_0x4cef46);},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3eb)]=function(_0x328879,_0xd7e393,_0x3a4290,_0x4ec5a3,_0x212a4f){const _0x590e1a=_0x17c4f7;switch(_0x4ec5a3){case _0x590e1a(0x42c):return _0x212a4f>=Math['abs'](_0x3a4290[_0x590e1a(0x60a)](_0x328879))&&_0x212a4f>=Math[_0x590e1a(0x555)](_0x3a4290[_0x590e1a(0x4f4)](_0xd7e393));break;case _0x590e1a(0x23c):const _0x445189=Math[_0x590e1a(0x632)](_0x3a4290['x']-_0x328879,0x2),_0x3929f7=Math['pow'](_0x3a4290['y']-_0xd7e393,0x2);return _0x212a4f>=Math[_0x590e1a(0x574)](Math['sqrt'](_0x445189+_0x3929f7));break;case _0x590e1a(0x3d0):case _0x590e1a(0x267):const _0x21dc98=$gameMap['distance'](_0x328879,_0xd7e393,_0x3a4290['x'],_0x3a4290['y']);return _0x3a4290[_0x590e1a(0x4da)]()>=_0x21dc98;break;case _0x590e1a(0x47a):return _0x212a4f>=Math[_0x590e1a(0x555)](_0x3a4290['deltaYFrom'](_0xd7e393));break;case'column':return _0x212a4f>=Math[_0x590e1a(0x555)](_0x3a4290[_0x590e1a(0x60a)](_0x328879));break;}return![];},Game_Player[_0x17c4f7(0x4ae)]['checkEventProximity']=function(_0x3d3a4a,_0x479647,_0x473bb3){const _0x5533b3=_0x17c4f7,_0x4f3fab=this['x'],_0x2ba3a2=this['y'];return $gameMap[_0x5533b3(0x3eb)](_0x4f3fab,_0x2ba3a2,_0x3d3a4a,_0x479647,_0x473bb3);},Game_Player['prototype']['startMapCommonEventOnOK']=function(_0x2ee97a,_0x2d738c){const _0x326555=_0x17c4f7;if($gameMap['isEventRunning']())return;if($gameMap[_0x326555(0x60d)]())return;let _0x2eaa1d=VisuMZ['EventsMoveCore']['Settings'][_0x326555(0x285)],_0x21d0c9=$gameMap[_0x326555(0x359)](_0x2ee97a,_0x2d738c);const _0x5924b1=_0x326555(0x378)[_0x326555(0x63e)](_0x21d0c9);_0x2eaa1d[_0x5924b1]&&$gameTemp['reserveCommonEvent'](_0x2eaa1d[_0x5924b1]);},Game_Player['prototype'][_0x17c4f7(0x591)]=function(){const _0x421fd6=_0x17c4f7;return VisuMZ[_0x421fd6(0x4f2)][_0x421fd6(0x2fe)][_0x421fd6(0x419)];},Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x5bf)]=function(){const _0x2577f9=_0x17c4f7;if($gameMap[_0x2577f9(0x19c)]())return;if($gameMap[_0x2577f9(0x60d)]())return;let _0x2b1979=VisuMZ[_0x2577f9(0x4f2)][_0x2577f9(0x2fe)][_0x2577f9(0x406)];const _0x1ee51b=_0x2577f9(0x378)['format'](this[_0x2577f9(0x359)]());_0x2b1979[_0x1ee51b]&&$gameTemp[_0x2577f9(0x22c)](_0x2b1979[_0x1ee51b]);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x306)]=Game_Player[_0x17c4f7(0x4ae)]['increaseSteps'],Game_Player['prototype'][_0x17c4f7(0x23f)]=function(){const _0x457a69=_0x17c4f7;VisuMZ[_0x457a69(0x4f2)][_0x457a69(0x306)][_0x457a69(0x494)](this),VisuMZ[_0x457a69(0x2cc)](0x0);},Game_Player[_0x17c4f7(0x4ae)][_0x17c4f7(0x27a)]=function(){const _0x5306d2=_0x17c4f7;VisuMZ[_0x5306d2(0x549)](0x0);},VisuMZ['EventsMoveCore'][_0x17c4f7(0x4d9)]=Game_Follower['prototype'][_0x17c4f7(0x65f)],Game_Follower[_0x17c4f7(0x4ae)][_0x17c4f7(0x65f)]=function(_0x4c0c24){const _0x12fed2=_0x17c4f7;VisuMZ[_0x12fed2(0x4f2)][_0x12fed2(0x4d9)][_0x12fed2(0x494)](this,_0x4c0c24),this[_0x12fed2(0x3a3)]=![];},Game_Follower['prototype'][_0x17c4f7(0x484)]=function(){const _0xf1ab0e=_0x17c4f7;if(this[_0xf1ab0e(0x3a3)])return Game_Character[_0xf1ab0e(0x4ae)]['isDashing'][_0xf1ab0e(0x494)](this);return $gamePlayer[_0xf1ab0e(0x484)]();},Game_Follower['prototype'][_0x17c4f7(0x254)]=function(){const _0x3a74de=_0x17c4f7;if(this[_0x3a74de(0x3a3)])return Game_Character[_0x3a74de(0x4ae)][_0x3a74de(0x254)][_0x3a74de(0x494)](this);return $gamePlayer[_0x3a74de(0x254)]()&&this[_0x3a74de(0x536)];},Game_Follower[_0x17c4f7(0x4ae)]['realMoveSpeed']=function(){const _0x6cdaaf=_0x17c4f7;return $gamePlayer[_0x6cdaaf(0x537)]();},Game_Follower['prototype']['updateStop']=function(){const _0xa2e18b=_0x17c4f7;Game_Character['prototype'][_0xa2e18b(0x19d)][_0xa2e18b(0x494)](this),this[_0xa2e18b(0x571)]>0x0&&(this[_0xa2e18b(0x536)]=![]);},Game_Follower[_0x17c4f7(0x4ae)][_0x17c4f7(0x367)]=function(_0xa3f046){this['_chaseOff']=_0xa3f046;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x279)]=Game_Follower[_0x17c4f7(0x4ae)][_0x17c4f7(0x654)],Game_Follower['prototype'][_0x17c4f7(0x654)]=function(_0x5c3996){const _0x2bd183=_0x17c4f7;if(this[_0x2bd183(0x3a3)])return;if($gameSystem[_0x2bd183(0x281)]())return;VisuMZ['EventsMoveCore'][_0x2bd183(0x279)][_0x2bd183(0x494)](this,_0x5c3996),this[_0x2bd183(0x536)]=!![];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x577)]=Game_Vehicle[_0x17c4f7(0x4ae)][_0x17c4f7(0x48a)],Game_Vehicle['prototype']['isMapPassable']=function(_0x1b11c9,_0x1646d0,_0x4e6f81){const _0x4c6d9a=_0x17c4f7;if($gameMap[_0x4c6d9a(0x2a5)](_0x1b11c9,_0x1646d0,_0x4e6f81,this['_type']))return!![];if($gameMap['isRegionForbidPass'](_0x1b11c9,_0x1646d0,_0x4e6f81,this[_0x4c6d9a(0x462)]))return![];return VisuMZ[_0x4c6d9a(0x4f2)][_0x4c6d9a(0x577)][_0x4c6d9a(0x494)](this,_0x1b11c9,_0x1646d0,_0x4e6f81);},Game_Vehicle['prototype'][_0x17c4f7(0x3c7)]=function(_0x13f893,_0x14d3a6,_0x469396){const _0x37d28a=_0x17c4f7;if($gameMap['isRegionAllowPass'](_0x13f893,_0x14d3a6,_0x469396,this[_0x37d28a(0x462)]))return!![];if($gameMap[_0x37d28a(0x1a3)](_0x13f893,_0x14d3a6,_0x469396,this[_0x37d28a(0x462)]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass']['call']($gamePlayer,_0x13f893,_0x14d3a6,_0x469396);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x390)]=Game_Vehicle[_0x17c4f7(0x4ae)]['isLandOk'],Game_Vehicle['prototype'][_0x17c4f7(0x31f)]=function(_0x4b8880,_0x5521a3,_0x1774b6){const _0x32d480=_0x17c4f7;if($gameMap[_0x32d480(0x446)](_0x4b8880,_0x5521a3,_0x1774b6,this[_0x32d480(0x462)]))return!![];const _0x49f502=this['_type'][_0x32d480(0x278)](0x0)[_0x32d480(0x2f4)]()+this[_0x32d480(0x462)][_0x32d480(0x2bb)](0x1),_0x54ffa8=_0x32d480(0x3b5)[_0x32d480(0x63e)](_0x49f502);return VisuMZ[_0x32d480(0x4f2)][_0x32d480(0x2fe)]['Region'][_0x54ffa8]?![]:VisuMZ[_0x32d480(0x4f2)][_0x32d480(0x390)][_0x32d480(0x494)](this,_0x4b8880,_0x5521a3,_0x1774b6);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x5f0)]=Game_Vehicle['prototype'][_0x17c4f7(0x592)],Game_Vehicle['prototype']['initMoveSpeed']=function(){const _0x29ffc4=_0x17c4f7;VisuMZ[_0x29ffc4(0x4f2)][_0x29ffc4(0x5f0)][_0x29ffc4(0x494)](this);const _0x4b69a4=VisuMZ[_0x29ffc4(0x4f2)][_0x29ffc4(0x2fe)][_0x29ffc4(0x290)];if(this[_0x29ffc4(0x199)]()){if(_0x4b69a4[_0x29ffc4(0x33c)])this[_0x29ffc4(0x65e)](_0x4b69a4['BoatSpeed']);}else{if(this[_0x29ffc4(0x35a)]()){if(_0x4b69a4[_0x29ffc4(0x546)])this['setMoveSpeed'](_0x4b69a4['ShipSpeed']);}else{if(this[_0x29ffc4(0x1dc)]()){if(_0x4b69a4[_0x29ffc4(0x2f7)])this[_0x29ffc4(0x65e)](_0x4b69a4[_0x29ffc4(0x2f7)]);}}}},VisuMZ[_0x17c4f7(0x4f2)]['Game_Event_initialize']=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x65f)],Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x65f)]=function(_0x51e3a5,_0x11307f){const _0x36cb8e=_0x17c4f7;this[_0x36cb8e(0x50b)]=!![],VisuMZ[_0x36cb8e(0x4f2)][_0x36cb8e(0x312)][_0x36cb8e(0x494)](this,_0x51e3a5,_0x11307f),this[_0x36cb8e(0x50b)]=undefined,this[_0x36cb8e(0x242)](),this[_0x36cb8e(0x3e1)](),this[_0x36cb8e(0x469)]();},Game_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3d6)]=function(_0xf06282,_0x1ef3b8){const _0x3e6bc4=_0x17c4f7;return _0xf06282===$gameMap[_0x3e6bc4(0x567)]()?$dataMap[_0x3e6bc4(0x5f9)][_0x1ef3b8]:VisuMZ[_0x3e6bc4(0x2c1)][_0xf06282][_0x3e6bc4(0x5f9)][_0x1ef3b8];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x322)]=Game_Event['prototype']['event'],Game_Event[_0x17c4f7(0x4ae)]['event']=function(){const _0x51f7a2=_0x17c4f7;if(this[_0x51f7a2(0x511)]!==undefined){const _0x373cbe=this[_0x51f7a2(0x511)]['mapId'],_0x277918=this[_0x51f7a2(0x511)][_0x51f7a2(0x415)];return $gameMap[_0x51f7a2(0x3d6)](_0x373cbe,_0x277918);}if(this[_0x51f7a2(0x5db)]!==undefined){const _0x2da547=this['_eventCopyData']['mapId'],_0x604380=this[_0x51f7a2(0x5db)]['eventId'];return $gameMap[_0x51f7a2(0x3d6)](_0x2da547,_0x604380);}if(this[_0x51f7a2(0x5c9)]!==undefined){const _0x52f920=this[_0x51f7a2(0x5c9)][_0x51f7a2(0x567)],_0x337f13=this[_0x51f7a2(0x5c9)]['eventId'];return $gameMap['referEvent'](_0x52f920,_0x337f13);}if($gameTemp[_0x51f7a2(0x436)]!==undefined){const _0x33d257=$gameTemp['_spawnData'][_0x51f7a2(0x567)],_0x5e3d36=$gameTemp[_0x51f7a2(0x436)]['eventId'];return $gameMap['referEvent'](_0x33d257,_0x5e3d36);}return VisuMZ[_0x51f7a2(0x4f2)][_0x51f7a2(0x322)][_0x51f7a2(0x494)](this);},Game_Event['prototype'][_0x17c4f7(0x21c)]=function(_0x51924b,_0x2eb067){const _0x3308ed=_0x17c4f7;if(_0x51924b===0x0||_0x2eb067===0x0)return![];if(_0x51924b===$gameMap['mapId']())return!![];if(!VisuMZ[_0x3308ed(0x2c1)][_0x51924b]&&_0x51924b!==$gameMap['mapId']())return $gameTemp[_0x3308ed(0x601)]()&&console[_0x3308ed(0x214)]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.'[_0x3308ed(0x63e)](_0x51924b)),![];return!![];},VisuMZ[_0x17c4f7(0x4f2)]['Game_Event_start']=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x46c)],Game_Event['prototype'][_0x17c4f7(0x46c)]=function(){const _0xa31539=_0x17c4f7;VisuMZ[_0xa31539(0x4f2)][_0xa31539(0x5c3)][_0xa31539(0x494)](this),Imported['VisuMZ_1_MessageCore']&&Input[_0xa31539(0x498)](VisuMZ['MessageCore'][_0xa31539(0x2fe)]['General'][_0xa31539(0x615)])&&Input[_0xa31539(0x645)]();},Game_Event[_0x17c4f7(0x4ae)]['setupCopyEvent']=function(){const _0x1735d9=_0x17c4f7,_0x10ce12=this[_0x1735d9(0x4a4)]()[_0x1735d9(0x24e)];if(_0x10ce12==='')return;if(DataManager[_0x1735d9(0x1cf)]()||DataManager['isEventTest']())return;const _0xee62d3=VisuMZ[_0x1735d9(0x4f2)][_0x1735d9(0x2fe)][_0x1735d9(0x525)];let _0x43cf6d=null,_0x1260cd=0x0,_0x4e4348=0x0;if(_0x10ce12['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x1260cd=Number(RegExp['$1']),_0x4e4348=Number(RegExp['$2']);if(_0x1260cd===0x0)_0x1260cd=$gameMap[_0x1735d9(0x567)]();}else{if(_0x10ce12[_0x1735d9(0x49f)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x1260cd=Number(RegExp['$1']),_0x4e4348=Number(RegExp['$2']);if(_0x1260cd===0x0)_0x1260cd=$gameMap[_0x1735d9(0x567)]();}else{if(_0x10ce12['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x5770e0=String(RegExp['$1'])[_0x1735d9(0x2f4)]()[_0x1735d9(0x485)]();_0x43cf6d=VisuMZ['EventTemplates'][_0x5770e0];if(!_0x43cf6d)return;_0x1260cd=_0x43cf6d[_0x1735d9(0x667)],_0x4e4348=_0x43cf6d[_0x1735d9(0x50e)];}}}if(!this[_0x1735d9(0x21c)](_0x1260cd,_0x4e4348))return;_0xee62d3[_0x1735d9(0x611)][_0x1735d9(0x494)](this,_0x1260cd,_0x4e4348,this);if(_0x43cf6d)_0x43cf6d[_0x1735d9(0x611)][_0x1735d9(0x494)](this,_0x1260cd,_0x4e4348,this);this[_0x1735d9(0x5db)]={'mapId':_0x1260cd,'eventId':_0x4e4348},this['_pageIndex']=-0x2,this[_0x1735d9(0x1ba)](),_0xee62d3[_0x1735d9(0x1b7)][_0x1735d9(0x494)](this,_0x1260cd,_0x4e4348,this);if(_0x43cf6d)_0x43cf6d[_0x1735d9(0x1b7)][_0x1735d9(0x494)](this,_0x1260cd,_0x4e4348,this);$gameMap['clearEventCache']();},Game_Event['prototype'][_0x17c4f7(0x3e1)]=function(){const _0x296130=_0x17c4f7,_0x4c53b4=$gameSystem[_0x296130(0x3b2)](this);if(!_0x4c53b4)return;const _0x191081=_0x4c53b4[_0x296130(0x502)]['toUpperCase']()[_0x296130(0x485)]();_0x191081!==_0x296130(0x449)?this[_0x296130(0x1e4)](_0x191081,!![]):this['morphInto'](_0x4c53b4[_0x296130(0x567)],_0x4c53b4['eventId'],!![]);},Game_Event[_0x17c4f7(0x4ae)]['morphInto']=function(_0x57a1be,_0x26afa2,_0xf75673){const _0x49dc50=_0x17c4f7;if(!this[_0x49dc50(0x21c)](_0x57a1be,_0x26afa2))return;const _0x217648=VisuMZ[_0x49dc50(0x4f2)][_0x49dc50(0x2fe)][_0x49dc50(0x525)];if(!_0xf75673)_0x217648[_0x49dc50(0x551)][_0x49dc50(0x494)](this,_0x57a1be,_0x26afa2,this);this[_0x49dc50(0x511)]={'mapId':_0x57a1be,'eventId':_0x26afa2},this[_0x49dc50(0x49e)]=-0x2,this[_0x49dc50(0x1ba)]();if(!_0xf75673)_0x217648['PostMorphJS'][_0x49dc50(0x494)](this,_0x57a1be,_0x26afa2,this);$gameMap[_0x49dc50(0x3a6)]();},Game_Event[_0x17c4f7(0x4ae)]['morphIntoTemplate']=function(_0x818e1b,_0x3eb322){const _0x13200b=_0x17c4f7;_0x818e1b=_0x818e1b['toUpperCase']()['trim']();const _0x555526=VisuMZ[_0x13200b(0x51d)][_0x818e1b];if(!_0x555526)return;const _0x57acbf=_0x555526[_0x13200b(0x667)],_0x39fda5=_0x555526['EventID'];if(!this[_0x13200b(0x21c)](_0x57acbf,_0x39fda5))return;if(!_0x3eb322)_0x555526['PreMorphJS']['call'](this,_0x57acbf,_0x39fda5,this);this[_0x13200b(0x3c9)](_0x57acbf,_0x39fda5,_0x3eb322);if(!_0x3eb322)_0x555526[_0x13200b(0x586)][_0x13200b(0x494)](this,_0x57acbf,_0x39fda5,this);if($gameMap)$gameMap[_0x13200b(0x3a6)]();},Game_Event[_0x17c4f7(0x4ae)]['removeMorph']=function(){const _0x34cc2c=_0x17c4f7;this[_0x34cc2c(0x511)]=undefined,this[_0x34cc2c(0x49e)]=-0x2,this[_0x34cc2c(0x1ba)]();},Game_Event['prototype'][_0x17c4f7(0x301)]=function(_0xfa6b6b){const _0x307c7c=_0x17c4f7,_0x5e842e=VisuMZ[_0x307c7c(0x4f2)][_0x307c7c(0x2fe)][_0x307c7c(0x525)],_0x6bf3d2=_0xfa6b6b[_0x307c7c(0x502)][_0x307c7c(0x2f4)]()[_0x307c7c(0x485)](),_0x141651=!['',_0x307c7c(0x449)][_0x307c7c(0x233)](_0x6bf3d2);let _0x433c66=0x0,_0x485d15=0x0;if(_0x141651){const _0xad131=VisuMZ[_0x307c7c(0x51d)][_0x6bf3d2];if(!_0xad131)return;_0x433c66=_0xad131[_0x307c7c(0x667)],_0x485d15=_0xad131[_0x307c7c(0x50e)];}else _0x433c66=_0xfa6b6b[_0x307c7c(0x567)],_0x485d15=_0xfa6b6b['eventId'];if(!this[_0x307c7c(0x21c)](_0x433c66,_0x485d15))return;if(_0x141651){const _0x4d4109=VisuMZ['EventTemplates'][_0x6bf3d2];_0x4d4109['PreSpawnJS'][_0x307c7c(0x494)](this,_0x433c66,_0x485d15,this);}_0x5e842e[_0x307c7c(0x4dc)][_0x307c7c(0x494)](this,_0x433c66,_0x485d15,this),this[_0x307c7c(0x5c9)]=_0xfa6b6b,this[_0x307c7c(0x49e)]=-0x2,this['_mapId']=$gameMap[_0x307c7c(0x567)](),this[_0x307c7c(0x63c)]=_0xfa6b6b[_0x307c7c(0x326)],this[_0x307c7c(0x223)]=_0xfa6b6b[_0x307c7c(0x2aa)],this[_0x307c7c(0x2d7)](_0xfa6b6b['x'],_0xfa6b6b['y']),this[_0x307c7c(0x346)](_0xfa6b6b[_0x307c7c(0x40c)]),this[_0x307c7c(0x1ba)]();if(_0x141651){const _0x2208fc=VisuMZ[_0x307c7c(0x51d)][_0x6bf3d2];if(!_0x2208fc)return;_0x2208fc[_0x307c7c(0x2b0)]['call'](this,_0x433c66,_0x485d15,this);}_0x5e842e[_0x307c7c(0x2b0)]['call'](this,_0x433c66,_0x485d15,this);const _0x32d824=SceneManager['_scene'];if(_0x32d824&&_0x32d824['_spriteset'])_0x32d824[_0x307c7c(0x1fa)][_0x307c7c(0x23d)](this);},Game_Event['prototype'][_0x17c4f7(0x3c8)]=function(){const _0x41451e=_0x17c4f7;return!!this[_0x41451e(0x5c9)];},Game_Event['prototype'][_0x17c4f7(0x46c)]=function(){const _0x543a08=_0x17c4f7;if(!this['list']())return;const _0x48d34d=this[_0x543a08(0x206)]()[_0x543a08(0x45f)](_0x37914f=>_0x37914f[_0x543a08(0x57c)]!==0x6c&&_0x37914f[_0x543a08(0x57c)]!==0x198);_0x48d34d[_0x543a08(0x3a2)]>0x1&&(this[_0x543a08(0x5c0)]=!![],this[_0x543a08(0x624)]([0x0,0x1,0x2])&&this[_0x543a08(0x26a)]());},VisuMZ['EventsMoveCore'][_0x17c4f7(0x3c6)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x2c5)],Game_Event['prototype'][_0x17c4f7(0x2c5)]=function(){const _0x747144=_0x17c4f7;VisuMZ[_0x747144(0x4f2)][_0x747144(0x3c6)][_0x747144(0x494)](this),this[_0x747144(0x39a)](),this[_0x747144(0x532)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x4b7)]=Game_Event['prototype']['setupPageSettings'],Game_Event['prototype'][_0x17c4f7(0x60e)]=function(){const _0x6c7c9=_0x17c4f7;this[_0x6c7c9(0x651)]=!![],VisuMZ[_0x6c7c9(0x4f2)]['Game_Event_setupPageSettings'][_0x6c7c9(0x494)](this),this['setupEventsMoveCoreEffects'](),this[_0x6c7c9(0x532)](),this[_0x6c7c9(0x651)]=![];},Game_Event['prototype'][_0x17c4f7(0x198)]=function(){const _0x3c1bfd=_0x17c4f7;if(!this['event']())return;this[_0x3c1bfd(0x39a)](),this[_0x3c1bfd(0x2be)](),this[_0x3c1bfd(0x640)](),this[_0x3c1bfd(0x1d2)]();},Game_Event['prototype'][_0x17c4f7(0x2be)]=function(){const _0x730a29=_0x17c4f7,_0x156460=this[_0x730a29(0x4a4)]()[_0x730a29(0x24e)];if(_0x156460==='')return;this['checkEventsMoveCoreStringTags'](_0x156460);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x640)]=function(){const _0x5db108=_0x17c4f7;if(!this[_0x5db108(0x4cb)]())return;const _0x5d39ee=this[_0x5db108(0x206)]();let _0x5860dd='';for(const _0x13f315 of _0x5d39ee){if([0x6c,0x198][_0x5db108(0x233)](_0x13f315[_0x5db108(0x57c)])){if(_0x5860dd!=='')_0x5860dd+='\x0a';_0x5860dd+=_0x13f315[_0x5db108(0x335)][0x0];}}this[_0x5db108(0x2bc)](_0x5860dd);},Game_Event[_0x17c4f7(0x4ae)]['initEventsMoveCoreEffects']=function(){const _0x1cc0da=_0x17c4f7,_0x258c32=VisuMZ[_0x1cc0da(0x4f2)][_0x1cc0da(0x2fe)];this[_0x1cc0da(0x56a)]={'type':_0x1cc0da(0x1fe),'distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x1cc0da(0x5b4)](),this[_0x1cc0da(0x25d)]=![],this[_0x1cc0da(0x2b1)]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_encounterHalfProximity']={'type':_0x1cc0da(0x1fe),'distance':0x0},this[_0x1cc0da(0x2c0)]={'type':_0x1cc0da(0x1fe),'distance':0x0},$gameSystem['resetIconsOnEventsData'](this),this[_0x1cc0da(0x579)]=$gameSystem['getEventIconData'](this),this['_labelWindow']={'originalText':'','text':'','visibleRange':_0x258c32[_0x1cc0da(0x34f)][_0x1cc0da(0x522)],'offsetX':_0x258c32[_0x1cc0da(0x34f)][_0x1cc0da(0x352)],'offsetY':_0x258c32[_0x1cc0da(0x34f)]['OffsetY'],'hueShift':0x0},this[_0x1cc0da(0x3ae)]=![],this[_0x1cc0da(0x52a)]=[],this[_0x1cc0da(0x64c)]={'target':-0x1,'type':_0x1cc0da(0x44c),'delay':0x1,'opacityDelta':0x0},this[_0x1cc0da(0x264)]=_0x258c32['Movement'][_0x1cc0da(0x211)]??0x0,this['_saveEventLocation']=![],this[_0x1cc0da(0x360)]=0x1,this[_0x1cc0da(0x576)]=0x1,this['_shadowGraphic']={'visible':!![],'filename':_0x258c32[_0x1cc0da(0x290)][_0x1cc0da(0x5a3)]},this['_tileExpand']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x1cc0da(0x554)](),this[_0x1cc0da(0x62f)]();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x2bc)]=function(_0x3ed764){const _0x4b0941=_0x17c4f7;if(_0x3ed764[_0x4b0941(0x49f)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x4b0941(0x56a)][_0x4b0941(0x229)]=JSON[_0x4b0941(0x43f)]('['+RegExp['$1'][_0x4b0941(0x49f)](/\d+/g)+']'),this[_0x4b0941(0x56a)][_0x4b0941(0x36f)]=_0x4b0941(0x39c);else _0x3ed764['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x4b0941(0x261)]()[_0x4b0941(0x485)](),this[_0x4b0941(0x56a)][_0x4b0941(0x36f)]=type,this['_activationProximity']['distance']=Number(RegExp['$2']));_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this[_0x4b0941(0x653)][_0x4b0941(0x3ea)]=String(RegExp['$1']),this[_0x4b0941(0x653)][_0x4b0941(0x36f)]=_0x4b0941(0x4f9));if(_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0x3645ac=String(RegExp['$1'])['toUpperCase']()[_0x4b0941(0x485)](),_0x457104=[_0x4b0941(0x2c4),_0x4b0941(0x66c),_0x4b0941(0x1f1),_0x4b0941(0x318)];this[_0x4b0941(0x653)][_0x4b0941(0x21f)]=_0x457104[_0x4b0941(0x282)](_0x3645ac)['clamp'](0x0,0x3);}_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x4b0941(0x653)][_0x4b0941(0x2d2)]=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x653)][_0x4b0941(0x48b)]=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture']['offsetY']=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x653)]['offsetX']=Number(RegExp['$1']),this['_attachPicture'][_0x4b0941(0x643)]=Number(RegExp['$2']));_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x4b0941(0x653)][_0x4b0941(0x1ab)]=Number(RegExp['$1'])*0.01);_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x4b0941(0x653)]['type']=String(RegExp['$1'])[_0x4b0941(0x261)]()[_0x4b0941(0x485)]());_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this['_attachPicture'][_0x4b0941(0x3ea)]=String(RegExp['$1']),this[_0x4b0941(0x653)][_0x4b0941(0x36f)]=_0x4b0941(0x30c));_0x3ed764[_0x4b0941(0x49f)](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x4b0941(0x653)][_0x4b0941(0x3ea)]=String(RegExp['$1']),this[_0x4b0941(0x653)][_0x4b0941(0x36f)]=_0x4b0941(0x660));_0x3ed764[_0x4b0941(0x49f)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x4b0941(0x5c8)]=!![]);_0x3ed764[_0x4b0941(0x49f)](/<CLICK TRIGGER>/i)&&(this[_0x4b0941(0x25d)]=!![]);_0x3ed764[_0x4b0941(0x49f)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x4b0941(0x2b1)]=Number(RegExp['$1'])||0x0);_0x3ed764['match'](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x4b0941(0x261)]()[_0x4b0941(0x485)](),this[_0x4b0941(0x617)]['type']=type,this[_0x4b0941(0x617)][_0x4b0941(0x4a9)]=Number(RegExp['$2']));_0x3ed764[_0x4b0941(0x49f)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()['trim'](),this[_0x4b0941(0x2c0)][_0x4b0941(0x36f)]=type,this[_0x4b0941(0x2c0)]['distance']=Number(RegExp['$2']));const _0x5bc500=_0x3ed764['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x5bc500)for(const _0x7e70f of _0x5bc500){if(_0x7e70f['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x4b565b=String(RegExp['$1'])[_0x4b0941(0x261)]()[_0x4b0941(0x485)](),_0x7fa44=Number(RegExp['$2']);this[_0x4b0941(0x3ab)][_0x4b565b]=_0x7fa44;}}if(this['_eventIcon'][_0x4b0941(0x64d)]>=0x0&&!this[_0x4b0941(0x579)][_0x4b0941(0x4bd)]){_0x3ed764['match'](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x4b0941(0x64d)]=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x579)]['bufferX']=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x4b0941(0x641)]=Number(RegExp['$1']));_0x3ed764['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x4b0941(0x227)]=Number(RegExp['$1']),this[_0x4b0941(0x579)]['bufferY']=Number(RegExp['$2']));if(_0x3ed764[_0x4b0941(0x49f)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x34bdd0=String(RegExp['$1'])['toUpperCase']()[_0x4b0941(0x485)](),_0x2bc397=[_0x4b0941(0x2c4),_0x4b0941(0x66c),_0x4b0941(0x1f1),'SCREEN'];this[_0x4b0941(0x579)][_0x4b0941(0x21f)]=_0x2bc397['indexOf'](_0x34bdd0)['clamp'](0x0,0x3);}$gameSystem[_0x4b0941(0x4b4)](this,this['_eventIcon'][_0x4b0941(0x64d)],this[_0x4b0941(0x579)][_0x4b0941(0x227)],this[_0x4b0941(0x579)][_0x4b0941(0x641)],this[_0x4b0941(0x579)][_0x4b0941(0x21f)]);}if(_0x3ed764[_0x4b0941(0x49f)](/<LABEL:[ ](.*?)>/i)){let _0x262e49=String(RegExp['$1'])[_0x4b0941(0x485)]();this[_0x4b0941(0x5c4)][_0x4b0941(0x1bf)]=_0x262e49,this[_0x4b0941(0x5c4)]['originalText']=_0x262e49;}if(_0x3ed764['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0xd84234=String(RegExp['$1'])[_0x4b0941(0x485)]();this['_labelWindow'][_0x4b0941(0x1bf)]=_0xd84234,this[_0x4b0941(0x5c4)]['originalText']=_0xd84234;}_0x3ed764[_0x4b0941(0x49f)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x5c4)][_0x4b0941(0x48b)]=Number(RegExp['$1']));_0x3ed764['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x5c4)][_0x4b0941(0x643)]=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x4b0941(0x48b)]=Number(RegExp['$1']),this[_0x4b0941(0x5c4)][_0x4b0941(0x643)]=Number(RegExp['$2']));_0x3ed764[_0x4b0941(0x49f)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x4b0941(0x5c4)][_0x4b0941(0x3f7)]=Number(RegExp['$1']));this[_0x4b0941(0x39b)]();_0x3ed764[_0x4b0941(0x49f)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x4b0941(0x5c4)]['visibleRange']=Number(RegExp['$1']));_0x3ed764[_0x4b0941(0x49f)](/<MIRROR SPRITE>/i)&&(this['_mirrorSprite']=!![]);if(_0x3ed764[_0x4b0941(0x49f)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x284418=JSON[_0x4b0941(0x43f)]('['+RegExp['$1'][_0x4b0941(0x49f)](/\d+/g)+']');this[_0x4b0941(0x52a)]=this[_0x4b0941(0x52a)][_0x4b0941(0x3e0)](_0x284418),this[_0x4b0941(0x52a)]['remove'](0x0);}if(_0x3ed764['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x464f14=String(RegExp['$1']);if(_0x464f14['match'](/PLAYER/i))this[_0x4b0941(0x64c)]['target']=0x0;else _0x464f14[_0x4b0941(0x49f)](/EVENT[ ](\d+)/i)&&(this[_0x4b0941(0x64c)][_0x4b0941(0x3c5)]=Number(RegExp['$1']));}_0x3ed764[_0x4b0941(0x49f)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch'][_0x4b0941(0x36f)]=String(RegExp['$1'])[_0x4b0941(0x261)]()[_0x4b0941(0x485)]());_0x3ed764['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x4b0941(0x64c)][_0x4b0941(0x30f)]=Number(RegExp['$1']));_0x3ed764['match'](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x4b0941(0x64c)]['opacityDelta']=Number(RegExp['$1']));if(_0x3ed764[_0x4b0941(0x49f)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x3ed764[_0x4b0941(0x49f)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x4b0941(0x264)]=Number(RegExp['$1'])||0x0);_0x3ed764[_0x4b0941(0x49f)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]);_0x3ed764[_0x4b0941(0x49f)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this['_scaleBaseX']=Number(RegExp['$1'])*0.01);_0x3ed764[_0x4b0941(0x49f)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x4b0941(0x576)]=Number(RegExp['$1'])*0.01);if(_0x3ed764['match'](/<SCALE:[ ](\d+)([%％])>/i)){const _0x254b4e=Number(RegExp['$1'])*0.01;this['_scaleBaseX']=_0x254b4e,this[_0x4b0941(0x576)]=_0x254b4e;}_0x3ed764['match'](/<HIDE SHADOW>/i)&&(this[_0x4b0941(0x4c0)][_0x4b0941(0x5f8)]=![]),_0x3ed764[_0x4b0941(0x49f)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic'][_0x4b0941(0x3ea)]=String(RegExp['$1'])),_0x3ed764[_0x4b0941(0x49f)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x61c)]=Number(RegExp['$1'])),_0x3ed764[_0x4b0941(0x49f)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x2a2)]=Number(RegExp['$1'])),_0x3ed764['match'](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x4b0941(0x61c)]=Number(RegExp['$1']),this[_0x4b0941(0x2a2)]=Number(RegExp['$2'])),_0x3ed764[_0x4b0941(0x49f)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x4b0941(0x239)]=String(RegExp['$1'])[_0x4b0941(0x2f4)]()[_0x4b0941(0x485)]()),_0x3ed764[_0x4b0941(0x49f)](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this[_0x4b0941(0x3a0)]=this[_0x4b0941(0x3a0)]||{},this[_0x4b0941(0x3a0)]['up']=Number(RegExp['$1'])),_0x3ed764[_0x4b0941(0x49f)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x4b0941(0x3a0)]||{},this[_0x4b0941(0x3a0)][_0x4b0941(0x4d2)]=Number(RegExp['$1'])),_0x3ed764[_0x4b0941(0x49f)](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x4b0941(0x3a0)]||{},this[_0x4b0941(0x3a0)][_0x4b0941(0x388)]=Number(RegExp['$1'])),_0x3ed764['match'](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this[_0x4b0941(0x3a0)]=this['_tileExpand']||{},this[_0x4b0941(0x3a0)][_0x4b0941(0x43b)]=Number(RegExp['$1']));},Game_Event[_0x17c4f7(0x4ae)]['updateEventLabelText']=function(){const _0x1e6754=_0x17c4f7;$gameTemp['registerSelfTarget'](this),this[_0x1e6754(0x5c4)]['text']=this['_labelWindow'][_0x1e6754(0x547)];for(;;){if(this[_0x1e6754(0x5c4)]['text'][_0x1e6754(0x49f)](/\\V\[(\d+)\]/gi))this[_0x1e6754(0x5c4)]['text']=this['_labelWindow'][_0x1e6754(0x547)][_0x1e6754(0x580)](/\\V\[(\d+)\]/gi,(_0x1af1f4,_0x51fd91)=>$gameVariables['value'](parseInt(_0x51fd91)));else break;}$gameTemp[_0x1e6754(0x5bc)]();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x1d2)]=function(){const _0x150ad6=_0x17c4f7;this[_0x150ad6(0x389)]();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x3ad)]=function(){const _0x582c6d=_0x17c4f7;if(this[_0x582c6d(0x5c8)])return!![];return Game_Character[_0x582c6d(0x4ae)][_0x582c6d(0x3ad)]['call'](this);},VisuMZ[_0x17c4f7(0x4f2)]['Game_Event_updateSelfMovement']=Game_Event[_0x17c4f7(0x4ae)]['updateSelfMovement'],Game_Event['prototype']['updateSelfMovement']=function(){const _0x4f019a=_0x17c4f7;if(this[_0x4f019a(0x354)]())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement'][_0x4f019a(0x494)](this),this[_0x4f019a(0x38c)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x4f019a(0x63c)]);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x354)]=function(){const _0x5a5fb8=_0x17c4f7,_0x5b2d8d=VisuMZ[_0x5a5fb8(0x4f2)]['Settings']['Movement'];if($gameMap[_0x5a5fb8(0x19c)]()&&_0x5b2d8d[_0x5a5fb8(0x1a0)])return!![];if($gameMessage[_0x5a5fb8(0x3d1)]()&&_0x5b2d8d['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0x5a5fb8(0x513)]())return!![];if(this[_0x5a5fb8(0x2f2)]()>=0x0)return!![];if(!SceneManager[_0x5a5fb8(0x622)]['_active'])return!![];return![];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x389)]=function(){const _0x5c2377=_0x17c4f7,_0x57876a=SceneManager['_scene']['_spriteset'];if(_0x57876a){const _0x3b974c=_0x57876a[_0x5c2377(0x540)](this);_0x3b974c&&_0x3b974c[_0x5c2377(0x4ec)]&&_0x3b974c[_0x5c2377(0x4ec)]['_filename']!==this[_0x5c2377(0x28f)]()&&(_0x3b974c[_0x5c2377(0x4ec)][_0x5c2377(0x2ba)]=this[_0x5c2377(0x28f)](),_0x3b974c['_shadowSprite'][_0x5c2377(0x27f)]=ImageManager[_0x5c2377(0x5a4)](_0x3b974c['_shadowSprite'][_0x5c2377(0x2ba)]));}},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x28f)]=function(){const _0x97c90b=_0x17c4f7;return this[_0x97c90b(0x4c0)][_0x97c90b(0x3ea)];},Game_Event['prototype'][_0x17c4f7(0x62d)]=function(){const _0x1cd979=_0x17c4f7;if(!this[_0x1cd979(0x4c0)][_0x1cd979(0x5f8)])return![];return Game_CharacterBase[_0x1cd979(0x4ae)]['isShadowVisible']['call'](this);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x332)]=function(){const _0x44a915=_0x17c4f7;return this[_0x44a915(0x5c4)][_0x44a915(0x1bf)];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x3e9)]=function(){const _0x4337dd=_0x17c4f7;return this[_0x4337dd(0x5c4)][_0x4337dd(0x445)];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x48a)]=function(_0x4c15d4,_0x53080e,_0x8e8a5f){const _0x420068=_0x17c4f7;if(this[_0x420068(0x456)]())return this[_0x420068(0x5b0)](_0x4c15d4,_0x53080e,_0x8e8a5f);if($gameMap[_0x420068(0x2a5)](_0x4c15d4,_0x53080e,_0x8e8a5f,_0x420068(0x4a4)))return!![];if($gameMap['isRegionForbidPass'](_0x4c15d4,_0x53080e,_0x8e8a5f,_0x420068(0x4a4)))return![];return Game_Character[_0x420068(0x4ae)][_0x420068(0x48a)]['call'](this,_0x4c15d4,_0x53080e,_0x8e8a5f);},Game_Event['prototype'][_0x17c4f7(0x456)]=function(){const _0x1070e0=_0x17c4f7;if(this[_0x1070e0(0x52a)]===undefined)this[_0x1070e0(0x39a)]();return this['_moveOnlyRegions'][_0x1070e0(0x3a2)]>0x0;},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x5b0)]=function(_0x1326a5,_0x558a83,_0x2653f9){const _0x84bd6d=_0x17c4f7,_0x1469dd=$gameMap[_0x84bd6d(0x54b)](_0x1326a5,_0x2653f9),_0x368e8f=$gameMap[_0x84bd6d(0x3a5)](_0x558a83,_0x2653f9),_0x2c06de=$gameMap[_0x84bd6d(0x359)](_0x1469dd,_0x368e8f);return this[_0x84bd6d(0x52a)][_0x84bd6d(0x233)](_0x2c06de);},VisuMZ['EventsMoveCore'][_0x17c4f7(0x355)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x3b0)],Game_Event['prototype'][_0x17c4f7(0x3b0)]=function(){const _0x452841=_0x17c4f7;if(this[_0x452841(0x4a4)]()&&!$gameTemp[_0x452841(0x601)]()){if(this[_0x452841(0x4a4)]()[_0x452841(0x24e)][_0x452841(0x49f)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x452841(0x595)]=![],this[_0x452841(0x553)]=![],this[_0x452841(0x4a4)]()?VisuMZ[_0x452841(0x4f2)][_0x452841(0x355)][_0x452841(0x494)](this):-0x1;},VisuMZ[_0x17c4f7(0x4f2)]['Game_Event_meetsConditions']=Game_Event['prototype']['meetsConditions'],Game_Event[_0x17c4f7(0x4ae)]['meetsConditions']=function(_0x637ef3){const _0xa9452f=_0x17c4f7;this[_0xa9452f(0x471)](_0x637ef3),$gameTemp[_0xa9452f(0x63d)](this);const _0x4f7268=VisuMZ['EventsMoveCore']['Game_Event_meetsConditions'][_0xa9452f(0x494)](this,_0x637ef3);return $gameTemp[_0xa9452f(0x5bc)](),_0x4f7268;},Game_Event[_0x17c4f7(0x4ae)]['hasAdvancedSwitchVariable']=function(){const _0x52d042=_0x17c4f7;return this[_0x52d042(0x595)];},Game_Event[_0x17c4f7(0x4ae)]['checkAdvancedSwitchVariablePresent']=function(_0x27f70b){const _0x6a7eb0=_0x17c4f7,_0x4b4977=_0x27f70b['conditions'];if(_0x4b4977['switch1Valid']&&DataManager['isAdvancedSwitch'](_0x4b4977[_0x6a7eb0(0x33f)]))this['_advancedSwitchVariable']=!![];else{if(_0x4b4977['switch2Valid']&&DataManager['isAdvancedSwitch'](_0x4b4977[_0x6a7eb0(0x266)]))this[_0x6a7eb0(0x595)]=!![];else _0x4b4977[_0x6a7eb0(0x482)]&&DataManager[_0x6a7eb0(0x5ed)](_0x4b4977[_0x6a7eb0(0x65c)])&&(this[_0x6a7eb0(0x595)]=!![]);}},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x37a)]=function(){const _0xcb48b1=_0x17c4f7;if(this[_0xcb48b1(0x54e)])return![];return this['_clickTrigger'];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x29e)]=function(){const _0x2afcc5=_0x17c4f7;$gameTemp[_0x2afcc5(0x1c1)](),this['start']();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x425)]=function(_0x27449e,_0x42bf2d){const _0x102048=_0x17c4f7;return this[_0x102048(0x3ab)]?this['posEventsMoveCore'](_0x27449e,_0x42bf2d):Game_Character['prototype']['pos'][_0x102048(0x494)](this,_0x27449e,_0x42bf2d);},Game_Event['prototype']['posEventsMoveCore']=function(_0x4327f4,_0x5213f1){const _0x287d02=_0x17c4f7;var _0x22da6d=this['x']-this[_0x287d02(0x3ab)]['left'],_0x26ea8e=this['x']+this[_0x287d02(0x3ab)][_0x287d02(0x43b)],_0x3a84d5=this['y']-this[_0x287d02(0x3ab)]['up'],_0x25264e=this['y']+this[_0x287d02(0x3ab)][_0x287d02(0x4d2)];return _0x22da6d<=_0x4327f4&&_0x4327f4<=_0x26ea8e&&_0x3a84d5<=_0x5213f1&&_0x5213f1<=_0x25264e;},Game_Event[_0x17c4f7(0x4ae)]['canPass']=function(_0x374677,_0x1c8596,_0x243814){const _0x3d3868=_0x17c4f7;for(let _0x3ba96b=-this[_0x3d3868(0x3ab)]['left'];_0x3ba96b<=this['_addedHitbox'][_0x3d3868(0x43b)];_0x3ba96b++){for(let _0x2a5bc4=-this[_0x3d3868(0x3ab)]['up'];_0x2a5bc4<=this[_0x3d3868(0x3ab)]['down'];_0x2a5bc4++){if(!Game_Character[_0x3d3868(0x4ae)][_0x3d3868(0x56e)][_0x3d3868(0x494)](this,_0x374677+_0x3ba96b,_0x1c8596+_0x2a5bc4,_0x243814))return![];}}return!![];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x5a5)]=function(_0x4987ee,_0x22df90){const _0x44d305=_0x17c4f7;if(Imported[_0x44d305(0x664)]&&this['isSmartEventCollisionOn']())return this[_0x44d305(0x1a2)](_0x4987ee,_0x22df90);else{const _0x104121=$gameMap['eventsXyNt'](_0x4987ee,_0x22df90)[_0x44d305(0x45f)](_0x802c32=>_0x802c32!==this);return _0x104121[_0x44d305(0x3a2)]>0x0;}},Game_Event['prototype'][_0x17c4f7(0x1a2)]=function(_0x37fd67,_0x1afe8a){const _0x37e41c=_0x17c4f7;if(!this[_0x37e41c(0x565)]())return![];else{const _0x24be36=$gameMap[_0x37e41c(0x37b)](_0x37fd67,_0x1afe8a)[_0x37e41c(0x45f)](_0x1d2aea=>_0x1d2aea!==this&&_0x1d2aea[_0x37e41c(0x565)]());return _0x24be36[_0x37e41c(0x3a2)]>0x0;}},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x383)]=function(){const _0x2760ef=_0x17c4f7;if(!this[_0x2760ef(0x56a)])return'none';return this['_activationProximity'][_0x2760ef(0x36f)]||_0x2760ef(0x1fe);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x4da)]=function(){const _0x1f57f2=_0x17c4f7;if(!this[_0x1f57f2(0x56a)])return 0x0;return this[_0x1f57f2(0x56a)][_0x1f57f2(0x4a9)]||0x0;},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x237)]=function(){const _0x594533=_0x17c4f7;if(!this[_0x594533(0x56a)])return[];return this[_0x594533(0x56a)][_0x594533(0x229)]||[];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x23f)]=function(){const _0x3066b0=_0x17c4f7;Game_Character['prototype']['increaseSteps'][_0x3066b0(0x494)](this);if([_0x3066b0(0x1fe),'region'][_0x3066b0(0x233)](this[_0x3066b0(0x383)]()))return;$gamePlayer[_0x3066b0(0x3dc)]([0x2]);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2d9)]=Game_Event['prototype'][_0x17c4f7(0x487)],Game_Event[_0x17c4f7(0x4ae)]['checkEventTriggerAuto']=function(){const _0x53f087=_0x17c4f7;if(this[_0x53f087(0x315)]!==0x3)return;if(this[_0x53f087(0x651)])return;if(!this[_0x53f087(0x2a9)](![]))return;if(!this[_0x53f087(0x363)](![]))return;VisuMZ[_0x53f087(0x4f2)][_0x53f087(0x2d9)][_0x53f087(0x494)](this);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3f8)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x47f)],Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x47f)]=function(){const _0x485ea0=_0x17c4f7;if(!this['_interpreter'])return;if(!this[_0x485ea0(0x2a9)](!![]))return;if(!this[_0x485ea0(0x363)](!![]))return;VisuMZ['EventsMoveCore']['Game_Event_updateParallel'][_0x485ea0(0x494)](this);},Game_Event['prototype'][_0x17c4f7(0x2a9)]=function(_0x207aff){const _0x4a7f20=_0x17c4f7;if(!_0x207aff&&$gameMap[_0x4a7f20(0x19c)]())return![];if(!_0x207aff&&$gameMap[_0x4a7f20(0x60d)]())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x4a7f20(0x5ef)](this);},Game_Event['prototype'][_0x17c4f7(0x363)]=function(_0x388e63){const _0x4e74e0=_0x17c4f7;if(!_0x388e63&&$gameMap['isEventRunning']())return![];if(!_0x388e63&&$gameMap[_0x4e74e0(0x60d)]())return![];if(['none',_0x4e74e0(0x39c)][_0x4e74e0(0x233)](this[_0x4e74e0(0x383)]()))return!![];return $gamePlayer[_0x4e74e0(0x3d5)](this);},Game_Event['prototype'][_0x17c4f7(0x26d)]=function(_0x33a560){const _0x762638=_0x17c4f7,_0x2a2b58=_0x33a560?this[_0x762638(0x617)]:this['_encounterNoneProximity'];return _0x2a2b58?_0x2a2b58['type']:_0x762638(0x1fe);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x349)]=function(_0x4fd242){const _0x329f45=_0x17c4f7,_0x39e07d=_0x4fd242?this['_encounterHalfProximity']:this[_0x329f45(0x2c0)];return _0x39e07d?_0x39e07d[_0x329f45(0x4a9)]:0x0;},VisuMZ[_0x17c4f7(0x2cc)]=function(_0x5226e9){const _0x50c1cc=_0x17c4f7;for(const _0x1857d0 of $gameMap['events']()){if(!_0x1857d0)continue;_0x1857d0[_0x50c1cc(0x2f2)]()===_0x5226e9&&_0x1857d0['updateMoveSynch']();}},VisuMZ[_0x17c4f7(0x38a)]=function(_0x354d3c){const _0x148f75=_0x17c4f7;if(_0x354d3c===0x0)return $gamePlayer;return $gameMap[_0x148f75(0x4a4)](_0x354d3c);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x27a)]=function(){},Game_Event[_0x17c4f7(0x4ae)]['updateMoveSynchDirection']=function(){const _0x18c826=_0x17c4f7;VisuMZ[_0x18c826(0x549)](this[_0x18c826(0x63c)]);},VisuMZ[_0x17c4f7(0x549)]=function(_0x39af27){const _0xa7cb30=_0x17c4f7;for(const _0x139f27 of $gameMap['events']()){if(!_0x139f27)continue;_0x139f27[_0xa7cb30(0x2f2)]()===_0x39af27&&_0x139f27['processMoveSynchDirection']();}},Game_Event[_0x17c4f7(0x4ae)]['moveSynchTarget']=function(){const _0x481b4a=_0x17c4f7;return this[_0x481b4a(0x64c)][_0x481b4a(0x3c5)];},Game_Event['prototype'][_0x17c4f7(0x455)]=function(){const _0x96cfa9=_0x17c4f7;return this[_0x96cfa9(0x64c)][_0x96cfa9(0x36f)];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x537)]=function(){const _0x385d8e=_0x17c4f7;if(this[_0x385d8e(0x2f2)]()>=0x0){const _0x23fb2e=VisuMZ['GetMoveSynchTarget'](this[_0x385d8e(0x2f2)]());if(_0x23fb2e)return _0x23fb2e['realMoveSpeed']();}return Game_Character[_0x385d8e(0x4ae)]['realMoveSpeed'][_0x385d8e(0x494)](this);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x405)]=function(){const _0x64b2bd=_0x17c4f7;this[_0x64b2bd(0x64c)][_0x64b2bd(0x524)]=this[_0x64b2bd(0x64c)][_0x64b2bd(0x524)]||0x0,this[_0x64b2bd(0x64c)][_0x64b2bd(0x524)]--;if(this[_0x64b2bd(0x64c)]['timer']>0x0)return;this[_0x64b2bd(0x64c)][_0x64b2bd(0x524)]=this[_0x64b2bd(0x64c)]['delay'],this['processMoveSynch']();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x4d4)]=function(_0x29f06f){const _0x1fc11d=_0x17c4f7;if(this[_0x1fc11d(0x2f2)]()>=0x0){const _0x17a948=VisuMZ[_0x1fc11d(0x38a)](this['moveSynchTarget']());if(_0x17a948){const _0x1545b3=$gameMap[_0x1fc11d(0x4a9)](this[_0x1fc11d(0x619)],this['_realY'],_0x17a948[_0x1fc11d(0x619)],_0x17a948['_realY'])-0x1,_0x1acf98=Math[_0x1fc11d(0x636)]($gameMap[_0x1fc11d(0x5f7)](),$gameMap[_0x1fc11d(0x4e1)]()),_0x26c806=this['_moveSynch'][_0x1fc11d(0x265)]||0x0;_0x29f06f-=Math[_0x1fc11d(0x236)](0x0,_0x1545b3)*_0x1acf98*_0x26c806;}}return _0x29f06f;},Game_Event['prototype'][_0x17c4f7(0x3da)]=function(){const _0x6325d=_0x17c4f7;switch(this[_0x6325d(0x455)]()){case _0x6325d(0x44c):this['processMoveSynchRandom']();break;case _0x6325d(0x468):this[_0x6325d(0x37f)]();break;case _0x6325d(0x228):this[_0x6325d(0x51a)]();break;case _0x6325d(0x1a4):this['processMoveSynchCustom']();break;case'mimic':case _0x6325d(0x3d7):this['processMoveSynchMimic']();break;case _0x6325d(0x496):case _0x6325d(0x54c):this[_0x6325d(0x5e8)]();break;case _0x6325d(0x45c):case _0x6325d(0x1fd):case _0x6325d(0x531):case _0x6325d(0x5f6):this[_0x6325d(0x31b)]();break;case _0x6325d(0x3e2):case _0x6325d(0x1e3):case _0x6325d(0x271):case _0x6325d(0x240):this['processMoveSynchMirrorVert']();break;default:this[_0x6325d(0x38b)]();break;}this[_0x6325d(0x420)]();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x38b)]=function(){const _0x10fc20=_0x17c4f7,_0x4902a4=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x4902a4[_0x10fc20(0x46b)](0x1,0x3,0x7,0x9);const _0x4cbf57=[];for(const _0x417690 of _0x4902a4){if(this[_0x10fc20(0x56e)](this['x'],this['y'],_0x417690))_0x4cbf57['push'](_0x417690);}if(_0x4cbf57[_0x10fc20(0x3a2)]>0x0){const _0xd08534=_0x4cbf57[Math[_0x10fc20(0x1d4)](_0x4cbf57['length'])];this[_0x10fc20(0x222)](_0xd08534);}},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x37f)]=function(){const _0x55ce17=_0x17c4f7,_0x2da123=VisuMZ[_0x55ce17(0x38a)](this[_0x55ce17(0x2f2)]());this[_0x55ce17(0x2d1)](_0x2da123);},Game_Event['prototype'][_0x17c4f7(0x51a)]=function(){const _0x5a1e21=_0x17c4f7,_0x13ff6b=VisuMZ[_0x5a1e21(0x38a)](this[_0x5a1e21(0x2f2)]());this[_0x5a1e21(0x4ef)](_0x13ff6b);},Game_Event['prototype'][_0x17c4f7(0x1d0)]=function(){this['updateRoutineMove']();},Game_Event['prototype'][_0x17c4f7(0x5ec)]=function(){const _0x40a4f5=_0x17c4f7,_0x4f798b=VisuMZ[_0x40a4f5(0x38a)](this[_0x40a4f5(0x2f2)]());this['executeMoveDir8'](_0x4f798b['lastMovedDirection']());},Game_Event[_0x17c4f7(0x4ae)]['processMoveSynchReverseMimic']=function(){const _0x4931e2=_0x17c4f7,_0x6fa351=VisuMZ['GetMoveSynchTarget'](this[_0x4931e2(0x2f2)]());this['executeMoveDir8'](this[_0x4931e2(0x49c)](_0x6fa351['lastMovedDirection']()));},Game_Event[_0x17c4f7(0x4ae)]['processMoveSynchMirrorHorz']=function(){const _0x351dfa=_0x17c4f7,_0x43a973=VisuMZ[_0x351dfa(0x38a)](this[_0x351dfa(0x2f2)]()),_0x171bf9=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x43a973[_0x351dfa(0x29b)]()];this[_0x351dfa(0x222)](_0x171bf9);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x328)]=function(){const _0x5052c7=_0x17c4f7,_0x49d21f=VisuMZ[_0x5052c7(0x38a)](this[_0x5052c7(0x2f2)]()),_0x4225c7=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x49d21f[_0x5052c7(0x29b)]()];this[_0x5052c7(0x222)](_0x4225c7);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x218)]=function(){const _0x4fb354=_0x17c4f7,_0x4c6201=VisuMZ[_0x4fb354(0x38a)](this['moveSynchTarget']()),_0x7b1f89=_0x4c6201[_0x4fb354(0x40c)]();switch(this['moveSynchType']()){case _0x4fb354(0x52c):case _0x4fb354(0x3d7):this[_0x4fb354(0x346)](_0x7b1f89);break;case'reverse\x20mimic':case _0x4fb354(0x54c):this[_0x4fb354(0x346)](this[_0x4fb354(0x49c)](_0x7b1f89));break;case _0x4fb354(0x45c):case _0x4fb354(0x1fd):case _0x4fb354(0x531):case _0x4fb354(0x5f6):this[_0x4fb354(0x346)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x7b1f89]);break;case'mirror\x20vertical':case _0x4fb354(0x1e3):case _0x4fb354(0x271):case _0x4fb354(0x240):this[_0x4fb354(0x346)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x7b1f89]);break;default:return;}this['update']();},Game_Event[_0x17c4f7(0x4ae)]['restoreSavedEventPosition']=function(){const _0x2429f8=_0x17c4f7,_0x545aed=$gameSystem[_0x2429f8(0x447)](this);if(!_0x545aed)return;this[_0x2429f8(0x5dd)](_0x545aed['x'],_0x545aed['y']),this[_0x2429f8(0x195)](),this[_0x2429f8(0x346)](_0x545aed['direction']),this[_0x2429f8(0x49e)]===_0x545aed[_0x2429f8(0x280)]&&(this[_0x2429f8(0x1ec)]=_0x545aed[_0x2429f8(0x4f7)]);},VisuMZ[_0x17c4f7(0x4f2)]['Game_Event_update']=Game_Event[_0x17c4f7(0x4ae)]['update'],Game_Event['prototype'][_0x17c4f7(0x420)]=function(){const _0x34bd90=_0x17c4f7;VisuMZ[_0x34bd90(0x4f2)]['Game_Event_update'][_0x34bd90(0x494)](this),!Utils['isMobileDevice']()&&this['updateSaveEventLocation']();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x45b)]=function(){const _0x472c0f=_0x17c4f7;Game_Character[_0x472c0f(0x4ae)][_0x472c0f(0x45b)][_0x472c0f(0x494)](this),this[_0x472c0f(0x532)]();},Game_Event[_0x17c4f7(0x4ae)]['isSaveEventLocation']=function(){const _0x4772d5=_0x17c4f7;if($gameMap['isSaveEventLocations']())return!![];return this[_0x4772d5(0x497)];},Game_Event[_0x17c4f7(0x4ae)]['autosaveEventLocation']=function(){const _0x21c8e1=_0x17c4f7;if(!this[_0x21c8e1(0x39e)]())return;this['saveEventLocation']();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x3cf)]=function(){const _0xd7fc0c=_0x17c4f7;this[_0xd7fc0c(0x4e2)]=!![];},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x3e6)]=function(){const _0x5185cf=_0x17c4f7;this[_0x5185cf(0x4e2)]&&this['processSaveEventLocation']();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x5e2)]=function(){const _0xafe5fd=_0x17c4f7;this[_0xafe5fd(0x4e2)]=![],$gameSystem[_0xafe5fd(0x3cf)](this);},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x1e7)]=function(){const _0x464328=_0x17c4f7;$gameSystem[_0x464328(0x5a0)](this);},Game_Event[_0x17c4f7(0x4ae)]['getEventIconData']=function(){const _0x1e2903=_0x17c4f7;return $gameSystem[_0x1e2903(0x1f2)](this)?Game_Character['prototype'][_0x1e2903(0x1f2)][_0x1e2903(0x494)](this):{'iconIndex':0x0,'bufferX':settings[_0x1e2903(0x599)][_0x1e2903(0x488)],'bufferY':settings[_0x1e2903(0x599)][_0x1e2903(0x4c8)],'blendMode':settings[_0x1e2903(0x599)][_0x1e2903(0x4b1)]};},Game_Event['prototype'][_0x17c4f7(0x3a1)]=function(){const _0x3741a2=_0x17c4f7;return this[_0x3741a2(0x553)];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x340)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x2da)],Game_Event['prototype'][_0x17c4f7(0x2da)]=function(_0x121065){const _0x2f85f7=_0x17c4f7,_0x402496=VisuMZ[_0x2f85f7(0x4f2)][_0x2f85f7(0x340)][_0x2f85f7(0x494)](this,_0x121065);if(!_0x402496)return![];return this[_0x2f85f7(0x476)](_0x121065);},Game_Event['prototype'][_0x17c4f7(0x476)]=function(_0x4c8e8f){const _0x2f819b=_0x17c4f7;VisuMZ[_0x2f819b(0x4f2)][_0x2f819b(0x21b)][_0x2f819b(0x51c)](_0x4c8e8f),this[_0x2f819b(0x553)]=_0x4c8e8f[_0x2f819b(0x2af)][_0x2f819b(0x3a2)]>0x0;_0x4c8e8f[_0x2f819b(0x2af)]===undefined&&VisuMZ[_0x2f819b(0x4f2)][_0x2f819b(0x21b)][_0x2f819b(0x51c)](_0x4c8e8f);if(_0x4c8e8f[_0x2f819b(0x2af)][_0x2f819b(0x3a2)]>0x0)return $gameMap[_0x2f819b(0x4a4)](this['_eventId'])&&VisuMZ[_0x2f819b(0x4f2)][_0x2f819b(0x21b)][_0x2f819b(0x590)](_0x4c8e8f[_0x2f819b(0x2af)],this[_0x2f819b(0x63c)]);return!![];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x51e)]=Game_Troop[_0x17c4f7(0x4ae)][_0x17c4f7(0x2da)],Game_Troop['prototype'][_0x17c4f7(0x2da)]=function(_0x59bcd8){const _0x3b755d=_0x17c4f7;var _0x170bd9=VisuMZ['EventsMoveCore'][_0x3b755d(0x51e)]['call'](this,_0x59bcd8);return _0x170bd9&&this[_0x3b755d(0x440)](_0x59bcd8);},Game_Troop[_0x17c4f7(0x4ae)][_0x17c4f7(0x440)]=function(_0x900200){const _0x4401a0=_0x17c4f7;_0x900200[_0x4401a0(0x2af)]===undefined&&VisuMZ[_0x4401a0(0x4f2)][_0x4401a0(0x21b)][_0x4401a0(0x51c)](_0x900200);if(_0x900200[_0x4401a0(0x2af)][_0x4401a0(0x3a2)]>0x0)return VisuMZ[_0x4401a0(0x4f2)]['CustomPageConditions'][_0x4401a0(0x590)](_0x900200[_0x4401a0(0x2af)],0x0);return!![];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x413)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x2d7)],Game_Event['prototype']['locate']=function(_0x55c666,_0x419f7e){const _0x4dcb45=_0x17c4f7;if(this[_0x4dcb45(0x50b)]){const _0x1ddadb=this[_0x4dcb45(0x4a4)]()[_0x4dcb45(0x24e)]||'';if(_0x1ddadb[_0x4dcb45(0x49f)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0x277455=String(RegExp['$1'])['split'](',')[_0x4dcb45(0x1c2)](_0x2394a3=>Number(_0x2394a3));_0x55c666+=Number(_0x277455[0x0]||0x0)||0x0,_0x419f7e+=Number(_0x277455[0x1]||0x0)||0x0;}_0x1ddadb[_0x4dcb45(0x49f)](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x55c666+=Number(RegExp['$1'])),_0x1ddadb[_0x4dcb45(0x49f)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0x419f7e+=Number(RegExp['$1']));}VisuMZ[_0x4dcb45(0x4f2)][_0x4dcb45(0x413)][_0x4dcb45(0x494)](this,_0x55c666,_0x419f7e),this[_0x4dcb45(0x452)]=_0x55c666,this[_0x4dcb45(0x4cc)]=_0x419f7e,this[_0x4dcb45(0x532)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x5d5)]=Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x593)],Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x593)]=function(){const _0x433693=_0x17c4f7,_0x1984ce=$gameMap[_0x433693(0x4a9)](this['x'],this['y'],this[_0x433693(0x452)],this[_0x433693(0x4cc)]),_0x27a8ae=_0x1984ce*(this[_0x433693(0x264)]||0x0);Math[_0x433693(0x44c)]()>=_0x27a8ae?VisuMZ[_0x433693(0x4f2)][_0x433693(0x5d5)][_0x433693(0x494)](this):this[_0x433693(0x4a3)]();},Game_Event[_0x17c4f7(0x4ae)][_0x17c4f7(0x4a3)]=function(){const _0xd9e2c2=_0x17c4f7,_0x331016=this[_0xd9e2c2(0x60a)](this[_0xd9e2c2(0x452)]),_0x37324f=this['deltaYFrom'](this[_0xd9e2c2(0x4cc)]);if(Math[_0xd9e2c2(0x555)](_0x331016)>Math['abs'](_0x37324f))this['moveStraight'](_0x331016>0x0?0x4:0x6),!this[_0xd9e2c2(0x298)]()&&_0x37324f!==0x0&&this[_0xd9e2c2(0x1f7)](_0x37324f>0x0?0x8:0x2);else _0x37324f!==0x0&&(this[_0xd9e2c2(0x1f7)](_0x37324f>0x0?0x8:0x2),!this['isMovementSucceeded']()&&_0x331016!==0x0&&this[_0xd9e2c2(0x1f7)](_0x331016>0x0?0x4:0x6));},Game_CharacterBase[_0x17c4f7(0x4ae)]['clearAttachPictureSettings']=function(){const _0x2d041e=_0x17c4f7;this[_0x2d041e(0x653)]={'filename':'','type':_0x2d041e(0x4f9),'blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase['prototype']['attachPictureSettings']=function(){const _0x27a67d=_0x17c4f7;if(this[_0x27a67d(0x653)]===undefined)this['clearAttachPictureSettings']();return this[_0x27a67d(0x653)];},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x398)]=function(){const _0x4759e8=_0x17c4f7;return this[_0x4759e8(0x53c)]()[_0x4759e8(0x3ea)]??'';},Game_CharacterBase['prototype'][_0x17c4f7(0x397)]=function(){const _0x20c29f=_0x17c4f7;return this[_0x20c29f(0x53c)]()['picture']??_0x20c29f(0x4f9);},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x4f5)]=function(){const _0x88f6b0=_0x17c4f7;return this[_0x88f6b0(0x53c)]()[_0x88f6b0(0x21f)]??0x0;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x648)]=function(){const _0x2c840d=_0x17c4f7;return this[_0x2c840d(0x53c)]()[_0x2c840d(0x2d2)]??0x0;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x259)]=function(){const _0x19a750=_0x17c4f7;return this[_0x19a750(0x53c)]()[_0x19a750(0x48b)]??0x0;},Game_CharacterBase['prototype'][_0x17c4f7(0x2f9)]=function(){const _0x3c62ba=_0x17c4f7;return this[_0x3c62ba(0x53c)]()[_0x3c62ba(0x643)]??0x0;},Game_CharacterBase[_0x17c4f7(0x4ae)][_0x17c4f7(0x4fb)]=function(){const _0x40b9fc=_0x17c4f7;return this['attachPictureSettings']()[_0x40b9fc(0x1ab)]??0x1;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x37c)]=Game_Interpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x27c)],Game_Interpreter[_0x17c4f7(0x4ae)]['updateWaitMode']=function(){const _0x37df2e=_0x17c4f7;if(this['_waitMode']===_0x37df2e(0x2d4)){if(window[this[_0x37df2e(0x432)]])this[_0x37df2e(0x635)]='',this[_0x37df2e(0x625)]();else return!![];}else return VisuMZ['EventsMoveCore'][_0x37df2e(0x37c)][_0x37df2e(0x494)](this);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2fa)]=Game_Interpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x249)],Game_Interpreter['prototype'][_0x17c4f7(0x249)]=function(){const _0xa51c9d=_0x17c4f7,_0x3ca704=$gameMap&&this[_0xa51c9d(0x63c)]?$gameMap[_0xa51c9d(0x4a4)](this['_eventId']):null;$gameTemp['registerSelfTarget'](_0x3ca704);const _0x4ece6d=VisuMZ[_0xa51c9d(0x4f2)][_0xa51c9d(0x2fa)]['call'](this);return $gameTemp[_0xa51c9d(0x5bc)](),_0x4ece6d;},VisuMZ['EventsMoveCore']['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x2c9)],Game_Interpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x2c9)]=function(_0x5e219f){const _0x475248=_0x17c4f7;return $gameTemp[_0x475248(0x1f4)](this),VisuMZ[_0x475248(0x4f2)][_0x475248(0x5b5)][_0x475248(0x494)](this,_0x5e219f);},Game_Interpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x1e5)]=function(_0x59e83d){const _0x45c00e=_0x17c4f7;this[_0x45c00e(0x330)]=_0x59e83d;const _0x332caf=_0x45c00e(0x387)[_0x45c00e(0x63e)](_0x59e83d[_0x45c00e(0x567)]['padZero'](0x3));this[_0x45c00e(0x432)]=_0x45c00e(0x4f1)+Graphics[_0x45c00e(0x2ed)]+'_'+this[_0x45c00e(0x415)](),DataManager[_0x45c00e(0x64e)](this[_0x45c00e(0x432)],_0x332caf),window[this['_callEventMap']]?this[_0x45c00e(0x625)]():this[_0x45c00e(0x1b1)]('CallEvent');},Game_Interpreter['prototype']['startCallEvent']=function(){const _0x27dcd9=_0x17c4f7,_0x4f5d57=this[_0x27dcd9(0x330)],_0x11b6e3=window[this[_0x27dcd9(0x432)]],_0xba3f7e=_0x11b6e3[_0x27dcd9(0x5f9)][_0x4f5d57[_0x27dcd9(0x415)]];if(_0xba3f7e&&_0xba3f7e[_0x27dcd9(0x3b9)][_0x4f5d57[_0x27dcd9(0x5dc)]-0x1]){const _0x134fda=_0xba3f7e[_0x27dcd9(0x3b9)][_0x4f5d57[_0x27dcd9(0x5dc)]-0x1][_0x27dcd9(0x206)];this['setupChild'](_0x134fda,this[_0x27dcd9(0x415)]());}window[this[_0x27dcd9(0x432)]]=undefined,this[_0x27dcd9(0x432)]=undefined,this[_0x27dcd9(0x330)]=undefined;};function Game_CPCInterpreter(){this['initialize']['apply'](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x17c4f7(0x441)](Game_Interpreter[_0x17c4f7(0x4ae)]),Game_CPCInterpreter['prototype']['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x645)]=function(){const _0xaa5f39=_0x17c4f7;Game_Interpreter['prototype']['clear'][_0xaa5f39(0x494)](this),this['_cpc']=![];},Game_CPCInterpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x4bf)]=function(){const _0x4ae46b=_0x17c4f7;while(this[_0x4ae46b(0x57d)]()){this[_0x4ae46b(0x249)]();}},Game_CPCInterpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x534)]=function(_0x23653){const _0x2ed772=_0x17c4f7;while(this[_0x2ed772(0x57d)]()){this[_0x2ed772(0x210)](_0x23653);}},Game_CPCInterpreter[_0x17c4f7(0x4ae)][_0x17c4f7(0x210)]=function(_0x5e505b){const _0x97a1d4=_0x17c4f7,_0x8ff31f=_0x5e505b;$gameTemp[_0x97a1d4(0x63d)](_0x8ff31f);const _0x51f547=VisuMZ[_0x97a1d4(0x4f2)]['Game_Interpreter_executeCommand'][_0x97a1d4(0x494)](this);return $gameTemp[_0x97a1d4(0x5bc)](),_0x51f547;},Game_CPCInterpreter['prototype'][_0x17c4f7(0x467)]=function(_0x1c30b2){const _0x302850=_0x17c4f7;return Game_Interpreter[_0x302850(0x4ae)]['command108']['call'](this,_0x1c30b2),this['_comments'][_0x302850(0x44a)](_0x574bb1=>_0x574bb1[_0x302850(0x49f)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x302850(0x656)]=!![]),!![];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x287)]=Scene_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x46f)],Scene_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x46f)]=function(){const _0xc52eff=_0x17c4f7;VisuMZ[_0xc52eff(0x4f2)]['Scene_Map_startEncounterEffect'][_0xc52eff(0x494)](this),this[_0xc52eff(0x1fa)][_0xc52eff(0x463)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2ee)]=Scene_Load['prototype'][_0x17c4f7(0x245)],Scene_Load[_0x17c4f7(0x4ae)][_0x17c4f7(0x245)]=function(){const _0x324877=_0x17c4f7;if($gameMap)$gameMap[_0x324877(0x3a6)]();VisuMZ[_0x324877(0x4f2)][_0x324877(0x2ee)][_0x324877(0x494)](this);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x44f)]=Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x66e)],Sprite_Character['prototype']['initMembers']=function(){const _0x571d7c=_0x17c4f7;VisuMZ[_0x571d7c(0x4f2)][_0x571d7c(0x44f)][_0x571d7c(0x494)](this),this[_0x571d7c(0x53d)](),this['createAttachPictureSprite'](),this['createIconSprite']();},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x53d)]=function(){const _0x4407c1=_0x17c4f7;this['_shadowOpacity']=0xff,this[_0x4407c1(0x1eb)]=![];},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x29c)]=function(){const _0x148d7d=_0x17c4f7;return this['_characterName']&&this[_0x148d7d(0x548)][_0x148d7d(0x49f)](/\[VS8\]/i);},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x46d)]=function(){const _0x11ac95=_0x17c4f7;return this[_0x11ac95(0x29c)]()&&VisuMZ[_0x11ac95(0x4f2)][_0x11ac95(0x2fe)][_0x11ac95(0x474)][_0x11ac95(0x3d2)];},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x569)]=function(){const _0x9aeb44=_0x17c4f7;this['_attachPictureSprite']=new Sprite(),this[_0x9aeb44(0x25b)][_0x9aeb44(0x2dd)]['x']=0.5,this['_attachPictureSprite'][_0x9aeb44(0x2dd)]['y']=0x1,this['addChild'](this['_attachPictureSprite']),this['updateAttachPictureSprite']();},Sprite_Character[_0x17c4f7(0x4ae)]['createIconSprite']=function(){const _0x2cb585=_0x17c4f7;this[_0x2cb585(0x3fc)]=new Sprite(),this['_eventIconSprite'][_0x2cb585(0x27f)]=ImageManager[_0x2cb585(0x5a4)](_0x2cb585(0x2c2)),this['_eventIconSprite'][_0x2cb585(0x27f)]['smooth']=![],this['_eventIconSprite'][_0x2cb585(0x1da)](0x0,0x0,0x0,0x0),this[_0x2cb585(0x3fc)]['anchor']['x']=0.5,this[_0x2cb585(0x3fc)][_0x2cb585(0x2dd)]['y']=0x1,this[_0x2cb585(0x323)](this[_0x2cb585(0x3fc)]);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x3cb)]=Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)],Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)]=function(){const _0xca1eb6=_0x17c4f7;VisuMZ[_0xca1eb6(0x4f2)][_0xca1eb6(0x3cb)][_0xca1eb6(0x494)](this),this['updateEventsAndMovementCore']();},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x5d1)]=function(){const _0x5c7f97=_0x17c4f7;Sprite[_0x5c7f97(0x4ae)][_0x5c7f97(0x5d1)][_0x5c7f97(0x494)](this),this[_0x5c7f97(0x5ca)]()&&(this[_0x5c7f97(0x5f8)]=![]);},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x5ca)]=function(){const _0x3f19b2=_0x17c4f7;if(this[_0x3f19b2(0x194)]()>0x0)return![];if(this['_character']){if(this['_character'][_0x3f19b2(0x398)]()!=='')return![];}return this[_0x3f19b2(0x215)]()||this[_0x3f19b2(0x2cf)]&&this[_0x3f19b2(0x2cf)][_0x3f19b2(0x27e)]();},Sprite_Character[_0x17c4f7(0x4ae)]['updateBitmapSmoothing']=function(){const _0x4c9871=_0x17c4f7;if(!this[_0x4c9871(0x27f)])return;this[_0x4c9871(0x27f)][_0x4c9871(0x5a9)]=!!VisuMZ[_0x4c9871(0x4f2)][_0x4c9871(0x2fe)][_0x4c9871(0x290)]['BitmapSmoothing'];},Sprite_Character[_0x17c4f7(0x4ae)]['updateEventsAndMovementCore']=function(){const _0x4eac1f=_0x17c4f7;this[_0x4eac1f(0x362)](),this[_0x4eac1f(0x40d)](),this[_0x4eac1f(0x3a7)](),this['updateEventIconSprite'](),this[_0x4eac1f(0x594)](),this[_0x4eac1f(0x1b8)](),this[_0x4eac1f(0x5d7)]();},VisuMZ['EventsMoveCore']['Sprite_Character_setTileBitmap']=Sprite_Character['prototype']['setTileBitmap'],Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x299)]=function(){const _0x3547d0=_0x17c4f7;VisuMZ[_0x3547d0(0x4f2)][_0x3547d0(0x5b2)][_0x3547d0(0x494)](this),this[_0x3547d0(0x27f)][_0x3547d0(0x2ff)](this['updateBitmapSmoothing'][_0x3547d0(0x433)](this));},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1b9)]=function(){const _0x2ef8c6=_0x17c4f7,_0x2c12c7=this['_tileId'],_0x38fc43=this[_0x2ef8c6(0x493)](),_0x152ad0=this[_0x2ef8c6(0x3b3)](),_0x5666d1=(Math['floor'](_0x2c12c7/0x80)%0x2*0x8+_0x2c12c7%0x8)*_0x38fc43,_0x9d5083=Math[_0x2ef8c6(0x564)](_0x2c12c7%0x100/0x8)%0x10*_0x152ad0,_0x45c242=this[_0x2ef8c6(0x3bc)]();let _0x453bcb=_0x5666d1,_0x2c9375=_0x9d5083,_0x24a21e=_0x38fc43,_0x4fac9e=_0x152ad0;_0x45c242['up']&&_0x45c242['up']>0x0&&(_0x2c9375-=_0x152ad0*_0x45c242['up'],_0x4fac9e+=_0x152ad0*_0x45c242['up']),_0x45c242['down']&&_0x45c242[_0x2ef8c6(0x4d2)]>0x0&&(_0x4fac9e+=_0x152ad0*_0x45c242[_0x2ef8c6(0x4d2)]),_0x45c242[_0x2ef8c6(0x388)]&&_0x45c242[_0x2ef8c6(0x388)]>0x0&&(_0x453bcb-=_0x38fc43*_0x45c242[_0x2ef8c6(0x388)],_0x24a21e+=_0x38fc43*_0x45c242[_0x2ef8c6(0x388)]),_0x45c242['right']&&_0x45c242[_0x2ef8c6(0x43b)]>0x0&&(_0x24a21e+=_0x38fc43*_0x45c242[_0x2ef8c6(0x43b)]),this['setFrame'](_0x453bcb,_0x2c9375,_0x24a21e,_0x4fac9e);},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x3bc)]=function(){const _0x58678b=_0x17c4f7;return this[_0x58678b(0x2cf)]?this[_0x58678b(0x2cf)][_0x58678b(0x3a0)]||{}:{};},VisuMZ['EventsMoveCore']['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f9)],Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1f9)]=function(){const _0x52ba95=_0x17c4f7;VisuMZ[_0x52ba95(0x4f2)]['Sprite_Character_setCharacterBitmap'][_0x52ba95(0x494)](this),this[_0x52ba95(0x27f)]['addLoadListener'](this['updateBitmapSmoothing'][_0x52ba95(0x433)](this)),this[_0x52ba95(0x1eb)]=ImageManager['isInvisibleCharacter'](this['_characterName']),this[_0x52ba95(0x1eb)]&&this['bitmap']['addLoadListener'](this['setCharacterSpriteSheetInvisible'][_0x52ba95(0x433)](this));},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x65d)]=function(){const _0x3e0a14=_0x17c4f7;this[_0x3e0a14(0x27f)][_0x3e0a14(0x645)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x2ab)]=Sprite_Character[_0x17c4f7(0x4ae)]['characterPatternY'],Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1b2)]=function(){const _0x3fb56f=_0x17c4f7;return this['isSpriteVS8dir']()?this[_0x3fb56f(0x3ce)]():this[_0x3fb56f(0x3aa)]();},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x3ce)]=function(){const _0x7948d7=_0x17c4f7,_0xef1616=this[_0x7948d7(0x2cf)]['direction']();let _0x25f428=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x7948d7(0x2cf)]['_mirrorSprite']&&(_0x25f428=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x25f428[_0xef1616]-0x2)/0x2;},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x3aa)]=function(){const _0x2ba113=_0x17c4f7;let _0x114936=this[_0x2ba113(0x2cf)][_0x2ba113(0x40c)]();if(this[_0x2ba113(0x2cf)]['_mirrorSprite']){if(_0x114936===0x4)_0x114936=0x6;else _0x114936===0x6&&(_0x114936=0x4);}return(_0x114936-0x2)/0x2;},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x362)]=function(){const _0x5e610f=_0x17c4f7;this['scale']['x']=this['_character']['_scaleX']??0x1,this[_0x5e610f(0x1ab)]['y']=this[_0x5e610f(0x2cf)][_0x5e610f(0x35b)]??0x1;},Sprite_Character['prototype'][_0x17c4f7(0x40d)]=function(){const _0x3b8030=_0x17c4f7;if(!VisuMZ['EventsMoveCore'][_0x3b8030(0x2fe)]['Movement'][_0x3b8030(0x629)])return;this[_0x3b8030(0x3b8)]=0x0;if(this[_0x3b8030(0x508)]()){const _0x55c2a9=VisuMZ[_0x3b8030(0x4f2)][_0x3b8030(0x2fe)][_0x3b8030(0x290)],_0x1522e6=this[_0x3b8030(0x2cf)]['direction']();let _0x38648a=0x0;if([0x1,0x4,0x7][_0x3b8030(0x233)](_0x1522e6))_0x38648a=_0x55c2a9[_0x3b8030(0x5e1)];if([0x3,0x6,0x9][_0x3b8030(0x233)](_0x1522e6))_0x38648a=_0x55c2a9[_0x3b8030(0x3f3)];[0x2,0x8][_0x3b8030(0x233)](_0x1522e6)&&(_0x38648a=[-_0x55c2a9[_0x3b8030(0x2ea)],0x0,_0x55c2a9[_0x3b8030(0x2ea)]][this[_0x3b8030(0x2cf)]['pattern']()]);if(this[_0x3b8030(0x205)])_0x38648a*=-0x1;this[_0x3b8030(0x3b8)]=_0x38648a;}},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x508)]=function(){const _0x3f4c66=_0x17c4f7;if(this['_dragonbones'])return![];return this[_0x3f4c66(0x2cf)][_0x3f4c66(0x254)]()&&!this['_character']['isOnLadder']()&&!this[_0x3f4c66(0x2cf)]['isPosing']()&&this['getEventIconIndex']()===0x0;},Sprite_Character['prototype'][_0x17c4f7(0x3a7)]=function(){const _0x4ad3cc=_0x17c4f7;if(!this[_0x4ad3cc(0x4ec)])return;this[_0x4ad3cc(0x4ec)]['x']=this['_character'][_0x4ad3cc(0x57e)](),this[_0x4ad3cc(0x4ec)]['y']=this[_0x4ad3cc(0x2cf)][_0x4ad3cc(0x29a)](),this[_0x4ad3cc(0x4ec)]['opacity']=this[_0x4ad3cc(0x4e4)],this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x5f8)]=this['_character'][_0x4ad3cc(0x62d)](),this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x661)]=this['_hidden'];if(this['_character']['isShadowShrink']())this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['x']=Math[_0x4ad3cc(0x236)](0x0,this['_shadowSprite'][_0x4ad3cc(0x1ab)]['x']-0.1),this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['y']=Math['max'](0x0,this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['y']-0.1);else{if(this['_shadowSprite'][_0x4ad3cc(0x1ab)]['x']!==this['scale']['x']){if(this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['x']>this[_0x4ad3cc(0x1ab)]['x'])this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['x']=Math[_0x4ad3cc(0x636)](this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['x']+0.1,this[_0x4ad3cc(0x1ab)]['x']);if(this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['x']<this[_0x4ad3cc(0x1ab)]['x'])this['_shadowSprite']['scale']['x']=Math[_0x4ad3cc(0x236)](this[_0x4ad3cc(0x4ec)]['scale']['x']-0.1,this[_0x4ad3cc(0x1ab)]['x']);}if(this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['y']!==this[_0x4ad3cc(0x1ab)]['y']){if(this['_shadowSprite'][_0x4ad3cc(0x1ab)]['y']>this[_0x4ad3cc(0x1ab)]['y'])this['_shadowSprite'][_0x4ad3cc(0x1ab)]['y']=Math[_0x4ad3cc(0x636)](this['_shadowSprite'][_0x4ad3cc(0x1ab)]['y']+0.1,this[_0x4ad3cc(0x1ab)]['y']);if(this['_shadowSprite']['scale']['y']<this['scale']['y'])this[_0x4ad3cc(0x4ec)][_0x4ad3cc(0x1ab)]['y']=Math['max'](this['_shadowSprite'][_0x4ad3cc(0x1ab)]['y']-0.1,this[_0x4ad3cc(0x1ab)]['y']);}}},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x56f)]=function(){const _0x4e5216=_0x17c4f7;if(!this[_0x4e5216(0x3fc)])return;const _0x499550=this[_0x4e5216(0x3fc)],_0x596edc=this[_0x4e5216(0x194)]();if(_0x596edc<=0x0)return _0x499550['setFrame'](0x0,0x0,0x0,0x0);else{const _0x19f24c=ImageManager[_0x4e5216(0x221)],_0x380245=ImageManager[_0x4e5216(0x24f)],_0x373e13=_0x596edc%0x10*_0x19f24c,_0x7dabac=Math[_0x4e5216(0x564)](_0x596edc/0x10)*_0x380245;_0x499550[_0x4e5216(0x1da)](_0x373e13,_0x7dabac,_0x19f24c,_0x380245),this[_0x4e5216(0x5f8)]=!![];}const _0x3cdf20=this['_character']['getEventIconData']();this[_0x4e5216(0x46d)]()?this['autoEventIconBuffer'](_0x499550):(_0x499550['x']=_0x3cdf20?_0x3cdf20[_0x4e5216(0x227)]:0x0,_0x499550['y']=_0x3cdf20?-this[_0x4e5216(0x626)]+_0x3cdf20[_0x4e5216(0x641)]:0x0),_0x499550[_0x4e5216(0x21f)]=_0x3cdf20?_0x3cdf20[_0x4e5216(0x21f)]:0x0,this['removeChild'](_0x499550),this[_0x4e5216(0x323)](_0x499550),_0x499550[_0x4e5216(0x3b8)]=-this[_0x4e5216(0x3b8)];},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x659)]=function(_0xfc935f){const _0x4e193f=_0x17c4f7;_0xfc935f['x']=0x0,_0xfc935f['y']=-this[_0x4e193f(0x626)]+this[_0x4e193f(0x626)]*0x2/0x5,this[_0x4e193f(0x2cf)][_0x4e193f(0x238)]()!==0x1&&(_0xfc935f['y']+=0x1);},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x194)]=function(){const _0x46f640=_0x17c4f7;if(!this['_character'])return 0x0;if(this[_0x46f640(0x2cf)][_0x46f640(0x54e)])return 0x0;const _0x314dc7=this[_0x46f640(0x2cf)][_0x46f640(0x1f2)]();return _0x314dc7?_0x314dc7[_0x46f640(0x64d)]||0x0:0x0;},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x594)]=function(){const _0x43854f=_0x17c4f7;if(!this[_0x43854f(0x2cf)])return;if(this['_character'][_0x43854f(0x2b1)]===undefined)return;if(this[_0x43854f(0x2cf)][_0x43854f(0x2b1)]===![])return;this['z']=this[_0x43854f(0x2cf)]['_customZ'],this['_shadowSprite']&&(this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0);},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1b8)]=function(){const _0x21e33b=_0x17c4f7;if(!this['_character'])return;let _0x2c6a6b=!!this[_0x21e33b(0x2cf)][_0x21e33b(0x3ae)];this['scale']['x']=Math[_0x21e33b(0x555)](this[_0x21e33b(0x1ab)]['x'])*(_0x2c6a6b?-0x1:0x1);},Sprite_Character['prototype'][_0x17c4f7(0x5d7)]=function(){const _0x1c9f2c=_0x17c4f7;if(!this[_0x1c9f2c(0x25b)])return;if(!this[_0x1c9f2c(0x2cf)])return;this[_0x1c9f2c(0x507)](),this[_0x1c9f2c(0x43d)]();},Sprite_Character['prototype'][_0x17c4f7(0x507)]=function(){const _0x4df11b=_0x17c4f7;if(!this['needsAttachPictureUpdate']())return;const _0x11346e=this['_character'][_0x4df11b(0x53c)]();this[_0x4df11b(0x512)]=_0x11346e['filename'],this[_0x4df11b(0x5be)]=_0x11346e[_0x4df11b(0x36f)],this[_0x4df11b(0x319)]=_0x11346e['maxSize'],this['_lastAttachPictureScale']=_0x11346e[_0x4df11b(0x1ab)];if(_0x11346e[_0x4df11b(0x3ea)]!==''){if(_0x11346e['type']===_0x4df11b(0x30c)){const _0x2d3893=ImageManager[_0x4df11b(0x59a)](_0x11346e[_0x4df11b(0x3ea)]);_0x2d3893[_0x4df11b(0x2ff)](this[_0x4df11b(0x263)][_0x4df11b(0x433)](this,_0x2d3893));}else{if(_0x11346e[_0x4df11b(0x36f)]===_0x4df11b(0x660)){const _0x1558d0=ImageManager[_0x4df11b(0x394)](_0x11346e[_0x4df11b(0x3ea)]);_0x1558d0['addLoadListener'](this[_0x4df11b(0x263)][_0x4df11b(0x433)](this,_0x1558d0));}else{const _0x10b0ef=ImageManager['loadPicture'](_0x11346e[_0x4df11b(0x3ea)]);_0x10b0ef[_0x4df11b(0x2ff)](this[_0x4df11b(0x263)][_0x4df11b(0x433)](this,_0x10b0ef));}}}else this['_attachPictureSprite']['bitmap']=new Bitmap(0x1,0x1);},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x43d)]=function(){const _0x33dc54=_0x17c4f7,_0x135736=this[_0x33dc54(0x25b)];_0x135736['x']=this[_0x33dc54(0x2cf)][_0x33dc54(0x259)](),_0x135736['y']=this[_0x33dc54(0x2cf)][_0x33dc54(0x2f9)](),_0x135736['blendMode']=this[_0x33dc54(0x2cf)][_0x33dc54(0x4f5)]();},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x234)]=function(){const _0x38f2a1=_0x17c4f7,_0x59bb9d=this[_0x38f2a1(0x2cf)][_0x38f2a1(0x53c)]();if(_0x59bb9d){if(this[_0x38f2a1(0x512)]!==_0x59bb9d[_0x38f2a1(0x3ea)])return!![];if(this[_0x38f2a1(0x5be)]!==_0x59bb9d['type'])return!![];if(this[_0x38f2a1(0x319)]!==_0x59bb9d[_0x38f2a1(0x2d2)])return!![];if(this['_lastAttachPictureScale']!==_0x59bb9d['scale'])return!![];}return![];},Sprite_Character['prototype'][_0x17c4f7(0x263)]=function(_0x41b4b8){const _0x346b0b=_0x17c4f7,_0x31e6a6=this[_0x346b0b(0x25b)];_0x31e6a6[_0x346b0b(0x27f)]=_0x41b4b8;const _0x5e68de=this['_character']['attachPictureSettings'](),_0x418c29=_0x5e68de[_0x346b0b(0x2d2)],_0x1ae3a8=_0x5e68de[_0x346b0b(0x1ab)];let _0x5ae480=0x1;if(_0x418c29>0x0){let _0x315e97=this[_0x346b0b(0x3b7)]()||0x1,_0x2e3b23=this[_0x346b0b(0x1b4)]()||0x1;const _0x54d901=Math[_0x346b0b(0x236)](0x1,_0x315e97,_0x2e3b23);_0x5ae480=_0x418c29/_0x54d901;}_0x5ae480*=_0x1ae3a8,_0x5ae480!==0x1&&(this[_0x346b0b(0x25b)][_0x346b0b(0x27f)][_0x346b0b(0x5a9)]=!![]),_0x31e6a6[_0x346b0b(0x1ab)]['x']=_0x5ae480,_0x31e6a6[_0x346b0b(0x1ab)]['y']=_0x5ae480,this['visible']=!![],this[_0x346b0b(0x43d)]();},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x3b7)]=function(){const _0x20f4ab=_0x17c4f7,_0x3aabad=this[_0x20f4ab(0x25b)];if(!_0x3aabad)return 0x0;return _0x3aabad[_0x20f4ab(0x27f)][_0x20f4ab(0x288)];},Sprite_Character[_0x17c4f7(0x4ae)][_0x17c4f7(0x1b4)]=function(){const _0xf8f144=_0x17c4f7,_0x4ade40=this[_0xf8f144(0x25b)];if(!_0x4ade40)return 0x0;return _0x4ade40['bitmap']['height'];},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x1dd)]=Sprite_Balloon[_0x17c4f7(0x4ae)][_0x17c4f7(0x1a1)],Sprite_Balloon[_0x17c4f7(0x4ae)]['setup']=function(_0x3fb23d,_0x329b9b){const _0x24caa0=_0x17c4f7;VisuMZ[_0x24caa0(0x4f2)]['Sprite_Balloon_setup'][_0x24caa0(0x494)](this,_0x3fb23d,_0x329b9b),VisuMZ['EventsMoveCore'][_0x24caa0(0x2fe)][_0x24caa0(0x474)]['AutoBalloon']&&this[_0x24caa0(0x19f)][_0x24caa0(0x2cf)]['setBalloonPose'](_0x329b9b,this[_0x24caa0(0x321)]);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x4bb)]=Sprite_Balloon[_0x17c4f7(0x4ae)][_0x17c4f7(0x1ae)],Sprite_Balloon[_0x17c4f7(0x4ae)][_0x17c4f7(0x1ae)]=function(){const _0x47f395=_0x17c4f7;VisuMZ[_0x47f395(0x4f2)][_0x47f395(0x4bb)]['call'](this),this[_0x47f395(0x4ad)]();},Sprite_Balloon[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ad)]=function(){const _0xc6f8f0=_0x17c4f7;this[_0xc6f8f0(0x19f)][_0xc6f8f0(0x2cf)]['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0xc6f8f0(0x4f2)][_0xc6f8f0(0x2fe)][_0xc6f8f0(0x474)][_0xc6f8f0(0x1a6)],this['y']+=VisuMZ['EventsMoveCore'][_0xc6f8f0(0x2fe)][_0xc6f8f0(0x474)][_0xc6f8f0(0x5ac)]);},Sprite_Timer[_0x17c4f7(0x4ae)]['createBitmap']=function(){const _0x5eb357=_0x17c4f7;this[_0x5eb357(0x27f)]=new Bitmap(Math[_0x5eb357(0x574)](Graphics['boxWidth']/0x2),0x30),this[_0x5eb357(0x27f)][_0x5eb357(0x2cb)]=this[_0x5eb357(0x2cb)](),this[_0x5eb357(0x27f)][_0x5eb357(0x410)]=this[_0x5eb357(0x410)](),this[_0x5eb357(0x27f)][_0x5eb357(0x31c)]=ColorManager[_0x5eb357(0x31c)]();},Sprite_Timer[_0x17c4f7(0x4ae)][_0x17c4f7(0x4e8)]=function(){const _0x3b4088=_0x17c4f7,_0x1da027=Math[_0x3b4088(0x564)](this[_0x3b4088(0x43a)]/0x3c/0x3c),_0x3e0e27=Math[_0x3b4088(0x564)](this['_seconds']/0x3c)%0x3c,_0x85aa3c=this[_0x3b4088(0x43a)]%0x3c;let _0x295959=_0x3e0e27['padZero'](0x2)+':'+_0x85aa3c[_0x3b4088(0x5c5)](0x2);if(_0x1da027>0x0)_0x295959=_0x3b4088(0x4cf)[_0x3b4088(0x63e)](_0x1da027,_0x295959);return _0x295959;};function Sprite_EventLabel(){const _0x430b1f=_0x17c4f7;this[_0x430b1f(0x65f)](...arguments);}Sprite_EventLabel['prototype']=Object[_0x17c4f7(0x441)](Sprite[_0x17c4f7(0x4ae)]),Sprite_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x311)]=Sprite_EventLabel,Sprite_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x65f)]=function(_0x525b84){const _0x35f2a3=_0x17c4f7;this[_0x35f2a3(0x32f)]=_0x525b84,Sprite[_0x35f2a3(0x4ae)][_0x35f2a3(0x65f)][_0x35f2a3(0x494)](this),this[_0x35f2a3(0x66e)](),this[_0x35f2a3(0x49d)]();},Sprite_EventLabel['prototype'][_0x17c4f7(0x66e)]=function(){const _0x186271=_0x17c4f7;this[_0x186271(0x2dd)]['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x17c4f7(0x4ae)]['createProxyWindow']=function(){const _0x3a0e27=_0x17c4f7,_0x1e57b3=new Rectangle(0x0,0x0,0x1,0x1);this[_0x3a0e27(0x284)]=new Window_Base(_0x1e57b3),this[_0x3a0e27(0x284)][_0x3a0e27(0x516)]=0x0,this[_0x3a0e27(0x4e4)]=this['isLabelVisible']()?0xff:0x0;},Sprite_EventLabel['prototype'][_0x17c4f7(0x420)]=function(){const _0x134a6e=_0x17c4f7;Sprite[_0x134a6e(0x4ae)][_0x134a6e(0x420)]['call'](this),this[_0x134a6e(0x403)](),this['updateScale'](),this[_0x134a6e(0x1ae)](),this['updateOpacity'](),this['updateHueShift']();},Sprite_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x403)]=function(){const _0x156d9d=_0x17c4f7;this[_0x156d9d(0x32f)][_0x156d9d(0x332)]()!==this[_0x156d9d(0x501)]&&(this['_text']=this[_0x156d9d(0x32f)][_0x156d9d(0x332)](),this[_0x156d9d(0x1ba)]());},Sprite_EventLabel['prototype']['refresh']=function(){const _0x578724=_0x17c4f7;if(!this[_0x578724(0x284)])return;this[_0x578724(0x3ef)](),this[_0x578724(0x372)]();},Sprite_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x3ef)]=function(){const _0x16091f=_0x17c4f7,_0x15fc02=this['_proxyWindow'][_0x16091f(0x250)](this[_0x16091f(0x501)]),_0x41f27d=this[_0x16091f(0x284)][_0x16091f(0x2a7)](),_0x3e6cd9=_0x15fc02[_0x16091f(0x288)]+_0x41f27d*0x2,_0x2fac82=_0x15fc02[_0x16091f(0x626)];this[_0x16091f(0x284)][_0x16091f(0x4c1)](0x0,0x0,_0x3e6cd9,_0x2fac82),this[_0x16091f(0x284)]['createContents'](),this['bitmap']=this['_proxyWindow'][_0x16091f(0x30b)];},Sprite_EventLabel['prototype']['drawText']=function(){const _0x2613c9=_0x17c4f7,_0x587f5c=this['_proxyWindow']['itemPadding']();this[_0x2613c9(0x284)][_0x2613c9(0x24d)](this[_0x2613c9(0x501)],_0x587f5c,0x0);},Sprite_EventLabel['prototype'][_0x17c4f7(0x5cb)]=function(){const _0x553bb5=_0x17c4f7,_0x286c9f=VisuMZ[_0x553bb5(0x4f2)][_0x553bb5(0x2fe)][_0x553bb5(0x34f)][_0x553bb5(0x614)],_0x451d94=$gameSystem[_0x553bb5(0x268)]()||0x1;this[_0x553bb5(0x1ab)]['x']=this[_0x553bb5(0x1ab)]['y']=_0x286c9f/_0x451d94;},Sprite_EventLabel['prototype'][_0x17c4f7(0x1ae)]=function(){const _0xd41b9c=_0x17c4f7;if(!SceneManager[_0xd41b9c(0x622)])return;if(!SceneManager[_0xd41b9c(0x622)][_0xd41b9c(0x1fa)])return;const _0xb9b0bc=SceneManager['_scene'][_0xd41b9c(0x1fa)][_0xd41b9c(0x540)](this[_0xd41b9c(0x32f)]);if(!_0xb9b0bc)return;this['x']=this['_event'][_0xd41b9c(0x530)](),this['x']+=this['_event'][_0xd41b9c(0x5c4)][_0xd41b9c(0x48b)];if(_0xb9b0bc[_0xd41b9c(0x512)]){const _0xc24a4=_0xb9b0bc[_0xd41b9c(0x25b)];this['y']=this[_0xd41b9c(0x32f)]['screenY']()-_0xc24a4[_0xd41b9c(0x626)]*_0xc24a4[_0xd41b9c(0x1ab)]['y'];}else this['y']=this[_0xd41b9c(0x32f)]['screenY']()-_0xb9b0bc[_0xd41b9c(0x626)]*_0xb9b0bc['scale']['y'];this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0xd41b9c(0x32f)][_0xd41b9c(0x5c4)]['offsetY'];},Sprite_EventLabel['prototype'][_0x17c4f7(0x558)]=function(){const _0x29de0c=_0x17c4f7;if(this[_0x29de0c(0x1d8)]())this['opacity']+=this['opacitySpeed']();else SceneManager['_scene'][_0x29de0c(0x2d3)]>0x0?this[_0x29de0c(0x4e4)]=0x0:this[_0x29de0c(0x4e4)]-=this[_0x29de0c(0x64f)]();},Sprite_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x2b2)]=function(){const _0x5b8020=_0x17c4f7;if(this[_0x5b8020(0x1d8)]()&&this['_event']&&this[_0x5b8020(0x32f)]['_labelWindow'][_0x5b8020(0x3f7)]){const _0x538046=this[_0x5b8020(0x581)]+(this['_event'][_0x5b8020(0x5c4)][_0x5b8020(0x3f7)]||0x0);this[_0x5b8020(0x2b3)](_0x538046);}},Sprite_EventLabel['prototype'][_0x17c4f7(0x1d8)]=function(){const _0x2f141e=_0x17c4f7;if(!$gameSystem[_0x2f141e(0x42e)]())return![];if(this[_0x2f141e(0x32f)]?.[_0x2f141e(0x54e)])return![];if(this[_0x2f141e(0x32f)]&&this[_0x2f141e(0x32f)][_0x2f141e(0x49e)]<0x0)return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0xeefc2d=$gamePlayer['x'],_0x3fb255=$gamePlayer['y'],_0x1f483f=this[_0x2f141e(0x32f)]['x'],_0x36eb3d=this[_0x2f141e(0x32f)]['y'];if(this[_0x2f141e(0x289)]===_0xeefc2d&&this['_visiblePlayerY']===_0x3fb255&&this[_0x2f141e(0x23b)]===_0x1f483f&&this['_visibleEventY']===_0x36eb3d)return this[_0x2f141e(0x64b)];this[_0x2f141e(0x289)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x2f141e(0x23b)]=this['_event']['x'],this[_0x2f141e(0x29d)]=this[_0x2f141e(0x32f)]['y'];if($gameMap[_0x2f141e(0x472)](_0xeefc2d,_0x3fb255,_0x1f483f,_0x36eb3d)>this[_0x2f141e(0x32f)][_0x2f141e(0x3e9)]())return this[_0x2f141e(0x64b)]=![],![];return this[_0x2f141e(0x64b)]=!![],!![];},Sprite_EventLabel['prototype'][_0x17c4f7(0x64f)]=function(){const _0xd6994b=_0x17c4f7;return VisuMZ[_0xd6994b(0x4f2)][_0xd6994b(0x2fe)][_0xd6994b(0x34f)]['OpacitySpeed'];};function _0x308c(_0x353357,_0x483c59){const _0x33b4be=_0x33b4();return _0x308c=function(_0x308c56,_0x3f4f4c){_0x308c56=_0x308c56-0x190;let _0x3d6fa7=_0x33b4be[_0x308c56];return _0x3d6fa7;},_0x308c(_0x353357,_0x483c59);}function Sprite_VisuMz_MessagePopup(){const _0x16e27b=_0x17c4f7;this[_0x16e27b(0x65f)](...arguments);}function _0x33b4(){const _0x284e3f=['Game_Interpreter_PluginCommand','gainFrames','jump','isInstanceOfSceneMap','hasEncounterNone','SpawnEventDespawnRegions','Step2MapId','clearSelfTarget','endAngle','_lastAttachPictureType','startMapCommonEventOnTouch','_starting','deltaY','PlayerMovementChange','Game_Event_start','_labelWindow','padZero','processMoveRouteStepTo','isSpawnHitboxCollisionOk','_alwaysUpdateMove','_eventSpawnData','isEventsMoveCoreInvisible','updateScale','Game_Switches_value','PopupExtra','Game_CharacterBase_isDashing','Scene_Boot_onDatabaseLoaded','LIGHT-BULB','updateVisibility','Rope','frontY','Self\x20Variable\x20%1','Game_Event_moveTypeRandom','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','updateAttachPictureSprite','makeDeepCopy','startScaleY','_eventOverloadThreshold','_eventCopyData','pageId','setPosition','Direction','FollowerSetControl','ARRAYSTR','TiltLeft','processSaveEventLocation','resetFontSettings','10705977LVOeyx','terrainTag','%1,%2,','setMoveRoute','processMoveSynchReverseMimic','_eventLabelOffsetY','fadeDuration','setDiagonalDirection','processMoveSynchMimic','isAdvancedVariable','processMoveRouteSetIndex','meetActivationRegionConditions','Game_Vehicle_initMoveSpeed','forceMoveRoute','Game_System_initialize','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_forceShowPlayer','updateDuration','horz\x20mirror','tileWidth','visible','events','stop','Game_CharacterBase_opacity','_SavedEventLocations','_PlayerDiagonalSetting','SwitchGetSelfSwitchID','_pose','_counter','isPlaytest','createCharacterShadow','characterIndex','_startX','processMoveRouteMoveToCharacter','Game_CharacterBase_screenX','_selfTargetItemChoice','clearPose','drawIcon','deltaXFrom','setupSpawnedEvents','_fadeInDuration','isAnyEventStarting','setupPageSettings','setCommonEvent','endOffsetY','PreCopyJS','OpacitySpeed','SPIN\x20COUNTERCLOCKWISE','FontSize','FastForwardKey','STR','_encounterHalfProximity','isInVehicle','_realX','EventLocationSave','resume','_spriteOffsetX','Step2EventId','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','SPIN\x20CLOCKWISE','determineEventOverload','splice','_scene','ROUTE_SCRIPT','isTriggerIn','startCallEvent','height','boxWidth','shiftY','EnableDashTilt','_startScaleX','EventTimerFramesSet','%1,','isShadowVisible','_targetX','clearStepPattern','EventIconChange','SpawnEventAtXY','pow','string','DashOnLadder','_waitMode','min','prepareSpawnedEventAtRegion','Game_Player_getInputDirection','_isObjectCharacter','EVAL','DashingEnable','_eventId','registerSelfTarget','format','CommonEventID','setupEventsMoveCoreCommentTags','bufferY','isMapSwitch','offsetY','973048nTPnvK','clear','HEART','MOBILE_DIAGONAL_PATHFINDING','attachPictureMaxSize','processMoveRouteTeleportTo','getSelfTarget','_cacheVisibility','_moveSynch','iconIndex','loadDataFile','opacitySpeed','Vehicle','_activationProximityAutoTriggerBypass','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','_attachPicture','chaseCharacter','version','_cpc','roundX','VehicleDock','autoEventIconBuffer','erase','setupFollowerVisibilityOverrides','variableId','setCharacterSpriteSheetInvisible','setMoveSpeed','initialize','sv\x20enemy','_hidden','FALSE','unlock','VisuMZ_0_CoreEngine','isWorking','Game_Map_parallelCommonEvents','MapID','setOpacity','initEventsMoveCoreSettings','Walk','setStopFollowerChasing','ADDITIVE','_forceDashing','initMembers','Game_Followers_jumpAll','setupDiagonalSupport','description','clearCarrying','getEventIconIndex','refreshBushDepth','Preserve','DiagonalSpeedMultiplier','setupEventsMoveCoreEffects','isBoat','LOWER\x20LEFT','processMoveRouteJumpForward','isEventRunning','updateStop','_inputTime','_target','StopAutoMoveEvents','setup','checkSmartEventCollision','isRegionForbidPass','custom','value','BalloonOffsetX','processDrawIcon','pause','EventIconRestore','_lastSesetExitSelfSwitchesMapId','scale','isSceneMap','1921506hbgSti','updatePosition','backX','setDashingEnabled','setWaitMode','characterPatternY','processMoveRouteJumpTo','getAttachPictureBitmapHeight','MsgDuration','Game_CharacterBase_direction','PostCopyJS','updateEventMirrorSprite','updateTileFrame','refresh','SLEEP','Frames','Game_CharacterBase_screenY','ANNOYED','text','Game_CharacterBase_setDirection','clearDestination','map','5qYwNbf','1221TBZyJk','isValid','SpawnEventDespawnTerrainTags','isTurnInPlace','Letter','SelfSwitchID','Game_CommonEvent_isActive','10uKakrI','setBackgroundType','processMoveCommandEventsMoveCore','isPlayerControlDisabled','isBattleTest','processMoveSynchCustom','%1Dock','updateEventsMoveCoreTagChanges','Window_NumberInput_processOk','randomInt','isCollidedWithPlayerCharacters','ZZZ','VehicleAllow','isLabelVisible','turnAwayFromPoint','setFrame','Game_Player_checkEventTriggerThere','isAirship','Sprite_Balloon_setup','COLLAPSE','despawnTerrainTags','_characterSprites','DEFAULT_SHIFT_Y','prepareSpawnedEventAtXY','vertical\x20mirror','morphIntoTemplate','pluginCommandCallEvent','EventAutoMovement','deleteEventLocation','_selfTarget','_pattern','setEventLabelsVisible','_isCharacterSpriteSheetInvisible','_moveRouteIndex','Game_Timer_stop','convertVariableValuesInScriptCall','innerWidth','split','MULTIPLY','getEventIconData','createSaveEventLocationData','setLastPluginCommandInterpreter','isPlayerForceShown','75424bLgnnn','moveStraight','isEventOverloaded','setCharacterBitmap','_spriteset','player','duration','horizontal\x20mirror','none','endOffsetX','Game_Character_processMoveCommand','SelfSwitches','createEventsMoveCoreTileMessagePopup','FollowerReset','hasDragonbones','_reflection','list','hasAdvancedSwitchVariable','VariableGetSelfVariableID','isJumping','Setting','startsWith','variables','Game_Message_add','_selfEvent','useCarryPoseForIcons','executeCommandCommonEvent','RandomMoveWeight','_visiblePlayerY','removeChild','log','isEmptyCharacter','return\x20%1','getPlayerDiagonalSetting','processMoveSynchDirection','Region','areFollowersForceShown','CustomPageConditions','checkValidEventerMap','Toggle','getDirectionFromPoint','blendMode','DashModifier','iconWidth','executeMoveDir8','_spawnPreserved','ANGER','2082iwzJrh','moveByInput','bufferX','away','regionList','default','_screenZoomScale','reserveCommonEvent','Value','isMapVariable','spriteId','characterName','isPlayerWithinEncounterNoneEvents','startMessage','includes','needsAttachPictureUpdate','Airship','max','activationRegionList','pattern','_stepPattern','isDiagonalDirection','_visibleEventX','circle','createSpawnedEvent','isDashDisabled','increaseSteps','vert\x20mirror','DOWN','setupCopyEvent','Game_CharacterBase_update','_eventOverload','onLoadSuccess','processMoveRouteTeleportToCharacter','keys','onMapLoaded','executeCommand','switches','PosX','Seconds','drawTextEx','note','iconHeight','textSizeEx','_expireCommonEvent','areFollowersForceHidden','ARRAYSTRUCT','isDashingAndMoving','Scene_Map_onMapLoadedEncErase','fittingHeight','SpawnEventDespawnEverything','deleteIconsOnEventsData','attachPictureOffsetX','_needsRefresh','_attachPictureSprite','Event','_clickTrigger','requestMapLoadCommonEvents','turn180','jumpAll','toLowerCase','canUpdate','onLoadAttachPicture','_randomMoveWeight','opacityDelta','switch2Id','delta','mainFontSize','turnTowardPoint','lock','EXCLAMATION','Allow','encounterProximityType','Game_Switches_setValue','updatePatternEventsMoveCore','getPosingCharacterIndex','mirror\x20vert','EventIconChangeForced','HURT','setupSaveEventLocations','isPlayerForceHidden','setSelfValue','RIGHT\x20TO\x20LEFT','charAt','Game_Follower_chaseCharacter','updateMoveSynchDirection','RemovePreserve','updateWaitMode','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','isTransparent','bitmap','pageIndex','isStopFollowerChasing','indexOf','_EventsMoveCoreSettings','_proxyWindow','RegionOk','setupSpawnTest','Scene_Map_startEncounterEffect','width','_visiblePlayerX','SpawnEventAtRegion','createDummyWindow','isActive','_offsetX','_direction','shadowFilename','Movement','USER-DEFINED\x205','checkExistingEntitiesAt','getLastPluginCommandInterpreter','ccwX','moveForward','isEventTest','add','isMovementSucceeded','setTileBitmap','shadowY','lastMovedDirection','isSpriteVS8dir','_visibleEventY','onClickTrigger','updatePose','_selfTargetNumberInput','MsgPopupEvent','_spriteOffsetY','checkCollisionKeywords','IconBlendMode','isRegionAllowPass','frontX','itemPadding','processMoveRouteMoveTo','checkRegionEventTrigger','spawnPreserved','Sprite_Character_characterPatternY','updatePeriodicRefresh','MsgPopupFollower','ARRAYFUNC','CPC','PostSpawnJS','_customZ','updateHueShift','setHue','_needsPeriodicRefresh','Enable','TerrainTags','selfValue','Visible','Game_Player_executeMove','_filename','slice','checkEventsMoveCoreStringTags','_startY','setupEventsMoveCoreNotetags','lineHeight','_encounterNoneProximity','PreloadedMaps','IconSet','trigger','NORMAL','clearPageSettings','createLabelWindows','Arc','7gBFdvI','command357','processOk','fontFace','MoveAllSynchTargets','return\x200','USER-DEFINED\x202','_character','Game_Event_isCollidedWithPlayerCharacters','moveTowardCharacter','maxSize','_encounterEffectDuration','CallEvent','updateSpritePosition','EventForbid','locate','Game_Followers_isVisible','Game_Event_checkEventTriggerAuto','meetsConditions','isDashingEnabled','ARRAYEVAL','anchor','Dock','LIGHTBULB','CarryPose','_labelWindows','_followerChaseOff','OperateValues','setPattern','EventTimerFramesGain','despawnEventId','reverse','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','Game_Temp_setDestination','TiltVert','hasStepAnime','processMoveRouteAnimation','frameCount','Scene_Load_onLoadSuccess','turnTowardCharacter','correctFacingDirection','EventLocationDelete','moveSynchTarget','_arcPeak','toUpperCase','eventsXy','Game_Party_hasEncounterNone','AirshipSpeed','lastSpawnedEventID','attachPictureOffsetY','Game_Interpreter_executeCommand','MUSICNOTE','enable','SpawnEventAtTerrainTag','Settings','addLoadListener','_eventScreenX','setupSpawn','_characterIndex','characterIndexVS8','followers','AdvancedVariables','Game_Player_increaseSteps','_followerControlID','LEFT','blt','isVisible','contents','enemy','SelfDataResetAll','Game_Variables_setValue','delay','FRUSTRATION','constructor','Game_Event_initialize','AllForbid','prepareSpawnedEventAtTerrainTag','_trigger','isPosing','Passability','SCREEN','_lastAttachPictureMaxSize','_forceShowFollower','processMoveSynchMirrorHorz','outlineColor','screenY','restoreIconsOnEventsDataKey','isLandOk','Game_Map_setup','_duration','Game_Event_event','addChild','checkEventTriggerHere','_offsetY','spawnEventId','meetsSwitchCondition','processMoveSynchMirrorVert','Step1EventId','Game_Timer_initialize','iconSize','_working','JSON','backY','_event','_callEventData','registerCommand','labelWindowText','QUESTION','WalkAllow','parameters','needsUpdate','isShadowShrink','_PreservedEventMorphData','getDirectionToPoint','EventLabelRefresh','Game_Player_checkEventTriggerHere','BoatSpeed','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','EventIconDelete','switch1Id','Game_Event_meetsConditionsCPC','processMoveRoutePatternLock','_commonEvents','updateTextScale','WalkForbid','hasEventIcon','setDirection','Button','MsgPopupTargetTile','encounterProximityDistance','processEraseEncounterEvents','_targetScaleX','setPose','getDiagonalDestination','onChange','Label','Window_ScrollText_startMessage','lastSpawnedEvent','OffsetX','EventId','isPreventSelfMovement','Game_Event_findProperPageIndex','Game_Enemy_meetsSwitchCondition','SuccessSwitchId','NUM','regionId','isShip','_scaleY','dashSpeedModifier','Game_Interpreter_character','VICTORY','_fadeOutStart','_scaleBaseX','Game_SelfSwitches_value','updateScaleBase','checkActivationProximity','Game_CharacterBase_initMembers','front','Speed','setChaseOff','createEventsMoveCoreMessagePopup','onExpire','List','_commonEventId','Hours','LIGHT','VisuMZ_Setup_Preload_Map','type','checkEventTriggerThere','createDisplayObjects','drawText','_interpreter','Name','LIGHT\x20BULB','_saveEventLocations','forceCarrying','Region%1','LOVE','hasClickTrigger','eventsXyNt','Game_Interpreter_updateWaitMode','boat','SlowerSpeed','processMoveSynchApproach','getMapSpawnedEventData','_currentArc','adjustDir8MovementSpeed','activationProximityType','SPIN\x20ACW','processMoveRouteStepToCharacter','UPPER\x20LEFT','Map%1.json','left','updateShadowChanges','GetMoveSynchTarget','processMoveSynchRandom','isMoving','_forceHideFollower','changeSpeed','endScaleY','Game_Vehicle_isLandOk','setDestination','findDirectionTo','MessageText','loadSvEnemy','MUSIC\x20NOTE','Game_Message_setItemChoice','attachPictureType','attachPictureFilename','turnRight90','initEventsMoveCoreEffects','updateEventLabelText','region','setupPlayerVisibilityOverrides','isSaveEventLocation','MoveRouteIndex','_tileExpand','hasCPCs','length','_chaseOff','ShiftY','roundYWithDirection','clearEventCache','updateShadow','moveAwayFromPoint','standing','characterPatternYBasic','_addedHitbox','Game_CharacterBase_increaseSteps','isNearTheScreen','_mirrorSprite','onOk','findProperPageIndex','createShadows','getPreservedMorphEventData','patternHeight','createLabelWindowForTarget','%1DockRegionOnly','isOnRope','getAttachPictureBitmapWidth','rotation','pages','Game_Character_setMoveRoute','VisuMZ_2_DragonbonesUnion','getTileExpandData','createSpawnedEventWithData','Game_Map_event','Map%1-Event%2','advancedFunc','processEraseEncounterSpawn','Window_EventItem_onCancel','deleteIconsOnEventsDataKey','_startAngle','target','Game_Event_clearPageSettings','isAirshipPassable','isSpawnedEvent','morphInto','FollowerSetTargetChase','Sprite_Character_update','setEventIconDataKey','Game_CharacterBase_hasStepAnime','characterPatternYVS8','saveEventLocation','radius','isBusy','AutoBuffer','PlayerAllow','COBWEB','meetActivationProximityConditions','referEvent','copy','_eventCache','Player','processMoveSynch','Game_CharacterBase_pattern','checkEventTriggerEventsMoveCore','USER-DEFINED\x203','TOGGLE','getPosingCharacterPattern','concat','setupMorphEvent','mirror\x20vertical','setBalloonPose','resetIconsOnEventsDataKey','canPassDiagonally','updateSaveEventLocation','Game_Map_events','_eventLabelOffsetX','labelWindowRange','filename','checkEventProximity','process_VisuMZ_EventsMoveCore_Switches_Variables','_tilemap','startOffset','resizeWindow','updateTextPosition','drawing','findDiagonalDirectionTo','TiltRight','Game_CharacterBase_isTransparent','2135832tykfxD','createShadow','hueShift','Game_Event_updateParallel','isPassableByAnyDirection','Game_Character_forceMoveRoute','despawnEverything','_eventIconSprite','startScale','Self\x20Switch\x20%1','airship','_targetAngle','Game_Player_isMapPassable','zoomScale','updateText','EventTimerExpireEvent','updateMoveSynch','RegionTouch','parallelCommonEvents','IconBufferY','Disable','KNEEL','Game_Timer_start','direction','updateTilt','resetExitSelfSwitches','MapSwitches','fontSize','setNumberInput','_spawnedEvents','Game_Event_locate','deltaX','eventId','getInputDirection','directionOnLadderSpriteVS8dir','end','RegionOkTarget','Game_Timer_onExpire','isTargetEventValidForLabelWindow','Minutes','isSupportDiagonalMovement','isAdvancedSwitch','_eventScreenY','update','EnableDir8','scrolledY','SelfSwitchABCD','TileY','pos','isPassable','SWEAT','refreshIfNeeded','onCancel','_periodicRefreshTimer','_poseDuration','square','EventTimerSpeed','eventLabelsVisible','Game_CharacterBase_bushDepth','147YtqDXK','getPosingCharacterDirection','_callEventMap','bind','parent','AllAllow','_spawnData','setValue','_regionRules','Game_Message_setNumberInput','_seconds','right','TileX','updateAttachPictureBitmap','fadeIn','parse','CPCsMet','create','Game_CharacterBase_canPass','processMoveRouteFadeOut','USER-DEFINED\x204','visibleRange','isRegionDockable','getSavedEventLocation','isEventClickTriggered','UNTITLED','some','FollowerID','random','PathfindMobileEnabled','createTextSprite','Sprite_Character_initMembers','hasEncounterHalf','PosY','_randomHomeX','MorphEventTo','Step2Preserve','moveSynchType','hasMoveOnlyRegions','_opacity','switchId','_moveAllowPlayerCollision','defaultFontSize','updateMove','mirror\x20horizontal','_paused','FUNC','filter','Spriteset_Map_createShadow','arc','_type','hideShadows','destinationX','OFF','IconIndex','command108','approach','restoreSavedEventPosition','Game_Map_unlockEvent','push','start','isAutoBufferIcon','MobileEnabled','startEncounterEffect','ship','checkAdvancedSwitchVariablePresent','absDistance','onDatabaseLoaded','VS8','updateFadeOut','meetsCPC','%1Allow','NOTE','isInvisibleCharacter','row','convertSelfVariableValuesInScriptCall','FollowerSetGlobalChase','Boat','_diagonalSupport','updateParallel','_checkEncounterRaw','Chase','variableValid','canStartLocalEvents','isDashing','trim','Map\x20%1\x20Switch\x20%2','checkEventTriggerAuto','BufferX','processMoveRouteJumpToCharacter','isMapPassable','offsetX','Scene_Map_createDisplayObjects','Game_CharacterBase_moveDiagonally','ARRAYJSON','_targetY','processMoveRouteMoveUntilStop','_forceCarrying','Game_Map_refresh','patternWidth','call','isPlayerWithinEncounterHalfEvents','reverse\x20mimic','_saveEventLocation','isPressed','removeTemporaryMapSpawnedEvents','tileCoordinates','Game_Map_setupEvents','reverseDir','createProxyWindow','_pageIndex','match','follower','PlayerMovementDiagonal','_cacheSystemVisible','moveBackToRandomHome','event','isOnLadder','_settings','_moveSpeed','Window_EventItem_onOk','distance','EventLocationCreate','MUSIC-NOTE','_lastPluginCommandInterpreter','updateVS8BalloonOffsets','prototype','setupRegionRestrictions','UPPER\x20RIGHT','BlendMode','_lastMovedDirection','MorphEventRemove','setEventIconData','MOBILE_EVENT_LABELS','posNt','Game_Event_setupPageSettings','clamp','MUSIC','vehicle','Sprite_Balloon_updatePosition','FavorHorz','forced','forceDashing','execute','_shadowGraphic','move','getInputDir8','_speed','windowPadding','_DisablePlayerControl','ITEM','TemplateName','BufferY','ALLOW_LADDER_DASH','setItemChoice','page','_randomHomeY','setMovementSuccess','character','%1:%2','_patternLocked','STRUCT','down','exit','adjustMoveSynchOpacityDelta','advancedValue','fadeOut','VisuMZ_1_MessageCore','_scaleX','Game_Follower_initialize','activationProximityDistance','Game_Player_isDashing','PreSpawnJS','ApplyPopupExtraSettings','setFrames','determineCommonEventsWithCPC','roundY','tileHeight','_requestSaveEventLocation','turnAwayFromCharacter','opacity','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','canMove','initFollowerController','timerText','endScaleX','updateTextAngle','isBigCharacter','_shadowSprite','clearDashing','requestRefresh','moveAwayFromCharacter','misc','$callEventMap','EventsMoveCore','Game_Map_isDashDisabled','deltaYFrom','attachPictureBlendMode','contentsOpacity','moveRouteIndex','Visibility','picture','Game_Map_update','attachPictureScale','Stop','TargetSwitchId','_eventPageIndex','_EventIcons','requestAnimation','_text','template','setAllowEventAutoMovement','VehicleForbid','VariableId','_targetScaleY','setupAttachPictureBitmap','isAllowCharacterTilt','processMoveRouteSelfVariable','angle','_checkRelocateNotetag','of\x20Preloaded\x20Maps.\x0a\x0a','...','EventID','registerSelfEvent','PageId','_eventMorphData','_lastAttachPictureFilename','isAllowEventAutoMovement','isSelfVariable','_wholeDuration','padding','resetSelfSwitchesForMap','_dummyWindow','PlayerIconChange','processMoveSynchAway','MapId','loadCPC','EventTemplates','Game_Troop_meetsConditionsCPC','processMoveRouteSelfSwitch','EventLabelVisible','MapVariables','VisibleRange','SILENCE','timer','Template','EventTimerExpireClear','ccwY','_forceHidePlayer','unlockEvent','_moveOnlyRegions','cwY','mimic','Map\x20%1\x20Variable\x20%2','createLowerLayer','processMoveRouteBalloon','screenX','mirror\x20horz','autosaveEventLocation','ARRAYNUM','executeCommonEvent','isSelfSwitch','_actuallyMoving','realMoveSpeed','bushDepth','%1%2','SpriteBased','PreloadMaps','attachPictureSettings','initMembersEventsMoveCore','Step1MapId','_textSprite','findTargetSprite','ConvertParams','setPlayerDiagonalSetting','_mapId','destroy','checkNeedForPeriodicRefresh','ShipSpeed','originalText','_characterName','FaceSynchAllSynchTargets','SelfVariables','roundXWithDirection','reverse\x20copy','endOffset','_erased','processMoveCommand','turnLeft90','PreMorphJS','executeMove','_CPCs','clearSpriteOffsets','abs','AdvancedSwitches','VisibleEventLabels','updateOpacity','_frames','startMapCommonEventOnOK','processMoveRouteMoveRepeat','_MapSpawnedEventData','despawnRegions','initEventsMoveCore','resetIconsOnEventsData','Game_Variables_value','TargetVariableId','_data','resetSelfSwitchesForEvent','floor','isNormalPriority','updateFadeIn','mapId','requestBalloon','createAttachPictureSprite','_activationProximity','BULB','endScale','startOffsetX','canPass','updateEventIconSprite','setControlledFollowerID','_stopCount','EventTimerResume','fadeInDuration','round','moveDiagonally','_scaleBaseY','Game_Vehicle_isMapPassable','name','_eventIcon','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_moveRoute','code','isRunning','shadowX','Window_Message_startMessage','replace','_hue','7524176ppRKNI','mapValue','setPlayerControlDisable','_startScaleY','PostMorphJS','firstSpawnedEventID','SPIN\x20CW','Game_SelfSwitches_setValue','createContents','_eventErased','processMoveRouteHugWall','IconBufferX','fadeOutDuration','despawnAtXY','metCPC','startMapCommonEventOnOKTarget','initMoveSpeed','moveTypeRandom','updateEventCustomZ','_advancedSwitchVariable','Game_CharacterBase_moveStraight','destinationY','processMoveRouteFadeIn','Icon','loadEnemy','shift','getControlledFollowerID','isTile','_fadeOutDuration','HMPH','deleteSavedEventLocation','SPIN\x20CCW','setMapValue','DefaultShadow','loadSystem','isCollidedWithEvents','deleteSavedEventLocationKey','RIGHT','eraseEvent','smooth','LOWER\x20RIGHT','DIAGONAL_PATHFINDING_EVENT_LIMIT','BalloonOffsetY','moveTowardPoint','TerrainTag','Hidden','isMoveOnlyRegionPassable','Collision','Sprite_Character_setTileBitmap','MsgPopupPlayer','clearAttachPictureSettings'];_0x33b4=function(){return _0x284e3f;};return _0x33b4();}Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)]=Object[_0x17c4f7(0x441)](Sprite[_0x17c4f7(0x4ae)]),Sprite_VisuMz_MessagePopup['prototype'][_0x17c4f7(0x311)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)]['initialize']=function(_0x3461c3){const _0x4bc70a=_0x17c4f7;this['_settings']=_0x3461c3,Sprite[_0x4bc70a(0x4ae)][_0x4bc70a(0x65f)][_0x4bc70a(0x494)](this),this['initMembers'](),this[_0x4bc70a(0x28b)](),this[_0x4bc70a(0x44e)](),this[_0x4bc70a(0x420)]();},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x66e)]=function(){const _0x6fbf70=_0x17c4f7;this[_0x6fbf70(0x321)]=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x1fc)],this[_0x6fbf70(0x515)]=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x1fc)],this['z']=0x6,this[_0x6fbf70(0x60c)]=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x5ea)][_0x6fbf70(0x43e)],this['_fadeInDuration']>0x0&&this['_fadeInDuration']>=Math['floor'](this[_0x6fbf70(0x321)]*0.48)&&(this[_0x6fbf70(0x60c)]=Math[_0x6fbf70(0x564)](this['_duration']*0.48)),this['opacity']=this[_0x6fbf70(0x60c)]>0x0?0x0:0xff,this[_0x6fbf70(0x59e)]=this['_settings'][_0x6fbf70(0x5ea)][_0x6fbf70(0x4d6)],this['_fadeOutDuration']>0x0&&this[_0x6fbf70(0x59e)]>=Math[_0x6fbf70(0x564)](this[_0x6fbf70(0x321)]*0.48)&&(this['_fadeOutDuration']=Math[_0x6fbf70(0x564)](this[_0x6fbf70(0x321)]*0.48)),this[_0x6fbf70(0x35f)]=this[_0x6fbf70(0x59e)],this['_startX']=this['_settings'][_0x6fbf70(0x3ee)]['x'],this['_startY']=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x3ee)]['y'],this[_0x6fbf70(0x62e)]=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x54d)]['x'],this[_0x6fbf70(0x48f)]=this['_settings'][_0x6fbf70(0x54d)]['y'],this[_0x6fbf70(0x28d)]=this[_0x6fbf70(0x604)],this[_0x6fbf70(0x325)]=this['_startY'],this[_0x6fbf70(0x62a)]=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x3fd)]['x'],this[_0x6fbf70(0x585)]=this['_settings'][_0x6fbf70(0x3fd)]['y'],this[_0x6fbf70(0x34b)]=this[_0x6fbf70(0x4a6)][_0x6fbf70(0x56c)]['x'],this[_0x6fbf70(0x506)]=this[_0x6fbf70(0x4a6)]['endScale']['y'],this[_0x6fbf70(0x3c4)]=-this[_0x6fbf70(0x4a6)]['angle'][_0x6fbf70(0x46c)],this[_0x6fbf70(0x400)]=-this[_0x6fbf70(0x4a6)][_0x6fbf70(0x50a)][_0x6fbf70(0x418)],this[_0x6fbf70(0x2f3)]=-this[_0x6fbf70(0x4a6)]['misc'][_0x6fbf70(0x461)],this['_currentArc']=0x0;},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)]['createDummyWindow']=function(){const _0xffde75=_0x17c4f7,_0x7c80df=this[_0xffde75(0x4a6)],_0x3758c5=new Rectangle(0x0,0x0,Graphics[_0xffde75(0x288)],Graphics['height']);this[_0xffde75(0x518)]=new Window_Base(_0x3758c5);const _0x186c6f=this[_0xffde75(0x518)]['textSizeEx'](_0x7c80df[_0xffde75(0x1bf)]),_0x96e695=_0x186c6f[_0xffde75(0x288)],_0x265dc5=_0x186c6f[_0xffde75(0x626)],_0x541421=_0x96e695+$gameSystem[_0xffde75(0x4c4)]()*0x2,_0x50df27=_0x265dc5+$gameSystem[_0xffde75(0x4c4)]()*0x2;this[_0xffde75(0x518)][_0xffde75(0x4c1)](0x0,0x0,_0x541421,_0x50df27),this[_0xffde75(0x518)][_0xffde75(0x58a)](),this[_0xffde75(0x518)][_0xffde75(0x24d)](_0x7c80df[_0xffde75(0x1bf)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x44e)]=function(){const _0x4c097c=_0x17c4f7;this[_0x4c097c(0x53f)]=new Sprite(),this[_0x4c097c(0x53f)][_0x4c097c(0x27f)]=this[_0x4c097c(0x518)]['contents'],this['_textSprite']['anchor']['x']=0.5,this[_0x4c097c(0x53f)][_0x4c097c(0x2dd)]['y']=0.5,this[_0x4c097c(0x53f)]['x']=this['_startX'],this['_textSprite']['y']=this[_0x4c097c(0x2bd)],this[_0x4c097c(0x53f)][_0x4c097c(0x1ab)]['x']=this[_0x4c097c(0x62a)],this['_textSprite'][_0x4c097c(0x1ab)]['y']=this[_0x4c097c(0x585)],this[_0x4c097c(0x53f)][_0x4c097c(0x50a)]=this[_0x4c097c(0x3c4)],this[_0x4c097c(0x323)](this[_0x4c097c(0x53f)]);},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)]=function(){const _0x2f34c4=_0x17c4f7;Sprite[_0x2f34c4(0x4ae)][_0x2f34c4(0x420)][_0x2f34c4(0x494)](this);if(!this[_0x2f34c4(0x262)]())return;this[_0x2f34c4(0x2d5)](),this[_0x2f34c4(0x3f0)](),this[_0x2f34c4(0x343)](),this[_0x2f34c4(0x4ea)](),this[_0x2f34c4(0x558)](),this[_0x2f34c4(0x5f5)]();},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x262)]=function(){const _0x2a5a34=_0x17c4f7;return!!this[_0x2a5a34(0x53f)];},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x2d5)]=function(){const _0xe7705b=_0x17c4f7,_0x2a2a50=this[_0xe7705b(0x4a6)];{const _0x59e5b9=$gameMap[_0xe7705b(0x5f7)](),_0x10b064=_0x2a2a50['tileCoordinates']['x'],_0x35449e=$gameMap['adjustX'](_0x10b064);this['x']=Math[_0xe7705b(0x564)](_0x35449e*_0x59e5b9+_0x59e5b9/0x2);}{const _0x217994=$gameMap[_0xe7705b(0x4e1)](),_0x47e211=_0x2a2a50['tileCoordinates']['y'],_0x4c6dd7=$gameMap['adjustY'](_0x47e211);this['y']=Math[_0xe7705b(0x564)](_0x4c6dd7*_0x217994+_0x217994);}},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x3f0)]=function(){const _0x2f147f=_0x17c4f7;if(this['_duration']<=0x0)return;const _0x161a6c=this[_0x2f147f(0x321)],_0x5bac9c=this[_0x2f147f(0x515)];{this[_0x2f147f(0x28d)]=(this[_0x2f147f(0x28d)]*(_0x161a6c-0x1)+this[_0x2f147f(0x62e)])/_0x161a6c,this[_0x2f147f(0x325)]=(this['_offsetY']*(_0x161a6c-0x1)+this[_0x2f147f(0x48f)])/_0x161a6c;}{const _0x3fdd82=_0x5bac9c-_0x161a6c,_0x31f48c=_0x5bac9c/0x2,_0x498840=this[_0x2f147f(0x2f3)],_0x1f882c=-_0x498840/Math[_0x2f147f(0x632)](_0x31f48c,0x2);this[_0x2f147f(0x381)]=_0x1f882c*Math[_0x2f147f(0x632)](_0x3fdd82-_0x31f48c,0x2)+_0x498840;}this['_textSprite']['x']=this[_0x2f147f(0x28d)],this['_textSprite']['y']=this[_0x2f147f(0x325)]+this[_0x2f147f(0x381)];},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x343)]=function(){const _0x33124f=_0x17c4f7;if(this[_0x33124f(0x321)]<=0x0)return;const _0x630bc7=this[_0x33124f(0x321)];this[_0x33124f(0x53f)]['scale']['x']=(this['_textSprite'][_0x33124f(0x1ab)]['x']*(_0x630bc7-0x1)+this[_0x33124f(0x34b)])/_0x630bc7,this[_0x33124f(0x53f)][_0x33124f(0x1ab)]['y']=(this[_0x33124f(0x53f)][_0x33124f(0x1ab)]['y']*(_0x630bc7-0x1)+this['_targetScaleY'])/_0x630bc7;},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ea)]=function(){const _0x49ec37=_0x17c4f7;if(this['_duration']<=0x0)return;const _0x3b33b8=this[_0x49ec37(0x321)];this['_textSprite'][_0x49ec37(0x50a)]=(this[_0x49ec37(0x53f)][_0x49ec37(0x50a)]*(_0x3b33b8-0x1)+this[_0x49ec37(0x400)])/_0x3b33b8;},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x558)]=function(){const _0x494850=_0x17c4f7;this[_0x494850(0x566)](),this[_0x494850(0x475)]();},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x566)]=function(){const _0x23330d=_0x17c4f7;if(this['_fadeInDuration']<=0x0)return;const _0x57508b=this[_0x23330d(0x60c)];this['opacity']=(this[_0x23330d(0x4e4)]*(_0x57508b-0x1)+0xff)/_0x57508b,this[_0x23330d(0x60c)]--,this[_0x23330d(0x60c)]<=0x0&&(this['opacity']=0xff);},Sprite_VisuMz_MessagePopup[_0x17c4f7(0x4ae)][_0x17c4f7(0x475)]=function(){const _0x4a8798=_0x17c4f7;if(this[_0x4a8798(0x59e)]<=0x0)return;if(this['_duration']>this['_fadeOutStart'])return;const _0x1c9a9b=this['_fadeOutDuration'];this[_0x4a8798(0x4e4)]=(this[_0x4a8798(0x4e4)]*(_0x1c9a9b-0x1)+0x0)/_0x1c9a9b,this[_0x4a8798(0x59e)]--,this['_fadeOutDuration']<=0x0&&(this[_0x4a8798(0x4e4)]=0x0);},Sprite_VisuMz_MessagePopup['prototype'][_0x17c4f7(0x5f5)]=function(){const _0x140d9c=_0x17c4f7;if(this[_0x140d9c(0x321)]<=0x0)return;this[_0x140d9c(0x321)]--;if(this['_duration']<=0x0){if(this['parent'])this[_0x140d9c(0x434)][_0x140d9c(0x213)](this);this[_0x140d9c(0x53f)][_0x140d9c(0x27f)]&&this['_textSprite'][_0x140d9c(0x27f)][_0x140d9c(0x544)]();}},VisuMZ[_0x17c4f7(0x4f2)]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x52e)],Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x52e)]=function(){const _0x4cba18=_0x17c4f7;VisuMZ[_0x4cba18(0x4f2)]['Spriteset_Map_createLowerLayer'][_0x4cba18(0x494)](this),this['createLabelWindows']();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x460)]=Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3f6)],Spriteset_Map[_0x17c4f7(0x4ae)]['createShadow']=function(){const _0x1fc639=_0x17c4f7;VisuMZ[_0x1fc639(0x4f2)][_0x1fc639(0x460)][_0x1fc639(0x494)](this),this['createShadows']();},Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3b1)]=function(){const _0x55edbd=_0x17c4f7;if(!VisuMZ['EventsMoveCore'][_0x55edbd(0x2fe)]['Movement']['ShowShadows'])return;for(const _0x181c68 of this[_0x55edbd(0x1e0)]){this[_0x55edbd(0x602)](_0x181c68);}},Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x602)]=function(_0x5482d9){const _0x5e555d=_0x17c4f7;_0x5482d9[_0x5e555d(0x4ec)]=new Sprite(),_0x5482d9[_0x5e555d(0x4ec)]['_filename']=_0x5482d9[_0x5e555d(0x2cf)][_0x5e555d(0x28f)](),_0x5482d9[_0x5e555d(0x4ec)][_0x5e555d(0x27f)]=ImageManager[_0x5e555d(0x5a4)](_0x5482d9[_0x5e555d(0x4ec)]['_filename']),_0x5482d9[_0x5e555d(0x4ec)][_0x5e555d(0x2dd)]['x']=0.5,_0x5482d9[_0x5e555d(0x4ec)][_0x5e555d(0x2dd)]['y']=0x1,_0x5482d9[_0x5e555d(0x4ec)]['z']=0x0,this[_0x5e555d(0x3ed)][_0x5e555d(0x323)](_0x5482d9['_shadowSprite']);},Spriteset_Map[_0x17c4f7(0x4ae)]['hideShadows']=function(){const _0x22c43c=_0x17c4f7;if(!VisuMZ[_0x22c43c(0x4f2)]['Settings'][_0x22c43c(0x290)]['ShowShadows'])return;for(const _0x9820c2 of this[_0x22c43c(0x1e0)]){this[_0x22c43c(0x3ed)][_0x22c43c(0x213)](_0x9820c2[_0x22c43c(0x4ec)]);}},Spriteset_Map['prototype'][_0x17c4f7(0x2c6)]=function(){const _0x3a4931=_0x17c4f7;this[_0x3a4931(0x2e1)]=[];for(const _0x270d43 of $gameMap['events']()){this[_0x3a4931(0x3b4)](_0x270d43);}},Spriteset_Map[_0x17c4f7(0x4b5)]=VisuMZ[_0x17c4f7(0x4f2)]['Settings'][_0x17c4f7(0x34f)][_0x17c4f7(0x46e)]??!![],Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x3b4)]=function(_0x19b87d){const _0x15bf20=_0x17c4f7;if(!this[_0x15bf20(0x41b)](_0x19b87d))return;if(Utils['isMobileDevice']()){if(!Spriteset_Map[_0x15bf20(0x4b5)])return;}let _0x2b0ac2;const _0x2d6742=VisuMZ[_0x15bf20(0x4f2)][_0x15bf20(0x2fe)][_0x15bf20(0x34f)][_0x15bf20(0x53a)]??!![];_0x2b0ac2=_0x2d6742?new Sprite_EventLabel(_0x19b87d):new Window_EventLabel(_0x19b87d),_0x2b0ac2['z']=0x8,_0x2b0ac2[_0x15bf20(0x22f)]=Sprite[_0x15bf20(0x600)]++,this[_0x15bf20(0x3ed)][_0x15bf20(0x323)](_0x2b0ac2),this[_0x15bf20(0x2e1)][_0x15bf20(0x46b)](_0x2b0ac2);},Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x41b)]=function(_0x177408){const _0x5bbac0=_0x17c4f7,_0x1c419f=_0x177408['event']();if(_0x1c419f[_0x5bbac0(0x24e)][_0x5bbac0(0x49f)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1c419f[_0x5bbac0(0x24e)][_0x5bbac0(0x49f)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1017a0 of _0x1c419f[_0x5bbac0(0x3b9)]){let _0x406105='';for(const _0x57f91b of _0x1017a0['list']){[0x6c,0x198][_0x5bbac0(0x233)](_0x57f91b[_0x5bbac0(0x57c)])&&(_0x406105+=_0x57f91b[_0x5bbac0(0x335)][0x0]);}if(_0x406105[_0x5bbac0(0x49f)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x406105['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x23d)]=function(_0x2ce749){const _0x4709fe=_0x17c4f7;this['_characterSprites']=this[_0x4709fe(0x1e0)]||[];const _0x27220c=new Sprite_Character(_0x2ce749);this['_characterSprites'][_0x4709fe(0x46b)](_0x27220c),this[_0x4709fe(0x3ed)][_0x4709fe(0x323)](_0x27220c),this[_0x4709fe(0x602)](_0x27220c),this[_0x4709fe(0x3b4)](_0x2ce749),_0x27220c[_0x4709fe(0x420)]();},Spriteset_Map[_0x17c4f7(0x4ae)]['refreshEventLabels']=function(){const _0x22ba5b=_0x17c4f7;if(!this['_labelWindows'])return;for(const _0x3860f5 of this[_0x22ba5b(0x2e1)]){_0x3860f5&&(_0x3860f5['_visiblePlayerX']=undefined,_0x3860f5[_0x22ba5b(0x1ba)]());}},Spriteset_Map[_0x17c4f7(0x4ae)][_0x17c4f7(0x368)]=function(_0x13e6c9,_0x57d703){const _0x510a6d=_0x17c4f7;if(!_0x13e6c9)return;_0x57d703[_0x510a6d(0x49a)]={'x':_0x13e6c9['x'],'y':_0x13e6c9['y']},this[_0x510a6d(0x202)](_0x57d703);},Spriteset_Map['prototype'][_0x17c4f7(0x202)]=function(_0x569c07){const _0x36956a=_0x17c4f7;if(!this['_tilemap'])return;const _0x4f65c8=new Sprite_VisuMz_MessagePopup(_0x569c07);this[_0x36956a(0x3ed)][_0x36956a(0x323)](_0x4f65c8);},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x439)]=Game_Message[_0x17c4f7(0x4ae)][_0x17c4f7(0x411)],Game_Message[_0x17c4f7(0x4ae)][_0x17c4f7(0x411)]=function(_0x30dcd6,_0x28c2b7){const _0xbba1fb=_0x17c4f7;this[_0xbba1fb(0x2a0)]=$gameTemp[_0xbba1fb(0x64a)](),VisuMZ['EventsMoveCore'][_0xbba1fb(0x439)]['call'](this,_0x30dcd6,_0x28c2b7);},VisuMZ[_0x17c4f7(0x4f2)]['Window_NumberInput_start']=Window_NumberInput[_0x17c4f7(0x4ae)][_0x17c4f7(0x46c)],Window_NumberInput[_0x17c4f7(0x4ae)]['start']=function(){const _0x3880dc=_0x17c4f7;$gameTemp[_0x3880dc(0x63d)]($gameMessage[_0x3880dc(0x2a0)]),VisuMZ[_0x3880dc(0x4f2)]['Window_NumberInput_start'][_0x3880dc(0x494)](this),$gameTemp[_0x3880dc(0x5bc)]();},VisuMZ['EventsMoveCore'][_0x17c4f7(0x1d3)]=Window_NumberInput[_0x17c4f7(0x4ae)][_0x17c4f7(0x2ca)],Window_NumberInput[_0x17c4f7(0x4ae)][_0x17c4f7(0x2ca)]=function(){const _0x24f800=_0x17c4f7;$gameTemp['registerSelfTarget']($gameMessage[_0x24f800(0x2a0)]),VisuMZ['EventsMoveCore'][_0x24f800(0x1d3)][_0x24f800(0x494)](this),$gameTemp[_0x24f800(0x5bc)](),$gameMessage[_0x24f800(0x2a0)]=undefined;},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x396)]=Game_Message[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ca)],Game_Message[_0x17c4f7(0x4ae)][_0x17c4f7(0x4ca)]=function(_0x3ea323,_0x3d8b68){const _0xdabfc3=_0x17c4f7;this[_0xdabfc3(0x607)]=$gameTemp[_0xdabfc3(0x64a)](),VisuMZ[_0xdabfc3(0x4f2)][_0xdabfc3(0x396)][_0xdabfc3(0x494)](this,_0x3ea323,_0x3d8b68);},VisuMZ['EventsMoveCore'][_0x17c4f7(0x4a8)]=Window_EventItem[_0x17c4f7(0x4ae)][_0x17c4f7(0x3af)],Window_EventItem[_0x17c4f7(0x4ae)][_0x17c4f7(0x3af)]=function(){const _0x3617f9=_0x17c4f7;$gameTemp[_0x3617f9(0x63d)]($gameMessage[_0x3617f9(0x607)]),VisuMZ['EventsMoveCore'][_0x3617f9(0x4a8)]['call'](this),$gameTemp[_0x3617f9(0x5bc)](),$gameMessage[_0x3617f9(0x607)]=undefined;},VisuMZ[_0x17c4f7(0x4f2)]['Window_EventItem_onCancel']=Window_EventItem[_0x17c4f7(0x4ae)][_0x17c4f7(0x429)],Window_EventItem['prototype']['onCancel']=function(){const _0x2493ac=_0x17c4f7;$gameTemp['registerSelfTarget']($gameMessage[_0x2493ac(0x607)]),VisuMZ['EventsMoveCore'][_0x2493ac(0x3c2)]['call'](this),$gameTemp[_0x2493ac(0x5bc)](),$gameMessage[_0x2493ac(0x607)]=undefined;},VisuMZ[_0x17c4f7(0x4f2)]['Window_Message_startMessage']=Window_Message['prototype'][_0x17c4f7(0x232)],Window_Message[_0x17c4f7(0x4ae)][_0x17c4f7(0x232)]=function(){const _0x46a385=_0x17c4f7;$gameMessage['registerSelfEvent'](),VisuMZ[_0x46a385(0x4f2)][_0x46a385(0x57f)][_0x46a385(0x494)](this),$gameTemp[_0x46a385(0x5bc)]();},VisuMZ[_0x17c4f7(0x4f2)][_0x17c4f7(0x350)]=Window_ScrollText[_0x17c4f7(0x4ae)][_0x17c4f7(0x232)],Window_ScrollText[_0x17c4f7(0x4ae)][_0x17c4f7(0x232)]=function(){const _0x2d2376=_0x17c4f7;$gameMessage[_0x2d2376(0x50f)](),VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage']['call'](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel[_0x17c4f7(0x4ae)]=Object[_0x17c4f7(0x441)](Window_Base[_0x17c4f7(0x4ae)]),Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x311)]=Window_EventLabel,Window_EventLabel['prototype'][_0x17c4f7(0x65f)]=function(_0x13d62c){const _0x55c65b=_0x17c4f7;this[_0x55c65b(0x32f)]=_0x13d62c;const _0x383e12=new Rectangle(0x0,0x0,Graphics[_0x55c65b(0x627)]/0x4,this[_0x55c65b(0x256)](0x1));this['initMembers'](),Window_Base[_0x55c65b(0x4ae)][_0x55c65b(0x65f)][_0x55c65b(0x494)](this,_0x383e12),this['contentsOpacity']=0x0,this[_0x55c65b(0x1cc)](0x2),this[_0x55c65b(0x501)]='';},Window_EventLabel['prototype']['initMembers']=function(){const _0x2e9e00=_0x17c4f7;this[_0x2e9e00(0x58b)]=![],this[_0x2e9e00(0x22b)]=$gameScreen[_0x2e9e00(0x402)](),this[_0x2e9e00(0x300)]=this[_0x2e9e00(0x32f)][_0x2e9e00(0x530)](),this['_eventScreenY']=this[_0x2e9e00(0x32f)][_0x2e9e00(0x31d)](),this[_0x2e9e00(0x3e8)]=this[_0x2e9e00(0x32f)][_0x2e9e00(0x5c4)][_0x2e9e00(0x48b)],this[_0x2e9e00(0x5e9)]=this[_0x2e9e00(0x32f)][_0x2e9e00(0x5c4)][_0x2e9e00(0x643)],this['_eventPageIndex']=this[_0x2e9e00(0x32f)]['_pageIndex'],this[_0x2e9e00(0x64b)]=this['isLabelVisible'](),this[_0x2e9e00(0x4a2)]=$gameSystem[_0x2e9e00(0x42e)](),this[_0x2e9e00(0x289)]=$gamePlayer['x'],this[_0x2e9e00(0x212)]=$gamePlayer['y'],this[_0x2e9e00(0x23b)]=this[_0x2e9e00(0x32f)]['x'],this[_0x2e9e00(0x29d)]=this[_0x2e9e00(0x32f)]['y'];},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x420)]=function(){const _0x3c9b7f=_0x17c4f7;Window_Base['prototype'][_0x3c9b7f(0x420)][_0x3c9b7f(0x494)](this);if(!this[_0x3c9b7f(0x336)]())return;this[_0x3c9b7f(0x403)](),this[_0x3c9b7f(0x5cb)](),this[_0x3c9b7f(0x1ae)](),this[_0x3c9b7f(0x558)]();},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x336)]=function(){const _0x578d07=_0x17c4f7;if(!this[_0x578d07(0x32f)])return![];if(!this[_0x578d07(0x32f)][_0x578d07(0x5c4)])return![];if(this[_0x578d07(0x4fe)]!==this['_event'][_0x578d07(0x49e)])return!![];if(this[_0x578d07(0x32f)][_0x578d07(0x54e)]&&!this[_0x578d07(0x58b)])return!![];if(this[_0x578d07(0x32f)][_0x578d07(0x5c4)][_0x578d07(0x1bf)]==='')return![];if(this['_screenZoomScale']!==$gameScreen[_0x578d07(0x402)]())return!![];if(this[_0x578d07(0x300)]!==this[_0x578d07(0x32f)][_0x578d07(0x530)]())return!![];if(this[_0x578d07(0x41f)]!==this[_0x578d07(0x32f)][_0x578d07(0x31d)]())return!![];if(this[_0x578d07(0x3e8)]!==this['_event']['_labelWindow'][_0x578d07(0x48b)])return!![];if(this['_eventLabelOffsetY']!==this['_event'][_0x578d07(0x5c4)]['offsetY'])return!![];if(this[_0x578d07(0x289)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x578d07(0x23b)]!==this[_0x578d07(0x32f)]['x'])return!![];if(this[_0x578d07(0x29d)]!==this[_0x578d07(0x32f)]['y'])return!![];if(this[_0x578d07(0x4a2)]!==$gameSystem[_0x578d07(0x42e)]())return!![];if(this[_0x578d07(0x64b)]&&this[_0x578d07(0x4f6)]<0xff)return!![];if(!this[_0x578d07(0x64b)]&&this[_0x578d07(0x4f6)]>0x0)return!![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x403)]=function(){const _0x3eb956=_0x17c4f7;this[_0x3eb956(0x32f)][_0x3eb956(0x332)]()!==this[_0x3eb956(0x501)]&&(this[_0x3eb956(0x501)]=this[_0x3eb956(0x32f)][_0x3eb956(0x332)](),this[_0x3eb956(0x1ba)]());},Window_EventLabel['prototype'][_0x17c4f7(0x5cb)]=function(){const _0x2b6927=_0x17c4f7;this[_0x2b6927(0x1ab)]['x']=0x1/$gameScreen['zoomScale'](),this[_0x2b6927(0x1ab)]['y']=0x1/$gameScreen[_0x2b6927(0x402)](),this[_0x2b6927(0x22b)]=$gameScreen[_0x2b6927(0x402)]();},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x1ae)]=function(){const _0x3601d6=_0x17c4f7;if(!SceneManager['_scene'])return;if(!SceneManager[_0x3601d6(0x622)][_0x3601d6(0x1fa)])return;const _0x1e4710=SceneManager[_0x3601d6(0x622)][_0x3601d6(0x1fa)]['findTargetSprite'](this['_event']);if(!_0x1e4710)return;this['x']=Math['round'](this[_0x3601d6(0x32f)][_0x3601d6(0x530)]()-Math['floor'](this[_0x3601d6(0x288)]*this[_0x3601d6(0x1ab)]['x']/0x2)),this['x']+=this[_0x3601d6(0x32f)][_0x3601d6(0x5c4)]['offsetX'],this['y']=this[_0x3601d6(0x32f)][_0x3601d6(0x31d)]()-_0x1e4710[_0x3601d6(0x626)],this['y']+=Math[_0x3601d6(0x574)]($gameSystem[_0x3601d6(0x4c4)]()*0.5),this['y']-=Math['round'](this['height']*this[_0x3601d6(0x1ab)]['y']),this['y']+=this[_0x3601d6(0x32f)]['_labelWindow'][_0x3601d6(0x643)],this[_0x3601d6(0x58b)]=this[_0x3601d6(0x32f)][_0x3601d6(0x54e)],this[_0x3601d6(0x300)]=this[_0x3601d6(0x32f)][_0x3601d6(0x530)](),this['_eventScreenY']=this[_0x3601d6(0x32f)][_0x3601d6(0x31d)](),this[_0x3601d6(0x3e8)]=this['_event'][_0x3601d6(0x5c4)][_0x3601d6(0x48b)],this[_0x3601d6(0x5e9)]=this[_0x3601d6(0x32f)][_0x3601d6(0x5c4)][_0x3601d6(0x643)],this['_eventPageIndex']=this['_event'][_0x3601d6(0x49e)],this[_0x3601d6(0x58b)]&&(this[_0x3601d6(0x4f6)]=0x0);},Window_EventLabel[_0x17c4f7(0x4ae)]['updateOpacity']=function(){const _0x4c62ff=_0x17c4f7;if(this[_0x4c62ff(0x1d8)]())this['contentsOpacity']+=this['opacitySpeed']();else SceneManager[_0x4c62ff(0x622)][_0x4c62ff(0x2d3)]>0x0?this[_0x4c62ff(0x4f6)]=0x0:this[_0x4c62ff(0x4f6)]-=this[_0x4c62ff(0x64f)]();},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x1d8)]=function(){const _0x29df65=_0x17c4f7;if(!$gameSystem[_0x29df65(0x42e)]())return![];if(this[_0x29df65(0x32f)]?.['_erased'])return![];if(SceneManager['_scene'][_0x29df65(0x2d3)]>0x0)return![];const _0x417f66=$gamePlayer['x'],_0x58cc37=$gamePlayer['y'],_0x36a2cc=this[_0x29df65(0x32f)]['x'],_0x557fb0=this[_0x29df65(0x32f)]['y'];if(this[_0x29df65(0x289)]===_0x417f66&&this[_0x29df65(0x212)]===_0x58cc37&&this['_visibleEventX']===_0x36a2cc&&this[_0x29df65(0x29d)]===_0x557fb0)return this[_0x29df65(0x64b)];this[_0x29df65(0x289)]=$gamePlayer['x'],this[_0x29df65(0x212)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x29df65(0x32f)]['x'],this['_visibleEventY']=this[_0x29df65(0x32f)]['y'];if($gameMap[_0x29df65(0x472)](_0x417f66,_0x58cc37,_0x36a2cc,_0x557fb0)>this[_0x29df65(0x32f)]['labelWindowRange']())return this['_cacheVisibility']=![],![];return this[_0x29df65(0x64b)]=!![],!![];},Window_EventLabel['prototype'][_0x17c4f7(0x64f)]=function(){const _0x33fe45=_0x17c4f7;return VisuMZ[_0x33fe45(0x4f2)]['Settings'][_0x33fe45(0x34f)][_0x33fe45(0x612)];},Window_EventLabel['prototype'][_0x17c4f7(0x3ef)]=function(){const _0x578a9e=_0x17c4f7,_0x1fac67=this['textSizeEx'](this['_text']);this[_0x578a9e(0x288)]=_0x1fac67[_0x578a9e(0x288)]+($gameSystem[_0x578a9e(0x4c4)]()+this[_0x578a9e(0x2a7)]())*0x2,this[_0x578a9e(0x626)]=Math[_0x578a9e(0x236)](this[_0x578a9e(0x2bf)](),_0x1fac67[_0x578a9e(0x626)])+$gameSystem[_0x578a9e(0x4c4)]()*0x2,this[_0x578a9e(0x58a)]();},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x2bf)]=function(){const _0x5c911a=_0x17c4f7;return VisuMZ[_0x5c911a(0x4f2)][_0x5c911a(0x2fe)][_0x5c911a(0x34f)]['LineHeight'];},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x5e3)]=function(){const _0x1c1887=_0x17c4f7;Window_Base['prototype']['resetFontSettings']['call'](this),this[_0x1c1887(0x30b)][_0x1c1887(0x410)]=this[_0x1c1887(0x45a)]();},Window_EventLabel[_0x17c4f7(0x4ae)]['defaultFontSize']=function(){const _0x40739e=_0x17c4f7;return VisuMZ[_0x40739e(0x4f2)]['Settings'][_0x40739e(0x34f)][_0x40739e(0x614)];},Window_EventLabel[_0x17c4f7(0x4ae)]['refresh']=function(){const _0x55d0b4=_0x17c4f7;this[_0x55d0b4(0x3ef)](),this['contents'][_0x55d0b4(0x645)]();const _0x419326=this[_0x55d0b4(0x501)][_0x55d0b4(0x1f0)](/[\r\n]+/);let _0x393369=0x0;for(const _0x50cc70 of _0x419326){const _0x4beee2=this[_0x55d0b4(0x250)](_0x50cc70),_0x1e5912=Math['floor']((this[_0x55d0b4(0x1ef)]-_0x4beee2['width'])/0x2);this[_0x55d0b4(0x24d)](_0x50cc70,_0x1e5912,_0x393369),_0x393369+=_0x4beee2[_0x55d0b4(0x626)];}},Window_EventLabel['prototype'][_0x17c4f7(0x1a7)]=function(_0x4f1fa6,_0x2db02a){const _0x15ef1e=_0x17c4f7;_0x2db02a[_0x15ef1e(0x3f1)]&&this['drawIcon'](_0x4f1fa6,_0x2db02a['x']+0x2,_0x2db02a['y']),_0x2db02a['x']+=Math['min'](this[_0x15ef1e(0x32b)](),ImageManager[_0x15ef1e(0x221)])+0x4;},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x609)]=function(_0xe204ab,_0xc94136,_0xc2acb6){const _0x18f2ec=_0x17c4f7,_0x5d5147=ImageManager['loadSystem'](_0x18f2ec(0x2c2)),_0xbbf64c=ImageManager['iconWidth'],_0x2d8251=ImageManager[_0x18f2ec(0x24f)],_0x11716a=_0xe204ab%0x10*_0xbbf64c,_0x131090=Math[_0x18f2ec(0x564)](_0xe204ab/0x10)*_0x2d8251,_0x59c108=Math[_0x18f2ec(0x636)](this['iconSize']()),_0x33a126=Math[_0x18f2ec(0x636)](this['iconSize']());this[_0x18f2ec(0x30b)][_0x18f2ec(0x309)](_0x5d5147,_0x11716a,_0x131090,_0xbbf64c,_0x2d8251,_0xc94136,_0xc2acb6,_0x59c108,_0x33a126);},Window_EventLabel[_0x17c4f7(0x4ae)][_0x17c4f7(0x32b)]=function(){const _0x4e317b=_0x17c4f7;return VisuMZ[_0x4e317b(0x4f2)]['Settings'][_0x4e317b(0x34f)]['IconSize'];};