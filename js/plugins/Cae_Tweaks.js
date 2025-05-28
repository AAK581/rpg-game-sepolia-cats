// ============= //
// Cae_Tweaks.js //
// ============= //

//#region Plugin header (default locale)
/*:
 * @target MZ
 * @plugindesc v16 - some engine modifications.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/156047/
 * @help Cae_Tweaks.js:
 *  • This plugin was written for use with a front-view TPB system.
 *  • It has less of a focus on cross-compatibility than most of my plugins.
 *  • Resources in plugin parameters are registered for "Exclude unused files".
 *  • Each feature can be toggled/customised independently using parameters →
 *    - By default, all features are disabled.
 *  • Each feature has its own code, e.g. "M01", for unambiguous reference.
 *
 * Help contents:
 *  • Terms of use.
 *  • Quick reference: tags, resources, features.
 *  • Feature descriptions.
 *  • Update log.
 *
 *
 * ============================================================================
 *                                 TERMS OF USE
 * ============================================================================
 * MIT License: https://opensource.org/licenses/mit-license.html
 *
 * [[ BEGIN LICENSE TEXT ]]
 *
 *   Copyright © 2023-2024 Caethyril
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a
 *   copy of this software and associated documentation files (the "Software"),
 *   to deal in the Software without restriction, including without limitation
 *   the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *   and/or sell copies of the Software, and to permit persons to whom the
 *   Software is furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included
 *   in all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *   THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *   DEALINGS IN THE SOFTWARE.
 *
 * [[ END LICENSE TEXT ]]
 *
 *
 * ============================================================================
 *                               QUICK REFERENCES
 * ============================================================================
 * ----------------------------------------------------------------------------
 *                                     TAGS
 * ----------------------------------------------------------------------------
 * Usage:
 *  • Notetags go in the Note field.
 *  • Name tags go in the Name field.
 *  • Comment tags go in a Comment command on an appropriate page of the event.
 *    Where comment and note tags are allowed, comments take priority.
 *  • The ">" character cannot be used inside any of this plugin's tags.
 *    "a > b" can be rewritten as "b < a". Watch out for arrow functions.
 *
 * Summary by type (see feature descriptions for details):
 *  • Map ----------------- [Q21] <muffleBGS>
 *                          [Q41] <dark: R, G, B, A>
 *  • Event/Comment ------- [M32] <no lock>
 *                          [Q23] <offset: X, Y>
 *                          [Q32] <hue: H, D>
 *                          [Q37] <orbit: ID, Rx:Ry, Tx:Ty, ANGLE>
 *                          [D02] <los: RESULT, RANGE, FOV>
 *  • Event/Comment/Trait - [Q41] <light: RADIUS, R, G, B, A, DIR>
 *  • Trait --------------- [M09] <max TP base: X>
 *                                <max TP plus: X>
 *                          [M21] <HRG element: ID>
 *                          [M24] <guard skill: ID>
 *                          [M30] <lock formation>
 *                          [M33] <ai strictness: X>
 *                          [Q35] <death var: ID, ADD>
 *                                <death anim: ID>
 *                          [Q41] <dim: A>
 *  • Trait/Item/Skill ---- [M34] <boost escape: X>
 *                                <block escape: X>
 *                                <block escape immobile: X>
 *                          [Q11] <attack anim base: ID>
 *                                <attack anim plus: ID>
 *  • Item/Skill ---------- [M17] <follow-up: ID, ID, ID>
 *                          [M18] <avoid repeats>
 *                                <forbid repeats>
 *                          [M20] <cast state: ID, ID, ID>
 *                          [M25] <no weapon>
 *  • Skill --------------- [M29] <cost: TYPE EXT: JS>
 *  • State --------------- [M04] <persist>
 *                          [M05] <next: ID, CHANCE>
 *                          [M22] <stack: X>
 *                          [M38] <transform: ID>
 *                          [Q20] <hide turns>
 *  • Enemy/State --------- [Q18] <ghost: X.X>
 *  • Enemy --------------- [M16] <actor: ID>
 *                          [Q30] <gauge offset: X, Y>
 *                                <gauge width scale: X>
 *  • Troop Name ---------- [D18] <add: ID, ID, ID>
 *
 * ----------------------------------------------------------------------------
 *                              DATABASE/RESOURCES
 * ----------------------------------------------------------------------------
 * If feature enabled:
 *  • Q05: Auto-portraits = "img/pictures/<faceName>_<faceIndex+1>.png".
 *  • Q26: Saving icon, default = "icon/icon.png" (game icon).
 *  • Q29: Splash background(s), default = "img/system/Splash.png".
 *  • D01: Troop 1 becomes an event source for all Troops.
 *  • D04: Item 1 becomes an effect source for all Items & Skills.
 *
 * Optional:
 *  • M08: TP block/break animations.               (parameters)
 *  • M30: Custom formation lock indicator image.   (parameter)
 *  • Q23: Terrain tags for tile offsets.           (parameter)
 *  • Q48: Custom cursor images.                    (parameter)
 *  • D02: Opaque regions for line-of-sight checks. (parameter)
 *  • D24: Resources specified for caching.         (parameters/commands)
 *
 * ----------------------------------------------------------------------------
 *                                   FEATURES
 * ----------------------------------------------------------------------------
 *  • M01: HIT > 100% multiplies evade fail rate.
 *  • M02: Reinstate speed/Through on exit vehicle.
 *  • M03: High relative TGR => taunt opponents.
 *  • M04: States can <persist> after death.
 *  • M05: Conditional state chaining <next: X, Y>.
 *  • M06: Blank equip type names make duplicate slots.
 *  • M07: Luck effect applies to more things, e.g. hit/crit.
 *  • M08: Use TP as a damage shield.
 *  • M09: <max TP base: X> & <max TP plus: X>.
 *  • M10: Left/right actor selection in TPB-Wait.
 *  • M11: Adds Active TPB Mode in-game option.
 *  • M12: States add min turns on apply, up to max.
 *  • M13: Random encounter rate = "rate" to "mult * rate".
 *  • M14: Speed > 0 actions give bonus TPB charge next turn.
 *  • M15: "Remove State X%" removes X% of max turns.
 *  • M16: Enemy tag <actor: X> copies traits from actor X.
 *  • M17: <follow-up: A, B, C> for Skills/Items.
 *  • M18: "X Random" scope: <forbid repeats>, <avoid repeats>.
 *  • M19: "Add State: Normal Attack" effect => this is an attack.
 *  • M20: Casting states for Skills/Items: <cast state: X>.
 *  • M21: Elemental HP Regen traits: <HRG element: X>.
 *  • M22: Turn-based state stacks: <stack: X>.
 *  • M23: Gain TP -> Lose TP on opponent-scoped actions.
 *  • M24: Replace Guard skill: <guard skill: X>.
 *  • M25: Ignore weapon for certain Skills/Items: <no weapon>.
 *  • M26: Change speed on bush/ladder tiles.
 *  • M27: "Item" skill type to limit battle item usage.
 *  • M28: Change save slot count.
 *  • M29: Custom skill cost types: <cost: type ext: jsCost>.
 *  • M30: Per-actor formation locking: <lock formation>.
 *  • M31: Change follower-event collisions.
 *  • M32: Disable event "locking": <no lock>.
 *  • M33: Custom Auto Battle AI for actors/enemies.
 *  • M34: <boost escape: X>, <block escape [immobile]: X>.
 *  • M35: Custom "switch-on" battle party commands.
 *  • M36: Gameover screen command window.
 *  • M37: Cross-playthrough persistent switches/variables.
 *  • M38: <transform: ID> State notetag.
 *
 *  • Q01: Finer volume controls.
 *  • Q02: Front-view battle effects on actor status window.
 *  • Q03: More info on status scene.
 *  • Q04: Skips blank messages on battle start.
 *  • Q05: More actor info on equip scene.
 *  • Q06: Pauses audio & video when game loses focus.
 *  • Q07: Disables WindowLayer masking.
 *  • Q08: Scroll down to last item, change column if needed.
 *  • Q09: Process text codes in any game window.
 *  • Q10: Suppress map fast-forward behaviour.
 *  • Q11: Attack animation controls.
 *  • Q12: Add "Quit Game" command for non-web games.
 *  • Q13: Support weather effects in battle.
 *  • Q14: New Show Text codes: \AF[n], \PF[n], \S[n], \ALIGN[0|1|2].
 *  • Q15: Group duplicate drops in battle rewards.
 *  • Q16: Adds in-game option for audio dynamic range compression.
 *  • Q17: Adds a help window to the options scene.
 *  • Q18: Enemy opacity: <ghost: X>.
 *  • Q19: Render at integer coordinates to avoid blurring.
 *  • Q20: Show remaining state/buff turns on battle icons.
 *  • Q21: Per-map BGS muffling: <muffleBGS>.
 *  • Q22: All enemies are closer to the bottom of the screen.
 *  • Q23: Tile/event draw offsets: <offset: X, Y>.
 *  • Q24: Hide MP or TP gauges with a maximum of 0.
 *  • Q25: Segmented gauges.
 *  • Q26: "Saving" indicator appears when saving.
 *  • Q27: Touch UI toggles immediately when option is toggled.
 *  • Q28: Show options on first session.
 *  • Q29: Pre-title static/movie splash screens.
 *  • Q30: Enemy gauges.
 *  • Q31: Adds WASD movement, moves W -> E.
 *  • Q32: Event hue shift/cycle: <hue: H, D>.
 *  • Q33: Parallel Show Text => auto/gab message.
 *  • Q34: TPB cast time gauge overlay.
 *  • Q35: Death effects: <death var: X, Y>, <death anim: X>.
 *  • Q36: Show Picture snapshot.png uses snapshot.
 *  • Q37: Orbital motion for events: <orbit: id, R, T, ro>.
 *  • Q38: Release touch to change destination, hold to dash.
 *  • Q39: Attack/Guard commands show skill names.
 *  • Q40: Hover-select on menus plays Cursor SE.
 *  • Q41: Shadowless hard/soft colour map lighting shader.
 *  • Q42: Skip Buy/Sell/Cancel when appropriate.
 *  • Q43: Adds a Game Speed in-game option.
 *  • Q44: Place Guard command immediately after Attack.
 *  • Q45: Vertical scrollbar indicators.
 *  • Q46: Remodels main status scene window.
 *  • Q47: Adds a Full Screen in-game option.
 *  • Q48: Custom cursor PNG(s).
 *  • Q49: Show Choices: align, merge, inline, hide, disable, shuffle, help.
 *  • Q50: Menu arrangement: move commands/help/buttons, add mini-help.
 *  • Q51: In-game master volume option.
 *  • Q52: In-game option categories.
 *  • Q53: Show Text hover tips using \T[phrase].
 *  • Q54: Change options display: replace ON/OFF, add volume gauges.
 *  • Q55: State overlays for enemies and/or map party.
 *
 *  • D01: Prefix Troop 1 events to all other Troops.
 *  • D02: Line-of-sight: char1.los(char2, fov) => true|false; <los> event tag.
 *  • D03: Catch ConfigManager.save errors.
 *  • D04: Prefix Item 1 effects to all other Items & Skills.
 *  • D05: Set _targetIndex for enemy actions.
 *  • D06: Track all HP, MP, TP changes per result.
 *  • D07: Audio pitch can change without restarting track.
 *  • D08: Reset opposed "Last" data.
 *  • D09: Draw face from enemy image: $NAME$X-Y-S.png.
 *  • D10: Enemies use Attack|Guard skill when picking skill 1|2.
 *  • D11: Tile events contribute tile flags.
 *  • D12: Adds plugin commands to force battle advantage.
 *  • D13: Show Picture "!picture.png" pins to the map.
 *  • D14: Support showing left/right arrows on game windows.
 *  • D15: More info & clipboard-copy button on qualifying errors.
 *  • D16: Don't process message codes during measurement.
 *  • D17: Merge BGM Volume and ME Volume.
 *  • D18: Add members from listed troops: <add: X, X, X>.
 *  • D19: Allow processing multiple move commands per frame.
 *  • D20: Enemy Reinforcements plugin command.
 *  • D21: Synchronous save/load plugin commands.
 *  • D22: Silent onChange for specific switches/variables.
 *  • D23: CSPRNG for technically improved randomness.
 *  • D24: Precache maps, images, and/or audio.
 *  • D25: Auto Battle actors consider their guard skill.
 *  • D26: Custom core config default values.
 *  • D27: Move Toward/Away can use pathfinding.
 *
 *
 * ============================================================================
 *                             FEATURE DESCRIPTIONS
 * ============================================================================
 *
 *  • M01: Excess subject hit rate reduces target's evade chance.
 *         Formula: EVA ↦ 1 - (1 - EVA) * HIT.
 *         This is only applied when HIT > 100% and EVA < 100%.
 *         E.g. 120% HIT vs 20% EVA:
 *           - Original = 20% evade chance.
 *           - Adjusted = 1 - (1 - 0.2) * 1.2 = 1 - 0.96 = 4% evade chance.
 *
 *  • M02: Affects how player values are affected on exiting a vehicle.
 *         Normally speed is reset to 4, and Through is set to OFF.
 *         This feature restores the pre-vehicle speed/Through values instead.
 *
 *  • M03: Extends the Target Rate Sp-param, a.k.a. "TGR".
 *         Only affects opponent-scoped actions that are not Certain Hit.
 *         If there are multiple potential targets:
 *           - The candidate with highest TGR is identified.
 *           - "Taunt" = "Highest TGR" / "TGR Factor" (plugin parameter).
 *           - Eligible candidates have TGR >= "Taunt".
 *           - Ineligible candidates cannot be aimed at.
 *             They can still be hit by AoE scope skills, e.g. "All Enemies".
 *
 *  • M04: States with a <persist> notetag will remain after death.
 *
 *  • M05: States with a <next: X, Y> notetag may also add state X on apply.
 *         Requirements for this are:
 *           - Tagged state is at max turns after being applied.
 *           - Random roll [0, 1) is less than Y times the target's state rate.
 *         E.g. <next: 5, 0.2> => 20% chance to add state 5.
 *
 *  • M06: Blank equip type names count as the preceding non-blank equip type.
 *         This allows equipping the same equip type in multiple slots.
 *         Applies to Database > Types > Equip Types.
 *         Examples:
 *           - "Weapon", "Shield", "Ring", "", "Amulet".
 *               Defines slots: Weapon, Shield, Ring, Ring, Amulet.
 *           - "WPN", "OFF", "ORB", "", "", "CHA", "".
 *               Defines slots: WPN, OFF, ORB, ORB, ORB, CHA, CHA.
 *
 *  • M07: The luck effect is based on relative luck values (subject/target).
 *         It normally only affects state/debuff apply chance.
 *         This feature lets the luck effect multiply other things:
 *           - Hit chance (except for Certain Hit actions).
 *           - Crit chance.
 *           - Counter Attack chance.
 *           - Magic Reflect chance.
 *           - Enemy item drop chance.
 *           - Enemy gold drop quantity.
 *           - Battle escape chance.
 *         Default luck effect grants +0.1%pt favour per +1 LUK difference.
 *         Unit-based effects (item/gold/escape) use mean of pairwise values.
 *
 *  • M08: Makes TP work as a damage shield: 1 TP blocks 1 damage.
 *         Designed to work with M09 (max TP from notetags).
 *
 *         Only affects damage from a Skill/Item damage formula.
 *         Disables default "charge TP by damage" mechanic.
 *         Optional sub-features (see plugin parameters):
 *           - show popups for blocked damage.
 *           - show battle log messages.
 *           - show block and/or break animations.
 *           - in battle, init TP to max instead of random 0~24.
 *
 *  • M09: Specify max TP with notetags on trait-bearing objects:
 *           - <max TP base: X>
 *               Base value for max TP. Overrides default (plugin parameter).
 *               If multiple tags apply, the largest value is used.
 *           - <max TP plus: X>
 *               Additional value for max TP.
 *               All plus values are added to the base.
 *
 *  • M10: Normally the engine forbids changing input actor in TPB-Wait mode.
 *         This is now allowed when appropriate, via cancel.
 *         Also adds left/right input options for changing input actor.
 *
 *  • M11: Allows changing between Active and Wait TPB modes mid-game, via:
 *           - In-game option: leave display name blank to omit;
 *           - Plugin command: per-playthrough setting.
 *         E.g. the plugin command could be used at the start of the game.
 *
 *         Note that Active & Wait modes offer different tactics.
 *         This feature may affect your game's balance.
 *
 *  • M12: Normally states reset their turn counter when applied.
 *         Now states add their Min Turns when applied, up to their Max Turns.
 *         E.g. a state with duration 2~5 will add 2 turns per apply, up to 5.
 *
 *  • M13: Changes the number of steps between random encounters at rate R.
 *         The plugin parameter determines the multiplier, M.
 *           - Original: min = 1, max = 2R - 1.
 *           - Adjusted: min = R, max = MR.
 *         The random distribution (binomial) is unchanged.
 *
 *  • M14: Actions with speed > 0 give a TPB charge boost next turn.
 *         The boost scales linearly, from:
 *           - +0% at speed 0, to
 *           - +100% at or above "Instant Speed" (plugin parameter).
 *
 *  • M15: "Remove State X%" effects remove X% of the max turns of that state.
 *         The state is only removed if the turns are reduced to 0 or less.
 *
 *  • M16: An Enemy with a <actor: X> notetag will inherit from actor X.
 *         E.g. <actor: 1> copies the following from actor ID 1:
 *           - Base param values => replaces enemy values.
 *           - Plus param values => adds to enemy values, if any.
 *           - Traits            => adds to enemy traits.
 *           - Learned skills    => copied as "Add Skill" traits.
 *
 *  • M17: Adds follow-up notetags for Skills/Items:
 *           - <follow-up>          => follows up with random known skill
 *           - <follow-up: A, B, C> => follows up with skill ID A, B, or C.
 *             E.g. <follow-up: 11, 12, 13, 14, 15>.
 *         A follow-up is a new action performed with the same target index.
 *         Follow-ups that cannot be used will be omitted from the pool.
 *
 *         For enemies, "random known skill" is based on Add Skill traits.
 *         If using with enemies, feature D05 is also recommended!
 *
 *  • M18: Adds notetags for "X Random" scope Skills/Items:
 *           - <forbid repeats>
 *               Cannot hit the same target twice.
 *               Target count will be reduced if necessary.
 *           - <avoid repeats>
 *               Will distribute hits evenly over the available targets.
 *               E.g. 6 hits for 3 targets => hits each target twice.
 *
 *  • M19: Skills/Items with a "Add State: Normal Attack" effect are attacks:
 *           - They gain "Attack Speed" and "Attack Times+" modifiers.
 *           - They use the attack motion in sideview battles.
 *
 *  • M20: Adds notetag <cast state: X, X, X> for Skills/Items.
 *         E.g. <cast state: 5> => add state 5 while casting this skill.
 *
 *         Specified state IDs will be:
 *           - Added when TPB casting starts; and
 *           - Reset to their previous turn count when TPB casting ends.
 *         Note that the casting phase only occurs:
 *           - In battle; and
 *           - For Items/Skills with Invocation Speed < 0.
 *
 *  • M21: Adds <HRG element: X> notetag for any trait-bearing object.
 *         All HP Regen traits (HRG) on that object count as element ID X.
 *         This allows for elemental damage over time.
 *
 *  • M22: Enables state stacks based on remaining turns:
 *           - <stack: X>
 *               State stacks := ceil(turns / X). [ceil = round up to integer.]
 *               E.g. <stack: 3> with 5 turns duration means 2 stacks.
 *           - <stack>
 *               Equivalent to <stack: 1>.
 *
 *  • M23: Inverts certain effects on opponent-scoped Skills/Items:
 *           - Gain TP
 *           - Grow
 *         By default the editor only lets you input positive values for these.
 *         E.g. Gain 10 TP becomes Lose 10 TP on a Skill with Scope: 1 Enemy.
 *
 *  • M24: Adds <guard skill: X> notetag for any trait-bearing object.
 *         E.g. <guard skill: 10> makes the bearer use skill 10 for Guard.
 *         If multiple tags apply, the one with highest skill ID is used.
 *
 *  • M25: Adds <no weapon> notetag for Skills/Items.
 *         Ignores traits from equipped Weapons for this action.
 *
 *  • M26: Automatically adds values to speed when on bush and/or ladder tiles.
 *         Applies to all characters.
 *         Speed additions can be customised in the plugin parameters.
 *
 *  • M27: Allows controlling battle item access via a skill type:
 *           - Define a skill type with the same name as your Item command.
 *           - Seal that skill type to prevent use of items in battle.
 *         The skill type will be hidden in-game.
 *
 *         Optional: require actors to have the Item skill type to use items.
 *
 *  • M28: Change the maxSavefiles count: affects save/load screens.
 *         Load Game can be set to auto-select Autosave if it is more recent.
 *
 *  • M29: Adds custom skill cost handling and display.
 *
 *         Custom types are defined in the plugin parameters. Presets:
 *           - MP, TP:              as usual.
 *           - HP:                  costs HP, allows KO.
 *           - Item, Weapon, Armor: costs inventory items, "ext" = item ID.
 *           - Money:               costs currency.
 *           - Variable:            usable if variable >= cost, -cost on use.
 *           - Warmup:              usable in battle when turn > cost.
 *           - Cooldown:            must wait "cost" battle turns between uses.
 *
 *         Costs are defined per skill using a Skill notetag in the form:
 *            <cost: type ext: jsCost>
 *         This tag can span multiple lines; each cost type occupies 1 line.
 *           - type     Replace this with a cost type.
 *           - ext      An optional value used for extra info, e.g. item ID.
 *           - jsCost   A JavaScript expression or function body.
 *                      The return keyword will be auto-prefixed if absent.
 *                      Form: (subject, item, ext) => number.
 *         Note: MP cost tags do not auto-scale with MP Cost Rate traits.
 *         Consider multiplying by "subject.mcr" in "jsCost" when appropriate.
 *
 *         Examples:
 *           - <cost: hp: 50>
 *               Costs 50 HP.
 *           - <cost:
 *               mp: return Math.round(subject.mmp / 4);
 *               item 5: 1
 *               item 2: 2
 *             >
 *               Costs 25% max MP, 1x item ID 5, and 2x item ID 2.
 *
 *  • M30: Causes an actor to be "formation-locked" if:
 *           - They are in a "Locked Position" (see plugin parameter); or
 *           - They have at least one object with a <lock formation> notetag.
 *         Locked actors:
 *           - Cannot be rearranged via the Formation menu command.
 *           - Will display a "locked" image on their status block.
 *         The image's appearance can be customised via plugin parameters.
 *
 *  • M31: Affects event-follower collisions:
 *           - Allows Event Touch to trigger on collision with follower.
 *           - Alternatively, followers can be marked non-collidable.
 *         Configure this via its plugin parameter.
 *
 *  • M32: Normally events "lock" while processing. This involves:
 *           - Pausing their autonomous move route.
 *           - Facing the player on activation.
 *         This feature disables the "face player" aspect for events that:
 *           - Have a "_noLock = true" property (see next paragraph);
 *           - Have a <no lock> tag in their Note box; and/or
 *           - Have a <no lock> tag in any Comment on their active page.
 *         For optimal use, place any comment tag near the top of its page.
 *
 *         The _noLock property can be set manually, e.g.
 *           - $gameMap.event(3)._noLock = true;
 *                   [Can use anywhere.] Affects map event ID 3.
 *           - this._noLock = true;
 *               [Only in a move route.] Affects the event being moved.
 *           - this.character(0)._noLock = true;
 *                [In a Script command.] Affects "This Event".
 *         If set to false instead, it will negate any <no lock> tag present.
 *
 *         _noLock will reset with the event: on leaving the map, by default.
 *         Alternatively, it can be reset manually, e.g.
 *           - delete $gameMap.event(3)._noLock;
 *           - delete this._noLock;
 *           - delete this.character(0)._noLock;
 *
 *  • M33: Customisable auto-battle AI.
 *           - Define per-target evaluation functions in the parameters.
 *           - These return a numerical score for damage formula/effects.
 *           - Formula/effect evaluations combine as per the Combine parameter.
 *         All usable actions will be tested against all viable targets.
 *         For "all" scope skills, per-target evaluations will be summed.
 *         The AI will use the action with the highest evaluation score.
 *
 *         The preset parameter values (mostly blank) mimic the core engine.
 *         By default, only HP Damage/Recover/Drain formulae are evaluated.
 *
 *         NB: the core engine still adds a random 0~1 to the final result.
 *         You can scale up evaluations (e.g. multiply by 10) to minimise this.
 *
 *         Adds <ai strictness: X> notetag for trait objects. E.g.
 *            - <ai strictness: 80>
 *                Multiplies the result by 0.8 ~ 1 (random).
 *         Multiple tags combine multiplicatively, e.g. 50 and 50 => 25%.
 *
 *         The "Rating Ext" parameter lets you pre-calculate custom values.
 *         These are calculated just before an action begins evaluation.
 *         The values are available in all rating functions as "ext".
 *         The "ext" argument is an ordered array containing all custom values.
 *         E.g. for estimating evade chance.
 *
 *         Optional: this can be applied to enemies with an Auto Battle trait.
 *         Enemies using Auto Battle AI will ignore their action patterns.
 *         Instead they will look at their Add Skill traits.
 *         Otherwise they will behave exactly the same as Auto Battle actors.
 *
 *  • M34: Adds notetags for any trait-bearing object:
 *           - <boost escape: X>
 *               Increases escape chance by X percentage points for bearer.
 *               E.g. <boost escape: 50> => +50%pt escape chance.
 *           - <block escape: X>
 *               Decreases escape chance by X percentage points for opponents.
 *               Does not apply when under the Cannot Move restriction.
 *               E.g. <block escape: 100> => -100%pt chance for any foe escape.
 *           - <block escape immobile: X>
 *               Like <block escape>, except it works even when Cannot Move.
 *         These tags apply to the Escape party command.
 *         They can optionally also apply to the Escape effect on Items/Skills.
 *
 *         Usually, the party escape chance (a.k.a. "escape ratio") is:
 *           - Calculated at the start of battle; and
 *           - Increased by a bonus of +10%pt per failed escape.
 *         It can be set to recalculate per attempt via the parameters →
 *         In that case, the stacking +10%pt bonus is effectively disabled.
 *
 *  • M35: Implements switch-based party commands.
 *         Each such party command is assigned a switch:
 *           - The command is enabled when the switch is off;
 *           - Command OK turns on the switch and checks for troop events.
 *
 *         Party commands can be added/removed mid-game using plugin commands.
 *         Designed for e.g. unique boss mechanics or special party abilities.
 *         Feature D01 (copy troop events) may be useful.
 *
 *  • M36: Adds a command window on the Gameover screen.
 *         Available commands:
 *           - title   = returns to title.
 *           - retry   = loads save with most recent timestamp.
 *           - load    = opens the load menu.
 *           - options = opens the options menu.
 *         For better control of the retry command, consider feature D21.
 *
 *         The window position and commands can be customised via parameters.
 *         The window will open after a delay, or on user OK/touch.
 *         A delay of 0 means it will wait for user input.
 *
 *         If no commands are enabled, it will proceed to the title screen.
 *         If only 1 command is present, it will auto-OK after the delay.
 *
 *  • M37: Specified switches and/or variables persist across playthroughs.
 *         There are 2 types, set up via the plugin parameters:
 *           - Persistent:  value silently persists across playthroughs.
 *                          e.g. for unlockables.
 *           - Game Option: adds a setting to the in-game options menu.
 *                          e.g. for custom settings.
 *
 *         Persistence will only work correctly via standard access.
 *         Fetching raw "_data" with script calls may give strange results.
 *
 *  • M38: Adds the <transform: ID> notetag for States.
 *         Adding a tagged state to an actor makes them "transform".
 *         Erasing the state makes them revert to their pre-transform self.
 *           - E.g. <transform: 5>   => transform into actor ID 5
 *
 *         Transformation applies these commands, copying from the given actor:
 *           - Change Name
 *           - Change Nickname
 *           - Change Class
 *           - Change Actor Images
 *           - Change Profile
 *         Note: these commands are performed again if/when the transform ends!
 *
 *         Effects after "Add State" will apply to the transformed battler.
 *         E.g. for a skill that transforms, then heals.
 *
 *
 *  • Q01: Plugin parameter value for volume step size on options screen.
 *         Also adds horizontal touch-drag input support for all settings.
 *
 *         Step size is automatically set to 1 in the following cases:
 *           - When holding the dash button ("shift").
 *           - During horizontal touch-drag.
 *
 *  • Q02: Shows battle animations, state overlay, etc on actor faces.
 *         For front-view battle.
 *         (Normally animations etc on actors only show in side-view.)
 *
 *  • Q03: Extends the pause menu status screen:
 *           - Display different actor param values (see plugin parameter).
 *           - Allow selection & scrolling of param/equip sub-windows.
 *           - Add new sub-windows in a horizontally-scrolling "belt".
 *
 *         New status sub-windows display element rates and state rates.
 *         Element/state names are matched against patterns to affect display:
 *           - The EXCLUDE pattern hides that element/state.
 *           - The HEADING pattern centres the name and hides its rate.
 *         If all elements/states are excluded, that window will not appear.
 *
 *         This feature has several parameters for customisation.
 *
 *  • Q04: Skips blank Show Text messages.
 *         By default, affects all standard $gameMessage calls.
 *         Can be set to only affect standard battle start messages.
 *
 *  • Q05: Shows MHP, MMP, HIT, and EVA params on equip scene.
 *         Also shows active state/buff icons.
 *         Replaces equip scene face with a background portrait.
 *           - Portrait: "img/pictures/<faceName>_<faceIndex+1>".
 *           - E.g. "img/pictures/Actor1_1" for the 1st face of set "Actor1".
 *
 *  • Q06: Pauses audio & video when game loses focus.
 *         Normally the game pauses only its mechanical loop and Effekseer.
 *
 *  • Q07: Disables WindowLayer masking.
 *         This means game windows may be seen under other game windows.
 *         E.g. when selecting an actor target in battle or from inventory.
 *         It typically improves rendering times.
 *
 *  • Q08: Select final item when cursorDown fails in selectable windows.
 *         E.g. if the last item is in the first column:
 *           => it can now be selected by scrolling down in ANY column.
 *
 *  • Q09: Process text codes in any game window.
 *         This will disable horizontal text "squashing" in narrow areas.
 *         Legacy mode will affect only the currency & enemy select windows.
 *         Note that this does not affect refresh timings, e.g.
 *           - \v[x] will not necessarily redraw when variable x changes.
 *
 *         Known limitations:
 *           - Sprite_Name (battle status) only accepts "convert" codes.
 *             E.g. \i[n] and \c[n] will be removed, but \v[n] will work.
 *           - Other sprites, e.g. gauge labels, do not support text codes.
 *
 *  • Q10: Disables map fast-forward behaviour, i.e.
 *         2x speed while OK/touch is long-pressed during non-Parallel event.
 *
 *  • Q11: Adds notetags for Skills, Items, or any trait-bearing object:
 *           - <attack anim base: X>
 *               E.g. <attack anim base: 5>.
 *               Defines base attack animation ID.
 *               Combines with default attack animation ID.
 *               The highest value from default and tags is used.
 *           - <attack anim plus: X>
 *               E.g. <attack anim plus: 2>.
 *               Defines additive offset to attack animation ID.
 *               Ignored if base animation ID is 0 (i.e. None).
 *               The highest value from all tags is used (default +0).
 *         Tags on Skills/Items take priority over trait objects.
 *         Offsets are designed for use with elemental power-ups.
 *
 *         Also, enemies now have attack animations (default ID 1).
 *
 *  • Q12: Show "Quit Game" command on title and via pause menu.
 *         Closes the game window, ending the play session.
 *         Does not apply for web games.
 *
 *  • Q13: Show weather effects in battle.
 *         Also enables the Change Weather command in battle.
 *
 *  • Q14: Adds some new text codes for use in Show Text:
 *           - \AF[n]          (e.g. \af[1] for actor 1's face)
 *               Redraws message face as actor ID n.
 *           - \PF[n]          (e.g. \pf[1] for leader's face)
 *               Redraws message face as party member n: 1 = leader.
 *           - \S[n]           (e.g. \s[5] for slower text)
 *               Sets wait time between characters: min 1 frame.
 *           - \ALIGN[0|1|2]   (e.g. \align[1] for centre)
 *               Aligns message text to left|middle|right respectively.
 *         Feature D16 is recommended if using text alignment.
 *
 *  • Q15: Visually group duplicate drops in battle reward message.
 *         Formatting can be customised with the plugin parameter.
 *
 *  • Q16: Adds in-game option to toggle audio dynamic range compression.
 *         This reduces the volume difference between quiet and loud sounds.
 *         Compressor settings & option display are adjustable via parameters.
 *
 *  • Q17: Adds a help window to the options scene.
 *         Customise descriptions via the plugin parameter.
 *         The preset values support all defaults and extras from this plugin.
 *
 *  • Q18: Adds notetag for enemies, on Enemy or State objects:
 *           - <ghost: X>
 *               E.g. <ghost: 0.8>   = show affected enemy at 80% opacity.
 *         When multiple tags apply, their values multiply.
 *
 *  • Q19: Render at integer coordinates only, to avoid blurring.
 *         E.g. centred Show Choices can become blurred in certain situations.
 *
 *  • Q20: Show remaining turns on state/buff icons in battle.
 *         A state with:
 *           - No auto-removal timing will show the Unlimited Turns value.
 *           - A <hide turns> notetag won't show its remaining turns.
 *
 *  • Q21: Applies low-pass filter for BGS on maps with notetag <muffleBGS>.
 *         Designed to create a "muffled" effect, e.g. for indoors rain BGS.
 *
 *  • Q22: Moves all enemies toward the bottom of the screen.
 *         Normally you can't place enemies behind the status window at all.
 *         Damage popups are adjusted to avoid showing behind that window.
 *
 *  • Q23: Applies draw offsets to tiles based on their terrain tag.
 *         Does not affect passability.
 *         E.g. half-tile offset down for more natural furniture positions.
 *         Tiles offset left or down draw on top of other tiles on that layer.
 *
 *         Also adds note/comment tag for events:
 *           - <offset: X, Y>
 *               E.g. <offset: 0, 24>   = place sprite 24 px further down.
 *               Character will be visually offset by +X px, +Y px.
 *         For tile events, both tile and tag offsets apply.
 *
 *  • Q24: Hide MP or TP gauges with a maximum value of 0.
 *         E.g. as seen in the pause menu and battle status.
 *
 *  • Q25: Display fixed-value segments for (selected) gauges.
 *         Value per segment can be customised via the plugin parameter.
 *
 *  • Q26: Shows a "saving" indicator image when the game saves.
 *         The image fades in, then fades out.
 *         Other aspects can be customised via the plugin parameters.
 *
 *         If the image is in "img/system/", it will remain in cache.
 *
 *  • Q27: Touch UI will immediately hide when turned off in the options.
 *
 *  • Q28: If config file is not found on boot, options will show first.
 *         On exiting options, user settings are saved to the config file.
 *
 *  • Q29: Show 1+ splash screen(s) before the title.
 *         Each one can use a static image (fade in/out) or a video.
 *         Each one can play an ME track on start, and/or a BGM track.
 *         Configure these in the plugin parameters.
 *
 *         Will show before the built-in splash (v1.8.0), if that is enabled.
 *
 *  • Q30: Show gauges (e.g. HP) for enemies in battle.
 *         Adds notetags for Enemies:
 *           - <gauge offset: X, Y>
 *               E.g. <gauge offset: 50, -100>
 *               Move this enemy's gauges an extra 50 px right & 100 px up.
 *           - <gauge width scale: X>
 *               E.g. <gauge width scale: 1.2>
 *               This enemy's gauges will be 120% of the usual width.
 *         Various settings can be configured in the plugin parameters.
 *
 *  • Q31: Move with WASD or arrows.
 *         Maps E to "pagedown", because normally W is "pagedown".
 *
 *  • Q32: Adds event notetag for sprite hue shift:
 *           - <hue: H, D>
 *               E.g. <hue: 50>     = shift hue by a constant +50°.
 *               E.g. <hue: 0, 2>   = hue starts at 0°, +1° every 2 frames.
 *
 *  • Q33: Show Text in a Parallel event will act as a background/auto-message.
 *         The window fades in/out, with the text displayed immediately.
 *         Text codes specific to Show Text, e.g. \$, will generally not work.
 *
 *         Special text code properties:
 *           - \AF[n]   Sets auto-message face to actor ID n.
 *           - \PF[n]   Sets auto-message face to party member n (1 = leader).
 *           - \^       Continue this event while the auto-message is showing.
 *                      E.g. to queue multiple auto-messages at once.
 *           - \.       Additional "short" duration (see below).
 *           - \|       Additional "long" duration (see below).
 *           - \!       Wait until next auto-message instead of fixed duration.
 *
 *         Message duration is determined by a plugin parameter.
 *         There are 3 durations to specify:
 *           - Base:  minimum duration for all auto-messages.
 *           - Long:  additional duration per use of \| in the message.
 *           - Short: additional duration per use of \. in the message.
 *
 *  • Q34: Represents cast time as an overlay on the TPB charge gauge.
 *
 *  • Q35: Adds 2 notetags for any trait-bearing object.
 *           - <death var: X, Y>
 *               E.g. <death var: 2, 1>
 *               Adds Y to variable ID X when the bearer dies.
 *               If Y is omitted, a value of 1 will be used.
 *           - <death anim: X>
 *               E.g. <death anim: 120>
 *               Plays animation ID X on the bearer when they die.
 *         These tags help to avoid the Immortal state workaround.
 *
 *  • Q36: Show Picture "snapshot.png" takes a snapshot of the scene.
 *         That snapshot can be moved etc with the usual picture controls.
 *
 *         Up to 1 snapshot can exist per picture ID.
 *         Delete a snapshot using Show Picture or Erase Picture on that ID.
 *         Existing snapshots are included in save data.
 *
 *         Supports optional filename prefixes "$" and "!".
 *         E.g. "!snapshot.png", for compatibility with feature D13.
 *
 *         This feature does not offer export of snapshots to disk.
 *
 *         Known issue: when swapping for a snapshot, the previous image may
 *            briefly display with the snapshot's coordinates/origin/etc.
 *
 *  • Q37: Adds closed orbital motion note/comment tag for events.
 *         <orbit: id, R, T, A>:
 *           - id   ID of character to orbit:
 *                     1+ = event ID,
 *                     0  = screen centre,
 *                    -1  = player,
 *                    -n  = follower n-1 (-2 = first follower, etc).
 *           - R    Radius of circular orbit (px).
 *                  Optional. If omitted: 1 tile.
 *                  Sign affects direction: ↻ > 0, ↺ < 0.
 *                  Alternatively, can be written as Rx:Ry (elliptic orbit).
 *                  Rx = X radius, Ry = Y radius. Same-sign ↻, else ↺.
 *           - T    Period of simple orbit (frames).
 *                  Optional. If omitted: 60 frames.
 *                  Alternatively, can be written as Tx:Ty.
 *                  Tx = X period, Ty = Y period.
 *           - A    Inclination of orbit's X axis (degrees).
 *                  Optional. If omitted: 0°.
 *                  No effect for simple circular orbits, due to symmetry.
 *
 *         Some examples:
 *           - <orbit: -1, 48, 120>
 *               Orbit player, 48 px ↻ circle, 1 cycle every 120 frames.
 *           - <orbit: 4, 96:0, 60, 45>
 *               Orbit event 4, 96 px ↘diagonal↖, 1 cycle every 60 frames.
 *           - <orbit: -1, -200, 100:125>
 *               Orbit player, 200 px radius ↺ loop, 1 cycle every 500 frames.
 *
 *         An orbit event will trigger on collision with the player if:
 *           - It has trigger Player Touch or Event Touch; and
 *           - It has at least 1 command on its active page.
 *         Be careful to change page or something to avoid a soft-lock.
 *
 *  • Q38: Changes dash behaviour for touch-based movement.
 *         Now touch must be released before selecting a new move destination.
 *         This avoids unintended movement due to map scroll.
 *
 *         Optionally adds a new "dash" input: long-press touch while moving.
 *         The default dash inputs are:
 *           - Holding the "shift" button.
 *           - The "Always Dash" option.
 *         If 1 or 3 of these are met, the player will dash.
 *         If 0 or 2 of these are met, the player will walk.
 *
 *  • Q39: Shows skill names for Attack and Guard battle commands.
 *         Skill icons show if the database command name starts with "\i[".
 *
 *  • Q40: Plays the Cursor SE when hover-selecting with touch/mouse.
 *
 *  • Q41: Colour map lighting scene shader. No shadow-casting.
 *         Implements 2 render modes: hard- and soft-edge.
 *         These can be toggled between using an in-game option.
 *
 *         Mark a map as "dark" using this map notetag:
 *           - <dark: r, g, b, a>
 *               Replace r, g, b, and a with red/green/blue/alpha (0~255).
 *               Defines the colour & opacity of darkness for this map.
 *               E.g. <dark: 0, 0, 51, 192> is dark blue, ~75% opacity.
 *           - <dark: r, g, b>
 *               Equivalent to <dark: r, g, b, 255>, i.e. opaque colour.
 *           - <dark: s>
 *               Equivalent to <dark: s, s, s, 255>, i.e. opaque monochrome.
 *           - <dark>
 *               Equivalent to <dark: 0, 0, 0, 255>, i.e. opaque black.
 *
 *         Lights can be designated for:
 *           - Events, via notetag or comment tag.
 *           - Trait-bearing objects, via notetag.
 *         The tag is <light: radius, r, g, b, a, dir>:
 *           - radius  Radius of light source (px).
 *           - r       Red value (0~255).
 *           - g       Green value (0~255).
 *           - b       Blue value (0~255).
 *           - a       Intensity/alpha (0~255).
 *           - dir     0 for point source, 1 for FoV arc.
 *         Examples:
 *           - <light: 96, 255, 255, 255, 51>
 *               20% white, 96 px radius, point source.
 *           - <light: 192, 255, 255, 0, 128>
 *               50% yellow, 192 px radius, point source.
 *           - <light: 300, 128, 0, 255, 128, 1>
 *               50% blue/blue/red, 300 px radius, frontal arc.
 *
 *         The notetag <dim: X> reduces the bearer's <light> intensity.
 *         This tag is for any trait-bearing object on actors.
 *         On the party leader, it will also affect the natural FoV.
 *         E.g. <dim: 50> => -50 to intensity/alpha of all bearer's sources.
 *         Resultant intensity will be clamped to the range 0~255.
 *
 *         Various aspects can be customised via the plugin parameters.
 *         There are plugin commands to set/reset the dark colour mid-game.
 *
 *  • Q42: Skips Buy/Sell/Cancel for purchase- or sell-only shops.
 *         In this case, a "sell-only" shop is one that:
 *           - Is not marked Purchase Only; and
 *           - Has no goods for sale.
 *
 *  • Q43: Adds a Game Speed in-game option.
 *         E.g. for accessibility or speedruns.
 *         To reduce audio desync, consider also enabling feature D07.
 *
 *  • Q44: Places the Guard actor battle command immediately below Attack.
 *
 *  • Q45: Show vertical scroll indicators on eligible selectable windows.
 *         Appearance can be customised via plugin parameters.
 *
 *  • Q46: Remodels the main window on the status scene:
 *           - Stretches gauges to fill more space.
 *           - Optionally replaces "EXP To Next" with "EXP For Next".
 *           - Optionally adds a new EXP gauge.
 *         Can be customised via the plugin parameters.
 *
 *  • Q47: Adds an in-game option to toggle full-screen.
 *         Should track any fullscreen change (e.g. F4) and update accordingly.
 *
 *  • Q48: Custom cursor PNG, with optional "press" and "cancel" variants.
 *         Offers optional in-game setting to let the player choose a cursor.
 *         An inactivity period can also be set, after which the cursor hides.
 *
 *         Recommended maximum size is 32x32 px for security/compatibility.
 *         E.g. see the fixed Chromium issues linked here:
 *           - https://bugs.chromium.org/p/chromium/issues/detail?id=1246188
 *
 *  • Q49: Adds various choice-related options, configurable via parameters:
 *
 *           - Vertically centre "message free" choices relative to the screen.
 *             (Normally choices locate at the message, even if it's closed.)
 *
 *           - Horizontally align choice text to match its window.
 *
 *           - Merge consecutive Show Choices commands.
 *             The first command in a merged block decides style, align, etc.
 *             For Cancel: Branch, all cancel branches will trigger, in order.
 *
 *           - Hide and/or disable choices with plugin commands.
 *
 *           - Randomly shuffle the displayed order of choices.
 *             Toggle on/off with a plugin command.
 *
 *           - Show choices inlined within the message window, if present.
 *             Toggle on/off with a plugin command.
 *
 *           - Show a simple help window with different text for each choice.
 *             Help text is defined in a "Comment" immediately after "When X".
 *             E.g. Comment: Help:
 *                  :      : This is a good choice!
 *                  :      : You should definitely pick it.
 *             The help window will be hidden for choices that lack help text.
 *
 *  • Q50: Menu arrangement settings:
 *           - Alternative command position  (right ↔ left).
 *           - Alternative help position     (bottom ↔ top).
 *           - Alternative Touch UI position (top ↔ bottom).
 *           - New "mini-help" window between Touch UI buttons on menu scenes.
 *
 *         The mini-help window shows user-defined text on a per-scene basis.
 *         Text is defined via a generator function.
 *         This allows showing a (potentially endless) sequence of texts, e.g.
 *             yield "Hello!";
 *             yield "This is a menu.";
 *             return "";
 *         The text update frequency can be adjusted in the plugin parameters.
 *         The window will only remain open while its text is not blank.
 *
 *  • Q51: Adds a master volume setting to the in-game options menu.
 *
 *  • Q52: Adds customisable categories to the in-game options menu.
 *         See the plugin parameters for details.
 *
 *  • Q53: Adds a \T message text code that allows for "hover tips".
 *         E.g. Show Text: Would you like a \T[cookie]?
 *         Displays as:   "Would you like a cookie?"
 *         However, if you hover the word "cookie", a tip can appear.
 *         E.g. cookie -> "A tasty snack that restores \c[23]50 MP\c[0]."
 *
 *         This feature's plugin parameters let you:
 *           - Define hover tips for given \T[phrases];
 *           - Define a button to navigate through tips, in order;
 *           - Customise the appearance of the tip window.
 *
 *         By default the hover tip will "cut through" other windows behind it.
 *         Feature Q07 is recommended to avoid this.
 *
 *  • Q54: Customise in-game option display values:
 *           - Optionally replace the "ON" and/or "OFF" texts.
 *           - Optionally add background gauges for volume options.
 *         See the plugin parameters for details.
 *
 *  • Q55: Optionally adds state overlays for:
 *           - Enemies in battle; and
 *           - Party members on the map.
 *
 *
 *  • D01: Troop events from troop 1 are prefixed to all troops.
 *
 *  • D02: Adds a line-of-sight method to Game_CharacterBase:
 *           - char1.los(char2, fov) => true|false
 *         Line-of-sight is blocked based on plugin parameters:
 *           - Opaque Regions  = a list of region IDs; and
 *           - Is LoS Blocked  = a scripted function.
 *         By default, "Is LoS Blocked" counts these as blocking:
 *           - "Shadowing" tiles, i.e. walls and wall-tops; and
 *           - Characters that could collide with the observer.
 *
 *         Script call examples:
 *           - Can the player see map event 5, default FoV?
 *               $gamePlayer.los($gameMap.event(5))                  [anywhere]
 *           - Can the character being moved see the player, 60° FoV?
 *               this.los($gamePlayer, 60)                         [move route]
 *           - Can This Event see the player, 150° FoV?
 *               this.character(0).los($gamePlayer, 150)       [Script command]
 *
 *         Optionally enables a <los> comment/note tag for events.
 *         This triggers a result when the event sees the player.
 *           - <los: result>
 *               Single result, default range, default FoV.
 *           - <los: result, range>
 *               Single result, specified range (px), default FoV.
 *           - <los: result, range, fov>
 *               Single result, specified range (px), specified FoV (degrees).
 *           - <los: result, result, range, fov>
 *               Multiple results, etc.
 *         Replace "result" with one of the following:
 *           - 0    => trigger this event;
 *           - 1+   => turn on that switch;
 *           - A~D  => turn on that self-switch.
 *         If "range" or "fov" are 0, their defaults will be used instead:
 *           - Default range = infinite;
 *           - Default FoV   = plugin parameter.
 *         Examples:
 *           - <los: 4>
 *               Turn on switch ID 4 when the player is seen.
 *           - <los: B, 200>
 *               Turn on self-switch B when the player is seen within 200 px.
 *           - <los: 0, 0, 90>
 *               Trigger this event on seeing the player in a 90° frontal arc.
 *           - <los: 25, 0, 240, 0>
 *               Turn on switch 25 then trigger this event; 240 px range.
 *         Sight is checked every frame: be careful of soft-locks!
 *
 *  • D03: Adds a safety check for when the ConfigManager fails to save.
 *         E.g. for web games, when the browser denies local storage access.
 *         That typically causes the game to crash.
 *         This feature catches the error and shows a message instead.
 *
 *  • D04: Effects from Item 1 are prefixed to all other Items and Skills.
 *
 *  • D05: Normally _targetIndex is always -1 (random) for enemy actions.
 *         This feature sets _targetIndex when appropriate.
 *         This makes no difference by itself.
 *         Recommended for compatibility with features like M17 (follow-ups).
 *
 *  • D06: Tracks multiple HP, MP, and/or TP changes per action result.
 *         Test case: any action with multiple HP/MP/TP changes, e.g.
 *           - Formula + effect.
 *           - Multiple effects.
 *         Normally all changes are applied, but only the latest one is shown.
 *         This feature adds the results together so the total is displayed.
 *
 *  • D07: Affects audio pitch:
 *           - Changing the pitch of a playing track will not make it restart.
 *           - Pitch will scale with the app's ticker speed, to avoid desync.
 *
 *  • D08: Opposed pairs of "Last" data will reset one another, i.e.
 *           - Setting "Last Used Skill"    will set "Last Used Item"     to 0.
 *           - Setting "Last Subject Actor" will set "Last Subject Enemy" to 0.
 *           - Setting "Last Target Actor"  will set "Last Target Enemy"  to 0.
 *         ...and vice versa.
 *
 *  • D09: Allows drawing faces from enemy images.
 *         Face "$NAME$X-Y-S.png" will draw:
 *           - A face-sized output area;
 *           - With source top-left at (X, Y);
 *           - From "img/enemies/subfolders/NAME.png";
 *           - Upscaled by factor S (optional).
 *         X, Y, and S must be non-negative integers.
 *         Only 1 such face can exist per enemy image.
 *
 *  • D10: When an enemy picks skill 1, they'll use their current Attack skill.
 *         When an enemy picks skill 2, they'll use their current Guard skill.
 *
 *  • D11: Tile events contribute flags associated with their tile.
 *         Flags: ladder, bush, counter, damage floor.
 *
 *  • D12: Adds plugin commands to force party/troop advantage for next battle.
 *         Resets on:
 *           - Battle start.
 *           - New/Load game.
 *           - End of play session.
 *         Designed to be used immediately before a Battle Processing command.
 *
 *  • D13: Show Picture "!picture.png" pins to the map instead of the screen.
 *         Note that Show/Move Picture use screen coordinates, regardless.
 *
 *  • D14: Support showing left/right arrows on game windows.
 *         This is a resource, it does nothing by itself.
 *         Feature Q03 will use this if available.
 *
 *  • D15: Includes trace in applicable error messages in-game.
 *         Automatically opens dev tools on error during playtest.
 *         Also adds a "Copy to Clipboard" button for ease of reporting.
 *
 *         For a test case, you can try this in a Script command:
 *            throw new Error("Oh no!");
 *
 *  • D16: Prevents processing message text codes during measurement.
 *         This has no in-game effect by itself.
 *         Recommended for use with Q14 due to its alignment checks.
 *
 *  • D17: Merges BGM Volume and ME Volume into a single setting.
 *         Removes ME Volume from the in-game options menu.
 *         Reasoning:
 *           - MEs will generally be volume-balanced with their BGMs.
 *           - Many players don't know what a Music Effect is.
 *           - Simpler UI due to 1 less in-game option.
 *
 *  • D18: Adds troop name tag <add: X, X, X>.
 *         E.g. <add: 5, 6>.
 *         Adds all enemies from those troop IDs to this troop.
 *         Designed to bypass the editor's limit of 8 enemies per troop.
 *         Enemies will NOT be automatically repositioned.
 *
 *  • D19: Allows multiple move commands to process per frame.
 *         "Long" moves are commands that take 1+ frames to complete:
 *           - Move Up/Down/Left/Right/diagonal.
 *           - Jump.
 *           - Wait.
 *         All other move commands are considered to be "short".
 *         Requirements for a move command to immediately go to the next:
 *           - Command did NOT cause route to change; and
 *           - Command caused route index to change; and
 *           - Command movement succeeded (if short) or failed (if long).
 *
 *  • D20: Adds plugin command for enemy reinforcements.
 *         This adds all enemies from the specified troop, mid-battle.
 *         Enemies will NOT be automatically repositioned.
 *
 *  • D21: Adds plugin commands for synchronous save/load. Example uses:
 *           - a save point that saves to the most recent slot;
 *           - a scripted "autosave";
 *           - a forced reload after defeat by a boss.
 *         Also allows excluding autosaves from the Save Count statistic.
 *
 *  • D22: Normally, switches/variables fire onChange when they change value.
 *         That tells the map to refresh at the start of the next frame.
 *         A map refresh includes checking all event page conditions.
 *         HUD plugins etc might also update based on this.
 *
 *         This feature lets you skip onChange for specific switches/variables.
 *         It is based on a pattern matched against the switch/variable name.
 *         The default pattern is "^#", matching any name starting with "#".
 *
 *         This is designed for switches/variables that:
 *           - update often (e.g. a background timer); and
 *           - are never used as event page conditions.
 *
 *  • D23: Replaces Math.randomInt with a cryptographic source (CSPRNG).
 *         This affects sources like Control Variables > Random.
 *         It requires more CPU than the usual method.
 *         It's mostly experimental.
 *         If your game has a LOT of randomness, this may be worth trying out?
 *
 *         Technically, compared to a PRNG, a CSPRNG produces results that:
 *           - meet a higher standard of statistical randomness; and
 *           - are less mutually-dependent.
 *         More details:
 *      https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 *
 *  • D24: Adds plugin commands to precache maps, images, and/or audio.
 *         Resources can also be precached on game boot via plugin parameters.
 *         Resources cached like this persist until uncached (plugin command).
 *         Remember to uncache resources to free memory when appropriate!
 *
 *         Events already preload their facesets and pictures when they start.
 *         This uses the normal image cache, which clears on map transfer.
 *
 *         Images from "img/system/" are already persistently cached.
 *         Request once and they'll stay loaded for the rest of the session.
 *
 *         Audio is cached into static buffers:
 *           - normally an SE can play another instance before the first ends.
 *           - a static SE cannot have more than 1 instance playing at a time.
 *         System audio (Database > System 1) is already cached like that.
 *
 *  • D25: Normally Auto Battle only considers usable skills and Attack.
 *         With this feature, an actor will also consider their Guard skill.
 *
 *  • D26: Allows specifying custom default values for core options.
 *         E.g. make BGM Volume default to 20% instead of 100%.
 *
 *  • D27: Move Toward (and/or Away From) Character moves can use pathfinding.
 *         The search limit can be changed via a plugin parameter.
 *         Default limit is 12 tiles; path away will only use half the limit.
 *
 *         This feature uses the core, 4-directional, A* algorithm.
 *         Path away uses a similar algorithm with an inverted heuristic.
 *         Plugins that change the core algorithm will only affect path toward.
 *
 *         Some links for more details:
 *           - https://forums.rpgmakerweb.com/threads/167088/
 *           - https://qiao.github.io/PathFinding.js/visual/
 *           - https://theory.stanford.edu/~amitp/GameProgramming/
 *
 *
 * ============================================================================
 *                              UPDATE LOG (UTC+0)
 * ============================================================================
 *   v16 (2024-12-19) - NEW: M38, Q51, Q52, Q53, Q54, Q55, D27.
 *                      ALL: added "Check for Duplicates" param for Tag Names.
 *                      M08: Popup Colour now accepts CSS via the Text tab.
 *                      M11: now uses addCommand, not just splice (cf Q52).
 *                      M19: added cache system and corresponding plugin param.
 *                      M23: added Grow effect inversion & sub-params.
 *                      M28: added "Load Select Autosave" plugin parameter.
 *                      M29: now uses RegExp to check cost body for "return".
 *                      M35: adding command at Index = 0 now works correctly.
 *                      M36: "Retry" now checks same-playthrough & autosave.
 *                      Q01: micro-optimisation for step size 1.
 *                      Q12: now uses addCommand, not just splice (cf Q52).
 *                      Q17: modularised the options window bounds calculation.
 *                           added default description for Q51.
 *                      Q26: now passes save errors on for further processing.
 *                           now immediately hides the indicator on save fail.
 *                      Q28: now uses "StorageManager.exists" for efficiency.
 *                           now disabled if "Skip Title Screen" is on.
 *                      Q37: modularised screen centre orbit calculation.
 *                      Q43: added safety checks for short "Speed Values" list.
 *                      Q45: scrollbar colour now accepts CSS via the Text tab.
 *                      Q48: added "Idle Hide Time" parameter.
 *                      D12: added "Save Data" parameter.
 *                      D17: accessors are now patched, not just replaced.
 *                      D21: added "Track Failed Saves" parameter.
 *   v15 (2024-08-17) - NEW: D26.
 *                      M26: should no longer apply twice to map followers.
 *                      Q03: fixed default value for parameter "Param Names".
 *                      Q08: fixed - it was broken by a typo added in v14.
 *                      Q09: addressed drawText alignment for RTL text.
 *                      Q16: added parameters "Settings" & "Invert Value".
 *                      Q31: added parameter "Log Key Codes".
 *                      Q32: added parameter "Hue Property"; restructured code.
 *                           event hue can now persist through save/load.
 *                           now also supports comment tags.
 *                      Q47: fixed issues re booting into fullscreen with NWJS.
 *                      Q49: accounted for nested choices in merge and help.
 *                      Q50: fixed mini-help position conflicts on name input.
 *                           made minor edits to default mini-help texts.
 *                      D21: now uses a request system to avoid mid-frame load.
 *   v14 (2024-04-05) - NEW: M36, M37, Q50.
 *                      ALL: added "Tag Names" plugin parameter.
 *                      M09: "Default Max TP" now correctly skips if blank.
 *                      M13: should actually work now. (Did I forget to test?)
 *                           added "Max Multiplier" parameter.
 *                      Q03: fixed element/state heading alignment from v13.
 *                           language removed from "Param Names" parameter!
 *                      Q08: no longer applies on last row, e.g. Input Number.
 *                      Q09: fixed \{, \}, and \fs[n] (broken since v06).
 *                      Q17: now accounts for layout changes, e.g. Q50.
 *                           now supports %1 = symbol in "Unknown Description".
 *                           language removed from "Descriptions" parameter!
 *                      Q23: now caches correctly for untagged events.
 *                      Q25: replaced "Empty Partitions" w/ "Partition Colour".
 *                      Q37: added support for character 0 = screen centre.
 *                      Q49: multiple merges no longer spill within an event.
 *                           now no-Q07 inline patch only applies when inlined.
 *                           made inline choice width independent of Touch UI.
 *                      D02: now "Is Los Blocked" should actually apply (typo).
 *                           <los> no longer breaks on same-map load.
 *                      D21: added "Track Autosaves" parameter.
 *   v13 (2024-03-20) - NEW: M34, M35, Q49.
 *                           Utils namespace, including boot-patch framework.
 *                      ALL: streamlined parameter parsing.
 *                           added Toggle Skip support for comment <tags>.
 *                           rewrote quick reference for tags.
 *                      M07: added counter/reflect, enemy drops & escape ratio.
 *                           now has parameters for sub-feature selection.
 *                      M08: added state for any battler with TP > 0.
 *                           added crit effect for block popups.
 *                      M09: now tpRate (not used in core) is 0 if max TP is 0.
 *                      M16: now performs Recover All on actor copy.
 *                           now bestows actor's guard skill as well.
 *                      M17: Auto Battle now evaluates follow-ups.
 *                      M20: cast states now remove on cast end (reverts v04).
 *                           now supports multiple cast states per tag.
 *                      M22: added battler refresh triggers.
 *                      M25: now triggers battler refresh for <no weapon>.
 *                           added trigger to account for animation.
 *                           added check for M16 actor references.
 *                      M29: fixed cost-stacking bug for good *touch wood*.
 *                      M30: added "Image Override" parameter.
 *                      M31: fixed event-locking behaviour on follower trigger.
 *                      M32: fixed a typo...the parameter shows up now. O_o
 *                      M33: now enemies should recognise their added skills!
 *                           fully implemented <ai strictness: X> trait tag.
 *                           corrected a mix-up with the Min/Max combine rules.
 *                      Q02: offsets now affect home XY, not just popup XY.
 *                      Q03: no longer requires Q09 to show rates/resists.
 *                           added "Show State Icons" parameter.
 *                      Q11: added "No Offset Anim Pattern" parameter.
 *                      Q14: \align no longer modifies startX.
 *                      Q23: implemented caching and comment tag support.
 *                      Q26: now indicator image is sourced from "img/system".
 *                      Q30: missing <gauge offset> value(s) are now 0.
 *                           added "Show Gauge Value" parameter.
 *                      Q33: now auto-messages are layered under existing UI.
 *                           fixed a logic error regarding \! (wait for next).
 *                      Q37: added safety check for malformed notetags.
 *                           now supports comment tags as well as notetags.
 *                      Q41: added <dim: X> trait tag.
 *                           fixed a logic error in culling off-screen lights.
 *                      Q45: scrollbars now only show on open windows.
 *                      Q48: now cursor images are sourced from "img/system".
 *                      D02: added "Is LoS Blocked" & "Debug Text" parameters.
 *                           added <los: result, range, fov> event tag.
 *                      D07: added "Scale with Game Speed" parameter.
 *                      D12: now force surprise cancels random preemptive & vv.
 *                      D15: now reads button style at runtime.
 *                      D23: added "Integer Only" parameter.
 *                      D24: audio cache should now use the correct keys!
 *   v12 (2024-02-06) - NEW: M33, D25.
 *                      Q33: now auto-adjusts height based on text line count.
 *                           added "Min Rows" parameter.
 *                           added \! text code = show until next auto-message.
 *                           small right-hand margin adjustment for RTL text.
 *                      Q36: fixed crash related to Erase Picture.
 *                      Q41: added plugin commands to set/reset dark colour.
 *                      D21: save via 1-line Script no longer skips 1 command.
 *   v11 (2024-01-30) - NEW: Q48, D21, D22, D23, D24.
 *                      M08: added 4 plugin params to customise block popups.
 *                      M11: added plugin commands for per-playthrough setting.
 *                           now option is hidden if display text is blank.
 *                      M27: added "Battle Only" parameter & menu restriction.
 *                      M29: preset MP, TP, & HP costs now use database Terms.
 *                      Q02: added 2 plugin params for damage popup offsets.
 *                      Q12: no longer forces adding command in both places.
 *                      Q29: constructor renamed to "Scene_SplashCae".
 *                           now uses "img/system/Splash" by default.
 *                      Q34: now redraws only when cast charge has changed.
 *                           added "Gradient Fill" plugin parameter.
 *                      Q36: documented a known issue when replacing snapshot.
 *                      Q38: added "Hold Touch to Dash" plugin parameter.
 *                      D13: now works correctly with new game & save/load. .^.
 *                      D15: added "Font Size" plugin parameter.
 *   v10 (2023-12-18) - NEW: D20.
 *                           refactored Q03, Q05, Q24, Q26, Q29, Q30, Q33, Q41.
 *                      M08: added battle log messages for blocked damage.
 *                           added "Refill TP" parameter.
 *                      M16: now deep-clones actor, e.g. for mirror battles.
 *                      M29: fixed a minor typo in some preset cost types.
 *                      M30: fixed "Always Show" parameter to work as intended.
 *                      Q03: now hides state/element windows with no entries.
 *                           now displays 0% rate for resisted states.
 *                      Q04: now skips any blank message (added legacy toggle).
 *                      Q29: BGM/ME splash audio plugin params should now work!
 *                      Q36: now supports multiple prefixes, e.g. "$!snapshot".
 *                      D18: added failsafe for non-existent troop IDs.
 *   v09 (2023-10-27) - ALL: added plugin parameters & commands, rewrote help.
 *                      NEW: M31, M32, Q47, D16, D17, D18, D19.
 *                      M07: no longer affects hit chance for Certain Hit.
 *                      M22: changed stacks = floor(turns / X) to ceil.
 *                      M27: removed Item skill type from skill scene.
 *                      M28: now changes maxSavefiles count, for consistency.
 *                      M29: fixed typos in preset "var" skill cost type.
 *                           fixed MP/TP stacking on skill scene actor change.
 *                      Q03: TRG and Sp-params now display correct values.
 *                           can now show element/state rate as resistance.
 *                           added (de)buff colours for Ex- and Sp-params.
 *                      Q09: Sprite_Name now supports pre-draw text codes.
 *                      Q14: added \align[0|1|2] message code: left|mid|right.
 *                           now \af and \pf can be set to only use face name.
 *                           updated for compatibility with new feature D16.
 *                      Q30: added notetags for per-enemy gauge offsets/widths.
 *                      Q33: can now use \. and \| to extend display duration.
 *                           now \af and \pf can be set to only set face name.
 *                      Q37: now only Touch-trigger events can orbit-trigger.
 *                           orbit events can now animate & proc move routes.
 *                           now a single negative radius => anticlockwise.
 *                      D12: the script calls are now plugin commands.
 *   v08 (2023-09-29) - NEW: M29, M30.
 *                      Q03: param names now use the system colour as usual.
 *                           optional icon prefix for state rates.
 *                           changed element/status "heading" name regex.
 *                      Q05: added basic "portrait = enemy" support for D09.
 *                      Q06: should now pause audio as intended in all cases.
 *                           now pauses video as well (click to resume).
 *                      Q09: now should correctly measure visible text width.
 *                           accounted for showing text codes via \G, \N, \P.
 *                      Q14: now \af[n] & \pf[n] only proc when drawn.
 *                      Q28: cleaned up the title-to-options transition.
 *                      Q29: now supports video splashes, BGM, and ME.
 *                      Q30: now enemy gauges refresh when enemy image changes.
 *                      Q32: now <hue: 0, D> will cycle as intended.
 *                      Q33: now \af[n] & \pf[n] only proc when drawn (auto).
 *                      Q46: new optional EXP gauge & "to next" -> "for next".
 *                      D09: now draws the correct sub-area in narrow spaces.
 *   v07 (2023-09-22) - NEW: M27, M28, Q42, Q43, Q44, Q45, Q46, D14, D15.
 *                      Q03: major rewrite - now supports "belt" of subwindows.
 *                           navigate belt with left/right or click & drag.
 *                           shows new windows in belt: element & state rates.
 *                      Q05: tidied up portrait alignment.
 *                      Q09: added rounding to fix potential alignment blur.
 *                      Q14: renamed \a[n] to \af[n]; \pf[n] => party face.
 *                      Q16: added optional ON/OFF text replacers.
 *                      Q17: now reduces options window max height by 1 row.
 *                      Q21: patched theoretical preload/redirect BGS bug.
 *                      Q25: now gauges should not fill behind partitions.
 *                      Q33: now parallel nameboxes should display correctly!
 *                           use \^ in parallel text to queue without waiting.
 *                           native support for \af[n] and \pf[n], as in Q14.
 *                      Q34: now the charge time overlay should fill to 100%.
 *                      Q36: now supports prefixes !$, e.g. !snapshot.png.
 *                      Q39: now shows icon if database term starts "\i[".
 *                      Q40: now respects "isHoverEnabled".
 *                      Q41: now does not obscure pictures/timer/weather.
 *                      D05: now patches on boot for compatibility with D10.
 *                      D07: now scales audio pitch with tick rate (cf Q43).
 *                           now uses pitch getter when creating source nodes.
 *                      D13: now caches pinned pictures to reduce CPU usage.
 *                           now accounts for "setDisplayPosition".
 *   v06 (2023-09-01) - NEW: Q38, Q39, Q40, Q41, D12, D13.
 *                      M06: now maps equip slots in-place.
 *                      M09: now caches max TP value on battler refresh.
 *                      M17: no longer has a chance to fail a valid follow-up.
 *                      M18: fixed soft-lock when selecting from 0 targets.
 *                      Q09: now supports text codes in any window.
 *                      Q14: \a[n] should now survive rapid message spam.
 *                      Q18: recoded to avoid any unintended stacking.
 *                      Q29: now supports any subfolder, not just img/titles1.
 *                           now uses "img/system/rpgmakerlogo" by default.
 *                           now supports booting to scenes other than title.
 *                      Q37: fixed single values for radius/period.
 *   v05 (2023-05-31) - NEW: M24, M25, M26, Q35, Q36, Q37, D09, D10, D11.
 *                      M09: "DFAULT_MAX_TP = null" now works as advertised.
 *                      Q04: fixed double-substitution in emerge messages.
 *                      Q23: now <offset> notetag works for non-tile events.
 *                      Q26: icon now shows even if save completes in <1 frame.
 *                      Q32: fixed off-by-one error in hue cycle timing.
 *                           added type checks in getTag, just in case.
 *                      Q33: now initialises its data on new game, oops.
 *                           now clears face area immediately before redraw.
 *                      Q34: now the charge time overlay uses gradient fill.
 *                      D03: added user feedback (audio + text) on failure.
 *   v04 (2023-03-31) - NEW: M23, Q32, Q33, Q34, D06, D07, D08.
 *                      M16: now enemy addedSkills inherits actor learnings.
 *                      M17: now <follow-up:7,8,9> picks 7, 8, OR 9 (not AND).
 *                           now enemy "known" skills = Add Skill traits.
 *                      M20: now only adds state, use built-in auto-removal.
 *                      Q11: now base anim ID 0 does not receive an offset.
 *                           now tags work on items/skills: specific > general.
 *                      Q14: added \s[n] for text speed, like in RM2k3.
 *                      Q18: now e.g. <ghost: 2> can cancel out <ghost: 0.5>.
 *                      Q21: fixed crash on playing BGS: None.
 *                      Q29: now each splash screen can be timed independently.
 *                      Q30: now gauges are unaffected by enemy hue.
 *                           now scaling is floored for crisp/accurate visuals.
 *   v03 (2023-03-22) - NEW: M18, M19, M20, M21, M22,
 *                           Q28, Q29, Q30, Q31, D04, D05.
 *                      M05: corrected typo from v02 (was "=", now "===").
 *                      M15: now also applies to "Remove by Damage" on states.
 *                      M16: now attack anim inheritance (Q11) should work.
 *                      M17: skip follow-ups with no valid targets.
 *                           omit skill ID => random skill that subject knows.
 *                      Q01: recast private var "left" as symbol property.
 *                      Q25: better accuracy & only segment to current value.
 *   v02 (2023-03-02) - NEW: M15, M16, M17.
 *                      M03: fixed for autobattle (logic was inverted).
 *                      M05: add next state only when at max turns.
 *                      Q01: raised PX_PER_INC for easier click & drag control.
 *                      Q02: z-mirror only for "Center of the screen" anims.
 *                      Q03: index memory/top for Input-based window swap.
 *                      Q11: private fct is now Game_Enemy#attackAnimationId1.
 *                      Q27: now works if button was not created earlier.
 *   v01 (2023-01-18) - Public release.
 *
 * @param M01
 * @text M01: Over-HIT Reduces EVA
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M02
 * @text M02: Vehicle/Walk Speed
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M03
 * @text M03: Target Rate Taunt
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M03_mult
 * @text - TGR Factor
 * @parent M03
 * @type number
 * @decimals 2
 * @min 1
 * @max 10000000
 * @desc If target candidate A has this many times more TGR than B, then B cannot be aimed at. Default: 10.
 * @default 10
 *
 * @param M04
 * @text M04: Persistent States
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M05
 * @text M05: Progressive States
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M06
 * @text M06: Duplicate Equip Slots
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M07
 * @text M07: More Luck Effects
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M07_hit
 * @text - Hit Rate
 * @parent M07
 * @type boolean
 * @desc If true, luck affects hit chance.
 * Regardless, this will not affect Certain Hit actions.
 * @default true
 *
 * @param M07_crit
 * @text - Crit Rate
 * @parent M07
 * @type boolean
 * @desc If true, luck affects critical hit chance.
 * @default true
 *
 * @param M07_cnt
 * @text - Physical Counter Rate
 * @parent M07
 * @type boolean
 * @desc If true, luck affects physical counter-attack chance.
 * @default true
 *
 * @param M07_mrf
 * @text - Magic Reflect Rate
 * @parent M07
 * @type boolean
 * @desc If true, luck affects magic reflection chance.
 * @default true
 *
 * @param M07_item
 * @text - Item Drop Rate
 * @parent M07
 * @type boolean
 * @desc If true, luck affects the chance that an enemy will drop its item(s).
 * @default true
 *
 * @param M07_gold
 * @text - Gold Drop Rate
 * @parent M07
 * @type boolean
 * @desc If true, luck affects the amount of gold dropped by enemies.
 * @default true
 *
 * @param M07_flee
 * @text - Escape Ratio
 * @parent M07
 * @type boolean
 * @desc If true, luck affects the chance that the Escape party command will succeed.
 * @default true
 *
 * @param M08
 * @text M08: TP = Damage Shield
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M08_state
 * @text - Block State
 * @parent M08
 * @type state
 * @desc When a battler has TP > 0, they will have this state.
 * @default 0
 *
 * @param M08_logActor
 * @text - Actor Block Message
 * @parent M08
 * @type string
 * @desc Battle log message shown when an actor blocks damage.
 * %1 = actor name, %2 = damage blocked. Skipped if blank.
 * @default %1 blocked %2 damage!
 *
 * @param M08_logEnemy
 * @text - Enemy Block Message
 * @parent M08
 * @type string
 * @desc Battle log message shown when an enemy blocks damage.
 * %1 = enemy name, %2 = damage blocked. Skipped if blank.
 * @default %1 blocked %2 damage!
 *
 * @param M08_pop
 * @text - Blocked Damage Popup
 * @parent M08
 * @type boolean
 * @desc If true, show a "blocked damage" popup for any blocked damage.
 * @default true
 *
 * @param M08_popCrit
 * @text - Popup Crit VFX
 * @parent M08_pop
 * @type boolean
 * @desc If true, apply the usual critical hit visual effect to block popups when appropriate.
 * @default true
 *
 * @param M08_popColour
 * @text - Popup Colour
 * @parent M08_pop
 * @type color
 * @desc Text colour index for "blocked damage" popups.
 * Alternatively, enter a CSS colour via the Text tab.
 * @default 30
 *
 * @param M08_popAddX
 * @text - Popup Offset X
 * @parent M08_pop
 * @type number
 * @decimals 0
 * @min -99999
 * @max 99999
 * @desc X position offset for "blocked damage" popups (px).
 * Default: 8.
 * @default 8
 *
 * @param M08_popAddY
 * @text - Popup Offset Y
 * @parent M08_pop
 * @type number
 * @decimals 0
 * @min -99999
 * @max 99999
 * @desc Y position offset for "blocked damage" popups (px).
 * Default: 8.
 * @default 8
 *
 * @param M08_block
 * @text - Block Animation
 * @parent M08
 * @type animation
 * @require 1
 * @desc Animation to play when damage shield blocks any damage.
 * @default 0
 *
 * @param M08_break
 * @text - Break Animation
 * @parent M08
 * @type animation
 * @require 1
 * @desc Animation to play when damage shield breaks.
 * @default 0
 *
 * @param M08_refillTp
 * @text - Refill TP
 * @parent M08
 * @type boolean
 * @desc If true, TP is always full outside of battle, and starts full in battle.
 * @default true
 *
 * @param M09
 * @text M09: Max TP Tags
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M09_dfault
 * @text - Default Max TP
 * @parent M09
 * @type number
 * @decimals 0
 * @min 0
 * @max 1000000000
 * @desc Maximum TP for anyone without tags.
 * Default: (blank) = no change.
 * @default
 *
 * @param M10
 * @text M10: Select Charged TPB
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M11
 * @text M11: Change TPB Mode
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M11_txt
 * @text - Display Text
 * @parent M11
 * @type string
 * @desc Display text for this option in game. Leave blank to omit. Default: Active Battle Mode.
 * @default Active Battle Mode
 *
 * @param M11_def
 * @text - Default Value
 * @parent M11
 * @type boolean
 * @desc Original value for this option.
 * Default: false (OFF).
 * @default false
 *
 * @param M11_key
 * @text - Internal Key
 * @parent M11
 * @type string
 * @desc Key used to reference this option in code.
 * Default: activeTpb.
 * @default activeTpb
 *
 * @command M11_set
 * @text M11: Set TPB Mode
 * @desc Override the TPB Active/Wait mode for this playthrough.
 *
 * @arg active
 * @text Active
 * @type boolean
 * @on Active
 * @off Wait
 * @desc Turn active TPB on or off?
 * @default false
 *
 * @command M11_reset
 * @text M11: Reset TPB Mode
 * @desc Removes this playthrough's TPB Active/Wait mode override.
 *
 * @param M12
 * @text M12: Add Min State Turns
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M13
 * @text M13: Encounter Rate
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M13_max
 * @text - Max Multiplier
 * @parent M13
 * @type number
 * @decimals 2
 * @min 1
 * @max 100
 * @desc Affects maximum rate.
 * Default: 2, i.e. rate varies in the range [R, 2R].
 * @default 2
 *
 * @param M14
 * @text M14: Fast TPB Actions
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M14_instant
 * @text - Instant Speed
 * @parent M14
 * @type number
 * @decimals 0
 * @min 0
 * @max 100000
 * @desc Actions with at least this much speed count as "instant".
 * Default: 2000.
 * @default 2000
 *
 * @param M15
 * @text M15: Remove X% Max Turns
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M16
 * @text M16: Enemy Copy Actor
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M17
 * @text M17: Follow-Up Skills
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M18
 * @text M18: Random Scope Controls
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M19
 * @text M19: isAttack by Effect
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M19_cache
 * @text - Use Cache?
 * @parent M19
 * @type boolean
 * @desc If true, pre-parses tag data on game boot.
 * Disable this if it causes problems with other plugins.
 * @default true
 *
 * @param M20
 * @text M20: Casting States
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M21
 * @text M21: HRG Element
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M22
 * @text M22: State Stacks
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M23
 * @text M23: Invert Opponent FX
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M23_gainTp
 * @text - Invert Gain TP
 * @parent M23
 * @type boolean
 * @desc If true, invert Gain TP effects on opponent-scoped Skills/Items.
 * @default true
 *
 * @param M23_grow
 * @text - Invert Grow
 * @parent M23
 * @type boolean
 * @desc If true, invert Grow effects on opponent-scoped Skills/Items.
 * @default true
 *
 * @param M24
 * @text M24: Assign Guard Skill
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M25
 * @text M25: "Ignore Weapon" Tag
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M26
 * @text M26: Slow Bush/Ladder
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M26_bush
 * @text - Bush Speed
 * @parent M26
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Value added to move speed for characters on bush tiles.
 * Default: -1.
 * @default -1
 *
 * @param M26_ladder
 * @text - Ladder Speed
 * @parent M26
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Value added to move speed for characters on ladder tiles.
 * Default: -1.
 * @default -1
 *
 * @param M27
 * @text M27: "Item" Skill Type
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M27_needType
 * @text - Require Type
 * @parent M27
 * @type boolean
 * @desc If true, actors can only use items in battle if they have access to the skill type.
 * @default false
 *
 * @param M27_battleOnly
 * @text - Battle Only
 * @parent M27
 * @type boolean
 * @desc If true, item access will only be restricted in battle.
 * @default true
 *
 * @param M28
 * @text M28: Max Save Files
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M28_slotCount
 * @text - Slot Count
 * @parent M28
 * @type number
 * @decimals 0
 * @min 0
 * @max 999
 * @desc Standard save slot count.
 * Default: 19.
 * @default 19
 *
 * @param M28_autoSelect
 * @text - Load Select Autosave?
 * @parent M28
 * @type boolean
 * @desc If true, allow the load screen to auto-select the autosave slot if it is more recent.
 * @default true
 *
 * @param M29
 * @text M29: Custom Skill Costs
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M29_types
 * @text - JS: Cost Types
 * @parent M29
 * @type struct<CostTypeType>[]
 * @desc Custom cost types.
 * @default ["{\"type\":\"tp\",\"rx\":\"^TP$\",\"display\":\"if (0 < cost)\\n  return `\\\\\\\\c[29]${cost}${TextManager.tpA}`;\\nreturn \\\"\\\";\",\"canPay\":\"return cost <= subject.tp;\",\"onPay\":\"subject.setTp(subject.tp - cost);\"}","{\"type\":\"mp\",\"rx\":\"^MP$\",\"display\":\"if (0 < cost)\\n  return `\\\\\\\\c[23]${cost}${TextManager.mpA}`;\\nreturn \\\"\\\";\",\"canPay\":\"return cost <= subject.mp;\",\"onPay\":\"subject.setMp(subject.mp - cost);\"}","{\"type\":\"hp\",\"rx\":\"^HP$\",\"display\":\"if (0 < cost) {\\n  const c = subject.hp <= cost ? 18 : 20;\\n  return `\\\\\\\\c[${c}]${cost}${TextManager.hpA}`;\\n}\\nreturn \\\"\\\";\",\"canPay\":\"return true;  // allow KO\",\"onPay\":\"subject.setHp(subject.hp - cost);\\nif (subject.isDead())\\n  subject.performCollapse();\"}","{\"type\":\"item\",\"rx\":\"^ITEM$|^ITM$\",\"display\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (0 < cost && 0 < ext) {\\n  const o = $dataItems[ext];\\n  return `\\\\\\\\c[16]${cost}\\\\xd7\\\\\\\\i[${o.iconIndex}]`;\\n}\\nreturn \\\"\\\";\",\"canPay\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (subject.isActor() && 0 < cost && 0 < ext)\\n  return cost <= $gameParty.numItems($dataItems[ext]);\\nreturn true;\",\"onPay\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (subject.isActor())\\n  $gameParty.loseItem($dataItems[ext], cost);\"}","{\"type\":\"weapon\",\"rx\":\"^WEAPON$|^WPN$\",\"display\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (0 < cost && 0 < ext) {\\n  const o = $dataWeapons[ext];\\n  return `\\\\\\\\c[16]${cost}\\\\xd7\\\\\\\\i[${o.iconIndex}]`;\\n}\\nreturn \\\"\\\";\",\"canPay\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (subject.isActor() && 0 < cost && 0 < ext)\\n  return cost <= $gameParty.numItems($dataWeapons[ext]);\\nreturn true;\",\"onPay\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (subject.isActor())\\n  $gameParty.loseItem($dataWeapons[ext], cost);\"}","{\"type\":\"armor\",\"rx\":\"^ARMOU?R$|^ARM$\",\"display\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (0 < cost && 0 < ext) {\\n  const o = $dataArmors[ext];\\n  return `\\\\\\\\c[16]${cost}\\\\xd7\\\\\\\\i[${o.iconIndex}]`;\\n}\\nreturn \\\"\\\";\",\"canPay\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (subject.isActor() && 0 < cost && 0 < ext)\\n  return cost <= $gameParty.numItems($dataArmors[ext]);\\nreturn true;\",\"onPay\":\"if (ext < 0)\\n  ext = $gameVariables.value(-ext);\\nif (subject.isActor())\\n  $gameParty.loseItem($dataArmors[ext], cost);\"}","{\"type\":\"money\",\"rx\":\"^MONEY$|^GOLD$|^G$\",\"display\":\"if (0 < cost)\\n  return `\\\\\\\\c[17]${cost}\\\\\\\\G`;\\nreturn \\\"\\\";\",\"canPay\":\"if (subject.isActor())\\n  return cost <= $gameParty.gold();\\nreturn true;\",\"onPay\":\"if (subject.isActor())\\n  $gameParty.loseGold(cost);\"}","{\"type\":\"var\",\"rx\":\"^VARIABLE$|^VAR$|^V$\",\"display\":\"if (0 < cost && 0 < ext) {\\n  const v = $dataSystem.variables[ext];\\n  return `\\\\\\\\c[16]${cost}\\\\xd7${v}`;\\n}\\nreturn \\\"\\\";\",\"canPay\":\"return cost <= $gameVariables.value(ext);\",\"onPay\":\"$gameVariables.setValue(ext, $gameVariables.value(ext) - cost);\"}","{\"type\":\"warmup\",\"rx\":\"^WARMUP$|^WARM$|^WU$\",\"display\":\"const t = cost - subject.turnCount() + 1;\\nif ($gameParty.inBattle() && 0 < t)\\n  return `\\\\\\\\c[19]${t}\\\\\\\\i[220]`;\\nreturn \\\"\\\";\",\"canPay\":\"if ($gameParty.inBattle())\\n  return cost < subject.turnCount();\\nreturn true;\",\"onPay\":\"\"}","{\"type\":\"cooldown\",\"rx\":\"^COOLDOWN$|^COOL$|^CD$\",\"display\":\"const P = Symbol.for(\\\"Cae_Tweaks_M29_CD\\\");\\nconst D = subject[P];\\nif ($gameParty.inBattle() && D?.b >= $gameSystem.battleCount())\\n  if (D?.[item.id]) {\\n    const t = D[item.id] - subject.turnCount();\\n    if (0 < t)\\n      return `\\\\\\\\c[19]${t}\\\\\\\\i[220]`;\\n  }\\nelse\\n  delete subject[P];\\nreturn \\\"\\\";\",\"canPay\":\"const P = Symbol.for(\\\"Cae_Tweaks_M29_CD\\\");\\nconst D = subject[P];\\nif ($gameParty.inBattle() && D?.b >= $gameSystem.battleCount())\\n  if (D?.[item.id])\\n    return D[item.id] <= subject.turnCount();\\nelse\\n  delete subject[P];\\nreturn true;\",\"onPay\":\"const P = Symbol.for(\\\"Cae_Tweaks_M29_CD\\\");\\nif ($gameParty.inBattle()) {\\n  if (subject[P]?.b < $gameSystem.battleCount())\\n    delete subject[P];\\n  const D = subject[P] ??= {};\\n  D.b = $gameSystem.battleCount();\\n  D[item.id] = subject.turnCount() + cost + 1;\\n} else\\n  delete subject[P];\"}"]
 *
 * @param M30
 * @text M30: Formation Locks
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M30_pos
 * @text - Locked Positions
 * @parent M30
 * @type number[]
 * @decimals 0
 * @min 0
 * @max 1000
 * @desc Party positions that are always locked (0 = leader).
 * Default: (none).
 * @default []
 *
 * @param M30_noHide
 * @text - Always Show
 * @parent M30
 * @type boolean
 * @desc Show the "lock" indicator even when not using the Formation command?
 * @default false
 *
 * @param M30_url
 * @text - Image Override
 * @parent M30
 * @type file
 * @dir img/system
 * @require 1
 * @desc URL for lock indicator image. Leave blank to use a system-colour padlock SVG. Suggested size 32 x 32 px.
 * @default
 *
 * @param M31
 * @text M31: Follower Collisions
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M31_trigger
 * @text - Collide Trigger
 * @parent M31
 * @type boolean
 * @desc If true, Event Touch can trigger on followers.
 * If false, events will walk through followers.
 * @default true
 *
 * @param M32
 * @text M32: No Event Lock
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M33
 * @text M33: Auto Battle AI
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M33_combine
 * @text - Combine Rule
 * @parent M33
 * @type select
 * @option 0 - Add
 * @value 0
 * @option 1 - Multiply
 * @value 1
 * @option 2 - Mean
 * @value 2
 * @option 3 - Maximum
 * @value 3
 * @option 4 - Minimum
 * @value 4
 * @desc Determines how to combine multiple ratings.
 * @default 0
 *
 * @param M33_formula
 * @text - JS: Formula Ratings
 * @parent M33
 * @type struct<RatingFormula>
 * @desc Rating functions for evaluating skill/item damage formulae.
 * @default {"dmgHp":"// Default: fraction of max HP damaged (0~1).\nif (action.isForOpponent())\n  return value / Math.max(target.hp, 1);\nreturn 0;","dmgMp":"","recHp":"// Default: fraction of max HP healed (0~1).\nif (!action.isForOpponent())\n  return Math.min(-value, target.mhp - target.hp) / target.mhp;\nreturn 0;","recMp":"","absHp":"// Default: same as Damage HP.\nreturn this[1](...arguments);","absMp":""}
 *
 * @param M33_effects
 * @text - JS: Effect Ratings
 * @parent M33
 * @type struct<RatingEffects>
 * @desc Rating functions for evaluating skill/item effects.
 * @default {"recHp":"","recMp":"","recTp":"","addState":"","remState":"","addBuff":"","addDebuff":"","remBuff":"","remDebuff":"","special":"","grow":"","learnSkill":"","event":""}
 *
 * @param M33_ext
 * @text - JS: Extra Ratings
 * @parent M33
 * @type multiline_string[]
 * @desc Functions to return "ext" values, passed to all other rating functions. (action, target) => any.
 * @default []
 *
 * @param M33_nmeAuto
 * @text - Enemy Autobattle
 * @parent M33
 * @type boolean
 * @desc If true, enemies with an Auto Battle trait will use the same AI as actors with that trait.
 * @default false
 *
 * @param M34
 * @text M34: Escape Ratio
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M34_recalc
 * @text - Remake Ratio
 * @parent M34
 * @type boolean
 * @desc If true, escape ratio will be recalculated for every escape attempt.
 * @default true
 *
 * @param M34_effect
 * @text - Escape Effects
 * @parent M34
 * @type boolean
 * @desc If true, tags also affect Escape effects on Items/Skills.
 * @default true
 *
 * @param M35
 * @text M35: Party Battle Commands
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M35_cmds
 * @text - Extra Commands
 * @parent M35
 * @type struct<PartySwitchCommandType>[]
 * @desc Party commands to add on new game.
 * @default []
 *
 * @param M35_save
 * @text - Save Commands
 * @parent M35
 * @type boolean
 * @desc If true, include command list in save files.
 * @default true
 *
 * @command M35_add
 * @text M35: Add Party Command
 * @desc Adds a new party switch command.
 *
 * @arg txt
 * @text Display Text
 * @type string
 * @desc Text shown in-game for this command.
 * @default
 *
 * @arg sw
 * @text Switch ID
 * @type switch
 * @desc When the switch is on, the command is disabled.
 * On command OK, this switch is turned on.
 * @default 0
 *
 * @arg pos
 * @text Index
 * @type number
 * @decimals 0
 * @min -999
 * @max 999
 * @desc Index at which to insert this new command.
 * Default: 999 (end of list).
 * @default 999
 *
 * @command M35_remName
 * @text M35: Remove Party Command
 * @desc Removes 1+ party switch commands with matching name(s).
 *
 * @arg txt
 * @text Display Name
 * @type string
 * @desc Display name of command(s) to remove.
 * @default
 *
 * @arg all
 * @text Remove All?
 * @type boolean
 * @desc If true, remove all matches.
 * If false, remove only the first match.
 * @default false
 *
 * @command M35_clr
 * @text M35: Reset Party Commands
 * @desc Resets party switch command list to default.
 *
 * @param M36
 * @text M36: Gameover Commands
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M36_cmds
 * @text - Command List
 * @parent M36
 * @type select[]
 * @option retry
 * @option load
 * @option title
 * @option options
 * @desc Ordered list of commands for new gameover command window.
 * @default ["load","title","options"]
 *
 * @param M36_retryTxt
 * @text - Retry Text
 * @parent M36_cmds
 * @type string
 * @desc Display text for the "Retry" command, if present.
 * @default Load Last Save
 *
 * @param M36_delay
 * @text - Open Delay
 * @parent M36
 * @type number
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Delay before opening new gameover command window.
 * Default: 180 frames.
 * @default 180
 *
 * @param M36_dx
 * @text - X Offset
 * @parent M36
 * @type number
 * @decimals 0
 * @min -9999
 * @max 9999
 * @desc X offset (from centre) for new gameover command window position. Default: 0 px.
 * @default 0
 *
 * @param M36_dy
 * @text - Y Offset
 * @parent M36
 * @type number
 * @decimals 0
 * @min -9999
 * @max 9999
 * @desc Y offset (from centre) for new gameover command window position. Default: 192 px.
 * @default 192
 *
 * @param M36_dw
 * @text - Width Offset
 * @parent M36
 * @type number
 * @decimals 0
 * @min -9999
 * @max 9999
 * @desc Width offset (from standard) for new gameover command window. Default: 0 px.
 * @default 0
 *
 * @param M37
 * @text M37: Persistent Data
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M37_s
 * @text - Switches
 * @parent M37
 * @type struct<PersistSwitchType>[]
 * @desc Switches that will persist across playthroughs.
 * @default []
 *
 * @param M37_v
 * @text - Variables
 * @parent M37
 * @type struct<PersistVarType>[]
 * @desc Variables that will persist across playthroughs.
 * @default []
 *
 * @param M38
 * @text M38: Transform States
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param M38_keepExp
 * @text - Save Exp?
 * @parent M38
 * @type boolean
 * @desc Applies on transform. Works the same as the "Save Exp" checkbox in the Change Class command.
 * @default true
 *
 * @param Q01
 * @text Q01: Volume Controls
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q01_step
 * @text - Volume Step
 * @parent Q01
 * @type select
 * @option 1
 * @option 2
 * @option 4
 * @option 5
 * @option 10
 * @option 20
 * @option 25
 * @option 50
 * @option 100
 * @desc Step size for standard volume changes.
 * Default: 20.
 * @default 20
 *
 * @param Q01_pxPerInc
 * @text - Pixels per Increment
 * @parent Q01
 * @type number
 * @decimals 0
 * @min 1
 * @max 10000
 * @desc Horizontal touch-drag distance to change volume by 1.
 * Default: 10.
 * @default 10
 *
 * @param Q02
 * @text Q02: Battle Status Anims
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q02_offsetX
 * @text - Offset X
 * @parent Q02
 * @type number
 * @decimals 0
 * @min -99999
 * @max 99999
 * @desc Additional horizontal offset for actor effects, e.g. damage popups & state overlay.
 * @default 0
 *
 * @param Q02_offsetY
 * @text - Offset Y
 * @parent Q02
 * @type number
 * @decimals 0
 * @min -99999
 * @max 99999
 * @desc Additional vertical offset for actor effects, e.g. damage popups & state overlay.
 * @default 0
 *
 * @param Q03
 * @text Q03: Enhanced Status Scene
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q03_paramIds
 * @text - Param IDs
 * @parent Q03
 * @type number[]
 * @decimals 0
 * @min 0
 * @max 99
 * @desc IDs of actor params to show on status scene.
 * Basic: 0~7. Extra: 8~17. Special: 18~27.
 * @default ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
 *
 * @param Q03_addNames
 * @text - Param Names
 * @parent Q03
 * @type struct<ParamNameType>
 * @desc Additional parameter display names.
 * @default {"text":"{\"cri\":\"Critical Rate\",\"cev\":\"Critical Evasion\",\"mev\":\"Magic Evasion\",\"mrf\":\"Magic Reflection\",\"cnt\":\"Counter Attack\",\"hrg\":\"HP Regeneration\",\"mrg\":\"MP Regeneration\",\"trg\":\"TP Regeneration\",\"tgr\":\"Target Rate\",\"grd\":\"Guard Effect\",\"rec\":\"Recovery Effect\",\"pha\":\"Pharmacology\",\"mcr\":\"MP Cost Rate\",\"tcr\":\"TP Charge Rate\",\"pdr\":\"Physical Damage\",\"mdr\":\"Magic Damage\",\"fdr\":\"Floor Damage\",\"exr\":\"Experience\"}","addText":"[]"}
 *
 * @param Q03_buffInfo
 * @text - Param Rating
 * @parent Q03
 * @type struct<ParamBuffInfoType>
 * @desc Info to determine which Ex- and Sp-param values are good/bad, for (de)buff colours.
 * @default {"hit":"0.95","eva":"0.05","cri":"0.1","cev":"0","mev":"0","mrf":"0","cnt":"0","hrg":"0","mrg":"0","trg":"0","tgr":"true","grd":"false","rec":"false","pha":"false","mcr":"true","tcr":"false","pdr":"true","mdr":"true","fdr":"true","exr":"false","other":"[]"}
 *
 * @param Q03_showResist
 * @text - Show Resistances
 * @parent Q03
 * @type boolean
 * @desc If false, show element/state rates.
 * If true,  show element/state resistances.
 * @default false
 *
 * @param Q03_stateIcons
 * @text - Show State Icons
 * @parent Q03
 * @type boolean
 * @desc If true, prefix each state's name with its icon.
 * @default true
 *
 * @param Q03_moveRate
 * @text - Belt Move Rate
 * @parent Q03
 * @type number
 * @decimals 0
 * @min 1
 * @max 1000000
 * @desc Belt adjustment speed. Ignored for touch-drag.
 * Default: 24 px/frame.
 * @default 24
 *
 * @param Q03_beltPad
 * @text - Belt Padding
 * @parent Q03
 * @type number
 * @decimals 0
 * @min -10000
 * @max 10000
 * @desc Padding between UI area edge and start/end of belt.
 * Default: 12 px.
 * @default 12
 *
 * @param Q03_initIndex
 * @text - Initial Belt Index
 * @parent Q03
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Index of initially-selected belt window.
 * Default: 0.
 * @default 0
 *
 * @param Q03_retainRow
 * @text - Retain Row
 * @parent Q03
 * @type boolean
 * @desc Affects selection transfer between info windows.
 * Default: true.
 * @default true
 *
 * @param Q03_rxExclude
 * @text - Exclude Pattern
 * @parent Q03
 * @type string
 * @desc Regular expression matching hidden element/state names.
 * Default: ^#                        (e.g. "#SecretElement")
 * @default ^#
 *
 * @param Q03_rxHeading
 * @text - Heading Pattern
 * @parent Q03
 * @type string
 * @desc Regular expression matching element/state name headings.
 * Default: ^\-+\s*(.*[^\s\-])\s*\-*$   (e.g. "--- DoTs ---")
 * @default ^\-+\s*(.*[^\s\-])\s*\-*$
 *
 * @param Q04
 * @text Q04: Skip Blank Messages
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q04_legacy
 * @text - Battle Start Only
 * @parent Q04
 * @type boolean
 * @desc If true, only battle start messages (emerge, surprise, preemptive) are affected.
 * @default false
 *
 * @param Q05
 * @text Q05: More Equip Info
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q06
 * @text Q06: Pause Audio + Video
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q07
 * @text Q07: No WindowLayer Mask
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q08
 * @text Q08: Scroll Down to Last
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q09
 * @text Q09: Any Window Text Codes
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q09_legacy
 * @text - Use Legacy Mode
 * @parent Q09
 * @type boolean
 * @desc If true, only add text code support to currency & enemy select windows.
 * @default false
 *
 * @param Q10
 * @text Q10: No Map Fast-Forward
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q11
 * @text Q11: Attack Anim Tags
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q11_rxNoOffset
 * @text - No Offset Anim Pattern
 * @parent Q11
 * @type string
 * @desc Regular expression for matching animaton names that should not receive <attack anim plus> values. Default: ^#.
 * @default ^#
 *
 * @param Q12
 * @text Q12: "Quit Game" Command
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q12_txtTitle
 * @text - Title Command
 * @parent Q12
 * @type string
 * @desc Display text for command on title menu.
 * Default: Quit Game. Will not be added if blank.
 * @default Quit Game
 *
 * @param Q12_txtEnd
 * @text - End Game Command
 * @parent Q12
 * @type string
 * @desc Display text for command on end game menu.
 * Default: To Desktop. Will not be added if blank.
 * @default To Desktop
 *
 * @param Q12_sym
 * @text - Internal Symbol
 * @parent Q12
 * @type string
 * @desc Symbol for the new command.
 * Default: quit.
 * @default quit
 *
 * @param Q13
 * @text Q13: Battle Weather
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q14
 * @text Q14: New Message Codes
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q14_afIndex
 * @text - Set Actor Face Index
 * @parent Q14
 * @type boolean
 * @desc Affects the new \af[n] and \pf[n] message codes.
 * If true, use actor face index; else use message index.
 * @default true
 *
 * @param Q14_alignDfault
 * @text - Default Alignment
 * @parent Q14
 * @type select
 * @option 0 - left
 * @value 0
 * @option 1 - middle
 * @value 1
 * @option 2 - right
 * @value 2
 * @desc Alignment for message text without an \align text code.
 * Default: 0.
 * @default 0
 *
 * @param Q15
 * @text Q15: Group Battle Drops
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q15_form
 * @text - Format
 * @parent Q15
 * @type string
 * @desc Format for message: %1 = quantity, %2 = icon index, %3 = item name.
 * @default %1× \i[%2] %3
 *
 * @param Q16
 * @text Q16: Audio HDR Option
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q16_dfault
 * @text - Default Value
 * @parent Q16
 * @type boolean
 * @desc If true, then by default this option is on, i.e. compressor disabled.
 * @default true
 *
 * @param Q16_invert
 * @text - Invert Value
 * @parent Q16
 * @type boolean
 * @desc If true (default): option is ON => compressor is OFF.
 * If false:          option is ON => compressor is ON.
 * @default true
 *
 * @param Q16_txt
 * @text - Display Text
 * @parent Q16
 * @type string
 * @desc Display name for this option in game.
 * Default: Audio HDR.
 * @default Audio HDR
 *
 * @param Q16_onText
 * @text - ON Text
 * @parent Q16
 * @type string
 * @desc Optional ON text override for this option in game.
 * @default
 *
 * @param Q16_offText
 * @text - OFF Text
 * @parent Q16
 * @type string
 * @desc Optional OFF text override for this option in game.
 * @default
 *
 * @param Q16_key
 * @text - Internal Key
 * @parent Q16
 * @type string
 * @desc Key used to reference this option in code.
 * Default: audioHDR.
 * @default audioHDR
 *
 * @param Q16_settings
 * @text - Settings
 * @parent Q16
 * @type struct<CompressorSettingsType>
 * @desc Settings for the compressor. Leave blank for default.
 * @default
 *
 * @param Q17
 * @text Q17: Options Help Window
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q17_desc
 * @text - Descriptions
 * @parent Q17
 * @type struct<OptType>
 * @desc Descriptions for each in-game option.
 * @default {"data":"[\"{\\\"sym\\\":\\\"alwaysDash\\\",\\\"desc\\\":\\\"When ON, the player will dash unless the dash key is held.\\\"}\",\"{\\\"sym\\\":\\\"commandRemember\\\",\\\"desc\\\":\\\"When ON, the previous battle command will be remembered.\\\"}\",\"{\\\"sym\\\":\\\"touchUI\\\",\\\"desc\\\":\\\"When ON, the in-game touch interface will be shown.\\\"}\",\"{\\\"sym\\\":\\\"bgmVolume\\\",\\\"desc\\\":\\\"Volume of background music.\\\\nHold shift, or click & drag, to adjust more precisely.\\\"}\",\"{\\\"sym\\\":\\\"bgsVolume\\\",\\\"desc\\\":\\\"Volume of background/ambient sounds.\\\\nHold shift, or click & drag, to adjust more precisely.\\\"}\",\"{\\\"sym\\\":\\\"meVolume\\\",\\\"desc\\\":\\\"Volume of music effects.\\\\nHold shift, or click & drag, to adjust more precisely.\\\"}\",\"{\\\"sym\\\":\\\"seVolume\\\",\\\"desc\\\":\\\"Volume of sound effects.\\\\nHold shift, or click & drag, to adjust more precisely.\\\"}\",\"{\\\"sym\\\":\\\"audioHDR\\\",\\\"desc\\\":\\\"When OFF, the game's volume range will be compressed.\\\\nThis can help improve clarity in noisy conditions.\\\"}\",\"{\\\"sym\\\":\\\"activeTpb\\\",\\\"desc\\\":\\\"When ON, battle pauses only when choosing an item/skill.\\\\nThis can offer different tactics.\\\"}\",\"{\\\"sym\\\":\\\"softLight\\\",\\\"desc\\\":\\\"When ON, soften edges between light and dark areas.\\\\nTurn OFF for hard edges (less GPU-intensive).\\\"}\",\"{\\\"sym\\\":\\\"gameSpeed\\\",\\\"desc\\\":\\\"Game play rate, compared to normal.\\\\nMay help for accessibility or speedruns.\\\"}\",\"{\\\"sym\\\":\\\"fullscreen\\\",\\\"desc\\\":\\\"Toggles full-screen display on or off.\\\\nFull-screen can also be toggled by pressing F4.\\\"}\",\"{\\\"sym\\\":\\\"cursorType\\\",\\\"desc\\\":\\\"Choose a game cursor.\\\\nThis is purely cosmetic.\\\"}\",\"{\\\"sym\\\":\\\"masterVolume\\\",\\\"desc\\\":\\\"Overall volume for all game audio.\\\\nHold shift, or click & drag, to adjust more precisely.\\\"}\"]","unknown":"No description for: %1"}
 *
 * @param Q17_reduceMaxCommands
 * @text - Reduce Max Height
 * @parent Q17
 * @type number
 * @decimals 0
 * @min 0
 * @max 10
 * @desc Reduce the maximum options window height by this many commands. Default: 2.
 * @default 2
 *
 * @param Q18
 * @text Q18: Enemy Opacity
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q19
 * @text Q19: Round Render Coords
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q20
 * @text Q20: State Turns on Icon
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q20_unlimited
 * @text - Unlimited Turns
 * @parent Q20
 * @type string
 * @desc Display value for states that do not wear off with time.
 * @default
 *
 * @param Q21
 * @text Q21: BGS Muffle Filter
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q21_threshold
 * @text - Muffle Frequency
 * @parent Q21
 * @type number
 * @decimals 0
 * @min 20
 * @max 20000
 * @desc Low-pass filter frequency for muffling.
 * Default: 1350 Hz.
 * @default 1350
 *
 * @param Q22
 * @text Q22: Move Enemies Down
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q22_offset
 * @text - Offset
 * @parent Q22
 * @type number
 * @decimals 0
 * @min -10000
 * @max 10000
 * @desc Downward offset for all enemy sprites.
 * Default: 24 px.
 * @default 24
 *
 * @param Q23
 * @text Q23: Tile Draw Offsets
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q23_data
 * @text - Data
 * @parent Q23
 * @type struct<TagOffsetType>[]
 * @desc Draw offsets for each terrain tag.
 * @default []
 *
 * @param Q24
 * @text Q24: Hide Max-0 Gauges
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q25
 * @text Q25: Segmented Gauges
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q25_values
 * @text - Segment Values
 * @parent Q25
 * @type struct<SegmentValueType>[]
 * @desc Segment values for each applicable gauge type.
 * @default ["{\"type\":\"hp\",\"value\":\"100\"}","{\"type\":\"mp\",\"value\":\"100\"}","{\"type\":\"tp\",\"value\":\"100\"}","{\"type\":\"time\",\"value\":\"0.25\"}"]
 *
 * @param Q25_partColour
 * @text - Partition Colour
 * @parent Q25
 * @type string
 * @desc CSS colour used for partitions.
 * Leave blank to use the gauge background colour.
 * @default black
 *
 * @param Q25_limitDrawRangeTypes
 * @text - Draw Limit Types
 * @parent Q25
 * @type combo[]
 * @option hp
 * @option mp
 * @option tp
 * @option time
 * @option exp
 * @desc For these gauge types, only partition the filled area.
 * Default: none.
 * @default []
 *
 * @param Q25_partitionWidth
 * @text - Partition Width
 * @parent Q25
 * @type number
 * @min 1
 * @max 10
 * @desc Width per partition.
 * Default: 1 px.
 * @default 1
 *
 * @param Q26
 * @text Q26: "Saving" Indicator
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q26_url
 * @text - URL
 * @parent Q26
 * @type file
 * @dir img/system
 * @require 1
 * @desc URL for saving indicator image.
 * Leave blank to use "icon/icon.png" instead.
 * @default
 *
 * @param Q26_anchor
 * @text - Anchor
 * @parent Q26
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @desc X/Y anchor point for saving indicator sprite.
 * Default: 0.
 * @default 0
 *
 * @param Q26_scale
 * @text - Scale
 * @parent Q26
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 10
 * @desc X & Y scale of saving indicator sprite.
 * Default: 0.5 (50%).
 * @default 0.5
 *
 * @param Q26_x
 * @text - Screen X
 * @parent Q26
 * @type number
 * @decimals 0
 * @min -1000
 * @max 100000
 * @desc Screen X coordinate for saving indicator anchor.
 * Default: 0.
 * @default 0
 *
 * @param Q26_y
 * @text - Screen Y
 * @parent Q26
 * @type number
 * @decimals 0
 * @min -1000
 * @max 100000
 * @desc Screen Y coordinate for saving indicator anchor.
 * Default: 0.
 * @default 0
 *
 * @param Q26_t1
 * @text - T1 (Starting)
 * @parent Q26
 * @type number
 * @decimals 0
 * @min 1
 * @max 6000
 * @desc Duration of saving indicator starting animation.
 * Default: 15 frames.
 * @default 15
 *
 * @param Q26_t2
 * @text - T2 (Holding)
 * @parent Q26
 * @type number
 * @decimals 0
 * @min 1
 * @max 6000
 * @desc Minimum duration of saving indicator holding period.
 * Default: 15 frames.
 * @default 15
 *
 * @param Q26_t3
 * @text - T3 (Ending)
 * @parent Q26
 * @type number
 * @decimals 0
 * @min 1
 * @max 6000
 * @desc Duration of saving indicator ending animation.
 * Default: 15 frames.
 * @default 15
 *
 * @param Q27
 * @text Q27: Toggle Touch UI
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q28
 * @text Q28: First-Run Options
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q29
 * @text Q29: Splash Screen(s)
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q29_imgs
 * @text - Splash Images
 * @parent Q29
 * @type struct<SplashImgType>[]
 * @desc Image or video to use for each splash screen.
 * @default ["{\"image\":\"system/Splash\",\"video\":\"\"}"]
 *
 * @param Q29_time
 * @text - Splash Timings
 * @parent Q29_imgs
 * @type number[]
 * @decimals 0
 * @min 0
 * @max 10000000
 * @desc Maximum durations for each splash scene. Values wrap.
 * Use 0 to wait for player input or video end.
 * @default ["60"]
 *
 * @param Q29_bgm
 * @text - BGMs
 * @parent Q29_imgs
 * @type struct<AudioBgmType>[]
 * @desc Optional per-splash BGM. Values wrap.
 * @default []
 *
 * @param Q29_me
 * @text - MEs
 * @parent Q29_imgs
 * @type struct<AudioMeType>[]
 * @desc Optional per-splash ME. Values wrap.
 * @default []
 *
 * @param Q30
 * @text Q30: Enemy Gauges
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q30_data
 * @text - Enemy Gauge Data
 * @parent Q30
 * @type struct<EnemyGaugeType>[]
 * @desc Display data for all enemy gauge types.
 * @default ["{\"type\":\"hp\",\"anchorX\":\"0\",\"anchorY\":\"-0.15\",\"offsetX\":\"0\",\"offsetY\":\"-13\",\"scaleX\":\"0.8\",\"scaleY\":\"1\",\"opacity\":\"204\"}","{\"type\":\"time\",\"anchorX\":\"0\",\"anchorY\":\"-0.15\",\"offsetX\":\"0\",\"offsetY\":\"0\",\"scaleX\":\"0.8\",\"scaleY\":\"1\",\"opacity\":\"204\"}"]
 *
 * @param Q30_noBackTypes
 * @text - Backless Types
 * @parent Q30
 * @type combo[]
 * @option hp
 * @option mp
 * @option tp
 * @option time
 * @desc Gauge types that should not have a background drawn.
 * @default []
 *
 * @param Q30_showValue
 * @text - Show Gauge Value
 * @parent Q30
 * @type boolean
 * @desc If true, show enemy gauge value for non-backless types.
 * If false, hide all enemy gauge values.
 * @default false
 *
 * @param Q31
 * @text Q31: Add WASD Movement
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q31_debug
 * @text - Log Key Codes
 * @parent Q31
 * @type boolean
 * @desc For debugging. Applies only during playtest. If true, when a key is pressed show its key code in the console.
 * @default false
 *
 * @param Q32
 * @text Q32: Event Hue Shift/Cycle
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q32_propHue
 * @text - Hue Property
 * @parent Q32
 * @type string
 * @desc Identifier for character hue data.
 * If blank, hue will not be included in save data.
 * @default _hue
 *
 * @param Q33
 * @text Q33: Parallel Show Text
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q33_durations
 * @text - Durations
 * @parent Q33
 * @type string
 * @desc Durations for Parallel Show Text: "base" "\." "\|".
 * Default: 120 15 60 (frames).
 * @default 120 15 60
 *
 * @param Q33_afSetIndex
 * @text - Set Actor Face Index
 * @parent Q33
 * @type boolean
 * @desc Affects \af[n] and \pf[n] auto-message text codes.
 * If true, the face index changes to match the actor's face.
 * @default true
 *
 * @param Q33_minRows
 * @text - Min Rows
 * @parent Q33
 * @type number
 * @decimals 0
 * @min 1
 * @max 99
 * @desc Minimum row count for auto-message window.
 * Default: 2.
 * @default 2
 *
 * @param Q34
 * @text Q34: TPB Cast Time Overlay
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q34_colour
 * @text - Overlay Colour
 * @parent Q34
 * @type string
 * @desc CSS colour for casting overlay.
 * Default: #00000080 (50% black).
 * @default #00000080
 *
 * @param Q34_gradient
 * @text - Gradient Fill
 * @parent Q34
 * @type boolean
 * @desc If true, fill gradient from gauge background.
 * If false, fill with solid Overlay Colour.
 * @default true
 *
 * @param Q35
 * @text Q35: Death Var/Anim
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q36
 * @text Q36: Snapshot Picture
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q36_name
 * @text - Snapshot Name
 * @parent Q36
 * @type string
 * @desc Root name for snapshot picture(s).
 * Default: snapshot.
 * @default snapshot
 *
 * @param Q37
 * @text Q37: Map Event Orbits
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q38
 * @text Q38: Touch Move Edit
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q38_holdDash
 * @text - Hold Touch to Dash
 * @parent Q38
 * @type boolean
 * @desc If true, enables "hold touch" as a "dash" input.
 * Default: true
 * @default true
 *
 * @param Q39
 * @text Q39: Attack/Guard Names
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q40
 * @text Q40: Touch Select SE
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q41
 * @text Q41: Lighting
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q41_maxLights
 * @text - Max Lights
 * @parent Q41
 * @type number
 * @decimals 0
 * @min 1
 * @max 256
 * @desc Maximum number of light sources on-screen at any time.
 * Default: 16.
 * @default 16
 *
 * @param Q41_feather
 * @text - Feather
 * @parent Q41
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @desc Soft light: fraction from where light begins to fade.
 * Default: 0.5.
 * @default 0.5
 *
 * @param Q41_selfRadius
 * @text - Self Radius
 * @parent Q41
 * @type number
 * @decimals 0
 * @min 0
 * @max 100000
 * @desc Size of "keyhole" around source of FoV light.
 * Default: 32 px.
 * @default 32
 *
 * @param Q41_fovAngle
 * @text - FoV Angle
 * @parent Q41
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 180
 * @desc FoV angle for directional light sources.
 * Default: 135°.
 * @default 135
 *
 * @param Q41_natRange
 * @text - Natural Range
 * @parent Q41
 * @type number
 * @decimals 0
 * @min 0
 * @max 100000
 * @desc Range of player FoV without lights. 0 to disable.
 * Default: 192 px (4 * 48 px).
 * @default 192
 *
 * @param Q41_natColour
 * @text - Natural Colour
 * @parent Q41
 * @type string
 * @desc Space-separated RGBA values for player FoV without light sources. Default: 0 0 0 26 (10% black).
 * @default 0 0 0 26
 *
 * @param Q41_filterBase
 * @text - Base Only
 * @parent Q41
 * @type boolean
 * @desc If true: pictures, timer, and weather will not be affected by lighting.
 * @default true
 *
 * @param Q41_optTxt
 * @text - Option Name
 * @parent Q41
 * @type string
 * @desc Display name for Soft Light option in-game.
 * Default: Soft Light. Will not be added if blank.
 * @default Soft Light
 *
 * @param Q41_optDef
 * @text - Option Default
 * @parent Q41_optTxt
 * @type boolean
 * @desc If true, soft light is initially enabled.
 * Default: true.
 * @default true
 *
 * @param Q41_optSym
 * @text - Option Key
 * @parent Q41_optTxt
 * @type string
 * @desc Internal key used for in-game Soft Light option.
 * Default: softLight.
 * @default softLight
 *
 * @command Q41_setDark
 * @text Q41: Set Dark Colour
 * @desc Set colour for darkness.
 * This will reset on transfer to a new map.
 *
 * @arg rgba
 * @text Dark Colour
 * @type string
 * @desc Comma-separated RGBA values for new dark colour.
 * This uses the same format as the <dark> map notetag.
 * @default 0, 0, 0, 0
 *
 * @command Q41_resetDark
 * @text Q41: Reset Dark Colour
 * @desc Resets colour for darkness to this map's default.
 *
 * @param Q42
 * @text Q42: Streamlined Shops
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q43
 * @text Q43: Game Speed Option
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q43_lst
 * @text - Speed Values
 * @parent Q43
 * @type number[]
 * @decimals 2
 * @min 0.1
 * @max 10
 * @desc Values available for selection for in-game Game Speed option. Default: 0.5..2.
 * @default ["0.5","0.75","1","1.25","1.5","1.75","2"]
 *
 * @param Q43_txt
 * @text - Option Name
 * @parent Q43
 * @type string
 * @desc Display name for the Game Speed option in-game.
 * Default: Game Speed.
 * @default Game Speed
 *
 * @param Q43_key
 * @text - Option Key
 * @parent Q43
 * @type string
 * @desc Internal key used for in-game Game Speed option.
 * Default: gameSpeed.
 * @default gameSpeed
 *
 * @param Q44
 * @text Q44: Actor Command Order
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q45
 * @text Q45: Vertical Scrollbars
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q45_colour
 * @text - Colour
 * @parent Q45
 * @type color
 * @desc Windowskin colour ID for scrollbars.
 * Alternatively, enter a CSS colour via the Text tab.
 * @default 16
 *
 * @param Q45_weight
 * @text - Thickness
 * @parent Q45
 * @type number
 * @decimals 0
 * @min 1
 * @max 20
 * @desc Scrollbar thickness.
 * Default: 4 px.
 * @default 4
 *
 * @param Q45_opacity
 * @text - Opacity
 * @parent Q45
 * @type number
 * @decimals 0
 * @min 1
 * @max 255
 * @desc Scrollbar opacity.
 * Default: 128 (~50%).
 * @default 128
 *
 * @param Q46
 * @text Q46: Status Screen Layout
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q46_label
 * @text - Label
 * @parent Q46
 * @type string
 * @desc Optional EXP gauge label.
 * @default
 *
 * @param Q46_value
 * @text - Show Value
 * @parent Q46
 * @type boolean
 * @desc If true, show % progress to next level on gauge.
 * Default: true.
 * @default true
 *
 * @param Q46_expForNext
 * @text - Exp For Next
 * @parent Q46
 * @type boolean
 * @desc If true, replace TO next display value with FOR next.
 * Default: false.
 * @default false
 *
 * @param Q47
 * @text Q47: Full Screen Option
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q47_txt
 * @text - Display Name
 * @parent Q47
 * @type string
 * @desc Display name for Full Screen option in-game.
 * Default: Full Screen.
 * @default Full Screen
 *
 * @param Q47_key
 * @text - Internal Key
 * @parent Q47
 * @type string
 * @desc Internal key used for in-game Full Screen option.
 * Default: fullscreen.
 * @default fullscreen
 *
 * @param Q48
 * @text Q48: Custom Cursor
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q48_data
 * @text - Cursors
 * @parent Q48
 * @type struct<CursorInfoType>[]
 * @desc List of available custom cursor images. Leave blank for Fallback Style.
 * @default []
 *
 * @param Q48_fallback
 * @text - Fallback Style
 * @parent Q48
 * @type combo
 * @option auto
 * @option default
 * @option crosshair
 * @option pointer
 * @desc CSS cursor style used when custom cursors are unspecified or unavailable.
 * @default default
 *
 * @param Q48_idle
 * @text - Idle Hide Time
 * @parent Q48
 * @type number
 * @decimals 0
 * @min 0
 * @max 216000
 * @desc Cursor will hide after this many frames without moving. Use 0 to disable this feature.
 * @default 180
 *
 * @param Q48_optFallback
 * @text - Fallback Name
 * @parent Q48
 * @type string
 * @desc Display name for fallback cursor style option.
 * Will not be included in option values if blank.
 * @default Basic
 *
 * @param Q48_optTxt
 * @text - Option Name
 * @parent Q48
 * @type string
 * @desc Display name for cursor selection option in-game.
 * Enabled if not blank and there are at least 2 choices.
 * @default Cursor Type
 *
 * @param Q48_optKey
 * @text - Option Key
 * @parent Q48
 * @type string
 * @desc Internal key for in-game cursor selection option.
 * @default cursorType
 *
 * @param Q49
 * @text Q49: Choice Controls
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q49_dealignY
 * @text - Centre Y Solo Choices
 * @parent Q49
 * @type boolean
 * @desc If true, choice window position is vertically centred when message window is closed.
 * @default true
 *
 * @param Q49_alignX
 * @text - Align Text to Window
 * @parent Q49
 * @type boolean
 * @desc If true, align choice text to match its window.
 * @default true
 *
 * @param Q49_canMerge
 * @text - Enable Merge
 * @parent Q49
 * @type boolean
 * @desc If true, back-to-back Show Choices commands will be merged together.
 * @default true
 *
 * @param Q49_useIndexMap
 * @text - Enable Index Map
 * @parent Q49
 * @type boolean
 * @desc If true, index mapping is enabled.
 * Required for hiding or shuffling choices.
 * @default true
 *
 * @param Q49_dFaultShuffle
 * @text - Default Shuffle
 * @parent Q49_useIndexMap
 * @type boolean
 * @desc Whether shuffle is enabled by default.
 * @default false
 *
 * @param Q49_canInline
 * @text - Enable Inline
 * @parent Q49
 * @type boolean
 * @desc If true, choices can be placed "inside" messages.
 * @default true
 *
 * @param Q49_dFaultInline
 * @text - Default Inline
 * @parent Q49_canInline
 * @type boolean
 * @desc Whether choices are displayed inside the message by default.
 * @default false
 *
 * @param Q49_inlineX
 * @text - Inline X Offset
 * @parent Q49_canInline
 * @type number
 * @decimals 0
 * @min -9999
 * @max 9999
 * @desc Value added to inlined choice X position.
 * Default: 8 px.
 * @default 8
 *
 * @param Q49_inlineW
 * @text - Inline Width Offset
 * @parent Q49_canInline
 * @type number
 * @decimals 0
 * @min -9999
 * @max 9999
 * @desc Value added to inlined choice width.
 * Default: 0 px.
 * @default 0
 *
 * @param Q49_autoReset
 * @text - Auto-Reset
 * @parent Q49
 * @type boolean
 * @desc Determines whether to reset plugin command effects on choice end.
 * @default false
 *
 * @param Q49_rxDesc
 * @text - Help Format
 * @parent Q49
 * @type string
 * @desc Regular expression to match the first line of a choice help comment. Disabled if blank. Default: Help:?\s*(.*)
 * @default Help:?\s*(.*)
 *
 * @command Q49_disable
 * @text Q49: Disable Choices
 * @desc Disables/enables specified choice indices.
 *
 * @arg indices
 * @text Indices
 * @type number[]
 * @decimals 0
 * @min 0
 * @max 999
 * @desc Affected choice indices.
 * 0 = first choice in the list.
 * @default []
 *
 * @arg type
 * @text Value
 * @type select
 * @option Disable
 * @option Enable
 * @option Toggle
 * @desc Operation to perform.
 * @default Disable
 *
 * @command Q49_hide
 * @text Q49: Hide Choices
 * @desc Hides/shows specified choice indices.
 *
 * @arg indices
 * @text Indices
 * @type number[]
 * @decimals 0
 * @min 0
 * @max 999
 * @desc Affected choice indices.
 * 0 = first choice in the list.
 * @default []
 *
 * @arg type
 * @text Value
 * @type select
 * @option Hide
 * @option Show
 * @option Toggle
 * @desc Operation to perform.
 * @default Hide
 *
 * @command Q49_shuffle
 * @text Q49: Shuffle Choices
 * @desc Enables/disables random choice order.
 *
 * @arg type
 * @text Value
 * @type select
 * @option On
 * @option Off
 * @option Toggle
 * @option Reset
 * @desc Operation to perform.
 * @default On
 *
 * @command Q49_inline
 * @text Q49: Inline Choices
 * @desc Enables/disables showing choices "inside" the message window.
 *
 * @arg type
 * @text Value
 * @type select
 * @option On
 * @option Off
 * @option Toggle
 * @option Reset
 * @desc Operation to perform.
 * @default On
 *
 * @param Q50
 * @text Q50: Menu Arrangement
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q50_posCmd
 * @text - Alt Position: Command
 * @parent Q50
 * @type boolean
 * @desc If true, the command window position will be changed (right/left).
 * @default false
 *
 * @param Q50_posHlp
 * @text - Alt Position: Help
 * @parent Q50
 * @type boolean
 * @desc If true, the help window position will be changed (bottom/top).
 * @default false
 *
 * @param Q50_posBtn
 * @text - Alt Position: Buttons
 * @parent Q50
 * @type boolean
 * @desc If true, the Touch UI button area will be changed (top/bottom).
 * @default false
 *
 * @param Q50_auxHelp
 * @text - Mini Help Window
 * @parent Q50
 * @type boolean
 * @desc If true, add a small help window in the middle of the Touch UI button area.
 * @default false
 *
 * @param Q50_auxHelpBG
 * @text - Mini Help BG Type
 * @parent Q50_auxHelp
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Background type for mini help window.
 * Default: 0 - Window.
 * @default 0
 *
 * @param Q50_auxHelpFS
 * @text - Mini Help Font Size
 * @parent Q50_auxHelp
 * @type number
 * @decimals 0
 * @min 12
 * @max 100
 * @desc Font size for mini help window.
 * Default: 22.
 * @default 22
 *
 * @param Q50_auxHelpText
 * @text - Mini Help Text
 * @parent Q50_auxHelp
 * @type struct<ConstructorFunctionType>[]
 * @desc Functions determining text shown in mini-help window.
 * Only applies to Scene_MenuBase and subclasses.
 * @default ["{\"name\":\"Scene_MenuBase\",\"fTxt\":\"const pageInfo = this.needsPageButtons() ?\\n  \\\", ⏴⏵ = \\\\\\\\c[4]QE\\\\\\\\c[0]\\\" : \\\"\\\";\\nreturn \\\"\\\\\\\\c[4]↑←↓→\\\\\\\\c[0]|\\\\\\\\c[4]WASD\\\\\\\\c[0]\\\"\\n     + \\\", OK = \\\\\\\\c[4]Z\\\\\\\\c[0]\\\"\\n     + pageInfo\\n     + \\\", ↩ = \\\\\\\\c[4]X\\\\\\\\c[0].\\\";\"}","{\"name\":\"Scene_Options\",\"fTxt\":\"return \\\"\\\\\\\\c[4]↑↓\\\\\\\\c[0]|\\\\\\\\c[4]WS\\\\\\\\c[0]\\\"\\n     + \\\", ⏴⏵ = \\\\\\\\c[4]←→\\\\\\\\c[0]|\\\\\\\\c[4]AD\\\\\\\\c[0]\\\"\\n     + \\\", OK = \\\\\\\\c[4]Z\\\\\\\\c[0]\\\"\\n     + \\\", ↩ = \\\\\\\\c[4]X\\\\\\\\c[0].\\\";\"}","{\"name\":\"Scene_Name\",\"fTxt\":\"return \\\"\\\\\\\\c[4]↑←↓→\\\\\\\\c[0]|\\\\\\\\c[4]WASD\\\\\\\\c[0]\\\"\\n     + \\\", end = \\\\\\\\c[4]⇧\\\\\\\\c[0]\\\"\\n     + \\\", OK = \\\\\\\\c[4]Z\\\\\\\\c[0]\\\"\\n     + \\\", ⏴⏵ = \\\\\\\\c[4]QE\\\\\\\\c[0]\\\"\\n     + \\\", ↩ = \\\\\\\\c[4]X\\\\\\\\c[0].\\\";\"}","{\"name\":\"Scene_Shop\",\"fTxt\":\"const pageInfo = $gameParty.size() > 4 ?\\n  \\\", reserve = \\\\\\\\c[4]⇧\\\\\\\\c[0]\\\" : \\\"\\\";\\nreturn \\\"\\\\\\\\c[4]↑←↓→\\\\\\\\c[0]|\\\\\\\\c[4]WASD\\\\\\\\c[0]\\\"\\n     + \\\", OK = \\\\\\\\c[4]Z\\\\\\\\c[0]\\\"\\n     + pageInfo\\n     + \\\", ↩ = \\\\\\\\c[4]X\\\\\\\\c[0].\\\";\"}","{\"name\":\"Scene_GameEnd\",\"fTxt\":\"return \\\"\\\";\"}","{\"name\":\"Scene_Debug\",\"fTxt\":\"return \\\"\\\";\"}"]
 *
 * @param Q50_nameSquish
 * @text - Patch Name Edit Height
 * @parent Q50_auxHelp
 * @type boolean
 * @desc Determines whether name edit window can be shrunk to make room for the mini help window.
 * @default true
 *
 * @param Q50_auxHelpPeriod
 * @text - Mini Help Refresh Time
 * @parent Q50_auxHelp
 * @type number
 * @decimals 0
 * @min 0
 * @max 99999
 * @desc Frames between mini-help text refreshes.
 * Use 0 to refresh only on scene start.
 * @default 180
 *
 * @param Q50_auxHelpTransitTime
 * @text - Mini Help Fade Time
 * @parent Q50_auxHelpPeriod
 * @type number
 * @decimals 0
 * @min 0
 * @max 99999
 * @desc Frames for transition animation on refresh.
 * Use 0 for no transition effect.
 * @default 30
 *
 * @param Q51
 * @text Q51: Master Volume
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q51_optTxt
 * @text - Option Name
 * @parent Q51
 * @type string
 * @desc Display name for the master volume option in-game.
 * @default Master Volume
 *
 * @param Q51_dfault
 * @text - Default Volume
 * @parent Q51
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Default value for master volume.
 * @default 100
 *
 * @param Q52
 * @text Q52: Option Categories
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q52_cats
 * @text - Categories
 * @parent Q52
 * @type struct<OptCategoryType>[]
 * @desc Defines categories for existing option commands.
 * @default ["{\"name\":\"Gameplay\",\"cmds\":\"[\\\"alwaysDash\\\",\\\"activeTpb\\\",\\\"commandRemember\\\",\\\"gameSpeed\\\"]\",\"help\":\"Game mechanics options.\"}","{\"name\":\"Audio\",\"cmds\":\"[\\\"audioHDR\\\",\\\"bgmVolume\\\",\\\"bgsVolume\\\",\\\"masterVolume\\\",\\\"meVolume\\\",\\\"seVolume\\\"]\",\"help\":\"Sound options.\"}","{\"name\":\"Graphics\",\"cmds\":\"[\\\"cursorType\\\",\\\"fullscreen\\\",\\\"softLight\\\",\\\"touchUI\\\"]\",\"help\":\"Interface and rendering options.\"}"]
 *
 * @param Q52_dfaultCat
 * @text - Default Category
 * @parent Q52
 * @type string
 * @desc Commands with no given category will be placed here.
 * Leave blank to omit commands with no category.
 * @default Uncategorised
 *
 * @param Q52_horz
 * @text - Horizontal?
 * @parent Q52
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Determines category window layout.
 * Default: Vertical (false).
 * @default false
 *
 * @param Q52_topLeft
 * @text - Top/Left?
 * @parent Q52
 * @type boolean
 * @on Top/Left
 * @off Bottom/Right
 * @desc Determines category window position relative to options window. Default: Top/Left (true).
 * @default true
 *
 * @param Q52_centre
 * @text - Centred?
 * @parent Q52
 * @type boolean
 * @desc If true, attempt to centre the options/category window combination. Default: true.
 * @default true
 *
 * @param Q52_reduceRows
 * @text - Reduce Rows
 * @parent Q52
 * @type number
 * @decimals 0
 * @min 0
 * @max 99
 * @desc Reduce maximum rows of options window by this value. Default: 0.
 * @default 0
 *
 * @param Q53
 * @text Q53: Hover Tips
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q53_tips
 * @text - Tips
 * @parent Q53
 * @type struct<HoverTipType>[]
 * @desc Defines tips for given text strings.
 * @default []
 *
 * @param Q53_bgType
 * @text - Background Type
 * @parent Q53
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Determines background type for the hover tip window.
 * @default 1
 *
 * @param Q53_cursorPadX
 * @text - X Padding
 * @parent Q53
 * @type number
 * @decimals 0
 * @min 0
 * @max 9999
 * @desc Pixels added to each side of hover tip areas.
 * Default: 4 px.
 * @default 4
 *
 * @param Q53_navKey
 * @text - Navigation Key
 * @parent Q53
 * @type combo
 * @option shift
 * @option tab
 * @option ctrl
 * @desc When a button with this name is pressed, the next tip (if any) will be selected.
 * @default shift
 *
 * @param Q54
 * @text Q54: Option Display
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q54_height
 * @text - Height
 * @parent Q54
 * @type number
 * @decimals 0
 * @min 0
 * @max 999
 * @desc Gauge height (px). Use 0 to skip adding gauges.
 * Default: 24 px.
 * @default 24
 *
 * @param Q54_opacity
 * @text - Opacity
 * @parent Q54
 * @type number
 * @decimals 0
 * @min 1
 * @max 255
 * @desc Gauge opacity (0~255).
 * Default: 128.
 * @default 128
 *
 * @param Q54_colour1
 * @text - Fill Colour A
 * @parent Q54
 * @type color
 * @desc Text colour index for low end of gauge fill area.
 * Alternatively, enter a CSS colour via the Text tab.
 * @default 7
 *
 * @param Q54_colour2
 * @text - Fill Colour B
 * @parent Q54
 * @type color
 * @desc Text colour index for high end of gauge fill area.
 * Alternatively, enter a CSS colour via the Text tab.
 * @default 0
 *
 * @param Q54_time
 * @text - Update Time
 * @parent Q54
 * @type number
 * @decimals 0
 * @min 1
 * @max 60
 * @desc The gauge takes this many frames to update when its value is changed.
 * @default 5
 *
 * @param Q54_txtOn
 * @text - Value ON
 * @parent Q54
 * @type string
 * @desc Replacement text (if any) for the "ON" value of on/off options.
 * @default
 *
 * @param Q54_txtOff
 * @text - Value OFF
 * @parent Q54
 * @type string
 * @desc Replacement text (if any) for the "OFF" value of on/off options.
 * @default
 *
 * @param Q55
 * @text Q55: State Overlays
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param Q55_map
 * @text - For Map Party?
 * @parent Q55
 * @type boolean
 * @desc If true, show state overlays on player/follower map characters when appropriate.
 * @default true
 *
 * @param Q55_nme
 * @text - For Battle Enemies?
 * @parent Q55
 * @type boolean
 * @desc If true, show state overlays on enemies when applicable.
 * @default false
 *
 * @param Q55_nmeAnchorX
 * @text - Anchor X Offset
 * @parent Q55_nme
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Affects X position of overlay on enemy sprite.
 * Default: 0.1
 * @default 0.1
 *
 * @param Q55_nmeAnchorY
 * @text - Anchor Y Offset
 * @parent Q55_nme
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Affects Y position of overlay on enemy sprite.
 * Default: -0.7
 * @default -0.7
 *
 * @param D01
 * @text D01: Copy Troop Events
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D02
 * @text D02: Line-of-Sight Tools
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D02_dfaultFoV
 * @text - Default FoV
 * @parent D02
 * @type number
 * @decimals 0
 * @min 1
 * @max 360
 * @desc FoV used for line-of-sight checks when not otherwise specified. Default: 135°.
 * @default 135
 *
 * @param D02_opaqueR
 * @text - Opaque Regions
 * @parent D02
 * @type number[]
 * @decimals 0
 * @min 1
 * @max 255
 * @desc Regions considered opaque for line-of-sight checks.
 * @default []
 *
 * @param D02_enableTag
 * @text - Enable Event Tag
 * @parent D02
 * @type boolean
 * @desc If true, enable the <los> event tag for line-of-sight triggers.
 * @default false
 *
 * @param D02_blockFct
 * @text - JS: Is LoS Blocked?
 * @parent D02
 * @type multiline_string
 * @desc Function body determining whether LoS is blocked.
 * (target, x, y, d) => boolean. Sighting character = this.
 * @default // Walls and wall-tops block LoS.
 * if (Array.from(
 *   { length: 4 }, (_, z) => $gameMap.tileId(x, y, z)
 * ).some(id => Tilemap.isShadowingTile(id)))
 *   return true;
 * // Collidable characters block LoS.
 * if (this.isCollidedWithCharacters(x, y))
 *   return true;
 * return false;
 *
 * @param D02_debugRef
 * @text - Debug Text
 * @parent D02
 * @type string
 * @desc Text to use for console test message: blank, LoS, start.
 * Default: -xo                      (leave blank to disable)
 * @default -xo
 *
 * @param D03
 * @text D03: Config Save Error
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D03_errMsg
 * @text - Error Message
 * @parent D03
 * @type multiline_string
 * @desc Alert shown when config fails to save.
 * Leave blank to avoid showing a message.
 * @default Failed to save options!
 *
 * To do so, the game requires permission to access local storage.
 * For web games: try enabling cookies, then refresh the page.
 *
 * @param D04
 * @text D04: Copy Item Effects
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D05
 * @text D05: Enemy _targetIndex
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D06
 * @text D06: Cumulative Result
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D07
 * @text D07: Audio Pitch
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D07_tickSync
 * @text - Scale with Game Speed
 * @parent D07
 * @type boolean
 * @desc If true, audio pitch will scale with game speed, e.g. Q43. Reduces desync chance at full fps.
 * @default true
 *
 * @param D08
 * @text D08: Paired "Last" Data
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D09
 * @text D09: Enemy Face Redirect
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D10
 * @text D10: Enemy Action Redirect
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D11
 * @text D11: Tile Event Flags
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D12
 * @text D12: Set Battle Advantage
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D12_persist
 * @text - Save Data?
 * @parent D12
 * @type boolean
 * @desc If true, this feature's command effects will persist through save/load.
 * @default false
 *
 * @command D12_preemptive
 * @text D12: Party Battle Advantage
 * @desc Forces preemptive modifier for next battle.
 *
 * @command D12_surprise
 * @text D12: Enemy Battle Advantage
 * @desc Forces surprise modifier for next battle.
 *
 * @param D13
 * @text D13: Pinned Pictures
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D14
 * @text D14: L/R Window Arrows
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D15
 * @text D15: Detailed Errors
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D15_buttonLabel
 * @text - Button Label
 * @parent D15
 * @type string
 * @desc Display text for the Copy to Clipboard button.
 * Default: Copy to Clipboard.
 * @default Copy to Clipboard
 *
 * @param D15_fontSize
 * @text - Font Size
 * @parent D15
 * @type number
 * @decimals 0
 * @min 8
 * @max 1000
 * @desc Font size for error stack information.
 * Default: 12 pt.
 * @default 12
 *
 * @param D16
 * @text D16: Measure Msg Support
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D17
 * @text D17: Merge Music Volume
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D18
 * @text D18: Copy Troop Members
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D19
 * @text D19: Fast Move Commands
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D20
 * @text D20: Reinforcements
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @command D20_reinforce
 * @text D20: Enemy Reinforcements
 * @desc Add new enemies to the current troop.
 * No effect if not in battle.
 *
 * @arg Troop ID
 * @type troop
 * @desc Troop from which reinforcements are drawn.
 * @default 0
 *
 * @param D21
 * @text D21: Save/Load Commands
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D21_countFail
 * @text - Track Failed Saves
 * @parent D21
 * @type boolean
 * @desc If true, Save Count will not increase on failed saves.
 * @default false
 *
 * @param D21_countAuto
 * @text - Track Autosaves
 * @parent D21
 * @type boolean
 * @desc If true, the game will count autosaves separately.
 * The reported Save Count will exclude autosaves.
 * @default false
 *
 * @command D21_save
 * @text D21: Save Game
 * @desc Saves the game to specified save slot.
 * Designed for use on the map.
 *
 * @arg Save File ID
 * @type number
 * @min -1
 * @max 999
 * @decimals 0
 * @desc ID of target save file. Use 0 for autosave.
 * Use -1 for most recent manual save this playthrough.
 * @default 0
 *
 * @arg Play SE
 * @type boolean
 * @desc If true, play Save/Buzzer system sounds on success/fail.
 * @default true
 *
 * @arg Switch on Success
 * @type switch
 * @desc Switch to turn on when save succeeds (optional).
 * @default 0
 *
 * @command D21_load
 * @text D21: Load Game
 * @desc Loads the game from specified save slot.
 * Designed for use on the map.
 *
 * @arg Save File ID
 * @type number
 * @min -1
 * @max 999
 * @decimals 0
 * @desc ID of save file to load. Use 0 for autosave.
 * Use -1 for most recent manual save this playthrough.
 * @default 0
 *
 * @arg Play SE
 * @type boolean
 * @desc If true, play Load/Buzzer system sounds on success/fail.
 * @default true
 *
 * @arg Switch on Success
 * @type switch
 * @desc Switch to turn on when load succeeds (optional).
 * @default 0
 *
 * @arg Fade Type
 * @type select
 * @option 0 - Black
 * @value 0
 * @option 1 - White
 * @value 1
 * @option 2 - None
 * @value 2
 * @desc Fade transition to apply after a successful load.
 * @default 0
 *
 * @param D22
 * @text D22: Silent Switch/Var
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D22_pattern
 * @text - Pattern
 * @parent D22
 * @type string
 * @desc Affects switches/variables with names matching this regular expression. Default: ^# (starts with #).
 * @default ^#
 *
 * @param D23
 * @text D23: CSPRNG randomInt
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D23_intOnly
 * @text - Integer Only
 * @parent D23
 * @type boolean
 * @desc If true, Math.randomInt is replaced.
 * If false, Math.random is replaced (affects randomInt).
 * @default false
 *
 * @param D24
 * @text D24: Manual Cache
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D24_bootMaps
 * @text - Precache Maps
 * @parent D24
 * @type number[]
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc IDs of maps to cache when the game boots up.
 * @default []
 *
 * @param D24_bootImgs
 * @text - Precache Images
 * @parent D24
 * @type file[]
 * @dir img
 * @require 1
 * @desc Images to cache when the game boots up.
 * @default []
 *
 * @param D24_bootSnds
 * @text - Precache Audio
 * @parent D24
 * @type file[]
 * @dir audio
 * @require 1
 * @desc Audio to cache when the game boots up.
 * @default []
 *
 * @command D24_cacheMap
 * @text D24: Cache Map
 * @desc Load a map's data into memory.
 *
 * @arg Map ID
 * @type number
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc ID of map to cache.
 * @default 1
 *
 * @command D24_cacheImg
 * @text D24: Cache Image
 * @desc Load an image into memory.
 *
 * @arg URL
 * @type file
 * @dir img
 * @require 1
 * @desc Image to cache.
 * @default
 *
 * @command D24_cacheSnd
 * @text D24: Cache Audio
 * @desc Load an audio file into memory. This uses a static buffer. See description for details.
 *
 * @arg URL
 * @type file
 * @dir audio
 * @require 1
 * @desc Audio to cache.
 * @default
 *
 * @command D24_uncacheMap
 * @text D24: Uncache Map
 * @desc Remove map(s) from this feature's cache.
 *
 * @arg Map ID
 * @type number
 * @decimals 0
 * @min 1
 * @max 9999
 * @desc ID of map to uncache.
 * Use 0 to clear this feature's map cache.
 * @default 0
 *
 * @command D24_uncacheImg
 * @text D24: Uncache Image
 * @desc Remove image(s) from this feature's cache.
 *
 * @arg URL
 * @type file
 * @dir img
 * @desc Image to uncache.
 * Leave blank to clear this feature's image cache.
 * @default
 *
 * @command D24_uncacheSnd
 * @text D24: Uncache Audio
 * @desc Remove audio from this feature's cache.
 *
 * @arg URL
 * @type file
 * @dir audio
 * @desc Audio to uncache.
 * Leave blank to clear this feature's audio cache.
 * @default
 *
 * @param D25
 * @text D25: Auto Battle Guard
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D26
 * @text D26: Default Options
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D26_values
 * @text - Values
 * @parent D26
 * @type struct<DfaultConfigsType>
 * @desc Custom default values for core game options.
 * @default {}
 *
 * @param D27
 * @text D27: To/From Pathfinding
 * @type boolean
 * @desc Is this feature enabled?
 * @default false
 *
 * @param D27_to
 * @text - Path Toward?
 * @parent D27
 * @type boolean
 * @desc If true, replace Move Toward Character with a pathfinding algorithm.
 * @default true
 *
 * @param D27_from
 * @text - Path Away?
 * @parent D27
 * @type boolean
 * @desc If true, replace Move Away From Character with a pathfinding algorithm.
 * @default true
 *
 * @param D27_limit
 * @text - Search Limit
 * @parent D27
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Maximum number of tiles to search, or 0 for no change. See help for details.
 * @default 0
 *
 * @param EXT
 * @text -------- Advanced --------
 * @type select
 * @option --------------------------------
 * @desc Advanced config settings for this plugin.
 * @default --------------------------------
 *
 * @param tags
 * @text Tag Names
 * @parent EXT
 * @type struct<TagNamesType>
 * @desc Names for this plugin's notetags.
 * Leave blank to use default tag names, matching the help.
 * @default
 *
 * @param tags_checkDupes
 * @text - Check for Duplicates
 * @parent tags
 * @type boolean
 * @desc If true, warn about any duplicate tag names found on boot. Only applies during playtest.
 * @default true
 */
// -------------------------------------------------- //
/*~struct~CostTypeType:
 * @param type
 * @text Type Identifier
 * @type combo
 * @option tp
 * @option mp
 * @option hp
 * @option item
 * @option weapon
 * @option armor
 * @option money
 * @option var
 * @option warmup
 * @option cooldown
 * @desc Unique internal identifier for this cost type.
 * "tp" and "mp" represent the core TP and MP costs.
 * @default
 *
 * @param rx
 * @text Type RegEx
 * @type string
 * @desc Case-insensitive regular expression for matching the name of this cost type.
 * @default
 *
 * @param display
 * @text JS: Display Cost
 * @type multiline_string
 * @desc Function body: returns cost display text.
 * (subject, item, cost, ext=0) => string.
 * @default return "";
 *
 * @param canPay
 * @text JS: Can Pay
 * @type multiline_string
 * @desc Function body: returns true iff can pay cost.
 * (subject, item, cost, ext=0) => boolean.
 * @default return true;
 *
 * @param onPay
 * @text JS: On Pay
 * @type multiline_string
 * @desc Function body: processes cost payment.
 * (subject, item, cost, ext=0) => void.
 * @default
 */
// -------------------------------------------------- //
/*~struct~PartySwitchCommandType:
 * @param txt
 * @text Display Text
 * @type string
 * @desc Text shown in-game for this command.
 * @default
 *
 * @param sw
 * @text Switch ID
 * @type switch
 * @desc When the switch is on, the command is disabled.
 * On command OK, this switch is turned on.
 * @default 0
 */
// -------------------------------------------------- //
/*~struct~OptType:
 * @param data
 * @text Descriptions
 * @type struct<OptDescType>[]
 * @desc Descriptions for all options.
 * @default ["{\"sym\":\"alwaysDash\",\"desc\":\"When ON, the player will dash unless the dash key is held.\"}","{\"sym\":\"commandRemember\",\"desc\":\"When ON, the previous battle command will be remembered.\"}","{\"sym\":\"touchUI\",\"desc\":\"When ON, the in-game touch interface will be shown.\"}","{\"sym\":\"bgmVolume\",\"desc\":\"Volume of background music.\\nHold shift, or click & drag, to adjust more precisely.\"}","{\"sym\":\"bgsVolume\",\"desc\":\"Volume of background/ambient sounds.\\nHold shift, or click & drag, to adjust more precisely.\"}","{\"sym\":\"meVolume\",\"desc\":\"Volume of music effects.\\nHold shift, or click & drag, to adjust more precisely.\"}","{\"sym\":\"seVolume\",\"desc\":\"Volume of sound effects.\\nHold shift, or click & drag, to adjust more precisely.\"}","{\"sym\":\"audioHDR\",\"desc\":\"When OFF, the game's volume range will be compressed.\\nThis can help improve clarity in noisy conditions.\"}","{\"sym\":\"activeTpb\",\"desc\":\"When ON, battle pauses only when choosing an item/skill.\\nThis can offer different tactics.\"}","{\"sym\":\"softLight\",\"desc\":\"When ON, soften edges between light and dark areas.\\nTurn OFF for hard edges (less GPU-intensive).\"}","{\"sym\":\"gameSpeed\",\"desc\":\"Game play rate, compared to normal.\\nMay help for accessibility or speedruns.\"}","{\"sym\":\"fullscreen\",\"desc\":\"Toggles full-screen display on or off.\\nFull-screen can also be toggled by pressing F4.\"}"]
 *
 * @param unknown
 * @text Unknown Description
 * @type multiline_string
 * @desc Shown for options without a specific description.
 * %1 will be replaced with the command symbol.
 * @default %1
 */
/*~struct~OptDescType:
 * @param sym
 * @text Option Symbol
 * @type string
 * @desc Symbol for this option.
 * @default
 *
 * @param desc
 * @text Description
 * @type multiline_string
 * @desc Description shown for this option.
 * @default
 */
// -------------------------------------------------- //
/*~struct~TagOffsetType:
 * @param tag
 * @text Terrain Tag
 * @type number
 * @decimals 0
 * @min 0
 * @max 7
 * @desc Terrain tag for this offset.
 * @default 1
 *
 * @param x
 * @text Offset X
 * @type number
 * @decimals 0
 * @min -10000
 * @max 10000
 * @desc X-offset for this tag (px).
 * @default 0
 *
 * @param y
 * @text Offset Y
 * @type number
 * @decimals 0
 * @min -10000
 * @max 10000
 * @desc Y-offset for this tag (px).
 * @default 0
 */
// -------------------------------------------------- //
/*~struct~SegmentValueType:
 * @param type
 * @text Gauge Type
 * @type combo
 * @option hp
 * @option mp
 * @option tp
 * @option time
 * @option exp
 * @desc Internal identifier for gauge type.
 * @default hp
 *
 * @param value
 * @text Segment Value
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 100000000
 * @desc Value per segment for this gauge type.
 * @default 100
 */
// -------------------------------------------------- //
/*~struct~EnemyGaugeType:
 * @param type
 * @text Gauge Type
 * @type combo
 * @option hp
 * @option mp
 * @option tp
 * @option time
 * @desc Internal identifier for gauge type.
 * @default hp
 *
 * @param offsetX
 * @text Offset X
 * @type number
 * @decimals 0
 * @min -10000
 * @max 10000
 * @desc Additive X offset. Default: 0 px.
 * @default 0
 *
 * @param offsetY
 * @text Offset Y
 * @type number
 * @decimals 0
 * @min -10000
 * @max 10000
 * @desc Additive Y offset. Default: 0 px.
 * @default 0
 *
 * @param anchorX
 * @text Anchor Offset X
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Additional gauge X parent anchor.
 * Default: 0 (centred on parent anchor).
 * @default 0
 *
 * @param anchorY
 * @text Anchor Offset Y
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Additional gauge Y parent anchor.
 * Default: -0.15 (15% parent height above parent anchor).
 * @default -0.15
 *
 * @param scaleX
 * @text Scale X
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc X-scale relative to parent sprite width. Default: 0.8.
 * @default 0.8
 *
 * @param scaleY
 * @text Scale Y
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Y-scale relative to standard gauge height. Default: 1.
 * @default 1
 *
 * @param opacity
 * @text Opacity
 * @type number
 * @decimals 0
 * @min 1
 * @max 255
 * @desc Gauge opacity (255 = opaque). Default: 204.
 * @default 204
 */
// -------------------------------------------------- //
/*~struct~ParamNameType:
 * @param text
 * @text Standard Param Names
 * @type struct<StdParamNamesType>
 * @desc Display names for standard parameters.
 * Excludes names defined in the database.
 * @default {"cri":"Critical Rate","cev":"Critical Evasion","mev":"Magic Evasion","mrf":"Magic Reflection","cnt":"Counter Attack","hrg":"HP Regeneration","mrg":"MP Regeneration","trg":"TP Regeneration","tgr":"Target Rate","grd":"Guard Effect","rec":"Recovery Effect","pha":"Pharmacology","mcr":"MP Cost Rate","tcr":"TP Charge Rate","pdr":"Physical Damage","mdr":"Magic Damage","fdr":"Floor Damage","exr":"Experience"}
 *
 * @param addText
 * @text Other Param Names
 * @type string[]
 * @desc Names for non-standard params, from plugins.
 * Param IDs start at 28.
 * @default []
 */
/*~struct~StdParamNamesType:
 * @param cri
 * @type string
 * @desc Default: Critical Rate.
 * @default Critical Rate
 *
 * @param cev
 * @type string
 * @desc Default: Critical Evasion.
 * @default Critical Evasion
 *
 * @param mev
 * @type string
 * @desc Default: Magic Evasion.
 * @default Magic Evasion
 *
 * @param mrf
 * @type string
 * @desc Default: Magic Reflection.
 * @default Magic Reflection
 *
 * @param cnt
 * @type string
 * @desc Default: Counter Attack.
 * @default Counter Attack
 *
 * @param hrg
 * @type string
 * @desc Default: HP Regeneration.
 * @default HP Regeneration
 *
 * @param mrg
 * @type string
 * @desc Default: MP Regeneration.
 * @default MP Regeneration
 *
 * @param trg
 * @type string
 * @desc Default: TP Regeneration.
 * @default TP Regeneration
 *
 * @param tgr
 * @type string
 * @desc Default: Target Rate.
 * @default Target Rate
 *
 * @param grd
 * @type string
 * @desc Default: Guard Effect.
 * @default Guard Effect
 *
 * @param rec
 * @type string
 * @desc Default: Recovery Effect.
 * @default Recovery Effect
 *
 * @param pha
 * @type string
 * @desc Default: Pharmacology.
 * @default Pharmacology
 *
 * @param mcr
 * @type string
 * @desc Default: MP Cost Rate.
 * @default MP Cost Rate
 *
 * @param tcr
 * @type string
 * @desc Default: TP Charge Rate.
 * @default TP Charge Rate
 *
 * @param pdr
 * @type string
 * @desc Default: Physical Damage.
 * @default Physical Damage
 *
 * @param mdr
 * @type string
 * @desc Default: Magic Damage.
 * @default Magic Damage
 *
 * @param fdr
 * @type string
 * @desc Default: Floor Damage.
 * @default Floor Damage
 *
 * @param exr
 * @type string
 * @desc Default: Experience.
 * @default Experience
 */
// -------------------------------------------------- //
/*~struct~ParamBuffInfoType:
 * @param hit
 * @text Hit Rate
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0.95
 * @default 0.95
 *
 * @param eva
 * @text Evasion Rate
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0.05
 * @default 0.05
 *
 * @param cri
 * @text Critical Rate
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0.1
 * @default 0.1
 *
 * @param cev
 * @text Critical Evasion
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param mev
 * @text Magic Evasion
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param mrf
 * @text Magic Reflection
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param cnt
 * @text Counter Attack
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param hrg
 * @text HP Regeneration
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param mrg
 * @text MP Regeneration
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param trg
 * @text TP Regeneration
 * @type number
 * @decimals 2
 * @min -10
 * @max 10
 * @desc Neutral value for this Ex-param. 1 = 100%.
 * Default: 0
 * @default 0
 *
 * @param tgr
 * @text Target Rate
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default true
 *
 * @param grd
 * @text Guard Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default false
 *
 * @param rec
 * @text Recovery Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default false
 *
 * @param pha
 * @text Pharmacology
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default false
 *
 * @param mcr
 * @text MP Cost Rate
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default true
 *
 * @param tcr
 * @text TP Charge Rate
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default false
 *
 * @param pdr
 * @text Physical Damage
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default true
 *
 * @param mdr
 * @text Magic Damage
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default true
 *
 * @param fdr
 * @text Floor Damage
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default true
 *
 * @param exr
 * @text Experience
 * @type boolean
 * @on YES
 * @off NO
 * @desc Are lower values better for this Sp-param?
 * @default false
 *
 * @param other
 * @text Custom Sp-Params
 * @type boolean[]
 * @on YES
 * @off NO
 * @desc For non-standard Sp-params, from plugins. Param ID 28+. Are lower values better for these params?
 * @default []
 */
// -------------------------------------------------- //
/*~struct~SplashImgType:
 * @param image
 * @text Image
 * @type file
 * @dir img
 * @require 1
 * @desc Background image for this splash screen.
 * Will be ignored if a Movie is specified.
 * @default system/Splash
 *
 * @param video
 * @text Movie
 * @type string
 * @desc File name (without extension) of Movie to play on this splash screen. Leave blank if using an Image instead.
 *
 * -- I see no "movie", "video", or eligible "file dir" param type configuration >_>
 * -- Note: exclude unused files only applies to img/ and audio/.
 * @default
 */
// -------------------------------------------------- //
/*~struct~AudioBgmType:
 * @param name
 * @text File Name
 * @type file
 * @dir audio/bgm
 * @require 1
 * @desc Specifies which background music track to play.
 * @default
 *
 * @param volume
 * @text Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc BGM volume. Default: 20%.
 * @default 20
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @decimals 0
 * @min 50
 * @max 150
 * @desc BGM pitch. Default: 100%.
 * @default 100
 *
 * @param pan
 * @text Panning
 * @type number
 * @decimals 0
 * @min -100
 * @max 100
 * @desc BGM left/right panning. Default: 0.
 * @default 0
 */
/*~struct~AudioMeType:
 * @param name
 * @text File Name
 * @type file
 * @dir audio/me
 * @require 1
 * @desc Specifies which musical effect to play.
 * @default
 *
 * @param volume
 * @text Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc ME volume. Default: 20%.
 * @default 20
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @decimals 0
 * @min 50
 * @max 150
 * @desc ME pitch. Default: 100%.
 * @default 100
 *
 * @param pan
 * @text Panning
 * @type number
 * @decimals 0
 * @min -100
 * @max 100
 * @desc ME left/right panning. Default: 0.
 * @default 0
 */
/*~struct~AudioBgsType:
 * @param name
 * @text File Name
 * @type file
 * @dir audio/bgs
 * @require 1
 * @desc Specifies which background sound to play.
 * @default
 *
 * @param volume
 * @text Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc BGS volume. Default: 20%.
 * @default 20
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @decimals 0
 * @min 50
 * @max 150
 * @desc BGS pitch. Default: 100%.
 * @default 100
 *
 * @param pan
 * @text Panning
 * @type number
 * @decimals 0
 * @min -100
 * @max 100
 * @desc BGS left/right panning. Default: 0.
 * @default 0
 */
/*~struct~AudioSeType:
 * @param name
 * @text File Name
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Specifies which sound effect to play.
 * @default
 *
 * @param volume
 * @text Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc SE volume. Default: 20%.
 * @default 20
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @decimals 0
 * @min 50
 * @max 150
 * @desc SE pitch. Default: 100%.
 * @default 100
 *
 * @param pan
 * @text Panning
 * @type number
 * @decimals 0
 * @min -100
 * @max 100
 * @desc SE left/right panning. Default: 0.
 * @default 0
 */
// -------------------------------------------------- //
/*~struct~CompressorSettingsType:
 * @param threshold
 * @text Threshold
 * @type number
 * @decimals 0
 * @min -100
 * @max 0
 * @desc Volume threshold (dB) at which compression starts.
 * @default -25
 *
 * @param knee
 * @text Knee
 * @type number
 * @decimals 0
 * @min 0
 * @max 40
 * @desc Range (dB) over which compression gradually increases. Centred on threshold.
 * @default 30
 *
 * @param ratio
 * @text Ratio
 * @type number
 * @decimals 0
 * @min 1
 * @max 20
 * @desc Full compression ratio for loud sounds.
 * @default 20
 *
 * @param attack
 * @text Attack
 * @type number
 * @decimals 3
 * @min 0
 * @max 1
 * @desc Time (seconds) needed to decrease volume by 10 dB.
 * @default 0.003
 *
 * @param release
 * @text Release
 * @type number
 * @decimals 3
 * @min 0
 * @max 1
 * @desc Time (seconds) needed to increase volume by 10 dB.
 * @default 0.2
 */
// -------------------------------------------------- //
/*~struct~CursorInfoType:
 * @param name
 * @text Name
 * @type string
 * @desc Display name for this cursor on options screen.
 * Leave blank for default "Cursor 1", "Cursor 2", etc.
 * @default
 *
 * @param img
 * @text Image
 * @type file
 * @dir img/system
 * @require 1
 * @desc Image for this cursor.
 * Recommended max 32x32 px.
 * @default
 *
 * @param imgPress
 * @text Image (press)
 * @type file
 * @dir img/system
 * @require 1
 * @desc Optional image override for this cursor on press.
 * Recommended max 32x32 px.
 * @default
 *
 * @param imgCancel
 * @text Image (cancel)
 * @type file
 * @dir img/system
 * @require 1
 * @desc Optional image override for this cursor on cancel.
 * Recommended max 32x32 px.
 * @default
 *
 * @param hotX
 * @text Hotspot X
 * @type number
 * @decimals 0
 * @min 0
 * @max 32
 * @desc X position of image on the "point" of the cursor.
 * Default: 0.
 * @default 0
 *
 * @param hotY
 * @text Hotspot Y
 * @type number
 * @decimals 0
 * @min 0
 * @max 32
 * @desc Y position of image on the "point" of the cursor.
 * Default: 0.
 * @default 0
 */
// -------------------------------------------------- //
/*~struct~RatingFormula:
 * @param dmgHp
 * @text JS: Damage HP
 * @type multiline_string
 * @desc Rating function to evaluate Damage HP formulae.
 * (action, target, value, ext[]) => number.
 * @default // Default: fraction of opponent HP damaged (0~1).
 * return action.isForOpponent() ? value / Math.max(target.hp, 1) : 0;
 *
 * @param dmgMp
 * @text JS: Damage MP
 * @type multiline_string
 * @desc Rating function to evaluate Damage MP formulae.
 * (action, target, value, ext[]) => number.
 * @default
 *
 * @param recHp
 * @text JS: Recover HP
 * @type multiline_string
 * @desc Rating function to evaluate Recover HP formulae.
 * (action, target, value, ext[]) => number.
 * @default // Default: fraction of non-opponent max HP healed (0~1).
 * return action.isForOpponent() ? 0 : Math.min(-value, target.mhp - target.hp) / target.mhp;
 *
 * @param recMp
 * @text JS: Recover MP
 * @type multiline_string
 * @desc Rating function to evaluate Recover MP formulae.
 * (action, target, value, ext[]) => number.
 * @default
 *
 * @param absHp
 * @text JS: Drain HP
 * @type multiline_string
 * @desc Rating function to evaluate Drain HP formulae.
 * (action, target, value, ext[]) => number.
 * @default // Default: same as Damage HP.
 * return this[1](...arguments);
 *
 * @param absMp
 * @text JS: Drain MP
 * @type multiline_string
 * @desc Rating function to evaluate Drain MP formulae.
 * (action, target, value, ext[]) => number.
 * @default
 */
// -------------------------------------------------- //
/*~struct~RatingEffects:
 * @param recHp
 * @text JS: Recover HP
 * @type multiline_string
 * @desc Rating function to evaluate Recover HP effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param recMp
 * @text JS: Recover MP
 * @type multiline_string
 * @desc Rating function to evaluate Recover MP effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param recTp
 * @text JS: Gain TP
 * @type multiline_string
 * @desc Rating function to evaluate Gain TP effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param addState
 * @text JS: Add State
 * @type multiline_string
 * @desc Rating function to evaluate Add State effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param remState
 * @text JS: Remove State
 * @type multiline_string
 * @desc Rating function to evaluate Remove State effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param addBuff
 * @text JS: Add Buff
 * @type multiline_string
 * @desc Rating function to evaluate Add Buff effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param addDebuff
 * @text JS: Add Debuff
 * @type multiline_string
 * @desc Rating function to evaluate Add Debuff effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param remBuff
 * @text JS: Remove Buff
 * @type multiline_string
 * @desc Rating function to evaluate Remove Buff effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param remDebuff
 * @text JS: Remove Debuff
 * @type multiline_string
 * @desc Rating function to evaluate Remove Debuff effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param special
 * @text JS: Special
 * @type multiline_string
 * @desc Rating function to evaluate Special effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param grow
 * @text JS: Grow
 * @type multiline_string
 * @desc Rating function to evaluate Grow effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param learnSkill
 * @text JS: Learn Skill
 * @type multiline_string
 * @desc Rating function to evaluate Learn Skill effect.
 * (action, target, effect, ext[]) => number.
 * @default
 *
 * @param event
 * @text JS: Common Event
 * @type multiline_string
 * @desc Rating function to evaluate Common Event effect.
 * (action, target, effect, ext[]) => number.
 * @default
 */
// -------------------------------------------------- //
/*~struct~ConstructorFunctionType:
 * @param name
 * @text Constructor Name
 * @type combo
 * @option Scene_MenuBase
 * @option Scene_Menu
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_File
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_GameEnd
 * @option Scene_Shop
 * @option Scene_Name
 * @option Scene_Debug
 * @option Scene_ItemBase
 * @option Scene_Item
 * @option Scene_Skill
 * @desc Name of scene constructor.
 * Only applies for Scene_MenuBase and subclasses.
 * @default
 *
 * @param fTxt
 * @text JS: Text
 * @type multiline_string
 * @desc Body of generator function to return mini-help text for this scene. *() => string. Text codes are valid.
 * @default return "";
 */
// -------------------------------------------------- //
/*~struct~PersistSwitchType:
 * @param id
 * @text Switch ID
 * @type switch
 * @desc This switch will persist across playthroughs.
 * @default 0
 *
 * @param isOpt
 * @text Show as Option?
 * @type boolean
 * @desc If true, add this as an in-game option.
 * @default false
 */
/*~struct~PersistVarType:
 * @param id
 * @text Variable ID
 * @type variable
 * @desc This variable will persist across playthroughs.
 * @default 0
 *
 * @param optValues
 * @text Option Values
 * @type string[]
 * @desc Values for this variable as an in-game option.
 * Will not show in-game if blank.
 * @default []
 */
// -------------------------------------------------- //
/*~struct~DfaultConfigsType:
 * @param alwaysDash
 * @text Always Dash
 * @type boolean
 * @desc Default value for Always Dash.
 * Core: false (OFF).
 * @default false
 *
 * @param commandRemember
 * @text Command Remember
 * @type boolean
 * @desc Default value for Command Remember.
 * Core: false (OFF).
 * @default false
 *
 * @param touchUI
 * @text Touch UI
 * @type boolean
 * @desc Default value for Touch UI.
 * Core: true (ON).
 * @default true
 *
 * @param bgmVolume
 * @text BGM Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Default value for BGM Volume.
 * Core: 100.
 * @default 100
 *
 * @param bgsVolume
 * @text BGS Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Default value for BGS Volume.
 * Core: 100.
 * @default 100
 *
 * @param meVolume
 * @text ME Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Default value for ME Volume.
 * Core: 100.
 * @default 100
 *
 * @param seVolume
 * @text SE Volume
 * @type number
 * @decimals 0
 * @min 0
 * @max 100
 * @desc Default value for SE Volume.
 * Core: 100.
 * @default 100
 */
// -------------------------------------------------- //
/*~struct~OptCategoryType:
 * @param name
 * @text Category Name
 * @type string
 * @desc Unique display name for this category.
 * @default
 *
 * @param cmds
 * @text Commands
 * @type combo[]
 * @option alwaysDash
 * @option bgmVolume
 * @option bgsVolume
 * @option commandRemember
 * @option meVolume
 * @option seVolume
 * @option touchUI
 * @option
 * @option activeTpb
 * @option audioHDR
 * @option cursorType
 * @option fullscreen
 * @option gameSpeed
 * @option masterVolume
 * @option softLight
 * @desc Symbols of commands in this category.
 * This is a filter: it does not affect command order.
 *
 * @param help
 * @text Help Text
 * @type string
 * @desc Text to show in the help window, if present.
 * Feature Q17 adds a help window.
 * @default
 */
// -------------------------------------------------- //
/*~struct~HoverTipType:
 * @param txt
 * @text Phrase
 * @type string
 * @desc Phrase used in the text code. Not case-sensitive.
 * When this phrase is hovered, the tip will show.
 * @default
 *
 * @param tip
 * @text Hover Tip
 * @type multiline_string
 * @desc Shown as a tip when the phrase is hovered.
 * Text codes are valid.
 * @default
 */
// -------------------------------------------------- //
/*~struct~TagNamesType:
 * @param M04_persist
 * @text persist
 * @type string
 * @desc Name for this tag.
 * @default persist
 *
 * @param M05_next
 * @text next
 * @type string
 * @desc Name for this tag.
 * @default next
 *
 * @param M09_max TP base
 * @text max TP base
 * @type string
 * @desc Name for this tag.
 * @default max TP base
 *
 * @param M09_max TP plus
 * @text max TP plus
 * @type string
 * @desc Name for this tag.
 * @default max TP plus
 *
 * @param M16_actor
 * @text actor
 * @type string
 * @desc Name for this tag.
 * @default actor
 *
 * @param M17_follow-up
 * @text follow-up
 * @type string
 * @desc Name for this tag.
 * @default follow-up
 *
 * @param M18_avoid repeats
 * @text avoid repeats
 * @type string
 * @desc Name for this tag.
 * @default avoid repeats
 *
 * @param M18_forbid repeats
 * @text forbid repeats
 * @type string
 * @desc Name for this tag.
 * @default forbid repeats
 *
 * @param M20_cast state
 * @text cast state
 * @type string
 * @desc Name for this tag.
 * @default cast state
 *
 * @param M21_HRG element
 * @text HRG element
 * @type string
 * @desc Name for this tag.
 * @default HRG element
 *
 * @param M22_stack
 * @text stack
 * @type string
 * @desc Name for this tag.
 * @default stack
 *
 * @param M24_guard skill
 * @text guard skill
 * @type string
 * @desc Name for this tag.
 * @default guard skill
 *
 * @param M25_no weapon
 * @text no weapon
 * @type string
 * @desc Name for this tag.
 * @default no weapon
 *
 * @param M29_cost
 * @text cost
 * @type string
 * @desc Name for this tag.
 * @default cost
 *
 * @param M30_lock formation
 * @text lock formation
 * @type string
 * @desc Name for this tag.
 * @default lock formation
 *
 * @param M32_no lock
 * @text no lock
 * @type string
 * @desc Name for this tag.
 * @default no lock
 *
 * @param M33_ai strictness
 * @text ai strictness
 * @type string
 * @desc Name for this tag.
 * @default ai strictness
 *
 * @param M34_boost escape
 * @text boost escape
 * @type string
 * @desc Name for this tag.
 * @default boost escape
 *
 * @param M34_block escape
 * @text block escape
 * @type string
 * @desc Name for this tag.
 * @default block escape
 *
 * @param M34_block escape immobile
 * @text block escape immobile
 * @type string
 * @desc Name for this tag.
 * @default block escape immobile
 *
 * @param M38_transform
 * @text transform
 * @type string
 * @desc Name for this tag.
 * @default transform
 *
 * @param Q11_attack anim base
 * @text attack anim base
 * @type string
 * @desc Name for this tag.
 * @default attack anim base
 *
 * @param Q11_attack anim plus
 * @text attack anim plus
 * @type string
 * @desc Name for this tag.
 * @default attack anim plus
 *
 * @param Q18_ghost
 * @text ghost
 * @type string
 * @desc Name for this tag.
 * @default ghost
 *
 * @param Q20_hide turns
 * @text hide turns
 * @type string
 * @desc Name for this tag.
 * @default hide turns
 *
 * @param Q21_muffleBGS
 * @text muffleBGS
 * @type string
 * @desc Name for this tag.
 * @default muffleBGS
 *
 * @param Q23_offset
 * @text offset
 * @type string
 * @desc Name for this tag.
 * @default offset
 *
 * @param Q30_gauge offset
 * @text gauge offset
 * @type string
 * @desc Name for this tag.
 * @default gauge offset
 *
 * @param Q30_gauge width scale
 * @text gauge width scale
 * @type string
 * @desc Name for this tag.
 * @default gauge width scale
 *
 * @param Q32_hue
 * @text hue
 * @type string
 * @desc Name for this tag.
 * @default hue
 *
 * @param Q35_death var
 * @text death var
 * @type string
 * @desc Name for this tag.
 * @default death var
 *
 * @param Q35_death anim
 * @text death anim
 * @type string
 * @desc Name for this tag.
 * @default death anim
 *
 * @param Q37_orbit
 * @text orbit
 * @type string
 * @desc Name for this tag.
 * @default orbit
 *
 * @param Q41_light
 * @text light
 * @type string
 * @desc Name for this tag.
 * @default light
 *
 * @param Q41_dark
 * @text dark
 * @type string
 * @desc Name for this tag.
 * @default dark
 *
 * @param Q41_dim
 * @text dim
 * @type string
 * @desc Name for this tag.
 * @default dim
 *
 * @param D02_los
 * @text los
 * @type string
 * @desc Name for this tag.
 * @default los
 *
 * @param D18_add
 * @text add
 * @type string
 * @desc Name for this tag.
 * @default add
 */
//#endregion Plugin header (default locale)

// Configure plugin: namespace & params. (Commands are registered per-feature.)
;void (() => {
'use strict';

    /** Number of features in each category: M, Q, D. */
    const L = Object.freeze([38, 55, 27]);

    /** Plugin namespace identifier. */
    const NS = "Tweaks";

    /** Plugin namespace. */
    const $ = (globalThis.CAE ??= {})[NS] ??= {};

    // Define root properties.
    Object.defineProperties($, {
        NAME:    { value: "Cae_" + NS },
        VERSION: { value: 16 }
    });

    // Traditional import declaration.
    ;(globalThis.Imported ??= {})[$.NAME] = $.VERSION;

    // Get parameters.
    Object.defineProperty($, "PARAMS", {
        value: PluginManager.parameters($.NAME)
    });

    // Confirm parameters were found.
    if (!Object.keys($.PARAMS).length) {
        SceneManager.showDevTools();
        throw new Error(
            $.NAME + ".js could not find its parameters!\n" +
            "Make sure the plugin file is named correctly, then try again."
        );
    }

    /**
     * Conditionally creates a sub-namespace for a plugin feature.
     * @param {string} pName
     * Reference parameter name = feature code.
     */
    const mkFeatureNamespace = function(pName) {
        if ($.PARAMS[pName] === "true")
            $[pName] = {};  // define feature namespace
    };

    /**
     * Adds parsed parameter values to given feature namespace.
     * @param {object} o
     * Target feature namespace.
     * @param  {...[id:string,value:any]} info
     * Data describing properties to add.
     * @since v13
     */
    const setP = function(o, ...info) {
        for (const i of info)
            i[1] = { value: i[1], configurable: false };
        Object.defineProperties(o, Object.fromEntries(info));
    };

    // Create enabled feature namespaces.
    for (let n = L[0] + 1; --n;)
        mkFeatureNamespace("M" + n.padZero(2));
    for (let n = L[1] + 1; --n;)
        mkFeatureNamespace("Q" + n.padZero(2));
    for (let n = L[2] + 1; --n;)
        mkFeatureNamespace("D" + n.padZero(2));

    /** Functions for parsing parameters. */
    const parse = Object.freeze({

        /**
         * @param {string} pName plugin parameter name
         * @returns {any} the value of that parameter.
         */
        _p: function(pName) {
            return $.PARAMS[pName];
        },

        /**
         * @param {string} pName plugin parameter name
         * @param {any} [dFault=""] value returned when the raw param is falsy (default: `""`).
         * @returns {string} that parameter parsed as a string.
         */
        str: function(pName, dFault = "") {
            return this._p(pName) || dFault;
        },

        /**
         * @param {string} pName plugin parameter name
         * @param {any} [dFault=false] value returned when the raw param is falsy (default: `false`).
         * @returns {boolean} that parameter parsed as a boolean.
         */
        bool: function(pName, dFault = false) {
            const p = this._p(pName);
            if (p)
                return p === "true";
            return dFault;
        },

        /**
         * @param {string} pName plugin parameter name
         * @param {any} [dFault=0] value returned when the raw param is falsy, or the parse result is not a number (default: `0`).
         * @returns {number|dFault} that parameter parsed as a finite number (float), or `dFault` if blank/NaN.
         */
        num: function(pName, dFault = 0) {
            const p = this._p(pName);
            if (p) {
                const v = Number(p);
                if (Number.isFinite(v))
                    return v;
            }
            return dFault;
        },

        /**
         * @param {string} pName plugin parameter name
         * @param {any} [dFault=0] value returned when the raw param is falsy, or the parse result is not a number (default: `0`).
         * @returns {number|dFault} that parameter parsed as a finite integer, or `dFault` if blank/NaN.
         */
        int: function(pName, dFault = 0) {
            const v = this.num(...arguments);
            return typeof v === "number" ? v | 0 : v;
        },

        /**
         * @param {string} pName plugin parameter name
         * @returns {object} that parameter parsed as an object.
         */
        obj: function(pName) {
            const v = JSON.parse(this._p(pName) || "{}");
            return typeof v === "object" ? v : {};
        },

        /**
         * @param {string} pName plugin parameter name
         * @returns {any[]} that parameter parsed as an array.
         */
        arr: function(pName) {
            const v = JSON.parse(this._p(pName) || "[]");
            return Array.isArray(v) ? v : [];
        },

        /**
         * For any `type color` parameters.
         * @param {string} pName plugin parameter name
         * @returns {number|string} `ColorManager` text colour index, or CSS colour string.
         */
        colour: function(pName, dFault = 0) {
            return this.int(pName, this.str(pName, dFault));    // [ ] PARSE - should `colour` and `rgba` parse types be merged? - nah it's fine, keep it as-is.
        },

        /**
         * For any space-separated RGBA 4-tuple. Single string for smoother UX.
         * @param {string} pName plugin parameter name
         * @param {[r:number,g:number,b:number,a:number]} dFault auto-fill RGBA values (0~255, default = `[0,0,0,0]`)
         * @returns {[r:number,g:number,b:number,a:number]} that parameter parsed as a space-separated RGBA 4-tuple (0~1).
         */
        rgba: function(pName, dFault = [0, 0, 0, 0]) {
            const s = this.str(pName);
            if (s) {
                const m = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/.exec(s);
                if (m)
                    return [m[1], m[2], m[3], m[4]].map(
                        (s, n) => (
                            parseInt(s, 10) || dFault[n]
                        ).clamp(0, 255) / 255
                    );
            }
            return dFault;
        },

        /**
         * For audio objects.
         * @param {string} s input JSON string
         * @returns {{name:string,volume:number,pitch:number,pan?:number}} `s` parsed as an audio object.
         */
        audioObj: function(s) {
            const o = JSON.parse(s || "{}");
            o.name ??= "";
            o.volume = parseInt(o.volume ||  20, 10).clamp(   0, 100);
            o.pitch  = parseInt(o.pitch  || 100, 10).clamp(  50, 150);
            o.pan    = parseInt(o.pan    ||   0, 10).clamp(-100, 100);
            return o;
        },

        /**
         * For custom skill costs (M30).
         * @param {string} s input JSON string
         * @returns {?[type:string,{rx:RegExp,display:Function,canPay:Function,onPay:Function}]} `s` parsed as a cost type record.
         */
        costType: function(s) {         // {rx,display,canPay,onPay}
            const o = JSON.parse(s);
            if (!o.rx)
                return null;
            const a = ["subject", "item", "cost", "ext=0"];
            const rx = new RegExp(o.rx, "i");
            const display = new Function(...a, o.display);
            const canPay = new Function(...a, o.canPay);
            const onPay = new Function(...a, o.onPay);
            return [o.type, Object.freeze({ rx, display, canPay, onPay })];
        },

        /**
         * For AI damage formula ratings (M33).
         * @param {string} pName plugin parameter name.
         * @returns {[type:number,rating:Function][]} that parameter parsed as relevant evaluation functions.
         */
        ratingDmg: function(pName) {
            const o = this.obj(pName);
            const r = s => /\breturn\b/.test(s) ? s : "return " + s;
            const f = s => s ? new Function(
                "action", "target", "value", "ext", r(s)
            ) : null;
            return [
                [1, f(o.dmgHp)],
                [2, f(o.dmgMp)],
                [3, f(o.recHp)],
                [4, f(o.recMp)],
                [5, f(o.absHp)],
                [6, f(o.absMp)]
            ].filter(e => e[1]);
        },

        /**
         * For AI effect ratings (M33).
         * @param {string} pName plugin parameter name.
         * @returns {[effectId:number,rating:Function][]} that parameter parsed as relevant evaluation functions.
         */
        ratingFX: function(pName) {
            const o = this.obj(pName);
            const r = s => /\breturn\b/.test(s) ? s : "return " + s;
            const f = s => s ? new Function(
                "action", "target", "effect", "ext", r(s)
            ) : null;
            const G = Game_Action;
            return [
                [G.EFFECT_RECOVER_HP,    f(o.recHp)],
                [G.EFFECT_RECOVER_MP,    f(o.recMp)],
                [G.EFFECT_GAIN_TP,       f(o.recTp)],
                [G.EFFECT_ADD_STATE,     f(o.addState)],
                [G.EFFECT_REMOVE_STATE,  f(o.remState)],
                [G.EFFECT_ADD_BUFF,      f(o.addBuff)],
                [G.EFFECT_ADD_DEBUFF,    f(o.addDebuff)],
                [G.EFFECT_REMOVE_BUFF,   f(o.remBuff)],
                [G.EFFECT_REMOVE_DEBUFF, f(o.remDebuff)],
                [G.EFFECT_SPECIAL,       f(o.special)],
                [G.EFFECT_GROW,          f(o.grow)],
                [G.EFFECT_LEARN_SKILL,   f(o.learnSkill)],
                [G.EFFECT_COMMON_EVENT,  f(o.event)]
            ].filter(e => e[1]);
        },

        /**
         * For user-defined per-item AI rating inputs (M33).\
         * Designed for use as an `Array.from` map.
         * @param {string} s input JSON string
         * @param {number} n array index
         * @returns {?Function} input parsed as an appropriate function, or `null`.
         */
        ratingExt: function(s, n) {
            if (!s)
                return null;
            const r = /\breturn\b/.test(s) ? s : "return " + s;
            return new Function("action", "target", r);
        },

        /**
         * For party switch commands (M35).\
         * Designed for use as an `Array.from` map.
         * @param {string} s input JSON string
         * @param {number} n array index
         * @returns {?{txt:string,sw:number}} input parsed as an appropriate object, or `null`.
         */
        partySwitchCommand: function(s, n) {    // {txt,sw}
            if (s) {
                const o = JSON.parse(s);
                if (typeof o === "object") {
                    o.txt ||= "";
                    o.sw = parseInt(o.sw, 10);
                    if (o.sw)
                        return o;
                }
            }
            return null;
        },

        /**
         * For persistent switches (M37).
         * @param {string} s input JSON string
         * @returns {?[id:number,isOpt:boolean]} input parsed as a persistent switch record.
         */
        persistSwitch: function(s) {    // {id,isOpt}
            const o = JSON.parse(s || "{}");
            const id = parseInt(o.id, 10) || 0;
            if (id < 1)
                return null;
            const isOpt = o.isOpt === "true";
            return [id, isOpt];
        },

        /**
         * For persistent variables (M37).
         * @param {string} s input JSON string
         * @returns {?[id:number,optValues:number[]]} input parsed as a persistent variable record.
         */
        persistVar: function(s) {       // {id,optValues}
            const o = JSON.parse(s || "{}");
            const id = parseInt(o.id, 10) || 0;
            if (id < 1)
                return null;
            const optValues = Object.freeze(Array.from(
                JSON.parse(o.optValues || "[]"),
                s => (isNaN(s) ? s : parseInt(s, 10)) || 0
            ).filter(filterUnique));
            return [id, optValues];
        },

        /**
         * For param buff info (Q03).
         * @param {string} pName plugin parameter name
         * @returns {[neutralXParams:number[],lowGoodSParams:boolean[]]} that parameter parsed as param buff info.
         */
        paramBuffInfo: function(pName) {
            const o  = this.obj(pName);
            const xp = Object.freeze([
                o.hit, o.eva, o.cri, o.cev, o.mev,
                o.mrf, o.cnt, o.hrg, o.mrg, o.trg
            ].map(v => Number(v) || 0));
            const sp = Object.freeze([
                o.tgr, o.grd, o.rec, o.pha, o.mcr,
                o.tcr, o.pdr, o.mdr, o.fdr, o.exr,
                ...JSON.parse(o.other || "[]")
            ].map(v => v === "true"));
            return Object.freeze([xp, sp]);
        },

        /**
         * For additional param names (Q03).
         * @param {string} pName plugin parameter name
         * @returns {string[]} that parameter parsed as a param name info record.
         */
        paramNames: function(pName) {       // text[]
            const o = this.obj(pName);
            const d = JSON.parse(o.text || "{}");
            const e = JSON.parse(o.addText || "[]");
            return Object.freeze([
                              d.cri, d.cev, d.mev,
                d.mrf, d.cnt, d.hrg, d.mrg, d.trg,
                d.tgr, d.grd, d.rec, d.pha, d.mcr,
                d.tcr, d.pdr, d.mdr, d.fdr, d.exr
            ].concat(e));
        },

        /**
         * For customised dynamic range compressor (Q16).
         * @param {string} pName plugin parameter name
         * @returns {{threshold?:number,knee?:number,ratio?:number,attack?:number,release?:number}} that parameter parsed as dynamic range compression settings.
         */
        compressorSettings: function(pName) {   // {threshold,knee,ratio,attack,release}
            const o = this.obj(pName);
            for (const [k, s] in Object.entries(o)) {
                const n = Number(s);
                if (Number.isFinite(n))
                    o[k] = n;
                else
                    delete o[k];
            }
            return o;
        },

        /**
         * For option help window (Q17).
         * @param {string} pName plugin parameter name
         * @returns {{sym:string,desc:string}[]} that parameter parsed as an option description record.
         */
        descInfo: function(pName) {         // {sym,desc}[]
            const o = this.obj(pName);
            if (!("UNKNOWN" in $.Q17))
                Object.defineProperty($.Q17, "UNKNOWN", { value: Symbol() });
            const a = JSON.parse(o.data || "[]");
            for (let n = a.length; n--;)
                a[n] = JSON.parse(a[n] || "{}");
            return Object.freeze(a.reduce((a, c) => {
                if (c.sym)
                    a[c.sym] = c.desc;
                return a;
            }, { [$.Q17.UNKNOWN]: o.unknown }));
        },

        /**
         * For tile offsets by terrain tag (Q23).
         * @param {string} s input JSON string
         * @returns {?[tag:number,[x:number,y:number]]} `s` parsed as a draw offset record.
         */
        drawOffset: function(s) {
            const o = JSON.parse(s || "{}");
            const tag = parseInt(o.tag, 10);
            const x = parseInt(o.x, 10);
            const y = parseInt(o.y, 10);
            if (
                (!x && !y) ||
                [tag, x, y].some(n => !Number.isFinite(n))
            )
                return null;
            return [tag, Object.freeze([x, y])];
        },

        /**
         * For segmented gauges (Q25).
         * @param {string} s input JSON string
         * @returns {?[type:string,value:string]} `s` parsed as a segment value record.
         */
        segmentValue: function(s) {     // {type,value}
            const o = JSON.parse(s || "{}");
            if (!("value" in o))
                return null;
            const value = Number(o.value);
            return [o.type, value];
        },

        /**
         * For splash image/video (Q29).\
         * Done like this because param type file does not support `movies/` dir.\
         * Enables use of asset registration for `img/` while affording movie input.
         * @param {string} s input JSON string
         * @returns {string} `s` parsed as an image or movie file path, without extension.
         */
        splashImg: function(s) {
            const o = JSON.parse(s || "{}");
            if (o.video)
                return "movies/" + o.video;
            if (o.image)
                return "img/" + o.image;
            return "";
        },

        /**
         * For enemy gauges (Q30).
         * @param {string} s input JSON string
         * @returns {?[type:{anchor:{x:number,y:number},offset:{x:number,y:number},scale:{x:number,y:number},opacity:number}]} `s` parsed as an enemy gauge info record.
         */
        enemyGaugeInfo: function(s) {   // {type,anchor,offset,opacity,scale}
            const o = JSON.parse(s || "{}");
            if (!("type" in o))
                return null;
            const anchor = Object.freeze({
                x: Number(o.anchorX) || 0,
                y: Number(o.anchorY) || 0
            });
            const offset = Object.freeze({
                x: parseInt(o.offsetX, 10) || 0,
                y: parseInt(o.offsetY, 10) || 0
            });
            const scale = Object.freeze({
                x: Number(o.scaleX) || 0,
                y: Number(o.scaleY) || 0
            });
            const opacity = (parseInt(o.opacity, 10) || 0).clamp(0, 255);
            return [o.type, { anchor, offset, scale, opacity }];
        },

        /**
         * For splash durations (Q33).
         * @param {string} pName plugin parameter name
         * @param {number[]} [dFault] auto-fill duration values (default: `[120, 15, 60]`)
         * @returns {[number,number,number]} that parameter parsed as a space-separated list of durations.
         */
        dur: function(pName, dFault = [120, 15, 60]) {
            const s = this.str(pName);
            if (s) {
                const m = /^\s*(\d+)\s+(\d+)\s+(\d+)/.exec(s);
                if (m)
                    return [m[1], m[2], m[3]].map(
                        (s, n) => {
                            const v = parseInt(s, 10);
                            return Number.isFinite(v) ? v : dFault[n];
                        }
                    );
            }
        },

        /**
         * For cursor infos (Q48).
         * @param {string} s Input JSON string.
         * @returns {?{name:string,imgOn:string,imgOff:string,hotX:number,hotY:number}} `s` parsed as a cursor info record.
         */
        cursorInfo: function(s) {
            const o = JSON.parse(s || "{}");
            if (!o.img)
                return null;
            o.hotX = parseInt(o.hotX, 10) || 0;
            o.hotY = parseInt(o.hotY, 10) || 0;
            return Object.freeze(o);
        },

        /**
         * For auxiliary help window, a.k.a. mini-help (Q50).
         * @param {string} s Input JSON string.
         * @returns {?[name:string,fct:GeneratorFunction]} `s` parsed as a Q50 help text record.
         */
        auxHelpText: function(s) {
            const { name, fTxt } = JSON.parse(s || "{}");
            if (!name)
                return null;
            const G = function*() {}.constructor;
            return Object.freeze([name, new G(fTxt || 'return "";')]);
        },

        /**
         * For option category definitions (Q52).
         * @param {string} s Input JSON string.
         * @returns {?[string,string[]]} Parsed record, or `null` if invalid.
         */
        optCat: function(s) { // "{name,cmds[],help}" -> [name,[help,...cmds]]
            const o = JSON.parse(s || "{}");
            if (!o.name)
                return null;
            const v = JSON.parse(o.cmds || "[]");
            v.unshift(o.help ?? "");
            return [o.name, Object.freeze(v)];
        },

        /**
         * For window hover tips (Q53).
         * @param {string} s Input JSON string.
         * @returns {?[string,string]} Parsed record, or `null` if invalid.
         */
        hoverTip: function(s) { // "{txt,tip}" -> [txt,tip]
            const o = JSON.parse(s || "{}");
            if (!o.txt)
                return null;
            return [o.txt.trim().toUpperCase(), o.tip.trim()];
        },

        /**
         * For custom core config default values (D26).
         * @param {string} pName plugin parameter name
         * @returns {object} that parameter parsed as config values for default options.
         */
        coreConfigValues: function(pName) {
            const o = this.obj(pName);
            const B = ["alwaysDash", "commandRemember", "touchUI"];
            const V = Array.from(["bgm", "bgs", "me", "se"], s => s + "Volume");
            for (const b of B)
                if (b in o)
                    o[b] = o[b] === "true";
            for (const v of V)
                if (v in o)
                    o[v] = (parseInt(o[v], 10) || 0).clamp(0, 100);
            return Object.freeze(o);
        },

        /**
         * For custom notetag names.
         * @param {string} pName
         * Name of plugin parameter.
         * @returns {Map<string,string>}
         * A map of param name (e.g. `"M05_persist"`) to tag name (e.g. `"persist"`).
         */
        tags: function(pName = "tags") {
            const o = this.obj(pName);
            const K = Object.keys(o);
            /** Result: maps internal identifier to user-facing name. @type {Map<string,string>} */
            const r = new Map();
            /**
             * Inverse of {@linkcode r}, for tracking duplicate user-facing names.\
             * `null` and unused unless running in playtest mode.
             * @type {?Map<string,string>} @since v16
             */
            const d = Utils.isOptionValid("test") && this.bool("tags_checkDupes") ? new Map() : null;
            for (const k of K) {
                o[k] = o[k].trim();
                if (!o[k])
                    o[k] = k.slice(4);
                // Check for and warn against duplicate tag names in playtest mode.
                if (d) {
                    const dk = d.get(o[k]);
                    if (dk) {
                        SceneManager.showDevTools();
                        console.warn(`${CAE.Tweaks.NAME}.js: duplicate tag name: "${o[k]}" for "${k}" and "${dk}".`);
                    } else
                        d.set(o[k], k);
                }
                r.set(k, o[k]);
            }
            return r;
        }

    });

    /** Sets tag names on active feature namespaces. */
    const setTags = function() {
        for (const [k, v] of parse.tags()) {
            const [p, t] = k.split("_");
            const o = CAE.Tweaks[p];
            if (o)
                o["tag_" + t] = v;
        }
    };
    setTags();

    /**
     * Intended for use with `Array#filter`.
     * @param {any} v array element
     * @param {number} n array index
     * @param {Array<v>} a array reference
     * @returns {boolean} `true` iff this element is not a duplicate
     */
    const filterUnique = function(v, n, a) {
        return a.indexOf(v) === n;
    };

//#region Parse remaining plugin parameters.

    if ($.M03)
        setP($.M03,
            ["TGR_MULT", parse.num("M03_mult", 10)]
        );

    if ($.M07)
        setP($.M07,
            ["HIT",  parse.bool("M07_hit")],
            ["CRIT", parse.bool("M07_crit")],
            ["CNT",  parse.bool("M07_cnt")],
            ["MRF",  parse.bool("M07_mrf")],
            ["ITEM", parse.bool("M07_item")],
            ["GOLD", parse.bool("M07_gold")],
            ["FLEE", parse.bool("M07_flee")]
        );

    if ($.M08)
        setP($.M08,
            ["STATE", parse.int("M08_state")],
            ["BLOCK", parse.int("M08_block")],
            ["BREAK", parse.int("M08_break")],
            ["LOG_A", parse.str("M08_logActor")],
            ["LOG_E", parse.str("M08_logEnemy")],
            ["MAXTP", parse.bool("M08_refillTp")],
            ["DOPOP", parse.bool("M08_pop")],
            ["POP_C", parse.colour("M08_popColour", 30)],
            ["POP_X", parse.int("M08_popAddX")],
            ["POP_Y", parse.int("M08_popAddY")],
            ["POP_CRIT", parse.bool("M08_popCrit")]
        );

    if ($.M09)
        setP($.M09,
            ["DFAULT", parse.int("M09_dfault", null)]
        );

    if ($.M11)
        setP($.M11,
            ["KEY", parse.str("M11_key", "activeTpb")],
            ["TXT", parse.str("M11_txt")],
            ["DEF", parse.bool("M11_def")]
        );

    if ($.M13)
        setP($.M13,
            ["MAX", Math.max(1, parse.num("M13_max", 1))]
        );

    if ($.M14)
        setP($.M14,
            ["INSTANT", parse.int("M14_instant", 2000)]
        );

    if ($.M19)
        setP($.M19,
            ["CACHE", parse.bool("M19_cache", true)]
        );

    if ($.M23)
        setP($.M23,
            ["GAINTP", parse.bool("M23_gainTp", true)],
            ["GROW",   parse.bool("M23_grow", true)]
        );

    if ($.M26)
        setP($.M26,
            ["BUSH",   parse.num("M26_bush")],
            ["LADDER", parse.num("M26_ladder")]
        );

    if ($.M27)
        setP($.M27,
            ["NEED_TYPE", parse.bool("M27_needType")]
        );

    if ($.M28)
        setP($.M28,
            ["SLOT_COUNT", parse.int("M28_slotCount")],
            ["LOAD_INIT_SEL_AUTO", parse.bool("M28_autoSelect")]
        );

    if ($.M29)
        setP($.M29,
            ["DATA", Object.freeze(Object.fromEntries([
                ...parse.arr("M29_types").map(parse.costType),
                ["tp", { // default TP type
                    rx:      /^TP$/i,
                    display: function(subject, item, cost, ext = 0) {
                        if (0 < cost)
                            return `\\c[29]${cost}${TextManager.tpA}`;
                        return "";
                    },
                    canPay:  function(subject, item, cost, ext = 0) {
                        return cost <= subject.tp;
                    },
                    onPay:   function(subject, item, cost, ext = 0) {
                        subject.setTp(subject.tp - cost);
                    }
                }],
                ["mp", { // default MP type
                    rx:      /^MP$/i,
                    display: function(subject, item, cost, ext = 0) {
                        if (0 < cost)
                            return `\\c[23]${cost}${TextManager.mpA}`;
                        return "";
                    },
                    canPay:  function(subject, item, cost, ext = 0) {
                        return cost <= subject.mp;
                    },
                    onPay:   function(subject, item, cost, ext = 0) {
                        subject.setMp(subject.mp - cost);
                    }
                }]
            ].filter((e, n, a) => e && a.findIndex(v => v[0] === e[0]) === n)))]
        );

    if ($.M30)
        setP($.M30,
            ["POS", Object.freeze(Array.from(parse.arr("M30_pos"), s => parseInt(s, 10)).filter(filterUnique))],
            ["NO_HIDE", parse.bool("M30_noHide")],
            ["URL", parse.str("M30_url")]
        );

    if ($.M31)
        setP($.M31,
            ["TRIGGER", parse.bool("M31_trigger")]
        );

    if ($.M33)
        setP($.M33,
            ["COMBINE",  parse.int("M33_combine")],
            ["DATA_DMG", Object.freeze(Object.fromEntries(parse.ratingDmg("M33_formula")))],
            ["DATA_FX",  Object.freeze(Object.fromEntries(parse.ratingFX("M33_effects")))],
            ["DATA_EXT", Object.freeze(Array.from(parse.arr("M33_ext"), parse.ratingExt).filter(f => f))],
            ["NME_AUTO", parse.bool("M33_nmeAuto")]
        );

    if ($.M34)
        setP($.M34,
            ["RECALC", parse.bool("M34_recalc")],
            ["EFFECT", parse.bool("M34_effect")]
        );

    if ($.M35)
        setP($.M35,
            ["CMDS", Object.freeze(Array.from(parse.arr("M35_cmds"), parse.partySwitchCommand).filter(c => c))],
            ["SAVE", parse.bool("M35_save")]
        );

    if ($.M36)
        setP($.M36,
            ["DX",    parse.int("M36_dx")],
            ["DY",    parse.int("M36_dy")],
            ["DELAY", parse.int("M36_delay")],
            ["CMDS",  Object.freeze(parse.arr("M36_cmds").filter(filterUnique))],
            ["RETRY", parse.str("M36_retryTxt")]
        );

    if ($.M37)
        setP($.M37,
            ["S", Object.freeze(new Map(Array.from(parse.arr("M37_s"), parse.persistSwitch).filter(o => o)))],
            ["V", Object.freeze(new Map(Array.from(parse.arr("M37_v"), parse.persistVar   ).filter(o => o)))]
        );

    if ($.M38)
        setP($.M38,
            ["KEEP_EXP", parse.bool("M38_keepExp")]
        );

    if ($.Q01)
        setP($.Q01,
            ["PX_PER_INC", parse.int("Q01_pxPerInc", 10)],
            ["STEP",       parse.int("Q01_step", 20)]
        );

    if ($.Q02)
        setP($.Q02,
            ["OFFSET_X", parse.int("Q02_offsetX")],
            ["OFFSET_Y", parse.int("Q02_offsetY")]
        );

    if ($.Q03)
        setP($.Q03,
            ["PARAM_IDS",  Object.freeze(Array.from(parse.arr("Q03_paramIds"), s => parseInt(s, 10)))],
            ["ADD_NAMES",  Object.freeze(parse.paramNames("Q03_addNames"))],
            ["BUFF_INFO",  parse.paramBuffInfo("Q03_buffInfo")],
            ["AS_RESIST",  parse.bool("Q03_showResist")],
            ["STATE_ICON", parse.bool("Q03_stateIcons")],
            ["RETAIN_ROW", parse.bool("Q03_retainRow")],
            ["MOVE_RATE",  parse.int("Q03_moveRate", 24)],
            ["BELT_PAD",   parse.int("Q03_beltPad")],
            ["INIT_INDEX", parse.int("Q03_initIndex")],
            ["RX_EXCLUDE", new RegExp(parse.str("Q03_rxExclude"))],
            ["RX_HEADING", new RegExp(parse.str("Q03_rxHeading"))]
        );

    if ($.Q04)
        setP($.Q04,
            ["LEGACY", parse.bool("Q04_legacy")]
        );

    if ($.Q09)
        setP($.Q09,
            ["LEGACY", parse.bool("Q09_legacy")]
        );

    if ($.Q11)
        setP($.Q11,
            ["RX_NO_OFFSET", new RegExp(parse.str("Q11_rxNoOffset"))]
        );

    if ($.Q12)
        setP($.Q12,
            ["SYM",       parse.str("Q12_sym", "quit")],
            ["TXT_TITLE", parse.str("Q12_txtTitle")],
            ["TXT_END",   parse.str("Q12_txtEnd")]
        );

    if ($.Q14)
        setP($.Q14,
            ["ACTOR_FACE_INDEX", parse.bool("Q14_afIndex")],
            ["ALIGN_DFAULT",     parse.int("Q14_alignDfault")]
        );

    if ($.Q15)
        setP($.Q15,
            ["FORM", parse.str("Q15_form", "%1\xd7 \\i[%2]\u2009%3")]
        );

    if ($.Q16)
        setP($.Q16,
            ["KEY",     parse.str("Q16_key", "audioHDR")],
            ["TXT",     parse.str("Q16_txt", "Audio HDR")],
            ["DFAULT",  parse.bool("Q16_dfault")],
            ["ONTEXT",  parse.str("Q16_onText")],
            ["OFFTEXT", parse.str("Q16_offText")],
            ["OPTS",    Object.freeze(parse.compressorSettings("Q16_settings"))],
            ["INVERT",  parse.bool("Q16_invert")]
        );

    if ($.Q17)
        setP($.Q17,
            ["REDUCE_MAX_COMMANDS", parse.int("Q17_reduceMaxCommands", 1)],
            ["DESC", Object.freeze(parse.descInfo("Q17_desc"))]
        );

    if ($.Q20)
        setP($.Q20,
            ["UNLIMITED", parse.str("Q20_unlimited", null)]
        );

    if ($.Q21)
        setP($.Q21,
            ["THRESHOLD", parse.int("Q21_threshold", 1350)]
        );

    if ($.Q22)
        setP($.Q22,
            ["OFFSET", parse.int("Q22_offset", 24)]
        );

    if ($.Q23)
        setP($.Q23,
            ["DATA", Object.freeze(Object.fromEntries(Array.from(parse.arr("Q23_data"), parse.drawOffset).filter(o => o)))]
        );

    if ($.Q25)
        setP($.Q25,
            ["VALUES", Object.freeze(Object.fromEntries(Array.from(parse.arr("Q25_values"), parse.segmentValue).filter(o => o)))],
            // ["SHOW_EMPTY", parse.bool("Q25_showEmpty")], // until v14
            ["PARTITION_COLOUR", parse.str("Q25_partColour")],  // @since v14
            ["LIMIT_DRAW_RANGE_TYPES", Object.freeze(parse.arr("Q25_limitDrawRangeTypes"))],
            ["PARTITION_WIDTH", parse.int("Q25_partitionWidth", 1)]
        );

    if ($.Q26)
        setP($.Q26,
            ["ANCHOR", parse.num("Q26_anchor")],
            ["SCALE",  parse.num("Q26_scale", 1)],
            ["URL",    (v => v ? "img/system/" + v : "icon/icon")(parse.str("Q26_url"))],
            ["T1",     parse.int("Q26_t1", 15)],
            ["T2",     parse.int("Q26_t2", 15)],
            ["T3",     parse.int("Q26_t3", 15)],
            ["X",      parse.int("Q26_x")],
            ["Y",      parse.int("Q26_y")]
        );

    if ($.Q29)
        setP($.Q29,
            ["IMGS", Object.freeze(Array.from(parse.arr("Q29_imgs"), parse.splashImg).filter(s => s))],
            ["TIME", Object.freeze(Array.from(parse.arr("Q29_time"), s => parseInt(s, 10) || 0))],
            ["BGM",  Object.freeze(Array.from(parse.arr("Q29_bgm"), parse.audioObj))],
            ["ME",   Object.freeze(Array.from(parse.arr("Q29_me"), parse.audioObj))]
        );

    if ($.Q30)
        setP($.Q30,
            ["DATA", Object.freeze(Object.fromEntries(Array.from(parse.arr("Q30_data"), parse.enemyGaugeInfo).filter(o => o)))],
            ["NOBG", Object.freeze(parse.arr("Q30_noBackTypes").filter(s => s))],
            ["NO_V", !parse.bool("Q30_showValue")]
        );

    if ($.Q31)
        setP($.Q31,
            ["DEBUG", parse.bool("Q31_debug")]
        );

    if ($.Q32)
        setP($.Q32,
            ["P_HUE", parse.str("Q32_propHue", null)]
        );

    if ($.Q33)
        setP($.Q33,
            ["AF_SET_INDEX", parse.bool("Q33_afSetIndex")],
            ["DURATIONS",    Object.freeze(parse.dur("Q33_durations"))],
            ["MIN_ROWS",     Math.max(1, parse.int("Q33_minRows", 2))]
        );

    if ($.Q34)
        setP($.Q34,
            ["COLOUR",   parse.str("Q34_colour", "#00000080")],
            ["GRADIENT", parse.bool("Q34_gradient")]
        );

    if ($.Q36)
        setP($.Q36,
            ["NAME", parse.str("Q36_name", "snapshot")]
        );

    if ($.Q38)
        setP($.Q38,
            ["HOLD_TO_DASH", parse.bool("Q38_holdDash")]
        );

    if ($.Q41)
        setP($.Q41,
            ["MAX_LIGHTS",  parse.int("Q41_maxLights", 16)],
            ["FEATHER",     parse.num("Q41_feather", 0.5)],
            ["SELF_RADIUS", parse.int("Q41_selfRadius", 32)],
            ["FOV_ANGLE",   parse.num("Q41_fovAngle", 135)],
            ["NAT_RANGE",   parse.int("Q41_natRange", 4 * 48)],
            ["NAT_COLOUR",  Object.freeze(parse.rgba("Q41_natColour", [0, 0, 0, 26]))],
            ["FILTER_BASE", parse.bool("Q41_filterBase")],
            ["OPT_SYM",     parse.str("Q41_optSym")],
            ["OPT_TXT",     parse.str("Q41_optTxt")],
            ["OPT_DEF",     parse.str("Q41_optDef")]
        );

    if ($.Q43)
        setP($.Q43,
            ["KEY", parse.str("Q43_key", "gameSpeed")],
            ["TXT", parse.str("Q43_txt", "Game Speed")],
            ["LST", Object.freeze(Array.from(parse.arr("Q43_lst"), s => Number(s) || 1).filter(filterUnique))]
        );

    if ($.Q45)
        setP($.Q45,
            ["COLOUR",  parse.colour("Q45_colour", 16)],
            ["WEIGHT",  parse.int("Q45_weight", 4)],
            ["OPACITY", parse.int("Q45_opacity", 128)]
        );

    if ($.Q46)
        setP($.Q46,
            ["LABEL", parse.str("Q46_label")],
            ["VALUE", parse.bool("Q46_value")],
            ["EXP_FOR_NEXT", parse.bool("Q46_expForNext")]
        );

    if ($.Q47)
        setP($.Q47,
            ["KEY", parse.str("Q47_key", "fullscreen")],
            ["TXT", parse.str("Q47_txt", "Full Screen")]
        );

    if ($.Q48)
        setP($.Q48,
            ["DATA",     Object.freeze(Array.from(parse.arr("Q48_data"), parse.cursorInfo).filter(o => o))],
            ["FALLBACK", parse.str("Q48_fallback", "default")],
            ["IDLETIME", parse.int("Q48_idle")],
            ["OPT_BACK", parse.str("Q48_optFallback")],
            ["OPT_TXT",  parse.str("Q48_optTxt")],
            ["OPT_KEY",  parse.str("Q48_optKey", "cursorType")]
        );

    if ($.Q49)
        setP($.Q49,
            ["ALIGN_X", parse.bool("Q49_alignX")],
            ["DEALIGN_Y", parse.bool("Q49_dealignY")],
            ["MERGE", parse.bool("Q49_canMerge")],
            ["IXMAP", parse.bool("Q49_useIndexMap")],
            ["INMSG", parse.bool("Q49_canInline")],
            ["IN_X",  parse.int("Q49_inlineX")],
            ["IN_W",  parse.int("Q49_inlineW")],
            ["DEF_S", parse.bool("Q49_dFaultShuffle")],
            ["DEF_I", parse.bool("Q49_dFaultInline")],
            ["RESET", parse.bool("Q49_autoReset")],
            ["R_DSC", parse.str("Q49_rxDesc")]
        );

    if ($.Q50)
        setP($.Q50,
            ["MINIHELP",     parse.bool("Q50_auxHelp")],
            ["MINIHELP_BG",  parse.int("Q50_auxHelpBG")],
            ["MINIHELP_FS",  parse.int("Q50_auxHelpFS", 22)],
            ["MINIHELP_TXT", Object.freeze(new Map(Array.from(parse.arr("Q50_auxHelpText"), parse.auxHelpText).filter(o => o)))],
            ["MINIHELP_NAM", parse.bool("Q50_nameSquish", true)],
            ["MINIHELP_T",   Math.max(0, parse.int("Q50_auxHelpPeriod"))],
            ["MINIHELP_TT",  Math.max(0, parse.int("Q50_auxHelpTransitTime"))],
            ["POS_CMD",      parse.bool("Q50_posCmd")],
            ["POS_HLP",      parse.bool("Q50_posHlp")],
            ["POS_BTN",      parse.bool("Q50_posBtn")]
        );

    if ($.Q51)
        setP($.Q51,
            ["TXT",    parse.str("Q51_optTxt")],
            ["DFAULT", parse.int("Q51_dfault", 0)]
        );

    if ($.Q52)
        setP($.Q52,
            ["CATS",    new Map(Array.from(parse.arr("Q52_cats"), parse.optCat).filter(e => e))],
            ["DFAULT",  parse.str("Q52_dfaultCat")],
            ["HORZ",    parse.bool("Q52_horz")],
            ["TOPLEFT", parse.bool("Q52_topLeft")],
            ["CENTRE",  parse.bool("Q52_centre")],
            ["ROW_SUB", Math.max(0, parse.int("Q52_reduceRows"))]
        );

    if ($.Q53)
        setP($.Q53,
            ["TIPS",         Object.freeze(Array.from(parse.arr("Q53_tips"), parse.hoverTip).filter(e => e))],
            ["BG_TYPE",      parse.int("Q53_bgType")],
            ["CURSOR_PAD_X", parse.int("Q53_cursorPadX")],
            ["NAV_BUTTON",   parse.str("Q53_navKey")]
        //  ["MSG_ONLY", parse.bool("Q53_msgOnly")]
        );

    if ($.Q54)
        setP($.Q54,
            ["HEIGHT",  parse.int("Q54_height")],
            ["OPACITY", parse.int("Q54_opacity", 128).clamp(0, 255)],
            ["C1",      parse.int("Q54_colour1", parse.str("Q54_colour1", 0))],
            ["C2",      parse.int("Q54_colour2", parse.str("Q54_colour2", 0))],
            ["TIME",    Math.max(parse.int("Q54_time", 1), 1)],
            ["TXT_ON",  parse.str("Q54_txtOn")],
            ["TXT_OFF", parse.str("Q54_txtOff")]
        );

    if ($.Q55)
        setP($.Q55,
            ["MAP", parse.bool("Q55_map")],
            ["NME", parse.bool("Q55_nme")],
            ["NME_ANCHOR", Object.freeze({ x: parse.num("Q55_nmeAnchorX"), y: parse.num("Q55_nmeAnchorY") })]
        );

    if ($.D02)
        setP($.D02,
            ["DFAULT_FOV", parse.num("D02_dfaultFoV", 135)],
            ["OPAQUE_R",   Object.freeze(Array.from(parse.arr("D02_opaqueR"), s => parseInt(s, 10) || 0).filter(n => n))],
            ["BLOCK_FCT",  new Function("target", "x", "y", "d", parse.str("D02_blockFct", "return false;"))],
            ["DEBUG_TXT",  parse.str("D02_debugRef")],
            ["ENABLE_TAG", parse.bool("D02_enableTag")]
        );

    if ($.D03)
        setP($.D03,
            ["ERR_MSG", parse.str("D03_errMsg", "Save config failed.")]
        );

    if ($.D07)
        setP($.D07,
            ["TICK_SYNC", parse.bool("D07_tickSync")]
        );

    if ($.D12)
        setP($.D12,
            ["PERSIST", parse.bool("D12_persist")]
        );

    if ($.D15)
        setP($.D15,
            ["BUTTON_LABEL", parse.str("D15_buttonLabel", "Copy to Clipboard")],
            ["FONT_SIZE",    parse.int("D15_fontSize", 12)]
        );

    if ($.D21)
        setP($.D21,
            ["COUNT_FAIL", parse.bool("D21_countFail")],
            ["COUNT_AUTO", parse.bool("D21_countAuto")]
        );

    if ($.D22)
        setP($.D22,
            ["PATTERN", parse.str("D22_pattern")]
        );

    if ($.D23)
        setP($.D23,
            ["INT_ONLY", parse.bool("D23_intOnly")]
        );

    if ($.D24)
        setP($.D24,
            ["BOOT_MAPS", Object.freeze(Array.from(parse.arr("D24_bootMaps"), s => parseInt(s, 10) || 0))],
            ["BOOT_IMGS", Object.freeze(parse.arr("D24_bootImgs"))],
            ["BOOT_SNDS", Object.freeze(parse.arr("D24_bootSnds"))]
        );

    if ($.D26)
        setP($.D26,
            ["VALUES", parse.coreConfigValues("D26_values")]
        );

    if ($.D27)
        setP($.D27,
            ["TO",    parse.bool("D27_to")],
            ["FROM",  parse.bool("D27_from")],
            ["LIMIT", Math.max(0, parse.int("D27_limit"))]
        );

//#endregion Parse remaining plugin parameters.

})();

// alert(Object.keys(CAE.Tweaks).join(", ")); // lists codes for all enabled features.

//#region Shared Utilities

// Boot patches.
void (() => {
'use strict';

    /** Utility function sub-namespace. @since v13 */
    const U = CAE.Tweaks.Utils ??= {};

    /**
     * @typedef {string} MethodPath
     * Method identifier path, e.g. `"CAE.Tweaks.Utils"`.\
     * Will break if it contains any identifier that contains the `.` character.
     */
    /**
     * @typedef {function} MethodPatcher
     * In the form `alias => ?newMethod`.\
     * Will not patch if return value is falsy.
     */

    // Define late-patching system.
    Object.assign(U, {

        /**
         * Stores boot patch information.
         * @type {{p:MethodPath,m:MethodPatcher}[]}
         */
        _bootPatches: [],

        /**
         * Registers a new boot patch.
         * @param {MethodPath} path
         * @param {MethodPatcher} newMethodMaker
         */
        patchOnBoot: function(path, methodPatcher) {
            this._bootPatches.push({ p: path, m: methodPatcher });
        },

        /** Applies registered boot patches. */
        applyBootPatches: function() {
            for (const { p, m } of this._bootPatches) {
                const q = p.split("."); // assume no weird identifiers
                const k = q.pop();
                const o = q.reduce((a, c) => a?.[c], globalThis);
                void (alias => {
                    const f = m(alias);
                    if (f)
                        o[k] = f;
                })(o[k]);               // iife for simple in-loop closure
            }
            delete this._bootPatches;   // do once, release references
        },

    });

    // Apply boot patches post-boot.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            alias.apply(this, arguments);
            CAE.Tweaks.Utils.applyBootPatches();
        };
    })(Scene_Boot.prototype.start);
    // [ ] Utils - could hook onDatabaseLoaded instead? Would allow patching Scene_Boot#isReady, WITH database access.

})();

// Event tag getter (from comments and/or notebox).
void (() => { // Used in: M32, Q32, Q37, Q41, D02.
    // [ ] Utils - extend `getEventTags` to support multi-line comment tags? Aggregate comment text, then extract.
    /**
     * Parses single-line tags from given event's comments, and optionally its note field.\
     * Accounts for Toggle Skip (MZ 1.5+): https://forums.rpgmakerweb.com/posts/1278248
     * @generator
     * @param {Game_Event} ev
     * Reference event.
     * @param {string} tagName
     * Tag identifier.
     * @param {boolean} [includeNote=false]
     * If `true`, check the note field after the comments.
     * @returns {Generator<string|boolean|undefined,void,void>}
     * Generator for tag values.
     */
    CAE.Tweaks.Utils.getEventTags = function*(ev, tagName = "", includeNote = false) {
        if (tagName && ev instanceof Game_Event && ev.page()) {
            let skip = Infinity;
            for (const command of ev.list()) {
                if (command.indent > skip)
                    continue;
                skip = Infinity;
                switch (command.code) {
                    case 108:   // Comment
                    case 408:   // Comment (extra lines)
                        const data = { note: command.parameters[0] };
                        DataManager.extractMetadata(data);
                        const tag = data.meta[tagName];
                        if (tag)
                            yield tag;
                        break;
                    case 109:   // Skip
                        skip = command.indent;
                        break;
                }
            }
            if (includeNote) {
                const tag = ev.event().meta[tagName];
                if (tag)
                    yield tag;
            }
        }
    };

})();

// Shuffle function.
void (() => { // Used in: M18, Q49.

    /**
     * Fisher-Yates shuffle via Durstenfeld algorithm.\
     * Shuffles input array in-place.
     * @param {any[]} arr
     * Input array.
     * @returns {arr}
     * Randomly-shuffled array.
     */
    CAE.Tweaks.Utils.shuffle = function(arr) {
        const L = arr?.length;
        if (L > 1)
            for (let n = L; --n;) {
                const r = Math.randomInt(n + 1);
                if (r !== n)
                    [arr[n], arr[r]] = [arr[r], arr[n]];
            }
        return arr;
    };

})();

// Text alignment.
void (() => { // Used in: Q09, Q49.
'use strict';

    Object.assign(CAE.Tweaks.Utils, {

        /**
         * @param {string} text
         * Text to check.
         * @returns {boolean}
         * `true` iff `text` should be right-to-left aligned.
         */
        isRTL: function(text) {
            return Utils.containsArabic(text);
        },

        /**
         * @param {string} text
         * Text to align.
         * @param {string} align
         * CSS text alignment.
         * @returns {number}
         * Multiplier for alignment purposes, see {@linkcode adjustX}.
         */
        alignMult: function(text, align) {
            const U = CAE.Tweaks.Utils; // absolute reference to allow {v}=NS usage.
            const i = Math.max(0, U.ALIGNS.indexOf(align));
            return (U.isRTL(text) ? 1 + i - U.ALIGNS.length : i) / 2;
        },

        /**
         * @param {number} x
         * Initial X draw coordinate (px).
         * @param {number} w
         * Width of empty space in text draw area (px).
         * @param {number} a
         * Alignment multiplier, see {@linkcode alignMult}.
         * @returns {number}
         * New X draw coordinate (px).
         */
        adjustX: function(x, w, a) {
            return (x + w * a) | 0;
        }

    });

    /**
     * @memberof CAE.Tweaks.Utils
     * @readonly @property {string[]} ALIGNS
     * Alignments handled by these text-align methods.
     */
    Object.defineProperty(CAE.Tweaks.Utils, "ALIGNS", {
        value: Object.freeze(["left", "center", "right"]),
        configurable: false
    });

})();

//#endregion

//#region Mechanics

// M01) Scale up evade fail chance if hit chance > 100%.
void (() => { if (!CAE.Tweaks.M01) return;
    const alias = Game_Action.prototype.itemEva;
    Game_Action.prototype.itemEva = function(target) {
        // retain distinction between miss & evade (unlike "hit minus eva")
        const eva = alias.apply(this, arguments);
        if (eva >= 1)
            return eva;     // no fail chance
        const hit = this.itemHit(...arguments);
        if (hit <= 1)
            return eva;     // no modifier
        return 1 - (1 - eva) * hit;
        // "not ((evade fail) x (over-hit))"
        // e.g. hit = 120% and eva = 20% => evade chance = 1 - 0.8 * 1.2 = 4%
    };
})();

// M02) Restore pre-vehicle move speed and Through status when disembarking.
void (() => { if (!CAE.Tweaks.M02) return;
'use strict';

    /** Identifier for property storing walking speed on `Game_Player`. */
    const KEY_MOVE = '_preVehicleSpeed';

    /** Identifier for property storing walking Through status on `Game_Player`. */
    const KEY_THRU = '_preVehicleThrough';

    // Patch - store pre-boarding speed/through values.
    void (alias => {
        Game_Player.prototype.getOnVehicle = function() {
            // move speed gets set in updateGetOnVehicle, when aboard
            const res = alias.apply(this, arguments);
            if (res) {
                this[KEY_MOVE] = this.moveSpeed();
                this[KEY_THRU] = this.isThrough();
            }
            return res;
        };
    })(Game_Player.prototype.getOnVehicle);

    // Patch - restore move/through when disembarked.
    void (alias => {
        Game_Player.prototype.getOffVehicle = function() {
            // move speed gets reset here
            const res = alias.apply(this, arguments);
            if (res) {
                if (KEY_MOVE in this) {
                    this.setMoveSpeed(this[KEY_MOVE]);
                    delete this[KEY_MOVE];
                }
                if (KEY_THRU in this) {
                    this.setThrough(this[KEY_THRU]);
                    delete this[KEY_THRU];
                }
            }
            return res;
        };
    })(Game_Player.prototype.getOffVehicle);

})();

// M03) TGR-based taunt: a high-TGR target prevents aiming at relatively low-TGR targets.
void (() => { if (!CAE.Tweaks.M03) return;
'use strict';

    /**
     * Determines taunt threshold.
     *
     * E.g. `10` => ignore targets with 1/10 or less of the max TGR.
     */
    const TGR_MULT = CAE.Tweaks.M03.TGR_MULT;

    /**
     * @param {Game_Battler[]} group array of battlers
     * @returns {number} highest TGR value from those.
     */
    const getMaxTGR = function(group) {
        if (group.length) {
            let max = group[0].tgr;
            for (let n = group.length; --n;) {
                const v = group[n].tgr;
                if (v > max)
                    max = v;
            }
            return max;
        }
        return 0;
    };

    /**
     * @param {Game_Battler[]} group array of battlers
     * @param {number} topTGR top TGR value, used to determine "can target" threshold
     * @returns {Game_Battler[]} filtered array of battlers.
     */
    const filterLowTGR = function(group, topTGR) {
        if (!topTGR)
            return group;
        return group.filter(m => m.tgr * TGR_MULT > topTGR);
    };

    /**
     * @param {Game_Battler[]} group array of battlers
     * @returns {Game_Battler[]} input with low-TGR individuals removed.
     */
    const applyTGR = function(group) {
        if (group.length > 1)
            return filterLowTGR(group, getMaxTGR(group));
        return group;
    };

    /**
     * @param {Game_Action} action reference action
     * @returns {boolean} `true` iff should apply TGR-based target filtering.
     */
    const shouldApplyTGR = function(action) {
        return action?.isForOpponent() && !action.isCertainHit();
    };

    // Restrict target candidates (autobattle).
    void (alias => {
        Game_Action.prototype.itemTargetCandidates = function() {
            const group = alias.apply(this, arguments);
            if (shouldApplyTGR(this))
                return applyTGR(group);
            return group;
        };
    })(Game_Action.prototype.itemTargetCandidates);

    // Restrict enemy target selection (actor input).
    void (alias => {
        Window_BattleEnemy.prototype.refresh = function() {
            alias.apply(this, arguments);
            if (shouldApplyTGR(BattleManager.inputtingAction())) {
                this._enemies = applyTGR(this._enemies);
                Window_Selectable.prototype.refresh.apply(this, arguments);
            }
        };
    })(Window_BattleEnemy.prototype.refresh);

    /** Tracks whether to apply taunt, from `Game_Action` to `Game_Unit`. */
    let procTaunt = false;

    // Taunt only applies when selecting an opponent.
    void (alias => {
        Game_Action.prototype.targetsForOpponents = function() {
            procTaunt = shouldApplyTGR(this);
            return alias.apply(this, arguments);
        };
    })(Game_Action.prototype.targetsForOpponents);

    // Reset taunt flag when a new action starts.
    void (alias => {
        BattleManager.startAction = function() {
            procTaunt = false;
            alias.apply(this, arguments);
        };
    })(BattleManager.startAction);

    // Taunt can apply to random targets (includes enemy actions & confusion).
    void (alias => {
        Game_Unit.prototype.randomTarget = function() {
            if (!procTaunt)
                return alias.apply(this, arguments);
            const group = applyTGR(this.aliveMembers());
            let r = Math.random() * group.reduce((a, c) => a + c.tgr, 0);
            for (const m of group)
                if ((r -= m.tgr) <= 0)
                    return m;
            return group[0];    // jic
        };
    })(Game_Unit.prototype.randomTarget);

    // Taunt can apply for target smoothing (e.g. intended target dies or goes AWOL).
    void (alias => {
        Game_Unit.prototype.smoothTarget = function(index) {
            if (!procTaunt)
                return alias.apply(this, arguments);
            const target = this.members()[Math.max(0, index)];
            const group  = applyTGR(this.aliveMembers());
            if (target && target.isAlive() && group.contains(target))
                return target;
            return group[0];    // random is less manageable, null is too harsh?
        };
    })(Game_Unit.prototype.smoothTarget);

})();

// M04) Tagged states can <persist> through death.
void (() => { if (!CAE.Tweaks.M04) return;
'use strict';

    /** Name of the state notetag. */
    const TAG_NAME = CAE.Tweaks.M04.tag_persist || "persist";

    /**
     * @param {Game_BattlerBase} b reference battler
     * @returns {number[]} array of IDs for states that should persist through death.
     */
    const persistentStateIds = function(b) {
        return b._states.map(
            n => $dataStates[n].meta[TAG_NAME] ? n : 0
        ).filter(n => n);
    };

    /**
     * @typedef StatePersistData
     * @property {number[]} ids relevant state IDs
     * @property {number[]} turns corresponding turn counts
     * @property {?number[]} steps corresponding map step counts, or null
     */
    /**
     * @param {Game_BattlerBase} b reference battler
     * @returns {StatePersistData} relevant data
     */
    const memorise = function(b) {
        const ids = persistentStateIds(b);
        const L = ids.length;
        if (!L)
            return { ids };
        const turns = new Array(L);
        const steps = b._stateSteps ? new Array(L) : null;
        for (let n = L; n--;) {
            const id = ids[n];
            turns[n] = b._stateTurns[id];
            if (steps)
                steps[n] = b._stateSteps[id];
        }
        return { ids, turns, steps };
    };

    /**
     * Silently restores persistent states based on given data.
     * @param {Game_BattlerBase} b reference battler
     * @param {StatePersistData} mem relevant data
     */
    const restore = function(b, mem) {
        const { ids, turns, steps } = mem;
        for (let n = ids.length; n--;) {
            const id = ids[n];
            b._states.push(id);
            b._stateTurns[id] = turns[n];
            if (steps)
                b._stateSteps[id] = steps[n];
        }
    };

    // Silently restore persistent states after death.
    void (alias => {
        Game_BattlerBase.prototype.die = function() {
            const mem = memorise(this);
            alias.apply(this, arguments);
            restore(this, mem);
        };
    })(Game_BattlerBase.prototype.die);

})();

// M05) State progression: <next: X, Y> => Y% chance to add state X when at max turns.
void (() => { if (!CAE.Tweaks.M05) return;
'use strict';

    /** Name of notetag: `<TAG_NAME: nextId, chance>`. */
    const TAG_NAME = CAE.Tweaks.M05.next || "next";

    /** Anti-loop device. */
    const chain = [];

    /**
     * @param {string} tag tag value from original state
     * @returns {{next:number,chance:number}}
     * - `next`: ID of next state to apply (0 = none);
     * - `chance`: chance to apply that state (1 = 100%).
     *
     * `chance` will be multiplied by the applicable state rate.
     */
    const getNextState = function(tag) {
        const arr    = typeof tag === 'string' ? tag.split(',') : [];
        const next   = parseInt(arr[0], 10) || 0;
        const chance = Number(arr[1]) || 1;
        return { next, chance };
    };

    /**
     * This applies _after_ the original state is added,
     * and _before_ next state rate/chance checks.
     * @param {Game_Battler} battler reference battler
     * @param {number} stateId ID of state that was added
     * @returns {boolean} `true` iff the next state can be added.
     */
    const shouldAddNextState = function(battler, stateId) {
        return battler._stateTurns[stateId] === $dataStates[stateId].maxTurns;
    };

    // Also add "next" state if appropriate.
    void (alias => {
        Game_Battler.prototype.addState = function(stateId) {
            alias.apply(this, arguments);
            if (shouldAddNextState(this, stateId)) {
                const { next, chance } = getNextState(
                    $dataStates[stateId].meta[TAG_NAME]
                );
                if (next && Math.random() < chance * this.stateRate(next)) {
                    chain.push(stateId);
                    if (!chain.contains(next))
                        this.addState(next);
                }
            }
            chain.length = 0;
        };
    })(Game_Battler.prototype.addState);

})();

// M06) Blank equip type names count as previous non-blank equip type.
void (() => { if (!CAE.Tweaks.M06) return;
'use strict';

    // E.g. "Weapon", "Shield", "Ring", "", "Amulet" - defines 2 ring slots.

    /** Array of root values for each equip type ID. @type {number[]} */
    const types = [];

    /** Initialises {@linkcode types}. */
    const initDupeTypes = function() {
        const E = $dataSystem.equipTypes;
        const L = E.length;
        let root = types[0] = 1;
        for (let n = 1; ++n < L;)
            types[n - 1] = E[n] ? root = n : root;
    };

    /**
     * Maps given equip type ID to its root type ID.
     * @param {number} eTypeId input equip type ID
     * @returns {number} "real" equip type ID.
     */
    const dupeSlot = function(eTypeId) {
        return types[eTypeId - 1];
    };

    // Initialise dupe types on game boot.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            initDupeTypes();
            alias.apply(this, arguments);
        };
    })(Scene_Boot.prototype.start);

    // Map equip slots to their root type ID as appropriate.
    void (alias => {
        Game_Actor.prototype.equipSlots = function() {
            return Array.from(alias.apply(this, arguments), dupeSlot);
            // const res = alias.apply(this, arguments);
            // for (let n = res.length; n--;)
            //     res[n] = dupeSlot(res[n]);  // in-place
            // return res;
        };
    })(Game_Actor.prototype.equipSlots);

})();

// M07) Luck now affects more things.
void (() => { if (!CAE.Tweaks.M07) return;
'use strict';

    /** If `true`, apply luck effect to hit chance. @type {boolean} */
    const APPLY_HIT = CAE.Tweaks.M07.HIT;

    /** If `true`, apply luck effect to crit chance. @type {boolean} */
    const APPLY_CRIT = CAE.Tweaks.M07.CRIT;

    /** If `true`, apply luck effect to physical counter chance. @type {boolean} */
    const APPLY_CNT = CAE.Tweaks.M07.CNT;

    /** If `true`, apply luck effect to magic reflection chance. @type {boolean} */
    const APPLY_MRF = CAE.Tweaks.M07.MRF;

    /** If `true`, apply luck effect to enemy item drop chance. @type {boolean} */
    const APPLY_DROP_ITEM = CAE.Tweaks.M07.ITEM;

    /** If `true`, apply luck effect to enemy gold drop quantity. @type {boolean} */
    const APPLY_DROP_GOLD = CAE.Tweaks.M07.GOLD;

    /** If `true`, apply luck effect to party escape command success rate. @type {boolean} */
    const APPLY_ESCAPE_RATIO = CAE.Tweaks.M07.FLEE;

    /** If `true`, apply unit-based luck effects. */
    const APPLY_UNIT = APPLY_DROP_ITEM || APPLY_DROP_GOLD || APPLY_ESCAPE_RATIO;

    // Patch - luck affects hit rate (unless certain hit).
    void (alias => { if (!APPLY_HIT) return;
        Game_Action.prototype.itemHit = function(target) {
            const r = alias.apply(this, arguments);
            if (this.isCertainHit())
                return r;
            return r * this.lukEffectRate(target);
        };
    })(Game_Action.prototype.itemHit);

    // Patch - luck affects crit rate.
    void (alias => { if (!APPLY_CRIT) return;
        Game_Action.prototype.itemCri = function(target) {
            return alias.apply(this, arguments) * this.lukEffectRate(target);
        };
    })(Game_Action.prototype.itemCri);

    // Patch - luck affects physical counter rate.
    void (alias => { if (!APPLY_CNT) return;
        Game_Action.prototype.itemCnt = function(target) {
            return alias.apply(this, arguments) * this.lukEffectRate(target);
        };
    })(Game_Action.prototype.itemCnt);

    // Patch - luck affects magic reflection rate.
    void (alias => { if (!APPLY_MRF) return;
        Game_Action.prototype.itemMrf = function(target) {
            return alias.apply(this, arguments) * this.lukEffectRate(target);
        };
    })(Game_Action.prototype.itemMrf);

    void (() => { if (!APPLY_UNIT) return;

        /**
         * @param {Game_Unit|Game_BattlerBase} subject
         * Reference subject unit or battler.
         * @param {Game_Unit|Game_BattlerBase} target
         * Reference target unit or battler.
         * @returns {number}
         * Mean of all member-pairwise luck effect rates.
         */
        const lukEffectRate = function(subject, target) {
            let r = 0;
            // Funnily enough, `unit.agility()` includes dead members. So.
            const  f = v => v instanceof Game_Unit ? v.members() : [v];
            const u0 = f(subject);
            const u1 = f(target);
            for (const m0 of u0) {
                const a = new Game_Action(m0);
                a.setAttack();  // jic
                for (const m1 of u1)
                    r += a.lukEffectRate(m1);
            }
            return r / (u0.length * u1.length);
        };

        // Patch - luck affects enemy item/gold drop rates.
        void (() => { if (!APPLY_DROP_ITEM) return;
            const alias = Game_Enemy.prototype.dropItemRate;
            Game_Enemy.prototype.dropItemRate = function() {
                return alias.apply(this, arguments) * lukEffectRate($gameParty, this);
            };
        })();
        void (() => { if (!APPLY_DROP_GOLD) return;
            const alias = Game_Enemy.prototype.gold;
            Game_Enemy.prototype.gold = function() {
                return Math.round(
                    alias.apply(this, arguments) * lukEffectRate($gameParty, this)
                );
            };
        })();

        // Patch - luck affects escape ratio.
        if (APPLY_ESCAPE_RATIO) // late patch for compatibility with M34.
            CAE.Tweaks.Utils.patchOnBoot(
                "BattleManager.makeEscapeRatio",
                alias => function() {
                    alias.apply(this, arguments);
                    this._escapeRatio *= lukEffectRate($gameParty, $gameTroop);
                }
            );

    })();

})();

// M08) TP = flat HP damage absorption from damage formulae.
void (() => { if (!CAE.Tweaks.M08) return;
'use strict';

    /** ID of animation played when any amount of damage is blocked. @type {number} */
    const ANIM_BLOCK = CAE.Tweaks.M08.BLOCK;

    /** ID of animation played when block breaks/expires. @type {number} */
    const ANIM_BLOCK_BREAK = CAE.Tweaks.M08.BREAK;

    /** Battle log message to show when an actor blocks damage. @type {string} */
    const ACTOR_BLOCK_MSG = CAE.Tweaks.M08.LOG_A;

    /** Battle log message to show when an enemy blocks damage. @type {string} */
    const ENEMY_BLOCK_MSG = CAE.Tweaks.M08.LOG_E;

    /** If `true`, force TP to be full outside of battle. @type {boolean} */
    const MAX_TP_OUT_OF_BATTLE = CAE.Tweaks.M08.MAXTP;

    /** If `true`, show "blocked damage" popups. @type {boolean} */
    const SHOW_POPUP = CAE.Tweaks.M08.DOPOP;

    /** Text colour index for "blocked damage" popups. @type {number} */
    const POPUP_COLOUR = CAE.Tweaks.M08.POP_C;

    /** X offset for "blocked damage" popups. @type {number} */
    const BLOCK_OFFSET_X = CAE.Tweaks.M08.POP_X;

    /** Y offset for "blocked damage" popups. @type {number} */
    const BLOCK_OFFSET_Y = CAE.Tweaks.M08.POP_Y;

    /** Adjust popup positions in post iff this is `true`. @type {boolean} */
    const IS_BLOCK_OFFSET = !!(BLOCK_OFFSET_X || BLOCK_OFFSET_Y);

    /** If `true`, perform crit flash effect on applicable block popups. @type {boolean} */
    const CRIT_BLOCK_POPUP = CAE.Tweaks.M08.POP_CRIT;

    /** Battlers will have this state active so long as they have TP > 0. @type {number} */
    const BLOCK_STATE = CAE.Tweaks.M08.STATE;

    /**
     * Non-conflicting identifier for marking damage result as blocked:
     * - "damage blocked" on `Game_Battler` and `Game_ActionResult`;
     * - "this is for blocked damage" on `Sprite_Damage`.
     */
    const SYM = Symbol();

    /**
     * @param {Game_Battler} battler reference battler
     * @param {number} value damage to block (positive)
     * @returns {number} TP cost `battler` must pay to block `value` damage.
     */
    const blockCost = function(battler, value) {
        // Considered: block rate of 1 damage per (TP Charge Rate) TP.
        // E.g. TCR = 20% => 5 damage per TP.
        // Rejected: over-complicated, just increase max TP instead.
        // TP Gain user effect still scales with TCR as usual.
        return Math.ceil(value);
    };

    /**
     * Shows appropriate "damage blocked" animation.
     * @param {Game_Battler} target reference battler
     * @param {boolean} isBreak `true` iff block was broken.
     */
    const showBlockAnim = function(target, isBreak = false) {
        if (target && $gameParty.inBattle()) {
            $gameTemp.requestAnimation([target], ANIM_BLOCK);
            if (isBreak)
                $gameTemp.requestAnimation([target], ANIM_BLOCK_BREAK);
        }
    };

    /**
     * Performs additional effects after actual damage reduction.
     * Call only when some damage is blocked.
     * @param {Game_Battler} battler reference battler
     * @param {number} reduction damage reduction (positive)
     * @param {number} through damage result after reduction (positive)
     */
    const onBlock = function(battler, reduction, through) {
        battler.gainSilentTp(-blockCost(battler, reduction));
        showBlockAnim(battler, !battler.tp);
        battler.result()[SYM] = battler[SYM] = reduction;
    };

    /**
     * @param {Game_Battler} battler reference battler
     * @param {number} value incident damage (positive)
     * @returns {number} resultant damage (positive)
     */
    const processBlock = function(battler, value) {
        const tp = battler.tp;
        if (value > 0 && tp > 0) {
            const v = blockCost(battler, value);
            const r = v <= tp ? v : tp;
            if (r > 0) {
                value -= r;
                onBlock(battler, r, value);
            }
        }
        return value;
    };

    // Override - do not charge TP by damage.
    Game_Battler.prototype.chargeTpByDamage = function(damageRate) {};

    // Override - TP gauge is now valid irrespective of Preserve TP trait.
    Sprite_Gauge.prototype.isValid = function() {
        return !!this._battler;
    };

    // Patch - block incident HP damage based on TP.
    void (alias => {
        Game_Action.prototype.executeHpDamage = function(target, damage, ...args) {
            alias.call(this, target, processBlock(target, damage), ...args);
        };
    })(Game_Action.prototype.executeHpDamage);

    // Patch - also clear "damage blocked" value from result.
    void (alias => {
        Game_ActionResult.prototype.clear = function() {
            alias.apply(this, arguments);
            delete this[SYM];
        };
    })(Game_ActionResult.prototype.clear);

    // Patch - show "blocked damage" popups.
    void (() => { if (!SHOW_POPUP) return;

        /** @returns {string} CSS fill style for blocked damage popup text. */
        const popupColour = function() {
            const c = POPUP_COLOUR;
            return Number.isFinite(c) ? ColorManager.textColor(c) : c;
        };

        /**
         * For adjusting position of "blocked damage" popup.\
         * Done in post to avoid offsetting existing "damage" follow-up.
         *
         * Subsequent popups should get placed based on that more-recent follow-up.
         * @param {Sprite_Damage} popup
         * Popup sprite to adjust.
         * @returns {boolean}
         * `true` iff position was adjusted.
         */
        const adjustPopupPosition = function(popup) {
            if (popup?.[SYM]) {
                popup.x += BLOCK_OFFSET_X;
                popup.y += BLOCK_OFFSET_Y;
                return true;
            }
            return false;
        };

        /**
         * Adjusts position of all popups.
         * @param {Sprite_Damage[]} popups
         * Popup sprites to adjust.
         */
        const adjustAllPopupPositions = function(popups) {
            if (IS_BLOCK_OFFSET)
                for (const popup of popups)
                    adjustPopupPosition(popup);
        };

        // Patch - specify text colour for "blocked damage" popup.
        void (alias => {
            Sprite_Damage.prototype.damageColor = function() {
                if (SYM in this)
                    return popupColour();
                return alias.apply(this, arguments);
            };
        })(Sprite_Damage.prototype.damageColor);

        // Patch - define "blocked damage" popup type.
        void (alias => {
            Sprite_Damage.prototype.setup = function(target) {
                if (SYM in target) {
                    this[SYM] = true;
                    this.createDigits(target[SYM]);
                    delete target[SYM];
                    if (CRIT_BLOCK_POPUP && target.result().critical)
                        this.setupCriticalEffect();
                } else
                    alias.apply(this, arguments);
            };
        })(Sprite_Damage.prototype.setup);

        // Patch - show normal & "block" popups when appropriate.
        void (alias => {
            Sprite_Battler.prototype.createDamageSprite = function() {
                if (SYM in this._battler)
                    alias.apply(this, arguments);   // show blocked damage
                alias.apply(this, arguments);       // show normal popup
                adjustAllPopupPositions(this._damages);
            };
        })(Sprite_Battler.prototype.createDamageSprite);

    })();

    // Patch - show "blocked" battle log message when appropriate.
    void (() => { if (!ACTOR_BLOCK_MSG && !ENEMY_BLOCK_MSG) return;

        const alias = Window_BattleLog.prototype.displayHpDamage;
        Window_BattleLog.prototype.displayHpDamage = function(target) {
            const blocked = target.result()[SYM];
            if (blocked) {
                const form = target.isActor() ? ACTOR_BLOCK_MSG : ENEMY_BLOCK_MSG;
                const text = form.format(target.name(), blocked);
                if (text)
                    this.push("addText", text);
            }
            alias.apply(this, arguments);
        };

    })();

    // Override - refill TP.
    void (() => { if (!MAX_TP_OUT_OF_BATTLE) return;

        // Override - start battles at max TP. Skipped if you have a Preserve TP trait.
        Game_Battler.prototype.initTp = function() {
            this.setTp(this.maxTp());
        };

        // Override - TP is always full outside of battle.
        Object.defineProperty(Game_Actor.prototype, "tp", {
            get: function() {
                if (!$gameParty.inBattle())
                    return this.maxTp();
                return Reflect.get(Game_Battler.prototype, "tp", this);
            },
            configurable: true
        });

    })();

    // Patch - always-on state when TP > 0.
    void (() => { if (!BLOCK_STATE) return;

        const alias = Game_Battler.prototype.refresh;
        Game_Battler.prototype.refresh = function() {
            alias.apply(this, arguments);
            if (this._tp > 0)
                this.addState(BLOCK_STATE);
            else
                this.removeState(BLOCK_STATE);
        };

    })();

})();

// M09) Specify max TP with trait notetags.
void (() => { if (!CAE.Tweaks.M09) return;
'use strict';

    /** Name of notetag for "base" max TP value. */
    const TAG_NAME_BASE = CAE.Tweaks.M09["tag_max TP base"] || "max TP base";

    /** Name of notetag for "plus" max TP value. */
    const TAG_NAME_PLUS = CAE.Tweaks.M09["tag_max TP plus"] || "max TP plus";

    /**
     * Base value for maximum TP in the absence of tags.
     * `null` counts as original value (default 100).
     */
    const DFAULT_MAX_TP = CAE.Tweaks.M09.DFAULT;

    /** Non-conflicting identifier for max TP value cache. */
    const SYM = Symbol();

    /**
     * @param {Game_Battler} battler reference battler
     * @returns {[base:?number,plus:number]} max TP values.
     */
    const maxTpFromTags = function(battler) {
        return battler.traitObjects().reduce((a, c) => {
            const base = parseInt(c.meta[TAG_NAME_BASE], 10);
            const plus = parseInt(c.meta[TAG_NAME_PLUS], 10);
            if (a[0] === null ? base : base > a[0])
                a[0] = base;
            if (plus)
                a[1] += plus;
            return a;
        }, [DFAULT_MAX_TP, 0]);
    };

    // Patch - read/cache max TP base/plus values from tags.
    void (alias => {
        Game_BattlerBase.prototype.maxTp = function() {
            if (!(SYM in this)) {
                const [base, plus] = maxTpFromTags(this);
                this[SYM] = typeof base === 'number' ?
                    Math.max(base + plus, 0) :
                    Math.max(alias.apply(this, arguments) + plus, 0);
            }
            return this[SYM];
        };
    })(Game_BattlerBase.prototype.maxTp);

    // Patch - TP rate is 0 if max TP is 0 (consistent with core mpRate).
    void (alias => {
        Game_BattlerBase.prototype.tpRate = function() {
            const r = alias.apply(this, arguments);
            return Number.isFinite(r) ? r : 0;
        };
    })(Game_BattlerBase.prototype.tpRate);

    // Patch - clear cached max TP value on refresh.
    void (alias => {
        Game_BattlerBase.prototype.refresh = function() {
            delete this[SYM];
            alias.apply(this, arguments);
        };
    })(Game_BattlerBase.prototype.refresh);

    // Override - TP regen now scales as % of max TP rather than % of 100.
    Game_Battler.prototype.regenerateTp = function() {
        const value = Math.floor(this.maxTp() * this.trg);
        this.gainSilentTp(value);
    };

})();

// M10) Cancel input, or left/right, to select next TPB-charged actor.
void (() => { if (!CAE.Tweaks.M10) return;
'use strict';

    // By default TPB-Wait does not charge an actor if another is already charged. Dunno why.
    Game_Actor.prototype.shouldDelayTpbCharge = function() { return false; };

    // Add left/right inputs for more intuitive handling~
    void (alias => {
        Window_ActorCommand.prototype.processHandling = function() {
            alias.apply(this, arguments);
            if (this.isOpenAndActive()) {
                if (Input.isTriggered("left"))
                    return BattleManager.changeCurrentActor(false), true;
                if (Input.isTriggered("right"))
                    return BattleManager.changeCurrentActor(true), true;
            }
        };
    })(Window_ActorCommand.prototype.processHandling);

    // I think a flashing CHARGE gauge should signify full CHARGE state? O_o
    Sprite_Gauge.prototype.updateFlashing = function() {
        if (this._statusType === "time") {
            ++this._flashingCount;
            this.setBlendColor(
                this._battler.isTpbCharged() ? (
                    this._flashingCount % 30 < 15 ?
                    this.flashingColor1() :
                    this.flashingColor2())
                : [0, 0, 0, 0]
            );
        }
    };

})();

// M11) Active/Wait TPB mode option.
void (() => { if (!CAE.Tweaks.M11) return;
'use strict';

    /**
     * Command symbol for this option on `ConfigManager`.
     * Also used for the per-playthrough property on `Game_System`.
     * @type {string}
     */
    const KEY = CAE.Tweaks.M11.KEY;

    /** Display text for this option. @type {string} */
    const TXT = CAE.Tweaks.M11.TXT;

    /** Default value for this option. @type {boolean} */
    const DFAULT = CAE.Tweaks.M11.DFAULT;

    // Override - read in-game option instead of database.
    BattleManager.isActiveTpb = function() {
        return $gameSystem[KEY] ?? ConfigManager[KEY];
    };

    // Add config property.
    ConfigManager[KEY] = DFAULT;

    // Patch - include in config save data.
    void (alias => {
        ConfigManager.makeData = function() {
            const config = alias.apply(this, arguments);
            config[KEY] = this[KEY];
            return config;
        };
    })(ConfigManager.makeData);

    // Patch - read from loaded config data.
    void (alias => {
        ConfigManager.applyData = function(config) {
            alias.apply(this, arguments);
            this[KEY] = this.readFlag(config, KEY, DFAULT);
        };
    })(ConfigManager.applyData);

    // Add in-game option if display text is set.
    void (() => { if (!TXT) return;

        // Patch - add to options menu.
        void (alias => {
            Window_Options.prototype.addGeneralOptions = function() {
                alias.apply(this, arguments);
                this.addCommand(TXT, KEY);
                const n = this._list.findIndex(c => c.symbol === KEY);
                if (n >= 0) {       // presence check
                    const r = this._list.findIndex(c => c.symbol === "commandRemember");
                    if (r >= 0)     // move next to command remember
                        this._list.splice(r + 1, 0, this._list.splice(n, 1)[0]);
                }
            };
        })(Window_Options.prototype.addGeneralOptions);

        // Patch - accommodate new option.
        void (alias => {
            Scene_Options.prototype.maxCommands = function() {
                return alias.apply(this, arguments) + 1;
            };
        })(Scene_Options.prototype.maxCommands);

    })();

    /**
     * Resets per-playthrough "Active TPB" status.
     * @returns {boolean}
     * `true` iff value was changed.
     */
    const resetActiveTpb = function() {
        return delete $gameSystem[KEY];
    };

    /**
     * @param {boolean} active
     * Whether the TPB system should be set to active or not for this playthrough.
     * @returns {boolean}
     * Assigned value.
     */
    const setActiveTpb = function(active) {
        return $gameSystem[KEY] = !!active;
    };

    /** Plugin command methods. */
    CAE.Tweaks.M11.pCom = {
        set: function(args) {
            return setActiveTpb(args.active === "true");
        },
        reset: function(args) {
            return resetActiveTpb();
        }
    };

    // Register plugin commands.
    PluginManager.registerCommand(CAE.Tweaks.NAME, "M11_reset", CAE.Tweaks.M11.pCom.reset);
    PluginManager.registerCommand(CAE.Tweaks.NAME, "M11_set",   CAE.Tweaks.M11.pCom.set  );

})();

// M12) Add min state turns on apply, up to max turns.
void (() => { if (!CAE.Tweaks.M12) return;
    Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
        const state = $dataStates[stateId];
        const turns = this._stateTurns;
        turns[stateId] = Math.min(
            (turns[stateId] ?? 0) + state.minTurns,
            state.maxTurns
        );
    };
})();

// M13) Encounter rate is now minimum steps for encounter (max = mult * rate).
void (() => { if (!CAE.Tweaks.M13) return;
'use strict';

    /** Multiplier for random variation in encounter step count. @type {number} */
    const F = CAE.Tweaks.M13.MAX - 1;

    // Override - change min/max.
    Game_Player.prototype.makeEncounterCount = function() {
        const r = $gameMap.encounterStep();
        this._encounterCount = r + (
            F > 0 ? F * (Math.randomInt(r + 1) + Math.randomInt(r + 1)) / 2 : 0
        );
    };
    // [r, r*(1+F)], from [1, 1 + 2*(r-1)]; distribution unchanged.

})();

// M14) Actions with speed > 0 give a TPB charge boost next turn.
void (() => { if (!CAE.Tweaks.M14) return;
'use strict';

    /**
     * Actions at or above this speed will be "instant".
     * TPB charge bonus scales linearly up to this speed value.
     *
     * Even in TPB Wait mode, "instant" actions permit 1 frame
     * of charge time for other battlers, so are not zero-time.
     */
    const INSTANT_SPEED = CAE.Tweaks.M14.INSTANT;
    // immediately re-add subject to action battler list when apt?
    // in the general case should limit number of
    // instants per turn to avoid soft-lock.

    /**
     * Non-conflicting property identifier for storing
     * cumulative action speed on a battler during their turn.
     */
    const SYM = Symbol();

    /**
     * Core `Game_Action#speed` includes agility and randomness; this doesn't.
     * @param {Game_Action} action reference action
     * @returns {number} speed value to use for TPB bonus.
     */
    const getSpeed = function(action) {
        if (action) {
            const si = action.item()?.speed ?? 0;
            const sa = action.isAttack() ? action.subject().attackSpeed() : 0;
            return si + sa;
        }
        return 0;
    };

    /**
     * Increases given battler's TPB bonus based on their current action.
     * @param {Game_Battler} battler reference battler
     */
    const addBonus = function(battler) {
        battler[SYM] ??= 0;
        battler[SYM] += getSpeed(battler.currentAction());
    };

    /**
     * @param {Game_Battler} battler reference battler
     * @returns {number} corresponding additive bonus for TPB charge gauge.
     */
    const getBonusCharge = function(battler) {
        if (!battler[SYM])  // if zero/undefined
            return 0;
        return (battler[SYM] / INSTANT_SPEED).clamp(0, 1);
    };

    /**
     * Applies given battler's current bonus to their TPB charge time,
     * then resets their bonus counter.
     * @param {Game_Battler} battler reference battler
     */
    const applyBonus = function(battler) {
        battler._tpbChargeTime += getBonusCharge(battler);
        delete battler[SYM];
    };

    // Patch - count total speed of a battler's actions, per turn.
    void (alias => {
        BattleManager.startAction = function() {
            addBonus(this._subject);
            alias.apply(this, arguments);
        };
    })(BattleManager.startAction);

    // Patch - apply bonus from positive action speed, if any.
    void (alias => {
        BattleManager.endBattlerActions = function(battler) {
            alias.apply(this, arguments);
            applyBonus(battler);
        };
    })(BattleManager.endBattlerActions);

})();

// M15) Remove state X% removes X% of the max turns of that state.
void (() => { if (!CAE.Tweaks.M15) return;
'use strict';

    /**
     * @param {Game_Battler} target reference battler
     * @param {number} stateId ID of state to remove
     * @param {number} chance removal chance: will remove chance% of max turns (rounded up)
     * @returns {boolean} `true` iff state was completely removed.
     */
    const removeState = function(target, stateId, chance) {
        // By default success is only based on proc chance.
        // This change means no success if state is absent.
        const state = $dataStates[stateId];
        if (state && target._stateTurns[stateId]) {
            const turns = Math.ceil(chance * state.maxTurns);
            if (target._stateTurns[stateId] <= turns) {
                target.removeState(stateId);
                return true;
            } else
                target._stateTurns[id] -= turns;
        }
        return false;
    };

    // Override - "Remove State" item/skill effect.
    Game_Action.prototype.itemEffectRemoveState = function(target, effect) {
        if (removeState(target, effect.dataId, effect.value1))
            this.makeSuccess();
    };

    // Override - "Remove by Damage" state property.
    Game_Battler.prototype.removeStatesByDamage = function() {
        for (const state of this.states())
            if (state.removeByDamage)
                removeState(this, state.id, state.chanceByDamage);
    };

})();

// M16) Enemy tag <actor: X> gives the enemy that actor's params & traits.
void (() => { if (!CAE.Tweaks.M16) return;
'use strict';

    /** Enemy notetag name. */
    const TAG_NAME = CAE.Tweaks.M16.tag_actor || "actor";

    /**
     * Non-conflicting property identifier for:
     * - enemy actor reference on `Game_Enemy`;
     * - parent enemy reference on `Game_Actor`.
     */
    Object.defineProperty(CAE.Tweaks.M16, "SYM", {
        value: Symbol(), configurable: false
    });

    /**
     * @param {Game_Enemy} enemy reference enemy
     * @returns {?Game_Actor} gets and stores corresponding deep-cloned actor reference, if any.
     */
    const getActor = function(enemy) {
        const id = parseInt(enemy?.enemy().meta[TAG_NAME] || 0, 10);
        const actor = $gameActors.actor(id);
        if (actor) {
            const a = JsonEx.makeDeepCopy(actor);
            a.recoverAll(); // ostensibly to avoid everlasting states from never-updating actor
            a[CAE.Tweaks.M16.SYM] = enemy;      // back-reference, e.g. for M25
            return enemy[CAE.Tweaks.M16.SYM] = a;
        }
        delete enemy[CAE.Tweaks.M16.SYM]
        return null;
    };

    // Patch - deep-clone reference actor on setup/transform when appropriate.
    void (alias => {
        Game_Enemy.prototype.setup = function(enemyId, x, y) {
            this._enemyId = enemyId;
            getActor(this);
            alias.apply(this, arguments);
        };
    })(Game_Enemy.prototype.setup);
    void (alias => {
        Game_Enemy.prototype.transform = function(enemyId) {
            this._enemyId = enemyId;
            getActor(this);
            alias.apply(this, arguments);
        };
    })(Game_Enemy.prototype.transform);

    // Patch - associated actor provides base params.
    void (alias => {
        Game_Enemy.prototype.paramBase = function(paramId) {
            if (this[CAE.Tweaks.M16.SYM])
                return this[CAE.Tweaks.M16.SYM].paramBase(...arguments);
            return alias.apply(this, arguments);
        };
    })(Game_Enemy.prototype.paramBase);

    // Patch - associated actor provides plus params.
    void (alias => {
        Game_Enemy.prototype.paramPlus = function(paramId) {
            const v = alias.apply(this, arguments);
            if (this[CAE.Tweaks.M16.SYM])
                return v + this[CAE.Tweaks.M16.SYM].paramPlus(...arguments);
            return v;
        };
    })(Game_Enemy.prototype.paramPlus);

    // Patch - associated actor provides additional trait sources.
    void (alias => {
        Game_Enemy.prototype.traitObjects = function() {
            const o = alias.apply(this, arguments);
            if (this[CAE.Tweaks.M16.SYM])
                return o.concat(this[CAE.Tweaks.M16.SYM].traitObjects());
            return o;
        };
    })(Game_Enemy.prototype.traitObjects);

    // Patch - added skills include associated actor's learned skills.
    void (alias => {
        Game_Enemy.prototype.addedSkills = function() {
            const o = alias.apply(this, arguments);
            if (this[CAE.Tweaks.M16.SYM])
                return o.concat(
                    this[CAE.Tweaks.M16.SYM]._skills,
                    this[CAE.Tweaks.M16.SYM].guardSkillId()
                ).filter((id, n, l) => l.indexOf(id) === n);
            return o;
        };
    })(Game_Enemy.prototype.addedSkills);
    // [ ] M16 - make `attackSkillId` and `guardSkillId` based on actor as well? Anything else to watch out for?

    // Patch - source attack animation from associated actor when appropriate.
    CAE.Tweaks.Utils.patchOnBoot( // compatibility with Q11
        "Game_Enemy.prototype.attackAnimationId1",
        alias => alias ? function() {
            if (this[CAE.Tweaks.M16.SYM])
                return this[CAE.Tweaks.M16.SYM].attackAnimationId1();
            return alias.apply(this, arguments);
        } : null
    );

})();

// M17) Skill/Item tag <follow-up: X> => follow up with skill ID X. <follow-up> for random known skill.
void (() => { if (!CAE.Tweaks.M17) return;
'use strict';

    // Like an automatic Force Action kind of thing, but without the mess.

    /** Name of skill tag. */
    const TAG_NAME = CAE.Tweaks.M17["tag_follow-up"] || "follow-up";

    /**
     * Follow-up action list.
     * @type {Game_Action[]}
     */
    const followUpActs = [];

    /**
     * Tracks original and follow-up skill IDs to avoid endless loops.
     * @type {Set<number>}
     */
    const chain = new Set();

    /**
     * @param {Game_Actor} actor reference actor instance
     * @returns {number[]} array of usable skill IDs.
     */
    const getSkillIdsFromActor = function(actor) {
        return Array.from(actor.usableSkills(), o => o.id);
    };

    /**
     * @param {Game_Enemy} enemy reference enemy instance
     * @returns {number[]} array of usable skill IDs.
     */
    const getSkillIdsFromEnemy = function(enemy) {
        // return enemy.enemy().actions.filter(a => enemy.isActionValid(a)).map(o => o.skillId).filter(n => n);
        // Check Add Skill traits instead of action pattern - more flexible.
        return Array.from(
            enemy.addedSkills(),
            n => enemy.canUse($dataSkills[n]) ? n : 0
        ).filter(n => n);
    };

    /**
     * @param {Game_Battler} subject reference battler
     * @returns {number[]} array of usable skill IDs.
     */
    const getSkillIdsFromSubject = function(subject) {
        if (subject instanceof Game_Actor)
            return getSkillIdsFromActor(subject);
        if (subject instanceof Game_Enemy)
            return getSkillIdsFromEnemy(subject);
        return [];
    };

    /**
     * @param {string} tag reference tag value
     * @returns {number[]} array of given skill IDs.
     */
    const getSkillIdsFromTag = function(tag) {
        if (typeof tag === "string")
            return tag.split(",").map(s => parseInt(s, 10));
        return [];
    };

    /**
     * @param {Game_Action} action reference action
     * @returns {number[]} array of valid follow-up skill IDs.
     */
    const getPotentialFollowUpSkillIds = function(action) {
        if (action instanceof Game_Action) {
            const item = action.item();
            const tag  = item.meta[TAG_NAME];
            if (tag) {
                const res = tag === true ?
                    getSkillIdsFromSubject(action.subject()) :
                    getSkillIdsFromTag(tag);
                return res.filter(id => !chain.has(id));    // no infinite loops plz
            }
        }
        return [];
    };

    /**
     * @param {Game_Action} action
     * @returns {number} ID of a valid follow-up skill, or 0.
     */
    const getFollowUpSkillId = function(action) {
        const arr = getPotentialFollowUpSkillIds(...arguments);
        return arr[Math.randomInt(arr.length)] ?? 0;
    };

    /** Clears anti-loop mechanism. */
    const clearChain = function() {
        chain.clear();
    };

    /** Clears all follow-up actions. */
    const clearFollowUpActions = function() {
        followUpActs.length = 0;
        clearChain();
    };

    /**
     * @param {Game_Action} action reference action
     * @param {number} skillId ID of follow-up skill
     * @returns {?Game_Action} appropriate follow-up action.
     */
    const makeFollowUpAction = function(action, skillId) {
        if (skillId && (action instanceof Game_Action)) {
            const item = action.item();
            const o = $dataSkills[skillId];
            if (o) {
                const a = new Game_Action(action.subject());
                a.setSkill(skillId);
                // match target index to parent action
                if (action.needsSelection() && action.isForOpponent() === a.isForOpponent())
                    a.setTarget(action._targetIndex);
                return a;
            }
            SceneManager.showDevTools();
            console.error(
                `Invalid follow-up skill ID "${skillId}" in notetag <${TAG_NAME}> ` +
                `on ${DataManager.isSkill(item) ? 'skill' : 'item'} ${item.id}.`
            );
        }
        return null;
    };

    /**
     * @param {Game_Action} action reference action
     * @returns {Game_Action[]} array of follow-up actions.
     */
    const makeNewFollowUpActions = function(action) {
        chain.add(action.item().id);
        const n = getFollowUpSkillId(action);
        if (n && !chain.has(n)) {
            chain.add(n);
            const a = makeFollowUpAction(action, n);
            if (a)
                return [a];
        }
        return [];
    };

    /**
     * Updates follow-up action list with provided data.
     * @param {Game_Action[]} list array of follow-up actions.
     * @returns {number} new follow-up action count.
     */
    const addFollowUpActions = function(list) {
        return followUpActs.push(...list);
    };

    /**
     * @param {Game_Action} action reference action
     * @returns {boolean} `true` iff provided action is a valid follow-up.
     */
    const isFollowUpValid = function(action) {
        return action instanceof Game_Action;
    };

    /** @returns {Game_Action} next valid follow-up action. */
    const getNextFollowUp = function() {
        let a = null;
        while (followUpActs.length)
            if (isFollowUpValid(a = followUpActs.pop()))
                return a;
        return null;
    };

    /** @returns {boolean} `true` iff should start a new follow-up action now. */
    const shouldFollowUpNow = function() {
        if (BattleManager._targets.length)
            return false;   // action ongoing
        if (!followUpActs.length)
            return false;   // no follow-ups remaining
        return true;
    };

    /**
     * Updates current action and target list for follow-ups when apt.
     * @returns {boolean} `true` iff should recurse, e.g. no targets for new follow-up action.
     */
    const updateFollowUp = function() {
        const subject = BattleManager._subject;
        const action = getNextFollowUp();
        if (action && action.makeTargets().length) {
            subject._actions.unshift(action);
            BattleManager._logWindow.endAction(subject);
            alias_startAction.call(BattleManager);
            subject.removeCurrentAction();
        }
        return !BattleManager._targets.length;
    };

    // Patch 1 - create follow-up actions when appropriate.
    void (alias => {
        BattleManager.startAction = function() {
            alias.apply(this, arguments);
            addFollowUpActions(makeNewFollowUpActions(this._action));
        };
    })(BattleManager.startAction);

    // Patch 2 - initialise follow-up actions when original action starts.
    const alias_startAction = BattleManager.startAction;    // also referenced in `updateFollowUp`
    BattleManager.startAction = function() {
        clearFollowUpActions();
        alias_startAction.apply(this, arguments);
    };

    // Patch - update follow-up actions as well.
    void (alias => {
        BattleManager.updateAction = function() {
            // update only if follow-up is not due
            if (!shouldFollowUpNow())
                alias.apply(this, arguments);
            // follow-up afterwards for correct start action priority
            while (shouldFollowUpNow())
                updateFollowUp(...arguments);
        };
    })(BattleManager.updateAction);

    // Patch - Auto Battle also evaluates follow-ups.
    CAE.Tweaks.Utils.patchOnBoot( // compatibility with M33
        "Game_Action.prototype.evaluate",
        alias => function() {
            clearChain();   // evaluate never normally happens mid-action, thus safe
            const f = a => [a, ...makeNewFollowUpActions(a).flatMap(f)];
            const r = f(this).reduce(
                (a, c) => a + alias.apply(c, arguments)
            , 0);
            // console.warn("final evaluation for", this.subject().name(), "using", this.item().name, "is", r);
            return r;
        }
    );

})();

// M18) "X Random" scope Skill/Item tags: <avoid repeats>, <forbid repeats>.
void (() => { if (!CAE.Tweaks.M18) return;
'use strict';

    // NB: "Repeats" are applied after targets have been generated.
    //     This feature strictly applies to the "X Random" scopes.

    /** Name of Skill/Item tag for actions that should avoid repeat targets. */
    const TAG_AVOID = CAE.Tweaks.M18["tag_avoid repeats"] || "avoid repeats";  // "avoid dupes" instead, to prevent confusion with Repeats?

    /** Name of Skill/Item tag for actions that should forbid repeat targets. */
    const TAG_FORBID = CAE.Tweaks.M18["tag_forbid repeats"] || "forbid repeats";

    /**
     * Enumerates different "random repeats" selection change types.
     * @enum {number}
     */
    const TYPE = Object.freeze({
        /** No change. */
        DFAULT: 0,
        /** Prefer no duplicates, no change to target count. */
        AVOID:  1,
        /** No duplicates, reduce target count if necessary. */
        FORBID: 2
    });

    /**
     * @param {Game_Action} action reference action
     * @returns {TYPE} `true` iff should use original random target selection.
     */
    const repeatChangeType = function(action) {
        if (action instanceof Game_Action) {
            const meta = action.item().meta;
            if (meta[TAG_FORBID])
                return TYPE.FORBID;
            if (meta[TAG_AVOID])
                return TYPE.AVOID;
        }
        return TYPE.DFAULT;
    };

    /**
     * Unbiased random shuffle function (Fisher-Yates).\
     * Mutates & returns input array.
     * @param {any[]} arr input array
     * @returns {arr} randomly-shuffled array.
     */
    const shuffle = CAE.Tweaks.Utils.shuffle;

    /** Local value-checker function namespace. */
    const isType = {
        /**
         * @param {TYPE} type reference type
         * @returns {boolean} `true` iff `type` represents {@linkcode TYPE.FORBID}.
         */
        forbid: function(type) { return type === TYPE.FORBID; },
        /**
         * @param {TYPE} type reference type
         * @returns {boolean} `true` iff `type` represents {@linkcode TYPE.AVOID}.
         */
        avoid:  function(type) { return type === TYPE.AVOID;  },
        /**
         * @param {TYPE} type reference type
         * @returns {boolean} `true` iff `type` represents {@linkcode TYPE.DFAULT}.
         */
        dFault: function(type) { return type === TYPE.DFAULT; }
    };

    // Assume any scope/targetting alterations are
    // accurately represented by `itemTargetCandidates`.

    // Avoid/forbid repeats when selecting multiple random targets.
    void (alias => {
        Game_Action.prototype.randomTargets = function(unit) {
            const type = repeatChangeType(this);
            if (isType.dFault(type))
                return alias.apply(this, arguments);
            const group = this.itemTargetCandidates();
            const res = [];
            const L = group.length;
            if (L) {    // only if there are targets available!
                let count = this.numTargets();
                // Full units
                if (!isType.forbid(type))
                    while (count > L) {
                        res.push(...shuffle(group.slice()));
                        count -= L;
                    }
                // Overflow
                res.push(...shuffle(group).slice(0, Math.min(count, L)));
            }
            return res;
        };
    })(Game_Action.prototype.randomTargets);

})();

// M19) Items/Skills with "Add State: Normal Attack" gain attack modifiers.
void (() => { if (!CAE.Tweaks.M19) return;
'use strict';

    /**
     * If `true`, attack state effects will be checked once, on boot,
     * and the result will be cached on applicable database records.
     * @type {boolean}
     */
    const CACHE = CAE.Tweaks.M19.CACHE;

    /**
     * @param {$dataItem|$dataSkill} item
     * Database item/skill reference.
     * @returns {boolean}
     * `true` iff given item/skill has an "Add State: Normal Attack" effect.
     */
    const isAddAttackState = function(item) {
        return item.effects.some(e => {
            e.code === Game_Action.EFFECT_ADD_STATE &&
            e.dataId === 0
        });
    };

    // Cache version.
    void (() => { if (!CACHE) return;

        /** Non-conflicting identifier for new cache property on qualifying Item/Skill database records. */
        const SYM_HAS_ATTACK_STATE = Symbol();

        // Patch - cache on boot.
        void (alias => {
            Scene_Boot.prototype.onDatabaseLoaded = function() {
                alias.apply(this, arguments);
                for (const item of $dataItems)
                    if (item && isAddAttackState(item))
                        item[SYM_HAS_ATTACK_STATE] = true;
                for (const skill of $dataSkills)
                    if (skill && isAddAttackState(skill))
                        skill[SYM_HAS_ATTACK_STATE] = true;
            };
        })(Scene_Boot.prototype.onDatabaseLoaded);

        // Patch - check cached flag.
        void (alias => {
            Game_Action.prototype.isAttack = function() {
                return alias.apply(this, arguments) || !!this.item()?.[SYM_HAS_ATTACK_STATE];
            };
        })(Game_Action.prototype.isAttack);

    })();

    // Legacy version.
    void (() => { if ( CACHE) return;
        const alias = Game_Action.prototype.isAttack;
        Game_Action.prototype.isAttack = function() {
            return alias.apply(this, arguments) || isAddAttackState(this.item());
        };
    })();

})();

// M20) Item/Skill notetag: <cast state: X, X, X>. Auto-applies/removes when TPB casting starts/ends.
void (() => { if (!CAE.Tweaks.M20) return;
'use strict';

    /** Name of this feature's notetag. */
    const TAG_NAME = CAE.Tweaks.M20["tag_cast state"] || "cast state";

    /** Non-conflicting identifier for cast state ID tracking property on `Game_Battler`. */
    const SYM = Symbol();

    /**
     * @param {Game_Action} action
     * Reference action.
     * @returns {number[]}
     * IDs of corresponding casting states, if any.
     */
    const getCastStateIds = function(action) {
        if (action instanceof Game_Action) {
            const tag = action.item()?.meta[TAG_NAME];
            if (typeof tag === "string")
                return Array.from(
                    tag.split(","), s => parseInt(s, 10) || 0
                ).filter(n => n);
        }
        return [];
    };

    /**
     * @param {Game_Battler} battler
     * Reference battler.
     * @returns {boolean}
     * `true` iff the battler qualifies as "casting".
     */
    const isCasting = function(battler) {
        return battler._tpbState === "casting";
    };

    /**
     * @param {Game_Battler} battler
     * Reference battler.
     * @param {number} stateId
     * ID of casting state.
     * @returns {boolean}
     * `true` iff state should be added on cast start.
     */
    const shouldAddCastState = function(battler, stateId) {
        return  battler.isStateAddable(stateId);
        //  && !battler.isStateAffected(stateId);
    };

    /**
     * Adds casting state to given battler when apt.
     * @param {Game_Battler} battler
     * Reference battler.
     * @param {number} stateId
     * ID of state to add.
     */
    const addCastState = function(battler, stateId) {
        if (shouldAddCastState(battler, stateId)) {
            (battler[SYM] ??= new Map()).set(
                stateId, battler._stateTurns[stateId]
            );
            battler.addState(stateId);
        }
    };

    /**
     * Removes all previously-added casting states from given battler.
     * @param {Game_Battler} battler
     * Reference battler.
     */
    const remCastStates = function(battler) {
        const m = battler[SYM];
        if (m) {
            for (const [id, t] of m.entries()) {
                if (t > 0)
                    battler._stateTurns[id] = t;
                else
                    battler.removeState(id);
            }
            delete battler[SYM];
        }
    };

    /**
     * Adds appropriate casting state to given battler when apt.
     * @param {Game_Battler} battler
     * Reference battler.
     */
    const addCastStates = function(battler) {
        for (const id of getCastStateIds(battler.currentAction()))
            addCastState(battler, id);
    };

    // Patch - add casting states when TPB casting starts.
    void (alias => {
        Game_Battler.prototype.startTpbCasting = function() {
            alias.apply(this, arguments);
            if (isCasting(this))        // verify
                addCastStates(this);
        };
    })(Game_Battler.prototype.startTpbCasting);

    // Patch - remove casting states when casting ends.
    void (alias => {
        Game_Battler.prototype.updateTpbCastTime = function() {
            const casting = isCasting(this);
            alias.apply(this, arguments);
            if (casting && !isCasting(this))
                remCastStates(this);
        };
    })(Game_Battler.prototype.updateTpbCastTime);

})();

// M21) Trait object notetag: <HRG element: X> - its HP Regen traits count as element ID X.
void (() => { if (!CAE.Tweaks.M21) return;
'use strict';

    /** Name of notetag for this feature. */
    const TAG_NAME = CAE.Tweaks.M21["tag_HRG element"] || "HRG element";

    /** `$data` array identifiers that this feature should impact. */
    const DATA = ["Actors", "Armors", "Classes", "Enemies", "States", "Weapons"];

    /** Non-conflicting identifier for storing element ID on relevant traits. */
    const SYM = Symbol();

    /** @typedef {$dataActor|$dataArmor|$dataClass|$dataEnemy|$dataState|$dataWeapon} TraitObject */
    /**
     * @param {TraitObject} o trait-bearing object
     * @returns {number} element ID parsed from given object's notetag, or `0`.
     */
    const parseTag = function(o) {
        const v = parseInt(o.meta[TAG_NAME], 10);
        if (v > 0 && v < $dataSystem.elements.length)
            return v;
        return 0;
    };

    /**
     * @param {object} trait trait to check
     * @returns {boolean} `true` iff given trait is for the HRG xparam.
     */
    const isTraitHRG = function(trait) {
        return trait.code === Game_BattlerBase.TRAIT_XPARAM
            && trait.dataId === 7;
    };

    /**
     * Adds element ID to given trait.
     * @param {object} trait trait to modify
     * @param {number} elementId ID of applicable element
     */
    const updateTrait = function(trait, elementId) {
        trait[SYM] = elementId;
    };

    /**
     * Checks given trait-bearing object for tag and updates it if apt.
     * @param {TraitObject} o trait-bearing object
     */
    const updateTraitObject = function(o) {
        const elementId = parseTag(o);
        if (elementId)
            for (const trait of o.traits)
                if (isTraitHRG(trait))
                    updateTrait(trait, elementId);
    };

    /** Update all relevant traits with element info. */
    const updateAllTraits = function() {
        for (const a of DATA.map(s => globalThis["$data" + s]))
            for (let n = a.length; --n;)
                updateTraitObject(a[n]);
    };

    // Add element data to relevant traits on game boot.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            updateAllTraits();
            alias.apply(this, arguments);
        };
    })(Scene_Boot.prototype.start);

    // HRG traits are affected by element rate, where applicable.
    void (alias => {
        Game_BattlerBase.prototype.xparam = function(xparamId) {
            if (xparamId !== 7)
                return alias.apply(this, arguments);
            const t = this.traitsWithId(Game_BattlerBase.TRAIT_XPARAM, 7);
            return t.reduce((a, c) =>
                a + c.value * (SYM in c ? this.elementRate(c[SYM]) : 1)
            , 0);
        };
    })(Game_BattlerBase.prototype.xparam);

})();

// M22) State notetag: <stack: X> => state stacks = ceil(turns / X).
void (() => { if (!CAE.Tweaks.M22) return;
'use strict';

    /** Name of notetag for this feature. */
    const TAG_NAME = CAE.Tweaks.M22.tag_stack || "stack";

    /**
     * @param {number} stateId ID of state to check
     * @returns {number} turns per stack for given state.
     */
    const getStackSize = function(stateId) {
        const t = $dataStates[stateId]?.meta[TAG_NAME];
        if (t === true)                 // <stack>
            return 1;
        const v = parseInt(t, 10);      // <stack: X>
        return !v ? Infinity : v;
    };

    /**
     * @param {Game_BattlerBase} battler reference battler
     * @param {number} stateId ID of state to check
     * @returns {number} current stack count of given state on given battler.
     */
    const getStacks = function(battler, stateId) {
        return Math.ceil(battler._stateTurns[stateId] / getStackSize(stateId));
    };

    // Duplicate traits from stacked states.
    void (alias => {
        Game_BattlerBase.prototype.allTraits = function() {
            const res = alias.apply(this, arguments);
            for (const s of this.states()) {
                const stacks = getStacks(this, s.id);
                if (stacks > 1)
                    res.push(...new Array(stacks - 1).fill(s.traits).flat());
            }
            return res;
        };
    })(Game_BattlerBase.prototype.allTraits);

    // Patch - refresh when state turns tick down, in case stacks have changed.
    void (alias => {
        Game_BattlerBase.prototype.updateStateTurns = function() {
            alias.apply(this, arguments);
            this.refresh();
        };
    })(Game_BattlerBase.prototype.updateStateTurns);

    // Patch - refresh when state turns are reset (rather than only when adding a NEW state).
    void (alias => {
        Game_BattlerBase.prototype.resetStateCounts = function() {
            const mem = Object.assign(this._stateTurns);
            alias.apply(this, arguments);
            if (Object.entries(this._stateTurns).some(([k, v]) => mem[k] !== v))
                this.refresh();
        };
    })(Game_BattlerBase.prototype.resetStateCounts);

})();

// M23) Gain TP and/or Grow action effects have negative magnitude on opponent-scoped actions.
void (() => { if (!CAE.Tweaks.M23) return;
"use strict";

    /** If `true`, apply this feature to the Gain TP effect. @type {boolean} */
    const GAIN_TP = CAE.Tweaks.M23.GAINTP;

    /** If `true`, apply this feature to the Grow effect. @type {boolean} */
    const GROW_PARAM = CAE.Tweaks.M23.GROW;

    /** Non-conflicting identifier for new "should invert effect" method on `Game_Action`. */
    const SYM = Symbol();

    Object.defineProperties(CAE.Tweaks.M23, {
        SYM: { value: Object.freeze({ M_SHOULD_INVERT: SYM }), configurable: false }
    });

    /**
     * @param {Game_Battler} target Effect target.
     * @param {{dataId?:number,value1?:number,value2?:number}} effect Effect data.
     * @returns {boolean} `true` iff the effect magnitude should be inverted.
     */
    Game_Action.prototype[CAE.Tweaks.M23.SYM.M_SHOULD_INVERT] = function shouldInvertEffect(target, effect) {
        return this.isForOpponent();
    };

    // Patch - invert Gain TP effects when appropriate.
    void (alias => { if (!GAIN_TP) return;
        Game_Action.prototype.itemEffectGainTp = function(target, effect) {
            const invert = this[CAE.Tweaks.M23.SYM.M_SHOULD_INVERT](...arguments);
            if (invert)
                effect.value1 *= -1;
            alias.apply(this, arguments);
            if (invert)
                effect.value1 *= -1;
        };
    })(Game_Action.prototype.itemEffectGainTp);

    // Patch - invert Grow effects when appropriate.
    void (alias => { if (!GROW_PARAM) return;
        Game_Action.prototype.itemEffectGrow = function(target, effect) {
            const invert = this[CAE.Tweaks.M23.SYM.M_SHOULD_INVERT](...arguments);
            if (invert)
                effect.value1 *= -1;
            alias.apply(this, arguments);
            if (invert)
                effect.value1 *= -1;
        };
    })(Game_Action.prototype.itemEffectGrow);

})();

// M24) <guard skill: X> trait notetag.
void (() => { if (!CAE.Tweaks.M24) return;
'use strict';

    /** Name of notetag for this feature. */
    const TAG_NAME = CAE.Tweaks.M24["tag_guard skill"] || "guard skill";

    /**
     * @param {object} o reference meta-bearing object
     * @returns {number} guard skill ID from tag, or `0` if no valid tag found.
     */
    const parseTag = function(o) {
        const tag = o.meta[TAG_NAME];
        if (tag)
            return parseInt(tag, 10) || 0;
        return 0;
    };

    /**
     * @param {Game_BattlerBase} battler reference battler
     * @returns {number} largest guard skill ID from all trait tags.
     */
    const getGuardIdFromTags = function(battler) {
        return battler.traitObjects().reduce(
            (a, c) => Math.max(parseTag(c), a)
        , 0);
    };

    // Check tags as well.
    void (alias => {
        Game_BattlerBase.prototype.guardSkillId = function() {
            return Math.max(
                alias.apply(this, arguments),
                getGuardIdFromTags(this)
            );
        };
    })(Game_BattlerBase.prototype.guardSkillId);

})();

// M25) <no weapon> skill/item notetag - ignore weapon contributions for this action.
void (() => { if (!CAE.Tweaks.M25) return;
'use strict';

    /** Name of notetag for this feature. */
    const TAG_NAME = CAE.Tweaks.M25["tag_no weapon"] || "no weapon";

    /**
     * @type {?Game_Battler}
     * Stores current subject, for filtering out weapon trait contributors.
     */
    let mem = null;

    /**
     * @param {Game_Action} action reference action
     * @returns {boolean} `true` iff this action should ignore weapon contributions.
     */
    const shouldIgnoreWeapon = function(action) {
        if (action instanceof Game_Action)
            return !!action.item().meta[TAG_NAME];
        return false;
    };

    /**
     * Updates memorised value to:
     * - `subject` if this action {@linkcode shouldIgnoreWeapon} contributions;
     * - `null` otherwise.
     * @param {Game_Action} action reference action
     * @param {Game_Battler} subject battler to store
     * @returns {?Game_Battler} stored value.
     */
    const updateMem = function(action, subject) {
        const v = subject && shouldIgnoreWeapon(action) ? subject : null;
        if (v !== mem) {
            if (mem)
                mem.refresh();  // refresh old "no weapon" battler
            if (mem = v)
                mem.refresh();  // refresh new "no weapon" battler
        }
        // console.log("no weapon battler is now", mem && mem.name());
        // if (mem)
        //     console.log("attack animation of mem is", mem.attackAnimationId1());
        return mem;
    };

    /**
     * @param {Game_Battler} subject reference battler
     * @returns {boolean} `true` iff `subject` matches the stored value.
     */
    const checkMem = function(subject) {
        const S = CAE.Tweaks.M16?.SYM;  // M16 compatibility
        if (S && mem === subject[S])
            return true;
        return mem === subject;
    };

    // Patch - store subject on action start, e.g. for animation.
    void (alias => {
        Window_BattleLog.prototype.startAction = function() {
            updateMem(BattleManager._action, BattleManager._subject);
            alias.apply(this, arguments);
        };
    })(Window_BattleLog.prototype.startAction);

    // Patch - store subject pre-invoke, e.g. for counter-attack check.
    void (alias => {
        BattleManager.invokeAction = function(subject, target) {
            updateMem(this._action, subject);
            alias.apply(this, arguments);
        };
    })(BattleManager.invokeAction);

    // Patch - store subject immediately prior to action apply, e.g. for damage formula.
    void (alias => {
        Game_Action.prototype.apply = function(target) {
            updateMem(this, this.subject());
            alias.apply(this, arguments);
        };
    })(Game_Action.prototype.apply);

    // Patch - clear stored subject when action ends.
    void (alias => {
        BattleManager.endAction = function() {
            alias.apply(this, arguments);
            updateMem();
        };
    })(BattleManager.endAction);

    // Patch - filter weapons out of equip list when appropriate.
    void (alias => {
        Game_Actor.prototype.equips = function() {
            const res = alias.apply(this, arguments);
            if (!checkMem(this))
                return res;
            return res.filter(item => !DataManager.isWeapon(item));
        };
    })(Game_Actor.prototype.equips);

})();

// M26) Automatically change move speed on bush/ladder tiles.
void (() => { if (!CAE.Tweaks.M26) return;
'use strict';

    /** Added to real move speed for characters on bush tiles. */
    const BUSH = CAE.Tweaks.M26.BUSH;

    /** Added to real move speed for characters on ladder tiles. */
    const LADDER = CAE.Tweaks.M26.LADDER;

    /** Non-conflicting identifier for new "move speed modifier" method on `Game_CharacterBase`. */
    const M_SPEED_MOD = Symbol();

    /** @returns {number} Additional real move speed based on current tile flags (bush/ladder). */
    Game_CharacterBase.prototype[M_SPEED_MOD] = function() {
        return (this.isOnBush() ? BUSH : 0) +
               (this.isOnLadder() ? LADDER : 0);
    };

    // Add bush/ladder modifiers to real move speed for all characters.
    // void (alias => {
    //     Game_CharacterBase.prototype.realMoveSpeed = function() {
    //         return alias.apply(this, arguments) + this[M_SPEED_MOD]();
    //     };
    // })(Game_CharacterBase.prototype.realMoveSpeed);

    // Add bush/ladder modifiers to real move speed for player & events (since v15).
    for (const c of [Game_Player, Game_Event])
        void (alias => {
            c.prototype.realMoveSpeed = function() {
                return alias.apply(this, arguments) + this[M_SPEED_MOD]();
            };
        })(c.prototype.realMoveSpeed);
    // Followers sync to player real move speed, and I don't want vehicles to be obstructed.

})();

// M27) Control Item battle command access via skill type with same name.
void (() => { if (!CAE.Tweaks.M27) return;
'use strict';

    /** Feature configuration. */
    const TYPE = {
        /** ID for relevant skill type. Auto-populated by {@linkcode setTypeId} on boot. */
        ID: -1,
        /** Name of item command. Memoised by {@linkcode itemCommandName} on boot. */
        NAME: null,
        /** Internal symbol for Item battle command(s). */
        SYMI: "item",
        /** Internal symbol for Skill Type battle command(s). */
        SYMS: "skill"
    };

    /** If `true`, an actor needs the "Item" skill type to see that command in battle. */
    const NEED_TYPE = CAE.Tweaks.M27.NEED_TYPE;

    /** If `true`, only limit item access during battle. */
    const BATTLE_ONLY = CAE.Tweaks.M27.BATTLE_ONLY;

    /** Non-conflicting identifier for new "has Item battle command" method on `Game_Actor`. */
    const SYM_M_HAS_ITEM_TYPE = Symbol();

    /** Non-conflicting identifier for new "can use Item battle command" method on `Game_Actor`. */
    const SYM_M_CAN_USE_ITEM = Symbol();

    /** Name of item command and matching skill type. */
    const itemCommandName = function() {
        return TYPE.NAME ??= TextManager.item;
    };

    /** Reads and updates Item skill type ID & NAME, then sets internal object to read-only. */
    const setTypeId = function() {
        const n = itemCommandName();
        if (n) {
            const v = $dataSystem.skillTypes.indexOf(n);
            if (v > 0)
                TYPE.ID = v;
        }
        Object.freeze(TYPE);
    };

    /** @typedef {{name:string,symbol:string,enabled:boolean,ext:*}} MenuCommandObject stores menu command data. */
    /**
     * Disables any Item commands in `list`.
     * @param {MenuCommandObject[]} list reference command list
     */
    const disableItemCommands = function(list) {
        for (const c of list)
            if (c.symbol === TYPE.SYMI)
                c.enabled = false;
    };

    /**
     * Splices out any skill commands for Item type from `list`.
     * @param {MenuCommandObject[]} list reference command list
     */
    const removeItemSkillCommands = function(list) {
        for (const c of list)
            if (c.symbol === TYPE.SYMS && c.ext === TYPE.ID)
                list.splice(list.indexOf(c), 1);
    };

    /** @returns {boolean} `true` iff this actor can see the Item battle command. */
    Game_Actor.prototype[SYM_M_HAS_ITEM_TYPE] = function() {
        return !NEED_TYPE || this.skillTypes().contains(TYPE.ID)
    };

    /** @returns {boolean} `true` iff this actor can use the Item battle command. */
    Game_Actor.prototype[SYM_M_CAN_USE_ITEM] = function() {
        return !this.isSkillTypeSealed(TYPE.ID);
    };

    // Patch - hide and/or disable item command based on skill type.
    void (alias => {
        Window_ActorCommand.prototype.addItemCommand = function() {
            if (this._actor[SYM_M_HAS_ITEM_TYPE]()) {
                alias.apply(this, arguments);
                if (!this._actor[SYM_M_CAN_USE_ITEM]())
                    disableItemCommands(this._list);
                removeItemSkillCommands(this._list);
            }
        };
    })(Window_ActorCommand.prototype.addItemCommand);

    // Patch - remove Item type from menu skill types.
    void (alias => {
        Window_SkillType.prototype.makeCommandList = function() {
            alias.apply(this, arguments);
            removeItemSkillCommands(this._list);
        };
    })(Window_SkillType.prototype.makeCommandList);

    // Patch - read type ID on game start.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            setTypeId();
            alias.apply(this, arguments);
        };
    })(Scene_Boot.prototype.start);

    // Patch - impact item use outside of battle.
    void (alias => { if (BATTLE_ONLY) return;
        Game_Actor.prototype.meetsItemConditions = function(item) {
            return this[SYM_M_HAS_ITEM_TYPE]()
                && this[SYM_M_CAN_USE_ITEM]()
                && alias.apply(this, arguments);
        };
    })(Game_Actor.prototype.meetsItemConditions);

})();

// M28) Change max save file count.
void (() => { if (!CAE.Tweaks.M28) return;
'use strict';

    /** Autosave slot count. NB: slot 0 (autosave) is always included in globalInfo. @type {number} */
    const AUTOSAVES = 1;

    /** New max save file count. Includes autosave slot(s). @type {number} */
    const MAX = CAE.Tweaks.M28.SLOT_COUNT + AUTOSAVES;

    /**
     * If `true`, the load scene will also check the autosave's timestamp
     * when deciding which slot to initially select.
     * @type {boolean}
     */
    const INIT_SELECT_LOAD_AUTO = CAE.Tweaks.M28.LOAD_INIT_SEL_AUTO;

    // Override - apply new value.
    DataManager.maxSavefiles = function() {
        return MAX;
    };

    // Patch - also check timestamp of autosave on Scene_Load init select.
    ;void (alias => { if (!INIT_SELECT_LOAD_AUTO) return;
        Scene_Load.prototype.firstSavefileId = function() {
            const r = alias.apply(this, arguments);
            if (this.needsAutosave()) {
                const t = DataManager.savefileInfo(r)?.timestamp;
                const a = DataManager.savefileInfo(0)?.timestamp;
                if (a > t)
                    return 0;
            }
            return r;
        };
    })(Scene_Load.prototype.firstSavefileId);

    // [ ] M28 - add optional cycling autosave slots, and/or per-playthrough folders?

})();

// M29) Custom skill cost framework (TP, MP, HP, Itm, Wpn, Arm, G, Var, WU, CD).
void (() => { if (!CAE.Tweaks.M29) return;
'use strict';

    // Adds existing costs (TP/MP) to custom costs of same type.
    // Formatting follows the custom rules for its type (`mp`/`tp`).

    /**
     * New skill cost types! Keys should be lower-case.\
     * Notetag examples (1 line per cost type, any number of lines):
     * ```html
     *   <cost: hp: 50>
     *
     *   <cost:
     *     mp: return subject.mmp / 4;
     *     item 5: 1
     *     item 2: 2
     *   >
     * ```
     * Each type should have the following properties:
     * - `rx`: regular expression for matching user-facing tag notation;
     * - `display`: function that returns cost display text;
     * - `canPay`: function that returns `true` iff cost can be paid;
     * - `onPay`: function that pays skill cost.
     *
     * Each of these functions accepts 4 args:
     * - `subject`: skill subject, a.k.a. `user`;
     * - `item`: skill database reference;
     * - `cost`: a number representing this skill cost;
     * -  `ext`: optional number included after type, e.g. item ID.
     *
     * Must include `tp` and `mp` types, to account for core costs.
     */
    const DATA = CAE.Tweaks.M29.DATA;

    /** Auto-populated {@linkcode DATA} keys, for iteration. */
    const TYPES = Object.freeze(Object.keys(DATA));

    /** User-facing notetag name. */
    const TAG_NAME = CAE.Tweaks.M29.tag_cost || "cost";

    /** Horizontal space (px) displayed between multiple costs on 1 skill. */
    const COST_SPACING = 8;

    /**
     * @typedef {object} CostInfo
     * @property {string} type Cost type ({@linkcode DATA} key).
     * @property {number} [ext] Optional number provided with tag, to refine cost target.
     * @property {number} cost Cost to be paid.
     */
    /** @typedef {[type:string,f:function,ext?:number]} TagFctInfo */

    /** Stuff for evaluating costs from notetags. */
    const tagFcts = {

        /**
         * Stores type, function, and ext for each custom cost, per item/skill.
         * @type {Map.<object, TagFctInfo[]>}
         */
        _data: new Map(),

        /** Arguments for each tag function. */
        _ARGS: Object.freeze(["subject", "item", "ext"]),

        /** Regular expression for reading values from tag lines. */
        _rx:   /^\s*([^\:\s]+)\s*(\-?\d+)?\:\s*(.+)$/,

        /**
         * @param {$dataSkill} item Reference skill.
         * @returns {TagFctInfo[]} Cost function et al.
         */
        get:   function(item) {
            return this._data.get(item);
        },

        /**
         * @param {$dataSkill} item Reference skill.
         * @param {string} type Cost type.
         * @param {Function} fct Function to store.
         * @param {number} [ext] Optional extension value.
         */
        set:   function(item, type, fct, ext = 0) {
            const m = this._data.get(item);
            if (!fct)
                return m;
            if (m)
                for (const [k, v] of m.entries())
                    if (k === type && v[1] === ext)
                        return m;   // reject duplicates of same type & ext
            const v = [fct, ext];
            if (m)
                return m.set(type, v);
            return this._data.set(item, new Map([[type, v]]));
        },

        /**
         * @param {$dataSkill} item Reference skill.
         * @param {string} type Cost type.
         * @param {string} body Input function body.
         * @param {number} [ext] Optional extension value.
         * @returns {string} Prepared function body.
         */
        form:  function(item, type, body, ext) {
            return "const user = subject;\n"
                + (/\breturn\b/.test(body) ? "" : "return ")
                + body;
        },

        /**
         * Makes and stores the corresponding function.
         * @param {$dataSkill} item Reference skill.
         * @param {string} type Cost type.
         * @param {string} body Input function body.
         * @param {number} [ext] Optional extension value.
         */
        mk:    function(item, type, body, ext = 0) {
            this.set(
                item, type, new Function(
                    ...this._ARGS,
                    this.form(...arguments)
                ), ext
            );
        },

        /**
         * @param {string} line One line from a notetag.
         * @returns {[type:string,body:string,ext?:number]} Function creation info.
         */
        parse: function(line) {
            const m = this._rx.exec(line);
            if (m) {
                m[1] = m[1].toLowerCase();
                m[2] = parseInt(m[2], 10) || 0;
                m[3] = m[3].trimEnd();
                const type = TYPES.find(t => DATA[t].rx.test(m[1]));
                if (type)
                    return [type, m[3], m[2]];
            }   // unknown cost type
            return null;
        },

        /**
         * Converts notetag (if present) for this skill into
         * appropriate custom cost functions and stores them.
         * @param {$dataSkill} item Reference skill.
         */
        mkAll: function(item) {
            const tag = item.meta[TAG_NAME];
            if (typeof tag === "string")
                for (const info of tag.split("\n").map(s => this.parse(s)))
                    if (info)
                        this.mk(item, ...info);
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {CostInfo[]}
         * Array of custom cost information.
         */
        exec:  function(subject, item) {
            const r = [];
            const a = this.get(item);
            if (a)
                for (const [k, v] of a.entries()) {
                    const cost = Math.trunc(v[0](subject, item, v[1]));
                    if (cost > 0)
                        r.push({ type: k, cost, ext: v[1] });
                }
            return r;
        }

    };

    /** Non-conflicting identifier for "turn evaluated" key in cost cache submap. */
    const SYM_TURN = Symbol();

    /** Interface between tag functions and core scripts. */
    const costs = {

        /**
         * @type {Map.<Game_Battler, Map.<$dataSkill|symbol, CostInfo[]>>}
         * Caches values pertaining to custom skill costs.
         *
         * Key structure:
         * - `battler`
         *   - `$dataSkill` => [type, cost, ext]
         *   - {@linkcode SYM_TURN} => battle turn evaluated (recalc each turn)
         */
        cache: new Map(),

        /**
         * Resets cache for given subject.
         * @param {?Game_Battler} subject
         * Reference battler. If `null`, entire cache will be cleared.
         */
        reset: function(subject) {
            if (!subject)
                return this.cache.clear(), this.cache;
            if (!this.cache.has(subject))
                this.cache.set(subject, new Map());
            const m = this.cache.get(subject);
            return m.clear(), m;
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {boolean}
         * `true` iff cache was changed.
         */
        calc:  function(subject, item) {
            const m = this.cache.get(subject);
            const r = tagFcts.exec(subject, item);
            if (r)
                return !!m.set(item, r);
            return m.delete(item);
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {CostInfo[]}
         * Relevant custom cost information.
         */
        get:   function(subject, item) {
            const m = this.cache.get(subject) ?? this.reset(subject);
            const b = $gameParty.inBattle();
            const t = subject.turnCount();
            if (b && m.get(SYM_TURN) !== t) {
                this.reset(subject);    // cheap in redundant case, not worth working around
                m.set(SYM_TURN, t);
            }
            if (!m.has(item))
                this.calc(subject, item);
            return m.get(item);
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {{mp:number,tp:number}}
         * Core MP and TP cost values.
         */
        core:  function(subject, item) {
            const mp = subject?.skillMpCost(item) ?? 0;
            const tp = subject?.skillTpCost(item) ?? 0;
            return { mp, tp };
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {CostInfo[]}
         * Relevant cost information, including default MP/TP costs.
         */
        getWithCore: function(subject, item) {
            const info = JsonEx.makeDeepCopy(this.get(subject, item));  // deep clone
            const core = this.core(subject, item);
            // order according to `DATA` & find matching custom cost info
            const add = ["mp", "tp"].sort(
                (a, b) => TYPES.indexOf(a) - TYPES.indexOf(b)
            ).map(
                type => [info.find(o => o.type === type), type]
            );
            // merge with info
            for (let n = 2; n--;) {
                const root = add[n][0];
                const type = add[n][1];
                const cost = core[type];
                if (root)
                    root.cost += cost;  // that's why we deep-cloned earlier
                else if (cost)
                    info.unshift({ type, cost, ext: 0 });
            }
            return info;
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {string[]}
         * Array of display texts for each applicable custom cost.
         */
        texts: function(subject, item) {
            const info = this.getWithCore(subject, item);
            const r = [];
            if (info)
                for (const { type, cost, ext } of info) {
                    const text = DATA[type].display(
                        subject, item, cost, ext
                    );
                    if (text)
                        r.push(text);
                }
            return r;
        },

        /**
         * @param {number} x Left-most X of draw area.
         * @param {number} width Width of draw area.
         * @returns {number} Stop threshold for furthest-left cost display X coordinate.
         */
        minX:  function(x, width) {
            return x + width / 2;
        },

        /**
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         * @returns {boolean}
         * `true` iff `subject` can pay all custom costs for `item`.
         */
        check: function(subject, item) {
            const info = this.get(subject, item);
            if (info) {
                const core = this.core(subject, item);
                for (const { type, cost, ext } of info) {
                    // NOT `getWithCore`: only check core additions to custom costs
                    const plus = type === "mp" ? core.mp :
                                (type === "tp" ? core.tp : 0);
                    if (!DATA[type].canPay(subject, item, cost + plus, ext))
                        return false;
                }
            }
            return true;
        },

        /**
         * Makes `subject` pay all custom costs for `item`.
         * @param {Game_Battler} subject
         * Reference battler.
         * @param {$dataSkill} item
         * Reference skill.
         */
        pay:   function(subject, item) {
            const info = this.get(subject, item);
            if (info)
                for (const { type, ext, cost } of info)
                    DATA[type].onPay(subject, item, cost, ext);
            // core costs get paid as usual
        }

    };

    /**
     * Draws custom item/skill costs.
     * @param {$dataSkill} item Reference item/skill.
     * @param {number} x X coordinate of draw rect
     * @param {number} y Y coordinate of draw rect
     * @param {number} width Width of draw rect.
     */
    Window_SkillList.prototype.drawSkillCost = function(item, x, y, width) {
        const txts = costs.texts(this._actor, item);
        if (!txts.length)
            return;     // nothing to draw!
        const size = txts.map(s => this.textSizeEx(s).width);
        const minX = costs.minX(x, width);
        let L = 0;
        x += width;
        for (const z of size) {
            ++L;
            x -= z + COST_SPACING;
            if (x < minX)
                break;
        }
        x += COST_SPACING;  // trim
        for (let n = 0; n < L; x += size[n++] + COST_SPACING)
            this.drawTextEx(txts[n], x, y, size[n]);
    };

    // Patch - pay custom skill costs on use.
    void (alias => {
        Game_BattlerBase.prototype.paySkillCost = function(item) {
            alias.apply(this, arguments);
            costs.pay(this, item);
        };
    })(Game_BattlerBase.prototype.paySkillCost);

    // Patch - check if custom skill costs are met.
    void (alias => {
        Game_BattlerBase.prototype.canPaySkillCost = function(item) {
            return alias.apply(this, arguments) && costs.check(this, item);
        };
    })(Game_BattlerBase.prototype.canPaySkillCost);

    // Patch - clear cost cache on battle start/end.
    void (alias => {
        BattleManager.onBattleStart = function() {
            costs.reset();
            alias.apply(this, arguments);
        };
    })(BattleManager.onBattleStart);
    void (alias => {
        BattleManager.endBattle = function() {
            alias.apply(this, arguments);
            costs.reset();
        };
    })(BattleManager.endBattle);
    // (Battle turn is checked automatically for mid-battle recalc, cf {@linkcode SYM_TURN}.)

    // Patch - clear cost cache when changing skill scene actor.
    void (alias => {
        Scene_Skill.prototype.refreshActor = function() {
            costs.reset();
            alias.apply(this, arguments);
        };
    })(Scene_Skill.prototype.refreshActor);

    // Patch - clear cost cache when exiting skill scene.
    void (alias => {
        Scene_Skill.prototype.terminate = function() {
            alias.apply(this, arguments);
            costs.reset();
        };
    })(Scene_Skill.prototype.terminate);

    // Patch - compile user-defined costs from notetags on game boot.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            for (let n = $dataSkills.length; --n;)
                tagFcts.mkAll($dataSkills[n]);
            alias.apply(this, arguments);
        };
    })(Scene_Boot.prototype.start);

})();

// M30) Actor trait tag <lock formation> - locks position in Formation.
void (() => { if (!CAE.Tweaks.M30) return;
'use strict';

    /**
     * Name of notetag for this feature.\
     * Applicable to any trait object available to Actors.
     */
    const TAG_NAME = CAE.Tweaks.M30["tag_lock formation"] || "lock formation";

    /** Array of party positions (`0` = leader) that are always formation-locked. */
    const LOCK_POS = CAE.Tweaks.M30.POS;

    /** If `true`, always show indicators on applicable party members. */
    const ALWAYS_SHOW = CAE.Tweaks.M30.NO_HIDE;

    /** Identifier format string for formation lock inner sprites. */
    const INNER_KEY = "actor%1-formationLock";

    /** URL for override bitmap for formation lock indicators. */
    const URL = CAE.Tweaks.M30.URL;

//#region ===== Sprite_FormationLock ========== //

    /** Local shorthand for sprite constructor name. */
    const N = "Sprite_FormationLock";

    globalThis[N] = function Sprite_FormationLock() { this.initialize(...arguments); };
    globalThis[N].prototype = Object.create(Sprite.prototype);

    // Define static constants.
    Object.defineProperties(globalThis[N], {

        /**
         * SVG path data for a simple padlock icon.\
         * Source: https://uxwing.com/lock-icon/ | https://uxwing.com/license/
         */
        PATH_DATA: { value:
            "M2.892,56.036h8.959v-1.075V37.117c0-10.205,4.177-19.484,10.898-26.207v-0.009" +
            " C29.473,4.177,38.754,0,48.966,0C59.17,0,68.449,4.177,75.173,10.901l0.01,0.0" +
            "09c6.721,6.723,10.898,16.002,10.898,26.207v17.844 v1.075h7.136c1.59,0,2.892," +
            "1.302,2.892,2.891v61.062c0,1.589-1.302,2.891-2.892,2.891H2.892c-1.59,0-2.892" +
            "-1.302-2.892-2.891 V58.927C0,57.338,1.302,56.036,2.892,56.036L2.892,56.036z " +
            "M26.271,56.036h45.387v-1.075V36.911c0-6.24-2.554-11.917-6.662-16.03 l-0.005," +
            "0.004c-4.111-4.114-9.787-6.669-16.025-6.669c-6.241,0-11.917,2.554-16.033,6.6" +
            "65c-4.109,4.113-6.662,9.79-6.662,16.03 v18.051V56.036L26.271,56.036z M49.149" +
            ",89.448l4.581,21.139l-12.557,0.053l3.685-21.423c-3.431-1.1-5.918-4.315-5.918" +
            "-8.111 c0-4.701,3.81-8.511,8.513-8.511c4.698,0,8.511,3.81,8.511,8.511C55.964" +
            ",85.226,53.036,88.663,49.149,89.448L49.149,89.448z"
        },

        /** SVG path size. */
        PATH_SIZE: { value: Object.freeze([128, 128]) },

        /** Bitmap size for rendering SVG. */
        BMP_SIZE: { value: Object.freeze([32, 32]) },

        /** Duration of UX animation. */
        ANIM_TIME: { value: 60 },

        /** Flash colour for UX animation. */
        FLASH_RGBA: { value: Object.freeze([255, 0, 0, 160]) }

    });

    // Define static properties/methods.
    Object.assign(globalThis[N], {

        /** Bitmap cache. */
        _bmp: URL ? ImageManager.loadSystem(URL) : null,

        /** @returns {string} CSS fill style for padlock SVG. */
        fillStyle: function() {
            return ColorManager.systemColor();
        },

        /** @returns {Bitmap} Memoised raster of padlock SVG. */
        bmp: function() {
            if (!this._bmp) {
                const p = new Path2D(this.PATH_DATA);
                const c = (this._bmp = new Bitmap(...this.BMP_SIZE)).context;
                c.save();
                c.scale(this.BMP_SIZE[0] / this.PATH_SIZE[0], this.BMP_SIZE[1] / this.PATH_SIZE[1]);
                c.translate(6, 6);
                c.fillStyle = "black";
                c.fill(p);
                c.translate(-6, -6);
                c.fillStyle = this.fillStyle();
                c.fill(p, "evenodd");
                c.restore();
            }
            return this._bmp;
        }

    });

    // Define own instance properties/methods.
    Object.assign(globalThis[N].prototype, {

        constructor: globalThis[N],

        /** @constructor */
        initialize: function() {
            Sprite.prototype.initialize.call(this, this.constructor.bmp());
            this.endAnim();
            this.hide();
        },

        /** Starts UX animation. */
        startAnim: function() {
            this._animTime = this.constructor.ANIM_TIME;
            this._flashRGBA = this.constructor.FLASH_RGBA.slice();
        },

        /** Ends UX animation. */
        endAnim: function() {
            this._animTime = 0;
            this._flashRGBA = [0, 0, 0, 0];
        },

        /** Called each frame, updates UX animation. */
        update: function() {
            Sprite.prototype.update.apply(this, arguments);
            if (this._animTime > 0) {
                this._flashRGBA[3] *= (this._animTime - 1) / this._animTime;
                if (!--this._animTime)
                    this.endAnim();
            }
            this.setBlendColor(this._flashRGBA);
        }

    });

//#endregion == Sprite_FormationLock ========== //

    /**
     * @param {Game_Actor} actor Reference actor.
     * @returns {boolean} `true` iff `actor` has this feature's tag from any source.
     */
    const hasTag = function(actor) {
        return actor.traitObjects().some(o => !!o.meta[TAG_NAME]);
    };

    /**
     * @param {Game_Actor} actor Reference actor.
     * @returns {boolean} `true` iff `actor` is locked into their position.
     */
    const isLocked = function(actor) {
        if (!actor)
            return false;
        return LOCK_POS.contains(actor.index()) || hasTag(actor);
    };

    /** Non-conflicting identifier for new "draw lock symbol" method on `Window_MenuStatus`. */
    const SYM_M_ADD_LOCK = Symbol();

    /** Non-conflicting identifier for new "lock sprites" Map on `Window_MenuStatus`. */
    const SYM_P_LOCK_SPRITES = Symbol();

    /**
     * Draws lock symbol on party members who are formation-locked.
     * @param {number} index Reference party member index.
     */
    Window_MenuStatus.prototype[SYM_M_ADD_LOCK] = function(index) {
        const r = this.itemRect(index);
        const a = this.actor(index);
        const k = INNER_KEY.format(a.actorId());
        const s = this.createInnerSprite(k, globalThis[N]);
        const px = 0;
        const py = 8;
        s.move(
            r.x + r.width  - s.width  + px,
            r.y + r.height - s.height - py
        );
        (this[SYM_P_LOCK_SPRITES] ??= new Map()).set(a, s);
        return s;
    };

    // Patch - change formation lock based on tag presence.
    void (alias => {
        Game_Actor.prototype.isFormationChangeOk = function() {
            return alias.apply(this, arguments) && !isLocked(this);
        };
    })(Game_Actor.prototype.isFormationChangeOk);

    // Patch - add "formation lock" sprite to deserving members.
    void (alias => {
        Window_MenuStatus.prototype.drawItem = function(index) {
            alias.apply(this, arguments);
            const s = this[SYM_M_ADD_LOCK](...arguments);
            if (
                isLocked(this.actor(index)) &&
                (ALWAYS_SHOW || this.formationMode())
            )
                s.show();
        };
    })(Window_MenuStatus.prototype.drawItem);

    // Patch - animate lock sprite on OK fail.
    void (alias => {
        Window_MenuStatus.prototype.processOk = function() {
            const trigger = this.formationMode() && !this.isCurrentItemEnabled();
            alias.apply(this, arguments);
            if (trigger)
                this[SYM_P_LOCK_SPRITES].get(this.actor(this.index())).startAnim();
        };
    })(Window_MenuStatus.prototype.processOk);

    // If enabled, toggle visibility of lock sprites when appropriate.
    void (() => { if (ALWAYS_SHOW) return;

        // Patch - hide all formation lock indicators when window goes inactive.
        void (alias => {
            Window_MenuStatus.prototype.deactivate = function() {
                alias.apply(this, arguments);
                if (this[SYM_P_LOCK_SPRITES])
                    for (const s of this[SYM_P_LOCK_SPRITES].values())
                        s.hide();
            };
        })(Window_MenuStatus.prototype.deactivate);

        // Patch - show applicable formation lock indicators when window becomes active.
        void (alias => {
            Window_MenuStatus.prototype.activate = function() {
                alias.apply(this, arguments);
                if (this.formationMode() && this[SYM_P_LOCK_SPRITES])
                    for (const [a, s] of this[SYM_P_LOCK_SPRITES].entries())
                        if (isLocked(a))
                            s.show();
            };
        })(Window_MenuStatus.prototype.activate);

    })();

})();

// M31) Event Touch triggers on followers OR disable event-follower collision.
void (() => { if (!CAE.Tweaks.M31) return;
'use strict';

    /**
     * Determines sub-feature:
     * - `true`: trigger Event Touch on followers.
     * - `false`: events do not collide with followers.
     */
    const TRIGGER = CAE.Tweaks.M31.TRIGGER;

    // Override - Event Touch triggers on collision with player OR follower.
    void (() => { if (!TRIGGER) return;

        /**
         * If true, event will "lock" to face player even if they collided with a follower.\
         * NB: events unlock on end, but Set Movement Route resets `_prelockDirection` to `0`.
         */
        const LOCK_TO_PLAYER = false;

        /** Non-conflicting identifier for new "don't lock" symbol on `Game_Event`. */
        const SYM = Symbol();

        // Override - collison check change.
        Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
            if (
                !$gameMap.isEventRunning() &&
                this._trigger === 2 &&
                !this.isJumping() &&
                this.isCollidedWithPlayerCharacters(x, y)
            ) {
                if (!LOCK_TO_PLAYER)
                    this[SYM] = true;
                this.start();
            }
        };

        // Patch - don't lock if flag is set.
        void (alias => {
            Game_Event.prototype.lock = function() {
                alias.apply(this, arguments);
                if (SYM in this) {
                    delete this[SYM];
                    this.setDirection(this._prelockDirection);
                }
            }
        })(Game_Event.prototype.lock);

    })();

    // Override - followers no longer collide.
    void (() => { if ( TRIGGER) return;
        Game_Followers.prototype.isSomeoneCollided = function(x, y) {
            return false;
        };
    })();

})();

// M32) Selectively disable event locking: <no lock> note/comment tag, _noLock property.
void (() => { if (!CAE.Tweaks.M32) return;
'use strict';

    /** Name of note/comment tag for this feature. */
    const TAG_NAME = CAE.Tweaks.M32["tag_no lock"] || "no lock";

    /** Name of optional user-assigned property for this feature. */
    const PROP = "_noLock";

    /** Non-conflicting identifier for new "has relevant comment tag" property on `Game_Event`. */
    const SYM_P_HAS_COMMENT_TAG = Symbol();

    /** Non-conflicting identifier for new "is non-locking" method on `Game_Event`. */
    const SYM_M_IS_NO_LOCK = Symbol();

    /**
     * @param {Game_Event} ev reference event
     * @returns {boolean} `true` iff `list` contains 1+ relevant comment tags.
     */
    const hasCommentTag = function(ev) {
        return !!CAE.Tweaks.Utils.getEventTags(ev, TAG_NAME, false).next().value;
    };

    /** @returns {boolean} `true` iff this event is marked as "no lock". */
    Game_Event.prototype[SYM_M_IS_NO_LOCK] = function() {
        // Check property.
        if (PROP in this)
            return !!this[PROP];    // allow true|false.
        // Check notetag.
        if (TAG_NAME in this.event().meta)
            return true;
        // Check comment tag (cached).
        if (this[SYM_P_HAS_COMMENT_TAG] ??= hasCommentTag(this))
            return true;
        // Nothing found.
        return false;
    };

    // Patch - reset comment tag cache on page change.
    void (alias => {
        Game_Event.prototype.setupPage = function() {
            delete this[SYM_P_HAS_COMMENT_TAG];
            alias.apply(this, arguments);
        };
    })(Game_Event.prototype.setupPage);
    // [ ] M32 - should this hook be refresh instead? Remember that setupPage doesn't necessarily fire on load!

    // Patch - undo lock facing if marked "no lock".
    void (alias => {
        Game_Event.prototype.lock = function() {
            alias.apply(this, arguments);
            // deliberately retain "_locked" state to suppress movement during event
            if (this[SYM_M_IS_NO_LOCK]())
                this.setDirection(this._prelockDirection);
        };
    })(Game_Event.prototype.lock);

})();

// M33) Customisable auto-battle AI - can also apply to enemies.
void (() => { if (!CAE.Tweaks.M33) return;
'use strict';

    // NB: still passes through `action#evaluate`, which adds `Math.random()`,
    // i.e. [0, 1), to net-positive `evaluateWithTarget` results!

    /** @enum {number} Used for {@linkcode COMBINE_TYPE}. */
    const COMBINE = Object.freeze({
        ADD: 0,
        MUL: 1,
        AVG: 2,
        MAX: 3,
        MIN: 4
    });

    /** Determines how multiple ratings for a single action are merged. */
    const COMBINE_TYPE = CAE.Tweaks.M33.COMBINE;

    /** If true, enemies with an Auto Battle flag will also use Auto Battle AI. */
    const NME_AUTO_BATTLE = CAE.Tweaks.M33.NME_AUTO;

    /** Rating for action aspects that have no rating function. */
    const NULL_RATING = 0;

    /** Name of `<ai strictness: X>` notetag. */
    const TAG_NAME = CAE.Tweaks.M33["tag_ai strictness"] || "ai strictness";

    /**
     * Custom damage formula rating function repository.\
     * Maps damage type (1~6) to evaluation function (or null).
     * @type {object.<damageType,(action:Game_Action,target:Game_Battler,value:number)=>number>}
     */
    const rateDmg = CAE.Tweaks.M33.DATA_DMG;

    /**
     * Custom action effect rating function repository.\
     * Maps effect code to evaluation function.
     * @type {object.<effectCode,(action:Game_Action,target:Game_Battler,effect:object)=>number>}
     */
    const rateFX = CAE.Tweaks.M33.DATA_FX;

    /**
     * Custom extension action rating function repository.\
     * For values that are estimated once per action then passed on via the `ext` parameter.
     * @type {function[]}
     */
    const rateExt = CAE.Tweaks.M33.DATA_EXT;

    /**
     * @param {Game_Action} action
     * Reference action.
     * @param {Game_Battler} target
     * Reference target.
     * @returns {number}
     * Strictness value, for controlling random deviations from strict AI ratings.
     */
    const getStrictness = function(action, target) {
        return action.subject().traitObjects().reduce((a, c) => {
            const v = parseInt(c.meta[TAG_NAME], 10).clamp(0, 100);
            if (Number.isFinite(v))
                return a * v / 100;
            return a;
        }, 1);
    };

    /**
     * @param {number} strictness
     * Strictness value, see {@linkcode getStrictness}.
     * @returns {number}
     * Multiplier for evaluation rating.
     */
    const getChaosMult = function(strictness = 0) {
        if (strictness <= 0)
            return 0;   // relative randomness handled by final +[0, 1).
        if (strictness >= 1)
            return 1;
        return 1 - (1 - strictness) * Math.random();
    };

    /**
     * @param {...number} values
     * Ratings to combine.
     * @returns {number}
     * Combined rating value.
     */
    const combineRatings = function(...values) {
        // console.log("combine ratings:", ...values);
        if (values.length)
            switch (COMBINE_TYPE) {
                case COMBINE.ADD:
                    return values.reduce((a, c) => a + c);
                case COMBINE.MUL:
                    return values.reduce((a, c) => a * c);
                case COMBINE.AVG:
                    return values.reduce((a, c) => a + c) / values.length;
                case COMBINE.MAX:
                    return Math.max(...values);
                case COMBINE.MIN:
                    return Math.min(...values);
            }
        return NULL_RATING;
    };

    /**
     * Gets custom rating value for action damage formula.
     * @param {Game_Action} action
     * Reference action.
     * @param {Game_Battler} target
     * Reference target.
     * @param {any[]} ext
     * User-defined extra values.
     * @returns {number}
     * Scalar rating value.
     */
    const getRatingDmg = function(action, target, ext) {
        const type = action?.item()?.damage.type;
        if (type) {
            const f = rateDmg[type];
            if (f)
                return f(action, target, action.makeDamageValue(target), ext);
        }
        return NULL_RATING;
    };

    /**
     * Gets custom rating values for all action effects.
     * @param {Game_Action} action
     * Reference action.
     * @param {Game_Battler} target
     * Reference target.
     * @param {any[]} ext
     * User-defined extra values.
     * @returns {number[]}
     * Scalar rating values.
     */
    const getRatingFX = function(action, target, ext) {
        const item = action?.item();
        if (item) {
            const a = [];
            for (const effect of item.effects) {
                const f = rateFX[effect.code];
                if (f)
                    a.push(f(action, target, effect, ext));
            }
            return a;
        }
        return [];
    };

    /**
     * @param {Game_Action} action
     * Reference action.
     * @param {Game_Battler} target
     * Reference target.
     * @returns {any[]}
     * Values to be passed to subsequent rating functions for this action.
     */
    const getRatingExt = function(action, target) {
        return Object.freeze(Array.from(rateExt, f => f(...arguments)));
    };

    /**
     * Gets overall action rating value.
     * @param {Game_Action} action
     * Reference action.
     * @param {Game_Battler} target
     * Reference target.
     * @returns {number}
     * Scalar rating value.
     */
    const getRating = function(action, target) {
        const m = getChaosMult(getStrictness(...arguments));
        if (!m)
            return 0;
        const ext = getRatingExt(...arguments);
        return combineRatings(
            getRatingDmg(...arguments, ext),
            ...getRatingFX(...arguments, ext)
        ) * m;
    };

    // Override - replace default evaluation with custom version.
    Game_Action.prototype.evaluateWithTarget = function(target) { // Cae_Tweaks.js [M33]
        const r = getRating(this, target);
        // console.log("evaluating", this.item().name, "by", this.subject().name(), "vs", target.name(), r);
        return r;
    };

    // Add auto-battle mechanics for applicable enemies.
    void (() => { if (!NME_AUTO_BATTLE) return;

        // New - enemy Auto Battle action list is based on their Add Skill traits.
        Game_Enemy.prototype.makeActionList = function() {
            const attackAction = new Game_Action(this);
            attackAction.setAttack();
            const list = [attackAction];
            const skills = Array.from(
                this.addedSkills(), id => $dataSkills[id]
            ).filter(skill => this.canUse(skill));
            for (const skill of skills) {
                const skillAction = new Game_Action(this);
                skillAction.setSkill(skill.id);
                list.push(skillAction);
            }
            return list;
        };

        // New - enemies make Auto Battle actions just like actors do.
        Game_Enemy.prototype.makeAutoBattleActions = function() {
            return Game_Actor.prototype.makeAutoBattleActions.apply(this, arguments);
        };

        // Patch - redirect to Auto Battle AI for those with relevant trait.
        void (alias => {
            Game_Enemy.prototype.makeActions = function() {
                if (this.isAutoBattle()) {
                    Game_Battler.prototype.makeActions.apply(this, arguments);
                    this.makeAutoBattleActions();
                } else
                    alias.apply(this, arguments);
            };
        })(Game_Enemy.prototype.makeActions);

    })();

})();

// M34) Escape ratio tweaks: <boost escape: X>, <block escape: X>, <block escape immobile: X>.
void (() => { if (!CAE.Tweaks.M34) return;
'use strict';

    // E.g. <boost escape: 50> = +50%pt escape chance.

    /** Name of notetag for escape boost modifier. @type {boolean} */
    const TAG_ESCAPE = CAE.Tweaks.M34["tag_boost escape"] || "boost escape";

    /** Name of notetag for escape block modifier. @type {boolean} */
    const TAG_ESCAPE_BLOCK = CAE.Tweaks.M34["tag_block escape"] || "block escape";

    /**
     * Name of notetag for immobile escape blocker (for enemies).\
     * Contributes escape block even if unable to move.
     * @type {boolean}
     */
    const TAG_ESCAPE_BLOCK_IMMOBILE = CAE.Tweaks.M34["tag_block escape immobile"] || "block escape immobile";

    /** If `true`, use boost escape and/or block escape tags. @type {boolean} */
    const USE_TAGS = !!(
        TAG_ESCAPE ||
        TAG_ESCAPE_BLOCK ||
        TAG_ESCAPE_BLOCK_IMMOBILE
    );

    /** If `true`, escape ratio will be recalculated immediately before being tested. @type {boolean} */
    const UPDATE_RATIO = CAE.Tweaks.M34.RECALC;

    /**
     * If `true`, escape boost/block will also apply to Escape effects.\
     * Requires at least one kind of tag enabled.
     * @type {boolean}
     */
    const AFFECT_EFFECT = CAE.Tweaks.M34.EFFECT;

    /**
     * @param {...number} v
     * Tag values to combine (100 => 100%).
     * @returns {number}
     * Result (1 = 100%).
     */
    const combine = function(...v) {
        return v.reduce((a, c) => a + c, 0) / 100;
    };

    /**
     * @param {object} o
     * Meta-bearing object.
     * @param {string} tagName
     * Notetag identifier.
     * @returns {number}
     * Parsed tag value.
     */
    const tagValue = function(o, tagName) {
        return Number(o.meta[tagName]) | 0;
    };

    /**
     * @param {Game_Battler} battler
     * Reference battler.
     * @param {string} tagName
     * Name of notetag to check.
     * @param {number} [mult=1]
     * Optional multiplier for each tag value.
     * @returns {number[]}
     * Relevant tag values from notetags on trait objects.
     */
    const tagValues = function(battler, tagName, mult = 1) {
        const r = [];
        for (const o of battler.traitObjects()) {
            const v = tagValue(o, tagName);
            if (v)
                r.push(v * mult);
        }
        return r;
    };

    /**
     * @param {Game_Battler} battler
     * Reference battler.
     * @returns {number[]}
     * Escape chance modifier values from notetags.
     */
    const parseEscape = function(battler) {
        if (TAG_ESCAPE && battler.canMove())
            return tagValues(battler, TAG_ESCAPE);
        return [];
    };

    /**
     * @param {Game_Battler} battler
     * Reference battler.
     * @returns {number[]}
     * Escape chance modifier values from notetags.
     */
    const parseEscapeBlock = function(battler) {
        const r = [];
        if (TAG_ESCAPE_BLOCK_IMMOBILE)
            r.push(...tagValues(battler, TAG_ESCAPE_BLOCK_IMMOBILE, -1));
        if (TAG_ESCAPE_BLOCK && battler.canMove())
            r.push(...tagValues(battler, TAG_ESCAPE_BLOCK, -1))
        return r;
    };

    /**
     * @param {Game_Battler[]} [members=$gameParty.battleMembers()]
     * Reference battlers. Default: `$gameParty.battleMembers()`.\
     * (NB: `BattleManager.setup` happens before battle starts.)
     * @returns {number[]}
     * Escape chance bonus values from notetags.
     */
    const getTagsPartyBoost = function(members = $gameParty.battleMembers()) {
        return members.flatMap(parseEscape);
    };

    /**
     * @param {Game_Battler[]} [members=$gameTroop.members()]
     * Reference battlers. Defaults to `$gameTroop.members()`.
     * @returns {number[]}
     * Escape chance malus values from notetags.
     */
    const getTagsTroopBlock = function(members = $gameTroop.members()) {
        return members.flatMap(parseEscapeBlock);
    };

    /**
     * @returns {number}
     * Additional escape ratio from this feature's notetags.
     */
    const getPartyEscapeRatioAdd = function() {
        return combine(
            ...getTagsPartyBoost(),
            ...getTagsTroopBlock()
        );
    };

    /** Determines and applies bonus/malus to escape ratio, based on notetags. */
    const applyBonusEscapeRatio = function() {
        BattleManager._escapeRatio += getPartyEscapeRatioAdd();
    };

    // Patch - remake escape ratio for each escape attempt.
    void (() => { if (!UPDATE_RATIO) return;
        const alias = BattleManager.processEscape;
        BattleManager.processEscape = function() {
            this.makeEscapeRatio();
            alias.apply(this, arguments);
        };
    })();

    // Tag-related changes.
    void (() => { if (!USE_TAGS) return;

        // Patch - adjust escape ratio based on applicable tags.
        void (alias => {
            BattleManager.makeEscapeRatio = function() {
                alias.apply(this, arguments);
                applyBonusEscapeRatio();
            }
        })(BattleManager.makeEscapeRatio);

        // Make tags affect Escape effects as well.
        void (() => { if (!AFFECT_EFFECT) return;

            /**
             * @param {Game_Battler[]} [members=$gameParty.battleMembers()]
             * Reference battlers. Defaults to `$gameParty.battleMembers()`.
             * @returns {number[]}
             * Escape chance malus values from notetags.
             */
            const getTagsPartyBlock = function(members = $gameParty.battleMembers()) {
                return members.flatMap(parseEscapeBlock);
            };

            /**
             * @param {Game_Battler} subject
             * The one who is attempting to escape.
             * @returns {number[]}
             * Chance modifiers from tags.
             */
            const getTagsBlock = function(subject) {
                switch (subject?.opponentsUnit()) {
                    case $gameParty:
                        return getTagsPartyBlock();
                    case $gameTroop:
                        return getTagsTroopBlock();
                    default:
                        return [];
                }
            };

            /**
             * @param {Game_Action} action
             * Reference action.
             * @returns {number}
             * Chance of success for action escape effect (base chance 100%).
             */
            const getEscapeEffectChance = function(action) {
                const subject = action.subject();
                const escapeT = parseEscape(subject, TAG_ESCAPE);
                const escapeI = tagValue(action.item(), TAG_ESCAPE);
                const block   = getTagsBlock(subject);
                // console.log(escapeI, escapeT, block);
                return 1 + combine(escapeI, ...escapeT, ...block);
            };

            // Patch - apply boost/block values to Escape action effects.
            const alias = Game_Action.prototype.itemEffectSpecial;
            Game_Action.prototype.itemEffectSpecial = function(target, effect) {
                if (
                    effect.dataId !== Game_Action.SPECIAL_EFFECT_ESCAPE ||
                    Math.random() < getEscapeEffectChance(this)
                )
                    alias.apply(this, arguments);
            };

        })();

    })();

})();

// M35) Custom party commands that turn on switch, then check for troop events.
void (() => { if (!CAE.Tweaks.M35) return;
'use strict';

    /**
     * @typedef {object} ExtraPartyCommand
     * @property {string} txt
     * Display text for this command.
     * @property {number} sw
     * Switch ID for this command.
     * - The command is enabled when the switch is off.
     * - The command effect is to turn the switch on.
     */

    /** Party commands to add. @type {ExtraPartyCommand[]} */
    const CMD = []; // init/save/load

    /** Default party switch command list. @type {ExtraPartyCommand[]} */
    const DFAULT_CMD = CAE.Tweaks.M35.CMDS;

    /** Internal symbol for new party commands. @type {string} */
    const KEY = CAE.Tweaks.NAME + "_M35";

    /** Property under which this feature stores its save data. @type {string} */
    const SAVE_PROP = CAE.Tweaks.M35.SAVE ? KEY : "";

    /** Non-conflicting identifier for new "party switch command" method on `Scene_Battle`. */
    const SYM_M_CMD_OK = Symbol();

    /**
     * Sets command list as specified.
     * @param {ExtraPartyCommand[]} list
     * Command list to set.
     * @returns {boolean}
     * `true` on success.
     */
    const setCommands = function(list) {
        CMD.length = 0;
        CMD.push(...list);
        return true;
    };

    /** Resets party switch command list to default. @returns {boolean} `true` on success. */
    const resetCommands = function() {
        return setCommands(DFAULT_CMD);
    };

    /**
     * Registers new party switch command.
     * @param {string} txt
     * Command display text.
     * @param {number} sw
     * Command switch ID.
     * @param {number} [pos=null]
     * Index to insert new command.\
     * If omitted, will add to end of list.
     * @returns {boolean}
     * `true` iff command was added.
     */
    const addCommand = function(txt, sw, pos = null) {
        if (typeof txt === "string" && sw in $dataSystem.switches) {
            const o = { txt, sw };
            if (typeof pos === "number")
                CMD.splice(pos, 0, o);
            else
                CMD.push(o);
            return true;
        }
        return false;
    };

    /**
     * Removes a party switch command.
     * @param {number} pos
     * Index of command to remove.
     * @returns {boolean}
     * `true` iff command was removed.
     */
    const remCommand = function(pos) {
        if (pos in CMD)
            return !!CMD.splice(pos, 1).length;
        return false;
    };

    /**
     * Removes one or more party switch commands by name.
     * @param {string} txt
     * Display name of command to remove.
     * @param {boolean} [all=false]
     * If `true`, remove all matches, not just the first. Default: `false`.
     * @returns {boolean}
     * `true` iff any command was removed.
     */
    const remCommandByName = function(txt, all = false) {
        if (all) {
            if (remCommandByName(txt)) {
                while (remCommandByName(txt));
                return true;
            }
            return false;
        }
        return remCommand(CMD.findIndex(c => c.txt === txt));
    };

    /**
     * Removes one or more party switch commands by switch ID.
     * @param {number} sw
     * Switch ID of command to remove.
     * @param {boolean} [all=false]
     * If `true`, remove all matches, not just the first. Default: `false`.
     * @returns {boolean}
     * `true` iff any command was removed.
     */
    const remCommandBySwitch = function(sw, all = false) {
        if (all) {
            if (remCommandBySwitch(sw)) {
                while (remCommandBySwitch(sw));
                return true;
            }
            return false;
        }
        return remCommand(CMD.findIndex(c => c.sw === sw));
    };

    /** Applies effects of a party switch command. */
    Scene_Battle.prototype[SYM_M_CMD_OK] = function() {
        const w = this._partyCommandWindow;
        const n = w.currentExt();
        const c = CMD[n];
        if (c) {
            const { sw } = c;
            if (sw) {
                $gameSwitches.setValue(sw, true);
                BattleManager._phase = "start";         // TPBS - check for events
            }
            // [ ] M35 - optional TPB penalty? Or could just do `$gameParty.applyTpbPenalty()` as a Script command in event.
        }
        BattleManager._inputting = false;               // reset input stage
        BattleManager._tpbNeedsPartyCommand = true;     // return to party command
    };

    // Patch - add new commands.
    void (alias => {
        Window_PartyCommand.prototype.makeCommandList = function() {
            alias.apply(this, arguments);
            const L = CMD.length;
            for (let n = 0; n < L; ++n) {
                const { txt, sw } = CMD[n];
                this.addCommand(txt, KEY, !$gameSwitches.value(sw), n);
            }
        };
    })(Window_PartyCommand.prototype.makeCommandList);

    // Patch - handle new commands.
    void (alias => {
        Scene_Battle.prototype.createPartyCommandWindow = function() {
            alias.apply(this, arguments);
            this._partyCommandWindow.setHandler(KEY, this[SYM_M_CMD_OK].bind(this));
        };
    })(Scene_Battle.prototype.createPartyCommandWindow);

    // Patch - initialise party switch command list on new game.
    void (alias => {
        DataManager.createGameObjects = function() {
            alias.apply(this, arguments);
            resetCommands();
        };
    })(DataManager.createGameObjects);

    // Patch - save/load data.
    void (() => { if (!SAVE_PROP) return;

        // Patch - add party switch command list info to save files.
        void (alias => {
            DataManager.makeSaveContents = function() {
                const r = alias.apply(this, arguments);
                if (CMD.length)
                    r[SAVE_PROP] = CMD;
                return r;
            };
        })(DataManager.makeSaveContents);

        // Patch - read party switch command list from save data.
        void (alias => {
            DataManager.extractSaveContents = function(contents) {
                alias.apply(this, arguments);
                const a = contents[SAVE_PROP];
                if (Array.isArray(a))
                    setCommands(a);
            };
        })(DataManager.extractSaveContents);

    })();

    // Define and register plugin commands.
    for (const [k, f] of Object.entries(CAE.Tweaks.M35.pCom = {

        /**
         * Adds a new party switch command.
         * @param {{txt:string,sw:string,pos:string}} args
         * Raw plugin command arguments.
         * @returns {boolean}
         * `true` iff command succeeded.
         */
        add: function(args) {
            const txt = args.txt;
            const sw  = parseInt(args.sw, 10) || 0;
            const pos = parseInt(args.pos, 10);
            return addCommand(txt, sw, isNaN(pos) ? void 0 : pos);
        },

        /**
         * Removes 1+ existing party switch commands, by name.
         * @param {{txt:string,all:string}} args
         * Raw plugin command arguments.
         * @returns {boolean}
         * `true` iff command succeeded.
         */
        remName: function(args) {
            return remCommandByName(args.txt, args.all === "true");
        },

        /**
         * Resets party switch command list to default.
         * @param {{}} args
         * Raw plugin command arguments.
         * @returns {boolean}
         * `true` iff command succeeded.
         */
        clr: function(args) {
            return resetCommands();
        }

    }))
        PluginManager.registerCommand(CAE.Tweaks.NAME, "M35_" + k, f);

})();

// M36) Gameover screen commands.
void (() => { if (!CAE.Tweaks.M36) return;
'use strict';

    /** Command symbols for new window on `Scene_Gameover`. @type {string[]} */
    const CMDS = CAE.Tweaks.M36.CMDS;   // Object.freeze(["load", "title", "options"]);

    // Confirm valid configuration.
    if (!CMDS.length)
        return;

    /** Display text for "retry" command. @type {string} */
    const RETRY = CAE.Tweaks.M36.RETRY;  // "Load Last Save";

    /** New global identifier for game over choice window constructor. */
    const N = "Window_GameoverCae";

    /** Game over choice window. @constructor */
    globalThis[N] = function() { this.initialize(...arguments); };
    globalThis[N].prototype = Object.create(Window_Command.prototype);

    // Define static constants.
    Object.defineProperties(globalThis[N], {

        /** X-offset for new window position (px). @type {number} */
        DX: { value: CAE.Tweaks.M36.DX, configurable: false },

        /** Y-offset for new window position (px). @type {number} */
        DY: { value: CAE.Tweaks.M36.DY, configurable: false },

        /** Frames to wait between starting gameover scene and opening command window. @type {number} */
        DELAY: { value: CAE.Tweaks.M36.DELAY, configurable: false },

        /** Symbols of commands to display, in display order. @type {string[]} */
        CMDS: { value: CMDS, configurable: false },

        /** Scenes to/from which the gameover screen should not fade. @type {Scene_Base[]} */
        NOFADES: { value: [Scene_Load, Scene_Options], configurable: false },
        // Deliberately removed `Object.freeze` on this array, for ease of modding.

        /** Display text for new gameover "retry" command. */
        RETRY: { value: RETRY, configurable: false },

        /** Non-conflicting identifiers for new `Scene_Gameover` properties/methods. */
        SYM: { value: Object.freeze({
            /** For new "window instance" pointer property. */
            P:      Symbol(),
            /** For new "delay frames" property that counts down before opening command window. */
            T:      Symbol(),
            /** For new window bounds rect method. */
            M_RECT: Symbol(),
            /** For new retry command method. */
            M_RTRY: Symbol(),
            /** For successful load method, following retry command. */
            M_RTRY_OK: Symbol(),
            /** For failed load method, following retry command. */
            M_RTRY_ER: Symbol(),
            /** For new load command method. */
            M_LOAD: Symbol(),
            /** For new title command method. */
            M_TITL: Symbol(),
            /** For new options command method. */
            M_OPTS: Symbol(),
            /** For new "open command window" method. */
            M_OPEN: Symbol(),
        }), configurable: false }

    });

    // Define static properties/methods.
    Object.assign(globalThis[N], {

        /** Command position memory, like `Window_MenuCommand`. */
        _lastSymbol: null,

        /** Resets command position memory. */
        initCommandPosition: function() {
            this._lastSymbol = null;
        },

        /** Resets command position memory if appropriate. Called on scene stop. */
        initCommandPositionOnStart: function() {
            if (!this.wasSubScenePrev())
                this.initCommandPosition();
        },

        /** @returns {boolean} `true` iff previous scene was stacked on top of `Scene_Gameover`. */
        wasSubScenePrev: function() {
            return this.NOFADES.some(c => SceneManager.isPreviousScene(c));
        },

        /** @returns {boolean} `true` iff next scene gets stacked on top of `Scene_Gameover`. */
        isSubSceneNext: function() {
            return this.NOFADES.some(c => SceneManager.isNextScene(c));
        },

        /** @returns {boolean} `true` iff should fade to this scene from previous. */
        isFadeInOk: function() {
            return !this.wasSubScenePrev();
        },

        /** @returns {boolean} `true` iff should fade from this scene to next. */
        isFadeOutOk: function() {
            return !this.isSubSceneNext();
        },

        /** @returns {number} Most recent save file ID for this playthrough. */
        retrySaveId: function() {
            /** Most recent save ID - NOT guaranteed to be same playthrough! @type {number} */
            const r = DataManager.latestSavefileId();
            // Explicitly check autosave (excluded by `latestSavefileId`).
            const t = DataManager.savefileInfo(r)?.timestamp;
            const a = DataManager.savefileInfo(0)?.timestamp;
            if (a > t)
                return 0;
            /** Most recent non-auto save ID this playthrough. @type {number} */
            const s = $gameSystem.savefileId() || -1;  // jic
            if (r === s)
                return r;
            return s;   // Separated for readable logic.
        }

    });

    // Define instance properties/methods.
    Object.assign(globalThis[N].prototype, {

        constructor: globalThis[N],

        /** @constructor */
        initialize: function(rect) {
            Window_Command.prototype.initialize.apply(this, arguments);
            this.selectLast();
            this._canRepeat = false;
        },

        /**
         * @param {string} sym
         * Command symbol.
         * @returns {[name:string,symbol?:string,enabled?:boolean,ext?:any]}
         * Command data, or empty array if `sym` not recognised.
         */
        commandArgs: function(sym) {
            switch (sym) {
                case "load":
                    return [TextManager.continue_, sym, DataManager.isAnySavefileExists()];
                case "options":
                    return [TextManager.options];
                case "retry":
                    return [
                        this.constructor.RETRY, sym,
                        $gameSystem.saveCount() > 0 && DataManager.isAnySavefileExists()
                    ];
                case "title":
                    return [TextManager.toTitle];
            }
            return [];
        },

        /** Updates command data. */
        makeCommandList: function() {
            for (const k of this.constructor.CMDS) {
                const a = this.commandArgs(k);
                if (a.length) {
                    if (a.length < 2)
                        a.push(k);
                    this.addCommand(...a);
                }
            }
        },

        /** Called on user OK. */
        processOk: function() {
            this.constructor._lastSymbol = this.currentSymbol();
            Window_Command.prototype.processOk.apply(this, arguments);
        },

        /** Reselects most recent command, based on static memory. */
        selectLast: function() {
            this.selectSymbol(this.constructor._lastSymbol);
        }

    });

    /**
     * @returns {Rectangle}
     * Bounding box for new command window.
     */
    Scene_Gameover.prototype[globalThis[N].SYM.M_RECT] = function() {
        const C = globalThis[N];
        const h = this.calcWindowHeight(C.CMDS.length, true);
        const w = this.mainCommandWidth();
        const y = C.DY + ((Graphics.boxHeight - h) >> 1);
        const x = C.DX + ((Graphics.boxWidth - w) >> 1);
        return new Rectangle(x, y, w, h);
    };

    // New - command callback: on retry success.
    Scene_Gameover.prototype[globalThis[N].SYM.M_RTRY_OK] = function() {
        SoundManager.playLoad();
        this.fadeOutAll();
        const mapId = $gameMap.mapId();
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        const d = $gamePlayer.direction();
        $gamePlayer.reserveTransfer(mapId, x, y, d, 0); // for consistent fade-in
        if ($gameSystem.versionId() !== $dataSystem.versionId)
            $gamePlayer.requestMapReload();
        SceneManager.goto(Scene_Map);
        $gameSystem.onAfterLoad();
    };

    // New - command callback: on retry error.
    Scene_Gameover.prototype[globalThis[N].SYM.M_RTRY_ER] = function() {
        const C = globalThis[N];
        if (C.CMDS.length > 1) {
            SoundManager.playBuzzer();
            const w = this[C.SYM.P];
            w.currentData().enabled = false;
            w.redrawCurrentItem();
            this[C.SYM.M_OPEN]();
        } else
            this[C.SYM.M_TITL]();   // no other commands available
    };

    // New - command callback: retry.
    Scene_Gameover.prototype[globalThis[N].SYM.M_RTRY] = function() {
        const C = globalThis[N];
        DataManager.loadGame(C.retrySaveId())
                   .then (() => this[C.SYM.M_RTRY_OK]())
                   .catch(() => this[C.SYM.M_RTRY_ER]());
    };

    // New - command callback: load.
    Scene_Gameover.prototype[globalThis[N].SYM.M_LOAD] = function() {
        SceneManager.snapForBackground();
        SceneManager.push(Scene_Load);
    };

    // New - command callback: options.
    Scene_Gameover.prototype[globalThis[N].SYM.M_OPTS] = function() {
        SceneManager.snapForBackground();
        SceneManager.push(Scene_Options);
    };

    // New - command callback: title.
    Scene_Gameover.prototype[globalThis[N].SYM.M_TITL] = function() {
        this[globalThis[N].SYM.P].close();
        this.gotoTitle();
    };

    // New - open command window.
    Scene_Gameover.prototype[globalThis[N].SYM.M_OPEN] = function(instant = false) {
        const C = globalThis[N];
        const w = this[C.SYM.P];
        this[C.SYM.T] = 0;  // early trigger reset
        if (w._list.every(c => !c.enabled))     // nuthin doin
            this[C.SYM.M_TITL]();
        else if (C.CMDS.length === 1) {         // one command = auto-ok
            w.select(0);
            w.processOk();
        } else {
            w.open();
            w.activate();
            if (instant)
                w.openness = 255;
        }
    };

    // Override - scene is now controlled via command window.
    Scene_Gameover.prototype.isTriggered = function() {
        return false;
    };

    // Patch - add new window with handlers and setup delay.
    void (alias => {
        Scene_Gameover.prototype.create = function() {
            alias.apply(this, arguments);
            this.createWindowLayer();
            const C = globalThis[N];
            C.initCommandPositionOnStart();
            const w = this[C.SYM.P] = new C(this[C.SYM.M_RECT]());
            w.setHandler("retry",   this[C.SYM.M_RTRY].bind(this));
            w.setHandler("load",    this[C.SYM.M_LOAD].bind(this));
            w.setHandler("options", this[C.SYM.M_OPTS].bind(this));
            w.setHandler("title",   this[C.SYM.M_TITL].bind(this));
            w.openness = 0;
            this.addWindow(w);
            if (C.isFadeInOk() /* && C.DELAY > 0 */)    // DELAY = 0 => input to advance
                this[C.SYM.T] = C.DELAY;
            else
                this[C.SYM.M_OPEN](true);
        };
    })(Scene_Gameover.prototype.create);

    // Patch - open command window once delay elapses.
    void (alias => {
        Scene_Gameover.prototype.update = function() {
            if (!this.isBusy()) {
                const C = globalThis[N];
                const S = C.SYM;
                const I = Input.isTriggered("ok") || TouchInput.isTriggered();
                if (
                    (I && !C.DELAY) ||                      // require input
                    (this[S.T] > 0 && (!--this[S.T] || I))  // timeout or input
                )
                    this[S.M_OPEN]();
            }
            alias.apply(this, arguments);   // compatibility jic
        };
    })(Scene_Gameover.prototype.update);

    // Patch - suppress fade for certain scene transitions.
    void (alias => {
        Scene_Gameover.prototype.startFadeIn = function() {
            if (globalThis[N].isFadeInOk())
                alias.apply(this, arguments);
        };
    })(Scene_Gameover.prototype.startFadeIn);
    void (alias => {
        Scene_Gameover.prototype.fadeOutAll = function() {
            if (globalThis[N].isFadeOutOk())
                alias.apply(this, arguments);
        };
    })(Scene_Gameover.prototype.fadeOutAll);

})();

// M37) Cross-save persistent switches/variables, and custom options.
void (() => { if (!CAE.Tweaks.M37) return;

    /** Persistent switch/variable IDs. @type {{s:Set<number>,v:Set<number>}} */
    const PERSIST = Object.freeze({ s: new Set(), v: new Set() });

    /** New switch-/variable-based in-game options. @type {{s:Set<number>,v:Map<number,number[]>}} */
    const OPTS = Object.freeze({ s: new Set(), v: new Map() });

    // Initialise `PERSIST` and `OPTS` from parameter data.
    for (const [id, isOpt] of CAE.Tweaks.M37.S)
        if (isOpt)
            OPTS.s.add(id);
        else
            PERSIST.s.add(id);
    for (const [id, optValues] of CAE.Tweaks.M37.V)
        if (optValues.length > 1)
            OPTS.v.set(id, optValues);
        else
            PERSIST.v.add(id);
    Object.freeze(PERSIST.s);
    Object.freeze(PERSIST.v);
    Object.freeze(OPTS.s);
    Object.freeze(OPTS.v);

    /** Total number of new options added by this feature. @type {number} */
    const OPT_COUNT = OPTS.s.size + OPTS.v.size;

    /**
     * @typedef {object} VALUES
     * Used for local dynamic value storage. Saved to file.
     * @property {object.<number,boolean>} s
     * Switch data: format `{ id: value }`.
     * @property {object.<number,any>} v
     * Variable data: format `{ id: value }`.
     */

    // Persistent switches/variables.
    void (() => { if (!PERSIST.s.size && !PERSIST.v.size) return;

        /** `true` iff persistent data has been loaded from file this session. */
        let loaded = false;

        /** Name of file to which persistent data is saved. */
        const SAVENAME = "persist";

        /** Local cache for session-persistent storage. When apt, this gets saved to file. @type {VALUES} */
        const VALUES = { s: {}, v: {} };

        /** Initialises persistent switch/variable value repository. */
        const initValues = function() {
            VALUES.s = Object.fromEntries(Array.from(PERSIST.s, id => [id, false]));
            VALUES.v = Object.fromEntries(Array.from(PERSIST.v, id => [id, 0]));
        };
        initValues();

        /**
         * Reapplies persistent values to current switches/variables.
         * @returns {boolean}
         * - `true` = values were refreshed.
         * - `false` = data is being loaded from file, plz wait. Will refresh on successful load.
         */
        const refresh = function() {
            if (loaded) {
                for (const id of PERSIST.s)
                    $gameSwitches.setValue(id, VALUES.s[id]);
                for (const id of PERSIST.v)
                    $gameVariables.setValue(id, VALUES.v[id]);
                return true;
            }
            load();
            return false;
        };

        /**
         * Updates local persistent switch/variable cache from loaded file data.
         * @param {VALUES} [contents]
         * Data loaded from file.
         */
        const setValuesFromFile = function(contents) {
            initValues();
            if (typeof contents === "object") {
                const { s, v } = contents;
                if (typeof s === "object")
                    for (const id of PERSIST.s)
                        if (id in s)
                            VALUES.s[id] = s[id];
                if (typeof v === "object")
                    for (const id of PERSIST.v)
                        if (id in v)
                            VALUES.v[id] = v[id];
            }
            refresh();
        };

        /**
         * Saves persistent values to file.
         * @returns {Promise}
         * For chaining.
         */
        const save = function() {
            return StorageManager.saveObject(SAVENAME, VALUES);
        };

        /**
         * Applies provided persistent values.
         * @param {VALUES} contents
         * Persistent value data.
         */
        const onLoadOk = function(contents) {
            loaded = true;
            setValuesFromFile(contents);
        };

        /**
         * Loads persistent values from file, then applies them.
         * @returns {Promise}
         * For chaining.
         */
        const load = function() {
            if (StorageManager.exists(SAVENAME))
                return StorageManager.loadObject(SAVENAME).then(onLoadOk);
            // File doesn't exist, so skip loading.
            return new Promise((resolve, reject) => resolve(loaded = true));
        };

        /**
         * Updates persistent value for specified switch.\
         * This will save changes to file.
         * @param {number} id
         * Switch ID.
         */
        const updateS = function(id) {
            if (PERSIST.s.has(id)) {
                const s = $gameSwitches.value(id);
                if (VALUES.s[id] !== s) {
                    VALUES.s[id] = s;
                    save();
                }
            }
        };

        /**
         * Updates persistent value for specified variable.\
         * This will save changes to file.
         * @param {number} id
         * Variable ID.
         */
        const updateV = function(id) {
            if (PERSIST.v.has(id)) {
                const v = $gameVariables.value(id);
                if (VALUES.v[id] !== v) {
                    VALUES.v[id] = v;
                    save();
                }
            }
        };

        // Patch - immediately save changes to persistent switches.
        void (alias => {
            Game_Switches.prototype.setValue = function(id, value) {
                alias.apply(this, arguments);
                updateS(id);
            };
        })(Game_Switches.prototype.setValue);

        // Patch - immediately save changes to persistent variables.
        void (alias => {
            Game_Variables.prototype.setValue = function(id, value) {
                alias.apply(this, arguments);
                updateV(id);
            };
        })(Game_Variables.prototype.setValue);

        // Patch - apply persistent values on load.
        void (alias => {
            DataManager.loadGame = function() {
                return alias.apply(this, arguments).then(refresh);
            };
        })(DataManager.loadGame);

        // Patch - apply persistent values on new game.
        void (alias => {
            DataManager.createGameObjects = function() {
                alias.apply(this, arguments);
                refresh();
            };
        })(DataManager.createGameObjects);

        // Patch - don't advance to next scene until persistent data has loaded.
        void (alias => {
            Scene_Boot.prototype.isBusy = function() {
                return !loaded || alias.apply(this, arguments);
            };
        })(Scene_Boot.prototype.isBusy);

    })();

    // Custom in-game options based on switches/variables.
    void (() => { if (!OPT_COUNT) return;

        /** Skip flags. */
        const USE = Object.freeze({
            /** `true` iff this feature's switch-based options are enabled. */
            S: !!OPTS.s.size,
            /** `true` iff this feature's variable-based options are enabled. */
            V: !!OPTS.v.size
        });

        /** Local cache for switch-/variable-based options. Included in config save file. @type {VALUES} */
        const VALUES = {
            /** Current on/off state of switch options. */
            s: Object.fromEntries(Array.from(OPTS.s, s => [s, false])),
            /** Current indices of variable options. */
            v: Object.fromEntries(Array.from(OPTS.v, ([v, l]) => [v, ((l.indexOf(0) + 1) || 1) - 1]))
        };

        /** New `ConfigManager` keys. */
        const CKEY = {};

        /** Key root. */
        CKEY.ROOT = CAE.Tweaks.NAME + "_M37-";

        /** Switch data. */
        CKEY.S = CKEY.ROOT + "S";

        /** Variable data. */
        CKEY.V = CKEY.ROOT + "V";

        Object.freeze(CKEY);

        /** Non-conflicting identifier for new "switch option status text" method on `Window_Options`. */
        const SYM_M_VALUE_TEXT_S = Symbol();

        /** Non-conflicting identifier for new "variable option status text" method on `Window_Options`. */
        const SYM_M_VALUE_TEXT_V = Symbol();

        /** Non-conflicting identifier for new "change switch option value" method on `Window_Options`. */
        const SYM_M_CHANGE_S = Symbol();

        /** Non-conflicting identifier for new "change variable option value" method on `Window_Options`. */
        const SYM_M_CHANGE_V = Symbol();

        // Patch - custom display value.
        void (alias => {
            Window_Options.prototype.statusText = function(index) {
                const s = this.commandSymbol(index);
                if (USE.S && s.startsWith(CKEY.S))
                    return this[SYM_M_VALUE_TEXT_S](this._list[index].ext);
                if (USE.V && s.startsWith(CKEY.V))
                    return this[SYM_M_VALUE_TEXT_V](this._list[index].ext);
                return alias.apply(this, arguments);
            };
        })(Window_Options.prototype.statusText);

        // Patch - custom value change behaviours.
        void (alias => {
            Window_Options.prototype.cursorLeft = function() {
                const s = this.currentSymbol();
                if (USE.S && s.startsWith(CKEY.S))
                    this[SYM_M_CHANGE_S](true, false);
                else if (USE.V && s.startsWith(CKEY.V))
                    this[SYM_M_CHANGE_V](true, false);
                else
                    alias.apply(this, arguments);
            };
        })(Window_Options.prototype.cursorLeft);
        void (alias => {
            Window_Options.prototype.cursorRight = function() {
                const s = this.currentSymbol();
                if (USE.S && s.startsWith(CKEY.S))
                    this[SYM_M_CHANGE_S](false, false);
                else if (USE.V && s.startsWith(CKEY.V))
                    this[SYM_M_CHANGE_V](false, false);
                else
                    alias.apply(this, arguments);
            };
        })(Window_Options.prototype.cursorRight);
        void (alias => {
            Window_Options.prototype.processOk = function() {
                const s = this.currentSymbol();
                if (USE.S && s.startsWith(CKEY.S))
                    this[SYM_M_CHANGE_S](false, true);
                else if (USE.V && s.startsWith(CKEY.V))
                    this[SYM_M_CHANGE_V](false, true);
                else
                    alias.apply(this, arguments);
            };
        })(Window_Options.prototype.processOk);

        // Handle switch-based options.
        void (() => { if (!USE.S) return;

            // New - define config property.
            Object.defineProperty(ConfigManager, CKEY.S, {
                get: function( ) { return VALUES.s },
                set: function(v) {
                    if (typeof v === "object")
                        VALUES.s = v;
                },
                configurable: true
            });

            /**
             * @param {number} id
             * Switch ID.
             * @returns {string}
             * Display value.
             */
            Window_Options.prototype[SYM_M_VALUE_TEXT_S] = function(id) {
                return this.booleanStatusText(ConfigManager[CKEY.S][id]);
            };

            /**
             * Updates currently-selected in-game switch option value.
             * @param {boolean} [isLeft=false]
             * If `true`, change is "to the left" (previous index). Default: `false`.
             * @param {boolean} [wrap=false]
             * If `true`, permit wrapping from last to first. Default: `false`.
             * @returns {boolean}
             * `true` iff change was made.
             */
            Window_Options.prototype[SYM_M_CHANGE_S] = function(isLeft = false, wrap = false) {
                const id = this.currentExt();
                const C  = ConfigManager[CKEY.S];   // config
                const v0 = C[id];                   // current value
                if (!wrap && isLeft !== v0)
                    return false;
                C[id] = !v0;
                this.redrawItem(this.index());
                this.playCursorSound();
                $gameSwitches.onChange();
                return true;
            };

            // Patch - return config value for marked switches.
            void (alias => {
                Game_Switches.prototype.value = function(id) {
                    if (OPTS.s.has(id))
                        return !!ConfigManager[CKEY.S][id];
                    return alias.apply(this, arguments);
                };
            })(Game_Switches.prototype.value);

            // Patch - set config value for marked switches.
            void (alias => {
                Game_Switches.prototype.setValue = function(id, value) {
                    if (OPTS.s.has(id))
                        ConfigManager[CKEY.S][id] = !!value;
                    alias.apply(this, arguments);
                };
            })(Game_Switches.prototype.setValue);

        })();

        // Handle variable-based options.
        void (() => { if (!USE.V) return;

            // New - define config property.
            Object.defineProperty(ConfigManager, CKEY.V, {
                get: function( ) { return VALUES.v; },
                set: function(v) {
                    if (typeof v === "object")
                        VALUES.v = v;
                },
                configurable: true
            });

            /**
             * @param {number} id
             * Variable ID.
             * @returns {string|number}
             * Display value.
             */
            Window_Options.prototype[SYM_M_VALUE_TEXT_V] = function(id) {
                const index  = ConfigManager[CKEY.V][id];
                const values = OPTS.v.get(id);
                return values[index];
            };

            /**
             * Updates specified in-game variable option value.
             * @param {boolean} [isLeft=false]
             * If `true`, change is "to the left" (previous index). Default: `false`.
             * @param {boolean} [wrap=false]
             * If `true`, permit wrapping from last to first. Default: `false`.
             * @returns {boolean}
             * `true` iff change was made.
             */
            Window_Options.prototype[SYM_M_CHANGE_V] = function(isLeft = false, wrap = false) {
                const id = this.currentExt();
                const D  = OPTS.v.get(id);          // values
                const E  = D.length - 1;            // end index
                const C  = ConfigManager[CKEY.V];   // config
                const v0 = C[id];                   // current value
                if (!wrap && ((isLeft && v0 <= 0) || (!isLeft && v0 >= E)))
                    return false;
                C[id] = wrap ? (
                    isLeft ? (v0 > 0 ? v0 - 1 : E) : (v0 < E ? v0 + 1 : 0)
                ) : (
                    isLeft ? v0 - 1 : v0 + 1
                );
                this.redrawItem(this.index());
                this.playCursorSound();
                $gameVariables.onChange();
                return true;
            };

            // Patch - get config value for marked variables.
            void (alias => {
                Game_Variables.prototype.value = function(id) {
                    const data = OPTS.v.get(id);
                    if (data)
                        return data[ConfigManager[CKEY.V][id]];
                    return alias.apply(this, arguments);
                };
            })(Game_Variables.prototype.value);

            // Patch - set config value for marked variables.
            void (alias => {
                Game_Variables.prototype.setValue = function(id, value) {
                    const ix = OPTS.v.get(id)?.indexOf(value);
                    if (ix >= 0)
                        ConfigManager[CKEY.V][id] = ix;
                    alias.apply(this, arguments);
                };
            })(Game_Variables.prototype.setValue);

        })();

        // Patch - add new switch-/variable-based options.
        void (alias => {
            Window_Options.prototype.addGeneralOptions = function() {
                alias.apply(this, arguments);
                for (const id of OPTS.s)
                    this.addCommand($dataSystem.switches[id] ?? "", CKEY.S + id, true, id);
                for (const id of OPTS.v.keys())
                    this.addCommand($dataSystem.variables[id] ?? "", CKEY.V + id, true, id);
            };
        })(Window_Options.prototype.addGeneralOptions);

        // Patch - accommodate new options.
        void (alias => {
            Scene_Options.prototype.maxCommands = function() {
                return alias.apply(this, arguments) + OPT_COUNT;
            };
        })(Scene_Options.prototype.maxCommands);

        // Patch - save new options.
        void (alias => {
            ConfigManager.makeData = function() {
                const r = alias.apply(this, arguments);
                if (USE.S)
                    r[CKEY.S] = ConfigManager[CKEY.S];
                if (USE.V)
                    r[CKEY.V] = ConfigManager[CKEY.V];
                return r;
            };
        })(ConfigManager.makeData);

        // Patch - load new options.
        void (alias => {
            ConfigManager.applyData = function(config) {
                alias.apply(this, arguments);
                if (USE.S && config[CKEY.S])
                    ConfigManager[CKEY.S] = config[CKEY.S];
                if (USE.V && config[CKEY.V])
                    ConfigManager[CKEY.V] = config[CKEY.V];
            };
        })(ConfigManager.applyData);

    })();

})();

// M38) Actor transforms via <transform: ID> State notetag.
void (() => { if (!CAE.Tweaks.M38) return;
"use strict";

    /** Identifier for new `<transform: id>` State notetag. @type {string} */
    const TAG_NAME = CAE.Tweaks.M38.tag_transform || "transform";

    /**
     * Identifier used to store transform-related data on `Game_Actor`.
     *
     * This data is an object map storing all relevant pre-transform values.\
     * See {@linkcode data} for details.
     * @type {string}
     */
    const P = "Cae_Tweaks_M38-orig";

    /** If `true`, experience will be retained on transformation class change. @type {boolean} */
    const KEEP_EXP = CAE.Tweaks.M38.KEEP_EXP;

    /**
     * Gets notetag for given state ID.
     * @param {number} id
     * State ID.
     * @returns {number}
     * Target actor ID for transform, or `0` if none.
     */
    const getTag = function getTag_M38(id) {
        return parseInt($dataStates[id]?.meta[TAG_NAME], 10) || 0;
    };

    /**
     * @typedef {object} PreTransformData
     * @property {string} name
     * @property {string} nickname
     * @property {number} classId
     * @property {[string,number]} char
     * @property {[string,number]} face
     * @property {string} battler
     * @property {string} profile
     * Key-value pairs corresponding to {@linkcode data} functions.
     */

    /** Functions used to collectively generate a {@linkcode PreTransformData} object. @type {Map<string,(Game_Actor)=>any>} */
    const data = new Map([
        ["name",     function(b) { return b.name(); }],
        ["nickname", function(b) { return b.nickname(); }],
        ["classId",  function(b) { return b.currentClass().id; }],
        ["char",     function(b) { return [b.characterName(), b.characterIndex()]; }],
        ["face",     function(b) { return [b.faceName(), b.faceIndex()]; }],
        ["battler",  function(b) { return b.battlerName(); }],
        ["profile",  function(b) { return b.profile(); }]
    ]);

    /** Functions used collectively to apply transformation changes. @type {Map<string,(Game_Actor,Game_Actor?,object?)=>void>} */
    const apply = new Map([
        ["name",     function(a, b, v) { v ??= data.get("name")?.(b);     if (v) a.setName(v); }],
        ["nickname", function(a, b, v) { v ??= data.get("nickname")?.(b); if (v) a.setNickname(v); }],
        ["classId",  function(a, b, v) { v ??= data.get("classId")?.(b);  if (v) a.changeClass(v, KEEP_EXP); }],
        ["char",     function(a, b, v) { v ??= data.get("char")?.(b);     if (v) a.setCharacterImage(...v); }],
        ["face",     function(a, b, v) { v ??= data.get("face")?.(b);     if (v) a.setFaceImage(...v); }],
        ["battler",  function(a, b, v) { v ??= data.get("battler")?.(b);  if (v) a.setBattlerImage(v); }],
        ["profile",  function(a, b, v) { v ??= data.get("profile")?.(b);  if (v) a.setProfile(v); }]
    ]);

    /**
     * Creates pre-transform data to revert later.
     * @param {Game_Actor} b
     * Battler who is about to transform.
     * @returns {?PreTransformData}
     * Memorised values, or `null` if input is invalid.
     */
    const mkData = function mkData_M38(b) {
        if (b instanceof Game_Actor) {
            const d = {};
            for (const [k, f] of data)
                d[k] = f(b);
            return d;
        }
        return null;
    };

    /**
     * Generates and stores pre-transform data, to revert later.
     * @param {Game_Battler} b
     * Battler who is about to transform.
     * @param {number} stateId
     * ID of state causing the transform.
     * @returns {?PreTransformData}
     * Memorised data, or `null` if memorisation failed.
     */
    const memorise = function memorise_M38(b, stateId) {
        const d = mkData(b);
        if (d)
            return (b[P] ??= {})[stateId] = d;
        return d;
    };

    /**
     * Clears stored pre-transform data for given state ID.
     * @param {Game_Battler} b
     * Target battler.
     * @param {number} stateId
     * ID of state to clear.
     * @returns {boolean}
     * `true` iff data was cleared.
     */
    const clear = function clear_M38(b, stateId) {
        const d = b[P];
        if (delete d?.[stateId]) {
            if (Object.keys(d).length < 1)
                delete b[P];
            return true;
        }
        return false;
    };

    /**
     * Applies transformation effects.
     * @param {Game_Actor} a
     * Current actor.
     * @param {Game_Actor} [b]
     * Reference actor for transform.
     * @param {PreTransformData} [v]
     * Pre-transform data: if provided, revert transformation and ignore `b`.
     * @returns {boolean}
     * `true` iff transformation was applied.
     */
    const applyTransform = function applyTransform_M38(a, b, v) {
        if (!a || (!b && !v))
            return false;
        for (const [k, f] of apply.entries())
            f(a, b, v?.[k]);
        // Then call a round of refreshes (cf Game_Party#addActor).
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        $gameTemp.requestBattleRefresh();
        return true;
    };

    /**
     * Effects a transformation.
     * @param {Game_Actor} a
     * Current actor.
     * @param {Game_Actor} b
     * Reference actor for transform.
     * @param {number} stateId
     * State ID responsible for this transformation.
     * @returns {boolean}
     * `true` iff transformation was applied.
     */
    const transform = function transform_M38(a, b, stateId) {
        memorise(a, stateId);
        if (applyTransform(a, b))
            return true;
        clear(a, stateId);
        return false;
    };

    /**
     * Reverts an existing transformation.
     * @param {Game_Actor} b
     * Actor to un-transform.
     * @param {number} stateId
     * State ID responsible for the transformation in question.
     * @returns {boolean}
     * `true` iff transformation was reverted.
     */
    const undoTransform = function undoTransform_M38(b, stateId) {
        const d = b[P];
        if (!d)
            return false;
        const r = applyTransform(b, null, d[stateId]);
        clear(b, stateId);
        return r;
    };

    // Patch - transform when applicable states are added.
    void (alias => {
        Game_Actor.prototype.addNewState = function(id) {
            alias.apply(this, arguments);
            const b = $gameActors.actor(getTag(id));
            if (b)
                transform(this, b, id);
        };
    })(Game_Actor.prototype.addNewState);

    // Patch - revert transform when applicable states are erased.
    void (alias => {
        Game_Actor.prototype.eraseState = function(id) {
            alias.apply(this, arguments);
            undoTransform(this, id);
        };
    })(Game_Actor.prototype.eraseState);
    void (alias => {
        Game_Actor.prototype.clearStates = function() {
            alias.apply(this, arguments);
            const K = this[P] ? Array.from(Object.keys(this[P]), s => parseInt(s, 10)) : null;
            if (K)
                for (const id of K)
                    if (!this.isStateAffected(id))
                        undoTransform(this, id);
        }
    })(Game_Actor.prototype.clearStates);

})();

//#endregion Mechanics

//#region Frontend

// Q01) Options volume offset from 20 -> 5; fine-tune with shift or click & drag.
void (() => { if (!CAE.Tweaks.Q01) return;
'use strict';

    /**
     * Pixels of horizontal touch scroll per frame per volume increment
     * exceeding {@linkcode TouchInput.moveThreshold} (default threshold = 10 px).
     */
    const PX_PER_INC = CAE.Tweaks.Q01.PX_PER_INC;

    /** Standard volume increment (originally 20). */
    const STEP = CAE.Tweaks.Q01.STEP;

    /** If true, normal step = fine control (simplifies override). */
    const STEP1 = STEP <= 1;

    // Override - custom volume step size.
    void (() => { if (!STEP1) return;
        Window_Options.prototype.volumeOffset = function() {
            return 1;   // always fine control
        };
    })();
    void (() => { if ( STEP1) return;

        /**
         * Non-conflicting identifier for new `Window_Options` property
         * that stores `true` iff the latest volume change was a decrease.
         */
        const SYM = Symbol();

        // Override - step to nearest offset multiple.
        Window_Options.prototype.volumeOffset = function() {
            // Allow fine control
            if (Input.isPressed('shift'))
                return 1;
            // Otherwise stop at next multiple of STEP
            const v = this.getConfigValue(this.currentSymbol());
            const m = v % STEP;
            if (m)
                return this[SYM] ? m : STEP - m;
            return STEP;
        };

        // Patch - store input info.
        void (alias => {
            Window_Options.prototype.processOk = function() {
                this[SYM] = false;
                alias.apply(this, arguments);
            };
        })(Window_Options.prototype.processOk);
        void (alias => {
            Window_Options.prototype.cursorLeft = function() {
                this[SYM] = true;
                alias.apply(this, arguments);
            };
        })(Window_Options.prototype.cursorLeft);
        void (alias => {
            Window_Options.prototype.cursorRight = function() {
                this[SYM] = false;
                alias.apply(this, arguments);
            };
        })(Window_Options.prototype.cursorRight);

    })();

    // Horizontal click & drag for touch-based fine-tuning.
    void (alias => {
        Window_Options.prototype.onTouchScroll = function() {
            const s = Input._currentState.shift;
            const x = this._scrollAccelX;
            Input._currentState.shift = true;
            if (x > 0)
                for (let n = Math.ceil( x / PX_PER_INC); n--;)
                    this.cursorLeft();
            else
                for (let n = Math.ceil(-x / PX_PER_INC); n--;)
                    this.cursorRight();
            Input._currentState.shift = s;
            alias.apply(this, arguments);
        };
    })(Window_Options.prototype.onTouchScroll);

//#region === Disabled in favour of click & drag === //

    /** For storing references to left/right touch buttons. */
    // const SYM = Symbol();

    /**
     * @param {Window_Options} w reference game window
     * @returns {boolean} `true` iff left/right Touch UI buttons should be shown.
     */
    // const shouldShowButtons = function(w) {
    //     return ConfigManager.touchUI &&
    //         w.isVolumeSymbol(w.currentSymbol() ?? '');
    // };

    // Add buttons for clearer touch accessibility.
    // void (alias => {
    //     Window_Options.prototype.select = function(index) {
    //         alias.apply(this, arguments);
    //         const sc = SceneManager._scene;
    //         if (!sc[SYM]) {
    //             sc[SYM] = {};
    //             sc.addChild(sc[SYM].l = new Sprite_Button("pageup"));
    //             sc.addChild(sc[SYM].r = new Sprite_Button("pagedown"));
    //             sc[SYM].l.setClickHandler(Input.virtualClick.bind(Input, "left"));
    //             sc[SYM].r.setClickHandler(Input.virtualClick.bind(Input, "right"));
    //             sc[SYM].l.x = this.x + this.width + this.itemPadding();
    //             sc[SYM].r.x = sc[SYM].l.x + sc[SYM].r.width + 4;
    //         }
    //         if (sc[SYM].l.visible = sc[SYM].r.visible = shouldShowButtons(this)) {
    //             const r = this.itemRectWithPadding(index);
    //             sc[SYM].l.y = sc[SYM].r.y =
    //                 this.y + r.y + this.itemPadding() - (r.height - sc[SYM].l.height) / 2;
    //         }
    //     };
    // })(Window_Options.prototype.select);
//#endregion ======================================= //

})();

// Q02) Front-view battle animations on actor faces.
void (() => { if (!CAE.Tweaks.Q02) return;
'use strict';

    // NB: adding "isSideView" check will require patching most of the other stuff, too.
    // So I'll assume front view with no perspective changes mid-play.

    /** @returns {Window_BattleStatus} The scene's status window. */
    const wStatus = function() {
        return SceneManager._scene._statusWindow;
    };

    /** @returns {PIXI.Container} The target Effekseer container. */
    const eBox = function() {
        return SceneManager._scene._windowLayer;
    };

    /**
     * @param {Sprite_Animation} sprite reference sprite
     * @returns {boolean} `true` iff sprite should be mirrored in Z.
     */
    const shouldMirror = function(sprite) {
        // displayType 2 = "Center of the screen"
        return sprite._mirror && sprite._handle && sprite._animation.displayType === 2;
    };

    // Move effect layer and add target sprites.
    void (alias => {
        Spriteset_Battle.prototype.createActors = function() {
            alias.apply(this, arguments);
            const w = wStatus();
            if (w) {
                for (let n = $gameParty.battleMembers().length; n--;) {
                    const sprite = new Sprite_Actor();
                    this._actorSprites.push(sprite);
                    w.addChild(sprite);
                }
                // adjust z layer
                this._effectsContainer = eBox();
            }
        };
    })(Spriteset_Battle.prototype.createActors);

    // Create front-view actor sprites now the status window exists.
    void (alias => {
        Scene_Battle.prototype.createStatusWindow = function() {
            alias.apply(this, arguments);
            this._spriteset.createActors(); // recreate
        };
    })(Scene_Battle.prototype.createStatusWindow);

    // Front-view actor sprites are in a different location.
    void (alias => {
        Sprite_Actor.prototype.setHome = function() {
            const w = wStatus();
            const i = this._actor.index();
            const r = w.faceRect(i);
            const x = r.x + r.width / 2 + CAE.Tweaks.Q02.OFFSET_X;
            const y = r.y + r.height / 2 + w.gaugeLineHeight() + CAE.Tweaks.Q02.OFFSET_Y;
            alias.call(this, x | 0, y | 0);
        };
    })(Sprite_Actor.prototype.setHome);

    // Front-view actor sprites should not move.
    Sprite_Actor.prototype.updateMove = function() {
        this._offsetX = 0;
        this._offsetY = 0;
        if (this._movementDuration > 0) {
            this._movementDuration = 0;
            this.onMoveEnd();
        }
    };

    // Must be visible - animations do not play on hidden targets.
    Game_Actor.prototype.isSpriteVisible = function() {
        return true;
    };

    // Fake sprite, hide the shadow.
    Sprite_Actor.prototype.updateShadow = function() {
        this._shadowSprite.visible = false;
    };

    // Mirror in Z (depth) rather than X (width).
    void (alias => {
        Sprite_Animation.prototype.updateEffectGeometry = function() {
            alias.apply(this, arguments);
            if (shouldMirror(this)) {
                const S = this._animation.scale / 100;
                this._handle.setScale(S, S, -S);    // is ok without offset?
            }
        };
    })(Sprite_Animation.prototype.updateEffectGeometry);

    // Move damage popups if appropriate.
    // Reworked as home position offset, e.g. to include state overlays.
    // void (() => { if (!CAE.Tweaks.Q02.POPUP_X) return;
    //     const alias = Sprite_Actor.prototype.damageOffsetX;
    //     Sprite_Actor.prototype.damageOffsetX = function() {
    //         return alias.apply(this, arguments) + CAE.Tweaks.Q02.POPUP_X;
    //     };
    // })();
    // void (() => { if (!CAE.Tweaks.Q02.POPUP_Y) return;
    //     const alias = Sprite_Actor.prototype.damageOffsetY;
    //     Sprite_Actor.prototype.damageOffsetY = function() {
    //         return alias.apply(this, arguments) + CAE.Tweaks.Q02.POPUP_Y;
    //     };
    // })();

})();

// Q03) Scrollable windows on Scene_Status & extra param info.
void (() => { if (!CAE.Tweaks.Q03) return;
'use strict';

    /**
     * Affects left/right selection when navigating with buttons.
     * - `true`: attempt to maintain the selected visible row.
     * - `false`: reselect the window's previously-selected index.
     *
     * Touch controls bypass this.
     * @type {boolean}
     */
    const LR_RETAIN_ROW = CAE.Tweaks.Q03.RETAIN_ROW;

    /** Maximum pixels of passive belt movement per frame. @type {number} */
    const MOVE_RATE = CAE.Tweaks.Q03.MOVE_RATE;

    /** Pixels of padding either side of the belt scrolling area. @type {number} */
    const BELT_PADDING = CAE.Tweaks.Q03.BELT_PAD;

    /** Pixels of horizontal touch movement per frame (over touch move threshold) to count as a swipe. @type {number} */
    const SWIPE_THRESHOLD = 0;

    /** Index of belt window initially selected. @type {number} */
    const INIT_BELT_INDEX = CAE.Tweaks.Q03.INIT_INDEX;

    /** Reduction in width (px) of equips window on `Scene_Status`. @type {number} */
    const EQUIP_WIDTH_REDUCTION = Scene_Equip.prototype.statusWidth()
                                - Scene_Status.prototype.statusParamsWidth();

    /**
     * Elements/states with names that match this regular expression
     * will not be displayed in the new info windows.
     *
     * (This only applies to auto-generated ID include lists.)
     * @type {RegExp}
     */
    const RX_EXCLUDE = CAE.Tweaks.Q03.RX_EXCLUDE;
    // /^#/;   // = "starts with #"

    /**
     * Elements/states with names that match this regular expression
     * will be centred and not show a rate.
     *
     * The displayed header will be the first capture group.
     * @type {RegExp}
     */
    const RX_HEADING = CAE.Tweaks.Q03.RX_HEADING;
    // /^\-+\s*(.*[^\s\-])\s*\-*$/;   // e.g. "-- HEADING --" or "-HEADING"

    /** If `true`, display element/state rates as resistances instead. @type {boolean} */
    const DISPLAY_RESIST = CAE.Tweaks.Q03.AS_RESIST;

    /** New global identifier for status element info window. */
    const N1 = "Window_StatusElementsCae";

    /** New global identifier for status element info window. */
    const N2 = "Window_StatusStatesCae";

    // Avoid class syntax here, it seemed to cause notable slowdown in-game when I tested.

//#region == Window_StatusElements ========= //

    globalThis[N1] = function() { this.initialize(...arguments); };
    globalThis[N1].prototype = Object.create(Window_StatusBase.prototype);

    // Define static properties/methods.
    Object.assign(globalThis[N1], {

        /** @type {number[]} cache/override for `elementIds`. */
        _elementIds: null,

        /** @type {number} cache/override for `valueWidth`. */
        _valueWidth: null,

        /** @returns {number[]} element IDs to display. */
        elementIds: function() {
            if (!this._elementIds) {
                // populate default based on RX_EXCLUDE
                const r = [];
                const D = $dataSystem.elements;
                const L = D.length;
                for (let n = 0; ++n < L;)
                    if (D[n] && !RX_EXCLUDE.test(D[n]))
                        r.push(n);
                this._elementIds = r;   // memoise
            }
            return this._elementIds;
        }

    });

    // Define own instance properties/methods.
    Object.assign(globalThis[N1].prototype, {

        constructor: globalThis[N1],

        /** @constructor */
        initialize: function() {
            Window_StatusBase.prototype.initialize.apply(this, arguments);
            this._actor = null;
        },

        /**
         * Assigns actor for this window.
         * @param {Game_Actor} actor reference actor.
         */
        setActor: function(actor) {
            if (this._actor !== actor) {
                this._actor = actor;
                this.refresh();
            }
        },

        /** @returns {number} item count. */
        maxItems: function() {
            return this._actor ? this.constructor.elementIds().length : 0;
        },

        /** @returns {number} row height (px). */
        itemHeight: function() {
            return this.lineHeight();
        },

        /**
         * @param {string} value
         * Formatted display value.
         * @returns {number}
         * Width of display area for `value` (px).
         */
        valueWidth: function(value) {
            if (!value)
                return 0;
            return this.constructor._valueWidth ??= this.textWidth("000%");   // memoise
        },

        /**
         * @param {string} text
         * Input text
         * @returns {string}
         * {@linkcode RX_HEADING|heading} text or an empty string.
         */
        formatHeading: function(text) {
            return RX_HEADING.exec(text)?.[1] ?? "";
        },

        /**
         * @param {number} index item index
         * @returns {[name:string,rate:number]} display values.
         */
        getValues: function(index) {
            const id   = this.constructor.elementIds()[index];
            const name = $dataSystem.elements[id];
            const head = this.formatHeading(name);
            if (head)
                return [head, null];
            return [name, this._actor.elementRate(id)];
        },

        /**
         * @param {number} rate input value
         * @returns {string} formatted as a percentage for display.
         */
        formatRate: function(rate) {
            if (Number.isFinite(rate)) {
                if (DISPLAY_RESIST)
                    rate = 1 - rate;
                return (rate * 100).toFixed(0) + "%";
            }
            return "";
        },

        /**
         * Draws given item in the list.
         * @param {number} index item index.
         */
        drawItem: function(index) {
            const [name, rate] = this.getValues(index);
            const value = this.formatRate(rate);
            const rect  = this.itemLineRect(index);
            const wv    = this.valueWidth(value);
            const wn    = rect.width - wv;
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(name, rect.x, rect.y, wn, value ? "left" : "center");
            this.changeTextColor(ColorManager.paramchangeTextColor(1 - rate));
            this.drawText(value, rect.x + wn, rect.y, wv, "right");
        }

    });

//#endregion Window_StatusElements ========= //

//#region == Window_StatusStates =========== //

    globalThis[N2] = function() { this.initialize(...arguments); };
    globalThis[N2].prototype = Object.create(Window_StatusBase.prototype);

    // Define static properties/methods.
    Object.assign(globalThis[N2], {

        /** @static @type {boolean} If `true`, prefix state names with their icons. */
        _addIcons: CAE.Tweaks.Q03.STATE_ICON,

        /** @static @type {number[]} Cache/override for `elementIds`. */
        _stateIds: null,

        /** @static @type {number} Cache/override for `valueWidth`. */
        _valueWidth: null,

        /** @static @returns {number[]} Element IDs to display. */
        stateIds: function() {
            if (!this._stateIds) {
                // populate default based on RX_EXCLUDE
                const r = [];
                const D = $dataStates;
                const L = D.length;
                for (let n = 0; ++n < L;)
                    if (D[n]?.name && !RX_EXCLUDE.test(D[n].name))
                        r.push(n);
                this._stateIds = r;     // memoise
            }
            return this._stateIds;
        }

    });

    // Define own instance properties/methods.
    Object.assign(globalThis[N2].prototype, {

        constructor:   globalThis[N2],

        // Maybe should've made an intermediate class for inheritance, but this works.
        initialize:    globalThis[N1].prototype.initialize,
        setActor:      globalThis[N1].prototype.setActor,
        itemHeight:    globalThis[N1].prototype.itemHeight,
        formatHeading: globalThis[N1].prototype.formatHeading,
        formatRate:    globalThis[N1].prototype.formatRate,
        valueWidth:    globalThis[N1].prototype.valueWidth,

        /** @returns {number} item count. */
        maxItems: function() {
            return this._actor ? this.constructor.stateIds().length : 0;
        },

        /**
         * @param {number} index item index
         * @returns {[name:string,rate:number]} display values.
         */
        getValues: function(index) {
            const id   = this.constructor.stateIds()[index];
            const data = $dataStates[id];
            const name = data.name;
            const head = this.formatHeading(name);
            if (head)
                return [head, null];
            const rate = this._actor.isStateResist(id) ? 0 :
                         this._actor.stateRate(id);
            return [name, rate];
        },

        /**
         * Draws given item in the list.
         * @param {number} index item index.
         */
        drawItem: function(index) {
            const [name, rate] = this.getValues(index);
            const value = this.formatRate(rate);
            const rect  = this.itemLineRect(index);
            const pad   = 4;
            const iw    = value && this.constructor._addIcons ? ImageManager.iconWidth + pad : 0;
            const wv    = this.valueWidth(value);
            const idx   = rect.width - wv;
            const wn    = idx - iw - pad;
            if (iw)
                this.drawIcon($dataStates[this.constructor.stateIds()[index]].iconIndex, rect.x, rect.y)
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(name, rect.x + iw, rect.y, wn, value ? "left" : "center");
            this.changeTextColor(ColorManager.paramchangeTextColor(1 - rate));
            this.drawText(value, rect.x + idx, rect.y, wv, "right");
        }

    });

//#endregion Window_StatusStates =========== //

    /** Non-conflicting identifier for new "previously-selected index" property on `Window_StatusBase`. */
    const SYM_PREV_SEL = Symbol();

    /** Non-conflicting identifier for new "get window belt" method on `Scene_Status`. */
    const SYM_M_GET_BELT = Symbol();

    /** Non-conflicting identifier for new "should activate by touch" method on `Scene_Status`. */
    const SYM_M_SHOULD_ACTIVATE_BY_TOUCH = Symbol();

    /** Non-conflicting identifier for new "update status window belt" method on `Scene_Status`. */
    const SYM_M_UPDATE_BELT = Symbol();

    /** Non-conflicting identifier for new "new belt windows" method on `Scene_Status`. */
    const SYM_M_NEW_WINDOWS = Symbol();

    /** Non-conflicting identifier for new "belt cache" property on `Scene_Status`. */
    const SYM_BELT_CACHE = Symbol();

    /** Non-conflicting identifier for new "belt window rect" method on `Scene_Status`. */
    const SYM_M_BELT_WINDOW_RECT = Symbol();

    /** Property identifier for new {@linkcode globalThis[N1]|element info window} on `Scene_Status`. */
    const P_ELEMENT_WINDOW = "_statusElementWindow";

    /** Property identifier for new {@linkcode globalThis[N2]|state info window} on `Scene_Status`. */
    const P_STATES_WINDOW = "_statusStatesWindow";

    /**
     * Switches focus from `a` to `b`.
     * @param {Window_Selectable} a
     * Reference active selectable window.
     * @param {Window_Selectable} b
     * Reference inactive selectable window.
     * @param {boolean} [initSelect=false]
     * Optional, default = false.
     * If `true`, manually select `b` (remembered, or top visible, index).
     * Not required for touch input due to hover updates.
     */
    const moveFocus = function(a, b, initSelect = false) {
        if (!b.isOpenAndActive()) {
            if (initSelect)
                b.smoothSelect(
                    LR_RETAIN_ROW ?
                    Math.min(b.topRow() - a.topRow() + a.row(), b.maxRows() - 1) :
                    b[SYM_PREV_SEL] ?? b.topIndex()
                );
            b.activate();
            delete b[SYM_PREV_SEL];
        }
        if (a.isOpenAndActive()) {
            if (!LR_RETAIN_ROW)
                a[SYM_PREV_SEL] = a.index();     // remember selected index
            a.deselect();
            a.deactivate();
        }
    };

    /**
     * @typedef {[prop:string|symbol,constructor:function,wOffset:number]} StatusBeltWindowInfo
     * Defining information for each new window in the status belt:
     * 1. scene property identifier for window instance;
     * 2. window constructor reference;
     * 3. additive width offset, relative to core status param window.
     */
    /**
     * @returns {StatusBeltWindowInfo[]}
     * Array of info entries for all new status belt windows added by this feature.
     *
     * To add a new window to the belt, just define its class
     * then list its info here.
     */
    Scene_Status.prototype[SYM_M_NEW_WINDOWS] = function() {
        return [
            globalThis[N1].elementIds().length ? [P_ELEMENT_WINDOW, globalThis[N1], 0] : null,
            globalThis[N2].stateIds().length   ? [P_STATES_WINDOW,  globalThis[N2], 0] : null
        ].filter(info => info);
    };

    /**
     * @returns {Window_StatusBase[]}
     * Left-to-right ordered array of windows comprising status sub-window "belt".
     */
    Scene_Status.prototype[SYM_M_GET_BELT] = function() {
        return this[SYM_BELT_CACHE] ??= [
            this._statusParamsWindow,
            this._statusEquipWindow,
            ...this[SYM_M_NEW_WINDOWS]().map(info => this[info[0]])
        ].sort((a, b) => a.x - b.x);
    };

    /**
     * @param {Window_StatusBase} b
     * Reference belt window to (potentially) activate.
     * @returns {?Window_StatusBase}
     * Belt window from which focus should be taken.
     */
    Scene_Status.prototype[SYM_M_SHOULD_ACTIVATE_BY_TOUCH] = function(b) {
        if (
            b &&
            !b.isOpenAndActive() &&
            (TouchInput.isHovered() || TouchInput.isMoved()) &&
            b.isTouchedInsideFrame()
        )
            return this[SYM_M_GET_BELT]().find(
                w => w.isOpenAndActive() && !w._scrollTouching
            );
        return null;
    };

    /**
     * Updates horizontal positioning of status sub-window "belt".
     * - Moves active window fully on-screen.
     * - Accounts for touch swipe gestures.
     * @returns {boolean} `true` iff positions were updated.
     */
    Scene_Status.prototype[SYM_M_UPDATE_BELT] = function() {
        /** Window instances in belt. @type {Window_StatusBase[]} */
        const belt = this[SYM_M_GET_BELT]();
        if (!belt.length)
            return false;   // no windows in belt
        if (belt.reduce((a, c) => a + c.width, 0) <= Graphics.boxWidth)
            return false;   // early exit if belt is always on-screen
        /** Lower/left limit for horizontal scroll. @type {number} */
        const b0 = BELT_PADDING;
        /** Upper/right limit for horizontal scroll. @type {number} */
        const b1 = Graphics.boxWidth - 2 * BELT_PADDING;
        /** Index of last belt window (`length - 1`). @type {number} */
        const  L = belt.length - 1;
        /** Left off-screen distance for first window in belt (non-negative). @type {number} */
        const x0 = b0 - belt[0].x;
        /** Right off-screen distance for all belt windows (negative iff off-screen). @type {number} */
        const dw = belt.map(w => b1 + b0 - w.x - w.width);
        // Get speed.
        let speed = 0;
        for (let n = L; n >= 0; --n) {
            const w = belt[n];
            if (!w)
                continue;
            // touch drag
            if (w._scrollTouching) {
                const sx = w._scrollAccelX;
                if (
                    (dw[L] < b0 && sx >=  SWIPE_THRESHOLD) ||
                    (   x0 > b0 && sx <= -SWIPE_THRESHOLD)
                ) {
                    speed = -sx;
                    break;
                }
                continue;   // prioritise direct interaction
            }
            // passively scroll active window if apt
            if (w.active) {
                // out of bounds
                if (w.x < b0) {
                    speed = Math.min(b0 - w.x, MOVE_RATE);
                    break;
                }
                if (dw[n] < b0) {
                    speed = Math.max(dw[n] - b0, -MOVE_RATE);
                    break;
                }
                // slow scroll to centre
                const dx = w.x - dw[n];   // capped displacement
                if (dx < 0)
                    speed = Math.min(-dx, MOVE_RATE) >> 1;
                else if (dx > 0)
                    speed = -(Math.min(dx, MOVE_RATE) >> 1);
                // only 1 belt window active at a time
                break;
            }
        }
        // Apply speed limit based on first/last windows.
        if (speed = speed.clamp(dw[L], x0)) {
            for (const w of belt)
                w.x += speed;   // Apply movement.
            return true;
        }
        return false;
    };

    /**
     * @param {string|symbol} p New window instance property, for lookup.
     * @param {number} [width=0] Optional additional width for new window, from param window width. Default: 0.
     * @returns {Rectangle} Rectangle for new belt window.
     */
    Scene_Status.prototype[SYM_M_BELT_WINDOW_RECT] = function(p, width = 0) {
        // base rect
        const r = this.statusParamsWindowRect();
        const e = this.statusEquipWindowRect();
        r.width += width;
        r.x = e.x + e.width;
        // plus belt position
        /** Scene property identifier for each new window instance. @type {(string|symbol)[]} */
        const D = this[SYM_M_NEW_WINDOWS]().map(info => info[0]);
        const i = D.indexOf(p);
        if (i > 0)
            for (let n = i; n--;)
                r.x += this[D[n]].width;
        return r;
    };

    // Patch - trigger window focus changes by input and update belt position.
    void (alias => {
        Scene_Status.prototype.update = function() {
            alias.apply(this, arguments);
            const B = this[SYM_M_GET_BELT]();
            const L = B.length;
            const n = B.findIndex(w => w.isOpenAndActive())
            if (L) {
                // button
                if (Input.isRepeated("left"))
                    if (n > 0)
                        moveFocus(B[n], B[n - 1], true);
                if (Input.isRepeated("right"))
                    if (n < L - 1)
                        moveFocus(B[n], B[n + 1], true);
                // touch
                for (const b of B) {
                    const a = this[SYM_M_SHOULD_ACTIVATE_BY_TOUCH](b);
                    if (a) {
                        moveFocus(a, b, true);
                        break;
                    }
                }
                // belt movement
                this[SYM_M_UPDATE_BELT]();
            }
        };
    })(Scene_Status.prototype.update);

    // Patch - add element window, init subwindow focus, and show left/right arrows from D14.
    void (alias => {
        Scene_Status.prototype.create = function() {
            alias.apply(this, arguments);
            // add new belt windows
            for (const info of this[SYM_M_NEW_WINDOWS]())
                this.addWindow(this[info[0]] = new info[1](
                    this[SYM_M_BELT_WINDOW_RECT](info[0], info[2])
                ));
            // get belt reference
            const B = this[SYM_M_GET_BELT]();
            const E = B.length - 1;
            // init selection
            const w0 = B[INIT_BELT_INDEX.clamp(0, E)];
            w0.select(0);
            w0.activate();
            // centre windows if all on-screen
            const dw = Graphics.boxWidth - B.reduce((a, c) => a + c.width, 0) >> 1;
            if (dw > 0)
                for (const w of B)
                    w.x += dw;
            // add left/right scroll indicators (D14)
            if (E > 0) {    // only if more than 1 window in belt
                for (let n = E; --n;) {
                    B[n].leftArrowVisible  = true;
                    B[n].rightArrowVisible = true;
                }
                B[0].rightArrowVisible = true;
                B[E].leftArrowVisible  = true;
            }
        };
    })(Scene_Status.prototype.create);

    // Patch - also update actor for new status windows.
    void (alias => {
        Scene_Status.prototype.refreshActor = function() {
            alias.apply(this, arguments);
            for (const info of this[SYM_M_NEW_WINDOWS]())
                this[info[0]].setActor(this.actor());
        };
    })(Scene_Status.prototype.refreshActor);

    // Patch - shrink width of equip window, e.g. for horz scroll affordance.
    void (() => { if (!EQUIP_WIDTH_REDUCTION) return;
        const alias = Scene_Status.prototype.statusEquipWindowRect;
        Scene_Status.prototype.statusEquipWindowRect = function() {
            const r = alias.apply(this, arguments);
            r.width -= EQUIP_WIDTH_REDUCTION;
            return r;
        };
    })();

    // Revert - show item backgrounds now that the windows are interactive.
    delete Window_StatusParams.prototype.drawItemBackground;
    delete Window_StatusEquip.prototype.drawItemBackground;

    // ===== Show more info in param list window ===== //
    // (NB: window must be resized or scrollable.)

    /** Additional display names not defined in core database. @type {string[]} */
    const ADD_NAMES = CAE.Tweaks.Q03.ADD_NAMES;
    // ['CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG', 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];

    /** Ordered list specifying the param ID for each display index. @type {number[]} */
    const PARAM_IDS = CAE.Tweaks.Q03.PARAM_IDS;
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    /** Display format for basic param values. @type {string} */
    const FORM_B  = "%1 ";

    /** Display format for ex-param values. @type {string} */
    const FORM_EX = "%1%";

    /** Display format for sp-param values. @type {string} */
    const FORM_SP = FORM_EX;

    /**
     * @param {number} n param identifier
     * @returns {string} display name for param `n`.
     */
    const paramName = function(actor, n) {
        // 0~9 (MHP~EVA) are in Database > Terms
        if (n <= 9)
            return TextManager.param(n);
        return ADD_NAMES[n - 10] ?? n;
    };

    /**
     * @param {Game_Actor} actor actor reference
     * @param {number} n param identifier
     * @returns {string|number} display value for param `n` of `actor`.
     */
    const paramDrawValue = function(actor, n) {
        if (n <= 7)
            return FORM_B.format(actor.param(n));
        if (n <= 17)
            return FORM_EX.format(Math.floor(actor.xparam(n - 8) * 100));
        return FORM_SP.format(Math.floor(actor.sparam(n - 18) * 100));
    };

    /**
     * Ex-param "standard" values.
     * Used for choosing (de)buff colour for displayed actor params.
     * @type {number[]}
     */
    const STD_XPARAMS = CAE.Tweaks.Q03.BUFF_INFO[0];
    // [0.95, 0.05, 0.05, 0, 0, 0, 0, 0, 0, 0];

    /**
     * Sp-param "low is good" flags.
     * Used for choosing (de)buff colour for displayed actor params.
     * @type {boolean[]}
     */
    const LOW_SPARAMS = CAE.Tweaks.Q03.BUFF_INFO[1];
    // [true, false, false, false, true, false, true, true, true, false];

    /**
     * Assumes default param functions.\
     * Result is intended for use in determining (de)buff value draw colour.
     * @param {Game_Actor} actor reference actor
     * @param {number} n param ID
     * @returns {number} buff indicator:
     * - positive: good
     * - zero: neutral
     * - negative: bad
     */
    const paramBuffValue = function(actor, n) {
        if (n <= 7)
            return actor.param(n) - actor.paramBasePlus(n);
        if (n <= 17)
            return actor.xparam(n - 8) - STD_XPARAMS[n - 8];
        const v = 1 - actor.sparam(n - 18);
        if (LOW_SPARAMS[n - 18])
            return v;
        return -v;
    };

    // Override - change which params are drawn and how they are labelled.
    Window_StatusParams.prototype.drawItem = function(index) {
        const rect    = this.itemLineRect(index);
        const paramId = PARAM_IDS[index] ?? index;
        const name    = paramName(this._actor, paramId);
        const value   = paramDrawValue(this._actor, paramId);
        const buff    = paramBuffValue(this._actor, paramId);
        const vw      = this.textWidth("0000%");
        const vp      = 0;
        const vwp     = vw - vp;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(name, rect.x, rect.y, rect.width - vwp);
        this.changeTextColor(ColorManager.paramchangeTextColor(buff));
        this.drawText(value, rect.x + rect.width - vwp, rect.y, vw, "right");
    };

    // Override - change number of params displayed.
    Window_StatusParams.prototype.maxItems = function() {
        return PARAM_IDS.length;
    };

})();

// Q04) Skip blank (battle start) messages.
void (() => { if (!CAE.Tweaks.Q04) return;
'use strict';

    /**
     * Toggles between feature modes:
     * - `true` = skip blank emerge/preemptive/surprise battle messages;
     * - `false` = skip ALL blank messages.
     */
    const LEGACY = CAE.Tweaks.Q04.LEGACY;

    // Patch - skip ALL blank messages.
    void (() => { if ( LEGACY) return;
        const alias = Game_Message.prototype.add;
        Game_Message.prototype.add = function(text) {
            if (text)
                alias.apply(this, arguments);
        };
    })();

    // Override - skip blank emerge/preemptive/surprise battle messages.
    void (() => { if (!LEGACY) return;
        BattleManager.displayStartMessages = function() {
            const emerges = $gameTroop.enemyNames().map(
                n => TextManager.emerge.format(n)
            ).filter(s => s);
            for (const s of emerges)
                $gameMessage.add(s);
            if (this._preemptive && TextManager.preemptive)
                $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
            else if (this._surprise && TextManager.surprise)
                $gameMessage.add(TextManager.surprise.format($gameParty.name()));
        };
        // [ ] Q04 - specific patches for other messages? (Victory, defeat, escapeStart, escapeFail, exp, gold.)
    })();

})();

// Q05) Show MHP/MMP/HIT/EVA on equip scene and replace face with BG portrait.
void (() => { if (!CAE.Tweaks.Q05) return;
'use strict';

    /**
     * Adjust portrait sprite based on loaded bitmap.
     * @param {Sprite} sprite reference sprite
     * @param {number} w display area width
     * @param {number} h display area height
     * @param {number} p extra display padding on bottom (originally for scroll margin, cf Window_Selectable#contentsHeight)
     * @param {Bitmap} bmp reference bitmap
     */
    const onPortraitLoad = function(sprite, w, h, p, bmp) {
        const dx = w - bmp.width;       // left
        const dy = h - bmp.height - p;  // top
        sprite.x = Math.floor(dx / 2);  // centre
        sprite.y = dy > 0 ? dy : 0;     // bottom, but show top
    };

    /**
     * @param {Game_Actor} actor Reference actor.
     * @returns {Bitmap} Corresponding bitmap.
     */
    const loadPortrait = function(actor) {
        const f = actor.faceName();
        // Cae_Tweaks D09 compatibility (face from enemy image).
        if (CAE.Tweaks.D09) {
            const e = CAE.Tweaks.D09.RX.exec(f);
            if (e)
                return ImageManager.loadEnemy((e[1] || "") + e[2]);
        }
        // If face is assigned, use picture "<name>_<index+1>.png".
        if (f)
            return ImageManager.loadPicture(`${f}_${actor.faceIndex() + 1}`);
        // Otherwise use blank image.
        return ImageManager._emptyBitmap;
    };

    // Override - rework face into background portrait.
    Window_EquipStatus.prototype.drawActorFace = function() {
        // update portrait
        const   a = this._actor;
        const bmp = loadPortrait(a);
        const spr = this._portrait;
        if (bmp) {  // jic
            spr.bitmap = bmp;
            bmp.addLoadListener(onPortraitLoad.bind(
                this,
                spr,
                this.innerWidth,
                this.innerHeight,
                0
            ));
        }
        // let's put icons in the space under the name, why not
        const r = this.itemLineRect(0);
        this.drawActorIcons(a, r.x, r.height, r.width);
    };

    // Patch - add sprite for portrait.
    void (alias => {
        Window_EquipStatus.prototype.initialize = function() {
            alias.apply(this, arguments);
            this._contentsBackSprite.addChild(
                this._portrait = new Sprite()
            );
            this._portrait.opacity = 64;
        };
    })(Window_EquipStatus.prototype.initialize);

    // Patch - move stat block up.
    void (alias => {
        Window_EquipStatus.prototype.paramY = function(index, ...args) {
            return alias.call(this, index - 3.2, ...args);
        };
    })(Window_EquipStatus.prototype.paramY);

    // Patch - support proper presentation of ex-params HIT & EVA.
    void (alias => {
        Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
            if (paramId >= 8) {
                const w = this.paramWidth();
                const p = this._actor.xparam(paramId - 8);
                const v = Math.floor(p * 100);
                this.resetTextColor();
                this.drawText(`${v}%`, x, y, w, "right");
            } else
                alias.apply(this, arguments);
        };
    })(Window_EquipStatus.prototype.drawCurrentParam);
    void (alias => {
        Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
            if (paramId >= 8) {
                const w = this.paramWidth();
                const p = this._tempActor.xparam(paramId - 8);
                const d = p - this._actor.xparam(paramId - 8);
                const v = Math.floor(p * 100);
                this.changeTextColor(ColorManager.paramchangeTextColor(d));
                this.drawText(`${v}%`, x, y, w, "right");
            } else
                alias.apply(this, arguments);
        };
    })(Window_EquipStatus.prototype.drawNewParam);

    // Patch - include MHP, MMP, HIT, and EVA.
    Window_EquipStatus.prototype.drawAllParams = function() {
        // this suffices because HIT & EVA terms are already in the database
        for (let i = 10; i--;) {
            const x = this.itemPadding();
            const y = this.paramY(i);
            this.drawItem(x, y, i);
        }
    };

})();

// Q06) Pause audio/video when game loses focus.
void (() => { if (!CAE.Tweaks.Q06) return;
'use strict';

    // While testing, the audio (BGM, BGS) would resume correctly,
    //   but if I left it some time before resuming it was extremely quiet/inaudible.
    // Problem stopped on disabling my system's audio driver "enhancements".

    /** Tracks game active status, for applying pause. */
    let isActive = true;

    /**
     * New non-conflicting `WebAudio` property identifier.
     *
     * - The original `setTimeout` end timer system has been replaced by the
     * native `AudioContext` timing, providing improved precision and central
     * control.
     * <br>
     * - The core scripts already attach an `onended` context event handler
     * for software-decoded sources (`libs/vorbisdecoder.js`), because they
     * are decoded in chunks.
     *
     * This property is used as a flag for a new `onended` handler
     * that incorporates both mechanics.
     */
    const SHOULD_LOOP = Symbol();

    /** @returns {AudioContext} game audio context */
    const getAudioContext = function() {
        return WebAudio._context;
    };

    /**
     * Pauses/resumes all audio under `context` based on `active` value.
     * @param {AudioContext} context reference audio context
     * @param {boolean} active `false` iff game is currently paused
     */
    const pauseAudio = function(context, active) {
        const running = context.state === 'running';
        if (active && !running)
            context.resume().then(() => isActive = true);
        else if (running)
            context.suspend().then(() => isActive = false);
    };

    /**
     * Pauses/resumes core video element based on `active` value.
     * @param {boolean} active `false` iff game is currently paused
     */
    const pauseVideo = function(active) {
        // rely on core resume functionality (valid user gesture, e.g. click)
        if (!active && Video.isPlaying())
            Video._element.pause();
    };

    /** Updates audio & video pause status. */
    const update = function() {
        const active = SceneManager.isGameActive();
        if (active !== isActive)
            pauseAudio(getAudioContext(), active);
        if (!active)
            pauseVideo(active);
    };

    /**
     * Runs when an applicable source node ends.
     * @this {WebAudio}
     * @param {number} index source node index
     */
    const onAudioEnd = function(index) {
        if (SHOULD_LOOP in this) {
            // This is the original onended event handler, for script-decoded loops.
            this._createSourceNode(index);
            this._startSourceNode(index);
        } else {
            // This replaces the original setTimeout method,
            // so that end timers respect pause of context.
            const endTime = this._startTime + this._totalTime / this._pitch;
            if (WebAudio._currentTime() >= endTime)
                this.stop();
        }
    };

    // Patch - visibility change pause/resume hooks, e.g. minimise window.
    void (alias => {
        WebAudio._onHide = function() {
            alias.apply(this, arguments);
            update();
        };
    })(WebAudio._onHide);
    void (alias => {
        WebAudio._onShow = function() {
            alias.apply(this, arguments);
            update();
        };
    })(WebAudio._onShow);

    // Patch - focus change pause/resume hook, e.g. focus different window.
    void (alias => {
        SceneManager.update = function(deltaTime) {
            alias.apply(this, arguments);
            update();
        };
    })(SceneManager.update);

    // Override - assign "onended" event handler to onAudioEnd (see above).
    // A new flag (SHOULD_LOOP symbol) is set for software decoding (libs/vorbisdecoder.js).
    // This flag determines the behaviour of onAudioEnd.
    WebAudio.prototype._startSourceNode = function(index) {
        delete this[SHOULD_LOOP];                                       // <- edit 1 of 3
        const sourceNode = this._sourceNodes[index];
        const seekPos = this.seek();
        const currentTime = WebAudio._currentTime();
        const loop = this._loop;
        const loopStart = this._loopStartTime;
        const loopLength = this._loopLengthTime;
        const loopEnd = loopStart + loopLength;
        const pitch = this._pitch;
        let chunkStart = 0;
        for (let i = 0; i < index; i++) {
            chunkStart += this._buffers[i].duration;
        }
        const chunkEnd = chunkStart + sourceNode.buffer.duration;
        let when = 0;
        let offset = 0;
        let duration = sourceNode.buffer.duration;
        if (seekPos >= chunkStart && seekPos < chunkEnd - 0.01) {
            when = currentTime;
            offset = seekPos - chunkStart;
        } else {
            when = currentTime + (chunkStart - seekPos) / pitch;
            offset = 0;
            if (loop) {
                if (when < currentTime - 0.01) {
                    when += loopLength / pitch;
                }
                if (seekPos >= loopStart && chunkStart < loopStart) {
                    when += (loopStart - chunkStart) / pitch;
                    offset = loopStart - chunkStart;
                }
            }
        }
        if (loop && loopEnd < chunkEnd) {
            duration = loopEnd - chunkStart - offset;
        }
        if (this._shouldUseDecoder()) {
            if (when >= currentTime && offset < duration) {
                sourceNode.loop = false;
                sourceNode.start(when, offset, duration);
                if (loop && chunkEnd > loopStart) {
                    this[SHOULD_LOOP] = true;                           // <- edit 2 of 3
                    sourceNode.onended = onAudioEnd.bind(this, index);  // <- edit 3 of 3
                }
            }
        } else {
            if (when >= currentTime && offset < sourceNode.buffer.duration) {
                sourceNode.start(when, offset);
            }
        }
        chunkStart += sourceNode.buffer.duration;
    };

    // Override - end timer now fires via "onended" event.
    // This allows it to respect AudioContext timing changes, e.g. pause/resume.
    WebAudio.prototype._createEndTimer = function() {
        if (!this._loop)
            this._sourceNodes.forEach((source, n) => {
                source.onended = onAudioEnd.bind(this, n);
            }, this);
    };

})();

// Q07) Disable WindowLayer masking. (Core MZ has few overlaps anyway, e.g. ally target.)
void (() => { if (!CAE.Tweaks.Q07) return;
    delete WindowLayer.prototype.render;
})();

// Q08) Select final item when cursorDown fails in selectable windows.
void (() => { if (!CAE.Tweaks.Q08) return;
    const alias = Window_Selectable.prototype.cursorDown;
    Window_Selectable.prototype.cursorDown = function(wrap) {
        const pre = this.index();
        alias.apply(this, arguments);
        if (this.index() === pre && this.row() !== this.maxRows())
            this.select(this.maxItems() - 1);
    };
})();

// Q09) Process text codes in any window.
void (() => { if (!CAE.Tweaks.Q09) return;
'use strict';

    // NB: this does not change window refresh timings!
    // E.g. if you change variable 1, do not expect a drawn \v[1] to immediately update.

    /**
     * Determines which approach is used:
     * - `true`: allow text codes in any game window.
     * - `false`: allow text codes in currency unit & enemy select window.
     *
     * `true` will forfeit the default "squashing" of text in narrow spaces,
     * so may not be desirable.
     */
    const ANY_WINDOW = !CAE.Tweaks.Q09.LEGACY;

    // Legacy - apply only to specific windows (currency & enemy select).
    void (() => { if ( ANY_WINDOW) return;

        // Currency unit.
        Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
            const unitWidth = Math.min(80, this.textSizeEx(unit).width);    // <- edit 1 of 2
            this.resetTextColor();
            this.drawText(value, x, y, width - unitWidth - 6, "right");
            this.changeTextColor(ColorManager.systemColor());
            this.drawTextEx(unit, x + width - unitWidth, y, unitWidth);     // <- edit 2 of 2
        };

        // Enemy select window.
        Window_BattleEnemy.prototype.drawItem = function(index) {
            this.resetTextColor();
            const name = this._enemies[index].name();
            const rect = this.itemLineRect(index);
            this.drawTextEx(name, rect.x, rect.y, rect.width);  // <- edit 1 of 1
        };

    })();

    // New approach - text codes in any window. Text will NOT squash when space is limited!
    void (() => { if (!ANY_WINDOW) return;

        // Note that things like \c[n] may "leak" into following text. You can manually add, like, \c[0].

        /**
         * Non-conflicting identifier for "block colour reset" flag on `Window_Base`.
         *
         * This is to allow support for changes to font size/face:
         * - without retaining size/face changes indefinitely; and
         * - while retaining the prescribed `drawText` colour.
         * @since v14
         */
        const SYM_BLOCK_COLOUR_RESET = Symbol();

        /**
         * Non-conflicting identifier for "don't reset font" flag on `Window_Base`.
         *
         * This is to permit retention of default colours.
         */
        const SYM_TRUE_DRAWING = Symbol();

        /**
         * Non-conflicting identifier for new flag on `Window_Base` to toggle `textWidth` patch.
         *
         * Also suppresses font colour reset from `textSizeEx`.
         */
        const SYM_TRUE_MEASURE = Symbol();

        // Get text alignment functions from shared namespace.
        const { alignMult, adjustX } = CAE.Tweaks.Utils;

        // Patch - redirect string `drawText` calls to `drawTextEx`.
        void (alias => {
            Window_Base.prototype.drawText = function(text = "", x = 0, y = 0, maxWidth = 0, align = "left") {
                if (text && typeof text === "string") {
                    this[SYM_BLOCK_COLOUR_RESET] = true;
                    this.resetFontSettings();
                    this[SYM_TRUE_DRAWING] = true;
                    /** Empty space in text draw area. @type {number} */
                    const e = maxWidth - this.textSizeEx(text).width;
                    /** Alignment multiplier. @type {number} */
                    const a = alignMult(text, align);
                    this.drawTextEx(text, adjustX(x, e, a), y, maxWidth);
                    delete this[SYM_TRUE_DRAWING];
                    delete this[SYM_BLOCK_COLOUR_RESET];
                } else
                    alias.apply(this, arguments);
            };
        })(Window_Base.prototype.drawText);
        // Incidentally: I see Window_EquipSlot#drawItem passes `align = rect.height`. O_o

        // Patch - account for text codes when measuring any game window text.
        void (alias => {
            Window_Base.prototype.textWidth = function(text) {
                if (this[SYM_TRUE_MEASURE]) // measure a piece of "decoded" text
                    return alias.apply(this, arguments);
                return this.textSizeEx(text).width;
            };
        })(Window_Base.prototype.textWidth);
        void (alias => {
            Window_Base.prototype.textSizeEx = function(text) {
                this[SYM_TRUE_MEASURE] = true;
                const r = alias.apply(this, arguments);
                delete this[SYM_TRUE_MEASURE];
                return r;
            };
        })(Window_Base.prototype.textSizeEx);

        // Patch - suppress reset of font properties when appropriate.
        void (alias => {
            Window_Base.prototype.resetTextColor = function() {
                if (
                    !this[SYM_BLOCK_COLOUR_RESET] &&
                    !this[SYM_TRUE_DRAWING] &&
                    !this[SYM_TRUE_MEASURE]
                )
                    alias.apply(this, arguments);
            };
        })(Window_Base.prototype.resetTextColor);
        void (alias => {
            Window_Base.prototype.resetFontSettings = function() {
                if (
                    !this[SYM_TRUE_DRAWING] &&
                    !this[SYM_TRUE_MEASURE]
                )
                    alias.apply(this, arguments);
            };
        })(Window_Base.prototype.resetFontSettings);

        // Patch - convert text codes if applicable, then remove all remaining.
        // (By default Sprite_Name is only used in the battle status window.)
        void (alias => {
            Sprite_Name.prototype.name = function() {
                let txt = alias.apply(this, arguments);
                const w = this.parent?.parent;  // assume inner child
                if (w)
                    txt = w.convertEscapeCharacters(txt);
                return removeTextCodes(txt);
            };
        })(Sprite_Name.prototype.name);
        // [ ] Q09 - would be nice to be able to use window textEx features in sprites (name, gauge) but I see no easy way to do that - temp window instance, blit canvas-to-canvas? Also, name uses colours (dying/dead).

        // [ ] Q09 - this Sprite_Gauge patch works, but bloats gaugeX because we don't have textSizeEx on a sprite. .-. Would need some kind of canvas transfer from `w`?
        // CAE.Tweaks.Utils.patchOnBoot( // compatibility with Q46
        //     "Sprite_Gauge.prototype.label",
        //     alias => function() {
        //         let txt = alias.apply(this, arguments);
        //         const w = this.parent?.parent;  // assume inner child
        //         if (w)
        //             txt = w.convertEscapeCharacters(txt);
        //         return removeTextCodes(txt);
        //     }
        // );

    })();

    /**
     * @param {string} text
     * Input text.
     * @returns {string}
     * Input text formatted as through the first stage of `convertEscapeCharacters`.
     */
    const preConvert = function(text) {
        return text.replace(/\\/g, "\x1b").replace(/\x1b\x1b/g, "\\");
    };

    /**
     * @param {string} text
     * Input text.
     * @returns {string}
     * Input text with conventional text codes removed.
     */
    const removeTextCodes = function(text) {
        return preConvert(text).replace(/\x1b([$.|^!><{}\\]|[A-Z]+)(\[\d+\])?/gi, "");
    };

    /** Local flag for tracking `convertEscapeCharacters` state. */
    let converting = false;

    // Patch - display text codes in currency unit when shown via \G.
    void (alias => {
        Window_Base.prototype.convertEscapeCharacters = function(text) {
            const u = $dataSystem.currencyUnit;
            $dataSystem.currencyUnit = preConvert(u);
            converting = true;
            const r = alias.apply(this, arguments);
            converting = false;
            $dataSystem.currencyUnit = u;
            return r;
        };
    })(Window_Base.prototype.convertEscapeCharacters);

    // Patch - display text codes in actor names when shown via \N or \P.
    void (alias => {
        Window_Base.prototype.actorName = function(n) {
            const r = alias.apply(this, arguments);
            if (converting)
                return preConvert(r);
            return r;
        };
    })(Window_Base.prototype.actorName);
    void (alias => {
        Window_Base.prototype.partyMemberName = function(n) {
            const r = alias.apply(this, arguments);
            if (converting)
                return preConvert(r);
            return r;
        };
    })(Window_Base.prototype.partyMemberName);

})();

// Q10) Map fast-forward suppression.
void (() => { if (!CAE.Tweaks.Q10) return;
    Scene_Map.prototype.isFastForward = function() { return false; };
})();

// Q11) Attack animation trait tags <attack anim base: X>, <attack anim plus: X>.
void (() => { if (!CAE.Tweaks.Q11) return;
'use strict';

    /**
     * Tag name for base attack animation ID.
     * Use on Actor/Class/Weapon/Armor/State/Enemy/Skill/Item.
     *
     * Applies for enemies, or actors without a weapon.
     * @type {string}
     */
    const TAG_NAME_BASE = CAE.Tweaks.Q11["tag_attack anim base"] || "attack anim base";

    /**
     * Tag name for additive bonus to attack animation ID.
     * Use on Actor/Class/Weapon/Armor/State/Enemy/Skill/Item.
     *
     * E.g. for an elemental power-up state.
     * @type {string}
     */
    const TAG_NAME_PLUS = CAE.Tweaks.Q11["tag_attack anim plus"] || "attack anim plus";    // e.g. ice power-up state

    /** Animations with names matching this expression will not be offset. @type {RegExp} */
    const RX_NO_OFFSET = CAE.Tweaks.Q11.RX_NO_OFFSET;

    /** @returns {?$dataItem|$dataSkill} Item/Skill reference for current action, or `null`. */
    const getActionItem = function() {
        return BattleManager._action?.item() ?? null;
    };

    /**
     * @param {object} o
     * Reference meta-bearing object
     * @param {boolean} isBase -
     * - `true` => read {@linkcode TAG_NAME_BASE},
     * - `false` => read {@linkcode TAG_NAME_PLUS}.
     * @returns {?number}
     * Animation ID/offset from tag, or `null`.
     */
    const parseTag = function(o, isBase = false) {
        const v = parseInt(o?.meta[isBase ? TAG_NAME_BASE : TAG_NAME_PLUS]);
        return isNaN(v) ? null : v;
    };

    /**
     * Returns largest applicable value from `dFault` or tags.
     * @param {Game_Battler} battler
     * Reference battler.
     * @param {number} [dFault=1]
     * Base value if no tags found (default: 1).
     * @returns {number}
     * Override base value for animation ID.
     */
    const getAttackAnimBase = function(battler, dFault = 1) {
        const i = parseTag(getActionItem(), true);
        if (i)
            return i;   // has tag from item/skill - specific beats general
        return battler.traitObjects().reduce((a, c) => {
            const v = parseTag(c, true);
            return v > a ? v : a;
        }, dFault);
    };

    /**
     * Returns largest applicable offset.
     * @param {Game_Battler} battler
     * Reference battler.
     * @returns {number}
     * Additive offset for attack animation ID.
     */
    const getAttackAnimOffset = function(battler) {
        const i = parseTag(getActionItem(), false);
        if (i)
            return i;   // has tag from item/skill - specific beats general
        return battler.traitObjects().reduce((a, c) => {
            const v = parseTag(c, false);
            return v > a ? v : a;
        }, 0);
    };

    /**
     * @param {number} animId
     * Base animation ID.
     * @returns {boolean}
     * `true` iff offsets are OK for this animation ID.
     */
    const allowOffset = function(animId) {
        const s = $dataAnimations[animId];
        return s && !RX_NO_OFFSET.test(s.name);
    };

    /**
     * @param {Game_Enemy} subject
     * Reference enemy.
     * @returns {number}
     * Attack animation ID
     */
    Game_Enemy.prototype.attackAnimationId1 = function() {
        const base = getAttackAnimBase(this);
        if (!allowOffset(base))
            return base;       // e.g. no animation.
        return base + getAttackAnimOffset(this);
    };

    // Patch - let enemies show attack animation (mirroring is done via anim target check).
    void (alias => {
        Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
            alias.apply(this, arguments);
            this.showNormalAnimation(targets, subject.attackAnimationId1());
        };
    })(Window_BattleLog.prototype.showEnemyAttackAnimation);

    // Patch - override bare hands attack animation for actors.
    void (alias => {
        Game_Actor.prototype.bareHandsAnimationId = function() {
            return getAttackAnimBase(this, alias.apply(this, arguments));
        };
    })(Game_Actor.prototype.bareHandsAnimationId);

    // Patch - apply offsets for actor attack animations.
    void (alias => {
        Game_Actor.prototype.attackAnimationId1 = function() {
            const base = alias.apply(this, arguments);
            if (!allowOffset(base))
                return base;   // e.g. weapon anim 0.
            return base + getAttackAnimOffset(this);
        };
    })(Game_Actor.prototype.attackAnimationId1);
    void (alias => {
        Game_Actor.prototype.attackAnimationId2 = function() {
            const base = alias.apply(this, arguments);
            if (!allowOffset(base))
                return base;   // e.g. no secondary weapon.
            return base + getAttackAnimOffset(this);
        };
    })(Game_Actor.prototype.attackAnimationId2);

    // Override - off-hand attack anims are mirrored? No thanks. O_o
    Window_BattleLog.prototype.showActorAttackAnimation = function(subject, targets) {
        this.showNormalAnimation(targets, subject.attackAnimationId1());
        this.showNormalAnimation(targets, subject.attackAnimationId2());
    };

})();

// Q12) Show quit game command on title & via pause menu (non-web).
void (() => { if (!CAE.Tweaks.Q12 || !Utils.isNwjs()) return;
'use strict';

    /** Command symbol (for binding handlers). */
    const SYM = CAE.Tweaks.Q12.SYM;

    /** Display name for title command. */
    const TXT_TITLE = CAE.Tweaks.Q12.TXT_TITLE;

    /** Display name for "game end" command. */
    const TXT_END   = CAE.Tweaks.Q12.TXT_END;

    /**
     * Quits the game.
     * @this {Scene_Base}
     */
    const quitResponse = function() {
        this.fadeOutAll();
        SceneManager.exit();
    };

    /**
     * Adds quit handler for command window on `scene`.
     * @param {Scene_Title|Scene_GameEnd} scene reference scene instance
     */
    const addQuitHandler = function(scene) {
        scene._commandWindow.setHandler(SYM, quitResponse.bind(scene));
    };

    // Pause menu.
    void (() => { if (!TXT_END) return;

        // Add command.
        void (alias => {
            Window_GameEnd.prototype.makeCommandList = function() {
                alias.apply(this, arguments);
                this.addCommand(TXT_END, SYM);
                const n = this._list.findIndex(c => c.symbol === SYM);
                if (n >= 0 && n !== 1)
                    this._list.splice(1, 0, this._list.splice(n, 1)[0]);
            };
        })(Window_GameEnd.prototype.makeCommandList);

        // Add handler.
        void (alias => {
            Scene_GameEnd.prototype.createCommandWindow = function() {
                alias.apply(this, arguments);
                addQuitHandler(this);
            };
        })(Scene_GameEnd.prototype.createCommandWindow);

        // Accommodate new command.
        void (alias => {
            Scene_GameEnd.prototype.commandWindowRect = function() {
                const rect = alias.apply(this, arguments);
                rect.height += Window_Selectable.prototype.itemHeight();
                return rect;
            };
        })(Scene_GameEnd.prototype.commandWindowRect);

    })();

    // Title screen.
    void (() => { if (!TXT_TITLE) return;

        // Add command.
        void (alias => {
            Window_TitleCommand.prototype.makeCommandList = function() {
                alias.apply(this, arguments);
                this.addCommand(TXT_TITLE, SYM, true);
            };
        })(Window_TitleCommand.prototype.makeCommandList);

        // Add handler.
        void (alias => {
            Scene_Title.prototype.createCommandWindow = function() {
                alias.apply(this, arguments);
                addQuitHandler(this);
            };
        })(Scene_Title.prototype.createCommandWindow);

        // Accommodate new command.
        void (alias => {
            Scene_Title.prototype.commandWindowRect = function() {
                const rect = alias.apply(this, arguments);
                rect.height += Window_Selectable.prototype.itemHeight();
                return rect;
            };
        })(Scene_Title.prototype.commandWindowRect);

    })();

})();

// Q13) Show weather in battle (and allow Change Weather command).
void (() => { if (!CAE.Tweaks.Q13) return;
'use strict';

    // Might as well use these~
    Spriteset_Battle.prototype.createWeather = Spriteset_Map.prototype.createWeather;
    Spriteset_Battle.prototype.updateWeather = Spriteset_Map.prototype.updateWeather;

    // Create it
    void (alias => {
        Spriteset_Battle.prototype.createLowerLayer = function() {
            alias.apply(this, arguments);
            this.createWeather();
        };
    })(Spriteset_Battle.prototype.createLowerLayer);

    // Update it
    void (alias => {
        Spriteset_Battle.prototype.update = function() {
            alias.apply(this, arguments);
            this.updateWeather();
        };
    })(Spriteset_Battle.prototype.update);

    // Core disables Change Weather event command in battle... >_>
    Game_Interpreter.prototype.command236 = function(params) {
        $gameScreen.changeWeather(params[0], params[1], params[2]);
        if (params[3])
            this.wait(params[2]);
        return true;
    };

})();

// Q14) Message codes: \af[n], \pf[n] = actor/party face; \s[n] = speed; \align[0|1|2] = left/middle/right.
void (() => { if (!CAE.Tweaks.Q14) return;
'use strict';

    /** Text code map, to avoid arbitrary inlined constants. */
    const TC = Object.freeze({
        AF: "AF",
        PF: "PF",
        S: "S",
        ALIGN: "ALIGN"
    });

    /**
     * Affects new `\af` and `\pf` text codes:
     * - `true`: use the actor's face index.
     * - `false`: use the message's face index.
     * Intended to facilitate use of "expression" facesets.
     */
    const ACTOR_FACE_INDEX = CAE.Tweaks.Q14.ACTOR_FACE_INDEX;

    /** Default message alignment: `0` = left, `1` = middle, `2` = right. */
    const ALIGN_DFAULT = CAE.Tweaks.Q14.ALIGN_DFAULT;

    /** Non-conflicting identifier for storing message window "wait frames per character". */
    const SYM_CHAR_WAIT = Symbol();

    /** Non-conflicting identifier for new "line width" property on `textState`. */
    const SYM_LW = Symbol();

    /** Non-conflicting identifier for new "text align" property on `textState`. */
    const SYM_TA = Symbol();

    /** Non-conflicting identifier for new "offset newLineX" method on `Window_Message`. */
    const SYM_M_OFFSET_X = Symbol();

    /* Note: for full "face on right" treatment in non-RTL contexts
     * you'd also need to adjust `newLineX` of `Window_Message`. */
    /**
     * Because there's no core method for this... >_>
     * @param {Window_Message} w reference window
     * @returns {[number,number,number,number]} x, y, width, height of face area
     */
    const faceCoords = function(textState, w) {
        return [
            textState.rtl ? w.innerWidth - width - 4 : 4,
            0,
            ImageManager.faceWidth,
            w.innerHeight
        ];
    };

    /**
     * Assigns new message face based on given actor.
     * @param {Game_Actor} actor reference actor
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     */
    const setMsgFaceByActor = function(actor, textState, w) {
        if (textState.drawing && (actor instanceof Game_Actor)) {
            const sFace = actor.faceName();
            const iFace = ACTOR_FACE_INDEX ? actor.faceIndex() : $gameMessage.faceIndex();
            $gameMessage.setFaceImage(sFace, iFace);
            w.contents.clearRect(...faceCoords(textState, w));
            // Window_Message waits for _faceBitmap to load before proceeding
            w._faceBitmap = ImageManager.loadFace(sFace);
        }
    };

    /**
     * Processes new text code `\AF[n]`.
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     */
    const tcAF = function(textState, w) {
        const id = w.obtainEscapeParam(textState);
        setMsgFaceByActor($gameActors.actor(id), ...arguments);
    };

    /**
     * Processes new text code `\PF[n]`.
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     */
    const tcPF = function(textState, w) {
        const pos = w.obtainEscapeParam(textState);
        setMsgFaceByActor($gameParty.members()[pos - 1], ...arguments);
    };

    /**
     * Sets the character wait value for given `Window_Message`.
     * @param {object} textState tracks draw coords etc
     * @param {number} value value read from \S[n] message code.
     */
    const setCharWait = function(textState, value) {
        if (typeof value !== "number" || value < 2)
            delete textState[SYM_CHAR_WAIT];
        else
            textState[SYM_CHAR_WAIT] = (value - 1) | 0;
    };

    /**
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     * @returns {boolean} `true` iff should apply character wait time.
     */
    const shouldApplyCharWait = function(textState, w) {
        return w.shouldBreakHere(textState) && !w.isEndOfText(textState);
    };

    /**
     * Applies extra wait time per character, when appropriate.
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     * @returns {boolean} `true` iff wait time was applied.
     */
    const applyCharWait = function(textState, w) {
        if (!shouldApplyCharWait(...arguments))
            return false;
        const f = textState[SYM_CHAR_WAIT];
        if (Number.isFinite(f)) {
            w._waitCount += f;
            return true;
        }
        return false;
    };

    /**
     * Processes new text code `\S[n]`.
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     */
    const tcS = function(textState, w) {
        setCharWait(textState, w.obtainEscapeParam(textState));
    };

    /**
     * @param {object} Stores text drawing info.
     * @returns {string} Next/current line of text.
     */
    const getLine = function(textState) {
        const s = textState.text.slice(textState.index);
        const x = new RegExp("^\n?(.*?)(?:\x1b" + TC.ALIGN + "|\n)", "i");
        const r = x.exec(s);
        return r ? r[1] : s;
    };

    /**
     * Assigns horizontal alignment for Show Text:
     * - `\align[0]` = left (default)
     * - `\align[1]` = centre
     * - `\align[2]` = right
     *
     * Applies for the rest of that message.\
     * Gives priority to core codes `\px[n]` & `\py[n]`.
     *
     * Alignment change will affect X position immediately.\
     * Intended for use at the start of a line.
     * @param {object} textState tracks draw coords etc
     * @param {Window_Message} w reference window instance
     */
    const tcAlign = function(textState, w) {
        const v = w.obtainEscapeParam(textState);
        if (textState.drawing) {    // <- don't want to mess up width measurement
            textState[SYM_TA] = (v || 0).clamp(0, 2);
            delete textState[SYM_LW];
            textState.x = w.newLineX(textState);    // full-width left|mid|right
        }
    };

    /**
     * For `\align[n]`.
     * @param {object} textState tracks draw coords etc
     * @param {number} areaWidth full width of draw area (px)
     * @returns {number} additive offset for `newLineX` based on current alignment setting.
     */
    Window_Message.prototype[SYM_M_OFFSET_X] = function(textState, ox) {
        const am = textState[SYM_TA] ??= ALIGN_DFAULT;
        if (!am)
            return 0;
        const aw = (textState.rtl ? ox : this.innerWidth - ox) - this.margin;
        const lw = textState[SYM_LW] ??= this.textSizeEx(getLine(textState)).width;
        const dx = Math.floor(am * (aw - lw) / 2);
        return textState.rtl ? -dx : dx;
    };

    // Patch - auto-wait based on current text display speed (\s[n]).
    void (alias => {
        Window_Message.prototype.processCharacter = function(textState) {
            alias.apply(this, arguments);
            applyCharWait(textState, this);
        };
    })(Window_Message.prototype.processCharacter);

    // Patch - reset starting X value on new line (\align[n]).
    void (alias => {
        Window_Message.prototype.processNewLine = function(textState) {
            delete textState[SYM_LW];
            const x = this.newLineX(textState);
            alias.call(this, textState);
            textState.x = x;
        };
    })(Window_Message.prototype.processNewLine);

    // Patch - apply alignment offset by measuring line width (\align[n]).
    void (alias => {
        Window_Message.prototype.newLineX = function(textState) {
            const ox = alias.apply(this, arguments);
            return ox + this[SYM_M_OFFSET_X](textState, ox);
        };
    })(Window_Message.prototype.newLineX);

    // Patch - also clear text alignment & line width values (\align[n]).
    void (alias => {
        Window_Message.prototype.clearFlags = function() {
            alias.apply(this, arguments);
            const ts = this._textState;
            if (ts) {
                delete ts[SYM_LW];
                delete ts[SYM_TA];
            }
        };
    })(Window_Message.prototype.clearFlags);

    // Patch - process additional escape characters.
    CAE.Tweaks.Utils.patchOnBoot(   // compatibility with D16
        "Window_Message.prototype.processEscapeCharacter",
        alias => function(code, textState) {
            switch (code) {
                case TC.ALIGN:
                    tcAlign(textState, this); break;
                case TC.AF:
                    tcAF(textState, this); break;
                case TC.PF:
                    tcPF(textState, this); break;
                case TC.S:
                    tcS(textState, this); break;
                default:
                    alias.apply(this, arguments); break;
            }
        }
    );

})();

// Q15) Group duplicate drops in battle reward message and display their icons.
void (() => { if (!CAE.Tweaks.Q15) return;
'use strict';

    /** Message format: `%1` = count, `%2` = icon index, `%3` = name. @type {string} */
    const FORM = CAE.Tweaks.Q15.FORM;
    // "%1\xd7 \\i[%2]\u2009%3";

    BattleManager.displayDropItems = function() {
        /** @type {Map<$dataItem,number>} */
        const info = new Map();
        for (const item of this._rewards.items)
            info.set(item, (info.get(item) ?? 0) + 1);
        if (info.size) {
            $gameMessage.newPage();
            for (const [item, count] of info.entries())
                $gameMessage.add(
                    TextManager.obtainItem.format(
                        FORM.format(count, item.iconIndex, item.name)
                    )
                );
        }
    };

})();

// Q16) Simple on/off in-game option for audio dynamic range compression.
void (() => { if (!CAE.Tweaks.Q16) return;
'use strict';

    /** Symbol for this option. @type {string} */
    const KEY = CAE.Tweaks.Q16.KEY;

    /** Display text for this option. @type {string} */
    const TXT = CAE.Tweaks.Q16.TXT;

    /** Default value for this option. @type {boolean} */
    const DFAULT = CAE.Tweaks.Q16.DFAULT;

    /**
     * Replacement display values, instead of core ON/OFF.
     *
     * Only enabled if both keys (`true` and `false`) have truthy values.
     */
    const DISPLAY_VALUE = Object.freeze({
        [ true]: CAE.Tweaks.Q16.ONTEXT,    // e.g. "High",
        [false]: CAE.Tweaks.Q16.OFFTEXT    // e.g. "Low"
    });

    /** Compressor settings. @type {DynamicsCompressorOptions} */
    const OPTS = CAE.Tweaks.Q16.OPTS;
    // {
    //     attack:     0.003,  // [   0,  1] s  : time for -10dB
    //     release:    0.2,    // [   0,  1] s  : time for +10dB
    //     ratio:      20,     // [   1, 20]    : compression ratio
    //     threshold: -25,     // [-100,  0] dB : compression starts here
    //     knee:       30      // [   0, 40] dB : threshold smoothing
    // };

    /** If `true`, compressor is ON when option is OFF. @type {boolean} */
    const INVERT = CAE.Tweaks.Q16.INVERT;

    /** Private tracker for new config setting. @type {boolean} */
    let isOn = DFAULT;

    /** Points to compressor node, when active. @type {?DynamicsCompressorNode} */
    let compressor = null;

    // Default node graph: (source - gain - panner) > masterGain - out.
    // Connect compressor between masterGain and destination ----^

    /**
     * Adds compressor audio node.
     * @returns {boolean} `true` iff compressor node was added.
     */
    const add = function() {
        if (compressor)
            return false;
        compressor = new DynamicsCompressorNode(
            WebAudio._context, OPTS
        );
        WebAudio._masterGainNode.disconnect();
        WebAudio._masterGainNode.connect(compressor);
        compressor.connect(WebAudio._context.destination);
        return true;
    };

    /**
     * Removes compressor audio node.
     * @returns {boolean} `true` iff compressor node was removed.
     */
    const rem = function() {
        if (!compressor)
            return false;
        compressor.disconnect();
        WebAudio._masterGainNode.disconnect()
        WebAudio._masterGainNode.connect(WebAudio._context.destination);
        compressor = null;
        return true;
    };

    /** @returns {boolean} `true` iff audio node graph was updated. */
    const refresh = INVERT ? function() {
        return ConfigManager[KEY] ? rem() : add();
    } : function() {
        return ConfigManager[KEY] ? add() : rem();
    };

    // Patch - initialise.
    void (alias => {
        WebAudio.prototype._startPlaying = function() {
            refresh();
            alias.apply(this, arguments);
        };
    })(WebAudio.prototype._startPlaying);

    // Add config property.
    Object.defineProperty(ConfigManager, KEY, {
        get: function() {
            return !!isOn;
        },
        set: function(v) {
            const b = !!v;
            if (isOn !== b) {
                isOn = b;
                refresh();
            }
        },
        configurable: true
    });

    // Patch - include in config save data.
    void (alias => {
        ConfigManager.makeData = function() {
            const config = alias.apply(this, arguments);
            config[KEY] = this[KEY];
            return config;
        };
    })(ConfigManager.makeData);

    // Patch - read from loaded config data.
    void (alias => {
        ConfigManager.applyData = function(config) {
            alias.apply(this, arguments);
            this[KEY] = this.readFlag(config, KEY, DFAULT);
        };
    })(ConfigManager.applyData);

    // Patch - add to options menu, just after volume settings.
    void (alias => {
        Window_Options.prototype.addVolumeOptions = function() {
            alias.apply(this, arguments);
            this.addCommand(TXT, KEY);
        };
    })(Window_Options.prototype.addVolumeOptions);

    // Patch - accommodate new option in list.
    void (alias => {
        Scene_Options.prototype.maxCommands = function() {
            return alias.apply(this, arguments) + 1;
        };
    })(Scene_Options.prototype.maxCommands);

    // Patch - use replacement display values if provided.
    void (() => { if (!DISPLAY_VALUE[true] || !DISPLAY_VALUE[false]) return;
        const alias = Window_Options.prototype.statusText;
        Window_Options.prototype.statusText = function(index) {
            if (this.commandSymbol(index) === KEY)
                return DISPLAY_VALUE[this.getConfigValue(KEY)];
            return alias.apply(this, arguments);
        };
    })();

})();

// Q17) Options scene help description window.
void (() => { if (!CAE.Tweaks.Q17) return;
'use strict';

    /**
     * Number of rows by which to reduce maximum options window height.\
     * Added because help window may make things too cluttered.
     * @type {number}
     */
    const REDUCE_MAX_COMMANDS = CAE.Tweaks.Q17.REDUCE_MAX_COMMANDS;

    /**
     * Indexes "unknown"/"empty" description in {@linkcode DESC}.\
     * Referenced when the current command symbol is not found in the table.
     * @type {symbol}
     */
    const SYM_UNKNOWN = CAE.Tweaks.Q17.UNKNOWN;

    /** Reference table for help texts. @type {object.<sym,desc>} */
    const DESC = CAE.Tweaks.Q17.DESC;

    /**
     * @param {Scene_Options} scene reference scene instance
     * @returns {Rectangle} rect for help window.
     */
    const helpWindowRect = function(scene) {
        return new Rectangle(
            0,
            scene.helpAreaTop(),
            Graphics.boxWidth,
            scene.helpAreaHeight()
        );
    };

    /**
     * Creates and adds help window to `scene`, and
     * assigns it to that scene's `_optionsWindow`.
     * @param {Scene_Options} scene reference scene instance
     */
    const createHelpWindow = function(scene) {
        const w = scene._helpWindow = new Window_Help(helpWindowRect(scene));
        scene.addWindow(w);
        scene._optionsWindow.setHelpWindow(w);
    };

    // Patch - add help window.
    void (alias => {
        Scene_Options.prototype.create = function() {
            alias.apply(this, arguments);
            createHelpWindow(this);
        };
    })(Scene_Options.prototype.create);

    // Patch - move the options window to accommodate the newcomer.
    void (alias => {
        Scene_Options.prototype.optionsWindowRect = function() {
            const rect = alias.apply(this, arguments);
            const dy = this.mainAreaHeight() - rect.height >> 1;
            rect.y = this.mainAreaTop() + Math.max(0, dy);
            return rect;
        };
    })(Scene_Options.prototype.optionsWindowRect);

    // Patch - reduce options window height if applicable.
    void (() => { if (REDUCE_MAX_COMMANDS < 1) return;
        const alias = Scene_Options.prototype.maxVisibleCommands;
        Scene_Options.prototype.maxVisibleCommands = function() {
            return alias.apply(this, arguments) - REDUCE_MAX_COMMANDS;
        };
    })();

    // Override - update help description based on selected symbol.
    Window_Options.prototype.updateHelp = function() {
        const sym  = this.currentSymbol();
        const text = DESC[sym] ?? DESC[SYM_UNKNOWN]?.format(sym) ?? "?";
        this._helpWindow.setText(text);
    };

})();

// Q18) Enemy opacity trait notetag.
void (() => { if (!CAE.Tweaks.Q18) return;
'use strict';

    /** Enemy trait object tag name. */
    const TAG_NAME = CAE.Tweaks.Q18.tag_ghost || "ghost";

    /**
     * @param {object} o reference meta-bearing object.
     * @returns {number} opacity multiplier, or `NaN`.
     */
    const ghostFactorFromObject = function(o) {
        return Number(o.meta?.[TAG_NAME]);
    };

    /**
     * @param {object} o reference trait- or meta-bearing object
     * @returns {number} opacity multiplier
     */
    const ghostFactor = function(o) {
        let r = 1;
        if (o) {
            if (typeof o.traitObjects === 'function') {
                for (const c of o.traitObjects()) {
                    const n = ghostFactorFromObject(c);
                    if (!isNaN(n))
                        r *= n;
                }
                return r.clamp(0, 1);   // only clamp final result
            }
            const n = ghostFactorFromObject(o);
            if (!isNaN(n))
                return n.clamp(0, 1);
        }
        return r;
    };

    /**
     * Non-conflicting property identifier. Used for:
     * - battler "refresh opacity if needed" flag.
     * - sprite "unmodified opacity" value.
     */
    const SYM = Symbol();

    /**
     * Tags this battler as needing an opacity refresh.
     * @param {Game_Enemy} battler reference battler
     */
    const requestOpacityRefresh = function(battler) {
        battler[SYM] = true;
    };

    /**
     * @param {Sprite_Enemy} sprite reference sprite
     * @returns {boolean} `true` iff battler refresh flag was removed.
     */
    const refreshOpacity = function(sprite) {
        sprite.opacity = sprite[SYM] ??= sprite.opacity;    // interfaces with setter, below
        return delete sprite._battler[SYM];
    };

    /**
     * Refreshes opacity of sprite if their battler has requested it.
     * @param {Sprite_Enemy} sprite reference sprite
     * @returns {boolean} `true` iff refresh was performed.
     */
    const refreshOpacityIfNeeded = function(sprite) {
        if (SYM in sprite._battler)
            return refreshOpacity(sprite);
        return false;
    };

    /** Superclass reference for new opacity setter. */
    const S = Sprite_Battler.prototype;

    // When setting opacity, multiply by the ghost factor. WooOooOOooOOOoO~
    Object.defineProperty(Sprite_Enemy.prototype, "opacity", {
        get: function( ) {
            return Reflect.get(S, "opacity", this);
        },
        set: function(v) {
            Reflect.set(S, "opacity", (this[SYM] = v) * ghostFactor(this._battler), this);
        },
        configurable: true
    });

    // Opacity doesn't get set on battle start unless hidden.
    void (alias => {
        Sprite_Enemy.prototype.initVisibility = function() {
            alias.apply(this, arguments);
            refreshOpacity(this);
        };
    })(Sprite_Enemy.prototype.initVisibility);

    // Also update when states are changed.
    for (const m of ['clearStates', 'eraseState', 'addNewState'])
        void (alias => {
            Game_Enemy.prototype[m] = function() {
                alias.apply(this, arguments);
                requestOpacityRefresh(this);
            };
        })(Game_Enemy.prototype[m]);
    void (alias => {
        Sprite_Enemy.prototype.update = function() {
            alias.apply(this, arguments);
            refreshOpacityIfNeeded(this);
        };
    })(Sprite_Enemy.prototype.update);

})();

// Q19) Render at integer coordinates to avoid blur (e.g. centred Show Choices).
void (() => { if (!CAE.Tweaks.Q19) return;
    PIXI.settings.ROUND_PIXELS = true;
})();

// Q20) Show remaining turns on state/buff icons in battle.
void (() => { if (!CAE.Tweaks.Q20) return;
'use strict';

    // [ ] Q20 - add params to set turn display's position, font size, and opacity (+etc?).

    /**
     * Identifier for the property that points to
     * a state icon sprite's turn counter child sprite.
     */
    const SYM = Symbol();

    /** @type {string} States with this tag will not show turn counts. */
    const TAG_HIDE = CAE.Tweaks.Q20["tag_hide turns"] || "hide turns";

    /** @typedef {?number|string} TurnDisplayValue */
    /**
     * Turn count display value for states that do not auto-expire in battle.
     * @type {TurnDisplayValue}
     */
    const UNLIMITED = CAE.Tweaks.Q20.UNLIMITED;     // null, "\u221e"

    /** @returns {number} Turn counter font size. */
    const fontSize = function() {
        return 18;
    };

    /** @returns {string} Turn counter font face. */
    const fontFace = function() {
        return $gameSystem.numberFontFace();
    };

    /** @returns {number} Turn counter opacity. */
    const paintOpacity = function() {
        return 128;
    };

    /** @returns {Sprite} Turn counter sprite. */
    const createTurnSprite = function() {
        const b = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
        b.fontSize = fontSize();
        b.fontFace = fontFace();
        b.paintOpacity = paintOpacity();
        const s = new Sprite(b);
        s.anchor.set(0.5);
        return s;
    };

    /**
     * @param {Game_Battler} battler reference battler
     * @returns {number[]} Array of state/buff IDs. Buff IDs are inverted (`-1-n`).
     */
    const getIconObjIds = function(battler) {
        if (!(battler instanceof Game_Battler))
            return [];
        const s = battler.states().map(o => o.iconIndex > 0 ? o.id : 0);
        const b = battler._buffs.map((v, n) => v ? -1 - n : 0);
        return s.concat(b).filter(n => n);
    };

    /**
     * @param {number} n state/buff ID; buff IDs should be inverted (`-1-n`)
     * @param {Game_Battler} battler reference battler
     * @returns {TurnDisplayValue} Turn count value or display text.
     */
    const getTurns = function(n, battler) {
        if (!n)
            return null;
        if (n > 0) {
            const s = $dataStates[n];
            if (s.meta[TAG_HIDE])
                return null;
            if (!s.autoRemovalTiming)
                return UNLIMITED;
            return battler._stateTurns[n];
        }
        return battler._buffTurns[-1 - n];
    };

    /**
     * @param {number} n state/buff ID; buff IDs should be inverted (`-1-n`)
     * @param {Game_Battler} battler reference battler
     * @returns {TurnDisplayValue} Turn count value or display text.
     *
     * If `null` the value will not be displayed.
     */
    const getDisplayTurns = function(n, battler) {
        const v = getTurns(...arguments);
        switch (typeof v) {
            case "number":
            case "string":
                return v;
        }
        return null;
    };

    /**
     * Draws turn display value on given bitmap.
     * @param {Bitmap} bmp reference bitmap
     * @param {TurnDisplayValue} value value to display.
     */
    const drawTurns = function(bmp, value) {
        if (value !== null)
            bmp.drawText(value, 0, 0, bmp.width, bmp.height, "center");
    };

    // Add turn counter overlay.
    void (alias => {
        Sprite_StateIcon.prototype.initMembers = function() {
            alias.apply(this, arguments);
            this.addChild(this[SYM] = createTurnSprite());
        };
    })(Sprite_StateIcon.prototype.initMembers);

    // Update turn counter to match icon.
    void (alias => {
        Sprite_StateIcon.prototype.updateIcon = function() {
            alias.apply(this, arguments);
            const b = this[SYM].bitmap;
            b.clear();
            const a = this._battler;
            const n = getIconObjIds(a)[this._animationIndex];
            const v = getDisplayTurns(n, a);
            drawTurns(b, v);
        };
    })(Sprite_StateIcon.prototype.updateIcon);

    // Also destroy child (clears internal draw texture references).
    void (alias => {
        Sprite_StateIcon.prototype.destroy = function() {
            this[SYM].bitmap.destroy();
            delete this[SYM];
            alias.apply(this, arguments);
        };
    })(Sprite_StateIcon.prototype.destroy);

    // Slow down animation updates because there's more info now.
    Sprite_StateIcon.prototype.animationWait = function() {
        return 60;  // from 40
    };

})();

// Q21) Lowpass BGS filter to muffle BGS, e.g. indoor weather sounds.
void (() => { if (!CAE.Tweaks.Q21) return;
'use strict';

    /** Name of tag used to mark maps where the effect should be enabled. */
    const TAG_NAME = CAE.Tweaks.Q21.tag_muffleBGS || "muffleBGS";

    /** Active muffle filter frequency threshold. */
    const THRESHOLD = CAE.Tweaks.Q21.THRESHOLD; // 1350;

    /** Non-conflicting identifier for "should have muffler" buffer property. */
    const SYM = Symbol();

    // ...panner )> masterGain ... //
    // add here ^

    /**
     * Init values for filter.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode}
     */
    const OPTS = { type: "lowpass" };

    /**
     * Muffling filter.
     * @type {?BiquadFilterNode}
     */
    let muffler = null;

    /**
     * @param {WebAudio} buffer reference buffer
     * @param {BiquadFilterNode} filter reference filter
     * @returns {boolean} `true` iff filter is now disabled.
     */
    const disable = function(buffer, filter) {
        filter.frequency.value = buffer._sampleRate / 2;    // Nyquist
        return true;
    };

    /**
     * @param {WebAudio} buffer reference buffer
     * @param {BiquadFilterNode} filter reference filter
     * @returns {boolean} `true` iff filter is now enabled.
     */
    const enable = function(buffer, filter) {
        filter.frequency.value = THRESHOLD;
        return true;
    };

    /** @returns {boolean} `true` iff the muffler should be enabled. */
    const shouldEnable = function() {
        return !!$dataMap.meta[TAG_NAME];
    };

    /**
     * @param {WebAudio} buffer reference buffer
     * @param {BiquadFilterNode} filter reference filter
     * @returns {boolean} `true` iff update was successful.
     */
    const update = function(buffer, filter) {
        if (buffer && filter)
            return (shouldEnable() ? enable : disable)(...arguments);
        return false;
    };

    /** @returns {BiquadFilterNode} audio muffling filter. */
    const getMuffler = function() {
        return muffler ??= new BiquadFilterNode(WebAudio._context, OPTS);
    };

    /**
     * Adds muffling filter to the buffer's audio node graph.
     * @param {WebAudio} buffer reference buffer
     */
    const insertMuffler = function(buffer) {
        const p = buffer._pannerNode;
        const m = getMuffler();
        p.disconnect();
        p.connect(m);
        m.connect(WebAudio._masterGainNode);
        update(buffer, m);
    };

    /**
     * Local flag to inform WebAudio init of buffer type, for muffling purposes.
     *
     * Done like this to account for audio preload, buffer replacement, etc.
     */
    let makingBgs = false;

    // Patch - mark BGS buffer for filtering.
    void (alias => {
        AudioManager.playBgs = function(bgs) {
            makingBgs = true;
            alias.apply(this, arguments);
            makingBgs = false;
        };
    })(AudioManager.playBgs);
    void (alias => {
        WebAudio.prototype.initialize = function() {
            if (makingBgs)
                this[SYM] = true;
            alias.apply(this, arguments);
        };
    })(WebAudio.prototype.initialize);

    // Patch - if marked, add muffle filter to audio node graph.
    void (alias => {
        WebAudio.prototype._createPannerNode = function() {
            alias.apply(this, arguments);   // makes panner, connects to master gain
            if (SYM in this)
                insertMuffler(this);        // adds filter between panner & master gain
        };
    })(WebAudio.prototype._createPannerNode);

    // Patch - update muffling based on map notetag.
    void (alias => {
        Scene_Map.prototype.onMapLoaded = function() {
            alias.apply(this, arguments);
            update(AudioManager._bgsBuffer, getMuffler());
        };
    })(Scene_Map.prototype.onMapLoaded);

})();

// Q22) Battle: lower enemy display position.
void (() => { if (!CAE.Tweaks.Q22) return;
'use strict';

    /** Additive vertical offset (px). */
    const offset = CAE.Tweaks.Q22.OFFSET; // 24;

    // Offset enemy position.
    void (alias => {
        Game_Enemy.prototype.setup = function(enemyId, x, y, ...args) {
            alias.call(this, enemyId, x, y + offset, ...args);
        };
    })(Game_Enemy.prototype.setup);

    // Avoid hiding result popups behind status window.
    void (alias => {
        Sprite_Enemy.prototype.damageOffsetY = function() {
            return alias.apply(this, arguments) - offset;
        };
    })(Sprite_Enemy.prototype.damageOffsetY);

})();

// Q23) Tile offsets by terrain tag.
void (() => { if (!CAE.Tweaks.Q23) return;
'use strict';

    /** Name for event notetag, format `<offset: X, Y>` (px). @type {string} */
    const TAG_NAME = CAE.Tweaks.Q23.tag_offset || "offset";

    /** Lookup table: terrain `tag => [ x, y ]`. @type {object.<string,[x:number,y:number]>} */
    const DATA = CAE.Tweaks.Q23.DATA;

    /** Non-conflicting identifier for character offset cache. */
    const SYM = Symbol();

    /** Postfix memory for tiles shifted down and/or left. @type {*[][]} */
    const mem = [];

    /** Postfix flag: determines draw mode of down- and/or left-shifted tiles. @type {boolean} */
    let postfix = false;

    /**
     * Returns X & Y offsets for given tile, based on its terrain tag.
     * @param {number[]} flags reference tileset flags
     * @param {number} tileId reference tile ID
     * @returns {[x:number,y:number]} X/Y draw offsets (px).
     */
    const getTileOffset = function(flags, tileId) {
        return DATA[flags[tileId] >> 12] ?? [0, 0];
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @returns {[x:number,y:number]} X/Y destination offsets.
     */
    const getCharOffset = function(char) {
        if (char[SYM])
            return char[SYM];
        for (const tag of CAE.Tweaks.Utils.getEventTags(char, TAG_NAME, true))
            if (typeof tag === "string") {
                const a = Array.from(tag.split(","), s => parseInt(s, 10) || 0);
                switch (a.length) {
                    case 0:
                        break;
                    case 1:
                        a.push(0);
                        // fall-through
                    default:
                        return char[SYM] = a;
                }
            }
        return char[SYM] = [0, 0];
    };

    // Patch - offset tile draw destination.
    void (alias => {
        Tilemap.prototype._addTile = function(layer, tileId, dx, dy, ...args) {
            const [x, y] = getTileOffset(this.flags, tileId);
            if (!postfix && (x > 0 || y > 0))
                mem.push(arguments);
            else
                alias.call(this, layer, tileId, dx + x, dy + y, ...args);
        };
    })(Tilemap.prototype._addTile);

    // Patch - draw left-/down-shifted tiles afterwards.
    // This will draw on top of existing tiles on that layer.
    void (alias => {
        Tilemap.prototype._addAllSpots = function(startX, startY) {
            alias.apply(this, arguments);
            postfix = true;
            for (const args of mem)
                this._addTile(...args);
            mem.length = 0;
            postfix = false;
        };
    })(Tilemap.prototype._addAllSpots);

    // Patch - offset character sprite position.
    void (alias => {
        Sprite_Character.prototype.updatePosition = function() {
            alias.apply(this, arguments);
            const [cx, cy] = getCharOffset(this._character);
            this.x += cx;
            this.y += cy;
            if (this._tileId > 0) {
                const [tx, ty] = getTileOffset(
                    $gameMap.tileset().flags,
                    this._tileId
                );
                this.x += tx;
                this.y += ty;
            }
        };
    })(Sprite_Character.prototype.updatePosition);

    // Patch - update character offset cache on event page refresh.
    void (alias => {
        Game_Event.prototype.setupPage = function() {
            alias.apply(this, arguments);
            delete this[SYM];
        };
    })(Game_Event.prototype.setupPage);
    // [ ] Q23 - should this be refresh instead? setupPage doesn't necessarily fire on load! - ohhh, for map-to-map loads maybe?

})();

// Q24) Don't show MP/TP gauges on status menus if max is 0 for that resource.
void (() => { if (!CAE.Tweaks.Q24) return;

    // Patch - make value NaN, hence gauge invisible, for max-0 resources.
    const alias = Sprite_Gauge.prototype.currentValue;
    Sprite_Gauge.prototype.currentValue = function() {
        switch (this._statusType) {
            case "mp":
                if (this._battler.mmp === 0)
                    return NaN;
                break;
            case "tp":
                if (this._battler.maxTp() === 0)
                    return NaN;
                break;
        }
        return alias.apply(this, arguments);
    };

})();

// Q25) Segmented gauges.
void (() => { if (!CAE.Tweaks.Q25) return;
'use strict';

    /**
     * Segment size values for different gauge types (px).\
     * Gauge types not listed will not be segmented.
     * @type {object.<string,number>}
     */
    const SEGMENT_VALUE = CAE.Tweaks.Q25.VALUES;
    // { hp: 100, mp: 100, tp: 100, time: 0.25 };

    /** CSS colour for partitions. Blank => use gauge background colour. @type {string} @since v14 */
    const PARTITION_COLOUR = CAE.Tweaks.Q25.PARTITION_COLOUR;   // "black"

    /** Status types for which partitions should only be drawn on the filled area, e.g. overlays. @type {string[]} */
    const LIMIT_DRAW_RANGE_TYPES = CAE.Tweaks.Q25.LIMIT_DRAW_RANGE_TYPES; // ["tp"];

    /** Width of each partition between segments (px). @type {number} */
    const PARTITION_WIDTH = CAE.Tweaks.Q25.PARTITION_WIDTH; // 1;

    /** Minimum segment size (px). @type {number} */
    const MIN_SEGMENT_WIDTH = PARTITION_WIDTH;

    /** Non-conflicting identifier for new "partition value" property on `Sprite_Gauge`. */
    const SYM_P_PARTITION_VALUE = Symbol();

    /** Non-conflicting identifier for new "partition count" method on `Sprite_Gauge`. */
    const SYM_M_PARTITION_COUNT = Symbol();

    /** Non-conflicting identifier for new "segment width" method on `Sprite_Gauge`. */
    const SYM_M_SHOULD_SEGMENT = Symbol();

    /** Non-conflicting identifier for new "draw partition" method on `Sprite_Gauge`. */
    const SYM_M_DRAW_PARTITION = Symbol();

    /** Non-conflicting identifier for new "draw all partitions" method on `Sprite_Gauge`. */
    const SYM_M_DRAW_ALL_PARTITIONS = Symbol();

    /** Non-conflicting identifier for new "partition fill colour" method on `Sprite_Gauge`. */
    const SYM_M_PARTITION_COLOUR = Symbol();

    /** Non-conflicting identifier for new "limit draw range" method on `Sprite_Gauge`. */
    const SYM_M_DRAW_RATE = Symbol();

    /**
     * @param {number} value reference value
     * @returns {number} count of partitions displayed up to `value`.
     */
    Sprite_Gauge.prototype[SYM_M_PARTITION_COUNT] = function(value = this._maxValue) {
        if (value > 0) {
            const v = SEGMENT_VALUE[this._statusType];
            if (v > 0) {
                const f = value / v;
                return !f || f % 1 ? Math.floor(f) : f - 1;
            }
        }
        return 0;
    };

    /**
     * @param {number} width width of full gauge area (px).
     * @returns {boolean} `true` iff should segment this gauge.
     */
    Sprite_Gauge.prototype[SYM_M_SHOULD_SEGMENT] = function(width) {
        const v = SEGMENT_VALUE[this._statusType];
        if (v > 0)
            return v * width >= this._maxValue * MIN_SEGMENT_WIDTH;
        return false;
    };

    /** @returns {string} CSS colour for filling partitions. */
    Sprite_Gauge.prototype[SYM_M_PARTITION_COLOUR] = function() {
        return PARTITION_COLOUR || ColorManager.gaugeBackColor();
    };

    /**
     * @param {number} x centre X of partition
     * @param {number} y top Y of partition
     * @param {number} height height of partition
     */
    Sprite_Gauge.prototype[SYM_M_DRAW_PARTITION] = function(x, y, height) {
        this.bitmap.fillRect(
            Math.floor(x - PARTITION_WIDTH / 2),  // centred on x
            y,
            PARTITION_WIDTH,
            height,
            this[SYM_M_PARTITION_COLOUR]()
        );
    };

    /** @returns {number} fraction of gauge fill width that should be partitioned. */
    Sprite_Gauge.prototype[SYM_M_DRAW_RATE] = function() {
        if (
            LIMIT_DRAW_RANGE_TYPES.contains(this._statusType) &&
            this.constructor === Sprite_EnemyGauge   // cf Q30
        )
            return this.gaugeRate();
        return 1;
    };

    /**
     * @param {number} x starting X value
     * @param {number} y starting Y value
     * @param {number} width width of area to partition
     * @param {number} height height of area to partition
     * @returns {number} number of partitions drawn
     */
    Sprite_Gauge.prototype[SYM_M_DRAW_ALL_PARTITIONS] = function(x, y, width, height) {
        const c = this[SYM_M_PARTITION_COUNT]();
        if (c <= 0)
            return 0;
        const P = PARTITION_WIDTH;
        const w = width * this[SYM_M_DRAW_RATE]() - P;
        const r = width - P * (c + 1);
        const a = P + r * SEGMENT_VALUE[this._statusType] / this._maxValue;
        let n = 0;
        for (let dx = a; dx < w; dx += a, ++n)
            this[SYM_M_DRAW_PARTITION](x + dx, y, height);
        return n;
    };

    // Patch - visually segment gauge if appropriate.
    void (alias => {
        Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
            this[SYM_P_PARTITION_VALUE] = this[SYM_M_SHOULD_SEGMENT](width) ?
                PARTITION_WIDTH * this._maxValue / width : 0;
            alias.apply(this, arguments);
            if (this[SYM_P_PARTITION_VALUE])
                this[SYM_M_DRAW_ALL_PARTITIONS](
                    x + 1,
                    y + 1,
                    width - 2,
                    height - 2
                );
        };
    })(Sprite_Gauge.prototype.drawGaugeRect);

    // Override - don't fill partition areas.
    Sprite_Gauge.prototype.gaugeRate = function() {
        if (this.isValid()) {
            const max = this._maxValue;
            if (max > 0) {
                const pc1 = this[SYM_M_PARTITION_COUNT]();
                const pv1 = pc1 * this[SYM_P_PARTITION_VALUE];
                const now = this._value;
                const pc0 = this[SYM_M_PARTITION_COUNT](now);
                const pv0 = pc0 * this[SYM_P_PARTITION_VALUE];
                return (now + pv0) / (max + pv1);
            }
        }
        return 0;
    };

})();

// Q26) Simple "saving" indicator icon.
void (() => { if (!CAE.Tweaks.Q26) return;
'use strict';

    /** @enum {number} Save indicator status enumeration. */
    const STATUS = Object.freeze({
        DONE:     0,
        STARTING: 1,
        HOLDING:  2,
        ENDING:   3,
        FAILED:   128   // v16 - used internally on save failure
    });

    /** Save indicator properties. */
    const DATA = Object.freeze({

        /** Bitmap source path, without extension. */
        URL: CAE.Tweaks.Q26.URL, // 'icon/icon',

        /** Sprite anchor (both axes). */
        ANCHOR: CAE.Tweaks.Q26.ANCHOR, // 0,

        /** Sprite scale (both axes). */
        SCALE: CAE.Tweaks.Q26.SCALE, // 0.5

        /** Sprite status timings (frames). */
        T: Object.freeze({ // 15, 15, 15
            [STATUS.STARTING]: CAE.Tweaks.Q26.T1,
            [STATUS.HOLDING]:  CAE.Tweaks.Q26.T2,  // minimum
            [STATUS.ENDING]:   CAE.Tweaks.Q26.T3
        }),

        /** Screen X coordinate of sprite anchor (px). */
        X: CAE.Tweaks.Q26.X, // 0

        /** Screen Y coordinate of sprite anchor (px). */
        Y: CAE.Tweaks.Q26.Y  // 0

    });

    // These can't be member-scoped or they get reset on scene change. Could be static but this is working.
    /** `true` iff indicator should be visible. */
    let showIndicator = false;

    /** `true` iff indicator should be (becoming) invisible. */
    let hideIndicator = true;

    /** Save indicator sprite animation frame count. */
    let frames = 0;

    /** Save indicator sprite status tracker. */
    let statusId = STATUS.DONE;

    /** Save indicator sprite visibility. */
    let visible = false;

    /** Save indicator sprite opacity. */
    let opacity = 0;

    /** Non-conflicting identifier for referencing indicator sprite from scene. */
    const SYM = Symbol();

    /** Run immediately before saving. */
    const saveStart = function() { showIndicator = true, hideIndicator = false; };

    /** Run after save was successful - fade out the indicator gracefully. */
    const saveSuccess = function() { hideIndicator = true; };

    /** Run after save failed - cut the indicator immediately. */
    const saveFailure = function() {    // [ ] Q26 - add "save failed" image?
        saveSuccess();
        showIndicator = false;
        statusId = STATUS.FAILED;
    };

    /** @returns {[x:number,y:number]} display coordinates for save indicator sprite. */
    const displayCoords = function(bmp) {
        // top-left (touch menu is top-right, gold window bottom-right)
        return [DATA.X, DATA.Y];
    };

    /** @returns {[x:number,y:number,width:number,height:number]} frame rect coordinates for save indicator sprite. */
    const frameCoords = function(bmp) {
        return [0, 0, bmp.width, bmp.height];
    };

    /**
     * Updates sprite position and frame.
     * @this {Sprite_SaveIndicator}
     * @param {Bitmap} bmp reference bitmap.
     */
    const updateDisplayCoords = function(bmp) {
        [this.x, this.y] = displayCoords(bmp);
        this.setFrame(...frameCoords(bmp));
    };

//#region === save indicator sprite ========== //

    /** Global identifier for new indicator sprite class. */
    const N = "Sprite_SaveIndicator";

    globalThis[N] = function() { this.initialize.apply(this, arguments); };
    globalThis[N].prototype = Object.create(Sprite.prototype);

    // Define own instance properties/methods.
    Object.assign(globalThis[N].prototype, {

        constructor: globalThis[N],

        /** @constructor */
        initialize: function() {
            Sprite.prototype.initialize.call(this);
            this.createBitmap();
            this.visible = visible;
            this.opacity = opacity;
            this.active  = true;
            this.anchor.set(DATA.ANCHOR);
            this.scale.set(DATA.SCALE);
        },

        /** Assigns and initiates load of appropriate bitmap. */
        createBitmap: function() {
            (
                this.bitmap = ImageManager.loadBitmap("", DATA.URL)
            ).addLoadListener(updateDisplayCoords.bind(this));
        },

        /**
         * @param {number} id status ID
         * @returns {number} starting opacity for that status.
         */
        beginOpacity: function(id) {
            switch (id) {
                case STATUS.DONE:
                case STATUS.STARTING:
                    return 0;
                default:
                    return 255;
            }
        },

        /**
         * Sets up values for given `statusId`.
         * @param {number} id ID of new status.
         */
        beginStatus: function(id) {
            frames = DATA.T[id] || 0;
            statusId = id || 0;
            this.opacity = opacity = this.beginOpacity(id);
            this.visible = visible = id !== STATUS.DONE;
        },

        /** Called each frame, updates icon based on current status. */
        update: function() {
            Sprite.prototype.update.apply(this, arguments);
            if (!this.active)
                return;
            switch (statusId) {
                case STATUS.STARTING:
                    if (frames > 0)
                        this.opacity = opacity = Math.ceil(
                            255 * (1 - --frames / DATA.T[STATUS.STARTING])
                        );
                    else
                        this.beginStatus(STATUS.HOLDING);
                    break;
                case STATUS.HOLDING:
                    if (frames > 0)
                        --frames;
                    else if (hideIndicator) {
                        showIndicator = false;
                        this.beginStatus(STATUS.ENDING);
                    }
                    break;
                case STATUS.ENDING:
                    if (frames > 0)
                        this.opacity = opacity = Math.floor(
                            255 * --frames / DATA.T[STATUS.ENDING]
                        );
                    else
                        this.beginStatus(STATUS.DONE);
                    break;
                case STATUS.FAILED:
                    this.beginStatus(STATUS.DONE);
                    break;
                default:
                    if (showIndicator)
                        this.beginStatus(STATUS.STARTING);
                    break;
            }
        }

    });

//#endregion ================================= //

    // Toggle "show" flag on/off when saving game.
    void (alias => {
        DataManager.saveGame = function(savefileId) {
            saveStart();
            return alias.apply(this, arguments)
                    .then(() => saveSuccess())
                    .catch(reject => { saveFailure(); reject(); }); // v16 - pass error on!
        };
    })(DataManager.saveGame);

    // Add indicator on top of window layer.
    void (alias => {
        Scene_Base.prototype.createWindowLayer = function() {
            alias.apply(this, arguments);
            this.addChild(this[SYM] = new globalThis[N]());
        };
    })(Scene_Base.prototype.createWindowLayer);

})();

// Q27) Hide touch UI immediately if/when disabling it on the options screen.
void (() => { if (!CAE.Tweaks.Q27) return;
    const alias = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        alias.apply(this, arguments);
        if (symbol === "touchUI") {
            const sc = SceneManager._scene;
            // scene does not create button on init if touch UI is disabled
            if (!sc._cancelButton)
                sc.createCancelButton();
            sc._cancelButton.visible = !!value;
        }
    };
})();

// Q28) Auto-show options on title when config file is not found ("first run").
void (() => { if (!CAE.Tweaks.Q28 || DataManager.isTitleSkip()) return;
'use strict';

    /**
     * Tracks whether config data was found on boot.
     *
     * Indeterminate value `null` means check has not yet completed.
     * @type {?boolean}
     */
    let configExists = null;

    /** Patch - pushes options scene on title if appropriate. */
    const pushFirstTitleScenes = function() {
        if (!(configExists ??= StorageManager.exists("config")))
            SceneManager.push(Scene_Options);
    };

    // Patch - show game options immediately if config file not found.
    void (alias => {
        Scene_Title.prototype.start = function() {
            alias.apply(this, arguments);
            pushFirstTitleScenes();
        };
    })(Scene_Title.prototype.start);

    // Patch - don't wait for title fade if redirecting to options.
    void (alias => {
        Scene_Title.prototype.isBusy = function() {
            return configExists ? alias.apply(this, arguments) : false;
        };
    })(Scene_Title.prototype.isBusy);

    // Patch - redirect up to 1x per session & move title fade to here.
    void (alias => {
        Scene_Options.prototype.start = function() {
            alias.apply(this, arguments);
            if (!configExists) {
                this.startFadeIn(this.fadeSpeed(), false);
                configExists = true;
            }
        };
    })(Scene_Options.prototype.start);

})();

// Q29) Pre-title splash screen(s).
void (() => { if (!CAE.Tweaks.Q29) return;
'use strict';

//#region === Define new scene for splash screen(s) ========== //

    // Largely modelled on Scene_Gameover.

    /** Global identifier for new scene. */
    const N = "Scene_SplashCae";

    /** @constructor `Scene_SplashCae`. */
    globalThis[N] = function() { this.initialize(...arguments); };

    /** `Scene_Splash.prototype`. */
    globalThis[N].prototype = Object.create(Scene_Base.prototype);
    globalThis[N].prototype.constructor = globalThis[N];

    /**
     * @typedef {object} AudioObject Describes an audio instance.
     * @property {string} name Audio filename (without extension).
     * @property {number} volume Volume in [0, 100].
     * @property {number} pitch Pitch in [50, 150].
     * @property {number} [pan] L/R panning in [-100, 100] (`0` if omitted).
     */

    // Define static constants.
    Object.defineProperties(globalThis[N], {

        /**
         * Full image paths (without extension) for use as splash screen background.
         *
         * If the path starts with `movies/`, it will play as a video instead.
         *
         * The first instance of `Scene_Splash` per session will use the first entry,
         * the second instance will use the second one, etc.
         *
         * Array length determines number of splash screens.
         * @static @type {string[]}
         */
        IMGS: { value: CAE.Tweaks.Q29.IMGS },
        // ["img/system/Splash"];

        /**
         * Uninterrupted durations for each splash, in frames.
         *
         * Use `0` to disable (waits for player input or video end).
         *
         * Durations wrap, e.g. if only 2 durations (X, Y) are defined
         * for 3 splashes (A, B, C), then they will use A-X, B-Y, C-X.
         * @static @type {number[]}
         */
        TIME: { value: CAE.Tweaks.Q29.TIME },
        // [60];

        /**
         * Audio BGM objects for use as splash BGM.
         *
         * Like durations, these entries wrap.
         * Use `null` to skip an entry, or an empty array for no splash BGM.
         * @static @type {AudioObject[]}
         */
        BGM:  { value: CAE.Tweaks.Q29.BGM  },
        // [/*{ name: "Theme1", volume: 5, pitch: 100, pan: 0 }*/];

        /**
         * Audio ME objects to play when each splash starts.
         *
         * Like BGM, these entries wrap and are optional.
         * @static @type {AudioObject[]}
         */
        ME:   { value: CAE.Tweaks.Q29.ME   }
        // [/*{ name: "Item", volume: 5, pitch: 100, pan: 0 }*/];

    });

    /**
     * Next splash scene ID.
     *
     * Determines splash image and duration.
     * @static @type {number}
     */
    globalThis[N].ID = 0;

    // Define own instance properties/methods.
    Object.assign(globalThis[N].prototype, {

        constructor: globalThis[N],

        /** @constructor */
        initialize: function() {
            Scene_Base.prototype.initialize.apply(this, arguments);
            this._id = globalThis[N].ID++;
            this._video = false;
        },

        /** @returns {string} Image path for splash background. */
        splashImgName: function() {
            const A   = globalThis[N].IMGS;
            const L   = A?.length;
            const img = L ? A[this._id % L] : "";
            return img;
        },

        /** @returns {[bgm:?AudioObject,me:?AudioObject]} Audio config for splash BGM/ME. */
        splashAudioObjs: function() {
            const  b = globalThis[N].BGM;
            const  m = globalThis[N].ME;
            const Lb = b?.length;
            const Lm = m?.length;
            const Ob = Lb ? b[this._id % Lb] : null;
            const Om = Lm ? m[this._id % Lm] : null;
            return [Ob, Om];
        },

        /** @returns {string} Video file extension. */
        videoFileExt: Game_Interpreter.prototype.videoFileExt,

        /**
         * @param {string} url Reference file path.
         * @returns {string} Corresponding video file path or blank string.
         */
        checkVideo: function(url) {
            return url.startsWith("movies/") ? url + this.videoFileExt() : "";
        },

        /** Loads & displays background image. */
        createBackground: function() {
            const url = this.splashImgName();
            if (url) {
                this._video = this.checkVideo(url);
                if (!this._video)
                    this.addChild(
                        this._backSprite = new Sprite(
                            ImageManager.loadBitmap("", url)
                        )
                    );
            }
        },

        /** Called on scene creation. */
        create: function() {
            Scene_Base.prototype.create.apply(this, arguments);
            this.createBackground();
        },

        /** Repositions background. */
        adjustBackground: function() {
            if (!this._video) {
                this.scaleSprite(this._backSprite);
                this.centerSprite(this._backSprite);
            }
        },

        /** Plays associated audio. */
        startAudio: function() {
            const [bgm, me] = this.splashAudioObjs();
            if (bgm)
                AudioManager.playBgm(bgm);
            if (me)
                AudioManager.playMe(me);
        },

        /** Starts scene timer. */
        startTimer: function() {
            const T = globalThis[N].TIME;
            this._time = T[this._id % T.length] || 0;
        },

        /** Called on scene start. */
        start: function() {
            Scene_Base.prototype.start.apply(this, arguments);
            this.adjustBackground();
            this.startAudio();
            this.startTimer();
            if (this._video)
                Video.play(this._video);
            else
                this.startFadeIn(this.fadeSpeed(), false);
        },

        /** Proceeds to next scene. */
        endSplash: function() {
            if (!this._video)
                this.fadeOutAll();
            this.popScene();
        },

        /**
         * Special handling for resuming paused video.
         * @returns {boolean} `true` iff player input is received.
         */
        isTriggered: function() {
            const r = Input.isTriggered("ok") || TouchInput.isTriggered();
            if (r && Video._element.paused)
                return Video._element.play(), false;
            return r;
        },

        /** @returns {boolean} `true` iff a video was playing but isn't now. */
        isVideoEnd: function() {
            return !!this._video && !Video.isPlaying();
        },

        /** Processes (early) exit on player input. */
        checkInput: function() {
            if (this.isTriggered())
                this.endSplash();
        },

        /** Updates timer and triggers related scene exit. */
        updateTimer: function() {
            if (!--this._time || this.isVideoEnd())
                this.endSplash();
        },

        /** Called each frame. */
        update: function() {
            Scene_Base.prototype.update.apply(this, arguments);
            if (!this.isBusy()) {
                this.checkInput();
                this.updateTimer();
            }
        },

        /** Called when scene ends. */
        terminate: function() {
            if (this._video && Video.isPlaying()) {
                Video._element.pause();
                Video._onEnd();
            }
        }

    });

//#endregion ================================================= //

    /** @returns {boolean} `true` iff all splash scenes should be skipped. */
    const shouldSkip = function() {
        return false;                       // there is a Skip Title playtest option now
        return Utils.isOptionValid("test"); // skip in playtest
    };

    /** @returns {Scene_Base[]} Reverse-ordered list of scenes to show before the title. */
    const getScenes = function() {
        return shouldSkip() ? [] : Array.from(globalThis[N].IMGS, () => globalThis[N]);
    };

    /**
     * Pushes additional scene(s) on game boot.
     * @returns {boolean} `true` iff scene stack was modified.
     */
    const gotoPreTitleScene = function() {
        // Skip if there are no scenes to show.
        const SCENES = getScenes();
        if (!SCENES.length)
            return false;
        // Currently: _scene     = Scene_Boot
        //            _nextScene = Scene_Title/Scene_Splash
        //            _stack     = []
        // Manually push scenes to stack, then pop to stack.
        SceneManager._stack.push(SceneManager._nextScene.constructor, ...SCENES);
        SceneManager.pop();
        return true;
    };

    // Show pre-title scene(s) on game boot.
    void (alias => {
        Scene_Boot.prototype.startNormalGame = function() {
            alias.apply(this, arguments);
            gotoPreTitleScene();
        };
    })(Scene_Boot.prototype.startNormalGame);

})();

// Q30) Enemy HP/MP/TP/Time gauges; <gauge offset: X, Y>; <gauge width scale: S>.
void (() => { if (!CAE.Tweaks.Q30) return;
'use strict';

    /** Name of tag for enemy-specific gauge offsets. @type {string} */
    const TAG_OFFSET = CAE.Tweaks.Q30["tag_gauge offset"] || "gauge offset";

    /** Name of tag for enemy-specific gauge width scale. @type {string} */
    const TAG_SCALEX = CAE.Tweaks.Q30["tag_gauge width scale"] || "gauge width scale";

    /** Do not draw background for these enemy gauge types. @type {string[]} */
    const NO_BACK_TYPES = CAE.Tweaks.Q30.NOBG; // ["tp"];

    /**
     * - If `true`, hide enemy gauge values.
     * - If `false`, show enemy gauge values for gauges with a background.
     * @type {boolean}
     */
    const HIDE_VALUE = CAE.Tweaks.Q30.NO_V;

//#region ==== Define Sprite_EnemyGauge =========== //

    const N = "Sprite_EnemyGauge";

    globalThis[N] = function() { this.initialize(...arguments); };
    globalThis[N].prototype = Object.create(Sprite_Gauge.prototype);

    globalThis[N].prototype.constructor = globalThis[N];

    /**
     * Misc gauge data.
     * - `anchor` values are added to the parent's anchor (default `0.5`, `1`).
     * - `offset` values (px) are added afterwards.
     * - `opacity` applies to the entire sprite and is from `0` to `255` as usual.
     * - `scale.x` is relative to the parent sprite: `1.0` for full width.
     * - `scale.y` is relative to the default gauge height: `1.0` for full height.
     *
     *
     * Listed order is relative z-order: last entry is frontmost gauge.
     * @static @readonly
     */
    Object.defineProperty(globalThis[N], "DATA", { value: CAE.Tweaks.Q30.DATA });
    // Object.freeze({
    //     hp:   { anchor: { x: 0, y: -0.15 }, offset: { x: 0, y: -13 }, scale: { x: 0.8, y: 1.0 }, opacity: 204 },
    //     // mp
    //     tp:   { anchor: { x: 0, y: -0.15 }, offset: { x: 0, y: -13 }, scale: { x: 0.8, y: 1.0 }, opacity: 204 },
    //     time: { anchor: { x: 0, y: -0.15 }, offset: { x: 0, y:   0 }, scale: { x: 0.8, y: 1.0 }, opacity: 204 }
    // });

    /** @type {string[]} All enemy gauge types. Auto-populated from `Sprite_EnemyGauge.DATA`. */
    Object.defineProperty(globalThis[N], "TYPES", {
        value: Object.freeze(Object.keys(globalThis[N].DATA))
    });

    Object.assign(globalThis[N].prototype, {

        constructor: globalThis[N],

        /** @constructor Pass parent in at init to avoid unnecessary rescale. */
        initialize: function(parent, ...args) {
            this._scaleRef = parent;
            Sprite_Gauge.prototype.initialize.apply(this, args);
            this.anchor.set(0.5);
        },

        /**
         * References "parent" sprite for scaling.
         * @returns {number} Width of gauge bitmap (px).
         */
        bitmapWidth: function() {
            const ref = this._scaleRef.bitmap;
            if (this._statusType && ref.isReady()) {
                const dat = globalThis[N].DATA[this._statusType].scale.x;
                const tag = Number(this._battler.enemy().meta[TAG_SCALEX]) || 1;
                return Math.floor(ref.width * dat * tag);
            }
            return Sprite_Gauge.prototype.bitmapWidth.apply(this, arguments);
        },

        /** @returns {number} Height of gauge within bitmap (px). */
        gaugeHeight: function() {
            const h = Sprite_Gauge.prototype.gaugeHeight.apply(this, arguments);
            const m = (
                this._statusType ?
                globalThis[N].DATA[this._statusType].scale.y :
                null
            ) ?? 1;
            return Math.floor(h * m);
        },

        /** Resizes bitmap & sprite. */
        resize: function() {
            this.bitmap.resize(this.bitmapWidth(), this.bitmapHeight());
            // ...aaand manually resize the sprite to match it.
            this.width = this.bitmap.width;
            this.height = this.bitmap.height;
        },

        /** @returns {{x:number,y:number}} gauge anchors in normalised parent coordinates. */
        getAnchors: function() {
            return globalThis[N].DATA[this._statusType]?.anchor;
        },

        /** @returns {{x:number,y:number}} gauge offsets in px. */
        getOffsets: function() {
            const dat = globalThis[N].DATA[this._statusType]?.offset;
            const tag = this._battler.enemy().meta[TAG_OFFSET];
            if (!tag)
                return dat;
            const spl = tag.split(",");
            const arr = Array.from(
                { length: 2 }, (_, n) => parseInt(spl[n], 10) || 0
            );
            return { x: dat.x + arr[0], y: dat.y + arr[1] };
        },

        /** @returns {[x:number,y:number]} display coordinates (px) for gauge within parent. */
        getCoords: function() {
            const B = this._scaleRef.bitmap;
            const A = this.getAnchors();
            const O = this.getOffsets();
            if (
                Number.isFinite(A?.x) && Number.isFinite(A.y) &&
                Number.isFinite(O?.x) && Number.isFinite(O.y) &&
                B instanceof Bitmap
            )
                return [
                    Math.floor(A.x * B.width)  + O.x,
                    Math.floor(A.y * B.height) + O.y
                ];
            return [0, 0];
        },

        /**
         * Updates gauge on reassignment.
         * @param {Game_Enemy} battler reference battler
         * @param {string} statusType indicates gauge status type
         */
        setup: function(battler, statusType) {
            Sprite_Gauge.prototype.setup.apply(this, arguments);
            this.resize();
            this.move(...this.getCoords());
            this.updateOpacity();
        },

        /** Updates gauge opacity. */
        updateOpacity: function() {
            const o = globalThis[N].DATA[this._statusType]?.opacity;
            if (typeof o === "number")
                this.opacity = o;
        },

        /** Do not draw label. */
        drawLabel: function() {},

        /** No gauge indent (normally accommodates label). */
        gaugeX: function() { return 0; },

        /** @abstract @returns {boolean} If `true`, do not draw gauge background. */
        shouldHideGaugeBack: function() { return false; },

        /** Draw value iff subfeature is enabled and this is not a "backless" gauge type. */
        drawValue: HIDE_VALUE ? function() {} : function() {
            if (!this.shouldHideGaugeBack())
                Sprite_Gauge.prototype.drawValue.apply(this, arguments);
        }

    });

    // Hide gauge background in specific circumstances.
    // Primarily for overlapping gauges.
    void (() => { if (!NO_BACK_TYPES.length) return;

        /** Non-conflicting identifier for "do not draw background" flag. */
        const SYM_SKIP_BG = Symbol();

        Object.assign(globalThis[N].prototype, {

            /** @returns {boolean} `true` iff should hide the gauge background. */
            shouldHideGaugeBack: function() {
                return NO_BACK_TYPES.contains(this._statusType);
            },

            /** Returns transparent background colour if apt, else as usual. */
            gaugeBackColor: function() {
                if (SYM_SKIP_BG in this) {
                    delete this[SYM_SKIP_BG];
                    return "#00000000";
                }
                return Sprite_Gauge.prototype.gaugeBackColor.apply(this, arguments);
            },

            /** Draws gauge bar, but also sets "hide background" flag when apt. */
            drawGaugeRect: function() {
                if (this.shouldHideGaugeBack())
                    this[SYM_SKIP_BG] = true;
                Sprite_Gauge.prototype.drawGaugeRect.apply(this, arguments);
            }

        });

    })();

//#endregion ====================================== //

    /** Non-conflicting identifiers for new properties of `Sprite_Enemy`. */
    const SYM = Object.freeze({

        /** For the "add gauge" method. */
        M_CREATE: Symbol(),

        /**
         * Gauge property identifiers.
         * Auto-populated from `Sprite_EnemyGauge.DATA`.
         * @type {object.<string,symbol>}
         */
        P_GAUGES: Object.freeze(globalThis[N].TYPES.reduce((a, c) => {
            a[c] = Symbol();
            return a;
        }, {}))

    });

    /**
     * Creates/updates enemy gauge(s).\
     * Intended for use as a load listener.
     * @param {Bitmap} bmp loaded enemy bitmap
     */
    Sprite_Enemy.prototype[SYM.M_CREATE] = function(bmp) {
        for (const statusType of globalThis[N].TYPES) {
            const p = SYM.P_GAUGES[statusType];
            this[p]?.destroy();
            this.addChild(this[p] = new globalThis[N](this));
            this[p].setup(this._battler, statusType);
        }
        this.setHue(this._hue);     // refresh hue of child sprite(s)
    };

    // Patch - refresh gauges when sprite changes, e.g. init or transform.
    void (alias => {
        Sprite_Enemy.prototype.loadBitmap = function() {
            alias.apply(this, arguments);
            this.bitmap.addLoadListener(this[SYM.M_CREATE].bind(this));
        };
    })(Sprite_Enemy.prototype.loadBitmap);

})();

// Q31) Move with arrows or WASD; W (pagedown) moved to E.
void (() => { if (!CAE.Tweaks.Q31) return;
'use strict';

    /** If `true`, show key codes in the console when a button is pressed. */
    const SHOW_DEBUG = CAE.Tweaks.Q31.DEBUG && Utils.isOptionValid("test");

    /** Remap specific inputs. */
    for (const [code, name] of [
        [87, "up"],             // W
        [65, "left"],           // A
        [83, "down"],           // S
        [68, "right"],          // D
        [69, "pagedown"],       // E
        // experimental override (rejected)
        // [90, "pageup"],      // Z
        // [88, "pagedown"],    // X
        // [81, "cancel"],      // Q
        // [69, "ok"],          // E
    ])
        Input.keyMapper[code] = name;

    // For checking key codes (playtest only).
    void (() => { if (!SHOW_DEBUG) return;
        SceneManager.showDevTools();
        console.log(CAE.Tweaks.NAME + ".js: feature Q31 will log key codes for pressed keys.")
        const alias = Input._onKeyDown;
        Input._onKeyDown = function(event) {
            console.log('pressed', event.keyCode);
            alias.apply(this, arguments);
        };
    })();

})();

// Q32) Event tag <hue: H, D>: shift hue by H, optional +1 per D frames.
void (() => { if (!CAE.Tweaks.Q32) return;
'use strict';

    /** Name of event tag for this feature. @type {string} */
    const TAG_NAME_HUE = CAE.Tweaks.Q32.tag_hue || "hue";

    /** Identifier for storing hue shift on `Game_Event`. @type {string|unique symbol} */
    const P_HUE = CAE.Tweaks.Q32.P_HUE || Symbol();

    /** Non-conflicting identifier for new "update hue cycle" method on `Sprite_Character`. */
    const M_UPDATE_HUE = Symbol();

    /** Non-conflicting identifier for new "initialise hue cycle" method on `Game_Event`. */
    const M_INIT_HUE = Symbol();

    /**
     * @param {string} tagName
     * Name of tag.
     * @param {Game_Character} char
     * Reference character.
     * @returns {Iterable<string|boolean>}
     * Iterable of applicable tag values.
     */
    const getTags = function(tagName, char) {
        return CAE.Tweaks.Utils.getEventTags(char, tagName, true);
    };

    /**
     * @param {Game_Character} char
     * Reference character.
     * @returns {?string}
     * Tag value, or `null` if absent.
     */
    const getTagsHue = function(char) {
        return getTags(TAG_NAME_HUE, ...arguments);
    };

    /**
     * @param {string|unknown} tag
     * Reference tag value, ostensibly a comma-separated string of integers.
     * @returns {number[]}
     * Parsed tag values.
     */
    const parseTag = function(tag) {
        if (typeof tag === "string")
            return Array.from(tag.split(","), s => parseInt(s, 10) || 0);
        return [];
    };

    /**
     * @param {string|boolean} tag
     * Reference raw tag data.
     * @returns {[hue:number?,rate:number?]}
     * Hue and optional cycle rate from given event's tag.\
     * Empty array if input is invalid.
     */
    const parseTagHue = function(tag) {
        return parseTag(tag);
    };

    /**
     * @param {number} [rate=0]
     * Optional; default = 0.\
     * Reference hue cycle rate.
     * @param {boolean} [setup=false]
     * Optional; default = `false`.\
     * `true` iff `rate` was initialised just now.
     * @returns {number}
     * Timer value.
     */
    const hueCycleTimerInitValue = function(rate = 0, setup = false) {
        return rate > 0 ? rate - 1 : 0;
    };

    /** Updates this sprite's hue. */
    Sprite_Character.prototype[M_UPDATE_HUE] = function() {
        /** @type {[hue:number,rate:number,frame:number]} */
        const H = this._character[P_HUE];
        if (H) {
            // cycle
            if (H[1]) {
                if (H[2] > 0)
                    --H[2];
                else {
                    H[2] = hueCycleTimerInitValue(H[1]);
                    if (++H[0] > 360)     // [-360, 360]
                        H[0] -= 720;
                }
            }
            // update
            this.setHue(H[0]);
        }
    };

    /** Initialises this event's hue cycle data. */
    Game_Event.prototype[M_INIT_HUE] = function() {
        delete this[P_HUE];
        for (const tag of getTagsHue(this)) {
            const [h, r] = parseTagHue(tag);
            if (h || r) {
                this[P_HUE] = [h, r, hueCycleTimerInitValue(r, true)];
                break;
            }
        }
    };

    // Patch - fetch and cache hue shift (if any) on page change.
    void (alias => {
        Game_Event.prototype.setupPageSettings = function() {
            alias.apply(this, arguments);
            this[M_INIT_HUE]();
        };
    })(Game_Event.prototype.setupPageSettings);

    // Patch - also update character sprite hue.
    void (alias => {
        Sprite_Character.prototype.updateOther = function() {
            alias.apply(this, arguments);
            this[M_UPDATE_HUE]();
        };
    })(Sprite_Character.prototype.updateOther);

})();

// Q33) Show Text is non-interrupting if used in a Parallel event.
void (() => { if (!CAE.Tweaks.Q33) return;
'use strict';

    // Current implementation assumes no more than 1 auto-message window, much like Show Text.

    /** Identifier for property used to store this feature's data in save files. @type {string} */
    const SAVE_PROP = "messageAuto";

    /** Interpreter wait mode for non-interrupting messages. @type {string} */
    const WAIT_MODE = SAVE_PROP;

    /** If true, the `\af[n]` and `\pf[n]` text codes will set the face index as well. @type {boolean} */
    const AF_SET_INDEX = CAE.Tweaks.Q33.AF_SET_INDEX;

    /** Auto-message durations (frames): base, `\.`, `\|`. @type {[number,number,number]} */
    const DURATIONS = CAE.Tweaks.Q33.DURATIONS; // 120, 15, 60

    /** Minimum row count for auto-message window. @type {number} */
    const MIN_ROWS = CAE.Tweaks.Q33.MIN_ROWS; // 2

    /** Non-conflicting identifier for new "show non-interrupting message" method. */
    const M_SHOW_TEXT = Symbol();

    /** Non-conflicting identifier for new scene "create" method extension. */
    const M_CREATE = Symbol();

    /** Non-conflicting property identifier for `Window_MessageAuto` instance on `Scene_Map`. */
    const P_MESSAGE = Symbol();

    /** Non-conflicting property identifier for `Window_NameBoxAuto` instance on `Scene_Map`. */
    const P_NAMEBOX = Symbol();

//#region ================= Window_MessageAuto ======================== //

    const Nm = "Window_MessageAuto";

    /** @constructor `Window_MessageAuto`. */
    globalThis[Nm] = function() { this.initialize(...arguments); };
    globalThis[Nm].prototype = Object.create(Window_Base.prototype);

    /** @typedef {[faceName:string,faceIndex:number,bgType:static.BG_TYPE,posType:static.POS_TYPE,speakerName:string,text:string]} AutoMsgData */

    // Static enums.
    Object.defineProperties(globalThis[Nm], {

        /** @readonly @static @enum {number} Message background display types. */
        BG_TYPE: { value: Object.freeze({
            WINDOW:      0,
            DIM:         1,
            TRANSPARENT: 2
        }) },

        /** @readonly @static @enum {number} Message screen position types. */
        POS_TYPE: { value: Object.freeze({
            TOP:    0,
            MIDDLE: 1,
            BOTTOM: 2
        }) }

    });

    // Static properties and methods.
    Object.assign(globalThis[Nm], {

        /** @static @type {number} Determines when messages should disappear. */
        _showCount: 0,

        /** @static @type {boolean} If true, is waiting for next auto-message before disappearing. */
        _waitForNext: false,

        /** @static @type {AutoMsgData[]} Queued auto-message data. */
        QUEUE: [],

        /**
         * Updates message parameters from Show Text.
         * @static
         * @param {[string,number,number,number,string]} params Show Text command parameters
         * @param {string} text raw message text
         */
        setup: function(params, text) {
            this.QUEUE.push([...params, text]);
        },

        /** @static @returns {boolean} `true` iff auto-message is currently occupied. */
        isBusy: function() {
            return this.QUEUE.length > 0 || this._waitForNext || this._showCount > 0;
        }

    });

    // Local getters for fetching current message data.
    Object.defineProperties(globalThis[Nm].prototype, {
        faceName: {
            get: function( ) { return this.constructor.QUEUE[0]?.[0] ?? ""; },
            set: function(v) { const Q = this.constructor.QUEUE[0]; if (Array.isArray(Q)) Q[0] = v; },
            configurable: true
        },
        faceIndex: {
            get: function( ) { return this.constructor.QUEUE[0]?.[1] ?? 0; },
            set: function(v) { const Q = this.constructor.QUEUE[0]; if (Array.isArray(Q)) Q[1] = v; },
            configurable: true
        },
        bgType: {
            get: function( ) { return this.constructor.QUEUE[0]?.[2] ?? this.constructor.BG_TYPE.DIM; },
            set: function(v) { const Q = this.constructor.QUEUE[0]; if (Array.isArray(Q)) Q[2] = v; },
            configurable: true
        },
        posType: {
            get: function( ) { return this.constructor.QUEUE[0]?.[3] ?? this.constructor.POS_TYPE.TOP; },
            set: function(v) { const Q = this.constructor.QUEUE[0]; if (Array.isArray(Q)) Q[3] = v; },
            configurable: true
        },
        speakerName: {
            get: function( ) { return this.constructor.QUEUE[0]?.[4] ?? ""; },
            set: function(v) { const Q = this.constructor.QUEUE[0]; if (Array.isArray(Q)) Q[4] = v; },
            configurable: true
        },
        text: {
            get: function( ) { return this.constructor.QUEUE[0]?.[5] ?? ""; },
            set: function(v) { const Q = this.constructor.QUEUE[0]; if (Array.isArray(Q)) Q[5] = v; },
            configurable: true
        }
    });

    // Own instance properties and methods.
    Object.assign(globalThis[Nm].prototype, {

        constructor: globalThis[Nm],

        /** @returns {number} window width, for resizing. */
        getWidth: function() {
            return Graphics.boxWidth;
        },

        /** @returns {number} window height, for resizing. */
        getHeight: function() {
            return this.fittingHeight(this._rows);
        },

        /** @returns {Rectangle} rect representing this window's bounds. */
        getCoords: function() {
            return new Rectangle(
                0,
                0,
                this.getWidth(),
                this.getHeight()
            );
        },

        /** @param {number} rows rows of text to display (determines window height). */
        initialize: function(rows = MIN_ROWS) {
            this._rows = rows;
            Window_Base.prototype.initialize.call(this, this.getCoords(), ...arguments);
        },

        /**
         * Assigns a name box window to this window.
         * @param {Window_NameBoxAuto} nameBoxWindow reference window instance
         */
        setNameBoxWindow: function(nameBoxWindow) {
            if (nameBoxWindow instanceof Window_NameBoxAuto)
                this._nameBoxWindow = nameBoxWindow;
        },

        /**
         * Call after adding window to scene, refreshes auto-message.
         * @param {Window_NameBoxAuto} nameBoxWindow reference window instance
         */
        start: function(nameBoxWindow = null) {
            this.setNameBoxWindow(nameBoxWindow);   // encourage proper op order
            if (!globalThis[Nm]._showCount)
                this.openness = 0;
            else
                this.redraw();
        },

        /** Resets show count, i.e. message timer (frames). */
        resetShowCount: function() {
            const G = this.constructor;
            if (G._waitForNext = /\\\!/.test(this.text))
                return;
            // Base duration + borrowed wait codes.
            const r1 = /\\\./g;
            const r2 = /\\\|/g;
            G._showCount = DURATIONS[0];
            while (r1.test(this.text))
                G._showCount += DURATIONS[1];
            while (r2.test(this.text))
                G._showCount += DURATIONS[2];
        },

        /**
         * Updates show count (i.e. message timer).
         * @returns {boolean} `true` iff timer is still going.
         */
        updateShowCount: function() {
            const G = this.constructor;
            if (G._waitForNext) {
                if (G.QUEUE.length < 2)
                    return true;
                G._waitForNext = false;
                G.QUEUE.shift();
            } else if (G._showCount > 0) {
                if (!--G._showCount)
                    G.QUEUE.shift();    // this one's done, discard it
                return true;
            }
            return false;
        },

        /** @returns {boolean} `true` iff the message is right-to-left. */
        isRTL: function() {
            return Utils.containsArabic(this.text);
        },

        /** @returns {[x:number,y:number,width:number,height:number]} coordinates of face draw area. */
        faceCoords: function() {
            const pad = this.margin;
            const fw = ImageManager.faceWidth;
            return [
                this.isRTL() ? this.innerWidth - fw - pad : pad,
                0,
                fw,
                this.innerHeight
            ];
        },

        /**
         * @param {string} loadedName face name when loading started
         * @param {Bitmap} bmp loaded bitmap
         * @returns {boolean} `true` iff face was drawn.
         */
        drawMessageFace: function(loadedName, bmp) {
            if (loadedName === this.faceName) {
                const [x, y, w, h] = this.faceCoords();
                this.contents.clearRect(x, y, w, h);  // jic
                this.drawFace(loadedName, this.faceIndex, x, y, w, h);
                return true;
            }
            return false;
        },

        /** Requests redraw of message face. */
        requestMessageFace: function() {
            const f = this.faceName;
            if (f)
                ImageManager.loadFace(f).addLoadListener(
                    this.drawMessageFace.bind(this, f)
                );
        },

        /** Updates window background type. */
        updateBackground: function() {
            this.setBackgroundType(this.bgType);
        },

        /** Updates text row count and window height. */
        updateRows: function() {
            const rx = /\n/g;
            let r = 1;
            while (rx.test(this.text))
                ++r;
            if (r < MIN_ROWS)
                r = MIN_ROWS;
            if (this._rows !== r) {
                this._rows = r;
                this.height = this.getHeight();
                this.createContents();
            }
        },

        /** Updates window position on screen. */
        updatePlacement: function() {
            this.updateRows();
            const T = this.constructor.POS_TYPE;
            switch (this.posType) {
                case T.BOTTOM:
                    this.y = Graphics.boxHeight - this.height;
                    break;
                case T.MIDDLE:
                    this.y = (Graphics.boxHeight - this.height) / 2;
                    break;
                default:
                    this.y = 0;
                    break;
            }
        },

        /** Updates name box window, if present. */
        updateSpeakerName: function() {
            const w = this._nameBoxWindow;
            if (w) {
                w.setName(this.speakerName);
                w.start();
            }
        },

        /** @returns {boolean} `true` iff a face is assigned. */
        hasFace: function() {
            return !!this.faceName;
        },

        /** @returns {[x:number,y:number,width:number]} coordinates for text draw area. */
        textCoords: function() {
            const pad = 20;
            const fw  = ImageManager.faceWidth + pad;
            const hf  = this.hasFace();
            const m   = this.margin;
            const dx  = hf ? fw : m;
            return [
                !this.isRTL() ? dx : m,
                0,
                this.innerWidth - dx - m
            ];
        },

        /**
         * Sets current face name/index based on given `actor`.
         * @param {Game_Actor} actor reference actor.
         */
        setActorFace: function(actor) {
            if (actor instanceof Game_Actor) {
                this.faceName = actor.faceName();
                if (AF_SET_INDEX)
                    this.faceIndex = actor.faceIndex();
                this.requestMessageFace();
            }
        },

        /**
         * @param {string} code matched text code.
         * @param {object} textState tracks draw position and related data.
         */
        processEscapeCharacter: function(code, textState) {
            switch (code) {
                case 'AF':
                    const id = this.obtainEscapeParam(textState);
                    if (textState.drawing && id)
                        this.setActorFace($gameActors.actor(id));
                    break;
                case 'PF':
                    const pos = this.obtainEscapeParam(textState);
                    if (textState.drawing && pos)
                        this.setActorFace($gameParty.members()[pos - 1]);
                    break;
                default:
                    Window_Base.prototype.processEscapeCharacter.apply(this, arguments);
                    break;
            }
        },

        /** Draws message text to window. */
        drawMessageText: function() {
            this.drawTextEx(this.text, ...this.textCoords());
        },

        /** Redraws window contents. */
        redraw: function() {
            this.updatePlacement();
            this.updateBackground();
            this.contents.clear();
            this.requestMessageFace();
            this.drawMessageText();
            this.updateSpeakerName();
        },

        /** Opens/closes window and performs a redraw/timer-reset as appropriate. */
        refresh: function() {
            if (this.text) {
                this.open();
                this.redraw();
                this.resetShowCount();
            } else {
                this.close();
            }
        },

        /** Synchronises openness with assigned name box window, if it exists. */
        syncNameBox: function() {
            const w = this._nameBoxWindow;
            if (w)
                w.openness = this.openness;
        },

        /** Updates window each frame. */
        update: function() {
            Window_Base.prototype.update.apply(this, arguments);
            this.syncNameBox();
            if (!this.updateShowCount())
                this.refresh();
        }

    });

//#endregion ========================================================== //

//#region ================= Window_NameBoxAuto ======================== //

    const Nn = "Window_NameBoxAuto";

    /** @constructor `Window_NameBoxAuto`. */
    globalThis[Nn] = function() { this.initialize(...arguments); };
    globalThis[Nn].prototype = Object.create(Window_NameBox.prototype);

    // Define auto-namebox class.
    Object.assign(globalThis[Nn].prototype, {

        constructor: globalThis[Nn],

        /** @returns {boolean} `true` iff parent message is right-to-left. */
        isRTL: function() {
            return this._messageWindow.isRTL();
        },

        /** Update placement based on auto-message, not `$gameMessage`. */
        updatePlacement: function() {
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            const w = this._messageWindow;
            if (this.isRTL()) {        // <- edit 1 of 1
                this.x = w.x + w.width - this.width;
            } else {
                this.x = w.x;
            }
            if (w.y > 0) {
                this.y = w.y - this.height;
            } else {
                this.y = w.y + w.height;
            }
        },

        /** Updates namebox background to match that of its message window. */
        updateBackground: function() {
            this.setBackgroundType(this._messageWindow.bgType);
        }

    });

//#endregion ========================================================== //

    /**
     * @param {Game_Interpreter} interpreter reference interpreter
     * @returns {boolean} `true` iff given interpreter is for a Parallel event.
     */
    const isParallel = function(interpreter) {
        return SceneManager._scene instanceof Scene_Map
            && interpreter !== $gameMap._interpreter;
    };

    /** Initialises this feature's data for new game. */
    const initSaveData = function() {
        globalThis[Nm].QUEUE = [];
        globalThis[Nm]._showCount = 0;
    };

    /**
     * @param {object} data aggregate save data object
     * @returns {object} input plus this feature's save data
     */
    const makeSaveData = function(data) {
        data[SAVE_PROP] = {
            q: globalThis[Nm].QUEUE,
            c: globalThis[Nm]._showCount
        };
        return data;
    };

    /**
     * Extracts this feature's values from given save data.
     * @param {object} data save data from file
     */
    const readSaveData = function(data) {
        const D = data[SAVE_PROP];
        if (D) {
            if (Array.isArray(D.q))
                globalThis[Nm].QUEUE = D.q;
            if (typeof D.c === "number")
                globalThis[Nm]._showCount = Math.max(D.c, 0);
        }
    };

    /**
     * Processes the new non-interrupting Show Text effects.
     * @param {[string,number,number,number,string]} params Show Text params
     */
    Game_Interpreter.prototype[M_SHOW_TEXT] = function(params) {
        const a = [];
        while (this.nextEventCode() === 401) {
            ++this._index;
            a.push(this.currentCommand().parameters[0]);
        }
        const txt = a.join("\n");
        globalThis[Nm].setup(params.slice(), txt);  // clone params for safe mutate
        if (txt.indexOf("\\^") < 0)         // raw "\^" sequence skips wait mode
            this.setWaitMode(WAIT_MODE);
        return true;
    };  // [ ] Q33 - parallel redirects for Show Choices, Number Input, Select Item? - what did you have in mind, past-me?

    /** Adds new windows to scene. */
    Scene_Map.prototype[M_CREATE] = function() {
        const m = this[P_MESSAGE] = new globalThis[Nm]();
        const n = this[P_NAMEBOX] = new globalThis[Nn]();
        this.addWindow(m);
        this.addWindow(n);
        n.setMessageWindow(m);
        m.start(n);
    };

    // Handle new interpreter wait mode.
    void (alias => {
        Game_Interpreter.prototype.updateWaitMode = function() {
            if (this._waitMode === WAIT_MODE) {
                if (globalThis[Nm].isBusy())
                    return true;
                this._waitMode = "";
                return false;
            }
            return alias.apply(this, arguments);
        };
    })(Game_Interpreter.prototype.updateWaitMode);

    // Redirect Show Text commands from Parallel events.
    void (alias => {
        Game_Interpreter.prototype.command101 = function(params) {
            if (isParallel(this))
                return this[M_SHOW_TEXT](params);
            return alias.apply(this, arguments);
        };
    })(Game_Interpreter.prototype.command101);

    // Add auto-message window to map scene.
    void (alias => {
        Scene_Map.prototype.createAllWindows = function() {
            this[M_CREATE]();
            alias.apply(this, arguments);
        };
    })(Scene_Map.prototype.createAllWindows);

    // Initialise auto-message stuff on new game.
    void (alias => {
        DataManager.createGameObjects = function() {
            alias.apply(this, arguments);
            initSaveData();
        };
    })(DataManager.createGameObjects);

    // Include auto-message stuff in save data.
    void (alias => {
        DataManager.makeSaveContents = function() {
            return makeSaveData(alias.apply(this, arguments));
        };
    })(DataManager.makeSaveContents);

    // Read auto-message stuff from save data, if present.
    void (alias => {
        DataManager.extractSaveContents = function(contents) {
            alias.apply(this, arguments);
            readSaveData(contents);
        };
    })(DataManager.extractSaveContents);

})();

// Q34) Represent cast time on TPB gauge.
void (() => { if (!CAE.Tweaks.Q34) return;
'use strict';

    /** Non-conflicting identifier for new "should draw casting overlay" method of `Sprite_Gauge`. */
    const M_SHOULD_DRAW = Symbol();

    /** Non-conflicting identifier for new "get casting overlay coords" method of `Sprite_Gauge`. */
    const M_DRAW_COORDS = Symbol();

    /** Non-conflicting identifier for new "draw casting overlay" method of `Sprite_Gauge`. */
    const M_DRAW = Symbol();

    /** Non-conflicting identifier for new "last redraw cast time" property on `Sprite_Gauge`. */
    const P_CAST_TIME = Symbol();

    /** Fill colour (CSS) for `Sprite_Gauge` casting overlay. @type {string} */
    const COLOUR = CAE.Tweaks.Q34.COLOUR; // "#00000080";     // 50% black

    /** If true, fill as gradient from gauge background to overlay colour. @type {boolean} */
    const FILL_GRADIENT = CAE.Tweaks.Q34.GRADIENT;

    /** @returns {boolean} `true` iff should draw the casting overlay. */
    Sprite_Gauge.prototype[M_SHOULD_DRAW] = function() {
        if (
            this._statusType === "time" &&
            this[P_CAST_TIME] !== this._battler._tpbCastTime
        )
            return true;
        return false;
    };

    /** @returns {[x:number,y:number,width:number,height:number]} draw coordinates for full overlay area. */
    Sprite_Gauge.prototype[M_DRAW_COORDS] = function() {
        const h = this.gaugeHeight();
        const x = this.gaugeX();
        return [
            x + 1,
            this.textHeight() - h + 1,
            this.bitmapWidth() - x - 1, // -1 fits better than -2, I don't know why.
            h - 2
        ];
    };

    /** Draws casting overlay. */
    Sprite_Gauge.prototype[M_DRAW] = function() {
        // Redraw to avoid stacking cast overlay on itself.
        // (By default gauge doesn't redraw when value hasn't changed.)
        const [x, y, w, h] = this[M_DRAW_COORDS]();
        const ct = this._battler.tpbRequiredCastTime();
        this[P_CAST_TIME] = this._battler._tpbCastTime;
        if (ct > 0) {
            this.redraw();
            const  r = this._battler._tpbCastTime / ct;
            const fw = Math.round(w * r);
            const fh = h;
            const fc = COLOUR;
            if (FILL_GRADIENT)
                this.bitmap.gradientFillRect(x, y, fw, fh, this.gaugeBackColor(), fc);
            else
                this.bitmap.fillRect(x, y, fw, fh, fc);
        }
    };

    // Draw casting overlay when appropriate.
    void (alias => {
        Sprite_Gauge.prototype.updateBitmap = function() {
            alias.apply(this, arguments);
            if (this[M_SHOULD_DRAW]())
                this[M_DRAW]();
        };
    })(Sprite_Gauge.prototype.updateBitmap);

    // Reset cached cast time on setup.
    void (alias => {
        Sprite_Gauge.prototype.setup = function(battler, statusType) {
            delete this[P_CAST_TIME];
            alias.apply(this, arguments);
        };
    })(Sprite_Gauge.prototype.setup);

})();

// Q35) Trait notetags <death var: X,Y>, <death anim: X>.
void (() => { if (!CAE.Tweaks.Q35) return;
'use strict';

    /** Name of the "add to variable on death" tag. @type {string} */
    const TAG_VAR = CAE.Tweaks.Q35["tag_death var"] || "death var";

    /** Name of the "play animation on death" tag. @type {string} */
    const TAG_ANIM = CAE.Tweaks.Q35["tag_death anim"] || "death anim";

    /**
     * Processes "add to variable on death" tag for given meta-bearing object.
     * @param {Game_Battler} target reference battler
     * @param {object} o reference meta-bearing object
     */
    const procDeathVar = function(target, o) {
        // This is pretty much just to avoid the Immortal workaround for death counts.
        const [v = 0, a = 1] = String(o.meta[TAG_VAR]).split(",").map(
            (s, n) => parseInt(s, 10) || n
        );
        if (v)
            $gameVariables.setValue(v, $gameVariables.value(v) + a);
    };

    /**
     * Processes "play animation on death" tag for given meta-bearing object.
     * @param {Game_Battler} target reference battler
     * @param {object} o reference meta-bearing object
     */
    const procDeathAnim = function(target, o) {
        // NB: Show Battle Anim has a check to avoid playing on dead targets.
        //     Don't want to remove that, so let's do this instead.
        //    (Alternatively could use Immortal + Wait for Animation. Ech.)
        const a = parseInt(o.meta[TAG_ANIM], 10) || 0;
        if (a)
            $gameTemp.requestAnimation([target], a);
    };

    /**
     * Processes this feature's death effects for given target.
     * @param {Game_Battler} target reference battler
     */
    const procDeathFX = function(target) {
        for (const o of target.traitObjects()) {
            procDeathVar(target, o);
            procDeathAnim(target, o);
        }
    };

    // On death, process this feature's death effects.
    void (alias => {
        Game_BattlerBase.prototype.die = function() {
            alias.apply(this, arguments);
            procDeathFX(this);
        };
    })(Game_BattlerBase.prototype.die);

})();

// Q36) Show Picture "snapshot.png" snaps current scene and shows that. Save-compatible.
void (() => { if (!CAE.Tweaks.Q36) return;
'use strict';

    // Mapshot rejected because it looks difficult and I don't need it. >_>

    /**
     * Name of dummy snapshot picture, without extension.
     * This is just for selection in the editor.
     */
    const NAME = CAE.Tweaks.Q36.NAME; // "snapshot";

    /** Identifier for new "snapshot data URL" property on `Game_Picture`. */
    const PROP = "_snapData";

    /**
     * Non-conflicting identifier for new properties:
     * - "snapshot updated" on `Game_Picture`;
     * - "this is a snapshot" on `Sprite_Picture`.
     */
    const SYM = Symbol();

    /**
     * Non-conflicting identifier for new "is this a snapshot" methods
     * on `Game_Picture` and `Sprite_Picture`.
     */
    const M_IS_SNAPSHOT = Symbol();

    /** Snapshot error message. */
    const ERR_SNAP = "Cae_Tweaks.js: snapshot toDataURL failed.\n";

    /**
     * If this regular expression matches a picture's name,
     * that picture will be treated as a snapshot placeholder.
     */
    const RX = new RegExp(`^[\\!\\$]*${NAME}$`);

    /** @returns {boolean} `true` iff this should be a snapshot placeholder. */
    Game_Picture.prototype[M_IS_SNAPSHOT] = function() {
        return RX.test(this._name);
    };

    /** @returns {boolean} `true` iff this sprite's bitmap is a snapshot. */
    Sprite_Picture.prototype[M_IS_SNAPSHOT] = function() {
        return SYM in this;
    };

    // When snapshot placeholder pic is shown, create snapshot data URL.
    void (alias => {
        Game_Picture.prototype.show = function(
            name, origin, x, y, scaleX, scaleY, opacity, blendMode
        ) {
            alias.apply(this, arguments);
            if (this[M_IS_SNAPSHOT]()) {
                try {
                    this[PROP] = SceneManager.snap()._canvas.toDataURL();
                } catch (ex) {
                    // Probably SecurityError due to mixed context? Hopefully won't happen.
                    SceneManager.showDevTools();
                    console.warn(ERR_SNAP, ex);
                    delete this[PROP];  // jic
                }
            }
        };
    })(Game_Picture.prototype.show);

    // Assign "snapshot updated" flag if replacing snap with snap.
    // (Show Picture creates a new Game_Picture instance.)
    void (alias => {
        Game_Screen.prototype.showPicture = function(id) {
            const isSnap = this.picture(id)?.[M_IS_SNAPSHOT]();
            alias.apply(this, arguments);
            const newPic = this.picture(id);
            if (isSnap && newPic?.[M_IS_SNAPSHOT]())
                newPic[SYM] = true;
        };
    })(Game_Screen.prototype.showPicture);

    // [ ] Q36 - snapshot <-> normal picture seems to hold its previous position for, like, 1 frame? Probably something in the timing of the `SceneManager.snap` render pass. Workaround: use different pic IDs.

    // Refresh snapshot if/when appropriate.
    void (alias => {
        Sprite_Picture.prototype.updateBitmap = function() {
            const pic = this.picture();
            const bmp = this[M_IS_SNAPSHOT]() ? this.bitmap : null;
            alias.apply(this, arguments);
            if (bmp && !this.bitmap) { // v12 - update flag (and destroy bitmap) on erase.
                bmp.destroy();
                delete this[SYM];
            } else if (pic && SYM in pic) {
                delete pic[SYM];
                this.loadBitmap();
            }
        };
    })(Sprite_Picture.prototype.updateBitmap);

    // Set sprite to snapshot instead if appropriate.
    void (alias => {
        Sprite_Picture.prototype.loadBitmap = function() {
            if (this[M_IS_SNAPSHOT]())
                this.bitmap.destroy();
            const url = this.picture()[PROP];
            if (url) {
                this.bitmap = Bitmap.load(url);
                this[SYM] = true;
            } else {
                delete this[SYM];
                alias.apply(this, arguments);
            }
        };
    })(Sprite_Picture.prototype.loadBitmap);

    // Destroy snapshot bitmap with parent sprite.
    void (alias => {
        Sprite_Picture.prototype.destroy = function() {
            if (this[M_IS_SNAPSHOT]()) {
                this.bitmap.destroy();
                delete this[SYM];
            }
            alias.apply(this, arguments);
        };
    })(Sprite_Picture.prototype.destroy);

    // Override - destroy snapshot texture whenever bitmap is changed.
    // const d = Object.getOwnPropertyDescriptor(Sprite.prototype, "bitmap");
    // Object.defineProperty(Sprite_Picture.prototype, "bitmap", {
    //     get: d.get,
    //     set: function(v) {
    //         const b = this[M_IS_SNAPSHOT]() ? this.bitmap : null;
    //         d.set.apply(this, arguments);
    //         if (b && b !== this.bitmap) {
    //             b.destroy();
    //             console.log("snapshot destroyed!");
    //         }
    //     },
    //     configurable: true
    // });
    // NB: flag would need checks for various cases; easier to just toggle it in `loadBitmap`.

})();

// Q37) Map event orbital motion: <orbit: id, rx:ry, Tx:Ty, ro>.
void (() => { if (!CAE.Tweaks.Q37) return;
'use strict';

    // [ ] Q37 - "focal point" type orbit definition? E.g. orbit around 2(+?) characters.

    /** Name of notetag for this feature. */
    const TAG_NAME = CAE.Tweaks.Q37.tag_orbit || "orbit";

    /** Identifier for new "orbit data" property on qualifying instances of `Game_CharacterBase`. */
    const P_DATA = "_orbitData";

    /** Identifier for new "orbit time" property on qualifying instances of `Game_CharacterBase`. */
    const P_TIME = "_orbitTime";

    /** Non-conflicting identifier for new "trigger touch orbit" method of `Game_Event`. */
    const M_TRIGGER_ORBIT = Symbol();


    /** @typedef {[id:number,rx:number,ry:number,Tx:number,Ty:number,ro:number]} OrbitData */
    /**
     * @param {number} index reference index
     * @returns {number|number[]} Corresponding default value(s):
     * - `0`: character `id`
     * - `1`: orbital radii `rx`, `ry`
     * - `2`: orbital periods `Tx`, `Ty`
     * - `3`: basis rotation `ro`
     */
    const dFaultValue = function(index) {
        switch (index) {
            case 0:
                return 0;
            case 1:
                return [$gameMap.tileWidth(), $gameMap.tileHeight()];
            case 2:
                return [60, 60];
            case 3:
                return 0;
            default:
                return 0;
        }
    };

    /**
     * @param {string?} value input from tag
     * @returns {number} parsed character ID, or default.
     */
    const parseCharId = function(value) {
        return parseInt(value, 10) || dFaultValue(0);
    };

    /**
     * @param {string?} value input from tag, delimited by `:`
     * @param {number} [dFaultIndex=1] index for default value lookup
     * @returns {[number,number]} parsed sublist.
     */
    const parseNumSublist = function(value, dFaultIndex = 1) {
        const a = Array.from(
            value.split(":").slice(0, 2), s => parseInt(s, 10)
        );
        const isInvalid = Array.from(
            { length: 2 }, (_, n) => !Number.isFinite(a[n])
        );
        if (isInvalid[0]) {
            const d = dFaultValue(dFaultIndex);
            a[0] = d[0];
            if (isInvalid[1])
                a[1] = d[1];
        } else if (isInvalid[1])
            a[1] = Math.abs(a[0]);
        return a;
    };

    /**
     * @param {string} value input from tag
     * @returns {[Rx:number,Ry:number]} parsed radii, or default(s).
     */
    const parseRadii = function(value) {
        return parseNumSublist(value, 1);
    };

    /**
     * @param {string} value input from tag
     * @returns {[Tx:number,Ty:number]} parsed periods, or default(s).
     */
    const parsePeriods = function(value) {
        return parseNumSublist(value, 2);
    };

    /**
     * @param {string} value input from tag
     * @returns {number} parsed rotation (degrees), or default.
     */
    const parseRotation = function(value) {
        return (parseInt(value, 10) || dFaultValue(3)).mod(360);
    };

    /**
     * @param {string} value raw sub-value from tag
     * @param {number} index reference value index, see {@linkcode dFaultValue}.
     * @returns {number|number[]} Parsed value(s).
     */
    const parseTagEntry = function(value, index) {
        if (!value || typeof value !== "string")
            return dFaultValue(index);
        switch (index) {
            case 0:
                return parseCharId(value);
            case 1:
                return parseRadii(value);
            case 2:
                return parsePeriods(value);
            case 3:
                return parseRotation(value);
            default:
                return value;
        }
    };

    /**
     * @param {Game_Event} event reference event
     * @returns {Iterable<string|boolean>} iterable object for relevant tag(s).
     */
    const getTags = function(event) {
        return CAE.Tweaks.Utils.getEventTags(event, TAG_NAME, true);
    };

    /**
     * @param {string|boolean} [tag] raw tag value
     * @returns {?string[]} Array of corresponding values, or `null`.
     */
    const splitTag = function(tag) {
        if (typeof tag === "string")
            return tag.split(",");
        return null;
    };

    /**
     * @param {Game_Event} event reference event
     * @returns {?OrbitData} corresponding orbit data, or `null`.
     */
    const parseEventTag = function(event) {
        // <orbit: id, rx:ry, Tx:Ty, ro>
        const allTags = getTags(event);
        for (const tag of allTags) {
            const a = splitTag(tag);
            if (a)
                return a.flatMap((v, n) => parseTagEntry(v, n));
        }
        return null;
    };

    /**
     * @param {number} [ox] X origin (tile)
     * @param {number} [oy] Y origin (tile)
     * @param {number} [rx] X radius (px)
     * @param {number} [ry] Y radius (px)
     * @param {number} [Tx] X period (frames)
     * @param {number} [Ty] Y period (frames)
     * @param {number} [ro] basis rotation (deg)
     * @param {number} [t] current orbit time (frames)
     * @returns {[x:number,y:number]} X & Y tile coordinates for specified orbit.
     */
    const getXY1 = function(
        ox = Graphics.boxWidth / 2,
        oy = Graphics.boxHeight / 2,
        rx = dFaultValue(1)[0],
        ry = dFaultValue(1)[1],
        Tx = dFaultValue(2)[0],
        Ty = dFaultValue(2)[1],
        ro = dFaultValue(3),
        t  = 0
    ) {
        // time evolution
        const pt = 2 * Math.PI * t;
        const xt = rx * Math.cos(pt / Tx) / $gameMap.tileWidth();
        const yt = ry * Math.sin(pt / Ty) / $gameMap.tileHeight();
        // basis rotation
        const  a = Math.PI * ro / 180;
        const sa = Math.sin(a);
        const ca = Math.cos(a);
        // coordinates
        return [
            ox + ca * xt - sa * yt,
            oy + sa * xt + ca * yt
        ];
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @returns {boolean} `true` iff data was cleared.
     */
    const clearOrbitData = function(char) {
        return delete char[P_TIME], delete char[P_DATA];
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @param {?OrbitData} data set this data on `char`
     * @returns {boolean} `true` iff character's orbit data was set.
     */
    const setOrbitData = function(char, data) {
        if (!data)
            return clearOrbitData(char);
        if (char[P_DATA] && Object.keys(data).every(
            k => data[k] === char[P_DATA][k]
        ))
            return false;   // no change
        // [ ] Q37 - consider XY transition: memorise XY, then lerp the gap over N frames until in sync with new orbit. (Can't be radial without hopping on change of period.)
        char[P_DATA] = data;
        char[P_TIME] = 0;
        return true;
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @returns {OrbitData|{}} Orbit data for `char`, or empty object.
     */
    const getOrbitData = function(char) {
        return char[P_DATA] ?? [];
    };

    /**
     * @param {number} id -
     * - `+1` or more => map event `id`;
     * - ` 0`         => screen centre;
     * - `-1`         => player;
     * - `-2` or less => follower `-2 - id`.
     * @returns {Game_CharacterBase|undefined}
     * Corresponding character, or `undefined`.
     */
    const character = function(id) {
        if (typeof id !== "number")
            return null;
        switch (id) {
            case -1:
                return $gamePlayer;
            case 0:
                return 0;   // see `centreXY`.
        }
        if (id < -1)
            return $gamePlayer.followers().follower(-2 - id);
        return $gameMap.event(id);
    };

    /**
     * @returns {[x:number,y:number]}
     * Screen centre coordinates, for eponymous orbit target.
     * @since v15
     */
    const centreXY = function() {
        // Calculate screen centre manually in case of player-cam centerX/Y offset.
        return [
            $gameMap.displayX() + ($gameMap.screenTileX() - 1) / 2,
            $gameMap.displayY() + ($gameMap.screenTileY() - 1) / 2
        ];
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @returns {[x:number,y:number]} Orbit offset.
     */
    const getOrbitXY = function(char) {
        const [id, rx, ry, Tx, Ty, ro] = getOrbitData(char);
        const c = character(id);
        if (c === 0) {
            const [x, y] = centreXY();
            return getXY1(x, y, rx, ry, Tx, Ty, ro, char[P_TIME]);
        }
        if (c instanceof Game_CharacterBase)
            return getXY1(c._realX, c._realY, rx, ry, Tx, Ty, ro, char[P_TIME]);
        return [null, null];
    };

    /**
     * Updates orbit for given character by 1 frame.
     * @param {Game_CharacterBase} char reference character
     * @returns {boolean} `true` iff orbit of `char` was updated.
     */
    const updateOrbitPos = function(char) {
        const [x, y] = getOrbitXY(char);
        if (!Number.isFinite(x) || !Number.isFinite(y))
            return false;
        ++char[P_TIME];
        char.setPosition(x, y);  // hey past-me: setPosition allows fractional coords!
        char.updateStop();
        return true;
    };

    /**
     * @param {Game_Event} event reference map event
     * @returns {boolean} `true` iff `event` should proceed with orbital motion.
     */
    const isOrbitEvent = function(event) {
        return !!getOrbitData(event).length && !event.isStarting() && !event._locked;
    };

    /** Triggers event due to its orbit motion. */
    Game_Event.prototype[M_TRIGGER_ORBIT] = function() {
        if (this.isTriggerIn([1, 2]) && $gamePlayer.pos(this.x, this.y))
            this.start();
    };
    // [ ] Q37 - consider a cooldown: reset on orbit trigger, update on orbit update, cannot trigger while on cooldown. Maybe trigger-based: cannot trigger again until wouldn't trigger for 1+ frames.

    // Patch - parse orbit data on page change.
    void (alias => {
        Game_Event.prototype.setupPage = function() {
            alias.apply(this, arguments);
            setOrbitData(this, parseEventTag(this));
        };
    })(Game_Event.prototype.setupPage);

    // Patch - update orbit position each frame.
    void (alias => {
        Game_Event.prototype.update = function() {
            alias.apply(this, arguments);
            if (isOrbitEvent(this)) {
                updateOrbitPos(this);
                this[M_TRIGGER_ORBIT]();
            }
        };
    })(Game_Event.prototype.update);

    // - reference -
    // var t0 = 0, ox = 12, oy = 5, rx = 4, ry = 4, Tx = 300, Ty = 300, ro = 0;
    // this._t = (this._t || t0) + 1;
    // this._x = this._realX = ox + rx * Math.cos(Math.PI * ro / 180) * Math.cos(2 * Math.PI * this._t / Tx) - ry * Math.sin(Math.PI * ro / 180) * Math.sin(2 * Math.PI * this._t / Ty);
    // this._y = this._realY = oy + rx * Math.sin(Math.PI * ro / 180) * Math.cos(2 * Math.PI * this._t / Tx) + ry * Math.cos(Math.PI * ro / 180) * Math.sin(2 * Math.PI * this._t / Ty);
    // if ($gamePlayer.pos(Math.round(this._realX), Math.round(this._realY))) this.start();

})();

// Q38) Touch movement - hold to dash, change target only on new touch.
void (() => { if (!CAE.Tweaks.Q38) return;
'use strict';

    // Only new touches can change touch-move destination.
    void (alias => {
        Scene_Map.prototype.processMapTouch = function() {
            alias.apply(this, arguments);
            this._touchCount = 0;
        };
    })(Scene_Map.prototype.processMapTouch);

    // Touch-move dashes only while touch (or normal dash button) is held.
    void (alias => { if (!CAE.Tweaks.Q38.HOLD_TO_DASH) return;
        Game_Player.prototype.updateDashing = function() {
            alias.apply(this, arguments);
            if (
                !this.isMoving() &&                 // don't update mid-tile, like core
                this._dashing &&                    // core says we're dashing
                $gameTemp.isDestinationValid() &&   // touch movement active
                (   // holding touch inverts dash behaviour (cf "Always Dash" option)
                    this.isDashButtonPressed()
                    === TouchInput.isLongPressed()  // core: keyRepeatWait = 24 frames
                )
            )
                this._dashing = false;
        };
    })(Game_Player.prototype.updateDashing);

})();

// Q39) Attack/guard commands show skill name (if not blank).
void (() => { if (!CAE.Tweaks.Q39) return;
'use strict';

    /** Cache for system checks, see {@linkcode isShowAttackIcon} & {@linkcode isShowGuardIcon}. */
    const showIcon = {};

    /** String added between icon and skill name. */
    const ICON_SPACE = "\u2009";    // thin space

    /**
     * @param {string} commandName
     * Original name of command
     * @returns {boolean}
     * `true` iff should include icon in new name.
     */
    const isShowIcon = function(commandName) {
        if (typeof commandName !== "string")
            return false;
        // "does original command start with `\i[`?" - if so, it implicitly supports drawTextEx
        return /^\\i\[/.test(commandName);
    };

    /** @returns {boolean} `true` iff should prepend icon text code to attack command name. */
    const isShowAttackIcon = function() {
        if (!("atk" in showIcon) && $dataSystem)
            showIcon.atk = isShowIcon($dataSystem.terms.commands[2]);
        return showIcon.atk;
    };

    /** @returns {boolean} `true` iff should prepend icon text code to guard command name. */
    const isShowGuardIcon = function() {
        if (!("grd" in showIcon) && $dataSystem)
            showIcon.grd = isShowIcon($dataSystem.terms.commands[3]);
        return showIcon.grd;
    };

    /**
     * @param {number} skillId
     * ID of source skill.
     * @param {boolean} [addIcon=false]
     * `true` iff should include icon text code in result.
     * @param {boolean} [center=false]
     * `true` iff should visually centre skill name in output.
     * @returns {?string}
     * New command name, or `null`.
     */
    const nameFromSkillId = function(skillId = 0, addIcon = false, center = false) {
        const skill = $dataSkills[skillId];
        if (skill?.name) {
            if (!addIcon)
                return skill.name;
            return "\\i[" + skill.iconIndex + "]" + ICON_SPACE
                + skill.name
                + (center ? ICON_SPACE + "\\i[0]" : "");
        }
        return null;
    };

    /** Non-conflicting identifier for new "should align command text" method on `Window_ActorCommand`. */
    const SYM_M_SHOULD_CENTER = Symbol();

    /** Non-conflicting identifier for new "rename command" method on `Window_ActorCommand`. */
    const SYM_M_RENAME = Symbol();

    /** @returns {boolean} `true` iff should centre skill name in composite text. */
    Window_ActorCommand.prototype[SYM_M_SHOULD_CENTER] = function() {
        return this.itemTextAlign() === "center";
    };

    /**
     * Sets the display name of the first command with symbol `symbol` to `name`.
     * @param {string} symbol command symbol
     * @param {string} name new display name
     * @returns {boolean} `true` iff command was renamed.
     */
    Window_ActorCommand.prototype[SYM_M_RENAME] = function(symbol = "", name = "") {
        if (name) {
            const n = this.findSymbol(symbol);
            if (n >= 0)
                return this._list[n].name = name, true;
        }
        return false;
    };

    // Patch - rename attack command.
    void (alias => {
        Window_ActorCommand.prototype.addAttackCommand = function() {
            alias.apply(this, arguments);
            this[SYM_M_RENAME]("attack", nameFromSkillId(
                this._actor.attackSkillId(),
                isShowAttackIcon(),
                this[SYM_M_SHOULD_CENTER]()
            ));
        };
    })(Window_ActorCommand.prototype.addAttackCommand);

    // Patch - rename guard command.
    void (alias => {
        Window_ActorCommand.prototype.addGuardCommand = function() {
            alias.apply(this, arguments);
            this[SYM_M_RENAME]("guard", nameFromSkillId(
                this._actor.guardSkillId(),
                isShowGuardIcon(),
                this[SYM_M_SHOULD_CENTER]()
            ));
        };
    })(Window_ActorCommand.prototype.addGuardCommand);

})();

// Q40) Touch select always plays cursor SE on index change.
void (() => { if (!CAE.Tweaks.Q40) return;
    const alias = Window_Selectable.prototype.onTouchSelect;
    Window_Selectable.prototype.onTouchSelect = function(trigger, ...args) {
        // Respect `isHoverEnabled` setting.
        alias.call(this, trigger || this.isHoverEnabled(), ...args);
    };
})();

// Q41) Simple no-shadow colour lighting for party/events.
void (() => { if (!CAE.Tweaks.Q41) return;
'use strict';

    /**
     * Notetag for maps that require lighting filter.\
     * Optional colour: `<TAG_DARK: r, g, b, a>`.
     * @type {string}
     */
    const TAG_DARK = CAE.Tweaks.Q41.tag_dark || "dark";

    /**
     * Event/trait tag (comment or note): `<TAG_LIGHT: radius, r, g, b, intensity, directionality>`.\
     * Contributes to bearer's light source.
     * @type {string}
     */
    const TAG_LIGHT = CAE.Tweaks.Q41.tag_light || "light";

    /**
     * Trait notetag: `<TAG_DIM: intensity>`.\
     * Reduce intensity of all bearer's light sources by `a`~[-255, 255], e.g. for blindness effects.\
     * Also affects natural FoV when on party leader.
     * Accepts negative values for brightening.
     * @type {string}
     */
    const TAG_DIM = CAE.Tweaks.Q41.tag_dim || "dim";

    /** Tag identifier for "flickering" modifier for light sources: `<TAG_FLICKER>`. @type {string} */
    const TAG_FLICKER = "light flicker";
    // [ ] Q41 - TAG_FLICKER: vortices => RNG model. Skew-mean? Moving mean, like 80% original + 20% rand? Must remain in bounds.

    /** Tag identifier for "breathing" modifier for light sources: `<TAG_BREATHE: period>`. @type {string} */
    const TAG_BREATHE = "light breathe";
    // [ ] Q41 - TAG_BREATHE: parse tag, multiply base radius, cf breatheMultR.

    /** Maximum number of light sources to process simultaneously. @type {number} */
    const MAX_LIGHTS = CAE.Tweaks.Q41.MAX_LIGHTS; // 16;

    /** Fractional radius from centre, from where light begins to fade. @type {number} */
    const FEATHER = CAE.Tweaks.Q41.FEATHER; // 0.5;

    /** Radius (px) of "keyhole" around arc-light source. @type {number} */
    const SELF_RADIUS = CAE.Tweaks.Q41.SELF_RADIUS; // 32;

    /** Standard FoV angle (degrees). @type {number} */
    const FOV_ANGLE = CAE.Tweaks.Q41.FOV_ANGLE; // 135;

    /** Coverage ratio for FoV vs point source. @type {number} */
    const FOV_RATIO = FOV_ANGLE / 360;

    /** For checking symmetric FoV edge. @type {number} */
    const GRAD = Math.fround(Math.tan(FOV_ANGLE * Math.PI / 360));

    /** Range of player FoV without light sources. @type {number} */
    const NATFOV_RANGE = CAE.Tweaks.Q41.NAT_RANGE; // 4 tiles

    /** Colour of player FoV without light sources. @type {[r:number,g:number,b:number,intensity:number]} */
    const NATFOV_COLOUR = CAE.Tweaks.Q41.NAT_COLOUR; // [0,0,0,0.1]

    /**
     * Determines which layer of the spriteset to filter:
     * - `true` = `spriteset._baseSprite` (excludes pictures, timer, weather);
     * - `false` = entire spriteset.
     * @type {boolean}
     */
    const FILTER_BASE = CAE.Tweaks.Q41.FILTER_BASE; // true

    /**
     * Non-conflicting identifier for array on `Game_Player` containing
     * pointers to `Game_Actor` instances whose light data should be updated.
     */
    const SYM_REFRESH_ACTOR_DATA = Symbol();

    /** Identifier for new array on `Game_Map` containing dark colour RGBA override. @type {string} */
    const P_DARK_COLOUR = `_${CAE.Tweaks.NAME}_Q41-darkColour`;

    /**
     * Reducer function for trimming shader code on plugin load.
     * @param {string} a accumulator
     * @param {string} c current value
     * @param {number} n current index
     * @param {string[]} arr input array
     * @returns {string} output shader body
     */
    const _joinShader = (a, c, n, arr) => a + "\n" + c.trimStart();

    // [ ] Q41 - consider adding alternative FoV for d = -1. Uniform structure is in place, just need shader edits & alternative-fov param stuff.

    /** Vertex shader source. */
    const VERT = [
        // PIXI Filter inputs.
        "attribute vec2 aVertexPosition;",
        "uniform mat3 projectionMatrix;",
        "varying vec2 vTextureCoord;",
        "uniform vec4 inputSize;",
        "uniform vec4 outputFrame;",
        // Carry texture width/height to fragment shader.
        "varying vec2 vTextureSize;",
        // Get vertex position (frame scaling).
        "vec4 filterVertexPosition() {",
        "  vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.0)) + outputFrame.xy;",
        "  return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);",
        "}",
        // Get texture coord within batch.
        "vec2 filterTextureCoord() {",
        "  return aVertexPosition * (outputFrame.zw * inputSize.zw);",
        "}",
        // Main.
        "void main() {",
        "  gl_Position = filterVertexPosition();",
        "  vTextureCoord = filterTextureCoord();",
        "  vTextureSize = inputSize.xy;",
        "}",
    ].reduce(_joinShader, "");

    /** Fragment shader source (with feather). */
    const FRAG_SOFT = [
        // Compile-time constants.
        "const int iMAX_LIGHTS = " + MAX_LIGHTS.toFixed(0) + ";",
        "const float fFEATHER = " + (FEATHER % 1 ? FEATHER : FEATHER.toFixed(1)) + ";",
        "const float fSELF_RAD = " + (SELF_RADIUS % 1 ? SELF_RADIUS : SELF_RADIUS.toFixed(1)) + ";",
        "const float fGRAD = " + GRAD + ";",
        // PIXI filter inputs.
        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",
        // Carry texture width/height from vertex shader.
        "varying vec2 vTextureSize;",
        // Uniforms (positions, colours).
        "uniform vec4 vLights[iMAX_LIGHTS];",    // x, y, radius, dir
        "uniform vec4 vColours[iMAX_LIGHTS];",   // r, g, b, intensity
        "uniform vec4 vDarkColour;",             // r, g, b, a
        // Main.
        "void main() {",
        "  vec4 vPoint = texture2D(uSampler, vTextureCoord);",
        "  vec4 vLight = vec4(vDarkColour.rgb, 0.0);",  // dark colour @ 0 illumination
        "  vec2 vPt = vTextureCoord * vTextureSize;",
        "  for (int n = 0; n < iMAX_LIGHTS; ++n) {",
        "    vec2 vSrc = 1.0 * vLights[n].xy;",
        "    float r = vLights[n].z;",
        "    if (r > 0.0) {",   // null sources have radius 0
        "      float s = distance(vPt, vSrc);",
        // Check range and FoV (inlined).
        "      if (s < r) {",
        "        int d = int(vLights[n].w);",
        "        float edge = 0.0;",
        "        if (d == 0) {",
        "          edge = 1.0;",    // point source
        "        } else {",
        "          vec2 v = abs(vPt - vSrc);",
        "          if ((d == 2 && vPt.y >= vSrc.y) || (d == 8 && vPt.y <= vSrc.y)) {",
        "            float x = v.y * fGRAD;",
        "            edge = 1.0 - smoothstep(x * fFEATHER, x, v.x);",    // FoV feather (UD)
        "          } else if ((d == 4 && vPt.x <= vSrc.x) || (d == 6 && vPt.x >= vSrc.x)) {",
        "            float y = v.x * fGRAD;",
        "            edge = 1.0 - smoothstep(y * fFEATHER, y, v.y);",    // FoV feather (LR)
        "          }",
        "          if (s < fSELF_RAD) {",   // FoV feather self-illumination
        "            edge = max(edge, 1.0 - smoothstep(fFEATHER * fSELF_RAD, fSELF_RAD, s));",
        "          }",
        "        }",
        "        float r0 = r * fFEATHER;",
        "        if (s > r0) {",    // radial feather
        "          edge *= 1.0 - smoothstep(r0, r, s);",
        "        }",
        "        edge *= vColours[n].a;",
        "        if (edge > 0.0) {",    // screen blend multiple lights
        "          vLight += edge * vec4(vColours[n].rgb * (vec3(1) - vLight.rgb), 1.0 - vLight.a);",
        "        }",
        "      }",
        "    }",
        "  }",
        // Screen blend light with backdrop, then alpha composite onto dark.
        "  gl_FragColor = vec4(mix(",
        "    mix(vPoint.rgb, vDarkColour.rgb, vDarkColour.a),",
        "    vPoint.rgb + vLight.rgb - vPoint.rgb * vLight.rgb,",
        "    vLight.a",
        "  ), vPoint.a);",
        "}"
    ].reduce(_joinShader, "");

    //#region Hard-light blend, cf https://drafts.fxtf.org/compositing/#blendinghardlight.
        // Harsh, doesn't mesh well with the feather, maybe try soft light instead?
        // (Screen seems OK tho, and much less intensive.)
        // "  vec3 dark = mix(vPoint.rgb, vDarkColour.rgb, vDarkColour.a);",
        // "  if (vPoint.a > 0.0) {",
        // "    vec3 lite = 2.0 * vLight.rgb;",
        // "    if (lite.r <= 1.0) {",   // darken as multiply(point, 2*light)
        // "      lite.r *= vPoint.r;",
        // "    } else {",               // brighten as screen(point, 2*light - 1)
        // "      lite.r += vPoint.r * (2.0 - vLight.r) - 1.0;",
        // "    }",
        // "    if (lite.g <= 1.0) {",
        // "      lite.g *= vPoint.g;",
        // "    } else {",
        // "      lite.g += vPoint.g * (2.0 - vLight.g) - 1.0;",
        // "    }",
        // "    if (lite.b <= 1.0) {",
        // "      lite.b *= vPoint.b;",
        // "    } else {",
        // "      lite.b += vPoint.b * (2.0 - vLight.b) - 1.0;",
        // "    }",
        // "    gl_FragColor = vec4(mix(dark, lite, min(1.0, vLight.a)), vPoint.a);",
        // "  } else {",
        // "    gl_FragColor = vec4(dark, vPoint.a);",
        // "  }",
    //#endregion Alternative blend mode ruminations

    /** Fragment shader source (no feather). */
    const FRAG_HARD = [
        // Compile-time constants.
        "const int iMAX_LIGHTS = " + MAX_LIGHTS.toFixed(0) + ";",
        "const float fSELF_RAD = " + (SELF_RADIUS % 1 ? SELF_RADIUS : SELF_RADIUS.toFixed(1)) + ";",
        "const float fGRAD = " + GRAD + ";",
        // PIXI filter inputs.
        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",
        // Carry texture width/height from vertex shader.
        "varying vec2 vTextureSize;",
        // Uniforms (positions, colours).
        "uniform vec4 vLights[iMAX_LIGHTS];",    // x, y, radius, dir
        "uniform vec4 vColours[iMAX_LIGHTS];",   // r, g, b, intensity
        "uniform vec4 vDarkColour;",             // r, g, b, a
        // Main.
        "void main() {",
        "  vec4 vPoint = texture2D(uSampler, vTextureCoord);",
        "  vec4 vLight = vec4(vDarkColour.rgb, 0.0);",
        "  vec2 vPt = vTextureCoord * vTextureSize;",
        "  for (int n = 0; n < iMAX_LIGHTS; ++n) {",
        "    vec2 vSrc = 1.0 * vLights[n].xy;",
        "    float r = vLights[n].z;",
        "    if (r > 0.0) {",
        "      float s = distance(vPt, vSrc);",
        // Check range and FoV (inlined).
        "      if (s < r) {",
        "        int d = int(vLights[n].w);",
        "        bool lit = false;",
        "        if (d == 0 || s < fSELF_RAD) {",   // point source or FoV self-illumination
        "          lit = true;",
        "        } else {",
        "          vec2 v = abs(vPt - vSrc);",
        "          if ((d == 2 && vPt.y >= vSrc.y) || (d == 8 && vPt.y <= vSrc.y)) {",
        "            if (v.x <= v.y * fGRAD) {",
        "              lit = true;",
        "            }",
        "          } else if ((d == 4 && vPt.x <= vSrc.x) || (d == 6 && vPt.x >= vSrc.x)) {",
        "            if (v.y <= v.x * fGRAD) {",
        "              lit = true;",
        "            }",
        "          }",
        "        }",
        "        if (lit) {",   // screen blend
        "          vLight += vColours[n].a * vec4(vColours[n].rgb * (vec3(1.0) - vLight.rgb), 1.0 - vLight.a);",
        "        }",
        "      }",
        "    }",
        "  }",
        "  gl_FragColor = vec4(mix(",   // as soft shader
        "    mix(vPoint.rgb, vDarkColour.rgb, vDarkColour.a),",
        "    vPoint.rgb + vLight.rgb - vPoint.rgb * vLight.rgb,",
        "    vLight.a",
        "  ), vPoint.a);",
        "}"
    ].reduce(_joinShader, "");

    /** Filter uniforms. */
    const UNIFORMS = {
        uSampler:    null,
        vLights:     new Float32Array(4 * MAX_LIGHTS),
        vColours:    new Float32Array(4 * MAX_LIGHTS),
        vDarkColour: new Float32Array(4)
    };

    /** Soft lighting filter. @type {PIXI.Filter} */
    const F_SOFT = new PIXI.Filter(VERT, FRAG_SOFT, UNIFORMS);

    /** Hard lighting filter. @type {PIXI.Filter} */
    const F_HARD = new PIXI.Filter(VERT, FRAG_HARD, UNIFORMS);

    /** Values relating to hard/soft lighting option. */
    const OPT = {
        /** Display text. @type {string} */
        TXT: CAE.Tweaks.Q41.OPT_TXT, // "Soft Lighting",
        /** Command symbol and save property name. @type {string} */
        SYM: CAE.Tweaks.Q41.OPT_SYM, // "softLight",
        /** Default option value. @type {boolean} */
        DEF: CAE.Tweaks.Q41.OPT_DEF, // true,
        /** `true` iff soft lighting is enabled. @type {boolean} */
        isOn: false
    };
    OPT.isOn = OPT.DEF;

    /** @returns {PIXI.Filter} lighting filter currently in use. */
    const getFilter = function() {
        return OPT.isOn ? F_SOFT : F_HARD;
    };

    /**
     * Gets the display container to which the filter should be applied.
     * @param {Spriteset_Base} spriteset reference spriteset instance
     * @returns {PIXI.DisplayObject} relevant display object.
     */
    const getFilterContainer = function(spriteset) {
        return FILTER_BASE ? spriteset._baseSprite : spriteset;
    };

    /**
     * Elliptic Euler method approximation (aa + bb - dab = k).
     *
     * A bit cheaper in CPU than recalculating (co)sine each time,\
     * and sufficiently precise.
     * @param {number} a initial value for coord 1.
     * @param {number} b initial value for coord 2.
     * @param {number} d difference / step size.
     * @yields {number} next point on curve.
     */
    // const breatheMultR = function*(a = 3, b = 4, d = 0.01) {
    //     const c = 2 * Math.hypot(a, b);
    //     while (true) {
    //         a -= b * d;
    //         b += a * d;
    //         yield b / c;
    //     }
    // };

    /**
     * Stores radius (px), colour (r,g,b,i), and directionality (0|1) of a light source.
     * @typedef {object} LightSourceCache
     * @property {number} r
     * Light radius.
     * @property {[r:number,g:number,b:number,intensity:number]} c
     * Light colour/intensity.
     * @property {number} d
     * Direction: `0` = point source, `1` = standard arc.
     */
    /** @type {Map.<number,LightSourceCache>} Maps event ID to its light source cache. */
    const evData = new Map();

    /** @type {Map.<number,LightSourceCache>} Maps party index to its light source cache. */
    const acData = new Map();

    /**
     * @param {?LightSourceCache} data
     * Input light source cache data.
     * @returns {boolean}
     * `true` if input is valid source data.
     */
    const isValidData = function(data) {
        return data?.r > 0
            && Array.isArray(data.c)
            && data.c[3] > 0
            && (data.c[0] > 0 || data.c[1] > 0 || data.c[2] > 0);
    };

    /**
     * @param {string} tag
     * Input tag value.
     * @returns {?LightSourceCache}
     * Corresponding data, or `null` if invalid.
     */
    const parseLightTag = function(tag) {
        // Used in Note fields of events & trait objects.
        // Also used in Comment commands in map events.
        if (typeof tag !== "string")
            return null;
        // [ ] Q41 - parse flicker/breathe tags.
        const [r, cr, cg, cb, ci, dir] = Array.from(tag.split(","), s => Number(s));
        const c = [cr, cg, cb, ci];     // r, g, b, intensity
        // fill in absent colour values (undefined or NaN)
        for (let n = 0; n < 4; ++n)
            if (!Number.isFinite(c[n]))
                switch (n) {
                    case 0:
                    case 3:
                        c[n] = 255; break;
                    default:
                        c[n] = c[n - 1]; break;
                }
        for (let n = 4; n--;)
            c[n] = c[n].clamp(0, 255) / 255;
        return {
            r,
            c,
            d: Math.sign(dir) || 0
        };
    };

    /**
     * @param {string} tag
     * Dim tag value.
     * @returns {number}
     * Parsed intensity modifier value.
     */
    const parseDimTag = function(tag) {
        if (tag && typeof tag === "string")
            return parseInt(tag, 10);
        return 0;
    };

    /**
     * @param {string|boolean} tag
     * Map tag value.
     * @returns {[red:number,green:number,blue:number,alpha:number]}
     * RGBA dark colour values [0, 1]Q parsed from tag [0, 255]Z.
     */
    const parseMapTag = function(tag) {
        if (tag && typeof tag !== "string")     // 0 inputs
            return [0, 0, 0, 1];    // opaque black
        const c = Array.from(tag.split(","), s => Number(s));
        c.length = 4;
        for (let n = 0; n < 4; ++n) {
            if (Number.isFinite(c[n]))
                c[n] = c[n].clamp(0, 255) / 255;
            else
                switch (n) {
                    case 0:
                        c[n] = 0; break;
                    case 3:
                        c[n] = 1; break;
                    default:
                        c[n] = c[n - 1]; break;
                }
        }
        return c;
    };

    /**
     * @param {Game_Event} ev
     * Reference event.
     * @yields {string}
     * Next comment tag or notetag on `ev`.
     */
    const allEventTags = function*(ev) {
        yield* CAE.Tweaks.Utils.getEventTags(ev, TAG_LIGHT, true);
    };

    /**
     * @param {Game_Event} ev
     * Reference event.
     * @returns {?[id:number,data:LightSourceCache]}
     * ID and data, or `null`.
     */
    const makeEventData = function(ev) {
        for (const tag of allEventTags(ev)) {
            const d = parseLightTag(tag);
            if (isValidData(d)) {
                const id = ev.eventId();
                return [id, d];  // return first applicable result
            }
        }
        return null;
    };

    /**
     * To ensure each actor has at most 1 light source.
     * This is deliberate, to make it easier to manage the max light count.
     *
     * It is a lossy process and will not reproduce the same result
     * as showing the merged sources separately.
     * @param {?LightSourceCache} a
     * Light source cache 1, or `null`.
     * @param {?LightSourceCache} b
     * Light source cache 2, or `null`.
     * @returns {?LightSourceCache}
     * Combined light source cache data.
     */
    const mergeData = function(a, b) {
        if (a === null)
            return b;
        if (b === null)
            return a;
        const res = { r: a.r, c: a.c.slice(), d: a.d };
        // largest r
        if (b.r > a.r)
            res.r = b.r;
        // screen blend colours by area: smaller source gives less RGBA
        const sizeA = (a.d ? FOV_RATIO : 1) * (a.r / res.r) ** 2;
        const sizeB = (b.d ? FOV_RATIO : 1) * (b.r / res.r) ** 2;
        for (let n = 4; n--;)
            res.c[n] += sizeB * b.c[n] * (1 - sizeA * res.c[n]);
        // directionality 0 > 1 > other
        if (b.d === 0)
            res.d = 0;
        else if (b.d === 1 && a.d !== 0)
            res.d = 1;
        return res;
    };

    /**
     * @param {LightSourceCache} data
     * Basic light source info.
     * @param {number} dim
     * Dimming modifier.
     * @returns {LightSourceCache}
     * Dimmed `data`.
     */
    const applyDim = function(data, dim) {
        if (dim && data)
            data.c[3] = (data.c[0] - dim / 255).clamp(0, 1);
        return data;
    };

    /**
     * @param {Game_Actor} actor
     * Reference actor.
     * @param {number} index
     * Index of `actor` in party.
     * @returns {?[index:number,data:LightSourceCache]}
     * Index & data, or `null`.
     */
    const makeActorData = function(actor, index /*, arr*/) {
        let data = null;
        let dim  = 0;
        if (actor instanceof Game_Actor)
            for (const o of actor.traitObjects()) {
                data = mergeData(data, parseLightTag(o.meta[TAG_LIGHT]));
                dim += parseDimTag(o.meta[TAG_DIM]);
            }
        applyDim(data, dim);
        if (isValidData(data))
            return [index, data];
        return null;
    };

    /**
     * @param {number} index
     * Party member index (assumes `index >= 0`).
     * @returns {boolean}
     * `true` iff this party member can have a light source.
     *
     * This is irrespective of whether they DO have a light source right now.
     */
    const partyMemberCanHaveLightSource = function(index) {
        return index < $gameParty.maxBattleMembers();
    };

    /**
     * Refreshes light source cache for given actor.
     * @param {Game_Actor} actor
     * Actor reference.
     * @returns {boolean}
     * `true` iff cached data was changed.
     */
    const refreshActorData = function(actor) {
        const i = actor.index();
        if (i >= 0 && partyMemberCanHaveLightSource(i)) {
            const data = makeActorData(actor, i);
            if (data) {
                acData.set(data[0], data[1]);
                return true;
            }
        }   // not leader/follower or no source - fall through
        return acData.delete(i);    // not in party
    };

    /** Re-initialises actor data, used to generate light sources. */
    const refreshAllActorData = function() {
        acData.clear();
        if ($gameParty)
            for (const actor of $gameParty.members())
                refreshActorData(actor);
    };

    /**
     * Requests actor light data refresh at next update.
     *
     * Implemented to avoid loop involving actors being
     * initialised/refreshed before being added to `$gameActors`.\
     * Also makes multiple refreshes per frame cheaper to perform.
     */
    const requestActorDataRefresh = function() {
        $gamePlayer[SYM_REFRESH_ACTOR_DATA] = true;
    };

    /**
     * @returns {boolean}
     * `true` iff requested actors had their data refreshed.
     */
    const refreshRequestedActorData = function() {
        const player = $gamePlayer;
        if (SYM_REFRESH_ACTOR_DATA in player) {
            refreshAllActorData();
            clearActorSourceCache();
            requestFullUniformUpdate();
            delete player[SYM_REFRESH_ACTOR_DATA];
            return true;
        }
        return false;
    };

    /**
     * Creates and attaches proxy to `party._actors`.\
     * Detects party changes to refresh `acData` when appropriate.
     * @param {Game_Party} party
     * Reference `Game_Party` to proxy.
     * @returns {boolean}
     * `true` iff proxy was applied.
     */
    const applyActorProxy = function(party) {
        if (!(party instanceof Game_Party))
            return false;
        party._actors = new Proxy(party._actors, {
            set: function(arr, prop, value) {
                const success = Reflect.set(...arguments);
                if (success && !isNaN(prop))    // prop is actually a string
                    requestActorDataRefresh();
                return success;
            },
            deleteProperty: function(arr, prop) {
                const success = Reflect.deleteProperty(...arguments);
                if (success && !isNaN(prop))
                    requestActorDataRefresh();
                return success;
            }
        });
        return true;
    };

    /** Clears event light data cache. */
    const clearEventData = function() {
        evData.clear();
    };

    /**
     * Refreshes light source cache for given map event.
     * @param {Game_Event} ev
     * Reference map event.
     * @returns {boolean}
     * `true` iff cached data was changed.
     */
    const refreshEventData = function(ev) {
        const data = makeEventData(ev);
        if (data) {
            evData.set(data[0], data[1]);
            return true;
        }
        return evData.delete(ev.eventId());
    };

    /** Refreshes light source cache of all map events. */
    const refreshAllEventData = function() {
        for (const ev of $gameMap.events())
            refreshEventData(ev);
    };

    /**
     * @returns {number}
     * Lightless player FoV radius.
     */
    const naturalFovRange = function() {
        return NATFOV_RANGE; // 4 * 48 px
    };

    /**
     * @returns {[red:number,green:number,blue:number,intensity:number]}
     * Lightless player FoV light colour/intensity.
     */
    const naturalFovColour = function() {
        return applyDim(
            { c: NATFOV_COLOUR.slice() },
            $gameParty.leader()?.traitObjects().reduce(
                (a, c) => a + parseDimTag(c.meta[TAG_DIM])
            , 0)
        ).c;
        // return NATFOV_COLOUR; // [0, 0, 0, 0.1];
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @returns {number} X coordinate for light source from `char`.
     */
    const getSourceX = function(char) {
        return char.screenX();
    };

    /**
     * @param {Game_CharacterBase} char reference character
     * @returns {number} Y coordinate for light source from `char`.
     */
    const getSourceY = function(char) {
        return char.screenY()               // feet
            - $gameMap.tileHeight() / 2     // to mid-height
            - char.shiftY();                // align FoV root to chargen eyes
    };

    /**
     * Non-conflicting identifier for constructed object cache
     * for player & event `LightSourceData` generation.
     */
    const SYM_SOURCE_DATA_CACHE = Symbol();

    /**
     * @param {number} index
     * Index of actor in party.
     * @returns {Game_Character}
     * Corresponding map character reference.
     */
    const partyChar = function(index) {
        if (index === 0)
            return $gamePlayer;
        return $gamePlayer.followers().follower(index - 1);
    };

    /**
     * @param {number} index
     * Index of actor in party.
     * @returns {LightSourceData}
     * Light source data for that actor.
     */
    const getActorSource = function(index) {
        const o = acData.get(index);
        // this has now largely been superceded by `getPlayerSources`.
        return o[SYM_SOURCE_DATA_CACHE] ??= { i: index, p: [0, 0, o.r, o.d], c: o.c };
    };

    /** Clears cached light data for party members. */
    const clearActorSourceCache = function() {
        delete $gamePlayer?.[SYM_SOURCE_DATA_CACHE];
    };

    /**
     * Stores screen position/radius and colour for a light source.
     * @typedef {object} LightSourceData
     * @property {[x:number,y:number,r:number,d:number]} p
     * Light screen position, radius (px), and direction (numpad).
     * @property {[r:number,g:number,b:number,intensity:number]} c
     * Light colour/intensity
     */
    /** @returns {LightSourceData[]} player light source data. */
    const getPlayerSources = function() {
        // avoid redundant reconstruction
        const a = $gamePlayer[SYM_SOURCE_DATA_CACHE] ??= [
            // "Lightless" source for $gamePlayer
            { p: [0, 0, naturalFovRange(), 1], c: naturalFovColour() },
            // Per-actor light sources, if any
            ...[...acData.keys()].map(getActorSource)
        ];
        // player night vision
        a[0].p[0] = getSourceX($gamePlayer);
        a[0].p[1] = getSourceY($gamePlayer);
        a[0].p[3] = $gamePlayer.direction();
        // member sources
        for (let n = a.length; n--;) {
            const i = a[n].i;
            const char = partyChar(i);
            if (char) {
                a[n].p[0] = getSourceX(char);
                a[n].p[1] = getSourceY(char);
                // [ ] Q41 - flicker/breathe radius for party member light source
                a[n].p[3] = Math.sign(a[n].p[3]) * char.direction();
            }
        }
        // clear cache on colour change => no need to update colour each frame.
        return a;
    };

    /**
     * @param {number} id event ID
     * @returns {LightSourceData[]} event light source data.
     */
    const getEventSource = function(id) {
        const o = evData.get(id);
        // avoid redundant reconstruction
        const res = o[SYM_SOURCE_DATA_CACHE] ??= { p: [0, 0, 0, 0], c: o.c };
        const char = $gameMap.event(id);
        res.p[0] = getSourceX(char);
        res.p[1] = getSourceY(char);
        res.p[2] = o.r; // [ ] Q41 - flicker/breathe radius for event light source
        res.p[3] = o.d * char.direction();
        // data/cache is cleared on light toggle; colour is otherwise constant
        return res;
    };

    /**
     * @param {number} x
     * Circle centre screen X (px).
     * @param {number} y
     * Circle centre screen Y (px).
     * @param {number} r
     * Circle radius (px).
     * @returns {boolean}
     * `true` iff provided coordinates specify a circle that is at least partially on-screen.
     */
    const circleOnScreen = function(x = 0, y = 0, r = 0) {
        // screen centre coordinates.
        const hw = Graphics.width / 2,
              hh = Graphics.height / 2;
        // apply symmetry/offset.
        const sx = Math.abs(x - hw) - hw,
              sy = Math.abs(y - hh) - hh;
        // check if circle centre is on-screen.
        if (sx <= 0 && sy <= 0)
            return true;
        // check single-axis on-screen.
        if (sx <= r || sy <= r)
            return true;
        // check corner on-screen.
        return sx * sx + sy * sy <= r * r;
    };

    /**
     * Intended for use with Array#filter.
     * Hard cap on light source count will be applied after this.
     * @param {LightSourceData} source reference light source
     * @param {number} n index in original source array
     * @param {LightSourceData[]} arr original source array
     * @returns {boolean} `true` iff given source is OK to show.
     */
    const shouldShowLight = function(source /*, n, arr */) {
        return circleOnScreen(...(source.p ?? []));
    };

    /**
     * @returns {boolean}
     * `true` => apply `shouldShowLight` filter on sources.
     *
     * This basically allows {@linkcode MAX_LIGHTS} to apply
     * per screen rather than per map.
     *
     * It also necessitates updating the colour uniforms each
     * frame, rather than only when a source is toggled.
     */
    const shouldFilterSources = function() {
        return true;
    };

    /** @returns {LightSourceData[]} light source data for all sources. */
    const getAllSources = function() {
        const res = [
            ...getPlayerSources(),
            ...[...evData.keys()].map(getEventSource)
        ];
        if (shouldFilterSources())
            return res.filter(shouldShowLight);
        return res;
    };

    /**
     * @param {LightSourceData[]} sources
     * Data for all light sources.
     * @returns {number[]}
     * Flat array of `x,y,r,d` values for each source.
     */
    const getPositions = function(sources) {
        return sources.flatMap(o => o.p);
    };

    /**
     * @param {LightSourceData[]} sources
     * Data for all light sources.
     * @returns {number}
     * Flat array of `r,g,b,i` values for each source.
     */
    const getColours = function(sources) {
        return sources.flatMap(o => o.c);
    };

    /**
     * Sets dark colour override.
     * @param {string} [rgba=""]
     * Same format as \<dark:r,g,b,a\> notetag.
     * @returns {[r:number,g:number,b:number,a:number]}
     * Assigned value.
     */
    const setDarkColour = function(rgba = "") {
        return $gameMap[P_DARK_COLOUR] = parseMapTag(rgba);
    };

    /**
     * Resets dark colour to map default.
     * @returns {boolean}
     * `true` iff colour was reset.
     */
    const resetDarkColour = function() {
        return delete $gameMap[P_DARK_COLOUR];
    };

    /**
     * @returns {[r:number,g:number,b:number,a:number]}
     * Unit-normalised RGBA colour values for map darkness.
     */
    const getDarkColour = function() {
        if (P_DARK_COLOUR in $gameMap)
            return $gameMap[P_DARK_COLOUR];
        return setDarkColour($dataMap.meta[TAG_DARK]);
    };

    /**
     * Updates filter position uniform with input data.
     * @param {number[]} data input data
     * @returns {boolean} `true` iff uniform was updated.
     */
    const updatePositions = function(data) {
        if (Array.isArray(data)) {
            const L = data.length;
            if (L < (data.length = 4 * MAX_LIGHTS))
                data.fill(0, L);
            getFilter().uniforms.vLights.set(data);
            return true;
        }
        return false;
    };

    /**
     * Updates filter colour uniform with input data.
     * @param {number[]} data input data
     * @returns {boolean} `true` iff uniform was updated.
     */
    const updateColours = function(data) {
        if (Array.isArray(data)) {
            const L = data.length;
            if (L < (data.length = 4 * MAX_LIGHTS))
                data.fill(0, L);
            getFilter().uniforms.vColours.set(data);
            return true;
        }
        return false;
    };

    /**
     * Updates map darkness uniform with input data.
     * @param {number[]} data input data
     * @returns {boolean} `true` iff uniform was updated.
     */
    const updateDarkColour = function(data) {
        if (Array.isArray(data)) {
            const L = data.length;
            if (L < (data.length = 4))
                data.fill(0, L);
            getFilter().uniforms.vDarkColour.set(data);
            return true;
        }
        return false;
    };

    /** @returns {boolean} `true` iff this map needs lighting. */
    const needsLighting = function() {
        return TAG_DARK in $dataMap?.meta;
    };

    /**
     * @type {boolean}
     * `true` iff next uniform update should
     * refresh all uniforms, not just positions.
     */
    let fullUniformUpdateRequested = false;

    /** @returns {boolean} `true` iff ALL uniforms should be updated. */
    const isFullUniformUpdateRequested = function() {
        return fullUniformUpdateRequested;
    };

    /** Flags next uniform update to include everything. */
    const requestFullUniformUpdate = function() {
        fullUniformUpdateRequested = true;
    };

    /** Resets full uniform update request flag. */
    const clearFullUniformUpdateRequest = function() {
        fullUniformUpdateRequested = false;
    };

    /**
     * Updates uniforms for lighting filter.
     * @param {boolean} updateAll if `true`, update "per map" uniforms as well.
     * @returns {boolean} `true` iff uniforms were updated.
     */
    const updateUniforms = function(updateAll = isFullUniformUpdateRequested()) {
        if (!needsLighting())
            return false;
        const src = getAllSources();
        updatePositions(getPositions(src));
        if (updateAll || shouldFilterSources())
            updateColours(getColours(src));
        if (updateAll) {
            updateDarkColour(getDarkColour());
            clearFullUniformUpdateRequest();
        }
        return true;
    };

    /**
     * Adds/removes lighting filter.
     * @param {Spriteset_Base} spriteset reference spriteset
     */
    const refreshLighting = function(spriteset) {
        const F = getFilter();
        // avoid affecting weather, pictures, etc - apply to baseSprite instead
        const S = getFilterContainer(spriteset);
        const hasFilter = S.filters?.contains(F);
        if (needsLighting() && !hasFilter)
            (S.filters ??= []).push(F);
        else if (hasFilter)
            S.filters.remove(F);
    };

    // Patch - refresh event/party light data caches when map is loaded.
    void (alias => {
        Scene_Map.prototype.onMapLoaded = function() {
            clearEventData();
            if (this._transfer)
                resetDarkColour();  // reset dark colour only on transfer
            alias.apply(this, arguments);
            requestFullUniformUpdate();
        };
    })(Scene_Map.prototype.onMapLoaded);
    // scene.onMapLoaded -> player.performTransfer -> map.setup -> event.setupPage

    // Patch - refresh light source cache for all events on spriteset init, e.g. scene start.
    void (alias => {
        Spriteset_Map.prototype.initialize = function() {
            alias.apply(this, arguments);
            refreshLighting(this);
            refreshAllEventData();
            requestFullUniformUpdate();
        };
    })(Spriteset_Map.prototype.initialize);
    // [ ] Q41 - redundancy: light source cache also refreshes once per event via `onMapLoaded`. Probably not worth worrying about.

    // Patch - update filter uniforms (light positions/colours) each frame.
    void (alias => {
        Spriteset_Map.prototype.update = function() {
            alias.apply(this, arguments);
            updateUniforms();
        };
    })(Spriteset_Map.prototype.update);

    // Patch - update event data with page update.
    void (alias => {
        Game_Event.prototype.setupPage = function() {
            alias.apply(this, arguments);
            refreshEventData(this);
            requestFullUniformUpdate();
        };
    })(Game_Event.prototype.setupPage);
    // [ ] Q41 - should this be on refresh instead? setupPage does not necessarily fire on load!

    // Patch - on actor refresh, renew their light cache.
    void (alias => {
        Game_Actor.prototype.refresh = function() {
            alias.apply(this, arguments);
            requestActorDataRefresh(this);
            // request system avoids recursion: initialize > initEquips > refresh
        };
    })(Game_Actor.prototype.refresh);

    // Patch - each frame, refresh actor data if appropriate.
    void (alias => {
        Game_Player.prototype.update = function() {
            alias.apply(this, arguments);
            refreshRequestedActorData();
        };
    })(Game_Player.prototype.update);
    // [ ] Q41 - for battle support, maybe hook Game_Screen#update for requested refresh instead

    // Patch - on player refresh, renew party light cache.
    void (alias => {
        Game_Player.prototype.refresh = function() {
            alias.apply(this, arguments);
            clearActorSourceCache();
            requestFullUniformUpdate();
        };
    })(Game_Player.prototype.refresh);

    // Patch - when `_actors` is assigned a new array, apply the proxy to it.
    void (alias => {
        Game_Party.prototype.initialize = function() {
            alias.apply(this, arguments);
            applyActorProxy(this);
            refreshAllActorData();
            clearActorSourceCache();
        };
    })(Game_Party.prototype.initialize);
    void (alias => {
        Game_Party.prototype.setupStartingMembers = function() {
            alias.apply(this, arguments);
            applyActorProxy(this);
            refreshAllActorData();
            clearActorSourceCache();
        };
    })(Game_Party.prototype.setupStartingMembers);

    // Support new in-game hard/soft lighting option.
    void (() => { if (!OPT.TXT) return;

        // Define property for new option.
        Object.defineProperty(ConfigManager, OPT.SYM, {
            get: function( ) { return OPT.isOn; },
            set: function(v) { OPT.isOn = !!v; },
            configurable: true
        });

        // Patch - add command for new option.
        void (alias => {
            Window_Options.prototype.addGeneralOptions = function() {
                alias.apply(this, arguments);
                this.addCommand(OPT.TXT, OPT.SYM);
            };
        })(Window_Options.prototype.addGeneralOptions);

        // Patch - accommodate new command.
        void (alias => {
            Scene_Options.prototype.maxCommands = function() {
                return alias.apply(this, arguments) + 1;
            };
        })(Scene_Options.prototype.maxCommands);

        // Patch - save new option.
        void (alias => {
            ConfigManager.makeData = function() {
                const config = alias.apply(this, arguments);
                config[OPT.SYM] = this[OPT.SYM];
                return config;
            };
        })(ConfigManager.makeData);

        // Patch - load new option.
        void (alias => {
            ConfigManager.applyData = function(config) {
                alias.apply(this, arguments);
                this[OPT.SYM] = this.readFlag(config, OPT.SYM, OPT.DEF);
            };
        })(ConfigManager.applyData);

    })();

    // Define plugin commands.
    CAE.Tweaks.Q41.pCom = {
        setDark:   function(args) {
            updateDarkColour(setDarkColour(args.rgba));
        },
        resetDark: function(args) {
            resetDarkColour();
            updateDarkColour(getDarkColour());
        }
    };

    // Register plugin commands.
    PluginManager.registerCommand(CAE.Tweaks.NAME, "Q41_setDark",   CAE.Tweaks.Q41.pCom.setDark  );
    PluginManager.registerCommand(CAE.Tweaks.NAME, "Q41_resetDark", CAE.Tweaks.Q41.pCom.resetDark);

})();

// Q42) Skip Buy/Sell/Cancel for purchase-/sell-only shops.
void (() => { if (!CAE.Tweaks.Q42) return;
'use strict';

    // NB: does not account for goods changing while in shop, e.g. buyback.

    /** Non-conflicting identifier for new "sell only" flag on `Scene_Shop`. */
    const SYM = Symbol();

    /**
     * @param {[type:number,id:number,isStandardPrice:number,price:number]} goods shop goods
     * @returns {boolean} `true` iff this should be a "sell only" shop.
     */
    const isEmptyShop = function(goods) {
        // Editor sets empty shop to have 1 `null` good.
        if (goods?.length > 0) {     // jic
            for (const good of goods)
                if (good[1] !== 0)
                    return false;
            return true;    // all goods `null`
        }
        return true;        // 0 goods
    };

    // Patch - init "sell only" flag and skip to buy/sell if appropriate.
    void (alias => {
        Scene_Shop.prototype.create = function() {
            alias.apply(this, arguments);
            const w = this._commandWindow;
            if (this._purchaseOnly) {   // purchase only first - allows empty shop
                w.selectSymbol("buy");
                w.processOk();
                w.hide();   // affordance
            } else if (isEmptyShop(this._goods)) {
                this[SYM] = true;
                w.selectSymbol("sell");
                w.processOk();
                w.hide();
            }
        };
    })(Scene_Shop.prototype.create);

    // Patch - buy cancel skips command window if in buy-only mode.
    void (alias => {
        Scene_Shop.prototype.onBuyCancel = function() {
            alias.apply(this, arguments);
            const w = this._commandWindow;
            if (w.active && this._purchaseOnly)
                w.processCancel();
        };
    })(Scene_Shop.prototype.onBuyCancel);

    // Patch - sell cancel skips command window if in sell-only mode.
    for (const m of ["onCategoryCancel", "onSellCancel"])   // with(out) category window
        void (alias => {
            Scene_Shop.prototype[m] = function() {
                alias.apply(this, arguments);
                const w = this._commandWindow;
                if (w.active && this[SYM])
                    w.processCancel();
            };
        })(Scene_Shop.prototype[m]);

})();

// Q43) Game speed player option (e.g. for accessibility/speedruns).
void (() => { if (!CAE.Tweaks.Q43) return;
'use strict';

    /** Available speed multiplier values to select. @type {number[]} */
    const LST = CAE.Tweaks.Q43.LST;
    // Object.freeze([0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);

    // v16 - early-exit if LST is empty or contains only speed "100%".
    if (!LST.length || (LST.length === 1 && LST[0] === 1))
        return;

    /** Default index of selected value in {@linkcode LST}. @type {number} */
    const DFAULT = Math.max(LST.indexOf(1), 0);

    /** Index of selected value in {@linkcode LST}. @type {number} */
    let setting = DFAULT;

    /** Display name for in-game option. @type {string} */
    const TXT = CAE.Tweaks.Q43.TXT; // "Game Speed";

    /** Internal symbol for in-game option, used for command and save property. @type {string} */
    const KEY = CAE.Tweaks.Q43.KEY; // "gameSpeed";

    // Config symbol must not be blank or already present in config.
    if (!KEY || KEY in ConfigManager)
        return;

    /** @returns {WebAudio[]} Array of all game audio buffers. */
    const getAllAudioBuffers = function() {
        return [
            AudioManager._bgmBuffer,
            AudioManager._bgsBuffer,
            AudioManager._meBuffer,
            ...AudioManager._seBuffers,
            ...AudioManager._staticBuffers
        ];
    };

    /**
     * Refreshes pitch of all currently-playing game audio
     * to minimise mechanical desync, e.g. timed cutscenes.
     *
     * No effect by default - designed for use with Tweaks D07.
     */
    const updateAudioPitch = function() {
        for (const b of getAllAudioBuffers())
            if (b) {
                // Update playback rate.
                for (const s of b._sourceNodes)
                    s.playbackRate.setValueAtTime(
                        b.pitch,
                        WebAudio._context.currentTime
                    );
                // Recreate end timer.
                b._startTime = WebAudio._context.currentTime - b.seek() / b.pitch;
                b._removeEndTimer();
                b._createEndTimer();
            }
    };

    // Define new config property.
    Object.defineProperty(ConfigManager, KEY, {
        get: function( ) { return setting; },
        set: function(v) {
            if (v !== setting && Number.isFinite(v)) {
                Graphics._app.ticker.speed = LST[
                    setting = v.clamp(0, LST.length - 1) | 0
                ];
                updateAudioPitch();
            }
        },
        configurable: true
    });

    /**
     * Assigns value from `config`, or {@linkcode DFAULT} if value is absent.
     * @param {object} config data from file
     */
    const readConfig = function(config) {
        ConfigManager[KEY] = KEY in config ? config[KEY] : DFAULT;
    };

    // Patch - read option from file.
    void (alias => {
        ConfigManager.applyData = function(config) {
            alias.apply(this, arguments);
            readConfig(config);
        };
    })(ConfigManager.applyData);

    // Don't save or show the option if its display name is blank.
    // v16 - ...or if there aren't any alternatives to select!
    if (!TXT || LST.length < 2)
        return;

// === save === //

    /**
     * @param {object} config data to save to file
     * @returns {object} data including new value.
     */
    const writeConfig = function(config) {
        config[KEY] = ConfigManager[KEY];
        return config;
    };

    // Patch - write option to file.
    void (alias => {
        ConfigManager.makeData = function() {
            return writeConfig(alias.apply(this, arguments));
        };
    })(ConfigManager.makeData);

// === display === //

    /** Non-conflicting identifier for new "change game speed" method on `Window_Options`. */
    const SYM_M_CHANGE_SPEED = Symbol();

    /** Non-conflicting identifier for new "speed value offset" method on `Window_Options`. */
    const SYM_M_SPEED_OFFSET = Symbol();

    /**
     * @param {boolean} forward `true` iff moving forward through values
     * @returns {number} amount by which to change index on adjustment.
     */
    Window_Options.prototype[SYM_M_SPEED_OFFSET] = function(forward) {
        return forward ? 1 : -1;
    };

    /**
     * Updates value of game speed option.
     * @param {boolean} forward `true` iff moving forward through values
     * @param {boolean} wrap `true` iff should wrap to min when reaching max value
     */
    Window_Options.prototype[SYM_M_CHANGE_SPEED] = function(forward, wrap) {
        const step = this[SYM_M_SPEED_OFFSET](forward);
        const v = ConfigManager[KEY] + step;
        if (v >= LST.length && wrap)
            this.changeValue(KEY, 0);
        else
            this.changeValue(KEY, Math.max(v, 0));
    };

    // Patch - adjust option on OK/left/right inputs.
    void (alias => {
        Window_Options.prototype.processOk = function() {
            if (this.currentSymbol() === KEY)
                this[SYM_M_CHANGE_SPEED](true, true);
            else
                alias.apply(this, arguments);
        };
    })(Window_Options.prototype.processOk);
    void (alias => {
        Window_Options.prototype.cursorLeft = function() {
            if (this.currentSymbol() === KEY)
                this[SYM_M_CHANGE_SPEED](false, false);
            else
                alias.apply(this, arguments);
        };
    })(Window_Options.prototype.cursorLeft);
    void (alias => {
        Window_Options.prototype.cursorRight = function() {
            if (this.currentSymbol() === KEY)
                this[SYM_M_CHANGE_SPEED](true, false);
            else
                alias.apply(this, arguments);
        };
    })(Window_Options.prototype.cursorRight);

    // Patch - display appropriate text for selected value.
    void (alias => {
        Window_Options.prototype.statusText = function(index) {
            if (this.commandSymbol(index) === KEY)
                return (LST[ConfigManager[KEY]] * 100).toFixed(0) + "%";
            return alias.apply(this, arguments);
        };
    })(Window_Options.prototype.statusText);

    // Patch - add option.
    void (alias => {
        Window_Options.prototype.addGeneralOptions = function() {
            alias.apply(this, arguments);
            this.addCommand(TXT, KEY);
        };
    })(Window_Options.prototype.addGeneralOptions);

    // Patch - accommodate option.
    void (alias => {
        Scene_Options.prototype.maxCommands = function() {
            return alias.apply(this, arguments) + 1;
        };
    })(Scene_Options.prototype.maxCommands);

})();

// Q44) "Guard" battle command is placed immediately after "Attack".
void (() => { if (!CAE.Tweaks.Q44) return;
'use strict';

    /**
     * Non-conflicting identifier for tracking when guard command should be added.
     * (Approach selected to maximise cross-compatibility.)
     */
    const SYM = Symbol();

    // Patch - add guard command immediately after attack command.
    void (alias => {
        Window_ActorCommand.prototype.addAttackCommand = function() {
            alias.apply(this, arguments);
            this[SYM] = true;
            this.addGuardCommand();
        };
    })(Window_ActorCommand.prototype.addAttackCommand);

    // Patch - add guard command iff new flag is set.
    void (alias => {
        Window_ActorCommand.prototype.addGuardCommand = function() {
            if (SYM in this) {
                delete this[SYM];
                alias.apply(this, arguments);
            }
        };
    })(Window_ActorCommand.prototype.addGuardCommand);

})();

// Q45) Show vertical scroll indicators on eligible selectable windows.
void (() => { if (!CAE.Tweaks.Q45) return;
'use strict';

    /** Non-conflicting identifier for new "vertical scrollbar" sprite pointer on `Window_Selectable`. */
    const SYM = Symbol();

//#region == Sprite_ScrollBarV ======== //

    /** New global identifier for scrollbar sprite constructor. */
    const N = "Sprite_ScrollBarV";

    // Declare class.
    globalThis[N] = function() { this.initialize(...arguments); };
    globalThis[N].prototype = Object.create(Sprite.prototype);

    /**
     * For static `MIN_LENGTH` property declaration.
     *
     * Determines bar width.
     */
    const WEIGHT = CAE.Tweaks.Q45.WEIGHT;

    /**
     * For static `MIN_LENGTH` property declaration.
     *
     * Bar length is this multiplied by bar width.
     */
    const LENGTH_RATIO = 5; // arbitrary choice to enforce a "clear" rectangle shape

    // Static properties.
    Object.defineProperties(globalThis[N], {
        /** @readonly @property {number|string} COLOUR scrollbar colour (windowskin index or CSS string). */
        COLOUR:     { value: CAE.Tweaks.Q45.COLOUR },
        /** @readonly @property {number} OPACITY scrollbar opacity. */
        OPACITY:    { value: CAE.Tweaks.Q45.OPACITY },
        /** @readonly @property {number} WEIGHT scrollbar thickness. */
        WEIGHT:     { value: WEIGHT },
        /** @readonly @property {number} MIN_LENGTH minimum scrollbar length. */
        MIN_LENGTH: { value: WEIGHT * LENGTH_RATIO }
    });

    // Instance properties/methods.
    Object.assign(globalThis[N].prototype, {

        constructor: globalThis[N],

        /**
         * @constructor
         * @param {Window_Selectable} parentWindow
         * Parent window for this sprite.
         */
        initialize: function(parentWindow) {
            Sprite.prototype.initialize.call(this, new Bitmap());
            this._parentWindow = parentWindow;
            this.visible = false;
            this.opacity = this.constructor.OPACITY;
            this.width = this.constructor.WEIGHT;
            this.height = 0;
        },

        /** @returns {number} Fractional height of parent rows currently visible. */
        visibleFraction: function() {
            const w = this._parentWindow;
            return w.maxPageRows() / w.maxRows();
        },

        /** @returns {number} Full height of scrollbar when no scrolling available. */
        fullLength: function() {
            return this._parentWindow.innerHeight;
        },

        /** Updates scrollbar visibility. */
        updateVisibility: function() {
            const w = this._parentWindow;
            this.visible = w.visible
                        && (w.downArrowVisible || w.upArrowVisible)
                        && w.isOpen()
                        && this.fullLength() > this.constructor.MIN_LENGTH;
        },

        /** @returns {number} Intended current height of scrollbar. */
        getLength: function() {
            return Math.max(
                this.constructor.MIN_LENGTH,
                Math.floor(this.visibleFraction() * this.fullLength())
            );
        },

        /** @returns {string} CSS fill colour for scrollbar. */
        barColour: function() {
            const c = this.constructor.COLOUR;
            return Number.isFinite(c) ? ColorManager.textColor(c) : c;
        },

        /** Redraws scrollbar. */
        redraw: function() {
            this.bitmap.resize(this.width, this.height);
            this.bitmap.clear();
            this.bitmap.fillAll(this.barColour());
            this._refresh();        // refresh base texture frame
        },
        // [ ] Q45 - consider custom vertical scrollbar cap shape options (e.g. roundRect) and/or textures.

        /** Updates height of scrollbar and redraws if needed. */
        updateLength: function() {
            const v = this._parentWindow.maxScrollY();
            if (this._maxY !== v) {
                this._maxY = v;
                this.height = this.getLength();
                this.redraw();
            }
        },

        /** @returns {[x:number,y:number]} Position of scrollbar in parent window. */
        getPosition: function() {
            const w = this._parentWindow;
            const p = w.padding;
            const x = w.innerWidth + p - this.width / 2;
            const s = w.maxScrollY();
            const m = s ? w.scrollY() / s : 0;
            const h = this.fullLength() - this.height;
            const y = p + m * h;
            return [x, y];
        },

        /** Repositions scrollbar within parent window. */
        updatePosition: function() {
            this.move(...this.getPosition());
        },

        /** Updates scrollbar scale/position/etc. */
        update: function() {
            Sprite.prototype.update.apply(this, arguments);
            this.updateVisibility();
            if (this.visible) {
                this.updateLength();
                this.updatePosition();
            }
        },

        /** Destroys bitmap when sprite is destroyed, to avoid memory leak. */
        destroy: function() {
            this.bitmap.destroy();
            Sprite.prototype.destroy.apply(this, arguments);
        }

    });

//#endregion Sprite_ScrollBarV ======== //

    // Patch - add vertical scrollbar to selectable windows.
    void (alias => {
        Window_Selectable.prototype.initialize = function() {
            alias.apply(this, arguments);
            this.addChildToBack(this[SYM] = new globalThis[N](this));
        };
    })(Window_Selectable.prototype.initialize);

})();

// Q46) Adjust layout of `Window_Status`.
void (() => { if (!CAE.Tweaks.Q46) return;
'use strict';

    // Awkward because so many pertinent values are not stored as variables! >_>
    // Everything in this feature applies only to `Window_Status`.

    /** Data for new "EXP" gauge. */
    const EXP_GAUGE = {
        /** Label for gauge. Default: `""` (none). */
        LABEL: CAE.Tweaks.Q46.LABEL, // "",
        /** Internal `_statusType`. Default: `"exp"`. Set to blank string to disable. */
        TYPE:  "exp",
        /** Width cache/override. Default: `null` (auto-calc). */
        WIDTH: null,
        /** Label width cache/override. Default: `null` (auto-calc). */
        LW: null,
        /** If `true`, show gauge value as a percentage. Otherwise hide value. */
        VALUE: CAE.Tweaks.Q46.VALUE // true
    };

    /** If `true`, replace "remaining exp for next level" with "total exp for next level". */
    const EXP_FOR_NEXT = CAE.Tweaks.Q46.EXP_FOR_NEXT; // false;

    /** Width of level label space. */
    const LV_WIDTH = 48 * 1.5;        // default 48

    /** Width of level value. */
    const LVX_WIDTH = 36 * 1.5;       // default 36

    /** Width of space between first and second columns. */
    const COL_PADDING = 50;

    /** Width of space between level label and value. */
    const LV_SPACE = 456 - 204 - COL_PADDING - LVX_WIDTH;

    /** Width of standard gauges in main status window. */
    const STATUS_GAUGE_WIDTH = LV_SPACE + LVX_WIDTH;    // default 128

    /** Local tracker for status gauge type being created on `Window_Status`. */
    let statusGaugeType = "";

    /** Non-conflicting identifier for new "this is a `Window_Status` gauge" property on `Sprite_Gauge`. */
    const SYM = Symbol();

    // Override - respace level info.
    Window_Status.prototype.drawActorLevel = function(actor, x, y) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.level, x, y, LV_WIDTH);
        this.resetTextColor();
        this.drawText(actor.level, x + LV_SPACE, y, LVX_WIDTH, "right");
    };

    // Patch - resize status gauges.
    void (alias => {
        Window_Status.prototype.placeGauge = function(actor, type, x, y) {
            statusGaugeType = type;
            alias.apply(this, arguments);
            statusGaugeType = "";
        };
    })(Window_Status.prototype.placeGauge);
    void (alias => {
        Sprite_Gauge.prototype.bitmapWidth = function() {
            if (statusGaugeType)
                this[SYM] = true;
            if (this[SYM])
                return STATUS_GAUGE_WIDTH;
            return alias.apply(this, arguments);
        };
    })(Sprite_Gauge.prototype.bitmapWidth);

    // Override - replace "remaining to next level" with "total for next level".
    void (() => { if (!EXP_FOR_NEXT) return;
        Window_Status.prototype.expNextValue = function() {
            if (this._actor.isMaxLevel())
                return "-------";
            return this._actor.nextLevelExp();
        };
    })();

    // Define and display new "EXP" gauge.
    void (() => { if (!EXP_GAUGE.TYPE) return;

        // Patch - define new "EXP" gauge type.
        void (alias => {
            Sprite_Gauge.prototype.bitmapWidth = function() {
                const r = alias.apply(this, arguments);
                if (this[SYM])
                    switch (EXP_GAUGE.TYPE) {
                        case statusGaugeType:
                        case this._statusType:
                            return EXP_GAUGE.WIDTH;
                    }
                return r;
            };
        })(Sprite_Gauge.prototype.bitmapWidth);
        void (alias => {
            Sprite_Gauge.prototype.gaugeX = function() {
                if (this._statusType === EXP_GAUGE.TYPE) {
                    const l = this.label();
                    if (!l)
                        return 0;
                    return EXP_GAUGE.LW ??= this.bitmap.measureTextWidth(l) + 6;
                }
                return alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.gaugeX);
        void (alias => {
            Sprite_Gauge.prototype.currentValue = function() {
                if (this._statusType === EXP_GAUGE.TYPE) {
                    const b = this._battler;
                    if (!b?.isActor() || b.isMaxLevel())
                        return 1;
                    return b.currentExp() - b.currentLevelExp();
                }
                return alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.currentValue);
        void (alias => {
            Sprite_Gauge.prototype.currentMaxValue = function() {
                if (this._statusType === EXP_GAUGE.TYPE) {
                    const b = this._battler;
                    if (!b?.isActor() || b.isMaxLevel())
                        return 1;
                    return b.nextLevelExp() - b.currentLevelExp();
                }
                return alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.currentMaxValue);
        void (alias => {
            Sprite_Gauge.prototype.label = function() {
                if (this._statusType === EXP_GAUGE.TYPE)
                    return EXP_GAUGE.LABEL;
                return alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.label);
        void (alias => {
            Sprite_Gauge.prototype.gaugeColor1 = function() {
                if (this._statusType === EXP_GAUGE.TYPE)
                    return ColorManager.ctGaugeColor1();
                return alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.gaugeColor1);
        void (alias => {
            Sprite_Gauge.prototype.gaugeColor2 = function() {
                if (this._statusType === EXP_GAUGE.TYPE)
                    return ColorManager.ctGaugeColor2();
                return alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.gaugeColor2);
        void (alias => {
            Sprite_Gauge.prototype.drawValue = function() {
                if (this._statusType === EXP_GAUGE.TYPE && EXP_GAUGE.VALUE) {
                    const s = (this.gaugeRate() * 100).toFixed(0) + "%";
                    const w = this.bitmapWidth();
                    const h = this.textHeight();
                    this.setupValueFont();
                    this.bitmap.paintOpacity = 160;
                    this.bitmap.drawText(s, 0, 0, w, h, "right");
                    this.bitmap.paintOpacity = 255;
                } else
                    alias.apply(this, arguments);
            };
        })(Sprite_Gauge.prototype.drawValue);

        // Override - add "EXP" gauge and rearrange exp info to fit.
        Window_Status.prototype.drawExpInfo = function(x, y) {
            const lh = this.lineHeight();
            const s1 = TextManager.expTotal.format(TextManager.exp);
            const s2 = TextManager.expNext.format(TextManager.level);
            const w  = EXP_GAUGE.WIDTH ??= this.innerWidth - x - 50;    // memoise
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(s1, x, y     , w);
            this.drawText(s2, x, y + lh, w);
            this.resetTextColor();
            this.drawText(this.expTotalValue(), x, y     , w, "right");
            this.drawText(this.expNextValue(),  x, y + lh, w, "right");
            this.placeGauge(this._actor, EXP_GAUGE.TYPE, x, y + Math.floor(lh * 2.5));
        };

    })();

})();

// Q47) Adds in-game option to toggle full-screen.
void (() => { if (!CAE.Tweaks.Q47) return;
'use strict';

    /** Internal label for new option. @type {string} */
    const KEY = CAE.Tweaks.Q47.KEY; // "fullscreen";

    /** Display value for new option. @type {string} */
    const TXT = CAE.Tweaks.Q47.TXT; // "Full Screen";

    /** Default value: `true` = full-screen, `false` = windowed. @type {boolean} */
    const DFAULT = Graphics._isFullScreen();

    /** Private value storage for new option. @type {boolean} */
    let isOn = DFAULT;

    /**
     * Updates config to match full-screen status.
     * @returns {boolean}
     * `true` iff config was updated.
     */
    const updateConfig = function() {
        // if (!ConfigManager.isLoaded())
        //     return false;    // this risks odd behaviour pressing F4 mid-boot
        const v = ConfigManager[KEY];
        const f = !!Graphics._isFullScreen();
        if (v === f)
            return false;
        ConfigManager[KEY] = f;
        const sc = SceneManager._scene;
        if (sc instanceof Scene_Options) {
            const w = sc._optionsWindow;
            w.redrawItem(w.findSymbol(KEY));
        } else
            ConfigManager.save();   // Scene_Options saves on exit
        return true;
    };

    /**
     * Updates full-screen status to match config value.\
     * @returns {boolean}
     * `true` iff full-screen change request was sent.
     * @since v15 - suppressed until ConfigManager is fully loaded.
     */
    const updateScreen = function() {
        if (!ConfigManager.isLoaded())  // v15
            return false;
        const v = ConfigManager[KEY];
        if (v)
            Graphics._requestFullScreen();
        else
            Graphics._cancelFullScreen();
        return true;
    };

    // Sync config to full-screen state.
    for (const e of [
        // modern standard
        "fullscreenchange",
        // back-compatibility
        "webkitfullscreenchange",
        "mozfullscreenchange"
    ])
        document.addEventListener(e, updateConfig);

    // Update full-screen status when config value is changed.
    Object.defineProperty(ConfigManager, KEY, {
        get: function( ) { return isOn; },
        set: function(v) { isOn = !!v; updateScreen(); },
        configurable: true
    });

    // Patch - add new option.
    void (alias => {
        Window_Options.prototype.addGeneralOptions = function() {
            alias.apply(this, arguments);
            this.addCommand(TXT, KEY);
        };
    })(Window_Options.prototype.addGeneralOptions);

    // Patch - accommodate new option.
    void (alias => {
        Scene_Options.prototype.maxCommands = function() {
            return alias.apply(this, arguments) + 1;
        };
    })(Scene_Options.prototype.maxCommands);

    // Patch - add new option to config file data.
    void (alias => {
        ConfigManager.makeData = function() {
            const o = alias.apply(this, arguments);
            o[KEY] = this[KEY];
            return o;
        };
    })(ConfigManager.makeData);

    // Patch - read new option from config file data.
    void (alias => {
        ConfigManager.applyData = function(config) {
            alias.apply(this, arguments);
            this[KEY] = this.readFlag(config, KEY, DFAULT);
        };
    })(ConfigManager.applyData);

    // Patch - prevent window resize/movement from pulling game out of full-screen.
    void (alias => { // v15
        Scene_Boot.prototype.adjustWindow = function() {
            alias.apply(this, arguments);
            updateScreen(); // adjustWindow is called via Scene_Boot#start, so ConfigManager isIndeedLoaded.
        };
    })(Scene_Boot.prototype.adjustWindow);

})();

// Q48) Custom cursor.
void (() => { if (!CAE.Tweaks.Q48) return;
'use strict';

    /**
     * @typedef {object} GameCursorData
     * @property {string} name
     * Display name for this cursor in the game options.
     * @property {string} img
     * Basic image for this cursor.
     * @property {string} [imgPress]
     * Optional "pressed" image for this cursor.
     * @property {string} [imgCancel]
     * Optional "cancel" image for this cursor.
     * @property {number} hotX
     * X-coordinate of cursor hotspot.
     * @property {number} hotY
     * Y-coordinate of cursor hotspot.
     */
    /**
     * Custom cursor data.
     *
     * NB: recommended no larger than 32x32 device-independent pixels.\
     * Chromium resets the cursor at the window borders when it is larger than this.
     * @type {GameCursorData[]}
     */
    const DATA = CAE.Tweaks.Q48.DATA;

    /** Path root for cursor images. @type {string} */
    const ROOT = "img/system/";

    /** Fallback cursor style. @type {string} */
    const FALLBACK = CAE.Tweaks.Q48.FALLBACK; // "default";

    /** Fallback cursor style option display name. @type {string} */
    const FALLBACK_NAME = CAE.Tweaks.Q48.OPT_BACK;

    /** Display name for new in-game "cursor style" option. @type {string} */
    const OPT_TXT = CAE.Tweaks.Q48.OPT_TXT;

    /** Internal key for new in-game "cursor style" option. @type {string} */
    const OPT_KEY = CAE.Tweaks.Q48.OPT_KEY;

    /** Count of available cursor options. @type {number} */
    const OPT_COUNT = DATA.length + (FALLBACK_NAME ? 1 : 0);

    /** Frames until cursor is deemed idle. @type {number} */
    const IDLE_TIME = CAE.Tweaks.Q48.IDLETIME;

    /** Used for {@linkcode D.state}. @enum {number} */
    const STATUS = Object.freeze({
        FREE:   0,
        PRESS:  16,
        CANCEL: 128
    });

    /** Dynamic cursor data. */
    const D = {
        /** Current custom cursor index. */
        index: 0,
        /** Tracks whether cursor is "active" or not. */
        state: STATUS.FREE,
        /** Countdown for idle status (cursor hidden). */
        idle: IDLE_TIME
    };

    /**
     * @param {number} [index=D.index]
     * Game cursor index. Defaults to current index.
     * @param {STATUS} [state=D.state]
     * Game cursor state. Defaults to current state.
     * @returns {string}
     * Filename for corresponding cursor image.
     */
    const getImg = function(index = D.index, state = D.state) {
        const d = DATA[index];
        switch (state) {
            case STATUS.CANCEL:
                if (d.imgCancel)
                    return d.imgCancel;
                // fall-through
            case STATUS.PRESS:
                if (d.imgPress)
                    return d.imgPress;
                // fall-through
            default:
                return d.img;
        }
    };

    /** Updates game cursor style with reference to {@linkcode D}. */
    const updateCursorStyle = function() {
        // Cf https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
        if (IDLE_TIME && !D.idle)
            document.body.style.cursor = "none";
        else if (D.index in DATA) {
            const { hotX, hotY } = DATA[D.index];
            document.body.style.cursor = `url("${ROOT}${getImg()}.png") ${hotX} ${hotY}, ${FALLBACK}`;
        } else
            document.body.style.cursor = `${FALLBACK}`;
    };
    updateCursorStyle();

    /**
     * Sets index of cursor style to use.
     * @param {number} index
     * Value to set.
     */
    const setCursorIndex = function(index = 0) {
        const v = (parseInt(index, 10) || 0).clamp(0, OPT_COUNT - 1);
        if (D.index !== v) {
            D.index = v;
            D.idle = IDLE_TIME;
            updateCursorStyle();
        }
    };

    /**
     * Sets current cursor status, e.g. pressed/released.
     * @param {STATUS} [state=STATUS.FREE]
     * Value to set.
     */
    const setCursorState = function(state = STATUS.FREE) {
        const v = state;
        if (D.state !== v) {
            D.state = v;
            updateCursorStyle();
        }
    };

    // Sync cursor status with input.
    void (alias => {
        TouchInput._onTrigger = function(x, y) {
            setCursorState(STATUS.PRESS);
            alias.apply(this, arguments);
        };
    })(TouchInput._onTrigger);
    void (alias => {
        TouchInput._onCancel = function(x, y) {
            setCursorState(STATUS.CANCEL);
            alias.apply(this, arguments);
        };
    })(TouchInput._onCancel);
    void (alias => {
        TouchInput._onRelease = function(x, y) {
            setCursorState();
            alias.apply(this, arguments);
        };
    })(TouchInput._onRelease);
    void (alias => {
        // With mouse, _onRelease is only invoked for button 0.
        TouchInput._onMouseUp = function() {
            setCursorState();
            alias.apply(this, arguments);
        };
    })(TouchInput._onMouseUp);
    void (alias => {
        TouchInput.clear = function() {
            setCursorState();
            alias.apply(this, arguments);
        };
    })(TouchInput.clear);

    // Define new ConfigManager property.
    Object.defineProperty(ConfigManager, OPT_KEY, {
        get: function( ) { return D.index; },
        set: function(v) { setCursorIndex(v); },
        configurable: true
    });
    // Do this irrespective of availability of in-game option,
    // as a global accessor for cursor index.

    // Patch - load/save new config value.
    void (alias => {
        ConfigManager.makeData = function() {
            const r = alias.apply(this, arguments);
            r[OPT_KEY] = this[OPT_KEY];
            return r;
        };
    })(ConfigManager.makeData);
    void (alias => {
        ConfigManager.applyData = function(config) {
            alias.apply(this, arguments);
            if (OPT_KEY in config)
                this[OPT_KEY] = config[OPT_KEY];
            else
                updateCursorStyle();
        };
    })(ConfigManager.applyData);

    // Add and handle in-game option if appropriate.
    void (() => { if (!OPT_TXT || OPT_COUNT < 2) return;

        /** Non-conflicting identifier for new "change value of cursor" method on `Window_Options`. */
        const SYM_M_CHANGE_VALUE = Symbol();

        /** Non-conflicting identifier for new "selected cursor display name" method on `Window_Options`. */
        const SYM_M_VALUE_NAME = Symbol();

        /**
         * @param {number} index
         * Option value index.
         * @returns {string}
         * Display text for this value.
         */
        Window_Options.prototype[SYM_M_VALUE_NAME] = function(index = D.index) {
            if (index in DATA)
                return DATA[index].name || `Cursor ${index + 1}`;
            return FALLBACK_NAME;
        };

        /**
         * Changes value of new option.
         * @param {boolean} forward
         * Determines whether to increase or decrease the value.
         * @param {boolean} wrap
         * Determines whether value should be allowed to wrap from max to 0.
         */
        Window_Options.prototype[SYM_M_CHANGE_VALUE] = function(forward, wrap) {
            const diff  = forward ? 1 : -1;
            const value = this.getConfigValue(OPT_KEY) + diff;
            const max   = OPT_COUNT - 1;
            if (value > max && wrap)
                this.changeValue(OPT_KEY, 0);
            else
                this.changeValue(OPT_KEY, value.clamp(0, max));
        };

        // Patch - add new option.
        void (alias => {
            Window_Options.prototype.addGeneralOptions = function() {
                alias.apply(this, arguments);
                this.addCommand(OPT_TXT, OPT_KEY);
            };
        })(Window_Options.prototype.addGeneralOptions);

        // Patch - accommodate new option.
        void (alias => {
            Scene_Options.prototype.maxCommands = function() {
                return alias.apply(this, arguments) + 1;
            };
        })(Scene_Options.prototype.maxCommands);

        // Patch - custom text for each value of this option.
        void (alias => {
            Window_Options.prototype.statusText = function(index) {
                if (this.commandSymbol(index) === OPT_KEY)
                    return this[SYM_M_VALUE_NAME]();
                return alias.apply(this, arguments);
            };
        })(Window_Options.prototype.statusText);

        // Patch - handle value changes via OK, left, right.
        void (alias => {
            Window_Options.prototype.processOk = function() {
                if (this.currentSymbol() === OPT_KEY)
                    this[SYM_M_CHANGE_VALUE](true, true);
                else
                    alias.apply(this, arguments);
            };
        })(Window_Options.prototype.processOk);
        void (alias => {
            Window_Options.prototype.cursorRight = function() {
                if (this.currentSymbol() === OPT_KEY)
                    this[SYM_M_CHANGE_VALUE](true, false);
                else
                    alias.apply(this, arguments);
            };
        })(Window_Options.prototype.cursorRight);
        void (alias => {
            Window_Options.prototype.cursorLeft = function() {
                if (this.currentSymbol() === OPT_KEY)
                    this[SYM_M_CHANGE_VALUE](false, false);
                else
                    alias.apply(this, arguments);
            };
        })(Window_Options.prototype.cursorLeft);

    })();

    // Patch - tick/reset idle time for cursor vanishment.
    void (() => { if (!IDLE_TIME) return;

        // Patch - reset idle time on any cursor movement.
        for (const m of ["_onMove", "_onHover"])
            void (alias => {
                TouchInput[m] = function() {
                    alias.apply(this, arguments);
                    D.idle = IDLE_TIME;
                    updateCursorStyle();
                };
            })(TouchInput[m])

        // Patch - tick down idle time each frame.
        void (alias => {
            TouchInput.update = function() {
                alias.apply(this, arguments);
                if (D.idle > 0)
                    if (!--D.idle)
                        updateCursorStyle();
            };
        })(TouchInput.update);

    })();

})();

// Q49) Choice options: merge, align, inline, hide, disable, shuffle, help.
void (() => { if (!CAE.Tweaks.Q49) return;
'use strict';

    // [ ] Q49 - set choice columns or layout? E.g. grid (vert or horz), index map (e.g. "+"), off-grid polygons. Latter could be tricky with inline, maybe enforce min rows for certain styles?

    /** If `true`, vertically centre the choice window if the message window is closed. @type {boolean} */
    const DEALIGN_Y = CAE.Tweaks.Q49.DEALIGN_Y;

    /** If `true`, choice text will be aligned based on the window X position (left, middle, right). @type {boolean} */
    const ALIGN_X = CAE.Tweaks.Q49.ALIGN_X;

    /** If `true`, merge consecutive Show Choices command blocks. @type {boolean} */
    const LONG_MERGE = CAE.Tweaks.Q49.MERGE;

    /** If `true`, enable the index map, allowing hidden & shuffled choices. @type {boolean} */
    const USE_INDEX_MAP = CAE.Tweaks.Q49.IXMAP;

    /** Regular expression construction string. @type {string} */
    const R_DSC = CAE.Tweaks.Q49.R_DSC;

    /** If `true`, show a help window for choices with comment descriptions. @type {boolean} */
    const ADD_HELP = !!R_DSC;

    /** Regular expression matching choice description comments. @type {RegExp} */
    const RX_DESC = new RegExp(R_DSC, "i");

    /** If `true`, permit choices to be displayed inside message when appropriate. @type {boolean} */
    const ALLOW_INLINE = CAE.Tweaks.Q49.INMSG;

    /** If `true`, {@linkcode DATA} values automatically reset when choices end. @type {boolean} */
    const AUTO_RESET = CAE.Tweaks.Q49.RESET;

    /** Default value for {@linkcode DATA.SHUFFLE}. @type {boolean} */
    const DFAULT_SHUFFLE = USE_INDEX_MAP && CAE.Tweaks.Q49.DEF_S;

    /** Default value for {@linkcode DATA.INLINE}. @type {boolean} */
    const DFAULT_INLINE = CAE.Tweaks.Q49.DEF_I;

    /** Determines whether {@linkcode DATA} flags are saved. @type {boolean} */
    const SAVE_FLAGS = true;
    // Not sure whether AUTO_RESET check would be safe vs autosave, so just always save.

    /** Stores persistent choice configs. */
    const DATA = {
        /** Set of hidden choice indices. @type {Set<number>} */
        HIDDEN:   new Set(),
        /** Set of disabled choice indices. @type {Set<number>} */
        DISABLED: new Set(),
        /** `true` iff choice order will be shuffled. @type {boolean} */
        SHUFFLE:  DFAULT_SHUFFLE,
        /** `true` iff choices will display "inside" the message window. @type {boolean} */
        INLINE:   DFAULT_INLINE
    };

    /** Non-conflicting identifier for new "index map" property on `Game_Message`. */
    const SYM_P_INDEX_MAP = Symbol();

    /** Non-conflicting identifier for new "choice descriptions" property on `Game_Message`. */
    const SYM_P_DESC = Symbol();

    /**
     * Randomly shuffles input array in-place.\
     * Uses Durstenfeld implementation of Fisher-Yates shuffle.
     * @param {any[]} arr
     * Input array.
     * @returns {arr}
     * Shuffled array.
     */
    const shuffle = CAE.Tweaks.Utils.shuffle;

    /**
     * @typedef EventCommand
     * @property {number} code
     * Code for this specific command type, e.g. `102` = Show Choices.
     * @property {number} indent
     * Command indent, used for branch skips.
     * @property {(string|number|boolean)[]} parameters
     * Command parameters, usage varies depending on `code`.
     */
    /**
     * Merges multiple Show Choices commands together.
     * @param {EventCommand} c0
     * Target command. Will be mutated!
     * @param  {...EventCommand} cN
     * Commands to merge into `c0`.
     * @returns {EventCommand}
     * Merge result: post-mutation `c0`.
     */
    const merge102 = function(c0, ...cN) {
        c0.parameters[0].push(...cN.flatMap(c => c.parameters[0]));
        return c0;
    };

    /**
     * Merges consecutive Show Choices blocks into one another.\
     * v15 - now accounts for nested choices (command indent).
     * @param {EventCommand[]} list
     * Command list.
     * @returns {EventCommand[]}
     * A modified copy of `list`.
     */
    const mergeLongChoices = function(list) {
        /** Deep clone of command list, to avoid mutating map data. @type {EventCommand[]} */
        const r = JsonEx.makeDeepCopy(list);
        /**
         * Commands to merge at next opportunity. Indexed by command indent.
         * @type {object.<number,EventCommand[]>}
         */
        const e = {};
        // Merge (End, Show) choice command pairs.
        for (let n = r.length; n--;) {
            const c = r[n];
            if (c.code === 102) {   // Show Choices
                if (n > 0 && r[n - 1].code === 404) {   // End Choices
                    (e[c.indent] ??= []).unshift(c);
                    r.splice(--n, 2);
                } else if (e[c.indent]?.length) {
                    merge102(c, ...e[c.indent]);
                    delete e[c.indent];
                }
            }
        }
        // Now tidy up the When indices.
        /** When index counter, by command indent. @type {object.<number,number>} */
        const p = {};   // v15 - account for indent
        for (const c of r)
            switch (c.code) {
                case 102:   // Show Choices
                    p[c.indent] = 0;
                    break;
                case 402:   // When
                    p[c.indent] ??= 0;  // jic
                    c.parameters[0] = p[c.indent]++;
                    break;
            }
        return r;
    };

    /**
     * @param {EventCommand[]} list
     * Event command list.
     * @param {number} [index=0]
     * Starting command index; 0 if omitted.
     * @returns {string}
     * Description and last-processed command index.\
     * Returns `""` if starting command is not a matching Comment.
     */
    const parseDescription = function(list, index = 0) {
        const head = list[index];
        if (head.code === 108) {
            const m = RX_DESC.exec(head.parameters[0]);
            if (m) {
                const a = m[1] ? [m[1]] : [];
                while (list[++index].code === 408)
                    a.push(list[index].parameters[0]);
                return a.join("\n");
            }
        }
        return "";
    };

    /**
     * @param {EventCommand[]} list
     * Event command list.
     * @param {number} [index=0]
     * Starting command index; 0 if omitted.
     * @returns {string[]}
     * Ordered array of choice descriptions for this Show Choices command.\
     * Returns empty array if starting command is not Show Choices.
     */
    const parseAllDescriptions = function(list, index = 0) {
        const desc = [];
        const dent = list[index].indent;
        if (list[index].code === 102)               // Show Choices
            while (
                list[++index].code !== 404 ||       // End Show Choices
                list[index].indent > dent           // skip over nested "End"s
            )
                if (
                    list[index].code === 402 &&     // When
                    list[index].indent === dent     // ignore nested "When"s
                )
                    desc.push(parseDescription(list, ++index));
        return desc;
    };

    /**
     * Parses and stores descriptions for a Show Choices command.
     * @param {EventCommand[]} list
     * Event command list.
     * @param {number} [index=0]
     * Starting command index; 0 if omitted.
     * @returns {string[]|boolean|undefined}
     * - If this feature is disabled: `undefined`.
     * - If starting command exists: description list (may be empty).
     * - Otherwise: `true` iff description list was deleted.
     */
    const updateDescriptions = function(list, index = 0) {
        if (ADD_HELP) {
            if (list && list[index])
                return $gameMessage[SYM_P_DESC] = parseAllDescriptions(...arguments);
            return delete $gameMessage[SYM_P_DESC];
        }
        return void 0;
    };

    /**
     * @param {EventCommand[]} list
     * Input event command list.
     * @returns {EventCommand[]}
     * Formatted copy of `list`.
     */
    const formatChoiceCommands = function(list) {
        return mergeLongChoices(list);
    };

    /**
     * @param {number} index
     * Choice index to check.
     * @returns {boolean}
     * `true` iff that choice is currently hidden.
     */
    const isHidden = function(index) {
        return DATA.HIDDEN.has(index);
    };

    /**
     * [Not used.]
     * @param {number} index
     * Choice index to check.
     * @returns {boolean}
     * `true` iff that choice is currently disabled.
     */
    // const isDisabled = function(index) {
    //     return DATA.DISABLED.has(index);
    // };

    /**
     * Clears the index map, used for shuffle order and hidden choices.
     * @returns {boolean}
     * `true` iff data was deleted.
     */
    const clearIndexMap = function() {
        return delete $gameMessage[SYM_P_INDEX_MAP];
    };

    /**
     * @param {number} length
     * Length of index map to create, if it doesn't already exist.
     * @returns {number[]}
     * Index map.
     */
    const getIndexMap = function(length = 0) {
        return $gameMessage[SYM_P_INDEX_MAP] ??= Array.from({ length }, (_, n) => n);
    };

    /**
     * @param {number} index
     * Original choice index.
     * @returns {number}
     * Mapped choice index. If mapping is disabled, this is the input `index`.
     */
    const mapIndex = function(index) {
        if (!USE_INDEX_MAP)
            return index;
        return getIndexMap()[index] ?? index;
    };

    /**
     * @param {number} index
     * Mapped choice index.
     * @returns {number}
     * Original choice index. If mapping is disabled, this is the input `index`.
     */
    const unmapIndex = function(index) {
        if (!USE_INDEX_MAP)
            return index;
        const i = getIndexMap().indexOf(index);
        return i < 0 ? index : i;
    };

    /**
     * If appropriate, shuffles choice index map.
     * @param {number} length
     * Length of index map to create, if it doesn't already exist.
     * @returns {boolean}
     * `true` iff map was shuffled.
     */
    const shuffleIndexMap = function(length) {
        if (USE_INDEX_MAP && DATA.SHUFFLE) {
            shuffle(getIndexMap(length));
            return true;
        }
        return false;
    };

    /**
     * If appropriate, removes hidden choices from choice index map.
     * @param {number} length
     * Length of index map to create, if it doesn't already exist.
     * @returns {boolean}
     * `true` iff index map was modified.
     */
    const pruneIndexMap = function(length) {
        if (USE_INDEX_MAP && DATA.HIDDEN.size) {
            $gameMessage[SYM_P_INDEX_MAP] = getIndexMap(length).filter(v => !isHidden(v));
            return true;
        }
        return false;
    };

    /**
     * @param {number} length
     * Length of index map to create, if it doesn't already exist.
     * @returns {number[]|undefined}
     * Resultant index map.
     */
    const processIndexMap = function(length) {
        clearIndexMap();
        pruneIndexMap(length);
        shuffleIndexMap(length);
        return $gameMessage[SYM_P_INDEX_MAP];
    };

    /**
     * @param {number} index
     * Choice index.
     * @returns {string|undefined}
     * Corresponding cached description.
     */
    const getDescription = function(index) {
        return $gameMessage[SYM_P_DESC]?.[mapIndex(index)];
    };

    /** Functions for clearing {@linkcode DATA} flags. */
    const clear = {
        /** Resets the "disabled choices" index cache. */
        disabled: function() { DATA.DISABLED.clear(); },
        /** Resets the "hidden choices" index cache. */
        hidden:   function() { DATA.HIDDEN.clear(); },
        /** Resets the "shuffle choices" flag. */
        shuffle:  function() { DATA.SHUFFLE = DFAULT_SHUFFLE; },
        /** Resets the "show choices inside message" flag. */
        inline:   function() { DATA.INLINE = DFAULT_INLINE; }
    };

    /** Resets all {@linkcode DATA} flags. */
    const clearFlags = function() {
        for (const f of Object.values(clear))
            f();
    };

    /**
     * @typedef WindowCommand
     * @property {string} name
     * Display name for this command.
     * @property {string} symbol
     * Internal symbol for this command.
     * @property {boolean} enabled
     * `true` iff this command is enabled.
     * @property {*} ext
     * Additional data for this command.
     */
    /**
     * Disables applicable window commands in given list.
     * @param {WindowCommand[]} list
     * Command list.
     */
    const applyDisable = function(list) {
        for (const i of DATA.DISABLED) {
            const n = unmapIndex(i);
            const c = list[n];
            // console.log("disabling", i, n, c);
            if (c)
                c.enabled = false;
        }
    };

    /**
     * (Un)Flags given choice indices in given set.
     * @param {Set<number>} o
     * Set of flagged choice indices.
     * @param {boolean} value
     * Determines whether to add or remove the flag.
     * @param {...number} ix
     * Choice indices.\
     * If omitted, all currently-flagged indices will be processed.
     */
    const setIx = function(o, value, ...ix) {
        if (!ix.length)
            ix = o.values();
        if (value) {
            for (const i of ix)
                if (Number.isFinite(i))
                    o.add(i);
        } else
            for (const i of ix)
                if (Number.isFinite(i))
                    o.delete(i);
    };

    /**
     * Toggles boolean index flags on/off for given object (disabled/hidden choices).
     * @param {Set<number>} o
     * Set of flagged choice indices.
     * @param {...number} ix
     * Choice indices.
     */
    const toggleIx = function(o, ...ix) {
        for (const i of ix)
            if (Number.isFinite(i)) {
                if (o.has(i))
                    o.delete(i);
                else
                    o.add(i);
            }
    };

    /**
     * (Un)Flags given choice indices as "disabled".
     * @param {boolean} value
     * Whether to disable (`true`) or enable (`false`) these indices.
     * @param {...number} ix
     * Choice indices.\
     * If omitted, all currently-flagged indices will be processed.
     */
    const setDisabled = function(value = false, ...ix) {
        setIx(DATA.DISABLED, ...arguments);
    };

    /**
     * Toggles "disabled" choice index flag(s).
     * @param {...number} ix
     * Choice indices.
     */
    const toggleDisabled = function(...ix) {
        toggleIx(DATA.DISABLED, ...arguments);
    };

    /**
     * (Un)Flags given choice indices as "hidden".
     * @param {boolean} value
     * Whether to hide (`true`) or show (`false`) these indices.
     * @param {...number} ix
     * Choice indices.\
     * If omitted, all currently-flagged indices will be processed.
     */
    const setHidden = function(value = false, ...ix) {
        setIx(DATA.HIDDEN, ...arguments)
    };

    /**
     * Toggles "hidden" choice index flag(s).
     * @param  {...number} ix
     * Choice indices.
     */
    const toggleHidden = function(...ix) {
        toggleIx(DATA.HIDDEN, ...arguments);
    };

    /**
     * Sets the "shuffle choices" flag.
     * @param {boolean} value
     * Value to set.
     */
    const setShuffle = function(value = false) {
        switch (value) {
            case true: case false:
                DATA.SHUFFLE = value; break;
            default:
                clear.shuffle(); break;
        }
    };

    /**
     * Sets the "inline choices" flag.
     * @param {boolean} value
     * Value to set.
     */
    const setInline = function(value = false) {
        switch (value) {
            case true: case false:
                DATA.INLINE = value; break;
            default:
                clear.inline(); break;
        }
    };

    // Patch - initialise data on new game.
    void (alias => {
        DataManager.createGameObjects = function() {
            alias.apply(this, arguments);
            clearFlags();
        };
    })(DataManager.createGameObjects);

    // Patch - disable flagged choices as appropriate.
    void (alias => {
        Window_ChoiceList.prototype.makeCommandList = function() {
            alias.apply(this, arguments);
            applyDisable(this._list);
        };
    })(Window_ChoiceList.prototype.makeCommandList);

    // Patch - apply "disabled" opacity when appropriate.
    void (alias => {
        Window_ChoiceList.prototype.drawItem = function(index) {
            this.changePaintOpacity(this.isCommandEnabled(index));
            alias.apply(this, arguments);
        };
    })(Window_ChoiceList.prototype.drawItem);

    // Patch - vertically centre choice window when message window is not open.
    void (() => { if (!DEALIGN_Y) return;
        const alias = Window_ChoiceList.prototype.windowY;
        Window_ChoiceList.prototype.windowY = function() {
            if (this._messageWindow.isOpen())
                return alias.apply(this, arguments);
            return Graphics.boxHeight - this.windowHeight() >> 1; // nb self: >> is sign-propagating
        };
    })();

    // Patch - align choice text to match its window.
    void (() => { if (!ALIGN_X) return;

        /** @since v15 - moved to shared namespace. */
        const { ALIGNS, alignMult, adjustX } = CAE.Tweaks.Utils;

        // New - choice text aligns to its window.
        Window_ChoiceList.prototype.itemTextAlign = function() {
            return ALIGNS[$gameMessage.choicePositionType()];
        };

        // Patch - apply X draw offset due to choice text alignment.
        const alias = Window_ChoiceList.prototype.drawTextEx;
        Window_ChoiceList.prototype.drawTextEx = function(t, x, y, w, ...args) {
            const e = w - this.textSizeEx(t).width;
            const a = alignMult(t, this.itemTextAlign());
            alias.call(this, t, adjustX(x, e, a), y, w, ...args);
        };

    })();

    // Patch - merge consecutive Show Choices blocks if appropriate.
    void (() => { if (!LONG_MERGE) return;
        const alias = Game_Interpreter.prototype.setup;
        Game_Interpreter.prototype.setup = function(list, eventId, ...args) {
            alias.call(this, formatChoiceCommands(list), eventId, ...args);
        };
    })();

    // Patch - auto-reset flags if/when appropriate.
    void (() => { if (!AUTO_RESET) return;
        const alias = Game_Message.prototype.onChoice;
        Game_Message.prototype.onChoice = function(n) {
            alias.apply(this, arguments);
            clearFlags();
        };
    })();

    // Patch - map indices for shuffling/hiding choices.
    void (() => { if (!USE_INDEX_MAP) return;

        // Patch - shuffle and/or prune choice list as appropriate.
        void (alias => {
            Game_Message.prototype.setChoices = function(choices, ...args) {
                const ix = processIndexMap(choices.length);
                alias.call(this, ix ? ix.map(n => choices[n]) : choices, ...args);
            };
        })(Game_Message.prototype.setChoices);

        // Patch - rebind choice callback to account for modified index map if needed.
        void (alias => {
            Game_Message.prototype.setChoiceCallback = function(callback) {
                alias.apply(this, arguments);
                // Originally getIndexMap didn't create the map for length 0, that's why this check is like this.
                if (getIndexMap()) {
                    const f = this._choiceCallback;
                    this._choiceCallback = n => f(mapIndex(n));
                }
            };
        })(Game_Message.prototype.setChoiceCallback);

    })();

    // Patch - add choice help window.
    void (() => { if (!ADD_HELP) return;

        /** Number of lines for help window. @type {number} */
        const HELP_LINES = 2;

        /** Core script hard maximum visible choices. @type {number} */
        const DFAULT_MAX_VIS_CHOICES = 8;

        /**
         * Added to hard cap {@linkcode DFAULT_MAX_VIS_CHOICES}.\
         * This exists to make room for the help window.
         * @type {number}
         */
        const ADD_MAX_VIS_CHOICES = 1 - HELP_LINES; // [ ] Q49 - calculate this based on window `lineHeight`, `HELP_LINES`, & `Graphics.boxHeight`?

        /** Non-conflicting identifier for new "choice list help window" property on `Scene_Message`. */
        const SYM_P_HELP_WINDOW = Symbol();

        /** Non-conflicting identifier for new "choice list help window rectangle" method on `Scene_Message`. */
        const SYM_M_HELP_RECT = Symbol();

        /** @returns {Rectangle} Bounds rect for new choice help window. */
        Scene_Message.prototype[SYM_M_HELP_RECT] = function() {
            return new Rectangle(0, 0, Graphics.boxWidth, this.calcWindowHeight(HELP_LINES));
        };

        // Patch - adjust maximum visible choices to ensure help window has space.
        void (() => { if (!ADD_MAX_VIS_CHOICES) return;

            /** New maximum bound for `maxLines`. @type {number} */
            const NEW_MAX = Math.max(1, DFAULT_MAX_VIS_CHOICES + ADD_MAX_VIS_CHOICES);

            const alias = Window_ChoiceList.prototype.maxLines;
            Window_ChoiceList.prototype.maxLines = function() {
                return Math.min(NEW_MAX, alias.apply(this, arguments));
            };

        })();

        // Patch - create new choice help window.
        void (alias => {
            Scene_Message.prototype.createChoiceListWindow = function() {
                alias.apply(this, arguments);
                const w = this[SYM_P_HELP_WINDOW]
                        = new Window_Help(this[SYM_M_HELP_RECT]());
                w.hide();
                this.addWindow(w);
            };
        })(Scene_Message.prototype.createChoiceListWindow);

        // Patch - associate new choice help window with parent.
        void (alias => {
            Scene_Message.prototype.associateWindows = function() {
                alias.apply(this, arguments);
                this._choiceListWindow.setHelpWindow(this[SYM_P_HELP_WINDOW]);
            };
        })(Scene_Message.prototype.associateWindows);

        // Patch - adjust choice help window to match parent.
        void (alias => {
            Window_ChoiceList.prototype.updatePlacement = function() {
                alias.apply(this, arguments);
                const Y  = this.y;
                const wh = this._helpWindow;
                const wm = this._messageWindow;
                const YH = Y + this.height;
                const Hh = wh.height;
                const Hm = wm.height;
                wh.y = YH + Hh > Graphics.boxHeight ? Y - Hh : YH;
                if (Y - wm.y - Hm < Hh)
                    wh.y -= Hm;
            };
        })(Window_ChoiceList.prototype.updatePlacement);

        // Patch - show choice descriptions in help window.
        void (alias => {
            Window_ChoiceList.prototype.updateHelp = function() {
                alias.apply(this, arguments);
                const d = getDescription(this.index());
                if (d) {
                    this.showHelpWindow();
                    this._helpWindow.setText(d);
                } else
                    this.hideHelpWindow();
            };
        })(Window_ChoiceList.prototype.updateHelp);

        // Patch - hide help window when choices close.
        void (alias => {
            Window_ChoiceList.prototype.close = function() {
                alias.apply(this, arguments);
                this.hideHelpWindow();
            };
        })(Window_ChoiceList.prototype.close);

        // Patch - parse and cache choice descriptions if appropriate.
        void (alias => {
            Game_Interpreter.prototype.setupChoices = function(params) {
                alias.apply(this, arguments);
                updateDescriptions(this._list, this._index);
            };
        })(Game_Interpreter.prototype.setupChoices);

    })();

    // Patch - reposition choice window "inside" message window if/when appropriate.
    void (() => { if (!ALLOW_INLINE) return;

        /** Additional X-offset (px) relative to initial text X position. @type {number} */
        const X_OFFSET = CAE.Tweaks.Q49.IN_X;   // 8

        /** Additional width offset (px) relative to standard inline width. @type {number} */
        const W_OFFSET = CAE.Tweaks.Q49.IN_W;   // 0

        /** If true, eliminate row spacing for inlined choices. @type {boolean} */
        const NO_ROW_SPACING = true;

        /** Line height reduction (px) for inline choices. @type {number} */
        const LINE_HEIGHT_REDUCTION = 6;

        /** Additional padding (px) for Touch UI cancel button. @type {number} */
        const BUTTON_PADDING = 16;

        /** If `true`, automatically make inlined choices have a transparent background. @type {boolean} */
        const AUTO_TRANSPARENT_INLINE_BG = true;

        /** Non-conflicting identifier for new "is inline OK" method on `Window_ChoiceList`. */
        const SYM_M_IS_INLINE_OK = Symbol();

        /** Local cache for memoisation of width offset calc. @type {?number} */
        let buttonWidth = null;

        /** @returns {boolean} `true` iff it's OK to superimpose choices on message. */
        Window_ChoiceList.prototype[SYM_M_IS_INLINE_OK] = function() {
            return DATA.INLINE
                && this._messageWindow?.visible
                && this._messageWindow.isOpen();
        };

        // Patch - hacky fix for the "hole in message" visual glitch.
        void (alias => { if (CAE.Tweaks.Q07) return;
            Window_ChoiceList.prototype.updateBackground = function() {
                alias.apply(this, arguments);
                this._isWindow = !this[SYM_M_IS_INLINE_OK]();
            };
        })(Window_ChoiceList.prototype.updateBackground);

        // Patch - make choice background transparent when inlined.
        void (alias => { if (!AUTO_TRANSPARENT_INLINE_BG) return;
            Window_ChoiceList.prototype.updateBackground = function() {
                alias.apply(this, arguments);
                if (this[SYM_M_IS_INLINE_OK]())
                    this.setBackgroundType(2);
            };
        })(Window_ChoiceList.prototype.updateBackground);

        // Patch - eliminate row spacing for inlined choices.
        void (alias => { if (!NO_ROW_SPACING) return;
            Window_ChoiceList.prototype.rowSpacing = function() {
                return this[SYM_M_IS_INLINE_OK]() ? 0 : alias.apply(this, arguments);
            };
        })(Window_ChoiceList.prototype.rowSpacing);

        // Patch - reduce line height for inlined choices.
        void (alias => { if (!LINE_HEIGHT_REDUCTION) return;
            Window_ChoiceList.prototype.lineHeight = function() {
                const dy = this[SYM_M_IS_INLINE_OK]() ? LINE_HEIGHT_REDUCTION : 0;
                return alias.apply(this, arguments) - dy;
            };
        })(Window_ChoiceList.prototype.lineHeight);

        // Patch - position help window relative to message when choices are inlined.
        void (alias => { if (!ADD_HELP) return;
            Window_ChoiceList.prototype.updatePlacement = function() {
                alias.apply(this, arguments);
                if (this[SYM_M_IS_INLINE_OK]()) {
                    const m = this._messageWindow;
                    const h = this._helpWindow;
                    h.y = m.y + (
                        m.y < Graphics.boxHeight / 2 ? m.height : -h.height
                    );
                }
            };
        })(Window_ChoiceList.prototype.updatePlacement);

        // Patch - change choice window position & size when inlined.
        void (alias => {
            Window_ChoiceList.prototype.windowX = function() {
                if (this[SYM_M_IS_INLINE_OK]()) {
                    const w = this._messageWindow;
                    const t = w._textState;
                    if (t) {
                        const r = w.innerRect;
                        const d = t.rtl ? r.width - t.startX : t.startX;
                        const m = X_OFFSET * (t.rtl ? -1 : 1);
                        return w.x + r.x + d + m;
                    }
                }
                return alias.apply(this, arguments);
            };
        })(Window_ChoiceList.prototype.windowX);
        void (alias => {
            Window_ChoiceList.prototype.windowY = function() {
                if (this[SYM_M_IS_INLINE_OK]()) {
                    const w = this._messageWindow;
                    const t = w._textState;
                    if (t)
                        return w.y + t.startY + t.outputHeight;
                }
                return alias.apply(this, arguments);
            };
        })(Window_ChoiceList.prototype.windowY);
        void (alias => {
            Window_ChoiceList.prototype.windowWidth = function() {
                if (this[SYM_M_IS_INLINE_OK]()) {
                    const w = this._messageWindow;
                    const t = w._textState;
                    if (t) {
                        // Indent consistently regardless of Touch UI setting.
                        const p = buttonWidth ??= (
                            this._cancelButton ?? new Sprite_Button("cancel")
                        ).width + BUTTON_PADDING;
                        return (t.rtl ? t.startX : w.innerWidth - t.startX) - X_OFFSET - p + W_OFFSET;
                    }
                }
                return alias.apply(this, arguments);
            };
        })(Window_ChoiceList.prototype.windowWidth);
        void (alias => {
            Window_ChoiceList.prototype.windowHeight = function() {
                if (this[SYM_M_IS_INLINE_OK]()) {
                    const w = this._messageWindow;
                    const t = w._textState;
                    if (t)
                        return w.height - t.outputHeight;
                }
                return alias.apply(this, arguments);
            };
        })(Window_ChoiceList.prototype.windowHeight);

    })();

    // Patch - save/load data.
    void (() => { if (!SAVE_FLAGS) return;

        /** Identifier under which this feature stores its data in save files. */
        const SAVE_PROP = CAE.Tweaks.NAME + "_Q49";

        // Patch - add data to save.
        void (alias => {
            DataManager.makeSaveContents = function() {
                const o = alias.apply(this, arguments);
                const p = {};
                if (DATA.DISABLED.size)
                    p.d = Array.from(DATA.DISABLED);
                if (DATA.HIDDEN.size)
                    p.h = Array.from(DATA.HIDDEN);
                if (DATA.SHUFFLE !== DFAULT_SHUFFLE)
                    p.s = DATA.SHUFFLE;
                if (DATA.INLINE !== DFAULT_INLINE)
                    p.i = DATA.INLINE;
                if (Object.keys(p).length)
                    o[SAVE_PROP] = p;
                return o;
            };
        })(DataManager.makeSaveContents);

        // Patch - read data from save.
        void (alias => {
            DataManager.extractSaveContents = function(contents) {
                alias.apply(this, arguments);
                const p = contents[SAVE_PROP];
                if (p) {
                    if (Array.isArray(p.d))
                        DATA.DISABLED = new Set(p.d);
                    if (Array.isArray(p.h))
                        DATA.HIDDEN = new Set(p.h);
                    if ("s" in p)
                        DATA.SHUFFLE = !!p.s;
                    if ("i" in p)
                        DATA.INLINE = !!p.i;
                }
            };
        })(DataManager.extractSaveContents);

    })();

    /**
     * Plugin command helper function.
     * @param {string} indices
     * Raw plugin command argument.
     * @returns {number[]}
     * Parsed choice indices, or an empty array.
     */
    const parseIx = function(indices) {
        if (indices)
            return JSON.parse(indices).map(s => parseInt(s, 10));
        return [];
    };

    // Define and register plugin commands.
    for (const [k, f] of Object.entries(CAE.Tweaks.Q49.com = {

        /**
         * Disables/enables specified choice indices.
         * @param {{type:string,indices:string}} args
         * Raw plugin command arguments.
         */
        disable: function(args) {
            const ix = parseIx(args.indices);
            switch (args.type.toUpperCase()) {
                case "ENABLE": case "ON":
                    setDisabled(false, ...ix); break;
                case "DISABLE": case "OFF":
                    setDisabled(true, ...ix);  break;
                case "TOGGLE": case "ONOFF":
                    toggleDisabled(...ix);     break;
                case "RESET":
                    clear.disabled();          break;
            }
        },

        /**
         * (Un)hides specified choice indices.
         * @param {{type:string,indices:string}} args
         * Raw plugin command arguments.
         */
        hide: function(args) {
            const ix = parseIx(args.indices);
            switch (args.type.toUpperCase()) {
                case "SHOW": case "ON":
                    setHidden(false, ...ix); break;
                case "HIDE": case "OFF":
                    setHidden(true, ...ix);  break;
                case "TOGGLE": case "ONOFF":
                    toggleHidden(...ix);     break;
                case "RESET":
                    clear.hidden();          break;
            }
        },

        /**
         * Enables/disables shuffle.
         * @param {{type:string}} args
         * Raw plugin command arguments.
         */
        shuffle: function(args) {
            switch (args.type.toUpperCase()) {
                case "TRUE": case "ON":
                    setShuffle(true);          break;
                case "FALSE": case "OFF":
                    setShuffle(false);         break;
                case "TOGGLE": case "ONOFF":
                    setShuffle(!DATA.SHUFFLE); break;
                case "RESET":
                    clear.shuffle();           break;
            }
        },

        /**
         * Enables/disables inline choices.
         * @param {{type:string}} args
         * Raw plugin command arguments.
         */
        inline: function(args) {
            switch (args.type.toUpperCase()) {
                case "TRUE": case "ON":
                    setInline(true);         break;
                case "FALSE": case "OFF":
                    setInline(false);        break;
                case "TOGGLE": case "ONOFF":
                    setInline(!DATA.INLINE); break;
                case "RESET":
                    clear.inline();          break;
            }
        }

    }))
        PluginManager.registerCommand(CAE.Tweaks.NAME, "Q49_" + k, f);

})();

// Q50) Menu alterations, including layout changes & new mini-help.
void (() => { if (!CAE.Tweaks.Q50) return;
'use strict';

    /** If `true`, add a mini help window between the touch buttons. */
    const ADD_MINIHELP = CAE.Tweaks.Q50.MINIHELP;

    /** If `true`, flip the command area placement (left/right). */
    const ALT_COMMAND_SIDE = CAE.Tweaks.Q50.POS_CMD;

    /** If `true`, flip the button area placement (top/bottom). */
    const ALT_BUTTON_AREA = CAE.Tweaks.Q50.POS_BTN;

    /** If `true`, flip the help window placement (top/bottom). */
    const ALT_HELP_AREA = CAE.Tweaks.Q50.POS_HLP;

    // Patch - add smol help window in the space between the Touch UI buttons.
    void (() => { if (!ADD_MINIHELP) return;

        /** Non-conflicting identifiers for new subfeature. */
        const SYM = Object.freeze({
            /** For new method to return mini-help window rect on `Scene_MenuBase`. */
            RECT: Symbol(),
            /** For new method to return mini-help window text on `Scene_MenuBase`. */
            TEXT: Symbol(),
            /** For new "get next mini-help text info" method on `Scene_MenuBase`. */
            NEXT: Symbol(),
            /** For new method to update mini-help window text on `Scene_MenuBase`. */
            SET_TEXT: Symbol(),
            /** For new property pointing to mini-help window instance on `Scene_MenuBase`. */
            P: Symbol(),
            /** For new property pointing to mini-help text generator instance on `Scene_MenuBase`. */
            G: Symbol(),
            /** For new "frames until next mini-help refresh" property on `Scene_MenuBase`. */
            T: Symbol(),
            /** For new "mini-help refresh transition enabled" property on `Scene_MenuBase`. */
            TT: Symbol(),
            /** For new "next mini-help value, done, & changed" property on `Scene_MenuBase`. */
            S: Symbol()
        });

        /** Global identifier for new window constructor. */
        const N = "Window_HelpMiniCae";

        /** Font size for new window. */
        const FONT_SIZE = CAE.Tweaks.Q50.MINIHELP_FS;

        /** Maps scene constructor names to their functions that yield aux help text. @type {Map<string,Generator<string,string|undefined,void>} */
        const TEXTS = CAE.Tweaks.Q50.MINIHELP_TXT;

        /** Frames between mini-help text updates. If `0`, refresh only on init. @type {number} */
        const UPDATE_PERIOD = CAE.Tweaks.Q50.MINIHELP_T;

        /** Frames for transition time when mini-help text updates. @type {number} */
        const TRANSITION_TIME = CAE.Tweaks.Q50.MINIHELP_TT;

        /** Mini-help background type. @type {number} */
        const BG_TYPE = CAE.Tweaks.Q50.MINIHELP_BG;

        /** If `true`, rearrange name scene a bit to make room for the mini-help. @type {boolean} */
        const SQUISH_NAME_EDIT_WINDOW = CAE.Tweaks.Q50.MINIHELP_NAM && [
            "Scene_Name", "Scene_MenuBase"  // v15 - added check for Scene_MenuBase (inheritance)
        ].some(c => TEXTS.has(c));

        /** Used for padding window X-position. */
        const PAD_X = 3;

        // New - define mini-help window.
        Object.assign((globalThis[N] = function() {
            this.initialize(...arguments);
        }).prototype = Object.create(Window_Help.prototype), {
            constructor: globalThis[N],
            initialize: function() {
                Window_Help.prototype.initialize.apply(this, arguments);
                this.setBackgroundType(BG_TYPE);
            },
            fontSize: function() {
                return FONT_SIZE;
            },
            refresh: function() {
                this.contents.clear();
                if (!this._text)
                    return;
                const rect = this.baseTextRect();
                const t  = `\\fs[${this.fontSize()}]` + this._text;
                const ts = this.textSizeEx(t);
                const dx = rect.width - ts.width >> 1;  // nb: js defines >> as sign-propagating
                const dy = rect.height - ts.height >> 1;
                this.drawTextEx(t, rect.x + dx, rect.y + dy, ts.width | 0);
            }
        });

        // New - public property for fetching currently-assigned text.
        Object.defineProperty(globalThis[N].prototype, "text", {
            get: function() { return this._text; },
            configurable: true
        });

        // New - define methods to return display text for new help window.
        for (const [c, f] of TEXTS)
            globalThis[c].prototype[SYM.TEXT] = f;

        /**
         * @returns {Rectangle}
         * Bounding rect for new help window (between Touch UI buttons).
         */
        Scene_MenuBase.prototype[SYM.RECT] = function() {
            const h = this.buttonAreaHeight();
            const y = this.buttonAreaTop();
            const x = h + PAD_X << 1;
            const w = Graphics.boxWidth - (x << 1);
            return new Rectangle(x, y, w, h);
        };

        /**
         * Refreshes next display info.
         * @returns {{value:string,done:boolean,changed:boolean}}
         * Cached info, for ease of chaining.
         */
        Scene_MenuBase.prototype[SYM.NEXT] = function() {
            this[SYM.S] = (this[SYM.G] ??= this[SYM.TEXT]()).next();
            this[SYM.S].changed = this[SYM.S].value !== this[SYM.P].text;
            return this[SYM.S];
        };

        /** Updates new help window: text, visibility, refresh timer. */
        Scene_MenuBase.prototype[SYM.SET_TEXT] = function() {
            const w = this[SYM.P];
            /** @type {IteratorResult<string,string|undefined>} */
            const { value, done } = this[SYM.S] ??= this[SYM.NEXT]();
            // update display
            if (value) {
                w.setText(value);
                w.open();
            } else if (SYM.T in this)
                w.close();
            else
                w.openness = 0;
            // update next/transition
            if (UPDATE_PERIOD && !done) {
                this[SYM.T] = 1 + UPDATE_PERIOD + TRANSITION_TIME;
                if (!w.contentsOpacity)
                    this[SYM.TT] = true;    // for fade in
                else
                    delete this[SYM.TT];
                this[SYM.NEXT]();
            } else
                delete this[SYM.T], delete this[SYM.TT], delete this[SYM.S];
        };

        // Patch - add new help window.
        void (alias => {
            Scene_MenuBase.prototype.create = function() {
                alias.apply(this, arguments);
                const w = this[SYM.P] = new globalThis[N](this[SYM.RECT]());
                if (SYM.TEXT in this)
                    this[SYM.SET_TEXT]();   // sic
                this.addWindow(w);
            };
        })(Scene_MenuBase.prototype.create);

        // Patch - reduce edit window height to make room for mini-help.
        void (() => { if (!SQUISH_NAME_EDIT_WINDOW) return;

            // Patch - reduce edit window height.
            void (alias => {
                Scene_Name.prototype.editWindowRect = function() {
                    const r = alias.apply(this, arguments);
                    const dy = this.buttonAreaHeight();
                    r.height -= dy;
                    if (!this.isBottomButtonMode())
                        r.y += dy;  // v15
                    return r;
                };
            })(Scene_Name.prototype.editWindowRect);
            // Input window position depends on edit window height.

            // Patch - internal layout should not use arbitrary inlined constants!
            void (alias => {
                Window_NameEdit.prototype.itemRect = function() {
                    const r = alias.apply(this, arguments);
                    r.y = this.innerHeight - r.height >> 1;
                    return r;
                };
            })(Window_NameEdit.prototype.itemRect);

            // Patch - vertically centre face in edit window. >_>
            void (alias => {
                Window_NameEdit.prototype.drawActorFace = function(actor, x, y, width, height, ...args) {
                    const dy = this.innerHeight - ImageManager.faceHeight >> 1;
                    alias.call(this, actor, x, y + dy, width, height + dy, ...args);
                };
            })(Window_NameEdit.prototype.drawActorFace);

        })();

        // Patch - periodic refresh for mini-help display text.
        void (() => { if (!UPDATE_PERIOD) return;

            /** Opacity change per frame. @type {number} */
            const OPACITY_STEP = TRANSITION_TIME ? 255 / TRANSITION_TIME : 0;

            // Patch - periodically refresh mini-help text value & opacity.
            const alias = Scene_MenuBase.prototype.update;
            Scene_MenuBase.prototype.update = function() {
                alias.apply(this, arguments);
                if (SYM.T in this) {
                    const dO = SYM.TT in this ? OPACITY_STEP : 0;
                    if (--this[SYM.T] >= 0) {
                        const dT = this[SYM.T] - UPDATE_PERIOD;
                        if (!dT) {
                            this[SYM.P].contentsOpacity = 255;
                            if (!this[SYM.S].changed)
                                this[SYM.SET_TEXT]();   // early reset
                            else    // for fade out
                                this[SYM.TT] = !this[SYM.S].done;
                        } else if (dO && dT > 0)
                            this[SYM.P].contentsOpacity += dO;
                    } else {
                        const dT = this[SYM.T] + TRANSITION_TIME;
                        if (!dT) {
                            if (dO)
                                this[SYM.P].contentsOpacity = 0;
                            this[SYM.SET_TEXT]();
                        } else if (dO)
                            this[SYM.P].contentsOpacity -= dO;
                    }
                }
            };

        })();

    })();

    // Patch - alternative command window position (right/left).
    void (() => { if (!ALT_COMMAND_SIDE) return;
        const alias = Scene_MenuBase.prototype.isRightInputMode;
        Scene_MenuBase.prototype.isRightInputMode = function() {
            return !alias.apply(this, arguments);
        };
    })();

    // Patch - alternative button area position (top/bottom).
    void (() => { if (!ALT_BUTTON_AREA) return;
        const alias = Scene_MenuBase.prototype.isBottomButtonMode;
        Scene_MenuBase.prototype.isBottomButtonMode = function() {
            return !alias.apply(this, arguments);
        };
    })();

    // Patch - alternative help area position (bottom/top).
    void (() => { if (!ALT_HELP_AREA) return;
        const alias = Scene_MenuBase.prototype.isBottomHelpMode;
        Scene_MenuBase.prototype.isBottomHelpMode = function() {
            return !alias.apply(this, arguments);
        };
    })();

})();

// Q51) Master volume option.
void (() => { if (!CAE.Tweaks.Q51) return;
'use strict';

    /**
     * Internal command symbol for new master volume option.\
     * Must include `"Volume"` to interface correctly with core scripts.
     * @type {string}
     */
    const KEY = "masterVolume";

    /** Display text for new master volume option. @type {string} */
    const TXT = CAE.Tweaks.Q51.TXT; // "Master Volume";

    /** Default value for {@linkcode value}. @type {number} */
    const DFAULT = CAE.Tweaks.Q51.DFAULT;   // 100

    /** Local repository for current master volume value (`100` for 100%). @type {number} */
    let value = DFAULT;

    // New - add master volume property to `ConfigManager`.
    Object.defineProperty(ConfigManager, KEY, {
        get: function( ) { return value; },
        set: function(v) {
            if (typeof v === "number") {
                value = v.clamp(0, 100);
                WebAudio.setMasterVolume(value / 100);
            }
        },
        configurable: true
    });

    // Patch - add master volume option in-game, before other volume settings.
    void (alias => {
        Window_Options.prototype.addVolumeOptions = function() {
            this.addCommand(TXT, KEY);
            alias.apply(this, arguments);
        };
    })(Window_Options.prototype.addVolumeOptions);

    // Patch - include master volume in saved options.
    void (alias => {
        ConfigManager.makeData = function() {
            const o = alias.apply(this, arguments);
            o[KEY] = this[KEY];
            return o;
        };
    })(ConfigManager.makeData);

    // Patch - read master volume from saved options.
    void (alias => {
        ConfigManager.applyData = function(config) {
            alias.apply(this, arguments);
            this[KEY] = KEY in config ? this.readVolume(config, KEY) : DFAULT;
        };
    })(ConfigManager.applyData);

})();

// Q52) Option categories.
void (() => { if (!CAE.Tweaks.Q52) return;
"use strict";

    /** @typedef {[help:string, ...cmds:string[]]} OptionCategory */

    /** Convenient shorthand for initialisation. */
    const $ = CAE.Tweaks.Q52;

    /** New identifiers for this feature. */
    $.SYM = Object.freeze({
        /** Identifier for new "create category window" method on `Scene_Options`. */
        M_CREATE: Symbol(),
        /** Identifier for new "category window width" method on `Scene_Options`. */
        M_RECT: Symbol(),
        /** Identifier for new "set category" method on `Window_Options`. */
        M_SETCAT: Symbol(),
        /** Identifier for new "current category" property on `Window_Options`. */
        P_CAT: Symbol(),
        /** Identifier for new "options window cancel" method on `Scene_Options`. */
        M_ON_OPT_CANCEL: Symbol(),
        /** Identifier for new "category window OK" method on `Scene_Options`. */
        M_ON_CAT_OK: Symbol(),
        /** Identifier for new "category window instance" property on `Scene_Options`. */
        P: "_categoryWindow",
        /** Global identifier for new "category window" class.  */
        C: "Window_OptionsCategoryCae"
    });

    // Add default category if defined but not already present; then freeze cats.
    if ($.DFAULT && !$.CATS.has($.DFAULT))
        $.CATS.set($.DFAULT, Object.freeze([]));
    Object.freeze($.CATS);

    /** Inverse map, to make runtime lookups more efficient (assume bijection). */
    $.COMS = (() => {
        const m = new Map();
        /** @type {Map<string,OptionCategory>} */
        const M = $.CATS;
        for (const [k, v] of M)
            if (v.length > 1)
                for (let n = v.length; --n;)
                    m.set(v[n], k);
        return m;
    })();

    /** New options category window. @constructor */
    const C = globalThis[$.SYM.C] = function() { this.initialize(...arguments); };
    Object.assign(C.prototype = Object.create(
        $.HORZ ? Window_HorzCommand.prototype : Window_Command.prototype
    ), {
        constructor: C,

        /** @constructor */
        initialize: function() {
            Window_Command.prototype.initialize.apply(this, arguments);
            this.selectLast();
        },

        /** Makes command list. */
        makeCommandList: function() {
            for (const k of CAE.Tweaks.Q52.CATS.keys())
                this.addCommand(k, k);
        },

        /** Updates category on assigned options window, if any. */
        updateCategory: function() {
            const s = this.currentSymbol();
            if (this._optionsWindow && this.index() >= 0)
                this._optionsWindow[CAE.Tweaks.Q52.SYM.M_SETCAT](s);
        },

        /** Assigns an options window to this category window. */
        setOptionsWindow: function(w) {
            this._optionsWindow = w;
            this.updateCategory();
        },

        /** Update associated options window category, if any, on select. */
        select: function() {
            Window_Command.prototype.select.apply(this, arguments);
            this.updateCategory();
        },

        /** Re-selects most recently-selected category symbol this session, if any. */
        selectLast: function() {
            const s = this.constructor._lastCommandSymbol;
            if (s)
                this.selectSymbol(s);
        },

        /** Record most recently-selected symbol before destroying instance. */
        destroy: function() {
            this.constructor._lastCommandSymbol = this.currentSymbol();
            Window_Command.prototype.destroy.apply(this, arguments);
        },

        /**
         * @param {string} [symbol] Command symbol; if omitted, uses current symbol.
         * @returns {string} Corresponding help text.
         */
        helpText: function(symbol = this.currentSymbol()) {
            return CAE.Tweaks.Q52.CATS.get(symbol)?.[0] ?? "";
        },

        /** Updates help window, if it exists, with text for current command. */
        updateHelp: function() {
            this._helpWindow?.setText(this.helpText());
        }

    });
    if ($.HORZ)
        C.prototype.maxCols = function() { return CAE.Tweaks.Q52.CATS.size; };

    /** @param {string} c Category to assign to options window. */
    Window_Options.prototype[$.SYM.M_SETCAT] = function(c) {
        const P = CAE.Tweaks.Q52.SYM.P_CAT;
        if (this[P] !== c) {
            this[P] = c;
            this.refresh();
            this.scrollTo(0, 0);
        }
    };

    /** @returns {Rectangle} Bounds for new category window. */
    Scene_Options.prototype[$.SYM.M_RECT] = $.HORZ ? function() {
        const r = this.optionsWindowRect();
        const h = this.calcWindowHeight(1, true);
        const w = r.width;
        const d = CAE.Tweaks.Q52.TOPLEFT ? 0 : r.height;
        const c = CAE.Tweaks.Q52.CENTRE.y ? h >> 1 : 0;
        const y = r.y + d + c;
        const x = r.x;
        return new Rectangle(x, y, w, h);
    } : function() {
        const r = this.optionsWindowRect();
        const h = r.height;
        const w = this.mainCommandWidth();
        const d = CAE.Tweaks.Q52.TOPLEFT ? -w : r.width;
        const c = CAE.Tweaks.Q52.CENTRE.x ? w >> 1 : 0;
        const y = r.y;
        const x = r.x + d + c;
        return new Rectangle(x, y, w, h);
    };

    /** Creates and applies new category window to this scene. */
    Scene_Options.prototype[$.SYM.M_CREATE] = function() {
        const S = CAE.Tweaks.Q52.SYM;
        this.addWindow(this[S.P] = new globalThis[S.C](this[S.M_RECT]()));
    };

    /** New handler to run when options window is cancelled. */
    Scene_Options.prototype[$.SYM.M_ON_OPT_CANCEL] = function() {
        this[CAE.Tweaks.Q52.SYM.P].activate();
        this._optionsWindow.deselect();
    };

    /** Called when a category is OK'd. */
    Scene_Options.prototype[$.SYM.M_ON_CAT_OK] = function() {
        this._optionsWindow.activate();
        this._optionsWindow.select(0);
    };

    // Patch - adjust options window position to admit new category window.
    void (alias => {
        Scene_Options.prototype.optionsWindowRect = $.HORZ ? function() {
            const r = alias.apply(this, arguments);
            const h = this.calcWindowHeight(1, true);
            const c = CAE.Tweaks.Q52.CENTRE;
            const [a, b] = CAE.Tweaks.Q52.TOPLEFT ? [h, 0] : [0, h + r.height];
            if (a)
                r.y += Math.floor(c ? a / 2 : a);
            else if (c)
                r.y -= Math.ceil(h / 2);
            r.y = r.y.clamp(this.mainAreaTop() + a, this.mainAreaBottom() - b);
            return r;
        } : function() {
            const r = alias.apply(this, arguments);
            const w = this.mainCommandWidth();
            const c = CAE.Tweaks.Q52.CENTRE;
            const [a, b] = CAE.Tweaks.Q52.TOPLEFT ? [w, 0] : [0, w + r.width];
            if (c)
                r.x += a ? Math.floor(w / 2) : -Math.ceil(w / 2);
            r.x = r.x.clamp(a, Graphics.boxWidth - b);
            return r;
        };
    })(Scene_Options.prototype.optionsWindowRect);

    // Patch - reduce maximum height of options window as specified.
    void (alias => { // unconditional patch for max control
        Scene_Options.prototype.maxVisibleCommands = function() {
            return Math.max(1, alias.apply(this, arguments) - CAE.Tweaks.Q52.ROW_SUB);
        };
    })(Scene_Options.prototype.maxVisibleCommands);

    // Patch - add new category window to scene & adjust handlers.
    void (alias => {
        Scene_Options.prototype.create = function() {
            alias.apply(this, arguments);
            const S = CAE.Tweaks.Q52.SYM;
            this[S.M_CREATE]();
            const wo = this._optionsWindow;
            const wc = this[S.P];
            const wh = this._helpWindow;
            wo.setHandler("cancel", this[S.M_ON_OPT_CANCEL].bind(this));
            wo.deactivate();
            wo.deselect();
            wc.setHandler("ok",     this[S.M_ON_CAT_OK].bind(this));
            wc.setHandler("cancel", this.popScene.bind(this));
            wc.setOptionsWindow(wo);
            if (wh) // Q17
                wc.setHelpWindow(wh);
        };
    })(Scene_Options.prototype.create);

    // Patch - filter options based on current category.
    void (alias => {
        Window_Options.prototype.addCommand = function(name, symbol) {
            const D = CAE.Tweaks.Q52;
            /** Maps command symbol to its category. @type {Map<string,string>} */
            const M = D.COMS;
            /** "Current category" property identifier. @type {string|symbol} */
            const currentCat = this[D.SYM.P_CAT];
            if (
                (!M.has(symbol) && currentCat === D.DFAULT) ||
                M.get(symbol) === currentCat
            )
                alias.apply(this, arguments);
        };
    })(Window_Options.prototype.addCommand);

})();

// Q53) Hover tip process text codes, navigate with touch hover or shift key.
void (() => { if (!CAE.Tweaks.Q53) return;
"use strict";

    /** Text code (uppercase) for marking/enclosing hover tip text. @type {string} */
    const TEXT_CODE = "T";

    /**
     * Determines scope:
     * - `true`: applies only for `Window_Message` & `Scene_Message`.
     * - `false`: applies for `Window_Base` & `Scene_Base`.
     * @type {boolean}
     */
    const MSG_ONLY = CAE.Tweaks.Q53.MSG_ONLY ?? true;

    /**
     * @typedef {object} CurrentHoverTipData
     * @property {number} a
     * Text state index for start of tooltip.
     * @property {number} b
     * Text state index for end of tooltip.
     * @property {number} x
     * X position of start of tooltip (px).
     * @property {number} y
     * Y position of start of tooltip (px).
     */
    /**
     * @typedef {object} HoverTipRect
     * @property {string} text
     * Text used for tooltip (used for tip info lookup).
     * @property {Rectangle} rect
     * Defines hover/select area for this tip.
     */
    /**
     * @typedef {object} HoverTipData
     * @property {CurrentHoverTipData} current
     * Running data for currently-processing hover tip.
     * @property {HoverTipRect[]} rects
     * Array of processed, responsive hover tips for current text display.
     * @property {number} selected
     * Index of currently-selected hover tip; `-1` for none.
     */

    Object.assign(CAE.Tweaks.Q53, {

        SYM: Object.freeze({
            /** Identifier for new "process string-param text code" window method. */
            M_PROC_TC: Symbol(),
            /** Identifier for new "check rect data" window method, for per-char rect data updates. */
            M_CHECKIX: Symbol(),
            /** Identifier for new "initiate hover tip rect registration" window method. */
            M_ADDRECT: Symbol(),
            /** Identifier for new "update hovered tip by touch input" window method. */
            M_UPDATE_TOUCH: Symbol(),
            /** Identifier for new "updated hovered tip by button input" window method. */
            M_UPDATE_BUTTON: Symbol(),
            /** Identifier for new "show hover tip" window method. */
            M_SHOWTIP: Symbol(),
            /** Identifier for new "update hover tip" scene method. */
            M_PROCTIP: Symbol(),
            /**
             * Identifier for:
             * - New "hover tip data" window property; and
             * - Next "hover tip to display" Game_Temp property.
             */
            P: Symbol(),
            /** Global identifier for new "hover tip window" class. */
            C: "Window_CaeHoverTip",
            /** Identifier for new "hover tip window instance" scene property. */
            W: "_hoverTipWindowCae"
        }),

        /** Regular expression matching text code arg for hover tip rect phrase. */
        RX: /^\[((?:[^\]\[\n]|\[[^\]\n]*\])+)\]/i,
        // string match [args], allowing pairs of internal "[...]" e.g. for other text codes.

        /** Patch hook identifiers for clearing tooltip data, to avoid related memory leak. @type {Map<string,string>} */
        HOOKS: MSG_ONLY ? new Map([
            ["Window_Message",     "newPage"],
            ["Window_Message",     "close"  ]
        ]) : new Map([
            ["Window_Selectable",  "paint"  ],
            ["Window_Help",        "refresh"],
            ["Window_Gold",        "refresh"],
            ["Window_EquipStatus", "refresh"],
            ["Window_ShopStatus",  "refresh"],
            ["Window_NameEdit",    "refresh"],
            ["Window_NameBox",     "refresh"],
            ["Window_Message",     "newPage"],
            ["Window_ScrollText",  "refresh"],
            ["Window_MapName",     "refresh"],
            ["Window_BattleLog",   "refresh"],
            ["Window_Base",        "close"  ]
        ])

    });

    const W = globalThis[CAE.Tweaks.Q53.SYM.C] = function() { this.initialize(...arguments); };

    Object.defineProperties(W, {

        /**
         * Window background type: 0 (Window), 1 (Dim), or 2 (Transparent).
         * @static @readonly @type {number}
         */
        BG_TYPE: { value: CAE.Tweaks.Q53.BG_TYPE, configurable: false },

        /**
         * Maps display text to hover tip text.
         * @static @readonly @type {Readonly<Map<string,string>>}
         */
        TIPS: { value: Object.freeze(new Map(CAE.Tweaks.Q53.TIPS)), configurable: false },

        /**
         * Affects calculation of window Y offset relative to tip text rect.\
         * See `_tipOffsetY` method for details.
         * @static @readonly @type {number}
         */
        OFFSET_Y_FACTOR: { value: 1, configurable: true }

    });

    Object.assign(W.prototype = Object.create(Window_Base.prototype), {

        constructor: W,

        /** @constructor */
        initialize: function() {
            Window_Base.prototype.initialize.call(this, new Rectangle());
            this.hide();
            this._text = "";
            this._pos = new Point(0, 0);
        },

        /**
         * Sets tip text and position, then refreshes the window.
         * @param {string} text
         * Display text.
         * @param {number} x
         * Screen X position.
         * @param {number} y
         * Screen Y position.
         */
        setTip: function(text = "", x = 0, y = 0) {
            if (
                this._text !== text ||
                this._pos.x !== x ||
                this._pos.y !== y
            ) {
                this._text = text;
                this._pos.set(x, y);
                this.refresh();
            }
        },

        _tipOffsetSignX: function(x, w) {
            return 1;
        },
        _tipOffsetSignY: function(y, h) {
            return y > Graphics.boxHeight >> 1 ? -1 : 1;
        },
        _tipOffsetY: function(y, h) {
            const m = this._tipOffsetSignY(...arguments);
            const d = this.constructor.OFFSET_Y_FACTOR;
            return m * h * (2 + d) >> 2;
        },
        _tipOffsetX: function(x, w) {
            return 0;
        },
        _tipMarginX: function(x, w) {
            return this.padding;
        },
        _tipMarginY: function(y, h) {
            return this.padding;
        },

        /**
         * @param {number} x Screen X of source hover area.
         * @param {number} y Screen Y of source hover area.
         * @param {number} w Tip window width.
         * @param {number} h Tip window height.
         * @returns {{dx:number,dy:number}} Position offsets, in px.
         */
        tipOffset: function(x, y, w, h) {
            return { dx: this._tipOffsetX(x, w), dy: this._tipOffsetY(y, h) };
        },

        /**
         * @param {number} x Screen X of source hover area.
         * @param {number} y Screen Y of source hover area.
         * @param {number} w Tip text width.
         * @param {number} h Tip text height.
         * @returns {{mx:number,my:number}} Internal margins, in px.
         */
        tipMargin: function(x, y, w, h) {
            return { mx: this._tipMarginX(x, w), my: this._tipMarginY(y, h) };
        },

        // [ ] Q53 - open/close/easing anims for tip window?
        /** Resizes, repositions, and redraws the window. */
        refresh: function() {
            const t = this.constructor.TIPS.get(this.text.trim().toUpperCase());
            if (t) {
                const { width: w, height: h } = this.textSizeEx(t);
                const {  x,  y } = this._pos;
                const { mx, my } = this.tipMargin(x, y, w, h);
                const wm = Math.min(w + mx * 2, Graphics.boxWidth ) | 0;
                const hm = Math.min(h + my * 2, Graphics.boxHeight) | 0;
                const { dx, dy } = this.tipOffset(x, y, wm, hm);
                this.move(
                    (x + dx).clamp(0, Graphics.boxWidth  - wm),
                    (y + dy).clamp(0, Graphics.boxHeight - hm),
                    wm,
                    hm
                );
                this.createContents();
                // reset background type to refresh dimmer sprite size
                this.setBackgroundType(this.constructor.BG_TYPE);
                this.drawTextEx(t, 0, 0);
                this.show();
            } else
                this.hide();
        }

    });

    Object.defineProperties(W.prototype, {

        /** Gets current tip text. @readonly @type {string} */
        text: { get: function() { return this._text; }, configurable: true }

    });

    /** Window constructor to patch (`Message` or `Base`). */
    const Bw = MSG_ONLY ? Window_Message : Window_Base;
    /** Scene constructor to patch (`Message` or `Base`). */
    const Bs = MSG_ONLY ? Scene_Message  : Scene_Base ;

    // New - process new text code, if present.
    Bw.prototype[CAE.Tweaks.Q53.SYM.M_PROC_TC] = function(textState) {
        const Q = CAE.Tweaks.Q53;
        const t = textState.text.slice(textState.index);
        const m = Q.RX.exec(t); // extract text code [arg]
        if (m) {
            /** @type {CurrentHoverTipData} */
            const o = {};
            o.a = ++textState.index;    // "["
            o.b = o.a + m[1].length;
            o.x = textState.x;
            o.y = textState.y;
            (this[Q.SYM.P] ??= {}).current = o;
            return true;
        }
        return false;
    };

    // New - check text state index for end of rect.
    Bw.prototype[CAE.Tweaks.Q53.SYM.M_CHECKIX] = function(textState) {
        /** @type {HoverTipData?} */
        const D = this[CAE.Tweaks.Q53.SYM.P];
        const o = D?.current;
        if (o) {
            // line changed, or will next update - no, just accept that \py[n] etc will break it.
            // const dy = t.y !== o.y || t.text[t.index] === "\n";
            // reached end of hover tip text code
            const di = textState.index >= o.b;
            if (/*dy ||*/ di) {
                this[CAE.Tweaks.Q53.SYM.M_ADDRECT](textState);
                if (!di) {
                    o.a = textState.index;
                } else
                    D.current = null;
            }
        }
    };

    // New - add a new tip rect to the list.
    Bw.prototype[CAE.Tweaks.Q53.SYM.M_ADDRECT] = function(textState) {
        /** @type {HoverTipData} */
        const C = CAE.Tweaks.Q53;
        const D = this[C.SYM.P];
        const { x, y, a } = D.current;
        const p = C.CURSOR_PAD_X;
        // nb: textSizeEx here => infinite loop
        // buffer has not yet been flushed, so manually measure that
        const w = textState.x + this.textWidth(textState.buffer) - x;
        const h = textState.height;
        const text = textState.text.slice(a, textState.index++);    // "]"
        const rect = new Rectangle(x - p, y, w + 2 * p, h);
        (D.rects ??= []).push(Object.freeze({ text, rect }));
    };

    // New - check for (un)hovering a tip rect.
    Bw.prototype[CAE.Tweaks.Q53.SYM.M_UPDATE_TOUCH] = function() {
        if (this.isOpen() && TouchInput.isHovered()) {
            const S = CAE.Tweaks.Q53.SYM;
            /** @type {HoverTipData?} */
            const D = this[S.P];
            const R = this.innerRect;
            const P = new Point(TouchInput.x - R.x, TouchInput.y - R.y);
            const { x, y } = this.worldTransform.applyInverse(P);
            const n = D?.rects?.findIndex(r => r.rect.contains(x, y));
            if (n >= 0 || D?.selected >= 0)
                return this[S.M_SHOWTIP](n);
        }
        return false;
    };

    // New - allow cycling through tips via button input.
    if (CAE.Tweaks.Q53.NAV_BUTTON)
        Bw.prototype[CAE.Tweaks.Q53.SYM.M_UPDATE_BUTTON] = function() {
            if (this.isOpen()) {
                /** @type {HoverTipData} */
                const D = this[CAE.Tweaks.Q53.SYM.P];
                const L = D?.rects?.length ?? 0;
                // want to support core gamepad input, so ignore tab/ctrl...
                // pageup/down may conflict with Window_EventItem or others...
                // settled with shift - no real need to control iteration dir.
                if (L > 1 && Input.isTriggered(CAE.Tweaks.Q53.NAV_BUTTON))
                    this[CAE.Tweaks.Q53.SYM.M_SHOWTIP](
                        ((D.selected ?? -1) + 1) % (L + 1)
                    );
            }
        };

    // New - request new hover tip.
    Bw.prototype[CAE.Tweaks.Q53.SYM.M_SHOWTIP] = function(index) {
        const { P } = CAE.Tweaks.Q53.SYM;
        if (P in this)
            this[P].selected = index;
        $gameTemp[P] = this;
        return true;
    };

    // New - process a pending hover tip show/hide request.
    Bs.prototype[CAE.Tweaks.Q53.SYM.M_PROCTIP] = function() {
        const S = CAE.Tweaks.Q53.SYM;
        const P = S.P;
        /** @type {Window_Base|Window_Message} */
        const W = $gameTemp[P];
        /** @type {HoverTipData?} */
        const D = W?.[P];
        const d = D?.rects?.[D.selected];
        if (d) {
            const { x, y, width: w, height: h } = d.rect;
            this[S.W].setTip(d.text, x + W.x, y + W.y);
            W.setCursorRect(x, y, w, h);
        } else if (W) {
            this[S.W].setTip(); // clear
            W.setCursorRect();
        }
        delete $gameTemp[P];
    };

    // Patch - create hover tip window on appropriate scenes.
    if (!MSG_ONLY)
        for (const C of Array.from(["Title", "MenuBase"], s => globalThis["Scene_" + s]))
            void (alias => {
                C.prototype.create = function() {
                    alias.apply(this, arguments);
                    const S = CAE.Tweaks.Q53.SYM;
                    this.addWindow(this[S.W] = new globalThis[S.C]());
                }
            })(C.prototype.create);
    void (alias => {
        Scene_Message.prototype.createAllWindows = function() {
            alias.apply(this, arguments);
            const S = CAE.Tweaks.Q53.SYM;
            this.addWindow(this[S.W] = new globalThis[S.C]());
        };
    })(Scene_Message.prototype.createAllWindows);

    // Patch - update scene's hover tip when appropriate.
    void (alias => {
        Bs.prototype.update = function() {
            alias.apply(this, arguments);
            this[CAE.Tweaks.Q53.SYM.M_PROCTIP]();
        };
    })(Bs.prototype.update);

    // Patch - process new text code.
    void (alias => {
        Bw.prototype.processEscapeCharacter = function(code, textState) {
            if (code === TEXT_CODE)
                this[CAE.Tweaks.Q53.SYM.M_PROC_TC](textState);
            else
                alias.apply(this, arguments);
        };
    })(Bw.prototype.processEscapeCharacter);

    // Patch - check for end of hover tip text for adding rect.
    void (alias => {
        Bw.prototype.processCharacter = function(textState) {
            alias.apply(this, arguments);
            this[CAE.Tweaks.Q53.SYM.M_CHECKIX](textState);
        };
    })(Bw.prototype.processCharacter);

    // Patch - touch hover checks.
    void (alias => {
        Bw.prototype.update = function() {
            alias.apply(this, arguments);
            const S = CAE.Tweaks.Q53.SYM;
            this[S.M_UPDATE_TOUCH]();
            this[S.M_UPDATE_BUTTON]();
        };
    })(Bw.prototype.update);

    // Patch - reset hover tip stuff when appropriate.
    // Late, to allow custom-window plugins to register in the `HOOKS` map.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            alias.apply(this, arguments);
            const D = CAE.Tweaks.Q53;
            const S = D.SYM;
            for (const [c, m] of D.HOOKS.entries())
                void (alias => {
                    globalThis[c].prototype[m] = function() {
                        delete this[S.P];
                        this[S.M_SHOWTIP](-1);
                        alias.apply(this, arguments);
                    };
                })(globalThis[c].prototype[m]);
        };
    })(Scene_Boot.prototype.start);

})();

// Q54) ON/OFF display customisation & background gauges for volume options.
void (() => { if (!CAE.Tweaks.Q54) return;
"use strict";

    /** Gauge height (px). @type {number} */
    const HEIGHT = CAE.Tweaks.Q54.HEIGHT;

    /** Replacement text for option "ON" value, falsy to skip patch. @type {string} */
    const TXT_ON = CAE.Tweaks.Q54.TXT_ON;

    /** Replacement text for option "OFF" value, falsy to skip patch. @type {string} */
    const TXT_OFF = CAE.Tweaks.Q54.TXT_OFF;

    /** `true` iff ON/OFF text method should be patched. @type {boolean} */
    const CHANGE_ONOFF = !!(TXT_ON || TXT_OFF);

    /** `true` iff background gauges should be added for volume options. @type {boolean} */
    const ADD_GAUGES = !!HEIGHT;

    void (() => { if (!ADD_GAUGES) return;

        /** Gauge opacity (0~255). @type {number} */
        const OPACITY = CAE.Tweaks.Q54.OPACITY; // 64

        /** Gauge colour 1 (CSS). @type {string|number} */
        const COLOUR1 = CAE.Tweaks.Q54.C1; // "#444444";

        /** Gauge colour 2 (CSS). @type {string|number} */
        const COLOUR2 = CAE.Tweaks.Q54.C2; // "#EEEEEE";

        /** Animation frames when value is changed. @type {number} */
        const SMOOTHNESS = CAE.Tweaks.Q54.TIME;  // 5|20

        // Define new identifiers.
        CAE.Tweaks.Q54.SYM = Object.freeze({
            /** Global identifier for new "volume gauge sprite" constructor. */
            G: Symbol(),
            /** Identifier for new "add inner child to back" method otherwise conspicuously missing from `Window`. */
            M_AICTB: Symbol(),
            /** Identifier for new "get background gauge command symbols" method on `Window_Options`. */
            M_COMS: Symbol(),
            /** Identifier for new "make background gauge" method on `Window_Options`. */
            M_MKGAUGE: Symbol(),
            /** Identifier for new "gauge position" method on `Window_Options`. */
            M_GAUGEPOS: Symbol(),
            /** Identifier for "existing gauge map" property on `Window_Options`. */
            P_DICT: Symbol()
        });

        // Define new "volume gauge sprite" subclass.
        const G = globalThis[CAE.Tweaks.Q54.SYM.G] = function() { this.initialize(...arguments); };
        G.prototype = Object.create(Sprite_Gauge.prototype);

        Object.defineProperties(G, {
            /** Gauge height (px). @static @readonly @type {number} */
            HEIGHT:     { value: HEIGHT, configurable: false },
            /** Gauge opacity (0~255). @static @readonly @type {number} */
            OPACITY:    { value: OPACITY, configurable: false },
            /** Animation frames on changing value. @static @readonly @type {number} */
            SMOOTHNESS: { value: SMOOTHNESS, configurable: false },
            /** Gauge colour 1 (CSS). @static @readonly @type {number|string} */
            C1:         { value: COLOUR1, configurable: false },
            /** Gauge colour 2 (CSS). @static @readonly @type {number|string} */
            C2:         { value: COLOUR2, configurable: false }
        });

        Object.defineProperties(G.prototype, {
            symbol: { get: function() { return this._symbol; }, configurable: true }
        });

        Object.assign(G.prototype, {
            constructor: G,

            /**
             * @constructor
             * @param {{w:number,h:number}} size Gauge bitmap width/height (px).
             */
            initialize: function(size) {
                this._size = size;
                Sprite_Gauge.prototype.initialize.call(this);
                this.opacity = this.constructor.OPACITY;
            },

            /** Initialises own properties. */
            initMembers: function() {
                this._symbol = null;
                Sprite_Gauge.prototype.initMembers.apply(this, arguments);
                delete this._battler;
                this._statusType = "audioVolume";
            },

            /** Ensures gauge is always considered valid for rendering. */
            isValid: function() {
                return true;
            },

            /**
             * Resizes gauge to given dimensions.
             * @param {number} width New width.
             * @param {number} height New height.
             */
            // resize: function(width = 0, height = 0) {
            //     const wok = Number.isFinite(width)  && width  !== this.width;
            //     const hok = Number.isFinite(height) && height !== this.height;
            //     if (wok || hok) {
            //         if (wok)
            //             this._size.w = width;
            //         if (hok)
            //             this._size.h = height;
            //         this.bitmap.resize(
            //             this.bitmapWidth(),
            //             this.bitmapHeight()
            //         );
            //     }
            // },

            /** @returns {number} Bitmap width. */
            bitmapWidth: function() {
                return this._size.w || 0;
            },

            /** @returns {number} Bitmap height. */
            bitmapHeight: function() {
                return this._size.h || 0;
            },

            /** @returns {number} Gauge text area height. */
            textHeight: function() {
                return this.bitmapHeight();
            },

            /** @returns {number} Gauge fill area height. */
            gaugeHeight: function() {
                return this.bitmapHeight();
            },

            /** @returns {number} Gauge fill area X offset. */
            gaugeX: function() {
                return 0;
            },

            /**
             * Personalises this gauge.
             * @param {string} symbol `ConfigManager` symbol this gauge should represent.
             */
            setup: function(symbol) {
                this._symbol   = symbol;
                this._value    = this.currentValue();
                this._maxValue = this.currentMaxValue();
                this.updateBitmap();
            },

            /** @returns {number} Current value for gauge. */
            currentValue: function() {
                return ConfigManager[this._symbol] ?? 0;
            },

            /** @returns {number} Current max value for gauge. */
            currentMaxValue: function() {
                return 100;
            },

            /** @returns {number} Animation frames after a change of value. */
            smoothness: function() {
                return this.constructor.SMOOTHNESS;
            },

            /** @returns {string} CSS colour used for gauge gradient fill (low end). */
            gaugeColor1: function() {
                const c = this.constructor.C1;
                return Number.isFinite(c) ? ColorManager.textColor(c) : c;
            },

            /** @returns {string} CSS colour used for gauge gradient fill (high end). */
            gaugeColor2: function() {
                const c = this.constructor.C2;
                return Number.isFinite(c) ? ColorManager.textColor(c) : c;
            },

            // Disable label/value text.
            drawLabel: function() { /* nothing */ },
            drawValue: function() { /* nothing */ }

        });

        /**
         * @param {PIXI.DisplayObject} child Display object to add.
         * @returns {child} Added child object.
         */
        Window.prototype[CAE.Tweaks.Q54.SYM.M_AICTB] = function addInnerChildToBack(child) {
            this._innerChildren.push(child);
            return this._contentsBackSprite.addChild(child);
        };

        /** @yields {string} Next valid command symbol from current list. */
        Window_Options.prototype[CAE.Tweaks.Q54.SYM.M_COMS] = function* volumeCommandSymbols() {
            for (const c of this._list) {
                const s = c.symbol;
                if (this.isVolumeSymbol(s))
                    yield s;
            }
        };

        /**
         * @param {string} symbol Command symbol.
         * @returns {Rectangle} Corresponding bounds at which to place gauge.
         */
        Window_Options.prototype[CAE.Tweaks.Q54.SYM.M_GAUGEPOS] = function gaugePosition(symbol) {
            const i = this.findSymbol(symbol);
            const r = this.itemLineRect(i);
            const h = globalThis[CAE.Tweaks.Q54.SYM.G].HEIGHT;
            const w = this.statusWidth();
            const y = r.y + (r.height - h >> 1);
            const x = r.x + r.width - w;
            return { x, y, w, h };
        };

        /**
         * Places a background gauge for given symbol.\
         * Creates a new gauge sprite first if necessary.
         * @param {string} symbol Command symbol.
         * @returns {Sprite_Gauge} Corresponding sprite.
         */
        Window_Options.prototype[CAE.Tweaks.Q54.SYM.M_MKGAUGE] = function makeBackgroundGauge(symbol) {
            const S = CAE.Tweaks.Q54.SYM;
            const d = this[S.P_DICT] ??= new Map();
            const { x, y, w, h } = this[S.M_GAUGEPOS](symbol);
            if (!d.has(symbol)) {
                const g = new globalThis[S.G]({ w, h });
                d.set(symbol, g);
                g.move(x, y);
                g.setup(symbol);
                this[CAE.Tweaks.Q54.SYM.M_AICTB](g)
            }
            return d.get(symbol);
        };

        // Patch - create gauges after populating command list.
        void (alias => {
            Window_Options.prototype.makeCommandList = function() {
                alias.apply(this, arguments);
                const S = CAE.Tweaks.Q54.SYM;
                for (const s of this[S.M_COMS]())
                    this[S.M_MKGAUGE](s);
                const d = this[S.P_DICT];
                if (d)
                    for (const g of d.values())
                        g.visible = this._list.some(
                            c => c.symbol === g.symbol
                        );
            };
        })(Window_Options.prototype.makeCommandList);

    })();

    // Patch - replace ON/OFF text if appropriate.
    void (() => { if (!CHANGE_ONOFF) return;
        const alias = Window_Options.prototype.booleanStatusText;
        Window_Options.prototype.booleanStatusText = function(value) {
            if (TXT_ON && value)
                return TXT_ON;
            if (TXT_OFF && !value)
                return TXT_OFF;
            return alias.apply(this, arguments);
        };
    })();

})();

// Q55) State overlay for enemies and/or map characters.
void (() => { if (!CAE.Tweaks.Q55) return;
"use strict";

    /** If `true`, enable state overlay display on enemies in battle. @type {boolean} */
    const NME_STATE_OVERLAY = CAE.Tweaks.Q55.NME;

    /** If `true`, enable state overlay display on qualifying map characters. @type {boolean} */
    const MAP_STATE_OVERLAY = CAE.Tweaks.Q55.MAP;

    /** New identifier for state overlay sprite. @type {string|symbol} */
    const P = "_stateOverlaySprite";

    void (() => { if (!NME_STATE_OVERLAY) return;

        /** Additional offsets to parent anchor for enemy state overlay sprite. @type {number} */
        const A = CAE.Tweaks.Q55.NME_ANCHOR;  // Object.freeze({ x: 0.1, y: -0.7 });

        // Patch - create new overlay sprite along with icon.
        void (alias => {
            Sprite_Enemy.prototype.createStateIconSprite = function() {
                const s = this[P] = new Sprite_StateOverlay();
                this.addChild(s);   // under icon because less informative
                alias.apply(this, arguments);
            };
        })(Sprite_Enemy.prototype.createStateIconSprite);

        // Patch - setup new overlay sprite when a battler is assigned.
        void (alias => {
            Sprite_Enemy.prototype.setBattler = function(battler) {
                alias.apply(this, arguments);
                this[P].setup(battler);
            };
        })(Sprite_Enemy.prototype.setBattler);

        // Patch - update state overlay position when bitmap changes.
        void (alias => { if (!A.x && !A.y) return;
            Sprite_Enemy.prototype.updateBitmap = function() {
                const b0 = this.bitmap;
                alias.apply(this, arguments);
                const b1 = this.bitmap;
                if (b0 !== b1)
                    b1.addLoadListener(bmp => {
                        this[P].x = A.x * bmp.width  | 0;
                        this[P].y = A.y * bmp.height | 0;
                    });
            };
        })(Sprite_Enemy.prototype.updateBitmap);

    })();

    void (() => { if (!MAP_STATE_OVERLAY) return;

        /**
         * Maps valid characters to a function returning their respective battler.
         * @type {Map<Function,(c:Game_Character)=>Game_Battler>}
         */
        const M = new Map([
            [Game_Player,   function(c) { return $gameParty.leader(); }],
            [Game_Follower, function(c) { return c.actor(); }]
        ]);

        // Patch - add/remove state overlay sprite when character is assigned.
        void (alias => {
            Sprite_Character.prototype.setCharacter = function(char) {
                alias.apply(this, arguments);
                const battler   = M.get(char.constructor)?.(char);
                const hasSprite = P in this;
                if (battler) {
                    if (!hasSprite)
                        this.addChild(this[P] = new Sprite_StateOverlay());
                    this[P].setup(battler);
                } else if (hasSprite) {
                    this.removeChild(this[P]);
                    delete this[P];
                }
            };
        })(Sprite_Character.prototype.setCharacter);

    })();

})();

//#endregion Display & User QoL

//#region Backend

// D01) Troop 1 events apply to all troops.
void (() => { if (!CAE.Tweaks.D01) return;
    const alias = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        alias.apply(this, arguments);
        // lazy solution: just copy them over
        const T = $dataTroops;
        for (let n = T.length; --n > 1;)
            T[n].pages = T[1].pages.concat(T[n].pages);
    };
})();

// D02) Basic sharp line raster and line-of-sight functions.
void (() => { if (!CAE.Tweaks.D02) return;
'use strict';

    /** Debug text for `raster.test` console output during playtest. @type {string} */
    const DEBUG_STRING = CAE.Tweaks.D02.DEBUG_TXT;  // "\u2b1c\u2b1b\u2b26"; // "-ox";

    /** If true, disable `raster.test` console output during playtest. @type {boolean} */
    const SKIP_DEBUG = DEBUG_STRING.length < 3;

    /** New global namespace for raster functions. */
    CAE.Tweaks.D02.raster = {

        /**
         * Raster point for generated line.
         * @typedef {object} LinePoint
         * @property {number} x X coordinate of this point
         * @property {number} y Y coordinate of this point
         * @property {number} d direction of entry (numpad)
         */
        /**
         * Generates raster coordinates for a straight line
         * connecting the input points.
         * @generator
         * @param {number} x0 Integer X coordinate of point 0
         * @param {number} y0 Integer Y coordinate of point 0
         * @param {number} x1 Integer X coordinate of point 1
         * @param {number} y1 Integer Y coordinate of point 1
         * @returns {Generator<LinePoint,void,void>} Next raster point on the line connecting points 0 and 1.
         */
        g: function*(x0, y0, x1, y1) {
            //  input coord has greater range, gets +1 per step;
            // output coord has lesser range, conditional steps.
            //
            // output steps when cumulative remainder hits 1/2:
            // =>  dy / dx >= 1/2   (for output y)
            // => 2dy - dx >= 0
            //
            // or  dx / dy >= 1/2   (for output x)
            // => 2dx - dy >= 0
            if (
                Number.isFinite(x0) && Number.isFinite(x1) && !((x1 - x0) % 1) &&
                Number.isFinite(y0) && Number.isFinite(y1) && !((y1 - y0) % 1)
            ) {
                let x = x0, y = y0, d = 5;
                yield { x, y, d };
                const dx = Math.abs(x1 - x0);
                const dy = Math.abs(y1 - y0);
                const sx = x0 > x1 ? -1 : 1;
                const sy = y0 > y1 ? -1 : 1;
                if (dx > dy) {
                    const D = 5 - sx;
                    let e = 2 * dy - dx;
                    while (x !== x1) {
                        d = D;
                        if (e >= 0) {
                            y += sy;
                            e -= dx;
                            d += 3 * sy;
                        }
                        x += sx
                        e += dy;
                        yield { x, y, d };
                    }
                } else {
                    const D = 5 + 3 * sy;
                    let e = 2 * dx - dy;
                    while (y !== y1) {
                        d = D;
                        if (e >= 0) {
                            x += sx;
                            e -= dy;
                            d -= sx;
                        }
                        y += sy;
                        e += dx;
                        yield { x, y, d };
                    }
                }
            }
        },

        /**
         * Callback function of the form `({x,y,d}) => true|false`.
         * @callback haltCondition
         * @param {LinePoint} pt point being checked.
         * @returns {boolean} `true` iff input point blocks the line.
         */
        /**
         * Returns array of rastered line points.
         * Optionally accepts a halt condition callback.
         * @param {number} x0 Integer X coordinate of point 0
         * @param {number} y0 Integer Y coordinate of point 0
         * @param {number} x1 Integer X coordinate of point 1
         * @param {number} y1 Integer Y coordinate of point 1
         * @param {haltCondition} [haltCondition]
         * Optional callback function `({x,y,d}) => true|false`.
         *
         * If this returns `true` then the current point is
         * discarded and the line ends.
         * @returns {{res:LinePoint[],complete:boolean}}
         * - `res`: array of points generated by `raster.g`.
         * - `complete`: `true` iff all points were generated.
         */
        lineTo: function(x0, y0, x1, y1, haltCondition) {
            if (typeof haltCondition !== 'function')
                return {
                    res: [...this.g(x0, y0, x1, y1)],
                    complete: true
                };
            const res = [];
            let halted = false;
            for (const pt of this.g(x0, y0, x1, y1)) {
                if (haltCondition(pt)) {
                    halted = true;
                    break;
                }
                res.push(pt);
            }
            return { res, complete: !halted };
        },

        /**
         * Outputs visual representation of raster data to console.
         * Avoid using very large grid sizes.
         * @param {{x:number,y:number}[]} pts array of points
         * @returns {boolean} `true` iff output was sent.
         */
        test: function(pts) {
            if (
                SKIP_DEBUG ||
                !$gameTemp.isPlaytest() ||
                !Array.isArray(pts) ||
                !pts.length
            )
                return false;
            // get display bounds
            let xMin = pts[0].x,
                yMin = pts[0].y,
                xMax = xMin,
                yMax = yMin;
            for (let n = pts.length; --n;) {
                const p = pts[n];
                if (p.x < xMin)
                    xMin = p.x;
                else if (p.x > xMax)
                    xMax = p.x;
                if (p.y < yMin)
                    yMin = p.y;
                else if (p.y > yMax)
                    yMax = p.y;
            }
            // grid size
            const w = xMax - xMin + 1;
            const h = yMax - yMin + 1;
            // generate display data
            const a = Array.from({ length: h },
                () => Array.from({ length: w }, () => DEBUG_STRING[0])     // blank
            );
            a[pts[0].y - yMin][pts[0].x - xMin]     = DEBUG_STRING[2];     // start
            for (let n = pts.length; --n;)
                a[pts[n].y - yMin][pts[n].x - xMin] = DEBUG_STRING[1];     // sight
            // format & display
            const s = a.reduce((a, c) => a += c.join('') + '\n', '');
            SceneManager.showDevTools();
            console.log(
                `Debug - raster.test - (${xMin},${yMin})~(${xMax},${yMax}):\n\n${s}`
            );
            return true;
        }

    };

    /**
     * Intermediate function for determining additional conditions for blocking LoS.
     * @this {Game_CharacterBase} Sighting character.
     * @param {Game_CharacterBase} target
     * Character being sighted.
     * @param {number} x
     * X map tile coordinate.
     * @param {number} y
     * Y map tile coordinate.
     * @param {number} [d=0]
     * Numpad direction of entry.
     * @returns {boolean}
     * `true` iff LoS is blocked.
     * @type {Function}
     */
    const BLOCK_FCT = CAE.Tweaks.D02.BLOCK_FCT;

    /** Regions considered opaque for line-of-sight checks. @type {number[]} */
    const OPAQUE_REGIONS = CAE.Tweaks.D02.OPAQUE_R;

    /** FoV value used when one is not otherwise specified. @type {number} */
    const DFAULT_FOV = CAE.Tweaks.D02.DFAULT_FOV;

    /** If `true`, enable line-of-sight trigger and its notetag. @type {boolean} */
    const ENABLE_EVENT_TAG = CAE.Tweaks.D02.ENABLE_TAG;

    /** Equally-spaced numpad directions: full cycle in order of increasing angle, from 0°. */
    const DIRECTIONS = Object.freeze([6, 3, 2, 1, 4, 7, 8, 9]);

    /**
     * @param {number} d facing direction (numpad)
     * @returns {number} corresponding angle, in radians.
     */
    const dirToAngle = function(d) {
        const i = DIRECTIONS.indexOf(d);
        if (i >= 0)
            return i * 2 * Math.PI / DIRECTIONS.length;
        return 0;
    };

    /**
     * @param {number} angle angle to check
     * @param {number} a lower angular bound, in radians
     * @param {number} b upper angular bound, in radians
     * @returns {boolean} `true` iff `angle` is between `a` and `b` (inclusive).
     */
    const isAngleBetween = function(angle, a, b) {
        // eh let's do this the easy way
        const P = 2 * Math.PI;
        while (angle < a)   // rotate up into this rev
            angle += P;
        while (angle > b)   // rotate down
            angle -= P;
        return a <= angle && angle <= b; // `<=` is also an implicit type-check
    };

    /**
     * @param {number} x0 X coordinate of entity 0 (observer)
     * @param {number} y0 Y coordinate of entity 0 (observer)
     * @param {number} x1 X coordinate of entity 1 (target)
     * @param {number} y1 Y coordinate of entity 1 (target)
     * @param {number} r Maximum view distance (px)
     * @returns {boolean} `true` iff target is close enough to be observed.
     */
    const inRange = function(x0, y0, x1, y1, r = 0) {
        if (r <= 0)
            return true;    // I can see forever
        const dx = $gameMap.deltaX(x0, x1) * $gameMap.tileWidth();
        const dy = $gameMap.deltaY(y0, y1) * $gameMap.tileHeight();
        return dx ** 2 + dy ** 2 <= r ** 2;  // avoid sqrt
        // return Math.hypot(
        //     $gameMap.deltaX(x0, x1) * $gameMap.tileWidth(),
        //     $gameMap.deltaY(y0, y1) * $gameMap.tileHeight()
        // ) < r;
    };

    /**
     * @param {number} x0 X coordinate of entity 0 (observer)
     * @param {number} y0 Y coordinate of entity 0 (observer)
     * @param {number} x1 X coordinate of entity 1 (target)
     * @param {number} y1 Y coordinate of entity 1 (target)
     * @param {number} direction observer facing (numpad)
     * @param {number} [range] optional; observer field of view
     * @returns {boolean} `true` iff target is in observer's field of view.
     */
    const inFoV = function(x0, y0, x1, y1, direction, range = DFAULT_FOV) {
        if (range >= 360)
            return true;    // Pan-o-ramen
        // Permit non-positive FoVs.
        const a = Math.atan2(y1 - y0, x1 - x0);
        const d = dirToAngle(direction);
        const f = range * Math.PI / 360;
        return isAngleBetween(a, d - f, d + f);
    };

    /**
     * @this {Game_CharacterBase} sighting character
     * @param {Game_CharacterBase} target sight target
     * @param {LinePoint} o point on the line of sight
     * @returns {boolean} `true` iff line of sight is obstructed.
     */
    const isLosBlocked = function(target, o) {
        const { x = 0, y = 0, d = 0 } = o;
        if (target.pos(x, y))
            return false;   // goal!
        // Opaque regions block LoS.
        if (OPAQUE_REGIONS.contains($gameMap.regionId(x, y)))
            return true;
        // These checks have been moved to new `BLOCK_FCT` plugin parameter.
        // const tileIds = Array.from({ length: 4 }, (_, z) => $gameMap.tileId(x, y, z));
        // if (tileIds.some(id => Tilemap.isShadowingTile(id)))
        //     return true;
        // if (this.isCollidedWithCharacters(x, y))
        //     return true;
        if (BLOCK_FCT.call(this, target, x, y, d))
            return true;
        return false;
    };

    /**
     * Checks line-of-sight from one character to another.
     * @param {Game_CharacterBase} char target character
     * @param {number} [fov] optional; field of view (degrees)
     * @param {number} [range] optional; max view distance (px)
     * @returns {boolean} `true` iff `this` has line-of-sight to `char`.
     */
    Game_CharacterBase.prototype.los = function(char, fov, range) {
        if (!(char instanceof Game_CharacterBase))
            return false;
        // Round coords as preemptive measure vs pixel movement compatibility issues.
        const x0 = Math.round(this.x),
              y0 = Math.round(this.y),
              x1 = Math.round(char.x),
              y1 = Math.round(char.y),
               d = this.direction();
        if (inRange(x0, y0, x1, y1, range) && inFoV(x0, y0, x1, y1, d, fov)) {
            const r = CAE.Tweaks.D02.raster.lineTo(
                x0, y0, x1, y1, isLosBlocked.bind(this, char)
            );
            CAE.Tweaks.D02.raster.test(r.res); // playtest - output to console
            return r.complete;
        }
        return false;
    };

    // Line-of-sight trigger for events: <los: ...results, range, fov>, <los: result, range>, or <los: result>.
    // Results: 0 | 1+ | "A"~"D" (trigger event | switch | self-switch)
    void (() => { if (!ENABLE_EVENT_TAG) return;

        /** Tag name for this subfeature. @type {string} */
        const TAG_NAME = CAE.Tweaks.D02.tag_los || "los";

        /** Identifier for new "line-of-sight trigger info" cache property on `Game_Event`. */
        const P_LOS = "_losInfo";   // non-symbol due to refresh peculiarities for same-map load.

        /** Non-conflicting identifier for new "check line-of-sight trigger" method on `Game_Event`. */
        const SYM_M_CHECKLOS = Symbol();

        /**
         * @typedef {object} LosTriggerInfo
         * @property {number} f
         * Field of view (degrees). `0` => default from plugin param (`135`).
         * @property {number} r
         * Maximum sight range (px). `0` => default (`Infinity`).
         * @property {(string|number)[]} a
         * Trigger results:
         * - number:
         *   - `0` => trigger this event;
         *   - `1+` => turn on that switch ID.
         * - string:
         *   - `"A"`, `"B"`, `"C"`, or `"D"` => turn on that self-switch.
         */
        /**
         * @param {string|boolean} [tag]
         * Raw event tag.
         * @returns {?LosTriggerInfo}
         * Parsed event tag, or `null` if invalid.
         */
        const parseTag = function(tag) {
            if (tag && typeof tag === "string") {
                // <los: ...a, r, f>, <los: a, r>, <los: a>
                const t = tag.split(",");
                const f = t.length > 2 ? parseInt(t.pop(), 10) || 0 : 0;
                const r = t.length > 1 ? parseInt(t.pop(), 10) || 0 : 0;
                const a = t.map(s => isNaN(s) ? s.trim() : parseInt(s, 10));
                return { f, r, a };
            }
            return null;
        };

        /**
         * @param {Game_Event} ev
         * Reference event.
         * @returns {?LosTriggerInfo}
         * First valid tag data, or `null` if no valid tag found.
         */
        const getTagValue = function(ev) {
            for (const tag of CAE.Tweaks.Utils.getEventTags(ev, TAG_NAME, true)) {
                const v = parseTag(tag);
                if (v)
                    return v;
            }
            return null;
        };

        /**
         * Updates an event's line-of-sight trigger info.
         * @param {Game_Event} ev
         * Reference event.
         */
        const updateLosInfo = function(ev) {
            const v = getTagValue(ev);
            if (v)
                ev[P_LOS] = v;
            else
                delete ev[P_LOS];
        };

        /**
         * @param {Game_Event} ev
         * Reference event.
         * @returns {boolean}
         * `true` iff this event has a valid line-of-sight trigger enabled.
         */
        const canLosTrigger = function(ev) {
            return ev[P_LOS] && !ev.isStarting() && !ev._locked;
        };

        /**
         * @returns {boolean}
         * `true` iff line-of-sight trigger was activated.
         */
        Game_Event.prototype[SYM_M_CHECKLOS] = function() {
            if (canLosTrigger(this)) {
                /** @type {LosTriggerInfo} */
                const { f, r, a } = this[P_LOS];
                if (this.los($gamePlayer, f || void 0, r || void 0)) {
                    for (const v of a)
                        if (typeof v === "number") {
                            if (v)
                                $gameSwitches.setValue(v, true);
                            else
                                this.start();
                        } else
                            $gameSelfSwitches.setValue(
                                [this._mapId, this.eventId(), v]
                            , true);
                    return true;
                }
            }
            return false;
        };

        // Patch - update line-of-sight info on refresh.
        void (alias => {
            Game_Event.prototype.setupPage = function() {
                alias.apply(this, arguments);
                updateLosInfo(this);
            };
        })(Game_Event.prototype.setupPage);

        // Patch - check line-of-sight every frame when appropriate.
        void (alias => {
            Game_Event.prototype.update = function() {
                alias.apply(this, arguments);
                this[SYM_M_CHECKLOS]();
            };
        })(Game_Event.prototype.update);

    })();

})();

// D03) Failsafe for ConfigManager.save error when lacking privileges (e.g. no cookies).
void (() => { if (!CAE.Tweaks.D03) return;
'use strict';

    const ERR_MSG = CAE.Tweaks.D03.ERR_MSG;
    // "Failed to save options!\n\n" +
    // "To do so, the game requires permission to access local storage.\n" +
    // "You can try enabling cookies!";

    const alias = ConfigManager.save;
    ConfigManager.save = function() {
        try {
            alias.apply(this, arguments);
        } catch (ex) {
            // Save failed.
            SoundManager.playBuzzer();  // implicit feedback
            if (ERR_MSG)
                alert(ERR_MSG);         // explicit feedback
            // [ ] D03 - consider making custom in-game window for "config save fail" msg - awkward because of scene flow control. Non-interactive, e.g. timed popup, could work?
        }
    };

})();

// D04) Item 1 effects apply to all Items and Skills.
void (() => { if (!CAE.Tweaks.D04) return;
    const alias = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        alias.apply(this, arguments);
        // lazy solution: just copy them over
        const I = $dataItems;
        const S = $dataSkills;
        for (let n = I.length; --n > 1;)
            I[n].effects = I[1].effects.concat(I[n].effects);
        for (let n = S.length; --n > 0;)
            S[n].effects = I[1].effects.concat(S[n].effects);
    };
})();

// D05) Assign _targetIndex to applicable enemy actions (e.g. for consistency in feature M17).
void (() => { if (!CAE.Tweaks.D05) return;
    // Patch on boot, not right now (cf D10).
    CAE.Tweaks.Utils.patchOnBoot(
        "Game_Action.prototype.setEnemyAction",
        alias => function(actionData) {
            alias.apply(this, arguments);
            if (this.needsSelection()) {
                const ref = this.makeTargets();
                if (ref.length)
                    this.setTarget(ref[0].index());
            }
        }
    );
})();

// D06) Track total HP/MP/TP change per apply instead of most recent.
void (() => { if (!CAE.Tweaks.D06) return;
'use strict';

    // Test case - any action with multiple HP/MP/TP gains per apply.
    // E.g. formula + effect, or multiple effects.

    /** Local shorthand for `Game_Battler.prototype`. */
    const P = Game_Battler.prototype;

    // Fix methods `gainHp`, `gainMp`, and `gainTp`.
    for (const s of ["h", "m", "t"]) {
        const m = `gain${s.toUpperCase()}p`;
        const k = `${s}pDamage`;
        void (alias => {
            P[m] = function(value) {
                const mem = this._result[k];
                alias.apply(this, arguments);
                this._result[k] += mem;
            };
        })(P[m]);
    }

})();

// D07) Changing the pitch of a playing audio buffer no longer causes it to restart.
void (() => { if (!CAE.Tweaks.D07) return;

    /** If `true`, scale audio pitch with game ticker speed. @type {boolean} */
    const SCALE_PITCH = CAE.Tweaks.D07.TICK_SYNC;

    /** Existing audio pitch getter. */
    const g = Object.getOwnPropertyDescriptor(WebAudio.prototype, "pitch").get;

    /** New audio pitch getter. */
    const f = SCALE_PITCH ? function() {
        return g.apply(this, arguments) * Graphics._app.ticker.speed;
    } : g;

    // Override - set pitch now refreshes rate/timers, rather than replaying.
    Object.defineProperty(WebAudio.prototype, "pitch", {
        get: f,
        // function() {
        //     // Scale pitch with game tick rate.
        //     return this._pitch * Graphics._app.ticker.speed;
        // },
        set: function(value) {
            if (this._pitch !== value) {
                this._pitch = value;
                if (this.isPlaying()) {
                    // Manually update playback rate for this buffer's source nodes
                    for (const s of this._sourceNodes)
                        s.playbackRate.setValueAtTime(
                            this.pitch,
                            WebAudio._currentTime()
                        );
                    // Recreate end timer.
                    this._startTime = WebAudio._currentTime() - this.seek() / this.pitch;
                    this._removeEndTimer();
                    this._createEndTimer();
                }
            }
        },
        configurable: true
    });

    // Patch - actually reference the pitch getter on source node creation. >_>
    void (() => { if (!SCALE_PITCH) return;
        const alias = WebAudio.prototype._createSourceNode;
        WebAudio.prototype._createSourceNode = function(index) {
            alias.apply(this, arguments);
            this._sourceNodes[index].playbackRate.setValueAtTime(
                this.pitch,
                WebAudio._currentTime()
            );
        };
    })(WebAudio.prototype._createSourceNode);

})();

// D08) "Last Subject Actor" resets "Last Subject Enemy", etc.
void (() => { if (!CAE.Tweaks.D08) return;
'use strict';

    /** Local shorthand for `Game_Temp.prototype`. */
    const P = Game_Temp.prototype;

    /** Original method storage, for applying patches. */
    const alias = Object.freeze({
        /** `setLastUsedSkillId` */
        skill:  P.setLastUsedSkillId,
        /** `setLastUsedItemId` */
        item:   P.setLastUsedItemId,
        /** `setLastSubjectActorId` */
        aActor: P.setLastSubjectActorId,
        /** `setLastSubjectEnemyIndex` */
        aEnemy: P.setLastSubjectEnemyIndex,
        /** `setLastTargetActorId` */
        bActor: P.setLastTargetActorId,
        /** `setLastTargetEnemyIndex` */
        bEnemy: P.setLastTargetEnemyIndex
    });

    /** Reset value. Note: `0` is a valid index, but last action data stores `index + 1`. */
    const RESET = 0;

    // Patch - forget last used item ID.
    P.setLastUsedSkillId = function(skillID) {
        alias.skill.apply(this, arguments);
        alias.item.call(this, RESET);
    };

    // Patch - forget last used skill ID.
    P.setLastUsedItemId = function(itemID) {
        alias.item.apply(this, arguments);
        alias.skill.call(this, RESET);
    };

    // Patch - forget last enemy subject.
    P.setLastSubjectActorId = function(actorID) {
        alias.aActor.apply(this, arguments);
        alias.aEnemy.call(this, RESET);
    };

    // Patch - forget last actor subject.
    P.setLastSubjectEnemyIndex = function(enemyIndex) {
        alias.aEnemy.apply(this, arguments);
        alias.aActor.call(this, RESET);
    };

    // Patch - forget last target enemy.
    P.setLastTargetActorId = function(actorID) {
        alias.bActor.apply(this, arguments);
        alias.bEnemy.call(this, RESET);
    };

    // Patch - forget last target actor.
    P.setLastTargetEnemyIndex = function(enemyIndex) {
        alias.bEnemy.apply(this, arguments);
        alias.bActor.call(this, RESET);
    };

    // Patch - init last action data to match new reset values, if appropriate.
    void (() => { if (!RESET) return;   // 0 is default
        const alias = Game_Temp.prototype.initialize;
        Game_Temp.prototype.initialize = function() {
            alias.apply(this, arguments);
            const a = this._lastActionData;
            for (let n = a.length; n--;)
                a[n] = RESET;   // in-place to reduce garbage
        };
    })();

})();

// D09) Face $NAME$X-Y-S => (X, Y) from img/enemies/subfolders/NAME, upscaled by factor S.
void (() => { if (!CAE.Tweaks.D09) return;
'use strict';
    // (This exists to save me sourcing separate face images for bit parts...)
    // Supports subfolders. Assumes no more than one face per enemy image.

    /** Non-conflicting identifier for storing face x, y, and scale data on non-face bitmaps. */
    const SYM = Symbol();

    /** Non-conflicting identifier for method that draws a face from a non-face image. */
    const M_DRAW_FACE = Symbol();

    /** @typedef {[subfolders:string,filename:string,x?:number,y?:number,scale?:number]} FaceRedirectInfo */

    /** Regular expression used for extracting {@linkcode FaceRedirectInfo}. @readonly */
    Object.defineProperty(CAE.Tweaks.D09, "RX", {
        value: /^(.*\/)?\$([^\$\/]+)\$(\d+)-(\d+)-?(\d+)?$/,
        configurable: false
    });

    /**
     * @param {string} path input subfolder redirection path
     * @returns {string} formatted path.
     */
    const formatSubpath = function(path) {
        return path || "";
    };

    /**
     * @param {string} filename reference faceset filename, without extension
     * @returns {?FaceRedirectInfo} data extracted from filename, or `null`.
     */
    const getRedirectInfo = function(filename) {
        // x, y, and scale are all integers; scale is optional (default 1).
        /**
         * - Test filename vs pattern `"subfolders/$name$x-y-scale"`.
         * - Captures: `[subfolders/, name, x, y, scale]`.
         */
        const match = CAE.Tweaks.D09.RX.exec(filename);
        if (!match)
            return null;
        const a = [formatSubpath(match[1]), match[2]];
        for (let n = 2; ++n <= 5;) {
            const v = parseInt(match[n], 10);
            if (isNaN(v))
                break;
            a.push(v);
        }
        return a;
    };

    /**
     * @param {FaceRedirectInfo} info details target file path and draw coordinates
     * @returns {Bitmap} appropriate Bitmap reference, with redirect info attached.
     */
    const loadRedirectedFace = function(info) {
        const b = ImageManager.loadEnemy(info[0] + info[1]);  // ./img/enemies/subfolders
        b[SYM] ??= info;
        return b;
    };

    /**
     * Draws face from redirected (i.e. non-face) image.
     * @param {Bitmap} bmp source bitmap
     * @param {number} x destination X draw coordinate
     * @param {number} y destination Y draw coordinate
     * @param {number} w destination width
     * @param {number} h destination height
     */
    Window_Base.prototype[M_DRAW_FACE] = function(bmp, x, y, w, h) {
        const fw = ImageManager.faceWidth;
        const fh = ImageManager.faceHeight;
        w ||= fw;
        h ||= fh;
        /** @type {FaceRedirectInfo} */
        const info = bmp[SYM];
        const sz = info[4] || 1;
        const sw = Math.floor(Math.min(w, fw) / sz);
        const sh = Math.floor(Math.min(h, fh) / sz);
        const sx = Math.floor((info[2] || 0) + (fw / sz - sw) / 2);
        const sy = Math.floor((info[3] || 0) + (fh / sz - sh) / 2);
        const dx = Math.floor((x + Math.max(w - fw, 0) / 2) / sz);
        const dy = Math.floor((y + Math.max(h - fh, 0) / 2) / sz);
        /** @type {CanvasRenderingContext2D} */
        const ctx = this.contents._context;
        ctx.save();
        ctx.scale(sz, sz);
        ctx.imageSmoothingEnabled = false;  // nearest-neighbour
        this.contents.blt(bmp, sx, sy, sw, sh, dx, dy);
        ctx.restore();
    };

    // Patch - redirect dummy files and attach info to their cache entry.
    void (alias => {
        ImageManager.loadFace = function(filename) {
            const r = getRedirectInfo(filename);
            if (r)
                return loadRedirectedFace(r);
            return alias.apply(this, arguments);
        };
    })(ImageManager.loadFace);

    // Patch - support drawing "faces" from redirected image type.
    void (alias => {
        Window_Base.prototype.drawFace = function(faceName, i, x, y, w, h) {
            const bmp = ImageManager.loadFace(faceName);
            if (SYM in bmp)
                this[M_DRAW_FACE](bmp, x, y, w, h);
            else
                alias.apply(this, arguments);
        };
    })(Window_Base.prototype.drawFace);

})();

// D10) When an enemy picks skill 1 or 2, it uses their Attack or Guard skill respectively.
void (() => { if (!CAE.Tweaks.D10) return;
    const alias = Game_Action.prototype.setEnemyAction;
    Game_Action.prototype.setEnemyAction = function(actionInfo) {
        switch (actionInfo?.skillId) {
            case 1:
                this.setAttack();
                break;
            case 2:
                this.setGuard();
                break;
            default:
                alias.apply(this, arguments);
                break;
        }
    };
})();

// D11) Ladder, bush, counter, and damage floors now check tile events as well.
void (() => { if (!CAE.Tweaks.D11) return;
    const alias = Game_Map.prototype.checkLayeredTilesFlags;
    Game_Map.prototype.checkLayeredTilesFlags = function(x, y, bit) {
        if (!this._tileEvents)  // Ignore tile events until fully initialised.
            return alias.apply(this, arguments);
        const flags = this.tilesetFlags();
        return this.allTiles(x, y).some(tileId => (flags[tileId] & bit) !== 0);
    };
})();

// D12) Plugin commands to set surprise/preemptive for next battle.
void (() => { if (!CAE.Tweaks.D12) return;
'use strict';

    /** If `true`, store flag on `$gameSystem` instead of `$gameTemp`. @type {boolean} @since v16 */
    const PERSIST = CAE.Tweaks.D12.PERSIST;

    /** Identifier for new "force surprise/preemptive" flag on `Game_Temp` or `Game_System`. */
    const SYM = "Cae_Tweaks_D12";  // string for persistence

    /** @enum {number} enumerates flag values. */
    const ENUM = Object.freeze({
        DFAULT:     0,
        PREEMPTIVE: 1,
        SURPRISE:   2
    });

    /** @returns {Game_System|Game_Temp} object on which flag is set. */
    const obj = PERSIST ? function() {
        return $gameSystem;
    } : function() {
        return $gameTemp;
    };

    /**
     * Sets flag to `value`.
     * @param {ENUM} [value] input value; omit to reset to default.
     */
    const setFlag = function(value = ENUM.DFAULT) {
        obj()[SYM] = value;
    };

    /** @returns {ENUM} stored value. */
    const getFlag = function() {
        return obj()[SYM] ?? ENUM.DFAULT;
    };

    /**
     * Updates preemptive/surprise flags for upcoming battle.
     * @returns {boolean} `true` iff a battle flag was set.
     */
    const updateFlags = function() {
        const f = getFlag();
        setFlag();
        switch (f) {
            case ENUM.PREEMPTIVE:
                BattleManager._surprise = false;    // for random encounters
                return BattleManager._preemptive = true;
            case ENUM.SURPRISE:
                BattleManager._preemptive = false;  // for random encounters
                return BattleManager._surprise = true;
        }
        return false;
    };

    /** Forces next battle to be preemptive (favours party). */
    CAE.Tweaks.D12.setPreemptive = function() {
        setFlag(ENUM.PREEMPTIVE);
    };

    /** Forces next battle to be surprise (favours troop). */
    CAE.Tweaks.D12.setSurprise = function() {
        setFlag(ENUM.SURPRISE);
    };

    // Register plugin commands.
    PluginManager.registerCommand(CAE.Tweaks.NAME, "D12_preemptive", CAE.Tweaks.D12.setPreemptive);
    PluginManager.registerCommand(CAE.Tweaks.NAME, "D12_surprise",   CAE.Tweaks.D12.setSurprise);

    // Update surprise/preemptive flags after battle setup. Notes:
    //  - no Script commands process between .setup() and .startBattle();
    //  - applies to all battles but ostensibly for Battle Processing command;
    //  - random encounters still check ratePreemptive/rateSurprise as usual.
    void (alias => {
        BattleManager.setup = function(troopId, canEscape, canLose) {
            alias.apply(this, arguments);
            updateFlags();
        };
    })(BattleManager.setup);

})();

// D13) !picture.png => pins to map, not to screen.
void (() => { if (!CAE.Tweaks.D13) return;
'use strict';

    // NB: Move/Show Picture commands still use screen coordinates!

    /** Regular expression used to match pinned picture names. */
    const RX = /^\$?!/;

    /** Pinned picture ID cache. @type {Set<number>} */
    const PIN = new Set();

    /** Property under which this feature's data is saved. @type {string} */
    const SAVE_PROP = CAE.Tweaks.NAME + "_D13";

    /**
     * @param {string} picName reference picture name
     * @returns {boolean} `true` iff this picture should be pinned.
     */
    const shouldPin = function(picName) {
        return RX.test(picName);
    };

    /**
     * Only effective when on the map.
     * @param {number} picId reference picture
     * @returns {boolean} `true` iff picture was cached as pinned.
     */
    const updatePin = function(picId) {
        if (SceneManager._scene instanceof Scene_Map) {
            const pic = $gameScreen._pictures[picId];
            if (pic && shouldPin(pic._name)) {
                PIN.add(picId);
                return true;
            }
            PIN.delete(picId);
        }
        return false;
    };

    /**
     * Scrolls locations of all pinned pictures by specified distances.
     * @param {number} [dx] X distance (px)
     * @param {number} [dy] Y distance (px)
     */
    const scrollPinnedPics = function(dx = 0, dy = 0) {
        for (const id of PIN) {
            const p = $gameScreen._pictures[id];    // support scroll mid-battle
            if (p) {
                p._x += dx;
                p._y += dy;
                p._targetX += dx;
                p._targetY += dy;
            } else
                updatePin(id);  // lazy uncache
        }
    };

    /** Erases all pinned pictures, e.g. on map change. */
    const erasePinnedPics = function() {
        for (const id of PIN)
            $gameScreen._pictures[id] = null;   // support erasing map pics mid-battle
        PIN.clear();
    };

    // Patch - update pinned picture cache when pic is shown.
    void (alias => {
        Game_Screen.prototype.showPicture = function(pictureId) {
            alias.apply(this, arguments);
            updatePin(pictureId);
        };
    })(Game_Screen.prototype.showPicture);
    // NB: does not account for _name changing through other sources, e.g. Script command.

    // Patch - erase pinned pictures on map change.
    void (alias => {
        Game_Map.prototype.setup = function(mapId) {
            const id = this._mapId;
            alias.apply(this, arguments);
            if (id !== this._mapId)
                erasePinnedPics();
        };
    })(Game_Map.prototype.setup);

    // Patch - respond to map scrolling.
    void (alias => {
        Game_Map.prototype.scrollUp = function() {
            const y = this._displayY;
            alias.apply(this, arguments);
            scrollPinnedPics(0, (y - this._displayY) * this.tileHeight());
        };
    })(Game_Map.prototype.scrollUp);
    void (alias => {
        Game_Map.prototype.scrollDown = function() {
            const y = this._displayY;
            alias.apply(this, arguments);
            scrollPinnedPics(0, (y - this._displayY) * this.tileHeight());
        };
    })(Game_Map.prototype.scrollDown);
    void (alias => {
        Game_Map.prototype.scrollLeft = function() {
            const x = this._displayX;
            alias.apply(this, arguments);
            scrollPinnedPics((x - this._displayX) * this.tileWidth(), 0);
        };
    })(Game_Map.prototype.scrollLeft);
    void (alias => {
        Game_Map.prototype.scrollRight = function() {
            const x = this._displayX;
            alias.apply(this, arguments);
            scrollPinnedPics((x - this._displayX) * this.tileWidth(), 0);
        };
    })(Game_Map.prototype.scrollRight);

    // Patch - respond to change in display position, e.g. player relocate.
    void (alias => {
        Game_Map.prototype.setDisplayPos = function() {
            const x = this._displayX;
            const y = this._displayY;
            alias.apply(this, arguments);
            scrollPinnedPics(
                (x - this._displayX) * this.tileWidth(),
                (y - this._displayY) * this.tileHeight()
            );
        };
    })(Game_Map.prototype.setDisplayPos);

    // Patch - clear pinned picture cache on new game.
    void (alias => {
        DataManager.createGameObjects = function() {
            alias.apply(this, arguments);
            PIN.clear();
        };
    })(DataManager.createGameObjects);

    // Patch - store pinned picture IDs in save data.
    void (alias => {
        DataManager.makeSaveContents = function() {
            const r = alias.apply(this, arguments);
            if (PIN.size)
                r[SAVE_PROP] = Array.from(PIN);
            return r;
        };
    })(DataManager.makeSaveContents);

    // Patch - read pinned picture IDs from save data.
    void (alias => {
        DataManager.extractSaveContents = function(contents) {
            alias.apply(this, arguments);
            const a = contents[SAVE_PROP];
            if (Array.isArray(a))
                for (const id of a)
                    PIN.add(id);
        };
    })(DataManager.extractSaveContents);

})();

// D14) Support showing left/right arrows on game windows.
void (() => { if (!CAE.Tweaks.D14) return;
'use strict';

    // Modelled on existing up/down arrows.
    // Simply set the appropriate flag on a game window.
    // E.g. `this.leftArrowVisible = true;`.

    /** Identifiers for new boolean "is left/right arrow visible" properties on `Window`. */
    const BKEY = Object.freeze({
        L: "leftArrowVisible",
        R: "rightArrowVisible"
    });

    /** Identifiers for new left/right arrow `Sprite` children on `Window`. */
    const SKEY = Object.freeze({
        L: "_leftArrowSprite",
        R: "_rightArrowSprite"
    });

    // Patch - init visibility flags.
    void (alias => {
        Window.prototype.initialize = function() {
            alias.apply(this, arguments);
            this[BKEY.L] = false;
            this[BKEY.R] = false;
        };
    })(Window.prototype.initialize);

    // Patch - create sprites.
    void (alias => {
        Window.prototype._createArrowSprites = function() {
            alias.apply(this, arguments);
            this.addChild(this[SKEY.L] = new Sprite());
            this.addChild(this[SKEY.R] = new Sprite());
        };
    })(Window.prototype._createArrowSprites);

    // Patch - refresh display.
    void (alias => {
        Window.prototype._refreshArrows = function() {
            alias.apply(this, arguments);
            const w  = this._width;
            const h  = this._height;
            const p  = 24;
            const q  = p >> 1;
            const sx = 96 + p;
            const sy =  0 + p;
            const L  = this[SKEY.L];
            const R  = this[SKEY.R];
            L.bitmap = this._windowskin;
            L.anchor.set(0.5);
            L.setFrame(sx + 0, sy + q, q, p);
            L.move(q, h >> 1);
            R.bitmap = this._windowskin;
            R.anchor.set(0.5);
            R.setFrame(sx + q + p, sy + q, q, p);
            R.move(w - q, h >> 1);
        };
    })(Window.prototype._refreshArrows);

    // Patch - hide/show arrows as appropriate.
    void (alias => {
        Window.prototype._updateArrows = function() {
            alias.apply(this, arguments);
            const open = this.isOpen();
            this[SKEY.L].visible = open && this[BKEY.L];
            this[SKEY.R].visible = open && this[BKEY.R];
        };
    })(Window.prototype._updateArrows);

})();

// D15) Show trace on relevant errors. Includes copy-to-clipboard button.
void (() => { if (!CAE.Tweaks.D15) return;
'use strict';

    /** Text shown on "copy to clipboard" button. @type {string} */
    const BUTTON_LABEL = CAE.Tweaks.D15.BUTTON_LABEL; // "Copy to Clipboard";

    /** Fraction of display height for main error display div. @type {number} */
    const H_FRAC = 0.8;

    /** Font size for error stack info. @type {number} */
    const FONT_SIZE = CAE.Tweaks.D15.FONT_SIZE;

    /** @returns {string} CSS text for style of retry button. */
    const getButtonStyle = function() {
        try {
            for (const sheet of document.styleSheets)
                for (const rule of sheet.cssRules)
                    if (rule.selectorText === "#retryButton")
                        return rule.style.cssText;
        } catch (ex) {
            // Security error maybe. Ignore it.
        }
        return "";
    };

    /** CSS style overrides for trace display. */
    const STYLE = Object.freeze({
        DIV: Object.freeze({
            textAlign: "left",
            fontSize: FONT_SIZE.toFixed(0) + "pt"
        }),
        // Fallback style in case client forbids fetching it at runtime.
        BUTTON: Object.freeze({
            fontSize: "20px",
            margin: "20px",
            padding: "10px"
        })
    });

    /**
     * @param {Error} [error] reference error
     * @returns {string} HTML content formatted for end-user display.
     */
    const getInfo = function(error) {
        const s = error?.stack;
        if (!s)
            return "";
        const t = s.slice(s.indexOf("\n")) + "\n";
        return Utils.escapeHtml(
            t.replace(/\(.*\/js\/(?:plugins\/)?(.*?)\)/g, "($1)")
        ).replace(/\n/g, "<br>");
    };

    /**
     * @param {string} html HTML for stack trace display
     * @returns {HTMLElement} display element based on input `html`.
     */
    const mkDiv = function(html) {
        const d = document.createElement("div");
        d.id = "errorStack";
        d.innerHTML = html;
        Object.assign(d.style, STYLE.DIV);
        return d;
    };

    /** Called when clipboard write operation succeeds. */
    const clipboardSuccess = function() {
        alert("Error information copied to clipboard.");
    };

    /** Called when clipboard write operation fails. */
    const clipboardFailure = function() {
        alert("Failed to copy error information to clipboard.")
    };

    /** @returns {string} text to be written to clipboard. */
    const makeClipboardText = function() {
        // Fetch now - accounts for edits by other plugins.
        const d0 = document.getElementById("errorName");
        const d1 = document.getElementById("errorMessage");
        const d2 = document.getElementById("errorStack");
        return (d0?.innerHTML ?? "") + "\n"
             + (d1?.innerHTML ?? "") + "\n"
             + (d2?.innerHTML ?? "").replace(/<br>/g, "\n");
    };

    /** Attempts to copy error info to clipboard. */
    const copyInfoToClipboard = function() {
        navigator.clipboard.writeText(makeClipboardText())
                 .then(clipboardSuccess)
                 .catch(clipboardFailure);
    };

    /**
     * Cf Graphics.showRetryButton.
     * @returns {HTMLButtonElement} "Copy to clipboard" button
     */
    const mkButton = function() {
        const button = document.createElement("button");
        const s = getButtonStyle();
        if (s)
            button.style = s;
        else
            Object.assign(button.style, STYLE.BUTTON);
        button.id = "errorStackCopy";
        button.innerHTML = BUTTON_LABEL;
        button.ontouchstart = e => e.stopPropagation(); // iOS Safari (cf rmmz_core)
        button.onclick = copyInfoToClipboard;
        return button;
    };

    // Patch - add trace as new sub-div of error printer.
    void (alias => {
        Graphics.printError = function(name, message, error) {
            const info = getInfo(error);
            alias.apply(this, arguments);
            if (info) {
                this._errorPrinter.innerHTML += mkDiv(info).outerHTML;
                const button = mkButton();
                this._errorPrinter.appendChild(button);
                button.focus();
            }
            SceneManager.showDevTools();    // auto-show console during test
        };
    })(Graphics.printError);

    // Patch - increase error printer's height to give the new stuff more screen space.
    void (alias => {
        Graphics._updateErrorPrinter = function() {
            alias.apply(this, arguments);
            this._errorPrinter.style.height = this._height * H_FRAC * this._realScale + "px";
        };
    })(Graphics._updateErrorPrinter);

})();

// D16) Only process mid-message text codes if actually drawing.
void (() => { if (!CAE.Tweaks.D16) return;
'use strict';

    // Core text codes affected (7): \$ \. \| \! \> \< \^
    // No effect by default because these codes are not usually measured.
    // Ostensibly for feature Q14's \align text code, could also help for word wrap.

    const alias = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        if (textState.drawing)
            alias.apply(this, arguments);
        else
            Window_Base.prototype.processEscapeCharacter.apply(this, arguments);
    };

})();

// D17) Merge ME volume into BGM volume.
void (() => { if (!CAE.Tweaks.D17) return;
'use strict';

    // Because:
    // - ME is a BGM interlude, so will typically be volume-balanced against BGM.
    // - Players often don't know what Musical Effects are. [citation needed]
    // - I want to free up a display slot in the options window (to avoid scrolling).

    /** Non-conflicting identifier for new "ME & BGM setter" method on `AudioManager`. */
    const SYM = Symbol();

    /** For patching me/bgm setters. @since v16 */
    const alias = Object.freeze(
        Object.fromEntries(
            Array.from(
                ["me", "bgm"],
                s => [s, Object.freeze(
                    Object.getOwnPropertyDescriptor(AudioManager, s + "Volume")
                )]
            )
        )
    );

    /**
     * @static New linked setter for `meVolume` and `bgmVolume`.
     * @param {number} v
     * Set value.
     */
    AudioManager[SYM] = function(v) {
        alias.me .set.apply(this, arguments);
        alias.bgm.set.apply(this, arguments);
    };
    // AudioManager[SYM] = function(v) {
    //     // NB: some methods check `_meVolume` directly!
    //     this._meVolume = this._bgmVolume = v;
    //     this.updateMeParameters(this._currentMe);
    //     this.updateBgmParameters(this._currentBgm);
    // };

    // Override - link meVolume & bgmVolume setters.
    // Object.defineProperty(AudioManager, "meVolume", {
    //     get: function( ) { return this._meVolume; },
    //     set: function(v) { this[SYM](v); },
    //     configurable: true
    // });
    // Object.defineProperty(AudioManager, "bgmVolume", {
    //     get: function( ) { return this._bgmVolume; },
    //     set: function(v) { this[SYM](v); },
    //     configurable: true
    // });

    // Patch - link me/bgm volume setters to each other. (v16)
    Object.defineProperty(AudioManager, "meVolume", {
        get: alias.me.get,  set: v => AudioManager[SYM](v), configurable: true
    });
    Object.defineProperty(AudioManager, "bgmVolume", {
        get: alias.bgm.get, set: v => AudioManager[SYM](v), configurable: true
    })

    // Patch - don't add in-game ME Volume option.
    void (alias => {
        Window_Options.prototype.addCommand = function(name, symbol, enabled, ext) {
            if (symbol !== "meVolume")
                alias.apply(this, arguments);
        };
    })(Window_Options.prototype.addCommand);

    // Patch - accommodate loss of option.
    void (alias => {
        Scene_Options.prototype.maxCommands = function() {
            return alias.apply(this, arguments) - 1;
        };
    })(Scene_Options.prototype.maxCommands);

})();

// D18) Troop name tag <add:X,X,X> adds members from other troops to bypass editor limit.
void (() => { if (!CAE.Tweaks.D18) return;
'use strict';

    /** Identifier for new troop name tag. */
    const TAG_NAME = CAE.Tweaks.D18.tag_add || "add";

    /** Non-conflicting identifier for new "added troops" property on `$dataTroops` records. */
    const SYM = Symbol();

    /**
     * @param {unknown} tag notetag parsed from troop name
     * @returns {object[]|null} array of additional members from other troop(s).
     */
    const parseTag = function(tag) {
        if (typeof tag === "string" && tag.length) {
            const a = tag.split(",").flatMap(
                s => $dataTroops[parseInt(s, 10) || 0]?.members ?? []
            );
            if (a.length)
                return a;
        }
        return null;
    };

    /**
     * Extracts standard-format `<add:X>` tags from troop name.
     *
     * Results are parsed as comma-delimited array
     * and stored on troop record under {@linkcode SYM}.
     * @param {number} n reference troop ID
     */
    const readNameTags = function(n) {
        const T = $dataTroops[n];
        if (T) {
            const o = { note: T.name };
            DataManager.extractMetadata(o);
            const d = parseTag(o.meta[TAG_NAME]);
            if (d)
                return T[SYM] = d;
        }
        return null;
    };

    // Patch - merge applicable troop records on game boot.
    void (alias => {
        Scene_Boot.prototype.start = function() {
            const D = $dataTroops;
            for (let n = D.length; --n;) {
                const T = D[n];
                readNameTags(n);
                if (T[SYM])
                    T.members.push(...T[SYM]);
            }
            alias.apply(this, arguments);
        };
    })(Scene_Boot.prototype.start);

})();

// D19) Allow processing multiple move commands per frame per character.
void (() => { if (!CAE.Tweaks.D19) return;
'use strict';

    /** Non-conflicting identifier for new "performed instant move command" flag on `Game_Character`. */
    const SYM = Symbol();

    /** List of non-instant move command codes. */
    const LONG_MOVES = Object.freeze(new Set([
        Game_Character.ROUTE_MOVE_DOWN,
        Game_Character.ROUTE_MOVE_LEFT,
        Game_Character.ROUTE_MOVE_RIGHT,
        Game_Character.ROUTE_MOVE_UP,
        Game_Character.ROUTE_MOVE_LOWER_L,
        Game_Character.ROUTE_MOVE_LOWER_R,
        Game_Character.ROUTE_MOVE_UPPER_L,
        Game_Character.ROUTE_MOVE_UPPER_R,
        Game_Character.ROUTE_MOVE_RANDOM,
        Game_Character.ROUTE_MOVE_TOWARD,
        Game_Character.ROUTE_MOVE_AWAY,
        Game_Character.ROUTE_MOVE_FORWARD,
        Game_Character.ROUTE_MOVE_BACKWARD,
        Game_Character.ROUTE_JUMP,
        Game_Character.ROUTE_WAIT
    ]));

    // Patch - allow running multiple move commands per character per frame.
    void (alias => {
        Game_Character.prototype.updateRoutineMove = function() {
            const r = this._moveRoute;
            let prev = 0;
            do {
                prev = this._moveRouteIndex;
                alias.apply(this, arguments);
            } while (
                // route not changed
                r === this._moveRoute
                // route progressed
                && prev !== this._moveRouteIndex
                // successful instant move or failed long move
                && this[SYM] === this.isMovementSucceeded()
            );
        };
    })(Game_Character.prototype.updateRoutineMove);

    // Patch - update "instant move" flag.
    void (alias => {
        Game_Character.prototype.processMoveCommand = function(command) {
            this[SYM] = (
                // events must be frequency 5+ (no inter-move waiting)
                !(this.stopCountThreshold?.() > 0) &&
                // must not be a "long" move command
                !LONG_MOVES.has(command.code)
            );
            alias.apply(this, arguments);
        };
    })(Game_Character.prototype.processMoveCommand);

})();

// D20) Plugin command to add reinforcements mid-battle.
void (() => { if (!CAE.Tweaks.D20) return;
'use strict';

    // To avoid workarounds involving Enemy Appear + revival.
    // Allows accumulating drops from reinforcements.

    /**
     * Adds members to current troop if in battle.
     * @param {{"Troop ID":string}} args command arguments
     * @returns {boolean} `true` iff something changed.
     */
    CAE.Tweaks.D20.reinforce = function(args) {
        // battle only
        if (!$gameParty.inBattle())
            return false;
        // get reinforcing enemies
        const troopId = parseInt(args["Troop ID"], 10);
        const t = new Game_Troop();
        t.setup(troopId);
        const M = t.members();
        if (!M.length)
            return false;
        for (const nme of M)
            nme.setLetter("");
        // add reinforcing enemies & refresh names
        $gameTroop._enemies.push(...M);
        $gameTroop.makeUniqueNames();
        // add corresponding sprites
        if (SceneManager._scene instanceof Scene_Battle) {  // jic
            const ss = SceneManager._scene._spriteset;
            const es = M.map(nme => new Sprite_Enemy(nme));
            ss._enemySprites.push(...es);
            ss._enemySprites.sort(ss.compareEnemySprite.bind(ss));
            for (const s of es) {
                ss._battleField.addChildAt(s, ss._enemySprites.indexOf(s));
                if (s._battler.isAppeared())
                    s.startEffect("appear");
            }
        }
        return true;
    };

    // Considered optional emerge messages, rejected due to compatibility awkwardness.
    // Can still use Show Text for manual "emerge" messages.

    // Register plugin command.
    PluginManager.registerCommand(CAE.Tweaks.NAME, "D20_reinforce", CAE.Tweaks.D20.reinforce);

})();

// D21) Synchronous save/load plugin commands.
void (() => { if (!CAE.Tweaks.D21) return;
'use strict';
    // This causes playtest save failure for me (Windows):
    // StorageManager.fileDirectoryPath = function() { return 'C::'; };

    /**
     * Identifier for new command interpreter wait mode.\
     * This is set to ensure the interpreter waits for save/load to complete before proceeding.
     */
    const WAIT_MODE = "file:" + CAE.Tweaks.NAME + "_D21";

    /** If `true`, track successful autosaves and subtract that from the usual Save Count. @type {boolean} @since v14 */
    const TRACK_AUTOSAVES = CAE.Tweaks.D21.COUNT_AUTO;

    /** If `true`, save count will ignore saves that fail for whatever reason. @type {boolean} @since v16 */
    const DO_NOT_COUNT_FAILED_SAVES = CAE.Tweaks.D21.COUNT_FAIL;

    /** Identifier for new "autosave count" property on `Game_System`. @type {string} */
    const P_AUTOSAVE_COUNT = "_autosaveCount";

    /** Private wait-mode tracker for this feature's plugin commands. @type {boolean} */
    let busy = false;

    /** @typedef {?[Game_Interpreter,{"Save File ID":string,"Play SE":string,"Switch on Fail":string,"Fade Type":string}]} LoadRequest */
    /** Stores requested load command arguments for later processing. @type {LoadRequest} @since v15 */
    let request = null;

    /** @returns {boolean} `true` iff this feature's save/load commands are currently busy. */
    CAE.Tweaks.D21.isBusy = function() {
        return busy;
    };

    /** @returns {LoadRequest} command context & arguments for requested load operation, or `null` if no request pending. */
    CAE.Tweaks.D21.getRequest = function() {
        return request;
    };

    /** @returns {boolean} `true` iff it's OK to save right now. */
    CAE.Tweaks.D21.isSaveOk = function() {
        // Not checking `busy` here: only care to support Plugin Command in events.
        return true;
    };

    /** @returns {boolean} `true` iff it's OK to load a save right now. */
    CAE.Tweaks.D21.isLoadOk = function() {
        // NB: $gameTroop is not saved.
        return true;    // Why not allow loading from battle? You'll end up on the map, sure. So what?
        return !$gameParty.inBattle();
    };

    /**
     * @param {number} saveId
     * ID of save file to check.
     * @returns {boolean}
     * `true` iff provided save file ID is valid.
     */
    CAE.Tweaks.D21.isValidSaveId = function(saveId) {
        // Allow saving to slots that are not selectable in-game.
        // Note that slot 0 (autosave) is always present in globalInfo, regardless of settings.
        return Number.isFinite(saveId) && 0 <= saveId;
    };

    /**
     * @param {object} args
     * Raw plugin command arguments object.
     * @returns {number}
     * Save file ID.
     */
    CAE.Tweaks.D21.getSavefileId = function(args) {
        const i = parseInt(args["Save File ID"], 10);
        return i < 0 ? $gameSystem.savefileId() : i;
    };

    /**
     * Save Game plugin command function.
     * @this {Game_Interpreter}
     * Event interpreter instance from which command is called.
     * @param {{"Save File ID":string,"Play SE":string,"Switch on Fail":string}} args
     * Raw command arguments.
     * @returns {boolean}
     * `true` iff save operation was initiated.
     */
    CAE.Tweaks.D21.save = function(args) {
        if (!CAE.Tweaks.D21.isSaveOk())
            return false;
        const id = CAE.Tweaks.D21.getSavefileId(args);
        if (!CAE.Tweaks.D21.isValidSaveId(id))
            return false;
        const playSe    = args["Play SE"] === "true";
        const successSw = parseInt(args["Switch on Success"], 10);
        busy = true;
        ++this._index;  // do not process this command again post-load
        const a = TRACK_AUTOSAVES && !id;
        if (a)
            ++$gameSystem[P_AUTOSAVE_COUNT];
        else if (id)
            $gameSystem.setSavefileId(id);
        $gameSystem.onBeforeSave();
        DataManager.saveGame(id).then(() => {
            if (playSe)
                SoundManager.playSave();
            if (successSw)
                $gameSwitches.setValue(successSw, true);
        }).catch(() => {
            if (playSe)
                SoundManager.playBuzzer();
            if (a)
                --$gameSystem[P_AUTOSAVE_COUNT];
        }).finally(() => {
            --this._index;  // reset earlier change to avoid command skip
            busy = false;
        });
        this.setWaitMode(WAIT_MODE);
        return true;
    };

    /**
     * Load Game plugin command function.
     * @this {Game_Interpreter}
     * Event interpreter instance from which command is called.
     * @param {{"Save File ID":string,"Play SE":string,"Switch on Fail":string,"Fade Type":string}} args
     * Raw command arguments.
     * @returns {boolean}
     * `true` iff load operation was initiated.
     */
    CAE.Tweaks.D21.load = function(args) {
        if (!CAE.Tweaks.D21.isLoadOk())
            return false;
        const id = CAE.Tweaks.D21.getSavefileId(args);
        if (!CAE.Tweaks.D21.isValidSaveId(id))
            return false;
        const playSe    = args["Play SE"] === "true";
        const successSw = parseInt(args["Switch on Success"], 10);
        const fadeType  = parseInt(args["Fade Type"], 10) || 0;
        busy = true;
        DataManager.loadGame(id).then(() => {
            if (playSe)
                SoundManager.playLoad();
            // Always transfer, for easy fade handling.
            $gamePlayer.reserveTransfer(
                $gameMap.mapId(),
                $gamePlayer.x,
                $gamePlayer.y,
                $gamePlayer.direction(),
                fadeType
            );
            if ($gameSystem.versionId() !== $dataSystem.versionId)
                $gamePlayer.requestMapReload();
            SceneManager.goto(Scene_Map);   // always go to map!
            $gameSystem.onAfterLoad();
            if (successSw)
                $gameSwitches.setValue(successSw, true);
        }).catch(() => {
            if (playSe)
                SoundManager.playBuzzer();
        }).finally(() => {
            busy = false;
        });
        this.setWaitMode(WAIT_MODE);
        return true;
    };

    /**
     * Requests a load operation at the next opportunity judged to be "safe".
     * @this {Game_Interpreter}
     * Event interpreter instance from which this plugin command is called.
     * @param {{"Save File ID":string,"Play SE":string,"Switch on Fail":string,"Fade Type":string}} args
     * Raw command arguments.
     * @returns {boolean}
     * `true` iff request was accepted.
     * @since v15
     */
    CAE.Tweaks.D21.loadRequest = function(args) {
        request = [this, args];
        return busy = true;
    };

    // Register plugin commands for this feature.
    PluginManager.registerCommand(CAE.Tweaks.NAME, "D21_save", CAE.Tweaks.D21.save);
    PluginManager.registerCommand(CAE.Tweaks.NAME, "D21_load", CAE.Tweaks.D21.loadRequest);

    // Patch - handle new wait mode.
    void (alias => {
        Game_Interpreter.prototype.updateWaitMode = function() {
            if (this._waitMode === WAIT_MODE) {
                const b = CAE.Tweaks.D21.isBusy();
                if (!b)
                    this._waitMode = "";
                return b;
            }
            return alias.apply(this, arguments);
        };
    })(Game_Interpreter.prototype.updateWaitMode);

    // Patch - act on load request at end of scene update, and don't update scene during save/load.
    void (alias => { // v15
        SceneManager.updateScene = function() {
            if (!CAE.Tweaks.D21.isBusy())
                alias.apply(this, arguments);
            /** @type {LoadRequest} */
            const r = CAE.Tweaks.D21.getRequest();
            if (r) {
                CAE.Tweaks.D21.load.call(...r);
                request = null;
            }
        };
    })(SceneManager.updateScene);

    // Patch - suppress scene change while save or, more importantly, load is ongoing.
    void (alias => { // v15
        SceneManager.isCurrentSceneBusy = function() {
            return busy || alias.apply(this, arguments);
        };
    })(SceneManager.isCurrentSceneBusy);

    // Patch - ignore autosaves in save count.
    void (() => { if (!TRACK_AUTOSAVES) return;

        // New - public "getter" for autosave count.
        Game_System.prototype.autosaveCount = function() {
            return this[P_AUTOSAVE_COUNT];
        };

        // Patch - subtract autosave count from total save count.
        void (alias => {
            Game_System.prototype.saveCount = function() {
                return alias.apply(this, arguments) - this.autosaveCount();
            };
        })(Game_System.prototype.saveCount);

        // Patch - initialise autosave count to 0.
        void (alias => {
            Game_System.prototype.initialize = function() {
                alias.apply(this, arguments);
                this[P_AUTOSAVE_COUNT] = 0;
            };
        })(Game_System.prototype.initialize);

        // Patch - increment autosave count on auto-triggered save.
        void (alias => {
            Scene_Base.prototype.executeAutosave = function() {
                ++$gameSystem[P_AUTOSAVE_COUNT];
                alias.apply(this, arguments);
            };
        })(Scene_Base.prototype.executeAutosave);

        // Patch - undo increment if autosave fails.
        void (alias => {
            Scene_Base.prototype.onAutosaveFailure = function() {
                --$gameSystem[P_AUTOSAVE_COUNT];
                alias.apply(this, arguments);
            };
        })(Scene_Base.prototype.onAutosaveFailure);

    })();

    // Patch - undo save count increment when any `saveGame` operation fails. (v16)
    void (() => { if (!DO_NOT_COUNT_FAILED_SAVES) return;

        /**
         * Response for generic `DataManager.saveGame` failure.\
         * NB: `Scene_Save#onSaveFailure` fires when selecting disabled save slot!
         */
        CAE.Tweaks.D21.onSaveFailure = function() {
            --$gameSystem._saveCount;
            // autosave count is handled in `TRACK_AUTOSAVES` block, above.
        };

        // Patch - catch all save failures.
        void (alias => {
            DataManager.saveGame = function(id) {
                return alias.apply(this, arguments)
                            .catch(reject => {
                                CAE.Tweaks.D21.onSaveFailure();
                                reject();   // pass on error to further handlers
                            });
            };
        })(DataManager.saveGame);

    })();

    // Rejected: automatic pre-save `$gameTemp.saved = true`.
    //  - the naive solution conflicts with autosave.
    //  - easy to do case-by-case when necessary.

})();

// D22) Switches/variables with name matching a pattern will not trigger onChange.
void (() => { if (!CAE.Tweaks.D22) return;
'use strict';

    // Intended for switches/variables that change often but never affect event page conditions.

    /** Pattern for "skip onChange" switch/variable names. */
    const RX = new RegExp(CAE.Tweaks.D22.PATTERN); // /^#/;    // e.g. "#Some Variable"

    /**
     * Non-conflicting identifier for new "do not change" flag property on:
     * - `Game_Variables` and
     * - `Game_Switches`.
     */
    const SYM = Symbol();

    /** Record of "silent `onChange`" switch/variable IDs. See {@linkcode setup}. */
    const S = Object.freeze({
        /** @type {Set<number>} */
        variables: new Set(),
        /** @type {Set<number>} */
        switches:  new Set()
    });

    /** Records and freezes "silent `onChange`" switch/variable IDs in {@linkcode S}. */
    const setup = function() {
        const A = $dataSystem;
        for (const a of Object.keys(S)) {
            /** @type {string[]} */
            const l = A[a];
            for (let n = l.length; --n;)
                if (RX.test(l[n]))
                    S[a].add(n);
            Object.freeze(S[a]);
        }
        // Object.freeze(S);    // already frozen
    };

    /**
     * Flags given object to ignore `onChange` until further notice.
     * @param {Game_Switches|Game_Variables} obj
     * Reference object.
     * @returns {boolean}
     * New flag value.
     */
    const setFlag = function(obj) {
        return obj[SYM] = true;
    };

    /**
     * Clears any existing "ignore `onChange`" flag on given object.
     * @param {Game_Switches|Game_Variables} obj
     * Reference object.
     * @returns {boolean}
     * `true` iff flag was changed.
     */
    const clearFlag = function(obj) {
        return delete obj[SYM];
    };

    /**
     * Updates "ignore `onChange`" flag for given object.
     * @param {Game_Switches|Game_Variables} obj
     * Reference object.
     * @param {number} id
     * Switch/variable ID.
     * @returns {boolean}
     * `true` iff object was flagged to ignore `onChange`.
     */
    const updateFlag = function(obj, id) {
        if (obj) {
            const type = obj.constructor === Game_Switches ? "switches" : "variables";
            if (S[type].has(id))
                return setFlag(obj);
        }
        clearFlag(obj);
        return false;
    };

    /**
     * @param {Game_Switches|Game_Variables} obj
     * Reference object.
     * @returns {boolean}
     * `true` iff flagged to ignore `onChange`.
     */
    const isFlagged = function(obj) {
        return SYM in obj;
    };

    // On boot, identify switches/variables that should be updated "silently".
    void (alias => {
        Scene_Boot.prototype.start = function() {
            setup();
            alias.apply(this, arguments);
        };
    })(Scene_Boot.prototype.start);

    // Flag for silent `onChange` when appropriate.
    void (alias => {
        Game_Switches.prototype.setValue = function(id, value) {
            updateFlag(this, id);
            alias.apply(this, arguments);
            clearFlag(this);
        };
    })(Game_Switches.prototype.setValue);
    void (alias => {
        Game_Variables.prototype.setValue = function(id, value) {
            updateFlag(this, id);
            alias.apply(this, arguments);
            clearFlag(this);
        };
    })(Game_Variables.prototype.setValue);

    // Process `onChange` effects iff not flagged.
    void (alias => {
        Game_Switches.prototype.onChange = function() {
            if (!isFlagged(this))
                alias.apply(this, arguments);
        };
    })(Game_Switches.prototype.onChange);
    void (alias => {
        Game_Variables.prototype.onChange = function() {
            if (!isFlagged(this))
                alias.apply(this, arguments);
        };
    })(Game_Variables.prototype.onChange);

})();

// D23) CSPRNG for Math.randomInt.
void (() => { if (!CAE.Tweaks.D23) return;
'use strict';

    // Makes `Math.randomInt` use a CSPRNG.
    // This ensures a "sufficiently secure" lack of interdependence for random rolls.
    // Might be useful in situations demanding a lot of randomness.

    // HTML specification for `Math.random`:
    //   https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math.random
    // Note: no specification of algorithm or seed source/frequency.
    // I think most browsers use xorshift128+, i.e. 128 random bits per seed:
    //   https://vigna.di.unimi.it/xorshift/

    // Probably not worthwhile and/or noticeable in most cases. DOIN' IT ANYWAY.

    /** Enough bits to reproduce the smallest representable `Number` value. */
    const TINY_BITS = 1 - Math.floor(Math.log2(Number.EPSILON));
    // +1 may be unnecessary since this is for decimal portion. Harmless tho?

    /**
     * - If `true`, replace `Math.randomInt`.
     * - If `false`, replace `Math.random` (also affects `Math.randomInt`).
     */
    const INT_ONLY = CAE.Tweaks.D23.INT_ONLY;

    /**
     * @param {string} value
     * Input floating-point number in string format.
     * @param {number} [radix=10]
     * Radix to use for parsing.
     * @returns {number}
     * Result.
     */
    const parseFloatRadix = function(value, radix = 10) {
        // From https://stackoverflow.com/a/58695018
        return parseInt(
            value.replace('.', ''), radix
        ) / Math.pow(
            radix, (value.split('.')[1] || '').length
        )
    };

    Object.assign(CAE.Tweaks.D23, {

        /**
         * @param {number} count
         * Number of random bits to generate.
         * @returns {string}
         * String of `0` and `1` chars representing the requested random bits.
         */
        randomBits: function(count = 0) {
            count |= 0;
            if (count > 0)
                return Array.from(
                    crypto.getRandomValues(new Uint8Array(Math.ceil(count / 8))),
                    n => n.toString(2).padStart(8, "0")
                ).join("").slice(0, count);
            return "0";
        },

        /**
         * @param {number} count
         * Number of random bits to generate.
         * @returns {BigInt}
         * Requested random bits formatted as a `BigInt`.
         */
        randomBitsAsBigInt: function(count) {
            return BigInt("0b" + this.randomBits(count));
        },

        /**
         * @param {number} count
         * Number of random bits to generate.
         * @returns {number}
         * Requested random bits formatted as a `Number`.
         */
        randomBitsAsNumber: function(count) {
            if (count > 52) {
                SceneManager.showDevTools();
                console.warn(
                    `Requested a ${count}-bit random value as Number type.\n` +
                    `The maximum safe integer for Number type is 2^53-1.`
                );
            }
            return parseInt(this.randomBits(count), 2);
        },

        /**
         * As `Math.random`, except via a CSPRNG.
         * @returns {number}
         * Random floating-point number in the range [0, 1).
         */
        random: function() { // Cae_Tweaks.js [D23]
            return parseFloatRadix("0." + CAE.Tweaks.D23.randomBits(TINY_BITS), 2);
        },

        /**
         * As `Math.randomInt`, except via a CSPRNG.
         * @param {number} max
         * Maximum bound.
         * @returns {number}
         * Random integer from `0` to `max - 1`.
         */
        randomInt: function(max) { // Cae_Tweaks.js [D23]
            // From https://stackoverflow.com/a/41452318
            if (max >= 1) {
                max |= 0;
                const bytes = Math.ceil(Math.log2(max) / 8);
                const cap   = Math.pow(256, bytes);
                const arr   = new Uint8Array(bytes);
                while (true) {
                    globalThis.crypto.getRandomValues(arr);
                    let v = 0;
                    for (let n = bytes; n--;)
                        v = (v << 8) + arr[n];
                    if (v < cap - cap % max)
                        return v % max;
                }
            }
            return 0;
        }

    });

    // Override! Replace PRNG with CSPRNG.
    if (INT_ONLY)
        Math.randomInt = CAE.Tweaks.D23.randomInt;
    else
        Math.random = CAE.Tweaks.D23.random;

})();

// D24) Preload stuff.
void (() => { if (!CAE.Tweaks.D24) return;
'use strict';

    // Map file size is typically relatively small, but it may help to have them ready in advance.
    // Non-system image cache usually clears on map transfer: may want to avoid that in some cases.
    // Manual-control static buffer system for audio? *nods*

    /** Custom caches. */
    const CACHE = {

        /** @type {Map<number,object>} Cached maps, by map ID. */
        map: new Map(),

        /** @type {Map<string,Bitmap} Cached bitmaps, by file URL. */
        img: new Map(),

        /** @type {Map<string,WebAudio} Cached static audio buffers, by partial file URL (no `audio/` or extension). */
        snd: new Map()

    };

    /** Filename getters. */
    const path = {

        /**
         * @param {number} mapId
         * Map ID.
         * @returns {string}
         * File path, from subfolder to extension.
         */
        map: function(mapId) {
            return `data/Map${mapId.padZero(3)}.json`;
        },

        /**
         * @param {string} filename
         * Name of image file, without extension.
         * @returns {string}
         * File path, from subfolder to extension.
         */
        img: function(filename) {
            return filename ? `img/${filename}.png` : "";
        }

    };

    /** Pre-cache validation checks. */
    const canCache = {

        /**
         * @param {number} mapId
         * Map ID.
         * @returns {boolean}
         * `true` if it looks OK to cache.
         */
        map: function(mapId) {
            return Number.isFinite(mapId)
                && mapId > 0
                && !CACHE.map.has(mapId);
        },

        /**
         * @param {string} url
         * Image file URL.
         * @returns {boolean}
         * `true` if it looks OK to cache.
         */
        img: function(url) {
            return typeof url === "string"
                && !url.includes("/system/")    // handled by existing persistent cache
                && !CACHE.img.has(url);
        },

        /**
         * @param {string} urlPart
         * Partial audio file URL: should not include `audio/` or file extension.
         * @returns {boolean}
         * `true` if it looks OK to cache.
         */
        snd: function(urlPart) {
            return typeof urlPart === "string"
                && !AudioManager.isStaticSe({ name: urlPart })
                && !CACHE.snd.has(urlPart);
        }

    };

    /**
     * Runs when map cache request finishes loading from file.
     * @param {XMLHttpRequest} xhr
     * Request object.
     * @param {number} mapId
     * Requested map ID.
     */
    const onMapLoad = function(xhr, mapId) {
        if (xhr.status < 400) {
            const data = JSON.parse(xhr.responseText);
            DataManager.onLoad(data);
            CACHE.map.set(mapId, data);
        }
    };

    /** Methods for adding to cache. */
    const addCache = {

        /**
         * Loads specified map ID into cache.
         * @param {number} mapId
         * Map ID.
         */
        map: function(mapId) {
            // `loadDataFile` normally targets a global, want to avoid that.
            if (canCache.map(mapId)) {
                const xhr = new XMLHttpRequest();
                const url = path.map(mapId);
                xhr.open("GET", url);
                xhr.overrideMimeType("application/json");
                xhr.onload = () => onMapLoad(xhr, mapId, url);
                xhr.send();
            }
        },

        /**
         * Loads specified image into cache.
         * @param {string} url
         * Image file URL, including file extension.
         */
        img: function(url) {
            if (canCache.img(url))
                CACHE.img.set(url, Bitmap.load(url));
        },

        /**
         * Loads specified audio into cache.
         * @param {string} urlPart
         * Partial audio file URL: should not include `audio/` or file extension.
         */
        snd: function(urlPart) {
            if (canCache.snd(urlPart))
                CACHE.snd.set(urlPart, AudioManager.createBuffer("", urlPart));
        }

    };

    /** Methods to remove from cache. */
    const remCache = {

        /**
         * @param {number} [mapId]
         * Map ID. Omit to clear all maps cached by this feature.
         * @returns {boolean}
         * `true` iff specified data were removed.
         */
        map: function(mapId = null) {
            if (mapId === null)
                return CACHE.map.clear();
            return CACHE.map.delete(mapId);
        },

        /**
         * @param {string} [url]
         * Image file URL. Omit to clear all images cached by this feature.
         * @returns {boolean}
         * `true` iff specified data were removed.
         */
        img: function(url = null) {
            if (url === null)
                return CACHE.img.clear();
            return CACHE.img.delete(url);
        },

        /**
         * @param {string} [urlPart]
         * Partial audio file URL: should not include `audio/` or file extension.\
         * Omit to clear all audio cached by this feature.
         * @returns {boolean}
         * `true` iff specified data were removed.
         */
        snd: function(urlPart = null) {
            if (urlPart === null)
                return CACHE.snd.clear();
            return CACHE.snd.delete(urlPart);
        }

    };

    /** Getters for cache. */
    const getCache = {

        /**
         * @param {number} mapId
         * Map ID.
         * @returns {object?}
         * Map data, or `undefined` if not cached by this feature.
         */
        map: function(mapId) {
            return CACHE.map.get(mapId);
        },

        /**
         * @param {string} url
         * Image file URL.
         * @returns {Bitmap}
         * Bitmap, or `undefined` if not cached by this feature.
         */
        img: function(url) {
            return CACHE.img.get(url);
        },

        /**
         * @param {string} urlPart
         * Partial audio file URL: should not include `audio/` or file extension.
         * @returns {WebAudio}
         * Static audio buffer, or `undefined` if not cached by this feature.
         */
        snd: function(urlPart) {
            return CACHE.snd.get(urlPart);
        }

    };

    // Patch - redirect map loads to cache if appropriate.
    void (alias => {
        DataManager.loadMapData = function(mapId) {
            const data = getCache.map(mapId);
            if (data)
                $dataMap = data;
            else
                alias.apply(this, arguments);
        };
    })(DataManager.loadMapData);

    // Patch - redirect image loads to custom cache if appropriate.
    void (alias => {
        ImageManager.loadBitmapFromUrl = function(url) {
            return getCache.img(url) ?? alias.apply(this, arguments);
        };
    })(ImageManager.loadBitmapFromUrl);

    // Patch - redirect audio buffer creation to custom static cache if appropriate.
    void (alias => {
        AudioManager.createBuffer = function(folder, name) {
            const urlPart = folder + Utils.encodeURI(name);
            return getCache.snd(urlPart) ?? alias.apply(this, arguments);
        };
    })(AudioManager.createBuffer);
    // For non-static: considered _startXhrLoading/_startFetching.
    // Could not see a simple, cross-compatible way to copy decoded buffer & all associated properties.
    // Did not test JsonEx.makeDeepCopy - is every core WebAudio instance property stringifiable?
    // Figured it may need a case-by-case solution, which I don't think is worth the effort.

    // Patch - on game boot, cache data specified in plugin parameters.
    void (alias => {
        Scene_Boot.prototype.create = function() {
            alias.apply(this, arguments);
            const $ = CAE.Tweaks.D24;
            for (const map of $.BOOT_MAPS)
                addCache.map(map);
            for (const url of $.BOOT_IMGS)
                addCache.img(path.img(url));
            for (const url of $.BOOT_SNDS)
                addCache.snd(url);
        };
    })(Scene_Boot.prototype.create);

    // [ ] D24 - add support for map ID 0 to cache "this map". Add "auto cache this map on load" option.
    // [ ] D24 - add map notetags for precaching assets on map scene start? (For load/save.)

    /** Plugin command argument parsers. */
    const parse = {

        /**
         * @param {{"Map ID":string}} args
         * Raw plugin command arguments.
         * @returns {?number}
         * Parsed map ID.
         */
        map: function(args) {
            return parseInt(args["Map ID"], 10) || null;
        },

        /**
         * @param {{URL:string}} args
         * Raw plugin command arguments.
         * @returns {?string}
         * Parsed resource URL.
         */
        url: function(args) {
            return args.URL || null;
        },

        /**
         * @param {{URL:string}} args
         * Raw plugin command arguments.
         * @returns {?string}
         * Parsed image file URL.
         */
        img: function(args) {
            return path.img(this.url(args)) || null;
        },

        /**
         * @param {{URL:string}} args
         * Raw plugin command arguments.
         * @returns {?string}
         * Parsed audio file URL.
         */
        snd: function(args) {
            return this.url(args);
        }

    };

    // Define/register plugin commands.
    for (const [k, v] of (CAE.Tweaks.D24.pCom = new Map([
        ["cacheMap",   function(args) { return addCache.map(parse.map(args)); }],
        ["cacheImg",   function(args) { return addCache.img(parse.img(args)); }],
        ["cacheSnd",   function(args) { return addCache.snd(parse.snd(args)); }],
        ["uncacheMap", function(args) { return remCache.map(parse.map(args)); }],
        ["uncacheImg", function(args) { return remCache.img(parse.img(args)); }],
        ["uncacheSnd", function(args) { return remCache.snd(parse.snd(args)); }]
    ])).entries())
        PluginManager.registerCommand(CAE.Tweaks.NAME, `D24_${k}`, v);

})();

// D25) Auto Battle actors consider their Guard action.
void (() => { if (!CAE.Tweaks.D25) return;
'use strict';
    const alias = Game_Actor.prototype.makeActionList;
    Game_Actor.prototype.makeActionList = function() {
        const list = alias.apply(this, arguments);
        const guardAction = new Game_Action(this);
        guardAction.setGuard();
        list.push(guardAction);     // lowest priority when tied
        return list;
    };
})();

// D26) Custom default values for core options.
void (() => { if (!CAE.Tweaks.D26) return;
'use strict';

    // Assign custom values on plugin load (i.e. before config load).
    Object.assign(ConfigManager, CAE.Tweaks.D26.VALUES);

    // [ ] D26 - this is OK if config file fails to load. Could add readFlag/readVolume patches in case other plugins have skipped SOME core options.

})();

// D27) Make Move Toward/Away use pathfinding, adjust search limit.
void (() => { if (!CAE.Tweaks.D27) return;
"use strict";

    /** If `true`, enable pathfinding on all Move Toward Character calls. @type {boolean} */
    const TOWARD = CAE.Tweaks.D27.TO;

    /** If `true`, enable pathfinding on all Move Away From Character calls. @type {boolean} */
    const AWAY = CAE.Tweaks.D27.FROM;

    /**
     * Override value for pathfinding search limit (tiles):
     * - `0`: no change.
     * - `1`: effectively disables pathfinding (e.g. for touch movement).
     * @type {?number}
     */
    const SEARCH_LIMIT = CAE.Tweaks.D27.LIMIT;

    /** Identifier for new "findDirectionAway" method on `Game_Character`. @type {string|symbol} */
    const M = "findDirectionAway:Cae_Tweaks-D27";

    // Override - use existing pathfinding for "move toward" calls.
    void (() => { if (!TOWARD) return;
        Game_Character.prototype.moveTowardCharacter = function(char) {
            this.moveStraight(this.findDirectionTo(char.x, char.y));
        };
    })();

    // Override - use inverted pathfinding for "move away" calls.
    void (() => { if (!AWAY) return;

        // Override - make Move Away calls use pathfinding.
        Game_Character.prototype.moveAwayFromCharacter = function(char) {
            this.moveStraight(this[M](char.x, char.y));
        };

        // "New" - `findDirectionTo` core method with inverted heuristic and reduced range.
        Game_Character.prototype[M] = function findDirectionAway(srcX, srcY) {
            const searchLimit = Math.ceil(this.searchLimit() / 2);  // half
            const mapWidth = $gameMap.width();
            const nodeList = [];
            const openList = [];
            const closedList = [];
            const start = {};
            let best = start;

            start.parent = null;
            start.x = this.x;
            start.y = this.y;
            start.g = 0;
            start.f = $gameMap.distance(start.x, start.y, srcX, srcY);
            nodeList.push(start);
            openList.push(start.y * mapWidth + start.x);

            while (nodeList.length > 0) {
                let bestIndex = 0;
                for (let i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].f > nodeList[bestIndex].f) {  // invert
                        bestIndex = i;
                    }
                }

                const current = nodeList[bestIndex];
                const x1 = current.x;
                const y1 = current.y;
                const pos1 = y1 * mapWidth + x1;
                const g1 = current.g;

                nodeList.splice(bestIndex, 1);
                openList.splice(openList.indexOf(pos1), 1);
                closedList.push(pos1);

                if (current.x === srcX && current.y === srcY) {
                    best = current;
                    break;
                }

                if (g1 >= searchLimit) {
                    continue;
                }

                for (let j = 0; j < 4; j++) {
                    const direction = 2 + j * 2;
                    const x2 = $gameMap.roundXWithDirection(x1, direction);
                    const y2 = $gameMap.roundYWithDirection(y1, direction);
                    const pos2 = y2 * mapWidth + x2;

                    if (closedList.includes(pos2)) {
                        continue;
                    }
                    if (!this.canPass(x1, y1, direction)) {
                        continue;
                    }

                    const g2 = g1 + 1;
                    const index2 = openList.indexOf(pos2);

                    if (index2 < 0 || g2 < nodeList[index2].g) {
                        let neighbor = {};
                        if (index2 >= 0) {
                            neighbor = nodeList[index2];
                        } else {
                            nodeList.push(neighbor);
                            openList.push(pos2);
                        }
                        neighbor.parent = current;
                        neighbor.x = x2;
                        neighbor.y = y2;
                        neighbor.g = g2;
                        neighbor.f = g2 + $gameMap.distance(x2, y2, srcX, srcY);
                        if (!best || neighbor.f - neighbor.g > best.f - best.g) {  // invert
                            best = neighbor;
                        }
                    }
                }
            }

            let node = best;
            while (node.parent && node.parent !== start) {
                node = node.parent;
            }

            const deltaX1 = $gameMap.deltaX(node.x, start.x);
            const deltaY1 = $gameMap.deltaY(node.y, start.y);
            if (deltaY1 > 0) {
                return 2;
            } else if (deltaX1 < 0) {
                return 4;
            } else if (deltaX1 > 0) {
                return 6;
            } else if (deltaY1 < 0) {
                return 8;
            }

            const deltaX2 = this.deltaXFrom(srcX);
            const deltaY2 = this.deltaYFrom(srcY);
            if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
                return deltaX2 > 0 ? 4 : 6;
            } else if (deltaY2 !== 0) {
                return deltaY2 > 0 ? 8 : 2;
            }

            return 0;
        };

    })();

    // Patch - change search limit if appropriate.
    void (() => { if (!SEARCH_LIMIT) return;
        Game_CharacterBase.prototype.searchLimit = function() { return SEARCH_LIMIT; };
    })();

})();

//#endregion Dev QoL

// End of file.
