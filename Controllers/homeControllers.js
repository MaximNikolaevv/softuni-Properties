import { Router } from 'express';
import Property from '../module/PropertyModule.js';

const homeControllers = Router();

homeControllers.get('/', async (req, res) => {

    const properties = await Property.find({}).sort({ _id: -1 }).limit(3);

    res.render('home', { properties });
});

homeControllers.get('/AddProperty', (req, res) => {
    res.render('create');
});

homeControllers.post('/AddProperty', async (req, res) => {
    try {
        const PropertiesData = req.body;
        const Owner = req.user._id;
        await Property.create({ ...PropertiesData, owner: Owner });

        res.redirect("/");

    } catch (err) {

        res.render("create", { error: err.message });
    }

});


homeControllers.get('/dashboard', async (req, res) => {

    const properties = await Property.find({})
    res.render('dashboard', { properties });
});


homeControllers.get('/details/:id', async (req, res) => {

    const CreatorId = req.user?._id;
    const PropertyId = req.params.id;

    const CurrentProperty = await Property.findById(PropertyId);

    const isCreator = CurrentProperty?.owner?.toString() == CreatorId;

    const hasRecommended = CurrentProperty.likedList.some(
        id => id.toString() === CreatorId?.toString()
    );

    res.render('details', { CurrentProperty, isCreator: isCreator, hasRecommended });

});


homeControllers.get('/like/:id', async (req, res) => {

    const propertyId = req.params.id;
    const userId = req.user._id;

    const property = await Property.findById(propertyId);

    property.likedList.push(userId);

    await property.save();

    res.redirect(`/details/${propertyId}`);
});


homeControllers.get('/edit/:id', async (req, res) => {

    try {
        const PropertyId = req.params.id;
        const properties = await Property.findById(PropertyId);

        res.render('edit', { CurrentProperty: properties });
    } catch (error) {

        res.render('edit', { error: error.message });
    }



});


homeControllers.post('/edit/:id', async (req, res) => {

    try {
        const PropertyId = req.params.id;
        const UpdatedData = req.body;
        await Property.findByIdAndUpdate(PropertyId, UpdatedData);
        res.redirect(`/details/${PropertyId}`);

    } catch (error) {
        res.render('edit', { error: error.message });

    }

});



homeControllers.get('/delete/:id', async (req, res) => {

    const cosmeticId = req.params.id;
    await Property.findByIdAndDelete(cosmeticId);

    res.redirect("/");

});

homeControllers.get('/Report', (req, res) => {
    res.render('report');
});


homeControllers.post('/404', async (req, res) => {


    res.render("404");
});

export default homeControllers;