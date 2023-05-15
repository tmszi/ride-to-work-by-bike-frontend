import { getString } from "src/utils";

describe("Unit Test Application Code", function () {
  before(() => {
    // check if the import worked correctly
    expect(getString, "getString").to.be.a("function");
  });
  context("src/utils/utils.js", () => {
    it("get string", function () {
      const str = "Test text";
      expect(getString(str)).to.eq(str);
    });
  });
});
