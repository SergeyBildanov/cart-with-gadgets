import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Gadget from '../domain/Gadget';
test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});
test("movie adding to the cart", () => {
  const cart = new Cart();

  const movie = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  cart.add(movie);
  expect(cart.items.length).toBe(1);
})
test("gadget adding to the cart", () => {
  const cart1 = new Cart();

  const gadget = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart1.add(gadget);
  expect(cart1.items[0]).toEqual(gadget);
})

test("amount of added gadget to the cart", () => {
  const cart1 = new Cart();

  const gadget = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart1.add(gadget);
  expect(cart1.items[0].amount).toBe(1);
})

test("gadget adding to the cart twice", () => {
  const cart1 = new Cart();

  const gadget = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart1.add(gadget);
  cart1.add(gadget);
  expect(cart1.items[0].amount).toBe(2);
})

test("movie adding to the cart twice", () => {
  const cart1 = new Cart();

  const movie = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137)
  cart1.add(movie);
  cart1.add(movie);
  expect(cart1.items[0].amount).toBe(undefined);
})

test("adding to the cart two types", () => {
  const cart1 = new Cart();

  const gadget = new Gadget(1090, "Iphone 15S", 120000, true, []);
  const movie = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  cart1.add(gadget);
  cart1.add(movie);
  expect(cart1.items.length).toEqual(2);
})
test("movie class working", () => {
    const movie = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);

    expect(movie instanceof Movie).toBe(true);
})
test("gadget class working", () => {
  const gadget = new Gadget(1090, "Iphone 15S", 120000, true, []);

  expect(gadget instanceof Gadget).toBe(true);
})

test("cost calculator work without purchase", ()=>{
  const cart = new Cart();

  const gadget1 = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart.add(gadget1);
  cart.add(gadget1);
  expect(cart.withoutPurchase()).toEqual(240000);
})

test("cost calculator of 2 movies work without purchase", ()=>{
  const cart = new Cart();

  const movie1 = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  const movie2 = new Movie(1010, "Avengers 2", "Joss Whedon", 600, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  cart.add(movie1);
  cart.add(movie2);
  expect(cart.withoutPurchase()).toEqual(1100);
})

test("cost calculator work with purchase", ()=>{
  const cart = new Cart();

  const gadget1 = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart.add(gadget1);
  cart.add(gadget1);
  expect(cart.withPurchase(50)).toEqual(240000*(1 - 0.5));
})

test("cost calculator of 2 movies work with purchase", ()=>{
  const cart = new Cart();

  const movie1 = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  const movie2 = new Movie(1010, "Avengers 2", "Joss Whedon", 600, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  cart.add(movie1);
  cart.add(movie2);
  expect(cart.withPurchase(50)).toEqual(1100 * 0.5);
})

test("deleting from cart", ()=>{
  const cart = new Cart();

  const movie = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  cart.add(movie);
  cart.remove(1009);
  expect(cart.items.length).toBe(0);
})

test("decreasing from cart", ()=>{
  const cart = new Cart();

  const gadget1 = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart.add(gadget1);
  cart.add(gadget1);
  cart.decreaseAmount(1090);
  expect(cart.items[0].amount).toBe(1);
})

test("decreasing from cart with deleting", ()=>{
  const cart = new Cart();

  const gadget1 = new Gadget(1090, "Iphone 15S", 120000, true, []);
  cart.add(gadget1);
  cart.add(gadget1);
  cart.decreaseAmount(1090);
  cart.decreaseAmount(1090);
  expect(cart.items.length).toBe(0);
})

test("decreasing from cart movie", ()=>{
  const cart = new Cart();

  const movie = new Movie(1009, "Avengers", "Joss Whedon", 500, 2012, "USA", "Avengens Assemble!", ["фантастика", "боевик", "фэнтези", "приключения"], 137);
  cart.add(movie);
  cart.decreaseAmount(1009);
  expect(cart.items.length).toBe(1);
})


