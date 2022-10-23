const UserAddress = require('../models/Address')

class AddressController {
    addAddress = (req, res) => {
        //return res.status(200).json({body: req.body})
        const { payload } = req.body
        if (payload.address) {
            if (payload.address._id) {
                UserAddress.findOneAndUpdate(
                    { user: req.user.id, 'address._id': payload.address._id },
                    {
                        $set: {
                            'address.$': payload.address,
                        },
                    }
                ).exec((error, address) => {
                    if (error) return res.status(400).json({ error })
                    if (address) {
                        res.status(201).json({ address })
                    }
                })
            } else {
                UserAddress.findOneAndUpdate(
                    { user: req.user.id },
                    {
                        $push: {
                            address: payload.address,
                        },
                    },
                    { new: true, upsert: true }
                ).exec((error, address) => {
                    if (error) return res.status(400).json({ error })
                    if (address) {
                        res.status(201).json({ address })
                    }
                })
            }
        } else {
            res.status(400).json({ error: 'Params address required' })
        }
    }
    getAddress = (req, res) => {
        UserAddress.findOne({ user: req.user.id }).exec(
            (error, userAddress) => {
                if (error) return res.status(400).json({ error })
                if (userAddress) {
                    res.status(200).json({ userAddress })
                }
            }
        )
    }
    deleteAddress = (req, res) => {
        //return res.status(200).json({body: req.body})
        const { userId, addId } = req.body.data.payload

        if (userId && addId) {
            UserAddress.findOneAndUpdate(
                { user: userId },
                {
                    $pull: {
                        address: {
                            _id: addId,
                        },
                    },
                },
                { new: true, upsert: true }
            ).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        }
    }
}

module.exports = new AddressController()
