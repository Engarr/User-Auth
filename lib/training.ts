import db from './db';
import { Training } from './types';

export function getTrainings(): Training[] {
  const stmt = db.prepare('SELECT * FROM trainings');
  return stmt.all() as Training[];
}
