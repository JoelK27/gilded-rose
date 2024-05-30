describe("Gilded Rose", function() {
  let gildedRose;

  beforeEach(function() {
    gildedRose = new GildedRose();
  });

  it("should reduce quality and sell_in for normal items", function() {
    const items = [ new Item("Normal Item", 10, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(19);
  });

  it("should increase quality for Aged Brie", function() {
    const items = [ new Item("Aged Brie", 10, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(21);
  });

  it("should not increase quality of Aged Brie above 50", function() {
    const items = [ new Item("Aged Brie", 10, 50) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(50);
  });

  it("should not decrease quality of Sulfuras", function() {
    const items = [ new Item("Sulfuras, Hand of Ragnaros", 10, 80) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(10);
    expect(items[0].quality).toEqual(80);
  });

  it("should increase quality of Backstage passes as sell_in approaches", function() {
    const items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(14);
    expect(items[0].quality).toEqual(21);
  });

  it("should increase quality by 2 when there are 10 days or less for Backstage passes", function() {
    const items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(22);
  });

  it("should increase quality by 3 when there are 5 days or less for Backstage passes", function() {
    const items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(23);
  });

  it("should drop quality to 0 after the concert for Backstage passes", function() {
    const items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it("should degrade quality twice as fast after sell_in for normal items", function() {
    const items = [ new Item("Normal Item", 0, 20) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(18);
  });

  it("should not decrease quality below 0", function() {
    const items = [ new Item("Normal Item", 10, 0) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(0);
  });

  it("should handle Conjured items degrading in quality twice as fast", function() {
    const items = [ new Item("Conjured Mana Cake", 3, 6) ];
    gildedRose.items = items;
    gildedRose.updateQuality();
    expect(items[0].sell_in).toEqual(2);
    expect(items[0].quality).toEqual(4);
  });

});
