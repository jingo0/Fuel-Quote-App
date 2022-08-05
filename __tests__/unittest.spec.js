/**
 * @jest-environment jsdom
 */

const unittest = require("../public/main.js");

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(true)
}));



// describe("Unit Test", () => {
//     test('Login should return true', async () => {
//         var res = await login("jdbfkjvbkaf", "dhvkdvjkdf", true)
//         // console.log(res)
//         expect(res).toBe(true)
//     })
// });

it('getQuote()', async () => {
    
    const data = await unittest.getQuote('3', '2022-10-05', true);
    expect(data).toBe(true);
  });

it('getQuote(without)', async () => {
    
    const data = await unittest.getQuote('', '2022-10-05', true);
    expect(data).toBe(false);
  });

it('getQuote(without date)', async () => {
    
    const data = await unittest.getQuote('3', '', true);
    expect(data).toBe(false);
  });

it('Login()', async () => {
    
    const data = await unittest.login("jdbfkjvbkaf", "dhvkdvjkdf", true);
    expect(data).toBe(true);
} );

it('Login(without username)', async () => {
    
    const data = await unittest.login("", "dhvkdvjkdf", true);
    expect(data).toBe(false);
} );

it('Login(without password)', async () => {
    
    const data = await unittest.login("jdbfkjvbkaf", "", true);
    expect(data).toBe(false);
} );

it('register()', async () => {
    
    const data = await unittest.register("jdbfkjvbkaf", "dhvkdvjkdf", true)
    expect(data).toBe(true);
} );

it('register(without username)', async () => {
    
    const data = await unittest.register("", "dhvkdvjkdf", true)
    expect(data).toBe(false);
} );

it('register(without password)', async () => {
    
    const data = await unittest.register("jdbfkjvbkaf", "", true)
    expect(data).toBe(false);
} );

it('profile()', async () => {
    
    const data = await unittest.profile("mr. bean", "5400 university of houston","main st.", "Houston", "TX", "77001", true)
    expect(data).toBe(true);
} );

it('profile(without full name)', async () => {
    
    const data = await unittest.profile("", "5400 university of houston","main st.", "Houston", "TX", "77001", true)
    expect(data).toBe(false);
} );

it('profile(without address1)', async () => {
    
    const data = await unittest.profile("mr. bean", "","main st.", "Houston", "TX", "77001", true)
    expect(data).toBe(false);
} );

it('profile(without city)', async () => {
    
    const data = await unittest.profile("mr. bean", "5400 university of houston","main st.", "", "TX", "77001", true)
    expect(data).toBe(false);
} );

it('profile(without state)', async () => {
    
    const data = await unittest.profile("mr. bean", "5400 university of houston","main st.", "Houston", "", "77001", true)
    expect(data).toBe(false);
} );

it('profile(without zipcode)', async () => {
    
    const data = await unittest.profile("mr. bean", "5400 university of houston","main st.", "Houston", "TX", "", true)
    expect(data).toBe(false);
} );

it('profile(wrong zipcode)', async () => {
    
    const data = await unittest.profile("mr. bean", "5400 university of houston","main st.", "Houston", "TX", "741", true)
    expect(data).toBe(false);
} );

it('regProfile()', async () => {
    
    const data = await unittest.regProfile("mr. bean", "5400 university of houston","main st.", "Houston", "TX", "77001", true)
    expect(data).toBe(true);
} );

it('regProfile(without full name)', async () => {
    
    const data = await unittest.regProfile("", "5400 university of houston","main st.", "Houston", "TX", "77001", true)
    expect(data).toBe(false);
} );

it('regProfile(without address1)', async () => {
    
    const data = await unittest.regProfile("mr. bean", "","main st.", "Houston", "TX", "77001", true)
    expect(data).toBe(false);
} );

it('regProfile(without city)', async () => {
    
    const data = await unittest.regProfile("mr. bean", "5400 university of houston","main st.", "", "TX", "77001", true)
    expect(data).toBe(false);
} );

it('regProfile(without state)', async () => {
    
    const data = await unittest.regProfile("mr. bean", "5400 university of houston","main st.", "Houston", "", "77001", true)
    expect(data).toBe(false);
} );

it('regProfile(without zipcode)', async () => {
    
    const data = await unittest.regProfile("mr. bean", "5400 university of houston","main st.", "Houston", "TX", "", true)
    expect(data).toBe(false);
} );

it('regProfile(wrong zipcode)', async () => {
    
    const data = await unittest.regProfile("mr. bean", "5400 university of houston","main st.", "Houston", "TX", "0000000000", true)
    expect(data).toBe(false);
} );

it('getTotalAmount()', async () => {
    
    const data = await unittest.getTotalAmount(2.59, 250)
    expect(data).toBe(647.5);
} );

it('getSuggestedPrice()', async () => {
    
    const data = await unittest.getSuggestedPrice('TX', true, 500)
    expect(data).toBe(1.71);
} );

it('getSuggestedPrice()', async () => {
    
    const data = await unittest.getSuggestedPrice('NY', false, 1500)
    expect(data).toBe(1.74);
} );


it('checkIfgreaterOrEqual(correct date)',  () => {
    
    const data = unittest.checkIfgreaterOrEqual('2022-10-05')
    expect(data).toBe(true);
} );

it('checkIfgreaterOrEqual(wrong date)',  () => {
    
    const data = unittest.checkIfgreaterOrEqual('2021-10-05')
    expect(data).toBe(false);
} );
