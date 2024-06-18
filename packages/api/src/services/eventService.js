import { Op } from 'sequelize';
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

/**
 * Finds and counts all events based on provided filters.
 *
 * @param {object} filters - Filters for querying events.
 * @returns {Promise<object>} A promise that resolves to an object containing the count of events and
 * the paginated list of events.
 */
const findAndCountAll = async (filters) => {
  const { applicationId, page, limit, find, order } = filters;
  const offset = page * limit;
  const where = {};
  let orderClause = [['name', 'ASC']];

  if (applicationId) {
    where.applicationId = applicationId;
  }

  if (find) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { description: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return event.findAndCountAll({
    where,
    order: orderClause,
    offset,
    limit,
    raw: true,
  });
};

eventService.create = create;
eventService.findAndCountAll = findAndCountAll;

export default eventService;
