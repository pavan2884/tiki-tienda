import axios from "axios";
import { Connection, PublicKey } from "@solana/web3.js";
import { connection } from "../config";
import { decodeMetadata } from "./metadata";

const METADATA_PUBKEY = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const TUT_MINT_PUBKEY = new PublicKey(
  "6wShYhqA2gs3HUAZ4MyaPDpKPBWFJUQQUGaCoy2k1Tgz"
);

const parseTikiFromMetadata = async (account: any) => {
  if (account) {
    const buf = Buffer.from(account.data, "base64");
    const m = decodeMetadata(buf);
    // console.log(util.inspect(account, false, 4, true))
    const response = await axios.get(m.data.uri);
    return {
      ...response.data,
      mint: m.mint,
    };
  }
};

const getTikis = async (accountsInfo: any) => {
  const tikis = await Promise.all(accountsInfo.map(parseTikiFromMetadata));
  return tikis.filter((t) => t);
};

const getProgramAddresses = async (addresses: any) => {
  const converted = await Promise.all(
    addresses.map(async (add: any) => {
      let [pda] = await PublicKey.findProgramAddress(
        [Buffer.from("metadata"), METADATA_PUBKEY.toBuffer(), add.toBuffer()],
        METADATA_PUBKEY
      );
      return pda;
    })
  );
  return converted;
};

const parseMintAddresses = (accounts: any) => {
  return accounts
    .map(({ pubkey, account }: any) => {
      return new PublicKey(account.data.parsed.info.mint);
    })
    .filter(
      (addr: PublicKey) => addr.toBase58() !== TUT_MINT_PUBKEY.toBase58()
    );
};

const parseNftAccounts = (accounts: any) => {
  return accounts.filter(({ account }: any) => {
    return account.data.parsed.info.tokenAmount.uiAmount === 1.0;
  });
};

const getInfoInChunks = async (tokenAccounts: any, connection: Connection) => {
  const nftAccounts = parseNftAccounts(tokenAccounts);
  const mintAddresses = parseMintAddresses(nftAccounts);
  const programAddresses = await getProgramAddresses(mintAddresses);
  const accountsInfo = await connection.getMultipleAccountsInfo(
    programAddresses
  );
  return accountsInfo;
};

const getAccountsInfo = async (tokenAccounts: any, connection: Connection) => {
  const chunks = tokenAccounts.reduce((all: any, one: any, i: any) => {
    const ch = Math.floor(i / 100);
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);

  const accounts = await Promise.all(
    chunks.map(async (adds: any) => {
      const data = await getInfoInChunks(adds, connection);
      return data;
    })
  );

  return accounts.flat().filter((t) => t);
};

const getTokenAccounts = async (walletString: string, connection: any) => {
  const base58publicKey = new PublicKey(walletString);
  const programId = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  );
  const { value: tokenAccounts } =
    await connection.getParsedTokenAccountsByOwner(base58publicKey, {
      programId,
    });
  return tokenAccounts;
};

export const getData = async (walletString: string) => {
  const tokenAccounts = await getTokenAccounts(walletString, connection);
  const accountsInfo = await getAccountsInfo(tokenAccounts, connection);
  const items = await getTikis(accountsInfo);
  return {
    items,
  };
};
