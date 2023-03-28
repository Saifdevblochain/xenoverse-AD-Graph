import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DaoPublicInitialized,
  NftApproved,
  DaoPublicOwnershipTransferred,
  PublicVote,
  Winner,
  blackListed,
  claimed,
  voteForBlackList
} from "../generated/DaoPublic/DaoPublic"

export function createDaoPublicInitializedEvent(
  version: i32
): DaoPublicInitialized {
  let daoPublicInitializedEvent = changetype<DaoPublicInitialized>(
    newMockEvent()
  )

  daoPublicInitializedEvent.parameters = new Array()

  daoPublicInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return daoPublicInitializedEvent
}

export function createNftApprovedEvent(
  index: BigInt,
  _NFT: ethereum.Tuple,
  startTime: BigInt
): NftApproved {
  let nftApprovedEvent = changetype<NftApproved>(newMockEvent())

  nftApprovedEvent.parameters = new Array()

  nftApprovedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  nftApprovedEvent.parameters.push(
    new ethereum.EventParam("_NFT", ethereum.Value.fromTuple(_NFT))
  )
  nftApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )

  return nftApprovedEvent
}

export function createDaoPublicOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): DaoPublicOwnershipTransferred {
  let daoPublicOwnershipTransferredEvent = changetype<
    DaoPublicOwnershipTransferred
  >(newMockEvent())

  daoPublicOwnershipTransferredEvent.parameters = new Array()

  daoPublicOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  daoPublicOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return daoPublicOwnershipTransferredEvent
}

export function createPublicVoteEvent(
  voter: Address,
  index: BigInt,
  _NFT: ethereum.Tuple
): PublicVote {
  let publicVoteEvent = changetype<PublicVote>(newMockEvent())

  publicVoteEvent.parameters = new Array()

  publicVoteEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  publicVoteEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  publicVoteEvent.parameters.push(
    new ethereum.EventParam("_NFT", ethereum.Value.fromTuple(_NFT))
  )

  return publicVoteEvent
}

export function createWinnerEvent(index: BigInt, _NFT: ethereum.Tuple): Winner {
  let winnerEvent = changetype<Winner>(newMockEvent())

  winnerEvent.parameters = new Array()

  winnerEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  winnerEvent.parameters.push(
    new ethereum.EventParam("_NFT", ethereum.Value.fromTuple(_NFT))
  )

  return winnerEvent
}

export function createblackListedEvent(
  index: BigInt,
  decision: boolean,
  _NFT: ethereum.Tuple
): blackListed {
  let blackListedEvent = changetype<blackListed>(newMockEvent())

  blackListedEvent.parameters = new Array()

  blackListedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  blackListedEvent.parameters.push(
    new ethereum.EventParam("decision", ethereum.Value.fromBoolean(decision))
  )
  blackListedEvent.parameters.push(
    new ethereum.EventParam("_NFT", ethereum.Value.fromTuple(_NFT))
  )

  return blackListedEvent
}

export function createclaimedEvent(
  claimedBy: Address,
  index: BigInt,
  amount: BigInt,
  claimTime: BigInt
): claimed {
  let claimedEvent = changetype<claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("claimedBy", ethereum.Value.fromAddress(claimedBy))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "claimTime",
      ethereum.Value.fromUnsignedBigInt(claimTime)
    )
  )

  return claimedEvent
}

export function createvoteForBlackListEvent(
  committeeMember: Address,
  index: BigInt,
  decision: boolean,
  _NFT: ethereum.Tuple
): voteForBlackList {
  let voteForBlackListEvent = changetype<voteForBlackList>(newMockEvent())

  voteForBlackListEvent.parameters = new Array()

  voteForBlackListEvent.parameters.push(
    new ethereum.EventParam(
      "committeeMember",
      ethereum.Value.fromAddress(committeeMember)
    )
  )
  voteForBlackListEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  voteForBlackListEvent.parameters.push(
    new ethereum.EventParam("decision", ethereum.Value.fromBoolean(decision))
  )
  voteForBlackListEvent.parameters.push(
    new ethereum.EventParam("_NFT", ethereum.Value.fromTuple(_NFT))
  )

  return voteForBlackListEvent
}
