describe("Gilded Rose", function() {

  it("should reduce quality and sell_in for normal items", function() {
    items = [ new Item("Normal Item", 10, 20) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(19);
  });

  it("should increase quality for Aged Brie", function() {
    items = [ new Item("Aged Brie", 10, 20) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(21);
  });

  it("should not increase quality of Aged Brie above 50", function() {
    items = [ new Item("Aged Brie", 10, 50) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(50);
  });

});
