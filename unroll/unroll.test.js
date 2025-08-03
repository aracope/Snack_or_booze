const unroll = require("./unroll");

describe("#unroll", function () {
  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("correctly unrolls a 4x4 square", function () {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    expect(unroll(square)).toEqual([
      1, 2, 3, 4,
      8, 12, 16, 15,
      14, 13, 9, 5,
      6, 7, 11, 10
    ]);
  });

  it("correctly unrolls a 3x3 square", function () {
    const smallerSquare = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];
    expect(unroll(smallerSquare)).toEqual([
      "a", "b", "c",
      "f", "i", "h",
      "g", "d", "e"
    ]);
  });

  it("correctly unrolls a 2x2 square", function () {
    const tinySquare = [
      [1, 2],
      [3, 4]
    ];
    expect(unroll(tinySquare)).toEqual([1, 2, 4, 3]);
  });

  it("correctly unrolls a 1x1 square", function () {
    const one = [[42]];
    expect(unroll(one)).toEqual([42]);
  });

  it("handles an empty matrix", function () {
    const empty = [[]];
    expect(unroll(empty)).toEqual([]);
  });

  it("correctly unrolls a 5x5 square", function () {
    const fiveByFive = [
      [1, 2, 3, 4, 5],
      [16, 17, 18, 19, 6],
      [15, 24, 25, 20, 7],
      [14, 23, 22, 21, 8],
      [13, 12, 11, 10, 9]
    ];
    expect(unroll(fiveByFive)).toEqual([
      1, 2, 3, 4, 5,
      6, 7, 8, 9, 10,
      11, 12, 13, 14, 15,
      16, 17, 18, 19, 20,
      21, 22, 23, 24, 25
    ]);
  });
});