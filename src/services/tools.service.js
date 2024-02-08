import Printd from "printd";

export class ToolsService {
  constructor() {
    this.printer = new Printd();
  }

  printComponent(element, css) {
    let styles = [css];

    if (Array.isArray(css)) {
      styles = [...css];
    }

    this.printer.print(element, styles);
  }
}
