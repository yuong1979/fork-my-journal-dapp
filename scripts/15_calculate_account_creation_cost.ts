import { Connection, clusterApiUrl } from "@solana/web3.js";
 
(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
 
  // length of data in bytes in the account to calculate rent for
  const dataLength = 1500;
  const rentExemptionAmount =
    await connection.getMinimumBalanceForRentExemption(dataLength);
  console.log({
    rentExemptionAmount,
  });
})();


// https://solana.com/developers/cookbook/accounts/calculate-rent