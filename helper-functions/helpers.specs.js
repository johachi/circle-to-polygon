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

  describe("make valid point", () => {
    describe("Should not change valid points", () => {
      it("Test: 01", () => {
        expect(makeValidCoordinate([180, -90])).to.deep.eq([180, -90]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([-180, -89.999999])).to.deep.eq([
          -180,
          -89.999999
        ]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([179.999999, -50.595957])).to.deep.eq([
          179.999999,
          -50.595957
        ]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([-179.999999, -0.000001])).to.deep.eq([
          -179.999999,
          -0.000001
        ]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([0, 0])).to.deep.eq([0, 0]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([134, 0.000001])).to.deep.eq([
          134,
          0.000001
        ]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([34, 34])).to.deep.eq([34, 34]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([150, -89.999999])).to.deep.eq([
          150,
          -89.999999
        ]);
      });
      it("Test: 01", () => {
        expect(makeValidCoordinate([40, 90])).to.deep.eq([40, 90]);
      });
    });

    describe("Should fix too big lat values", () => {
      describe("First Quadrant", () => {
        it("Test: 01", () => {
          expect(makeValidCoordinate([0, 360])).to.deep.eq([0, 0]);
        });
        it("Test: 02", () => {
          expect(makeValidCoordinate([0, 360 * 9])).to.deep.eq([0, 0]);
        });
        it("Test: 03", () => {
          expect(makeValidCoordinate([10, 361])).to.deep.eq([10, 1]);
        });
        it("Test: 04", () => {
          expect(makeValidCoordinate([54.2736, 361 + 360 * 5])).to.deep.eq([
            54.2736,
            1
          ]);
        });
        it("Test: 05", () => {
          expect(makeValidCoordinate([45.43, 380])).to.deep.eq([45.43, 20]);
        });
        it("Test: 06", () => {
          expect(makeValidCoordinate([-99, 380 + 360 * 6])).to.deep.eq([
            -99,
            20
          ]);
        });
        it("Test: 07", () => {
          expect(makeValidCoordinate([-148, 449])).to.deep.eq([-148, 89]);
        });
        it("Test: 08", () => {
          expect(makeValidCoordinate([0, 449 + 360 * 17])).to.deep.eq([0, 89]);
        });
      });
      describe("Second Quadrant", () => {
        it("Test: 01", () => {
          expect(makeValidCoordinate([0, 90 + 360 * 7])).to.deep.eq([0, 90]);
        });
        it("Test: 02", () => {
          expect(makeValidCoordinate([0, 91])).to.deep.eq([180, 89]);
        });
        it("Test: 03", () => {
          expect(makeValidCoordinate([5, 91 + 360 * 5])).to.deep.eq([-175, 89]);
        });
        it("Test: 04", () => {
          expect(makeValidCoordinate([-79, 100])).to.deep.eq([101, 80]);
        });
        it("Test: 05", () => {
          expect(makeValidCoordinate([0, 100 + 360 * 8])).to.deep.eq([180, 80]);
        });
        it("Test: 06", () => {
          expect(makeValidCoordinate([0, 179])).to.deep.eq([180, 1]);
        });
        it("Test: 07", () => {
          expect(makeValidCoordinate([-180, 179 + 360 * 11])).to.deep.eq([
            0,
            1
          ]);
        });
      });

      describe("Third Quadrant", () => {
        it("Test: 01", () => {
          expect(makeValidCoordinate([0, 180])).to.deep.eq([180, 0]);
        });
        it("Test: 02", () => {
          expect(makeValidCoordinate([24, 180 + 360 * 3])).to.deep.eq([
            -156,
            0
          ]);
        });
        it("Test: 03", () => {
          expect(makeValidCoordinate([-35, 181])).to.deep.eq([145, -1]);
        });
        it("Test: 04", () => {
          expect(makeValidCoordinate([0, 181 + 360 * 9])).to.deep.eq([180, -1]);
        });
        it("Test: 05", () => {
          expect(makeValidCoordinate([0, 196])).to.deep.eq([180, -16]);
        });
        it("Test: 06", () => {
          expect(makeValidCoordinate([-99, 196 + 360 * 4])).to.deep.eq([
            81,
            -16
          ]);
        });
        it("Test: 07", () => {
          expect(makeValidCoordinate([0, 269])).to.deep.eq([180, -89]);
        });
        it("Test: 08", () => {
          expect(makeValidCoordinate([69, 269 + 360 * 6])).to.deep.eq([
            -111,
            -89
          ]);
        });
      });

      describe("Forth Quadrant", () => {
        it("Test: 01", () => {
          // Special because any lng value could be considered correct...
          expect(makeValidCoordinate([0, 270])).to.deep.eq([0, -90]);
        });
        it("Test: 02", () => {
          // Special because any lng value could be considered correct...
          expect(makeValidCoordinate([111, 270 + 360 * 6])).to.deep.eq([
            111,
            -90
          ]);
        });
        it("Test: 03", () => {
          expect(makeValidCoordinate([-77.77, 271])).to.deep.eq([-77.77, -89]);
        });
        it("Test: 04", () => {
          expect(makeValidCoordinate([0, 271 + 360])).to.deep.eq([0, -89]);
        });
        it("Test: 05", () => {
          expect(makeValidCoordinate([9.5678, 350])).to.deep.eq([9.5678, -10]);
        });
        it("Test: 06", () => {
          expect(makeValidCoordinate([0, 350 + 360 * 2])).to.deep.eq([0, -10]);
        });
        it("Test: 07", () => {
          expect(makeValidCoordinate([0, 359])).to.deep.eq([0, -1]);
        });
        it("Test: 08", () => {
          expect(makeValidCoordinate([78.76, 359 + 360 * 2])).to.deep.eq([
            78.76,
            -1
          ]);
        });
      });
    });
  });
});
