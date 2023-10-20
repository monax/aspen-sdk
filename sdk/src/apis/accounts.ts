import { HDAccount } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';

export function generateAccounts(mnemonic: string, numAccounts: number): HDAccount[] {
  const accounts = [] as HDAccount[];

  for (let addressIndex = 0; addressIndex < numAccounts; addressIndex++) {
    accounts.push(
      mnemonicToAccount(mnemonic, {
        accountIndex: 0,
        changeIndex: 0,
        addressIndex,
      }),
    );
  }

  return accounts;
}
