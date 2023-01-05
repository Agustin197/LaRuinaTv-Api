import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://postgres:XVrvf0zVbzbL5om@la-ruina-tv.internal:5432', {
  logging: false,
  native: false
});