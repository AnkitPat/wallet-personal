export const getRewards = (status = 'completed', state, key) => {
    const myBounties = state?.bounty?.myBounties || []
    if (myBounties) {
        return myBounties.reduce((sum, object) => sum + ((object[key] === status ? object.bountyTask.amount : 0) || 0), 0)
    }
}