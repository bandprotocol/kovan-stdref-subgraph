import {BigInt} from '@graphprotocol/graph-ts'
import {RefRate, RefSymbol} from '../generated/schema'
import {RefDataUpdate} from '../generated/StdReferenceBasic/StdReferenceBasic'

function getNextId(symbol: string): BigInt {
  let refSymbol = RefSymbol.load(symbol);
  if (refSymbol == null) {
    refSymbol = new RefSymbol(symbol);
    refSymbol.count = BigInt.fromI32(0);
  }
  refSymbol.count = refSymbol.count + BigInt.fromI32(1);
  refSymbol.save();
  return refSymbol.count;
}

export function handleRefDataUpdate(event: RefDataUpdate): void {
  let id =
      event.params.symbol + '-' + getNextId(event.params.symbol).toString();
  let refRate = new RefRate(id);
  refRate.symbol = event.params.symbol;
  refRate.rate = event.params.rate;
  refRate.resolveTime = event.params.resolveTime;
  refRate.requestId = event.params.requestId;
  refRate.save()
}
