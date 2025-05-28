//=============================================================================
// Arthran Multiple Background Sounds
// Art_MultiBgs.js
//=============================================================================

var Imported = Imported || {};
Imported.Art_MultiBgs = true;

var Arthran = Arthran || {};
Arthran.MultiBgs = Arthran.MultiBgs || {};
Arthran.MultiBgs.version = 1.00;

/*:
* @target MZ
* @plugindesc [Version 1.00] Multiple Background Sounds
* @author Arthran
* @url https://arthran2.itch.io/rmmz-multi-bgs
*
* @command play
* @text Play BGS
* @desc Play a BGS.
*
* @arg name
* @text BGS Name
* @desc The name of the BGS to play.
* @type file
* @dir audio/bgs
*
* @arg volume
* @text Volume
* @desc The volume of the BGS to play.
* @type number
* @default 90
*
* @arg pitch
* @text Pitch
* @desc The pitch of the BGS to play.
* @type number
* @default 100
*
* @arg pan
* @text Pan
* @desc The pan of the BGS to play.
* @type number
* @default 0
*
* @command stop
* @text Stop BGS
* @desc Stop all BGS.
*
* @help
*
* ------------------------------------------------------------------------
* Information
* ------------------------------------------------------------------------
*
* By default, RPG Maker only allows you to play one BGS at a time. This 
* plugin will allow you to play multiple BGS at the same time, through 
* plugin commands.
*
* If you want to use multiple BGS at the same time, play them through this
* plugin's "Play BGS" command. If you use the default "Play BGS..." event
* command, it will retain the default behavior (it will stop all existing
* BGS before playing).
*
* This plugin also allows you to stop all BGS at once, through the "Stop BGS"
* command.
*
* If you prefer to use function calls instead of plugin commands, you can
* use the following:
*  Arthran.MultiBgs.play("name", volume, pitch, pan);  - Play a BGS
*                                                         Volume, pitch, and
*                                                         pan are optional
*  Arthran.MultiBgs.stop();                            - Stop all BGS
*
* ------------------------------------------------------------------------
* Terms of Use
* ------------------------------------------------------------------------
* -Can be used in commercial and non-commercial projects. 
* -Credit is not required, but is appreciated. 
* -You may edit the plugin to suit your needs, so long as you do not claim 
*    ownership of the plugin. 
* -Please do not distribute the plugin outside of your game.
*
* Copyright (c) 2023 Arthran
*/

//-----------------------------------------------------------------------------
// Plugin Commands
//-----------------------------------------------------------------------------

PluginManager.registerCommand('Art_MultiBgs', 'play', function(args) {
    const name = args.name || "";
    const volume = Number(args.volume || 90);
    const pitch = Number(args.pitch || 100);
    const pan = Number(args.pan || 0);
    Arthran.MultiBgs.play(name, volume, pitch, pan);
});

PluginManager.registerCommand('Art_MultiBgs', 'stop', function(args) {
    Arthran.MultiBgs.stop();
});

//-----------------------------------------------------------------------------
// Function Calls
//-----------------------------------------------------------------------------

Arthran.MultiBgs.play = function(aname, avolume = 90, apitch = 100, apan = 0) {
    AudioManager.playBgsEx({
        name: aname,
        volume: avolume,
        pitch: apitch,
        pan: apan
    });
};

Arthran.MultiBgs.stop = function() {
    AudioManager.stopBgs();
};

//-----------------------------------------------------------------------------
// Audio Manager
//-----------------------------------------------------------------------------

AudioManager._bgsBuffers = [];
AudioManager._currentBgsEx = [];

AudioManager.playBgsEx = function(bgs, pos) {
    let isCurrentBgs = this.isCurrentBgsEx(bgs);

    if (isCurrentBgs >= 0) {
        this.updateBgsParametersEx(this._bgsBuffers[isCurrentBgs], bgs);
    } else if (bgs.name) {
        var buffer = this.createBuffer("bgs/", bgs.name);
        this.updateBgsParametersEx(buffer, bgs);
        buffer.play(true, pos || 0);
        this._bgsBuffers.push(buffer);
        this._currentBgsEx.push(bgs);
    }
};

AudioManager.isCurrentBgsEx = function(bgs) {
    if ((this._currentBgsEx.length > 0) && (this._bgsBuffers.length > 0)) {
        let result = this._currentBgsEx.findIndex(function(currentBgs) {
            return (currentBgs.name == bgs.name);
        });
        return result;
    } else {
        return -1;
    }
};

AudioManager.updateBgsParametersEx = function(buffer, bgs) {
    this.updateBufferParameters(buffer, this._bgsVolume, bgs);
};

Arthran.MultiBgs.AudioManager_stopBgs = AudioManager.stopBgs;
AudioManager.stopBgs = function() {
    Arthran.MultiBgs.AudioManager_stopBgs.call(this);
    if (this._bgsBuffers.length > 0) {
        this.stopBgsEx();
    }
};

AudioManager.stopBgsEx = function() {
    this._bgsBuffers.forEach(function(buffer) {
        buffer.destroy();
    });
    this._bgsBuffers = [];
    this._currentBgsEx = [];
};

AudioManager.saveBgsEx = function() {
    const bgsEx = [];
    for (const bgs of this._currentBgsEx) {
        bgsEx.push({
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan
        });
    }
    return bgsEx;
};

//-----------------------------------------------------------------------------
// Game_System
//-----------------------------------------------------------------------------

Arthran.MultiBgs.Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
    Arthran.MultiBgs.Game_System_onBeforeSave.call(this);
    this._bgsExOnSave = AudioManager.saveBgsEx();
};

Arthran.MultiBgs.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
    Arthran.MultiBgs.Game_System_onAfterLoad.call(this);
    for (const bgs of this._bgsExOnSave) {
        AudioManager.playBgsEx(bgs);
    }
};