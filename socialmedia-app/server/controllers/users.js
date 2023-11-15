import User from "../models/User";

/* READ */

//function for retrieving a specific user using their id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// this function will grab all the users friends through the id of the user
export const getUsersFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // retrieves all the information / payload from user
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    // formatted for the front end
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

// function is used to add or remove friends from the users friend list
export const addRemoveFriend = async (req, res) => {
  try {
    // retrieves current users details and friends details
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // if the friends id is included in the current users friends list then they need to be removed
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); // removes friend from current users friends list
      friend.friends = friend.friends.filter((id) => id !== id); // removes current user from the friend's friends list
    } else {
      user.friends.push(friendId); // if friend is not in list then adds to current users friends list
      friend.friends.push(id); // also adds current user to the friend's friends list
    }
    // saves/updates list
    await user.save();
    await friend.save();

    // formatted for the front end
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
