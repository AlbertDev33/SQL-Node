const User = require('../model/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {
        const { name, email } = req.body;

        const user = await User.create({ name, email });

        return res.json(user);
    },

    async update(req, res, next) {     

        const { name, email } = req.body;
        const { user_id } = req.params;

        const userId = await User.findByPk(user_id);

        if (!userId) {
            return res.status(400).json({ error: 'User not found' });
        };

        const user = await User.update(
            {name, email},
            {where: { id: user_id }}
        );

        return res.json({name, email});

    },

    async delete(req, res, next) {

        const { user_id } = req.params

        const userId = await User.findByPk(user_id);

        if (!userId) {
            return res.status(400).json({ error: 'User not found' });
        };

        const user = await User.destroy({
            where: { id: user_id }
        });

        return res.send('');

    }
};