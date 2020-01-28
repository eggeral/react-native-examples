describe('Custom Matchers', () => {

  it('should be possible to define matchers like toEqual, etc', () => {

    expect.extend({
      toEqualPerson(actual, expected) {
        const pass = actual.firstName === expected.firstName && actual.surname === expected.surname;

        if (pass) {
          return {
            message: () =>
              "Expected { firstName: " + actual.firstName + ", surname: " + actual.surname + " } " +
              "not to be the same person as firstName: " + expected.firstName + ", surname: " + expected.surname + " }",
            pass: true,
          };
        } else {
          return {
            message: () =>
              "Expected { firstName: " + actual.firstName + ", surname: " + actual.surname + " } " +
              "to be the same person as firstName: " + expected.firstName + ", surname: " + expected.surname + " }",
            pass: false,
          };
        }
      },
    });

    expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).toEqualPerson({ firstName: 'Max', surname: 'Muster', phoneNumber: 5678 });
    expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).not.toEqualPerson({ firstName: 'Tom', surname: 'Muster', phoneNumber: 5678 });

    // uncomment to see the custom messages
    expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).toEqualPerson({ firstName: 'Tom', surname: 'Muster', phoneNumber: 5678 });
    expect({ firstName: 'Max', surname: 'Muster', phoneNumber: 1234 }).not.toEqualPerson({ firstName: 'Max', surname: 'Muster', phoneNumber: 5678 });

  });

})