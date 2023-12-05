import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, Program} from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';
import {useCallback, useMemo, useState} from 'react';
import {IDL, BasicCounter as BasicCounterProgram} from '@/components/providers/counterProgram/basic_counter';
import { useConnection } from '@/components/providers/useConnection';
import { useWallet } from '@/components/providers/useWallet';
import { alertAndLog } from '@/shared/alertAndLog';
  
export function useCounterProgram(
  anchorWallet: anchor.Wallet | null,
) {
  const {connection} = useConnection();
  const {sendTransaction, publicKey} = useWallet();
  const [counterValue, setCounterValue] = useState<string | null>(null);

  const counterProgramId = useMemo(() => {
    return new PublicKey('9G2ey4SFoUB4ChTGpJFwLX1vd25w5d18qPyegY2vKBok');
  }, []);

  const [counterPDA] = useMemo(() => {
    const counterSeed = anchor.utils.bytes.utf8.encode('counter');
    return anchor.web3.PublicKey.findProgramAddressSync(
      [counterSeed],
      counterProgramId,
    );
  }, [counterProgramId]);

  const provider = useMemo(() => {
    if (!anchorWallet) {
      return null;
    }
    return new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: 'confirmed',
      commitment: 'processed',
    });
  }, [anchorWallet, connection]);

  const basicCounterProgram = useMemo(() => {
    if (!provider) {
      return null;
    }

    return new Program<BasicCounterProgram>(
      IDL,
      counterProgramId,
      provider,
    );
  }, [counterProgramId, provider]);

  const fetchAndUpdateCounter = useCallback(
    async () => {
      if (!basicCounterProgram) return;
      const counterAccount =
          await basicCounterProgram.account.counter.fetch(counterPDA);
      setCounterValue(counterAccount?.count.toString() ?? '0');
    },
    [counterPDA, basicCounterProgram],
  );

  const incrementCounter = useCallback(
    async () => {
      // Call the increment function of the program.
      if (!basicCounterProgram || !publicKey) return;
      const tx = await basicCounterProgram.methods
        .increment()
        .accounts({
          counter: counterPDA,
          authority: publicKey,
        })
        .transaction();

        const signature = await sendTransaction(tx);
        if (signature) {
          await connection.confirmTransaction(signature);
        }

        alertAndLog(
          'Counter incremented!',
          signature?.signature
        );
        fetchAndUpdateCounter();
        return signature?.signature;
    },
    [counterPDA],
  )


  const value = useMemo(
    () => ({
      counterProgram: basicCounterProgram,
      counterProgramId: counterProgramId,
      counterPDA: counterPDA,
      fetchAndUpdateCounter,
      incrementCounter,
      counterValue,
    }),
    [basicCounterProgram, counterProgramId, counterPDA, fetchAndUpdateCounter, counterValue],
  );

  return value;
}