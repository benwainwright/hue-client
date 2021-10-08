import { initialise } from "./src/initialise";
import { Bridge } from "./src/bridge";

const run = async () => {
  Bridge.local("foo");
  const client = await initialise();

  const scenes = await client.scenes();
};

run().catch(error => {
  console.log(error);
});
