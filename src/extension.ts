import * as vscode from "vscode";
import * as ts from "typescript";

// Define a function that recursively traverses the AST and generates the list of paths to each nested key
function getPaths(node: ts.Node, parentKey?: string): string[] {
  let paths: string[] = [];

  if (ts.isObjectLiteralExpression(node)) {
    node.properties.forEach((prop) => {
      const currentKey = parentKey
        ? `${parentKey}.${prop.name.text}`
        : prop.name.text;
      paths.push(currentKey);

      if (ts.isObjectLiteralExpression(prop.initializer)) {
        paths = paths.concat(getPaths(prop.initializer, currentKey));
      }
    });
  }

  return paths;
}

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

        // Define the compiler options
        const options: ts.CompilerOptions = {
          target: ts.ScriptTarget.ES2015,
          module: ts.ModuleKind.CommonJS,
          allowJs: true,
        };

        // Create a TypeScript program with the store.js file and the compiler options
        const program = ts.createProgram([storeFilePath], options);

        // Get the default export symbol from the store.js file
        const sourceFile = program.getSourceFile(storeFilePath);

        // Get the AST node of the default export object
        const defaultExportNode = sourceFile?.statements[0].expression;

        // Use the getPaths function to generate the list of paths to each nested key of the default export object
        const paths = getPaths(defaultExportNode!, undefined);

        // Log the list of paths
        console.log(paths);

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
