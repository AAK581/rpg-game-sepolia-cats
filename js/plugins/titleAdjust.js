(() => {
    // Remove the Continue button and only show New Game + Options
    Window_TitleCommand.prototype.makeCommandList = function () {
        this.addCommand('Start', 'newGame');
        this.addCommand(TextManager.options, 'options');
    };

    // Dynamically resize the window to fit just the available commands
    Window_TitleCommand.prototype.numVisibleRows = function () {
        return this.maxItems();
    };

    // Override the command window creation to properly size and center it
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function () {
        const commandWindowHeight = this.calcWindowHeight(2, true); // 2 visible rows: New Game + Options
        const rect = new Rectangle(
            (Graphics.boxWidth - 240) / 2, // x center
            440,                          // y position
            240,                          // width
            commandWindowHeight           // dynamic height
        );
        this._commandWindow = new Window_TitleCommand(rect);
        this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
        this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        this.addWindow(this._commandWindow);
    };
})();
