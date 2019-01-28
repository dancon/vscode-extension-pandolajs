// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "pandolajs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('catCoding.start', () => {
		// 创建一个 webview
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		);

		// 设置 panel 的内容
		panel.webview.html = getWebviewContent('https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif');

		const timeId = setTimeout(() => {
			panel.dispose();
		}, 5000);

		panel.onDidDispose(
			() => {
				console.log('Webview 销毁了');
				clearTimeout(timeId);
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
