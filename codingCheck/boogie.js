new Promise((resolve, reject) => {
  throw new Error('Whoops!');
}).catch(console.log); // Error: Whoops!
