import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider(
    "php",
    {
      async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        // get all text until the `position` and check if it reads `console.`
        // and if so then complete if `log`, `warn`, and `error`
        const linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character);
        if (!/data-wp-[\w.]+=$/.test(linePrefix)) {
          return undefined;
        }

        const uri = document.uri;
        // Get the path to the directory containing the document
        const dir = uri.path.substring(0, uri.path.lastIndexOf("/"));
        const storeFilePath = dir + "/store.js";

        // Here we should use TSC to get the file and parse it

        return [
          new vscode.CompletionItem(
            "hello hello",
            vscode.CompletionItemKind.Method
          ),
        ];
      },
    },
    "=" // triggered whenever a '.' is being typed
  );

  context.subscriptions.push(provider);
}
