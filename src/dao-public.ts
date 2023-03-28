import {
  DaoPublicInitialized as DaoPublicInitializedEvent,
  NftApproved as NftApprovedEvent,
  DaoPublicOwnershipTransferred as DaoPublicOwnershipTransferredEvent,
  PublicVote as PublicVoteEvent,
  Winner as WinnerEvent,
  blackListed as blackListedEvent,
  claimed as claimedEvent,
  voteForBlackList as voteForBlackListEvent
} from "../generated/DaoPublic/DaoPublic"
import {
  CommitteeDecision,
  DaoPublicInitialized,
  NftApproved,
  DaoPublicOwnershipTransferred,
  PublicVote,
  Winner,
  blackListed,
  claimed,
  voteForBlackList
} from "../generated/schema"

export function handleDaoPublicInitialized(
  event: DaoPublicInitializedEvent
): void {
  let entity = new DaoPublicInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNftApproved(event: NftApprovedEvent): void {
  let entity = new NftApproved(
    event.params.index.toString()
  )
  entity.index = event.params.index
  entity._NFT_uri = event.params._NFT.uri
  entity._NFT_owner = event.params._NFT.owner
  entity._NFT_index = event.params._NFT.index
  entity._NFT_votes = event.params._NFT.votes
  entity._NFT_winTime = event.params._NFT.winTime
  entity._NFT_votersCount = event.params._NFT.votersCount
  entity._NFT_favourVotes = event.params._NFT.favourVotes
  entity._NFT_disApprovedVotes = event.params._NFT.disApprovedVotes
  entity._NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee
  entity._NFT_winnerStatus = event.params._NFT.winnerStatus
  entity._NFT_isBlackListed = event.params._NFT.isBlackListed
  entity.startTime = event.params.startTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.publicVotes = []
  entity.adminVotes = [] 

  entity.save()
}

export function handleDaoPublicOwnershipTransferred(
  event: DaoPublicOwnershipTransferredEvent
): void {
  let entity = new DaoPublicOwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePublicVote(event: PublicVoteEvent): void {
  let entity = new PublicVote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.index = event.params.index
  entity._NFT_uri = event.params._NFT.uri
  entity._NFT_owner = event.params._NFT.owner
  entity._NFT_index = event.params._NFT.index
  entity._NFT_votes = event.params._NFT.votes
  entity._NFT_winTime = event.params._NFT.winTime
  entity._NFT_votersCount = event.params._NFT.votersCount
  entity._NFT_favourVotes = event.params._NFT.favourVotes
  entity._NFT_disApprovedVotes = event.params._NFT.disApprovedVotes
  entity._NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee
  entity._NFT_winnerStatus = event.params._NFT.winnerStatus
  entity._NFT_isBlackListed = event.params._NFT.isBlackListed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  let id_ = event.params.index.toString()
  let nft = NftApproved.load(id_)
  if(nft){
    nft._NFT_votes = event.params._NFT.votes

    let publicVoters= nft.publicVotes
    publicVoters.push(event.params.voter)
    nft.publicVotes=publicVoters

    nft.save()
  }
  
  entity.save()
}

export function handleWinner(event: WinnerEvent): void {
  let entity = new Winner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.index = event.params.index
  entity._NFT_uri = event.params._NFT.uri
  entity._NFT_owner = event.params._NFT.owner
  entity._NFT_index = event.params._NFT.index
  entity._NFT_votes = event.params._NFT.votes
  entity._NFT_winTime = event.params._NFT.winTime
  entity._NFT_votersCount = event.params._NFT.votersCount
  entity._NFT_favourVotes = event.params._NFT.favourVotes
  entity._NFT_disApprovedVotes = event.params._NFT.disApprovedVotes
  entity._NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee
  entity._NFT_winnerStatus = event.params._NFT.winnerStatus
  entity._NFT_isBlackListed = event.params._NFT.isBlackListed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  
  let id_= event.params.index.toString()
  let nft = NftApproved.load(id_)
  if(nft){
    nft._NFT_winnerStatus = event.params._NFT.winnerStatus
    nft._NFT_winTime = event.params._NFT.winTime

    nft.save()
  }
  
  entity.save()
}


export function handleblackListed(event: blackListedEvent): void {
  let entity = new blackListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.index = event.params.index
  entity.decision = event.params.decision
  entity._NFT_uri = event.params._NFT.uri
  entity._NFT_owner = event.params._NFT.owner
  entity._NFT_index = event.params._NFT.index
  entity._NFT_votes = event.params._NFT.votes
  entity._NFT_winTime = event.params._NFT.winTime
  entity._NFT_votersCount = event.params._NFT.votersCount
  entity._NFT_favourVotes = event.params._NFT.favourVotes
  entity._NFT_disApprovedVotes = event.params._NFT.disApprovedVotes
  entity._NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee
  entity._NFT_winnerStatus = event.params._NFT.winnerStatus
  entity._NFT_isBlackListed = event.params._NFT.isBlackListed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let id = event.params.index.toString()

  let nft = NftApproved.load(id)
  if (nft) {
    nft._NFT_isBlackListed = event.params._NFT.isBlackListed
    nft.save()
  }

}


export function handleclaimed(event: claimedEvent): void {
  let entity = new claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.claimedBy = event.params.claimedBy
  entity.index = event.params.index
  entity.amount = event.params.amount
  entity.claimTime = event.params.claimTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlevoteForBlackList(event: voteForBlackListEvent): void {
  let entity = new voteForBlackList(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.committeeMember = event.params.committeeMember
  entity.index = event.params.index
  entity.decision = event.params.decision
  entity._NFT_uri = event.params._NFT.uri
  entity._NFT_owner = event.params._NFT.owner
  entity._NFT_index = event.params._NFT.index
  entity._NFT_votes = event.params._NFT.votes
  entity._NFT_winTime = event.params._NFT.winTime
  entity._NFT_votersCount = event.params._NFT.votersCount
  entity._NFT_favourVotes = event.params._NFT.favourVotes
  entity._NFT_disApprovedVotes = event.params._NFT.disApprovedVotes
  entity._NFT_isApprovedByCommittee = event.params._NFT.isApprovedByCommittee
  entity._NFT_winnerStatus = event.params._NFT.winnerStatus
  entity._NFT_isBlackListed = event.params._NFT.isBlackListed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  let id = event.params.index.toString()
  let nft = NftApproved.load(id)
  if (nft) {
    nft._NFT_favourVotes = event.params._NFT.favourVotes
    nft._NFT_disApprovedVotes = event.params._NFT.disApprovedVotes
    nft._NFT_winnerStatus = event.params._NFT.winnerStatus
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
