import {assert} from "chai";
import {test} from "mocha";

test("my test", () => {
  const x = 1;
  assert.equal(x, 1);
  const s = 'Hello  this is   a test';
  const array = s.split(/\W+/)
  assert.equal(array.length, 5);
})
