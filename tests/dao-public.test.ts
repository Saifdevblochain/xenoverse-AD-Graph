import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { DaoPublicInitialized } from "../generated/schema"
import { DaoPublicInitialized as DaoPublicInitializedEvent } from "../generated/DaoPublic/DaoPublic"
import { handleDaoPublicInitialized } from "../src/dao-public"
import { createDaoPublicInitializedEvent } from "./dao-public-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let version = 123
    let newDaoPublicInitializedEvent = createDaoPublicInitializedEvent(version)
    handleDaoPublicInitialized(newDaoPublicInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DaoPublicInitialized created and stored", () => {
    assert.entityCount("DaoPublicInitialized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DaoPublicInitialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "version",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
