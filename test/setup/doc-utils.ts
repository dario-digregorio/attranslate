import { readUtf8File, writeUf8File } from "../../src/util/util";
export const helpRef = "test-assets/help_reference.txt";

export function readHelpReference(): string {
  return readUtf8File(helpRef);
}

export function replaceReadme(search: string, replace: string) {
  const oldReadme = readUtf8File("README.md");
  const newReadme = oldReadme.replace(search, replace);
  writeUf8File("README.md", newReadme);
}
