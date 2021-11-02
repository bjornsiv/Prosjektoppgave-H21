import pool from './mysql-pool';

export type Task = {
  id: number;
  title: string;
  done: boolean;
  description: string;
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return new Promise<Task | undefined>((resolve, reject) => {
      pool.query('SELECT * FROM Tasks WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return new Promise<Task[]>((resolve, reject) => {
      pool.query('SELECT * FROM Tasks', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string, description: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Tasks SET title=?, description=?',
        [title, description],
        (error, results) => {
          if (error) return reject(error);

          resolve(Number(results.insertId));
        }
      );
    });
  }

  /**
   * Delete task with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Tasks WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);

        resolve();
      });
    });
  }

  /*
  Change done boolean 
  */
  updateTask(id: number, title: string, description: string, done: boolean) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Tasks SET title=?, description=?, done=? WHERE id=?',
        [title, description, done, id],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No row changed'));

          resolve();
        }
      );
    });
  }
}

const taskService = new TaskService();
export default taskService;
