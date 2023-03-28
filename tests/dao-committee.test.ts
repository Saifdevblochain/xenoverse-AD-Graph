import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CommitteeVote } from "../generated/schema"
import { CommitteeVote as CommitteeVoteEvent } from "../generated/DaoCommittee/DaoCommittee"
import { handleCommitteeVote } from "../src/dao-committee"
import { createCommitteeVoteEvent } from "./dao-committee-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let committeeMember = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let index = BigInt.fromI32(234)
    let decision = "boolean Not implemented"
    let _NFT = "ethereum.Tuple Not implemented"
    let newCommitteeVoteEvent = createCommitteeVoteEvent(
      committeeMember,
      index,
      decision,
      _NFT
    )
    handleCommitteeVote(newCommitteeVoteEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CommitteeVote created and stored", () => {
    assert.entityCount("CommitteeVote", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CommitteeVote",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "committeeMember",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CommitteeVote",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "index",
      "234"
    )
    assert.fieldEquals(
      "CommitteeVote",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "decision",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "CommitteeVote",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_NFT",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
