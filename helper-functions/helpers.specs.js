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
    describe("Second quadrant", () => {
      describe("fixes too big lat values", () => {
        it("Test 1a", () => {
          expect(makeValidCoordinate([0, 91])).to.deep.eq([180, 89]);
        });

        it("Test 1b", () => {
          expect(makeValidCoordinate([180, 91])).to.deep.eq([0, 89]);
        });

        it("Test 1c", () => {
          expect(makeValidCoordinate([-180, 91])).to.deep.eq([0, 89]);
        });

        it("Test 2a", () => {
          expect(makeValidCoordinate([0, 180])).to.deep.eq([180, 0]);
        });

        it("Test 2b", () => {
          expect(makeValidCoordinate([180, 180])).to.deep.eq([0, 0]);
        });

        it("Test 2c", () => {
          expect(makeValidCoordinate([-180, 180])).to.deep.eq([0, 0]);
        });

        it("Test 3a", () => {
          expect(makeValidCoordinate([0, 179])).to.deep.eq([180, 1]);
        });

        it("Test 3b", () => {
          expect(makeValidCoordinate([180, 179])).to.deep.eq([0, 1]);
        });

        it("Test 3c", () => {
          expect(makeValidCoordinate([-180, 179])).to.deep.eq([0, 1]);
        });

        it("Test 4", () => {
          expect(makeValidCoordinate([18, 95])).to.deep.eq([-162, 85]);
        });

        it("Test 5", () => {
          expect(makeValidCoordinate([140, 140])).to.deep.eq([-40, 40]);
        });

        it("Test 6", () => {
          expect(makeValidCoordinate([-150, 160])).to.deep.eq([30, 20]);
        });

        it("Test 7", () => {
          expect(makeValidCoordinate([-20, 179])).to.deep.eq([160, 1]);
        });
      });

      xdescribe("fixes too small lat values", () => {
        it("Test 1", () => {
          expect(makeValidCoordinate([0, -180])).to.deep.eq([-180, 0]);
        });

        it("Test 2", () => {
          expect(makeValidCoordinate([0, -270])).to.deep.eq([180, 90]);
        });

        it("Test 3", () => {
          expect(makeValidCoordinate([180, -180])).to.deep.eq([0, 79]);
        });

        it("Test 4", () => {
          expect(makeValidCoordinate([180, -270])).to.deep.eq([0, 1]);
        });

        it("Test 5", () => {
          expect(makeValidCoordinate([18, -181])).to.deep.eq([-162, 1]);
        });

        it("Test 6", () => {
          expect(makeValidCoordinate([-20, 200])).to.deep.eq([160, 1]);
        });
      });
    });

    describe("Third quadrant", () => {
      describe("fixes too small lat values", () => {
        it("Test 1a", () => {
          expect(makeValidCoordinate([0, -91])).to.deep.eq([180, -89]);
        });

        it("Test 1b", () => {
          expect(makeValidCoordinate([180, -91])).to.deep.eq([0, -89]);
        });

        it("Test 1c", () => {
          expect(makeValidCoordinate([-180, -91])).to.deep.eq([0, -89]);
        });

        it("Test 2a", () => {
          const actual = makeValidCoordinate([0, -180]);
          expect(actual[1]).to.eq(0);
          expect(actual[0] === 180 || actual[0] === -180).to.equal(true);
        });

        it("Test 2b", () => {
          expect(makeValidCoordinate([180, -180])).to.deep.eq([0, 0]);
        });

        it("Test 2c", () => {
          expect(makeValidCoordinate([-180, -180])).to.deep.eq([0, 0]);
        });

        it("Test 1", () => {
          expect(makeValidCoordinate([0, -95])).to.deep.eq([180, -85]);
        });

        it("Test 2", () => {
          expect(makeValidCoordinate([0, -180])).to.deep.eq([180, 0]);
        });

        it("Test 3", () => {
          expect(makeValidCoordinate([180, -101])).to.deep.eq([0, -79]);
        });

        it("Test 4", () => {
          expect(makeValidCoordinate([180, -179])).to.deep.eq([0, -1]);
        });

        it("Test 5", () => {
          expect(makeValidCoordinate([18, -179])).to.deep.eq([-162, -1]);
        });

        it("Test 6", () => {
          expect(makeValidCoordinate([-20, -178])).to.deep.eq([160, -2]);
        });
      });
    });
  });
});
