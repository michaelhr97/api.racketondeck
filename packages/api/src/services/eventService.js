import event from '../models/event.js';

const eventService = {};

/**
 * Creates a new event.
 *
 * @param {object} data - The data for the event to be created.
 * @returns {Promise<object>} A promise that resolves to the plain object representation of the created event.
 */
const create = async (data) => {
  const newEvent = await event.create(data);
  return newEvent.get({ plain: true });
};

eventService.create = create;

export default eventService;
