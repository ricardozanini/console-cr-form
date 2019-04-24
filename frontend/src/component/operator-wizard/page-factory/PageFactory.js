import { Page } from "./Page";

/**
 * Factory responsible for creating pages based on the JSON loaded in memory.
 */
export class PageFactory {
  static newInstances(pageDefs, jsonSchema) {
    var pages = [];
    if (pageDefs !== undefined && pageDefs !== null && pageDefs !== "") {
      pageDefs.forEach((page, pageNumber) => {
        pages.push(new Page({ pageDef: page, jsonSchema, pageNumber }));
      });
    }

    return pages;
  }
}
