app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }

        const userData = {
            registrationDate: user.registrationDate, // Храним эту дату
            ordersCount: user.orders.length, // Количество объявлений
            petsCount: user.pets.filter(pet => pet.hasOwner).length // Количество найденных животных
        };

        res.json(userData);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});