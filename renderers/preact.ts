import * as Preact from "preact";

export async function renderScreenshots(
  components: Array<
    [
      string,
      Preact.ComponentType<{}> & {
        beforeScreenshot?: (element: HTMLElement) => Promise<void>;
      }
    ]
  >,
  Wrapper: Preact.ComponentType<{}> | null
) {
  Wrapper ||= Preact.Fragment;
  const root = document.getElementById("root")!;
  for (const [name, Component] of components) {
    root.innerHTML = "";
    try {
      Preact.render(
        Preact.createElement(Wrapper, {}, Preact.createElement(Component, {})),
        root
      );
      if (Component.beforeScreenshot) {
        await Component.beforeScreenshot(root);
      }
    } catch (e) {
      root.innerHTML = `<pre class="viteshot-error">${e.stack || e}</pre>`;
    }
    await window.__takeScreenshot__(name);
    Preact.render(null, root);
  }
}
