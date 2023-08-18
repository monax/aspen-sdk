// import { EventFilter, Log } from '@ethersproject/abstract-provider';
// import { ErrorCode } from '@ethersproject/logger';
// import { ContractReceipt, ContractTransaction, utils } from 'ethers';
// import { LogDescription } from 'ethers/lib/utils';
// import * as t from 'io-ts';
// import { OnEvent, TypedEvent, TypedEventFilter } from './generated/common';

// export type Eventable<C> = {
//   once: OnEvent<C>;
// };

// export type Contract<
//   TInterface extends utils.Interface,
//   TFilterName extends string,
//   TArgsArray extends any[],
//   TArgsObject,
//   TEvent extends TypedEvent<TArgsArray, TArgsObject>,
// > = {
//   interface: TInterface;
//   filters: Record<TFilterName, (...args: TArgsArray) => TypedEventFilter<TEvent>>;
// };

// export async function extractEvents<
//   TInterface extends utils.Interface,
//   TFilterName extends string,
//   TArgsArray extends any[],
//   TArgsObject,
//   TEvent extends TypedEvent<TArgsArray, TArgsObject>,
//   TContract extends Contract<TInterface, TFilterName, TArgsArray, TArgsObject, TEvent>,
// >(
//   contract: TContract,
//   filterChooser: (filter: TContract['filters']) => TypedEventFilter<TEvent>,
//   logsLike: LogsLike,
// ): Promise<TEvent['args'][]> {
//   return extractEventsFromLogs(filterChooser(contract.filters), contract.interface, await getLogs(logsLike));
// }

// export async function waitForEvent<
//   TContract,
//   TArgsArray extends any[],
//   TArgsObject,
//   TEvent extends TypedEvent<TArgsArray, TArgsObject>,
// >(filter: TypedEventFilter<TEvent>, contract: Eventable<TContract>): Promise<TEvent> {
//   return new Promise<TEvent>((resolve) => {
//     contract.once(filter, (...args) => {
//       resolve(args[args.length - 1]);
//     });
//   });
// }
// type MaybePromise<T> = Promise<T> | T;
// type LogsLike = Log[] | MaybePromise<ContractTransaction> | MaybePromise<ContractReceipt> | undefined;

// async function getLogs(logsLike: LogsLike): Promise<Log[]> {
//   if (!logsLike) {
//     return [];
//   }
//   if (Array.isArray(logsLike)) {
//     return logsLike;
//   }
//   const txOrReceipt = await logsLike;
//   if (isContractTransaction(txOrReceipt)) {
//     const receipt = await txOrReceipt.wait();
//     return receipt.logs;
//   }
//   return txOrReceipt.logs;
// }

// function isContractTransaction(txOrReceipt: ContractTransaction | ContractReceipt): txOrReceipt is ContractTransaction {
//   return !!(txOrReceipt as ContractTransaction).wait;
// }

// export function extractEventsFromLogs<
//   TInterface extends utils.Interface,
//   TArgsArray extends any[],
//   TArgsObject,
//   TEvent extends TypedEvent<TArgsArray, TArgsObject>,
// >(filter: TypedEventFilter<TEvent>, iface: TInterface, logs: Log[]): TEvent['args'][] {
//   return logs.reduce(logFilterReducer(filter, iface), []).map((l) => l.args) ?? [];
// }

// export const EventParseError = t.union([
//   t.type({
//     code: t.literal(ErrorCode.BUFFER_OVERRUN),
//     reason: t.string,
//   }),
//   t.type({
//     code: t.literal(ErrorCode.INVALID_ARGUMENT),
//     argument: t.string,
//   }),
// ]);

// function logFilterMatcher(filter: EventFilter): (log?: Log) => log is Log {
//   const filter0 = filter.topics?.[0];
//   const baseFilter = (log?: Log): log is Log => !!log && (!filter.address || filter.address === log.address);
//   if (!filter0) {
//     return baseFilter;
//   }
//   const topic0Set = Array.isArray(filter0) ? filter0 : [filter0];
//   const topic0Regex = new RegExp('^' + topic0Set.map((t) => '(' + t + ')').join('|') + '$');
//   return (log?: Log): log is Log => baseFilter(log) && topic0Regex.test(log.topics[0]);
// }

// type TypedLogDescription<
//   TEvent extends TypedEvent<TArgsArray, TArgsObject>,
//   TArgsArray extends any[],
//   TArgsObject,
// > = LogDescription & { args: TEvent['args'] };

// // Filter and parse logs
// function logFilterReducer<TArgsArray extends any[], TArgsObject, TEvent extends TypedEvent<TArgsArray, TArgsObject>>(
//   filter: TypedEventFilter<TEvent>,
//   iface: utils.Interface,
// ): (
//   lds: TypedLogDescription<TEvent, TArgsArray, TArgsObject>[],
//   log?: Log,
// ) => TypedLogDescription<TEvent, TArgsArray, TArgsObject>[] {
//   const matcher = logFilterMatcher(filter);
//   return (lds, log) => {
//     if (!matcher(log)) {
//       return lds;
//     }
//     try {
//       // Bash in place for performance
//       lds.push(iface.parseLog(log) as TypedLogDescription<TEvent, TArgsArray, TArgsObject>);
//       return lds;
//     } catch (err: any) {
//       if (err) {
//         if (err.code === 'INVALID_ARGUMENT' && err.argument === 'topichash') {
//           return lds;
//         }
//       }

//       throw err;
//     }
//   };
// }
