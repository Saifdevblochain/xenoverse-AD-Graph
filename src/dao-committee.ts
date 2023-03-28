import {
  CommitteeVote as CommitteeVoteEvent,
  Initialized as InitializedEvent,
  NftAdded as NftAddedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DaoCommittee/DaoCommittee"
import {CommitteeDecision,
  CommitteeVote,
  Initialized,
  NftAdded,
  OwnershipTransferred
} from "../generated/schema"

export function handleCommitteeVote(event: CommitteeVoteEvent): void {
  let entity = new CommitteeVote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.committeeMember = event.params.committeeMember
  entity.index = event.params.index
  entity.decision = event.params.decision
  entity._NFT_uri = event.params._NFT.uri
  entity._NFT_owner = event.params._NFT.owner
  entity._NFT_approvedVotes = event.params._NFT.approvedVotes
  entity._NFT_rejectedVotes = event.params._NFT.rejectedVotes
  entity._NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee
  entity._NFT_rejected = event.params._NFT.rejected

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  
  entity.save()
  let id = event.params.index.toString()
  let nft = NftAdded.load(id)
  if (nft) {
    nft.NFT_approvedVotes = event.params._NFT.approvedVotes
    nft.NFT_rejectedVotes = event.params._NFT.rejectedVotes
    nft.NFT_rejected = event.params._NFT.rejected
    nft.NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee

    // saving committeeDecision object
    let _id = event.params.committeeMember.toHexString().concat("-").concat(event.params.index.toString())
    let cd = new CommitteeDecision(_id)
    cd.address = event.params.committeeMember
    cd.decision = event.params.decision
    cd.save()

    // pushing committeeDecision as a string to an array
    let voters = nft.adminVotes
    let committeeDecision = 
      event.params.committeeMember.toHexString().concat(",")
      .concat(event.params.decision.toString())
    voters.push(committeeDecision)
    nft.adminVotes = voters

    nft.save()
  }
}


export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNftAdded(event: NftAddedEvent): void {
  let entity = new NftAdded(
    event.params.index.toString()
  )
  entity.index = event.params.index
  entity.NFT_uri = event.params.NFT.uri
  entity.NFT_owner = event.params.NFT.owner
  entity.NFT_approvedVotes = event.params.NFT.approvedVotes
  entity.NFT_rejectedVotes = event.params.NFT.rejectedVotes
  entity.NFT_isApprovedByCommittee = event.params.NFT.isApprovedByCommittee
  entity.NFT_rejected = event.params.NFT.rejected
  entity.uploadTime = event.params.uploadTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.adminVotes = []
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
