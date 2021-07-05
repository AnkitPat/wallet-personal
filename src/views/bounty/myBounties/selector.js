export const getPendingBountyInfo = (state) => {
    const myBounties = state?.bounty?.myBounties || []
    if (myBounties) {
        return { bounties: myBounties.filter(bounty => bounty.verified !== 'verified' || !bounty.claimed), total: myBounties?.reduce((sum, bounty) => sum + ((bounty.verified === 'pending' ? bounty.bountyTiers.reward : 0) || 0), 0) }
    }
}

export const getClaimedBountyInfo = (state, key) => {
    const myBounties = state?.bounty?.myBounties || []
    if (myBounties) {
        return { bounties: myBounties.filter(bounty => bounty.verified === 'verified' && bounty.claimed), total: myBounties?.reduce((sum, bounty) => sum + ((bounty.verified === 'verified' && bounty.claimed ? bounty.bountyTiers.reward : 0) || 0), 0) }
    }
}
