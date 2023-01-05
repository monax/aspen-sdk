import * as t from 'io-ts';
import { Type } from 'io-ts';

export const ErrorSchema = t.intersection([
  t.type({ message: t.string }),
  t.partial({ name: t.string, stack: t.string }),
]);

type Success<TInput, TResult> = { input: TInput; result: TResult; success: true };
type Failure<TInput> = { input: TInput; error: Error; success: false };

export type Output<TInput, TResult> = Success<TInput, TResult> | Failure<TInput>;

export function outputSchema<TInput, TOuput>(inputSchema: Type<TInput>, resultSchema: Type<TOuput>) {
  return t.union([
    t.type({ input: inputSchema, result: resultSchema, success: t.literal(true) }),
    t.type({ input: inputSchema, error: ErrorSchema, success: t.literal(false) }),
  ]);
}

export function isSuccess<TInput, TResult>(output: Output<TInput, TResult>): output is Success<TInput, TResult> {
  return output.success;
}

export type Work<T> = () => Promise<T>;
export type Worker<TInput, TResult> = (input: TInput) => Promise<TResult>;

export async function parallel<TInput, TResult>(
  name: string,
  queueLength: number,
  worker: Worker<TInput, TResult>,
  inputs: TInput[],
): Promise<Output<TInput, TResult>[]> {
  async function run({
    input,
    slotIndex,
    inputIndex,
  }: {
    input: TInput;
    slotIndex: number;
    inputIndex: number;
  }): Promise<{ output: Output<TInput, TResult>; slotIndex: number; inputIndex: number }> {
    try {
      const result = await worker(input);
      return { output: { input, result, success: true }, slotIndex, inputIndex };
    } catch (err) {
      return { output: { input, error: err as Error, success: false }, slotIndex, inputIndex };
    }
  }

  console.log(`[${name}] Got work queue of ${inputs.length} items to process...`);

  // Fire off first queueLength many
  const outputs = new Array<Output<TInput, TResult>>(inputs.length);
  const slots = inputs.slice(0, queueLength).map((input, index) => run({ input, slotIndex: index, inputIndex: index }));
  const remaining = inputs.slice(queueLength);

  // Allocate remaining to slots as they become available
  for (let next = remaining.shift(); next; next = remaining.shift()) {
    const { output, slotIndex, inputIndex } = await Promise.race(slots);
    outputs[inputIndex] = output;
    // Base case: queueLength enqueued, next inputIndex should be inputIndex = queueLength.
    //   remaining = inputs - inputIndex - 1 (because we just shifted). inputIndex = inputs - remaining - 1
    // Induction: assume inputIndex_n = inputs - remaining_n - 1
    //   inputIndex_n+1 = inputIndex_n + 1 = inputs - remaining_n = inputs - remaining_n+1 - 1 (since shift each iteration)
    slots[slotIndex] = run({ input: next, slotIndex, inputIndex: inputs.length - remaining.length - 1 });
    console.log(`[${name}] ${remaining.length} jobs remaining to enqueue...`);
  }

  console.log(`[${name}] waiting for final ${slots.length} jobs to complete...`);
  // Finalize any jobs still in progress
  for await (const { output, inputIndex } of slots) {
    outputs[inputIndex] = output;
  }
  return outputs;
}
