import { Component, createApp } from "vue";

export async function renderScreenshots(
  components: Array<
    [
      string,
      Component & { beforeScreenshot?: (element: HTMLElement) => Promise<void> }
    ]
  >
) {
  // TODO: Support Wrapper in Vue.
  const root = document.getElementById("root")!;
  for (const [name, component] of components) {
    root.innerHTML = "";
    try {
      createApp(component).mount("#root");
      if (component.beforeScreenshot) {
        await component.beforeScreenshot(root);
      }
    } catch (e) {
      root.innerHTML = `<pre>${e}</pre>`;
    }
    await window.__takeScreenshot__(name);
  }
}
