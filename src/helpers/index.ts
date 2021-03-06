import { ApiPromise, WsProvider } from "@polkadot/api";
import Keyring from "@polkadot/keyring";
import ApiHandler from "./apiHandler";
import * as fs from "fs";

export const apiHandler = ApiHandler;

export const assert = (condition: boolean, message: string): void => {
  if (!condition) throw new Error(message);
};

export const getSigner = (cryptoType: "ed25519" | "sr25519", suri: string) => {
  const keyring = new Keyring({ type: cryptoType });
  return keyring.addFromUri(suri);
};

export const initApi = (
  wsEndpoint = "ws://localhost:9944",
  types?: any
): Promise<ApiPromise> => {
  const provider = new WsProvider(wsEndpoint);

  if (typeof types === 'string') types = JSON.parse(types);

  // @ts-ignore
  return ApiPromise.create({
    provider,
    typesChain: {
      "Kusama CC3 Tester": {
        Keys: "SessionKeys5",
      },
    },
    types,
  });
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 
 * @param filepath Full directory path of the CSV file to read.
 * 
 * Returns an Array containing an Array of string for each comma
 * separated value in the file.
 */
export const parseCsv = (filepath: string): string[][] => {
  const csvRead = fs.readFileSync(filepath, { encoding: 'utf-8' });
  return csvRead
    .split("\n")
    .filter(line => line !== "")
    .map(line => line.split(','));
}

export const CallIndices = {
  Timestamp: "0x0200",
  FinalityHint: "0x0900",
  Heartbeat: "0x0b00",
  Claim: "0x1200",
  ParachainHeads: "0x1300",
};
