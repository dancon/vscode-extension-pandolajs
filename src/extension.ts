import * as vscode from 'vscode';
import * as path from 'path';

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
			{
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'resources')),
					vscode.Uri.file(path.join(context.extensionPath, 'src'))
				]
			}
		);

		const pandolaLogo = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'pandora.png'));
		const pandolaLogoPath = pandolaLogo.with({
			scheme: 'vscode-resource'
		});

		const style = vscode.Uri.file(path.join(context.extensionPath, 'src', 'extension.css'));
		const stylePath = style.with({
			scheme: 'vscode-resource'
		});

		panel.webview.html = getWebviewContent({
			cat: cats['Coding Cat'],
			logo: pandolaLogoPath,
			style: stylePath
		});

		const updateWebviewForCat = (cat: keyof typeof cats) => {
			panel.title = cat;
			panel.webview.html = getWebviewContent({
				cat: cats[cat],
				logo: pandolaLogoPath,
				style: stylePath
			});
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

function getWebviewContent ({ cat, logo, style }: {cat: string, logo?: vscode.Uri, style?: vscode.Uri}) {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="${style}"></link>
				<title>Cat Coding</title>
			</head>
			<body>
				<img src="${logo}" width="108" />
				<h1 class="text">Cat Coding</h1>
				<img src="${cat}" width="300" />
			</body>
		</html>
	`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
