const { expect } = require("chai");
const { getLatBetweenPoints, makeValidCoordinate } = require("./helpers.js");

describe("hepler functions", () => {
  describe("getLatBetweenPoints should find middle lat", () => {
    it("passes simple point 1", () => {
      const x = [179, 0];
      const y = [181, 2];

      expect(getLatBetweenPoints(x, y)).to.equal(1);
    });

    it("passes simple point 2", () => {
      const x = [179, 0];
      const y = [181, 3];

      expect(getLatBetweenPoints(x, y)).to.equal(1.5);
    });

    it("passes simple point 3", () => {
      const x = [179, 0];
      const y = [181, 2];

      expect(getLatBetweenPoints(y, x)).to.equal(1);
    });

    it("passes simple point 4", () => {
      const x = [-179, 0];
      const y = [-181, 2];

      expect(getLatBetweenPoints(x, y)).to.equal(1);
    });

    it("passes simple point 5", () => {
      const x = [-179, 0];
      const y = [-181, 3];

      expect(getLatBetweenPoints(x, y)).to.equal(1.5);
    });
  });

  describe.only("make valid point", () => {
    describe("Too big lat values", () => {
      describe("", () => {
        // TODO: [180, x] and [-180, x] are both the same point.
        // Check if there are cases where only one is correct for our application.
        it("Test 01", () => {
          expect(makeValidCoordinate([0, 91])).to.deep.eq([180, 89]);
        });
        it("Test: 02", () => {
          expect(makeValidCoordinate([0, 100])).to.deep.eq([180, 80]);
        });
        it("Test: 03", () => {
          expect(makeValidCoordinate([0, 179])).to.deep.eq([180, 1]);
        });
        it("Test: 04", () => {
          // Spceial
          expect(makeValidCoordinate([0, 180])).to.deep.eq([180, 0]);
        });
        it("Test: 05", () => {
          expect(makeValidCoordinate([0, 181])).to.deep.eq([180, -1]);
        });
        it("Test: 06", () => {
          expect(makeValidCoordinate([0, 196])).to.deep.eq([180, -16]);
        });
        it("Test: 07", () => {
          expect(makeValidCoordinate([0, 269])).to.deep.eq([180, -89]);
        });
        it("Test: 08", () => {
          // Special because any lng value could be considered correct...
          expect(makeValidCoordinate([0, 270])[1]).to.equal(-90);
        });
        it("Test: 09", () => {
          expect(makeValidCoordinate([0, 271])).to.deep.eq([0, -89]);
        });
        it("Test: 10", () => {
          expect(makeValidCoordinate([0, 359])).to.deep.eq([0, -1]);
        });
        it("Test: 11", () => {
          expect(makeValidCoordinate([0, 360])).to.deep.eq([0, 0]);
        });
        xit("Test: 12", () => {
          expect(makeValidCoordinate([0, 361])).to.deep.eq([0, 1]);
        });
        xit("Test: 13", () => {
          expect(makeValidCoordinate([0, 380])).to.deep.eq([0, 20]);
        });
        xit("Test: 14", () => {
          expect(makeValidCoordinate([0, 449])).to.deep.eq([0, 89]);
        });
        xit("Test: 15", () => {
          expect(makeValidCoordinate([0, 450])).to.deep.eq([0, 90]);
        });
        xit("Test: 16", () => {
          expect(makeValidCoordinate([0, 451])).to.deep.eq([180, 89]);
        });
      });
    });
  });
});
