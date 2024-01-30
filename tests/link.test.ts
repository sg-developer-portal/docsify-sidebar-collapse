/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://mock-documentation-site.com/docs/slug/foo"}
 */

import { describe, test, expect } from "@jest/globals";

import { parseUrl, isActiveLinkToken } from "../src/lib/url";
import { Tokens } from "marked";

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

  test("detects if link is active correctly", () => {
    // link with query
    isActiveLinkToken(
      { href: "/product/document" } as Tokens.Link,
      new URL("https://website.com/docs/product/document?id=header")
    );

    // link with hash
    isActiveLinkToken(
      { href: "/product/document" } as Tokens.Link,
      new URL("https://website.com/docs/product/document#header")
    );
  });
});
