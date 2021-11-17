const Events = require('./events-model')

module.exports = {
	validateEvent,
	validateEventById,
};

function validateEvent(req, res, next){
    const events = req.body
    if (!events.event_title) {
		res.status(400).json({ message: 'A title is required.' });
	} else if (!events.event_date) {
		res.status(400).json({ message: 'A date is required.' });
	} else if (!!events.event_descrition) {
		res.status(400).json({ message: 'A description is required.' });
	} else if (!!events.location) {
		res.status(400).json({ message: 'A location is required.' });
	} else {
		next();
	}
}

async function validateEventId(req, res, next) {
    try{
       
        const { id } = req.params
        const event_validate = await Events('events').where({id}).first();
        if (!event_validate) {
			res.status(404).json({ message: `Event not found.` });
		} else {
			req.event = event_validate;
			next();
		}
    }
    catch(err){
        next(err)
    }
}