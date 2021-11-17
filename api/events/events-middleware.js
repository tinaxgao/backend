const Events = require('./events-model')

module.exports = {
	validateEvent,
	// validateEventId,
};

function validateEvent(req, res, next){
    const {event_title, event_date, event_description, event_location} = req.body
    if (!event_title) {
		res.status(400).json({ message: 'A title is required.' });
	} else if (!event_date) {
		res.status(400).json({ message: 'A date is required.' });
	} else if (!event_description) {
		res.status(400).json({ message: 'A description is required.' });
	} else if (!event_location) {
		res.status(400).json({ message: 'A location is required.' });
	} else {
		next();
	}
}

// not working, will come back to it later

// async function validateEventId(req, res, next) {
// 	try{
// 		const { event_id } = req.params
// 		const event_validate = await Events('events').where({event_id}).first();
// 		if (!event_validate) {
// 			res.status(404).json({ message: `Event not found.` });
// 		} else {
// 		req.event = event_validate;
// 		next();
// 		}
// 	}
// 	catch(err){
// 			next(err)
// 	}
// }
