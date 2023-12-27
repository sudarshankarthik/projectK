import User from "../models/user.js"


export const getUser = async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        console.log(req.user);
        user.password = undefined
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({err})
    }
}

export const getUserFriends = async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        res.status(200).json(friends)

    } catch (err) {
        res.status(500).json({err})
    }
}

export const addRemoveFriends = async (req,res) => {
    try {
        const id = req.user.id
        const {friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        }
        else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        if (id != friendId)
            await friend.save()

        res.status(200).json(user)
    } catch (err) {
        console.log("friend error");
        console.log(err);
        res.status(500).json({err})
    }
}