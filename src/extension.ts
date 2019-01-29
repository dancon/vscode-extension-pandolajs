// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "pandolajs" is now active!');

	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	let disposable = vscode.commands.registerCommand('catCoding.start', () => {
		const columnToShowIn = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		if (currentPanel) {
			currentPanel.reveal(columnToShowIn);
		} else {
			currentPanel = vscode.window.createWebviewPanel(
				'catCoding',
				'Cat Coding',
				columnToShowIn || vscode.ViewColumn.One,
				{}
			);
		}

		// 设置 panel 的内容
		currentPanel.webview.html = getWebviewContent('https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif');

		currentPanel.onDidDispose(
			() => {
				currentPanel = undefined;
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent (cat: string) {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cat Coding</title>
			</head>
			<body>
				<h1>Cat Coding</h1>
				<img src="${cat}" width="300" />
			</body>
		</html>
	`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
