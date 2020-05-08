 const { Op } = require('sequelize');
 const User = require('../model/User');

 module.exports = {
     async show(req, res) {
        // Encontrar todos usuários que tem email que termina com @migrar.cloud
        // Desses usuários eu quero buscar todos que moram na rua "Rua Aderson Ferreira Filho"
        // Desses usuários eu quero buscar as tecnologias que começam com React

         const users = await User.findAll({
             attributes: ['name', 'email'],
             where: {
                 email: {
                     [Op.iLike]: '%@migrar.cloud'
                 }
             },
             include: [
                 { association: 'addresses', where: { street: 'Rua Aderson Ferreira Filho' } },
                 {
                     association: 'techs',
                     required: false,
                     where: {
                         name: {
                             [Op.iLike]: 'React%'
                         }
                     }
                 }
             ]
         })

         return res.json(users);
     }
 }