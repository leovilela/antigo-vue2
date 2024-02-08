import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

function requireAll(requireContext) {
  requireContext.keys().filter(filename => filename.match(/(\.vue)/gi)).forEach((fileName) => {
    const componentConfig = requireContext(fileName);
    if (fileName.includes("index")) {
      return;
    }
    const componentName = `Base-${upperFirst(`${
      camelCase(fileName.replace(/^\.\/(\w+)/, "").replace(/\.\w+$/, ""))}`)}`;

    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}

requireAll(require.context("~/components/atomic/atoms", true, /Base[\w-]+/));
requireAll(require.context("~/components/atomic/molecules", true, /Base[\w-]+/));
requireAll(require.context("~/components/atomic/organisms", true, /Base[\w-]+/));
