//=============================================================================
// VisuStella MZ - QTE & Trigger System
// VisuMZ_2_QTE_TriggerSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QTE_TriggerSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QTE_TriggerSys = VisuMZ.QTE_TriggerSys || {};
VisuMZ.QTE_TriggerSys.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [QTE_TriggerSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/QTE_and_Trigger_System_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes, we need a way to trigger Switch or Variable changes. This can be
 * in an organic fashion or through Quick Time Events (QTE's). QTE's allow for
 * immediate changes to Switches or Variables through player inputs. Or if you
 * have ever wanted a Common Event to run when a specific Switch or Variable
 * changes its current value to something else, you can use this plugin's
 * trigger system for Switches, Variables, Items, Weapons, and Armors to call
 * and trigger Common Events whenever their values change. These don't have to
 * be recurring as they can also function as one-time "promises", too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Quick Time Events (QTE) can be played to adjust values of variables and/or
 *   switches based off different types of QTE's like Button Mashing, Direction
 *   Struggle, Timed Hits, and more.
 * * 10+ different QTE Plugin Commands for you to pick and choose from to give
 *   players more engaging gameplay.
 * * Trigger Common Events by simply changing certain Switches to ON/OFF
 *   positions or Variables to different values.
 * * Items, weapons, and armors can also register Common Events to trigger when
 *   the party gains or loses a copy of that item, weapon, or armor.
 * * If these triggers occur on a scene that isn't battle or the map, then the
 *   Common Events are queued up for until the player moves to the battle or
 *   map scenes to trigger them.
 * * If the triggering Common Event only has script calls, then the effect will
 *   run right then and there.
 * * Create Promises, one-time Common Event triggers upon a switch, variable,
 *   item, weapon, or armor having its value changed.
 * * Getting a Game Over can also result in a trigger that will bypass the Game
 *   Over scene, too.
 * * Game Over Common Events will prevent the game from ending completely and
 *   return back to map scene.
 * * The Common Event that is run upon a Game Over can be altered and changed.
 * * Have different Common Events depending on the map or troop encountered.
 * * The Game Over Common Event can be persistent or function as a one time
 *   deal depending on how you, as the game dev, choose to follow up with it.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_EventsMoveCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * === Quick Time Events ===
 * 
 * Also known as QTE's, these events function as player involved input trigger
 * systems which affect Variable or Switch values depending on the QTE type
 * (such as Variables for Button Mashing). Because these are player-input
 * reliant triggers, it's usually best for the event to be halted while the QTE
 * plays out (although you can disable this). Naturally, as such, the event
 * will not continue until the QTE is finished playing in the event commands.
 * 
 * QTE's are activated through Plugin Commands and can have the messages and
 * such displayed with each QTE displayed differently each time. Adjust this in
 * the Plugin Parameters for each QTE to fit the situation.
 * 
 * Only one QTE type can be played at a single time. Two or more QTE's cannot
 * be played at the same time. This is to prevent clutter and cause input
 * clashes.
 * 
 * If a QTE Plugin Command has a Switch and/or Variable assigned (or multiple),
 * those Switches and Variables will be reset to OFF and 0 respectively. Based
 * on the QTE type, data can be recorded to both the Switches and Variables.
 * Some Switches can indicate the successful player input of a QTE while other
 * Variables can indicate how much time was remaining upon finishing the QTE or
 * the score for the QTE.
 * 
 * Furthermore, for play testing purposes, during a QTE input sequence, you can
 * just hold down the "debug" button (usually Control) to automatically input
 * the needed input sequences. This ONLY works during Play Testing!
 * 
 * ---
 *
 * === Switch and Variable Triggers ===
 * 
 * Switches and Variables can have their names included with the name tags:
 * <Toggle Trigger Common Event: x> or <Change Trigger Common Event: x> to
 * automatically activate a Common Event at the next available moment. The
 * activated Common Event will only run once per trigger as opposed to
 * continuously like an Autorun or Parallel Common Event.
 * 
 * These apply to Self Switches (only the custom ones added through the <Self>
 * name tag VisuMZ_1_ItemsEquipsCore) and Self Variables (likewise), too. The
 * same also applies to Map Switches and Variables (with <Map>) and any Global
 * Switches and Variables (with <Global>).
 * 
 * However, Self Switches/Variables that have triggered any Common Events will
 * not utilize any "This Event" event command functions. They will behave as if
 * they are triggered on a non-event environment.
 * 
 * Possible uses for this mechanic can be things like making a picture change
 * into something else whenever a Variable's number value is altered, or have a
 * picture become visible or invisible depending on a Switch's ON/OFF value.
 * 
 * Be wary of creating infinite loops by "turning off" Switches or "resetting"
 * any Variables. That will cause them to trigger, too. If you have to turn off
 * or reset switches/variables, consider using Promise Plugin Commands instead
 * of the auto-repeat tags.
 *
 * ---
 *
 * === JS Switch and Variable Triggers ===
 * 
 * Triggers that function off of JS Switches and Variables will behave slightly
 * different. As these have dynamic values that may be constantly changing, in
 * order to prevent lag and endless loops, there is a delay system put in place
 * to ensure the triggers occur properly.
 * 
 * This delay is set up in the Plugin Parameters. A delay of 60 means that
 * every 60 frames in-game, a check will be performed to see if a trigger
 * should occur or not.
 *
 * ---
 *
 * === Repeat Triggers ===
 * 
 * A triggered Common Event can only be repeated once per availability. This
 * means that if you have toggled a Switch ON/OFF three times in a single frame
 * then the triggered Common Event will only process one time. The same applies
 * to variables, items, weapons, and armors.
 * 
 * This also means that if the Common Event is triggered multiple times outside
 * of the battle and map scenes, then it will only run once when available to
 * run the Common Event.
 *
 * ---
 * 
 * === Triggers for JavaScript Only Common Events ===
 * 
 * If a triggered Common Event only has JavaScript in it through the "Script"
 * event command, then instead of waiting until reaching the battle or map
 * scene, the triggered Common Event will run the JS code immediately. Comments
 * will be ignored and allowed as a part of JavaScript Only Common Events.
 * 
 * If multiple "Script" event commands are found in the triggered Common Event,
 * they will run independent of each other and as local functions. This means
 * that the any custom JS variables declared in one of the Script call events
 * may not necessarily transfer over to the others if not originally meant to.
 * 
 * ---
 * 
 * === Promise Triggers ===
 * 
 * Anything that is assigned through a name tag or notetag will result in an
 * auto-repeat trigger and will always trigger without fail. However, if you
 * want something to trigger only once (or until you assign it again), use a
 * Promise Trigger.
 * 
 * These are assigned through Plugin Commands and they will only trigger once.
 * After that, the condition that caused them to trigger will not trigger again
 * until another Promise is made to them.
 * 
 * ---
 *
 * === Game Over Scene ===
 * 
 * The Game Over scene is skipped over if there's a designated Game Over Common
 * Event determined. If there isn't any Game Over Common Events, then the Game
 * Over scene will occur normally.
 * 
 * If there are multiple Game Over Common Events, determined through the
 * default Plugin Parameters, Map Notetags, or Troop Name Tags, then a priority
 * system is used:
 * 
 *   1. Battle Processing "Can Lose"
 *   2. Troop Name Tag Game Over Common Event
 *   3. Map Notetag Game Over Common Event
 *   4. Plugin Parameters/Command Game Over Common Event
 * 
 * If a "Battle Processing" event command has a "Can Lose" option, then there
 * will be no Game Over Common Event to be run and instead, whatever is found
 * in the "Can Lose" segment will run instead. The event will not be
 * interrupted and continue forward. Ignore the rest.
 * 
 * Otherwise, if there is a Game Over Common Event determined by the enemy
 * troop's name with the Name Tag <Game Over Common Event: x>, then priority
 * will go to that Common Event. Any event running will end prematurely in
 * favor of this Game Over Common Event. Ignore the rest.
 * 
 * If there is a Game Over Common Event determined by the current map's notes
 * with the notetag <Game Over Common Event: x>, then priority will go to that
 * Common Event. Any event running will end prematurely in favor of this Game
 * Over Common Event. Ignore the rest.
 * 
 * And finally, if there are any Game Over Common Events determined through
 * Plugin Commands or Plugin Parameters, then follow through with those. Keep
 * in mind that if it is based off a Plugin Parameter, and if the parameter
 * "Clear Common Event After?" is enabled, it will be only a one time deal.
 * 
 * If there are no Game Over Common Events designated, then finally, the player
 * will reach the Game Over scene.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Those using VisuStella MZ's Battle Core can launch QTE Plugin Commands from
 * this plugin during the middle of Action Sequences as long as there is not
 * a conflicting effect during it.
 * 
 * Conflict effects include Active Chain Skills, Input Combo Skills, or 
 * Evolution Matrix Skills. QTE events will not run at all while these skill
 * mechanics are active.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Trigger-Related Notetags ===
 * 
 * ---
 *
 * <Toggle Trigger Common Event: x>
 * <Toggle Trigger Common Events: x, x, x>
 *
 * - Used for: Switch Names
 * - Whenever this Switch is turned ON or OFF, trigger the Common Event(s) 'x'.
 *   - This is a constantly recurring effect.
 * - Replace 'x' with a number representing the ID of the Common Event(s) you
 *   wish to trigger.
 *   - Insert multiple 'x' values to trigger multiple at a time.
 * - A triggered Common Event can only be repeated once per availability. Refer
 *   to the "Major Changes" section for more information.
 *
 * ---
 *
 * <Change Trigger Common Event: x>
 * <Change Trigger Common Events: x, x, x>
 *
 * - Used for: Variable Names
 * - Whenever this Variable changes its value, trigger the Common Event(s) 'x'.
 *   - This is a constantly recurring effect.
 * - Replace 'x' with a number representing the ID of the Common Event(s) you
 *   wish to trigger.
 *   - Insert multiple 'x' values to trigger multiple at a time.
 * - A triggered Common Event can only be repeated once per availability. Refer
 *   to the "Major Changes" section for more information.
 *
 * ---
 * 
 * <Change Trigger Common Event: x>
 * <Change Trigger Common Events: x, x, x>
 * 
 * - Used for: Item, Weapon, and Armor Notetags
 * - Whenever this item, weapon, or armor gains or loses an item (any amount),
 *   then trigger the Common Event(s) 'x'.
 *   - This is a constantly recurring effect.
 * - Replace 'x' with a number representing the ID of the Common Event(s) you
 *   wish to trigger.
 *   - Insert multiple 'x' values to trigger multiple at a time.
 * - A triggered Common Event can only be repeated once per availability. Refer
 *   to the "Major Changes" section for more information.
 * 
 * ---
 *
 * <Trigger on Switch: x>
 * <Trigger on Switches: x, x, x>
 *
 * - Used for: Common Event Names
 * - Whenever Switch(es) 'x' changes ON/OFF, trigger this Common Event.
 *   - This is a constantly recurring effect.
 * - Replace 'x' with a number representing the ID of the Switch(es) you wish
 *   to trigger upon them changing ON/OFF.
 *   - Insert multiple 'x' values to register multiple Switch IDs at once.
 * - A triggered Common Event can only be repeated once per availability. Refer
 *   to the "Major Changes" section for more information.
 *
 * ---
 *
 * <Trigger on Variable: x>
 * <Trigger on Variables: x, x, x>
 *
 * - Used for: Common Event Names
 * - Whenever Variable(s) 'x' changes its value, trigger this Common Event.
 *   - This is a constantly recurring effect.
 * - Replace 'x' with a number representing the ID of the variable(s) you wish
 *   to trigger upon them changing values.
 *   - Insert multiple 'x' values to register multiple Switch IDs at once.
 * - A triggered Common Event can only be repeated once per availability. Refer
 *   to the "Major Changes" section for more information.
 *
 * ---
 * 
 * === Game Over-Related Notetags ===
 * 
 * ---
 *
 * <Game Over Common Event: x>
 *
 * - Used for: Map Notetags
 * - If the player gets a game over through a battle on this map, then Common
 *   Event 'x' will run in place of a regular Game Over.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to run as a Game Over Common Event.
 *
 * ---
 *
 * <Game Over Common Event: x>
 *
 * - Used for: Troop Name Tags
 * - If the player gets a game over through a battle fighting this troop, then
 *   Common Event 'x' will run in place of a regular Game Over.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to run as a Game Over Common Event.
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
 * === Game Over Plugin Commands ===
 * 
 * ---
 *
 * Game Over: Setup Common Event
 * - Sets up a Common Event that will run upon receiving the next Game Over.
 *
 *   Common Event ID:
 *   - Setup the Common Event to run when the next Game Over occurs.
 *
 * ---
 *
 * Game Over: Clear Common Event
 * - Clears any Common Events designated to run for the next Game Over.
 *
 * ---
 * 
 * === Promise Plugin Commands ===
 * 
 * ---
 * 
 * Promise: Switch State Trigger
 * - Creates a one-time trigger for specified Switch to run the specified
 *   Common Events when Switch state changes.
 * 
 *   Switch ID:
 *   - What is the ID of the Switch to promise a trigger to?
 * 
 *   Common Event ID(s):
 *   - Select which Common Event(s) to run upon trigger.
 * 
 * ---
 * 
 * Promise: Variable Value Trigger
 * - Creates a one-time trigger for specified Variable to run the specified
 *   Common Events when Variable value changes.
 * 
 *   Variable ID:
 *   - What is the ID of the Variable to promise a trigger to?
 * 
 *   Common Event ID(s):
 *   - Select which Common Event(s) to run upon trigger.
 * 
 * ---
 * 
 * Promise: Item Quantity Trigger
 * - Creates a one-time trigger for specified Item to run the specified Common
 *   Events when Item quantity changes.
 * 
 *   Item ID:
 *   - What is the ID of the Item to promise a trigger to?
 * 
 *   Common Event ID(s):
 *   - Select which Common Event(s) to run upon trigger.
 * 
 * ---
 * 
 * Promise: Weapon Quantity Trigger
 * - Creates a one-time trigger for specified Weapon to run the specified
 *   Common Events when Weapon quantity changes.
 * 
 *   Weapon ID:
 *   - What is the ID of the Weapon to promise a trigger to?
 * 
 *   Common Event ID(s):
 *   - Select which Common Event(s) to run upon trigger.
 * 
 * ---
 * 
 * Promise: Armor Quantity Trigger
 * - Creates a one-time trigger for specified Armor to run the specified Common
 *   Events when armor quantity changes.
 * 
 *   Armor ID:
 *   - What is the ID of the Armor to promise a trigger to?
 * 
 *   Common Event ID(s):
 *   - Select which Common Event(s) to run upon trigger.
 * 
 * ---
 * 
 * === QTE Plugin Commands ===
 * 
 * ---
 * 
 * QTE: Clear Current QTE
 * - Clears the currently existing QTE.
 * 
 * ---
 * 
 * QTE: Button Mash (OK)
 * - Starts a Button Mash QTE session.
 * - Only one QTE can occur at a time.
 * 
 *   Trigger Variable ID:
 *   - Select which Variable ID to keep track of how many times the OK button
 *     has been pressed.
 *   - Use 0 to not track.
 * 
 *   Trigger Common Event:
 *   - Select a Common Event to play each time OK is pressed.
 *   - Use 0 to not play a Common Event.
 * 
 *   Trigger Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Button Sequence (Normal)
 * - Starts a Button Sequence QTE session.
 * - Only one QTE can occur at a time.
 * - No touch support.
 * 
 *   Input Sequence:
 *   - What button sequence is needed to be pressed?
 * 
 *   Shuffle Sequence?:
 *   - Randomize the button sequence order?
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the sequence buttons have
 *     been inputted.
 * 
 *   Remaining Variable ID:
 *   - Select which Variable ID to record how much time is remaining when the
 *     QTE session finishes.
 * 
 *   Correct Common Event:
 *   - Select a Common Event to play each time a correct button input is
 *     pressed.
 *   - Use 0 to not play a Common Event.
 * 
 *   Button Press Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Button Sequence (Random)
 * - Starts a randomized Button Sequence QTE session.
 * - Only one QTE can occur at a time.
 * - No touch support.
 * 
 *   Allowed Buttons:
 *   - What buttons can appear in the randomized sequence?
 * 
 *   Sequence Length?:
 *   - How many buttons will be made for the sequence?
 *   - You may use code.
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the sequence buttons have
 *     been inputted.
 * 
 *   Remaining Variable ID:
 *   - Select which Variable ID to record how much time is remaining when the
 *     QTE session finishes.
 * 
 *   Correct Common Event:
 *   - Select a Common Event to play each time a correct button input is
 *     pressed.
 *   - Use 0 to not play a Common Event.
 * 
 *   Button Press Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Direction Struggle (✥)
 * - Starts a Direction Struggle QTE session.
 * - Only one QTE can occur at a time.
 * - No touch support.
 * 
 *   Struggle Requirement:
 *   - How many times must the player struggle in different directions to
 *     succeed this QTE?
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the struggle goal has been
 *     met.
 *   - Use 0 to not use.
 * 
 *   Remaining Variable ID:
 *   - Select which Variable ID to record how much time is remaining when the
 *     QTE session finishes.
 * 
 *   Struggle Common Event:
 *   - Select a Common Event to play each struggle.
 *   - Use 0 to not play a Common Event.
 * 
 *   Button Press Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Fill Gauge (OK)
 * - Starts a Fill Gauge QTE session.
 * - Only one QTE can occur at a time.
 * 
 *   Fill Requirement:
 *   - How many times must the player press OK to fill the gauge for this QTE
 *     Session??
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the fill goal has been met.
 *   - Use 0 to not use.
 * 
 *   Remaining Variable ID:
 *   - Select which Variable ID to record how much time is remaining when the
 *     QTE session finishes.
 * 
 *   Fill Common Event:
 *   - Select a Common Event to play each fill.
 *   - Use 0 to not play a Common Event.
 * 
 *   Button Press Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Hold & Release (OK)
 * - Starts a Hold & Release QTE session.
 * - Only one QTE can occur at a time.
 * 
 *   Max Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 * 
 *   Not Overload Switch ID:
 *   - Select which Switch ID to turn ON if the OK button was released before
 *     overloading.
 *   - Use 0 to not track.
 * 
 *   Held Timed Variable ID:
 *   - Select which Variable ID to keep track of how long the the OK button has
 *     been held.
 *   - Use 0 to not track.
 * 
 *   Hold Common Event:
 *   - Select a Common Event to play when the button is held.
 *   - Use 0 to not play a Common Event.
 * 
 *   Release Sound:
 *   - Adjust the sound effect played when released.
 * 
 *   Release Common Event:
 *   - Select a Common Event to play when the button is released.
 *   - Use 0 to not play a Common Event.
 * 
 *   Overload Sound:
 *   - Adjust the sound effect played when overloaded.
 * 
 *   Overload Common Event:
 *   - Select a Common Event to play when the QTE is overloaded.
 *   - Use 0 to not play a Common Event.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Marcher (Page Up/Page Down)
 * - Starts a Marcher QTE session.
 * - Only one QTE can occur at a time.
 * - No touch support.
 * 
 *   Marcher Requirement:
 *   - How many times must the player march between different buttons to
 *     succeed this QTE?
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the marcher goal has been
 *     met.
 *   - Use 0 to not use.
 * 
 *   Remaining Variable ID:
 *   - Select which Variable ID to record how much time is remaining when the
 *     QTE session finishes.
 * 
 *   Page Up Common Event:
 *   - Select a Common Event to play when pressing Page Up.
 *   - Use 0 to not play a Common Event.
 * 
 *   Page Down Common Event:
 *   - Select a Common Event to play when pressing Page Down.
 *   - Use 0 to not play a Common Event.
 * 
 *   Button Press Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Swapper (OK/Cancel)
 * - Starts a Switcher QTE session.
 * - Only one QTE can occur at a time.
 * - No touch support.
 * 
 *   Swap Requirement:
 *   - How many times must the player swap between different buttons to succeed
 *     this QTE?
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the swapper goal has been
 *     met.
 *   - Use 0 to not use.
 * 
 *   Remaining Variable ID:
 *   - Select which Variable ID to record how much time is remaining when the
 *     QTE session finishes.
 * 
 *   OK Common Event:
 *   - Select a Common Event to play when pressing OK.
 *   - Use 0 to not play a Common Event.
 * 
 *   Cancel Common Event:
 *   - Select a Common Event to play when pressing Cancel.
 *   - Use 0 to not play a Common Event.
 * 
 *   Button Press Sound:
 *   - Adjust the sound effect played when a button is pressed.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Timed Hit (OK)
 * - Starts a Timed Hit QTE session.
 * - Only one QTE can occur at a time.
 * 
 *   Timed Hit Picture:
 *   - The picture used for the Timed Hit indicator.
 *   - Leave empty to not display.
 * 
 *   Coordinate X:
 *   - X coordinate used for the Timed Hit picture.
 *   - You may use JavaScript code.
 * 
 *   Coordinate Y:
 *   - Y coordinate used for the Timed Hit picture.
 *   - You may use JavaScript code.
 * 
 *   Press in X Frames:
 *   - Press the OK button by these frames (60 frames = 1 sec) with some
 *     leeway.
 *   - You may use code. 
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if the player lands the Timed Hit.
 * 
 *   Timing Variable ID:
 *   - Select which Variable ID to record how close the player is to the
 *     Timed Hit timing.
 * 
 *   Success Common Event:
 *   - Select a Common Event to play if the player lands.
 *   - Use 0 to not play a Common Event.
 * 
 *   Success Sound:
 *   - Adjust the sound effect played when landing on a hit zone.
 * 
 *   Miss Common Event:
 *   - Select a Common Event to play if the player misses.
 *   - Use 0 to not play a Common Event.
 * 
 *   Miss Sound:
 *   - Adjust the sound effect played when NOT landing a hit zone.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Timed Sequence (Buttons)
 * - Starts a Timed Sequence QTE session.
 * - Only one QTE can occur at a time.
 * - No touch support.
 * 
 *   Sequence:
 *   - Set up Button Sequence where the player to press at certain timings.
 * 
 *     Button:
 *     - What button is needed to be pressed?
 * 
 *       Press in X Frames:
 *       - Press the button by these frames (60 frames = 1 sec) with some
 *         leeway.
 *       - You may use code. 
 * 
 *     Mechanic Settings:
 * 
 *       Success Switch ID:
 *       - Select which Switch ID to turn ON if the button is successfully hit.
 *      - Use 0 to not change a switch.
 * 
 *       Hit Common Event:
 *       - Select a Common Event to play when this button is hit.
 *       - Use 0 to not play a Common Event.
 * 
 *       Button Press Sound:
 *       - Adjust the sound effect played when a button is pressed.
 * 
 *   Landing Icon:
 *   - The icon used for the landing icon.
 * 
 *   Direction:
 *   - Which way do you want the buttons to move towards?
 * 
 *   Hit Times Variable ID:
 *   - Select which Variable ID to record how correct button inputs the player
 *     has landed.
 * 
 *   Miss Common Event:
 *   - Select a Common Event to play if the player misses.
 *   - Use 0 to not play a Common Event.
 * 
 *   Miss Sound:
 *   - Adjust the sound effect played when the player misses.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 * 
 * QTE: Timing Bar (OK)
 * - Starts a Timing Bar QTE session.
 * - Only one QTE can occur at a time.
 * 
 *   Hit Zones:
 *   - Set up Hit Zones where the player will gain points for landing on.
 * 
 *     Hit Area:
 * 
 *       Start:
 *       - This is the starting location of the hit area.
 *       - Use numbers between 0 and 100.
 *       - You may use code.
 * 
 *       End:
 *       - This is the ending location of the hit area.
 *       - Use numbers between 0 and 100.
 *       - You may use code.
 * 
 *       Label:
 *       - Text displayed for this hit area (centered).
 *       - Text codes are supported.
 *       - Leave empty to not use.
 * 
 *     Mechanic Settings:
 * 
 *       Variable Points:
 *       - If the cursor lands in this zone, then assign this many points to
 *       - the results variable. You may use code.
 * 
 *       Hit Common Event:
 *       - Select a Common Event to play when this zone is hit.
 *       - Use 0 to not play a Common Event.
 * 
 *     Color Settings:
 * 
 *       Area Color 1:
 *       Area Color 2:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *   Cursor Icon:
 *   - The icon used for the player icon.
 * 
 *   Cursor Speed:
 *   - The speed at which the cursor moves.
 * 
 *   Success Switch ID:
 *   - Select which Switch ID to turn ON if all of the player lands the cursor
 *     on a Hit Zone.
 * 
 *   Points Variable ID:
 *   - Select which Variable ID to record how many points is earned from the
 *     Hit Zone the player landed on.
 * 
 *   Hit Sound:
 *   - Adjust the sound effect played when landing on a hit zone.
 * 
 *   Miss Sound:
 *   - Adjust the sound effect played when NOT landing a hit zone.
 * 
 *   Miss Common Event:
 *   - Select a Common Event to play when NOT landing a hit zone.
 *   - Use 0 to not play a Common Event.
 * 
 *   Input Start Delay:
 *   - How many frames (60 frames = 1 sec) delay before inputs are accepted to
 *     not take the player by surprise?
 * 
 *   QTE Duration:
 *   - The duration in frames (60 frames = 1 sec).
 *   - You may use code.
 *   - Over 1000000 for infinite time.
 * 
 *   Wait for QTE?:
 *   - Wait until QTE Session is done?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There aren't too many Plugin Parameters for this plugin.
 *
 * ---
 *
 * General Settings
 * 
 *   JS Watch Update Delay:
 *   - Used for <JS> Switches and Variables.
 *   - How many frames delay to wait for triggers?
 *   - 60 frames = 1 second.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Game Over Settings
 * ============================================================================
 *
 * These settings let you adjust Game Over-related trigger aspects.
 *
 * ---
 * 
 * Game Over Settings
 * 
 *   Default Common Event:
 *   - Do you want there to be a Default Common Event?
 *   - It can be changed later with a Plugin Command.
 *   - 0 to not use.
 * 
 *   Heal on Common Event?:
 *   - Do you want to heal 1 HP for all dead members after running the
 *     Game Over Common Event?
 * 
 *   Clear After?:
 *   - Do you wish to clear the Game Over Common Event after it launches
 *     or not?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: QTE Settings
 * ============================================================================
 *
 * These settings let you adjust QTE-related trigger aspects.
 *
 * ---
 * 
 * Settings
 * 
 *   Early Finish Duration:
 *   - How many frames should the game wait if the player finishes a QTE early?
 * 
 *   Show QTE Timer?:
 *   - Do you wish to show a QTE Timer over each QTE window?
 * 
 *     Timer Gauge Style:
 *     - Select the gauge style to use for QTE Timer.
 *     - Requires VisuMZ_3_VisualGaugeStyles!
 * 
 *     Gauge Color 1:
 *     Gauge Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     JS: X, Y, W, H:
 *     - Code used to determine the position and dimensions for this window
 *       containing the gauge.
 * 
 *   Show QTE Progress?:
 *   - Show a progress gauge for certain types of QTE's?
 * 
 *     Progress Gauge Style:
 *     - Select the gauge style to use for QTE Timer.
 *     - Requires VisuMZ_3_VisualGaugeStyles!
 * 
 *     Gauge Color 1:
 *     Gauge Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     JS: X, Y, W, H:
 *     - Code used to determine the position and dimensions for this window
 *       containing the gauge.
 * 
 *   Timed Hit Leeway:
 *   - How many frames of leeway should be granted to Timed Hit QTE?
 * 
 *     Overlay Opacity:
 *     - Timed Hit overlay sprite opacity.
 * 
 *     Max Scaling:
 *     - What's the max scaling for Timed Hit QTE indicators?
 * 
 *   Timed Sequence Leeway:
 *   - How many frames of leeway should be granted to Timed Sequence QTE?
 * 
 *     Sequence Position:
 *     - What is the position for the Timed Sequence Landing Icon?
 *     - Use a number between 0 and 100.
 * 
 *   QTE Timing Bar Width:
 *   - This is the width of the Timing Bar in pixels.
 * 
 *     Cursor Offset X:
 *     - Offsets the cursor x position.
 *     - Negative: left. Positive: right.
 * 
 *     Cursor Offset Y:
 *     - Offsets the cursor y position.
 *     - Negative: up. Positive: down.
 * 
 *     Label Font Size:
 *     - What is the font size used to display timing bar labels?
 * 
 *     Label Offset X:
 *     - Offsets the label x position.
 *     - Negative: left. Positive: right.
 * 
 *     Label Offset Y:
 *     - Offsets the label y position.
 *     - Negative: up. Positive: down.
 * 
 *     Timing Bar Color 1:
 *     Timing Bar Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed and QTE text window for
 * this plugin.
 *
 * ---
 * 
 * General Settings
 * 
 *   Text Alignment:
 *   - What is the text alignment?
 *   - Requires VisuMZ_1_MessageCore!
 *   - Otherwise, defaults to left alignment.
 * 
 * --
 * 
 * Message Settings:
 * 
 *   Button Mash Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Button Sequence Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 * 
 *   Direction Struggle:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Fill Gauge Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Hold & Release Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Marcher Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Swapper Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Timed Hit Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 *   Timed Sequence Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 * 
 *   Timing Bar Text:
 *   - Alter the text that appears for the QTE Window.
 *   - Text codes are supported.
 *   - Leave empty for no window.
 * 
 * ---
 * 
 * Message Window:
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the position and dimensions for this window.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Arisu
 * * Irina
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where any input can be used for Timed Sequence QTE. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Comman added by Arisu:
 * *** QTE: Clear Current QTE
 * **** Clears the currently existing QTE.
 * * Feature Updated!
 * ** Plugin Command: QTE: Hold & Release (OK)
 * *** Added Hold Common Event
 * *** Added Release Common Event
 * *** Added Overload Common Event
 * **** These common events will play upon different aspects of the QTE.
 * 
 * Version 1.00 Official Release Date: January 22, 2024
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GameOverCommonEventSetup
 * @text Game Over: Setup Common Event
 * @desc Sets up a Common Event that will run upon receiving the next Game Over.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Setup the Common Event to run when the next Game Over occurs.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GameOverCommonEventClear
 * @text Game Over: Clear Common Event
 * @desc Clears any Common Events designated to run for the next Game Over.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Promise
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PromiseSwitch
 * @text Promise: Switch State Trigger
 * @desc Creates a one-time trigger for specified Switch to run the
 * specified Common Events when Switch state changes.
 *
 * @arg dataID:num
 * @text Switch ID
 * @type switch
 * @desc What is the ID of the Switch to promise a trigger to?
 * @default 0
 *
 * @arg CommonEventIDs:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Select which Common Event(s) to run upon trigger.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PromiseVariable
 * @text Promise: Variable Value Trigger
 * @desc Creates a one-time trigger for specified Variable to run the
 * specified Common Events when Variable value changes.
 *
 * @arg dataID:num
 * @text Variable ID
 * @type variable
 * @desc What is the ID of the Variable to promise a trigger to?
 * @default 0
 *
 * @arg CommonEventIDs:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Select which Common Event(s) to run upon trigger.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PromiseItem
 * @text Promise: Item Quantity Trigger
 * @desc Creates a one-time trigger for specified Item to run the
 * specified Common Events when Item quantity changes.
 *
 * @arg dataID:num
 * @text Item ID
 * @type item
 * @desc What is the ID of the Item to promise a trigger to?
 * @default 0
 *
 * @arg CommonEventIDs:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Select which Common Event(s) to run upon trigger.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PromiseWeapon
 * @text Promise: Weapon Quantity Trigger
 * @desc Creates a one-time trigger for specified Weapon to run the
 * specified Common Events when Weapon quantity changes.
 *
 * @arg dataID:num
 * @text Weapon ID
 * @type weapon
 * @desc What is the ID of the Weapon to promise a trigger to?
 * @default 0
 *
 * @arg CommonEventIDs:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Select which Common Event(s) to run upon trigger.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PromiseArmor
 * @text Promise: Armor Quantity Trigger
 * @desc Creates a one-time trigger for specified Armor to run the
 * specified Common Events when armor quantity changes.
 *
 * @arg dataID:num
 * @text Armor ID
 * @type armor
 * @desc What is the ID of the Armor to promise a trigger to?
 * @default 0
 *
 * @arg CommonEventIDs:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Select which Common Event(s) to run upon trigger.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Q
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_Clear
 * @text QTE: Clear Current QTE
 * @desc Clears the currently existing QTE.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_ButtonMash
 * @text QTE: Button Mash (OK)
 * @desc Starts a Button Mash QTE session.
 * Only one QTE can occur at a time.
 * 
 * @arg VariableID:num
 * @text Trigger Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to keep track of how many times
 * the OK button has been pressed. Use 0 to not track.
 * @default 1
 *
 * @arg CommonEventID:num
 * @text Trigger Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play each time OK is pressed.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Trigger Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_ButtonSequenceNormal
 * @text QTE: Button Sequence (Normal)
 * @desc Starts a Button Sequence QTE session.
 * Only one QTE can occur at a time. No touch support.
 *
 * @arg InputSequence:arraystr
 * @text Input Sequence
 * @type select[]
 * @option 
 * @option down
 * @option left
 * @option right
 * @option up
 * @option 
 * @option ok
 * @option cancel
 * @option pageup
 * @option pagedown
 * @option shift
 * @option 
 * @desc What button sequence is needed to be pressed?
 * @default ["down","left","right","up","ok","cancel"]
 *
 * @arg Shuffle:eval
 * @text Shuffle Sequence?
 * @parent InputSequence:arraystr
 * @type boolean
 * @on Shuffle
 * @off Don't Shuffle
 * @desc Randomize the button sequence order?
 * @default false
 * 
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the
 * sequence buttons have been inputted.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Remaining Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how much time is
 * remaining when the QTE session finishes.
 * @default 0
 *
 * @arg CommonEventID:num
 * @text Correct Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play each time a correct button
 * input is pressed. Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Button Press Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_ButtonSequenceRandom
 * @text QTE: Button Sequence (Random)
 * @desc Starts a randomized Button Sequence QTE session.
 * Only one QTE can occur at a time. No touch support.
 *
 * @arg Buttons:arraystr
 * @text Allowed Buttons
 * @type select[]
 * @option 
 * @option down
 * @option left
 * @option right
 * @option up
 * @option 
 * @option ok
 * @option cancel
 * @option pageup
 * @option pagedown
 * @option shift
 * @option 
 * @desc What buttons can appear in the randomized sequence?
 * @default ["down","left","right","up","ok","cancel"]
 *
 * @arg SequenceLength:eval
 * @text Sequence Length?
 * @parent Buttons:arraystr
 * @desc How many buttons will be made for the sequence?
 * You may use code.
 * @default 6
 * 
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the
 * sequence buttons have been inputted.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Remaining Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how much time is
 * remaining when the QTE session finishes.
 * @default 0
 *
 * @arg CommonEventID:num
 * @text Correct Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play each time a correct button
 * input is pressed. Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Button Press Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_DirectionStruggle
 * @text QTE: Direction Struggle (✥)
 * @desc Starts a Direction Struggle QTE session.
 * Only one QTE can occur at a time. No touch support.
 *
 * @arg StruggleRequirement:eval
 * @text Struggle Requirement
 * @desc How many times must the player struggle in different
 * directions to succeed this QTE?
 * @default 20
 *
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the struggle
 * goal has been met. Use 0 to not use.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Remaining Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how much time is
 * remaining when the QTE session finishes.
 * @default 0
 *
 * @arg CommonEventID:num
 * @text Struggle Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play each struggle.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Button Press Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Evasion1","volume:num":"90","pitch:num":"120","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_FillGauge
 * @text QTE: Fill Gauge (OK)
 * @desc Starts a Fill Gauge QTE session.
 * Only one QTE can occur at a time.
 *
 * @arg FillRequirement:eval
 * @text Fill Requirement
 * @desc How many times must the player press OK to fill the
 * gauge for this QTE Session??
 * @default 20
 *
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the fill
 * goal has been met. Use 0 to not use.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Remaining Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how much time is
 * remaining when the QTE session finishes.
 * @default 0
 *
 * @arg CommonEventID:num
 * @text Fill Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play each fill.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Button Press Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_HoldRelease
 * @text QTE: Hold & Release (OK)
 * @desc Starts a Hold & Release QTE session.
 * Only one QTE can occur at a time.
 *
 * @arg MaxDuration:eval
 * @text Max Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code.
 * @default 180
 *
 * @arg SwitchID:num
 * @text Not Overload Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if the OK button was
 * released before overloading. Use 0 to not track.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Held Timed Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to keep track of how long the
 * the OK button has been held. Use 0 to not track.
 * @default 1
 *
 * @arg HoldCommonEventID:num
 * @text Hold Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when the button is held.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg ReleaseSound:struct
 * @text Release Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when released.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg ReleaseCommonEventID:num
 * @text Release Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when the button is released.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg OverloadSound:struct
 * @text Overload Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when overloaded.
 * @default {"name:str":"Buzzer1","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @arg OverloadCommonEventID:num
 * @text Overload Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when the QTE is overloaded.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 180
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_Marcher
 * @text QTE: Marcher (Page Up/Page Down)
 * @desc Starts a Marcher QTE session.
 * Only one QTE can occur at a time. No touch support.
 *
 * @arg ToggleRequirement:eval
 * @text Marcher Requirement
 * @desc How many times must the player march between different
 * buttons to succeed this QTE?
 * @default 20
 *
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the marcher
 * goal has been met. Use 0 to not use.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Remaining Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how much time is
 * remaining when the QTE session finishes.
 * @default 0
 *
 * @arg CommonEventID_PageUp:num
 * @text Page Up Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when pressing Page Up.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg CommonEventID_PageDown:num
 * @text Page Down Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when pressing Page Down.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Button Press Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_Swapper
 * @text QTE: Swapper (OK/Cancel)
 * @desc Starts a Switcher QTE session.
 * Only one QTE can occur at a time. No touch support.
 *
 * @arg ToggleRequirement:eval
 * @text Swap Requirement
 * @desc How many times must the player swap between different
 * buttons to succeed this QTE? No touch support.
 * @default 20
 *
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the swapper
 * goal has been met. Use 0 to not use.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Remaining Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how much time is
 * remaining when the QTE session finishes.
 * @default 0
 *
 * @arg CommonEventID_Ok:num
 * @text OK Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when pressing OK.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg CommonEventID_Cancel:num
 * @text Cancel Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when pressing Cancel.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg Sound:struct
 * @text Button Press Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_TimedHit
 * @text QTE: Timed Hit (OK)
 * @desc Starts a Timed Hit QTE session.
 * Only one QTE can occur at a time.
 * 
 * @arg TimedHitPicture:str
 * @text Timed Hit Picture
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc The picture used for the Timed Hit indicator.
 * Leave empty to not display.
 * @default >>>ATTENTION<<<
 *
 * @arg pointX:eval
 * @text Coordinate X
 * @parent TimedHitPicture:num
 * @desc X coordinate used for the Timed Hit picture.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Coordinate Y
 * @parent TimedHitPicture:num
 * @desc Y coordinate used for the Timed Hit picture.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Press in X Frames
 * @desc Press the OK button by these frames (60 frames = 1 sec)
 * with some leeway. You may use code. 
 * @default 120
 * 
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if the player lands
 * the Timed Hit.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Timing Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how close the player is
 * to the Timed Hit timing.
 * @default 0
 *
 * @arg HitCommonEventID:num
 * @text Success Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play if the player lands.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg HitSound:struct
 * @text Success Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when landing on a hit zone.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg MissCommonEventID:num
 * @text Miss Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play if the player misses.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg MissSound:struct
 * @text Miss Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when NOT landing a hit zone.
 * @default {"name:str":"Buzzer1","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 0
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_TimedSequence
 * @text QTE: Timed Sequence (Buttons)
 * @desc Starts a Timed Sequence QTE session.
 * Only one QTE can occur at a time. No touch support.
 *
 * @arg Sequence:arraystruct
 * @text Sequence
 * @type struct<Timing>[]
 * @desc Set up Button Sequence where the player to press at certain timings.
 * @default ["{\"Button:str\":\"left\",\"Timing:eval\":\"120\",\"Mechanics\":\"\",\"SwitchID:num\":\"0\",\"CommonEventID:num\":\"0\",\"Sound:struct\":\"{\\\"name:str\\\":\\\"Skill2\\\",\\\"volume:num\\\":\\\"90\\\",\\\"pitch:num\\\":\\\"150\\\",\\\"pan:num\\\":\\\"0\\\"}\"}","{\"Button:str\":\"right\",\"Timing:eval\":\"180\",\"Mechanics\":\"\",\"SwitchID:num\":\"0\",\"CommonEventID:num\":\"0\",\"Sound:struct\":\"{\\\"name:str\\\":\\\"Skill2\\\",\\\"volume:num\\\":\\\"90\\\",\\\"pitch:num\\\":\\\"150\\\",\\\"pan:num\\\":\\\"0\\\"}\"}","{\"Button:str\":\"up\",\"Timing:eval\":\"240\",\"Mechanics\":\"\",\"SwitchID:num\":\"0\",\"CommonEventID:num\":\"0\",\"Sound:struct\":\"{\\\"name:str\\\":\\\"Skill2\\\",\\\"volume:num\\\":\\\"90\\\",\\\"pitch:num\\\":\\\"150\\\",\\\"pan:num\\\":\\\"0\\\"}\"}","{\"Button:str\":\"down\",\"Timing:eval\":\"300\",\"Mechanics\":\"\",\"SwitchID:num\":\"0\",\"CommonEventID:num\":\"0\",\"Sound:struct\":\"{\\\"name:str\\\":\\\"Skill2\\\",\\\"volume:num\\\":\\\"90\\\",\\\"pitch:num\\\":\\\"150\\\",\\\"pan:num\\\":\\\"0\\\"}\"}","{\"Button:str\":\"ok\",\"Timing:eval\":\"420\",\"Mechanics\":\"\",\"SwitchID:num\":\"0\",\"CommonEventID:num\":\"0\",\"Sound:struct\":\"{\\\"name:str\\\":\\\"Skill2\\\",\\\"volume:num\\\":\\\"90\\\",\\\"pitch:num\\\":\\\"150\\\",\\\"pan:num\\\":\\\"0\\\"}\"}","{\"Button:str\":\"cancel\",\"Timing:eval\":\"480\",\"Mechanics\":\"\",\"SwitchID:num\":\"0\",\"CommonEventID:num\":\"0\",\"Sound:struct\":\"{\\\"name:str\\\":\\\"Skill2\\\",\\\"volume:num\\\":\\\"90\\\",\\\"pitch:num\\\":\\\"150\\\",\\\"pan:num\\\":\\\"0\\\"}\"}"]
 * 
 * @arg LandingIcon:num
 * @text Landing Icon
 * @desc The icon used for the landing icon.
 * @default 16
 *
 * @arg Direction:str
 * @text Direction
 * @type select
 * @option left
 * @option right
 * @desc Which way do you want the buttons to move towards?
 * @default left
 * 
 * @arg VariableID:num
 * @text Hit Times Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how correct button
 * inputs the player has landed.
 * @default 1
 *
 * @arg MissCommonEventID:num
 * @text Miss Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play if the player misses.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg MissSound:struct
 * @text Miss Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when the player misses.
 * @default {"name:str":"Buzzer1","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 60
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QTE_TimingBar
 * @text QTE: Timing Bar (OK)
 * @desc Starts a Timing Bar QTE session.
 * Only one QTE can occur at a time.
 *
 * @arg Zones:arraystruct
 * @text Hit Zones
 * @type struct<HitZone>[]
 * @desc Set up Hit Zones where the player will gain points for landing on.
 * @default ["{\"HitArea\":\"\",\"Start:eval\":\"40\",\"End:eval\":\"60\",\"Label:str\":\"+5\",\"Mechanics\":\"\",\"Points:eval\":\"5\",\"CommonEventID:num\":\"0\",\"Color\":\"\",\"AreaColor1:str\":\"29\",\"AreaColor2:str\":\"28\"}","{\"HitArea\":\"\",\"Start:eval\":\"15\",\"End:eval\":\"20\",\"Label:str\":\"+10\",\"Mechanics\":\"\",\"Points:eval\":\"10\",\"CommonEventID:num\":\"0\",\"Color\":\"\",\"AreaColor1:str\":\"29\",\"AreaColor2:str\":\"28\"}","{\"HitArea\":\"\",\"Start:eval\":\"80\",\"End:eval\":\"85\",\"Label:str\":\"+10\",\"Mechanics\":\"\",\"Points:eval\":\"10\",\"CommonEventID:num\":\"0\",\"Color\":\"\",\"AreaColor1:str\":\"29\",\"AreaColor2:str\":\"28\"}"]
 * 
 * @arg CursorIcon:num
 * @text Cursor Icon
 * @desc The icon used for the player icon.
 * @default 84
 * 
 * @arg CursorSpeed:num
 * @text Cursor Speed
 * @type number
 * @min 1
 * @desc The speed at which the cursor moves.
 * @default 4
 * 
 * @arg SwitchID:num
 * @text Success Switch ID
 * @type switch
 * @desc Select which Switch ID to turn ON if all of the player lands
 * the cursor on a Hit Zone.
 * @default 1
 * 
 * @arg VariableID:num
 * @text Points Variable ID
 * @type variable
 * @parent Main
 * @desc Select which Variable ID to record how many points is earned
 * from the Hit Zone the player landed on.
 * @default 1
 *
 * @arg HitSound:struct
 * @text Hit Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when landing on a hit zone.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 * @arg MissSound:struct
 * @text Miss Sound
 * @type struct<Sound>
 * @desc Adjust the sound effect played when NOT landing a hit zone.
 * @default {"name:str":"Buzzer1","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @arg MissCommonEventID:num
 * @text Miss Common Event
 * @type common_event
 * @parent Main
 * @desc Select a Common Event to play when NOT landing a hit zone.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @arg InputStartDelay:eval
 * @text Input Start Delay
 * @parent Main
 * @desc How many frames (60 frames = 1 sec) delay before inputs
 * are accepted to not take the player by surprise?
 * @default 0
 *
 * @arg Duration:eval
 * @text QTE Duration
 * @parent Main
 * @desc The duration in frames (60 frames = 1 sec).
 * You may use code. Over 1000000 for infinite time.
 * @default 300
 *
 * @arg WaitForQTE:eval
 * @text Wait for QTE?
 * @parent Main
 * @type boolean
 * @on Wait Until Done
 * @off Don't Wait
 * @desc Wait until QTE Session is done?
 * @default true
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
 * @param QTE_TriggerSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param WatchDelay:num
 * @text JS Watch Update Delay
 * @parent Triggers
 * @type number
 * @min 1
 * @desc Used for <JS> Switches and Variables.
 * How many frames delay to wait for triggers?
 * @default 60
 *
 * @param GameOver:struct
 * @text Game Over Settings
 * @type struct<GameOver>
 * @desc These settings let you adjust Game Over-related trigger aspects.
 * @default {"DefaultGameOverEvent:num":"0","HealOnEvent:eval":"true","ClearOnEvent:eval":"false"}
 *
 * @param QTE:struct
 * @text QTE Settings
 * @type struct<QTE>
 * @desc These settings let you adjust QTE-related trigger aspects.
 * @default {"EarlyFinishDuration:num":"40","ShowQteTimer:eval":"true","qteTimerGaugeStyleType:str":"Dipper","QteTimerColor1:str":"26","QteTimerColor2:str":"27","QteTimerWindowRectJS:func":"\"// Declare Dimensions\\nlet width = Math.ceil(Graphics.width / 2);\\nlet height = Scene_Base.prototype.calcWindowHeight(1);\\nlet x = Math.floor((Graphics.width - width) / 2);\\nlet y = Graphics.height - Math.floor(height * 0.6);\\ny -= Scene_Base.prototype.calcWindowHeight(4, true);\\n\\n// Return Rectangle\\nreturn new Rectangle(x, y, width, height);\"","ShowQteProgress:eval":"true","qteProgressGaugeStyleType:str":"Arrow","QteProgressColor1:str":"17","QteProgressColor2:str":"24","QteProgressWindowRectJS:func":"\"// Declare Dimensions\\nlet width = Math.ceil(Graphics.width / 3);\\nlet height = Scene_Base.prototype.calcWindowHeight(1);\\nlet x = Math.floor((Graphics.width - width) / 2);\\nlet y = Graphics.height - Scene_Base.prototype.calcWindowHeight(3, false);\\ny -= Scene_Base.prototype.calcWindowHeight(4, true);\\n\\n// Return Rectangle\\nreturn new Rectangle(x, y, width, height);\"","TimedHitSuccessFrames:num":"12","TimedHitOpacity:num":"128","TimedHitMaxSize:num":"4.0","TimedSeqSuccessFrames:num":"8","TimedSequenceLandPosition:num":"30","QteTimingBarWidth:num":"600","TimingBarCursorOffsetX:num":"+0","TimingBarCursorOffsetY:num":"+6","TimingBarFontSize:num":"20","TimingBarLabelOffsetX:num":"+0","TimingBarLabelOffsetY:num":"+4","TimingBarColor1:str":"6","TimingBarColor2:str":"14"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed and QTE text window for this plugin.
 * @default {"MsgTextAlign:str":"center","Message":"","ButtonMashTextMsg:json":"\"Press \\\\C[27]<OK Button>\\\\C[0] or \\\\C[27]Screen Tap\\\\C[0]\\nas many times as you can!\"","ButtonSeqTextMsg:json":"\"Press the above \\\\C[27]Button Sequence\\\\c[0] before time runs out!\"","DirectionStruggleTextMsg:json":"\"Cycle through \\\\C[27]<Left Button>\\\\c[0] \\\\C[27]<Right Button>\\\\c[0] \\\\C[27]<Up Button>\\\\c[0] \\\\C[27]<Down Button>\\\\c[0] buttons\\nrepeatedly to fill the above gauge!\"","FillGaugeTextMsg:json":"\"Press \\\\C[27]<OK Button>\\\\C[0] or \\\\C[27]Screen Tap\\\\C[0]\\nrepeatedly to fill the above gauge!\"","HoldReleaseTextMsg:json":"\"Hold \\\\C[27]<OK Button>\\\\C[0] or \\\\C[27]Press Screen\\\\C[0] until the\\nabove gauge is nearly full, then \\\\C[27]release\\\\c[0]!\"","MarcherTextMsg:json":"\"Alternate between \\\\C[27]<Page Up Button>\\\\c[0] and \\\\C[27]<Page Down Button>\\\\c[0] buttons\\nrepeatedly to fill the above gauge!\"","SwapperTextMsg:json":"\"Alternate between \\\\C[27]<OK Button>\\\\c[0] and \\\\C[27]<Cancel Button>\\\\c[0] buttons\\nrepeatedly to fill the above gauge!\"","TimedHitTextMsg:json":"\"Press \\\\C[27]<OK Button>\\\\C[0] or \\\\C[27]Screen Tap\\\\C[0]\\nat the right time!\"","TimedSeqTextMsg:json":"\"Press the \\\\C[27]Button Sequence\\\\C[0] at the right time!\"","TimingBarTextMsg:json":"\"Press \\\\C[27]<OK Button>\\\\C[0] or \\\\C[27]Screen Tap\\\\C[0] to stop the cursor!\"","MessageWindow":"","MsgWindowBgType:num":"1","MsgWindowRectJS:func":"\"// Declare Lines\\nlet lines = 2;\\n\\n// Declare Dimensions\\nlet width = Graphics.width;\\nlet height = Scene_Base.prototype.calcWindowHeight(lines);\\nlet x = 0;\\nlet y = Graphics.height - height;\\ny -= Scene_Base.prototype.calcWindowHeight(4, true);\\n\\n// Return Rectangle\\nreturn new Rectangle(x, y, width, height);\""}
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
 * Game Over Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameOver:
 * 
 * @param DefaultGameOverEvent:num
 * @text Default Common Event
 * @parent GameOver
 * @type common_event
 * @desc Do you want there to be a Default Common Event?
 * It can be changed later. 0 to not use.
 * @default 0
 *
 * @param HealOnEvent:eval
 * @text Heal on Common Event?
 * @parent GameOver
 * @type boolean
 * @on Heal
 * @off Don't Heal
 * @desc Do you want to heal 1 HP for all dead members after
 * running the Game Over Common Event?
 * @default true
 *
 * @param ClearOnEvent:eval
 * @text Clear After?
 * @parent GameOver
 * @type boolean
 * @on Clear
 * @off Don't Clear
 * @desc Do you wish to clear the Game Over Common Event after
 * it launches or not?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * QTE Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QTE:
 *
 * @param EarlyFinishDuration:num
 * @text Early Finish Duration
 * @type number
 * @min 1
 * @desc How many frames should the game wait if the player finishes a QTE early?
 * @default 40
 *
 * @param ShowQteTimer:eval
 * @text Show QTE Timer?
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Do you wish to show a QTE Timer over each QTE window?
 * @default true
 * 
 * @param qteTimerGaugeStyleType:str
 * @text Timer Gauge Style
 * @parent ShowQteTimer:eval
 * @type select
 * @option -
 * @option Normal
 * @option -
 * @option Arrow
 * @option Dipper
 * @option Flag
 * @option Growth
 * @option Lean
 * @option Quad
 * @option Stagger
 * @option Trapezoid
 * @option -
 * @option HalfStep
 * @option ThirdStep
 * @option FourthStep
 * @option FifthStep
 * @option SixthStep
 * @option EighthStep
 * @option TenthStep
 * @option -
 * @option HalfSection
 * @option ThirdSection
 * @option FourthSection
 * @option FifthSection
 * @option SixthSection
 * @option EighthSection
 * @option TenthSection
 * @option -
 * @option SegmentBy10
 * @option SegmentBy20
 * @option SegmentBy25
 * @option SegmentBy50
 * @option SegmentBy100
 * @option SegmentBy200
 * @option SegmentBy250
 * @option SegmentBy500
 * @option SegmentBy1000
 * @option -
 * @desc Select the gauge style to use for QTE Timer.
 * Requires VisuMZ_3_VisualGaugeStyles!
 * @default Dipper
 *
 * @param QteTimerColor1:str
 * @text Gauge Color 1
 * @parent ShowQteTimer:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param QteTimerColor2:str
 * @text Gauge Color 2
 * @parent ShowQteTimer:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param QteTimerWindowRectJS:func
 * @text JS: X, Y, W, H
 * @parent ShowQteTimer:eval
 * @type note
 * @desc Code used to determine the position and dimensions for this window containing the gauge.
 * @default "// Declare Dimensions\nlet width = Math.ceil(Graphics.width / 2);\nlet height = Scene_Base.prototype.calcWindowHeight(1);\nlet x = Math.floor((Graphics.width - width) / 2);\nlet y = Graphics.height - Math.floor(height * 0.6);\ny -= Scene_Base.prototype.calcWindowHeight(4, true);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ShowQteProgress:eval
 * @text Show QTE Progress?
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show a progress gauge for certain types of QTE's?
 * @default true
 * 
 * @param qteProgressGaugeStyleType:str
 * @text Progress Gauge Style
 * @parent ShowQteProgress:eval
 * @type select
 * @option -
 * @option Normal
 * @option -
 * @option Arrow
 * @option Dipper
 * @option Flag
 * @option Growth
 * @option Lean
 * @option Quad
 * @option Stagger
 * @option Trapezoid
 * @option -
 * @option HalfStep
 * @option ThirdStep
 * @option FourthStep
 * @option FifthStep
 * @option SixthStep
 * @option EighthStep
 * @option TenthStep
 * @option -
 * @option HalfSection
 * @option ThirdSection
 * @option FourthSection
 * @option FifthSection
 * @option SixthSection
 * @option EighthSection
 * @option TenthSection
 * @option -
 * @option SegmentBy10
 * @option SegmentBy20
 * @option SegmentBy25
 * @option SegmentBy50
 * @option SegmentBy100
 * @option SegmentBy200
 * @option SegmentBy250
 * @option SegmentBy500
 * @option SegmentBy1000
 * @option -
 * @desc Select the gauge style to use for QTE Timer.
 * Requires VisuMZ_3_VisualGaugeStyles!
 * @default Growth
 *
 * @param QteProgressColor1:str
 * @text Gauge Color 1
 * @parent ShowQteProgress:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param QteProgressColor2:str
 * @text Gauge Color 2
 * @parent ShowQteProgress:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param QteProgressWindowRectJS:func
 * @text JS: X, Y, W, H
 * @parent ShowQteProgress:eval
 * @type note
 * @desc Code used to determine the position and dimensions for this window containing the gauge.
 * @default "// Declare Dimensions\nlet width = Math.ceil(Graphics.width / 3);\nlet height = Scene_Base.prototype.calcWindowHeight(1);\nlet x = Math.floor((Graphics.width - width) / 2);\nlet y = Graphics.height - Scene_Base.prototype.calcWindowHeight(3, false);\ny -= Scene_Base.prototype.calcWindowHeight(4, true);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param TimedHitSuccessFrames:num
 * @text Timed Hit Leeway
 * @type number
 * @min 1
 * @desc How many frames of leeway should be granted to Timed Hit QTE?
 * @default 12
 *
 * @param TimedHitOpacity:num
 * @text Overlay Opacity
 * @parent TimedHitSuccessFrames:num
 * @type number
 * @min 0
 * @max 255
 * @desc Timed Hit overlay sprite opacity.
 * @default 128
 *
 * @param TimedHitMaxSize:num
 * @text Max Scaling
 * @parent TimedHitSuccessFrames:num
 * @desc What's the max scaling for Timed Hit QTE indicators?
 * @default 4.0
 *
 * @param TimedSeqSuccessFrames:num
 * @text Timed Sequence Leeway
 * @type number
 * @min 1
 * @desc How many frames of leeway should be granted to Timed Sequence QTE?
 * @default 8
 *
 * @param TimedSequenceLandPosition:num
 * @text Sequence Position
 * @parent TimedSeqSuccessFrames:num
 * @type number
 * @min 0
 * @max 100
 * @desc What is the position for the Timed Sequence Landing Icon?
 * Use a number between 0 and 100.
 * @default 30
 *
 * @param QteTimingBarWidth:num
 * @text QTE Timing Bar Width
 * @type number
 * @min 1
 * @desc This is the width of the Timing Bar in pixels.
 * @default 600
 *
 * @param TimingBarCursorOffsetX:num
 * @text Cursor Offset X
 * @parent QteTimingBarWidth:num
 * @desc Offsets the cursor x position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param TimingBarCursorOffsetY:num
 * @text Cursor Offset Y
 * @parent QteTimingBarWidth:num
 * @desc Offsets the cursor y position.
 * Negative: up. Positive: down.
 * @default +6
 *
 * @param TimingBarFontSize:num
 * @text Label Font Size
 * @parent QteTimingBarWidth:num
 * @number
 * @min 1
 * @desc What is the font size used to display timing bar labels?
 * @default 20
 *
 * @param TimingBarLabelOffsetX:num
 * @text Label Offset X
 * @parent QteTimingBarWidth:num
 * @desc Offsets the label x position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param TimingBarLabelOffsetY:num
 * @text Label Offset Y
 * @parent QteTimingBarWidth:num
 * @desc Offsets the label y position.
 * Negative: up. Positive: down.
 * @default +4
 *
 * @param TimingBarColor1:str
 * @text Timing Bar Color 1
 * @parent QteTimingBarWidth:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param TimingBarColor2:str
 * @text Timing Bar Color 2
 * @parent QteTimingBarWidth:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param MsgTextAlign:str
 * @text Text Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc What is the text alignment? Requires VisuMZ_1_MessageCore!
 * Otherwise, defaults to left alignment.
 * @default center
 * 
 * @param Message
 * @text Message Settings
 * 
 * @param ButtonMashTextMsg:json
 * @text Button Mash Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Press \\C[27]<OK Button>\\C[0] or \\C[27]Screen Tap\\C[0]\nas many times as you can!"
 * 
 * @param ButtonSeqTextMsg:json
 * @text Button Sequence Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported.
 * @default "Press the above \\C[27]Button Sequence\\c[0] before time runs out!"
 * 
 * @param DirectionStruggleTextMsg:json
 * @text Direction Struggle
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Cycle through \\C[27]<Left Button>\\c[0] \\C[27]<Right Button>\\c[0] \\C[27]<Up Button>\\c[0] \\C[27]<Down Button>\\c[0] buttons\nrepeatedly to fill the above gauge!"
 * 
 * @param FillGaugeTextMsg:json
 * @text Fill Gauge Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Press \\C[27]<OK Button>\\C[0] or \\C[27]Screen Tap\\C[0]\nrepeatedly to fill the above gauge!"
 * 
 * @param HoldReleaseTextMsg:json
 * @text Hold & Release Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Hold \\C[27]<OK Button>\\C[0] or \\C[27]Press Screen\\C[0] until the\nabove gauge is nearly full, then \\C[27]release\\c[0]!"
 * 
 * @param MarcherTextMsg:json
 * @text Marcher Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Alternate between \\C[27]<Page Up Button>\\c[0] and \\C[27]<Page Down Button>\\c[0] buttons\nrepeatedly to fill the above gauge!"
 * 
 * @param SwapperTextMsg:json
 * @text Swapper Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Alternate between \\C[27]<OK Button>\\c[0] and \\C[27]<Cancel Button>\\c[0] buttons\nrepeatedly to fill the above gauge!"
 * 
 * @param TimedHitTextMsg:json
 * @text Timed Hit Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported. Leave empty for no window.
 * @default "Press \\C[27]<OK Button>\\C[0] or \\C[27]Screen Tap\\C[0]\nat the right time!"
 * 
 * @param TimedSeqTextMsg:json
 * @text Timed Sequence Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported.
 * @default "Press the \\C[27]Button Sequence\\C[0] at the right time!"
 * 
 * @param TimingBarTextMsg:json
 * @text Timing Bar Text
 * @parent Message
 * @type note
 * @desc Alter the text that appears for the QTE Window.
 * Text codes are supported.
 * @default "Press \\C[27]<OK Button>\\C[0] or \\C[27]Screen Tap\\C[0] to stop the cursor!"
 * 
 * @param MessageWindow
 * @text Message Window
 *
 * @param MsgWindowBgType:num
 * @text Background Type
 * @parent MessageWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 1
 *
 * @param MsgWindowRectJS:func
 * @text JS: X, Y, W, H
 * @parent MessageWindow
 * @type note
 * @desc Code used to determine the position and dimensions for this window.
 * @default "// Declare Lines\nlet lines = 2;\n\n// Declare Dimensions\nlet width = Graphics.width;\nlet height = Scene_Base.prototype.calcWindowHeight(lines);\nlet x = 0;\nlet y = Graphics.height - height;\ny -= Scene_Base.prototype.calcWindowHeight(4, true);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Hit Zones Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HitZone:
 *
 * @param HitArea
 * @text Hit Area
 *
 * @param Start:eval
 * @text Start
 * @parent HitArea
 * @desc This is the starting location of the hit area.
 * Use numbers between 0 and 100. You may use code.
 * @default 40
 *
 * @param End:eval
 * @text End
 * @parent HitArea
 * @desc This is the ending location of the hit area.
 * Use numbers between 0 and 100. You may use code.
 * @default 60
 *
 * @param Label:str
 * @text Label
 * @parent HitArea
 * @desc Text displayed for this hit area (centered).
 * Text codes are supported. Leave empty to not use.
 * @default +5
 *
 * @param Mechanics
 * @text Mechanic Settings
 *
 * @param Points:eval
 * @text Variable Points
 * @parent Mechanics
 * @desc If the cursor lands in this zone, then assign this
 * many points to the results variable. You may use code.
 * @default 5
 *
 * @param CommonEventID:num
 * @text Hit Common Event
 * @parent Mechanics
 * @type common_event
 * @desc Select a Common Event to play when this zone is hit.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @param Color
 * @text Color Settings
 *
 * @param AreaColor1:str
 * @text Area Color 1
 * @parent Color
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param AreaColor2:str
 * @text Area Color 2
 * @parent Color
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 */
/* ----------------------------------------------------------------------------
 * Timing Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Timing:
 *
 * @param Button:str
 * @text Button
 * @type select
 * @option 
 * @option down
 * @option left
 * @option right
 * @option up
 * @option 
 * @option ok
 * @option cancel
 * @option pageup
 * @option pagedown
 * @option shift
 * @option 
 * @desc What button is needed to be pressed?
 * @default ok
 * 
 * @param Timing:eval
 * @text Press in X Frames
 * @parent Button:str
 * @desc Press the button by these frames (60 frames = 1 sec)
 * with some leeway. You may use code. 
 * @default 60
 *
 * @param Mechanics
 * @text Mechanic Settings
 * 
 * @param SwitchID:num
 * @text Success Switch ID
 * @parent Mechanics
 * @type switch
 * @desc Select which Switch ID to turn ON if the button is
 * successfully hit. Use 0 to not change a switch.
 * @default 0
 *
 * @param CommonEventID:num
 * @text Hit Common Event
 * @parent Mechanics
 * @type common_event
 * @desc Select a Common Event to play when this button is hit.
 * Use 0 to not play a Common Event.
 * @default 0
 *
 * @param Sound:struct
 * @text Button Press Sound
 * @parent Mechanics
 * @type struct<Sound>
 * @desc Adjust the sound effect played when a button is pressed.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"150","pan:num":"0"}
 *
 */
//=============================================================================

function _0x52a4(_0xc80823,_0x2cc079){const _0x1338d9=_0x1338();return _0x52a4=function(_0x52a467,_0x225539){_0x52a467=_0x52a467-0x7a;let _0x1d58cb=_0x1338d9[_0x52a467];return _0x1d58cb;},_0x52a4(_0xc80823,_0x2cc079);}const _0xa66f72=_0x52a4;(function(_0x3d5baa,_0x4dd91c){const _0x1e85ee=_0x52a4,_0x173a6d=_0x3d5baa();while(!![]){try{const _0x453527=-parseInt(_0x1e85ee(0x2d0))/0x1+-parseInt(_0x1e85ee(0x2ac))/0x2*(-parseInt(_0x1e85ee(0x201))/0x3)+-parseInt(_0x1e85ee(0x280))/0x4*(-parseInt(_0x1e85ee(0x2d3))/0x5)+-parseInt(_0x1e85ee(0x259))/0x6+-parseInt(_0x1e85ee(0x268))/0x7*(parseInt(_0x1e85ee(0xa3))/0x8)+parseInt(_0x1e85ee(0x1e4))/0x9+parseInt(_0x1e85ee(0x13c))/0xa;if(_0x453527===_0x4dd91c)break;else _0x173a6d['push'](_0x173a6d['shift']());}catch(_0x460079){_0x173a6d['push'](_0x173a6d['shift']());}}}(_0x1338,0xc56b6));var label=_0xa66f72(0x1fc),tier=tier||0x0,dependencies=[_0xa66f72(0xf0),'VisuMZ_1_EventsMoveCore'],pluginData=$plugins[_0xa66f72(0xba)](function(_0x48efc2){const _0x209778=_0xa66f72;return _0x48efc2[_0x209778(0x90)]&&_0x48efc2[_0x209778(0xca)][_0x209778(0x196)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0xa66f72(0x2b5)]||{},VisuMZ[_0xa66f72(0x95)]=function(_0xbcb3c4,_0x41aefc){const _0x1a62d4=_0xa66f72;for(const _0x2bc7cc in _0x41aefc){if(_0x1a62d4(0x234)==='zUifK'){if(_0x2bc7cc['match'](/(.*):(.*)/i)){const _0x4eae4d=String(RegExp['$1']),_0x274479=String(RegExp['$2'])['toUpperCase']()[_0x1a62d4(0xce)]();let _0x42928b,_0x284ae2,_0xf3a11b;switch(_0x274479){case _0x1a62d4(0x1fe):_0x42928b=_0x41aefc[_0x2bc7cc]!==''?Number(_0x41aefc[_0x2bc7cc]):0x0;break;case _0x1a62d4(0x1bd):_0x284ae2=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):[],_0x42928b=_0x284ae2[_0x1a62d4(0x251)](_0x29be87=>Number(_0x29be87));break;case _0x1a62d4(0x2b2):_0x42928b=_0x41aefc[_0x2bc7cc]!==''?eval(_0x41aefc[_0x2bc7cc]):null;break;case _0x1a62d4(0x131):_0x284ae2=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):[],_0x42928b=_0x284ae2[_0x1a62d4(0x251)](_0x509fa6=>eval(_0x509fa6));break;case'JSON':_0x42928b=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):'';break;case _0x1a62d4(0x1b0):_0x284ae2=_0x41aefc[_0x2bc7cc]!==''?JSON['parse'](_0x41aefc[_0x2bc7cc]):[],_0x42928b=_0x284ae2[_0x1a62d4(0x251)](_0x55f5fc=>JSON[_0x1a62d4(0x288)](_0x55f5fc));break;case _0x1a62d4(0x8a):_0x42928b=_0x41aefc[_0x2bc7cc]!==''?new Function(JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc])):new Function(_0x1a62d4(0x213));break;case'ARRAYFUNC':_0x284ae2=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):[],_0x42928b=_0x284ae2['map'](_0x35b2b5=>new Function(JSON['parse'](_0x35b2b5)));break;case'STR':_0x42928b=_0x41aefc[_0x2bc7cc]!==''?String(_0x41aefc[_0x2bc7cc]):'';break;case _0x1a62d4(0x2bb):_0x284ae2=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):[],_0x42928b=_0x284ae2[_0x1a62d4(0x251)](_0x4066f6=>String(_0x4066f6));break;case'STRUCT':_0xf3a11b=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):{},_0x42928b=VisuMZ[_0x1a62d4(0x95)]({},_0xf3a11b);break;case'ARRAYSTRUCT':_0x284ae2=_0x41aefc[_0x2bc7cc]!==''?JSON[_0x1a62d4(0x288)](_0x41aefc[_0x2bc7cc]):[],_0x42928b=_0x284ae2[_0x1a62d4(0x251)](_0x4e03b1=>VisuMZ[_0x1a62d4(0x95)]({},JSON[_0x1a62d4(0x288)](_0x4e03b1)));break;default:continue;}_0xbcb3c4[_0x4eae4d]=_0x42928b;}}else{const _0x590292=_0x1e62db[_0x1a62d4(0x17c)]();_0x48715e(_0x11bdb0,_0x590292?_0x590292['_eventId']:0x0);}}return _0xbcb3c4;},(_0x5eb57e=>{const _0x1ce635=_0xa66f72,_0x3547fb=_0x5eb57e[_0x1ce635(0xb9)];for(const _0x129c30 of dependencies){if(!Imported[_0x129c30]){if(_0x1ce635(0x2af)===_0x1ce635(0x211)){if(this[_0x1ce635(0x120)][_0x1ce635(0x149)](/QTE/i)){if(_0x131d58[_0x1ce635(0x2e7)]())return!![];else this[_0x1ce635(0x120)]='';}return _0xb28e21[_0x1ce635(0x1fc)][_0x1ce635(0x252)][_0x1ce635(0x1ba)](this);}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1ce635(0xc3)](_0x3547fb,_0x129c30)),SceneManager[_0x1ce635(0x29f)]();break;}}}const _0x58798a=_0x5eb57e[_0x1ce635(0xca)];if(_0x58798a[_0x1ce635(0x149)](/\[Version[ ](.*?)\]/i)){if(_0x1ce635(0x10a)!==_0x1ce635(0x10a)){const _0x33ac16=_0x49fa4e(_0x3e8351['$1']);_0x33ac16<_0x5b8abf?(_0x16120a(_0x1ce635(0x1f8)['format'](_0x4e318a,_0x33ac16,_0x1d8991)),_0x228cc7['exit']()):_0x123d6d=_0x571368[_0x1ce635(0x89)](_0x33ac16,_0x3be96b);}else{const _0x4edab7=Number(RegExp['$1']);_0x4edab7!==VisuMZ[label][_0x1ce635(0xb8)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1ce635(0xc3)](_0x3547fb,_0x4edab7)),SceneManager[_0x1ce635(0x29f)]());}}if(_0x58798a[_0x1ce635(0x149)](/\[Tier[ ](\d+)\]/i)){const _0x34de9c=Number(RegExp['$1']);if(_0x34de9c<tier)alert(_0x1ce635(0x1f8)[_0x1ce635(0xc3)](_0x3547fb,_0x34de9c,tier)),SceneManager[_0x1ce635(0x29f)]();else{if(_0x1ce635(0xb1)===_0x1ce635(0xb1))tier=Math[_0x1ce635(0x89)](_0x34de9c,tier);else{const _0x404486=_0x17b336['QTE_TriggerSys'][_0x1ce635(0x2b5)][_0x1ce635(0xa7)];return _0x404486['qteTimerGaugeStyleType'];}}}VisuMZ[_0x1ce635(0x95)](VisuMZ[label][_0x1ce635(0x2b5)],_0x5eb57e[_0x1ce635(0x1c0)]);})(pluginData);if(VisuMZ['CoreEngine']['version']<1.79){let text='';text+=_0xa66f72(0x160),text+=_0xa66f72(0x16d),alert(text),SceneManager['exit']();}if(VisuMZ[_0xa66f72(0xc8)][_0xa66f72(0xb8)]<1.5){let text='';text+=_0xa66f72(0x1da),text+=_0xa66f72(0x16d),alert(text),SceneManager['exit']();}PluginManager['registerCommand'](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x12b),_0xc11c14=>{const _0x536728=_0xa66f72;VisuMZ[_0x536728(0x95)](_0xc11c14,_0xc11c14);const _0x598ae9=_0xc11c14[_0x536728(0x181)]||0x0;$gameSystem[_0x536728(0x1f5)](_0x598ae9);}),PluginManager[_0xa66f72(0x28e)](pluginData['name'],'GameOverCommonEventClear',_0x1c1e67=>{const _0x14860e=_0xa66f72;VisuMZ[_0x14860e(0x95)](_0x1c1e67,_0x1c1e67),$gameSystem[_0x14860e(0x1f5)](0x0);}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x219),_0x5f43f4=>{const _0x3e5ad7=_0xa66f72;VisuMZ[_0x3e5ad7(0x95)](_0x5f43f4,_0x5f43f4);const _0xd4b243=_0x5f43f4['dataID']||0x0;if(_0xd4b243<=0x0)return;const _0x5e812a=_0x5f43f4['CommonEventIDs']||[],_0x42d5eb=_0x3e5ad7(0x2ca);$gameSystem[_0x3e5ad7(0x1d9)](_0x42d5eb,_0xd4b243,_0x5e812a);}),PluginManager[_0xa66f72(0x28e)](pluginData['name'],_0xa66f72(0x1e7),_0x5c623b=>{const _0x48c69e=_0xa66f72;VisuMZ[_0x48c69e(0x95)](_0x5c623b,_0x5c623b);const _0x4004ee=_0x5c623b[_0x48c69e(0x15b)]||0x0;if(_0x4004ee<=0x0)return;const _0x17cf66=_0x5c623b[_0x48c69e(0x85)]||[],_0x2cd603='variables';$gameSystem[_0x48c69e(0x1d9)](_0x2cd603,_0x4004ee,_0x17cf66);}),PluginManager['registerCommand'](pluginData[_0xa66f72(0xb9)],_0xa66f72(0xb5),_0x59d9e2=>{const _0x2b3414=_0xa66f72;VisuMZ[_0x2b3414(0x95)](_0x59d9e2,_0x59d9e2);const _0x4f20ac=_0x59d9e2[_0x2b3414(0x15b)]||0x0;if(_0x4f20ac<=0x0)return;const _0x47f779=_0x59d9e2['CommonEventIDs']||[],_0x1c5029=_0x2b3414(0x222);$gameSystem[_0x2b3414(0x1d9)](_0x1c5029,_0x4f20ac,_0x47f779);}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x266),_0x3d7a5a=>{const _0x57a32c=_0xa66f72;VisuMZ[_0x57a32c(0x95)](_0x3d7a5a,_0x3d7a5a);const _0x53baa6=_0x3d7a5a[_0x57a32c(0x15b)]||0x0;if(_0x53baa6<=0x0)return;const _0x193ee3=_0x3d7a5a[_0x57a32c(0x85)]||[],_0x57f662=_0x57a32c(0x138);$gameSystem['addQTE_TriggerSysPromiseToSet'](_0x57f662,_0x53baa6,_0x193ee3);}),PluginManager['registerCommand'](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x243),_0x3e5c5c=>{const _0x41623e=_0xa66f72;VisuMZ[_0x41623e(0x95)](_0x3e5c5c,_0x3e5c5c);const _0x24c0b4=_0x3e5c5c[_0x41623e(0x15b)]||0x0;if(_0x24c0b4<=0x0)return;const _0x96901d=_0x3e5c5c[_0x41623e(0x85)]||[],_0x3f63b4=_0x41623e(0x25a);$gameSystem[_0x41623e(0x1d9)](_0x3f63b4,_0x24c0b4,_0x96901d);}),PluginManager[_0xa66f72(0x28e)](pluginData['name'],_0xa66f72(0xc7),_0x50c51e=>{const _0x5eb07e=_0xa66f72;SceneManager[_0x5eb07e(0x104)]['removeQteWindow'](),SceneManager[_0x5eb07e(0x2c2)]();}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x2c7),_0x9ed36=>{const _0x34b916=_0xa66f72;if(SceneManager['checkPlayingQTE']())return;VisuMZ[_0x34b916(0x95)](_0x9ed36,_0x9ed36);const _0x5d4ca0={'type':'buttonMash','varID':_0x9ed36[_0x34b916(0x9a)]||0x0,'commonEventID':_0x9ed36[_0x34b916(0x181)]||0x0,'sound':_0x9ed36[_0x34b916(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x9ed36[_0x34b916(0xdb)]||0x0,'duration':(_0x9ed36[_0x34b916(0x105)]||0x1)[_0x34b916(0x1a8)](0x1,0xf423f)},_0x4aca88=_0x9ed36[_0x34b916(0x271)];SceneManager[_0x34b916(0xa5)](_0x5d4ca0);if(_0x4aca88){const _0x4d25cc=$gameTemp[_0x34b916(0x17c)]();if(_0x4d25cc)_0x4d25cc[_0x34b916(0x1ec)](_0x34b916(0xa7));}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x20f),_0x29a1de=>{const _0x1d30fe=_0xa66f72;if(SceneManager[_0x1d30fe(0x1df)]())return;VisuMZ[_0x1d30fe(0x95)](_0x29a1de,_0x29a1de);const _0x37bb08={'type':_0x1d30fe(0x2b1),'sequence':(_0x29a1de[_0x1d30fe(0x163)]||[])[_0x1d30fe(0x1f9)](),'shuffle':_0x29a1de[_0x1d30fe(0xa6)]||![],'progress':0x0,'switchID':_0x29a1de[_0x1d30fe(0x1a9)]||0x0,'varID':_0x29a1de[_0x1d30fe(0x9a)]||0x0,'commonEventID':_0x29a1de[_0x1d30fe(0x181)]||0x0,'sound':_0x29a1de[_0x1d30fe(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x29a1de[_0x1d30fe(0xdb)]||0x0,'duration':_0x29a1de[_0x1d30fe(0x105)]||0x1},_0xe6b776=_0x29a1de[_0x1d30fe(0x271)];_0x37bb08['shuffle']&&(_0x37bb08[_0x1d30fe(0x24d)]=VisuMZ[_0x1d30fe(0x1fc)][_0x1d30fe(0xf5)](_0x37bb08[_0x1d30fe(0x24d)]));SceneManager['setupQTE'](_0x37bb08);if(_0xe6b776){if(_0x1d30fe(0x291)===_0x1d30fe(0x1c8))_0x23a01b[_0x1d30fe(0x227)](),_0x4e2a7c[_0x1d30fe(0x227)]();else{const _0x3e50da=$gameTemp[_0x1d30fe(0x17c)]();if(_0x3e50da)_0x3e50da[_0x1d30fe(0x1ec)](_0x1d30fe(0xa7));}}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x139),_0x456e96=>{const _0x519b62=_0xa66f72;if(SceneManager[_0x519b62(0x1df)]())return;VisuMZ[_0x519b62(0x95)](_0x456e96,_0x456e96);const _0x1f17b7={'type':_0x519b62(0x2b1),'buttons':(_0x456e96[_0x519b62(0xb6)]||[])['remove']('')[_0x519b62(0x1f9)](),'sequence':[],'length':_0x456e96[_0x519b62(0xe5)]||0x1,'progress':0x0,'switchID':_0x456e96[_0x519b62(0x1a9)]||0x0,'varID':_0x456e96[_0x519b62(0x9a)]||0x0,'commonEventID':_0x456e96[_0x519b62(0x181)]||0x0,'sound':_0x456e96[_0x519b62(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x456e96[_0x519b62(0xdb)]||0x0,'duration':_0x456e96[_0x519b62(0x105)]||0x1},_0x1f18d9=_0x456e96[_0x519b62(0x271)];let _0xd966f7=_0x1f17b7['length'];while(_0xd966f7--){const _0x3cf51b=_0x1f17b7['buttons'][Math[_0x519b62(0x1bc)](_0x1f17b7[_0x519b62(0x114)][_0x519b62(0x17e)])];_0x1f17b7[_0x519b62(0x24d)][_0x519b62(0x132)](_0x3cf51b||'ok');}SceneManager[_0x519b62(0xa5)](_0x1f17b7);if(_0x1f18d9){const _0x11a54b=$gameTemp[_0x519b62(0x17c)]();if(_0x11a54b)_0x11a54b['setWaitMode'](_0x519b62(0xa7));}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],'QTE_DirectionStruggle',_0x38fbe0=>{const _0x26368b=_0xa66f72;if(SceneManager[_0x26368b(0x1df)]())return;VisuMZ['ConvertParams'](_0x38fbe0,_0x38fbe0);const _0x3c6953={'type':_0x26368b(0x2a2),'goal':_0x38fbe0[_0x26368b(0x25b)]||0x1,'progress':0x0,'switchID':_0x38fbe0[_0x26368b(0x1a9)]||0x0,'varID':_0x38fbe0[_0x26368b(0x9a)]||0x0,'commonEventID':_0x38fbe0[_0x26368b(0x181)]||0x0,'sound':_0x38fbe0[_0x26368b(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x38fbe0['InputStartDelay']||0x0,'duration':_0x38fbe0[_0x26368b(0x105)]||0x1},_0x303b57=_0x38fbe0['WaitForQTE'];SceneManager[_0x26368b(0xa5)](_0x3c6953);if(_0x303b57){if(_0x26368b(0x1ad)==='vGnfW')_0xbeac8d[_0x26368b(0x27f)](_0x5ec9b0,this[_0x26368b(0x10f)]);else{const _0x4eedda=$gameTemp[_0x26368b(0x17c)]();if(_0x4eedda)_0x4eedda[_0x26368b(0x1ec)](_0x26368b(0xa7));}}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],'QTE_FillGauge',_0x123263=>{const _0x1457fe=_0xa66f72;if(SceneManager['checkPlayingQTE']())return;VisuMZ[_0x1457fe(0x95)](_0x123263,_0x123263);const _0x5bdc74={'type':'fillGauge','goal':_0x123263['FillRequirement']||0x1,'progress':0x0,'switchID':_0x123263['SwitchID']||0x0,'varID':_0x123263[_0x1457fe(0x9a)]||0x0,'commonEventID':_0x123263[_0x1457fe(0x181)]||0x0,'sound':_0x123263[_0x1457fe(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x123263['InputStartDelay']||0x0,'duration':_0x123263['Duration']||0x1},_0x48f0c8=_0x123263[_0x1457fe(0x271)];SceneManager['setupQTE'](_0x5bdc74);if(_0x48f0c8){const _0x334118=$gameTemp[_0x1457fe(0x17c)]();if(_0x334118)_0x334118[_0x1457fe(0x1ec)](_0x1457fe(0xa7));}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],'QTE_HoldRelease',_0xffb5c1=>{const _0x150237=_0xa66f72;if(SceneManager[_0x150237(0x1df)]())return;VisuMZ[_0x150237(0x95)](_0xffb5c1,_0xffb5c1);const _0x4188b7={'type':_0x150237(0x1bf),'goal':(_0xffb5c1[_0x150237(0x111)]||0x1)[_0x150237(0x1a8)](0x1,0xf423f),'progress':0x0,'switchID':_0xffb5c1[_0x150237(0x1a9)]||0x0,'varID':_0xffb5c1[_0x150237(0x9a)]||0x0,'releaseSound':_0xffb5c1['ReleaseSound']||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'overloadSound':_0xffb5c1[_0x150237(0x93)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0xffb5c1['InputStartDelay']||0x0,'duration':0x1f40,'HoldCommonEventID':_0xffb5c1[_0x150237(0x7d)]||0x0,'ReleaseCommonEventID':_0xffb5c1['ReleaseCommonEventID']||0x0,'OverloadCommonEventID':_0xffb5c1[_0x150237(0x127)]||0x0},_0x45eeea=_0xffb5c1[_0x150237(0x271)];SceneManager[_0x150237(0xa5)](_0x4188b7);if(_0x45eeea){const _0x210d7d=$gameTemp[_0x150237(0x17c)]();if(_0x210d7d)_0x210d7d['setWaitMode'](_0x150237(0xa7));}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0xc5),_0x1316f8=>{const _0x4155d3=_0xa66f72;if(SceneManager[_0x4155d3(0x1df)]())return;VisuMZ[_0x4155d3(0x95)](_0x1316f8,_0x1316f8);const _0x6700fd={'type':_0x4155d3(0xc4),'goal':_0x1316f8[_0x4155d3(0x1c2)]||0x1,'progress':0x0,'switchID':_0x1316f8['SwitchID']||0x0,'varID':_0x1316f8[_0x4155d3(0x9a)]||0x0,'pageUpCommonEventID':_0x1316f8[_0x4155d3(0x292)]||0x0,'pageDownCommonEventID':_0x1316f8[_0x4155d3(0xf7)]||0x0,'sound':_0x1316f8[_0x4155d3(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x1316f8[_0x4155d3(0xdb)]||0x0,'duration':_0x1316f8[_0x4155d3(0x105)]||0x1},_0x4b75b4=_0x1316f8['WaitForQTE'];SceneManager[_0x4155d3(0xa5)](_0x6700fd);if(_0x4b75b4){const _0x450792=$gameTemp[_0x4155d3(0x17c)]();if(_0x450792)_0x450792[_0x4155d3(0x1ec)](_0x4155d3(0xa7));}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0xfc),_0x39e437=>{const _0x4330ae=_0xa66f72;if(SceneManager['checkPlayingQTE']())return;VisuMZ[_0x4330ae(0x95)](_0x39e437,_0x39e437);const _0x4b3f33={'type':'swapper','goal':_0x39e437[_0x4330ae(0x1c2)]||0x1,'progress':0x0,'switchID':_0x39e437[_0x4330ae(0x1a9)]||0x0,'varID':_0x39e437[_0x4330ae(0x9a)]||0x0,'okCommonEventID':_0x39e437[_0x4330ae(0x1a0)]||0x0,'cancelCommonEventID':_0x39e437[_0x4330ae(0x17d)]||0x0,'sound':_0x39e437[_0x4330ae(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x39e437['InputStartDelay']||0x0,'duration':_0x39e437[_0x4330ae(0x105)]||0x1},_0x2d462b=_0x39e437[_0x4330ae(0x271)];SceneManager[_0x4330ae(0xa5)](_0x4b3f33);if(_0x2d462b){if('rhLRx'==='agKoh')this[_0x4330ae(0x124)]['x']=0.5,this[_0x4330ae(0x124)]['y']=0x1,this[_0x4330ae(0x2cd)]=_0x746cc4[_0x4330ae(0x267)][_0x4330ae(0x2c3)]||0x1,this[_0x4330ae(0x102)]=0x0,this['_direction']=0x1;else{const _0x2dda14=$gameTemp[_0x4330ae(0x17c)]();if(_0x2dda14)_0x2dda14[_0x4330ae(0x1ec)](_0x4330ae(0xa7));}}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0xa9),_0x13d1ac=>{const _0x4fe65d=_0xa66f72;if(SceneManager[_0x4fe65d(0x1df)]())return;VisuMZ[_0x4fe65d(0x95)](_0x13d1ac,_0x13d1ac);const _0x4ff453={'type':'timedHit','picture':_0x13d1ac[_0x4fe65d(0xf1)]||'','pointX':_0x13d1ac[_0x4fe65d(0xe7)]||0x0,'pointY':_0x13d1ac[_0x4fe65d(0xc6)]||0x0,'switchID':_0x13d1ac[_0x4fe65d(0x1a9)]||0x0,'varID':_0x13d1ac['VariableID']||0x0,'hitCommonEventID':_0x13d1ac[_0x4fe65d(0x1ff)]||0x0,'hitSound':_0x13d1ac[_0x4fe65d(0x18b)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'missCommonEventID':_0x13d1ac[_0x4fe65d(0x135)]||0x0,'missSound':_0x13d1ac['MissSound']||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x13d1ac[_0x4fe65d(0xdb)]||0x0,'duration':_0x13d1ac[_0x4fe65d(0x105)]||0x1},_0x387acb=_0x13d1ac[_0x4fe65d(0x271)];_0x4ff453[_0x4fe65d(0xd4)]['toUpperCase']()[_0x4fe65d(0xce)]()===_0x4fe65d(0x212)&&(_0x4ff453['picture']='');SceneManager[_0x4fe65d(0xa5)](_0x4ff453);if(_0x387acb){const _0x3695ed=$gameTemp[_0x4fe65d(0x17c)]();if(_0x3695ed)_0x3695ed[_0x4fe65d(0x1ec)](_0x4fe65d(0xa7));}}),PluginManager['registerCommand'](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x14f),_0x4bcd25=>{const _0x52e698=_0xa66f72;if(SceneManager[_0x52e698(0x1df)]())return;VisuMZ[_0x52e698(0x95)](_0x4bcd25,_0x4bcd25);const _0x51d1d0={'type':_0x52e698(0x172),'sequence':_0x4bcd25['Sequence']||[],'progress':0x0,'icon':_0x4bcd25[_0x52e698(0x2d4)]||0x0,'direction':_0x4bcd25[_0x52e698(0x180)]||_0x52e698(0x1ae),'varID':_0x4bcd25[_0x52e698(0x9a)]||0x0,'missCommonEventID':_0x4bcd25['MissCommonEventID']||0x0,'missSound':_0x4bcd25[_0x52e698(0x261)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x4bcd25[_0x52e698(0xdb)]||0x0,'duration':_0x4bcd25[_0x52e698(0x105)]||0x1},_0xbcde39=_0x4bcd25[_0x52e698(0x271)];_0x51d1d0['sequence']=_0x51d1d0[_0x52e698(0x24d)][_0x52e698(0xba)](_0x1ad1b1=>_0x1ad1b1['Button']!==''),_0x51d1d0[_0x52e698(0x24d)]=_0x51d1d0[_0x52e698(0x24d)][_0x52e698(0x207)]((_0xcd10b5,_0x535861)=>{const _0x50702e=_0x52e698;if('tAHDg'===_0x50702e(0x161)){if(_0xcd10b5[_0x50702e(0x129)]!==_0x535861[_0x50702e(0x129)]){if(_0x50702e(0x1f1)===_0x50702e(0x1f1))return _0xcd10b5['Timing']-_0x535861['Timing'];else{const _0x22efbb=_0x1138fc[_0x50702e(0x1dd)](_0x12eb3d);_0x332beb[_0x50702e(0x27f)](_0x3bd11b,_0x22efbb+0x1);}}return 0x0;}else this[_0x50702e(0x17b)]();}),_0x51d1d0['remainingSequence']=_0x51d1d0['sequence']['clone'](),_0x51d1d0[_0x52e698(0xec)]=_0x51d1d0[_0x52e698(0x24d)][_0x51d1d0[_0x52e698(0x24d)]['length']-0x1][_0x52e698(0x129)],_0x51d1d0[_0x52e698(0xec)]+=VisuMZ[_0x52e698(0x1fc)]['Settings']['QTE']['TimedHitSuccessFrames'],SceneManager[_0x52e698(0xa5)](_0x51d1d0);if(_0xbcde39){const _0x18b55c=$gameTemp[_0x52e698(0x17c)]();if(_0x18b55c)_0x18b55c[_0x52e698(0x1ec)](_0x52e698(0xa7));}}),PluginManager[_0xa66f72(0x28e)](pluginData[_0xa66f72(0xb9)],_0xa66f72(0x28f),_0x1299a5=>{const _0x38c4c0=_0xa66f72;if(SceneManager[_0x38c4c0(0x1df)]())return;VisuMZ[_0x38c4c0(0x95)](_0x1299a5,_0x1299a5);const _0x2dadf1={'type':_0x38c4c0(0xc9),'zones':_0x1299a5[_0x38c4c0(0x2da)]||[],'cursorIcon':_0x1299a5['CursorIcon']||0x0,'cursorSpeed':_0x1299a5[_0x38c4c0(0x27c)]||0x1,'switchID':_0x1299a5[_0x38c4c0(0x1a9)]||0x0,'varID':_0x1299a5['VariableID']||0x0,'hitSound':_0x1299a5[_0x38c4c0(0x18b)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'missSound':_0x1299a5[_0x38c4c0(0x261)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'missCommonEventID':_0x1299a5[_0x38c4c0(0x135)]||0x0,'inputStartDelay':_0x1299a5[_0x38c4c0(0xdb)]||0x0,'duration':_0x1299a5[_0x38c4c0(0x105)]||0x1},_0x19a75e=_0x1299a5[_0x38c4c0(0x271)];SceneManager[_0x38c4c0(0xa5)](_0x2dadf1);if(_0x19a75e){const _0x48926f=$gameTemp[_0x38c4c0(0x17c)]();if(_0x48926f)_0x48926f['setWaitMode'](_0x38c4c0(0xa7));}}),VisuMZ[_0xa66f72(0x1fc)]['RegExp']={'OnChange':/<(?:|TOGGLE |CHANGE )TRIGGER COMMON EVENT(?:|S):[ ](.*?)>/gi,'OnSwitch':/<TRIGGER ON SW(?:|ITCH)(?:|ES):[ ](.*?)>/gi,'OnVariable':/<TRIGGER ON VAR(?:|IABLE)(?:|S):[ ](.*?)>/gi,'gameOverCommonEvent':/<GAME OVER COMMON EVENT:[ ](\d+)>/i},VisuMZ['QTE_TriggerSys'][_0xa66f72(0xcf)]=Scene_Boot[_0xa66f72(0x118)][_0xa66f72(0x18a)],Scene_Boot['prototype'][_0xa66f72(0x18a)]=function(){const _0x1adbe0=_0xa66f72;VisuMZ[_0x1adbe0(0x1fc)][_0x1adbe0(0xcf)][_0x1adbe0(0x1ba)](this),VisuMZ[_0x1adbe0(0x1fc)]['registerData'](),VisuMZ['QTE_TriggerSys'][_0x1adbe0(0x159)]();},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x159)]=function(){const _0x4ae4c5=_0xa66f72;if(Imported[_0x4ae4c5(0xeb)]&&VisuMZ[_0x4ae4c5(0x26b)][_0x4ae4c5(0xb8)]<1.15){let _0xe7ace9='';_0xe7ace9+=_0x4ae4c5(0x2ea),_0xe7ace9+=_0x4ae4c5(0x16d),alert(_0xe7ace9),SceneManager[_0x4ae4c5(0x29f)]();}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x285)]={},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0xa8)]={},0x3,VisuMZ[_0xa66f72(0x1fc)]['_normalCommonEvents']=[],VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x1a5)]=[],VisuMZ['QTE_TriggerSys'][_0xa66f72(0xf6)]={},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x233)]={},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x237)]={},VisuMZ[_0xa66f72(0x1fc)]['registerData']=function(){const _0x59fa5a=_0xa66f72;this[_0x59fa5a(0x183)](),this[_0x59fa5a(0x247)](),this[_0x59fa5a(0x1f6)]();},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x183)]=function(){const _0x5105d8=_0xa66f72,_0x191a65=$dataSystem['switches'],_0x3aaddd=_0x191a65[_0x5105d8(0x17e)],_0x3621b5=VisuMZ[_0x5105d8(0x1fc)]['RegExp'];for(let _0x48ebc3=0x1;_0x48ebc3<_0x3aaddd;_0x48ebc3++){const _0x18ee25=_0x191a65[_0x48ebc3]||'';if(_0x18ee25[_0x5105d8(0x149)](_0x3621b5[_0x5105d8(0x203)])){if('bmHvz'===_0x5105d8(0x248)){if(!this[_0x5105d8(0x28b)])return;this[_0x5105d8(0x17f)](this[_0x5105d8(0x28b)]),this[_0x5105d8(0x28b)]=_0x37324c;}else{const _0x1a3ccd=String(RegExp['$1'])['split'](',')[_0x5105d8(0x251)](_0x43e80e=>Number(_0x43e80e));this[_0x5105d8(0x285)][_0x48ebc3]=this[_0x5105d8(0x285)][_0x48ebc3]||[];for(const _0x377464 of _0x1a3ccd){'JUodd'!==_0x5105d8(0x11a)?this['_triggerSwitches'][_0x48ebc3][_0x5105d8(0x132)](_0x377464):this[_0x5105d8(0x7f)](...arguments);}DataManager[_0x5105d8(0x21d)](_0x48ebc3)&&(VisuMZ[_0x5105d8(0x1fc)][_0x5105d8(0x233)][_0x48ebc3]=![]),$dataSystem[_0x5105d8(0x2ca)][_0x48ebc3]=_0x18ee25[_0x5105d8(0x1ef)](_0x3621b5[_0x5105d8(0x203)],'');}}}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x247)]=function(){const _0x76027c=_0xa66f72,_0xd667f8=$dataSystem[_0x76027c(0x12c)],_0x573cd1=_0xd667f8[_0x76027c(0x17e)],_0x334d6d=VisuMZ[_0x76027c(0x1fc)]['RegExp'];for(let _0x14611d=0x1;_0x14611d<_0x573cd1;_0x14611d++){const _0x19baba=_0xd667f8[_0x14611d]||'';if(_0x19baba[_0x76027c(0x149)](_0x334d6d[_0x76027c(0x203)])){const _0x37cfe2=String(RegExp['$1'])[_0x76027c(0x2a1)](',')[_0x76027c(0x251)](_0x502bb7=>Number(_0x502bb7));this[_0x76027c(0xa8)][_0x14611d]=this[_0x76027c(0xa8)][_0x14611d]||[];for(const _0x66c20e of _0x37cfe2){if(_0x76027c(0x26c)!==_0x76027c(0x26c)){if(this['_duration']<=0x0)return;const _0x3b7b0f=this['_overlaySprite'],_0x40cbf6=this[_0x76027c(0x2c8)];_0x3b7b0f['scale']['x']=(_0x3b7b0f[_0x76027c(0x230)]['x']*(_0x40cbf6-0x1)+0x1)/_0x40cbf6,_0x3b7b0f[_0x76027c(0x230)]['y']=(_0x3b7b0f['scale']['y']*(_0x40cbf6-0x1)+0x1)/_0x40cbf6,this['_duration']--,this[_0x76027c(0x2c8)]<=0x0&&(_0x3b7b0f[_0x76027c(0x2ec)]=0x0,_0x3b7b0f[_0x76027c(0x230)]['x']=0x1,_0x3b7b0f[_0x76027c(0x230)]['y']=0x1);}else this['_triggerVariables'][_0x14611d][_0x76027c(0x132)](_0x66c20e);}DataManager[_0x76027c(0x8f)](_0x14611d)&&(VisuMZ[_0x76027c(0x1fc)][_0x76027c(0x237)][_0x14611d]=0x0),$dataSystem[_0x76027c(0x12c)][_0x14611d]=_0x19baba[_0x76027c(0x1ef)](_0x334d6d[_0x76027c(0x203)],'');}}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x1f6)]=function(){const _0x26cad4=_0xa66f72;for(const _0x1acc20 of $dataCommonEvents){if(_0x26cad4(0x14e)!==_0x26cad4(0x140)){if(!_0x1acc20)continue;this[_0x26cad4(0x11d)](_0x1acc20),delete _0x1acc20[_0x26cad4(0x2b8)];}else _0x3d931b[_0x26cad4(0x1fc)][_0x26cad4(0x12d)](_0x47ceb6),_0x3dea15[_0x26cad4(0x197)](_0x26cad4(0x12c),_0x53ad01)&&_0x2462a5[_0x26cad4(0x2e0)]('variables',_0x115bb2);}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x11d)]=function(_0x12a0ed){const _0x2bda61=_0xa66f72,_0x234ee1=VisuMZ['QTE_TriggerSys']['RegExp'];let _0x32af3c=_0x12a0ed['name']||'';const _0x3e493b=_0x12a0ed['id']||0x0;if(_0x32af3c[_0x2bda61(0x149)](_0x234ee1['OnSwitch'])){if(_0x2bda61(0x22d)!==_0x2bda61(0x22d)){if(this[_0x2bda61(0x104)]['isActiveChainSkillsUiVisible']()){const _0x3b1d7f=_0x2bda61(0xb4);return _0x54ce54['log'](_0x3b1d7f),!![];}}else{const _0x26bede=String(RegExp['$1'])['split'](',')[_0x2bda61(0x251)](_0x4e49b8=>Number(_0x4e49b8));for(const _0x288a9d of _0x26bede){if(_0x2bda61(0x10d)!=='AbPgD')_0x4bb21f[_0x2bda61(0x118)][_0x2bda61(0x7f)][_0x2bda61(0x1ba)](this,_0x512a97),this['createTimingBarSprite']();else{this[_0x2bda61(0x285)][_0x288a9d]=this[_0x2bda61(0x285)][_0x288a9d]||[];if(this[_0x2bda61(0x285)][_0x288a9d][_0x2bda61(0x196)](_0x3e493b))continue;this[_0x2bda61(0x285)][_0x288a9d]['push'](_0x3e493b),DataManager[_0x2bda61(0x21d)](_0x288a9d)&&(VisuMZ[_0x2bda61(0x1fc)][_0x2bda61(0x233)][_0x288a9d]=![]);}}_0x32af3c=_0x32af3c[_0x2bda61(0x1ef)](_0x234ee1[_0x2bda61(0x1ed)],'');}}if(_0x32af3c[_0x2bda61(0x149)](_0x234ee1[_0x2bda61(0x81)])){if(_0x2bda61(0x2de)!=='RoucM'){const _0x2bf2f8=String(RegExp['$1'])['split'](',')[_0x2bda61(0x251)](_0x52439e=>Number(_0x52439e));for(const _0x311478 of _0x2bf2f8){this[_0x2bda61(0xa8)][_0x311478]=this[_0x2bda61(0xa8)][_0x311478]||[];if(this[_0x2bda61(0xa8)][_0x311478][_0x2bda61(0x196)](_0x3e493b))continue;this[_0x2bda61(0xa8)][_0x311478][_0x2bda61(0x132)](_0x3e493b),DataManager[_0x2bda61(0x8f)](_0x311478)&&(VisuMZ[_0x2bda61(0x1fc)][_0x2bda61(0x237)][_0x311478]=0x0);}_0x32af3c=_0x32af3c[_0x2bda61(0x1ef)](_0x234ee1['OnVariable'],'');}else _0x5b6627[_0x2bda61(0x118)][_0x2bda61(0xee)][_0x2bda61(0x1ba)](this),this[_0x2bda61(0x204)]&&(this[_0x2bda61(0x1a4)][_0x2bda61(0x9d)]=_0x1b7876[_0x2bda61(0xd8)](),this[_0x2bda61(0x1a4)][_0x2bda61(0x25c)]=_0x3018f1[_0x2bda61(0x1fc)][_0x2bda61(0x2b5)][_0x2bda61(0xa7)]['TimingBarFontSize']||_0x104696[_0x2bda61(0x162)]());}_0x12a0ed[_0x2bda61(0xb9)]=_0x32af3c[_0x2bda61(0xce)]();},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x2c5)]=function(_0x5d9ee3){const _0x1f22e9=_0xa66f72;if(!_0x5d9ee3)return;if(this[_0x1f22e9(0x151)][_0x1f22e9(0x196)](_0x5d9ee3['id']))return;if(this['_jsCommonEvents'][_0x1f22e9(0x196)](_0x5d9ee3['id']))return;const _0x393c5f=_0x5d9ee3['list'];let _0x1c8a96=![];for(const _0x307c2c of _0x393c5f){if([0x0,0x6c,0x198][_0x1f22e9(0x196)](_0x307c2c['code']))continue;if([0x163,0x28f][_0x1f22e9(0x196)](_0x307c2c[_0x1f22e9(0xe0)])){_0x1c8a96=!![];continue;}_0x1c8a96=![];break;}if(_0x1c8a96){if('pqwSJ'===_0x1f22e9(0x22a))this[_0x1f22e9(0x1a5)]['push'](_0x5d9ee3['id']),this['createJsFunctionsForCommonEvent'](_0x5d9ee3);else return 0x0;}else{if(_0x1f22e9(0x1e0)!==_0x1f22e9(0xbd))this[_0x1f22e9(0x151)][_0x1f22e9(0x132)](_0x5d9ee3['id']);else{if(_0x35b95d[_0x1f22e9(0x129)]!==_0xba87f6[_0x1f22e9(0x129)])return _0x21fb08[_0x1f22e9(0x129)]-_0x4291b0[_0x1f22e9(0x129)];return 0x0;}}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x208)]=function(_0x20ce60){const _0x52d8de=_0xa66f72;this['_jsFuncs']=this[_0x52d8de(0xf6)]||{},this[_0x52d8de(0xf6)][_0x20ce60['id']]=this[_0x52d8de(0xf6)][_0x20ce60['id']]||[];let _0x4e1f57='';const _0x472ed3=_0x20ce60['list'];for(const _0x199859 of _0x472ed3){if('CIShh'===_0x52d8de(0x1ea)){if(_0x199859[_0x52d8de(0xe0)]===0x163){if(_0x4e1f57!==''){const _0x39c7d1=new Function(_0x4e1f57);this[_0x52d8de(0xf6)][_0x20ce60['id']][_0x52d8de(0x132)](_0x39c7d1),_0x4e1f57='';}_0x4e1f57+=_0x199859[_0x52d8de(0x1c0)][0x0]+'\x0a';}else{if(_0x199859[_0x52d8de(0xe0)]===0x28f)_0x4e1f57+=_0x199859['parameters'][0x0]+'\x0a';else{if(_0x199859[_0x52d8de(0xe0)]===0x0&&_0x4e1f57!==''){if('SNoVU'==='XmtIW'){if(this[_0x52d8de(0x126)]===_0x52d8de(0x166))return;this[_0x52d8de(0x126)]='pageup';}else{const _0x8c0575=new Function(_0x4e1f57);this[_0x52d8de(0xf6)][_0x20ce60['id']][_0x52d8de(0x132)](_0x8c0575),_0x4e1f57='';}}}}}else this['_qteCursorSprite']=new _0x177cb1(),this[_0x52d8de(0xfb)](this[_0x52d8de(0x18e)]);}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x195)]=function(_0x2d6022){const _0x23919b=_0xa66f72;this[_0x23919b(0x2c5)]($dataCommonEvents[_0x2d6022]);if(this[_0x23919b(0x151)][_0x23919b(0x196)](_0x2d6022))$gameSystem[_0x23919b(0x1b4)](_0x2d6022);else this[_0x23919b(0x1a5)][_0x23919b(0x196)](_0x2d6022)&&(_0x23919b(0x24a)!==_0x23919b(0x24a)?this[_0x23919b(0x7f)](...arguments):this[_0x23919b(0x2db)](_0x2d6022));},VisuMZ[_0xa66f72(0x1fc)]['processJavaScriptFuncs']=function(_0x2dea91){const _0x58fc79=_0xa66f72;this[_0x58fc79(0xf6)]=this[_0x58fc79(0xf6)]||{},this[_0x58fc79(0xf6)][_0x2dea91]=this[_0x58fc79(0xf6)][_0x2dea91]||[];const _0x1fcd0e=this[_0x58fc79(0xf6)][_0x2dea91];for(const _0x51d9ac of _0x1fcd0e){if(_0x58fc79(0xdd)!==_0x58fc79(0x244))try{_0x58fc79(0x14c)===_0x58fc79(0x20b)?_0x524e8f[_0x58fc79(0x1ac)]++:_0x51d9ac();}catch(_0x1669e4){if(_0x58fc79(0x96)===_0x58fc79(0x125)){const _0x55b321=_0x3720a6['value'](_0x2d9966);_0x5407c4[_0x58fc79(0x27f)](_0x4531d8,_0x55b321+0x1);}else console[_0x58fc79(0x217)](_0x1669e4);}else this[_0x58fc79(0x2db)](_0x37c898);}},VisuMZ[_0xa66f72(0x1fc)]['processSwitchTrigger']=function(_0x2b91cf){const _0x4ced6e=_0xa66f72;if(!this[_0x4ced6e(0x285)][_0x2b91cf])return;const _0x1acf84=this[_0x4ced6e(0x285)][_0x2b91cf];for(const _0x11aa9b of _0x1acf84){this[_0x4ced6e(0x195)](_0x11aa9b);}},VisuMZ['QTE_TriggerSys'][_0xa66f72(0x12d)]=function(_0x1ae381){const _0x4dcc9a=_0xa66f72;if(!this['_triggerVariables'][_0x1ae381])return;const _0xa7a1e8=this[_0x4dcc9a(0xa8)][_0x1ae381];for(const _0x2b5295 of _0xa7a1e8){_0x4dcc9a(0x240)==='nSmnF'?this[_0x4dcc9a(0x195)](_0x2b5295):(this[_0x4dcc9a(0x10e)]=_0x47f6c2[_0x4dcc9a(0x236)](_0x4dcc9a(0x171)),this[_0x4dcc9a(0x110)]=_0x17cffe[_0x4dcc9a(0x267)][_0x4dcc9a(0x99)]||0x0,this[_0x4dcc9a(0xed)]());}},VisuMZ['QTE_TriggerSys'][_0xa66f72(0x2ab)]=function(_0x133a11){const _0xa1db45=_0xa66f72,_0x5db038=DataManager['getOnChangeCommonEventTriggers'](_0x133a11);for(const _0x3303cf of _0x5db038){this[_0xa1db45(0x195)](_0x3303cf);}},DataManager[_0xa66f72(0x21d)]=function(_0x23ee44){const _0x4da452=_0xa66f72;return DataManager[_0x4da452(0x2c0)](_0x23ee44);},DataManager['isTriggerWatchedVariable']=function(_0x1000bb){const _0x55816e=_0xa66f72;return DataManager[_0x55816e(0x7e)](_0x1000bb);},DataManager[_0xa66f72(0xf4)]=function(_0x239bc1){const _0x4cadc0=_0xa66f72;if(!_0x239bc1)return![];return this[_0x4cadc0(0xb3)](_0x239bc1)[_0x4cadc0(0x17e)]>0x0;},DataManager[_0xa66f72(0xb3)]=function(_0x3c95d6){const _0x39aac7=_0xa66f72;if(!_0x3c95d6)return[];this['_cache_onChangeCommonEventTrigger']=this[_0x39aac7(0x9f)]||{};const _0x37a9fb=VisuMZ[_0x39aac7(0x1fc)][_0x39aac7(0x250)](_0x3c95d6,_0x39aac7(0x179));if(this['_cache_onChangeCommonEventTrigger'][_0x37a9fb]!==undefined)return this['_cache_onChangeCommonEventTrigger'][_0x37a9fb];this[_0x39aac7(0x9f)][_0x37a9fb]=[];const _0x299315=VisuMZ[_0x39aac7(0x1fc)][_0x39aac7(0xc0)],_0x478a87=_0x3c95d6[_0x39aac7(0x2cb)]||'';if(_0x478a87[_0x39aac7(0x149)](_0x299315[_0x39aac7(0x203)])){if(_0x39aac7(0x2bf)===_0x39aac7(0x2bf)){const _0x444bee=String(RegExp['$1'])[_0x39aac7(0x2a1)](',')[_0x39aac7(0x251)](_0x685067=>Number(_0x685067));for(const _0x3565e0 of _0x444bee){this[_0x39aac7(0x9f)][_0x37a9fb][_0x39aac7(0x132)](_0x3565e0);}}else{const _0x82ba47=_0x24a46f[_0x39aac7(0x23e)],_0xc00e6b=_0xedbfd7['iconHeight'],_0x53665c=this[_0x39aac7(0x110)]%0x10*_0x82ba47,_0x303dbb=_0x20a651['floor'](this[_0x39aac7(0x110)]/0x10)*_0xc00e6b;this['setFrame'](_0x53665c,_0x303dbb,_0x82ba47,_0xc00e6b);}}return this[_0x39aac7(0x9f)][_0x37a9fb];},VisuMZ['QTE_TriggerSys'][_0xa66f72(0x250)]=function(_0x314c25,_0x464b4f){const _0x3c2094=_0xa66f72;if(VisuMZ[_0x3c2094(0x250)])return VisuMZ[_0x3c2094(0x250)](_0x314c25,_0x464b4f);let _0x3cd33f='';if($dataActors['includes'](_0x314c25))_0x3cd33f=_0x3c2094(0x1eb)[_0x3c2094(0xc3)](_0x314c25['id'],_0x464b4f);if($dataClasses[_0x3c2094(0x196)](_0x314c25))_0x3cd33f=_0x3c2094(0x2df)[_0x3c2094(0xc3)](_0x314c25['id'],_0x464b4f);if($dataSkills[_0x3c2094(0x196)](_0x314c25))_0x3cd33f='Skill-%1-%2'['format'](_0x314c25['id'],_0x464b4f);if($dataItems[_0x3c2094(0x196)](_0x314c25))_0x3cd33f='Item-%1-%2'['format'](_0x314c25['id'],_0x464b4f);if($dataWeapons[_0x3c2094(0x196)](_0x314c25))_0x3cd33f=_0x3c2094(0x22b)['format'](_0x314c25['id'],_0x464b4f);if($dataArmors[_0x3c2094(0x196)](_0x314c25))_0x3cd33f=_0x3c2094(0xe2)[_0x3c2094(0xc3)](_0x314c25['id'],_0x464b4f);if($dataEnemies[_0x3c2094(0x196)](_0x314c25))_0x3cd33f=_0x3c2094(0x173)[_0x3c2094(0xc3)](_0x314c25['id'],_0x464b4f);if($dataStates[_0x3c2094(0x196)](_0x314c25))_0x3cd33f='State-%1-%2'['format'](_0x314c25['id'],_0x464b4f);return _0x3cd33f;},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x1cc)]=SceneManager[_0xa66f72(0x2b3)],SceneManager[_0xa66f72(0x2b3)]=function(){const _0x5d756c=_0xa66f72;VisuMZ[_0x5d756c(0x1fc)][_0x5d756c(0x1cc)][_0x5d756c(0x1ba)](this);const _0x4831d2=VisuMZ[_0x5d756c(0x1fc)][_0x5d756c(0x2b5)][_0x5d756c(0x1f2)]||0x3c;if(Graphics['frameCount']%_0x4831d2===0x0){if(_0x5d756c(0xd0)==='TOlaU'){VisuMZ[_0x5d756c(0x1fc)][_0x5d756c(0x29e)]();if($gameSystem)$gameSystem[_0x5d756c(0x29e)]();}else{const _0xa7322a=_0x20e7ed['_qteSettings'][_0x5d756c(0x24d)][_0x5d756c(0x1f9)](),_0x6b57d7=_0xa7322a['remove']('')[_0x5d756c(0x251)](_0x508775=>_0x49d16f['getInputButtonString'](_0x508775)),_0x3d5109=_0x6b57d7[_0x5d756c(0x220)]('\x20'),_0x5acb74=this[_0x5d756c(0x239)](_0x3d5109)[_0x5d756c(0x18f)],_0x1120a9=_0x2985fa['_qteSettings']['progress'];let _0x260994=_0xe6fb53['floor']((this['innerWidth']-_0x5acb74)/0x2);this[_0x5d756c(0xee)]();const _0x72e9c=_0x6b57d7[_0x5d756c(0x17e)];for(let _0x4a6a7e=0x0;_0x4a6a7e<_0x72e9c;_0x4a6a7e++){const _0x5e9328=_0x6b57d7[_0x4a6a7e];this[_0x5d756c(0x290)](_0x4a6a7e>=_0x1120a9),this[_0x5d756c(0xab)](_0x5e9328,_0x260994,0x0),_0x260994+=this[_0x5d756c(0x239)](_0x5e9328+'\x20')[_0x5d756c(0x18f)];}}}},VisuMZ['QTE_TriggerSys']['checkWatchedTriggers']=function(){const _0x2a92b2=_0xa66f72;{for(const _0x1f979a in this[_0x2a92b2(0x233)]){if('Opwqh'==='YuZZB')this[_0x2a92b2(0x2bd)][_0x2a92b2(0x17f)](this);else{const _0x5002b2=Number(_0x1f979a);$gameSwitches[_0x2a92b2(0x1dd)](_0x5002b2)!==this[_0x2a92b2(0x233)][_0x1f979a]&&('HIoSp'===_0x2a92b2(0x1c5)?(this[_0x2a92b2(0x233)][_0x1f979a]=$gameSwitches[_0x2a92b2(0x1dd)](_0x5002b2),VisuMZ[_0x2a92b2(0x1fc)]['processSwitchTrigger'](_0x5002b2)):_0x8955ed['prototype'][_0x2a92b2(0x7f)][_0x2a92b2(0x1ba)](this,_0x45bc88));}}}{if(_0x2a92b2(0xdf)!==_0x2a92b2(0xdf)){if(_0x11ab41[_0x2a92b2(0x12e)]()){const _0xbcf374=_0x2a92b2(0x13b);_0x31985c[_0x2a92b2(0x217)](_0xbcf374);}return!![];}else for(const _0x118c38 in this[_0x2a92b2(0x237)]){const _0x22ffb2=Number(_0x118c38);$gameVariables[_0x2a92b2(0x1dd)](_0x22ffb2)!==this[_0x2a92b2(0x237)][_0x118c38]&&(_0x2a92b2(0x2c6)===_0x2a92b2(0x2c6)?(this[_0x2a92b2(0x237)][_0x118c38]=$gameVariables[_0x2a92b2(0x1dd)](_0x22ffb2),VisuMZ[_0x2a92b2(0x1fc)][_0x2a92b2(0x12d)](_0x22ffb2)):_0xfbe44e[_0x2a92b2(0x1fc)][_0x2a92b2(0x237)][_0x57d2fc]=0x0);}}},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x295)]=SceneManager[_0xa66f72(0x7f)],SceneManager['initialize']=function(){const _0x5caf2d=_0xa66f72;VisuMZ[_0x5caf2d(0x1fc)]['SceneManager_initialize'][_0x5caf2d(0x1ba)](this),this[_0x5caf2d(0x2c2)]();},SceneManager[_0xa66f72(0x2c2)]=function(){const _0xaa9994=_0xa66f72;this[_0xaa9994(0x28c)]='',this[_0xaa9994(0x1e8)]=0x0,this[_0xaa9994(0x10f)]=0x0,this[_0xaa9994(0x186)]=0x0,this[_0xaa9994(0x148)]=0x0,this['_qteLastInput']=0x0,this[_0xaa9994(0x267)]={},this[_0xaa9994(0x1aa)]=0x0,this['_afterQteSessionDelay']=0x3c;},SceneManager[_0xa66f72(0x2e7)]=function(){const _0xa57bfd=_0xa66f72;return this[_0xa57bfd(0x28c)]!=='';},SceneManager[_0xa66f72(0x1df)]=function(){const _0x7d5428=_0xa66f72;if(this[_0x7d5428(0x2e7)]()){if($gameTemp[_0x7d5428(0x12e)]()){if(_0x7d5428(0x1ca)==='ycica'){const _0x3d8707=_0x405a23[_0x7d5428(0x17c)]();_0x12c0ac(_0x20927d,_0x3d8707?_0x3d8707['_eventId']:0x0);}else{const _0x18630e=_0x7d5428(0x13b);console[_0x7d5428(0x217)](_0x18630e);}}return!![];}if(SceneManager[_0x7d5428(0x116)]){if(_0x7d5428(0x2d2)!==_0x7d5428(0x2e9)){if(SceneManager[_0x7d5428(0x116)]()){if(_0x7d5428(0xbc)===_0x7d5428(0x1d5))_0x15edd5[_0x7d5428(0x27f)](_0x2358ba,this['_qteDuration']);else{if($gameTemp[_0x7d5428(0x12e)]()){const _0x2079fc=_0x7d5428(0x13f);console['log'](_0x2079fc);}return!![];}}}else{const _0x3375b6=_0x45f426[_0x7d5428(0x17c)]();if(_0x3375b6)_0x3375b6[_0x7d5428(0x1ec)](_0x7d5428(0xa7));}}if(this['isSceneBattle']()){const _0x42b1d6=this[_0x7d5428(0x104)][_0x7d5428(0x2d9)];if(Imported[_0x7d5428(0x2ba)]){if(this['_scene'][_0x7d5428(0x1e5)]()){if(_0x7d5428(0x297)===_0x7d5428(0x108))_0x2bc5b5[_0x7d5428(0x227)]();else{const _0x3c2c81='Cannot\x20run\x20QTE\x20during\x20Active\x20Chain\x20Skills.';return console['log'](_0x3c2c81),!![];}}}if(Imported['VisuMZ_3_InputComboSkills']){if(_0x42b1d6['_inputComboSkillMode']){if(_0x7d5428(0x146)===_0x7d5428(0x210))this[_0x7d5428(0x1e8)]=0x0;else{const _0x6dbfa8='Cannot\x20run\x20QTE\x20during\x20Input\x20Combo\x20Skills.';return console[_0x7d5428(0x217)](_0x6dbfa8),!![];}}}if(Imported[_0x7d5428(0x2cf)]){if(_0x42b1d6[_0x7d5428(0x293)]){const _0x38acac=_0x7d5428(0x265);return console['log'](_0x38acac),!![];}}}return![];},SceneManager[_0xa66f72(0x24c)]=function(){return this['_qteType'];},SceneManager['setupQTE']=function(_0x254329){const _0x5a0791=_0xa66f72;this[_0x5a0791(0x28c)]=_0x254329[_0x5a0791(0x14b)]||'';if(this['_qteType']==='')return;Input['clear'](),TouchInput[_0x5a0791(0x227)](),this['_qteInputDelay']=_0x254329[_0x5a0791(0x225)]||0x0,this['_qteDuration']=_0x254329[_0x5a0791(0xec)],this[_0x5a0791(0x186)]=_0x254329[_0x5a0791(0xec)],this[_0x5a0791(0x267)]=JSON[_0x5a0791(0x288)](JSON[_0x5a0791(0x1f7)](_0x254329));if(_0x254329[_0x5a0791(0x14b)]===_0x5a0791(0x18d)&&_0x254329[_0x5a0791(0xd4)]){if(_0x5a0791(0x7c)===_0x5a0791(0x142)){if(_0x460d72[_0x5a0791(0x1df)]())return;_0x511542[_0x5a0791(0x95)](_0x2e798b,_0x37c5e0);const _0x224f34={'type':_0x5a0791(0x150),'varID':_0x55154e[_0x5a0791(0x9a)]||0x0,'commonEventID':_0xa46d1a[_0x5a0791(0x181)]||0x0,'sound':_0x259962[_0x5a0791(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x2cd7ed['InputStartDelay']||0x0,'duration':(_0xce2d02[_0x5a0791(0x105)]||0x1)[_0x5a0791(0x1a8)](0x1,0xf423f)},_0x4c57bf=_0x4de12f['WaitForQTE'];_0x2268d0['setupQTE'](_0x224f34);if(_0x4c57bf){const _0x495870=_0x34160e[_0x5a0791(0x17c)]();if(_0x495870)_0x495870['setWaitMode'](_0x5a0791(0xa7));}}else this[_0x5a0791(0x104)][_0x5a0791(0x1c4)]();}this['_scene']&&(_0x5a0791(0x1fa)!==_0x5a0791(0x1fd)?this[_0x5a0791(0x104)][_0x5a0791(0x1de)](this[_0x5a0791(0x28c)]):_0x4e82f2['setValue'](_0x183690,![]));if(_0x254329[_0x5a0791(0x1e3)]&&_0x254329[_0x5a0791(0x1e3)]>0x0){if(_0x5a0791(0x1c9)!=='OWbKN')$gameSwitches[_0x5a0791(0x27f)](_0x254329['switchID'],![]);else{if(this['_lastProgress']!==this[_0x5a0791(0x1e6)]())return!![];return _0x5dc445[_0x5a0791(0x118)]['needsRefresh'][_0x5a0791(0x1ba)](this);}}_0x254329[_0x5a0791(0x184)]&&_0x254329[_0x5a0791(0x184)]>0x0&&$gameVariables[_0x5a0791(0x27f)](_0x254329['varID'],0x0);},SceneManager['updateQTEDuration']=function(){const _0x4d3d57=_0xa66f72;if(this[_0x4d3d57(0x1e8)]>0x0){if(_0x4d3d57(0x264)===_0x4d3d57(0x264)){this[_0x4d3d57(0x1e8)]--;return;}else{_0x3c0ffa['ConvertParams'](_0x1521fa,_0x28a71c);const _0x295e11=_0x4923ad[_0x4d3d57(0x15b)]||0x0;if(_0x295e11<=0x0)return;const _0x5e29f1=_0x454586['CommonEventIDs']||[],_0x15487b=_0x4d3d57(0x138);_0x262eea[_0x4d3d57(0x1d9)](_0x15487b,_0x295e11,_0x5e29f1);}}if(this[_0x4d3d57(0x1aa)]>0x0){this['_qteEarlyFinishDuration']--;this[_0x4d3d57(0x1aa)]<=0x0&&(_0x4d3d57(0x174)!=='DtLYa'?(this[_0x4d3d57(0x28c)]='',this['_qteInputDelay']=0x0,this['_qteDuration']=0x0,this[_0x4d3d57(0x186)]=0x0,this['_qteInputBuffer']=0x0,this['_qteLastInput']=0x0,this['_qteSettings']={},this[_0x4d3d57(0x1aa)]=0x0,this[_0x4d3d57(0x27e)]=0x3c):this[_0x4d3d57(0x2c2)]());return;}this[_0x4d3d57(0x10f)]<0xf4240&&this[_0x4d3d57(0x10f)]--;if(this['_qteDuration']<=0x0){if(this[_0x4d3d57(0x24c)]()==='timedHit')this[_0x4d3d57(0x17b)]();else{if(_0x4d3d57(0x205)===_0x4d3d57(0x205))this[_0x4d3d57(0x2c2)]();else{if(this[_0x4d3d57(0x191)]===_0x3d50e2)this[_0x4d3d57(0x16a)]();return this['_mapGameOverCommonEventID'];}}}},SceneManager['finishEarlyQTE']=function(){const _0x582f31=_0xa66f72,_0x474bc4=VisuMZ[_0x582f31(0x1fc)][_0x582f31(0x2b5)]['QTE'];this['_qteEarlyFinishDuration']=_0x474bc4[_0x582f31(0x7b)]??0x28;},SceneManager[_0xa66f72(0x1d0)]=function(){const _0x11dc23=_0xa66f72;return this[_0x11dc23(0x1aa)]>0x0;},VisuMZ[_0xa66f72(0x1fc)]['SceneManager_updateInputData']=SceneManager[_0xa66f72(0x100)],SceneManager['updateInputData']=function(){const _0x545c41=_0xa66f72;VisuMZ[_0x545c41(0x1fc)]['SceneManager_updateInputData'][_0x545c41(0x1ba)](this),this[_0x545c41(0x2e7)]()&&this[_0x545c41(0x104)][_0x545c41(0x25e)]()&&this[_0x545c41(0x128)](),this[_0x545c41(0x27e)]>0x0&&this[_0x545c41(0x27e)]--;},SceneManager[_0xa66f72(0x128)]=function(){const _0x536584=_0xa66f72;if(this[_0x536584(0x1aa)]>0x0)return;const _0x699eb=this[_0x536584(0x24c)]();switch(_0x699eb){case _0x536584(0x150):if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0x224)]();break;case _0x536584(0x2b1):this[_0x536584(0x8b)]();break;case'directionStruggle':if(this[_0x536584(0x1e8)]>0x0)return;this['updateDirectionStruggleQTE']();break;case _0x536584(0x1b9):if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0x170)]();break;case _0x536584(0x1bf):if(this[_0x536584(0x1e8)]>0x0){(VisuMZ[_0x536584(0x1fc)][_0x536584(0x294)]()||Input[_0x536584(0x1b7)]('ok')||TouchInput[_0x536584(0x1b7)]())&&(this[_0x536584(0x1e8)]=0x0);return;}this[_0x536584(0x107)]();break;case _0x536584(0xc4):if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0x15c)]();break;case'swapper':if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0x2e5)]();break;case _0x536584(0x18d):if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0x7a)]();break;case _0x536584(0x172):if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0xbe)]();break;case _0x536584(0xc9):if(this[_0x536584(0x1e8)]>0x0)return;this[_0x536584(0x13a)]();break;}},VisuMZ[_0xa66f72(0x1fc)]['PlaytestInput']=function(_0x45faf7){const _0x158feb=_0xa66f72;if(_0x45faf7){if(Input[_0x158feb(0xaf)](_0x158feb(0x1d2))&&Input[_0x158feb(0xaf)](_0x158feb(0x115)))return!![];return $gameTemp['isPlaytest']()&&Input[_0x158feb(0xaf)](_0x158feb(0x115));}else{if(Input[_0x158feb(0xaf)](_0x158feb(0x1d2))&&Input[_0x158feb(0x281)](_0x158feb(0x115)))return!![];return $gameTemp['isPlaytest']()&&Input[_0x158feb(0x281)](_0x158feb(0x115));}},Input[_0xa66f72(0x238)]=function(){const _0x221d19=_0xa66f72;return this[_0x221d19(0x2b4)]!==null&&this[_0x221d19(0x16c)]===0x0;},SceneManager[_0xa66f72(0x224)]=function(){const _0x2b5b2a=_0xa66f72;if(VisuMZ[_0x2b5b2a(0x1fc)][_0x2b5b2a(0x294)]()||Input[_0x2b5b2a(0x1b7)]('ok')||TouchInput[_0x2b5b2a(0x1b7)]()){const _0x37a9df=this['_qteSettings'],_0x447a0d=_0x37a9df[_0x2b5b2a(0x184)]||0x0;if(_0x447a0d>0x0){const _0x41dcc3=$gameVariables[_0x2b5b2a(0x1dd)](_0x447a0d);$gameVariables[_0x2b5b2a(0x27f)](_0x447a0d,_0x41dcc3+0x1);}const _0x18fdc8=_0x37a9df['commonEventID']||0x0;if(_0x18fdc8>0x0){const _0x1fe187=$gameTemp['getLastPluginCommandInterpreter']();$onceParallel(_0x18fdc8,_0x1fe187?_0x1fe187[_0x2b5b2a(0x214)]:0x0);}const _0x32dbe6=_0x37a9df[_0x2b5b2a(0x249)];if(_0x32dbe6&&_0x32dbe6[_0x2b5b2a(0xb9)]){if('sBHbV'===_0x2b5b2a(0x286))return this[_0x2b5b2a(0x28c)];else AudioManager['playSe'](_0x32dbe6);}}},SceneManager[_0xa66f72(0x8b)]=function(){const _0x34352f=_0xa66f72,_0x5e4af5=this[_0x34352f(0x267)],_0x48a8af=this[_0x34352f(0x267)][_0x34352f(0x24d)],_0x516201=this[_0x34352f(0x267)][_0x34352f(0x1ac)]||0x0,_0x76e4eb=_0x48a8af[_0x516201];if(this['_qteInputBuffer']>0x0)this['_qteInputBuffer']--;if(VisuMZ[_0x34352f(0x1fc)][_0x34352f(0x294)]()||Input[_0x34352f(0x1b7)](_0x76e4eb)){if(Input['isTriggered'](_0x76e4eb))Input[_0x34352f(0x227)]();this[_0x34352f(0x148)]=0x14,this[_0x34352f(0x1e8)]=0x0;const _0x26c92c=_0x5e4af5['commonEventID']||0x0;if(_0x26c92c>0x0){const _0x328cb3=$gameTemp[_0x34352f(0x17c)]();$onceParallel(_0x26c92c,_0x328cb3?_0x328cb3[_0x34352f(0x214)]:0x0);}const _0x3d71e3=_0x5e4af5[_0x34352f(0x249)];_0x3d71e3&&_0x3d71e3[_0x34352f(0xb9)]&&(_0x34352f(0x262)===_0x34352f(0x20d)?(this['cacheData'](),_0x5a6633[_0x34352f(0x118)][_0x34352f(0x7f)][_0x34352f(0x1ba)](this,_0x4dedf3)):AudioManager['playSe'](_0x3d71e3));_0x5e4af5[_0x34352f(0x1ac)]++;if(_0x5e4af5[_0x34352f(0x1ac)]>=_0x48a8af['length']){if(_0x34352f(0x25d)===_0x34352f(0x25d)){Input[_0x34352f(0x227)](),TouchInput[_0x34352f(0x227)]();const _0x149403=_0x5e4af5[_0x34352f(0x1e3)]||0x0;if(_0x149403>0x0){if(_0x34352f(0x187)!==_0x34352f(0x187)){const _0x2388f7=_0x5a56c6[_0x34352f(0x1fc)]['Settings'][_0x34352f(0xa7)],_0x2b688a=_0x2388f7[_0x34352f(0x1f4)]||0x64,_0x351e28=0xc,_0x42177e=_0x360c5f['floor']((this[_0x34352f(0x19c)]-_0x2b688a)/0x2),_0x428daf=this['lineHeight']()-_0x351e28-0x2,_0x1445c4=_0x30f27b['getColor'](_0x2388f7[_0x34352f(0xb7)]),_0x34760c=_0x38a99f[_0x34352f(0x235)](_0x2388f7[_0x34352f(0xe6)]);this[_0x34352f(0x1a4)]['fillRect'](_0x42177e-0x1,_0x428daf-0x1,_0x2b688a+0x2,_0x351e28+0x2,_0x2fe2a7[_0x34352f(0x112)]()),this[_0x34352f(0x1a4)][_0x34352f(0xd7)](_0x42177e,_0x428daf,_0x2b688a,_0x351e28,_0x1445c4,_0x34760c,!![]);}else $gameSwitches[_0x34352f(0x27f)](_0x149403,!![]);}const _0x5a168e=_0x5e4af5['varID']||0x0;if(_0x5a168e>0x0){if(_0x34352f(0x178)===_0x34352f(0x28d)){const _0x76146b=_0x26cc0a['_qteSettings'],_0x4f154f=_0x76146b[_0x34352f(0x24d)][_0x34352f(0x1f9)]()[_0x34352f(0x2f3)]();this[_0x34352f(0x200)]=[];for(const _0x5b478e of _0x4f154f){_0x5b478e[_0x34352f(0xae)]=this[_0x34352f(0x16e)],_0x5b478e[_0x34352f(0x273)]=this[_0x34352f(0x270)];const _0xf5851c=new _0x437cd2(_0x5b478e);this[_0x34352f(0xfb)](_0xf5851c),this[_0x34352f(0x200)][_0x34352f(0x23f)](_0xf5851c);}}else $gameVariables[_0x34352f(0x27f)](_0x5a168e,this[_0x34352f(0x10f)]);}this['finishEarlyQTE']();}else{const _0xe70059=_0x5da588(_0x50ac79);_0x2eea49[_0x34352f(0x1dd)](_0xe70059)!==this[_0x34352f(0x237)][_0x28a41e]&&(this['_watchedJsVariables'][_0x2e895b]=_0x5c0ead[_0x34352f(0x1dd)](_0xe70059),_0x5a0706[_0x34352f(0x1fc)][_0x34352f(0x12d)](_0xe70059));}}}else _0x516201>0x0&&this[_0x34352f(0x148)]<=0x0&&Input[_0x34352f(0x238)]()&&(SoundManager[_0x34352f(0x241)](),_0x5e4af5['progress']=0x0);},SceneManager[_0xa66f72(0x1e2)]=function(){const _0x3448ab=_0xa66f72;if(VisuMZ[_0x3448ab(0x1fc)][_0x3448ab(0x294)]()||Input[_0x3448ab(0x22f)]>0x0){if(Input['dir4']>0x0){if('JVUIN'!=='xQVkn'){if(this[_0x3448ab(0x126)]===Input[_0x3448ab(0x22f)])return;this[_0x3448ab(0x126)]=Input[_0x3448ab(0x22f)];}else _0x121d48['setValue'](_0x29fdd3,!![]);}const _0x53e2cf=this[_0x3448ab(0x267)],_0x3278e4=_0x53e2cf['commonEventID']||0x0;if(_0x3278e4>0x0){const _0x3ae8b1=$gameTemp[_0x3448ab(0x17c)]();$onceParallel(_0x3278e4,_0x3ae8b1?_0x3ae8b1[_0x3448ab(0x214)]:0x0);}const _0x5677d8=_0x53e2cf[_0x3448ab(0x249)];_0x5677d8&&_0x5677d8[_0x3448ab(0xb9)]&&AudioManager[_0x3448ab(0x27b)](_0x5677d8);_0x53e2cf[_0x3448ab(0x1ac)]++;if(_0x53e2cf[_0x3448ab(0x1ac)]>=_0x53e2cf[_0x3448ab(0x194)]){Input['clear'](),TouchInput[_0x3448ab(0x227)]();const _0x24b255=_0x53e2cf[_0x3448ab(0x1e3)]||0x0;_0x24b255>0x0&&$gameSwitches[_0x3448ab(0x27f)](_0x24b255,!![]);const _0x1a2eb9=_0x53e2cf[_0x3448ab(0x184)]||0x0;_0x1a2eb9>0x0&&$gameVariables[_0x3448ab(0x27f)](_0x1a2eb9,this[_0x3448ab(0x10f)]),this['finishEarlyQTE']();}}},SceneManager[_0xa66f72(0x170)]=function(){const _0xa377d=_0xa66f72;if(VisuMZ[_0xa377d(0x1fc)][_0xa377d(0x294)]()||Input[_0xa377d(0x1b7)]('ok')||TouchInput['isTriggered']()){if(_0xa377d(0x19e)===_0xa377d(0x19e)){const _0x3763cc=this[_0xa377d(0x267)],_0x11d4f0=_0x3763cc[_0xa377d(0x226)]||0x0;if(_0x11d4f0>0x0){if(_0xa377d(0x11c)!==_0xa377d(0x1b3)){const _0x4610b9=$gameTemp[_0xa377d(0x17c)]();$onceParallel(_0x11d4f0,_0x4610b9?_0x4610b9[_0xa377d(0x214)]:0x0);}else{if(!this['parent'])return![];if(_0x36e6b1[_0xa377d(0x1e8)]>0x0)return![];if(this[_0xa377d(0x279)])return![];return!![];}}const _0x2eba4d=_0x3763cc[_0xa377d(0x249)];if(_0x2eba4d&&_0x2eba4d[_0xa377d(0xb9)]){if(_0xa377d(0x1a1)==='rUaAH'){const _0x1a83ee=_0x452450['QTE_TriggerSys'][_0xa377d(0x2b5)][_0xa377d(0xa7)],_0x2e1cee=new _0x52b3df(),_0x1272db=_0x4aaf38['_qteSettings'][_0xa377d(0xd4)];_0x2e1cee[_0xa377d(0x10e)]=_0xc6efff['loadPicture'](_0x1272db),_0x2e1cee[_0xa377d(0x2ec)]=_0x1a83ee[_0xa377d(0x2b6)]??0x80,_0x2e1cee[_0xa377d(0x124)]['x']=0.5,_0x2e1cee[_0xa377d(0x124)]['y']=0.5,_0x2e1cee[_0xa377d(0x230)]['x']=_0x1a83ee[_0xa377d(0x14a)]??0x4,_0x2e1cee['scale']['y']=_0x1a83ee[_0xa377d(0x14a)]??0x4,this[_0xa377d(0xfb)](_0x2e1cee),this['_overlaySprite']=_0x2e1cee;}else AudioManager[_0xa377d(0x27b)](_0x2eba4d);}_0x3763cc[_0xa377d(0x1ac)]++;if(_0x3763cc[_0xa377d(0x1ac)]>=_0x3763cc[_0xa377d(0x194)]){Input[_0xa377d(0x227)](),TouchInput[_0xa377d(0x227)]();const _0x543219=_0x3763cc[_0xa377d(0x1e3)]||0x0;_0x543219>0x0&&$gameSwitches[_0xa377d(0x27f)](_0x543219,!![]);const _0x33f187=_0x3763cc[_0xa377d(0x184)]||0x0;_0x33f187>0x0&&$gameVariables[_0xa377d(0x27f)](_0x33f187,this[_0xa377d(0x10f)]),this[_0xa377d(0x17b)]();}}else this[_0xa377d(0x2ef)]=_0x5eef48['QTE_TriggerSys']['Settings'][_0xa377d(0x122)]['DefaultGameOverEvent']||0x0;}},SceneManager[_0xa66f72(0x107)]=function(){const _0x23b2eb=_0xa66f72,_0x38a6b9=this[_0x23b2eb(0x267)];this['_qteDuration']=0x1f40;if(VisuMZ[_0x23b2eb(0x1fc)]['PlaytestInput'](!![])||Input[_0x23b2eb(0xaf)]('ok')||TouchInput[_0x23b2eb(0xaf)]()){if(this[_0x23b2eb(0x267)]['HoldCommonEventID']&&!this[_0x23b2eb(0x267)][_0x23b2eb(0x21b)]){this[_0x23b2eb(0x267)][_0x23b2eb(0x21b)]=!![];const _0x362e55=this[_0x23b2eb(0x267)][_0x23b2eb(0x7d)],_0xab88ec=$gameTemp['getLastPluginCommandInterpreter']();$onceParallel(_0x362e55,_0xab88ec?_0xab88ec[_0x23b2eb(0x214)]:0x0);}if(VisuMZ[_0x23b2eb(0x1fc)]['PlaytestInput'](!![])){if(_0x23b2eb(0x27d)!==_0x23b2eb(0x27d)){_0x4006ba['QTE_TriggerSys']['checkWatchedTriggers']();if(_0xcd43f2)_0x1ec9e4['checkWatchedTriggers']();}else _0x38a6b9['progress']+=Math['floor'](_0x38a6b9[_0x23b2eb(0x194)]/0x14);}else _0x38a6b9[_0x23b2eb(0x1ac)]++;if(_0x38a6b9['progress']>=_0x38a6b9[_0x23b2eb(0x194)]){if(VisuMZ[_0x23b2eb(0x1fc)]['PlaytestInput'](!![]))Input[_0x23b2eb(0x227)](),TouchInput[_0x23b2eb(0x227)]();else{Input[_0x23b2eb(0x227)](),TouchInput[_0x23b2eb(0x227)]();const _0x34dae4=_0x38a6b9[_0x23b2eb(0x242)];_0x34dae4&&_0x34dae4[_0x23b2eb(0xb9)]&&AudioManager['playSe'](_0x34dae4);const _0x4dbea6=_0x38a6b9[_0x23b2eb(0x1e3)]||0x0;_0x4dbea6>0x0&&$gameSwitches[_0x23b2eb(0x27f)](_0x4dbea6,![]);const _0x554668=_0x38a6b9[_0x23b2eb(0x184)]||0x0;_0x554668>0x0&&(_0x23b2eb(0x2e2)!==_0x23b2eb(0x2e2)?(this[_0x23b2eb(0xe1)](),_0x15965a['prototype'][_0x23b2eb(0x7f)][_0x23b2eb(0x1ba)](this,_0x17612f),this[_0x23b2eb(0x83)](0x2),this[_0x23b2eb(0x253)]()):$gameVariables[_0x23b2eb(0x27f)](_0x554668,0x0));if(this[_0x23b2eb(0x267)][_0x23b2eb(0x127)]){const _0xd66f70=this[_0x23b2eb(0x267)][_0x23b2eb(0x127)],_0x224001=$gameTemp[_0x23b2eb(0x17c)]();$onceParallel(_0xd66f70,_0x224001?_0x224001[_0x23b2eb(0x214)]:0x0);}this['finishEarlyQTE']();}}}else{if(!VisuMZ[_0x23b2eb(0x1fc)]['PlaytestInput'](!![])&&!Input[_0x23b2eb(0xaf)]('ok')&&!TouchInput['isPressed']()){Input[_0x23b2eb(0x227)](),TouchInput[_0x23b2eb(0x227)]();const _0x303713=_0x38a6b9[_0x23b2eb(0x1ac)]>0x0?_0x38a6b9[_0x23b2eb(0x1b5)]:_0x38a6b9[_0x23b2eb(0x242)];if(_0x303713&&_0x303713[_0x23b2eb(0xb9)]){if(_0x23b2eb(0x15a)!==_0x23b2eb(0x15a)){const _0x4fc72d=_0x4d648a['iconWidth'],_0x252fc6=_0x4551d4[_0x23b2eb(0x284)],_0x3d5cba=_0x45929e%0x10*_0x4fc72d,_0x3c6ec0=_0xba5bdb['floor'](_0x3c7aba/0x10)*_0x252fc6;_0x13f449[_0x23b2eb(0x216)](_0x3d5cba,_0x3c6ec0,_0x4fc72d,_0x252fc6);}else AudioManager[_0x23b2eb(0x27b)](_0x303713);}const _0x37773e=_0x38a6b9[_0x23b2eb(0x1e3)]||0x0;_0x37773e>0x0&&$gameSwitches[_0x23b2eb(0x27f)](_0x37773e,_0x38a6b9[_0x23b2eb(0x1ac)]>0x0);const _0x446a22=_0x38a6b9['varID']||0x0;_0x446a22>0x0&&(_0x38a6b9['progress']=Math[_0x23b2eb(0x29b)](_0x38a6b9[_0x23b2eb(0x1ac)],_0x38a6b9[_0x23b2eb(0x194)]),$gameVariables[_0x23b2eb(0x27f)](_0x446a22,_0x38a6b9[_0x23b2eb(0x1ac)]));if(_0x38a6b9['progress']>0x0){if(_0x23b2eb(0xe9)!==_0x23b2eb(0xe9))return _0x4a2ad0['getGameOverCommonEventID']();else{if(this[_0x23b2eb(0x267)][_0x23b2eb(0x24b)]){const _0x44e9a4=this[_0x23b2eb(0x267)]['ReleaseCommonEventID'],_0x255b97=$gameTemp[_0x23b2eb(0x17c)]();$onceParallel(_0x44e9a4,_0x255b97?_0x255b97[_0x23b2eb(0x214)]:0x0);}}}else{if(this[_0x23b2eb(0x267)]['OverloadCommonEventID']){const _0x5ddc68=this[_0x23b2eb(0x267)][_0x23b2eb(0x127)],_0x23f197=$gameTemp['getLastPluginCommandInterpreter']();$onceParallel(_0x5ddc68,_0x23f197?_0x23f197['_eventId']:0x0);}}this[_0x23b2eb(0x17b)]();}}},SceneManager[_0xa66f72(0x15c)]=function(){const _0x4e77fd=_0xa66f72;if(VisuMZ[_0x4e77fd(0x1fc)][_0x4e77fd(0x294)]()||Input[_0x4e77fd(0x1b7)](_0x4e77fd(0x166))||Input['isTriggered'](_0x4e77fd(0x23a))){if(_0x4e77fd(0xd9)==='ENEQv')this[_0x4e77fd(0x9c)]=!![];else{const _0xd1f3f9=this[_0x4e77fd(0x267)];if(Input[_0x4e77fd(0x1b7)]('pageup')){if(this[_0x4e77fd(0x126)]===_0x4e77fd(0x166))return;this[_0x4e77fd(0x126)]='pageup';}if(Input[_0x4e77fd(0x1b7)](_0x4e77fd(0x23a))){if(_0x4e77fd(0xa1)!==_0x4e77fd(0x8c)){if(this[_0x4e77fd(0x126)]===_0x4e77fd(0x23a))return;this[_0x4e77fd(0x126)]=_0x4e77fd(0x23a);}else{const _0x402e24=_0x27ec88[_0x4e77fd(0x17c)]();_0x1bf189(_0x12e89d,_0x402e24?_0x402e24[_0x4e77fd(0x214)]:0x0);}}VisuMZ[_0x4e77fd(0x1fc)][_0x4e77fd(0x294)]()&&(this[_0x4e77fd(0x126)]=this[_0x4e77fd(0x126)]===_0x4e77fd(0x166)?_0x4e77fd(0x23a):_0x4e77fd(0x166));const _0x18d67c=this[_0x4e77fd(0x126)]===_0x4e77fd(0x166)?_0xd1f3f9[_0x4e77fd(0xff)]||0x0:_0xd1f3f9['pageDownCommonEventID']||0x0;if(_0x18d67c>0x0){if(_0x4e77fd(0x1b6)!==_0x4e77fd(0x274)){const _0x29de82=$gameTemp['getLastPluginCommandInterpreter']();$onceParallel(_0x18d67c,_0x29de82?_0x29de82[_0x4e77fd(0x214)]:0x0);}else _0x16ae7c['setValue'](_0xa9bda9,0x0);}const _0x21cd7f=_0xd1f3f9['sound'];_0x21cd7f&&_0x21cd7f[_0x4e77fd(0xb9)]&&(_0x4e77fd(0xfd)!==_0x4e77fd(0xfd)?_0x59d38c['setValue'](_0x2f5313,this[_0x4e77fd(0x10f)]):AudioManager[_0x4e77fd(0x27b)](_0x21cd7f));_0xd1f3f9[_0x4e77fd(0x1ac)]++;if(_0xd1f3f9['progress']>=_0xd1f3f9[_0x4e77fd(0x194)]){Input[_0x4e77fd(0x227)](),TouchInput[_0x4e77fd(0x227)]();const _0x38d509=_0xd1f3f9['switchID']||0x0;if(_0x38d509>0x0){if(_0x4e77fd(0x2e8)!==_0x4e77fd(0x2e8)){const _0x572b1e=new _0x20c878(_0x442f03);this[_0x4e77fd(0xf6)][_0x40a96f['id']][_0x4e77fd(0x132)](_0x572b1e),_0x57e77c='';}else $gameSwitches[_0x4e77fd(0x27f)](_0x38d509,!![]);}const _0x4afa60=_0xd1f3f9[_0x4e77fd(0x184)]||0x0;_0x4afa60>0x0&&$gameVariables[_0x4e77fd(0x27f)](_0x4afa60,this['_qteDuration']),this['finishEarlyQTE']();}}}},SceneManager[_0xa66f72(0x2e5)]=function(){const _0x2b5c93=_0xa66f72;if(VisuMZ['QTE_TriggerSys'][_0x2b5c93(0x294)]()||Input['isTriggered']('ok')||Input[_0x2b5c93(0x1b7)]('cancel')){if('FRusq'==='FRusq'){const _0x28f24c=this[_0x2b5c93(0x267)];if(Input[_0x2b5c93(0x1b7)]('ok')){if('zKqeY'===_0x2b5c93(0xe4)){if(this[_0x2b5c93(0x126)]==='ok')return;this[_0x2b5c93(0x126)]='ok';}else{if(!_0x6a9178['isEarlyFinishQTE']())return;this[_0x2b5c93(0x279)]=!![];}}if(Input['isTriggered']('cancel')){if('SKFIi'===_0x2b5c93(0x298)){if(this[_0x2b5c93(0x126)]===_0x2b5c93(0x154))return;this[_0x2b5c93(0x126)]=_0x2b5c93(0x154);}else this[_0x2b5c93(0x101)]();}VisuMZ[_0x2b5c93(0x1fc)][_0x2b5c93(0x294)]()&&(this['_qteLastInput']=this[_0x2b5c93(0x126)]==='ok'?_0x2b5c93(0x154):'ok');const _0x2cf6ad=this[_0x2b5c93(0x126)]==='ok'?_0x28f24c[_0x2b5c93(0x91)]||0x0:_0x28f24c[_0x2b5c93(0xcb)]||0x0;if(_0x2cf6ad>0x0){const _0x4fea59=$gameTemp[_0x2b5c93(0x17c)]();$onceParallel(_0x2cf6ad,_0x4fea59?_0x4fea59[_0x2b5c93(0x214)]:0x0);}const _0x40b160=_0x28f24c[_0x2b5c93(0x249)];_0x40b160&&_0x40b160[_0x2b5c93(0xb9)]&&AudioManager[_0x2b5c93(0x27b)](_0x40b160);_0x28f24c[_0x2b5c93(0x1ac)]++;if(_0x28f24c[_0x2b5c93(0x1ac)]>=_0x28f24c[_0x2b5c93(0x194)]){if(_0x2b5c93(0x155)===_0x2b5c93(0x175)){const _0x15e320=_0x54e71d['shift']();_0x2639e4['clearWatchedTrigger']('variables',_0x15e320);}else{Input['clear'](),TouchInput[_0x2b5c93(0x227)]();const _0x56d21d=_0x28f24c[_0x2b5c93(0x1e3)]||0x0;_0x56d21d>0x0&&$gameSwitches[_0x2b5c93(0x27f)](_0x56d21d,!![]);const _0x4c93d9=_0x28f24c[_0x2b5c93(0x184)]||0x0;_0x4c93d9>0x0&&$gameVariables[_0x2b5c93(0x27f)](_0x4c93d9,this[_0x2b5c93(0x10f)]),this[_0x2b5c93(0x17b)]();}}}else _0x4a0c29[_0x2b5c93(0x118)]['initialize'][_0x2b5c93(0x1ba)](this),this[_0x2b5c93(0xac)](),this[_0x2b5c93(0x1d6)](),this[_0x2b5c93(0x2be)]();}},SceneManager['updateTimedHitQTE']=function(){const _0x444736=_0xa66f72;if(VisuMZ[_0x444736(0x1fc)]['PlaytestInput'](!![])||Input[_0x444736(0x1b7)]('ok')||TouchInput[_0x444736(0x1b7)]()){const _0x1d9a03=this[_0x444736(0x267)],_0x31cf01=VisuMZ[_0x444736(0x1fc)][_0x444736(0x2b5)][_0x444736(0xa7)],_0x4e2d21=this[_0x444736(0x10f)];if(VisuMZ[_0x444736(0x1fc)][_0x444736(0x294)](!![])&&_0x4e2d21>0x1)return;Input[_0x444736(0x227)](),TouchInput['clear']();const _0x204570=_0x31cf01[_0x444736(0x26f)]??0x10,_0x2431f3=_0x204570+0x1>=_0x4e2d21,_0xebf0f6=_0x1d9a03[_0x444736(0x1e3)]||0x0;_0xebf0f6>0x0&&$gameSwitches['setValue'](_0xebf0f6,_0x2431f3);const _0x32b0f5=_0x1d9a03['varID']||0x0;_0x32b0f5>0x0&&$gameVariables[_0x444736(0x27f)](_0x32b0f5,_0x4e2d21-0x1);if(_0x2431f3){if('sTlLs'!==_0x444736(0x26a)){this['contents']['clear']();const _0x23c3e9=this[_0x444736(0x2a3)](),_0x9e0730=this[_0x444736(0x2b9)](),_0x53f77d=this[_0x444736(0x23b)](),_0x205523=this[_0x444736(0x19c)],_0x3fde81=0x0,_0x3d0142=0x0,_0x5c2221=this[_0x444736(0x2dc)](),_0x25738b=this[_0x444736(0x2ed)](),_0x282edd=(_0x5c2221/_0x25738b)[_0x444736(0x1a8)](0x0,0x1);if(_0x5cdd01['VisuMZ_3_VisualGaugeStyles']){const _0x365323=(_0x35a50b['VisualGaugeStyles'][_0x444736(0x24e)](_0x53f77d)??0xc)['clamp'](0x1,0x20),_0x5a990a=_0x3d0142+this[_0x444736(0x2d8)]()-_0x365323-0x2,_0x45e69f=_0x29fbee['gaugeBackColor']();_0x357e5f[_0x444736(0x134)][_0x444736(0x86)]=this[_0x444736(0x2ed)](),this[_0x444736(0x1a4)][_0x444736(0xf9)](_0x53f77d,_0x3fde81,_0x5a990a,_0x205523,_0x365323,_0x282edd,_0x45e69f,_0x23c3e9,_0x9e0730);}else this[_0x444736(0x2c9)](_0x3fde81,_0x3d0142,_0x205523,_0x282edd,_0x23c3e9,_0x9e0730);}else{const _0x10f678=_0x1d9a03[_0x444736(0x1c7)];_0x10f678&&_0x10f678['name']&&AudioManager[_0x444736(0x27b)](_0x10f678);const _0x47ebd8=_0x1d9a03[_0x444736(0xb2)]||0x0;if(_0x47ebd8>0x0){const _0x381acd=$gameTemp['getLastPluginCommandInterpreter']();$onceParallel(_0x47ebd8,_0x381acd?_0x381acd[_0x444736(0x214)]:0x0);}}}else{if(_0x444736(0x145)===_0x444736(0x145)){const _0x1759e6=_0x1d9a03['missSound'];_0x1759e6&&_0x1759e6[_0x444736(0xb9)]&&AudioManager[_0x444736(0x27b)](_0x1759e6);const _0x4efc01=_0x1d9a03[_0x444736(0x1c6)]||0x0;if(_0x4efc01>0x0){const _0x462058=$gameTemp[_0x444736(0x17c)]();$onceParallel(_0x4efc01,_0x462058?_0x462058['_eventId']:0x0);}}else{if(_0x72fd75[_0x444736(0x1df)]())return;_0x30133c[_0x444736(0x95)](_0x11ae7e,_0x44c213);const _0x4180fd={'type':'directionStruggle','goal':_0x3d6001[_0x444736(0x25b)]||0x1,'progress':0x0,'switchID':_0x1c62c3[_0x444736(0x1a9)]||0x0,'varID':_0x44d676[_0x444736(0x9a)]||0x0,'commonEventID':_0x94fb7b[_0x444736(0x181)]||0x0,'sound':_0x35f243[_0x444736(0x1fb)]||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x462bc8[_0x444736(0xdb)]||0x0,'duration':_0x3b9d7d[_0x444736(0x105)]||0x1},_0x3f81f1=_0x66c988[_0x444736(0x271)];_0x1bf95d[_0x444736(0xa5)](_0x4180fd);if(_0x3f81f1){const _0x4c0134=_0x1c9ec6['getLastPluginCommandInterpreter']();if(_0x4c0134)_0x4c0134[_0x444736(0x1ec)](_0x444736(0xa7));}}}this['finishEarlyQTE']();}},SceneManager[_0xa66f72(0xbe)]=function(){const _0x39172e=_0xa66f72;if(VisuMZ[_0x39172e(0x1fc)]['PlaytestInput'](!![])||Input[_0x39172e(0x238)]()){if(_0x39172e(0x130)!==_0x39172e(0x130))_0x3287eb[_0x39172e(0x1ac)]=_0x388fc4[_0x39172e(0x29b)](_0x1fde75[_0x39172e(0x1ac)],_0x5b6e65[_0x39172e(0x194)]),_0x3c3421[_0x39172e(0x27f)](_0x12a727,_0x152344['progress']);else{const _0x286a1d=this['_qteSettings'],_0x141df5=VisuMZ['QTE_TriggerSys'][_0x39172e(0x2b5)][_0x39172e(0xa7)],_0xdc7949=this[_0x39172e(0x186)]-this['_qteDuration'],_0x22d9fe=_0x286a1d[_0x39172e(0xa0)][0x0];if(!_0x22d9fe)return;const _0x7c6806=_0x22d9fe['Timing'],_0x32e979=Math[_0x39172e(0x1e1)](_0x7c6806-_0xdc7949),_0x5dc632=_0x141df5[_0x39172e(0x1c3)]??0x8;if(_0x32e979>_0x5dc632*0x2)return;let _0x54d773=Input[_0x39172e(0x2b4)];if(_0x54d773===_0x39172e(0x1f0))_0x54d773='cancel';if(VisuMZ[_0x39172e(0x1fc)]['PlaytestInput'](!![])){if(_0x32e979!==0x1)return;}else Input[_0x39172e(0x227)](),TouchInput['clear']();const _0x67dbe8=_0x32e979<=_0x5dc632&&_0x54d773===_0x22d9fe['Button'];if(_0x67dbe8){const _0x38549a=_0x22d9fe[_0x39172e(0x1fb)];_0x38549a&&_0x38549a[_0x39172e(0xb9)]&&AudioManager[_0x39172e(0x27b)](_0x38549a);const _0x1362e0=_0x22d9fe['SwitchID']||0x0;_0x1362e0>0x0&&$gameSwitches[_0x39172e(0x27f)](_0x1362e0,!![]);const _0x174de4=_0x286a1d['varID']||0x0;if(_0x174de4>0x0){const _0x58c176=$gameVariables[_0x39172e(0x1dd)](_0x174de4);$gameVariables[_0x39172e(0x27f)](_0x174de4,_0x58c176+0x1);}const _0x2aead9=_0x22d9fe[_0x39172e(0x181)]||0x0;if(_0x2aead9>0x0){const _0xbf1119=$gameTemp['getLastPluginCommandInterpreter']();$onceParallel(_0x2aead9,_0xbf1119?_0xbf1119[_0x39172e(0x214)]:0x0);}}else{if(_0x39172e(0x21f)!==_0x39172e(0x21f))_0x299f96[_0x39172e(0x24d)]=_0x5e2344[_0x39172e(0x1fc)][_0x39172e(0xf5)](_0x47d1f9['sequence']);else{const _0x4d1179=_0x286a1d[_0x39172e(0x202)];_0x4d1179&&_0x4d1179['name']&&AudioManager[_0x39172e(0x27b)](_0x4d1179);const _0x53af03=_0x286a1d[_0x39172e(0x1c6)]||0x0;if(_0x53af03>0x0){if(_0x39172e(0x2c4)!==_0x39172e(0x13d)){const _0x558fdd=$gameTemp[_0x39172e(0x17c)]();$onceParallel(_0x53af03,_0x558fdd?_0x558fdd[_0x39172e(0x214)]:0x0);}else _0x502323('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x39172e(0xc3)](_0xe350b,_0x454894)),_0xe13840[_0x39172e(0x29f)]();}}}_0x286a1d[_0x39172e(0xa0)]['remove'](_0x22d9fe),_0x286a1d['remainingSequence']['length']<=0x0&&(Input[_0x39172e(0x227)](),TouchInput['clear'](),this[_0x39172e(0x17b)]());}}},SceneManager['updateTimingBarQTE']=function(){const _0x67a1e1=_0xa66f72,_0x3f70b1=this[_0x67a1e1(0x267)];if(VisuMZ[_0x67a1e1(0x1fc)][_0x67a1e1(0x294)]()||Input['isTriggered']('ok')||TouchInput['isTriggered']()){const _0x578c4d=this['_scene']['_qteWindow'];_0x578c4d['stopCursor']();const _0x5c4617=_0x578c4d[_0x67a1e1(0x29a)](),_0x3c9fe3=_0x3f70b1[_0x67a1e1(0x1d4)],_0x82e3ad=VisuMZ[_0x67a1e1(0x1fc)]['PlaytestInput']()?_0x3c9fe3[_0x67a1e1(0x1f9)]():_0x3c9fe3[_0x67a1e1(0xba)](_0x21ae85=>_0x5c4617>=_0x21ae85[_0x67a1e1(0x185)]&&_0x5c4617<=_0x21ae85['End']);Input[_0x67a1e1(0x227)](),TouchInput['clear']();if(_0x82e3ad[_0x67a1e1(0x17e)]>0x0){const _0x2e553e=_0x82e3ad[_0x67a1e1(0xde)]((_0x1094b0,_0x1e69d9)=>_0x1e69d9[_0x67a1e1(0xcd)]>_0x1094b0['Points']?_0x1e69d9:_0x1094b0),_0x19cf16=_0x3f70b1[_0x67a1e1(0x1c7)];_0x19cf16&&_0x19cf16[_0x67a1e1(0xb9)]&&AudioManager[_0x67a1e1(0x27b)](_0x19cf16);const _0x5555d6=_0x3f70b1[_0x67a1e1(0x1e3)]||0x0;_0x5555d6>0x0&&$gameSwitches[_0x67a1e1(0x27f)](_0x5555d6,!![]);const _0x531f0e=_0x3f70b1[_0x67a1e1(0x184)]||0x0;_0x531f0e>0x0&&$gameVariables[_0x67a1e1(0x27f)](_0x531f0e,_0x2e553e[_0x67a1e1(0xcd)]);const _0x46e5a5=_0x2e553e['CommonEventID']||0x0;if(_0x46e5a5>0x0){if('ejBLN'==='ejBLN'){const _0x3979cd=$gameTemp[_0x67a1e1(0x17c)]();$onceParallel(_0x46e5a5,_0x3979cd?_0x3979cd[_0x67a1e1(0x214)]:0x0);}else _0x42d810[_0x67a1e1(0x95)](_0x2166b2,_0x16d651),_0x4eee89['setGameOverCommonEventID'](0x0);}}else{if(_0x67a1e1(0x1cb)!==_0x67a1e1(0x215)){const _0xa0aaae=_0x3f70b1[_0x67a1e1(0x202)];_0xa0aaae&&_0xa0aaae[_0x67a1e1(0xb9)]&&(_0x67a1e1(0x2a5)!==_0x67a1e1(0x1be)?AudioManager[_0x67a1e1(0x27b)](_0xa0aaae):_0x534e53[_0x67a1e1(0x1fc)][_0x67a1e1(0x2ab)](_0xa18e6c));const _0x3bb1da=_0x3f70b1[_0x67a1e1(0x1e3)]||0x0;_0x3bb1da>0x0&&(_0x67a1e1(0x80)===_0x67a1e1(0x1a2)?(_0x48ff9f[_0x67a1e1(0x118)]['initialize'][_0x67a1e1(0x1ba)](this),this[_0x67a1e1(0x206)]=_0x515115,this[_0x67a1e1(0xac)](),this[_0x67a1e1(0x117)](),this[_0x67a1e1(0x209)]()):$gameSwitches[_0x67a1e1(0x27f)](_0x3bb1da,![]));const _0x5a8f18=_0x3f70b1[_0x67a1e1(0x184)]||0x0;_0x5a8f18>0x0&&$gameVariables['setValue'](_0x5a8f18,0x0);const _0x5236fe=_0x3f70b1[_0x67a1e1(0x1c6)]||0x0;if(_0x5236fe>0x0){if('yxVpi'!==_0x67a1e1(0xc2)){_0x183c64[_0x67a1e1(0x95)](_0x2b1c13,_0x3fe014);const _0x1dd7e3=_0x239222[_0x67a1e1(0x15b)]||0x0;if(_0x1dd7e3<=0x0)return;const _0x46f923=_0x5bafed[_0x67a1e1(0x85)]||[],_0x4800ef=_0x67a1e1(0x2ca);_0x4814fe[_0x67a1e1(0x1d9)](_0x4800ef,_0x1dd7e3,_0x46f923);}else{const _0x2740d5=$gameTemp[_0x67a1e1(0x17c)]();$onceParallel(_0x5236fe,_0x2740d5?_0x2740d5[_0x67a1e1(0x214)]:0x0);}}}else{const _0x7bcf9c=this[_0x67a1e1(0x1dd)](_0x428f16);_0x2047e0[_0x67a1e1(0x1fc)][_0x67a1e1(0x15d)][_0x67a1e1(0x1ba)](this,_0x3842f8,_0x2890dc),_0x7bcf9c!==this[_0x67a1e1(0x1dd)](_0x15f454)&&(_0x34b413[_0x67a1e1(0x1fc)]['processSwitchTrigger'](_0x4e3d7e),_0x2dcf58[_0x67a1e1(0x197)](_0x67a1e1(0x2ca),_0x414fa4)&&_0x11789d[_0x67a1e1(0x2e0)](_0x67a1e1(0x2ca),_0x5e1caf));}}this[_0x67a1e1(0x17b)]();}},VisuMZ[_0xa66f72(0x1fc)]['Game_System_initialize']=Game_System[_0xa66f72(0x118)][_0xa66f72(0x7f)],Game_System[_0xa66f72(0x118)]['initialize']=function(){const _0xf02d71=_0xa66f72;VisuMZ[_0xf02d71(0x1fc)][_0xf02d71(0x18c)][_0xf02d71(0x1ba)](this),this[_0xf02d71(0x1cf)](),this['initGameOverEventSettings']();},Game_System[_0xa66f72(0x118)][_0xa66f72(0x1cf)]=function(){const _0x5d187f=_0xa66f72;this[_0x5d187f(0x1d3)](),this[_0x5d187f(0x1d8)]();},Game_System['prototype'][_0xa66f72(0x1d3)]=function(){const _0x5a052b=_0xa66f72;this[_0x5a052b(0x2f2)]=[];},Game_System[_0xa66f72(0x118)][_0xa66f72(0x1b4)]=function(_0x2b1c21){const _0x12e21=_0xa66f72;this['_onceParallelQueue']===undefined&&('yMUfH'!=='yMUfH'?_0xc1ce52():this[_0x12e21(0x1d3)]());if(this[_0x12e21(0x2f2)][_0x12e21(0x196)](_0x2b1c21))return;this[_0x12e21(0x2f2)]['push'](_0x2b1c21);},Game_System[_0xa66f72(0x118)][_0xa66f72(0x143)]=function(){const _0x192537=_0xa66f72;return this[_0x192537(0x2f2)]===undefined&&(_0x192537(0x231)===_0x192537(0x287)?(this[_0x192537(0xe8)](),this['drawHitZones']()):this['init_QTE_TriggerSysReservations']()),this['_onceParallelQueue'][_0x192537(0x17e)]>0x0;},Game_System['prototype']['processAllOnceParallels']=function(){const _0x313b16=_0xa66f72;this['_onceParallelQueue']===undefined&&this[_0x313b16(0x1d3)]();while(this['_onceParallelQueue'][_0x313b16(0x17e)]){const _0x1b95dc=this[_0x313b16(0x2f2)][_0x313b16(0x1d2)]();$onceParallel(_0x1b95dc);}},Game_System['prototype'][_0xa66f72(0x1d8)]=function(){const _0x5086a4=_0xa66f72;this[_0x5086a4(0x2b7)]={'switches':{},'variables':{},'items':{},'weapons':{},'armors':{}},this[_0x5086a4(0x2a8)]={'switches':{},'variables':{}};},Game_System[_0xa66f72(0x118)]['getQTE_TriggerSysPromises']=function(){const _0x508ee6=_0xa66f72;if(this[_0x508ee6(0x2b7)]===undefined)this['init_QTE_TriggerSysPromise']();return this[_0x508ee6(0x2b7)];},Game_System['prototype']['getWatchedTriggerPromises']=function(){const _0x4c3f7f=_0xa66f72;if(this[_0x4c3f7f(0x2a8)]===undefined)this['init_QTE_TriggerSysPromise']();return this['_watchedPromises'];},Game_System[_0xa66f72(0x118)]['addQTE_TriggerSysPromiseToSet']=function(_0x4a59ae,_0x32a753,_0x195f81){const _0x16dcd0=_0xa66f72,_0x349ef8=this[_0x16dcd0(0x2ae)]()[_0x4a59ae];if(!_0x349ef8)return;_0x349ef8[_0x32a753]=_0x349ef8[_0x32a753]||[];for(const _0x5493ca of _0x195f81){if(_0x16dcd0(0xbb)===_0x16dcd0(0x10c)){const _0x5a7a15=_0x5f231d(_0x22f243);_0x1a80f7[_0x16dcd0(0x1dd)](_0x5a7a15)!==_0x1ea038[_0x16dcd0(0x2ca)][_0x129865]&&(_0x5068c7[_0x16dcd0(0x2ca)][_0x4cf2d2]=_0x17b420[_0x16dcd0(0x1dd)](_0x5a7a15),this['fulfillOnTriggerPromises'](_0x16dcd0(0x2ca),_0x5a7a15),_0xd8cc27[_0x16dcd0(0x132)](_0x5a7a15));}else{if(_0x349ef8[_0x32a753][_0x16dcd0(0x196)](_0x5493ca))continue;_0x349ef8[_0x32a753][_0x16dcd0(0x132)](_0x5493ca);}}_0x4a59ae==='switches'&&DataManager[_0x16dcd0(0x21d)](_0x32a753)&&(this[_0x16dcd0(0x2a8)][_0x16dcd0(0x2ca)][_0x32a753]=$gameSwitches[_0x16dcd0(0x1dd)](_0x32a753));if(_0x4a59ae==='variables'&&DataManager[_0x16dcd0(0x8f)](_0x32a753)){if(_0x16dcd0(0x1b1)!==_0x16dcd0(0x1b1)){const _0x11290f=_0x203e99['getLastPluginCommandInterpreter']();if(_0x11290f)_0x11290f[_0x16dcd0(0x1ec)](_0x16dcd0(0xa7));}else this[_0x16dcd0(0x2a8)][_0x16dcd0(0x12c)][_0x32a753]=$gameVariables[_0x16dcd0(0x1dd)](_0x32a753);}},Game_System[_0xa66f72(0x118)][_0xa66f72(0x29e)]=function(){const _0x447c98=_0xa66f72,_0xd15b1=this[_0x447c98(0x121)]();{if(_0x447c98(0x2d6)===_0x447c98(0x2d6)){const _0x4c2f93=[];for(const _0x940a54 in _0xd15b1[_0x447c98(0x2ca)]){const _0x46505d=Number(_0x940a54);$gameSwitches[_0x447c98(0x1dd)](_0x46505d)!==_0xd15b1[_0x447c98(0x2ca)][_0x940a54]&&(_0xd15b1[_0x447c98(0x2ca)][_0x940a54]=$gameSwitches[_0x447c98(0x1dd)](_0x46505d),this['fulfillOnTriggerPromises'](_0x447c98(0x2ca),_0x46505d),_0x4c2f93['push'](_0x46505d));}while(_0x4c2f93[_0x447c98(0x17e)]>0x0){if(_0x447c98(0x147)===_0x447c98(0x147)){const _0x2d65a3=_0x4c2f93[_0x447c98(0x1d2)]();$gameSystem[_0x447c98(0x22e)](_0x447c98(0x2ca),_0x2d65a3);}else _0x486cf4['fulfillOnTriggerPromises'](_0x447c98(0x12c),_0x5bb0a6);}}else{if(_0x28af9c[_0x447c98(0x1df)]())return;_0x236e02[_0x447c98(0x95)](_0x146b2f,_0x451bff);const _0x5e6622={'type':'buttonSequence','sequence':(_0x3d5525['InputSequence']||[])[_0x447c98(0x1f9)](),'shuffle':_0x4736bf[_0x447c98(0xa6)]||![],'progress':0x0,'switchID':_0x355122[_0x447c98(0x1a9)]||0x0,'varID':_0x14b882[_0x447c98(0x9a)]||0x0,'commonEventID':_0x2721c8[_0x447c98(0x181)]||0x0,'sound':_0x5c68d8['Sound']||{'name':'','volume':0x0,'pitch':0x64,'pan':0x0},'inputStartDelay':_0x45542b[_0x447c98(0xdb)]||0x0,'duration':_0x4ef562['Duration']||0x1},_0x3087c2=_0x37f7d7[_0x447c98(0x271)];_0x5e6622[_0x447c98(0x1d1)]&&(_0x5e6622[_0x447c98(0x24d)]=_0x4510dc[_0x447c98(0x1fc)][_0x447c98(0xf5)](_0x5e6622[_0x447c98(0x24d)]));_0x272d16[_0x447c98(0xa5)](_0x5e6622);if(_0x3087c2){const _0x32cd33=_0x45a41f[_0x447c98(0x17c)]();if(_0x32cd33)_0x32cd33['setWaitMode'](_0x447c98(0xa7));}}}{const _0x10a19c=[];for(const _0x323da2 in _0xd15b1['variables']){const _0x30676f=Number(_0x323da2);0x4d;if($gameVariables['value'](_0x30676f)!==_0xd15b1['variables'][_0x323da2]){if(_0x447c98(0xb0)!==_0x447c98(0x269))_0xd15b1[_0x447c98(0x12c)][_0x323da2]=$gameVariables[_0x447c98(0x1dd)](_0x30676f),this[_0x447c98(0x2e0)](_0x447c98(0x12c),_0x30676f),_0x10a19c[_0x447c98(0x132)](_0x30676f);else{this[_0x447c98(0xf6)]=this[_0x447c98(0xf6)]||{},this[_0x447c98(0xf6)][_0x1aa43b]=this[_0x447c98(0xf6)][_0x26ef72]||[];const _0x5dac79=this[_0x447c98(0xf6)][_0x4d4ea4];for(const _0x32849e of _0x5dac79){try{_0x32849e();}catch(_0x37b95d){_0x2b7b62[_0x447c98(0x217)](_0x37b95d);}}}}}while(_0x10a19c[_0x447c98(0x17e)]>0x0){if(_0x447c98(0x2e6)==='dYAMv')this['updateEarlyFinish']();else{const _0xc4a2ff=_0x10a19c['shift']();$gameSystem[_0x447c98(0x22e)](_0x447c98(0x12c),_0xc4a2ff);}}}},Game_System['prototype'][_0xa66f72(0x197)]=function(_0x520810,_0x439a59){const _0x48f194=_0xa66f72,_0x2ea78a=this[_0x48f194(0x2ae)]()[_0x520810];if(!_0x2ea78a)return![];return _0x2ea78a[_0x439a59]=_0x2ea78a[_0x439a59]||[],_0x2ea78a[_0x439a59][_0x48f194(0x17e)]>0x0;},Game_System[_0xa66f72(0x118)][_0xa66f72(0x165)]=function(_0x27da08){const _0x88b38f=_0xa66f72;if(DataManager[_0x88b38f(0x19d)](_0x27da08))return this[_0x88b38f(0x197)](_0x88b38f(0x222),_0x27da08['id']);else{if(DataManager[_0x88b38f(0x98)](_0x27da08))return _0x88b38f(0x190)===_0x88b38f(0x11e)?_0x1abc52[_0x88b38f(0x20a)]():this[_0x88b38f(0x197)]('weapons',_0x27da08['id']);else{if(DataManager[_0x88b38f(0xad)](_0x27da08))return this['hasOnTriggerPromise'](_0x88b38f(0x25a),_0x27da08['id']);}}return![];},Game_System['prototype']['fulfillOnTriggerPromises']=function(_0x3cf141,_0x10f4af){const _0x190b2f=_0xa66f72,_0x381ab1=this[_0x190b2f(0x2ae)]()[_0x3cf141];if(!_0x381ab1)return![];const _0x11af30=_0x381ab1[_0x10f4af]||[];for(const _0x21d56a of _0x11af30){if('dIueo'==='dIueo')VisuMZ['QTE_TriggerSys'][_0x190b2f(0x195)](_0x21d56a);else{const _0x3ccd69=_0x559b46[_0x190b2f(0x17c)]();_0x1216cd(_0x23c501,_0x3ccd69?_0x3ccd69['_eventId']:0x0);}}delete _0x381ab1[_0x10f4af];},Game_System[_0xa66f72(0x118)]['fulfillOnTriggerPromisesItem']=function(_0x32b9a7){const _0x298547=_0xa66f72;if(DataManager['isItem'](_0x32b9a7))this[_0x298547(0x2e0)](_0x298547(0x222),_0x32b9a7['id']);else{if(DataManager[_0x298547(0x98)](_0x32b9a7))_0x298547(0x296)!==_0x298547(0x296)?_0x2d6d02[_0x298547(0x27f)](_0x6acf0e,this[_0x298547(0x10f)]):this[_0x298547(0x2e0)](_0x298547(0x138),_0x32b9a7['id']);else DataManager['isArmor'](_0x32b9a7)&&this[_0x298547(0x2e0)](_0x298547(0x25a),_0x32b9a7['id']);}},Game_System[_0xa66f72(0x118)]['clearWatchedTrigger']=function(_0x282e6c,_0x418e7e){const _0x2fc15d=_0xa66f72,_0x108e70=this[_0x2fc15d(0x121)]()[_0x282e6c];if(!_0x108e70)return;delete _0x108e70[_0x418e7e];},Game_System['prototype'][_0xa66f72(0x10b)]=function(){const _0x4f33d4=_0xa66f72;this[_0x4f33d4(0x2ef)]=VisuMZ['QTE_TriggerSys']['Settings'][_0x4f33d4(0x122)][_0x4f33d4(0x2f4)]||0x0;},Game_System['prototype'][_0xa66f72(0x2d7)]=function(){const _0x4c3da4=_0xa66f72;if(this[_0x4c3da4(0x2ef)]===undefined)this[_0x4c3da4(0x10b)]();return this['_gameOverCommonEventID'];},Game_System['prototype'][_0xa66f72(0x1f5)]=function(_0x32916b){const _0x2cfd8c=_0xa66f72;if(this[_0x2cfd8c(0x2ef)]===undefined)this[_0x2cfd8c(0x10b)]();this[_0x2cfd8c(0x2ef)]=_0x32916b;},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x15d)]=Game_Switches[_0xa66f72(0x118)][_0xa66f72(0x27f)],Game_Switches[_0xa66f72(0x118)][_0xa66f72(0x27f)]=function(_0x46caa3,_0x5b41c4){const _0xdbea29=_0xa66f72,_0x1f6515=this[_0xdbea29(0x1dd)](_0x46caa3);VisuMZ['QTE_TriggerSys'][_0xdbea29(0x15d)][_0xdbea29(0x1ba)](this,_0x46caa3,_0x5b41c4),_0x1f6515!==this[_0xdbea29(0x1dd)](_0x46caa3)&&(VisuMZ['QTE_TriggerSys']['processSwitchTrigger'](_0x46caa3),$gameSystem[_0xdbea29(0x197)](_0xdbea29(0x2ca),_0x46caa3)&&(_0xdbea29(0x15e)==='Whagu'?this[_0xdbea29(0x2e0)]('items',_0x2700e4['id']):$gameSystem[_0xdbea29(0x2e0)](_0xdbea29(0x2ca),_0x46caa3)));},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x1c1)]=Game_Variables[_0xa66f72(0x118)][_0xa66f72(0x27f)],Game_Variables[_0xa66f72(0x118)][_0xa66f72(0x27f)]=function(_0x16a20f,_0x357a84){const _0x3f5a8e=_0xa66f72,_0x3c0b4c=this['value'](_0x16a20f);VisuMZ[_0x3f5a8e(0x1fc)][_0x3f5a8e(0x1c1)][_0x3f5a8e(0x1ba)](this,_0x16a20f,_0x357a84),_0x3c0b4c!==this[_0x3f5a8e(0x1dd)](_0x16a20f)&&('EjESU'!==_0x3f5a8e(0x1db)?(VisuMZ[_0x3f5a8e(0x1fc)][_0x3f5a8e(0x12d)](_0x16a20f),$gameSystem['hasOnTriggerPromise'](_0x3f5a8e(0x12c),_0x16a20f)&&('GAmTS'===_0x3f5a8e(0x137)?$gameSystem[_0x3f5a8e(0x2e0)](_0x3f5a8e(0x12c),_0x16a20f):(this[_0x3f5a8e(0x1a4)]['fontFace']=_0x21f2e3[_0x3f5a8e(0xd8)](),this[_0x3f5a8e(0x1a4)][_0x3f5a8e(0x25c)]=_0x3ae1bb[_0x3f5a8e(0x1fc)]['Settings'][_0x3f5a8e(0xa7)][_0x3f5a8e(0xd3)]||_0x433f72[_0x3f5a8e(0x162)]()))):this[_0x3f5a8e(0x128)]());},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x1a7)]=Game_Party[_0xa66f72(0x118)][_0xa66f72(0x1dc)],Game_Party[_0xa66f72(0x118)][_0xa66f72(0x1dc)]=function(_0x500072,_0x3c23a4,_0x8c5bf1){const _0x3ffe3b=_0xa66f72,_0x103710=_0x500072?this[_0x3ffe3b(0x1ab)](_0x500072):0x0;VisuMZ[_0x3ffe3b(0x1fc)][_0x3ffe3b(0x1a7)][_0x3ffe3b(0x1ba)](this,_0x500072,_0x3c23a4,_0x8c5bf1),_0x500072&&_0x103710!==this[_0x3ffe3b(0x1ab)](_0x500072)&&('VcZeS'!==_0x3ffe3b(0x22c)?_0x26c30b[_0x3ffe3b(0x1fc)][_0x3ffe3b(0x233)][_0x35e20c]=![]:(DataManager[_0x3ffe3b(0xf4)](_0x500072)&&VisuMZ[_0x3ffe3b(0x1fc)]['processItemTrigger'](_0x500072),$gameSystem[_0x3ffe3b(0x165)](_0x500072)&&$gameSystem[_0x3ffe3b(0x15f)](_0x500072)));},VisuMZ[_0xa66f72(0x1fc)]['Game_Map_setup']=Game_Map[_0xa66f72(0x118)][_0xa66f72(0xd6)],Game_Map[_0xa66f72(0x118)][_0xa66f72(0xd6)]=function(_0x3c7a3b){const _0x15a0ed=_0xa66f72;VisuMZ['QTE_TriggerSys'][_0x15a0ed(0x119)][_0x15a0ed(0x1ba)](this,_0x3c7a3b),this[_0x15a0ed(0x16a)]();},Game_Map[_0xa66f72(0x118)][_0xa66f72(0x16a)]=function(){const _0x4f13df=_0xa66f72;this['_mapGameOverCommonEventID']=0x0;const _0x4eb5e6=VisuMZ[_0x4f13df(0x1fc)]['RegExp'],_0x43bb20=$dataMap?$dataMap[_0x4f13df(0x2cb)]||'':'';_0x43bb20[_0x4f13df(0x149)](_0x4eb5e6[_0x4f13df(0x21a)])&&(_0x4f13df(0x1cd)===_0x4f13df(0x1cd)?this[_0x4f13df(0x191)]=Number(RegExp['$1']):_0x406f23[_0x4f13df(0x27b)](_0x3ba773));},Game_Map[_0xa66f72(0x118)][_0xa66f72(0x2d7)]=function(){const _0x432541=_0xa66f72;if(this[_0x432541(0x191)]===undefined)this['setupGameOverCommonEvent']();return this[_0x432541(0x191)];},Game_Player['prototype'][_0xa66f72(0x2d7)]=function(){const _0x492fdf=_0xa66f72;if(BattleManager['isBattleTest']()){if('qxVaI'==='qxVaI')return 0x0;else{_0x42b698[_0x492fdf(0x227)](),_0x4f276e[_0x492fdf(0x227)]();const _0x153f6b=_0x1ad286[_0x492fdf(0x1e3)]||0x0;_0x153f6b>0x0&&_0x23ec90['setValue'](_0x153f6b,!![]);const _0x68c622=_0x35d310['varID']||0x0;_0x68c622>0x0&&_0xbddf3f[_0x492fdf(0x27f)](_0x68c622,this['_qteDuration']),this[_0x492fdf(0x17b)]();}}if($gameTroop&&$gameTroop['getGameOverCommonEventID']()){if(_0x492fdf(0x20c)!=='WVlid'){const _0x1becf9=_0x190f01[_0x492fdf(0x1fc)][_0x492fdf(0xc0)],_0x14a578=this[_0x492fdf(0x257)]()?this[_0x492fdf(0x257)]()['name']||'':'';if(_0x14a578[_0x492fdf(0x149)](_0x1becf9[_0x492fdf(0x21a)]))return _0xfac87(_0x5d7c89['$1']);return 0x0;}else return $gameTroop[_0x492fdf(0x2d7)]();}if($gameMap&&$gameMap['getGameOverCommonEventID']())return $gameMap[_0x492fdf(0x2d7)]();if($gameSystem&&$gameSystem[_0x492fdf(0x2d7)]()){if(_0x492fdf(0x2e4)==='MiMvv')return $gameSystem[_0x492fdf(0x2d7)]();else{this[_0x492fdf(0x2f2)]===_0x3a971a&&this[_0x492fdf(0x1d3)]();if(this[_0x492fdf(0x2f2)][_0x492fdf(0x196)](_0x1cb82c))return;this[_0x492fdf(0x2f2)][_0x492fdf(0x132)](_0x45f54a);}}return 0x0;},Game_Party[_0xa66f72(0x118)][_0xa66f72(0x21e)]=function(){const _0xac5486=_0xa66f72;if(!VisuMZ['QTE_TriggerSys']['Settings'][_0xac5486(0x122)][_0xac5486(0x278)])return;for(const _0x44839b of this[_0xac5486(0x272)]()){_0x44839b[_0xac5486(0x84)](0x1);}},Game_Troop[_0xa66f72(0x118)]['getGameOverCommonEventID']=function(){const _0xecb375=_0xa66f72,_0x5051a0=VisuMZ[_0xecb375(0x1fc)][_0xecb375(0xc0)],_0x8beac5=this[_0xecb375(0x257)]()?this[_0xecb375(0x257)]()[_0xecb375(0xb9)]||'':'';if(_0x8beac5['match'](_0x5051a0[_0xecb375(0x21a)])){if(_0xecb375(0x189)===_0xecb375(0x19a))_0x1a1893['playSe'](_0x37cea9);else return Number(RegExp['$1']);}return 0x0;},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x92)]=Game_Interpreter['prototype']['setupReservedCommonEvent'],Game_Interpreter[_0xa66f72(0x118)][_0xa66f72(0x283)]=function(){const _0x37f22f=_0xa66f72;if($gameSystem[_0x37f22f(0x143)]()){if(_0x37f22f(0x275)==='yUiLQ'){if(_0x8e5432!==''){const _0x5483a1=new _0x50068d(_0xd2c440);this[_0x37f22f(0xf6)][_0x3f7584['id']][_0x37f22f(0x132)](_0x5483a1),_0x3f9a18='';}_0x2b798a+=_0x408572[_0x37f22f(0x1c0)][0x0]+'\x0a';}else $gameSystem['processAllOnceParallels']();}return VisuMZ[_0x37f22f(0x1fc)][_0x37f22f(0x92)][_0x37f22f(0x1ba)](this);},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x252)]=Game_Interpreter[_0xa66f72(0x118)]['updateWaitMode'],Game_Interpreter[_0xa66f72(0x118)][_0xa66f72(0x299)]=function(){const _0x53c511=_0xa66f72;if(this['_waitMode'][_0x53c511(0x149)](/QTE/i)){if(SceneManager[_0x53c511(0x2e7)]())return!![];else{if(_0x53c511(0x2f1)===_0x53c511(0x2f1))this[_0x53c511(0x120)]='';else{const _0x174644=this['_qteSettings'][_0x53c511(0x127)],_0x3be3ac=_0x7be056[_0x53c511(0x17c)]();_0x4a92dc(_0x174644,_0x3be3ac?_0x3be3ac[_0x53c511(0x214)]:0x0);}}}return VisuMZ[_0x53c511(0x1fc)][_0x53c511(0x252)]['call'](this);},Scene_Base['prototype'][_0xa66f72(0x1de)]=function(_0x1ca956){const _0x5f4e4d=_0xa66f72,_0x221548=VisuMZ[_0x5f4e4d(0x1fc)][_0x5f4e4d(0x2b5)][_0x5f4e4d(0xda)],_0x1b3f88={};_0x1b3f88[_0x5f4e4d(0x232)]=_0x221548['MsgTextAlign']||_0x5f4e4d(0x19b),_0x1b3f88[_0x5f4e4d(0x2a7)]=_0x221548['MsgWindowRectJS'],_0x1b3f88[_0x5f4e4d(0x2ce)]=_0x221548[_0x5f4e4d(0x20e)]||0x0;switch(_0x1ca956){case _0x5f4e4d(0x150):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0x255)]||'';break;case _0x5f4e4d(0x2b1):_0x1b3f88['text']=_0x221548['ButtonSeqTextMsg']||'';break;case _0x5f4e4d(0x2a2):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0x176)]||'';break;case _0x5f4e4d(0x1b9):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0x141)]||'';break;case _0x5f4e4d(0x1bf):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0xd2)]||'';break;case _0x5f4e4d(0xc4):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548['MarcherTextMsg']||'';break;case _0x5f4e4d(0x133):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0x88)]||'';break;case _0x5f4e4d(0x18d):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0xdc)]||'';break;case _0x5f4e4d(0x172):_0x1b3f88['text']=_0x221548[_0x5f4e4d(0x2a6)]||'';break;case _0x5f4e4d(0xc9):_0x1b3f88[_0x5f4e4d(0x168)]=_0x221548[_0x5f4e4d(0x1a3)]||'';break;default:return;}this[_0x5f4e4d(0x109)](_0x1ca956,_0x1b3f88),this[_0x5f4e4d(0xa4)](_0x1ca956),this[_0x5f4e4d(0x2e1)](_0x1ca956),this[_0x5f4e4d(0x2e3)]();},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x109)]=function(_0x19eee7,_0x4475e5){const _0x588f2d=_0xa66f72;this['_qteSettings']=_0x4475e5;const _0x3fffac=_0x4475e5[_0x588f2d(0x2a7)]['call'](this);let _0x2954cf=null;switch(_0x19eee7){case _0x588f2d(0x150):case'directionStruggle':case _0x588f2d(0x1b9):case _0x588f2d(0x1bf):case _0x588f2d(0xc4):case _0x588f2d(0x133):case _0x588f2d(0x18d):if(_0x4475e5['text']==='')return;_0x2954cf=new Window_Help(_0x3fffac);break;case _0x588f2d(0x2b1):_0x2954cf=new Window_QTE_ButtonSequence(_0x3fffac);break;case _0x588f2d(0x172):_0x2954cf=new Window_QTE_TimedSequence(_0x3fffac);break;case'timingBar':_0x2954cf=new Window_QTE_TimingBar(_0x3fffac);break;default:return;}_0x2954cf[_0x588f2d(0x83)](_0x4475e5['bgType']),this[_0x588f2d(0xfb)](_0x2954cf),this[_0x588f2d(0x28b)]=_0x2954cf;},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x2e3)]=function(){const _0x31080b=_0xa66f72,_0x859a02=this[_0x31080b(0x267)];let _0x37ad5a=_0x859a02['text'];_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<UP BUTTON>/gi,TextManager[_0x31080b(0x19f)]('up')),_0x37ad5a=_0x37ad5a['replace'](/<DOWN BUTTON>/gi,TextManager[_0x31080b(0x19f)](_0x31080b(0x153))),_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<LEFT BUTTON>/gi,TextManager[_0x31080b(0x19f)](_0x31080b(0x1ae))),_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<RIGHT BUTTON>/gi,TextManager['getInputButtonString'](_0x31080b(0x11f))),_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<OK BUTTON>/gi,TextManager[_0x31080b(0x19f)]('ok')),_0x37ad5a=_0x37ad5a['replace'](/<CANCEL BUTTON>/gi,TextManager[_0x31080b(0x19f)](_0x31080b(0x154))),_0x37ad5a=_0x37ad5a['replace'](/<SHIFT BUTTON>/gi,TextManager['getInputButtonString']('shift')),_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<MENU BUTTON>/gi,TextManager[_0x31080b(0x19f)](_0x31080b(0x263))),_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<PAGE UP BUTTON>/gi,TextManager['getInputButtonString'](_0x31080b(0x166))),_0x37ad5a=_0x37ad5a[_0x31080b(0x1ef)](/<PAGE DOWN BUTTON>/gi,TextManager['getInputButtonString'](_0x31080b(0x23a))),this[_0x31080b(0x14d)]=Input[_0x31080b(0x221)]();Imported[_0x31080b(0x2a4)]&&(_0x37ad5a=_0x31080b(0x223)['format'](_0x859a02[_0x31080b(0x232)],_0x37ad5a));const _0xf8bd1f=this[_0x31080b(0x28b)];if(_0xf8bd1f)_0xf8bd1f[_0x31080b(0x29d)](_0x37ad5a);},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0xa4)]=function(_0x961d43){const _0x5c0227=_0xa66f72,_0x1c5290=VisuMZ[_0x5c0227(0x1fc)][_0x5c0227(0x2b5)]['QTE'];if(!_0x1c5290[_0x5c0227(0x1ee)])return;if([_0x5c0227(0x1bf),_0x5c0227(0x18d),_0x5c0227(0x172)][_0x5c0227(0x196)](_0x961d43))return;if(SceneManager['_qteWholeDuration']>=0xf4240)return;const _0x513849=_0x1c5290[_0x5c0227(0x192)][_0x5c0227(0x1ba)](this),_0x6abfd6=new Window_QTE_Timer(_0x513849);this['addChild'](_0x6abfd6),this[_0x5c0227(0x136)]=_0x6abfd6;},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x2e1)]=function(_0x15aaf7){const _0x29af29=_0xa66f72,_0x1f69db=VisuMZ[_0x29af29(0x1fc)][_0x29af29(0x2b5)]['QTE'];if(!_0x1f69db['ShowQteProgress']&&![_0x29af29(0x1bf)][_0x29af29(0x196)](_0x15aaf7))return;if(!SceneManager['_qteSettings'][_0x29af29(0x194)])return;const _0xb848ef=_0x1f69db['QteProgressWindowRectJS'][_0x29af29(0x1ba)](this),_0x2bad13=new Window_QTE_Progress(_0xb848ef);this[_0x29af29(0xfb)](_0x2bad13),this[_0x29af29(0x177)]=_0x2bad13;},Scene_Base[_0xa66f72(0x118)]['createTimedHitSpriteQTE']=function(){const _0x5c89b9=_0xa66f72,_0x389e19=new Sprite_QTE_TimedHit();this[_0x5c89b9(0xfb)](_0x389e19),this[_0x5c89b9(0x13e)]=_0x389e19;},VisuMZ[_0xa66f72(0x1fc)]['Scene_Base_update']=Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x182)],Scene_Base['prototype'][_0xa66f72(0x182)]=function(){const _0xe126d4=_0xa66f72;this[_0xe126d4(0x26e)](),VisuMZ['QTE_TriggerSys'][_0xe126d4(0x103)][_0xe126d4(0x1ba)](this),this[_0xe126d4(0x156)](),this['updateQteGaugeWindows']();},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x26e)]=function(){const _0x476215=_0xa66f72;if(!this[_0x476215(0x28b)])return;if(this['_lastQteInputType']!==Input[_0x476215(0x221)]()){if(_0x476215(0x246)===_0x476215(0x246))this[_0x476215(0x2e3)]();else{if(this[_0x476215(0x2ef)]===_0x2c2bbf)this[_0x476215(0x10b)]();this[_0x476215(0x2ef)]=_0x43e423;}}!SceneManager[_0x476215(0x2e7)]()&&this['removeQteWindow']();},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x101)]=function(){const _0x132fe7=_0xa66f72;if(!this['_qteWindow'])return;this[_0x132fe7(0x17f)](this[_0x132fe7(0x28b)]),this[_0x132fe7(0x28b)]=undefined;},Scene_Base[_0xa66f72(0x118)]['updateQteDuration']=function(){const _0x5f2382=_0xa66f72;if(!SceneManager[_0x5f2382(0x2e7)]())return;SceneManager[_0x5f2382(0x26d)]();},Scene_Base[_0xa66f72(0x118)][_0xa66f72(0x229)]=function(){const _0x4a3c37=_0xa66f72;if(SceneManager[_0x4a3c37(0x2e7)]())return;this[_0x4a3c37(0x136)]&&(this[_0x4a3c37(0x17f)](this['_qteTimerWindow']),this[_0x4a3c37(0x136)]=undefined),this['_qteProgressWindow']&&(_0x4a3c37(0xa2)===_0x4a3c37(0x9b)?this[_0x4a3c37(0x10f)]--:(this[_0x4a3c37(0x17f)](this[_0x4a3c37(0x177)]),this['_qteProgressWindow']=undefined)),this[_0x4a3c37(0x13e)]&&(this[_0x4a3c37(0x13e)][_0x4a3c37(0x198)](),this[_0x4a3c37(0x13e)]=undefined);},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x2a0)]=Scene_Map[_0xa66f72(0x118)]['start'],Scene_Map['prototype'][_0xa66f72(0x228)]=function(){const _0x5353ff=_0xa66f72;VisuMZ[_0x5353ff(0x1fc)][_0x5353ff(0x2a0)][_0x5353ff(0x1ba)](this);if($gameTroop)$gameTroop[_0x5353ff(0x227)]();},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0x2f0)]=Scene_Map['prototype']['needsFadeIn'],Scene_Map[_0xa66f72(0x118)][_0xa66f72(0x2b0)]=function(){const _0xb09454=_0xa66f72;return VisuMZ[_0xb09454(0x1fc)][_0xb09454(0x2f0)]['call'](this)||SceneManager[_0xb09454(0x21c)](Scene_Gameover);},VisuMZ['QTE_TriggerSys'][_0xa66f72(0x2a9)]=Scene_Gameover[_0xa66f72(0x118)][_0xa66f72(0x1f3)],Scene_Gameover[_0xa66f72(0x118)]['create']=function(){const _0x2c7ce1=_0xa66f72;if(this[_0x2c7ce1(0x152)]())return;VisuMZ['QTE_TriggerSys'][_0x2c7ce1(0x2a9)][_0x2c7ce1(0x1ba)](this);},VisuMZ['QTE_TriggerSys'][_0xa66f72(0x123)]=Scene_Gameover[_0xa66f72(0x118)][_0xa66f72(0x228)],Scene_Gameover[_0xa66f72(0x118)]['start']=function(){const _0x33682a=_0xa66f72;if(this[_0x33682a(0x152)]())_0x33682a(0xf2)!==_0x33682a(0x28a)?this[_0x33682a(0xf3)]():(_0x377aa3[_0x33682a(0x118)][_0x33682a(0x7f)][_0x33682a(0x1ba)](this,_0xfd255a),this[_0x33682a(0x193)](),this[_0x33682a(0x2bc)]());else{if(_0x33682a(0x1b2)!==_0x33682a(0x158))VisuMZ[_0x33682a(0x1fc)][_0x33682a(0x123)][_0x33682a(0x1ba)](this);else{const _0x3a6519=new _0x5d4f9f(0x0,0x0,0x12c,_0x1bcd60[_0x33682a(0x118)][_0x33682a(0x2d8)]());_0x3a6519[_0x33682a(0x18f)]+=_0x326a39['windowPadding']()*0x2,_0x3a6519[_0x33682a(0x289)]+=_0x4cc312[_0x33682a(0x157)]()*0x2,this[_0x33682a(0x1af)]=new _0x3590c5(_0x3a6519);}}},Scene_Gameover[_0xa66f72(0x118)][_0xa66f72(0x152)]=function(){return $gamePlayer&&$gamePlayer['getGameOverCommonEventID']()>0x0;},Scene_Gameover[_0xa66f72(0x118)][_0xa66f72(0xf3)]=function(){const _0x764c9d=_0xa66f72;Scene_Base[_0x764c9d(0x118)][_0x764c9d(0x228)]['call'](this);$gameParty&&$gameParty[_0x764c9d(0x21e)]();$gameMap&&(_0x764c9d(0x87)!==_0x764c9d(0x87)?_0x58a9b3[_0x764c9d(0x1fc)][_0x764c9d(0x123)]['call'](this):$gameMap[_0x764c9d(0x2c1)][_0x764c9d(0x227)]());SceneManager[_0x764c9d(0x258)](Scene_Map);const _0x5cdef9=$gamePlayer['getGameOverCommonEventID']();$gameTemp[_0x764c9d(0x27a)](_0x5cdef9),$gameTroop&&$gameTroop[_0x764c9d(0x227)](),VisuMZ[_0x764c9d(0x1fc)]['Settings'][_0x764c9d(0x122)][_0x764c9d(0x1d7)]&&$gameSystem['setGameOverCommonEventID'](0x0);};function _0x1338(){const _0x4ec12e=['_jsCommonEvents','qteProgressGaugeStyleType','Game_Party_gainItem','clamp','SwitchID','_qteEarlyFinishDuration','numItems','progress','iPINd','left','_dummyWindow','ARRAYJSON','DbBMq','JNkwx','iKggH','reserveOnceParallel','releaseSound','VZzUR','isTriggered','QteProgressColor2','fillGauge','call','updateOverlayScale','randomInt','ARRAYNUM','GARqp','holdRelease','parameters','Game_Variables_setValue','ToggleRequirement','TimedSeqSuccessFrames','createTimedHitSpriteQTE','HIoSp','missCommonEventID','hitSound','FidSZ','wymWh','jyKHd','hMFov','SceneManager_updateFrameCount','PEuaD','AreaColor1','init_QTE_TriggerSys','isEarlyFinishQTE','shuffle','shift','init_QTE_TriggerSysReservations','zones','oJowh','createBitmap','ClearOnEvent','init_QTE_TriggerSysPromise','addQTE_TriggerSysPromiseToSet','VisuMZ_1_EventsMoveCore\x20needs\x20to\x20be\x20updated\x20','xOcZt','gainItem','value','setupMessageForQTE','checkPlayingQTE','jsCAs','abs','updateDirectionStruggleQTE','switchID','8507754TYaBwm','isActiveChainSkillsUiVisible','buttonProgress','PromiseVariable','_qteInputDelay','updateEarlyFinish','CIShh','Actor-%1-%2','setWaitMode','OnSwitch','ShowQteTimer','replace','escape','pGRWD','WatchDelay','create','QteTimingBarWidth','setGameOverCommonEventID','registerCommonEvents','stringify','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','clone','cHcpb','Sound','QTE_TriggerSys','WWcFo','NUM','HitCommonEventID','_sequenceSprites','3XUNqcK','missSound','OnChange','_labelMode','okoGI','_data','sort','createJsFunctionsForCommonEvent','refreshBitmap','normalColor','ZNKHa','WVlid','AKVGF','MsgWindowBgType','QTE_ButtonSequenceNormal','nmbnM','RnfGg','>>>ATTENTION<<<','return\x200','_eventId','xCgfR','setFrame','log','_lastGoal','PromiseSwitch','gameOverCommonEvent','HoldCommonEventRun','isPreviousScene','isTriggerWatchedSwitch','gameOverCommonEventHeal','vxJDu','join','getLastUsedGamepadType','items','<%1>%2','updateButtonMashQTE','inputStartDelay','commonEventID','clear','start','updateQteGaugeWindows','pqwSJ','Weapon-%1-%2','VcZeS','UCGdo','clearWatchedTrigger','dir4','scale','ZehbU','align','_watchedJsSwitches','zUifK','getColor','loadSystem','_watchedJsVariables','isAnyTriggered','textSizeEx','pagedown','gaugeStyle','updatePosition','round','iconWidth','unshift','nSmnF','playBuzzer','overloadSound','PromiseArmor','looZQ','wholeDuration','fmzVJ','registerVariables','CPHIK','sound','zQtxM','ReleaseCommonEventID','getTypeQTE','sequence','GetGaugeHeight','TimingBarLabelOffsetY','createKeyJS','map','Game_Interpreter_updateWaitMode','refresh','End','ButtonMashTextMsg','direction','troop','goto','2012130bIaXva','armors','StruggleRequirement','fontSize','QdXru','isActive','_text','createTimingBarSprite','MissSound','FKGQl','menu','zhOeH','Cannot\x20run\x20QTE\x20during\x20Evolution\x20Matrix\x20Skills.','PromiseWeapon','_qteSettings','1359610DnPmZs','ySpqg','sTlLs','ExtMessageFunc','QEplp','updateQTEDuration','updateQteWindow','TimedHitSuccessFrames','_landingPositionY','WaitForQTE','deadMembers','_baseY','TymUG','QIsQA','destroyContents','_leeway','HealOnEvent','_stopOverlay','reserveCommonEvent','playSe','CursorSpeed','hGfhQ','_afterQteSessionDelay','setValue','56MdLJnL','isRepeated','_landingSprite','setupReservedCommonEvent','iconHeight','_triggerSwitches','ULOcs','fZsFy','parse','height','QSqmF','_qteWindow','_qteType','jdGTB','registerCommand','QTE_TimingBar','changePaintOpacity','SOeSa','CommonEventID_PageUp','_evoMatrixSkillMode','PlaytestInput','SceneManager_initialize','aqhOV','oIRrb','SKFIi','updateWaitMode','getCursorPosition','min','remove','setText','checkWatchedTriggers','exit','Scene_Map_start','split','directionStruggle','gaugeColor1','VisuMZ_1_MessageCore','dqnyH','TimedSeqTextMsg','rectJS','_watchedPromises','Scene_Gameover_create','cjXgF','processItemTrigger','2166924qwRRHh','refreshDrawSpecialData','getQTE_TriggerSysPromises','UloGB','needsFadeIn','buttonSequence','EVAL','updateFrameCount','_latestButton','Settings','TimedHitOpacity','_triggerPromises','triggerProcessed','gaugeColor2','VisuMZ_3_ActiveChainSkills','ARRAYSTR','createSequenceSprites','parent','createOverlaySprite','NDDHQ','isAdvancedSwitch','_interpreter','clear_QTE_Settings','cursorSpeed','djLXT','defineCommonEventType','VbrSZ','QTE_ButtonMash','_duration','drawGauge','switches','note','checkEarlyFinishQTE','_speed','bgType','VisuMZ_3_EvoMatrixSkills','1434321omdNcR','floor','vPSUk','126645CYJbTj','LandingIcon','needsRefresh','aCTJJ','getGameOverCommonEventID','lineHeight','_logWindow','Zones','processJavaScriptFuncs','gaugeCurrentValue','constructor','xyrlr','Class-%1-%2','fulfillOnTriggerPromises','createGaugeProgressWindowForQTE','JnqXn','updateQteWindowText','MiMvv','updateSwapperQTE','lCVsV','isPlayingQTE','HiZnO','SGteG','VisuMZ_2_ExtMessageFunc\x20needs\x20to\x20be\x20updated\x20','TimingBarLabelOffsetX','opacity','gaugeMaxValue','TimedSequenceLandPosition','_gameOverCommonEventID','Scene_Map_needsFadeIn','fqgSI','_onceParallelQueue','reverse','DefaultGameOverEvent','updateTimedHitQTE','EarlyFinishDuration','vXZem','HoldCommonEventID','isAdvancedVariable','initialize','KQrtv','OnVariable','QteTimerColor2','setBackgroundType','setHp','CommonEventIDs','_maxValueSegment','Tnebx','SwapperTextMsg','max','FUNC','updateButtonSequenceQTE','CsjnI','cZJNU','pop','isTriggerWatchedVariable','status','okCommonEventID','Game_Interpreter_setupReservedCommonEvent','OverloadSound','hRMYU','ConvertParams','Oazdj','_direction','isWeapon','cursorIcon','VariableID','GThIj','_stopCursor','fontFace','contentsOpacity','_cache_onChangeCommonEventTrigger','remainingSequence','YyoLf','ILdBL','16GABIBY','createGaugeTimerWindowForQTE','setupQTE','Shuffle','QTE','_triggerVariables','QTE_TimedHit','random','drawTextEx','initMembers','isArmor','_baseX','isPressed','vqzZC','xDPjF','hitCommonEventID','getOnChangeCommonEventTriggers','Cannot\x20run\x20QTE\x20during\x20Active\x20Chain\x20Skills.','PromiseItem','Buttons','TimingBarColor1','version','name','filter','jKWsF','XZaxN','OdnDy','updateTimedSequenceQTE','_lastProgress','RegExp','ZujKA','yxVpi','format','marcher','QTE_Marcher','pointY','QTE_Clear','EventsMoveCore','timingBar','description','cancelCommonEventID','_lastDuration','Points','trim','Scene_Boot_onDatabaseLoaded','TOlaU','Button','HoldReleaseTextMsg','TimingBarFontSize','picture','icon','setup','gradientFillRect','numberFontFace','kCdbd','Vocab','InputStartDelay','TimedHitTextMsg','IgQhq','reduce','dTBik','code','cacheData','Armor-%1-%2','_finishing','zKqeY','SequenceLength','TimingBarColor2','pointX','drawBaseGauge','eITvg','ceil','VisuMZ_2_ExtMessageFunc','duration','updateFrame','resetFontSettings','BJuVM','VisuMZ_0_CoreEngine','TimedHitPicture','ZhhdQ','processGameOverEvent','hasOnChangeCommonEventTrigger','ShuffleArray','_jsFuncs','CommonEventID_PageDown','stopCursor','drawVisualStyleGauge','_overlaySprite','addChild','QTE_Swapper','mUJJo','_lastWholeDuration','pageUpCommonEventID','updateInputData','removeQteWindow','_position','Scene_Base_update','_scene','Duration','VisuMZ_3_VisualGaugeStyles','updateHoldReleaseQTE','AmkFU','createMessageWindowForQTE','ZPLgl','initGameOverEventSettings','PyIhj','AbPgD','bitmap','_qteDuration','_iconIndex','MaxDuration','gaugeBackColor','loadPicture','buttons','control','isRollingDice','createDummyWindow','prototype','Game_Map_setup','JMGrB','qteTimerGaugeStyleType','oJgGv','parseCommonEventNotetags','axYDD','right','_waitMode','getWatchedTriggerPromises','GameOver','Scene_Gameover_start','anchor','DposQ','_qteLastInput','OverloadCommonEventID','updateQTEInputs','Timing','movePosition','GameOverCommonEventSetup','variables','processVariableTrigger','isPlaytest','QteProgressColor1','ienfq','ARRAYEVAL','push','swapper','VisualGaugeStyles','MissCommonEventID','_qteTimerWindow','GAmTS','weapons','QTE_ButtonSequenceRandom','updateTimingBarQTE','Only\x20one\x20QTE\x20can\x20be\x20running\x20at\x20a\x20time.','5833920kktiKT','bNKfu','_qteTimedHitSprite','Cannot\x20start\x20QTE\x20during\x20a\x20dice\x20roll.','sqbfA','FillGaugeTextMsg','qNAgc','isOnceParallelReserved','destroy','CTAlJ','Zwxxv','LVWhh','_qteInputBuffer','match','TimedHitMaxSize','type','IsIOW','_lastQteInputType','JKqZl','QTE_TimedSequence','buttonMash','_normalCommonEvents','hasGameOverEvent','down','cancel','jfVCv','updateQteDuration','windowPadding','wXlif','CheckCompatibility','vwKZX','dataID','updateMarcherQTE','Game_Switches_setValue','OKAuo','fulfillOnTriggerPromisesItem','VisuMZ_0_CoreEngine\x20needs\x20to\x20be\x20updated\x20','tAHDg','mainFontSize','InputSequence','drawHitZones','hasOnTriggerPromiseItem','pageup','padding','text','canUpdate','setupGameOverCommonEvent','ApKkW','_pressedTime','in\x20order\x20for\x20VisuMZ_2_QTE_TriggerSys\x20to\x20work.','_landingPositionX','TimingBarCursorOffsetY','updateFillGaugeQTE','IconSet','timedSequence','Enemy-%1-%2','DtLYa','AiwXe','DirectionStruggleTextMsg','_qteProgressWindow','gbBZm','onChangeTrigger','QteTimerColor1','finishEarlyQTE','getLastPluginCommandInterpreter','CommonEventID_Cancel','length','removeChild','Direction','CommonEventID','update','registerSwitches','varID','Start','_qteWholeDuration','FbUyK','TimingBarCursorOffsetX','dBVyE','onDatabaseLoaded','HitSound','Game_System_initialize','timedHit','_qteCursorSprite','width','UtUtw','_mapGameOverCommonEventID','QteTimerWindowRectJS','createLandingIconSprite','goal','processCommonEvent','includes','hasOnTriggerPromise','startFinishing','AZkwK','lAXhH','center','innerWidth','isItem','ITJPq','getInputButtonString','CommonEventID_Ok','PdDgb','psatp','TimingBarTextMsg','contents'];_0x1338=function(){return _0x4ec12e;};return _0x1338();}function Sprite_QTE_TimedHit(){const _0x75ea36=_0xa66f72;this[_0x75ea36(0x7f)](...arguments);}Sprite_QTE_TimedHit[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Sprite[_0xa66f72(0x118)]),Sprite_QTE_TimedHit['prototype'][_0xa66f72(0x2dd)]=Sprite_QTE_TimedHit,Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(){const _0x481c10=_0xa66f72;Sprite[_0x481c10(0x118)][_0x481c10(0x7f)][_0x481c10(0x1ba)](this),this[_0x481c10(0xac)](),this['createBitmap'](),this[_0x481c10(0x2be)]();},Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0xac)]=function(){const _0x31b0de=_0xa66f72;this[_0x31b0de(0x124)]['x']=0.5,this['anchor']['y']=0.5;const _0x24e2a6=SceneManager[_0x31b0de(0x267)];this['x']=_0x24e2a6[_0x31b0de(0xe7)],this['y']=_0x24e2a6['pointY'],this[_0x31b0de(0x2c8)]=_0x24e2a6['duration']||0x1,this['_wholeDuration']=_0x24e2a6[_0x31b0de(0x245)]||0x1;},Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0x1d6)]=function(){const _0x47730f=_0xa66f72,_0x1dde1d=SceneManager[_0x47730f(0x267)];this[_0x47730f(0x10e)]=ImageManager['loadPicture'](_0x1dde1d['picture']);},Sprite_QTE_TimedHit[_0xa66f72(0x118)]['createOverlaySprite']=function(){const _0x2d8567=_0xa66f72,_0x236c49=VisuMZ[_0x2d8567(0x1fc)]['Settings'][_0x2d8567(0xa7)],_0x32fe59=new Sprite(),_0x270082=SceneManager[_0x2d8567(0x267)][_0x2d8567(0xd4)];_0x32fe59[_0x2d8567(0x10e)]=ImageManager[_0x2d8567(0x113)](_0x270082),_0x32fe59[_0x2d8567(0x2ec)]=_0x236c49[_0x2d8567(0x2b6)]??0x80,_0x32fe59[_0x2d8567(0x124)]['x']=0.5,_0x32fe59['anchor']['y']=0.5,_0x32fe59[_0x2d8567(0x230)]['x']=_0x236c49[_0x2d8567(0x14a)]??0x4,_0x32fe59[_0x2d8567(0x230)]['y']=_0x236c49[_0x2d8567(0x14a)]??0x4,this[_0x2d8567(0xfb)](_0x32fe59),this[_0x2d8567(0xfa)]=_0x32fe59;},Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0x182)]=function(){const _0x4a14cf=_0xa66f72;Sprite['prototype']['update'][_0x4a14cf(0x1ba)](this);if(this[_0x4a14cf(0x169)]())this['updateOverlayScale'](),this[_0x4a14cf(0x2cc)]();else(SceneManager['isEarlyFinishQTE']()||this['_finishing'])&&this[_0x4a14cf(0x1e9)]();},Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0x169)]=function(){const _0x167d5a=_0xa66f72;if(!this[_0x167d5a(0x2bd)])return![];if(SceneManager[_0x167d5a(0x1e8)]>0x0)return![];if(this[_0x167d5a(0x279)])return![];return!![];},Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0x1bb)]=function(){const _0x24b569=_0xa66f72;if(this[_0x24b569(0x2c8)]<=0x0)return;const _0x38f91f=this[_0x24b569(0xfa)],_0xc09339=this[_0x24b569(0x2c8)];_0x38f91f[_0x24b569(0x230)]['x']=(_0x38f91f['scale']['x']*(_0xc09339-0x1)+0x1)/_0xc09339,_0x38f91f['scale']['y']=(_0x38f91f[_0x24b569(0x230)]['y']*(_0xc09339-0x1)+0x1)/_0xc09339,this[_0x24b569(0x2c8)]--,this[_0x24b569(0x2c8)]<=0x0&&(_0x38f91f['opacity']=0x0,_0x38f91f[_0x24b569(0x230)]['x']=0x1,_0x38f91f[_0x24b569(0x230)]['y']=0x1);},Sprite_QTE_TimedHit['prototype']['checkEarlyFinishQTE']=function(){if(!SceneManager['isEarlyFinishQTE']())return;this['_stopOverlay']=!![];},Sprite_QTE_TimedHit[_0xa66f72(0x118)][_0xa66f72(0x1e9)]=function(){const _0x1de906=_0xa66f72,_0x5cd573=VisuMZ['QTE_TriggerSys'][_0x1de906(0x2b5)][_0x1de906(0xa7)],_0x277553=Math[_0x1de906(0xea)](_0x5cd573[_0x1de906(0x7b)]/0x2),_0x4698bd=Math[_0x1de906(0xea)](0xff/_0x277553);this[_0x1de906(0x2ec)]-=_0x4698bd;if(this[_0x1de906(0x2ec)]<=0x0&&this[_0x1de906(0x2bd)]){if(_0x1de906(0x8d)!==_0x1de906(0xc1))this[_0x1de906(0x2bd)][_0x1de906(0x17f)](this);else{if(!this[_0x1de906(0x2bd)])return![];if(_0x6eef92[_0x1de906(0x1e8)]>0x0)return![];if(this[_0x1de906(0x9c)])return![];return!![];}}},Sprite_QTE_TimedHit['prototype'][_0xa66f72(0x198)]=function(){const _0x206478=_0xa66f72;this[_0x206478(0x279)]=!![],this['_finishing']=!![];};function Sprite_QTE_TimedSequence(){const _0x25aa3f=_0xa66f72;this[_0x25aa3f(0x7f)](...arguments);}Sprite_QTE_TimedSequence[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Sprite[_0xa66f72(0x118)]),Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x2dd)]=Sprite_QTE_TimedSequence,Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(_0x274275){const _0x1db56f=_0xa66f72;Sprite['prototype'][_0x1db56f(0x7f)][_0x1db56f(0x1ba)](this),this[_0x1db56f(0x206)]=_0x274275,this[_0x1db56f(0xac)](),this[_0x1db56f(0x117)](),this['refreshBitmap']();},Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0xac)]=function(){const _0xce0061=_0xa66f72;this['anchor']['x']=0.5,this['anchor']['y']=0.5,this[_0xce0061(0x102)]=this[_0xce0061(0x206)][_0xce0061(0x129)]||0x1,this[_0xce0061(0x97)]=SceneManager[_0xce0061(0x267)][_0xce0061(0x256)]||_0xce0061(0x1ae),this['x']=this[_0xce0061(0x206)][_0xce0061(0xae)]+(this[_0xce0061(0x97)]===_0xce0061(0x1ae)?this[_0xce0061(0x102)]:-this[_0xce0061(0x102)]),this['y']=this[_0xce0061(0x206)]['_baseY'],this['_lastQteInputType']=Input[_0xce0061(0x221)](),this[_0xce0061(0x277)]=$gameParty['inBattle']()?0x0:-0x2;},Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x117)]=function(){const _0x288eac=_0xa66f72,_0x25b3ca=new Rectangle(0x0,0x0,0x12c,Window_Base['prototype'][_0x288eac(0x2d8)]());_0x25b3ca['width']+=$gameSystem['windowPadding']()*0x2,_0x25b3ca[_0x288eac(0x289)]+=$gameSystem[_0x288eac(0x157)]()*0x2,this[_0x288eac(0x1af)]=new Window_Base(_0x25b3ca);},Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x209)]=function(){const _0x3bca42=_0xa66f72;this[_0x3bca42(0x14d)]=Input[_0x3bca42(0x221)]();const _0x380236=this[_0x3bca42(0x206)][_0x3bca42(0xd1)]||'ok',_0x204ce2=TextManager[_0x3bca42(0x19f)](_0x380236),_0x38430e=this[_0x3bca42(0x1af)][_0x3bca42(0x239)](_0x204ce2)[_0x3bca42(0x18f)],_0x3b890e=Math[_0x3bca42(0x2d1)]((this[_0x3bca42(0x1af)]['innerWidth']-_0x38430e)/0x2);this[_0x3bca42(0x1af)]['contents'][_0x3bca42(0x227)](),this['_dummyWindow'][_0x3bca42(0xab)](_0x204ce2,_0x3b890e,0x0),this[_0x3bca42(0x10e)]=this[_0x3bca42(0x1af)]['contents'];},Sprite_QTE_TimedSequence[_0xa66f72(0x118)]['needsRefresh']=function(){const _0x4b3997=_0xa66f72;return this[_0x4b3997(0x14d)]!==Input['getLastUsedGamepadType']();},Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x182)]=function(){const _0xf00d55=_0xa66f72;Sprite[_0xf00d55(0x118)]['update'][_0xf00d55(0x1ba)](this);if(this[_0xf00d55(0x2d5)]())this[_0xf00d55(0x209)]();if(this[_0xf00d55(0x169)]())this['updatePosition']();else(SceneManager[_0xf00d55(0x1d0)]()||this[_0xf00d55(0xe3)])&&this[_0xf00d55(0x1e9)]();},Sprite_QTE_TimedSequence[_0xa66f72(0x118)]['canUpdate']=function(){const _0x136ed8=_0xa66f72;if(!this[_0x136ed8(0x2bd)])return![];if(SceneManager[_0x136ed8(0x1e8)]>0x0)return![];if(this[_0x136ed8(0x279)])return![];return!![];},Sprite_QTE_TimedSequence[_0xa66f72(0x118)]['updatePosition']=function(){const _0xc2a1b5=_0xa66f72,_0xc6c2eb=this['_leeway'];if(this[_0xc2a1b5(0x102)]<=_0xc6c2eb)return;const _0x161402=Math[_0xc2a1b5(0x89)](0x0,this[_0xc2a1b5(0x102)]);this['x']=this['_data'][_0xc2a1b5(0xae)]+(this['_direction']===_0xc2a1b5(0x1ae)?_0x161402:-_0x161402),this[_0xc2a1b5(0x102)]--,this[_0xc2a1b5(0x102)]<=this[_0xc2a1b5(0x277)]&&this[_0xc2a1b5(0x198)]();},Sprite_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x1e9)]=function(){const _0xaf139=_0xa66f72,_0x34bd5c=VisuMZ[_0xaf139(0x1fc)][_0xaf139(0x2b5)][_0xaf139(0xa7)],_0x131369=Math['ceil'](_0x34bd5c[_0xaf139(0x7b)]/0x2),_0x4bfa1a=Math['ceil'](0xff/_0x131369);this[_0xaf139(0x2ec)]-=_0x4bfa1a,this['opacity']<=0x0&&this[_0xaf139(0x2bd)]&&this[_0xaf139(0x2bd)][_0xaf139(0x17f)](this);},Sprite_QTE_TimedSequence['prototype'][_0xa66f72(0x198)]=function(){const _0x1ef01a=_0xa66f72;this[_0x1ef01a(0x279)]=!![],this[_0x1ef01a(0xe3)]=!![];const _0x45b218=SceneManager['_qteSettings'],_0x4727cc=_0x45b218[_0x1ef01a(0xa0)],_0x57d3e0=_0x4727cc['find'](_0x22bd1b=>_0x22bd1b['Timing']===this[_0x1ef01a(0x206)][_0x1ef01a(0x129)]&&_0x22bd1b['Button']===this[_0x1ef01a(0x206)][_0x1ef01a(0xd1)]);if(_0x57d3e0){_0x4727cc[_0x1ef01a(0x29c)](_0x57d3e0);const _0x201929=_0x45b218[_0x1ef01a(0x202)];_0x201929&&_0x201929[_0x1ef01a(0xb9)]&&AudioManager[_0x1ef01a(0x27b)](_0x201929);const _0x273cd2=_0x45b218['missCommonEventID']||0x0;if(_0x273cd2>0x0){const _0x332cb0=$gameTemp[_0x1ef01a(0x17c)]();$onceParallel(_0x273cd2,_0x332cb0?_0x332cb0[_0x1ef01a(0x214)]:0x0);}}};function Sprite_QTE_TimingBarCursor(){const _0x2bbba0=_0xa66f72;this[_0x2bbba0(0x7f)](...arguments);}Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)]=Object['create'](Sprite[_0xa66f72(0x118)]),Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)]['constructor']=Sprite_QTE_TimingBarCursor,Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(){const _0x25aab9=_0xa66f72;Sprite[_0x25aab9(0x118)][_0x25aab9(0x7f)][_0x25aab9(0x1ba)](this),this[_0x25aab9(0xac)](),this['createBitmap'](),this[_0x25aab9(0x2ec)]=0x0;},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0xac)]=function(){const _0x5bb295=_0xa66f72;this[_0x5bb295(0x124)]['x']=0.5,this[_0x5bb295(0x124)]['y']=0x1,this[_0x5bb295(0x2cd)]=SceneManager['_qteSettings']['cursorSpeed']||0x1,this['_position']=0x0,this['_direction']=0x1;},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0x1d6)]=function(){const _0x1cd4bd=_0xa66f72;this['bitmap']=ImageManager[_0x1cd4bd(0x236)](_0x1cd4bd(0x171)),this[_0x1cd4bd(0x110)]=SceneManager[_0x1cd4bd(0x267)][_0x1cd4bd(0x99)]||0x0,this[_0x1cd4bd(0xed)]();},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)]['updateFrame']=function(){const _0x4fbd11=_0xa66f72,_0x480a92=ImageManager[_0x4fbd11(0x23e)],_0x516693=ImageManager[_0x4fbd11(0x284)],_0x22d28e=this[_0x4fbd11(0x110)]%0x10*_0x480a92,_0x1fb92a=Math[_0x4fbd11(0x2d1)](this['_iconIndex']/0x10)*_0x516693;this[_0x4fbd11(0x216)](_0x22d28e,_0x1fb92a,_0x480a92,_0x516693);},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0x182)]=function(){const _0x3271fd=_0xa66f72;Sprite[_0x3271fd(0x118)]['update'][_0x3271fd(0x1ba)](this);if(!this['canUpdate']())return;this['opacity']=0xff,this[_0x3271fd(0x12a)](),this[_0x3271fd(0x23c)]();},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0x169)]=function(){const _0x2942b8=_0xa66f72;if(!this[_0x2942b8(0x2bd)])return![];if(SceneManager[_0x2942b8(0x1e8)]>0x0)return![];if(this[_0x2942b8(0x9c)])return![];return!![];},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0x12a)]=function(){const _0x3625d0=_0xa66f72,_0x1a8ff6=VisuMZ[_0x3625d0(0x1fc)]['Settings']['QTE'],_0x50aab8=_0x1a8ff6[_0x3625d0(0x1f4)]||0x64;this['_position']+=this[_0x3625d0(0x2cd)]*this[_0x3625d0(0x97)];if(this[_0x3625d0(0x102)]<0x0)this['_position']=0x0,this['_direction']=0x1;else{if(this['_position']>_0x50aab8){if(_0x3625d0(0x94)!==_0x3625d0(0x94)){const _0x212177=_0x1fec17[_0x3625d0(0x1fc)]['Settings'][_0x3625d0(0xa7)];return _0x212177[_0x3625d0(0x1a6)];}else this[_0x3625d0(0x102)]=_0x50aab8,this['_direction']=-0x1;}}},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)]['updatePosition']=function(){const _0x529462=_0xa66f72,_0x172c08=VisuMZ['QTE_TriggerSys']['Settings'][_0x529462(0xa7)],_0x84723f=_0x172c08[_0x529462(0x1f4)]||0x64,_0x50001d=0xc,_0x2d7530=Math[_0x529462(0x2d1)]((this[_0x529462(0x2bd)]['innerWidth']-_0x84723f)/0x2)+this[_0x529462(0x2bd)][_0x529462(0x167)],_0x1f7a24=this[_0x529462(0x2bd)][_0x529462(0x2d8)]()-_0x50001d-0x2+this[_0x529462(0x2bd)][_0x529462(0x167)],_0x4db6e3=_0x172c08['TimingBarCursorOffsetX']||0x0,_0x351d47=_0x172c08['TimingBarCursorOffsetY']||0x0;this['x']=_0x2d7530+this['_position']+_0x4db6e3,this['y']=_0x1f7a24+_0x351d47;},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0xf8)]=function(){const _0x12ec64=_0xa66f72;this[_0x12ec64(0x9c)]=!![];},Sprite_QTE_TimingBarCursor[_0xa66f72(0x118)][_0xa66f72(0x29a)]=function(){const _0x1933c7=_0xa66f72,_0x233e6f=VisuMZ[_0x1933c7(0x1fc)][_0x1933c7(0x2b5)][_0x1933c7(0xa7)],_0x32fbd4=_0x233e6f[_0x1933c7(0x1f4)]||0x64,_0x1b65bd=Math[_0x1933c7(0x23d)](this['_position']/_0x32fbd4*0x64);return _0x1b65bd;};function Window_QTE_GaugeBase(){const _0x3d05ef=_0xa66f72;this[_0x3d05ef(0x7f)](...arguments);}Window_QTE_GaugeBase[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Window_Base[_0xa66f72(0x118)]),Window_QTE_GaugeBase['prototype'][_0xa66f72(0x2dd)]=Window_QTE_GaugeBase,Window_QTE_GaugeBase[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(_0x3a09d1){const _0xe84470=_0xa66f72;this['cacheData'](),Window_Base[_0xe84470(0x118)][_0xe84470(0x7f)][_0xe84470(0x1ba)](this,_0x3a09d1),this[_0xe84470(0x83)](0x2),this[_0xe84470(0x253)]();},Window_QTE_GaugeBase[_0xa66f72(0x118)]['cacheData']=function(){},Window_QTE_GaugeBase[_0xa66f72(0x118)][_0xa66f72(0x182)]=function(){const _0x51dca0=_0xa66f72;Window_Base[_0x51dca0(0x118)][_0x51dca0(0x182)][_0x51dca0(0x1ba)](this),this['needsRefresh']()&&(this['cacheData'](),this[_0x51dca0(0x253)]()),this['updateEarlyFinish']();},Window_QTE_GaugeBase[_0xa66f72(0x118)][_0xa66f72(0x2d5)]=function(){return![];},Window_QTE_GaugeBase['prototype'][_0xa66f72(0x2a3)]=function(){const _0x531509=_0xa66f72;return ColorManager[_0x531509(0x20a)]();},Window_QTE_GaugeBase[_0xa66f72(0x118)]['gaugeColor2']=function(){return ColorManager['systemColor']();},Window_QTE_GaugeBase[_0xa66f72(0x118)][_0xa66f72(0x23b)]=function(){return'normal';},Window_QTE_GaugeBase['prototype'][_0xa66f72(0x2dc)]=function(){return 0x0;},Window_QTE_GaugeBase['prototype'][_0xa66f72(0x2ed)]=function(){return 0x1;},Window_QTE_GaugeBase[_0xa66f72(0x118)]['refresh']=function(){const _0x2914cd=_0xa66f72;this[_0x2914cd(0x1a4)]['clear']();const _0x165fd3=this[_0x2914cd(0x2a3)](),_0x1fac06=this[_0x2914cd(0x2b9)](),_0xb2212c=this[_0x2914cd(0x23b)](),_0x3b6102=this[_0x2914cd(0x19c)],_0x4c7ac6=0x0,_0x59ce95=0x0,_0x177d30=this[_0x2914cd(0x2dc)](),_0x282546=this[_0x2914cd(0x2ed)](),_0x4f1e1c=(_0x177d30/_0x282546)['clamp'](0x0,0x1);if(Imported[_0x2914cd(0x106)]){const _0x3df48=(VisuMZ[_0x2914cd(0x134)]['GetGaugeHeight'](_0xb2212c)??0xc)[_0x2914cd(0x1a8)](0x1,0x20),_0x1a1f93=_0x59ce95+this['lineHeight']()-_0x3df48-0x2,_0x2fe7ac=ColorManager[_0x2914cd(0x112)]();VisuMZ[_0x2914cd(0x134)]['_maxValueSegment']=this[_0x2914cd(0x2ed)](),this[_0x2914cd(0x1a4)]['drawVisualStyleGauge'](_0xb2212c,_0x4c7ac6,_0x1a1f93,_0x3b6102,_0x3df48,_0x4f1e1c,_0x2fe7ac,_0x165fd3,_0x1fac06);}else this['drawGauge'](_0x4c7ac6,_0x59ce95,_0x3b6102,_0x4f1e1c,_0x165fd3,_0x1fac06);},Window_QTE_GaugeBase['prototype'][_0xa66f72(0x1e9)]=function(){const _0x6ba7d4=_0xa66f72;if(!SceneManager[_0x6ba7d4(0x1d0)]())return;const _0x5c3c83=VisuMZ[_0x6ba7d4(0x1fc)][_0x6ba7d4(0x2b5)][_0x6ba7d4(0xa7)],_0x244cd0=Math[_0x6ba7d4(0xea)](_0x5c3c83[_0x6ba7d4(0x7b)]/0x2);if(SceneManager[_0x6ba7d4(0x1aa)]>_0x244cd0)return;const _0x20b74b=Math[_0x6ba7d4(0xea)](0xff/_0x244cd0);this[_0x6ba7d4(0x9e)]-=_0x20b74b;};function Window_QTE_Timer(){this['initialize'](...arguments);}Window_QTE_Timer[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Window_QTE_GaugeBase[_0xa66f72(0x118)]),Window_QTE_Timer[_0xa66f72(0x118)]['constructor']=Window_QTE_Timer,Window_QTE_Timer['prototype']['initialize']=function(_0xdc39ad){const _0x50c300=_0xa66f72;Window_QTE_GaugeBase[_0x50c300(0x118)][_0x50c300(0x7f)]['call'](this,_0xdc39ad);},Window_QTE_Timer[_0xa66f72(0x118)]['cacheData']=function(){const _0x50cf13=_0xa66f72;this[_0x50cf13(0xcc)]=SceneManager[_0x50cf13(0x10f)],this[_0x50cf13(0xfe)]=SceneManager[_0x50cf13(0x186)];},Window_QTE_Timer['prototype'][_0xa66f72(0x2d5)]=function(){const _0x245d23=_0xa66f72;if(this['_lastDuration']!==SceneManager['_qteDuration'])return!![];if(this[_0x245d23(0xfe)]!==SceneManager[_0x245d23(0x186)])return!![];return![];},Window_QTE_Timer[_0xa66f72(0x118)][_0xa66f72(0x2a3)]=function(){const _0x506681=_0xa66f72,_0x11cb4f=VisuMZ[_0x506681(0x1fc)]['Settings'][_0x506681(0xa7)];return ColorManager[_0x506681(0x235)](_0x11cb4f[_0x506681(0x17a)]);},Window_QTE_Timer[_0xa66f72(0x118)][_0xa66f72(0x2b9)]=function(){const _0x1e8a4d=_0xa66f72,_0x35f109=VisuMZ[_0x1e8a4d(0x1fc)][_0x1e8a4d(0x2b5)][_0x1e8a4d(0xa7)];return ColorManager[_0x1e8a4d(0x235)](_0x35f109[_0x1e8a4d(0x82)]);},Window_QTE_Timer['prototype']['gaugeStyle']=function(){const _0x3a28bc=_0xa66f72,_0x164e17=VisuMZ[_0x3a28bc(0x1fc)]['Settings'][_0x3a28bc(0xa7)];return _0x164e17[_0x3a28bc(0x11b)];},Window_QTE_Timer[_0xa66f72(0x118)]['gaugeCurrentValue']=function(){const _0x39744c=_0xa66f72;return this[_0x39744c(0xcc)]||0x0;},Window_QTE_Timer[_0xa66f72(0x118)][_0xa66f72(0x2ed)]=function(){const _0x26fccb=_0xa66f72;return this[_0x26fccb(0xfe)]||0x0;};function Window_QTE_Progress(){const _0x4d006f=_0xa66f72;this[_0x4d006f(0x7f)](...arguments);}Window_QTE_Progress[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Window_QTE_GaugeBase[_0xa66f72(0x118)]),Window_QTE_Progress[_0xa66f72(0x118)][_0xa66f72(0x2dd)]=Window_QTE_Progress,Window_QTE_Progress[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(_0x1a0a14){const _0x371b0a=_0xa66f72;Window_QTE_GaugeBase[_0x371b0a(0x118)][_0x371b0a(0x7f)][_0x371b0a(0x1ba)](this,_0x1a0a14);},Window_QTE_Progress[_0xa66f72(0x118)][_0xa66f72(0xe1)]=function(){const _0x329758=_0xa66f72;this[_0x329758(0xbf)]=SceneManager[_0x329758(0x267)][_0x329758(0x1ac)],this['_lastGoal']=SceneManager['_qteSettings'][_0x329758(0x194)];},Window_QTE_Progress[_0xa66f72(0x118)]['needsRefresh']=function(){const _0xfaa3c7=_0xa66f72;if(this[_0xfaa3c7(0xbf)]!==SceneManager['_qteSettings'][_0xfaa3c7(0x1ac)])return!![];if(this[_0xfaa3c7(0x218)]!==SceneManager['_qteSettings'][_0xfaa3c7(0x194)])return!![];return![];},Window_QTE_Progress['prototype'][_0xa66f72(0x2a3)]=function(){const _0x54d3af=_0xa66f72,_0x46a33f=VisuMZ[_0x54d3af(0x1fc)]['Settings'][_0x54d3af(0xa7)];return ColorManager['getColor'](_0x46a33f[_0x54d3af(0x12f)]);},Window_QTE_Progress[_0xa66f72(0x118)]['gaugeColor2']=function(){const _0x21fb26=_0xa66f72,_0x512aae=VisuMZ['QTE_TriggerSys'][_0x21fb26(0x2b5)][_0x21fb26(0xa7)];return ColorManager[_0x21fb26(0x235)](_0x512aae[_0x21fb26(0x1b8)]);},Window_QTE_Progress['prototype'][_0xa66f72(0x23b)]=function(){const _0x2b05ce=_0xa66f72,_0x4df6d4=VisuMZ[_0x2b05ce(0x1fc)][_0x2b05ce(0x2b5)][_0x2b05ce(0xa7)];return _0x4df6d4[_0x2b05ce(0x1a6)];},Window_QTE_Progress['prototype'][_0xa66f72(0x2dc)]=function(){const _0x2e6ff9=_0xa66f72;return this[_0x2e6ff9(0xbf)]||0x0;},Window_QTE_Progress[_0xa66f72(0x118)]['gaugeMaxValue']=function(){const _0x5b2bbf=_0xa66f72;return this[_0x5b2bbf(0x218)]||0x0;};function Window_QTE_HelpBase(){this['initialize'](...arguments);}Window_QTE_HelpBase[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Window_Help['prototype']),Window_QTE_HelpBase['prototype']['constructor']=Window_QTE_HelpBase,Window_QTE_HelpBase[_0xa66f72(0x118)]['initialize']=function(_0x4b7a8b){const _0x2660cb=_0xa66f72;this[_0x2660cb(0xe1)](),Window_Help['prototype'][_0x2660cb(0x7f)][_0x2660cb(0x1ba)](this,_0x4b7a8b);},Window_QTE_HelpBase[_0xa66f72(0x118)]['cacheData']=function(){const _0x4d96d8=_0xa66f72;this[_0x4d96d8(0xbf)]=this[_0x4d96d8(0x1e6)](),this['_lastQteInputType']=Input[_0x4d96d8(0x221)]();},Window_QTE_HelpBase[_0xa66f72(0x118)][_0xa66f72(0x182)]=function(){const _0x4ed462=_0xa66f72;Window_Help[_0x4ed462(0x118)][_0x4ed462(0x182)][_0x4ed462(0x1ba)](this),this[_0x4ed462(0x2d5)]()&&(this['cacheData'](),this[_0x4ed462(0x253)]());},Window_QTE_HelpBase[_0xa66f72(0x118)][_0xa66f72(0x2d5)]=function(){const _0x185932=_0xa66f72;return this[_0x185932(0x14d)]!==Input[_0x185932(0x221)]();},Window_QTE_HelpBase[_0xa66f72(0x118)]['refresh']=function(){const _0x25dcd8=_0xa66f72;this['contents']['clear'](),this[_0x25dcd8(0x2ad)](),this['resetFontSettings'](),this[_0x25dcd8(0x290)](!![]);const _0x59e0ab=this['baseTextRect']();this[_0x25dcd8(0xab)](this[_0x25dcd8(0x25f)],_0x59e0ab['x'],_0x59e0ab['y']+this[_0x25dcd8(0x2d8)](),_0x59e0ab['width']);},Window_QTE_HelpBase[_0xa66f72(0x118)][_0xa66f72(0x1e6)]=function(){const _0x1e7bc7=_0xa66f72;return SceneManager['_qteSettings'][_0x1e7bc7(0x1ac)]||0x0;},Window_QTE_HelpBase['prototype'][_0xa66f72(0x2ad)]=function(){};function Window_QTE_ButtonSequence(){const _0x451b56=_0xa66f72;this[_0x451b56(0x7f)](...arguments);}Window_QTE_ButtonSequence[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Window_QTE_HelpBase[_0xa66f72(0x118)]),Window_QTE_ButtonSequence[_0xa66f72(0x118)][_0xa66f72(0x2dd)]=Window_QTE_ButtonSequence,Window_QTE_ButtonSequence[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(_0x5f25e4){const _0x4d84b6=_0xa66f72;Window_QTE_HelpBase[_0x4d84b6(0x118)][_0x4d84b6(0x7f)][_0x4d84b6(0x1ba)](this,_0x5f25e4);},Window_QTE_ButtonSequence['prototype'][_0xa66f72(0xe1)]=function(){const _0x529a20=_0xa66f72;Window_QTE_HelpBase['prototype'][_0x529a20(0xe1)][_0x529a20(0x1ba)](this),this['_lastProgress']=this[_0x529a20(0x1e6)]();},Window_QTE_ButtonSequence[_0xa66f72(0x118)][_0xa66f72(0x2d5)]=function(){const _0x1f54c4=_0xa66f72;if(this[_0x1f54c4(0xbf)]!==this['buttonProgress']())return!![];return Window_QTE_HelpBase['prototype'][_0x1f54c4(0x2d5)][_0x1f54c4(0x1ba)](this);},Window_QTE_ButtonSequence[_0xa66f72(0x118)]['refreshDrawSpecialData']=function(){const _0x2ed743=_0xa66f72,_0x3097d6=SceneManager[_0x2ed743(0x267)]['sequence']['clone'](),_0x454835=_0x3097d6[_0x2ed743(0x29c)]('')[_0x2ed743(0x251)](_0x451fc6=>TextManager[_0x2ed743(0x19f)](_0x451fc6)),_0x528433=_0x454835['join']('\x20'),_0x519ca6=this[_0x2ed743(0x239)](_0x528433)[_0x2ed743(0x18f)],_0x5e59f9=SceneManager[_0x2ed743(0x267)][_0x2ed743(0x1ac)];let _0x579119=Math[_0x2ed743(0x2d1)]((this[_0x2ed743(0x19c)]-_0x519ca6)/0x2);this[_0x2ed743(0xee)]();const _0x5971e9=_0x454835['length'];for(let _0x3f6bd0=0x0;_0x3f6bd0<_0x5971e9;_0x3f6bd0++){if('qHQqo'==='ZFUug')_0x5033eb=_0x30e297[_0x2ed743(0x89)](_0x26c43e,_0x3d8907);else{const _0x5d8ef6=_0x454835[_0x3f6bd0];this[_0x2ed743(0x290)](_0x3f6bd0>=_0x5e59f9),this['drawTextEx'](_0x5d8ef6,_0x579119,0x0),_0x579119+=this[_0x2ed743(0x239)](_0x5d8ef6+'\x20')[_0x2ed743(0x18f)];}}};function Window_QTE_TimedSequence(){this['initialize'](...arguments);}Window_QTE_TimedSequence[_0xa66f72(0x118)]=Object[_0xa66f72(0x1f3)](Window_QTE_HelpBase[_0xa66f72(0x118)]),Window_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x2dd)]=Window_QTE_TimedSequence,Window_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x7f)]=function(_0x3579f2){const _0x50c408=_0xa66f72;Window_QTE_HelpBase[_0x50c408(0x118)]['initialize'][_0x50c408(0x1ba)](this,_0x3579f2),this[_0x50c408(0x193)](),this[_0x50c408(0x2bc)]();},Window_QTE_TimedSequence[_0xa66f72(0x118)][_0xa66f72(0x193)]=function(){const _0x40a7f8=_0xa66f72,_0x1e745e=VisuMZ[_0x40a7f8(0x1fc)][_0x40a7f8(0x2b5)][_0x40a7f8(0xa7)],_0x451f27=_0x1e745e[_0x40a7f8(0x2ee)]||0x0,_0x2461cf=SceneManager[_0x40a7f8(0x267)],_0x4d35a0=_0x2461cf[_0x40a7f8(0xd5)]||0x0,_0x5e9880=_0x2461cf[_0x40a7f8(0x256)]||_0x40a7f8(0x1ae),_0x388bf6=new Sprite();_0x388bf6[_0x40a7f8(0x10e)]=ImageManager[_0x40a7f8(0x236)](_0x40a7f8(0x171)),_0x388bf6[_0x40a7f8(0x124)]['x']=0.5,_0x388bf6[_0x40a7f8(0x124)]['y']=0.5;{if(_0x40a7f8(0x199)==='AZkwK'){const _0x57fbd3=ImageManager[_0x40a7f8(0x23e)],_0x206a75=ImageManager[_0x40a7f8(0x284)],_0x585374=_0x4d35a0%0x10*_0x57fbd3,_0x29d6e1=Math[_0x40a7f8(0x2d1)](_0x4d35a0/0x10)*_0x206a75;_0x388bf6['setFrame'](_0x585374,_0x29d6e1,_0x57fbd3,_0x206a75);}else{const _0x2a862c=_0x4d5bd9[_0x40a7f8(0x1fc)]['Settings'][_0x40a7f8(0xa7)],_0x4b1c36=_0x2a862c[_0x40a7f8(0x1f4)]||0x64,_0x5b34a8=0xc,_0x4cb42=_0x1d82c1[_0x40a7f8(0x2d1)]((this[_0x40a7f8(0x2bd)][_0x40a7f8(0x19c)]-_0x4b1c36)/0x2)+this[_0x40a7f8(0x2bd)][_0x40a7f8(0x167)],_0x24c3d4=this[_0x40a7f8(0x2bd)][_0x40a7f8(0x2d8)]()-_0x5b34a8-0x2+this[_0x40a7f8(0x2bd)][_0x40a7f8(0x167)],_0x246171=_0x2a862c[_0x40a7f8(0x188)]||0x0,_0x50f872=_0x2a862c[_0x40a7f8(0x16f)]||0x0;this['x']=_0x4cb42+this[_0x40a7f8(0x102)]+_0x246171,this['y']=_0x24c3d4+_0x50f872;}}const _0x3d1a87=(_0x5e9880===_0x40a7f8(0x1ae)?_0x451f27:0x64-_0x451f27)*0.01;this[_0x40a7f8(0x16e)]=this['padding']+Math['round'](this[_0x40a7f8(0x19c)]*_0x3d1a87),this[_0x40a7f8(0x270)]=this[_0x40a7f8(0x167)]+Math['round'](this[_0x40a7f8(0x2d8)]()/0x2),_0x388bf6['x']=this['_landingPositionX'],_0x388bf6['y']=this[_0x40a7f8(0x270)],this[_0x40a7f8(0xfb)](_0x388bf6),this[_0x40a7f8(0x282)]=_0x388bf6;},Window_QTE_TimedSequence['prototype'][_0xa66f72(0x2bc)]=function(){const _0x354ac9=_0xa66f72,_0x3ddb96=SceneManager['_qteSettings'],_0x26655e=_0x3ddb96[_0x354ac9(0x24d)][_0x354ac9(0x1f9)]()[_0x354ac9(0x2f3)]();this[_0x354ac9(0x200)]=[];for(const _0x34e7a3 of _0x26655e){_0x34e7a3[_0x354ac9(0xae)]=this[_0x354ac9(0x16e)],_0x34e7a3['_baseY']=this[_0x354ac9(0x270)];const _0x820143=new Sprite_QTE_TimedSequence(_0x34e7a3);this[_0x354ac9(0xfb)](_0x820143),this[_0x354ac9(0x200)][_0x354ac9(0x23f)](_0x820143);}},Window_QTE_TimedSequence[_0xa66f72(0x118)]['destroyContents']=function(){const _0x575480=_0xa66f72;Window_QTE_HelpBase[_0x575480(0x118)][_0x575480(0x276)][_0x575480(0x1ba)](this);if(!this[_0x575480(0x200)])return;while(this[_0x575480(0x200)][_0x575480(0x17e)]>0x0){const _0x4b3223=this[_0x575480(0x200)][_0x575480(0x8e)]();if(!_0x4b3223)continue;if(!_0x4b3223[_0x575480(0x10e)])continue;_0x4b3223[_0x575480(0x10e)][_0x575480(0x144)]();}};function Window_QTE_TimingBar(){const _0x17ac82=_0xa66f72;this[_0x17ac82(0x7f)](...arguments);}Window_QTE_TimingBar['prototype']=Object[_0xa66f72(0x1f3)](Window_QTE_HelpBase[_0xa66f72(0x118)]),Window_QTE_TimingBar['prototype']['constructor']=Window_QTE_TimingBar,Window_QTE_TimingBar['prototype'][_0xa66f72(0x7f)]=function(_0x279a78){const _0x548a74=_0xa66f72;Window_QTE_HelpBase['prototype'][_0x548a74(0x7f)][_0x548a74(0x1ba)](this,_0x279a78),this['createTimingBarSprite']();},Window_QTE_TimingBar[_0xa66f72(0x118)][_0xa66f72(0x260)]=function(){const _0x1837f4=_0xa66f72;this[_0x1837f4(0x18e)]=new Sprite_QTE_TimingBarCursor(),this[_0x1837f4(0xfb)](this[_0x1837f4(0x18e)]);},Window_QTE_TimingBar['prototype']['refreshDrawSpecialData']=function(){const _0xdc446c=_0xa66f72;this[_0xdc446c(0xe8)](),this[_0xdc446c(0x164)]();},Window_QTE_TimingBar[_0xa66f72(0x118)][_0xa66f72(0xe8)]=function(){const _0x4520c2=_0xa66f72,_0x470a90=VisuMZ[_0x4520c2(0x1fc)][_0x4520c2(0x2b5)][_0x4520c2(0xa7)],_0xd26588=_0x470a90[_0x4520c2(0x1f4)]||0x64,_0x13672e=0xc,_0x34b4f9=Math[_0x4520c2(0x2d1)]((this[_0x4520c2(0x19c)]-_0xd26588)/0x2),_0x5a8a18=this['lineHeight']()-_0x13672e-0x2,_0x15173=ColorManager[_0x4520c2(0x235)](_0x470a90[_0x4520c2(0xb7)]),_0xd84339=ColorManager[_0x4520c2(0x235)](_0x470a90[_0x4520c2(0xe6)]);this[_0x4520c2(0x1a4)]['fillRect'](_0x34b4f9-0x1,_0x5a8a18-0x1,_0xd26588+0x2,_0x13672e+0x2,ColorManager[_0x4520c2(0x112)]()),this[_0x4520c2(0x1a4)][_0x4520c2(0xd7)](_0x34b4f9,_0x5a8a18,_0xd26588,_0x13672e,_0x15173,_0xd84339,!![]);},Window_QTE_TimingBar[_0xa66f72(0x118)][_0xa66f72(0x164)]=function(){const _0x1484a5=_0xa66f72,_0x220112=VisuMZ[_0x1484a5(0x1fc)][_0x1484a5(0x2b5)][_0x1484a5(0xa7)],_0x294690=_0x220112[_0x1484a5(0x1f4)]||0x64,_0x395c3d=0xc,_0xdd65b6=Math[_0x1484a5(0x2d1)]((this[_0x1484a5(0x19c)]-_0x294690)/0x2),_0x1a3a52=this[_0x1484a5(0x2d8)]()-_0x395c3d-0x2,_0x251e09=SceneManager['_qteSettings'],_0x282590=_0x251e09['zones'];for(const _0x1292fa of _0x282590){if(_0x1484a5(0x2aa)!=='WmBHL'){const _0x13ca46=Math[_0x1484a5(0x29b)](_0x1292fa[_0x1484a5(0x185)],_0x1292fa[_0x1484a5(0x254)])[_0x1484a5(0x1a8)](0x0,0x64),_0x308b83=Math[_0x1484a5(0x89)](_0x1292fa[_0x1484a5(0x185)],_0x1292fa[_0x1484a5(0x254)])['clamp'](0x0,0x64),_0xc51682=Math[_0x1484a5(0xea)](_0x13ca46*0.01*_0x294690),_0x31e60d=Math[_0x1484a5(0x2d1)](_0x308b83*0.01*_0x294690),_0xe119f5=_0xc51682+_0xdd65b6,_0x595b31=_0x31e60d-_0xc51682,_0x390c34=ColorManager[_0x1484a5(0x235)](_0x1292fa[_0x1484a5(0x1ce)]),_0x131a8b=ColorManager['getColor'](_0x1292fa['AreaColor2']);this[_0x1484a5(0x1a4)][_0x1484a5(0xd7)](_0xe119f5,_0x1a3a52,_0x595b31,_0x395c3d,_0x390c34,_0x131a8b,!![]);const _0x1bfd3d=_0x1292fa['Label']||'';if(_0x1bfd3d[_0x1484a5(0x17e)]>0x0){this['_labelMode']=!![];const _0x4c9f0e=this['textSizeEx'](_0x1bfd3d)['width'],_0x25a01b=_0xe119f5+Math[_0x1484a5(0x23d)](_0x595b31/0x2),_0xc9f1b7=_0x25a01b-Math[_0x1484a5(0xea)](_0x4c9f0e/0x2)+(_0x220112[_0x1484a5(0x2eb)]||0x0),_0x1f5737=_0x220112[_0x1484a5(0x24f)]||0x0;this[_0x1484a5(0xab)](_0x1bfd3d,_0xc9f1b7,_0x1f5737),this[_0x1484a5(0x204)]=![];}}else return this['_qteType']!=='';}},Window_QTE_TimingBar['prototype'][_0xa66f72(0xee)]=function(){const _0x36084f=_0xa66f72;Window_QTE_HelpBase[_0x36084f(0x118)][_0x36084f(0xee)][_0x36084f(0x1ba)](this),this[_0x36084f(0x204)]&&(this[_0x36084f(0x1a4)][_0x36084f(0x9d)]=$gameSystem[_0x36084f(0xd8)](),this[_0x36084f(0x1a4)][_0x36084f(0x25c)]=VisuMZ[_0x36084f(0x1fc)][_0x36084f(0x2b5)]['QTE'][_0x36084f(0xd3)]||$gameSystem[_0x36084f(0x162)]());},Window_QTE_TimingBar[_0xa66f72(0x118)][_0xa66f72(0xf8)]=function(){const _0x4845cb=_0xa66f72;this[_0x4845cb(0x18e)][_0x4845cb(0xf8)]();},Window_QTE_TimingBar[_0xa66f72(0x118)]['getCursorPosition']=function(){const _0x24caa3=_0xa66f72;return this[_0x24caa3(0x18e)][_0x24caa3(0x29a)]();},VisuMZ[_0xa66f72(0x1fc)][_0xa66f72(0xf5)]=function(_0x517c29){const _0x3f6a5e=_0xa66f72;var _0x1f8740,_0x140bac,_0x214c11;for(_0x214c11=_0x517c29[_0x3f6a5e(0x17e)]-0x1;_0x214c11>0x0;_0x214c11--){if(_0x3f6a5e(0xef)!==_0x3f6a5e(0x16b))_0x1f8740=Math['floor'](Math[_0x3f6a5e(0xaa)]()*(_0x214c11+0x1)),_0x140bac=_0x517c29[_0x214c11],_0x517c29[_0x214c11]=_0x517c29[_0x1f8740],_0x517c29[_0x1f8740]=_0x140bac;else{const _0x1499e4=_0x5b2a59[_0x3f6a5e(0x1d2)]();_0x3b44db[_0x3f6a5e(0x22e)]('switches',_0x1499e4);}}return _0x517c29;};