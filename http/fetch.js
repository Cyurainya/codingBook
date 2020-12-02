async function getUsers(names) {
  let jobs = [];
  for (let name in names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      (successResponse) => {
        if (successResponse.status !== 200) {
          return null;
        } else {
          return seccessResponse.json();
        }
      },
      (failResponse) => {
        return null;
      }
    );
    let results = await Promise.all(jobs);
    return results;
  }
}
