class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('No property:' + property);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}

function readUser(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }
  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
  return user;
}

try {
  let user = readUser('{"age":25}');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log('Invalid data:' + err.massege);
    console.log(err.name);
    console.log(err.property);
  } else if (er instanceof SyntaxError) {
    console.log('JSON Syntax Error:' + err.message);
  } else {
    throw err;
  }
}
