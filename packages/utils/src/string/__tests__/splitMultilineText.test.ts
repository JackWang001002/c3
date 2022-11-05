import { splitMultilineText } from '../splitMultilineText';

describe('test cases', () => {
  it('splitMultilineText ', () => {
    const text = `
    packages/templates/preact/babel.config.js
    packages/templates/preact/demo.test.js
    packages/templates/pw

    `;
    expect(text).toMatchInlineSnapshot(`
      "
          packages/templates/preact/babel.config.js
          packages/templates/preact/demo.test.js
          packages/templates/pw

          "
    `);
    const array = splitMultilineText(text);
    expect(array.length).toBe(3);
    expect(array).toMatchInlineSnapshot(`
      Array [
        "packages/templates/preact/babel.config.js",
        "packages/templates/preact/demo.test.js",
        "packages/templates/pw",
      ]
    `);
  });
});
