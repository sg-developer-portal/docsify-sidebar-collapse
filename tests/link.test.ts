/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://mock-documentation-site.com/docs/slug/foo"}
 */

import { describe, test, expect } from "@jest/globals";

import { isActiveLinkToken, parseUrl } from "../src/lib/url";
import { Lexer } from "marked";

import * as fs from "fs";

const basePath = "/docs/slug/";

const urls = {
  "/": `${basePath}`,
  foo: `${basePath}foo`,
  bar: `${basePath}bar`,
  "foo/bar": `${basePath}foo/bar`,
  "/foo": `${basePath}foo`,
  "/foo/bar": `${basePath}foo/bar`,
  "./foo": `${basePath}foo`,
  "./foo/bar": `${basePath}foo/bar`,
  "foo.md": `${basePath}foo`,
  "bar.md": `${basePath}bar`,
  "foo/bar.md": `${basePath}foo/bar`,
  "/foo.md": `${basePath}foo`,
  "/foo/bar.md": `${basePath}foo/bar`,
  "./foo.md": `${basePath}foo`,
  "./foo/bar.md": `${basePath}foo/bar`,
  "../foo": `/docs/foo`,
  "../foo/bar": `/docs/foo/bar`,
  "../foo.md": `/docs/foo`,
  "../foo/bar.md": `/docs/foo/bar`,
} as { [key: string]: string };

describe("link unit tests", () => {
  test("resolves absolute paths correctly", () => {
    for (const href of Object.keys(urls)) {
      const resolvedUrl = urls[href];

      const parsedUrl = parseUrl(href, basePath);

      expect(parsedUrl).toBe(resolvedUrl);
    }
  });

  test("detects if link is active correctly for _sidebard1.md", () => {
    const lexer = new Lexer();
    const markdown = fs.readFileSync("tests/fixtures/_sidebar1.md", "utf-8");
    const tokens = lexer.lex(markdown);
    const listItems = tokens.filter((token) => {
      return token.type === "list" || token.type === "list_item";
    });
    const url =
      " https://docs.developer.tech.gov.sg/docs/cft-support-and-maintenance/upcoming-maintenance";

    const expectedActiveHref = "upcoming-maintenance.md";
    let resultActiveHref;
    let hasMoreThanOneActiveLink = false;

    for (const list of listItems) {
      if (list.type === "list") {
        for (const item of list.items) {
          if (item.type === "list_item") {
            for (const token of item.tokens) {
              if (token.type === "text" && token.tokens) {
                for (const tokentoken of token.tokens) {
                  if (
                    tokentoken.type === "link" &&
                    isActiveLinkToken(tokentoken, new URL(url))
                  ) {
                    if (resultActiveHref) {
                      hasMoreThanOneActiveLink = true;
                    }
                    resultActiveHref = tokentoken.href;
                  }
                }
              }
            }
          }
        }
      }
    }
    expect(resultActiveHref).toBe(expectedActiveHref);
    expect(hasMoreThanOneActiveLink).toBe(false);
  });
});
