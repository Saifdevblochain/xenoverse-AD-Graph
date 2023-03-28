import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CommitteeVote,
  Initialized,
  NftAdded,
  OwnershipTransferred
} from "../generated/DaoCommittee/DaoCommittee"

export function createCommitteeVoteEvent(
  committeeMember: Address,
  index: BigInt,
  decision: boolean,
  _NFT: ethereum.Tuple
): CommitteeVote {
  let committeeVoteEvent = changetype<CommitteeVote>(newMockEvent())

  committeeVoteEvent.parameters = new Array()

  committeeVoteEvent.parameters.push(
    new ethereum.EventParam(
      "committeeMember",
      ethereum.Value.fromAddress(committeeMember)
    )
  )
  committeeVoteEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  committeeVoteEvent.parameters.push(
    new ethereum.EventParam("decision", ethereum.Value.fromBoolean(decision))
  )
  committeeVoteEvent.parameters.push(
    new ethereum.EventParam("_NFT", ethereum.Value.fromTuple(_NFT))
  )

  return committeeVoteEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNftAddedEvent(
  index: BigInt,
  NFT: ethereum.Tuple,
  uploadTime: BigInt
): NftAdded {
  let nftAddedEvent = changetype<NftAdded>(newMockEvent())

  nftAddedEvent.parameters = new Array()

  nftAddedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  nftAddedEvent.parameters.push(
    new ethereum.EventParam("NFT", ethereum.Value.fromTuple(NFT))
  )
  nftAddedEvent.parameters.push(
    new ethereum.EventParam(
      "uploadTime",
      ethereum.Value.fromUnsignedBigInt(uploadTime)
    )
  )

  return nftAddedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
