import { initialise } from "./src/initialise";

const run = async () => {
  const client = await initialise();

  console.log(await client.lights());
};

run().catch(error => {
  console.log(error);
});
