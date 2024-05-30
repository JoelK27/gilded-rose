class Item {
  constructor(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  }
}

class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      this.updateItem(item);
    }
  }

  updateItem(item) {
    switch (item.name) {
      case 'Aged Brie':
        this.updateAgedBrie(item);
        break;
      case 'Sulfuras, Hand of Ragnaros':
        this.updateSulfuras(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateBackstagePasses(item);
        break;
      default:
        if (item.name.includes('Conjured')) {
          this.updateConjured(item);
        } else {
          this.updateNormalItem(item);
        }
        break;
    }
  }

  updateNormalItem(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
    item.sell_in -= 1;
    if (item.sell_in < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }

  updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
    item.sell_in -= 1;
    if (item.sell_in < 0 && item.quality < 50) {
      item.quality += 1;
    }
  }

  updateSulfuras(item) {
    // Sulfuras does not change
  }

  updateBackstagePasses(item) {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sell_in < 11 && item.quality < 50) {
        item.quality += 1;
      }
      if (item.sell_in < 6 && item.quality < 50) {
        item.quality += 1;
      }
    }
    item.sell_in -= 1;
    if (item.sell_in < 0) {
      item.quality = 0;
    }
  }

  updateConjured(item) {
    if (item.quality > 0) {
      item.quality -= 2;
    }
    item.sell_in -= 1;
    if (item.sell_in < 0 && item.quality > 0) {
      item.quality -= 2;
    }
  }
}

// Initialisierung der Items
const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

// Instanz der GildedRose Klasse erstellen und Qualität aktualisieren
const gildedRose = new GildedRose(items);
gildedRose.updateQuality();
