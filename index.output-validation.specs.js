const { expect } = require("chai");
const circleToPolygon = require("./index.js");
const { expected1, expected2, expected3, expected4, expected5, expected6 } = require("./test-constants");

describe("Output verification", () => {
  describe("Polygon should have correct attributes", () => {
    let result;

    beforeEach(() => {
      result = circleToPolygon([16.226412, 58.556493], 138, 3);
    });

    it("should have atribute 'type' with value 'Polygon'", () => {
      expect(result).to.haveOwnProperty("type", "Polygon");
    });

    it("should have atribute 'coordinates' of type 'array'", () => {
      expect(result).to.haveOwnProperty("coordinates");
      expect(result.coordinates).to.be.an("array");
    });

    it("coordinates should be an 'array of an array of arrays' of '2d-points'", () => {
      expect(result.coordinates[0]).to.be.an("array");
      expect(result.coordinates.length).to.equal(1);

      result.coordinates[0].forEach(coordinate => {
        expect(coordinate).to.be.an("array");

        // 2d-point?
        expect(coordinate.length).to.equal(2);
        coordinate.forEach(value => {
          expect(value).to.be.a("number");
        });
      });
    });
  });

  describe("Polygon should have valid coordinates", () => {
    /*
      Not all engins get the same value, so we use rounded values.
      6 decimal points is about 11 cm (true for both lat/lng and 
      geoJSON coordinates).
    */
    describe("Testing trivial points", () => {
      it("should give correct coordinates for point east of GMT, north of equator", () => {
        const coordinates = circleToPolygon([16.226412, 58.556493], 138, 10)
          .coordinates[0];

        const expectedCoordinates = expected1;

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for center in [0, 0]", () => {
        const coordinates = circleToPolygon([0, 0], 13, 12).coordinates[0];

        const expectedCoordinates = expected2;

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for point east of GMT, south of equator", () => {
        const coordinates = circleToPolygon([131.034184, -25.343467], 5000, 32)
          .coordinates[0];

        const expectedCoordinates = expected3;

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for point west of GMT, north of equator", () => {
        const coordinates = circleToPolygon([-121.003331, 66.001764], 50000, 64)
          .coordinates[0];

        const expectedCoordinates = expected4;

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should give correct coordinates for point west of GMT, south of equator", () => {
        const coordinates = circleToPolygon(
          [-75.1299566, -14.7391814],
          5000,
          12
        ).coordinates[0];

        const expectedCoordinates = expected5;

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });

      it("should pass the pentagon test", () => {
        // A pentagon on Pentagon, Virginia
        const coordinates = circleToPolygon([-77.055961, 38.870996], 200, 5)
          .coordinates[0];

        const expectedCoordinates = expected6;

        coordinates.forEach((cord, cordIndex) => {
          cord.forEach((value, valueIndex) => {
            const expectedValue = expectedCoordinates[cordIndex][valueIndex];
            expect(value).to.be.closeTo(expectedValue, 0.00001);
          });
        });
      });
    });

    describe("Testing non-trivial points", () => {
      xit("should return corret circle for center in lat -90", () => {});
      xit("should return corret circle for center in lat 90 ", () => {});
      xit("should return corret circle for center in lng 180 ", () => {});
      xit("should return corret circle for center in lng -180 ", () => {});
      xit("should return corret circle for center in lat 90 lng 180 ", () => {});
      xit("should return corret circle for center in lat 90 lng -180 ", () => {});
      xit("should return corret circle for center in lat -90 lng 180 ", () => {});
      xit("should return corret circle for center in lat -90 lng -180 ", () => {});
    });

    describe("Testing circles crossing the 180th Meridian", () => {
      xit("center's longitude value is close to 180", () => {});
      xit("center's longitude value is close to -180", () => {});
    });

    describe("Testing circles where the north pole is inside the circle's radius", () => {
      xit("test 1", () => {});
      xit("test 2", () => {});
    });

    describe("Testing circles where the south pole is inside the circle's radius", () => {
      xit("test 1", () => {});
      xit("test 2", () => {});
    });
  });
});
