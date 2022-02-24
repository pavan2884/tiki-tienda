import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";

type Account = {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
};

type Accounts = Array<Account>;

const getNftAccounts = (tokenAccounts: Accounts) => {
  // tokenAccounts.forEach(account => {
  //   console.log(util.inspect(account, false, 10, true))
  // })
  return tokenAccounts.filter(
    ({ account }) => account.data.parsed.info.tokenAmount.uiAmount === 1
  );
};

const getTokenAccounts = async (
  walletString: string,
  connection: Connection
) => {
  const base58publicKey = new PublicKey(walletString);
  const { value: tokenAccounts } =
    await connection.getParsedTokenAccountsByOwner(base58publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });
  return tokenAccounts;
};

const pickAnNft = async (storeWalletB58: string, connection: Connection) => {
  const nftAccounts = getNftAccounts(
    await getTokenAccounts(storeWalletB58, connection)
  );
  return nftAccounts[(Math.random() * nftAccounts.length) | 0];
};

const nftCount = async (storeWalletB58: string, connection: Connection) => {
  const nftAccounts = getNftAccounts(
    await getTokenAccounts(storeWalletB58, connection)
  );
  return nftAccounts.length;
};

export { pickAnNft, nftCount };
