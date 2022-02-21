// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import web3, {
  Keypair,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Connection,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

let networkURL: string;
if (process.env.VERCEL_ENV == "production") {
  networkURL = "https://solana-mainnet.phantom.tech";
} else if (
  process.env.VERCEL_ENV == "development" ||
  process.env.VERCEL_ENV == "preview"
) {
  networkURL = "https://api.devnet.solana.com";
}

type Data = {
  store: string;
  user: string;
  signature: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("getone", req, req.body);
  // const requestData: Data = JSON.parse(req.body);
  // console.log("getone", requestData);
  res.status(500);
}

//   const formatPrivateKeyArray = (key) => {           //cannot save the proper array in env vars
//     const csv = key.substring(1, (key.length - 1));   //Removes brackets to make processing correct
//     const array = csv.split(",", 64);
//     return Uint8Array.from(array);
//   }

//   //const priv = "[104,213,157,97,12,35,57,70,55,140,1,116,244,197,247,160,100,167,225,104,196,55,133,10,173,2,140,254,101,62,11,200,243,192,205,174,52,107,211,251,35,85,208,40,26,230,252,136,152,220,57,38,221,6,228,251,43,219,233,112,97,222,251,94]";
//   const jackpotWalletPrivate = formatPrivateKeyArray(process.env.JACKPOT_WALLET_PRIVATE);
//   const tixWalletPrivate = formatPrivateKeyArray(process.env.TIX_WALLET_PRIVATE);  //"[104,213,157,97,12,35,57,70,55,140,1,116,244,197,247,160,100,167,225,104,196,55,133,10,173,2,140,254,101,62,11,200,243,192,205,174,52,107,211,251,35,85,208,40,26,230,252,136,152,220,57,38,221,6,228,251,43,219,233,112,97,222,251,94]"); //
//   // console.log(jackpotWalletPrivate);
//   //console.log(tixWalletPrivate);

//   const jackpotKeyPair = Keypair.fromSecretKey(jackpotWalletPrivate);
//   const tixKeyPair = Keypair.fromSecretKey(tixWalletPrivate);

//   // const requestData = JSON.parse(req.body);
//   const user = new PublicKey(requestData.publicKey)

//   const connection = new Connection(
//     networkURL,
//     'confirmed',
//   );

//   const sendtxn = async (tix: number) => {

//     const tixPublicKey = new PublicKey(process.env.NEXT_PUBLIC_TIX_WALLET);   //Wallet that tix are sent from
//     const mint = new PublicKey(process.env.NEXT_PUBLIC_TIX_ADDR);             //  TIX token address

//     const mintToken = new Token(
//       connection,
//       mint,
//       TOKEN_PROGRAM_ID,
//       tixKeyPair
//     );
//     const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
//       mintToken.associatedProgramId,
//       mintToken.programId,
//       mint,
//       user
//     );
//     let newassociated = associatedDestinationTokenAddr;

//     const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);

//     let from = await Token.getAssociatedTokenAddress(
//       ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
//       TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
//       mint, // mint
//       tixPublicKey// owner
//     );

//     let to = await Token.getAssociatedTokenAddress(
//       ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
//       TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
//       mint, // mint
//       user // owner
//     );
//     const instructions: web3.TransactionInstruction[] = [];
//     if (receiverAccount === null) {
//       instructions.push(
//         Token.createAssociatedTokenAccountInstruction(
//           mintToken.associatedProgramId,
//           mintToken.programId,
//           mint,
//           associatedDestinationTokenAddr,
//           user,
//           tixPublicKey
//         )
//       )
//     }
//     instructions.push(
//       Token.createTransferInstruction(
//         TOKEN_PROGRAM_ID,
//         from,
//         newassociated,
//         tixPublicKey,
//         [tixKeyPair],
//         tix * LAMPORTS_PER_SOL,
//       )
//     )
//     const transaction = new Transaction().add(...instructions);

//     await sendAndConfirmTransaction(
//       connection,
//       transaction,
//       [tixKeyPair],
//     );
//   }

//   const sendJackpot = async () => {

//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: jackpotKeyPair.publicKey,
//         toPubkey: user,
//         lamports: (LAMPORTS_PER_SOL * (requestData.jackpot - 0.002)),
//       }),
//     );
//     await sendAndConfirmTransaction(
//       connection,
//       transaction,
//       [jackpotKeyPair],
//     )
//   }

//   const spin = async () => {
//     if (process.env.VERCEL_ENV == "production") {     //NOTE!!! these must be maintained as same values in runslot.tsx
//       if (requestData.value <= .0002) {
//         await sendJackpot()
//       } else if (requestData.value < .33) {
//         await sendtxn(1)
//       } else if (requestData.value < .57) {
//         await sendtxn(2)
//       } else if (requestData.value < .77) {
//         await sendtxn(3)
//       } else if (requestData.value < .92) {
//         await sendtxn(4)
//       } else if (requestData.value < .99) {
//         await sendtxn(5)
//       } else if (requestData.value <= 1) {
//         await sendtxn(25)
//       }
//       return "sending..."
//     } else if (process.env.VERCEL_ENV == "development" || process.env.VERCEL_ENV == "preview") {       //Note the abnormal distribution
//       if (requestData.value <= .3) {
//         await sendJackpot()
//       } else if (requestData.value < .4) {
//         await sendtxn(1)
//       } else if (requestData.value < .55) {
//         await sendtxn(2)
//       } else if (requestData.value < .67) {
//         await sendtxn(3)
//       } else if (requestData.value < .72) {
//         await sendtxn(4)
//       } else if (requestData.value < .85) {
//         await sendtxn(5)
//       } else if (requestData.value <= 1) {
//         await sendtxn(25)
//       }
//       return "sending..."
//     }
//   }

//   const result = await spin()

//   res.status(200).json({ spin: result })

// }
