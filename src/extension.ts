// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const cats = {
	'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
	'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "pandolajs" is now active!');

	let disposable = vscode.commands.registerCommand('catCoding.start', () => {
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		);

		panel.webview.html = getWebviewContent(cats['Coding Cat']);

		const updateWebviewForCat = (cat: keyof typeof cats) => {
			panel.title = cat;
			panel.webview.html = getWebviewContent(cats[cat]);
		};

		panel.onDidChangeViewState((event) => {
			const panel = event.webviewPanel;

			switch (panel.viewColumn) {
				case vscode.ViewColumn.One:
					updateWebviewForCat('Coding Cat');
					break;
				case vscode.ViewColumn.Two:
					updateWebviewForCat('Compiling Cat');
					break;
				case vscode.ViewColumn.Three:
					updateWebviewForCat('Testing Cat');
					break;
			}
		},
		null,
		context.subscriptions);

		panel.onDidDispose(
			() => {
				console.log('Webview 关闭了');
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
