import { initialise } from "./src/initialise";

const run = async () => {
  const client = await initialise();

  const scenes = await client.scenes();
};

run().catch(error => {
  console.log(error);
});
