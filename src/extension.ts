// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let workbench = vscode.workspace.getConfiguration("workbench");
	let isDark: boolean;
	let myStatusBar: vscode.StatusBarItem;

	function getCurrMode() {
		let currColorTheme = vscode.window.activeColorTheme;
		if (currColorTheme.kind === 2){
			isDark = true;
		}
		else {
			isDark = false;
		}
	}

	function switchColorTheme(): void {
		let defaultTheme = vscode.workspace.getConfiguration("darkmodeswitch.defaultTheme");
		if (isDark) {
			workbench.update("colorTheme", defaultTheme.get("light"), true);
			vscode.window.showInformationMessage("Switch to light mode");
		}
		else {
			workbench.update("colorTheme", defaultTheme.get("dark"), true);
			vscode.window.showInformationMessage("Switch to dark mode");
		}
	}

	function updateStatusBar(): void {
		if (isDark) {
			myStatusBar.tooltip = 'Ligth Mode';
		}
		else{ 
			myStatusBar.tooltip = 'Dark Mode';
		}
	}
	
	let switchTheme = vscode.commands.registerCommand('darkmodeswitch.switchtheme', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		getCurrMode();
		switchColorTheme();
		updateStatusBar();
	});

	myStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBar.text = `$(color-mode)`;
	myStatusBar.command = 'darkmodeswitch.switchtheme';
	getCurrMode();
	updateStatusBar();
	myStatusBar.show();
	context.subscriptions.push(switchTheme, myStatusBar);
}

// this method is called when your extension is deactivated
export function deactivate() {}
