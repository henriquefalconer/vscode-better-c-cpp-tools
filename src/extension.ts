import * as vscode from "vscode";

export const activate = (context: vscode.ExtensionContext) => {
  const terminal = vscode.window.createTerminal({
    name: "C/C++",
    hideFromUser: true,
  });

  const disposable = vscode.commands.registerCommand(
    "better-c-cpp-tools.execInTerminal",
    async ({ path }: vscode.Uri = {} as vscode.Uri) => {
      if (!path) {
        await vscode.commands.executeCommand("copyFilePath");

        path = await vscode.env.clipboard.readText();
      }

      const dirPath = path.replace(/\/[^\/]*$/, "");

      terminal.show(true);
      terminal.sendText(`cd ${dirPath} && cpprun`);
    }
  );

  context.subscriptions.push(disposable);
};
