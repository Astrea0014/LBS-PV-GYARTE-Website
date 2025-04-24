import { randomInt } from "node:crypto";

// Method 1: Random from character sets.

const character_sets = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "1234567890",
  "!#%&/=?+€@£$"
];

export async function GenerateRandomPassword(): Promise<string> {
  // 1. Determine how many of each kind of character should be present.
  
  const count = [0, 0, 0, 0];
  count[0] = 3 + randomInt(0, 3);
  count[1] = 3 + randomInt(0, 3);
  count[2] = 8 - count[0];
  count[3] = 8 - count[1];

  // 2. Determine which positions in the password should contain a character from which set.

  const position: number[] = [];

  for (let i = 0; i < 16; i++) {
    let num = randomInt(0, 4);

    if (count[num] === 0) {
      num = 0;

      while (true) {
        if (count[num] !== 0)
          break;
        num++;
      }
    }

    position.push(num);
    count[num]--;
  }

  // 3. Select a random character from each set and insert in the determined slots.

  let ret = "";

  for (let i = 0; i < position.length; i++)
    ret += character_sets[position[i]][randomInt(0, character_sets[position[i]].length)];

  return ret;
}