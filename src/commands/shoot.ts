import getPort from "get-port";
import { readConfig } from "../helpers/config";
import { startRenderer } from "../renderer";
import { shoot } from "../shooter";

export async function shootCommand(options: { config?: string }) {
  const config = await readConfig(options.config);
  const port = await getPort();
  const stopRenderer = await startRenderer({
    framework: config.framework,
    projectPath: config.projectPath,
    filePathPattern: config.filePathPattern,
    port,
  });
  await shoot({
    url: `http://localhost:${port}`,
    browserConfig: config.browser,
  });
  await stopRenderer();
}
