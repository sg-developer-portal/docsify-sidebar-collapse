/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://mock-documentation-site.com/docs/slug/foo"}
 */

import { describe, test, expect } from "@jest/globals";

import { parseUrl } from "../src/lib/url";

const basePath = "/docs/slug/";

// Assuming that the current URL pathname is "/docs/slug/foo"
const absoluteUrls = {
  "/": `${basePath}`,
  "/foo": `${basePath}foo`,
  "/foo/bar": `${basePath}foo/bar`,
} as { [key: string]: string };

const relativeUrls = {
  "./bar": `${basePath}foo/bar`,
  "./foo": `${basePath}foo/foo`,
  "../bar": `${basePath}bar`,
  "../bar/foo": `${basePath}bar/foo`,
} as { [key: string]: string };

const trailingUrls = {
  "./foo.md": `${basePath}foo/foo`,
  "../foo.md": `${basePath}foo`,
  "/docs/foo.md": `${basePath}docs/foo`,
  "/docs/bar/foo.md": `${basePath}docs/bar/foo`,
  "burger.md": `${basePath}foo/burger`,
} as { [key: string]: string };

describe("link unit tests", () => {
  test("resolves absolute paths correctly", () => {
    for (const href of Object.keys(absoluteUrls)) {
      const resolvedUrl = absoluteUrls[href];

      const parsedUrl = parseUrl(href, basePath);

      expect(parsedUrl).toBe(resolvedUrl);
    }
  });
  test("resolves relative paths correctly", () => {
    for (const href of Object.keys(relativeUrls)) {
      const resolvedUrl = relativeUrls[href];

      const parsedUrl = parseUrl(href, basePath);

      expect(parsedUrl).toBe(resolvedUrl);
    }
  });
  test("resolves paths with trailing '.md' correctly", () => {
    for (const href of Object.keys(trailingUrls)) {
      const resolvedUrl = trailingUrls[href];

      const parsedUrl = parseUrl(href, basePath);

      expect(parsedUrl).toBe(resolvedUrl);
    }
  });
});
